"""
Social Post Schemas
───────────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SocialPostBase(BaseModel):
    platform: str  # instagram, facebook, linkedin, twitter, youtube, tiktok, pinterest
    caption: str
    hashtags: Optional[str] = None
    media_url: Optional[str] = None
    media_type: Optional[str] = None  # image, video, carousel, story, reel
    link_url: Optional[str] = None
    scheduled_at: Optional[str] = None
    published_at: Optional[str] = None
    status: Optional[str] = "draft"
    campaign_id: Optional[int] = None
    likes: Optional[int] = 0
    comments: Optional[int] = 0
    shares: Optional[int] = 0
    impressions: Optional[int] = 0
    reach: Optional[int] = 0
    saves: Optional[int] = 0
    clicks: Optional[int] = 0


class SocialPostCreate(SocialPostBase):
    pass


class SocialPostUpdate(BaseModel):
    platform: Optional[str] = None
    caption: Optional[str] = None
    hashtags: Optional[str] = None
    media_url: Optional[str] = None
    media_type: Optional[str] = None
    link_url: Optional[str] = None
    scheduled_at: Optional[str] = None
    published_at: Optional[str] = None
    status: Optional[str] = None
    campaign_id: Optional[int] = None
    likes: Optional[int] = None
    comments: Optional[int] = None
    shares: Optional[int] = None
    impressions: Optional[int] = None
    reach: Optional[int] = None
    saves: Optional[int] = None
    clicks: Optional[int] = None


class SocialPostResponse(SocialPostBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
