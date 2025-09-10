from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date
from decimal import Decimal

from app.database import get_db
from app.models import TaxReturnCT, RnDClaim

router = APIRouter()

class TaxReturnCTCreate(BaseModel):
    company_id: str
    period_start: date
    period_end: date
    utr: Optional[str] = None
    profit_before_tax: Optional[Decimal] = 0

class RnDClaimCreate(BaseModel):
    tax_return_id: str
    claim_type: str
    qualifying_expenditure: Decimal
    enhancement_rate: Optional[Decimal] = 130
    project_details: dict

@router.get("/returns/{company_id}")
def get_ct_returns(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    returns = db.query(TaxReturnCT).filter(
        TaxReturnCT.tenant_id == request.state.tenant_id,
        TaxReturnCT.company_id == company_id
    ).all()
    
    return returns

@router.post("/returns/compute")
def compute_ct600(
    return_data: TaxReturnCTCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    profit_before_tax = return_data.profit_before_tax or 0
    
    adjustments = {
        "depreciation_addback": profit_before_tax * Decimal("0.05"),
        "capital_allowances": profit_before_tax * Decimal("0.03"),
        "entertaining_disallowed": profit_before_tax * Decimal("0.01")
    }
    
    taxable_profit = profit_before_tax + sum(adjustments.values())
    
    if taxable_profit <= 50000:
        corporation_tax = taxable_profit * Decimal("0.19")
    elif taxable_profit <= 250000:
        small_profits_rate = Decimal("0.19")
        main_rate = Decimal("0.25")
        marginal_relief = (250000 - taxable_profit) * Decimal("0.015")
        corporation_tax = (taxable_profit * main_rate) - marginal_relief
    else:
        corporation_tax = taxable_profit * Decimal("0.25")
    
    computations = {
        "profit_before_tax": profit_before_tax,
        "adjustments": adjustments,
        "taxable_profit": taxable_profit,
        "corporation_tax": corporation_tax,
        "effective_rate": (corporation_tax / profit_before_tax * 100) if profit_before_tax > 0 else 0
    }
    
    tax_return = TaxReturnCT(
        tenant_id=request.state.tenant_id,
        company_id=return_data.company_id,
        period_start=return_data.period_start,
        period_end=return_data.period_end,
        utr=return_data.utr,
        profit_before_tax=profit_before_tax,
        taxable_profit=taxable_profit,
        corporation_tax=corporation_tax,
        computations=computations,
        status="computed"
    )
    
    db.add(tax_return)
    db.commit()
    db.refresh(tax_return)
    
    return {
        "tax_return": tax_return,
        "computations": computations,
        "savings_opportunities": [
            "Consider R&D relief claims",
            "Review capital allowances timing",
            "Optimize group relief if applicable"
        ]
    }

@router.post("/rnd-claims")
def create_rnd_claim(
    claim_data: RnDClaimCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    qualifying_expenditure = claim_data.qualifying_expenditure
    enhancement_rate = claim_data.enhancement_rate or 130
    
    if claim_data.claim_type == "SME":
        enhanced_expenditure = qualifying_expenditure * (enhancement_rate / 100)
        total_relief = enhanced_expenditure - qualifying_expenditure
        credit_rate = Decimal("14.5") if enhancement_rate == 130 else Decimal("10.5")
    else:
        total_relief = qualifying_expenditure * Decimal("0.13")
        credit_rate = Decimal("10.5")
    
    claim = RnDClaim(
        tenant_id=request.state.tenant_id,
        tax_return_id=claim_data.tax_return_id,
        claim_type=claim_data.claim_type,
        qualifying_expenditure=qualifying_expenditure,
        enhancement_rate=enhancement_rate,
        credit_rate=credit_rate,
        total_relief=total_relief,
        project_details=claim_data.project_details
    )
    
    db.add(claim)
    db.commit()
    db.refresh(claim)
    
    return {
        "claim": claim,
        "relief_calculation": {
            "qualifying_expenditure": qualifying_expenditure,
            "enhancement_rate": enhancement_rate,
            "total_relief": total_relief,
            "potential_cash_credit": total_relief * (credit_rate / 100)
        }
    }

@router.get("/reliefs/available")
def get_available_reliefs(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    return {
        "reliefs": [
            {
                "name": "R&D Relief",
                "type": "SME/RDEC",
                "description": "Relief for qualifying R&D expenditure",
                "rates": {"SME": "130%", "RDEC": "13%"}
            },
            {
                "name": "Patent Box",
                "type": "IP",
                "description": "Reduced rate on profits from patented inventions",
                "rate": "10%"
            },
            {
                "name": "Creative Industries Relief",
                "type": "Sector",
                "description": "Relief for qualifying creative productions",
                "rate": "25%"
            }
        ]
    }
