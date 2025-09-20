from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, date
from ..database import get_db
from ..models import (
    Employee, PayRun, Contract, PayElement, Timesheet, LeaveRequest,
    PensionScheme, Benefit, Deduction, CompanyCar, CISSubcontractor
)
from ..auth import get_current_user

router = APIRouter(prefix="/api/payroll", tags=["payroll"])

@router.get("/employees")
async def get_employees(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(Employee).filter(Employee.tenant_id == current_user.tenant_id)
    if search:
        query = query.filter(Employee.full_name.contains(search))
    employees = query.offset(skip).limit(limit).all()
    return employees

@router.post("/employees")
async def create_employee(
    employee_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    employee = Employee(
        tenant_id=current_user.tenant_id,
        **employee_data
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

@router.get("/employees/{employee_id}")
async def get_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    employee = db.query(Employee).filter(
        Employee.id == employee_id,
        Employee.tenant_id == current_user.tenant_id
    ).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@router.put("/employees/{employee_id}")
async def update_employee(
    employee_id: int,
    employee_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    employee = db.query(Employee).filter(
        Employee.id == employee_id,
        Employee.tenant_id == current_user.tenant_id
    ).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    for key, value in employee_data.items():
        setattr(employee, key, value)
    
    db.commit()
    db.refresh(employee)
    return employee

@router.get("/pay-runs")
async def get_pay_runs(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(PayRun).filter(PayRun.tenant_id == current_user.tenant_id)
    if status:
        query = query.filter(PayRun.status == status)
    pay_runs = query.offset(skip).limit(limit).all()
    return pay_runs

@router.post("/pay-runs")
async def create_pay_run(
    pay_run_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    pay_run = PayRun(
        tenant_id=current_user.tenant_id,
        **pay_run_data
    )
    db.add(pay_run)
    db.commit()
    db.refresh(pay_run)
    return pay_run

@router.put("/pay-runs/{pay_run_id}/approve")
async def approve_pay_run(
    pay_run_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    pay_run = db.query(PayRun).filter(
        PayRun.id == pay_run_id,
        PayRun.tenant_id == current_user.tenant_id
    ).first()
    if not pay_run:
        raise HTTPException(status_code=404, detail="Pay run not found")
    
    pay_run.status = "approved"
    pay_run.approved_by = current_user.id
    pay_run.approved_at = datetime.utcnow()
    
    db.commit()
    db.refresh(pay_run)
    return pay_run

@router.put("/pay-runs/{pay_run_id}/commit")
async def commit_pay_run(
    pay_run_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    pay_run = db.query(PayRun).filter(
        PayRun.id == pay_run_id,
        PayRun.tenant_id == current_user.tenant_id
    ).first()
    if not pay_run:
        raise HTTPException(status_code=404, detail="Pay run not found")
    
    pay_run.status = "committed"
    pay_run.committed_by = current_user.id
    pay_run.committed_at = datetime.utcnow()
    
    db.commit()
    db.refresh(pay_run)
    return pay_run

@router.get("/contracts")
async def get_contracts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    contracts = db.query(Contract).filter(
        Contract.tenant_id == current_user.tenant_id
    ).offset(skip).limit(limit).all()
    return contracts

@router.post("/contracts")
async def create_contract(
    contract_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    contract = Contract(
        tenant_id=current_user.tenant_id,
        **contract_data
    )
    db.add(contract)
    db.commit()
    db.refresh(contract)
    return contract

@router.get("/timesheets")
async def get_timesheets(
    skip: int = 0,
    limit: int = 100,
    employee_id: Optional[int] = None,
    period_start: Optional[date] = None,
    period_end: Optional[date] = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(Timesheet).filter(Timesheet.tenant_id == current_user.tenant_id)
    if employee_id:
        query = query.filter(Timesheet.employee_id == employee_id)
    if period_start:
        query = query.filter(Timesheet.period_start >= period_start)
    if period_end:
        query = query.filter(Timesheet.period_end <= period_end)
    
    timesheets = query.offset(skip).limit(limit).all()
    return timesheets

@router.post("/timesheets")
async def create_timesheet(
    timesheet_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    timesheet = Timesheet(
        tenant_id=current_user.tenant_id,
        **timesheet_data
    )
    db.add(timesheet)
    db.commit()
    db.refresh(timesheet)
    return timesheet

@router.put("/timesheets/{timesheet_id}/approve")
async def approve_timesheet(
    timesheet_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    timesheet = db.query(Timesheet).filter(
        Timesheet.id == timesheet_id,
        Timesheet.tenant_id == current_user.tenant_id
    ).first()
    if not timesheet:
        raise HTTPException(status_code=404, detail="Timesheet not found")
    
    timesheet.status = "approved"
    timesheet.approved_by = current_user.id
    timesheet.approved_at = datetime.utcnow()
    
    db.commit()
    db.refresh(timesheet)
    return timesheet

@router.get("/leave-requests")
async def get_leave_requests(
    skip: int = 0,
    limit: int = 100,
    employee_id: Optional[int] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(LeaveRequest).filter(LeaveRequest.tenant_id == current_user.tenant_id)
    if employee_id:
        query = query.filter(LeaveRequest.employee_id == employee_id)
    if status:
        query = query.filter(LeaveRequest.status == status)
    
    leave_requests = query.offset(skip).limit(limit).all()
    return leave_requests

@router.post("/leave-requests")
async def create_leave_request(
    leave_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    leave_request = LeaveRequest(
        tenant_id=current_user.tenant_id,
        **leave_data
    )
    db.add(leave_request)
    db.commit()
    db.refresh(leave_request)
    return leave_request

@router.get("/pension-schemes")
async def get_pension_schemes(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    schemes = db.query(PensionScheme).filter(
        PensionScheme.tenant_id == current_user.tenant_id
    ).all()
    return schemes

@router.post("/pension-schemes")
async def create_pension_scheme(
    scheme_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    scheme = PensionScheme(
        tenant_id=current_user.tenant_id,
        **scheme_data
    )
    db.add(scheme)
    db.commit()
    db.refresh(scheme)
    return scheme

@router.get("/benefits")
async def get_benefits(
    skip: int = 0,
    limit: int = 100,
    employee_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(Benefit).filter(Benefit.tenant_id == current_user.tenant_id)
    if employee_id:
        query = query.filter(Benefit.employee_id == employee_id)
    
    benefits = query.offset(skip).limit(limit).all()
    return benefits

@router.post("/benefits")
async def create_benefit(
    benefit_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    benefit = Benefit(
        tenant_id=current_user.tenant_id,
        **benefit_data
    )
    db.add(benefit)
    db.commit()
    db.refresh(benefit)
    return benefit

@router.get("/deductions")
async def get_deductions(
    skip: int = 0,
    limit: int = 100,
    employee_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(Deduction).filter(Deduction.tenant_id == current_user.tenant_id)
    if employee_id:
        query = query.filter(Deduction.employee_id == employee_id)
    
    deductions = query.offset(skip).limit(limit).all()
    return deductions

@router.post("/deductions")
async def create_deduction(
    deduction_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    deduction = Deduction(
        tenant_id=current_user.tenant_id,
        **deduction_data
    )
    db.add(deduction)
    db.commit()
    db.refresh(deduction)
    return deduction

@router.get("/company-cars")
async def get_company_cars(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    cars = db.query(CompanyCar).filter(
        CompanyCar.tenant_id == current_user.tenant_id
    ).offset(skip).limit(limit).all()
    return cars

@router.post("/company-cars")
async def create_company_car(
    car_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    car = CompanyCar(
        tenant_id=current_user.tenant_id,
        **car_data
    )
    db.add(car)
    db.commit()
    db.refresh(car)
    return car

@router.get("/cis-subcontractors")
async def get_cis_subcontractors(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    subcontractors = db.query(CISSubcontractor).filter(
        CISSubcontractor.tenant_id == current_user.tenant_id
    ).offset(skip).limit(limit).all()
    return subcontractors

@router.post("/cis-subcontractors")
async def create_cis_subcontractor(
    subcontractor_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    subcontractor = CISSubcontractor(
        tenant_id=current_user.tenant_id,
        **subcontractor_data
    )
    db.add(subcontractor)
    db.commit()
    db.refresh(subcontractor)
    return subcontractor

@router.get("/dashboard/kpis")
async def get_dashboard_kpis(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    total_employees = db.query(Employee).filter(
        Employee.tenant_id == current_user.tenant_id,
        Employee.status == "active"
    ).count()
    
    pending_timesheets = db.query(Timesheet).filter(
        Timesheet.tenant_id == current_user.tenant_id,
        Timesheet.status == "pending"
    ).count()
    
    draft_pay_runs = db.query(PayRun).filter(
        PayRun.tenant_id == current_user.tenant_id,
        PayRun.status == "draft"
    ).count()
    
    pending_leave_requests = db.query(LeaveRequest).filter(
        LeaveRequest.tenant_id == current_user.tenant_id,
        LeaveRequest.status == "pending"
    ).count()
    
    return {
        "total_employees": total_employees,
        "pending_timesheets": pending_timesheets,
        "draft_pay_runs": draft_pay_runs,
        "pending_leave_requests": pending_leave_requests
    }

@router.post("/journals/export")
async def export_journals(
    pay_run_id: int,
    mapping_config: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    pay_run = db.query(PayRun).filter(
        PayRun.id == pay_run_id,
        PayRun.tenant_id == current_user.tenant_id
    ).first()
    if not pay_run:
        raise HTTPException(status_code=404, detail="Pay run not found")
    
    journal_entries = []
    
    return {
        "pay_run_id": pay_run_id,
        "journal_entries": journal_entries,
        "total_debit": 0,
        "total_credit": 0,
        "status": "ready_for_posting"
    }
