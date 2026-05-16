"""
Email Template Model
────────────────────
Reusable email templates for campaigns, newsletters, and transactional emails.
"""

from sqlalchemy import String, Text, Boolean, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class EmailTemplate(TimestampMixin, Base):
    __tablename__ = "mkt_email_templates"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    subject: Mapped[str] = mapped_column(String(500), nullable=False)

    # ── Template Type ───────────────────────────────────────
    template_type: Mapped[str] = mapped_column(String(50), default="campaign")
    # campaign, newsletter, transactional, welcome, follow_up, promo

    # ── Content ─────────────────────────────────────────────
    body_html: Mapped[str | None] = mapped_column(Text, nullable=True)
    body_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    preview_text: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # ── Sender ──────────────────────────────────────────────
    from_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    from_email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    reply_to: Mapped[str | None] = mapped_column(String(255), nullable=True)

    # ── Variables / Merge Tags ──────────────────────────────
    variables: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ── Stats ───────────────────────────────────────────────
    times_used: Mapped[int] = mapped_column(Integer, default=0)

    # ── Status ──────────────────────────────────────────────
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # ── Owner ───────────────────────────────────────────────
    owner_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=True
    )

    def __repr__(self) -> str:
        return f"<EmailTemplate {self.name}>"
