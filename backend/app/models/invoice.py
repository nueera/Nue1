"""
Invoice Model
─────────────
Sales Invoices (money coming in) and Purchase Invoices (money going out).
Linked to ERP Sales Orders and Purchase Orders.
"""

from sqlalchemy import String, Text, Float, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class Invoice(TimestampMixin, Base):
    __tablename__ = "finance_invoices"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    invoice_number: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)

    # ── Invoice Type ────────────────────────────────────────
    invoice_type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    # sales_invoice, purchase_invoice, credit_note, debit_note, proforma

    # ── Who we're billing / being billed by ─────────────────
    customer_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("accounts.id"), nullable=True, index=True
    )
    supplier_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("erp_suppliers.id"), nullable=True, index=True
    )
    contact_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("contacts.id"), nullable=True
    )

    # ── Link to ERP orders ──────────────────────────────────
    sales_order_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("erp_sales_orders.id"), nullable=True
    )
    purchase_order_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("erp_purchase_orders.id"), nullable=True
    )

    # ── Dates ───────────────────────────────────────────────
    invoice_date: Mapped[str] = mapped_column(String(50), nullable=False)
    due_date: Mapped[str] = mapped_column(String(50), nullable=False)

    # ── Financial ───────────────────────────────────────────
    subtotal: Mapped[float] = mapped_column(Float, default=0.0)
    tax_amount: Mapped[float] = mapped_column(Float, default=0.0)
    discount_amount: Mapped[float] = mapped_column(Float, default=0.0)
    shipping_cost: Mapped[float] = mapped_column(Float, default=0.0)
    total_amount: Mapped[float] = mapped_column(Float, default=0.0)
    amount_paid: Mapped[float] = mapped_column(Float, default=0.0)
    amount_due: Mapped[float] = mapped_column(Float, default=0.0)
    currency: Mapped[str] = mapped_column(String(10), default="INR")

    # ── Status ──────────────────────────────────────────────
    status: Mapped[str] = mapped_column(String(50), default="draft")
    # draft, sent, viewed, partial, paid, overdue, cancelled, void

    # ── Payment Terms ───────────────────────────────────────
    payment_terms: Mapped[str | None] = mapped_column(String(255), nullable=True)  # Net 30, Due on Receipt

    # ── Addresses ───────────────────────────────────────────
    billing_address: Mapped[str | None] = mapped_column(Text, nullable=True)
    shipping_address: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ── Notes ───────────────────────────────────────────────
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    terms_and_conditions: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ── Who created it ──────────────────────────────────────
    owner_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<Invoice {self.invoice_number} [{self.invoice_type}] [{self.status}]>"


class InvoiceItem(TimestampMixin, Base):
    __tablename__ = "finance_invoice_items"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    invoice_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("finance_invoices.id"), nullable=False, index=True
    )
    product_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("erp_products.id"), nullable=True
    )

    # ── Item Details ────────────────────────────────────────
    description: Mapped[str] = mapped_column(Text, nullable=False)
    quantity: Mapped[float] = mapped_column(Float, nullable=False)
    unit: Mapped[str] = mapped_column(String(50), default="piece")
    unit_price: Mapped[float] = mapped_column(Float, nullable=False)

    # ── Pricing ─────────────────────────────────────────────
    discount_percent: Mapped[float] = mapped_column(Float, default=0.0)
    tax_rate: Mapped[float] = mapped_column(Float, default=0.0)
    tax_amount: Mapped[float] = mapped_column(Float, default=0.0)
    total_price: Mapped[float] = mapped_column(Float, nullable=False)

    # ── Sort order ──────────────────────────────────────────
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    def __repr__(self) -> str:
        return f"<InvoiceItem Invoice#{self.invoice_id} {self.description[:30]}>"
