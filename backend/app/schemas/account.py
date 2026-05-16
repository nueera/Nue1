"""
Account Schemas
───────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AccountBase(BaseModel):
    name: str
    industry: Optional[str] = None
    website: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    description: Optional[str] = None
    revenue: Optional[str] = None
    employees: Optional[int] = None


class AccountCreate(AccountBase):
    pass


class AccountUpdate(BaseModel):
    name: Optional[str] = None
    industry: Optional[str] = None
    website: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    description: Optional[str] = None
    revenue: Optional[str] = None
    employees: Optional[int] = None


class AccountResponse(AccountBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
