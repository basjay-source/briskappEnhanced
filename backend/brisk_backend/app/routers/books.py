from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date, datetime
from decimal import Decimal

from app.database import get_db
from app.models import BankConnection, EcommerceConnection, JournalEntry

router = APIRouter()

class BankConnectionCreate(BaseModel):
    company_id: str
    bank_name: str
    account_number: str
    sort_code: str
    provider: str

class TransactionCreate(BaseModel):
    company_id: str
    account_id: str
    transaction_date: date
    description: str
    amount: Decimal
    transaction_type: str

@router.get("/bank-connections/{company_id}")
def get_bank_connections(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    connections = db.query(BankConnection).filter(
        BankConnection.tenant_id == request.state.tenant_id,
        BankConnection.company_id == company_id,
        BankConnection.is_active == True
    ).all()
    
    return connections

@router.post("/bank-connections")
def create_bank_connection(
    connection_data: BankConnectionCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    connection = BankConnection(
        tenant_id=request.state.tenant_id,
        **connection_data.dict(),
        connection_id=f"CONN-{connection_data.company_id[:8]}",
        balance=Decimal("10000.00"),
        currency="GBP"
    )
    
    db.add(connection)
    db.commit()
    db.refresh(connection)
    
    return {
        "connection": connection,
        "status": "connected",
        "message": "Bank connection established successfully"
    }

@router.post("/bank-feeds/sync/{connection_id}")
def sync_bank_feed(
    connection_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    connection = db.query(BankConnection).filter(
        BankConnection.tenant_id == request.state.tenant_id,
        BankConnection.connection_id == connection_id
    ).first()
    
    if not connection:
        raise HTTPException(status_code=404, detail="Bank connection not found")
    
    mock_transactions = [
        {
            "date": "2024-01-15",
            "description": "Customer Payment - INV001",
            "amount": 1250.00,
            "type": "credit"
        },
        {
            "date": "2024-01-16", 
            "description": "Office Rent",
            "amount": -800.00,
            "type": "debit"
        },
        {
            "date": "2024-01-17",
            "description": "Supplier Payment - ABC Ltd",
            "amount": -450.00,
            "type": "debit"
        }
    ]
    
    imported_count = 0
    for txn in mock_transactions:
        journal_entry = JournalEntry(
            tenant_id=request.state.tenant_id,
            company_id=connection.company_id,
            account_id="bank-account-1",
            transaction_date=datetime.strptime(txn["date"], "%Y-%m-%d").date(),
            description=txn["description"],
            reference=f"BANK-{imported_count + 1}",
            debit_amount=abs(txn["amount"]) if txn["type"] == "debit" else 0,
            credit_amount=abs(txn["amount"]) if txn["type"] == "credit" else 0
        )
        db.add(journal_entry)
        imported_count += 1
    
    connection.last_transaction_date = date.today()
    db.commit()
    
    return {
        "message": f"Imported {imported_count} transactions",
        "transactions": mock_transactions,
        "last_sync": connection.last_transaction_date
    }

@router.get("/vat/mtd/{company_id}")
def get_vat_return(
    company_id: str,
    period_start: date,
    period_end: date,
    request: Request = None,
    db: Session = Depends(get_db)
):
    transactions = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.company_id == company_id,
        JournalEntry.transaction_date.between(period_start, period_end)
    ).all()
    
    sales_transactions = [t for t in transactions if "Customer" in t.description]
    purchase_transactions = [t for t in transactions if "Supplier" in t.description or "Office" in t.description]
    
    vat_on_sales = sum(t.credit_amount * Decimal("0.2") for t in sales_transactions)
    vat_on_purchases = sum(t.debit_amount * Decimal("0.2") for t in purchase_transactions)
    net_vat_due = vat_on_sales - vat_on_purchases
    
    return {
        "period": {
            "start": period_start,
            "end": period_end
        },
        "vat_return": {
            "box1_vat_on_sales": vat_on_sales,
            "box2_vat_on_acquisitions": 0,
            "box3_total_vat_due": vat_on_sales,
            "box4_vat_on_purchases": vat_on_purchases,
            "box5_net_vat_due": max(0, net_vat_due),
            "box6_total_sales": sum(t.credit_amount for t in sales_transactions),
            "box7_total_purchases": sum(t.debit_amount for t in purchase_transactions),
            "box8_goods_to_eu": 0,
            "box9_acquisitions_from_eu": 0
        },
        "status": "ready_for_submission"
    }

@router.get("/ecommerce-connections/{company_id}")
def get_ecommerce_connections(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    connections = db.query(EcommerceConnection).filter(
        EcommerceConnection.tenant_id == request.state.tenant_id,
        EcommerceConnection.company_id == company_id,
        EcommerceConnection.is_active == True
    ).all()
    
    return connections

@router.post("/ecommerce/sync/{connection_id}")
def sync_ecommerce_data(
    connection_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    connection = db.query(EcommerceConnection).filter(
        EcommerceConnection.tenant_id == request.state.tenant_id,
        EcommerceConnection.id == connection_id
    ).first()
    
    if not connection:
        raise HTTPException(status_code=404, detail="E-commerce connection not found")
    
    mock_sales_data = [
        {
            "order_id": "AMZ-001",
            "date": "2024-01-15",
            "gross_sales": 150.00,
            "fees": 15.00,
            "net_settlement": 135.00,
            "platform": connection.platform
        },
        {
            "order_id": "AMZ-002", 
            "date": "2024-01-16",
            "gross_sales": 89.99,
            "fees": 9.00,
            "net_settlement": 80.99,
            "platform": connection.platform
        }
    ]
    
    for sale in mock_sales_data:
        journal_entry = JournalEntry(
            tenant_id=request.state.tenant_id,
            company_id=connection.company_id,
            account_id="ecommerce-sales",
            transaction_date=datetime.strptime(sale["date"], "%Y-%m-%d").date(),
            description=f"{sale['platform']} Sale - {sale['order_id']}",
            reference=sale["order_id"],
            credit_amount=Decimal(str(sale["gross_sales"])),
            debit_amount=0
        )
        db.add(journal_entry)
    
    connection.last_sync = datetime.now()
    db.commit()
    
    return {
        "message": f"Synced {len(mock_sales_data)} sales records",
        "sales_data": mock_sales_data,
        "total_gross_sales": sum(s["gross_sales"] for s in mock_sales_data),
        "total_fees": sum(s["fees"] for s in mock_sales_data),
        "total_net": sum(s["net_settlement"] for s in mock_sales_data)
    }

@router.get("/management-accounts/{company_id}")
def get_management_accounts(
    company_id: str,
    period_start: date,
    period_end: date,
    request: Request = None,
    db: Session = Depends(get_db)
):
    transactions = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.company_id == company_id,
        JournalEntry.transaction_date.between(period_start, period_end)
    ).all()
    
    revenue = sum(t.credit_amount for t in transactions if "Customer" in t.description or "Sale" in t.description)
    expenses = sum(t.debit_amount for t in transactions if "Supplier" in t.description or "Office" in t.description)
    gross_profit = revenue - expenses
    
    return {
        "period": {
            "start": period_start,
            "end": period_end
        },
        "profit_and_loss": {
            "revenue": revenue,
            "cost_of_sales": 0,
            "gross_profit": revenue,
            "expenses": expenses,
            "net_profit": gross_profit
        },
        "kpis": {
            "gross_margin": (revenue / revenue * 100) if revenue > 0 else 0,
            "net_margin": (gross_profit / revenue * 100) if revenue > 0 else 0,
            "expense_ratio": (expenses / revenue * 100) if revenue > 0 else 0
        },
        "cash_flow": {
            "opening_balance": 10000.00,
            "receipts": revenue,
            "payments": expenses,
            "closing_balance": 10000.00 + revenue - expenses
        }
    }
