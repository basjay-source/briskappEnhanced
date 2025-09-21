from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from datetime import datetime, date
from pydantic import BaseModel
from ..database import get_db
from ..services.hmrc_rates import hmrc_rates_service
from ..services.hmrc_rates_historical import hmrc_historical_rates

router = APIRouter(prefix="/api/personal-tax", tags=["personal-tax"])

class TaxpayerProfile(BaseModel):
    utr: str
    nino: str
    first_name: str
    last_name: str
    date_of_birth: date
    address: str
    email: str
    phone: str
    bank_account: Optional[str] = None
    sort_code: Optional[str] = None
    marital_status: str = "single"
    spouse_name: Optional[str] = None
    student_loan_plan: Optional[str] = None
    blind_person_allowance: bool = False

class Employment(BaseModel):
    employer_name: str
    paye_ref: str
    start_date: date
    end_date: Optional[date] = None
    gross_pay: float
    tax_deducted: float
    ni_deducted: float
    p11d_benefits: float = 0
    expenses: float = 0

class SelfEmployment(BaseModel):
    business_name: str
    trade_description: str
    start_date: date
    end_date: Optional[date] = None
    accounting_basis: str = "cash"
    turnover: float
    expenses: float
    capital_allowances: float = 0
    cis_deducted: float = 0

class CapitalGain(BaseModel):
    asset_type: str
    disposal_date: date
    proceeds: float
    cost: float
    enhancement_costs: float = 0
    incidental_costs: float = 0
    relief_claimed: str = "none"

class TaxCalculation(BaseModel):
    total_income: float
    personal_allowance: float
    taxable_income: float
    income_tax: float
    ni_contributions: float
    total_tax: float
    tax_deducted: float
    balance_due: float

@router.get("/dashboard/kpis")
async def get_dashboard_kpis(db: Session = Depends(get_db), tax_year: Optional[str] = None):
    """Get KPI data for Personal Tax dashboard"""
    personal_rates = await hmrc_rates_service.get_personal_tax_rates(db, tax_year)
    ni_rates = await hmrc_rates_service.get_national_insurance_rates(db, tax_year)
    
    return {
        "total_tax_liability": {
            "value": 12450,
            "change": 8.5,
            "trend": "up",
            "drill_down": [
                {"component": "Income Tax", "amount": 8750, "rate": 20, "liability": 8750},
                {"component": "National Insurance", "amount": 3700, "rate": 12, "liability": 3700},
                {"component": "Dividend Tax", "amount": 0, "rate": 8.75, "liability": 0}
            ]
        },
        "effective_rate": {
            "value": 19.5,
            "change": -1.2,
            "trend": "down",
            "drill_down": [
                {"year": "2024-25", "total_income": 63950, "tax": 12450, "rate": 19.5},
                {"year": "2023-24", "total_income": 58000, "tax": 12040, "rate": 20.7},
                {"year": "2022-23", "total_income": 55000, "tax": 10500, "rate": 19.1}
            ]
        },
        "reliefs_claimed": {
            "value": 8500,
            "change": 15.0,
            "trend": "up",
            "drill_down": [
                {"relief": "Pension Contributions", "amount": 6000, "tax_relief": 1200},
                {"relief": "Gift Aid", "amount": 2000, "tax_relief": 500},
                {"relief": "Marriage Allowance", "amount": 1260, "tax_relief": 252}
            ]
        },
        "payments_due": {
            "value": 2850,
            "change": "New",
            "trend": "neutral",
            "drill_down": [
                {"payment": "Balancing Payment", "due_date": "2025-01-31", "amount": 1850},
                {"payment": "Payment on Account 1", "due_date": "2025-01-31", "amount": 1000},
                {"payment": "Payment on Account 2", "due_date": "2025-07-31", "amount": 1000}
            ]
        }
    }

