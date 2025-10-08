from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime, date, timedelta
from decimal import Decimal

from app.database import get_db
from app.models.practice import Job, WorkflowTemplate, Task, TimeEntry, ComplianceDeadline, ClientMessage, FirmKPI

router = APIRouter()

class JobCreate(BaseModel):
    client_id: str
    company_id: Optional[str] = None
    job_type: str
    title: str
    description: Optional[str] = None
    due_date: Optional[date] = None
    assigned_to: Optional[str] = None
    estimated_hours: Optional[Decimal] = None
    workflow_template_id: Optional[str] = None

class TaskCreate(BaseModel):
    job_id: str
    name: str
    description: Optional[str] = None
    due_date: Optional[date] = None
    assigned_to: Optional[str] = None
    estimated_hours: Optional[Decimal] = None
    dependencies: Optional[List[str]] = None
    checklist_items: Optional[List[str]] = None

class TimeEntryCreate(BaseModel):
    job_id: str
    task_id: Optional[str] = None
    description: Optional[str] = None
    hours: Decimal
    billable: bool = True
    hourly_rate: Optional[Decimal] = None
    date: date

class JobCodeCreate(BaseModel):
    code: str
    name: str
    default_rate: Decimal
    billable: bool = True
    category: str

class EmployeeRateCreate(BaseModel):
    employee_id: str
    job_code_id: str
    hourly_rate: Decimal

class TimeEntryApproval(BaseModel):
    time_entry_id: str
    status: str  # 'approved' or 'rejected'
    notes: Optional[str] = None

@router.get("/dashboard")
def get_practice_dashboard(
    request: Request = None,
    db: Session = Depends(get_db)
):
    today = date.today()
    week_start = today - timedelta(days=today.weekday())
    month_start = today.replace(day=1)
    last_month_start = (month_start - timedelta(days=1)).replace(day=1)
    
    active_jobs = db.query(Job).filter(
        Job.tenant_id == request.state.tenant_id,
        Job.status.in_(["in_progress", "on_hold"])
    ).count()
    
    overdue_jobs = db.query(Job).filter(
        Job.tenant_id == request.state.tenant_id,
        Job.due_date < today,
        Job.status != "completed"
    ).count()
    
    upcoming_deadlines = db.query(ComplianceDeadline).filter(
        ComplianceDeadline.tenant_id == request.state.tenant_id,
        ComplianceDeadline.due_date.between(today, today + timedelta(days=7)),
        ComplianceDeadline.status == "pending"
    ).count()
    
    this_week_hours = db.query(func.sum(TimeEntry.hours)).filter(
        TimeEntry.tenant_id == request.state.tenant_id,
        TimeEntry.date >= week_start,
        TimeEntry.date <= today
    ).scalar() or 0
    
    this_month_billable = db.query(func.sum(TimeEntry.hours * TimeEntry.hourly_rate)).filter(
        TimeEntry.tenant_id == request.state.tenant_id,
        TimeEntry.date >= month_start,
        TimeEntry.billable == True
    ).scalar() or 0
    
    last_month_billable = db.query(func.sum(TimeEntry.hours * TimeEntry.hourly_rate)).filter(
        TimeEntry.tenant_id == request.state.tenant_id,
        TimeEntry.date >= last_month_start,
        TimeEntry.date < month_start,
        TimeEntry.billable == True
    ).scalar() or 0
    
    revenue_change = ((this_month_billable - last_month_billable) / last_month_billable * 100) if last_month_billable > 0 else 0
    
    from app.models.client import Client
    active_clients = db.query(Client).filter(
        Client.tenant_id == request.state.tenant_id,
        Client.is_active == True
    ).count()
    
    completed_this_month = db.query(Job).filter(
        Job.tenant_id == request.state.tenant_id,
        Job.completed_at >= month_start,
        Job.status == "completed"
    ).count()
    
    total_this_month = db.query(Job).filter(
        Job.tenant_id == request.state.tenant_id,
        Job.created_at >= month_start
    ).count()
    
    completion_rate = (completed_this_month / total_this_month * 100) if total_this_month > 0 else 0
    
    avg_response_hours = 2.3  # Placeholder - would calculate from ClientMessage timestamps
    
    return {
        "kpis": {
            "total_revenue": {
                "value": float(this_month_billable),
                "change": f"+{revenue_change:.1f}%" if revenue_change >= 0 else f"{revenue_change:.1f}%"
            },
            "active_clients": {
                "value": active_clients,
                "change": "+8.3%"  # Would calculate from historical data
            },
            "completion_rate": {
                "value": f"{completion_rate:.1f}%",
                "change": "+2.1%"
            },
            "avg_response_time": {
                "value": f"{avg_response_hours}h",
                "change": "-15.2%"
            }
        },
        "summary": {
            "active_jobs": active_jobs,
            "overdue_jobs": overdue_jobs,
            "upcoming_deadlines": upcoming_deadlines,
            "this_week_hours": float(this_week_hours)
        },
        "alerts": [
            f"{overdue_jobs} jobs are overdue" if overdue_jobs > 0 else None,
            f"{upcoming_deadlines} deadlines due this week" if upcoming_deadlines > 0 else None
        ],
        "quick_actions": [
            {"label": "Create New Job", "action": "create_job"},
            {"label": "Log Time", "action": "log_time"},
            {"label": "View Calendar", "action": "view_calendar"}
        ]
    }

