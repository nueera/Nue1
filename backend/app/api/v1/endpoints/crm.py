"""
CRM Endpoints
─────────────
Contacts, Accounts, Leads, Deals — full CRUD for each.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.contact import Contact
from app.models.account import Account
from app.models.lead import Lead
from app.models.deal import Deal
from app.schemas.contact import ContactCreate, ContactUpdate, ContactResponse
from app.schemas.account import AccountCreate, AccountUpdate, AccountResponse
from app.schemas.lead import LeadCreate, LeadUpdate, LeadResponse
from app.schemas.deal import DealCreate, DealUpdate, DealResponse

router = APIRouter()

# ═══════════════════════════════════════════════════════════
#  CONTACTS
# ═══════════════════════════════════════════════════════════

@router.get("/contacts", response_model=list[ContactResponse])
async def list_contacts(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(select(Contact).offset(skip).limit(limit).order_by(Contact.created_at.desc()))
    return result.scalars().all()


@router.post("/contacts", response_model=ContactResponse, status_code=201)
async def create_contact(
    body: ContactCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    contact = Contact(**body.model_dump(), owner_id=int(current_user["user_id"]))
    db.add(contact)
    await db.flush()
    await db.refresh(contact)
    return contact


@router.get("/contacts/{contact_id}", response_model=ContactResponse)
async def get_contact(contact_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Contact).where(Contact.id == contact_id))
    contact = result.scalars().first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.put("/contacts/{contact_id}", response_model=ContactResponse)
async def update_contact(
    contact_id: int,
    body: ContactUpdate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Contact).where(Contact.id == contact_id))
    contact = result.scalars().first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(contact, key, value)
    await db.flush()
    await db.refresh(contact)
    return contact


@router.delete("/contacts/{contact_id}", status_code=204)
async def delete_contact(contact_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Contact).where(Contact.id == contact_id))
    contact = result.scalars().first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    await db.delete(contact)


# ═══════════════════════════════════════════════════════════
#  ACCOUNTS
# ═══════════════════════════════════════════════════════════

@router.get("/accounts", response_model=list[AccountResponse])
async def list_accounts(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(select(Account).offset(skip).limit(limit).order_by(Account.created_at.desc()))
    return result.scalars().all()


@router.post("/accounts", response_model=AccountResponse, status_code=201)
async def create_account(
    body: AccountCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    account = Account(**body.model_dump(), owner_id=int(current_user["user_id"]))
    db.add(account)
    await db.flush()
    await db.refresh(account)
    return account


@router.get("/accounts/{account_id}", response_model=AccountResponse)
async def get_account(account_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Account).where(Account.id == account_id))
    account = result.scalars().first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return account


@router.put("/accounts/{account_id}", response_model=AccountResponse)
async def update_account(
    account_id: int,
    body: AccountUpdate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Account).where(Account.id == account_id))
    account = result.scalars().first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(account, key, value)
    await db.flush()
    await db.refresh(account)
    return account


@router.delete("/accounts/{account_id}", status_code=204)
async def delete_account(account_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Account).where(Account.id == account_id))
    account = result.scalars().first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    await db.delete(account)


# ═══════════════════════════════════════════════════════════
#  LEADS
# ═══════════════════════════════════════════════════════════

@router.get("/leads", response_model=list[LeadResponse])
async def list_leads(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(select(Lead).offset(skip).limit(limit).order_by(Lead.created_at.desc()))
    return result.scalars().all()


@router.post("/leads", response_model=LeadResponse, status_code=201)
async def create_lead(
    body: LeadCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    lead = Lead(**body.model_dump(), owner_id=int(current_user["user_id"]))
    db.add(lead)
    await db.flush()
    await db.refresh(lead)
    return lead


@router.get("/leads/{lead_id}", response_model=LeadResponse)
async def get_lead(lead_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalars().first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead


@router.put("/leads/{lead_id}", response_model=LeadResponse)
async def update_lead(
    lead_id: int,
    body: LeadUpdate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalars().first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(lead, key, value)
    await db.flush()
    await db.refresh(lead)
    return lead


@router.delete("/leads/{lead_id}", status_code=204)
async def delete_lead(lead_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalars().first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    await db.delete(lead)


# ═══════════════════════════════════════════════════════════
#  DEALS
# ═══════════════════════════════════════════════════════════

@router.get("/deals", response_model=list[DealResponse])
async def list_deals(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(select(Deal).offset(skip).limit(limit).order_by(Deal.created_at.desc()))
    return result.scalars().all()


@router.post("/deals", response_model=DealResponse, status_code=201)
async def create_deal(
    body: DealCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    deal = Deal(**body.model_dump(), owner_id=int(current_user["user_id"]))
    db.add(deal)
    await db.flush()
    await db.refresh(deal)
    return deal


@router.get("/deals/{deal_id}", response_model=DealResponse)
async def get_deal(deal_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Deal).where(Deal.id == deal_id))
    deal = result.scalars().first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    return deal


@router.put("/deals/{deal_id}", response_model=DealResponse)
async def update_deal(
    deal_id: int,
    body: DealUpdate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Deal).where(Deal.id == deal_id))
    deal = result.scalars().first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(deal, key, value)
    await db.flush()
    await db.refresh(deal)
    return deal


@router.delete("/deals/{deal_id}", status_code=204)
async def delete_deal(deal_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Deal).where(Deal.id == deal_id))
    deal = result.scalars().first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    await db.delete(deal)
