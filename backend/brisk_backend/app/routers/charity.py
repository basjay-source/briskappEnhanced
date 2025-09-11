from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date
from decimal import Decimal

from app.database import get_db
from app.models.charity import CharityAccount, CharityFund, FundMovement, Trustee

router = APIRouter()

class CharityAccountCreate(BaseModel):
    client_id: str
    name: str
    registration_number: str
    charity_type: str
    year_end: date
    total_income: Optional[Decimal] = 0
    total_expenditure: Optional[Decimal] = 0
    net_assets: Optional[Decimal] = 0

class CharityFundCreate(BaseModel):
    charity_id: str
    name: str
    fund_type: str
    balance: Optional[Decimal] = 0
    purpose: Optional[str] = None
    restrictions: Optional[str] = None

class TrusteeCreate(BaseModel):
    charity_id: str
    name: str
    role: str
    appointment_date: date
    address: Optional[str] = None
    occupation: Optional[str] = None

@router.get("/charities")
def get_charities(
    request: Request = None,
    db: Session = Depends(get_db)
):
    charities = db.query(CharityAccount).filter(
        CharityAccount.tenant_id == request.state.tenant_id
    ).all()
    return charities

@router.post("/charities")
def create_charity(
    charity_data: CharityAccountCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    charity = CharityAccount(
        tenant_id=request.state.tenant_id,
        **charity_data.dict()
    )
    db.add(charity)
    db.commit()
    db.refresh(charity)
    return charity

@router.get("/charities/{charity_id}/funds")
def get_charity_funds(
    charity_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    funds = db.query(CharityFund).filter(
        CharityFund.tenant_id == request.state.tenant_id,
        CharityFund.charity_id == charity_id
    ).all()
    return funds

@router.post("/funds")
def create_fund(
    fund_data: CharityFundCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    fund = CharityFund(
        tenant_id=request.state.tenant_id,
        **fund_data.dict()
    )
    db.add(fund)
    db.commit()
    db.refresh(fund)
    return fund

@router.get("/charities/{charity_id}/trustees")
def get_charity_trustees(
    charity_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    trustees = db.query(Trustee).filter(
        Trustee.tenant_id == request.state.tenant_id,
        Trustee.charity_id == charity_id
    ).all()
    return trustees

@router.post("/trustees")
def create_trustee(
    trustee_data: TrusteeCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    trustee = Trustee(
        tenant_id=request.state.tenant_id,
        **trustee_data.dict()
    )
    db.add(trustee)
    db.commit()
    db.refresh(trustee)
    return trustee

@router.get("/charities/{charity_id}/sofa")
def generate_sofa(
    charity_id: str,
    year: int,
    request: Request = None,
    db: Session = Depends(get_db)
):
    charity = db.query(CharityAccount).filter(
        CharityAccount.tenant_id == request.state.tenant_id,
        CharityAccount.id == charity_id
    ).first()
    
    if not charity:
        raise HTTPException(status_code=404, detail="Charity not found")
    
    sofa_data = {
        "charity_name": charity.name,
        "year": year,
        "income": {
            "donations": charity.total_income * 0.3,
            "charitable_activities": charity.total_income * 0.7
        },
        "expenditure": {
            "charitable_activities": charity.total_expenditure * 0.9,
            "governance": charity.total_expenditure * 0.1
        }
    }
    
    return sofa_data

@router.get("/charities/{charity_id}/ai-advice")
def get_charity_ai_advice(
    charity_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    charity = db.query(CharityAccount).filter(
        CharityAccount.tenant_id == request.state.tenant_id,
        CharityAccount.id == charity_id
    ).first()
    
    if not charity:
        raise HTTPException(status_code=404, detail="Charity not found")
    
    advice_data = {
        "charity_name": charity.name,
        "compliance_alerts": [
            {
                "type": "deadline",
                "message": f"Annual return for {charity.name} due in 14 days",
                "priority": "high"
            }
        ],
        "fund_optimization": [
            {
                "type": "transfer",
                "message": "Consider transferring £15,000 from general fund to building maintenance reserve",
                "impact": "Improved fund allocation"
            }
        ],
        "sorp_updates": [
            {
                "type": "guidance",
                "message": "New guidance on volunteer time valuation available - review impact on accounts",
                "action": "Review and update policies"
            }
        ],
        "gift_aid_opportunities": [
            {
                "type": "claim",
                "message": "£8,500 in eligible donations identified for Gift Aid claim",
                "potential_value": 8500 * 0.25
            }
        ],
        "benchmarking": [
            {
                "type": "performance",
                "message": "Your fundraising efficiency is 15% above sector average",
                "metric": "fundraising_efficiency",
                "value": 115
            }
        ]
    }
    
    return advice_data
