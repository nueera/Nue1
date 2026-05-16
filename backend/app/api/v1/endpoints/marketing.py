"""
Marketing Endpoints
───────────────────
Placeholder for Marketing module APIs.
Step by step we will add: Campaigns, Analytics, Content, SEO, etc.
"""

from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter()


@router.get("/dashboard")
async def marketing_dashboard(current_user: dict = Depends(get_current_user)):
    """Marketing module dashboard summary."""
    return {
        "module": "marketing",
        "summary": {
            "active_campaigns": 0,
            "total_leads_generated": 0,
            "conversion_rate": 0.0,
            "email_open_rate": 0.0,
        },
        "message": "Marketing module — coming in next phase",
    }


@router.get("/campaigns")
async def list_campaigns(current_user: dict = Depends(get_current_user)):
    """List all campaigns (placeholder)."""
    return {"items": [], "total": 0, "message": "Campaigns endpoint — coming soon"}


@router.get("/analytics")
async def get_analytics(current_user: dict = Depends(get_current_user)):
    """Get marketing analytics (placeholder)."""
    return {"data": {}, "message": "Analytics endpoint — coming soon"}
