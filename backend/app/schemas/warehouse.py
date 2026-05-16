"""
Warehouse Schemas
─────────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class WarehouseBase(BaseModel):
    name: str
    code: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    manager_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    capacity: Optional[int] = None
    is_active: Optional[bool] = True
    notes: Optional[str] = None


class WarehouseCreate(WarehouseBase):
    pass


class WarehouseUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    manager_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    capacity: Optional[int] = None
    is_active: Optional[bool] = None
    notes: Optional[str] = None


class WarehouseResponse(WarehouseBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
