"""
Analytics Event Schemas
───────────────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AnalyticsEventBase(BaseModel):
    event_type: str
    source: Optional[str] = None
    medium: Optional[str] = None
    campaign_id: Optional[int] = None
    campaign_name: Optional[str] = None
    content_page_id: Optional[int] = None
    visitor_id: Optional[str] = None
    contact_id: Optional[int] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    url: Optional[str] = None
    referrer: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_content: Optional[str] = None
    event_value: Optional[float] = None
    metadata: Optional[str] = None
    event_date: str


class AnalyticsEventCreate(AnalyticsEventBase):
    pass


class AnalyticsEventUpdate(BaseModel):
    event_type: Optional[str] = None
    source: Optional[str] = None
    medium: Optional[str] = None
    campaign_id: Optional[int] = None
    campaign_name: Optional[str] = None
    content_page_id: Optional[int] = None
    visitor_id: Optional[str] = None
    contact_id: Optional[int] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    url: Optional[str] = None
    referrer: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_content: Optional[str] = None
    event_value: Optional[float] = None
    metadata: Optional[str] = None
    event_date: Optional[str] = None


class AnalyticsEventResponse(AnalyticsEventBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
