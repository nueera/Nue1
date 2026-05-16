"""
Campaign Schemas
────────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CampaignBase(BaseModel):
    name: str
    code: Optional[str] = None
    campaign_type: str  # email, social_media, ppc, seo, content, referral, event, influencer, sms, multi_channel
    channel_id: Optional[int] = None
    objective: Optional[str] = "awareness"
    start_date: str
    end_date: Optional[str] = None
    status: Optional[str] = "draft"
    budget: Optional[float] = None
    spent: Optional[float] = 0.0
    currency: Optional[str] = "INR"
    target_audience: Optional[str] = None
    target_location: Optional[str] = None
    impressions: Optional[int] = 0
    clicks: Optional[int] = 0
    conversions: Optional[int] = 0
    leads_generated: Optional[int] = 0
    revenue_attributed: Optional[float] = 0.0
    description: Optional[str] = None
    tags: Optional[str] = None
    deal_id: Optional[int] = None


class CampaignCreate(CampaignBase):
    pass


class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    campaign_type: Optional[str] = None
    channel_id: Optional[int] = None
    objective: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    status: Optional[str] = None
    budget: Optional[float] = None
    spent: Optional[float] = None
    currency: Optional[str] = None
    target_audience: Optional[str] = None
    target_location: Optional[str] = None
    impressions: Optional[int] = None
    clicks: Optional[int] = None
    conversions: Optional[int] = None
    leads_generated: Optional[int] = None
    revenue_attributed: Optional[float] = None
    description: Optional[str] = None
    tags: Optional[str] = None
    deal_id: Optional[int] = None


class CampaignResponse(CampaignBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
