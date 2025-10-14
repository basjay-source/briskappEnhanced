"""
Enhanced Corporation Tax API with full CRUD operations
Supports CT600 computations, R&D claims, capital allowances, and group relief
"""
from fastapi import APIRouter, Depends, HTTPException, Request, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import date, datetime
from decimal import Decimal

from app.database import get_db
from app.models import TaxReturnCT, RnDClaim

router = APIRouter()


class CompanyBase(BaseModel):
    company_name: str
    company_number: str
    utr: str
    accounting_period_start: date
    accounting_period_end: date
    nature_of_business: Optional[str] = None
    is_large_company: bool = False
    is_group_member: bool = False

class CT600Create(BaseModel):
    company: CompanyBase
    turnover: Decimal = 0
    cost_of_sales: Decimal = 0
    admin_expenses: Decimal = 0
    other_income: Decimal = 0
    finance_costs: Decimal = 0
    profit_before_tax: Decimal = 0
    
    depreciation_addback: Decimal = 0
    legal_professional_fees: Decimal = 0
    entertainment_disallowed: Decimal = 0
    provisions_not_allowed: Decimal = 0
    other_adjustments: Decimal = 0
    
    plant_machinery_additions: Decimal = 0
    plant_machinery_disposals: Decimal = 0
    annual_investment_allowance: Decimal = 0
    writing_down_allowance: Decimal = 0
    balancing_charge_allowance: Decimal = 0
    
    losses_brought_forward: Decimal = 0
    losses_set_against_profit: Decimal = 0
    losses_carried_back: Decimal = 0
    losses_carried_forward: Decimal = 0
    
    rd_relief_claimed: Decimal = 0
    rd_tax_credit: Decimal = 0
    patent_box_relief: Decimal = 0
    creative_industry_relief: Decimal = 0
    marginal_relief: Decimal = 0
    group_relief: Decimal = 0
    other_reliefs: Decimal = 0
    
    quarterly_payments_made: Decimal = 0
    
    synced_from_accounts: bool = False
    status: str = "draft"

class CT600Update(BaseModel):
    turnover: Optional[Decimal] = None
    cost_of_sales: Optional[Decimal] = None
    admin_expenses: Optional[Decimal] = None
    other_income: Optional[Decimal] = None
    finance_costs: Optional[Decimal] = None
    profit_before_tax: Optional[Decimal] = None
    depreciation_addback: Optional[Decimal] = None
    legal_professional_fees: Optional[Decimal] = None
    entertainment_disallowed: Optional[Decimal] = None
    provisions_not_allowed: Optional[Decimal] = None
    other_adjustments: Optional[Decimal] = None
    plant_machinery_additions: Optional[Decimal] = None
    plant_machinery_disposals: Optional[Decimal] = None
    annual_investment_allowance: Optional[Decimal] = None
    writing_down_allowance: Optional[Decimal] = None
    balancing_charge_allowance: Optional[Decimal] = None
    losses_brought_forward: Optional[Decimal] = None
    losses_set_against_profit: Optional[Decimal] = None
    losses_carried_back: Optional[Decimal] = None
    losses_carried_forward: Optional[Decimal] = None
    rd_relief_claimed: Optional[Decimal] = None
    rd_tax_credit: Optional[Decimal] = None
    patent_box_relief: Optional[Decimal] = None
    creative_industry_relief: Optional[Decimal] = None
    marginal_relief: Optional[Decimal] = None
    group_relief: Optional[Decimal] = None
    other_reliefs: Optional[Decimal] = None
    quarterly_payments_made: Optional[Decimal] = None
    status: Optional[str] = None

class RDClaimCreate(BaseModel):
    company_id: str
    project_name: str
    project_description: str
    tax_year: str
    scheme: str  # SME, RDEC, Merged
    staff_costs: Decimal = 0
    subcontractor_costs: Decimal = 0
    materials_costs: Decimal = 0
    software_costs: Decimal = 0
    other_costs: Decimal = 0
    technical_narrative: Optional[str] = None
    uncertainties: Optional[str] = None
    advancement_in_field: Optional[str] = None
    status: str = "draft"

