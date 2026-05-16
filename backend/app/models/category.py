"""
Category Model
──────────────
Product categories for organizing inventory items.
Supports hierarchical (parent-child) categories.
"""

from sqlalchemy import String, Integer, ForeignKey, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class Category(TimestampMixin, Base):
    __tablename__ = "erp_categories"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    slug: Mapped[str | None] = mapped_column(String(255), unique=True, index=True, nullable=True)

    # ── Hierarchical: parent category ───────────────────────
    parent_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("erp_categories.id"), nullable=True
    )

    # ── Sort order for UI display ───────────────────────────
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    # ── Status ──────────────────────────────────────────────
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    def __repr__(self) -> str:
        return f"<Category {self.name}>"
