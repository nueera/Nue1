"""
Supplier Model
──────────────
Vendors / suppliers who provide products and materials.
"""

from sqlalchemy import String, Text, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class Supplier(TimestampMixin, Base):
    __tablename__ = "erp_suppliers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    code: Mapped[str | None] = mapped_column(String(50), unique=True, index=True, nullable=True)

    # ── Contact Info ────────────────────────────────────────
    contact_person: Mapped[str | None] = mapped_column(String(255), nullable=True)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # ── Address ─────────────────────────────────────────────
    address: Mapped[str | None] = mapped_column(Text, nullable=True)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    country: Mapped[str | None] = mapped_column(String(100), nullable=True)
    postal_code: Mapped[str | None] = mapped_column(String(20), nullable=True)

    # ── Business Details ────────────────────────────────────
    website: Mapped[str | None] = mapped_column(String(500), nullable=True)
    tax_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    payment_terms: Mapped[str | None] = mapped_column(String(255), nullable=True)  # Net 30, Net 60, etc.
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ── Rating & Status ─────────────────────────────────────
    rating: Mapped[int | None] = mapped_column(Integer, nullable=True)  # 1-5
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # ── Owner ───────────────────────────────────────────────
    owner_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<Supplier {self.name}>"
