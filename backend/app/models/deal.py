"""
Deal Model
──────────
CRM Deal — a sales opportunity with value and pipeline stage.
"""

from sqlalchemy import String, Text, Integer, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class Deal(TimestampMixin, Base):
    __tablename__ = "deals"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    value: Mapped[float | None] = mapped_column(Float, nullable=True)
    stage: Mapped[str] = mapped_column(String(50), default="prospecting")  
    # Stages: prospecting, qualification, proposal, negotiation, closed_won, closed_lost
    probability: Mapped[int | None] = mapped_column(Integer, nullable=True)  # 0-100
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    close_date: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # ── Relationships ───────────────────────────────────────
    account_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("accounts.id"), nullable=True
    )
    contact_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("contacts.id"), nullable=True
    )
    owner_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<Deal {self.title} [{self.stage}]>"
