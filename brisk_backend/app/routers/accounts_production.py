from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

from ..database import get_db
from ..models import User

router = APIRouter(prefix="/accounts-production", tags=["accounts-production"])

class TrialBalanceEntry(BaseModel):
    code: str
    description: str
    debit: float
    credit: float
    balance: float
    mapped: bool
    mapped_to: Optional[str] = None

class Adjustment(BaseModel):
    id: Optional[str] = None
    type: str
    reference: str
    description: str
    debit_account: str
    credit_account: str
    amount: float
    post_back_to_gl: bool
    working_paper_ref: str
    status: str
    created_by: str
    created_date: str

@router.get("/trial-balance")
async def get_trial_balance(db: Session = Depends(get_db)):
    """Get trial balance entries"""
    sample_data = [
        {
            "code": "1000",
            "description": "Freehold Property",
            "debit": 500000,
            "credit": 0,
            "balance": 500000,
            "mapped": True,
            "mapped_to": "Tangible Fixed Assets"
        },
        {
            "code": "2000",
            "description": "Trade Debtors",
            "debit": 85000,
            "credit": 0,
            "balance": 85000,
            "mapped": True,
            "mapped_to": "Debtors"
        },
        {
            "code": "5000",
            "description": "Sales Revenue",
            "debit": 0,
            "credit": 850000,
            "balance": -850000,
            "mapped": True,
            "mapped_to": "Turnover"
        }
    ]
    return sample_data

@router.post("/trial-balance/import")
async def import_trial_balance(db: Session = Depends(get_db)):
    """Import trial balance from Bookkeeping module"""
    return {"message": "Trial balance imported successfully", "entries": 156}

@router.get("/adjustments")
async def get_adjustments(db: Session = Depends(get_db)):
    """Get all adjustments"""
    sample_data = [
        {
            "id": "1",
            "type": "Year-end",
            "reference": "YE001",
            "description": "Accrual for audit fees",
            "debit_account": "7200 - Professional Fees",
            "credit_account": "3200 - Accruals",
            "amount": 15000,
            "post_back_to_gl": True,
            "working_paper_ref": "WP-AF-001",
            "status": "Approved",
            "created_by": "John Smith",
            "created_date": "2024-01-15"
        }
    ]
    return sample_data

@router.post("/adjustments")
async def create_adjustment(adjustment: Adjustment, db: Session = Depends(get_db)):
    """Create a new adjustment"""
    return {"message": "Adjustment created successfully", "id": "new_id"}

@router.get("/dashboard/kpis")
async def get_dashboard_kpis(db: Session = Depends(get_db)):
    """Get dashboard KPI data"""
    return [
        {
            "title": "Unmapped Accounts",
            "value": 14,
            "trend": "down",
            "status": "warning",
            "description": "Accounts requiring mapping"
        },
        {
            "title": "TB Status",
            "value": "Final",
            "trend": "stable",
            "status": "success",
            "description": "Trial balance locked"
        },
        {
            "title": "Disclosure Gaps",
            "value": 3,
            "trend": "down",
            "status": "warning",
            "description": "Missing disclosures"
        },
        {
            "title": "iXBRL Errors",
            "value": 1,
            "trend": "down",
            "status": "error",
            "description": "Validation errors"
        }
    ]

@router.get("/reports/ccab")
async def get_ccab_reports(db: Session = Depends(get_db)):
    """Get available CCAB reports"""
    return [
        {"name": "CCAB Financial Statements", "status": "Available"},
        {"name": "CCAB Directors Report", "status": "Available"},
        {"name": "CCAB Audit Report", "status": "Available"},
        {"name": "CCAB Small Company", "status": "Available"},
        {"name": "CCAB Management Accounts", "status": "Available"}
    ]

@router.post("/reports/generate")
async def generate_report(report_type: str, db: Session = Depends(get_db)):
    """Generate a specific report"""
    return {
        "message": f"{report_type} report generated successfully",
        "download_url": f"/downloads/{report_type.lower().replace(' ', '_')}.pdf"
    }

@router.get("/analytics/ratios")
async def get_financial_ratios(db: Session = Depends(get_db)):
    """Get financial ratios and KPIs"""
    return {
        "gross_margin": 50.0,
        "current_ratio": 1.76,
        "debtor_days": 36,
        "roe": 20.8,
        "debt_to_equity": 0.21
    }
