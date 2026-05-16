"""
Content Page Model
──────────────────
Blog posts, landing pages, and SEO-managed content.
"""

from sqlalchemy import String, Text, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class ContentPage(TimestampMixin, Base):
    __tablename__ = "mkt_content_pages"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(500), nullable=False, index=True)
    slug: Mapped[str] = mapped_column(String(500), unique=True, index=True, nullable=False)

    # ── Content Type ────────────────────────────────────────
    content_type: Mapped[str] = mapped_column(String(50), default="blog")
    # blog, landing_page, product_page, documentation, case_study, whitepaper

    # ── Content ─────────────────────────────────────────────
    body: Mapped[str | None] = mapped_column(Text, nullable=True)  # HTML or markdown body
    excerpt: Mapped[str | None] = mapped_column(Text, nullable=True)  # Short summary
    featured_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # ── SEO ─────────────────────────────────────────────────
    meta_title: Mapped[str | None] = mapped_column(String(500), nullable=True)
    meta_description: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    focus_keyword: Mapped[str | None] = mapped_column(String(255), nullable=True)
    canonical_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # ── Author ──────────────────────────────────────────────
    author_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    # ── Status ──────────────────────────────────────────────
    status: Mapped[str] = mapped_column(String(50), default="draft")
    # draft, review, published, archived

    published_at: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # ── Performance ─────────────────────────────────────────
    page_views: Mapped[int] = mapped_column(Integer, default=0)
    unique_visitors: Mapped[int] = mapped_column(Integer, default=0)
    avg_time_on_page: Mapped[float] = mapped_column(default=0.0)  # seconds
    bounce_rate: Mapped[float] = mapped_column(default=0.0)  # percentage

    # ── Categories / Tags ───────────────────────────────────
    category: Mapped[str | None] = mapped_column(String(100), nullable=True)
    tags: Mapped[str | None] = mapped_column(String(500), nullable=True)  # comma-separated

    # ── Link to Campaign ────────────────────────────────────
    campaign_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("mkt_campaigns.id"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<ContentPage {self.title} [{self.content_type}]>"
