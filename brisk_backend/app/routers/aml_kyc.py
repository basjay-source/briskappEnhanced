from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import AMLCase, Individual, Entity, Screening, RiskAssessment, SARReport
from ..auth import get_current_user

router = APIRouter(prefix="/aml-kyc", tags=["AML/KYC"])

@router.get("/cases")
async def get_aml_cases(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    cases = db.query(AMLCase).all()
    return [
        {
            "id": case.id,
            "case_number": case.case_number,
            "client_name": case.client.name if case.client else "Unknown",
            "jurisdiction": case.jurisdiction,
            "case_type": case.case_type,
            "status": case.status,
            "risk_level": case.risk_level,
            "review_due_date": case.review_due_date,
            "created_at": case.created_at
        }
        for case in cases
    ]

@router.get("/dashboard-stats")
async def get_dashboard_stats(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    total_cases = db.query(AMLCase).count()
    pending_reviews = db.query(AMLCase).filter(AMLCase.status == "In Progress").count()
    high_risk_cases = db.query(AMLCase).filter(AMLCase.risk_level == "High").count()
    screening_hits = db.query(Screening).filter(Screening.match_status == "pending").count()
    
    return {
        "total_cases": total_cases,
        "pending_reviews": pending_reviews,
        "high_risk_cases": high_risk_cases,
        "screening_hits": screening_hits,
        "approval_rate": 85.2,
        "avg_review_time": 4.3
    }

@router.get("/individuals")
async def get_individuals(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    individuals = db.query(Individual).all()
    return [
        {
            "id": individual.id,
            "legal_name": individual.legal_name,
            "date_of_birth": individual.date_of_birth,
            "nationalities": individual.nationalities,
            "verification_status": individual.verification_status,
            "case_id": individual.case_id
        }
        for individual in individuals
    ]

@router.get("/entities")
async def get_entities(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    entities = db.query(Entity).all()
    return [
        {
            "id": entity.id,
            "legal_form": entity.legal_form,
            "company_number": entity.company_number,
            "registered_address": entity.registered_address,
            "verification_status": entity.verification_status,
            "case_id": entity.case_id
        }
        for entity in entities
    ]

@router.get("/screenings")
async def get_screenings(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    screenings = db.query(Screening).all()
    return [
        {
            "id": screening.id,
            "screening_type": screening.screening_type,
            "watchlist_name": screening.watchlist_name,
            "match_score": screening.match_score,
            "match_status": screening.match_status,
            "created_at": screening.created_at
        }
        for screening in screenings
    ]

@router.get("/risk-assessments")
async def get_risk_assessments(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    assessments = db.query(RiskAssessment).all()
    return [
        {
            "id": assessment.id,
            "overall_risk_level": assessment.overall_risk_level,
            "client_risk_score": assessment.client_risk_score,
            "geography_risk_score": assessment.geography_risk_score,
            "assessment_date": assessment.assessment_date,
            "case_id": assessment.case_id
        }
        for assessment in assessments
    ]

@router.get("/sar-reports")
async def get_sar_reports(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    reports = db.query(SARReport).all()
    return [
        {
            "id": report.id,
            "report_type": report.report_type,
            "jurisdiction": report.jurisdiction,
            "filing_status": report.filing_status,
            "filed_at": report.filed_at,
            "case_id": report.case_id
        }
        for report in reports
    ]

@router.post("/cases")
async def create_aml_case(case_data: dict, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_case = AMLCase(
        case_number=f"AML-{db.query(AMLCase).count() + 1:06d}",
        client_id=case_data.get("client_id"),
        jurisdiction=case_data.get("jurisdiction", "UK"),
        case_type=case_data.get("case_type", "KYC"),
        status="Unstarted",
        risk_level="Medium",
        assigned_to=current_user.id
    )
    db.add(new_case)
    db.commit()
    db.refresh(new_case)
    return {"id": new_case.id, "case_number": new_case.case_number}

@router.get("/internal-reports")
async def get_internal_reports(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    """Get internal compliance reports"""
    return {"data": []}

@router.get("/documents")
async def get_aml_documents(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    """Get AML/KYC documents"""
    return {"data": []}

@router.get("/risk-matrix")
async def get_risk_matrix(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    """Get risk matrix configuration"""
    return {"data": []}
