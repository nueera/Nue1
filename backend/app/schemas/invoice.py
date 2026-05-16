"""
Invoice Schemas
───────────────
"""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ── Invoice Item ────────────────────────────────────────────

class InvoiceItemBase(BaseModel):
    product_id: Optional[int] = None
    description: str
    quantity: float
    unit: Optional[str] = "piece"
    unit_price: float
    discount_percent: Optional[float] = 0.0
    tax_rate: Optional[float] = 0.0
    tax_amount: Optional[float] = 0.0
    total_price: float
    sort_order: Optional[int] = 0


class InvoiceItemCreate(InvoiceItemBase):
    pass


class InvoiceItemUpdate(BaseModel):
    product_id: Optional[int] = None
    description: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None
    unit_price: Optional[float] = None
    discount_percent: Optional[float] = None
    tax_rate: Optional[float] = None
    tax_amount: Optional[float] = None
    total_price: Optional[float] = None
    sort_order: Optional[int] = None


class InvoiceItemResponse(InvoiceItemBase):
    id: int
    invoice_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ── Invoice ─────────────────────────────────────────────────

class InvoiceBase(BaseModel):
    invoice_number: str
    invoice_type: str  # sales_invoice, purchase_invoice, credit_note, debit_note, proforma
    customer_id: Optional[int] = None
    supplier_id: Optional[int] = None
    contact_id: Optional[int] = None
    sales_order_id: Optional[int] = None
    purchase_order_id: Optional[int] = None
    invoice_date: str
    due_date: str
    subtotal: Optional[float] = 0.0
    tax_amount: Optional[float] = 0.0
    discount_amount: Optional[float] = 0.0
    shipping_cost: Optional[float] = 0.0
    total_amount: Optional[float] = 0.0
    amount_paid: Optional[float] = 0.0
    amount_due: Optional[float] = 0.0
    currency: Optional[str] = "INR"
    status: Optional[str] = "draft"
    payment_terms: Optional[str] = None
    billing_address: Optional[str] = None
    shipping_address: Optional[str] = None
    notes: Optional[str] = None
    terms_and_conditions: Optional[str] = None


class InvoiceCreate(InvoiceBase):
    items: List[InvoiceItemCreate] = []


class InvoiceUpdate(BaseModel):
    invoice_number: Optional[str] = None
    invoice_type: Optional[str] = None
    customer_id: Optional[int] = None
    supplier_id: Optional[int] = None
    contact_id: Optional[int] = None
    sales_order_id: Optional[int] = None
    purchase_order_id: Optional[int] = None
    invoice_date: Optional[str] = None
    due_date: Optional[str] = None
    subtotal: Optional[float] = None
    tax_amount: Optional[float] = None
    discount_amount: Optional[float] = None
    shipping_cost: Optional[float] = None
    total_amount: Optional[float] = None
    amount_paid: Optional[float] = None
    amount_due: Optional[float] = None
    currency: Optional[str] = None
    status: Optional[str] = None
    payment_terms: Optional[str] = None
    billing_address: Optional[str] = None
    shipping_address: Optional[str] = None
    notes: Optional[str] = None
    terms_and_conditions: Optional[str] = None
    items: Optional[List[InvoiceItemCreate]] = None


class InvoiceResponse(InvoiceBase):
    id: int
    owner_id: Optional[int] = None
    items: List[InvoiceItemResponse] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
