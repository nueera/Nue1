"""
Contact Schemas
───────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ContactBase(BaseModel):
    first_name: str
    last_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    notes: Optional[str] = None
    account_id: Optional[int] = None


class ContactCreate(ContactBase):
    pass


class ContactUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    notes: Optional[str] = None
    account_id: Optional[int] = None


class ContactResponse(ContactBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