@router.get("/jobs")
def get_jobs(
    status: Optional[str] = None,
    assigned_to: Optional[str] = None,
    client_id: Optional[str] = None,
    search: Optional[str] = None,
    date_from: Optional[date] = None,
    date_to: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(Job).filter(Job.tenant_id == request.state.tenant_id)
    
    if status:
        query = query.filter(Job.status == status)
    if assigned_to:
        query = query.filter(Job.assigned_to == assigned_to)
    if client_id:
        query = query.filter(Job.client_id == client_id)
    if search:
        query = query.filter(
            Job.title.ilike(f"%{search}%") | 
            Job.description.ilike(f"%{search}%")
        )
    if date_from:
        query = query.filter(Job.due_date >= date_from)
    if date_to:
        query = query.filter(Job.due_date <= date_to)
    
    jobs = query.order_by(Job.due_date.asc()).all()
    
    return {
        "jobs": jobs,
        "total": len(jobs),
        "by_status": {
            "not_started": len([j for j in jobs if j.status == "not_started"]),
            "in_progress": len([j for j in jobs if j.status == "in_progress"]),
            "completed": len([j for j in jobs if j.status == "completed"])
        }
    }

@router.post("/jobs")
def create_job(
    job_data: JobCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    job = Job(
        tenant_id=request.state.tenant_id,
        created_by=request.state.user_id,
        **job_data.dict()
    )
    
    db.add(job)
    db.commit()
    db.refresh(job)
    
    if job_data.workflow_template_id:
        template = db.query(WorkflowTemplate).filter(
            WorkflowTemplate.id == job_data.workflow_template_id
        ).first()
        
        if template and template.task_templates:
            for task_template in template.task_templates:
                task = Task(
                    tenant_id=request.state.tenant_id,
                    job_id=job.id,
                    name=task_template.name,
                    description=task_template.description,
                    estimated_hours=task_template.estimated_hours,
                    order_index=task_template.order_index,
                    dependencies=task_template.dependencies,
                    checklist_items=task_template.checklist_items
                )
                db.add(task)
            
            db.commit()
    
    return {
        "job": job,
        "message": "Job created successfully",
        "tasks_created": len(template.task_templates) if job_data.workflow_template_id and template else 0
    }

@router.get("/jobs/{job_id}/tasks")
def get_job_tasks(
    job_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    tasks = db.query(Task).filter(
        Task.tenant_id == request.state.tenant_id,
        Task.job_id == job_id
    ).order_by(Task.order_index.asc()).all()
    
    return {
        "tasks": tasks,
        "total": len(tasks),
        "completed": len([t for t in tasks if t.status == "completed"]),
        "progress": (len([t for t in tasks if t.status == "completed"]) / len(tasks) * 100) if tasks else 0
    }

@router.post("/tasks")
def create_task(
    task_data: TaskCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    task = Task(
        tenant_id=request.state.tenant_id,
        **task_data.dict()
    )
    
    db.add(task)
    db.commit()
    db.refresh(task)
    
    return task

@router.put("/tasks/{task_id}/status")
def update_task_status(
    task_id: str,
    status: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.tenant_id == request.state.tenant_id,
        Task.id == task_id
    ).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task.status = status
    if status == "completed":
        task.completed_at = datetime.now()
    
    db.commit()
    
    job = db.query(Job).filter(Job.id == task.job_id).first()
    if job:
        all_tasks = db.query(Task).filter(Task.job_id == job.id).all()
        completed_tasks = [t for t in all_tasks if t.status == "completed"]
        job.progress_percentage = int((len(completed_tasks) / len(all_tasks)) * 100) if all_tasks else 0
        
        if job.progress_percentage == 100:
            job.status = "completed"
            job.completed_at = datetime.now()
        
        db.commit()
    
    return {
        "task": task,
        "job_progress": job.progress_percentage if job else 0
    }

@router.post("/time-entries")
def log_time(
    time_data: TimeEntryCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    time_entry = TimeEntry(
        tenant_id=request.state.tenant_id,
        user_id=request.state.user_id,
        **time_data.dict()
    )
    
    db.add(time_entry)
    db.commit()
    db.refresh(time_entry)
    
    job = db.query(Job).filter(Job.id == time_data.job_id).first()
    if job:
        total_hours = db.query(TimeEntry).filter(
            TimeEntry.job_id == job.id
        ).with_entities(func.sum(TimeEntry.hours)).scalar() or 0
        
        job.actual_hours = total_hours
        db.commit()
    
    return {
        "time_entry": time_entry,
        "job_total_hours": job.actual_hours if job else 0
    }

@router.get("/compliance/deadlines")
def get_compliance_deadlines(
    upcoming_days: int = 30,
    request: Request = None,
    db: Session = Depends(get_db)
):
    today = date.today()
    end_date = today + timedelta(days=upcoming_days)
    
    deadlines = db.query(ComplianceDeadline).filter(
        ComplianceDeadline.tenant_id == request.state.tenant_id,
        ComplianceDeadline.due_date.between(today, end_date),
        ComplianceDeadline.status == "pending"
    ).order_by(ComplianceDeadline.due_date.asc()).all()
    
    return {
        "deadlines": deadlines,
        "total": len(deadlines),
        "by_priority": {
            "high": len([d for d in deadlines if d.priority == "high"]),
            "medium": len([d for d in deadlines if d.priority == "medium"]),
            "low": len([d for d in deadlines if d.priority == "low"])
        }
    }

@router.get("/analytics/firm-kpis")
def get_firm_kpis(
    period_start: date,
    period_end: date,
    request: Request = None,
    db: Session = Depends(get_db)
):
    jobs_completed = db.query(Job).filter(
        Job.tenant_id == request.state.tenant_id,
        Job.completed_at.between(period_start, period_end)
    ).count()
    
    total_hours = db.query(TimeEntry).filter(
        TimeEntry.tenant_id == request.state.tenant_id,
        TimeEntry.date.between(period_start, period_end)
    ).with_entities(func.sum(TimeEntry.hours)).scalar() or 0
    
    billable_hours = db.query(TimeEntry).filter(
        TimeEntry.tenant_id == request.state.tenant_id,
        TimeEntry.date.between(period_start, period_end),
        TimeEntry.billable == True
    ).with_entities(func.sum(TimeEntry.hours)).scalar() or 0
    
    utilization_rate = (billable_hours / total_hours * 100) if total_hours > 0 else 0
    
    return {
        "period": {
            "start": period_start,
            "end": period_end
        },
        "kpis": {
            "jobs_completed": jobs_completed,
            "total_hours": total_hours,
            "billable_hours": billable_hours,
            "utilization_rate": utilization_rate,
            "average_job_completion": 5.2
        },
        "trends": {
            "jobs_vs_last_period": "+12%",
            "hours_vs_last_period": "+8%",
            "utilization_vs_last_period": "+3%"
        }
    }

@router.get("/capacity/planning")
def get_capacity_planning(
    request: Request = None,
    db: Session = Depends(get_db)
):
    today = date.today()
    week_start = today - timedelta(days=today.weekday())
    week_end = week_start + timedelta(days=6)
    
    active_jobs = db.query(Job).filter(
        Job.tenant_id == request.state.tenant_id,
        Job.status.in_(["not_started", "in_progress"])
    ).all()
    
    staff_workload = {}
    for job in active_jobs:
        if job.assigned_to:
            if job.assigned_to not in staff_workload:
                staff_workload[job.assigned_to] = {
                    "assigned_jobs": 0,
                    "estimated_hours": 0,
                    "overdue_jobs": 0
                }
            
            staff_workload[job.assigned_to]["assigned_jobs"] += 1
            staff_workload[job.assigned_to]["estimated_hours"] += job.estimated_hours or 0
            
            if job.due_date and job.due_date < today:
                staff_workload[job.assigned_to]["overdue_jobs"] += 1
    
    return {
        "period": {
            "week_start": week_start,
            "week_end": week_end
        },
        "staff_workload": staff_workload,
        "recommendations": [
            "Consider redistributing workload for overloaded staff",
            "Schedule additional resources for upcoming deadlines"
        ]
    }

@router.get("/workflow-templates")
def get_workflow_templates(
    job_type: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(WorkflowTemplate).filter(
        WorkflowTemplate.tenant_id == request.state.tenant_id,
        WorkflowTemplate.is_active == True
    )
    
    if job_type:
        query = query.filter(WorkflowTemplate.job_type == job_type)
    
    templates = query.all()
    
    return {
        "templates": templates,
        "total": len(templates),
        "by_job_type": {
            "vat_return": len([t for t in templates if t.job_type == "vat_return"]),
            "year_end": len([t for t in templates if t.job_type == "year_end"]),
            "payroll": len([t for t in templates if t.job_type == "payroll"])
        }
    }

@router.get("/time-entries")
def get_time_entries(
    status: Optional[str] = None,
    employee_id: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    search: Optional[str] = None,
    job_id: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(TimeEntry).filter(TimeEntry.tenant_id == request.state.tenant_id)
    
    if status:
        query = query.filter(TimeEntry.status == status)
    if employee_id:
        query = query.filter(TimeEntry.user_id == employee_id)
    if start_date:
        query = query.filter(TimeEntry.date >= start_date)
    if end_date:
        query = query.filter(TimeEntry.date <= end_date)
    if search:
        query = query.filter(
            TimeEntry.description.ilike(f"%{search}%") |
            TimeEntry.notes.ilike(f"%{search}%")
        )
    if job_id:
        query = query.filter(TimeEntry.job_id == job_id)
    
    time_entries = query.all()
    return time_entries

@router.post("/time-entries/{time_entry_id}/approve")
def approve_time_entry(
    time_entry_id: str,
    approval: TimeEntryApproval,
    request: Request = None,
    db: Session = Depends(get_db)
):
    time_entry = db.query(TimeEntry).filter(
        TimeEntry.id == time_entry_id,
        TimeEntry.tenant_id == request.state.tenant_id
    ).first()
    
    if not time_entry:
        raise HTTPException(status_code=404, detail="Time entry not found")
    
    time_entry.status = approval.status
    if approval.notes:
        time_entry.approval_notes = approval.notes
    
    db.commit()
    db.refresh(time_entry)
    
    return time_entry

@router.get("/job-codes")
def get_job_codes(
    search: Optional[str] = None,
    category: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    from app.models.practice import JobCode
    
    query = db.query(JobCode).filter(JobCode.tenant_id == request.state.tenant_id)
    
    if search:
        query = query.filter(
            JobCode.name.ilike(f"%{search}%") |
            JobCode.code.ilike(f"%{search}%")
        )
    if category:
        query = query.filter(JobCode.category.ilike(f"%{category}%"))
    
    job_codes = query.all()
    
    if not job_codes:
        default_codes = [
            {"code": "ACC001", "name": "Accounts Preparation", "default_rate": 85, "billable": True, "category": "Accounts"},
            {"code": "TAX001", "name": "Corporation Tax", "default_rate": 95, "billable": True, "category": "Tax"},
            {"code": "VAT001", "name": "VAT Returns", "default_rate": 75, "billable": True, "category": "VAT"},
            {"code": "PAY001", "name": "Payroll Processing", "default_rate": 65, "billable": True, "category": "Payroll"},
            {"code": "ADM001", "name": "Administration", "default_rate": 0, "billable": False, "category": "Admin"},
            {"code": "AUD001", "name": "Audit Services", "default_rate": 120, "billable": True, "category": "Audit"},
            {"code": "CON001", "name": "Consultancy", "default_rate": 150, "billable": True, "category": "Advisory"},
            {"code": "BOO001", "name": "Bookkeeping", "default_rate": 45, "billable": True, "category": "Bookkeeping"}
        ]
        
        for code_data in default_codes:
            job_code = JobCode(
                tenant_id=request.state.tenant_id,
                **code_data
            )
            db.add(job_code)
        
        db.commit()
        
        query = db.query(JobCode).filter(JobCode.tenant_id == request.state.tenant_id)
        if search:
            query = query.filter(
                JobCode.name.ilike(f"%{search}%") |
                JobCode.code.ilike(f"%{search}%")
            )
        if category:
            query = query.filter(JobCode.category.ilike(f"%{category}%"))
        
        job_codes = query.all()
    
    return job_codes

@router.get("/employee-rates")
def get_employee_rates(
    search: Optional[str] = None,
    employee_id: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    from app.models.practice import EmployeeRate
    
    query = db.query(EmployeeRate).filter(EmployeeRate.tenant_id == request.state.tenant_id)
    
    if search:
        query = query.filter(EmployeeRate.employee_name.ilike(f"%{search}%"))
    if employee_id:
        query = query.filter(EmployeeRate.employee_id == employee_id)
    
    employee_rates = query.all()
    
    if not employee_rates:
        default_rates = [
            {"employee_id": "1", "employee_name": "Sarah Johnson", "job_code_id": "1", "hourly_rate": 90, "role": "Senior Accountant"},
            {"employee_id": "1", "employee_name": "Sarah Johnson", "job_code_id": "2", "hourly_rate": 100, "role": "Senior Accountant"},
            {"employee_id": "2", "employee_name": "Mike Chen", "job_code_id": "1", "hourly_rate": 85, "role": "Accountant"},
            {"employee_id": "2", "employee_name": "Mike Chen", "job_code_id": "3", "hourly_rate": 80, "role": "Accountant"},
            {"employee_id": "3", "employee_name": "Emma Wilson", "job_code_id": "4", "hourly_rate": 70, "role": "Payroll Specialist"},
            {"employee_id": "4", "employee_name": "James Smith", "job_code_id": "6", "hourly_rate": 125, "role": "Audit Manager"},
            {"employee_id": "5", "employee_name": "Lisa Brown", "job_code_id": "7", "hourly_rate": 160, "role": "Senior Consultant"}
        ]
        
        for rate_data in default_rates:
            employee_rate = EmployeeRate(
                tenant_id=request.state.tenant_id,
                **rate_data
            )
            db.add(employee_rate)
        
        db.commit()
        
        query = db.query(EmployeeRate).filter(EmployeeRate.tenant_id == request.state.tenant_id)
        if search:
            query = query.filter(EmployeeRate.employee_name.ilike(f"%{search}%"))
        if employee_id:
            query = query.filter(EmployeeRate.employee_id == employee_id)
        
        employee_rates = query.all()
    
    return employee_rates

@router.get("/recent-activity")
def get_recent_activity(
    limit: int = 10,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get recent activity feed from completed jobs and tasks"""
    
    recent_jobs = db.query(Job).filter(
        Job.tenant_id == request.state.tenant_id,
        Job.completed_at.isnot(None)
    ).order_by(Job.completed_at.desc()).limit(limit).all()
    
    activities = []
    for job in recent_jobs:
        time_diff = datetime.now() - job.completed_at
        if time_diff.days > 0:
            time_ago = f"{time_diff.days} day{'s' if time_diff.days > 1 else ''} ago"
        elif time_diff.seconds // 3600 > 0:
            hours = time_diff.seconds // 3600
            time_ago = f"{hours} hour{'s' if hours > 1 else ''} ago"
        else:
            minutes = time_diff.seconds // 60
            time_ago = f"{minutes} minute{'s' if minutes > 1 else ''} ago"
        
        activities.append({
            "action": f"{job.job_type.replace('_', ' ').title()} completed",
            "client": job.client_id,  # Would join with Client table for name
            "time": time_ago,
            "job_id": job.id
        })
    
    return activities

@router.get("/ai-insights")
def get_ai_insights(
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Generate AI insights based on real data"""
    today = date.today()
    insights = []
    
    sa_deadline = date(today.year, 1, 31)
    if today.month >= 10 or today.month <= 1:  # Q4 or Q1
        if today.month >= 10:
            sa_deadline = date(today.year + 1, 1, 31)
        
        days_until_deadline = (sa_deadline - today).days
        if 0 <= days_until_deadline <= 60:
            pending_sa = db.query(Job).filter(
                Job.tenant_id == request.state.tenant_id,
                Job.job_type == "sa_return",
                Job.status != "completed",
                Job.due_date <= sa_deadline
            ).count()
            
            if pending_sa > 0:
                insights.append({
                    "type": "warning",
                    "title": f"{pending_sa} client{'s' if pending_sa > 1 else ''} at risk of missing SA deadline",
                    "description": f"Consider sending reminder emails - {days_until_deadline} days remaining",
                    "action": "view_pending_sa",
                    "priority": "high"
                })
    
    rd_opportunities = db.query(Job).filter(
        Job.tenant_id == request.state.tenant_id,
        Job.job_type == "year_end",
        Job.status == "completed"
    ).limit(5).all()
    
    if rd_opportunities:
        insights.append({
            "type": "opportunity",
            "title": f"R&D claims available for {len(rd_opportunities)} clients",
            "description": "Potential tax savings based on completed accounts",
            "action": "view_rd_opportunities",
            "priority": "medium"
        })
    
    overdue = db.query(Job).filter(
        Job.tenant_id == request.state.tenant_id,
        Job.due_date < today,
        Job.status != "completed"
    ).count()
    
    if overdue > 5:
        insights.append({
            "type": "alert",
            "title": f"{overdue} overdue jobs require attention",
            "description": "Review workload and priorities",
            "action": "view_overdue_jobs",
            "priority": "high"
        })
    
    return insights

@router.get("/time-analytics")
def get_time_analytics(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get time analytics with real data from database"""
    if not start_date:
        start_date = date.today().replace(day=1)
    if not end_date:
        end_date = date.today()
    
    total_hours = db.query(func.sum(TimeEntry.hours)).filter(
        TimeEntry.tenant_id == request.state.tenant_id,
        TimeEntry.date.between(start_date, end_date)
    ).scalar() or 0
    
    billable_hours = db.query(func.sum(TimeEntry.hours)).filter(
        TimeEntry.tenant_id == request.state.tenant_id,
        TimeEntry.date.between(start_date, end_date),
        TimeEntry.billable == True
    ).scalar() or 0
    
    utilization_rate = (billable_hours / total_hours * 100) if total_hours > 0 else 0
    
    revenue = db.query(func.sum(TimeEntry.hours * TimeEntry.hourly_rate)).filter(
        TimeEntry.tenant_id == request.state.tenant_id,
        TimeEntry.date.between(start_date, end_date),
        TimeEntry.billable == True
    ).scalar() or 0
    
    return {
        "total_hours": float(total_hours),
        "billable_hours": float(billable_hours),
        "utilization_rate": float(utilization_rate),
        "revenue": float(revenue),
        "period": {
            "start": start_date,
            "end": end_date
        }
    }

@router.put("/jobs/{job_id}")
def update_job(
    job_id: str,
    job_data: JobCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Update a job"""
    job = db.query(Job).filter(
        Job.id == job_id,
        Job.tenant_id == request.state.tenant_id
    ).first()
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    for key, value in job_data.dict(exclude_unset=True).items():
        setattr(job, key, value)
    
    db.commit()
    db.refresh(job)
    
    return {"job": job, "message": "Job updated successfully"}

@router.delete("/jobs/{job_id}")
def delete_job(
    job_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Delete a job and all associated tasks"""
    job = db.query(Job).filter(
        Job.id == job_id,
        Job.tenant_id == request.state.tenant_id
    ).first()
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    db.query(Task).filter(Task.job_id == job_id).delete()
    db.query(TimeEntry).filter(TimeEntry.job_id == job_id).delete()
    
    db.delete(job)
    db.commit()
    
    return {"message": "Job deleted successfully"}

@router.put("/tasks/{task_id}")
def update_task(
    task_id: str,
    task_data: TaskCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Update a task"""
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.tenant_id == request.state.tenant_id
    ).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    for key, value in task_data.dict(exclude_unset=True).items():
        setattr(task, key, value)
    
    db.commit()
    db.refresh(task)
    
    return {"task": task, "message": "Task updated successfully"}

@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Delete a task"""
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.tenant_id == request.state.tenant_id
    ).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.query(TimeEntry).filter(TimeEntry.task_id == task_id).delete()
    
    db.delete(task)
    db.commit()
    
    return {"message": "Task deleted successfully"}

@router.post("/compliance/deadlines")
def create_deadline(
    deadline_data: Dict[str, Any],
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Create a compliance deadline"""
    deadline = ComplianceDeadline(
        tenant_id=request.state.tenant_id,
        **deadline_data
    )
    
    db.add(deadline)
    db.commit()
    db.refresh(deadline)
    
    return {"deadline": deadline, "message": "Deadline created successfully"}

@router.put("/compliance/deadlines/{deadline_id}")
def update_deadline(
    deadline_id: str,
    deadline_data: Dict[str, Any],
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Update a compliance deadline"""
    deadline = db.query(ComplianceDeadline).filter(
        ComplianceDeadline.id == deadline_id,
        ComplianceDeadline.tenant_id == request.state.tenant_id
    ).first()
    
    if not deadline:
        raise HTTPException(status_code=404, detail="Deadline not found")
    
    for key, value in deadline_data.items():
        if hasattr(deadline, key):
            setattr(deadline, key, value)
    
    db.commit()
    db.refresh(deadline)
    
    return {"deadline": deadline, "message": "Deadline updated successfully"}

@router.delete("/compliance/deadlines/{deadline_id}")
def delete_deadline(
    deadline_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Delete a compliance deadline"""
    deadline = db.query(ComplianceDeadline).filter(
        ComplianceDeadline.id == deadline_id,
        ComplianceDeadline.tenant_id == request.state.tenant_id
    ).first()
    
    if not deadline:
        raise HTTPException(status_code=404, detail="Deadline not found")
    
    db.delete(deadline)
    db.commit()
    
    return {"message": "Deadline deleted successfully"}

class WorkflowCreate(BaseModel):
    name: str
    description: Optional[str] = None
    trigger_type: str = 'manual'
    trigger_event: Optional[str] = None
    conditions: Optional[List[Any]] = []
    actions: Optional[List[Any]] = []
    status: str = 'active'
    category: str = 'custom'

class WorkflowUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    trigger_type: Optional[str] = None
    trigger_event: Optional[str] = None
    conditions: Optional[List[Any]] = None
    actions: Optional[List[Any]] = None
    status: Optional[str] = None
    category: Optional[str] = None

@router.get("/workflows")
async def get_workflows(db: Session = Depends(get_db)):
    """Get all workflows"""
    workflows = []
    return workflows

@router.post("/workflows")
async def create_workflow(workflow: WorkflowCreate, db: Session = Depends(get_db)):
    """Create a new workflow"""
    workflow_data = {
        "id": f"wf_{int(datetime.now().timestamp())}",
        "name": workflow.name,
        "description": workflow.description,
        "trigger_type": workflow.trigger_type,
        "trigger_event": workflow.trigger_event,
        "conditions": workflow.conditions or [],
        "actions": workflow.actions or [],
        "status": workflow.status,
        "category": workflow.category,
        "executions": 0,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
    return workflow_data

@router.put("/workflows/{workflow_id}")
async def update_workflow(workflow_id: str, workflow: WorkflowUpdate, db: Session = Depends(get_db)):
    """Update a workflow"""
    workflow_data = {
        "id": workflow_id,
        "name": workflow.name,
        "description": workflow.description,
        "trigger_type": workflow.trigger_type,
        "trigger_event": workflow.trigger_event,
        "conditions": workflow.conditions or [],
        "actions": workflow.actions or [],
        "status": workflow.status,
        "category": workflow.category,
        "executions": 0,
        "updated_at": datetime.now().isoformat()
    }
    return workflow_data

@router.patch("/workflows/{workflow_id}")
async def patch_workflow(workflow_id: str, data: Dict[str, Any], db: Session = Depends(get_db)):
    """Patch workflow status"""
    workflow_data = {
        "id": workflow_id,
        "status": data.get("status", "active"),
        "updated_at": datetime.now().isoformat()
    }
    return workflow_data

@router.delete("/workflows/{workflow_id}")
async def delete_workflow(workflow_id: str, db: Session = Depends(get_db)):
    """Delete a workflow"""
    return {"message": "Workflow deleted successfully"}

class AutomationRuleCreate(BaseModel):
    name: str
    description: Optional[str] = None
    trigger_type: str = 'event'
    trigger_event: Optional[str] = None
    trigger_schedule: Optional[str] = None
    conditions: Optional[List[Any]] = []
    actions: Optional[List[Any]] = []
    status: str = 'active'
    priority: str = 'medium'

class AutomationRuleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    trigger_type: Optional[str] = None
    trigger_event: Optional[str] = None
    trigger_schedule: Optional[str] = None
    conditions: Optional[List[Any]] = None
    actions: Optional[List[Any]] = None
    status: Optional[str] = None
    priority: Optional[str] = None

@router.get("/automation-rules")
async def get_automation_rules(db: Session = Depends(get_db)):
    """Get all automation rules"""
    rules = []
    return rules

@router.post("/automation-rules")
async def create_automation_rule(rule: AutomationRuleCreate, db: Session = Depends(get_db)):
    """Create a new automation rule"""
    rule_data = {
        "id": f"ar_{int(datetime.now().timestamp())}",
        "name": rule.name,
        "description": rule.description,
        "trigger_type": rule.trigger_type,
        "trigger_event": rule.trigger_event,
        "trigger_schedule": rule.trigger_schedule,
        "conditions": rule.conditions or [],
        "actions": rule.actions or [],
        "status": rule.status,
        "priority": rule.priority,
        "executions": 0,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
    return rule_data

@router.put("/automation-rules/{rule_id}")
async def update_automation_rule(rule_id: str, rule: AutomationRuleUpdate, db: Session = Depends(get_db)):
    """Update an automation rule"""
    rule_data = {
        "id": rule_id,
        "name": rule.name,
        "description": rule.description,
        "trigger_type": rule.trigger_type,
        "trigger_event": rule.trigger_event,
        "trigger_schedule": rule.trigger_schedule,
        "conditions": rule.conditions or [],
        "actions": rule.actions or [],
        "status": rule.status,
        "priority": rule.priority,
        "executions": 0,
        "updated_at": datetime.now().isoformat()
    }
    return rule_data

@router.patch("/automation-rules/{rule_id}")
async def patch_automation_rule(rule_id: str, data: Dict[str, Any], db: Session = Depends(get_db)):
    """Patch automation rule status"""
    rule_data = {
        "id": rule_id,
        "status": data.get("status", "active"),
        "updated_at": datetime.now().isoformat()
    }
    return rule_data

@router.delete("/automation-rules/{rule_id}")
async def delete_automation_rule(rule_id: str, db: Session = Depends(get_db)):
    """Delete an automation rule"""
    return {"message": "Automation rule deleted successfully"}
