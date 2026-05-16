"""
ERP Endpoints
─────────────
Placeholder for ERP module APIs.
Step by step we will add: Products, Inventory, Orders, Suppliers, etc.
"""

from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()


@router.get("/dashboard")
async def erp_dashboard(current_user: dict = Depends(get_current_user)):
    """ERP module dashboard summary."""
    return {
        "module": "erp",
        "summary": {
            "total_products": 0,
            "low_stock_items": 0,
            "pending_orders": 0,
            "active_suppliers": 0,
        },
        "message": "ERP module — coming in next phase",
    }


@router.get("/products")
async def list_products(current_user: dict = Depends(get_current_user)):
    """List all products (placeholder)."""
    return {"items": [], "total": 0, "message": "Products endpoint — coming soon"}


@router.get("/orders")
async def list_orders(current_user: dict = Depends(get_current_user)):
    """List all orders (placeholder)."""
    return {"items": [], "total": 0, "message": "Orders endpoint — coming soon"}
