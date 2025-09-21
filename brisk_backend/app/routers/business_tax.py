from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from datetime import datetime, date
from pydantic import BaseModel
from ..database import get_db
from ..services.hmrc_rates import hmrc_rates_service

router = APIRouter(prefix="/business-tax", tags=["business-tax"])

class CompanyProfile(BaseModel):
    company_name: str
    utr: str
    company_number: str
    accounting_ref_date: str
    company_type: str

class AccountingPeriod(BaseModel):
    start_date: date
    end_date: date
    ct_rate_year: str
    straddling: bool = False

class TrialBalanceEntry(BaseModel):
    code: str
    description: str
    debit: float
    credit: float
    mapped: bool = False
    tax_category: Optional[str] = None

class CapitalAllowancePool(BaseModel):
    pool_type: str
    brought_forward: float
    additions: float
    disposals: float
    wda_rate: float
    wda_amount: float
    carried_forward: float

class TaxAdjustment(BaseModel):
    description: str
    amount: float
    adjustment_type: str  # 'disallowable', 'timing', 'permanent'
    category: str

class CTComputation(BaseModel):
    trading_profit: float
    non_trading_income: float
    chargeable_gains: float
    total_profits: float
    losses_utilized: float
    taxable_profits: float
    ct_liability: float
    marginal_relief: float
    effective_rate: float

@router.get("/dashboard/kpis")
async def get_dashboard_kpis(db: Session = Depends(get_db)):
    """Get KPI data for Business Tax dashboard"""
    ct_rates = await hmrc_rates_service.get_corporation_tax_rates(db)
    main_rate_pct = ct_rates["main_rate"] * 100
    small_rate_pct = ct_rates["small_rate"] * 100
    
    return {
        "ct_liability": {
            "value": 45250,
            "change": 12.5,
            "trend": "up",
            "drill_down": [
                {"component": "Trading Profits", "amount": 180000, "rate": main_rate_pct, "liability": 45000},
                {"component": "Chargeable Gains", "amount": 5000, "rate": main_rate_pct, "liability": 1250},
                {"component": "Marginal Relief", "amount": -1000, "rate": 0, "liability": -1000}
            ]
        },
        "effective_rate": {
            "value": 24.1,
            "change": -0.9,
            "trend": "down",
            "drill_down": [
                {"year": "2023", "rate": main_rate_pct, "profits": 180000, "liability": 45000},
                {"year": "2022", "rate": small_rate_pct, "profits": 165000, "liability": 31350},
                {"year": "2021", "rate": small_rate_pct, "profits": 145000, "liability": 27550}
            ]
        },
        "capital_allowances": {
            "value": 28500,
            "change": 15.2,
            "trend": "up",
            "drill_down": [
                {"pool": "Main Pool", "additions": 45000, "wda": 18000, "rate": 18},
                {"pool": "Special Rate", "additions": 15000, "wda": 900, "rate": 6},
                {"pool": "AIA", "additions": 25000, "allowance": 25000, "rate": 100}
            ]
        },
        "group_relief": {
            "value": 12000,
            "change": "New",
            "trend": "neutral",
            "drill_down": [
                {"company": "Beta Ltd", "surrender": 8000, "claim": 8000, "saving": 2000},
                {"company": "Gamma Ltd", "surrender": 16000, "claim": 16000, "saving": 4000}
            ]
        }
    }

@router.get("/dashboard/exceptions")
async def get_dashboard_exceptions():
    """Get exceptions for Business Tax dashboard"""
    return [
        {
            "id": "1",
            "type": "error",
            "title": "TB not final",
            "description": "Trial balance import is still in draft status",
            "module": "Prelims",
            "action": "Finalize TB"
        },
        {
            "id": "2",
            "type": "warning",
            "title": "Capital allowances missing",
            "description": "No capital allowances computation found",
            "module": "Capital Allowances",
            "action": "Complete computation"
        },
        {
            "id": "3",
            "type": "info",
            "title": "Group relief not allocated",
            "description": "Available group relief has not been allocated",
            "module": "Group & Consortia",
            "action": "Allocate relief"
        }
    ]

