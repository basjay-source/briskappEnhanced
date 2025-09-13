from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date, datetime, timedelta
from decimal import Decimal

from app.database import get_db
from app.models import CompanyFiling, PSC, Officer, ShareClass

router = APIRouter()

class CompanyFilingCreate(BaseModel):
    company_id: str
    filing_type: str
    form_type: str
    due_date: date
    filing_data: dict

class PSCCreate(BaseModel):
    company_id: str
    name: str
    date_of_birth: Optional[date] = None
    nationality: Optional[str] = None
    address: dict
    nature_of_control: List[str]
    notified_date: date

class OfficerCreate(BaseModel):
    company_id: str
    title: Optional[str] = None
    first_name: str
    last_name: str
    officer_role: str
    appointed_date: date
    address: dict

@router.get("/filings/{company_id}")
def get_company_filings(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    filings = db.query(CompanyFiling).filter(
        CompanyFiling.tenant_id == request.state.tenant_id,
        CompanyFiling.company_id == company_id
    ).order_by(CompanyFiling.due_date.desc()).all()
    
    return filings

@router.post("/filings")
def create_filing(
    filing_data: CompanyFilingCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    filing = CompanyFiling(
        tenant_id=request.state.tenant_id,
        **filing_data.dict()
    )
    
    db.add(filing)
    db.commit()
    db.refresh(filing)
    
    return filing

@router.post("/filings/{filing_id}/submit")
def submit_filing(
    filing_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    filing = db.query(CompanyFiling).filter(
        CompanyFiling.tenant_id == request.state.tenant_id,
        CompanyFiling.id == filing_id
    ).first()
    
    if not filing:
        raise HTTPException(status_code=404, detail="Filing not found")
    
    filing.submission_date = date.today()
    filing.status = "submitted"
    filing.companies_house_reference = f"CH-{filing_id[:8]}"
    
    db.commit()
    
    return {
        "message": "Filing submitted successfully",
        "reference": filing.companies_house_reference,
        "submission_date": filing.submission_date,
        "status": filing.status
    }

@router.get("/pscs/{company_id}")
def get_pscs(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    pscs = db.query(PSC).filter(
        PSC.tenant_id == request.state.tenant_id,
        PSC.company_id == company_id,
        PSC.is_active == True
    ).all()
    
    return pscs

@router.post("/pscs")
def create_psc(
    psc_data: PSCCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    psc = PSC(
        tenant_id=request.state.tenant_id,
        **psc_data.dict()
    )
    
    db.add(psc)
    db.commit()
    db.refresh(psc)
    
    return psc

@router.get("/officers/{company_id}")
def get_officers(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    officers = db.query(Officer).filter(
        Officer.tenant_id == request.state.tenant_id,
        Officer.company_id == company_id,
        Officer.is_active == True
    ).all()
    
    return officers

@router.post("/officers")
def create_officer(
    officer_data: OfficerCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    officer = Officer(
        tenant_id=request.state.tenant_id,
        **officer_data.dict()
    )
    
    db.add(officer)
    db.commit()
    db.refresh(officer)
    
    return officer

@router.get("/deadlines/{company_id}")
def get_filing_deadlines(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    today = date.today()
    next_month = today + timedelta(days=30)
    
    upcoming_filings = db.query(CompanyFiling).filter(
        CompanyFiling.tenant_id == request.state.tenant_id,
        CompanyFiling.company_id == company_id,
        CompanyFiling.due_date.between(today, next_month),
        CompanyFiling.status == "pending"
    ).all()
    
    deadlines = []
    for filing in upcoming_filings:
        days_until_due = (filing.due_date - today).days
        urgency = "urgent" if days_until_due <= 7 else "normal"
        
        deadlines.append({
            "filing_id": filing.id,
            "filing_type": filing.filing_type,
            "form_type": filing.form_type,
            "due_date": filing.due_date,
            "days_until_due": days_until_due,
            "urgency": urgency
        })
    
    return {
        "company_id": company_id,
        "upcoming_deadlines": deadlines,
        "total_pending": len(deadlines),
        "urgent_count": len([d for d in deadlines if d["urgency"] == "urgent"])
    }

@router.get("/forms/confirmation-statement")
def get_confirmation_statement_form(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    officers = db.query(Officer).filter(
        Officer.tenant_id == request.state.tenant_id,
        Officer.company_id == company_id,
        Officer.is_active == True
    ).all()
    
    pscs = db.query(PSC).filter(
        PSC.tenant_id == request.state.tenant_id,
        PSC.company_id == company_id,
        PSC.is_active == True
    ).all()
    
    share_classes = db.query(ShareClass).filter(
        ShareClass.tenant_id == request.state.tenant_id,
        ShareClass.company_id == company_id
    ).all()
    
    return {
        "form_type": "CS01",
        "company_id": company_id,
        "officers": officers,
        "pscs": pscs,
        "share_capital": share_classes,
        "pre_filled_data": {
            "registered_office_changed": False,
            "officers_changed": False,
            "pscs_changed": False,
            "share_capital_changed": False
        }
    }