@router.get("/dashboard/exceptions")
async def get_dashboard_exceptions():
    """Get exceptions for Personal Tax dashboard"""
    return [
        {
            "id": "1",
            "type": "error",
            "title": "P60 Missing",
            "description": "P60 for main employment not uploaded",
            "section": "Employment",
            "priority": "high"
        },
        {
            "id": "2",
            "type": "warning",
            "title": "Capital Gains Threshold",
            "description": "Capital gains exceed annual exemption",
            "section": "Capital Gains",
            "priority": "medium"
        },
        {
            "id": "3",
            "type": "info",
            "title": "Marriage Allowance Available",
            "description": "Eligible for marriage allowance transfer",
            "section": "Reliefs & Deductions",
            "priority": "low"
        }
    ]

@router.get("/dashboard/timeline")
async def get_compliance_timeline():
    """Get compliance timeline events"""
    return [
        {
            "event": "SA Return Filing Deadline",
            "date": "2025-01-31",
            "status": "upcoming"
        },
        {
            "event": "Payment on Account 1",
            "date": "2025-01-31", 
            "status": "upcoming"
        },
        {
            "event": "Tax Year End",
            "date": "2024-04-05",
            "status": "passed"
        },
        {
            "event": "P60 Issue Deadline",
            "date": "2024-05-31",
            "status": "passed"
        }
    ]

@router.get("/taxpayer/profile")
async def get_taxpayer_profile():
    """Get taxpayer profile information"""
    return {
        "utr": "1234567890",
        "nino": "AB123456C",
        "first_name": "John",
        "last_name": "Smith",
        "date_of_birth": "1985-06-15",
        "address": "123 Main Street, London, SW1A 1AA",
        "email": "john.smith@email.com",
        "phone": "07700 900123",
        "bank_account": "12345678",
        "sort_code": "12-34-56",
        "marital_status": "married",
        "spouse_name": "Jane Smith",
        "student_loan_plan": "Plan 2",
        "blind_person_allowance": False,
        "agent_auth_status": "active",
        "agent_auth_expiry": "2025-12-31"
    }

@router.post("/taxpayer/profile")
async def update_taxpayer_profile(profile: TaxpayerProfile):
    """Update taxpayer profile information"""
    return {"message": "Taxpayer profile updated successfully", "profile": profile}

@router.get("/employment")
async def get_employment_data(tax_year: str = "2024-25"):
    """Get employment data with dynamic rates for tax year"""
    rates = hmrc_historical_rates.get_rates_for_tax_year(tax_year)
    income_tax_rates = hmrc_historical_rates.get_income_tax_rates(tax_year)
    ni_rates = hmrc_historical_rates.get_ni_rates(tax_year)
    
    sample_employments = [
        {
            "id": 1,
            "employer": "ABC Limited",
            "paye_reference": "123/AB12345",
            "gross_pay": 45000,
            "tax_deducted": 6486,  # Calculated using dynamic rates
            "ni_contributions": 3708,  # Calculated using dynamic rates
            "p60_received": True,
            "p11d_benefits": 2500,
            "pension_contributions": 2250,
            "start_date": "2024-04-06",
            "payroll_id": "EMP001"
        },
        {
            "id": 2,
            "employer": "XYZ Corporation",
            "paye_reference": "456/XY67890",
            "gross_pay": 25000,
            "tax_deducted": 2486,
            "ni_contributions": 1488,
            "p60_received": False,
            "p11d_benefits": 800,
            "pension_contributions": 1250,
            "start_date": "2024-04-06",
            "end_date": "2024-12-31",
            "payroll_id": "EMP002"
        }
    ]
    
    total_gross = sum(emp["gross_pay"] for emp in sample_employments)
    total_tax = sum(emp["tax_deducted"] for emp in sample_employments)
    total_ni = sum(emp["ni_contributions"] for emp in sample_employments)
    total_benefits = sum(emp["p11d_benefits"] for emp in sample_employments)
    
    expected_tax_calc = hmrc_historical_rates.calculate_income_tax(total_gross, tax_year)
    expected_ni_calc = hmrc_historical_rates.calculate_ni_contributions(total_gross, tax_year)
    
    return {
        "employments": sample_employments,
        "totals": {
            "gross_pay": total_gross,
            "tax_deducted": total_tax,
            "ni_contributions": total_ni,
            "benefits_in_kind": total_benefits,
            "net_employment_income": total_gross - total_tax - total_ni
        },
        "validation": {
            "expected_tax": expected_tax_calc["total_tax"],
            "expected_ni": expected_ni_calc["employee_ni"],
            "tax_variance": total_tax - expected_tax_calc["total_tax"],
            "ni_variance": total_ni - expected_ni_calc["employee_ni"]
        },
        "rates_used": {
            "personal_allowance": rates["personal_allowance"],
            "basic_rate": rates["basic_rate"],
            "ni_rate": rates["ni_rate_employee"],
            "ni_threshold": rates["ni_threshold"]
        }
    }

