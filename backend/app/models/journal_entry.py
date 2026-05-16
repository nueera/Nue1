"""
Journal Entry Model
───────────────────
Double-entry bookkeeping — every transaction has debits and credits
that must balance (total debits = total credits).
"""

from sqlalchemy import String, Text, Float, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class JournalEntry(TimestampMixin, Base):
    __tablename__ = "finance_journal_entries"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    entry_number: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)

    # ── Dates ───────────────────────────────────────────────
    entry_date: Mapped[str] = mapped_column(String(50), nullable=False, index=True)

    # ── Description ─────────────────────────────────────────
    description: Mapped[str] = mapped_column(Text, nullable=False)

    # ── Reference ───────────────────────────────────────────
    reference_type: Mapped[str | None] = mapped_column(String(50), nullable=True)
    # invoice, payment, expense, manual
    reference_id: Mapped[int | None] = mapped_column(Integer, nullable=True)

    # ── Status ──────────────────────────────────────────────
    status: Mapped[str] = mapped_column(String(50), default="draft")
    # draft, posted, reversed

    # ── Totals (for validation) ─────────────────────────────
    total_debit: Mapped[float] = mapped_column(Float, default=0.0)
    total_credit: Mapped[float] = mapped_column(Float, default=0.0)

    # ── Who created it ──────────────────────────────────────
    owner_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    # ── Notes ───────────────────────────────────────────────
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<JournalEntry {self.entry_number} [{self.status}]>"


class JournalEntryLine(TimestampMixin, Base):
    __tablename__ = "finance_journal_entry_lines"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    journal_entry_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("finance_journal_entries.id"), nullable=False, index=True
    )

    # ── Account ─────────────────────────────────────────────
    account_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("finance_accounts.id"), nullable=False, index=True
    )

    # ── Debit or Credit ─────────────────────────────────────
    debit: Mapped[float] = mapped_column(Float, default=0.0)
    credit: Mapped[float] = mapped_column(Float, default=0.0)

    # ── Description ─────────────────────────────────────────
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ── Sort order ──────────────────────────────────────────
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    def __repr__(self) -> str:
        side = "DR" if self.debit > 0 else "CR"
        amount = self.debit if self.debit > 0 else self.credit
        return f"<JournalLine Account#{self.account_id} {side} ₹{amount}>"