class RDClaimUpdate(BaseModel):
    project_name: Optional[str] = None
    project_description: Optional[str] = None
    staff_costs: Optional[Decimal] = None
    subcontractor_costs: Optional[Decimal] = None
    materials_costs: Optional[Decimal] = None
    software_costs: Optional[Decimal] = None
    other_costs: Optional[Decimal] = None
    technical_narrative: Optional[str] = None
    uncertainties: Optional[str] = None
    advancement_in_field: Optional[str] = None
    status: Optional[str] = None

class CapitalAllowanceCreate(BaseModel):
    company_id: str
    tax_year: str
    asset_type: str
    pool_type: str
    asset_description: str
    acquisition_date: date
    cost: Decimal
    allowance_claimed: Decimal
    status: str = "active"

class CapitalAllowanceUpdate(BaseModel):
    asset_description: Optional[str] = None
    cost: Optional[Decimal] = None
    allowance_claimed: Optional[Decimal] = None
    disposal_date: Optional[date] = None
    disposal_proceeds: Optional[Decimal] = None
    status: Optional[str] = None

class GroupReliefCreate(BaseModel):
    claimant_company_id: str
    surrendering_company_name: str
    surrendering_company_utr: str
    tax_year: str
    available_losses: Decimal
    losses_claimed: Decimal
    consent_received: bool = False
    status: str = "draft"

class GroupReliefUpdate(BaseModel):
    available_losses: Optional[Decimal] = None
    losses_claimed: Optional[Decimal] = None
    consent_received: Optional[bool] = None
    consent_date: Optional[date] = None
    status: Optional[str] = None


@router.get("/ct600/list")
def list_ct600_returns(
    request: Request,
    db: Session = Depends(get_db),
    status: Optional[str] = Query(None),
    tax_year: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 100
):
    """List all CT600 returns for the tenant"""
    query = db.query(TaxReturnCT).filter(
        TaxReturnCT.tenant_id == request.state.tenant_id
    )
    
    if status:
        query = query.filter(TaxReturnCT.status == status)
    
    if tax_year:
        query = query.filter(TaxReturnCT.tax_year == tax_year)
    
    returns = query.offset(skip).limit(limit).all()
    return {"returns": returns, "total": query.count()}

@router.get("/ct600/{return_id}")
def get_ct600_return(
    return_id: str,
    request: Request,
    db: Session = Depends(get_db)
):
    """Get a specific CT600 return by ID"""
    tax_return = db.query(TaxReturnCT).filter(
        TaxReturnCT.id == return_id,
        TaxReturnCT.tenant_id == request.state.tenant_id
    ).first()
    
    if not tax_return:
        raise HTTPException(status_code=404, detail="CT600 return not found")
    
    return tax_return

@router.post("/ct600/create")
def create_ct600_return(
    data: CT600Create,
    request: Request,
    db: Session = Depends(get_db)
):
    """Create a new CT600 return with full computation"""
    total_adjustments = (
        data.depreciation_addback +
        data.legal_professional_fees +
        data.entertainment_disallowed +
        data.provisions_not_allowed +
        data.other_adjustments
    )
    
    total_capital_allowances = (
        data.annual_investment_allowance +
        data.writing_down_allowance +
        data.balancing_charge_allowance
    )
    
    taxable_profit = (
        data.profit_before_tax +
        total_adjustments -
        total_capital_allowances -
        data.losses_set_against_profit
    )
    
    if taxable_profit <= 50000:
        corporation_tax = taxable_profit * Decimal("0.19")
        marginal_relief = Decimal("0")
    elif taxable_profit <= 250000:
        marginal_relief = (Decimal("250000") - taxable_profit) * Decimal("0.015")
        corporation_tax = (taxable_profit * Decimal("0.25")) - marginal_relief
    else:
        corporation_tax = taxable_profit * Decimal("0.25")
        marginal_relief = Decimal("0")
    
    total_reliefs = (
        data.rd_relief_claimed +
        data.rd_tax_credit +
        data.patent_box_relief +
        data.creative_industry_relief +
        marginal_relief +
        data.group_relief +
        data.other_reliefs
    )
    
    tax_due = corporation_tax - total_reliefs
    balance_due = tax_due - data.quarterly_payments_made
    
    computations = {
        "total_adjustments": float(total_adjustments),
        "total_capital_allowances": float(total_capital_allowances),
        "taxable_profit": float(taxable_profit),
        "corporation_tax_before_reliefs": float(corporation_tax),
        "marginal_relief": float(marginal_relief),
        "total_reliefs": float(total_reliefs),
        "tax_due": float(tax_due),
        "balance_due": float(balance_due)
    }
    
    tax_return = TaxReturnCT(
        tenant_id=request.state.tenant_id,
        company_id=data.company.company_number,
        period_start=data.company.accounting_period_start,
        period_end=data.company.accounting_period_end,
        utr=data.company.utr,
        profit_before_tax=data.profit_before_tax,
        taxable_profit=taxable_profit,
        corporation_tax=tax_due,
        computations=computations,
        status=data.status
    )
    
    db.add(tax_return)
    db.commit()
    db.refresh(tax_return)
    
    return {
        "tax_return": tax_return,
        "computations": computations
    }

