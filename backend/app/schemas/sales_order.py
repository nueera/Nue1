"""
Sales Order Schemas
───────────────────
"""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ── Sales Order Item ────────────────────────────────────────

class SalesOrderItemBase(BaseModel):
    product_id: int
    quantity_ordered: int
    quantity_shipped: Optional[int] = 0
    quantity_returned: Optional[int] = 0
    unit_price: float
    tax_rate: Optional[float] = 0.0
    discount_percent: Optional[float] = 0.0
    total_price: float
    notes: Optional[str] = None


class SalesOrderItemCreate(SalesOrderItemBase):
    pass


class SalesOrderItemUpdate(BaseModel):
    product_id: Optional[int] = None
    quantity_ordered: Optional[int] = None
    quantity_shipped: Optional[int] = None
    quantity_returned: Optional[int] = None
    unit_price: Optional[float] = None
    tax_rate: Optional[float] = None
    discount_percent: Optional[float] = None
    total_price: Optional[float] = None
    notes: Optional[str] = None


class SalesOrderItemResponse(SalesOrderItemBase):
    id: int
    sales_order_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ── Sales Order ─────────────────────────────────────────────

class SalesOrderBase(BaseModel):
    so_number: str
    customer_id: Optional[int] = None
    contact_id: Optional[int] = None
    customer_name: Optional[str] = None
    warehouse_id: int
    order_date: str
    expected_ship_date: Optional[str] = None
    actual_ship_date: Optional[str] = None
    delivery_date: Optional[str] = None
    status: Optional[str] = "draft"
    subtotal: Optional[float] = 0.0
    tax_amount: Optional[float] = 0.0
    shipping_cost: Optional[float] = 0.0
    discount_amount: Optional[float] = 0.0
    total_amount: Optional[float] = 0.0
    currency: Optional[str] = "INR"
    payment_status: Optional[str] = "unpaid"
    payment_method: Optional[str] = None
    shipping_address: Optional[str] = None
    billing_address: Optional[str] = None
    notes: Optional[str] = None


class SalesOrderCreate(SalesOrderBase):
    items: List[SalesOrderItemCreate] = []


class SalesOrderUpdate(BaseModel):
    so_number: Optional[str] = None
    customer_id: Optional[int] = None
    contact_id: Optional[int] = None
    customer_name: Optional[str] = None
    warehouse_id: Optional[int] = None
    order_date: Optional[str] = None
    expected_ship_date: Optional[str] = None
    actual_ship_date: Optional[str] = None
    delivery_date: Optional[str] = None
    status: Optional[str] = None
    subtotal: Optional[float] = None
    tax_amount: Optional[float] = None
    shipping_cost: Optional[float] = None
    discount_amount: Optional[float] = None
    total_amount: Optional[float] = None
    currency: Optional[str] = None
    payment_status: Optional[str] = None
    payment_method: Optional[str] = None
    shipping_address: Optional[str] = None
    billing_address: Optional[str] = None
    notes: Optional[str] = None
    items: Optional[List[SalesOrderItemCreate]] = None


class SalesOrderResponse(SalesOrderBase):
    id: int
    owner_id: Optional[int] = None
    items: List[SalesOrderItemResponse] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
