"""
Purchase Order Schemas
──────────────────────
"""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ── Purchase Order Item ─────────────────────────────────────

class PurchaseOrderItemBase(BaseModel):
    product_id: int
    quantity_ordered: int
    quantity_received: Optional[int] = 0
    unit_price: float
    tax_rate: Optional[float] = 0.0
    discount_percent: Optional[float] = 0.0
    total_price: float
    notes: Optional[str] = None


class PurchaseOrderItemCreate(PurchaseOrderItemBase):
    pass


class PurchaseOrderItemUpdate(BaseModel):
    product_id: Optional[int] = None
    quantity_ordered: Optional[int] = None
    quantity_received: Optional[int] = None
    unit_price: Optional[float] = None
    tax_rate: Optional[float] = None
    discount_percent: Optional[float] = None
    total_price: Optional[float] = None
    notes: Optional[str] = None


class PurchaseOrderItemResponse(PurchaseOrderItemBase):
    id: int
    purchase_order_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ── Purchase Order ──────────────────────────────────────────

class PurchaseOrderBase(BaseModel):
    po_number: str
    supplier_id: int
    warehouse_id: int
    order_date: str
    expected_delivery_date: Optional[str] = None
    actual_delivery_date: Optional[str] = None
    status: Optional[str] = "draft"
    subtotal: Optional[float] = 0.0
    tax_amount: Optional[float] = 0.0
    shipping_cost: Optional[float] = 0.0
    total_amount: Optional[float] = 0.0
    currency: Optional[str] = "INR"
    payment_status: Optional[str] = "unpaid"
    payment_method: Optional[str] = None
    notes: Optional[str] = None
    internal_notes: Optional[str] = None


class PurchaseOrderCreate(PurchaseOrderBase):
    items: List[PurchaseOrderItemCreate] = []


class PurchaseOrderUpdate(BaseModel):
    po_number: Optional[str] = None
    supplier_id: Optional[int] = None
    warehouse_id: Optional[int] = None
    order_date: Optional[str] = None
    expected_delivery_date: Optional[str] = None
    actual_delivery_date: Optional[str] = None
    status: Optional[str] = None
    subtotal: Optional[float] = None
    tax_amount: Optional[float] = None
    shipping_cost: Optional[float] = None
    total_amount: Optional[float] = None
    currency: Optional[str] = None
    payment_status: Optional[str] = None
    payment_method: Optional[str] = None
    notes: Optional[str] = None
    internal_notes: Optional[str] = None
    items: Optional[List[PurchaseOrderItemCreate]] = None


class PurchaseOrderResponse(PurchaseOrderBase):
    id: int
    owner_id: Optional[int] = None
    items: List[PurchaseOrderItemResponse] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
