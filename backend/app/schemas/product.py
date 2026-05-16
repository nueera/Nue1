"""
Product Schemas
───────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProductBase(BaseModel):
    name: str
    sku: str
    barcode: Optional[str] = None
    product_type: Optional[str] = "physical"
    category_id: Optional[int] = None
    supplier_id: Optional[int] = None
    cost_price: Optional[float] = None
    selling_price: Optional[float] = None
    mrp: Optional[float] = None
    tax_rate: Optional[float] = None
    unit: Optional[str] = "piece"
    weight: Optional[float] = None
    dimensions: Optional[str] = None
    min_stock_level: Optional[int] = 0
    max_stock_level: Optional[int] = None
    track_inventory: Optional[bool] = True
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    sku: Optional[str] = None
    barcode: Optional[str] = None
    product_type: Optional[str] = None
    category_id: Optional[int] = None
    supplier_id: Optional[int] = None
    cost_price: Optional[float] = None
    selling_price: Optional[float] = None
    mrp: Optional[float] = None
    tax_rate: Optional[float] = None
    unit: Optional[str] = None
    weight: Optional[float] = None
    dimensions: Optional[str] = None
    min_stock_level: Optional[int] = None
    max_stock_level: Optional[int] = None
    track_inventory: Optional[bool] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None


class ProductResponse(ProductBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