@router.get("/self-employment")
async def get_self_employment_data(tax_year: str = "2024-25"):
    """Get self-employment data with dynamic rates for tax year"""
    rates = hmrc_historical_rates.get_rates_for_tax_year(tax_year)
    
    sample_businesses = [
        {
            "id": "1",
            "business_name": "Smith Consulting",
            "trade_description": "Management Consultancy",
            "start_date": "2020-04-06",
            "accounting_basis": "cash",
            "turnover": 85000,
            "expenses": 32000,
            "capital_allowances": 8000,
            "cis_deducted": 2500,
            "profit_loss": 45000,
            "class2_ni": 182.00,  # Calculated using dynamic rates
            "class4_ni": 3420.00  # Calculated using dynamic rates
        },
        {
            "id": "2",
            "business_name": "Tech Solutions Ltd",
            "trade_description": "Software Development",
            "start_date": "2022-04-06",
            "accounting_basis": "accruals",
            "turnover": 125000,
            "expenses": 45000,
            "capital_allowances": 15000,
            "cis_deducted": 0,
            "profit_loss": 65000,
            "class2_ni": 182.00,
            "class4_ni": 4940.00
        }
    ]
    
    total_turnover = sum(business["turnover"] for business in sample_businesses)
    total_expenses = sum(business["expenses"] for business in sample_businesses)
    total_profit = sum(business["profit_loss"] for business in sample_businesses)
    total_cis = sum(business["cis_deducted"] for business in sample_businesses)
    total_class2_ni = sum(business["class2_ni"] for business in sample_businesses)
    total_class4_ni = sum(business["class4_ni"] for business in sample_businesses)
    
    return {
        "businesses": sample_businesses,
        "totals": {
            "total_turnover": total_turnover,
            "total_expenses": total_expenses,
            "total_profit": total_profit,
            "total_cis": total_cis,
            "total_class2_ni": total_class2_ni,
            "total_class4_ni": total_class4_ni
        },
        "rates_used": {
            "class2_rate": rates.get("class2_ni_rate", 0.03),
            "class4_rate": rates.get("class4_ni_rate", 0.09),
            "class4_threshold": rates.get("class4_ni_threshold", 12570),
            "aia_limit": rates.get("aia_limit", 1000000)
        }
    }

