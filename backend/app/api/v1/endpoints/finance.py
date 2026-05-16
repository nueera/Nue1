"""
Finance Endpoints — Full CRUD + Dashboard + Reports
────────────────────────────────────────────────────
Chart of Accounts, Tax Rates, Invoices, Expenses, Payments,
Journal Entries, and Financial Dashboard.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, case

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.finance_account import FinanceAccount
from app.models.tax_rate import TaxRate
from app.models.invoice import Invoice, InvoiceItem
from app.models.expense import Expense
from app.models.payment import Payment
from app.models.journal_entry import JournalEntry, JournalEntryLine

from app.schemas.finance_account import FinanceAccountCreate, FinanceAccountUpdate, FinanceAccountResponse
from app.schemas.tax_rate import TaxRateCreate, TaxRateUpdate, TaxRateResponse
from app.schemas.invoice import InvoiceCreate, InvoiceUpdate, InvoiceResponse, InvoiceItemCreate, InvoiceItemResponse
from app.schemas.expense import ExpenseCreate, ExpenseUpdate, ExpenseResponse
from app.schemas.payment import PaymentCreate, PaymentUpdate, PaymentResponse
from app.schemas.journal_entry import (
    JournalEntryCreate, JournalEntryUpdate, JournalEntryResponse,
    JournalEntryLineCreate, JournalEntryLineResponse,
)

router = APIRouter()


# ═══════════════════════════════════════════════════════════
#  DASHBOARD
# ═══════════════════════════════════════════════════════════

@router.get("/dashboard")
async def finance_dashboard(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Finance dashboard with key financial metrics."""
    # ── Revenue (from paid/partial sales invoices) ──────────
    total_revenue = await db.scalar(
        select(func.coalesce(func.sum(Invoice.total_amount), 0))
        .where(Invoice.invoice_type == "sales_invoice")
        .where(Invoice.status.in_(["sent", "partial", "paid"]))
    )

    # ── Expenses ────────────────────────────────────────────
    total_expenses = await db.scalar(
        select(func.coalesce(func.sum(Expense.total_amount), 0))
        .where(Expense.status.in_(["approved", "reimbursed"]))
    )

    # ── Outstanding (unpaid invoices) ───────────────────────
    outstanding_receivables = await db.scalar(
        select(func.coalesce(func.sum(Invoice.amount_due), 0))
        .where(Invoice.invoice_type == "sales_invoice")
        .where(Invoice.status.in_(["sent", "partial", "overdue"]))
    )

    outstanding_payables = await db.scalar(
        select(func.coalesce(func.sum(Invoice.amount_due), 0))
        .where(Invoice.invoice_type == "purchase_invoice")
        .where(Invoice.status.in_(["sent", "partial", "overdue"]))
    )

    # ── Overdue ─────────────────────────────────────────────
    overdue_invoices = await db.scalar(
        select(func.count(Invoice.id))
        .where(Invoice.status == "overdue")
    )

    # ── Payments ────────────────────────────────────────────
    payments_received = await db.scalar(
        select(func.coalesce(func.sum(Payment.amount), 0))
        .where(Payment.payment_type == "received")
        .where(Payment.status == "completed")
    )
    payments_made = await db.scalar(
        select(func.coalesce(func.sum(Payment.amount), 0))
        .where(Payment.payment_type == "made")
        .where(Payment.status == "completed")
    )

    # ── Counts ──────────────────────────────────────────────
    total_invoices = await db.scalar(
        select(func.count(Invoice.id)).where(Invoice.invoice_type == "sales_invoice")
    )
    pending_expenses = await db.scalar(
        select(func.count(Expense.id)).where(Expense.status == "pending")
    )

    net_profit = (total_revenue or 0) - (total_expenses or 0)

    return {
        "module": "finance",
        "summary": {
            "total_revenue": round(total_revenue or 0, 2),
            "total_expenses": round(total_expenses or 0, 2),
            "net_profit": round(net_profit, 2),
            "outstanding_receivables": round(outstanding_receivables or 0, 2),
            "outstanding_payables": round(outstanding_payables or 0, 2),
            "overdue_invoices": overdue_invoices or 0,
            "payments_received": round(payments_received or 0, 2),
            "payments_made": round(payments_made or 0, 2),
            "total_invoices": total_invoices or 0,
            "pending_expenses": pending_expenses or 0,
        },
    }


