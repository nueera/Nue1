"""
Chart of Accounts Schemas
─────────────────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class FinanceAccountBase(BaseModel):
    code: str
    name: str
    account_type: str  # asset, liability, income, expense, equity
    sub_type: Optional[str] = None
    parent_id: Optional[int] = None
    balance: Optional[float] = 0.0
    description: Optional[str] = None
    is_active: Optional[bool] = True
    currency: Optional[str] = "INR"


class FinanceAccountCreate(FinanceAccountBase):
    pass


class FinanceAccountUpdate(BaseModel):
    code: Optional[str] = None
    name: Optional[str] = None
    account_type: Optional[str] = None
    sub_type: Optional[str] = None
    parent_id: Optional[int] = None
    balance: Optional[float] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None
    currency: Optional[str] = None


class FinanceAccountResponse(FinanceAccountBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
