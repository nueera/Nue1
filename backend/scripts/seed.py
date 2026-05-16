"""
Database Seed Script
────────────────────
Run: python -m scripts.seed
Populates the database with sample data for development.
"""

import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.core.security import get_password_hash
from app.models.user import User
from app.models.account import Account
from app.models.contact import Contact
from app.models.lead import Lead
from app.models.deal import Deal
from app.models.category import Category
from app.models.supplier import Supplier
from app.models.warehouse import Warehouse
from app.models.product import Product
from app.models.inventory import Inventory
from app.models.purchase_order import PurchaseOrder, PurchaseOrderItem
from app.models.sales_order import SalesOrder, SalesOrderItem


async def seed_all():
    async with AsyncSessionLocal() as session:
        print("🌱 Seeding database...")

        # ── Users ───────────────────────────────────────────
        admin = User(
            email="admin@nuegrowth.com",
            hashed_password=get_password_hash("admin123"),
            full_name="Admin User",
            role="admin",
            is_superuser=True,
        )
        demo = User(
            email="demo@nuegrowth.com",
            hashed_password=get_password_hash("demo123"),
            full_name="Demo User",
            role="user",
        )
        session.add_all([admin, demo])
        await session.flush()
        print("  ✅ Users created (2)")

        # ── CRM: Accounts ──────────────────────────────────
        accounts = [
            Account(name="Acme Corp", industry="Technology", website="https://acme.com", owner_id=admin.id),
            Account(name="Globex Inc", industry="Finance", website="https://globex.com", owner_id=admin.id),
            Account(name="Initech", industry="Consulting", owner_id=demo.id),
        ]
        session.add_all(accounts)
        await session.flush()
        print("  ✅ Accounts created (3)")

        # ── CRM: Contacts ──────────────────────────────────
        contacts = [
            Contact(first_name="Rahul", last_name="Sharma", email="rahul@acme.com", phone="+91-9876543210", account_id=accounts[0].id, owner_id=admin.id),
            Contact(first_name="Priya", last_name="Patel", email="priya@globex.com", phone="+91-9876543211", account_id=accounts[1].id, owner_id=admin.id),
            Contact(first_name="Amit", last_name="Kumar", email="amit@initech.com", account_id=accounts[2].id, owner_id=demo.id),
        ]
        session.add_all(contacts)
        await session.flush()
        print("  ✅ Contacts created (3)")

        # ── CRM: Leads ─────────────────────────────────────
        leads = [
            Lead(first_name="Sneha", last_name="Reddy", email="sneha@startup.io", source="web", status="new", owner_id=admin.id),
            Lead(first_name="Vikram", last_name="Singh", email="vikram@corp.in", source="referral", status="contacted", owner_id=demo.id),
            Lead(first_name="Anita", last_name="Desai", email="anita@enterprise.com", source="cold-call", status="qualified", owner_id=admin.id),
        ]
        session.add_all(leads)
        await session.flush()
        print("  ✅ Leads created (3)")

        # ── CRM: Deals ─────────────────────────────────────
        deals = [
            Deal(title="Acme Enterprise License", value=150000, stage="negotiation", probability=75, account_id=accounts[0].id, contact_id=contacts[0].id, owner_id=admin.id),
            Deal(title="Globex Consulting Package", value=75000, stage="proposal", probability=50, account_id=accounts[1].id, contact_id=contacts[1].id, owner_id=admin.id),
            Deal(title="Initech SaaS Subscription", value=25000, stage="prospecting", probability=20, account_id=accounts[2].id, contact_id=contacts[2].id, owner_id=demo.id),
        ]
        session.add_all(deals)
        await session.flush()
        print("  ✅ Deals created (3)")

        # ════════════════════════════════════════════════════
        #  ERP DATA
        # ════════════════════════════════════════════════════

        # ── ERP: Categories ─────────────────────────────────
        categories = [
            Category(name="Electronics", slug="electronics", description="Electronic devices and components", sort_order=1),
            Category(name="Furniture", slug="furniture", description="Office and warehouse furniture", sort_order=2),
            Category(name="Software", slug="software", description="Digital products and licenses", sort_order=3),
            Category(name="Raw Materials", slug="raw-materials", description="Manufacturing raw materials", sort_order=4),
            Category(name="Office Supplies", slug="office-supplies", description="Stationery and office consumables", sort_order=5),
        ]
        session.add_all(categories)
        await session.flush()
        print("  ✅ Categories created (5)")

        # ── ERP: Suppliers ──────────────────────────────────
        suppliers = [
            Supplier(name="TechVista Supplies", code="TVS-001", contact_person="Kiran Rao", email="kiran@techvista.com", phone="+91-8012345678", city="Bangalore", country="India", payment_terms="Net 30", rating=4, owner_id=admin.id),
            Supplier(name="National Furniture Co", code="NFC-001", contact_person="Deepak Joshi", email="deepak@natfurniture.com", phone="+91-1123456789", city="Delhi", country="India", payment_terms="Net 45", rating=5, owner_id=admin.id),
            Supplier(name="CloudSoft Licensing", code="CSL-001", contact_person="Meera Nair", email="meera@cloudsoft.io", phone="+91-4012345678", city="Hyderabad", country="India", payment_terms="Net 15", rating=3, owner_id=demo.id),
        ]
        session.add_all(suppliers)
        await session.flush()
        print("  ✅ Suppliers created (3)")

        # ── ERP: Warehouses ─────────────────────────────────
        warehouses = [
            Warehouse(name="Main Warehouse - Mumbai", code="WH-MUM-01", address="Plot 45, MIDC, Andheri East", city="Mumbai", state="Maharashtra", country="India", postal_code="400093", manager_name="Sunil Mehta", capacity=10000),
            Warehouse(name="Delhi Distribution Center", code="WH-Del-01", address="Block B, Sector 63, Noida", city="Noida", state="Uttar Pradesh", country="India", postal_code="201301", manager_name="Ritu Agarwal", capacity=5000),
            Warehouse(name="Bangalore Hub", code="WH-BLR-01", address="No 78, Electronic City", city="Bangalore", state="Karnataka", country="India", postal_code="560100", manager_name="Arjun Reddy", capacity=7500),
        ]
        session.add_all(warehouses)
        await session.flush()
        print("  ✅ Warehouses created (3)")

        # ── ERP: Products ───────────────────────────────────
        products = [
            Product(name="Laptop Pro 15\"", sku="LP-PRO-15", product_type="physical", category_id=categories[0].id, supplier_id=suppliers[0].id, cost_price=45000.0, selling_price=55000.0, mrp=59999.0, tax_rate=18.0, unit="piece", weight=2.0, min_stock_level=10, description="15-inch professional laptop", owner_id=admin.id),
            Product(name="Wireless Mouse", sku="WM-BASIC-01", product_type="physical", category_id=categories[0].id, supplier_id=suppliers[0].id, cost_price=350.0, selling_price=599.0, mrp=699.0, tax_rate=18.0, unit="piece", weight=0.1, min_stock_level=50, description="Ergonomic wireless mouse", owner_id=admin.id),
            Product(name="Standing Desk", sku="FD-STAND-01", product_type="physical", category_id=categories[1].id, supplier_id=suppliers[1].id, cost_price=15000.0, selling_price=22000.0, mrp=25000.0, tax_rate=18.0, unit="piece", weight=35.0, min_stock_level=5, description="Electric height-adjustable standing desk", owner_id=admin.id),
            Product(name="Office Chair Premium", sku="FD-CHR-01", product_type="physical", category_id=categories[1].id, supplier_id=suppliers[1].id, cost_price=8000.0, selling_price=12000.0, mrp=14000.0, tax_rate=18.0, unit="piece", weight=15.0, min_stock_level=10, description="Ergonomic office chair with lumbar support", owner_id=admin.id),
            Product(name="Project Management Suite", sku="SW-PMS-01", product_type="digital", category_id=categories[2].id, supplier_id=suppliers[2].id, cost_price=2000.0, selling_price=5000.0, tax_rate=18.0, unit="license", min_stock_level=0, track_inventory=False, description="Annual license for project management", owner_id=demo.id),
            Product(name="A4 Paper Ream (500 sheets)", sku="OS-PAP-01", product_type="physical", category_id=categories[4].id, supplier_id=suppliers[1].id, cost_price=200.0, selling_price=320.0, mrp=350.0, tax_rate=12.0, unit="ream", weight=2.5, min_stock_level=100, description="Premium A4 80 GSM paper ream", owner_id=demo.id),
        ]
        session.add_all(products)
        await session.flush()
        print("  ✅ Products created (6)")

        # ── ERP: Inventory ──────────────────────────────────
        inventory = [
            # Mumbai warehouse
            Inventory(product_id=products[0].id, warehouse_id=warehouses[0].id, quantity_on_hand=25, quantity_reserved=5, quantity_available=20, quantity_on_order=0, status="in_stock", bin_location="A1-B1"),
            Inventory(product_id=products[1].id, warehouse_id=warehouses[0].id, quantity_on_hand=200, quantity_reserved=30, quantity_available=170, quantity_on_order=0, status="in_stock", bin_location="A2-B3"),
            Inventory(product_id=products[2].id, warehouse_id=warehouses[0].id, quantity_on_hand=3, quantity_reserved=1, quantity_available=2, quantity_on_order=10, status="low_stock", bin_location="C1-A1"),
            Inventory(product_id=products[5].id, warehouse_id=warehouses[0].id, quantity_on_hand=500, quantity_reserved=50, quantity_available=450, quantity_on_order=0, status="in_stock", bin_location="D2-B1"),
            # Delhi warehouse
            Inventory(product_id=products[0].id, warehouse_id=warehouses[1].id, quantity_on_hand=8, quantity_reserved=3, quantity_available=5, quantity_on_order=20, status="low_stock", bin_location="A1-B2"),
            Inventory(product_id=products[3].id, warehouse_id=warehouses[1].id, quantity_on_hand=15, quantity_reserved=2, quantity_available=13, quantity_on_order=0, status="in_stock", bin_location="B1-A1"),
            # Bangalore warehouse
            Inventory(product_id=products[4].id, warehouse_id=warehouses[2].id, quantity_on_hand=0, quantity_reserved=0, quantity_available=0, quantity_on_order=0, status="in_stock", bin_location="N/A"),
            Inventory(product_id=products[1].id, warehouse_id=warehouses[2].id, quantity_on_hand=0, quantity_reserved=0, quantity_available=0, quantity_on_order=100, status="out_of_stock", bin_location="A2-B1"),
        ]
        session.add_all(inventory)
        await session.flush()
        print("  ✅ Inventory created (8)")

        # ── ERP: Purchase Orders ────────────────────────────
        po1 = PurchaseOrder(
            po_number="PO-2026-001",
            supplier_id=suppliers[0].id,
            warehouse_id=warehouses[0].id,
            order_date="2026-05-10",
            expected_delivery_date="2026-05-20",
            status="approved",
            subtotal=450000.0,
            tax_amount=81000.0,
            shipping_cost=5000.0,
            total_amount=536000.0,
            payment_status="unpaid",
            owner_id=admin.id,
        )
        session.add(po1)
        await session.flush()

        po1_items = [
            PurchaseOrderItem(purchase_order_id=po1.id, product_id=products[0].id, quantity_ordered=10, quantity_received=0, unit_price=45000.0, tax_rate=18.0, total_price=450000.0),
        ]
        session.add_all(po1_items)
        await session.flush()

        po2 = PurchaseOrder(
            po_number="PO-2026-002",
            supplier_id=suppliers[1].id,
            warehouse_id=warehouses[0].id,
            order_date="2026-05-12",
            expected_delivery_date="2026-05-25",
            status="submitted",
            subtotal=75000.0,
            tax_amount=13500.0,
            shipping_cost=3000.0,
            total_amount=91500.0,
            payment_status="unpaid",
            owner_id=admin.id,
        )
        session.add(po2)
        await session.flush()

        po2_items = [
            PurchaseOrderItem(purchase_order_id=po2.id, product_id=products[2].id, quantity_ordered=5, quantity_received=0, unit_price=15000.0, tax_rate=18.0, total_price=75000.0),
        ]
        session.add_all(po2_items)
        await session.flush()
        print("  ✅ Purchase Orders created (2)")

        # ── ERP: Sales Orders ───────────────────────────────
        so1 = SalesOrder(
            so_number="SO-2026-001",
            customer_id=accounts[0].id,
            contact_id=contacts[0].id,
            warehouse_id=warehouses[0].id,
            order_date="2026-05-14",
            expected_ship_date="2026-05-16",
            status="confirmed",
            subtotal=110599.0,
            tax_amount=19907.82,
            shipping_cost=1000.0,
            total_amount=131506.82,
            payment_status="partial",
            payment_method="Bank Transfer",
            shipping_address="Acme Corp, Tech Park, Bangalore 560001",
            owner_id=admin.id,
        )
        session.add(so1)
        await session.flush()

        so1_items = [
            SalesOrderItem(sales_order_id=so1.id, product_id=products[0].id, quantity_ordered=1, quantity_shipped=0, unit_price=55000.0, tax_rate=18.0, total_price=55000.0),
            SalesOrderItem(sales_order_id=so1.id, product_id=products[1].id, quantity_ordered=5, quantity_shipped=0, unit_price=599.0, tax_rate=18.0, total_price=2995.0),
            SalesOrderItem(sales_order_id=so1.id, product_id=products[2].id, quantity_ordered=2, quantity_shipped=0, unit_price=22000.0, tax_rate=18.0, total_price=44000.0),
        ]
        session.add_all(so1_items)
        await session.flush()

        so2 = SalesOrder(
            so_number="SO-2026-002",
            customer_id=accounts[1].id,
            contact_id=contacts[1].id,
            warehouse_id=warehouses[1].id,
            order_date="2026-05-15",
            status="draft",
            subtotal=12000.0,
            tax_amount=2160.0,
            total_amount=14160.0,
            payment_status="unpaid",
            shipping_address="Globex Inc, Financial District, Mumbai 400001",
            owner_id=demo.id,
        )
        session.add(so2)
        await session.flush()

        so2_items = [
            SalesOrderItem(sales_order_id=so2.id, product_id=products[3].id, quantity_ordered=1, quantity_shipped=0, unit_price=12000.0, tax_rate=18.0, total_price=12000.0),
        ]
        session.add_all(so2_items)
        await session.flush()
        print("  ✅ Sales Orders created (2)")

        await session.commit()

        print("\n🎉 Seed completed successfully!")
        print("  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print(f"  Users:      2  (admin / demo)")
        print(f"  Accounts:   3  (Acme, Globex, Initech)")
        print(f"  Contacts:   3")
        print(f"  Leads:      3")
        print(f"  Deals:      3")
        print(f"  Categories: 5")
        print(f"  Suppliers:  3")
        print(f"  Warehouses: 3")
        print(f"  Products:   6")
        print(f"  Inventory:  8")
        print(f"  POs:        2")
        print(f"  SOs:        2")
        print("  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")


if __name__ == "__main__":
    asyncio.run(seed_all())
