"""
Tax Rate Schemas
────────────────
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TaxRateBase(BaseModel):
    name: str
    code: str
    rate: float
    tax_type: Optional[str] = "gst"
    description: Optional[str] = None
    is_active: Optional[bool] = True
    cgst_rate: Optional[float] = None
    sgst_rate: Optional[float] = None
    igst_rate: Optional[float] = None


class TaxRateCreate(TaxRateBase):
    pass


class TaxRateUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    rate: Optional[float] = None
    tax_type: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None
    cgst_rate: Optional[float] = None
    sgst_rate: Optional[float] = None
    igst_rate: Optional[float] = None


class TaxRateResponse(TaxRateBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
