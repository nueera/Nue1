"""
Chart of Accounts Model
───────────────────────
Represents the accounting structure: Assets, Liabilities, Income, Expenses, Equity.
This is the foundation of double-entry bookkeeping.
"""

from sqlalchemy import String, Text, Integer, Float, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import TimestampMixin


class FinanceAccount(TimestampMixin, Base):
    __tablename__ = "finance_accounts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)  # e.g. "1000", "2000"
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)

    # ── Account Type ────────────────────────────────────────
    # asset, liability, income, expense, equity
    account_type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)

    # ── Sub-type for more granularity ───────────────────────
    # Asset: current_asset, fixed_asset, bank, cash, accounts_receivable
    # Liability: current_liability, long_term_liability, accounts_payable
    # Income: operating_income, other_income
    # Expense: operating_expense, other_expense, cost_of_goods_sold
    # Equity: owner_equity, retained_earnings
    sub_type: Mapped[str | None] = mapped_column(String(100), nullable=True)

    # ── Hierarchy (parent account) ──────────────────────────
    parent_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("finance_accounts.id"), nullable=True
    )

    # ── Balance ─────────────────────────────────────────────
    balance: Mapped[float] = mapped_column(Float, default=0.0)

    # ── Description ─────────────────────────────────────────
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ── Status ──────────────────────────────────────────────
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # ── Currency ────────────────────────────────────────────
    currency: Mapped[str] = mapped_column(String(10), default="INR")

    def __repr__(self) -> str:
        return f"<FinanceAccount {self.code} - {self.name} [{self.account_type}]>"
