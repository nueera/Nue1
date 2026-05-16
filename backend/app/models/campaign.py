"""
Campaign Model
──────────────
Marketing campaigns — organized efforts across channels
to promote products, generate leads, or build brand awareness.
"""

from sqlalchemy import String, Text, Float, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class Campaign(TimestampMixin, Base):
    __tablename__ = "mkt_campaigns"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    code: Mapped[str | None] = mapped_column(String(100), unique=True, index=True, nullable=True)  # SUMMER2026

    # ── Campaign Type ───────────────────────────────────────
    campaign_type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    # email, social_media, ppc, seo, content, referral, event, influencer, sms, multi_channel

    # ── Channel ─────────────────────────────────────────────
    channel_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("mkt_channels.id"), nullable=True
    )

    # ── Objective ───────────────────────────────────────────
    objective: Mapped[str] = mapped_column(String(100), default="awareness")
    # awareness, lead_generation, conversion, retention, upsell, brand_building

    # ── Schedule ────────────────────────────────────────────
    start_date: Mapped[str] = mapped_column(String(50), nullable=False)
    end_date: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # ── Status ──────────────────────────────────────────────
    status: Mapped[str] = mapped_column(String(50), default="draft")
    # draft, scheduled, active, paused, completed, cancelled

    # ── Budget ──────────────────────────────────────────────
    budget: Mapped[float | None] = mapped_column(Float, nullable=True)
    spent: Mapped[float] = mapped_column(Float, default=0.0)
    currency: Mapped[str] = mapped_column(String(10), default="INR")

    # ── Target Audience ─────────────────────────────────────
    target_audience: Mapped[str | None] = mapped_column(Text, nullable=True)  # JSON: demographics, interests, etc.
    target_location: Mapped[str | None] = mapped_column(String(255), nullable=True)  # India, US, Global, etc.

    # ── Performance Metrics ─────────────────────────────────
    impressions: Mapped[int] = mapped_column(Integer, default=0)
    clicks: Mapped[int] = mapped_column(Integer, default=0)
    conversions: Mapped[int] = mapped_column(Integer, default=0)
    leads_generated: Mapped[int] = mapped_column(Integer, default=0)
    revenue_attributed: Mapped[float] = mapped_column(Float, default=0.0)

    # ── Content ─────────────────────────────────────────────
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    tags: Mapped[str | None] = mapped_column(String(500), nullable=True)  # comma-separated tags

    # ── Link to CRM ─────────────────────────────────────────
    deal_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("deals.id"), nullable=True
    )

    # ── Owner ───────────────────────────────────────────────
    owner_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<Campaign {self.name} [{self.status}]>"
