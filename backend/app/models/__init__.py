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

# ERP Models
from app.models.category import Category
from app.models.supplier import Supplier
from app.models.warehouse import Warehouse
from app.models.product import Product
from app.models.inventory import Inventory
from app.models.purchase_order import PurchaseOrder, PurchaseOrderItem
from app.models.sales_order import SalesOrder, SalesOrderItem

__all__ = [
    "User", "Contact", "Account", "Lead", "Deal",
    "Category", "Supplier", "Warehouse", "Product", "Inventory",
    "PurchaseOrder", "PurchaseOrderItem",
    "SalesOrder", "SalesOrderItem",
]
