"""
Expense Schemas
───────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ExpenseBase(BaseModel):
    expense_number: str
    category: str
    title: str
    description: Optional[str] = None
    amount: float
    tax_amount: Optional[float] = 0.0
    total_amount: float
    currency: Optional[str] = "INR"
    expense_date: str
    payment_method: Optional[str] = None
    supplier_id: Optional[int] = None
    vendor_name: Optional[str] = None
    invoice_id: Optional[int] = None
    finance_account_id: Optional[int] = None
    receipt_url: Optional[str] = None
    status: Optional[str] = "pending"
    approved_by: Optional[int] = None
    approved_at: Optional[str] = None
    notes: Optional[str] = None


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(BaseModel):
    expense_number: Optional[str] = None
    category: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    amount: Optional[float] = None
    tax_amount: Optional[float] = None
    total_amount: Optional[float] = None
    currency: Optional[str] = None
    expense_date: Optional[str] = None
    payment_method: Optional[str] = None
    supplier_id: Optional[int] = None
    vendor_name: Optional[str] = None
    invoice_id: Optional[int] = None
    finance_account_id: Optional[int] = None
    receipt_url: Optional[str] = None
    status: Optional[str] = None
    approved_by: Optional[int] = None
    approved_at: Optional[str] = None
    notes: Optional[str] = None


class ExpenseResponse(ExpenseBase):
    id: int
    submitted_by: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
