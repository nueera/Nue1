"""
Product Model
─────────────
Items that are tracked in inventory — goods, services, or materials.
"""

from sqlalchemy import String, Text, Float, Integer, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class Product(TimestampMixin, Base):
    __tablename__ = "erp_products"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    sku: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    barcode: Mapped[str | None] = mapped_column(String(100), unique=True, nullable=True)

    # ── Classification ──────────────────────────────────────
    product_type: Mapped[str] = mapped_column(String(50), default="physical")  
    # physical, digital, service, bundle

    category_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("erp_categories.id"), nullable=True
    )
    supplier_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("erp_suppliers.id"), nullable=True
    )

    # ── Pricing ─────────────────────────────────────────────
    cost_price: Mapped[float | None] = mapped_column(Float, nullable=True)       # what we pay
    selling_price: Mapped[float | None] = mapped_column(Float, nullable=True)    # what we charge
    mrp: Mapped[float | None] = mapped_column(Float, nullable=True)              # maximum retail price
    tax_rate: Mapped[float | None] = mapped_column(Float, nullable=True)         # % tax

    # ── Physical Attributes ─────────────────────────────────
    unit: Mapped[str] = mapped_column(String(50), default="piece")  # piece, kg, liter, meter, etc.
    weight: Mapped[float | None] = mapped_column(Float, nullable=True)   # in kg
    dimensions: Mapped[str | None] = mapped_column(String(100), nullable=True)  # LxWxH

    # ── Stock Settings ──────────────────────────────────────
    min_stock_level: Mapped[int] = mapped_column(Integer, default=0)  # reorder point
    max_stock_level: Mapped[int | None] = mapped_column(Integer, nullable=True)
    track_inventory: Mapped[bool] = mapped_column(Boolean, default=True)

    # ── Description & Media ─────────────────────────────────
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # ── Status ──────────────────────────────────────────────
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # ── Owner ───────────────────────────────────────────────
    owner_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<Product {self.sku} - {self.name}>"
