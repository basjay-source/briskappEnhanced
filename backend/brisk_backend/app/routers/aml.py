from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date
from decimal import Decimal

from app.database import get_db
from app.models import AMLCase, RiskAssessment, KYCCheck

router = APIRouter()

class AMLCaseCreate(BaseModel):
    client_id: str
    case_type: str
    opened_date: date

class RiskAssessmentCreate(BaseModel):
    aml_case_id: str
    jurisdiction_risk: int
    sector_risk: int
    pep_risk: int
    sanctions_risk: int
    ownership_complexity: int

@router.get("/cases/{client_id}")
def get_aml_cases(
    client_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    cases = db.query(AMLCase).filter(
        AMLCase.tenant_id == request.state.tenant_id,
        AMLCase.client_id == client_id
    ).all()
    
    return cases

@router.post("/cases")
def create_aml_case(
    case_data: AMLCaseCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    case = AMLCase(
        tenant_id=request.state.tenant_id,
        **case_data.dict(),
        assigned_to=request.state.user_id
    )
    
    db.add(case)
    db.commit()
    db.refresh(case)
    
    return case

@router.post("/risk-assessment")
def create_risk_assessment(
    assessment_data: RiskAssessmentCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    total_score = (
        assessment_data.jurisdiction_risk +
        assessment_data.sector_risk +
        assessment_data.pep_risk +
        assessment_data.sanctions_risk +
        assessment_data.ownership_complexity
    )
    
    if total_score <= 10:
        risk_level = "low"
    elif total_score <= 20:
        risk_level = "medium"
    else:
        risk_level = "high"
    
    assessment = RiskAssessment(
        tenant_id=request.state.tenant_id,
        **assessment_data.dict(),
        total_score=total_score,
        assessment_date=date.today()
    )
    
    db.add(assessment)
    
    aml_case = db.query(AMLCase).filter(
        AMLCase.id == assessment_data.aml_case_id
    ).first()
    
    if aml_case:
        aml_case.risk_score = total_score
        aml_case.risk_level = risk_level
    
    db.commit()
    db.refresh(assessment)
    
    return {
        "assessment": assessment,
        "risk_level": risk_level,
        "recommendations": get_risk_recommendations(risk_level, total_score)
    }

def get_risk_recommendations(risk_level: str, score: int) -> List[str]:
    if risk_level == "low":
        return [
            "Standard due diligence procedures apply",
            "Annual review recommended"
        ]
    elif risk_level == "medium":
        return [
            "Enhanced due diligence required",
            "Quarterly monitoring recommended",
            "Senior management approval needed"
        ]
    else:
        return [
            "Enhanced due diligence mandatory",
            "Monthly monitoring required",
            "MLRO approval essential",
            "Consider declining relationship if risks cannot be mitigated"
        ]

@router.post("/kyc-check")
def initiate_kyc_check(
    aml_case_id: str,
    check_type: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    kyc_check = KYCCheck(
        tenant_id=request.state.tenant_id,
        aml_case_id=aml_case_id,
        check_type=check_type,
        provider="ComplyAdvantage",
        reference=f"KYC-{aml_case_id[:8]}-{check_type}",
        status="in_progress"
    )
    
    db.add(kyc_check)
    db.commit()
    db.refresh(kyc_check)
    
    mock_result = {
        "identity_verified": True,
        "pep_match": False,
        "sanctions_match": False,
        "adverse_media": False,
        "confidence_score": 0.95
    }
    
    kyc_check.result = mock_result
    kyc_check.status = "completed"
    db.commit()
    
    return {
        "kyc_check": kyc_check,
        "result": mock_result,
        "next_steps": [
            "Review verification documents",
            "Update risk assessment if needed",
            "Schedule next review"
        ]
    }

@router.get("/compliance-dashboard/{company_id}")
def get_compliance_dashboard(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    total_cases = db.query(AMLCase).filter(
        AMLCase.tenant_id == request.state.tenant_id
    ).count()
    
    high_risk_cases = db.query(AMLCase).filter(
        AMLCase.tenant_id == request.state.tenant_id,
        AMLCase.risk_level == "high"
    ).count()
    
    pending_reviews = db.query(AMLCase).filter(
        AMLCase.tenant_id == request.state.tenant_id,
        AMLCase.status == "open"
    ).count()
    
    return {
        "summary": {
            "total_cases": total_cases,
            "high_risk_cases": high_risk_cases,
            "pending_reviews": pending_reviews,
            "compliance_score": max(0, 100 - (high_risk_cases * 10))
        },
        "alerts": [
            "3 clients require annual AML review",
            "1 high-risk case needs MLRO approval"
        ],
        "upcoming_deadlines": [
            {"client": "ABC Ltd", "review_due": "2024-02-15"},
            {"client": "XYZ Corp", "review_due": "2024-02-28"}
        ]
    }