# ═══════════════════════════════════════════════════════════
#  CHART OF ACCOUNTS
# ═══════════════════════════════════════════════════════════

@router.get("/accounts", response_model=list[FinanceAccountResponse])
async def list_finance_accounts(
    skip: int = Query(0, ge=0),
    limit: int = Query(200, ge=1, le=500),
    account_type: str | None = Query(None),
    is_active: bool | None = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    query = select(FinanceAccount).offset(skip).limit(limit).order_by(FinanceAccount.code)
    if account_type:
        query = query.where(FinanceAccount.account_type == account_type)
    if is_active is not None:
        query = query.where(FinanceAccount.is_active == is_active)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/accounts", response_model=FinanceAccountResponse, status_code=201)
async def create_finance_account(
    body: FinanceAccountCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    account = FinanceAccount(**body.model_dump())
    db.add(account)
    await db.flush()
    await db.refresh(account)
    return account


@router.get("/accounts/{account_id}", response_model=FinanceAccountResponse)
async def get_finance_account(account_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(FinanceAccount).where(FinanceAccount.id == account_id))
    account = result.scalars().first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return account


@router.put("/accounts/{account_id}", response_model=FinanceAccountResponse)
async def update_finance_account(
    account_id: int, body: FinanceAccountUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(FinanceAccount).where(FinanceAccount.id == account_id))
    account = result.scalars().first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(account, key, value)
    await db.flush()
    await db.refresh(account)
    return account


@router.delete("/accounts/{account_id}", status_code=204)
async def delete_finance_account(account_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(FinanceAccount).where(FinanceAccount.id == account_id))
    account = result.scalars().first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    await db.delete(account)


# ═══════════════════════════════════════════════════════════
#  TAX RATES
# ═══════════════════════════════════════════════════════════

@router.get("/tax-rates", response_model=list[TaxRateResponse])
async def list_tax_rates(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(select(TaxRate).offset(skip).limit(limit).order_by(TaxRate.rate))
    return result.scalars().all()


@router.post("/tax-rates", response_model=TaxRateResponse, status_code=201)
async def create_tax_rate(
    body: TaxRateCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    tax = TaxRate(**body.model_dump())
    db.add(tax)
    await db.flush()
    await db.refresh(tax)
    return tax


@router.get("/tax-rates/{tax_id}", response_model=TaxRateResponse)
async def get_tax_rate(tax_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TaxRate).where(TaxRate.id == tax_id))
    tax = result.scalars().first()
    if not tax:
        raise HTTPException(status_code=404, detail="Tax rate not found")
    return tax


@router.put("/tax-rates/{tax_id}", response_model=TaxRateResponse)
async def update_tax_rate(tax_id: int, body: TaxRateUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TaxRate).where(TaxRate.id == tax_id))
    tax = result.scalars().first()
    if not tax:
        raise HTTPException(status_code=404, detail="Tax rate not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(tax, key, value)
    await db.flush()
    await db.refresh(tax)
    return tax


@router.delete("/tax-rates/{tax_id}", status_code=204)
async def delete_tax_rate(tax_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TaxRate).where(TaxRate.id == tax_id))
    tax = result.scalars().first()
    if not tax:
        raise HTTPException(status_code=404, detail="Tax rate not found")
    await db.delete(tax)


# ═══════════════════════════════════════════════════════════
#  INVOICES
# ═══════════════════════════════════════════════════════════

@router.get("/invoices", response_model=list[InvoiceResponse])
async def list_invoices(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    invoice_type: str | None = Query(None),
    status: str | None = Query(None),
    customer_id: int | None = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    query = select(Invoice).offset(skip).limit(limit).order_by(Invoice.invoice_date.desc())
    if invoice_type:
        query = query.where(Invoice.invoice_type == invoice_type)
    if status:
        query = query.where(Invoice.status == status)
    if customer_id:
        query = query.where(Invoice.customer_id == customer_id)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/invoices", response_model=InvoiceResponse, status_code=201)
async def create_invoice(
    body: InvoiceCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    invoice = Invoice(**body.model_dump(exclude={"items"}), owner_id=int(current_user["user_id"]))
    db.add(invoice)
    await db.flush()

    for item_data in body.items:
        item = InvoiceItem(**item_data.model_dump(), invoice_id=invoice.id)
        db.add(item)

    await db.flush()
    await db.refresh(invoice)
    return invoice


@router.get("/invoices/{invoice_id}", response_model=InvoiceResponse)
async def get_invoice(invoice_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Invoice).where(Invoice.id == invoice_id))
    invoice = result.scalars().first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice


@router.put("/invoices/{invoice_id}", response_model=InvoiceResponse)
async def update_invoice(invoice_id: int, body: InvoiceUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Invoice).where(Invoice.id == invoice_id))
    invoice = result.scalars().first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")

    update_data = body.model_dump(exclude_unset=True, exclude={"items"})
    for key, value in update_data.items():
        setattr(invoice, key, value)

    if body.items is not None:
        await db.execute(InvoiceItem.__table__.delete().where(InvoiceItem.invoice_id == invoice_id))
        for item_data in body.items:
            item = InvoiceItem(**item_data.model_dump(), invoice_id=invoice_id)
            db.add(item)

    await db.flush()
    await db.refresh(invoice)
    return invoice


@router.delete("/invoices/{invoice_id}", status_code=204)
async def delete_invoice(invoice_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Invoice).where(Invoice.id == invoice_id))
    invoice = result.scalars().first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    await db.execute(InvoiceItem.__table__.delete().where(InvoiceItem.invoice_id == invoice_id))
    await db.delete(invoice)


# ═══════════════════════════════════════════════════════════
#  EXPENSES
# ═══════════════════════════════════════════════════════════

@router.get("/expenses", response_model=list[ExpenseResponse])
async def list_expenses(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    category: str | None = Query(None),
    status: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    query = select(Expense).offset(skip).limit(limit).order_by(Expense.expense_date.desc())
    if category:
        query = query.where(Expense.category == category)
    if status:
        query = query.where(Expense.status == status)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/expenses", response_model=ExpenseResponse, status_code=201)
async def create_expense(
    body: ExpenseCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    expense = Expense(**body.model_dump(), submitted_by=int(current_user["user_id"]))
    db.add(expense)
    await db.flush()
    await db.refresh(expense)
    return expense


@router.get("/expenses/{expense_id}", response_model=ExpenseResponse)
async def get_expense(expense_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Expense).where(Expense.id == expense_id))
    expense = result.scalars().first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense


@router.put("/expenses/{expense_id}", response_model=ExpenseResponse)
async def update_expense(expense_id: int, body: ExpenseUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Expense).where(Expense.id == expense_id))
    expense = result.scalars().first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(expense, key, value)
    await db.flush()
    await db.refresh(expense)
    return expense


@router.delete("/expenses/{expense_id}", status_code=204)
async def delete_expense(expense_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Expense).where(Expense.id == expense_id))
    expense = result.scalars().first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    await db.delete(expense)


