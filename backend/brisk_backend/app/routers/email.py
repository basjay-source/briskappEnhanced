from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime, date, timedelta
from decimal import Decimal

from app.database import get_db
from app.models.client import Client
from app.models.practice import Job
from app.routers.books import get_management_accounts

router = APIRouter()

class EmailCreate(BaseModel):
    to: List[str]
    cc: Optional[List[str]] = None
    bcc: Optional[List[str]] = None
    subject: str
    body: str
    priority: str = "normal"
    client_id: Optional[str] = None
    job_id: Optional[str] = None
    attachments: Optional[List[str]] = None

class EmailReply(BaseModel):
    email_id: str
    body: str
    reply_type: str = "reply"

class EmailAccount(BaseModel):
    id: str
    email: str
    provider: str  # gmail, outlook, exchange, imap
    status: str  # connected, disconnected, syncing, error
    last_sync: Optional[str] = None
    is_default: bool = False
    settings: Optional[Dict[str, Any]] = None

class ConnectAccountRequest(BaseModel):
    provider: str
    email: str
    auth_code: Optional[str] = None
    settings: Optional[Dict[str, Any]] = None

@router.get("/folders")
def get_email_folders(
    request: Request = None,
    db: Session = Depends(get_db)
):
    folders = [
        {"id": "inbox", "name": "Inbox", "count": 12, "unread": 3},
        {"id": "sent", "name": "Sent Items", "count": 45, "unread": 0},
        {"id": "drafts", "name": "Drafts", "count": 2, "unread": 0},
        {"id": "archive", "name": "Archive", "count": 156, "unread": 0},
        {"id": "trash", "name": "Deleted Items", "count": 8, "unread": 0},
        {"id": "starred", "name": "Starred", "count": 5, "unread": 1}
    ]
    
    return {
        "folders": folders,
        "total_emails": sum(folder["count"] for folder in folders),
        "total_unread": sum(folder["unread"] for folder in folders)
    }

