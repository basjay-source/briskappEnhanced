from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
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

@router.get("/audit-trail")
async def get_audit_trail(db: Session = Depends(get_db)):
    """Get audit trail data"""
    return {
        "changes": [
            {
                "id": "1",
                "timestamp": "2024-01-20T14:30:15Z",
                "user": "Sarah Wilson",
                "action": "Updated",
                "section": "Notes & Disclosures",
                "details": "Modified related party transactions note",
                "type": "Data Change"
            },
            {
                "id": "2",
                "timestamp": "2024-01-20T11:45:22Z",
                "user": "John Smith",
                "action": "Approved",
                "section": "Cash Flow Statement",
                "details": "Approved working capital adjustments",
                "type": "Status Change"
            }
        ],
        "review_points": [
            {
                "id": "1",
                "section": "Notes & Disclosures",
                "point": "Related party transactions disclosure incomplete",
                "author": "Sarah Wilson",
                "date": "2024-01-19",
                "status": "Open",
                "priority": "High"
            }
        ]
    }

@router.get("/signoff-workflow")
async def get_signoff_workflow(db: Session = Depends(get_db)):
    """Get sign-off workflow status"""
    return {
        "workflow_steps": [
            {"step": "Preparer Review", "user": "Jane Doe", "status": "Complete", "date": "2024-01-18"},
            {"step": "Manager Review", "user": "John Smith", "status": "Complete", "date": "2024-01-19"},
            {"step": "Partner Review", "user": "Sarah Wilson", "status": "In Progress", "date": None},
            {"step": "Client Approval", "user": "Client Director", "status": "Pending", "date": None}
        ],
        "signatures": [
            {"role": "Director", "name": "John Smith", "status": "Signed", "date": "2024-01-19"},
            {"role": "Company Secretary", "name": "Sarah Wilson", "status": "Pending", "date": None}
        ],
        "versions": [
            {"version": "v1.0", "date": "2024-01-15", "user": "Jane Doe", "status": "Draft", "locked": False},
            {"version": "v2.0", "date": "2024-01-20", "user": "Sarah Wilson", "status": "Final", "locked": True}
        ]
    }

@router.get("/report-templates")
async def get_report_templates(db: Session = Depends(get_db)):
    """Get report templates and styling options"""
    return {
        "cover_templates": [
            {"id": "1", "name": "Professional", "description": "Clean professional layout"},
            {"id": "2", "name": "Corporate", "description": "Corporate branding focused"},
            {"id": "3", "name": "Minimal", "description": "Minimal design approach"}
        ],
        "styles": {
            "colors": {
                "primary": "#0B5FFF",
                "secondary": "#FF7A00",
                "accent": "#10B981"
            },
            "fonts": {
                "heading": "Arial",
                "body": "Arial",
                "size": "12pt"
            },
            "layout": {
                "orientation": "Portrait",
                "size": "A4",
                "margins": "Normal (2.5cm)"
            }
        }
    }

@router.post("/review-points")
async def create_review_point(review_point: Dict[str, Any], db: Session = Depends(get_db)):
    """Create a new review point"""
    return {
        "id": "new_id",
        "message": "Review point created successfully",
        "review_point": review_point
    }

@router.post("/signoff/{step}")
async def complete_signoff(step: str, db: Session = Depends(get_db)):
    """Complete a sign-off step"""
    return {
        "message": f"Sign-off completed for {step}",
        "timestamp": datetime.now().isoformat(),
        "status": "Complete"
    }
