from langgraph.graph import StateGraph, END
from langgraph.checkpoint import MemorySaver
from typing import Dict, Any, TypedDict, List, Optional
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import asyncio
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class AgentState(TypedDict):
    task: str
    context: Dict[str, Any]
    result: Optional[str]
    steps: List[str]
    error: Optional[str]
    requires_human: bool
    metadata: Dict[str, Any]

class BaseAgent:
    def __init__(self, name: str, role: str, system_prompt: str):
        self.name = name
        self.role = role
        self.llm = ChatOpenAI(
            model="gpt-4-turbo-preview",
            temperature=0.7,
            streaming=True
        )
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{task}\nContext: {context}")
        ])
        self.graph = self._build_graph()
        self.memory = MemorySaver()
        
    def _build_graph(self):
        workflow = StateGraph(AgentState)
        
        workflow.add_node("analyze", self.analyze_task)
        workflow.add_node("execute", self.execute_task)
        workflow.add_node("validate", self.validate_result)
        workflow.add_node("human_check", self.human_intervention)
        
        workflow.set_entry_point("analyze")
        workflow.add_edge("analyze", "execute")
        workflow.add_edge("execute", "validate")
        
        workflow.add_conditional_edges(
            "validate",
            self.should_escalate,
            {
                "complete": END,
                "needs_human": "human_check",
                "retry": "execute"
            }
        )
        workflow.add_edge("human_check", END)
        
        return workflow.compile(checkpointer=self.memory)
    
    async def analyze_task(self, state: AgentState) -> AgentState:
        logger.info(f"{self.name}: Analyzing task - {state['task']}")
        state['steps'].append(f"Analyzed task: {state['task']}")
        state['metadata']['analyzed_at'] = datetime.now().isoformat()
        return state
    
    async def execute_task(self, state: AgentState) -> AgentState:
        try:
            chain = self.prompt | self.llm
            response = await chain.ainvoke({
                "task": state['task'],
                "context": state['context']
            })
            state['result'] = response.content
            state['steps'].append(f"Executed: {state['task']}")
            return state
        except Exception as e:
            state['error'] = str(e)
            return state
    
    async def validate_result(self, state: AgentState) -> AgentState:
        if state['error']:
            return state
        
        # Validation logic
        confidence = self._calculate_confidence(state['result'])
        if confidence < 0.7:
            state['requires_human'] = True
        
        state['metadata']['confidence'] = confidence
        return state
    
    def should_escalate(self, state: AgentState):
        if state.get('error'):
            return "retry"
        if state.get('requires_human'):
            return "needs_human"
        return "complete"
    
    async def human_intervention(self, state: AgentState) -> AgentState:
        # Trigger human review workflow
        state['steps'].append("Awaiting human approval")
        state['requires_human'] = True
        return state
    
    def _calculate_confidence(self, result: str) -> float:
        # Implement confidence scoring
        return 0.85
    
    async def process(self, task: str, context: Dict[str, Any]) -> Dict[str, Any]:
        initial_state = {
            "task": task,
            "context": context,
            "result": None,
            "steps": [],
            "error": None,
            "requires_human": False,
            "metadata": {}
        }
        
        final_state = await self.graph.ainvoke(initial_state)
        return {
            "agent": self.name,
            "result": final_state.get("result"),
            "steps": final_state.get("steps"),
            "requires_human": final_state.get("requires_human"),
            "confidence": final_state.get("metadata", {}).get("confidence", 0)
        }