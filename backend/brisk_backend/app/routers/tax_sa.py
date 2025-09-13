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