@router.put("/ct600/{return_id}")
def update_ct600_return(
    return_id: str,
    data: CT600Update,
    request: Request,
    db: Session = Depends(get_db)
):
    """Update an existing CT600 return"""
    tax_return = db.query(TaxReturnCT).filter(
        TaxReturnCT.id == return_id,
        TaxReturnCT.tenant_id == request.state.tenant_id
    ).first()
    
    if not tax_return:
        raise HTTPException(status_code=404, detail="CT600 return not found")
    
    update_data = data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(tax_return, field, value)
    
    db.commit()
    db.refresh(tax_return)
    
    return tax_return

@router.delete("/ct600/{return_id}")
def delete_ct600_return(
    return_id: str,
    request: Request,
    db: Session = Depends(get_db)
):
    """Delete a CT600 return"""
    tax_return = db.query(TaxReturnCT).filter(
        TaxReturnCT.id == return_id,
        TaxReturnCT.tenant_id == request.state.tenant_id
    ).first()
    
    if not tax_return:
        raise HTTPException(status_code=404, detail="CT600 return not found")
    
    db.delete(tax_return)
    db.commit()
    
    return {"message": "CT600 return deleted successfully"}


@router.get("/rd-claims/list")
def list_rd_claims(
    request: Request,
    db: Session = Depends(get_db),
    company_id: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 100
):
    """List all R&D claims for the tenant"""
    query = db.query(RnDClaim).filter(
        RnDClaim.tenant_id == request.state.tenant_id
    )
    
    if status:
        query = query.filter(RnDClaim.status == status)
    
    claims = query.offset(skip).limit(limit).all()
    return {"claims": claims, "total": query.count()}

@router.get("/rd-claims/{claim_id}")
def get_rd_claim(
    claim_id: str,
    request: Request,
    db: Session = Depends(get_db)
):
    """Get a specific R&D claim by ID"""
    claim = db.query(RnDClaim).filter(
        RnDClaim.id == claim_id,
        RnDClaim.tenant_id == request.state.tenant_id
    ).first()
    
    if not claim:
        raise HTTPException(status_code=404, detail="R&D claim not found")
    
    return claim