@router.get("/capital-gains")
async def get_capital_gains_data(tax_year: str = "2024-25"):
    """Get capital gains data with dynamic rates for tax year"""
    rates = hmrc_historical_rates.get_rates_for_tax_year(tax_year)
    cgt_rates = hmrc_historical_rates.get_cgt_rates(tax_year)
    
    sample_disposals = [
        {
            "id": "1",
            "asset_type": "Shares",
            "asset_description": "ABC plc Ordinary Shares",
            "disposal_date": "2024-08-15",
            "acquisition_date": "2020-03-10",
            "proceeds": 25000,
            "cost": 15000,
            "enhancement_costs": 0,
            "incidental_costs": 250,
            "gain_loss": 9750,
            "relief_claimed": "None",
            "relief_amount": 0,
            "chargeable_gain": 9750
        },
        {
            "id": "2",
            "asset_type": "Property",
            "asset_description": "Buy-to-Let Property, London",
            "disposal_date": "2024-11-20",
            "acquisition_date": "2018-06-15",
            "proceeds": 450000,
            "cost": 320000,
            "enhancement_costs": 25000,
            "incidental_costs": 8500,
            "gain_loss": 96500,
            "relief_claimed": "PPR Relief",
            "relief_amount": 15000,
            "chargeable_gain": 81500
        },
        {
            "id": "3",
            "asset_type": "Business Assets",
            "asset_description": "Business Goodwill Sale",
            "disposal_date": "2024-09-30",
            "acquisition_date": "2019-04-06",
            "proceeds": 180000,
            "cost": 50000,
            "enhancement_costs": 10000,
            "incidental_costs": 5000,
            "gain_loss": 115000,
            "relief_claimed": "BADR",
            "relief_amount": 115000,
            "chargeable_gain": 0
        }
    ]
    
    sample_share_matching = [
        {
            "company": "ABC plc",
            "same_day_disposals": 1000,
            "thirty_day_disposals": 500,
            "section_104_pool": 2500,
            "total_shares": 4000,
            "average_cost": 6.25
        },
        {
            "company": "XYZ Ltd",
            "same_day_disposals": 0,
            "thirty_day_disposals": 0,
            "section_104_pool": 1500,
            "total_shares": 1500,
            "average_cost": 12.50
        }
    ]
    
    total_proceeds = sum(disposal["proceeds"] for disposal in sample_disposals)
    total_costs = sum(disposal["cost"] + disposal["enhancement_costs"] + disposal["incidental_costs"] for disposal in sample_disposals)
    total_gains = sum(disposal["gain_loss"] for disposal in sample_disposals if disposal["gain_loss"] > 0)
    total_losses = sum(disposal["gain_loss"] for disposal in sample_disposals if disposal["gain_loss"] < 0)
    net_chargeable_gains = sum(disposal["chargeable_gain"] for disposal in sample_disposals)
    
    taxable_gains = max(0, net_chargeable_gains - cgt_rates["annual_exemption"])
    cgt_liability = taxable_gains * cgt_rates["basic_rate"]  # Simplified calculation
    
    return {
        "disposals": sample_disposals,
        "share_matching": sample_share_matching,
        "reliefs": {
            "annual_exemption_used": min(net_chargeable_gains, cgt_rates["annual_exemption"]),
            "badr_claimed": 115000,
            "gift_relief_claimed": 0,
            "rollover_relief_claimed": 0,
            "eir_claimed": 0
        },
        "totals": {
            "total_proceeds": total_proceeds,
            "total_costs": total_costs,
            "total_gains": total_gains,
            "total_losses": total_losses,
            "net_chargeable_gains": net_chargeable_gains,
            "cgt_liability": cgt_liability
        },
        "rates_used": {
            "annual_exemption": cgt_rates["annual_exemption"],
            "basic_rate": cgt_rates["basic_rate"],
            "higher_rate": cgt_rates["higher_rate"],
            "badr_rate": cgt_rates["badr_rate"],
            "badr_lifetime_limit": cgt_rates["badr_lifetime_limit"]
        }
    }

