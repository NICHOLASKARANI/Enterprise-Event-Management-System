from langgraph.graph import StateGraph, END
from typing import Dict, Any, TypedDict, List
from app.agents.sales_agent import SalesAgent
from app.agents.support_agent import SupportAgent
from app.agents.finance_agent import FinanceAgent
from app.agents.hr_agent import HRAgent
from app.agents.meeting_assistant import MeetingAssistant

class OrchestratorState(TypedDict):
    query: str
    agent_type: str
    context: Dict[str, Any]
    results: List[Dict[str, Any]]
    final_response: str

class AgentOrchestrator:
    def __init__(self):
        self.agents = {
            "sales": SalesAgent(),
            "support": SupportAgent(),
            "finance": FinanceAgent(),
            "hr": HRAgent(),
            "meeting": MeetingAssistant()
        }
        self.graph = self._build_orchestrator()
    
    def _build_orchestrator(self):
        workflow = StateGraph(OrchestratorState)
        
        workflow.add_node("route", self.route_to_agent)
        workflow.add_node("execute_agent", self.execute_agent)
        workflow.add_node("aggregate", self.aggregate_results)
        
        workflow.set_entry_point("route")
        workflow.add_edge("route", "execute_agent")
        workflow.add_edge("execute_agent", "aggregate")
        workflow.add_edge("aggregate", END)
        
        return workflow.compile()
    
    async def route_to_agent(self, state: OrchestratorState) -> OrchestratorState:
        # Intelligent routing based on query intent
        query_lower = state['query'].lower()
        
        if any(word in query_lower for word in ["sell", "lead", "customer", "revenue"]):
            state['agent_type'] = "sales"
        elif any(word in query_lower for word in ["invoice", "expense", "budget", "finance"]):
            state['agent_type'] = "finance"
        elif any(word in query_lower for word in ["hire", "employee", "hr", "leave"]):
            state['agent_type'] = "hr"
        elif any(word in query_lower for word in ["meeting", "schedule", "calendar"]):
            state['agent_type'] = "meeting"
        else:
            state['agent_type'] = "support"
        
        return state
    
    async def execute_agent(self, state: OrchestratorState) -> OrchestratorState:
        agent = self.agents.get(state['agent_type'])
        if agent:
            result = await agent.process(state['query'], state['context'])
            state['results'].append(result)
        return state
    
    async def aggregate_results(self, state: OrchestratorState) -> OrchestratorState:
        # Combine results from multiple agents if needed
        responses = [r.get('result', '') for r in state['results']]
        state['final_response'] = "\n".join(responses)
        return state
    
    async def process_query(self, query: str, context: Dict[str, Any] = None):
        initial_state = {
            "query": query,
            "agent_type": "",
            "context": context or {},
            "results": [],
            "final_response": ""
        }
        final_state = await self.graph.ainvoke(initial_state)
        return final_state['final_response']