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
from app.models.finance_account import FinanceAccount
from app.models.tax_rate import TaxRate
from app.models.invoice import Invoice, InvoiceItem
from app.models.expense import Expense
from app.models.payment import Payment
from app.models.journal_entry import JournalEntry, JournalEntryLine


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

        suppliers = [
            Supplier(name="TechVista Supplies", code="TVS-001", contact_person="Kiran Rao", email="kiran@techvista.com", phone="+91-8012345678", city="Bangalore", country="India", payment_terms="Net 30", rating=4, owner_id=admin.id),
            Supplier(name="National Furniture Co", code="NFC-001", contact_person="Deepak Joshi", email="deepak@natfurniture.com", phone="+91-1123456789", city="Delhi", country="India", payment_terms="Net 45", rating=5, owner_id=admin.id),
            Supplier(name="CloudSoft Licensing", code="CSL-001", contact_person="Meera Nair", email="meera@cloudsoft.io", phone="+91-4012345678", city="Hyderabad", country="India", payment_terms="Net 15", rating=3, owner_id=demo.id),
        ]
        session.add_all(suppliers)
        await session.flush()
        print("  ✅ Suppliers created (3)")

        warehouses = [
            Warehouse(name="Main Warehouse - Mumbai", code="WH-MUM-01", address="Plot 45, MIDC, Andheri East", city="Mumbai", state="Maharashtra", country="India", postal_code="400093", manager_name="Sunil Mehta", capacity=10000),
            Warehouse(name="Delhi Distribution Center", code="WH-Del-01", address="Block B, Sector 63, Noida", city="Noida", state="Uttar Pradesh", country="India", postal_code="201301", manager_name="Ritu Agarwal", capacity=5000),
            Warehouse(name="Bangalore Hub", code="WH-BLR-01", address="No 78, Electronic City", city="Bangalore", state="Karnataka", country="India", postal_code="560100", manager_name="Arjun Reddy", capacity=7500),
        ]
        session.add_all(warehouses)
        await session.flush()
        print("  ✅ Warehouses created (3)")

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

        inventory = [
            Inventory(product_id=products[0].id, warehouse_id=warehouses[0].id, quantity_on_hand=25, quantity_reserved=5, quantity_available=20, quantity_on_order=0, status="in_stock", bin_location="A1-B1"),
            Inventory(product_id=products[1].id, warehouse_id=warehouses[0].id, quantity_on_hand=200, quantity_reserved=30, quantity_available=170, quantity_on_order=0, status="in_stock", bin_location="A2-B3"),
            Inventory(product_id=products[2].id, warehouse_id=warehouses[0].id, quantity_on_hand=3, quantity_reserved=1, quantity_available=2, quantity_on_order=10, status="low_stock", bin_location="C1-A1"),
            Inventory(product_id=products[5].id, warehouse_id=warehouses[0].id, quantity_on_hand=500, quantity_reserved=50, quantity_available=450, quantity_on_order=0, status="in_stock", bin_location="D2-B1"),
            Inventory(product_id=products[0].id, warehouse_id=warehouses[1].id, quantity_on_hand=8, quantity_reserved=3, quantity_available=5, quantity_on_order=20, status="low_stock", bin_location="A1-B2"),
            Inventory(product_id=products[3].id, warehouse_id=warehouses[1].id, quantity_on_hand=15, quantity_reserved=2, quantity_available=13, quantity_on_order=0, status="in_stock", bin_location="B1-A1"),
            Inventory(product_id=products[4].id, warehouse_id=warehouses[2].id, quantity_on_hand=0, quantity_reserved=0, quantity_available=0, quantity_on_order=0, status="in_stock", bin_location="N/A"),
            Inventory(product_id=products[1].id, warehouse_id=warehouses[2].id, quantity_on_hand=0, quantity_reserved=0, quantity_available=0, quantity_on_order=100, status="out_of_stock", bin_location="A2-B1"),
        ]
        session.add_all(inventory)
        await session.flush()
        print("  ✅ Inventory created (8)")

        po1 = PurchaseOrder(po_number="PO-2026-001", supplier_id=suppliers[0].id, warehouse_id=warehouses[0].id, order_date="2026-05-10", expected_delivery_date="2026-05-20", status="approved", subtotal=450000.0, tax_amount=81000.0, shipping_cost=5000.0, total_amount=536000.0, payment_status="unpaid", owner_id=admin.id)
        session.add(po1)
        await session.flush()
        session.add(PurchaseOrderItem(purchase_order_id=po1.id, product_id=products[0].id, quantity_ordered=10, quantity_received=0, unit_price=45000.0, tax_rate=18.0, total_price=450000.0))
        await session.flush()

        po2 = PurchaseOrder(po_number="PO-2026-002", supplier_id=suppliers[1].id, warehouse_id=warehouses[0].id, order_date="2026-05-12", expected_delivery_date="2026-05-25", status="submitted", subtotal=75000.0, tax_amount=13500.0, shipping_cost=3000.0, total_amount=91500.0, payment_status="unpaid", owner_id=admin.id)
        session.add(po2)
        await session.flush()
        session.add(PurchaseOrderItem(purchase_order_id=po2.id, product_id=products[2].id, quantity_ordered=5, quantity_received=0, unit_price=15000.0, tax_rate=18.0, total_price=75000.0))
        await session.flush()
        print("  ✅ Purchase Orders created (2)")

        so1 = SalesOrder(so_number="SO-2026-001", customer_id=accounts[0].id, contact_id=contacts[0].id, warehouse_id=warehouses[0].id, order_date="2026-05-14", expected_ship_date="2026-05-16", status="confirmed", subtotal=101995.0, tax_amount=18359.1, shipping_cost=1000.0, total_amount=121354.1, payment_status="partial", payment_method="Bank Transfer", shipping_address="Acme Corp, Tech Park, Bangalore 560001", owner_id=admin.id)
        session.add(so1)
        await session.flush()
        session.add_all([
            SalesOrderItem(sales_order_id=so1.id, product_id=products[0].id, quantity_ordered=1, quantity_shipped=0, unit_price=55000.0, tax_rate=18.0, total_price=55000.0),
            SalesOrderItem(sales_order_id=so1.id, product_id=products[1].id, quantity_ordered=5, quantity_shipped=0, unit_price=599.0, tax_rate=18.0, total_price=2995.0),
            SalesOrderItem(sales_order_id=so1.id, product_id=products[2].id, quantity_ordered=2, quantity_shipped=0, unit_price=22000.0, tax_rate=18.0, total_price=44000.0),
        ])
        await session.flush()

        so2 = SalesOrder(so_number="SO-2026-002", customer_id=accounts[1].id, contact_id=contacts[1].id, warehouse_id=warehouses[1].id, order_date="2026-05-15", status="draft", subtotal=12000.0, tax_amount=2160.0, total_amount=14160.0, payment_status="unpaid", shipping_address="Globex Inc, Financial District, Mumbai 400001", owner_id=demo.id)
        session.add(so2)
        await session.flush()
        session.add(SalesOrderItem(sales_order_id=so2.id, product_id=products[3].id, quantity_ordered=1, quantity_shipped=0, unit_price=12000.0, tax_rate=18.0, total_price=12000.0))
        await session.flush()
        print("  ✅ Sales Orders created (2)")

        # ════════════════════════════════════════════════════
        #  FINANCE DATA
        # ════════════════════════════════════════════════════

        # ── Chart of Accounts ───────────────────────────────
        finance_accounts = [
            # Assets (1000-1999)
            FinanceAccount(code="1000", name="Assets", account_type="asset", sub_type="current_asset"),
            FinanceAccount(code="1100", name="Cash", account_type="asset", sub_type="cash", parent_id=None),
            FinanceAccount(code="1200", name="Bank Account", account_type="asset", sub_type="bank", parent_id=None),
            FinanceAccount(code="1300", name="Accounts Receivable", account_type="asset", sub_type="accounts_receivable", parent_id=None),
            FinanceAccount(code="1400", name="Inventory", account_type="asset", sub_type="current_asset", parent_id=None),
            # Liabilities (2000-2999)
            FinanceAccount(code="2000", name="Liabilities", account_type="liability", sub_type="current_liability"),
            FinanceAccount(code="2100", name="Accounts Payable", account_type="liability", sub_type="accounts_payable", parent_id=None),
            FinanceAccount(code="2200", name="GST Payable", account_type="liability", sub_type="current_liability", parent_id=None),
            FinanceAccount(code="2300", name="Salary Payable", account_type="liability", sub_type="current_liability", parent_id=None),
            # Income (4000-4999)
            FinanceAccount(code="4000", name="Sales Revenue", account_type="income", sub_type="operating_income"),
            FinanceAccount(code="4100", name="Service Revenue", account_type="income", sub_type="operating_income"),
            FinanceAccount(code="4200", name="Other Income", account_type="income", sub_type="other_income"),
            # Expenses (5000-5999)
            FinanceAccount(code="5000", name="Cost of Goods Sold", account_type="expense", sub_type="cost_of_goods_sold"),
            FinanceAccount(code="5100", name="Salary Expense", account_type="expense", sub_type="operating_expense"),
            FinanceAccount(code="5200", name="Rent Expense", account_type="expense", sub_type="operating_expense"),
            FinanceAccount(code="5300", name="Utilities Expense", account_type="expense", sub_type="operating_expense"),
            FinanceAccount(code="5400", name="Office Supplies", account_type="expense", sub_type="operating_expense"),
            FinanceAccount(code="5500", name="Marketing Expense", account_type="expense", sub_type="operating_expense"),
            FinanceAccount(code="5600", name="Travel Expense", account_type="expense", sub_type="operating_expense"),
            FinanceAccount(code="5700", name="Software Subscriptions", account_type="expense", sub_type="operating_expense"),
            # Equity (3000-3999)
            FinanceAccount(code="3000", name="Owner's Equity", account_type="equity", sub_type="owner_equity"),
            FinanceAccount(code="3100", name="Retained Earnings", account_type="equity", sub_type="retained_earnings"),
        ]
        session.add_all(finance_accounts)
        await session.flush()
        # Fix parent_ids now that we have IDs
        finance_accounts[1].parent_id = finance_accounts[0].id  # Cash -> Assets
        finance_accounts[2].parent_id = finance_accounts[0].id  # Bank -> Assets
        finance_accounts[3].parent_id = finance_accounts[0].id  # AR -> Assets
        finance_accounts[4].parent_id = finance_accounts[0].id  # Inventory -> Assets
        finance_accounts[6].parent_id = finance_accounts[5].id  # AP -> Liabilities
        finance_accounts[7].parent_id = finance_accounts[5].id  # GST -> Liabilities
        finance_accounts[8].parent_id = finance_accounts[5].id  # Salary Payable -> Liabilities
        await session.flush()
        print("  ✅ Chart of Accounts created (21)")

        # ── Tax Rates ───────────────────────────────────────
        tax_rates = [
            TaxRate(name="GST 18%", code="GST18", rate=18.0, tax_type="gst", cgst_rate=9.0, sgst_rate=9.0, igst_rate=18.0, description="Standard GST rate for goods and services"),
            TaxRate(name="GST 12%", code="GST12", rate=12.0, tax_type="gst", cgst_rate=6.0, sgst_rate=6.0, igst_rate=12.0, description="Reduced GST rate"),
            TaxRate(name="GST 5%", code="GST5", rate=5.0, tax_type="gst", cgst_rate=2.5, sgst_rate=2.5, igst_rate=5.0, description="Essential items GST rate"),
            TaxRate(name="GST 0% (Exempt)", code="GST0", rate=0.0, tax_type="gst", cgst_rate=0.0, sgst_rate=0.0, igst_rate=0.0, description="Exempt from GST"),
        ]
        session.add_all(tax_rates)
        await session.flush()
        print("  ✅ Tax Rates created (4)")

        # ── Invoices ────────────────────────────────────────
        inv1 = Invoice(
            invoice_number="INV-2026-001", invoice_type="sales_invoice",
            customer_id=accounts[0].id, contact_id=contacts[0].id,
            sales_order_id=so1.id,
            invoice_date="2026-05-14", due_date="2026-06-13",
            subtotal=101995.0, tax_amount=18359.1, shipping_cost=1000.0,
            total_amount=121354.1, amount_paid=50000.0, amount_due=71354.1,
            status="partial", payment_terms="Net 30",
            billing_address="Acme Corp, Tech Park, Bangalore 560001",
            owner_id=admin.id,
        )
        session.add(inv1)
        await session.flush()
        session.add_all([
            InvoiceItem(invoice_id=inv1.id, product_id=products[0].id, description="Laptop Pro 15\"", quantity=1, unit="piece", unit_price=55000.0, tax_rate=18.0, tax_amount=9900.0, total_price=64900.0, sort_order=1),
            InvoiceItem(invoice_id=inv1.id, product_id=products[1].id, description="Wireless Mouse", quantity=5, unit="piece", unit_price=599.0, tax_rate=18.0, tax_amount=539.1, total_price=3534.1, sort_order=2),
            InvoiceItem(invoice_id=inv1.id, product_id=products[2].id, description="Standing Desk", quantity=2, unit="piece", unit_price=22000.0, tax_rate=18.0, tax_amount=7920.0, total_price=53920.0, sort_order=3),
        ])
        await session.flush()

        inv2 = Invoice(
            invoice_number="INV-2026-002", invoice_type="sales_invoice",
            customer_id=accounts[1].id, contact_id=contacts[1].id,
            invoice_date="2026-05-15", due_date="2026-06-14",
            subtotal=12000.0, tax_amount=2160.0, total_amount=14160.0,
            amount_paid=0.0, amount_due=14160.0,
            status="sent", payment_terms="Net 30",
            billing_address="Globex Inc, Financial District, Mumbai 400001",
            owner_id=demo.id,
        )
        session.add(inv2)
        await session.flush()
        session.add(InvoiceItem(invoice_id=inv2.id, product_id=products[3].id, description="Office Chair Premium", quantity=1, unit="piece", unit_price=12000.0, tax_rate=18.0, tax_amount=2160.0, total_price=14160.0))
        await session.flush()

        inv3 = Invoice(
            invoice_number="PINV-2026-001", invoice_type="purchase_invoice",
            supplier_id=suppliers[0].id, purchase_order_id=po1.id,
            invoice_date="2026-05-11", due_date="2026-06-10",
            subtotal=450000.0, tax_amount=81000.0, shipping_cost=5000.0,
            total_amount=536000.0, amount_paid=0.0, amount_due=536000.0,
            status="sent", payment_terms="Net 30",
            owner_id=admin.id,
        )
        session.add(inv3)
        await session.flush()
        print("  ✅ Invoices created (3: 2 sales + 1 purchase)")

        # ── Expenses ────────────────────────────────────────
        expenses = [
            Expense(expense_number="EXP-2026-001", category="rent", title="Office Rent - May 2026", amount=75000.0, tax_amount=0.0, total_amount=75000.0, expense_date="2026-05-01", payment_method="bank_transfer", finance_account_id=finance_accounts[12].id, status="approved", approved_by=admin.id, approved_at="2026-05-02", submitted_by=admin.id),
            Expense(expense_number="EXP-2026-002", category="utilities", title="Electricity Bill - April 2026", amount=12500.0, tax_amount=0.0, total_amount=12500.0, expense_date="2026-05-05", payment_method="bank_transfer", finance_account_id=finance_accounts[13].id, status="approved", approved_by=admin.id, approved_at="2026-05-06", submitted_by=demo.id),
            Expense(expense_number="EXP-2026-003", category="software", title="AWS Cloud Services - April", amount=35000.0, tax_amount=6300.0, total_amount=41300.0, expense_date="2026-05-03", payment_method="credit_card", vendor_name="Amazon Web Services", finance_account_id=finance_accounts[17].id, status="approved", approved_by=admin.id, approved_at="2026-05-04", submitted_by=admin.id),
            Expense(expense_number="EXP-2026-004", category="travel", title="Client Meeting - Delhi Trip", amount=8500.0, tax_amount=1530.0, total_amount=10030.0, expense_date="2026-05-10", payment_method="credit_card", finance_account_id=finance_accounts[16].id, status="pending", submitted_by=demo.id),
            Expense(expense_number="EXP-2026-005", category="office_supplies", title="Printer Cartridges", amount=3200.0, tax_amount=576.0, total_amount=3776.0, expense_date="2026-05-08", payment_method="upi", supplier_id=suppliers[1].id, finance_account_id=finance_accounts[14].id, status="approved", approved_by=admin.id, approved_at="2026-05-09", submitted_by=demo.id),
            Expense(expense_number="EXP-2026-006", category="marketing", title="Google Ads - May Campaign", amount=25000.0, tax_amount=4500.0, total_amount=29500.0, expense_date="2026-05-12", payment_method="credit_card", vendor_name="Google India", finance_account_id=finance_accounts[15].id, status="pending", submitted_by=admin.id),
        ]
        session.add_all(expenses)
        await session.flush()
        print("  ✅ Expenses created (6)")

        # ── Payments ────────────────────────────────────────
        payments = [
            Payment(payment_number="PAY-2026-001", payment_type="received", customer_id=accounts[0].id, contact_id=contacts[0].id, invoice_id=inv1.id, amount=50000.0, payment_date="2026-05-15", payment_method="bank_transfer", reference_number="NEFT-REF-001", finance_account_id=finance_accounts[2].id, status="completed", owner_id=admin.id),
            Payment(payment_number="PAY-2026-002", payment_type="made", supplier_id=suppliers[1].id, invoice_id=inv3.id, amount=268000.0, payment_date="2026-05-13", payment_method="bank_transfer", reference_number="NEFT-REF-002", finance_account_id=finance_accounts[2].id, status="completed", owner_id=admin.id),
            Payment(payment_number="PAY-2026-003", payment_type="made", supplier_id=suppliers[0].id, invoice_id=inv3.id, amount=100000.0, payment_date="2026-05-14", payment_method="bank_transfer", reference_number="NEFT-REF-003", finance_account_id=finance_accounts[2].id, status="completed", owner_id=admin.id),
        ]
        session.add_all(payments)
        await session.flush()
        print("  ✅ Payments created (3: 1 received + 2 made)")

        # ── Journal Entries ─────────────────────────────────
        je1 = JournalEntry(
            entry_number="JE-2026-001", entry_date="2026-05-15",
            description="Sales Invoice INV-2026-001 - Acme Corp",
            reference_type="invoice", reference_id=inv1.id,
            status="posted", total_debit=621354.1, total_credit=621354.1,
            owner_id=admin.id,
        )
        session.add(je1)
        await session.flush()
        session.add_all([
            JournalEntryLine(journal_entry_id=je1.id, account_id=finance_accounts[3].id, debit=121354.1, credit=0.0, description="Accounts Receivable - Acme Corp", sort_order=1),
            JournalEntryLine(journal_entry_id=je1.id, account_id=finance_accounts[9].id, debit=0.0, credit=101995.0, description="Sales Revenue", sort_order=2),
            JournalEntryLine(journal_entry_id=je1.id, account_id=finance_accounts[7].id, debit=0.0, credit=18359.1, description="GST Payable on Sales", sort_order=3),
            JournalEntryLine(journal_entry_id=je1.id, account_id=finance_accounts[1].id, debit=50000.0, credit=0.0, description="Cash received from Acme", sort_order=4),
            JournalEntryLine(journal_entry_id=je1.id, account_id=finance_accounts[3].id, debit=0.0, credit=50000.0, description="Reduce AR - payment received", sort_order=5),
            JournalEntryLine(journal_entry_id=je1.id, account_id=finance_accounts[1].id, debit=450000.0, credit=0.0, description="Payment to TechVista (PO)", sort_order=6),
            JournalEntryLine(journal_entry_id=je1.id, account_id=finance_accounts[6].id, debit=0.0, credit=450000.0, description="Accounts Payable - TechVista", sort_order=7),
        ])
        await session.flush()
        print("  ✅ Journal Entries created (1 with 7 lines)")

        await session.commit()

        print("\n🎉 Seed completed successfully!")
        print("  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print(f"  CRM:       3 accounts, 3 contacts, 3 leads, 3 deals")
        print(f"  ERP:       5 categories, 3 suppliers, 3 warehouses")
        print(f"             6 products, 8 inventory, 2 POs, 2 SOs")
        print(f"  Finance:   21 chart of accounts, 4 tax rates")
        print(f"             3 invoices, 6 expenses, 3 payments")
        print(f"             1 journal entry (7 lines)")
        print("  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")


if __name__ == "__main__":
    asyncio.run(seed_all())
