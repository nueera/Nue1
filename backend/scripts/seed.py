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


async def seed_all():
    async with AsyncSessionLocal() as session:
        # ── Create Admin User ───────────────────────────────
        admin = User(
            email="admin@nuegrowth.com",
            hashed_password=get_password_hash("admin123"),
            full_name="Admin User",
            role="admin",
            is_superuser=True,
        )
        session.add(admin)

        # ── Create Demo User ────────────────────────────────
        demo = User(
            email="demo@nuegrowth.com",
            hashed_password=get_password_hash("demo123"),
            full_name="Demo User",
            role="user",
        )
        session.add(demo)

        await session.flush()

        # ── Create Sample Accounts ──────────────────────────
        accounts = [
            Account(name="Acme Corp", industry="Technology", website="https://acme.com", owner_id=admin.id),
            Account(name="Globex Inc", industry="Finance", website="https://globex.com", owner_id=admin.id),
            Account(name="Initech", industry="Consulting", owner_id=demo.id),
        ]
        session.add_all(accounts)
        await session.flush()

        # ── Create Sample Contacts ──────────────────────────
        contacts = [
            Contact(first_name="Rahul", last_name="Sharma", email="rahul@acme.com", phone="+91-9876543210", account_id=accounts[0].id, owner_id=admin.id),
            Contact(first_name="Priya", last_name="Patel", email="priya@globex.com", phone="+91-9876543211", account_id=accounts[1].id, owner_id=admin.id),
            Contact(first_name="Amit", last_name="Kumar", email="amit@initech.com", account_id=accounts[2].id, owner_id=demo.id),
        ]
        session.add_all(contacts)
        await session.flush()

        # ── Create Sample Leads ─────────────────────────────
        leads = [
            Lead(first_name="Sneha", last_name="Reddy", email="sneha@startup.io", source="web", status="new", owner_id=admin.id),
            Lead(first_name="Vikram", last_name="Singh", email="vikram@corp.in", source="referral", status="contacted", owner_id=demo.id),
            Lead(first_name="Anita", last_name="Desai", email="anita@enterprise.com", source="cold-call", status="qualified", owner_id=admin.id),
        ]
        session.add_all(leads)
        await session.flush()

        # ── Create Sample Deals ─────────────────────────────
        deals = [
            Deal(title="Acme Enterprise License", value=150000, stage="negotiation", probability=75, account_id=accounts[0].id, contact_id=contacts[0].id, owner_id=admin.id),
            Deal(title="Globex Consulting Package", value=75000, stage="proposal", probability=50, account_id=accounts[1].id, contact_id=contacts[1].id, owner_id=admin.id),
            Deal(title="Initech SaaS Subscription", value=25000, stage="prospecting", probability=20, account_id=accounts[2].id, contact_id=contacts[2].id, owner_id=demo.id),
        ]
        session.add_all(deals)

        await session.commit()
        print("✅ Seed data created successfully!")
        print(f"   Users: 2 (admin@nuegrowth.com / demo@nuegrowth.com)")
        print(f"   Accounts: {len(accounts)}")
        print(f"   Contacts: {len(contacts)}")
        print(f"   Leads: {len(leads)}")
        print(f"   Deals: {len(deals)}")


if __name__ == "__main__":
    asyncio.run(seed_all())
