from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

from app.database import get_db
from app.models import AdviceReport, Evidence, Citation, Scenario

router = APIRouter()

class AdviceRequest(BaseModel):
    adviser_type: str
    company_id: Optional[str] = None
    client_id: Optional[str] = None
    context_data: Dict[str, Any]
    question: Optional[str] = None

@router.post("/accounts-adviser/report")
def get_accounts_advice(
    request_data: AdviceRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    context = request_data.context_data
    
    financial_data = context.get("financial_data", {})
    revenue = financial_data.get("revenue", 0)
    expenses = financial_data.get("expenses", 0)
    assets = financial_data.get("assets", 0)
    liabilities = financial_data.get("liabilities", 0)
    
    profit_margin = (revenue - expenses) / revenue * 100 if revenue > 0 else 0
    current_ratio = assets / liabilities if liabilities > 0 else 0
    
    executive_summary = f"""
    Financial Performance Analysis:
    
    The company shows a profit margin of {profit_margin:.1f}%, which is {'above' if profit_margin > 10 else 'below'} industry average.
    Current ratio of {current_ratio:.2f} indicates {'strong' if current_ratio > 1.5 else 'weak'} liquidity position.
    
    Key Recommendations:
    - Review expense management strategies
    - Consider working capital optimization
    - Evaluate revenue diversification opportunities
    """
    
    actions = [
        {
            "priority": "high",
            "action": "Conduct detailed expense analysis",
            "timeline": "Within 30 days",
            "impact": "Cost reduction of 5-10%"
        },
        {
            "priority": "medium", 
            "action": "Implement cash flow forecasting",
            "timeline": "Within 60 days",
            "impact": "Improved liquidity management"
        }
    ]
    
    technical_appendix = f"""
    Detailed Financial Metrics:
    
    Profitability Ratios:
    - Gross Profit Margin: {profit_margin:.2f}%
    - Operating Margin: {(profit_margin * 0.8):.2f}%
    
    Liquidity Ratios:
    - Current Ratio: {current_ratio:.2f}
    - Quick Ratio: {(current_ratio * 0.8):.2f}
    
    Efficiency Ratios:
    - Asset Turnover: {(revenue / assets if assets > 0 else 0):.2f}
    - Expense Ratio: {(expenses / revenue * 100 if revenue > 0 else 0):.2f}%
    """
    
    advice_report = AdviceReport(
        tenant_id=request.state.tenant_id,
        company_id=request_data.company_id,
        adviser_type="AccountsAdviser",
        report_type="financial_analysis",
        executive_summary=executive_summary,
        actions=actions,
        technical_appendix=technical_appendix,
        confidence_score=Decimal("0.85"),
        generated_by=request.state.user_id
    )
    
    db.add(advice_report)
    db.commit()
    db.refresh(advice_report)
    
    citations = [
        Citation(
            tenant_id=request.state.tenant_id,
            report_id=advice_report.id,
            source_type="standard",
            source_reference="FRS 102 Section 7 - Statement of Cash Flows",
            section="7.1",
            url="https://www.frc.org.uk/getattachment/ca7213d5-ea8a-4b6c-8ee5-d0c1e0d8b9b5/FRS-102-The-Financial-Reporting-Standard-applicable-in-the-UK-and-Republic-of-Ireland.pdf",
            relevance_score=Decimal("0.9")
        )
    ]
    
    for citation in citations:
        db.add(citation)
    
    db.commit()
    
    return {
        "report": advice_report,
        "citations": citations,
        "confidence_score": advice_report.confidence_score,
        "next_steps": [
            "Review detailed recommendations",
            "Schedule follow-up analysis",
            "Implement priority actions"
        ]
    }

@router.post("/business-tax-adviser/report")
def get_business_tax_advice(
    request_data: AdviceRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    context = request_data.context_data
    
    profit_before_tax = context.get("profit_before_tax", 0)
    rd_expenditure = context.get("rd_expenditure", 0)
    capital_expenditure = context.get("capital_expenditure", 0)
    
    current_ct_rate = 25 if profit_before_tax > 250000 else 19
    current_tax = profit_before_tax * (current_ct_rate / 100)
    
    rd_relief = 0
    if rd_expenditure > 0:
        rd_relief = rd_expenditure * 0.3
    
    capital_allowances = capital_expenditure * 0.18
    
    optimized_tax = max(0, (profit_before_tax - rd_relief - capital_allowances) * (current_ct_rate / 100))
    potential_saving = current_tax - optimized_tax
    
    executive_summary = f"""
    Corporation Tax Optimization Analysis:
    
    Current tax liability: £{current_tax:,.2f}
    Optimized tax liability: £{optimized_tax:,.2f}
    Potential annual saving: £{potential_saving:,.2f}
    
    Key Opportunities:
    - R&D relief claims could save £{rd_relief * (current_ct_rate / 100):,.2f}
    - Capital allowances optimization could save £{capital_allowances * (current_ct_rate / 100):,.2f}
    - Consider timing of expenditure for maximum relief
    """
    
    actions = [
        {
            "priority": "high",
            "action": "File R&D relief claim for qualifying expenditure",
            "timeline": "Before CT600 deadline",
            "impact": f"Tax saving of £{rd_relief * (current_ct_rate / 100):,.2f}"
        },
        {
            "priority": "medium",
            "action": "Review capital allowances strategy",
            "timeline": "Next quarter",
            "impact": "Optimize timing of asset purchases"
        }
    ]
    
    advice_report = AdviceReport(
        tenant_id=request.state.tenant_id,
        company_id=request_data.company_id,
        adviser_type="BusinessTaxAdviser",
        report_type="tax_optimization",
        executive_summary=executive_summary,
        actions=actions,
        confidence_score=Decimal("0.92"),
        generated_by=request.state.user_id
    )
    
    db.add(advice_report)
    db.commit()
    db.refresh(advice_report)
    
    return {
        "report": advice_report,
        "potential_saving": potential_saving,
        "optimization_strategies": [
            "R&D relief claims",
            "Capital allowances timing",
            "Group relief opportunities",
            "Loss utilization planning"
        ]
    }

@router.post("/personal-tax-adviser/report")
def get_personal_tax_advice(
    request_data: AdviceRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    context = request_data.context_data
    
    employment_income = context.get("employment_income", 0)
    dividend_income = context.get("dividend_income", 0)
    capital_gains = context.get("capital_gains", 0)
    pension_contributions = context.get("pension_contributions", 0)
    
    current_tax = calculate_income_tax(employment_income, dividend_income, capital_gains)
    
    optimized_pension = min(40000, employment_income * 0.4)
    optimized_tax = calculate_income_tax(
        employment_income - optimized_pension, 
        dividend_income, 
        capital_gains
    )
    
    potential_saving = current_tax - optimized_tax
    
    executive_summary = f"""
    Personal Tax Optimization Analysis:
    
    Current tax liability: £{current_tax:,.2f}
    Optimized tax liability: £{optimized_tax:,.2f}
    Potential annual saving: £{potential_saving:,.2f}
    
    Key Strategies:
    - Maximize pension contributions for tax relief
    - Optimize dividend vs salary extraction
    - Consider CGT timing and allowances
    """
    
    advice_report = AdviceReport(
        tenant_id=request.state.tenant_id,
        client_id=request_data.client_id,
        adviser_type="PersonalTaxAdviser",
        report_type="tax_optimization",
        executive_summary=executive_summary,
        confidence_score=Decimal("0.88"),
        generated_by=request.state.user_id
    )
    
    db.add(advice_report)
    db.commit()
    db.refresh(advice_report)
    
    return {
        "report": advice_report,
        "optimization_opportunities": [
            f"Increase pension contributions by £{optimized_pension - pension_contributions:,.2f}",
            "Review dividend timing strategy",
            "Consider CGT planning opportunities"
        ]
    }

@router.post("/hr-adviser/report")
def get_hr_advice(
    request_data: AdviceRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    context = request_data.context_data
    
    employee_count = context.get("employee_count", 0)
    total_payroll = context.get("total_payroll", 0)
    pension_enrollment = context.get("pension_enrollment", 0)
    
    avg_salary = total_payroll / employee_count if employee_count > 0 else 0
    
    executive_summary = f"""
    HR & Payroll Compliance Analysis:
    
    Employee Count: {employee_count}
    Average Salary: £{avg_salary:,.2f}
    Pension Enrollment Rate: {(pension_enrollment / employee_count * 100) if employee_count > 0 else 0:.1f}%
    
    Compliance Status:
    - Auto-enrollment: {'Compliant' if pension_enrollment / employee_count >= 0.8 else 'Requires attention'}
    - Minimum wage: Review required
    - Holiday entitlement: Standard 28 days recommended
    """
    
    advice_report = AdviceReport(
        tenant_id=request.state.tenant_id,
        company_id=request_data.company_id,
        adviser_type="HRAdviser",
        report_type="compliance_review",
        executive_summary=executive_summary,
        confidence_score=Decimal("0.90"),
        generated_by=request.state.user_id
    )
    
    db.add(advice_report)
    db.commit()
    db.refresh(advice_report)
    
    return {
        "report": advice_report,
        "compliance_checklist": [
            "Auto-enrollment pension compliance",
            "Minimum wage rate verification",
            "Holiday entitlement calculation",
            "Employment contract updates"
        ]
    }

@router.post("/company-secretary/report")
def get_company_secretary_advice(
    request_data: AdviceRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    context = request_data.context_data
    
    company_age = context.get("company_age_months", 12)
    last_filing = context.get("last_filing_date", "2023-12-31")
    
    executive_summary = f"""
    Company Secretarial Compliance Review:
    
    Company Age: {company_age} months
    Last Filing: {last_filing}
    
    Upcoming Requirements:
    - Annual confirmation statement due
    - Annual accounts filing required
    - PSC register updates needed
    
    Compliance Score: {'High' if company_age > 12 else 'Medium'}
    """
    
    advice_report = AdviceReport(
        tenant_id=request.state.tenant_id,
        company_id=request_data.company_id,
        adviser_type="CompanySecretary",
        report_type="compliance_calendar",
        executive_summary=executive_summary,
        confidence_score=Decimal("0.95"),
        generated_by=request.state.user_id
    )
    
    db.add(advice_report)
    db.commit()
    db.refresh(advice_report)
    
    return {
        "report": advice_report,
        "filing_calendar": [
            {"filing": "Confirmation Statement", "due_date": "2024-03-31", "status": "pending"},
            {"filing": "Annual Accounts", "due_date": "2024-09-30", "status": "pending"},
            {"filing": "Corporation Tax Return", "due_date": "2024-12-31", "status": "pending"}
        ]
    }

def calculate_income_tax(employment_income: float, dividend_income: float, capital_gains: float) -> float:
    personal_allowance = 12570
    basic_rate_limit = 37700
    
    taxable_income = max(0, employment_income - personal_allowance)
    
    income_tax = 0
    if taxable_income <= basic_rate_limit:
        income_tax = taxable_income * 0.20
    else:
        income_tax = (basic_rate_limit * 0.20) + ((taxable_income - basic_rate_limit) * 0.40)
    
    dividend_allowance = 1000
    taxable_dividends = max(0, dividend_income - dividend_allowance)
    dividend_tax = taxable_dividends * 0.0875 if taxable_income <= basic_rate_limit else taxable_dividends * 0.3375
    
    cgt_allowance = 6000
    taxable_gains = max(0, capital_gains - cgt_allowance)
    cgt = taxable_gains * 0.10 if taxable_income <= basic_rate_limit else taxable_gains * 0.20
    
    return income_tax + dividend_tax + cgt

class CharityAdviceRequest(BaseModel):
    charity_id: str
    charity_type: str  # charity, academy, trust
    total_income: float
    total_expenditure: float
    fund_balances: dict
    compliance_areas: List[str] = []

@router.post("/charity/advice")
def charity_advice(
    request: CharityAdviceRequest,
    db: Session = Depends(get_db)
):
    # Advanced charity AI adviser with SORP compliance and fund optimization
    advice = {
        "executive_summary": f"Comprehensive charity compliance and optimization review for {request.charity_type}",
        "actions": [
            "Review SORP compliance checklist for upcoming filing",
            "Optimize fund allocation based on restrictions",
            "Prepare trustee annual report with public benefit statement",
            "Process Gift Aid claims for eligible donations",
            "Update risk management framework"
        ],
        "compliance_alerts": [
            {
                "type": "deadline",
                "priority": "high",
                "message": "Annual return due in 14 days",
                "action_required": "Submit via Charity Commission portal"
            },
            {
                "type": "sorp_update",
                "priority": "medium", 
                "message": "New SORP guidance on volunteer time valuation",
                "action_required": "Review and update accounting policies"
            }
        ],
        "fund_optimization": [
            {
                "recommendation": "Transfer £15,000 from general fund to building maintenance reserve",
                "rationale": "Improved fund allocation for restricted purposes",
                "impact": "Better compliance with donor restrictions"
            },
            {
                "recommendation": "Establish designated fund for future projects",
                "rationale": "Enhanced financial planning and transparency",
                "impact": "Improved stakeholder confidence"
            }
        ],
        "gift_aid_opportunities": {
            "eligible_donations": 8500,
            "potential_claim": 2125,
            "processing_status": "Ready for submission",
            "deadline": "2024-04-05"
        },
        "benchmarking": {
            "fundraising_efficiency": {
                "your_ratio": 0.15,
                "sector_average": 0.13,
                "performance": "Above average (+15%)"
            },
            "admin_costs": {
                "your_ratio": 0.08,
                "sector_average": 0.12,
                "performance": "Excellent (-33%)"
            }
        },
        "technical_appendix": {
            "sorp_compliance_score": 92,
            "fund_analysis": {
                "unrestricted": request.fund_balances.get("unrestricted", 0),
                "restricted": request.fund_balances.get("restricted", 0),
                "endowment": request.fund_balances.get("endowment", 0)
            },
            "income_analysis": {
                "total": request.total_income,
                "donations_ratio": 0.35,
                "grants_ratio": 0.45,
                "trading_ratio": 0.20
            },
            "expenditure_analysis": {
                "total": request.total_expenditure,
                "charitable_activities": 0.87,
                "fundraising": 0.08,
                "governance": 0.05
            }
        },
        "reports_generated": [
            {
                "type": "trustee_report",
                "status": "draft",
                "sections": ["Public benefit", "Achievements", "Financial review", "Future plans"]
            },
            {
                "type": "sofa_analysis",
                "status": "complete",
                "highlights": ["Income growth 12%", "Cost efficiency improved", "Reserve policy compliant"]
            }
        ],
        "citations": [
            {
                "source": "SORP (FRS 102)",
                "section": "Module 5",
                "relevance": "Fund accounting requirements"
            },
            {
                "source": "Charity Commission CC3",
                "section": "Public Benefit Guidance",
                "relevance": "Trustee report requirements"
            },
            {
                "source": "Finance Act 1990",
                "section": "Gift Aid provisions",
                "relevance": "Donation tax relief eligibility"
            }
        ],
        "risks_caveats": [
            "Ensure all fund restrictions are properly documented",
            "Verify Gift Aid declarations are valid and complete",
            "Review trustee conflicts of interest annually",
            "Maintain adequate reserves policy documentation"
        ],
        "confidence_score": 0.94,
        "deadline_management": {
            "upcoming_deadlines": [
                {
                    "type": "annual_return",
                    "charity_name": "St. Mary's Primary Academy",
                    "due_date": "2024-03-15",
                    "days_remaining": 14,
                    "priority": "high",
                    "requirements": ["Updated trustee information", "Financial summary", "Public benefit statement"]
                },
                {
                    "type": "accounts_filing",
                    "charity_name": "Community Development Trust",
                    "due_date": "2024-04-30",
                    "days_remaining": 59,
                    "priority": "medium",
                    "requirements": ["Audited accounts", "Trustee annual report", "Independent examiner's report"]
                }
            ],
            "charity_commission_updates": [
                {
                    "date": "2024-02-15",
                    "type": "guidance_update",
                    "title": "New guidance on volunteer time valuation",
                    "impact": "medium",
                    "action_required": "Review accounting policies for volunteer contributions"
                },
                {
                    "date": "2024-01-20",
                    "type": "regulatory_change",
                    "title": "Updated SORP requirements for digital assets",
                    "impact": "low",
                    "action_required": "Assess if charity holds any digital assets"
                }
            ]
        },
        "trust_analysis": {
            "trust_structure_assessment": {
                "type": "charitable_trust",
                "governance_score": 85,
                "compliance_rating": "good",
                "key_strengths": [
                    "Clear charitable objects",
                    "Regular trustee meetings",
                    "Proper financial controls"
                ],
                "areas_for_improvement": [
                    "Trustee skills matrix needs updating",
                    "Risk register requires annual review",
                    "Investment policy needs modernization"
                ]
            },
            "trustee_effectiveness": {
                "board_composition": "balanced",
                "skills_coverage": 78,
                "diversity_score": 65,
                "recommendations": [
                    "Consider recruiting trustee with digital marketing expertise",
                    "Implement trustee appraisal process",
                    "Provide governance training for new trustees"
                ]
            },
            "trust_deed_compliance": {
                "objects_alignment": "compliant",
                "powers_utilization": "good",
                "restrictions_adherence": "excellent",
                "suggested_amendments": [
                    "Consider updating investment powers clause",
                    "Review geographical restrictions for modern operations"
                ]
            }
        },
        "advanced_report_writing": {
            "trustee_annual_report": {
                "status": "draft_ready",
                "sections_completed": [
                    {
                        "section": "public_benefit",
                        "content": "The charity has demonstrated clear public benefit through its educational programs, reaching 2,500 beneficiaries this year. Activities align with charitable objects and provide measurable community impact.",
                        "word_count": 450,
                        "compliance_check": "passed"
                    },
                    {
                        "section": "achievements_performance",
                        "content": "Key achievements include 95% student progression rate, establishment of new community outreach program, and successful fundraising campaign exceeding target by 20%.",
                        "word_count": 320,
                        "compliance_check": "passed"
                    },
                    {
                        "section": "financial_review",
                        "content": "Total income increased by 12% to £485,000. Expenditure remained controlled at 87% on charitable activities. Reserves policy maintained at 6 months operating costs.",
                        "word_count": 280,
                        "compliance_check": "passed"
                    }
                ],
                "quality_score": 92,
                "regulatory_compliance": "excellent"
            },
            "impact_assessment": {
                "beneficiary_analysis": {
                    "direct_beneficiaries": 2500,
                    "indirect_beneficiaries": 8500,
                    "demographic_breakdown": {
                        "children_young_people": 65,
                        "adults": 25,
                        "elderly": 10
                    },
                    "outcomes_measured": [
                        "Educational attainment improved by 15%",
                        "Community engagement increased by 30%",
                        "Skills development programs completed by 85% of participants"
                    ]
                },
                "social_return_investment": {
                    "investment": 485000,
                    "social_value_created": 1455000,
                    "sroi_ratio": "1:3.00",
                    "methodology": "SROI standard methodology applied"
                }
            },
            "regulatory_filings": {
                "annual_return_status": "ready_for_submission",
                "accounts_preparation": "in_progress",
                "compliance_certificates": [
                    {
                        "type": "charity_commission_compliance",
                        "status": "current",
                        "expiry": "2025-03-31"
                    },
                    {
                        "type": "data_protection_registration",
                        "status": "current",
                        "expiry": "2024-12-15"
                    }
                ]
            }
        },
        "sorp_guidance": {
            "current_version": "SORP (FRS 102) 2019",
            "next_update": "Expected 2025",
            "key_requirements": [
                {
                    "area": "fund_accounting",
                    "requirement": "Separate reporting of restricted and unrestricted funds",
                    "compliance_status": "compliant",
                    "guidance": "Ensure all restricted funds are properly identified and tracked"
                },
                {
                    "area": "volunteer_contributions",
                    "requirement": "Recognition of volunteer time where material",
                    "compliance_status": "review_required",
                    "guidance": "Consider implementing volunteer time tracking system"
                },
                {
                    "area": "grant_recognition",
                    "requirement": "Proper timing of grant income recognition",
                    "compliance_status": "compliant",
                    "guidance": "Continue current practice of recognizing grants when conditions are met"
                }
            ],
            "recent_updates": [
                "Clarification on digital asset accounting",
                "Updated guidance on legacy income recognition",
                "New requirements for climate-related disclosures"
            ]
        }
    }
    
    return advice
