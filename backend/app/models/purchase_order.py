"""
Purchase Order Model
────────────────────
Orders placed to suppliers for restocking inventory.
"""

from sqlalchemy import String, Text, Float, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class PurchaseOrder(TimestampMixin, Base):
    __tablename__ = "erp_purchase_orders"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    po_number: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)

    # ── Who we're buying from ───────────────────────────────
    supplier_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("erp_suppliers.id"), nullable=False, index=True
    )

    # ── Which warehouse ─────────────────────────────────────
    warehouse_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("erp_warehouses.id"), nullable=False
    )

    # ── Order Details ───────────────────────────────────────
    order_date: Mapped[str] = mapped_column(String(50), nullable=False)       # ISO date
    expected_delivery_date: Mapped[str | None] = mapped_column(String(50), nullable=True)
    actual_delivery_date: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # ── Status ──────────────────────────────────────────────
    status: Mapped[str] = mapped_column(String(50), default="draft")
    # draft, submitted, approved, partial, received, cancelled

    # ── Financial ───────────────────────────────────────────
    subtotal: Mapped[float] = mapped_column(Float, default=0.0)
    tax_amount: Mapped[float] = mapped_column(Float, default=0.0)
    shipping_cost: Mapped[float] = mapped_column(Float, default=0.0)
    total_amount: Mapped[float] = mapped_column(Float, default=0.0)
    currency: Mapped[str] = mapped_column(String(10), default="INR")

    # ── Payment ─────────────────────────────────────────────
    payment_status: Mapped[str] = mapped_column(String(50), default="unpaid")  # unpaid, partial, paid
    payment_method: Mapped[str | None] = mapped_column(String(100), nullable=True)

    # ── Notes ───────────────────────────────────────────────
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    internal_notes: Mapped[str | None] = mapped_column(Text, nullable=True)  # not visible to supplier

    # ── Who created it ──────────────────────────────────────
    owner_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<PO {self.po_number} [{self.status}]>"


class PurchaseOrderItem(TimestampMixin, Base):
    __tablename__ = "erp_purchase_order_items"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    purchase_order_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("erp_purchase_orders.id"), nullable=False, index=True
    )
    product_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("erp_products.id"), nullable=False
    )

    # ── Quantities ──────────────────────────────────────────
    quantity_ordered: Mapped[int] = mapped_column(Integer, nullable=False)
    quantity_received: Mapped[int] = mapped_column(Integer, default=0)

    # ── Pricing ─────────────────────────────────────────────
    unit_price: Mapped[float] = mapped_column(Float, nullable=False)
    tax_rate: Mapped[float] = mapped_column(Float, default=0.0)
    discount_percent: Mapped[float] = mapped_column(Float, default=0.0)
    total_price: Mapped[float] = mapped_column(Float, nullable=False)

    # ── Notes ───────────────────────────────────────────────
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<POItem PO#{self.purchase_order_id} Product#{self.product_id} qty={self.quantity_ordered}>"
