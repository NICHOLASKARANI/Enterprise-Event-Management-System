from app.agents.base_agent import BaseAgent

FINANCE_SYSTEM_PROMPT = """
You are an AI Finance Agent handling:
1. Invoice processing and automation
2. Expense categorization
3. Financial forecasting
4. Budget optimization
5. Cash flow management

Analyze financial transactions, detect anomalies, and provide strategic recommendations.
"""

class FinanceAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="FinanceAgent",
            role="Financial Operations",
            system_prompt=FINANCE_SYSTEM_PROMPT
        )
    
    async def process_invoice(self, invoice_data: dict) -> dict:
        task = "Process and validate invoice"
        context = {"invoice": invoice_data}
        return await self.process(task, context)
    
    async def analyze_expenses(self, transactions: list) -> dict:
        task = "Analyze expenses and identify savings opportunities"
        context = {"transactions": transactions}
        return await self.process(task, context)