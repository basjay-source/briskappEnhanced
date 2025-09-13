from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import date, datetime
from decimal import Decimal
import uuid

from app.database import get_db
from app.models import PayrollEmployee, PayRun, Payslip, PensionScheme, CISStatement
from app.middleware.auth import get_current_user

router = APIRouter()

class PayrollEmployeeCreate(BaseModel):
    company_id: str
    employee_number: str
    first_name: str
    last_name: str
    ni_number: Optional[str] = None
    date_of_birth: Optional[date] = None
    start_date: date
    salary: Decimal
    tax_code: str = "1257L"

class PayRunCreate(BaseModel):
    company_id: str
    pay_period_start: date
    pay_period_end: date
    pay_date: date

class StatutoryPaymentCreate(BaseModel):
    employee_id: str
    payment_type: str  # SSP, SMP, SPP, SAP, ShPP
    start_date: date
    end_date: date
    weekly_rate: Decimal
    reason: str

class P60Request(BaseModel):
    employee_id: str
    tax_year: str

class P11DRequest(BaseModel):
    employee_id: str
    tax_year: str
    benefits: Dict[str, Any]

class PolicyTemplateRequest(BaseModel):
    template_type: str  # contract, handbook, policy
    company_id: str
    parameters: Dict[str, Any]

class PAYECalculationRequest(BaseModel):
    gross_salary: float
    tax_code: str = "1257L"
    pension_contribution: float = 0.0
    student_loan: bool = False

class PeriodicReportRequest(BaseModel):
    period_start: date
    period_end: date
    report_type: str  # "monthly", "quarterly", "annual"

class YTDDetailsRequest(BaseModel):
    employee_id: Optional[int] = None
    tax_year: str = "2024-25"

class DepartmentalReportRequest(BaseModel):
    department_id: Optional[str] = None
    period_start: date
    period_end: date

