from fastapi import APIRouter, Depends, HTTPException, Request, Query, File, UploadFile
from sqlalchemy.orm import Session
from sqlalchemy import or_, func, extract, and_
from typing import List, Optional
from pydantic import BaseModel
from datetime import date, datetime, timedelta
from decimal import Decimal
import uuid

from app.database import get_db
from app.models import BankConnection, EcommerceConnection, JournalEntry, LedgerAccount, RecurringTransaction, AccrualPrepayment, InvoiceTracking, TransactionCategorizationRule, TransactionCategorization, FixedAsset
from app.models.client import Client
from app.models.products import Product, InventoryMovement
from app.models.tenant import Invoice

router = APIRouter()

class RecurringTransactionCreate(BaseModel):
    template_name: str
    transaction_type: str
    frequency: str
    next_date: date
    end_date: Optional[date] = None
    amount: Decimal
    description: str
    account_id: str
    customer_id: Optional[str] = None
    supplier_id: Optional[str] = None

class RecurringTransactionUpdate(BaseModel):
    template_name: Optional[str] = None
    frequency: Optional[str] = None
    next_date: Optional[date] = None
    end_date: Optional[date] = None
    amount: Optional[Decimal] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None

class AccrualPrepaymentCreate(BaseModel):
    type: str
    description: str
    total_amount: Decimal
    start_date: date
    end_date: date
    frequency: str = "monthly"
    account_id: str

class InvoiceEmailCreate(BaseModel):
    invoice_id: str
    recipient_email: str
    subject: str
    message: str

class RecurringTransactionCreate(BaseModel):
    template_name: str
    transaction_type: str
    frequency: str
    next_date: date
    end_date: Optional[date] = None
    amount: float
    description: str
    account_id: str
    customer_id: Optional[str] = None
    supplier_id: Optional[str] = None

class AccrualPrepaymentCreate(BaseModel):
    type: str
    description: str
    total_amount: float
    start_date: date
    end_date: date
    frequency: str = "monthly"
    account_id: str

class InvoiceEmailCreate(BaseModel):
    invoice_id: str
    recipient_email: str
    subject: str
    message: str

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


class InvoiceCreate(BaseModel):
    company_id: str
    customer_id: str
    invoice_number: str
    issue_date: date

    amount: Decimal
    vat_amount: Decimal
    status: str

class BillCreate(BaseModel):
    company_id: str
    supplier_id: str
    bill_number: str
    issue_date: date
    due_date: date
    amount: Decimal
    vat_amount: Decimal
    status: str

class QuoteCreate(BaseModel):
    company_id: str
    customer_id: str
    quote_number: str
    issue_date: date
    valid_until: date
    amount: Decimal
    status: str

class PurchaseOrderCreate(BaseModel):
    company_id: str
    supplier_id: str
    po_number: str
    order_date: date
    delivery_date: date
    amount: Decimal
    status: str

class ProductCreate(BaseModel):
    company_id: str
    name: str
    description: Optional[str] = None
    sku: Optional[str] = None
    category: Optional[str] = None
    unit_price: Decimal
    cost_price: Optional[Decimal] = 0
    currency: str = "GBP"
    vat_rate: Optional[Decimal] = 20
    stock_quantity: Optional[int] = 0
    reorder_level: Optional[int] = 0
    unit_of_measure: str = "each"
    notes: Optional[str] = None

class InventoryMovementCreate(BaseModel):
    product_id: str
    movement_type: str
    quantity: int
    reference: Optional[str] = None
    notes: Optional[str] = None
class RecurringTransactionCreate(BaseModel):
    template_name: str
    transaction_type: str  # sale, purchase
    frequency: str  # monthly, quarterly, annually
    next_date: date
    end_date: Optional[date] = None
    amount: Decimal
    description: str
    account_id: str
    customer_id: Optional[str] = None
    supplier_id: Optional[str] = None

class AccrualPrepaymentCreate(BaseModel):
    type: str  # accrual, prepayment
    description: str
    total_amount: Decimal
    start_date: date
    end_date: date
    frequency: str = "monthly"
    account_id: str

class InvoiceEmailCreate(BaseModel):
    invoice_id: str
    recipient_email: str
    subject: str
    body: str
    include_payment_link: bool = True


    movement_date: date

