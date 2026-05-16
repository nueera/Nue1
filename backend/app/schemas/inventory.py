"""
Inventory Schemas
─────────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class InventoryBase(BaseModel):
    product_id: int
    warehouse_id: int
    quantity_on_hand: Optional[int] = 0
    quantity_reserved: Optional[int] = 0
    quantity_available: Optional[int] = 0
    quantity_on_order: Optional[int] = 0
    batch_number: Optional[str] = None
    expiry_date: Optional[str] = None
    bin_location: Optional[str] = None
    status: Optional[str] = "in_stock"


class InventoryCreate(InventoryBase):
    pass


class InventoryUpdate(BaseModel):
    quantity_on_hand: Optional[int] = None
    quantity_reserved: Optional[int] = None
    quantity_available: Optional[int] = None
    quantity_on_order: Optional[int] = None
    batch_number: Optional[str] = None
    expiry_date: Optional[str] = None
    bin_location: Optional[str] = None
    status: Optional[str] = None


class InventoryResponse(InventoryBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
