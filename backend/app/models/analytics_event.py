"""
Analytics Event Model
─────────────────────
Tracks marketing events: email opens, clicks, form submissions,
conversions, etc. Used for campaign performance reporting.
"""

from sqlalchemy import String, Text, Float, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class AnalyticsEvent(TimestampMixin, Base):
    __tablename__ = "mkt_analytics_events"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    # ── Event Type ──────────────────────────────────────────
    event_type: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    # page_view, click, email_open, email_click, form_submit, conversion,
    # purchase, signup, download, social_share, ad_impression, ad_click

    # ── Source ──────────────────────────────────────────────
    source: Mapped[str | None] = mapped_column(String(100), nullable=True, index=True)
    # email, instagram, google_ads, facebook, linkedin, organic, direct, referral

    # ── Medium ──────────────────────────────────────────────
    medium: Mapped[str | None] = mapped_column(String(100), nullable=True)
    # cpc, organic, email, social, referral, affiliate

    # ── Campaign Link ───────────────────────────────────────
    campaign_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("mkt_campaigns.id"), nullable=True, index=True
    )
    campaign_name: Mapped[str | None] = mapped_column(String(255), nullable=True)

    # ── Content Link ────────────────────────────────────────
    content_page_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("mkt_content_pages.id"), nullable=True
    )

    # ── User / Visitor ──────────────────────────────────────
    visitor_id: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)  # cookie / anonymous ID
    contact_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("contacts.id"), nullable=True
    )
    ip_address: Mapped[str | None] = mapped_column(String(50), nullable=True)
    user_agent: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # ── Event Data ──────────────────────────────────────────
    url: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    referrer: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    utm_source: Mapped[str | None] = mapped_column(String(100), nullable=True)
    utm_medium: Mapped[str | None] = mapped_column(String(100), nullable=True)
    utm_campaign: Mapped[str | None] = mapped_column(String(100), nullable=True)
    utm_content: Mapped[str | None] = mapped_column(String(100), nullable=True)

    # ── Value ───────────────────────────────────────────────
    event_value: Mapped[float | None] = mapped_column(Float, nullable=True)  # revenue from conversion
    metadata: Mapped[str | None] = mapped_column(Text, nullable=True)  # JSON for extra data

    # ── Timestamp ───────────────────────────────────────────
    event_date: Mapped[str] = mapped_column(String(50), nullable=False, index=True)

    def __repr__(self) -> str:
        return f"<AnalyticsEvent {self.event_type} from {self.source}>"