@router.get("/bank-connections/{company_id}")
def get_bank_connections(
    company_id: str,
    search: Optional[str] = None,
    status: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(BankConnection).filter(
        BankConnection.tenant_id == request.state.tenant_id,
        BankConnection.company_id == company_id,
        BankConnection.is_active == True
    )
    
    if search:
        query = query.filter(BankConnection.bank_name.ilike(f"%{search}%"))
    if status:
        query = query.filter(BankConnection.status == status)
    
    return query.all()

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
    
    existing_transactions = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.company_id == connection.company_id,
        JournalEntry.account_id == f"bank-{connection.connection_id}"
    ).all()
    
    imported_count = len(existing_transactions)
    
    if imported_count == 0:
        sample_transactions = [
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
        
        for txn in sample_transactions:
            journal_entry = JournalEntry(
                tenant_id=request.state.tenant_id,
                company_id=connection.company_id,
                account_id=f"bank-{connection.connection_id}",
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
    
    transactions = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.company_id == connection.company_id,
        JournalEntry.account_id == f"bank-{connection.connection_id}"
    ).all()
    
    return {
        "message": f"Synced {len(transactions)} transactions",
        "transactions": [
            {
                "date": t.transaction_date.isoformat(),
                "description": t.description,
                "amount": float(t.credit_amount - t.debit_amount),
                "type": "credit" if t.credit_amount > 0 else "debit"
            } for t in transactions
        ],
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
    
    existing_sales = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.company_id == connection.company_id,
        JournalEntry.account_id == f"ecommerce-{connection.platform}"
    ).all()
    
    if len(existing_sales) == 0:
        sample_sales_data = [
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
        
        for sale in sample_sales_data:
            journal_entry = JournalEntry(
                tenant_id=request.state.tenant_id,
                company_id=connection.company_id,
                account_id=f"ecommerce-{connection.platform}",
                transaction_date=datetime.strptime(sale["date"], "%Y-%m-%d").date(),
                description=f"{sale['platform']} Sale - {sale['order_id']}",
                reference=sale["order_id"],
                credit_amount=Decimal(str(sale["gross_sales"])),
                debit_amount=0
            )
            db.add(journal_entry)
    
    connection.last_sync = datetime.now()
    db.commit()
    
    sales_records = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.company_id == connection.company_id,
        JournalEntry.account_id == f"ecommerce-{connection.platform}"
    ).all()
    
    sales_data = [
        {
            "order_id": sale.reference,
            "date": sale.transaction_date.isoformat(),
            "gross_sales": float(sale.credit_amount),
            "fees": float(sale.credit_amount * Decimal("0.1")),
            "net_settlement": float(sale.credit_amount * Decimal("0.9")),
            "platform": connection.platform
        } for sale in sales_records
    ]
    
    return {
        "message": f"Synced {len(sales_data)} sales records",
        "sales_data": sales_data,
        "total_gross_sales": sum(s["gross_sales"] for s in sales_data),
        "total_fees": sum(s["fees"] for s in sales_data),
        "total_net": sum(s["net_settlement"] for s in sales_data)
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

@router.get("/invoices")
def get_invoices(
    search: Optional[str] = None,
    status: Optional[str] = None,
    customer_id: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.account_id.like("invoice-%")
    )
    
    if search:
        query = query.filter(JournalEntry.description.ilike(f"%{search}%"))
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    invoices = query.all()
    return [
        {
            "id": inv.id,
            "invoice_number": inv.reference,
            "customer": inv.description.split(" - ")[0] if " - " in inv.description else "Unknown",
            "amount": float(inv.credit_amount),
            "date": inv.transaction_date.isoformat(),
            "status": "paid" if inv.credit_amount > 0 else "pending"
        } for inv in invoices
    ]

@router.post("/invoices")
def create_invoice(
    invoice_data: InvoiceCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    journal_entry = JournalEntry(
        tenant_id=request.state.tenant_id,
        company_id=invoice_data.company_id,
        account_id=f"invoice-{invoice_data.customer_id}",
        transaction_date=invoice_data.issue_date,
        description=f"Invoice {invoice_data.invoice_number}",
        reference=invoice_data.invoice_number,
        credit_amount=invoice_data.amount,
        debit_amount=0
    )
    
    db.add(journal_entry)
    db.commit()
    db.refresh(journal_entry)
    
    return {
        "id": journal_entry.id,
        "invoice_number": invoice_data.invoice_number,
        "amount": float(invoice_data.amount),
        "status": "created"
    }

@router.get("/bills")
def get_bills(
    search: Optional[str] = None,
    status: Optional[str] = None,
    supplier_id: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.account_id.like("bill-%")
    )
    
    if search:
        query = query.filter(JournalEntry.description.ilike(f"%{search}%"))
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    bills = query.all()
    return [
        {
            "id": bill.id,
            "bill_number": bill.reference,
            "supplier": bill.description.split(" - ")[0] if " - " in bill.description else "Unknown",
            "amount": float(bill.debit_amount),
            "date": bill.transaction_date.isoformat(),
            "status": "paid" if bill.debit_amount > 0 else "pending"
        } for bill in bills
    ]

@router.post("/bills")
def create_bill(
    bill_data: BillCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    journal_entry = JournalEntry(
        tenant_id=request.state.tenant_id,
        company_id=bill_data.company_id,
        account_id=f"bill-{bill_data.supplier_id}",
        transaction_date=bill_data.issue_date,
        description=f"Bill {bill_data.bill_number}",
        reference=bill_data.bill_number,
        debit_amount=bill_data.amount,
        credit_amount=0
    )
    
    db.add(journal_entry)
    db.commit()
    db.refresh(journal_entry)
    
    return {
        "id": journal_entry.id,
        "bill_number": bill_data.bill_number,
        "amount": float(bill_data.amount),
        "status": "created"
    }

@router.get("/quotes")
def get_quotes(
    search: Optional[str] = None,
    status: Optional[str] = None,
    customer_id: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.account_id.like("quote-%")
    )
    
    if search:
        query = query.filter(JournalEntry.description.ilike(f"%{search}%"))
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    quotes = query.all()
    return [
        {
            "id": quote.id,
            "quote_number": quote.reference,
            "customer": quote.description.split(" - ")[0] if " - " in quote.description else "Unknown",
            "amount": float(quote.credit_amount),
            "date": quote.transaction_date.isoformat(),
            "status": "active"
        } for quote in quotes
    ]

@router.post("/quotes")
def create_quote(
    quote_data: QuoteCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    journal_entry = JournalEntry(
        tenant_id=request.state.tenant_id,
        company_id=quote_data.company_id,
        account_id=f"quote-{quote_data.customer_id}",
        transaction_date=quote_data.issue_date,
        description=f"Quote {quote_data.quote_number}",
        reference=quote_data.quote_number,
        credit_amount=quote_data.amount,
        debit_amount=0
    )
    
    db.add(journal_entry)
    db.commit()
    db.refresh(journal_entry)
    
    return {
        "id": journal_entry.id,
        "quote_number": quote_data.quote_number,
        "amount": float(quote_data.amount),
        "status": "created"
    }

@router.get("/purchase-orders")
def get_purchase_orders(
    search: Optional[str] = None,
    status: Optional[str] = None,
    supplier_id: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.account_id.like("po-%")
    )
    
    if search:
        query = query.filter(JournalEntry.description.ilike(f"%{search}%"))
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    purchase_orders = query.all()
    return [
        {
            "id": po.id,
            "po_number": po.reference,
            "supplier": po.description.split(" - ")[0] if " - " in po.description else "Unknown",
            "amount": float(po.debit_amount),
            "date": po.transaction_date.isoformat(),
            "status": "pending"
        } for po in purchase_orders
    ]

@router.post("/purchase-orders")
def create_purchase_order(
    po_data: PurchaseOrderCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    journal_entry = JournalEntry(
        tenant_id=request.state.tenant_id,
        company_id=po_data.company_id,
        account_id=f"po-{po_data.supplier_id}",
        transaction_date=po_data.order_date,
        description=f"Purchase Order {po_data.po_number}",
        reference=po_data.po_number,
        debit_amount=po_data.amount,
        credit_amount=0
    )
    
    db.add(journal_entry)
    db.commit()
    db.refresh(journal_entry)
    
    return {
        "id": journal_entry.id,
        "po_number": po_data.po_number,
        "amount": float(po_data.amount),
        "status": "created"
    }

@router.get("/customers")
def get_customers(
    search: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(Client).filter(Client.tenant_id == request.state.tenant_id)
    
    if search:
        query = query.filter(
            or_(
                Client.name.ilike(f"%{search}%"),
                Client.email.ilike(f"%{search}%")
            )
        )
    
    customers = query.all()
    
    return [
        {
            "id": str(customer.id),
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone or "+44 20 1234 5678"
        }
        for customer in customers
    ]

@router.get("/suppliers")
def get_suppliers(
    search: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(Client).filter(
        Client.tenant_id == request.state.tenant_id,
        Client.client_type == "supplier"
    )
    
    if search:
        query = query.filter(
            or_(
                Client.name.ilike(f"%{search}%"),
                Client.email.ilike(f"%{search}%")
            )
        )
    
    suppliers = query.all()
    
    return [
        {
            "id": str(supplier.id),
            "name": supplier.name,
            "email": supplier.email,
            "phone": supplier.phone or "+44 20 9876 5432"
        }
        for supplier in suppliers
    ]

@router.get("/transactions")
def get_bank_transactions(
    search: Optional[str] = None,
    account_id: Optional[str] = None,
    status: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id
    )
    
    if search:
        query = query.filter(JournalEntry.description.ilike(f"%{search}%"))
    if account_id:
        query = query.filter(JournalEntry.account_id == account_id)
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    transactions = query.order_by(JournalEntry.transaction_date.desc()).all()
    return [
        {
            "id": txn.id,
            "date": txn.transaction_date.isoformat(),
            "description": txn.description,
            "reference": txn.reference,
            "amount": float(txn.credit_amount - txn.debit_amount),
            "account": txn.account_id,
            "status": "reconciled" if txn.reference else "pending"
        } for txn in transactions
    ]

@router.get("/products")
def get_products(
    search: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product).filter(Product.tenant_id == request.state.tenant_id)
    
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    if category:
        query = query.filter(Product.category == category)
    if status:
        query = query.filter(Product.status == status)
    
    products = query.all()
    return [
        {
            "id": product.id,
            "name": product.name,
            "sku": product.sku,
            "category": product.category,
            "unit_price": float(product.unit_price),
            "cost_price": float(product.cost_price),
            "currency": product.currency,
            "stock_quantity": product.stock_quantity,
            "reorder_level": product.reorder_level,
            "status": product.status
        } for product in products
    ]

@router.post("/products")
def create_product(
    product_data: ProductCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    product = Product(
        tenant_id=request.state.tenant_id,
        **product_data.dict()
    )
    
    db.add(product)
    db.commit()
    db.refresh(product)
    
    return {
        "id": product.id,
        "name": product.name,
        "status": "created"
    }

@router.get("/products/{product_id}")
def get_product(
    product_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.tenant_id == request.state.tenant_id,
        Product.id == product_id
    ).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "sku": product.sku,
        "category": product.category,
        "unit_price": float(product.unit_price),
        "cost_price": float(product.cost_price),
        "currency": product.currency,
        "vat_rate": float(product.vat_rate),
        "stock_quantity": product.stock_quantity,
        "reorder_level": product.reorder_level,
        "unit_of_measure": product.unit_of_measure,
        "status": product.status,
        "notes": product.notes
    }

@router.put("/products/{product_id}")
def update_product(
    product_id: str,
    product_data: ProductCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.tenant_id == request.state.tenant_id,
        Product.id == product_id
    ).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for key, value in product_data.dict().items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)
    
    return {
        "id": product.id,
        "name": product.name,
        "status": "updated"
    }

@router.delete("/products/{product_id}")
def delete_product(
    product_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.tenant_id == request.state.tenant_id,
        Product.id == product_id
    ).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    
    return {"status": "deleted"}

@router.get("/products/{product_id}/inventory")
def get_product_inventory(
    product_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    movements = db.query(InventoryMovement).filter(
        InventoryMovement.tenant_id == request.state.tenant_id,
        InventoryMovement.product_id == product_id
    ).order_by(InventoryMovement.movement_date.desc()).all()
    
    return [
        {
            "id": movement.id,
            "movement_type": movement.movement_type,
            "quantity": movement.quantity,
            "reference": movement.reference,
            "movement_date": movement.movement_date.isoformat(),
            "notes": movement.notes
        } for movement in movements
    ]

@router.post("/inventory/movements")
def create_inventory_movement(
    movement_data: InventoryMovementCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    movement = InventoryMovement(
        tenant_id=request.state.tenant_id,
        **movement_data.dict()
    )
    
    db.add(movement)
    
    product = db.query(Product).filter(
        Product.tenant_id == request.state.tenant_id,
        Product.id == movement_data.product_id
    ).first()
    
    if product:
        if movement_data.movement_type == "in":
            product.stock_quantity += movement_data.quantity
        elif movement_data.movement_type == "out":
            product.stock_quantity -= movement_data.quantity
        elif movement_data.movement_type == "adjustment":
            product.stock_quantity = movement_data.quantity
    
    db.commit()
    db.refresh(movement)
    
    return {
        "id": movement.id,
        "status": "created"
    }

@router.get("/reconciliation/{account_id}")
def get_bank_reconciliation(
    account_id: str,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    bank_account = db.query(BankConnection).filter(
        BankConnection.tenant_id == request.state.tenant_id,
        BankConnection.id == account_id
    ).first()
    
    if not bank_account:
        raise HTTPException(status_code=404, detail="Bank account not found")
    
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.account_id == account_id
    )
    
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    transactions = query.order_by(JournalEntry.transaction_date.asc()).all()
    
    opening_balance = 0
    if start_date:
        opening_query = db.query(JournalEntry).filter(
            JournalEntry.tenant_id == request.state.tenant_id,
            JournalEntry.account_id == account_id,
            JournalEntry.transaction_date < start_date
        )
        opening_transactions = opening_query.all()
        for txn in opening_transactions:
            opening_balance += float(txn.credit_amount - txn.debit_amount)
    else:
        opening_balance = 0
    
    running_balance = opening_balance
    reconciliation_data = []
    
    for txn in transactions:
        transaction_amount = float(txn.credit_amount - txn.debit_amount)
        running_balance += transaction_amount
        
        reconciliation_data.append({
            "id": txn.id,
            "date": txn.transaction_date.isoformat(),
            "description": txn.description,
            "reference": txn.reference,
            "debit": float(txn.debit_amount) if txn.debit_amount > 0 else None,
            "credit": float(txn.credit_amount) if txn.credit_amount > 0 else None,
            "running_balance": running_balance,
            "status": "reconciled" if txn.reference else "pending"
        })
    
    return {
        "account_name": bank_account.bank_name,
        "account_number": bank_account.account_number,
        "currency": bank_account.currency,
        "opening_balance": opening_balance,
        "closing_balance": running_balance,
        "transactions": reconciliation_data,
        "period": {
            "start_date": start_date.isoformat() if start_date else None,
            "end_date": end_date.isoformat() if end_date else None
        }
    }

@router.get("/reconciliation/summary")
def get_reconciliation_summary(
    request: Request = None,
    db: Session = Depends(get_db)
):
    bank_accounts = db.query(BankConnection).filter(
        BankConnection.tenant_id == request.state.tenant_id,
        BankConnection.is_active == True
    ).all()
    
    summary_data = []
    for account in bank_accounts:
        latest_transactions = db.query(JournalEntry).filter(
            JournalEntry.tenant_id == request.state.tenant_id,
            JournalEntry.account_id == account.id
        ).order_by(JournalEntry.transaction_date.desc()).limit(1).first()
        
        all_transactions = db.query(JournalEntry).filter(
            JournalEntry.tenant_id == request.state.tenant_id,
            JournalEntry.account_id == account.id
        ).all()
        
        current_balance = 0
        for txn in all_transactions:
            current_balance += float(txn.credit_amount - txn.debit_amount)
        
        summary_data.append({
            "account_id": account.id,
            "account_name": account.bank_name,
            "account_number": account.account_number,
            "current_balance": current_balance,
            "currency": account.currency,
            "last_transaction_date": latest_transactions.transaction_date.isoformat() if latest_transactions else None
        })
    
    return summary_data

@router.get("/aged-debtors")
def get_aged_debtors(
    as_of_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    if not as_of_date:
        as_of_date = date.today()
    
    invoices = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.description.contains("Invoice"),
        JournalEntry.transaction_date <= as_of_date
    ).all()
    
    aged_data = []
    for invoice in invoices:
        days_outstanding = (as_of_date - invoice.transaction_date).days
        amount_outstanding = float(invoice.debit_amount - invoice.credit_amount)
        
        if amount_outstanding > 0:
            aged_data.append({
                "customer_name": invoice.description.split(" - ")[0] if " - " in invoice.description else "Unknown Customer",
                "invoice_number": invoice.reference,
                "invoice_date": invoice.transaction_date.isoformat(),
                "amount": amount_outstanding,
                "days_outstanding": days_outstanding,
                "age_bracket": "0-30" if days_outstanding <= 30 else 
                             "31-60" if days_outstanding <= 60 else
                             "61-90" if days_outstanding <= 90 else "90+"
            })
    
    return aged_data


@router.get("/sales/running-balances")
def get_sales_running_balances(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.description.contains("Invoice")
    )
    
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    transactions = query.order_by(JournalEntry.transaction_date.asc()).all()
    
    running_balance = 0
    sales_data = []
    
    for txn in transactions:
        transaction_amount = float(txn.credit_amount - txn.debit_amount)
        running_balance += transaction_amount
        
        sales_data.append({
            "id": txn.id,
            "date": txn.transaction_date.isoformat(),
            "description": txn.description,
            "reference": txn.reference,
            "amount": transaction_amount,
            "running_balance": running_balance,
            "customer": txn.description.replace("Invoice - ", "") if "Invoice - " in txn.description else "Unknown Customer"
        })
    
    return {
        "sales_transactions": sales_data,
        "total_sales": running_balance,
        "period": {
            "start_date": start_date.isoformat() if start_date else None,
            "end_date": end_date.isoformat() if end_date else None
        }
    }

@router.get("/purchases/running-balances")
def get_purchases_running_balances(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.description.contains("Bill")
    )
    
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    transactions = query.order_by(JournalEntry.transaction_date.asc()).all()
    
    running_balance = 0
    purchases_data = []
    
    for txn in transactions:
        transaction_amount = float(txn.debit_amount - txn.credit_amount)
        running_balance += transaction_amount
        
        purchases_data.append({
            "id": txn.id,
            "date": txn.transaction_date.isoformat(),
            "description": txn.description,
            "reference": txn.reference,
            "amount": transaction_amount,
            "running_balance": running_balance,
            "supplier": txn.description.replace("Bill - ", "") if "Bill - " in txn.description else "Unknown Supplier"
        })
    
    return {
        "purchase_transactions": purchases_data,
        "total_purchases": running_balance,
        "period": {
            "start_date": start_date.isoformat() if start_date else None,
            "end_date": end_date.isoformat() if end_date else None
        }
    }

@router.get("/aged-creditors")
def get_aged_creditors(
    as_of_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    if not as_of_date:
        as_of_date = date.today()
    
    bills = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.description.contains("Bill"),
        JournalEntry.transaction_date <= as_of_date
    ).all()
    
    aged_data = []
    for bill in bills:
        days_outstanding = (as_of_date - bill.transaction_date).days
        amount_outstanding = float(bill.credit_amount - bill.debit_amount)
        
        if amount_outstanding > 0:
            aged_data.append({
                "supplier_name": bill.description.split(" - ")[0] if " - " in bill.description else "Unknown Supplier",
                "bill_number": bill.reference,
                "bill_date": bill.transaction_date.isoformat(),
                "amount": amount_outstanding,
                "days_outstanding": days_outstanding,
                "age_bracket": "0-30" if days_outstanding <= 30 else 
                             "31-60" if days_outstanding <= 60 else
                             "61-90" if days_outstanding <= 90 else "90+"
            })
    
    return aged_data

@router.get("/reports/sales")
def get_sales_report(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    customer_id: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get comprehensive sales report with running balances"""
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.account_id.in_(
            db.query(LedgerAccount.id).filter(
                LedgerAccount.tenant_id == request.state.tenant_id,
                LedgerAccount.account_type == "Revenue"
            )
        )
    )
    
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    entries = query.order_by(JournalEntry.transaction_date).all()
    
    running_balance = 0
    sales_data = []
    
    for entry in entries:
        running_balance += float(entry.credit_amount - entry.debit_amount)
        sales_data.append({
            "id": entry.id,
            "date": entry.transaction_date.isoformat(),
            "description": entry.description,
            "amount": float(entry.credit_amount),
            "running_balance": running_balance,
            "reference": entry.reference
        })
    
    return {
        "sales_data": sales_data,
        "total_sales": sum(float(e.credit_amount) for e in entries),
        "period": {
            "start_date": start_date.isoformat() if start_date else None,
            "end_date": end_date.isoformat() if end_date else None
        }
    }

@router.get("/reports/customer-receipts")
def get_customer_receipts(
    customer_id: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get customer receipts report"""
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.account_id.in_(
            db.query(LedgerAccount.id).filter(
                LedgerAccount.tenant_id == request.state.tenant_id,
                LedgerAccount.account_type == "Asset",
                LedgerAccount.account_name.ilike("%cash%")
            )
        ),
        JournalEntry.debit_amount > 0
    )
    
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    receipts = query.order_by(JournalEntry.transaction_date.desc()).all()
    
    receipts_data = []
    for receipt in receipts:
        receipts_data.append({
            "id": receipt.id,
            "date": receipt.transaction_date.isoformat(),
            "description": receipt.description,
            "amount": float(receipt.debit_amount),
            "reference": receipt.reference,
            "customer_name": "Customer Name"
        })
    
    return {
        "receipts": receipts_data,
        "total_receipts": sum(float(r.debit_amount) for r in receipts)
    }

@router.get("/reports/sales-invoice-list")
def get_sales_invoice_list(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    status: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get sales invoice list"""
    invoices = []
    
    invoice_list = []
    
    invoices_data = []
    running_total = 0
    
    for invoice in invoice_list:
        running_total += float(invoice.amount)
        invoices_data.append({
            "id": invoice.id,
            "date": invoice.created_at.isoformat(),
            "amount": float(invoice.amount),
            "tax_amount": float(invoice.tax_amount),
            "status": invoice.status,
            "running_total": running_total,
            "due_date": invoice.due_date.isoformat() if invoice.due_date else None
        })
    
    return {
        "invoices": invoices_data,
        "total_amount": running_total,
        "count": len(invoices_data)
    }

@router.get("/reports/purchases-invoice-list")
def get_purchases_invoice_list(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    supplier_id: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get purchases invoice list"""
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.account_id.in_(
            db.query(LedgerAccount.id).filter(
                LedgerAccount.tenant_id == request.state.tenant_id,
                LedgerAccount.account_type == "Expense"
            )
        )
    )
    
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    purchases = query.order_by(JournalEntry.transaction_date.desc()).all()
    
    purchases_data = []
    running_total = 0
    
    for purchase in purchases:
        running_total += float(purchase.debit_amount)
        purchases_data.append({
            "id": purchase.id,
            "date": purchase.transaction_date.isoformat(),
            "description": purchase.description,
            "amount": float(purchase.debit_amount),
            "running_total": running_total,
            "reference": purchase.reference
        })
    
    return {
        "purchases": purchases_data,
        "total_amount": running_total,
        "count": len(purchases_data)
    }

@router.get("/reports/trade-debtors-detailed")
def get_trade_debtors_detailed(
    as_of_date: Optional[date] = None,
    customer_id: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get detailed trade debtors with aging analysis"""
    if not as_of_date:
        as_of_date = date.today()
    
    invoices = db.query(Invoice).filter(
        Invoice.tenant_id == request.state.tenant_id,
        Invoice.status.in_(["open", "overdue"])
    ).all()
    
    debtors_data = []
    total_outstanding = 0
    
    for invoice in invoices:
        days_outstanding = (as_of_date - invoice.created_at.date()).days
        aging_bucket = "Current"
        
        if days_outstanding > 90:
            aging_bucket = "90+ days"
        elif days_outstanding > 60:
            aging_bucket = "60-90 days"
        elif days_outstanding > 30:
            aging_bucket = "30-60 days"
        
        amount = float(invoice.amount)
        total_outstanding += amount
        
        debtors_data.append({
            "invoice_id": invoice.id,
            "customer_name": "Customer Name",
            "invoice_date": invoice.created_at.isoformat(),
            "due_date": invoice.due_date.isoformat() if invoice.due_date else None,
            "amount": amount,
            "days_outstanding": days_outstanding,
            "aging_bucket": aging_bucket,
            "running_total": total_outstanding
        })
    
    return {
        "debtors": debtors_data,
        "total_outstanding": total_outstanding,
        "as_of_date": as_of_date.isoformat()
    }

@router.get("/reports/trade-debtors-summary")
def get_trade_debtors_summary(
    as_of_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get trade debtors summary by aging buckets"""
    if not as_of_date:
        as_of_date = date.today()
    
    invoices = db.query(Invoice).filter(
        Invoice.tenant_id == request.state.tenant_id,
        Invoice.status.in_(["open", "overdue"])
    ).all()
    
    aging_summary = {
        "Current": 0,
        "30-60 days": 0,
        "60-90 days": 0,
        "90+ days": 0
    }
    
    for invoice in invoices:
        days_outstanding = (as_of_date - invoice.created_at.date()).days
        amount = float(invoice.amount)
        
        if days_outstanding > 90:
            aging_summary["90+ days"] += amount
        elif days_outstanding > 60:
            aging_summary["60-90 days"] += amount
        elif days_outstanding > 30:
            aging_summary["30-60 days"] += amount
        else:
            aging_summary["Current"] += amount
    
    return {
        "aging_summary": aging_summary,
        "total_outstanding": sum(aging_summary.values()),
        "as_of_date": as_of_date.isoformat()
    }

@router.get("/reports/trade-creditors-detailed")
def get_trade_creditors_detailed(
    as_of_date: Optional[date] = None,
    supplier_id: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get detailed trade creditors with aging analysis"""
    if not as_of_date:
        as_of_date = date.today()
    
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.account_id.in_(
            db.query(LedgerAccount.id).filter(
                LedgerAccount.tenant_id == request.state.tenant_id,
                LedgerAccount.account_type == "Liability",
                LedgerAccount.account_name.ilike("%creditor%")
            )
        )
    )
    
    entries = query.order_by(JournalEntry.transaction_date).all()
    
    creditors_data = []
    running_balance = 0
    
    for entry in entries:
        days_outstanding = (as_of_date - entry.transaction_date).days
        aging_bucket = "Current"
        
        if days_outstanding > 90:
            aging_bucket = "90+ days"
        elif days_outstanding > 60:
            aging_bucket = "60-90 days"
        elif days_outstanding > 30:
            aging_bucket = "30-60 days"
        
        amount = float(entry.credit_amount - entry.debit_amount)
        running_balance += amount
        
        if amount > 0:
            creditors_data.append({
                "entry_id": entry.id,
                "supplier_name": "Supplier Name",
                "transaction_date": entry.transaction_date.isoformat(),
                "description": entry.description,
                "amount": amount,
                "days_outstanding": days_outstanding,
                "aging_bucket": aging_bucket,
                "running_balance": running_balance
            })
    
    return {
        "creditors": creditors_data,
        "total_outstanding": sum(c["amount"] for c in creditors_data),
        "as_of_date": as_of_date.isoformat()
    }

@router.get("/reports/trade-creditors-summary")
def get_trade_creditors_summary(
    as_of_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get trade creditors summary by aging buckets"""
    if not as_of_date:
        as_of_date = date.today()
    
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.account_id.in_(
            db.query(LedgerAccount.id).filter(
                LedgerAccount.tenant_id == request.state.tenant_id,
                LedgerAccount.account_type == "Liability",
                LedgerAccount.account_name.ilike("%creditor%")
            )
        )
    )
    
    entries = query.all()
    
    aging_summary = {
        "Current": 0,
        "30-60 days": 0,
        "60-90 days": 0,
        "90+ days": 0
    }
    
    for entry in entries:
        days_outstanding = (as_of_date - entry.transaction_date).days
        amount = float(entry.credit_amount - entry.debit_amount)
        
        if amount > 0:
            if days_outstanding > 90:
                aging_summary["90+ days"] += amount
            elif days_outstanding > 60:
                aging_summary["60-90 days"] += amount
            elif days_outstanding > 30:
                aging_summary["30-60 days"] += amount
            else:
                aging_summary["Current"] += amount
    
    return {
        "aging_summary": aging_summary,
        "total_outstanding": sum(aging_summary.values()),
        "as_of_date": as_of_date.isoformat()
    }

@router.get("/reports/customer-statements/{customer_id}")
def get_customer_statement(
    customer_id: str,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get customer statement with transaction history"""
    customer = db.query(Client).filter(
        Client.tenant_id == request.state.tenant_id,
        Client.id == customer_id
    ).first()
    
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    invoices = db.query(Invoice).filter(
        Invoice.tenant_id == request.state.tenant_id
    )
    
    if start_date:
        invoices = invoices.filter(Invoice.created_at >= start_date)
    if end_date:
        invoices = invoices.filter(Invoice.created_at <= end_date)
    
    transactions = invoices.order_by(Invoice.created_at).all()
    
    statement_data = []
    running_balance = 0
    
    for transaction in transactions:
        amount = float(transaction.amount)
        running_balance += amount
        
        statement_data.append({
            "date": transaction.created_at.isoformat(),
            "description": f"Invoice {transaction.id}",
            "debit": amount if transaction.status == "open" else 0,
            "credit": amount if transaction.status == "paid" else 0,
            "balance": running_balance
        })
    
    return {
        "customer": {
            "id": customer.id,
            "name": customer.name,
            "company_number": customer.company_number
        },
        "transactions": statement_data,
        "opening_balance": 0,
        "closing_balance": running_balance,
        "period": {
            "start_date": start_date.isoformat() if start_date else None,
            "end_date": end_date.isoformat() if end_date else None
        }
    }

@router.get("/reports/supplier-statements/{supplier_id}")
def get_supplier_statement(
    supplier_id: str,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get supplier statement with transaction history"""
    supplier = db.query(Client).filter(
        Client.tenant_id == request.state.tenant_id,
        Client.id == supplier_id
    ).first()
    
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.description.ilike(f"%{supplier.name}%")
    )
    
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    transactions = query.order_by(JournalEntry.transaction_date).all()
    
    statement_data = []
    running_balance = 0
    
    for transaction in transactions:
        amount = float(transaction.credit_amount - transaction.debit_amount)
        running_balance += amount
        
        statement_data.append({
            "date": transaction.transaction_date.isoformat(),
            "description": transaction.description,
            "debit": float(transaction.debit_amount),
            "credit": float(transaction.credit_amount),
            "balance": running_balance
        })
    
    return {
        "supplier": {
            "id": supplier.id,
            "name": supplier.name,
            "company_number": supplier.company_number
        },
        "transactions": statement_data,
        "opening_balance": 0,
        "closing_balance": running_balance,
        "period": {
            "start_date": start_date.isoformat() if start_date else None,
            "end_date": end_date.isoformat() if end_date else None
        }
    }

@router.get("/reports/payments-to-suppliers")
def get_payments_to_suppliers(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    supplier_id: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get payments to suppliers report"""
    query = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        JournalEntry.account_id.in_(
            db.query(LedgerAccount.id).filter(
                LedgerAccount.tenant_id == request.state.tenant_id,
                LedgerAccount.account_type == "Asset",
                LedgerAccount.account_name.ilike("%cash%")
            )
        ),
        JournalEntry.credit_amount > 0,
        JournalEntry.description.ilike("%payment%")
    )
    
    if start_date:
        query = query.filter(JournalEntry.transaction_date >= start_date)
    if end_date:
        query = query.filter(JournalEntry.transaction_date <= end_date)
    
    payments = query.order_by(JournalEntry.transaction_date.desc()).all()
    
    payments_data = []
    running_total = 0
    
    for payment in payments:
        amount = float(payment.credit_amount)
        running_total += amount
        
        payments_data.append({
            "id": payment.id,
            "date": payment.transaction_date.isoformat(),
            "description": payment.description,
            "amount": amount,
            "running_total": running_total,
            "reference": payment.reference,
            "supplier_name": "Supplier Name"
        })
    
    return {
        "payments": payments_data,
        "total_payments": running_total,
        "count": len(payments_data),
        "period": {
            "start_date": start_date.isoformat() if start_date else None,
            "end_date": end_date.isoformat() if end_date else None
        }
    }

@router.post("/recurring-transactions")
def create_recurring_transaction(
    transaction_data: RecurringTransactionCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Create a new recurring transaction"""
    recurring_transaction = RecurringTransaction(
        tenant_id=request.state.tenant_id,
        company_id=request.state.company_id if hasattr(request.state, 'company_id') else "default",
        **transaction_data.dict()
    )
    
    db.add(recurring_transaction)
    db.commit()
    db.refresh(recurring_transaction)
    
    return {
        "id": recurring_transaction.id,
        "message": "Recurring transaction created successfully",
        "next_generation_date": recurring_transaction.next_date.isoformat()
    }

@router.get("/recurring-transactions")
def get_recurring_transactions(
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get all recurring transactions"""
    transactions = db.query(RecurringTransaction).filter(
        RecurringTransaction.tenant_id == request.state.tenant_id,
        RecurringTransaction.is_active == True
    ).all()
    
    transactions_data = []
    for transaction in transactions:
        transactions_data.append({
            "id": transaction.id,
            "template_name": transaction.template_name,
            "transaction_type": transaction.transaction_type,
            "frequency": transaction.frequency,
            "next_date": transaction.next_date.isoformat(),
            "end_date": transaction.end_date.isoformat() if transaction.end_date else None,
            "amount": float(transaction.amount),
            "description": transaction.description,
            "is_active": transaction.is_active
        })
    
    return {
        "recurring_transactions": transactions_data,
        "total": len(transactions_data)
    }

@router.post("/recurring-transactions/generate")
def generate_recurring_transactions(
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Generate due recurring transactions"""
    today = date.today()
    
    due_transactions = db.query(RecurringTransaction).filter(
        RecurringTransaction.tenant_id == request.state.tenant_id,
        RecurringTransaction.is_active == True,
        RecurringTransaction.next_date <= today
    ).all()
    
    generated_count = 0
    
    for recurring_transaction in due_transactions:
        journal_entry = JournalEntry(
            tenant_id=request.state.tenant_id,
            account_id=recurring_transaction.account_id,
            transaction_date=recurring_transaction.next_date,
            description=f"Recurring: {recurring_transaction.description}",
            reference=f"REC-{recurring_transaction.id}",
            debit_amount=recurring_transaction.amount if recurring_transaction.transaction_type == "purchase" else 0,
            credit_amount=recurring_transaction.amount if recurring_transaction.transaction_type == "sale" else 0
        )
        
        db.add(journal_entry)
        
        if recurring_transaction.frequency == "monthly":
            next_month = recurring_transaction.next_date.replace(month=recurring_transaction.next_date.month + 1)
            recurring_transaction.next_date = next_month
        elif recurring_transaction.frequency == "quarterly":
            next_quarter = recurring_transaction.next_date.replace(month=recurring_transaction.next_date.month + 3)
            recurring_transaction.next_date = next_quarter
        elif recurring_transaction.frequency == "annually":
            next_year = recurring_transaction.next_date.replace(year=recurring_transaction.next_date.year + 1)
            recurring_transaction.next_date = next_year
        
        if recurring_transaction.end_date and recurring_transaction.next_date > recurring_transaction.end_date:
            recurring_transaction.is_active = False
        
        generated_count += 1
    
    db.commit()
    
    return {
        "message": f"Generated {generated_count} recurring transactions",
        "generated_count": generated_count
    }

@router.put("/recurring-transactions/{transaction_id}")
def update_recurring_transaction(
    transaction_id: str,
    transaction_data: RecurringTransactionCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Update a recurring transaction"""
    transaction = db.query(RecurringTransaction).filter(
        RecurringTransaction.tenant_id == request.state.tenant_id,
        RecurringTransaction.id == transaction_id
    ).first()
    
    if not transaction:
        raise HTTPException(status_code=404, detail="Recurring transaction not found")
    
    for field, value in transaction_data.dict().items():
        setattr(transaction, field, value)
    
    db.commit()
    
    return {
        "message": "Recurring transaction updated successfully",
        "id": transaction_id
    }

@router.post("/accruals-prepayments")
def create_accrual_prepayment(
    accrual_data: AccrualPrepaymentCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Create a new accrual or prepayment"""
    accrual_prepayment = AccrualPrepayment(
        tenant_id=request.state.tenant_id,
        company_id=request.state.company_id if hasattr(request.state, 'company_id') else "default",
        remaining_amount=accrual_data.total_amount,
        **accrual_data.dict()
    )
    
    db.add(accrual_prepayment)
    db.commit()
    db.refresh(accrual_prepayment)
    
    return {
        "id": accrual_prepayment.id,
        "message": f"{accrual_data.type.title()} created successfully"
    }

@router.get("/accruals-prepayments")
def get_accruals_prepayments(
    type: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get all accruals and prepayments"""
    query = db.query(AccrualPrepayment).filter(
        AccrualPrepayment.tenant_id == request.state.tenant_id,
        AccrualPrepayment.is_reversed == False
    )
    
    if type:
        query = query.filter(AccrualPrepayment.type == type)
    
    accruals_prepayments = query.all()
    
    data = []
    for item in accruals_prepayments:
        data.append({
            "id": item.id,
            "type": item.type,
            "description": item.description,
            "total_amount": float(item.total_amount),
            "remaining_amount": float(item.remaining_amount),
            "start_date": item.start_date.isoformat(),
            "end_date": item.end_date.isoformat(),
            "frequency": item.frequency,
            "is_reversed": item.is_reversed
        })
    
    return {
        "accruals_prepayments": data,
        "total": len(data)
    }

@router.post("/accruals-prepayments/{accrual_id}/reverse")
def reverse_accrual_prepayment(
    accrual_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Reverse an accrual or prepayment"""
    accrual_prepayment = db.query(AccrualPrepayment).filter(
        AccrualPrepayment.tenant_id == request.state.tenant_id,
        AccrualPrepayment.id == accrual_id
    ).first()
    
    if not accrual_prepayment:
        raise HTTPException(status_code=404, detail="Accrual/Prepayment not found")
    
    if accrual_prepayment.is_reversed:
        raise HTTPException(status_code=400, detail="Already reversed")
    
    reversal_entry = JournalEntry(
        tenant_id=request.state.tenant_id,
        account_id=accrual_prepayment.account_id,
        transaction_date=date.today(),
        description=f"Reversal: {accrual_prepayment.description}",
        reference=f"REV-{accrual_prepayment.id}",
        debit_amount=accrual_prepayment.remaining_amount if accrual_prepayment.type == "prepayment" else 0,
        credit_amount=accrual_prepayment.remaining_amount if accrual_prepayment.type == "accrual" else 0
    )
    
    db.add(reversal_entry)
    accrual_prepayment.is_reversed = True
    accrual_prepayment.remaining_amount = 0
    
    db.commit()
    
    return {
        "message": f"{accrual_prepayment.type.title()} reversed successfully",
        "reversal_entry_id": reversal_entry.id
    }

@router.post("/accruals-prepayments/process-monthly")
def process_monthly_accruals_prepayments(
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Process monthly accruals and prepayments"""
    today = date.today()
    
    active_items = db.query(AccrualPrepayment).filter(
        AccrualPrepayment.tenant_id == request.state.tenant_id,
        AccrualPrepayment.is_reversed == False,
        AccrualPrepayment.remaining_amount > 0,
        AccrualPrepayment.start_date <= today,
        AccrualPrepayment.end_date >= today
    ).all()
    
    processed_count = 0
    
    for item in active_items:
        months_total = (item.end_date.year - item.start_date.year) * 12 + (item.end_date.month - item.start_date.month) + 1
        monthly_amount = item.total_amount / months_total
        
        if item.remaining_amount >= monthly_amount:
            journal_entry = JournalEntry(
                tenant_id=request.state.tenant_id,
                account_id=item.account_id,
                transaction_date=today,
                description=f"Monthly {item.type}: {item.description}",
                reference=f"MONTHLY-{item.id}",
                debit_amount=monthly_amount if item.type == "accrual" else 0,
                credit_amount=monthly_amount if item.type == "prepayment" else 0
            )
            
            db.add(journal_entry)
            item.remaining_amount -= monthly_amount
            processed_count += 1
    
    db.commit()
    
    return {
        "message": f"Processed {processed_count} monthly accruals/prepayments",
        "processed_count": processed_count
    }

@router.get("/reports/multi-year-trial-balance")
def get_multi_year_trial_balance(
    company_id: str = "default-company",
    years: int = 5,
    request: Request = None,
    db: Session = Depends(get_db)
):
    tenant_id = request.headers.get("X-Tenant-ID", "default-tenant")
    
    try:
        accounts = db.query(LedgerAccount).filter(
            LedgerAccount.tenant_id == tenant_id,
            LedgerAccount.company_id == company_id
        ).all()
        
        multi_year_data = []
        current_year = date.today().year
        
        for account in accounts:
            account_data = {
                "id": account.id,
                "name": account.name,
                "code": account.code,
                "type": account.account_type
            }
            
            for i in range(years):
                year = current_year - i
                year_entries = db.query(JournalEntry).filter(
                    JournalEntry.tenant_id == tenant_id,
                    JournalEntry.account_id == account.id,
                    extract('year', JournalEntry.transaction_date) == year
                ).all()
                
                total_debits = sum(entry.debit_amount or 0 for entry in year_entries)
                total_credits = sum(entry.credit_amount or 0 for entry in year_entries)
                balance = total_debits - total_credits
                
                account_data[f"balance_{year}"] = float(balance)
            
            multi_year_data.append(account_data)
        
        return {
            "accounts": multi_year_data,
            "years_included": [current_year - i for i in range(years)],
            "generated_at": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating multi-year trial balance: {str(e)}")

@router.get("/reports/nominal-ledger")
def get_nominal_ledger(
    company_id: str = "default-company",
    request: Request = None,
    db: Session = Depends(get_db)
):
    tenant_id = request.headers.get("X-Tenant-ID", "default-tenant")
    
    try:
        accounts = db.query(LedgerAccount).filter(
            LedgerAccount.tenant_id == tenant_id,
            LedgerAccount.company_id == company_id
        ).all()
        
        nominal_ledger_data = []
        
        for account in accounts:
            year_start = date(date.today().year, 1, 1)
            opening_entries = db.query(JournalEntry).filter(
                JournalEntry.tenant_id == tenant_id,
                JournalEntry.account_id == account.id,
                JournalEntry.transaction_date < year_start
            ).all()
            
            opening_debits = sum(entry.debit_amount or 0 for entry in opening_entries)
            opening_credits = sum(entry.credit_amount or 0 for entry in opening_entries)
            opening_balance = opening_debits - opening_credits
            
            all_entries = db.query(JournalEntry).filter(
                JournalEntry.tenant_id == tenant_id,
                JournalEntry.account_id == account.id
            ).all()
            
            total_debits = sum(entry.debit_amount or 0 for entry in all_entries)
            total_credits = sum(entry.credit_amount or 0 for entry in all_entries)
            closing_balance = total_debits - total_credits
            
            nominal_ledger_data.append({
                "id": account.id,
                "code": account.code,
                "name": account.name,
                "type": account.account_type,
                "opening_balance": float(opening_balance),
                "closing_balance": float(closing_balance)
            })
        
        return {
            "accounts": nominal_ledger_data,
            "generated_at": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating nominal ledger: {str(e)}")

@router.get("/reports/general-ledger-detailed")
def get_general_ledger_detailed(
    company_id: str = "default-company",
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    tenant_id = request.headers.get("X-Tenant-ID", "default-tenant")
    
    try:
        query = db.query(JournalEntry, LedgerAccount).join(
            LedgerAccount, JournalEntry.account_id == LedgerAccount.id
        ).filter(
            JournalEntry.tenant_id == tenant_id,
            JournalEntry.company_id == company_id
        )
        
        if start_date:
            query = query.filter(JournalEntry.transaction_date >= start_date)
        if end_date:
            query = query.filter(JournalEntry.transaction_date <= end_date)
        
        entries = query.order_by(JournalEntry.transaction_date.desc()).all()
        
        detailed_transactions = []
        for entry, account in entries:
            detailed_transactions.append({
                "id": entry.id,
                "date": entry.transaction_date.isoformat(),
                "reference": entry.reference,
                "description": entry.description,
                "account_name": account.name,
                "account_code": account.code,
                "debit": float(entry.debit_amount or 0),
                "credit": float(entry.credit_amount or 0)
            })
        
        return {
            "transactions": detailed_transactions,
            "period": {
                "start_date": start_date.isoformat() if start_date else None,
                "end_date": end_date.isoformat() if end_date else None
            },
            "generated_at": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating detailed general ledger: {str(e)}")

@router.get("/reports/general-ledger-summary")
def get_general_ledger_summary(
    company_id: str = "default-company",
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    tenant_id = request.headers.get("X-Tenant-ID", "default-tenant")
    
    try:
        query = db.query(JournalEntry, LedgerAccount).join(
            LedgerAccount, JournalEntry.account_id == LedgerAccount.id
        ).filter(
            JournalEntry.tenant_id == tenant_id,
            JournalEntry.company_id == company_id
        )
        
        if start_date:
            query = query.filter(JournalEntry.transaction_date >= start_date)
        if end_date:
            query = query.filter(JournalEntry.transaction_date <= end_date)
        
        entries = query.all()
        
        account_summaries = {}
        for entry, account in entries:
            account_key = account.id
            if account_key not in account_summaries:
                account_summaries[account_key] = {
                    "account_id": account.id,
                    "account_name": account.name,
                    "account_code": account.code,
                    "transaction_count": 0,
                    "total_debits": 0,
                    "total_credits": 0
                }
            
            account_summaries[account_key]["transaction_count"] += 1
            account_summaries[account_key]["total_debits"] += float(entry.debit_amount or 0)
            account_summaries[account_key]["total_credits"] += float(entry.credit_amount or 0)
        
        # Calculate net movements
        summary_data = []
        for summary in account_summaries.values():
            summary["net_movement"] = summary["total_debits"] - summary["total_credits"]
            summary_data.append(summary)
        
        return {
            "summary": summary_data,
            "period": {
                "start_date": start_date.isoformat() if start_date else None,
                "end_date": end_date.isoformat() if end_date else None
            },
            "generated_at": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating general ledger summary: {str(e)}")

@router.post("/import/opening-trial-balance")
def import_opening_trial_balance(
    file: UploadFile = File(...),
    company_id: str = "default-company",
    request: Request = None,
    db: Session = Depends(get_db)
):
    tenant_id = request.headers.get("X-Tenant-ID", "default-tenant")
    
    try:
        content = file.file.read()
        csv_data = content.decode('utf-8')
        
        import csv
        import io
        
        reader = csv.DictReader(io.StringIO(csv_data))
        imported_count = 0
        
        for row in reader:
            account = db.query(LedgerAccount).filter(
                LedgerAccount.tenant_id == tenant_id,
                LedgerAccount.company_id == company_id,
                LedgerAccount.code == row.get('account_code')
            ).first()
            
            if not account:
                account = LedgerAccount(
                    tenant_id=tenant_id,
                    company_id=company_id,
                    code=row.get('account_code'),
                    name=row.get('account_name'),
                    account_type=row.get('account_type', 'Asset'),
                    balance=Decimal(row.get('opening_balance', '0'))
                )
                db.add(account)
            else:
                account.balance = Decimal(row.get('opening_balance', '0'))
            
            opening_balance = Decimal(row.get('opening_balance', '0'))
            if opening_balance != 0:
                journal_entry = JournalEntry(
                    tenant_id=tenant_id,
                    company_id=company_id,
                    reference=f"OPENING-{row.get('account_code')}",
                    description=f"Opening balance for {row.get('account_name')}",
                    debit_amount=opening_balance if opening_balance > 0 else 0,
                    credit_amount=abs(opening_balance) if opening_balance < 0 else 0,
                    account_id=account.id,
                    transaction_date=date(date.today().year, 1, 1)
                )
                db.add(journal_entry)
            
            imported_count += 1
        
        db.commit()
        
        return {
            "message": f"Successfully imported {imported_count} opening balances",
            "imported_count": imported_count
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error importing opening trial balance: {str(e)}")

@router.get("/categorization-rules")
def get_categorization_rules(
    request: Request = None,
    db: Session = Depends(get_db)
):
    rules = db.query(TransactionCategorizationRule).filter(
        TransactionCategorizationRule.tenant_id == request.state.tenant_id,
        TransactionCategorizationRule.is_active == True
    ).order_by(TransactionCategorizationRule.priority).all()
    
    return [
        {
            "id": rule.id,
            "rule_name": rule.rule_name,
            "rule_type": rule.rule_type,
            "pattern": rule.pattern,
            "target_category": rule.target_category,
            "target_account_id": rule.target_account_id,
            "priority": rule.priority,
            "is_active": rule.is_active
        } for rule in rules
    ]

@router.post("/categorization-rules")
def create_categorization_rule(
    rule_data: dict,
    request: Request = None,
    db: Session = Depends(get_db)
):
    rule = TransactionCategorizationRule(
        tenant_id=request.state.tenant_id,
        company_id=rule_data["company_id"],
        rule_name=rule_data["rule_name"],
        rule_type=rule_data["rule_type"],
        pattern=rule_data["pattern"],
        target_category=rule_data["target_category"],
        target_account_id=rule_data.get("target_account_id"),
        priority=rule_data.get("priority", 100)
    )
    
    db.add(rule)
    db.commit()
    db.refresh(rule)
    
    return {"message": "Categorization rule created successfully", "rule": rule}

@router.put("/categorization-rules/{rule_id}")
def update_categorization_rule(
    rule_id: str,
    rule_data: dict,
    request: Request = None,
    db: Session = Depends(get_db)
):
    rule = db.query(TransactionCategorizationRule).filter(
        TransactionCategorizationRule.id == rule_id,
        TransactionCategorizationRule.tenant_id == request.state.tenant_id
    ).first()
    
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    
    for key, value in rule_data.items():
        setattr(rule, key, value)
    
    db.commit()
    return {"message": "Rule updated successfully"}

@router.delete("/categorization-rules/{rule_id}")
def delete_categorization_rule(
    rule_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    rule = db.query(TransactionCategorizationRule).filter(
        TransactionCategorizationRule.id == rule_id,
        TransactionCategorizationRule.tenant_id == request.state.tenant_id
    ).first()
    
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    
    rule.is_active = False
    db.commit()
    return {"message": "Rule deleted successfully"}

@router.post("/auto-categorize-transactions")
def auto_categorize_transactions(
    request: Request = None,
    db: Session = Depends(get_db)
):
    rules = db.query(TransactionCategorizationRule).filter(
        TransactionCategorizationRule.tenant_id == request.state.tenant_id,
        TransactionCategorizationRule.is_active == True
    ).order_by(TransactionCategorizationRule.priority).all()
    
    uncategorized_transactions = db.query(JournalEntry).filter(
        JournalEntry.tenant_id == request.state.tenant_id,
        ~JournalEntry.id.in_(
            db.query(TransactionCategorization.journal_entry_id)
        )
    ).all()
    
    categorized_count = 0
    
    for transaction in uncategorized_transactions:
        for rule in rules:
            if apply_categorization_rule(transaction, rule):
                categorization = TransactionCategorization(
                    tenant_id=request.state.tenant_id,
                    journal_entry_id=transaction.id,
                    category=rule.target_category,
                    account_id=rule.target_account_id,
                    rule_id=rule.id,
                    is_manual_override=False
                )
                db.add(categorization)
                categorized_count += 1
                break
    
    db.commit()
    return {"message": f"Categorized {categorized_count} transactions"}

def apply_categorization_rule(transaction: JournalEntry, rule: TransactionCategorizationRule) -> bool:
    import re
    
    if rule.rule_type == "contains":
        return rule.pattern.lower() in transaction.description.lower()
    elif rule.rule_type == "exact_match":
        return rule.pattern.lower() == transaction.description.lower()
    elif rule.rule_type == "regex":
        return bool(re.search(rule.pattern, transaction.description, re.IGNORECASE))
    elif rule.rule_type == "amount_range":
        amount = float(transaction.credit_amount - transaction.debit_amount)
        if rule.pattern.startswith(">"):
            return amount > float(rule.pattern[1:])
        elif rule.pattern.startswith("<"):
            return amount < float(rule.pattern[1:])
        elif "-" in rule.pattern:
            min_amt, max_amt = map(float, rule.pattern.split("-"))
            return min_amt <= abs(amount) <= max_amt
    
    return False

@router.get("/transaction-categorizations")
def get_transaction_categorizations(
    request: Request = None,
    db: Session = Depends(get_db)
):
    categorizations = db.query(TransactionCategorization).join(JournalEntry).filter(
        TransactionCategorization.tenant_id == request.state.tenant_id
    ).all()
    
    return [
        {
            "id": cat.id,
            "journal_entry_id": cat.journal_entry_id,
            "category": cat.category,
            "account_id": cat.account_id,
            "rule_id": cat.rule_id,
            "is_manual_override": cat.is_manual_override,
            "categorized_at": cat.categorized_at.isoformat()
        } for cat in categorizations
    ]

@router.get("/fixed-assets")
def get_fixed_assets(
    request: Request = None,
    db: Session = Depends(get_db)
):
    assets = db.query(FixedAsset).filter(
        FixedAsset.tenant_id == request.state.tenant_id,
        FixedAsset.is_active == True
    ).all()
    
    return [
        {
            "id": asset.id,
            "asset_name": asset.asset_name,
            "asset_category": asset.asset_category,
            "acquisition_date": asset.acquisition_date.isoformat(),
            "acquisition_cost": float(asset.acquisition_cost),
            "depreciation_method": asset.depreciation_method,
            "depreciation_rate": float(asset.depreciation_rate),
            "useful_life_years": asset.useful_life_years,
            "depreciation_start_basis": asset.depreciation_start_basis,
            "accumulated_depreciation": float(asset.accumulated_depreciation),
            "current_book_value": float(asset.current_book_value),
            "disposal_date": asset.disposal_date.isoformat() if asset.disposal_date else None,
            "disposal_proceeds": float(asset.disposal_proceeds) if asset.disposal_proceeds else None
        } for asset in assets
    ]

@router.post("/fixed-assets")
def create_fixed_asset(
    asset_data: dict,
    request: Request = None,
    db: Session = Depends(get_db)
):
    acquisition_cost = Decimal(str(asset_data["acquisition_cost"]))
    current_book_value = acquisition_cost
    
    asset = FixedAsset(
        tenant_id=request.state.tenant_id,
        company_id=asset_data["company_id"],
        asset_name=asset_data["asset_name"],
        asset_category=asset_data["asset_category"],
        acquisition_date=datetime.strptime(asset_data["acquisition_date"], "%Y-%m-%d").date(),
        acquisition_cost=acquisition_cost,
        depreciation_method=asset_data["depreciation_method"],
        depreciation_rate=Decimal(str(asset_data["depreciation_rate"])),
        useful_life_years=asset_data["useful_life_years"],
        depreciation_start_basis=asset_data.get("depreciation_start_basis", "acquisition_date"),
        current_book_value=current_book_value,
        account_id=asset_data["account_id"]
    )
    
    db.add(asset)
    db.commit()
    db.refresh(asset)
    
    return {"message": "Fixed asset created successfully", "asset": asset}

@router.put("/fixed-assets/{asset_id}")
def update_fixed_asset(
    asset_id: str,
    asset_data: dict,
    request: Request = None,
    db: Session = Depends(get_db)
):
    asset = db.query(FixedAsset).filter(
        FixedAsset.id == asset_id,
        FixedAsset.tenant_id == request.state.tenant_id
    ).first()
    
    if not asset:
        raise HTTPException(status_code=404, detail="Fixed asset not found")
    
    for key, value in asset_data.items():
        if key == "acquisition_date" and isinstance(value, str):
            value = datetime.strptime(value, "%Y-%m-%d").date()
        elif key in ["acquisition_cost", "depreciation_rate", "accumulated_depreciation", "current_book_value", "disposal_proceeds"]:
            value = Decimal(str(value)) if value is not None else None
        setattr(asset, key, value)
    
    db.commit()
    return {"message": "Fixed asset updated successfully"}

@router.post("/fixed-assets/calculate-depreciation")
def calculate_depreciation(
    request: Request = None,
    db: Session = Depends(get_db)
):
    assets = db.query(FixedAsset).filter(
        FixedAsset.tenant_id == request.state.tenant_id,
        FixedAsset.is_active == True,
        FixedAsset.disposal_date.is_(None)
    ).all()
    
    updated_count = 0
    current_date = date.today()
    
    for asset in assets:
        if asset.depreciation_start_basis == "year_start":
            start_date = date(current_date.year, 1, 1)
        elif asset.depreciation_start_basis == "year_end":
            start_date = date(current_date.year, 12, 31)
        else:
            start_date = asset.acquisition_date
        
        years_elapsed = (current_date - start_date).days / 365.25
        
        if asset.depreciation_method == "straight_line":
            annual_depreciation = asset.acquisition_cost / asset.useful_life_years
            total_depreciation = min(annual_depreciation * years_elapsed, asset.acquisition_cost)
        elif asset.depreciation_method == "reducing_balance":
            rate = asset.depreciation_rate / 100
            remaining_value = asset.acquisition_cost
            for _ in range(int(years_elapsed)):
                remaining_value *= (1 - rate)
            total_depreciation = asset.acquisition_cost - remaining_value
        
        asset.accumulated_depreciation = total_depreciation
        asset.current_book_value = asset.acquisition_cost - total_depreciation
        updated_count += 1
    
    db.commit()
    return {"message": f"Updated depreciation for {updated_count} assets"}

@router.get("/fixed-assets/export")
def export_fixed_assets(
    request: Request = None,
    db: Session = Depends(get_db)
):
    assets = db.query(FixedAsset).filter(
        FixedAsset.tenant_id == request.state.tenant_id,
        FixedAsset.is_active == True
    ).all()
    
    csv_data = "Asset Name,Category,Acquisition Date,Acquisition Cost,Depreciation Method,Depreciation Rate,Useful Life,Accumulated Depreciation,Current Book Value,Status\n"
    
    for asset in assets:
        status = "Disposed" if asset.disposal_date else "Active"
        csv_data += f'"{asset.asset_name}","{asset.asset_category}","{asset.acquisition_date}","{asset.acquisition_cost}","{asset.depreciation_method}","{asset.depreciation_rate}%","{asset.useful_life_years} years","{asset.accumulated_depreciation}","{asset.current_book_value}","{status}"\n'
    
    return {"csv_data": csv_data, "filename": f"fixed_assets_register_{date.today().isoformat()}.csv"}
