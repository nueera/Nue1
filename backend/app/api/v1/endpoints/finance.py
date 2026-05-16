"""
Finance Endpoints
─────────────────
Placeholder for Finance module APIs.
Step by step we will add: Invoices, Expenses, Revenue, Reports, etc.
"""

from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()


@router.get("/dashboard")
async def finance_dashboard(current_user: dict = Depends(get_current_user)):
    """Finance module dashboard summary."""
    return {
        "module": "finance",
        "summary": {
            "total_revenue": 0,
            "total_expenses": 0,
            "net_profit": 0,
            "pending_invoices": 0,
        },
        "message": "Finance module — coming in next phase",
    }


@router.get("/invoices")
async def list_invoices(current_user: dict = Depends(get_current_user)):
    """List all invoices (placeholder)."""
    return {"items": [], "total": 0, "message": "Invoices endpoint — coming soon"}


@router.get("/expenses")
async def list_expenses(current_user: dict = Depends(get_current_user)):
    """List all expenses (placeholder)."""
    return {"items": [], "total": 0, "message": "Expenses endpoint — coming soon"}
