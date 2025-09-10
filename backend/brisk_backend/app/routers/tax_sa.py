from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date
from decimal import Decimal

from app.database import get_db
from app.models import TaxReturnSA

router = APIRouter()

class TaxReturnSACreate(BaseModel):
    client_id: str
    tax_year: str
    utr: Optional[str] = None
    employment_income: Optional[Decimal] = 0
    self_employment_income: Optional[Decimal] = 0
    property_income: Optional[Decimal] = 0
    dividend_income: Optional[Decimal] = 0
    capital_gains: Optional[Decimal] = 0

class IHTCalculationRequest(BaseModel):
    estate_value: Decimal
    gifts_made: Optional[Decimal] = None
    nil_rate_band_used: Optional[Decimal] = None
    residence_nil_rate_band: Optional[Decimal] = None

class PensionPlanningRequest(BaseModel):
    annual_income: Decimal
    current_contributions: Decimal
    pension_value: Decimal
    unused_allowance: Optional[Decimal] = None

class FamilyTaxRequest(BaseModel):
    spouse1_income: Decimal
    spouse2_income: Decimal
    children_count: int
    high_earner_income: Optional[Decimal] = None

@router.get("/returns/{client_id}")
def get_sa_returns(
    client_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    returns = db.query(TaxReturnSA).filter(
        TaxReturnSA.tenant_id == request.state.tenant_id,
        TaxReturnSA.client_id == client_id
    ).all()
    
    return returns

@router.post("/returns/compute")
def compute_sa_return(
    return_data: TaxReturnSACreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    employment_income = return_data.employment_income or 0
    self_employment_income = return_data.self_employment_income or 0
    property_income = return_data.property_income or 0
    dividend_income = return_data.dividend_income or 0
    capital_gains = return_data.capital_gains or 0
    
    personal_allowance = Decimal("12570")
    basic_rate_limit = Decimal("37700")
    higher_rate_limit = Decimal("125140")
    
    total_income = employment_income + self_employment_income + property_income
    taxable_income = max(0, total_income - personal_allowance)
    
    income_tax = 0
    if taxable_income > 0:
        if taxable_income <= basic_rate_limit:
            income_tax = taxable_income * Decimal("0.20")
        elif taxable_income <= higher_rate_limit:
            income_tax = (basic_rate_limit * Decimal("0.20")) + ((taxable_income - basic_rate_limit) * Decimal("0.40"))
        else:
            income_tax = (basic_rate_limit * Decimal("0.20")) + ((higher_rate_limit - basic_rate_limit) * Decimal("0.40")) + ((taxable_income - higher_rate_limit) * Decimal("0.45"))
    
    dividend_allowance = Decimal("1000")
    taxable_dividends = max(0, dividend_income - dividend_allowance)
    dividend_tax = 0
    
    if taxable_dividends > 0:
        if taxable_income <= basic_rate_limit:
            dividend_tax = taxable_dividends * Decimal("0.0875")
        elif taxable_income <= higher_rate_limit:
            dividend_tax = taxable_dividends * Decimal("0.3375")
        else:
            dividend_tax = taxable_dividends * Decimal("0.39375")
    
    cgt_allowance = Decimal("6000")
    taxable_gains = max(0, capital_gains - cgt_allowance)
    capital_gains_tax = 0
    
    if taxable_gains > 0:
        if taxable_income <= basic_rate_limit:
            capital_gains_tax = taxable_gains * Decimal("0.10")
        else:
            capital_gains_tax = taxable_gains * Decimal("0.20")
    
    total_tax_due = income_tax + dividend_tax + capital_gains_tax
    
    computations = {
        "income_breakdown": {
            "employment": employment_income,
            "self_employment": self_employment_income,
            "property": property_income,
            "dividends": dividend_income,
            "capital_gains": capital_gains
        },
        "allowances": {
            "personal_allowance": personal_allowance,
            "dividend_allowance": dividend_allowance,
            "cgt_allowance": cgt_allowance
        },
        "tax_calculations": {
            "income_tax": income_tax,
            "dividend_tax": dividend_tax,
            "capital_gains_tax": capital_gains_tax,
            "total_tax_due": total_tax_due
        }
    }
    
    tax_return = TaxReturnSA(
        tenant_id=request.state.tenant_id,
        client_id=return_data.client_id,
        tax_year=return_data.tax_year,
        utr=return_data.utr,
        employment_income=employment_income,
        self_employment_income=self_employment_income,
        property_income=property_income,
        dividend_income=dividend_income,
        capital_gains=capital_gains,
        total_tax_due=total_tax_due,
        computations=computations,
        status="computed"
    )
    
    db.add(tax_return)
    db.commit()
    db.refresh(tax_return)
    
    return {
        "tax_return": tax_return,
        "computations": computations,
        "optimization_opportunities": [
            "Consider pension contributions to reduce taxable income",
            "Review timing of capital gains realizations",
            "Optimize dividend vs salary extraction"
        ]
    }

@router.get("/optimization/{client_id}")
def get_tax_optimization(
    client_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    latest_return = db.query(TaxReturnSA).filter(
        TaxReturnSA.tenant_id == request.state.tenant_id,
        TaxReturnSA.client_id == client_id
    ).order_by(TaxReturnSA.created_at.desc()).first()
    
    if not latest_return:
        raise HTTPException(status_code=404, detail="No tax returns found")
    
    optimization_strategies = []
    
    if latest_return.total_tax_due > 10000:
        optimization_strategies.append({
            "strategy": "Pension Contributions",
            "description": "Increase pension contributions to reduce taxable income",
            "potential_saving": latest_return.total_tax_due * Decimal("0.1")
        })
    
    if latest_return.dividend_income > 1000:
        optimization_strategies.append({
            "strategy": "Dividend Timing",
            "description": "Optimize dividend timing across tax years",
            "potential_saving": latest_return.dividend_income * Decimal("0.05")
        })
    
    return {
        "client_id": client_id,
        "current_tax_liability": latest_return.total_tax_due,
        "optimization_strategies": optimization_strategies,
        "next_review_date": "2024-01-31"
    }

@router.post("/iht-calculation")
def calculate_iht(
    request_data: IHTCalculationRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    estate_value = request_data.estate_value
    gifts_made = request_data.gifts_made or Decimal('0')
    
    nil_rate_band = Decimal('325000')
    residence_nil_rate_band = Decimal('175000')
    
    total_nil_rate_bands = nil_rate_band + residence_nil_rate_band
    
    taxable_estate = max(Decimal('0'), estate_value - total_nil_rate_bands + gifts_made)
    iht_due = taxable_estate * Decimal('0.4')
    
    return {
        "estate_value": float(estate_value),
        "nil_rate_band": float(nil_rate_band),
        "residence_nil_rate_band": float(residence_nil_rate_band),
        "total_nil_rate_bands": float(total_nil_rate_bands),
        "gifts_made": float(gifts_made),
        "taxable_estate": float(taxable_estate),
        "iht_due": float(iht_due),
        "effective_rate": float((iht_due / estate_value * 100) if estate_value > 0 else 0)
    }

@router.post("/pension-optimization")
def optimize_pension(
    request_data: PensionPlanningRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    annual_income = request_data.annual_income
    current_contributions = request_data.current_contributions
    pension_value = request_data.pension_value
    unused_allowance = request_data.unused_allowance or Decimal('0')
    
    standard_allowance = Decimal('40000')
    lifetime_allowance = Decimal('1073100')
    
    tapered_allowance = standard_allowance
    if annual_income > Decimal('240000'):
        taper = min(standard_allowance, (annual_income - Decimal('240000')) / 2)
        tapered_allowance = max(Decimal('4000'), standard_allowance - taper)
    
    available_allowance = tapered_allowance - current_contributions + unused_allowance
    remaining_lifetime = lifetime_allowance - pension_value
    
    optimal_contribution = min(available_allowance, annual_income, remaining_lifetime)
    
    tax_relief = optimal_contribution * Decimal('0.4') if annual_income > Decimal('50270') else optimal_contribution * Decimal('0.2')
    
    return {
        "annual_income": float(annual_income),
        "standard_allowance": float(standard_allowance),
        "tapered_allowance": float(tapered_allowance),
        "available_allowance": float(available_allowance),
        "optimal_contribution": float(optimal_contribution),
        "tax_relief": float(tax_relief),
        "lifetime_allowance": float(lifetime_allowance),
        "pension_value": float(pension_value),
        "remaining_lifetime": float(remaining_lifetime),
        "utilization_percentage": float((pension_value / lifetime_allowance * 100) if lifetime_allowance > 0 else 0)
    }

@router.post("/family-tax-planning")
def calculate_family_tax(
    request_data: FamilyTaxRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    spouse1_income = request_data.spouse1_income
    spouse2_income = request_data.spouse2_income
    children_count = request_data.children_count
    high_earner_income = request_data.high_earner_income or max(spouse1_income, spouse2_income)
    
    marriage_allowance_transfer = Decimal('1260')
    marriage_allowance_saving = marriage_allowance_transfer * Decimal('0.2')
    
    child_benefit_rate = Decimal('1133.60') if children_count > 0 else Decimal('0')
    if children_count > 1:
        child_benefit_rate += (children_count - 1) * Decimal('751.20')
    
    hicbc_charge = Decimal('0')
    if high_earner_income > Decimal('50000'):
        excess = high_earner_income - Decimal('50000')
        charge_rate = min(Decimal('1'), excess / Decimal('10000'))
        hicbc_charge = child_benefit_rate * charge_rate
    
    net_child_benefit = child_benefit_rate - hicbc_charge
    
    return {
        "spouse1_income": float(spouse1_income),
        "spouse2_income": float(spouse2_income),
        "marriage_allowance_eligible": spouse1_income < Decimal('12570') or spouse2_income < Decimal('12570'),
        "marriage_allowance_saving": float(marriage_allowance_saving),
        "children_count": children_count,
        "child_benefit_gross": float(child_benefit_rate),
        "hicbc_charge": float(hicbc_charge),
        "child_benefit_net": float(net_child_benefit),
        "high_earner_income": float(high_earner_income),
        "total_family_savings": float(marriage_allowance_saving + net_child_benefit)
    }
