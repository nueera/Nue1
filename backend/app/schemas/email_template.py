"""
Email Template Schemas
──────────────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class EmailTemplateBase(BaseModel):
    name: str
    subject: str
    template_type: Optional[str] = "campaign"
    body_html: Optional[str] = None
    body_text: Optional[str] = None
    preview_text: Optional[str] = None
    from_name: Optional[str] = None
    from_email: Optional[str] = None
    reply_to: Optional[str] = None
    variables: Optional[str] = None
    times_used: Optional[int] = 0
    is_active: Optional[bool] = True


class EmailTemplateCreate(EmailTemplateBase):
    pass


class EmailTemplateUpdate(BaseModel):
    name: Optional[str] = None
    subject: Optional[str] = None
    template_type: Optional[str] = None
    body_html: Optional[str] = None
    body_text: Optional[str] = None
    preview_text: Optional[str] = None
    from_name: Optional[str] = None
    from_email: Optional[str] = None
    reply_to: Optional[str] = None
    variables: Optional[str] = None
    times_used: Optional[int] = None
    is_active: Optional[bool] = None


class EmailTemplateResponse(EmailTemplateBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
