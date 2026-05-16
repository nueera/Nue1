"""
Payment Model
─────────────
Payments received (from customers) and payments made (to suppliers).
Linked to invoices for full payment tracking.
"""

from sqlalchemy import String, Text, Float, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class Payment(TimestampMixin, Base):
    __tablename__ = "finance_payments"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    payment_number: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)

    # ── Payment Type ────────────────────────────────────────
    payment_type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    # received (money in), made (money out)

    # ── Who paid / who we paid ──────────────────────────────
    customer_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("accounts.id"), nullable=True, index=True
    )
    supplier_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("erp_suppliers.id"), nullable=True, index=True
    )
    contact_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("contacts.id"), nullable=True
    )

    # ── Link to Invoice ─────────────────────────────────────
    invoice_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("finance_invoices.id"), nullable=True, index=True
    )

    # ── Financial ───────────────────────────────────────────
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    currency: Mapped[str] = mapped_column(String(10), default="INR")

    # ── Payment Details ─────────────────────────────────────
    payment_date: Mapped[str] = mapped_column(String(50), nullable=False)
    payment_method: Mapped[str] = mapped_column(String(100), nullable=False)
    # cash, credit_card, debit_card, bank_transfer, upi, cheque, wire_transfer

    # ── Reference ───────────────────────────────────────────
    reference_number: Mapped[str | None] = mapped_column(String(100), nullable=True)  # cheque #, txn ID
    bank_account: Mapped[str | None] = mapped_column(String(255), nullable=True)

    # ── Link to Chart of Account ────────────────────────────
    finance_account_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("finance_accounts.id"), nullable=True
    )

    # ── Status ──────────────────────────────────────────────
    status: Mapped[str] = mapped_column(String(50), default="completed")
    # pending, completed, failed, refunded

    # ── Notes ───────────────────────────────────────────────
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ── Who recorded it ─────────────────────────────────────
    owner_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<Payment {self.payment_number} {self.payment_type} ₹{self.amount}>"