@router.get("/dashboard/timeline")
async def get_compliance_timeline():
    """Get compliance timeline events"""
    return [
        {
            "id": "1",
            "date": "2024-01-15",
            "title": "CT600 Filing Deadline",
            "description": "Corporation Tax return due for period ending 31/12/2023",
            "status": "pending"
        },
        {
            "id": "2",
            "date": "2024-01-01",
            "title": "QIP Due",
            "description": "Quarterly instalment payment due",
            "status": "completed"
        },
        {
            "id": "3",
            "date": "2023-12-31",
            "title": "Accounting Period End",
            "description": "Year end 31 December 2023",
            "status": "completed"
        }
    ]

@router.get("/engagement/company-profile")
async def get_company_profile():
    """Get company profile information"""
    return {
        "company_name": "Acme Corp Ltd",
        "utr": "1234567890",
        "company_number": "12345678",
        "accounting_ref_date": "31/12",
        "company_type": "small"
    }

@router.post("/engagement/company-profile")
async def update_company_profile(profile: CompanyProfile):
    """Update company profile information"""
    return {"message": "Company profile updated successfully", "profile": profile}

@router.get("/engagement/accounting-periods")
async def get_accounting_periods(db: Session = Depends(get_db)):
    """Get accounting periods and CT rate year"""
    return {
        "current_period": {
            "start_date": "2023-01-01",
            "end_date": "2023-12-31",
            "ct_rate_year": "2023/24",
            "straddling": False
        },
        "rate_info": await hmrc_rates_service.get_corporation_tax_rates(db)
    }

@router.get("/prelims/trial-balance")
async def get_trial_balance():
    """Get trial balance data"""
    return [
        {"code": "1000", "description": "Fixed Assets - Cost", "debit": 250000, "credit": 0, "mapped": True},
        {"code": "1001", "description": "Fixed Assets - Depreciation", "debit": 0, "credit": 85000, "mapped": True},
        {"code": "2000", "description": "Stock", "debit": 45000, "credit": 0, "mapped": True},
        {"code": "3000", "description": "Debtors", "debit": 65000, "credit": 0, "mapped": True},
        {"code": "4000", "description": "Bank", "debit": 25000, "credit": 0, "mapped": True},
        {"code": "5000", "description": "Creditors", "debit": 0, "credit": 35000, "mapped": True},
        {"code": "6000", "description": "Sales", "debit": 0, "credit": 450000, "mapped": True},
        {"code": "7000", "description": "Purchases", "debit": 280000, "credit": 0, "mapped": True},
        {"code": "8000", "description": "Expenses", "debit": 95000, "credit": 0, "mapped": True}
    ]

@router.post("/prelims/import-tb")
async def import_trial_balance():
    """Import trial balance from bookkeeping module"""
    return {"message": "Trial balance imported successfully", "status": "completed"}

@router.get("/prelims/final-accounts")
async def get_final_accounts():
    """Get final accounts (iXBRL) information"""
    return {
        "status": "attached",
        "source": "accounts_production",
        "profit_loss": {
            "turnover": 450000,
            "cost_of_sales": 280000,
            "gross_profit": 170000,
            "admin_expenses": 95000,
            "operating_profit": 75000
        },
        "balance_sheet": {
            "fixed_assets": 165000,
            "current_assets": 135000,
            "current_liabilities": 35000,
            "net_assets": 265000
        }
    }

@router.get("/capital-allowances/pools")
async def get_capital_allowance_pools():
    """Get capital allowance pools"""
    return [
        {
            "pool_type": "Main Pool",
            "brought_forward": 45000,
            "additions": 25000,
            "disposals": 0,
            "wda_rate": 18,
            "wda_amount": 12600,
            "carried_forward": 57400
        },
        {
            "pool_type": "Special Rate Pool",
            "brought_forward": 15000,
            "additions": 8000,
            "disposals": 0,
            "wda_rate": 6,
            "wda_amount": 1380,
            "carried_forward": 21620
        },
        {
            "pool_type": "AIA",
            "brought_forward": 0,
            "additions": 35000,
            "disposals": 0,
            "wda_rate": 100,
            "wda_amount": 35000,
            "carried_forward": 0
        }
    ]

@router.post("/capital-allowances/compute")
async def compute_capital_allowances():
    """Compute capital allowances"""
    return {
        "total_allowances": 49980,
        "aia_claimed": 35000,
        "wda_claimed": 13980,
        "balancing_charges": 0,
        "pools_updated": True
    }

