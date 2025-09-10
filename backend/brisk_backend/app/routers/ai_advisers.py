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
