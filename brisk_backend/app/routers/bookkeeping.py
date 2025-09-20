from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, date
from ..database import get_db
from ..auth import get_current_user
from ..models import (
    User, Client, ChartOfAccounts, BankAccount, Customer, Supplier,
    SalesInvoice, PurchaseBill, JournalEntry, JournalLine, FixedAsset,
    VATCode, Currency, VATReturn, BankTransaction, ExpenseClaim
)

router = APIRouter(prefix="/bookkeeping", tags=["bookkeeping"])

@router.get("/dashboard-stats")
async def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard statistics for Bookkeeping module"""
    
    stats = {
        "bank_unreconciled": 54,
        "ar_overdue": 12500.00,
        "ap_due": 8750.00,
        "vat_due_date": "2024-02-07",
        "unposted_journals": 3,
        "asset_depreciation_due": 2,
        "period_lock_status": "Open",
        "trial_balance_date": "2024-01-31"
    }
    
    return stats

@router.get("/chart-of-accounts")
async def get_chart_of_accounts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get chart of accounts"""
    
    accounts = db.query(ChartOfAccounts).filter(
        ChartOfAccounts.tenant_id == current_user.tenant_id,
        ChartOfAccounts.is_active == True
    ).all()
    
    return accounts

@router.get("/bank-accounts")
async def get_bank_accounts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get bank accounts"""
    
    accounts = db.query(BankAccount).filter(
        BankAccount.tenant_id == current_user.tenant_id,
        BankAccount.is_active == True
    ).all()
    
    return accounts

@router.get("/customers")
async def get_customers(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get customers"""
    
    customers = db.query(Customer).filter(
        Customer.tenant_id == current_user.tenant_id,
        Customer.is_active == True
    ).all()
    
    return customers

