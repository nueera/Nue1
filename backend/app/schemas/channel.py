"""
Channel Schemas
───────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ChannelBase(BaseModel):
    name: str
    code: str
    channel_type: str  # organic, paid, social, email, sms, referral, direct
    description: Optional[str] = None
    icon_url: Optional[str] = None
    color: Optional[str] = None
    monthly_budget: Optional[float] = None
    spent_this_month: Optional[float] = 0.0
    is_active: Optional[bool] = True
    is_paid: Optional[bool] = False
    config: Optional[str] = None


class ChannelCreate(ChannelBase):
    pass


class ChannelUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    channel_type: Optional[str] = None
    description: Optional[str] = None
    icon_url: Optional[str] = None
    color: Optional[str] = None
    monthly_budget: Optional[float] = None
    spent_this_month: Optional[float] = None
    is_active: Optional[bool] = None
    is_paid: Optional[bool] = None
    config: Optional[str] = None


class ChannelResponse(ChannelBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
