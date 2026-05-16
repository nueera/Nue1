"""
Channel Model
─────────────
Marketing channels — where campaigns are distributed.
E.g. Email, Instagram, Google Ads, Facebook, LinkedIn, SMS, WhatsApp, SEO, etc.
"""

from sqlalchemy import String, Text, Float, Boolean, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class Channel(TimestampMixin, Base):
    __tablename__ = "mkt_channels"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)  # Email, Instagram, Google Ads
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)  # email, instagram, google_ads
    channel_type: Mapped[str] = mapped_column(String(50), nullable=False)
    # organic, paid, social, email, sms, referral, direct

    # ── Channel Details ─────────────────────────────────────
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    icon_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    color: Mapped[str | None] = mapped_column(String(20), nullable=True)  # UI color code

    # ── Budget ──────────────────────────────────────────────
    monthly_budget: Mapped[float | None] = mapped_column(Float, nullable=True)
    spent_this_month: Mapped[float] = mapped_column(Float, default=0.0)

    # ── Status ──────────────────────────────────────────────
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_paid: Mapped[bool] = mapped_column(Boolean, default=False)  # paid vs organic channel

    # ── Config (JSON-like metadata) ─────────────────────────
    config: Mapped[str | None] = mapped_column(Text, nullable=True)  # JSON string for channel-specific settings

    def __repr__(self) -> str:
        return f"<Channel {self.name} [{self.channel_type}]>"
