"""
Schemas Package (Pydantic)
──────────────────────────
Request / Response models for API validation.
"""

from app.schemas.user import *
from app.schemas.contact import *
from app.schemas.account import *
from app.schemas.lead import *
from app.schemas.deal import *

# ERP Schemas
from app.schemas.category import *
from app.schemas.supplier import *
from app.schemas.warehouse import *
from app.schemas.product import *
from app.schemas.inventory import *
from app.schemas.purchase_order import *
from app.schemas.sales_order import *

# Finance Schemas
from app.schemas.finance_account import *
from app.schemas.tax_rate import *
from app.schemas.invoice import *
from app.schemas.expense import *
from app.schemas.payment import *
from app.schemas.journal_entry import *

# Marketing Schemas
from app.schemas.channel import *
from app.schemas.campaign import *
from app.schemas.email_template import *
from app.schemas.social_post import *
from app.schemas.content_page import *
from app.schemas.analytics_event import *
