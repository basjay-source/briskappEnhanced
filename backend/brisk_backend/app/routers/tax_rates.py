from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date, datetime
from decimal import Decimal

from app.database import get_db
from app.models.tax_rates import TaxRate, HistoricalTaxReturn, UK_TAX_RATES_HISTORY

router = APIRouter()

class TaxRateQuery(BaseModel):
    country: str = "UK"
    tax_type: str
    effective_date: date

class TaxReturnCreate(BaseModel):
    company_id: str
    tax_year: str
    return_type: str
    period_start: date
    period_end: date
    taxable_profit: Optional[float] = None
    tax_due: Optional[float] = None
    return_data: Optional[dict] = None

@router.get("/rates/current")
def get_current_tax_rates(
    country: str = "UK",
    tax_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get current tax rates for a country and tax type"""
    query = db.query(TaxRate).filter(
        TaxRate.country == country,
        TaxRate.is_active == True,
        TaxRate.effective_from <= date.today()
    )
    
    if tax_type:
        query = query.filter(TaxRate.tax_type == tax_type)
    
    query = query.filter(
        (TaxRate.effective_to == None) | (TaxRate.effective_to >= date.today())
    )
    
    rates = query.all()
    
    if not rates:
        return {
            "country": country,
            "rates": {
                "corporation_tax": {
                    "main_rate": 25.0,
                    "small_profits_rate": 19.0,
                    "small_profits_threshold": 50000,
                    "effective_from": "2023-04-01"
                },
                "vat": {
                    "standard": 20.0,
                    "reduced": 5.0,
                    "zero": 0.0
                },
                "income_tax": {
                    "basic_rate": 20.0,
                    "higher_rate": 40.0,
                    "additional_rate": 45.0,
                    "personal_allowance": 12570,
                    "basic_threshold": 50270
                }
            }
        }
    
    return {
        "country": country,
        "rates": [
            {
                "id": rate.id,
                "tax_type": rate.tax_type,
                "rate": rate.rate,
                "effective_from": rate.effective_from.isoformat(),
                "effective_to": rate.effective_to.isoformat() if rate.effective_to else None,
                "tax_year": rate.tax_year,
                "band_lower": rate.band_lower,
                "band_upper": rate.band_upper,
                "description": rate.description
            } for rate in rates
        ]
    }

@router.get("/rates/historical")
def get_historical_tax_rates(
    country: str = "UK",
    tax_type: str = "corporation_tax",
    years_back: int = 30,
    db: Session = Depends(get_db)
):
    """Get historical tax rates going back specified years"""
    
    if country == "UK" and tax_type in UK_TAX_RATES_HISTORY:
        historical_data = UK_TAX_RATES_HISTORY[tax_type][:years_back]
        return {
            "country": country,
            "tax_type": tax_type,
            "years_back": years_back,
            "rates": historical_data
        }
    
    cutoff_date = date(date.today().year - years_back, 1, 1)
    
    rates = db.query(TaxRate).filter(
        TaxRate.country == country,
        TaxRate.tax_type == tax_type,
        TaxRate.effective_from >= cutoff_date
    ).order_by(TaxRate.effective_from.desc()).all()
    
    return {
        "country": country,
        "tax_type": tax_type,
        "years_back": years_back,
        "rates": [
            {
                "tax_year": rate.tax_year,
                "rate": rate.rate,
                "effective_from": rate.effective_from.isoformat(),
                "band_lower": rate.band_lower,
                "band_upper": rate.band_upper
            } for rate in rates
        ]
    }

@router.get("/rates/for-date")
def get_tax_rate_for_date(
    effective_date: date,
    country: str = "UK",
    tax_type: str = "corporation_tax",
    db: Session = Depends(get_db)
):
    """Get the tax rate applicable for a specific date"""
    
    rate = db.query(TaxRate).filter(
        TaxRate.country == country,
        TaxRate.tax_type == tax_type,
        TaxRate.effective_from <= effective_date,
        (TaxRate.effective_to == None) | (TaxRate.effective_to >= effective_date)
    ).first()
    
    if not rate:
        if country == "UK" and tax_type == "corporation_tax":
            for historical_rate in UK_TAX_RATES_HISTORY["corporation_tax"]:
                if historical_rate["effective_from"] <= effective_date:
                    return {
                        "country": country,
                        "tax_type": tax_type,
                        "effective_date": effective_date.isoformat(),
                        "rate": historical_rate["rate"],
                        "tax_year": historical_rate["year"]
                    }
    
    if rate:
        return {
            "country": country,
            "tax_type": tax_type,
            "effective_date": effective_date.isoformat(),
            "rate": rate.rate,
            "tax_year": rate.tax_year,
            "band_lower": rate.band_lower,
            "band_upper": rate.band_upper
        }
    
    raise HTTPException(status_code=404, detail="Tax rate not found for specified date")

@router.post("/returns/historical")
def create_historical_tax_return(
    return_data: TaxReturnCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Create a historical tax return (supports up to 30 years back)"""
    
    try:
        year = int(return_data.tax_year.split('/')[0])
        current_year = date.today().year
        if current_year - year > 30:
            raise HTTPException(
                status_code=400, 
                detail="Tax returns older than 30 years are not supported"
            )
    except:
        pass
    
    tax_return = HistoricalTaxReturn(
        tenant_id=request.state.tenant_id if request and hasattr(request.state, 'tenant_id') else "default",
        company_id=return_data.company_id,
        tax_year=return_data.tax_year,
        return_type=return_data.return_type,
        period_start=return_data.period_start,
        period_end=return_data.period_end,
        taxable_profit=return_data.taxable_profit,
        tax_due=return_data.tax_due,
        return_data=return_data.return_data or {},
        status="draft"
    )
    
    db.add(tax_return)
    db.commit()
    db.refresh(tax_return)
    
    return {
        "id": tax_return.id,
        "company_id": tax_return.company_id,
        "tax_year": tax_return.tax_year,
        "return_type": tax_return.return_type,
        "status": tax_return.status,
        "message": "Historical tax return created successfully"
    }

@router.get("/returns/historical/{company_id}")
def get_historical_tax_returns(
    company_id: str,
    years_back: int = 30,
    return_type: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get all historical tax returns for a company"""
    
    tenant_id = request.state.tenant_id if request and hasattr(request.state, 'tenant_id') else "default"
    
    query = db.query(HistoricalTaxReturn).filter(
        HistoricalTaxReturn.tenant_id == tenant_id,
        HistoricalTaxReturn.company_id == company_id
    )
    
    if return_type:
        query = query.filter(HistoricalTaxReturn.return_type == return_type)
    
    cutoff_year = date.today().year - years_back
    query = query.filter(
        HistoricalTaxReturn.period_end >= date(cutoff_year, 1, 1)
    )
    
    returns = query.order_by(HistoricalTaxReturn.period_end.desc()).all()
    
    return {
        "company_id": company_id,
        "years_back": years_back,
        "total_returns": len(returns),
        "returns": [
            {
                "id": ret.id,
                "tax_year": ret.tax_year,
                "return_type": ret.return_type,
                "period_start": ret.period_start.isoformat(),
                "period_end": ret.period_end.isoformat(),
                "taxable_profit": ret.taxable_profit,
                "tax_due": ret.tax_due,
                "tax_paid": ret.tax_paid,
                "status": ret.status,
                "filing_date": ret.filing_date.isoformat() if ret.filing_date else None
            } for ret in returns
        ]
    }

@router.post("/rates/seed")
def seed_tax_rates(db: Session = Depends(get_db)):
    """Seed the database with historical UK tax rates"""
    
    for ct_rate in UK_TAX_RATES_HISTORY["corporation_tax"]:
        tax_rate = TaxRate(
            country="UK",
            tax_type="corporation_tax",
            rate=ct_rate["rate"],
            effective_from=ct_rate["effective_from"],
            tax_year=ct_rate["year"],
            description=f"UK Corporation Tax {ct_rate['year']}"
        )
        db.add(tax_rate)
    
    for vat_rate in UK_TAX_RATES_HISTORY["vat"]:
        tax_rate = TaxRate(
            country="UK",
            tax_type="vat_standard",
            rate=vat_rate["standard"],
            effective_from=vat_rate["effective_from"],
            tax_year=vat_rate["year"],
            description=f"UK VAT Standard Rate {vat_rate['year']}"
        )
        db.add(tax_rate)
    
    db.commit()
    
    return {"message": "Tax rates seeded successfully"}
