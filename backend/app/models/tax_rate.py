"""
Tax Rate Model
──────────────
GST / tax rates applicable to invoices and expenses.
"""

from sqlalchemy import String, Float, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class TaxRate(TimestampMixin, Base):
    __tablename__ = "finance_tax_rates"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)  # GST 18%, GST 12%, etc.
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)  # GST18, GST12, etc.
    rate: Mapped[float] = mapped_column(Float, nullable=False)  # Percentage: 18.0, 12.0, 5.0, 0.0
    tax_type: Mapped[str] = mapped_column(String(50), default="gst")  # gst, vat, sales_tax, service_tax, cess
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # ── GST specific fields ─────────────────────────────────
    cgst_rate: Mapped[float | None] = mapped_column(Float, nullable=True)  # Central GST
    sgst_rate: Mapped[float | None] = mapped_column(Float, nullable=True)  # State GST
    igst_rate: Mapped[float | None] = mapped_column(Float, nullable=True)  # Integrated GST

    def __repr__(self) -> str:
        return f"<TaxRate {self.code} {self.rate}%>"
