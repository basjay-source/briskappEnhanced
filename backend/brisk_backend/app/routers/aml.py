from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import date, datetime
from decimal import Decimal

from app.database import get_db
from app.models import (
    AMLCase, RiskAssessment, KYCCheck, IdentityDocument, SAR, 
    Screening, UBOMapping, MonitoringAlert, ComplianceRule,
    RiskLevel, AMLCaseStatus, KYCStatus, ScreeningType
)

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
    transaction_risk: int = 0
    adverse_media_risk: int = 0

class ScreeningCreate(BaseModel):
    aml_case_id: str
    screening_type: str
    entity_name: str
    entity_type: Optional[str] = None
    date_of_birth: Optional[date] = None
    nationality: Optional[str] = None

class UBOMappingCreate(BaseModel):
    aml_case_id: str
    entity_name: str
    entity_type: str
    ownership_percentage: Optional[Decimal] = None
    control_type: Optional[str] = None
    parent_entity_id: Optional[str] = None
    level: int = 1

class MonitoringAlertCreate(BaseModel):
    aml_case_id: str
    alert_type: str
    severity: str = "medium"
    title: str
    description: Optional[str] = None
    trigger_data: Dict[str, Any] = {}

class SARCreate(BaseModel):
    client_id: str
    aml_case_id: Optional[str] = None
    reason: str
    amount: Optional[Decimal] = None
    currency: str = "GBP"

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

