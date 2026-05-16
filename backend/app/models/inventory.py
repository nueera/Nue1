"""
Inventory Model
───────────────
Current stock levels per product per warehouse.
Tracks quantity available, reserved, and on order.
"""

from sqlalchemy import Integer, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class Inventory(TimestampMixin, Base):
    __tablename__ = "erp_inventory"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    # ── What & Where ────────────────────────────────────────
    product_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("erp_products.id"), nullable=False, index=True
    )
    warehouse_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("erp_warehouses.id"), nullable=False, index=True
    )

    # ── Stock Quantities ────────────────────────────────────
    quantity_on_hand: Mapped[int] = mapped_column(Integer, default=0)    # total available
    quantity_reserved: Mapped[int] = mapped_column(Integer, default=0)   # reserved for orders
    quantity_available: Mapped[int] = mapped_column(Integer, default=0)  # on_hand - reserved
    quantity_on_order: Mapped[int] = mapped_column(Integer, default=0)   # incoming from POs

    # ── Batch / Lot Tracking ────────────────────────────────
    batch_number: Mapped[str | None] = mapped_column(String(100), nullable=True)
    expiry_date: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # ── Location within warehouse ───────────────────────────
    bin_location: Mapped[str | None] = mapped_column(String(100), nullable=True)  # A1-B2-C3

    # ── Status ──────────────────────────────────────────────
    status: Mapped[str] = mapped_column(String(50), default="in_stock")  
    # in_stock, low_stock, out_of_stock, discontinued

    class Config:
        # Unique constraint: one inventory record per product per warehouse
        pass

    def __repr__(self) -> str:
        return f"<Inventory Product#{self.product_id} Warehouse#{self.warehouse_id} qty={self.quantity_on_hand}>"