@router.get("/calculations")
async def get_calculations_data(tax_year: str = "2024-25"):
    """Get tax calculations with dynamic rates"""
    rates = hmrc_historical_rates.get_rates_for_tax_year(tax_year)
    
    employment_income = 45000
    dividend_income = 5000
    savings_income = 2000
    
    income_tax_calc = hmrc_historical_rates.calculate_income_tax(employment_income, tax_year)
    dividend_rates = hmrc_historical_rates.get_dividend_rates(tax_year)
    
    dividend_taxable = max(0, dividend_income - dividend_rates["allowance"])
    dividend_tax = dividend_taxable * dividend_rates["basic_rate"]
    
    savings_allowance = rates["savings_allowance_basic"]
    savings_taxable = max(0, savings_income - savings_allowance)
    savings_tax = savings_taxable * rates["basic_rate"]
    
    total_tax = income_tax_calc["total_tax"] + dividend_tax + savings_tax
    
    return {
        "tax_year": tax_year,
        "income_breakdown": {
            "employment": employment_income,
            "dividends": dividend_income,
            "savings": savings_income,
            "total": employment_income + dividend_income + savings_income
        },
        "tax_calculation": {
            "income_tax": income_tax_calc["total_tax"],
            "dividend_tax": dividend_tax,
            "savings_tax": savings_tax,
            "total_tax": total_tax,
            "net_income": (employment_income + dividend_income + savings_income) - total_tax
        },
        "marginal_rates": {
            "next_1000": rates["basic_rate"] * 100,
            "effective_rate": (total_tax / (employment_income + dividend_income + savings_income)) * 100
        },
        "rates_used": rates,
        "scenarios": [
            {
                "name": "Current",
                "total_income": employment_income + dividend_income + savings_income,
                "total_tax": total_tax,
                "net_income": (employment_income + dividend_income + savings_income) - total_tax
            },
            {
                "name": "Additional £5k Salary",
                "total_income": employment_income + dividend_income + savings_income + 5000,
                "total_tax": total_tax + (5000 * rates["basic_rate"]),
                "net_income": (employment_income + dividend_income + savings_income + 5000) - (total_tax + (5000 * rates["basic_rate"]))
            },
            {
                "name": "Additional £5k Dividends",
                "total_income": employment_income + dividend_income + savings_income + 5000,
                "total_tax": total_tax + (5000 * dividend_rates["basic_rate"]),
                "net_income": (employment_income + dividend_income + savings_income + 5000) - (total_tax + (5000 * dividend_rates["basic_rate"]))
            }
        ]
    }

@router.get("/hmrc-rates")
async def get_hmrc_rates(db: Session = Depends(get_db), tax_year: Optional[str] = None):
    """Get current HMRC rates for Personal Tax"""
    personal_rates = await hmrc_rates_service.get_personal_tax_rates(db, tax_year)
    ni_rates = await hmrc_rates_service.get_national_insurance_rates(db, tax_year)
    
    return {
        "tax_year": tax_year or hmrc_rates_service.get_current_tax_year(),
        "personal_tax_rates": personal_rates,
        "national_insurance_rates": ni_rates
    }

