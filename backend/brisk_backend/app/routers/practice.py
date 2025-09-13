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
    date: date

@router.get("/dashboard")
def get_practice_dashboard(
    request: Request = None,
    db: Session = Depends(get_db)
):
    today = date.today()
    week_start = today - timedelta(days=today.weekday())
    
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
    
    this_week_hours = db.query(TimeEntry).filter(
        TimeEntry.tenant_id == request.state.tenant_id,
        TimeEntry.date >= week_start,
        TimeEntry.date <= today
    ).count()
    
    return {
        "summary": {
            "active_jobs": active_jobs,
            "overdue_jobs": overdue_jobs,
            "upcoming_deadlines": upcoming_deadlines,
            "this_week_hours": this_week_hours
        },
        "alerts": [
            f"{overdue_jobs} jobs are overdue",
            f"{upcoming_deadlines} deadlines due this week"
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