@router.post("/rd-claims/create")
def create_rd_claim(
    data: RDClaimCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """Create a new R&D claim"""
    total_expenditure = (
        data.staff_costs +
        data.subcontractor_costs +
        data.materials_costs +
        data.software_costs +
        data.other_costs
    )
    
    if data.scheme == "SME":
        enhancement_rate = Decimal("2.31")  # 231%
        enhanced_expenditure = total_expenditure * enhancement_rate
        relief_claimed = enhanced_expenditure - total_expenditure
        credit_rate = Decimal("0")
    elif data.scheme == "RDEC":
        enhancement_rate = Decimal("1")
        relief_claimed = Decimal("0")
        credit_rate = total_expenditure * Decimal("0.20")  # 20% RDEC
    else:  # Merged
        enhancement_rate = Decimal("1.86")  # 186%
        enhanced_expenditure = total_expenditure * enhancement_rate
        relief_claimed = enhanced_expenditure - total_expenditure
        credit_rate = Decimal("0")
    
    project_details = {
        "project_name": data.project_name,
        "project_description": data.project_description,
        "staff_costs": float(data.staff_costs),
        "subcontractor_costs": float(data.subcontractor_costs),
        "materials_costs": float(data.materials_costs),
        "software_costs": float(data.software_costs),
        "other_costs": float(data.other_costs),
        "total_expenditure": float(total_expenditure),
        "scheme": data.scheme,
        "technical_narrative": data.technical_narrative,
        "uncertainties": data.uncertainties,
        "advancement_in_field": data.advancement_in_field
    }
    
    claim = RnDClaim(
        tenant_id=request.state.tenant_id,
        tax_return_id=data.company_id,  # Using company_id as placeholder
        claim_type=data.scheme,
        qualifying_expenditure=total_expenditure,
        enhancement_rate=enhancement_rate * 100,
        credit_rate=credit_rate,
        total_relief=relief_claimed,
        project_details=project_details
    )
    
    db.add(claim)
    db.commit()
    db.refresh(claim)
    
    return {
        "claim": claim,
        "calculation": {
            "total_expenditure": total_expenditure,
            "relief_claimed": relief_claimed,
            "tax_credit": credit_rate
        }
    }

@router.put("/rd-claims/{claim_id}")
def update_rd_claim(
    claim_id: str,
    data: RDClaimUpdate,
    request: Request,
    db: Session = Depends(get_db)
):
    """Update an existing R&D claim"""
    claim = db.query(RnDClaim).filter(
        RnDClaim.id == claim_id,
        RnDClaim.tenant_id == request.state.tenant_id
    ).first()
    
    if not claim:
        raise HTTPException(status_code=404, detail="R&D claim not found")
    
    if claim.project_details:
        project_details = claim.project_details
    else:
        project_details = {}
    
    update_data = data.dict(exclude_unset=True)
    for field, value in update_data.items():
        project_details[field] = value
    
    claim.project_details = project_details
    
    db.commit()
    db.refresh(claim)
    
    return claim

@router.delete("/rd-claims/{claim_id}")
def delete_rd_claim(
    claim_id: str,
    request: Request,
    db: Session = Depends(get_db)
):
    """Delete an R&D claim"""
    claim = db.query(RnDClaim).filter(
        RnDClaim.id == claim_id,
        RnDClaim.tenant_id == request.state.tenant_id
    ).first()
    
    if not claim:
        raise HTTPException(status_code=404, detail="R&D claim not found")
    
    db.delete(claim)
    db.commit()
    
    return {"message": "R&D claim deleted successfully"}


@router.get("/dashboard/stats")
def get_dashboard_stats(
    request: Request,
    db: Session = Depends(get_db)
):
    """Get dashboard statistics"""
    total_clients = db.query(TaxReturnCT).filter(
        TaxReturnCT.tenant_id == request.state.tenant_id
    ).count()
    
    total_tax_due = db.query(TaxReturnCT).filter(
        TaxReturnCT.tenant_id == request.state.tenant_id
    ).with_entities(
        db.func.sum(TaxReturnCT.corporation_tax)
    ).scalar() or 0
    
    rd_claims_count = db.query(RnDClaim).filter(
        RnDClaim.tenant_id == request.state.tenant_id
    ).count()
    
    total_rd_relief = db.query(RnDClaim).filter(
        RnDClaim.tenant_id == request.state.tenant_id
    ).with_entities(
        db.func.sum(RnDClaim.total_relief)
    ).scalar() or 0
    
    upcoming_deadlines = db.query(TaxReturnCT).filter(
        TaxReturnCT.tenant_id == request.state.tenant_id,
        TaxReturnCT.status.in_(["draft", "in-progress"])
    ).count()
    
    return {
        "total_clients": total_clients,
        "active_ct600s": total_clients,
        "total_tax_due": float(total_tax_due),
        "rd_projects_active": rd_claims_count,
        "total_rd_relief": float(total_rd_relief),
        "upcoming_deadlines": upcoming_deadlines
    }