@router.get("/suppliers")
async def get_suppliers(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get suppliers"""
    
    suppliers = db.query(Supplier).filter(
        Supplier.tenant_id == current_user.tenant_id,
        Supplier.is_active == True
    ).all()
    
    return suppliers

@router.get("/sales-invoices")
async def get_sales_invoices(
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get sales invoices"""
    
    query = db.query(SalesInvoice).filter(
        SalesInvoice.tenant_id == current_user.tenant_id
    )
    
    if status:
        query = query.filter(SalesInvoice.status == status)
    
    invoices = query.all()
    return invoices

@router.get("/purchase-bills")
async def get_purchase_bills(
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get purchase bills"""
    
    query = db.query(PurchaseBill).filter(
        PurchaseBill.tenant_id == current_user.tenant_id
    )
    
    if status:
        query = query.filter(PurchaseBill.status == status)
    
    bills = query.all()
    return bills

@router.get("/journal-entries")
async def get_journal_entries(
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get journal entries"""
    
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == current_user.tenant_id
    )
    
    if status:
        query = query.filter(JournalEntry.status == status)
    
    entries = query.all()
    return entries

@router.get("/fixed-assets")
async def get_fixed_assets(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get fixed assets"""
    
    assets = db.query(FixedAsset).filter(
        FixedAsset.tenant_id == current_user.tenant_id
    ).all()
    
    return assets

@router.get("/vat-codes")
async def get_vat_codes(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get VAT codes"""
    
    vat_codes = db.query(VATCode).filter(
        VATCode.tenant_id == current_user.tenant_id,
        VATCode.is_active == True
    ).all()
    
    return vat_codes

@router.get("/currencies")
async def get_currencies(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get currencies"""
    
    currencies = db.query(Currency).filter(
        Currency.tenant_id == current_user.tenant_id
    ).all()
    
    return currencies

@router.get("/vat-returns")
async def get_vat_returns(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get VAT returns"""
    
    returns = db.query(VATReturn).filter(
        VATReturn.tenant_id == current_user.tenant_id
    ).all()
    
    return returns

@router.get("/bank-transactions")
async def get_bank_transactions(
    bank_account_id: Optional[int] = None,
    is_reconciled: Optional[bool] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get bank transactions"""
    
    query = db.query(BankTransaction).filter(
        BankTransaction.tenant_id == current_user.tenant_id
    )
    
    if bank_account_id:
        query = query.filter(BankTransaction.bank_account_id == bank_account_id)
    
    if is_reconciled is not None:
        query = query.filter(BankTransaction.is_reconciled == is_reconciled)
    
    transactions = query.all()
    return transactions

@router.get("/expense-claims")
async def get_expense_claims(
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get expense claims"""
    
    query = db.query(ExpenseClaim).filter(
        ExpenseClaim.tenant_id == current_user.tenant_id
    )
    
    if status:
        query = query.filter(ExpenseClaim.status == status)
    
    claims = query.all()
    return claims

@router.post("/customers")
async def create_customer(
    customer_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new customer"""
    
    customer = Customer(
        tenant_id=current_user.tenant_id,
        **customer_data
    )
    
    db.add(customer)
    db.commit()
    db.refresh(customer)
    
    return customer

@router.post("/suppliers")
async def create_supplier(
    supplier_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new supplier"""
    
    supplier = Supplier(
        tenant_id=current_user.tenant_id,
        **supplier_data
    )
    
    db.add(supplier)
    db.commit()
    db.refresh(supplier)
    
    return supplier

@router.post("/sales-invoices")
async def create_sales_invoice(
    invoice_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new sales invoice"""
    
    invoice = SalesInvoice(
        tenant_id=current_user.tenant_id,
        **invoice_data
    )
    
    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    
    return invoice

@router.post("/purchase-bills")
async def create_purchase_bill(
    bill_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new purchase bill"""
    
    bill = PurchaseBill(
        tenant_id=current_user.tenant_id,
        **bill_data
    )
    
    db.add(bill)
    db.commit()
    db.refresh(bill)
    
    return bill

@router.post("/journal-entries")
async def create_journal_entry(
    entry_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new journal entry"""
    
    entry = JournalEntry(
        tenant_id=current_user.tenant_id,
        created_by=current_user.id,
        **entry_data
    )
    
    db.add(entry)
    db.commit()
    db.refresh(entry)
    
    return entry

@router.get("/reports/trial-balance")
async def get_trial_balance(
    as_of_date: Optional[date] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get trial balance report"""
    
    report_data = {
        "as_of_date": as_of_date or date.today(),
        "accounts": [
            {"account_code": "1000", "account_name": "Bank Current Account", "debit": 25000.00, "credit": 0.00},
            {"account_code": "1100", "account_name": "Accounts Receivable", "debit": 15000.00, "credit": 0.00},
            {"account_code": "2000", "account_name": "Accounts Payable", "debit": 0.00, "credit": 8500.00},
            {"account_code": "3000", "account_name": "Share Capital", "debit": 0.00, "credit": 10000.00},
            {"account_code": "4000", "account_name": "Sales Revenue", "debit": 0.00, "credit": 45000.00},
            {"account_code": "5000", "account_name": "Cost of Sales", "debit": 18000.00, "credit": 0.00},
            {"account_code": "6000", "account_name": "Operating Expenses", "debit": 5500.00, "credit": 0.00}
        ],
        "total_debits": 63500.00,
        "total_credits": 63500.00
    }
    
    return report_data

@router.get("/reports/aged-receivables")
async def get_aged_receivables(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get aged receivables report"""
    
    report_data = {
        "as_of_date": date.today(),
        "customers": [
            {"customer": "Acme Corp", "current": 5000.00, "30_days": 2500.00, "60_days": 0.00, "90_plus": 0.00, "total": 7500.00},
            {"customer": "Tech Ltd", "current": 3000.00, "30_days": 0.00, "60_days": 1500.00, "90_plus": 0.00, "total": 4500.00},
            {"customer": "Global Inc", "current": 0.00, "30_days": 0.00, "60_days": 0.00, "90_plus": 3000.00, "total": 3000.00}
        ],
        "totals": {"current": 8000.00, "30_days": 2500.00, "60_days": 1500.00, "90_plus": 3000.00, "total": 15000.00}
    }
    
    return report_data

@router.get("/reports/aged-payables")
async def get_aged_payables(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get aged payables report"""
    
    report_data = {
        "as_of_date": date.today(),
        "suppliers": [
            {"supplier": "Office Supplies Ltd", "current": 1200.00, "30_days": 0.00, "60_days": 0.00, "90_plus": 0.00, "total": 1200.00},
            {"supplier": "IT Services Inc", "current": 2500.00, "30_days": 1500.00, "60_days": 0.00, "90_plus": 0.00, "total": 4000.00},
            {"supplier": "Legal Advisors", "current": 0.00, "30_days": 3300.00, "60_days": 0.00, "90_plus": 0.00, "total": 3300.00}
        ],
        "totals": {"current": 3700.00, "30_days": 4800.00, "60_days": 0.00, "90_plus": 0.00, "total": 8500.00}
    }
    
    return report_data
