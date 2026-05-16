"""
Models Package
──────────────
Import all models here so Alembic can detect them.
"""

from app.models.user import User
from app.models.contact import Contact
from app.models.account import Account
from app.models.lead import Lead
from app.models.deal import Deal

__all__ = ["User", "Contact", "Account", "Lead", "Deal"]
