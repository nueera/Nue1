"""
Content Page Schemas
────────────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ContentPageBase(BaseModel):
    title: str
    slug: str
    content_type: Optional[str] = "blog"
    body: Optional[str] = None
    excerpt: Optional[str] = None
    featured_image_url: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    focus_keyword: Optional[str] = None
    canonical_url: Optional[str] = None
    author_id: Optional[int] = None
    status: Optional[str] = "draft"
    published_at: Optional[str] = None
    page_views: Optional[int] = 0
    unique_visitors: Optional[int] = 0
    avg_time_on_page: Optional[float] = 0.0
    bounce_rate: Optional[float] = 0.0
    category: Optional[str] = None
    tags: Optional[str] = None
    campaign_id: Optional[int] = None


class ContentPageCreate(ContentPageBase):
    pass


class ContentPageUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content_type: Optional[str] = None
    body: Optional[str] = None
    excerpt: Optional[str] = None
    featured_image_url: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    focus_keyword: Optional[str] = None
    canonical_url: Optional[str] = None
    author_id: Optional[int] = None
    status: Optional[str] = None
    published_at: Optional[str] = None
    page_views: Optional[int] = None
    unique_visitors: Optional[int] = None
    avg_time_on_page: Optional[float] = None
    bounce_rate: Optional[float] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    campaign_id: Optional[int] = None


class ContentPageResponse(ContentPageBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