@router.get("/savings-investments")
async def get_savings_investments_data(tax_year: str = "2024-25"):
    """Get savings and investments data for the specified tax year"""
    try:
        rates = hmrc_historical_rates.get_rates_for_tax_year(tax_year)
        
        return {
            "bankAccounts": [
                {
                    "id": "1",
                    "name": "Barclays Current Account",
                    "accountNumber": "****1234",
                    "grossInterest": 450,
                    "taxDeducted": 0,
                    "netInterest": 450
                },
                {
                    "id": "2",
                    "name": "Nationwide Savings Account",
                    "accountNumber": "****5678",
                    "grossInterest": 1200,
                    "taxDeducted": 0,
                    "netInterest": 1200
                }
            ],
            "dividends": [
                {
                    "id": "1",
                    "company": "ABC Company Ltd",
                    "shareType": "Ordinary Shares",
                    "dividendReceived": 2500,
                    "taxCredit": 0,
                    "grossDividend": 2500
                },
                {
                    "id": "2",
                    "company": "XYZ Holdings PLC",
                    "shareType": "Preference Shares",
                    "dividendReceived": 800,
                    "taxCredit": 0,
                    "grossDividend": 800
                }
            ],
            "isas": {
                "cashISA": {
                    "provider": "Nationwide",
                    "balance": 15000,
                    "interestEarned": 750
                },
                "stocksSharesISA": {
                    "provider": "Vanguard",
                    "value": 5000,
                    "dividends": 200
                }
            },
            "allowances": {
                "personalSavingsAllowance": {
                    "basicRate": rates.get("savings_allowance_basic", 1000),
                    "higherRate": rates.get("savings_allowance_higher", 500),
                    "additionalRate": 0
                },
                "dividendAllowance": rates.get("dividend_allowance", 500),
                "isaAllowance": {
                    "annual": 20000,
                    "junior": 9000,
                    "lifetime": 4000
                }
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching savings investments data: {str(e)}")

@router.get("/partnerships")
async def get_partnerships_data(tax_year: str = "2024-25"):
    """Get partnerships data for the specified tax year"""
    try:
        rates = hmrc_historical_rates.get_rates_for_tax_year(tax_year)
        trading_allowances = hmrc_historical_rates.get_trading_allowances(tax_year)
        
        return {
            "partnerships": [
                {
                    "id": "1",
                    "name": "Smith & Associates Partnership",
                    "utr": "1234567890",
                    "accountingPeriodEnd": "2024-04-05",
                    "profitShare": 45000,
                    "lossShare": 0,
                    "capitalAccount": 25000,
                    "currentAccount": 8500,
                    "drawings": 35000,
                    "class4NIContributions": 3420
                },
                {
                    "id": "2",
                    "name": "Tech Innovations LLP",
                    "utr": "0987654321",
                    "accountingPeriodEnd": "2024-03-31",
                    "profitShare": 62000,
                    "lossShare": 0,
                    "capitalAccount": 50000,
                    "currentAccount": 12000,
                    "drawings": 48000,
                    "class4NIContributions": 4940
                }
            ],
            "statements": [
                {
                    "id": "1",
                    "partnershipName": "Smith & Associates Partnership",
                    "statementType": "SA800",
                    "taxYear": tax_year,
                    "profitLoss": 45000,
                    "received": True
                },
                {
                    "id": "2",
                    "partnershipName": "Tech Innovations LLP",
                    "statementType": "SA800",
                    "taxYear": tax_year,
                    "profitLoss": 62000,
                    "received": True
                }
            ],
            "allocations": {
                "totalProfit": 107000,
                "totalLoss": 0,
                "totalClass4NI": 8360,
                "partnershipAllowance": trading_allowances.get("trading_allowance", 1000)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching partnerships data: {str(e)}")

@router.get("/trusts-estates")
async def get_trusts_estates_data(tax_year: str = "2024-25"):
    """Get trusts and estates data for the specified tax year"""
    try:
        rates = hmrc_historical_rates.get_rates_for_tax_year(tax_year)
        
        trusts = [
            {
                "id": "1",
                "name": "Smith Family Trust",
                "type": "Discretionary Trust",
                "utr": "1234567890",
                "distributions": 15000,
                "taxCredit": 3750,
                "netDistribution": 11250,
                "r185Received": True
            },
            {
                "id": "2",
                "name": "Johnson Settlement",
                "type": "Interest in Possession Trust",
                "utr": "0987654321",
                "distributions": 8500,
                "taxCredit": 2125,
                "netDistribution": 6375,
                "r185Received": True
            }
        ]
        
        estates = [
            {
                "id": "1",
                "deceasedName": "Robert Wilson",
                "dateOfDeath": "2023-08-15",
                "distributions": 12000,
                "taxCredit": 3000,
                "r105Received": True
            }
        ]
        
        settlements = [
            {
                "id": "1",
                "settlementName": "Offshore Investment Settlement",
                "type": "Parental Settlement",
                "income": 5000,
                "gains": 2500,
                "taxLiability": 1500
            }
        ]
        
        total_distributions = sum(t["distributions"] for t in trusts) + sum(e["distributions"] for e in estates)
        total_tax_credits = sum(t["taxCredit"] for t in trusts) + sum(e["taxCredit"] for e in estates)
        
        return {
            "trusts": trusts,
            "estates": estates,
            "settlements": settlements,
            "totals": {
                "totalDistributions": total_distributions,
                "totalTaxCredits": total_tax_credits,
                "totalNetIncome": total_distributions - total_tax_credits
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching trusts estates data: {str(e)}")

@router.post("/filing/submit")
async def submit_sa_return():
    """Submit SA return to HMRC"""
    return {
        "message": "SA return submitted successfully",
        "submission_id": "SA123456789",
        "timestamp": datetime.now().isoformat(),
        "acknowledgement": "ACK987654321"
    }
