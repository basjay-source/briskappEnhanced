from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, date
from ..database import get_db
from ..auth import get_current_user
from ..models import (
    User, Client, TMEngagement, TMTimeEntry, TMExpense, TMWIPItem, 
    TMInvoice, TMRetainerAccount, TMPayment, TMCollectionAction
)

router = APIRouter(prefix="/time-fees", tags=["time-fees"])

@router.get("/dashboard-stats")
async def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard statistics for Time & Fees module"""
    
    stats = {
        "active_timers": 3,
        "timesheets_due": 12,
        "unbilled_wip": 125000.00,
        "ar_overdue": 45000.00,
        "utilization_rate": 78.5,
        "realization_rate": 92.3,
        "collection_rate": 88.7,
        "avg_billing_cycle": 15
    }
    
    return stats

@router.get("/engagements")
async def get_engagements(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get list of engagements"""
    
    engagements = db.query(TMEngagement).filter(
        TMEngagement.tenant_id == current_user.tenant_id
    ).all()
    
    return engagements

@router.get("/time-entries")
async def get_time_entries(
    engagement_id: Optional[int] = None,
    user_id: Optional[int] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get time entries with optional filters"""
    
    query = db.query(TMTimeEntry).filter(
        TMTimeEntry.tenant_id == current_user.tenant_id
    )
    
    if engagement_id:
        query = query.filter(TMTimeEntry.engagement_id == engagement_id)
    if user_id:
        query = query.filter(TMTimeEntry.user_id == user_id)
    if start_date:
        query = query.filter(TMTimeEntry.date >= start_date)
    if end_date:
        query = query.filter(TMTimeEntry.date <= end_date)
    
    time_entries = query.all()
    return time_entries

@router.post("/time-entries")
async def create_time_entry(
    time_entry_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new time entry"""
    
    time_entry = TMTimeEntry(
        tenant_id=current_user.tenant_id,
        user_id=current_user.id,
        **time_entry_data
    )
    
    db.add(time_entry)
    db.commit()
    db.refresh(time_entry)
    
    return time_entry

@router.get("/wip-ledger")
async def get_wip_ledger(
    engagement_id: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get WIP ledger entries"""
    
    query = db.query(TMWIPItem).filter(
        TMWIPItem.tenant_id == current_user.tenant_id
    )
    
    if engagement_id:
        query = query.filter(TMWIPItem.engagement_id == engagement_id)
    
    wip_items = query.all()
    return wip_items

@router.get("/invoices")
async def get_invoices(
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get invoices with optional status filter"""
    
    query = db.query(TMInvoice).filter(
        TMInvoice.tenant_id == current_user.tenant_id
    )
    
    if status:
        query = query.filter(TMInvoice.status == status)
    
    invoices = query.all()
    return invoices

@router.post("/invoices")
async def create_invoice(
    invoice_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new invoice"""
    
    invoice = TMInvoice(
        tenant_id=current_user.tenant_id,
        **invoice_data
    )
    
    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    
    return invoice

@router.get("/retainer-accounts")
async def get_retainer_accounts(
    client_id: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get retainer accounts"""
    
    query = db.query(TMRetainerAccount).filter(
        TMRetainerAccount.tenant_id == current_user.tenant_id
    )
    
    if client_id:
        query = query.filter(TMRetainerAccount.client_id == client_id)
    
    retainer_accounts = query.all()
    return retainer_accounts

@router.get("/utilization-report")
async def get_utilization_report(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get utilization report data"""
    
    report_data = {
        "total_capacity_hours": 1600,
        "billable_hours": 1256,
        "non_billable_hours": 244,
        "utilization_rate": 78.5,
        "by_person": [
            {"name": "John Smith", "capacity": 160, "billable": 142, "utilization": 88.8},
            {"name": "Sarah Johnson", "capacity": 160, "billable": 128, "utilization": 80.0},
            {"name": "Mike Wilson", "capacity": 160, "billable": 115, "utilization": 71.9}
        ],
        "by_service_line": [
            {"service": "Audit", "hours": 456, "percentage": 36.3},
            {"service": "Tax", "hours": 389, "percentage": 31.0},
            {"service": "Advisory", "hours": 411, "percentage": 32.7}
        ]
    }
    
    return report_data

@router.get("/realization-report")
async def get_realization_report(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get realization report data"""
    
    report_data = {
        "standard_value": 156000.00,
        "billed_value": 144000.00,
        "collected_value": 132000.00,
        "billing_realization": 92.3,
        "collection_realization": 91.7,
        "overall_realization": 84.6,
        "by_engagement": [
            {"name": "Acme Corp Audit", "standard": 45000, "billed": 42000, "collected": 42000, "realization": 93.3},
            {"name": "Tech Ltd Tax", "standard": 28000, "billed": 26000, "collected": 24000, "realization": 85.7},
            {"name": "Global Inc Advisory", "standard": 35000, "billed": 33000, "collected": 30000, "realization": 85.7}
        ]
    }
    
    return report_data