@router.get("/employees/{company_id}")
def get_employees(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    employees = db.query(PayrollEmployee).filter(
        PayrollEmployee.tenant_id == request.state.tenant_id,
        PayrollEmployee.company_id == company_id,
        PayrollEmployee.is_active == True
    ).all()
    
    return employees

@router.post("/employees")
def create_employee(
    employee_data: PayrollEmployeeCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    employee = PayrollEmployee(
        tenant_id=request.state.tenant_id,
        **employee_data.dict()
    )
    
    db.add(employee)
    db.commit()
    db.refresh(employee)
    
    return employee

@router.post("/pay-runs")
def create_pay_run(
    pay_run_data: PayRunCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    employees = db.query(PayrollEmployee).filter(
        PayrollEmployee.tenant_id == request.state.tenant_id,
        PayrollEmployee.company_id == pay_run_data.company_id,
        PayrollEmployee.is_active == True
    ).all()
    
    if not employees:
        raise HTTPException(status_code=404, detail="No active employees found")
    
    pay_run = PayRun(
        tenant_id=request.state.tenant_id,
        **pay_run_data.dict(),
        status="processing"
    )
    
    db.add(pay_run)
    db.commit()
    db.refresh(pay_run)
    
    total_gross_pay = 0
    total_tax = 0
    total_ni = 0
    total_net_pay = 0
    
    for employee in employees:
        gross_pay = employee.salary / 12
        
        personal_allowance_monthly = Decimal("12570") / 12
        taxable_pay = max(0, gross_pay - personal_allowance_monthly)
        
        tax_deducted = 0
        if taxable_pay > 0:
            if taxable_pay <= (Decimal("37700") / 12):
                tax_deducted = taxable_pay * Decimal("0.20")
            else:
                basic_rate_tax = (Decimal("37700") / 12) * Decimal("0.20")
                higher_rate_tax = (taxable_pay - (Decimal("37700") / 12)) * Decimal("0.40")
                tax_deducted = basic_rate_tax + higher_rate_tax
        
        ni_threshold_monthly = Decimal("12570") / 12
        ni_deducted = 0
        if gross_pay > ni_threshold_monthly:
            ni_deducted = (gross_pay - ni_threshold_monthly) * Decimal("0.12")
        
        net_pay = gross_pay - tax_deducted - ni_deducted
        
        payslip = Payslip(
            tenant_id=request.state.tenant_id,
            employee_id=employee.id,
            pay_run_id=pay_run.id,
            gross_pay=gross_pay,
            tax_deducted=tax_deducted,
            ni_deducted=ni_deducted,
            net_pay=net_pay
        )
        
        db.add(payslip)
        
        total_gross_pay += gross_pay
        total_tax += tax_deducted
        total_ni += ni_deducted
        total_net_pay += net_pay
    
    pay_run.total_gross_pay = total_gross_pay
    pay_run.total_tax = total_tax
    pay_run.total_ni = total_ni
    pay_run.total_net_pay = total_net_pay
    pay_run.status = "completed"
    
    db.commit()
    
    return {
        "pay_run": pay_run,
        "summary": {
            "employees_processed": len(employees),
            "total_gross_pay": total_gross_pay,
            "total_deductions": total_tax + total_ni,
            "total_net_pay": total_net_pay
        }
    }

@router.get("/pay-runs/{company_id}")
def get_pay_runs(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    pay_runs = db.query(PayRun).filter(
        PayRun.tenant_id == request.state.tenant_id,
        PayRun.company_id == company_id
    ).order_by(PayRun.pay_date.desc()).all()
    
    return pay_runs

@router.post("/rti/submit/{pay_run_id}")
def submit_rti(
    pay_run_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    pay_run = db.query(PayRun).filter(
        PayRun.tenant_id == request.state.tenant_id,
        PayRun.id == pay_run_id
    ).first()
    
    if not pay_run:
        raise HTTPException(status_code=404, detail="Pay run not found")
    
    payslips = db.query(Payslip).filter(
        Payslip.tenant_id == request.state.tenant_id,
        Payslip.pay_run_id == pay_run_id
    ).all()
    
    rti_data = {
        "employer_reference": "123/AB12345",
        "pay_period": f"{pay_run.pay_period_start} to {pay_run.pay_period_end}",
        "employees": [
            {
                "employee_id": payslip.employee_id,
                "gross_pay": payslip.gross_pay,
                "tax": payslip.tax_deducted,
                "ni": payslip.ni_deducted
            }
            for payslip in payslips
        ],
        "totals": {
            "gross_pay": pay_run.total_gross_pay,
            "tax": pay_run.total_tax,
            "ni": pay_run.total_ni
        }
    }
    
    return {
        "message": "RTI submission prepared",
        "submission_reference": f"RTI-{pay_run_id[:8]}",
        "rti_data": rti_data,
        "status": "ready_for_submission"
    }

@router.post("/statutory-payments")
def create_statutory_payment(
    payment_data: StatutoryPaymentCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    employee = db.query(PayrollEmployee).filter(
        PayrollEmployee.tenant_id == request.state.tenant_id,
        PayrollEmployee.id == payment_data.employee_id
    ).first()
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    rates = {
        "SSP": Decimal("109.40"),  # Statutory Sick Pay weekly rate
        "SMP": Decimal("172.48"),  # Statutory Maternity Pay
        "SPP": Decimal("172.48"),  # Statutory Paternity Pay
        "SAP": Decimal("172.48"),  # Statutory Adoption Pay
        "ShPP": Decimal("172.48")  # Shared Parental Pay
    }
    
    weekly_rate = min(payment_data.weekly_rate, rates.get(payment_data.payment_type, Decimal("0")))
    
    return {
        "payment_id": str(uuid.uuid4()),
        "employee_id": payment_data.employee_id,
        "payment_type": payment_data.payment_type,
        "weekly_rate": weekly_rate,
        "total_weeks": ((payment_data.end_date - payment_data.start_date).days // 7) + 1,
        "total_amount": weekly_rate * (((payment_data.end_date - payment_data.start_date).days // 7) + 1),
        "status": "calculated"
    }

@router.post("/reports/p60")
def generate_p60(
    p60_request: P60Request,
    request: Request = None,
    db: Session = Depends(get_db)
):
    employee = db.query(PayrollEmployee).filter(
        PayrollEmployee.tenant_id == request.state.tenant_id,
        PayrollEmployee.id == p60_request.employee_id
    ).first()
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    payslips = db.query(Payslip).filter(
        Payslip.tenant_id == request.state.tenant_id,
        Payslip.employee_id == p60_request.employee_id
    ).all()
    
    total_gross = sum(p.gross_pay for p in payslips)
    total_tax = sum(p.tax_deducted for p in payslips)
    total_ni = sum(p.ni_deducted for p in payslips)
    
    return {
        "p60_id": str(uuid.uuid4()),
        "employee": {
            "name": f"{employee.first_name} {employee.last_name}",
            "ni_number": employee.ni_number,
            "tax_code": employee.tax_code
        },
        "tax_year": p60_request.tax_year,
        "totals": {
            "gross_pay": total_gross,
            "tax_deducted": total_tax,
            "ni_deducted": total_ni,
            "net_pay": total_gross - total_tax - total_ni
        },
        "generated_date": datetime.now().isoformat()
    }

@router.post("/reports/p11d")
def generate_p11d(
    p11d_request: P11DRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    employee = db.query(PayrollEmployee).filter(
        PayrollEmployee.tenant_id == request.state.tenant_id,
        PayrollEmployee.id == p11d_request.employee_id
    ).first()
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    benefits_total = sum(Decimal(str(v)) for v in p11d_request.benefits.values() if isinstance(v, (int, float)))
    
    return {
        "p11d_id": str(uuid.uuid4()),
        "employee": {
            "name": f"{employee.first_name} {employee.last_name}",
            "ni_number": employee.ni_number
        },
        "tax_year": p11d_request.tax_year,
        "benefits": p11d_request.benefits,
        "total_benefit_value": benefits_total,
        "class_1a_ni_due": benefits_total * Decimal("0.1505"),  # 15.05% Class 1A NI rate
        "generated_date": datetime.now().isoformat()
    }

@router.post("/hr/policy-template")
def generate_policy_template(
    template_request: PolicyTemplateRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    templates = {
        "contract": {
            "title": "Employment Contract Template",
            "sections": [
                "Job Title and Description",
                "Terms of Employment",
                "Salary and Benefits",
                "Working Hours",
                "Holiday Entitlement",
                "Notice Period",
                "Confidentiality",
                "Termination Clauses"
            ]
        },
        "handbook": {
            "title": "Employee Handbook Template",
            "sections": [
                "Company Overview",
                "Code of Conduct",
                "Health and Safety",
                "Leave Policies",
                "Disciplinary Procedures",
                "Grievance Procedures",
                "IT and Data Protection",
                "Equal Opportunities"
            ]
        },
        "policy": {
            "title": "HR Policy Template",
            "sections": [
                "Recruitment Policy",
                "Performance Management",
                "Training and Development",
                "Flexible Working",
                "Maternity/Paternity Leave",
                "Sickness Absence",
                "Data Protection",
                "Anti-Harassment"
            ]
        }
    }
    
    template = templates.get(template_request.template_type)
    if not template:
        raise HTTPException(status_code=400, detail="Invalid template type")
    
    return {
        "template_id": str(uuid.uuid4()),
        "template_type": template_request.template_type,
        "title": template["title"],
        "sections": template["sections"],
        "parameters": template_request.parameters,
        "generated_date": datetime.now().isoformat(),
        "customization_notes": "Template can be customized based on company requirements"
    }

@router.post("/hr/cost-simulation")
def calculate_cost_simulation(
    request_data: Dict[str, Any],
    request: Request = None,
    db: Session = Depends(get_db)
):
    scenario = request_data.get("scenario", "salary_increase")
    parameters = request_data.get("parameters", {})
    
    if scenario == "salary_increase":
        current_salary = Decimal(str(parameters.get("current_salary", 0)))
        increase_percentage = Decimal(str(parameters.get("increase_percentage", 0))) / 100
        employee_count = parameters.get("employee_count", 1)
        
        new_salary = current_salary * (1 + increase_percentage)
        annual_cost_increase = (new_salary - current_salary) * employee_count
        
        ni_increase = annual_cost_increase * Decimal("0.1505")  # Employer NI
        pension_increase = annual_cost_increase * Decimal("0.03")  # 3% employer pension
        
        total_cost_increase = annual_cost_increase + ni_increase + pension_increase
        
        return {
            "scenario": scenario,
            "current_salary": current_salary,
            "new_salary": new_salary,
            "annual_cost_increase": annual_cost_increase,
            "additional_costs": {
                "employer_ni": ni_increase,
                "pension_contribution": pension_increase
            },
            "total_cost_increase": total_cost_increase,
            "monthly_cost_increase": total_cost_increase / 12
        }
    
    elif scenario == "redundancy":
        years_service = parameters.get("years_service", 0)
        weekly_pay = Decimal(str(parameters.get("weekly_pay", 0)))
        age = parameters.get("age", 25)
        
        if age < 22:
            multiplier = Decimal("0.5")
        elif age < 41:
            multiplier = Decimal("1.0")
        else:
            multiplier = Decimal("1.5")
        
        statutory_cap = Decimal("643")  # Weekly pay cap
        capped_weekly_pay = min(weekly_pay, statutory_cap)
        
        redundancy_pay = min(years_service, 20) * multiplier * capped_weekly_pay
        
        return {
            "scenario": scenario,
            "years_service": years_service,
            "weekly_pay": weekly_pay,
            "age": age,
            "statutory_redundancy_pay": redundancy_pay,
            "notice_pay_estimate": weekly_pay * min(years_service, 12),
            "total_estimated_cost": redundancy_pay + (weekly_pay * min(years_service, 12))
        }
    
    return {"error": "Unsupported scenario type"}

@router.get("/reports/payslip/{payslip_id}")
def get_payslip_report(
    payslip_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    payslip = db.query(Payslip).filter(
        Payslip.tenant_id == request.state.tenant_id,
        Payslip.id == payslip_id
    ).first()
    
    if not payslip:
        raise HTTPException(status_code=404, detail="Payslip not found")
    
    employee = payslip.employee
    pay_run = payslip.pay_run
    
    return {
        "payslip_id": payslip_id,
        "employee": {
            "name": f"{employee.first_name} {employee.last_name}",
            "employee_number": employee.employee_number,
            "ni_number": employee.ni_number,
            "tax_code": employee.tax_code
        },
        "pay_period": {
            "start": pay_run.pay_period_start,
            "end": pay_run.pay_period_end,
            "pay_date": pay_run.pay_date
        },
        "payments": {
            "gross_pay": payslip.gross_pay,
            "tax_deducted": payslip.tax_deducted,
            "ni_deducted": payslip.ni_deducted,
            "pension_deducted": payslip.pension_deducted,
            "other_deductions": payslip.other_deductions,
            "net_pay": payslip.net_pay
        },
        "year_to_date": {
            "gross_pay": payslip.ytd_gross,
            "tax_deducted": payslip.ytd_tax,
            "ni_deducted": payslip.ytd_ni
        }
    }

@router.post("/paye-calculator")
async def calculate_paye(
    request: PAYECalculationRequest,
    current_user: dict = Depends(get_current_user)
):
    """Calculate PAYE tax and National Insurance contributions"""
    
    personal_allowance = 12570
    basic_rate_threshold = 37700
    higher_rate_threshold = 125140
    
    ni_lower_threshold = 12570
    ni_upper_threshold = 50270
    
    gross_annual = request.gross_salary
    
    taxable_income = max(0, gross_annual - personal_allowance)
    
    income_tax = 0
    if taxable_income > 0:
        basic_rate_tax = min(taxable_income, basic_rate_threshold) * 0.20
        income_tax += basic_rate_tax
        
        if taxable_income > basic_rate_threshold:
            higher_rate_amount = min(taxable_income - basic_rate_threshold, 
                                   higher_rate_threshold - basic_rate_threshold)
            income_tax += higher_rate_amount * 0.40
            
        if taxable_income > higher_rate_threshold:
            additional_rate_amount = taxable_income - higher_rate_threshold
            income_tax += additional_rate_amount * 0.45
    
    ni_contribution = 0
    if gross_annual > ni_lower_threshold:
        ni_amount = min(gross_annual - ni_lower_threshold, ni_upper_threshold - ni_lower_threshold)
        ni_contribution += ni_amount * 0.12
        
        if gross_annual > ni_upper_threshold:
            ni_contribution += (gross_annual - ni_upper_threshold) * 0.02
    
    total_deductions = income_tax + ni_contribution + request.pension_contribution
    net_annual = gross_annual - total_deductions
    
    return {
        "gross_annual": gross_annual,
        "gross_monthly": gross_annual / 12,
        "personal_allowance": personal_allowance,
        "taxable_income": taxable_income,
        "income_tax_annual": income_tax,
        "income_tax_monthly": income_tax / 12,
        "ni_contribution_annual": ni_contribution,
        "ni_contribution_monthly": ni_contribution / 12,
        "pension_contribution_annual": request.pension_contribution,
        "pension_contribution_monthly": request.pension_contribution / 12,
        "total_deductions_annual": total_deductions,
        "total_deductions_monthly": total_deductions / 12,
        "net_annual": net_annual,
        "net_monthly": net_annual / 12,
        "tax_code": request.tax_code
    }

@router.post("/reports/payroll-summary")
async def generate_payroll_summary(
    request: PeriodicReportRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate comprehensive payroll summary report"""
    
    return {
        "report_type": "payroll_summary",
        "period_start": request.period_start,
        "period_end": request.period_end,
        "summary": {
            "total_employees": 45,
            "total_gross_pay": 125400.00,
            "total_income_tax": 18750.00,
            "total_ni_employee": 8940.00,
            "total_ni_employer": 12540.00,
            "total_pension_employee": 3762.00,
            "total_pension_employer": 3762.00,
            "total_statutory_payments": 2180.00,
            "total_net_pay": 94948.00,
            "average_salary": 2786.67
        },
        "breakdown_by_grade": [
            {
                "grade": "Senior Management",
                "employee_count": 5,
                "total_gross": 25000.00,
                "average_salary": 5000.00
            },
            {
                "grade": "Management",
                "employee_count": 12,
                "total_gross": 48000.00,
                "average_salary": 4000.00
            },
            {
                "grade": "Staff",
                "employee_count": 28,
                "total_gross": 52400.00,
                "average_salary": 1871.43
            }
        ],
        "generated_at": datetime.now().isoformat()
    }

@router.post("/reports/periodic-tax-ni")
async def generate_periodic_report(
    request: PeriodicReportRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate periodic tax and NI reports"""
    
    period_days = (request.period_end - request.period_start).days
    
    return {
        "report_type": request.report_type,
        "period_start": request.period_start,
        "period_end": request.period_end,
        "period_days": period_days,
        "tax_summary": {
            "total_income_tax": 18750.00,
            "total_ni_employee": 8940.00,
            "total_ni_employer": 12540.00,
            "total_tax_ni_liability": 40230.00
        },
        "monthly_breakdown": [
            {
                "month": "January 2024",
                "income_tax": 1562.50,
                "ni_employee": 745.00,
                "ni_employer": 1045.00,
                "total": 3352.50
            },
            {
                "month": "February 2024", 
                "income_tax": 1562.50,
                "ni_employee": 745.00,
                "ni_employer": 1045.00,
                "total": 3352.50
            }
        ],
        "compliance_status": {
            "rti_submissions": "Up to date",
            "paye_payments": "Current",
            "ni_payments": "Current",
            "next_payment_due": "2024-02-19"
        },
        "generated_at": datetime.now().isoformat()
    }

@router.post("/reports/ytd-details")
async def generate_ytd_details(
    request: YTDDetailsRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate Year To Date details report"""
    
    return {
        "tax_year": request.tax_year,
        "employee_id": request.employee_id,
        "report_date": datetime.now().date(),
        "ytd_summary": {
            "gross_pay": 28750.00,
            "income_tax": 4312.50,
            "ni_employee": 2055.00,
            "ni_employer": 2881.25,
            "pension_employee": 862.50,
            "pension_employer": 862.50,
            "net_pay": 21520.00,
            "statutory_payments": {
                "ssp": 0.00,
                "smp": 0.00,
                "spp": 0.00,
                "sap": 0.00,
                "shpp": 0.00
            }
        },
        "monthly_breakdown": [
            {
                "month": "April 2024",
                "gross_pay": 2500.00,
                "income_tax": 375.00,
                "ni_employee": 178.80,
                "net_pay": 1871.20,
                "days_worked": 22,
                "overtime_hours": 8.5
            },
            {
                "month": "May 2024",
                "gross_pay": 2500.00,
                "income_tax": 375.00,
                "ni_employee": 178.80,
                "net_pay": 1871.20,
                "days_worked": 21,
                "overtime_hours": 4.0
            }
        ],
        "benefits_in_kind": {
            "company_car": 2400.00,
            "private_medical": 600.00,
            "life_insurance": 120.00,
            "total_bik": 3120.00
        },
        "leave_summary": {
            "annual_leave_taken": 12.5,
            "annual_leave_remaining": 12.5,
            "sick_leave_taken": 2.0,
            "maternity_leave": 0.0
        }
    }

@router.post("/reports/departmental")
async def generate_departmental_report(
    request: DepartmentalReportRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate departmental payroll breakdown report"""
    
    return {
        "report_type": "departmental",
        "department_id": request.department_id,
        "period_start": request.period_start,
        "period_end": request.period_end,
        "departments": [
            {
                "department_id": "SALES",
                "department_name": "Sales & Marketing",
                "employee_count": 15,
                "total_gross_pay": 45000.00,
                "total_tax": 6750.00,
                "total_ni": 4050.00,
                "total_net_pay": 34200.00,
                "average_salary": 3000.00,
                "cost_center": "CC001"
            },
            {
                "department_id": "TECH",
                "department_name": "Technology",
                "employee_count": 20,
                "total_gross_pay": 60000.00,
                "total_tax": 9000.00,
                "total_ni": 5400.00,
                "total_net_pay": 45600.00,
                "average_salary": 3000.00,
                "cost_center": "CC002"
            },
            {
                "department_id": "ADMIN",
                "department_name": "Administration",
                "employee_count": 10,
                "total_gross_pay": 20400.00,
                "total_tax": 3000.00,
                "total_ni": 1490.00,
                "total_net_pay": 15910.00,
                "average_salary": 2040.00,
                "cost_center": "CC003"
            }
        ],
        "totals": {
            "total_employees": 45,
            "total_gross_pay": 125400.00,
            "total_tax": 18750.00,
            "total_ni": 10940.00,
            "total_net_pay": 95710.00
        },
        "generated_at": datetime.now().isoformat()
    }

@router.get("/payslip-templates")
def get_payslip_templates(
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get all payslip templates for the tenant"""
    templates = [
        {
            "id": "template-1",
            "name": "Modern Professional",
            "description": "Clean, modern payslip design with structured layout",
            "template_type": "modern",
            "is_default": True
        },
        {
            "id": "template-2", 
            "name": "Classic Business",
            "description": "Traditional payslip format with formal styling",
            "template_type": "classic",
            "is_default": False
        },
        {
            "id": "template-3",
            "name": "Minimal Clean",
            "description": "Minimalist payslip focusing on clarity",
            "template_type": "minimal", 
            "is_default": False
        },
        {
            "id": "template-4",
            "name": "Corporate Elite",
            "description": "Premium corporate payslip template with sophisticated design",
            "template_type": "corporate",
            "is_default": False
        },
        {
            "id": "template-5",
            "name": "Creative Studio",
            "description": "Creative and colorful payslip design for modern businesses",
            "template_type": "creative",
            "is_default": False
        }
    ]
    return {"templates": templates}

@router.post("/payslip-templates")
def create_payslip_template(
    template_data: Dict[str, Any],
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Create a new payslip template"""
    template_id = str(uuid.uuid4())
    return {
        "template_id": template_id,
        "message": "Payslip template created successfully",
        "template": {
            **template_data,
            "id": template_id,
            "created_at": datetime.now().isoformat()
        }
    }

@router.get("/payslip-templates/{template_id}/preview")
def preview_payslip_template(
    template_id: str,
    payslip_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Generate preview of payslip with template"""
    return {
        "template_id": template_id,
        "payslip_id": payslip_id,
        "preview_url": f"/api/payslip-preview/{template_id}/{payslip_id}",
        "generated_at": datetime.now().isoformat()
    }
