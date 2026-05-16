"""
Deal Schemas
────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DealBase(BaseModel):
    title: str
    value: Optional[float] = None
    stage: Optional[str] = "prospecting"
    probability: Optional[int] = None
    description: Optional[str] = None
    close_date: Optional[str] = None
    account_id: Optional[int] = None
    contact_id: Optional[int] = None


class DealCreate(DealBase):
    pass


class DealUpdate(BaseModel):
    title: Optional[str] = None
    value: Optional[float] = None
    stage: Optional[str] = None
    probability: Optional[int] = None
    description: Optional[str] = None
    close_date: Optional[str] = None
    account_id: Optional[int] = None
    contact_id: Optional[int] = None


class DealResponse(DealBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