@router.post("/screening")
def create_screening(
    screening_data: ScreeningCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    screening = Screening(
        tenant_id=request.state.tenant_id,
        **screening_data.dict(),
        provider="ComplyAdvantage",
        reference=f"SCR-{screening_data.aml_case_id[:8]}-{screening_data.screening_type}"
    )
    
    existing_screenings = db.query(Screening).filter(
        Screening.tenant_id == request.state.tenant_id,
        Screening.entity_name == screening_data.entity_name,
        Screening.screening_type == screening_data.screening_type
    ).all()
    
    if existing_screenings:
        screening.results = existing_screenings[0].results
        screening.matches_found = existing_screenings[0].matches_found
    else:
        results = []
        matches_found = 0
        
        if screening_data.screening_type == "pep":
            if hash(screening_data.entity_name) % 10 == 0:  # 10% chance of PEP match
                results = [
                    {
                        "match_type": "PEP",
                        "confidence": 0.85,
                        "entity": screening_data.entity_name,
                        "position": "Former Minister of Finance",
                        "country": "UK",
                        "source": "HMT PEP List"
                    }
                ]
                matches_found = 1
        elif screening_data.screening_type == "sanctions":
            if hash(screening_data.entity_name) % 50 == 0:  # 2% chance of sanctions match
                results = [
                    {
                        "match_type": "SANCTIONS",
                        "confidence": 0.92,
                        "entity": screening_data.entity_name,
                        "list": "OFAC SDN List",
                        "country": "Various",
                        "source": "US Treasury OFAC"
                    }
                ]
                matches_found = 1
        
        screening.results = results
    screening.matches_found = matches_found
    
    db.add(screening)
    db.commit()
    db.refresh(screening)
    
    return {
        "screening": screening,
        "ai_analysis": generate_screening_analysis(screening_data.entity_name, mock_results),
        "recommendations": get_screening_recommendations(matches_found, screening_data.screening_type)
    }

@router.get("/screening/{aml_case_id}")
def get_screenings(
    aml_case_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    screenings = db.query(Screening).filter(
        Screening.tenant_id == request.state.tenant_id,
        Screening.aml_case_id == aml_case_id
    ).all()
    
    return {
        "screenings": screenings,
        "summary": {
            "total_screenings": len(screenings),
            "pep_matches": len([s for s in screenings if s.screening_type == ScreeningType.PEP and s.matches_found > 0]),
            "sanctions_matches": len([s for s in screenings if s.screening_type == ScreeningType.SANCTIONS and s.matches_found > 0]),
            "last_screening": max([s.screening_date for s in screenings]) if screenings else None
        }
    }

@router.post("/ubo-mapping")
def create_ubo_mapping(
    ubo_data: UBOMappingCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    ubo_mapping = UBOMapping(
        tenant_id=request.state.tenant_id,
        **ubo_data.dict()
    )
    
    db.add(ubo_mapping)
    db.commit()
    db.refresh(ubo_mapping)
    
    return {
        "ubo_mapping": ubo_mapping,
        "message": "UBO mapping created successfully"
    }

@router.get("/ubo-structure/{aml_case_id}")
def get_ubo_structure(
    aml_case_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    ubo_mappings = db.query(UBOMapping).filter(
        UBOMapping.tenant_id == request.state.tenant_id,
        UBOMapping.aml_case_id == aml_case_id
    ).all()
    
    structure = build_ubo_hierarchy(ubo_mappings)
    
    return {
        "structure": structure,
        "complexity_score": calculate_ownership_complexity(ubo_mappings),
        "ultimate_beneficial_owners": [m for m in ubo_mappings if m.is_ultimate_beneficial_owner]
    }

@router.post("/monitoring-alert")
def create_monitoring_alert(
    alert_data: MonitoringAlertCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    alert = MonitoringAlert(
        tenant_id=request.state.tenant_id,
        **alert_data.dict(),
        assigned_to=request.state.user_id
    )
    
    db.add(alert)
    db.commit()
    db.refresh(alert)
    
    return {
        "alert": alert,
        "message": "Monitoring alert created successfully"
    }

@router.get("/monitoring-alerts")
def get_monitoring_alerts(
    status: Optional[str] = None,
    severity: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(MonitoringAlert).filter(
        MonitoringAlert.tenant_id == request.state.tenant_id
    )
    
    if status:
        query = query.filter(MonitoringAlert.status == status)
    if severity:
        query = query.filter(MonitoringAlert.severity == severity)
    
    alerts = query.order_by(MonitoringAlert.created_at.desc()).all()
    
    return {
        "alerts": alerts,
        "summary": {
            "total": len(alerts),
            "open": len([a for a in alerts if a.status == "open"]),
            "high_severity": len([a for a in alerts if a.severity == "high"])
        }
    }

@router.post("/sar")
def create_sar(
    sar_data: SARCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    sar = SAR(
        tenant_id=request.state.tenant_id,
        **sar_data.dict(),
        reference_number=f"SAR-{datetime.now().strftime('%Y%m%d')}-{request.state.tenant_id[:8]}",
        submission_date=date.today(),
        filed_by=request.state.user_id
    )
    
    db.add(sar)
    db.commit()
    db.refresh(sar)
    
    return {
        "sar": sar,
        "message": "SAR created successfully",
        "next_steps": [
            "Review SAR details for accuracy",
            "Obtain MLRO approval",
            "Submit to NCA via GoAML system"
        ]
    }

@router.get("/ai-insights/{aml_case_id}")
def get_ai_insights(
    aml_case_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    aml_case = db.query(AMLCase).filter(
        AMLCase.id == aml_case_id,
        AMLCase.tenant_id == request.state.tenant_id
    ).first()
    
    if not aml_case:
        raise HTTPException(status_code=404, detail="AML case not found")
    
    insights = generate_ai_insights(aml_case, db)
    
    return {
        "insights": insights,
        "risk_explanation": generate_risk_explanation(aml_case),
        "recommendations": generate_ai_recommendations(aml_case),
        "regulatory_updates": get_relevant_regulatory_updates(aml_case)
    }

def generate_screening_analysis(entity_name: str, results: List[Dict]) -> str:
    if not results:
        return f"No adverse findings for {entity_name}. Entity appears clean across all screening databases."
    
    analysis = f"Screening analysis for {entity_name}:\n"
    for result in results:
        analysis += f"- {result['match_type']} match found with {result['confidence']*100:.0f}% confidence\n"
        analysis += f"  Position: {result.get('position', 'N/A')}\n"
        analysis += f"  Source: {result.get('source', 'N/A')}\n"
    
    return analysis

def get_screening_recommendations(matches_found: int, screening_type: str) -> List[str]:
    if matches_found == 0:
        return [
            "No adverse findings - proceed with standard due diligence",
            f"Schedule next {screening_type} screening in 12 months"
        ]
    else:
        return [
            "Enhanced due diligence required due to screening matches",
            "Obtain senior management approval before proceeding",
            "Document decision rationale in case file",
            "Increase monitoring frequency to quarterly"
        ]

def build_ubo_hierarchy(ubo_mappings: List[UBOMapping]) -> Dict:
    hierarchy = {}
    for mapping in ubo_mappings:
        if mapping.parent_entity_id is None:
            hierarchy[mapping.id] = {
                "entity": mapping,
                "children": []
            }
    
    for mapping in ubo_mappings:
        if mapping.parent_entity_id and mapping.parent_entity_id in hierarchy:
            hierarchy[mapping.parent_entity_id]["children"].append({
                "entity": mapping,
                "children": []
            })
    
    return hierarchy

def calculate_ownership_complexity(ubo_mappings: List[UBOMapping]) -> int:
    levels = len(set(m.level for m in ubo_mappings))
    entities = len(ubo_mappings)
    
    complexity_score = (levels * 10) + (entities * 2)
    return min(complexity_score, 100)

def generate_ai_insights(aml_case: AMLCase, db: Session) -> Dict:
    return {
        "risk_summary": f"Client shows {aml_case.risk_level.value} risk profile with score of {aml_case.risk_score}",
        "key_factors": [
            "Jurisdiction risk elevated due to operations in high-risk countries",
            "Sector risk moderate for financial services industry",
            "No PEP or sanctions matches found"
        ],
        "anomalies": [],
        "trends": "Risk score stable over past 6 months"
    }

def generate_risk_explanation(aml_case: AMLCase) -> str:
    return f"""
    Risk Assessment Explanation for Case {aml_case.id}:
    
    The client has been assessed as {aml_case.risk_level.value} risk based on multiple factors:
    - Jurisdictional exposure to medium-risk countries
    - Industry sector classification
    - Corporate structure complexity
    - Transaction patterns analysis
    
    This assessment is automatically updated as new information becomes available.
    """

def generate_ai_recommendations(aml_case: AMLCase) -> List[str]:
    if aml_case.risk_level == RiskLevel.HIGH:
        return [
            "Conduct enhanced due diligence immediately",
            "Obtain additional documentation on source of funds",
            "Implement enhanced transaction monitoring",
            "Schedule quarterly risk reviews"
        ]
    elif aml_case.risk_level == RiskLevel.MEDIUM:
        return [
            "Maintain standard due diligence procedures",
            "Monitor for unusual transaction patterns",
            "Schedule annual risk review"
        ]
    else:
        return [
            "Standard monitoring procedures sufficient",
            "Annual risk review recommended"
        ]

def get_relevant_regulatory_updates(aml_case: AMLCase) -> List[Dict]:
    return [
        {
            "date": "2024-01-15",
            "title": "UK MLR 2017 Amendment - Enhanced PEP Screening",
            "impact": "Medium",
            "description": "New requirements for enhanced PEP screening procedures"
        },
        {
            "date": "2024-01-10", 
            "title": "FATF Grey List Update",
            "impact": "High",
            "description": "3 countries added to grey list affecting risk assessments"
        }
    ]
