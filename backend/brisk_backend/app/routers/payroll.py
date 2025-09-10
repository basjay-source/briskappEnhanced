from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date
from decimal import Decimal

from app.database import get_db
from app.models import PayrollEmployee, PayRun, Payslip

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
