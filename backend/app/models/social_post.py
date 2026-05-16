"""
Social Post Model
─────────────────
Scheduled and published social media posts across platforms.
"""

from sqlalchemy import String, Text, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class SocialPost(TimestampMixin, Base):
    __tablename__ = "mkt_social_posts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    # ── Platform ────────────────────────────────────────────
    platform: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    # instagram, facebook, linkedin, twitter, youtube, tiktok, pinterest

    # ── Content ─────────────────────────────────────────────
    caption: Mapped[str] = mapped_column(Text, nullable=False)
    hashtags: Mapped[str | None] = mapped_column(String(1000), nullable=True)  # #marketing #growth
    media_url: Mapped[str | None] = mapped_column(String(500), nullable=True)  # image/video URL
    media_type: Mapped[str | None] = mapped_column(String(50), nullable=True)  # image, video, carousel, story, reel
    link_url: Mapped[str | None] = mapped_column(String(500), nullable=True)  # link in bio / CTA link

    # ── Schedule ────────────────────────────────────────────
    scheduled_at: Mapped[str | None] = mapped_column(String(50), nullable=True)  # ISO datetime
    published_at: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # ── Status ──────────────────────────────────────────────
    status: Mapped[str] = mapped_column(String(50), default="draft")
    # draft, scheduled, published, failed, archived

    # ── Link to Campaign ────────────────────────────────────
    campaign_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("mkt_campaigns.id"), nullable=True
    )

    # ── Performance Metrics ─────────────────────────────────
    likes: Mapped[int] = mapped_column(Integer, default=0)
    comments: Mapped[int] = mapped_column(Integer, default=0)
    shares: Mapped[int] = mapped_column(Integer, default=0)
    impressions: Mapped[int] = mapped_column(Integer, default=0)
    reach: Mapped[int] = mapped_column(Integer, default=0)
    saves: Mapped[int] = mapped_column(Integer, default=0)
    clicks: Mapped[int] = mapped_column(Integer, default=0)

    # ── Owner ───────────────────────────────────────────────
    owner_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<SocialPost {self.platform} [{self.status}]>"