# ═══════════════════════════════════════════════════════════
#  PAYMENTS
# ═══════════════════════════════════════════════════════════

@router.get("/payments", response_model=list[PaymentResponse])
async def list_payments(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    payment_type: str | None = Query(None),
    status: str | None = Query(None),
    invoice_id: int | None = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    query = select(Payment).offset(skip).limit(limit).order_by(Payment.payment_date.desc())
    if payment_type:
        query = query.where(Payment.payment_type == payment_type)
    if status:
        query = query.where(Payment.status == status)
    if invoice_id:
        query = query.where(Payment.invoice_id == invoice_id)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/payments", response_model=PaymentResponse, status_code=201)
async def create_payment(
    body: PaymentCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    payment = Payment(**body.model_dump(), owner_id=int(current_user["user_id"]))
    db.add(payment)
    await db.flush()
    await db.refresh(payment)
    return payment


@router.get("/payments/{payment_id}", response_model=PaymentResponse)
async def get_payment(payment_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Payment).where(Payment.id == payment_id))
    payment = result.scalars().first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment


@router.put("/payments/{payment_id}", response_model=PaymentResponse)
async def update_payment(payment_id: int, body: PaymentUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Payment).where(Payment.id == payment_id))
    payment = result.scalars().first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(payment, key, value)
    await db.flush()
    await db.refresh(payment)
    return payment


