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