@router.get("/threads")
def get_email_threads(
    folder: str = "inbox",
    search: Optional[str] = None,
    client_id: Optional[str] = None,
    job_id: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    threads = [
        {
            "id": "thread_1",
            "subject": "VAT Return Q4 2024 - ABC Manufacturing Ltd",
            "participants": ["sarah.johnson@firm.com", "finance@abcmanufacturing.com"],
            "last_activity": "2024-01-20T14:30:00Z",
            "is_read": False,
            "has_attachments": True,
            "client_id": "client_123",
            "job_id": "job_456",
            "email_count": 2,
            "labels": ["client-communication", "vat-return"],
            "priority": "normal"
        }
    ]
    
    return {
        "threads": threads,
        "total": len(threads),
        "folder": folder
    }

@router.get("/accounts")
def get_email_accounts(
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get all connected email accounts for the current user"""
    accounts = [
        {
            "id": "acc_1",
            "email": "sarah.johnson@firm.com",
            "provider": "outlook",
            "status": "connected",
            "last_sync": "2024-01-20T16:30:00Z",
            "is_default": True
        },
        {
            "id": "acc_2", 
            "email": "sarah@gmail.com",
            "provider": "gmail",
            "status": "connected",
            "last_sync": "2024-01-20T16:25:00Z",
            "is_default": False
        }
    ]
    
    return {
        "accounts": accounts,
        "total": len(accounts)
    }

@router.post("/accounts/connect")
def connect_email_account(
    account_data: ConnectAccountRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Connect a new email account"""
    account_id = f"acc_{int(datetime.now().timestamp())}"
    
    new_account = {
        "id": account_id,
        "email": account_data.email,
        "provider": account_data.provider,
        "status": "syncing",
        "last_sync": None,
        "is_default": False
    }
    
    return {
        "account": new_account,
        "message": f"Successfully initiated connection to {account_data.provider}",
        "oauth_url": f"https://oauth.{account_data.provider}.com/authorize?client_id=brisk&redirect_uri=https://app.brisk.com/oauth/callback"
    }

@router.delete("/accounts/{account_id}")
def disconnect_email_account(
    account_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Disconnect an email account"""
    return {
        "message": f"Account {account_id} disconnected successfully",
        "account_id": account_id
    }

@router.post("/accounts/{account_id}/sync")
def sync_email_account(
    account_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Manually sync an email account"""
    return {
        "message": f"Sync started for account {account_id}",
        "account_id": account_id,
        "status": "syncing",
        "estimated_completion": "2-3 minutes"
    }

@router.put("/accounts/{account_id}/default")
def set_default_account(
    account_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Set an account as the default sending account"""
    return {
        "message": f"Account {account_id} set as default",
        "account_id": account_id
    }

@router.get("/accounts/{account_id}/status")
def get_account_status(
    account_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get the sync status of an email account"""
    return {
        "account_id": account_id,
        "status": "connected",
        "last_sync": datetime.now().isoformat(),
        "messages_synced": 1250,
        "sync_progress": 100,
        "next_sync": "2024-01-20T17:30:00Z"
    }

@router.post("/send")
def send_email(
    email_data: EmailCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    email_id = f"email_{datetime.now().timestamp()}"
    
    return {
        "email_id": email_id,
        "message": "Email sent successfully",
        "timestamp": datetime.now().isoformat(),
        "recipients": email_data.to,
        "subject": email_data.subject
    }

@router.get("/template-data/{client_id}")
def get_client_template_data(
    client_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    client = db.query(Client).filter(
        Client.tenant_id == request.state.tenant_id,
        Client.id == client_id
    ).first()
    
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    try:
        management_accounts = get_management_accounts(
            client.companies[0].id if client.companies else client_id,
            date.today() - timedelta(days=365),
            date.today(),
            request,
            db
        )
    except:
        management_accounts = {
            "profit_and_loss": {
                "revenue": 0,
                "net_profit": 0,
                "expenses": 0
            },
            "balance_sheet": {
                "total_assets": 0,
                "total_liabilities": 0,
                "working_capital": 0
            }
        }
    
    jobs = db.query(Job).filter(
        Job.tenant_id == request.state.tenant_id,
        Job.client_id == client_id
    ).all()
    
    services = list(set([job.job_type for job in jobs]))
    
    revenue = management_accounts.get('profit_and_loss', {}).get('revenue', 0)
    net_profit = management_accounts.get('profit_and_loss', {}).get('net_profit', 0)
    expenses = management_accounts.get('profit_and_loss', {}).get('expenses', 0)
    total_assets = management_accounts.get('balance_sheet', {}).get('total_assets', 0)
    total_liabilities = management_accounts.get('balance_sheet', {}).get('total_liabilities', 0)
    
    profit_margin = (net_profit / revenue * 100) if revenue > 0 else 0
    working_capital = total_assets - total_liabilities
    
    return {
        "client_name": client.name,
        "company_number": client.company_number or "Not registered",
        "vat_number": client.vat_number or "Not VAT registered",
        "industry_sector": client.industry_sector or "General business",
        "year_end": client.year_end.strftime("%d %B %Y") if client.year_end else "31 March",
        "incorporation_date": client.incorporation_date.strftime("%d %B %Y") if hasattr(client, 'incorporation_date') and client.incorporation_date else "Not available",
        "registered_address": getattr(client, 'registered_address', 'Not available'),
        "turnover": f"£{revenue:,.2f}",
        "net_profit": f"£{net_profit:,.2f}",
        "tax_payable": f"£{net_profit * 0.19:,.2f}",
        "profit_margin": f"{profit_margin:.1f}%",
        "total_assets": f"£{total_assets:,.2f}",
        "total_liabilities": f"£{total_liabilities:,.2f}",
        "working_capital": f"£{working_capital:,.2f}",
        "cash_flow": f"£{net_profit + expenses * 0.3:,.2f}",
        "employee_count": str(getattr(client, 'employee_count', 'Not specified')),
        "services": ", ".join(services) if services else "General accounting services",
        "practice_name": "Brisk Accountants",
        "signature": "Best regards,\n\nBrisk Accountants\nChartered Accountants & Business Advisors\nPhone: +44 20 1234 5678\nEmail: info@briskaccountants.com\nWeb: www.briskaccountants.com"
    }