@router.delete("/payments/{payment_id}", status_code=204)
async def delete_payment(payment_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Payment).where(Payment.id == payment_id))
    payment = result.scalars().first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    await db.delete(payment)


# ═══════════════════════════════════════════════════════════
#  JOURNAL ENTRIES
# ═══════════════════════════════════════════════════════════

@router.get("/journal-entries", response_model=list[JournalEntryResponse])
async def list_journal_entries(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    status: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    query = select(JournalEntry).offset(skip).limit(limit).order_by(JournalEntry.entry_date.desc())
    if status:
        query = query.where(JournalEntry.status == status)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/journal-entries", response_model=JournalEntryResponse, status_code=201)
async def create_journal_entry(
    body: JournalEntryCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    # Validate: total debits must equal total credits
    total_debit = sum(line.debit or 0 for line in body.lines)
    total_credit = sum(line.credit or 0 for line in body.lines)
    if abs(total_debit - total_credit) > 0.01:
        raise HTTPException(
            status_code=400,
            detail=f"Journal entry must balance: debits={total_debit}, credits={total_credit}"
        )

    entry = JournalEntry(
        **body.model_dump(exclude={"lines"}),
        total_debit=total_debit,
        total_credit=total_credit,
        owner_id=int(current_user["user_id"]),
    )
    db.add(entry)
    await db.flush()

    for line_data in body.lines:
        line = JournalEntryLine(**line_data.model_dump(), journal_entry_id=entry.id)
        db.add(line)

    await db.flush()
    await db.refresh(entry)
    return entry


@router.get("/journal-entries/{entry_id}", response_model=JournalEntryResponse)
async def get_journal_entry(entry_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(JournalEntry).where(JournalEntry.id == entry_id))
    entry = result.scalars().first()
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    return entry


@router.put("/journal-entries/{entry_id}", response_model=JournalEntryResponse)
async def update_journal_entry(
    entry_id: int, body: JournalEntryUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(JournalEntry).where(JournalEntry.id == entry_id))
    entry = result.scalars().first()
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")

    update_data = body.model_dump(exclude_unset=True, exclude={"lines"})
    for key, value in update_data.items():
        setattr(entry, key, value)

    if body.lines is not None:
        total_debit = sum(line.debit or 0 for line in body.lines)
        total_credit = sum(line.credit or 0 for line in body.lines)
        if abs(total_debit - total_credit) > 0.01:
            raise HTTPException(
                status_code=400,
                detail=f"Journal entry must balance: debits={total_debit}, credits={total_credit}"
            )
        entry.total_debit = total_debit
        entry.total_credit = total_credit
        await db.execute(
            JournalEntryLine.__table__.delete().where(JournalEntryLine.journal_entry_id == entry_id)
        )
        for line_data in body.lines:
            line = JournalEntryLine(**line_data.model_dump(), journal_entry_id=entry_id)
            db.add(line)

    await db.flush()
    await db.refresh(entry)
    return entry


@router.delete("/journal-entries/{entry_id}", status_code=204)
async def delete_journal_entry(entry_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(JournalEntry).where(JournalEntry.id == entry_id))
    entry = result.scalars().first()
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    await db.execute(
        JournalEntryLine.__table__.delete().where(JournalEntryLine.journal_entry_id == entry_id)
    )
    await db.delete(entry)


# ═══════════════════════════════════════════════════════════
#  REPORTS
# ═══════════════════════════════════════════════════════════

@router.get("/reports/profit-loss")
async def profit_loss_report(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Profit & Loss summary report."""
    total_income = await db.scalar(
        select(func.coalesce(func.sum(Invoice.total_amount), 0))
        .where(Invoice.invoice_type == "sales_invoice")
        .where(Invoice.status.in_(["sent", "partial", "paid"]))
    )
    total_expenses = await db.scalar(
        select(func.coalesce(func.sum(Expense.total_amount), 0))
        .where(Expense.status.in_(["approved", "reimbursed"]))
    )

    # Expense breakdown by category
    expense_by_category = await db.execute(
        select(Expense.category, func.coalesce(func.sum(Expense.total_amount), 0))
        .where(Expense.status.in_(["approved", "reimbursed"]))
        .group_by(Expense.category)
    )
    categories = {row[0]: row[1] for row in expense_by_category.all()}

    gross_profit = (total_income or 0) - (total_expenses or 0)

    return {
        "report": "profit_and_loss",
        "total_income": round(total_income or 0, 2),
        "total_expenses": round(total_expenses or 0, 2),
        "gross_profit": round(gross_profit, 2),
        "profit_margin": round((gross_profit / (total_income or 1)) * 100, 2),
        "expense_breakdown": categories,
    }


@router.get("/reports/cash-flow")
async def cash_flow_report(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Cash flow summary — money in vs money out."""
    money_in = await db.scalar(
        select(func.coalesce(func.sum(Payment.amount), 0))
        .where(Payment.payment_type == "received")
        .where(Payment.status == "completed")
    )
    money_out = await db.scalar(
        select(func.coalesce(func.sum(Payment.amount), 0))
        .where(Payment.payment_type == "made")
        .where(Payment.status == "completed")
    )
    net_cash_flow = (money_in or 0) - (money_out or 0)

    return {
        "report": "cash_flow",
        "money_in": round(money_in or 0, 2),
        "money_out": round(money_out or 0, 2),
        "net_cash_flow": round(net_cash_flow, 2),
    }


@router.get("/reports/outstanding")
async def outstanding_report(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Outstanding receivables and payables report."""
    # Receivables (money others owe us)
    receivables = await db.execute(
        select(Invoice.invoice_number, Invoice.amount_due, Invoice.due_date, Invoice.status)
        .where(Invoice.invoice_type == "sales_invoice")
        .where(Invoice.amount_due > 0)
        .where(Invoice.status.in_(["sent", "partial", "overdue"]))
    )
    receivable_list = [
        {"invoice": r[0], "amount_due": r[1], "due_date": r[2], "status": r[3]}
        for r in receivables.all()
    ]

    # Payables (money we owe others)
    payables = await db.execute(
        select(Invoice.invoice_number, Invoice.amount_due, Invoice.due_date, Invoice.status)
        .where(Invoice.invoice_type == "purchase_invoice")
        .where(Invoice.amount_due > 0)
        .where(Invoice.status.in_(["sent", "partial", "overdue"]))
    )
    payable_list = [
        {"invoice": p[0], "amount_due": p[1], "due_date": p[2], "status": p[3]}
        for p in payables.all()
    ]

    total_receivables = sum(r["amount_due"] for r in receivable_list)
    total_payables = sum(p["amount_due"] for p in payable_list)

    return {
        "report": "outstanding",
        "total_receivables": round(total_receivables, 2),
        "total_payables": round(total_payables, 2),
        "receivables": receivable_list,
        "payables": payable_list,
    }
