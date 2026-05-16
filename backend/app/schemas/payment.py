"""
Payment Schemas
───────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PaymentBase(BaseModel):
    payment_number: str
    payment_type: str  # received, made
    customer_id: Optional[int] = None
    supplier_id: Optional[int] = None
    contact_id: Optional[int] = None
    invoice_id: Optional[int] = None
    amount: float
    currency: Optional[str] = "INR"
    payment_date: str
    payment_method: str
    reference_number: Optional[str] = None
    bank_account: Optional[str] = None
    finance_account_id: Optional[int] = None
    status: Optional[str] = "completed"
    notes: Optional[str] = None


class PaymentCreate(PaymentBase):
    pass


class PaymentUpdate(BaseModel):
    payment_number: Optional[str] = None
    payment_type: Optional[str] = None
    customer_id: Optional[int] = None
    supplier_id: Optional[int] = None
    contact_id: Optional[int] = None
    invoice_id: Optional[int] = None
    amount: Optional[float] = None
    currency: Optional[str] = None
    payment_date: Optional[str] = None
    payment_method: Optional[str] = None
    reference_number: Optional[str] = None
    bank_account: Optional[str] = None
    finance_account_id: Optional[int] = None
    status: Optional[str] = None
    notes: Optional[str] = None


class PaymentResponse(PaymentBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
