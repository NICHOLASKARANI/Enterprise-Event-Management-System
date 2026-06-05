from app.agents.base_agent import BaseAgent

SALES_SYSTEM_PROMPT = """
You are an AI Sales Agent focused on:
1. Lead qualification and scoring
2. Personalized sales outreach
3. Objection handling
4. Deal progression recommendations
5. Revenue forecasting

Analyze customer data, suggest next steps, and optimize conversion rates.
Provide data-driven recommendations and track key sales metrics.
"""

class SalesAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="SalesAgent",
            role="Sales Operations",
            system_prompt=SALES_SYSTEM_PROMPT
        )
    
    async def qualify_lead(self, lead_data: dict) -> dict:
        """Score and qualify leads based on multiple criteria"""
        task = "Qualify this lead and provide scoring"
        context = {"lead": lead_data}
        result = await self.process(task, context)
        return result
    
    async def generate_outreach(self, customer_data: dict) -> str:
        """Generate personalized sales outreach"""
        task = "Create personalized sales outreach message"
        context = {"customer": customer_data}
        result = await self.process(task, context)
        return result.get("result", "")
    
    async def forecast_revenue(self, pipeline_data: dict) -> dict:
        """Predict revenue based on pipeline"""
        task = "Generate revenue forecast from pipeline data"
        context = {"pipeline": pipeline_data}
        result = await self.process(task, context)
        return result