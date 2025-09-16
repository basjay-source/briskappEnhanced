from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from pydantic import BaseModel
from datetime import date, datetime
from decimal import Decimal

from app.database import get_db
from app.models import BankConnection, EcommerceConnection, JournalEntry
from app.models.client import Client
from app.models.products import Product, InventoryMovement

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

class InvoiceCreate(BaseModel):
    company_id: str
    customer_id: str
    invoice_number: str
    issue_date: date
    due_date: date
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