@router.get("/computation/summary")
async def get_ct_computation(db: Session = Depends(get_db), tax_year: Optional[str] = None):
    """Get CT computation summary with dynamic rates"""
    ct_rates = await hmrc_rates_service.get_corporation_tax_rates(db, tax_year)
    
    trading_profit = 75000
    adjustments = 15000
    adjusted_trading_profit = trading_profit + adjustments
    capital_allowances = -28500
    net_trading_profit = adjusted_trading_profit + capital_allowances
    non_trading_income = 2500
    chargeable_gains = 5000
    total_profits = net_trading_profit + non_trading_income + chargeable_gains
    losses_utilized = -12000
    taxable_profits = total_profits + losses_utilized
    
    if taxable_profits <= ct_rates["threshold"]:
        ct_liability = taxable_profits * ct_rates["small_rate"]
        marginal_relief = 0
    else:
        small_rate_profit = ct_rates["threshold"]
        main_rate_profit = taxable_profits - ct_rates["threshold"]
        ct_liability = (small_rate_profit * ct_rates["small_rate"]) + (main_rate_profit * ct_rates["main_rate"])
        marginal_relief = 0
    
    return {
        "trading_profit": trading_profit,
        "adjustments": adjustments,
        "adjusted_trading_profit": adjusted_trading_profit,
        "capital_allowances": capital_allowances,
        "net_trading_profit": net_trading_profit,
        "non_trading_income": non_trading_income,
        "chargeable_gains": chargeable_gains,
        "total_profits": total_profits,
        "losses_utilized": losses_utilized,
        "taxable_profits": taxable_profits,
        "ct_rate": ct_rates["small_rate"] if taxable_profits <= ct_rates["threshold"] else ct_rates["main_rate"],
        "ct_liability": round(ct_liability, 2),
        "marginal_relief": marginal_relief,
        "final_liability": round(ct_liability, 2),
        "tax_year": tax_year or hmrc_rates_service.get_current_tax_year(),
        "rates_used": ct_rates
    }

@router.post("/computation/generate")
async def generate_ct_computation():
    """Generate CT computation"""
    return {"message": "CT computation generated successfully", "computation_id": "CT2023001"}

@router.get("/filing/status")
async def get_filing_status():
    """Get filing status"""
    return {
        "status": "ready_to_file",
        "hmrc_connected": True,
        "validation_passed": True,
        "attachments_complete": True,
        "filing_deadline": "2024-01-15"
    }

@router.post("/filing/submit")
async def submit_ct600():
    """Submit CT600 to HMRC"""
    return {
        "message": "CT600 submitted successfully",
        "submission_id": "SUB123456789",
        "timestamp": datetime.now().isoformat(),
        "acknowledgement": "ACK987654321"
    }

@router.get("/reports/computation-pack")
async def get_computation_pack():
    """Get computation pack report"""
    return {
        "report_type": "computation_pack",
        "generated_date": datetime.now().isoformat(),
        "sections": [
            "CT Computation",
            "Capital Allowances",
            "Losses Utilization",
            "Group Relief",
            "Supporting Schedules"
        ]
    }

@router.get("/reports/payments-forecast")
async def get_payments_forecast():
    """Get payments forecast"""
    return [
        {
            "date": "2024-01-01",
            "description": "QIP 1",
            "amount": 2708,
            "status": "paid"
        },
        {
            "date": "2024-04-01",
            "description": "QIP 2",
            "amount": 2708,
            "status": "due"
        },
        {
            "date": "2024-07-01",
            "description": "QIP 3",
            "amount": 2708,
            "status": "forecast"
        },
        {
            "date": "2024-10-01",
            "description": "QIP 4 + Balance",
            "amount": 2706,
            "status": "forecast"
        }
    ]

@router.get("/hmrc-rates")
async def get_hmrc_rates(db: Session = Depends(get_db), tax_year: Optional[str] = None):
    """Get current HMRC rates for specified tax year"""
    rates = await hmrc_rates_service.get_rates_for_tax_year(db, tax_year)
    return {
        "tax_year": tax_year or hmrc_rates_service.get_current_tax_year(),
        "rates": rates
    }
