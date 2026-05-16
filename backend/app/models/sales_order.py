"""
Sales Order Model
─────────────────
Customer orders for selling products.
"""

from sqlalchemy import String, Text, Float, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class SalesOrder(TimestampMixin, Base):
    __tablename__ = "erp_sales_orders"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    so_number: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)

    # ── Who we're selling to ────────────────────────────────
    customer_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("accounts.id"), nullable=True, index=True
    )
    contact_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("contacts.id"), nullable=True
    )
    customer_name: Mapped[str | None] = mapped_column(String(255), nullable=True)  # walk-in customer

    # ── Which warehouse ships ───────────────────────────────
    warehouse_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("erp_warehouses.id"), nullable=False
    )

    # ── Order Dates ─────────────────────────────────────────
    order_date: Mapped[str] = mapped_column(String(50), nullable=False)
    expected_ship_date: Mapped[str | None] = mapped_column(String(50), nullable=True)
    actual_ship_date: Mapped[str | None] = mapped_column(String(50), nullable=True)
    delivery_date: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # ── Status ──────────────────────────────────────────────
    status: Mapped[str] = mapped_column(String(50), default="draft")
    # draft, confirmed, picking, packed, shipped, delivered, cancelled, returned

    # ── Financial ───────────────────────────────────────────
    subtotal: Mapped[float] = mapped_column(Float, default=0.0)
    tax_amount: Mapped[float] = mapped_column(Float, default=0.0)
    shipping_cost: Mapped[float] = mapped_column(Float, default=0.0)
    discount_amount: Mapped[float] = mapped_column(Float, default=0.0)
    total_amount: Mapped[float] = mapped_column(Float, default=0.0)
    currency: Mapped[str] = mapped_column(String(10), default="INR")

    # ── Payment ─────────────────────────────────────────────
    payment_status: Mapped[str] = mapped_column(String(50), default="unpaid")  # unpaid, partial, paid
    payment_method: Mapped[str | None] = mapped_column(String(100), nullable=True)

    # ── Shipping Address ────────────────────────────────────
    shipping_address: Mapped[str | None] = mapped_column(Text, nullable=True)
    billing_address: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ── Notes ───────────────────────────────────────────────
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ── Who created it ──────────────────────────────────────
    owner_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<SO {self.so_number} [{self.status}]>"


class SalesOrderItem(TimestampMixin, Base):
    __tablename__ = "erp_sales_order_items"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    sales_order_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("erp_sales_orders.id"), nullable=False, index=True
    )
    product_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("erp_products.id"), nullable=False
    )

    # ── Quantities ──────────────────────────────────────────
    quantity_ordered: Mapped[int] = mapped_column(Integer, nullable=False)
    quantity_shipped: Mapped[int] = mapped_column(Integer, default=0)
    quantity_returned: Mapped[int] = mapped_column(Integer, default=0)

    # ── Pricing ─────────────────────────────────────────────
    unit_price: Mapped[float] = mapped_column(Float, nullable=False)
    tax_rate: Mapped[float] = mapped_column(Float, default=0.0)
    discount_percent: Mapped[float] = mapped_column(Float, default=0.0)
    total_price: Mapped[float] = mapped_column(Float, nullable=False)

    # ── Notes ───────────────────────────────────────────────
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<SOItem SO#{self.sales_order_id} Product#{self.product_id} qty={self.quantity_ordered}>"
