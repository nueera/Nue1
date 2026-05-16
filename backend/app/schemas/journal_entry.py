"""
Journal Entry Schemas
─────────────────────
"""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ── Journal Entry Line ──────────────────────────────────────

class JournalEntryLineBase(BaseModel):
    account_id: int
    debit: Optional[float] = 0.0
    credit: Optional[float] = 0.0
    description: Optional[str] = None
    sort_order: Optional[int] = 0


class JournalEntryLineCreate(JournalEntryLineBase):
    pass


class JournalEntryLineUpdate(BaseModel):
    account_id: Optional[int] = None
    debit: Optional[float] = None
    credit: Optional[float] = None
    description: Optional[str] = None
    sort_order: Optional[int] = None


class JournalEntryLineResponse(JournalEntryLineBase):
    id: int
    journal_entry_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ── Journal Entry ───────────────────────────────────────────

class JournalEntryBase(BaseModel):
    entry_number: str
    entry_date: str
    description: str
    reference_type: Optional[str] = None
    reference_id: Optional[int] = None
    status: Optional[str] = "draft"
    total_debit: Optional[float] = 0.0
    total_credit: Optional[float] = 0.0
    notes: Optional[str] = None


class JournalEntryCreate(JournalEntryBase):
    lines: List[JournalEntryLineCreate] = []


class JournalEntryUpdate(BaseModel):
    entry_number: Optional[str] = None
    entry_date: Optional[str] = None
    description: Optional[str] = None
    reference_type: Optional[str] = None
    reference_id: Optional[int] = None
    status: Optional[str] = None
    total_debit: Optional[float] = None
    total_credit: Optional[float] = None
    notes: Optional[str] = None
    lines: Optional[List[JournalEntryLineCreate]] = None


class JournalEntryResponse(JournalEntryBase):
    id: int
    owner_id: Optional[int] = None
    lines: List[JournalEntryLineResponse] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
