"""
Expense Model
─────────────
Business expenses tracking — operational costs, reimbursements, etc.
"""

from sqlalchemy import String, Text, Float, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class Expense(TimestampMixin, Base):
    __tablename__ = "finance_expenses"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    expense_number: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)

    # ── Category ────────────────────────────────────────────
    category: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    # travel, meals, office_supplies, utilities, rent, salary, marketing, software, maintenance, other

    # ── Description ─────────────────────────────────────────
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ── Financial ───────────────────────────────────────────
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    tax_amount: Mapped[float] = mapped_column(Float, default=0.0)
    total_amount: Mapped[float] = mapped_column(Float, nullable=False)
    currency: Mapped[str] = mapped_column(String(10), default="INR")

    # ── Date ────────────────────────────────────────────────
    expense_date: Mapped[str] = mapped_column(String(50), nullable=False)

    # ── Payment Method ──────────────────────────────────────
    payment_method: Mapped[str | None] = mapped_column(String(100), nullable=True)
    # cash, credit_card, debit_card, bank_transfer, upi, cheque

    # ── Vendor / Supplier ───────────────────────────────────
    supplier_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("erp_suppliers.id"), nullable=True
    )
    vendor_name: Mapped[str | None] = mapped_column(String(255), nullable=True)  # one-time vendor

    # ── Link to Invoice ─────────────────────────────────────
    invoice_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("finance_invoices.id"), nullable=True
    )

    # ── Link to Chart of Account ────────────────────────────
    finance_account_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("finance_accounts.id"), nullable=True
    )

    # ── Receipt / Attachment ────────────────────────────────
    receipt_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # ── Status & Approval ───────────────────────────────────
    status: Mapped[str] = mapped_column(String(50), default="pending")
    # pending, approved, rejected, reimbursed

    # ── Who submitted & approved ────────────────────────────
    submitted_by: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )
    approved_by: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )
    approved_at: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # ── Notes ───────────────────────────────────────────────
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<Expense {self.expense_number} {self.category} ₹{self.total_amount}>"
