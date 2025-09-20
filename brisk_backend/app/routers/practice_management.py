from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, date
import json

from ..database import get_db
from ..auth import get_current_user
from ..models import (
    User, Client, Engagement, ServiceCatalog, Opportunity, Proposal, Job, Task,
    TimeEntry, WIPEntry, PMInvoice, Deadline, SLA, QualityReview, RiskRegister,
    Hold, StaffSkill, LeaveRequest, WorkflowTemplate, AutomationRule, EmailTemplate
)

router = APIRouter(prefix="/practice-management", tags=["practice-management"])

@router.get("/dashboard")
def get_dashboard_overview(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    active_jobs = db.query(Job).filter(
        Job.status.in_(["planned", "in_progress", "waiting_client", "review"])
    ).count()
    
    overdue_deadlines = db.query(Deadline).filter(
        Deadline.due_date < date.today(),
        Deadline.status != "complete"
    ).count()
    
    wip_over_budget = db.query(Job).filter(
        Job.actual_amount > Job.budget_amount
    ).count()
    
    unbilled_wip = db.query(WIPEntry).filter(
        WIPEntry.status == "unbilled"
    ).count()
    
    total_users = db.query(User).filter(User.is_active == True).count()
    
    recent_jobs = db.query(Job).order_by(Job.created_at.desc()).limit(5).all()
    recent_activity = []
    for job in recent_jobs:
        recent_activity.append({
            "id": job.id,
            "action": f"Job created: {job.name}",
            "client": job.client.name if job.client else "Unknown",
            "user": job.assignee.full_name if job.assignee else "Unassigned",
            "timestamp": job.created_at.isoformat()
        })
    
    return {
        "active_jobs": active_jobs,
        "overdue_deadlines": overdue_deadlines,
        "wip_over_budget": wip_over_budget,
        "unbilled_wip_amount": float(unbilled_wip * 1000),  # Mock calculation
        "team_utilization": 78.5,  # Mock percentage
        "recent_activity": recent_activity
    }

@router.get("/clients")
def get_clients(
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Client)
    if search:
        query = query.filter(Client.name.ilike(f"%{search}%"))
    
    clients = query.all()
    return [
        {
            "id": client.id,
            "name": client.name,
            "client_code": client.client_code,
            "contact_email": client.contact_email,
            "document_count": client.document_count,
            "created_at": client.created_at.isoformat()
        }
        for client in clients
    ]

@router.get("/opportunities")
def get_opportunities(
    client_id: Optional[int] = Query(None),
    stage: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Opportunity)
    if client_id:
        query = query.filter(Opportunity.client_id == client_id)
    if stage:
        query = query.filter(Opportunity.stage == stage)
    
    opportunities = query.all()
    return [
        {
            "id": opp.id,
            "name": opp.name,
            "client_name": opp.client.name if opp.client else None,
            "value_estimate": float(opp.value_estimate) if opp.value_estimate else None,
            "probability": opp.probability,
            "stage": opp.stage,
            "expected_close_date": opp.expected_close_date.isoformat() if opp.expected_close_date else None,
            "assignee": opp.assignee.full_name if opp.assignee else None,
            "created_at": opp.created_at.isoformat()
        }
        for opp in opportunities
    ]

@router.get("/proposals")
def get_proposals(
    status: Optional[str] = Query(None),
    client_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Proposal)
    if status:
        query = query.filter(Proposal.status == status)
    if client_id:
        query = query.filter(Proposal.client_id == client_id)
    
    proposals = query.all()
    return [
        {
            "id": proposal.id,
            "proposal_number": proposal.proposal_number,
            "title": proposal.title,
            "client_name": proposal.client.name if proposal.client else None,
            "total_value": float(proposal.total_value) if proposal.total_value else None,
            "status": proposal.status,
            "sent_at": proposal.sent_at.isoformat() if proposal.sent_at else None,
            "created_at": proposal.created_at.isoformat()
        }
        for proposal in proposals
    ]

@router.get("/service-catalog")
def get_service_catalog(
    service_type: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(ServiceCatalog).filter(ServiceCatalog.is_active == True)
    if service_type:
        query = query.filter(ServiceCatalog.service_type == service_type)
    
    services = query.all()
    return [
        {
            "id": service.id,
            "name": service.name,
            "service_type": service.service_type,
            "description": service.description,
            "pricing_model": service.pricing_model,
            "base_price": float(service.base_price) if service.base_price else None,
            "hourly_rate": float(service.hourly_rate) if service.hourly_rate else None,
            "default_sla_hours": service.default_sla_hours,
            "created_at": service.created_at.isoformat()
        }
        for service in services
    ]

@router.get("/jobs")
def get_jobs(
    status: Optional[str] = Query(None),
    client_id: Optional[int] = Query(None),
    assigned_to: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Job)
    if status:
        query = query.filter(Job.status == status)
    if client_id:
        query = query.filter(Job.client_id == client_id)
    if assigned_to:
        query = query.filter(Job.assigned_to == assigned_to)
    
    jobs = query.all()
    return [
        {
            "id": job.id,
            "job_number": job.job_number,
            "name": job.name,
            "client_name": job.client.name if job.client else None,
            "status": job.status,
            "priority": job.priority,
            "budget_hours": job.budget_hours,
            "actual_hours": job.actual_hours,
            "budget_amount": float(job.budget_amount) if job.budget_amount else None,
            "actual_amount": float(job.actual_amount) if job.actual_amount else None,
            "due_date": job.due_date.isoformat() if job.due_date else None,
            "assignee": job.assignee.full_name if job.assignee else None,
            "created_at": job.created_at.isoformat()
        }
        for job in jobs
    ]

@router.get("/tasks")
def get_tasks(
    job_id: Optional[int] = Query(None),
    assigned_to: Optional[int] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Task)
    if job_id:
        query = query.filter(Task.job_id == job_id)
    if assigned_to:
        query = query.filter(Task.assigned_to == assigned_to)
    if status:
        query = query.filter(Task.status == status)
    
    tasks = query.all()
    return [
        {
            "id": task.id,
            "name": task.name,
            "job_name": task.job.name if task.job else None,
            "status": task.status,
            "priority": task.priority,
            "estimated_hours": task.estimated_hours,
            "actual_hours": task.actual_hours,
            "due_date": task.due_date.isoformat() if task.due_date else None,
            "assignee": task.assignee.full_name if task.assignee else None,
            "approval_required": task.approval_required,
            "created_at": task.created_at.isoformat()
        }
        for task in tasks
    ]

@router.get("/time-entries")
def get_time_entries(
    user_id: Optional[int] = Query(None),
    job_id: Optional[int] = Query(None),
    date_from: Optional[date] = Query(None),
    date_to: Optional[date] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(TimeEntry)
    if user_id:
        query = query.filter(TimeEntry.user_id == user_id)
    if job_id:
        query = query.filter(TimeEntry.job_id == job_id)
    if date_from:
        query = query.filter(TimeEntry.date >= date_from)
    if date_to:
        query = query.filter(TimeEntry.date <= date_to)
    
    entries = query.all()
    return [
        {
            "id": entry.id,
            "user_name": entry.user.full_name if entry.user else None,
            "job_name": entry.job.name if entry.job else None,
            "date": entry.date.isoformat(),
            "hours": float(entry.hours),
            "description": entry.description,
            "billable": entry.billable,
            "hourly_rate": float(entry.hourly_rate) if entry.hourly_rate else None,
            "status": entry.status,
            "created_at": entry.created_at.isoformat()
        }
        for entry in entries
    ]

@router.get("/wip-entries")
def get_wip_entries(
    job_id: Optional[int] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(WIPEntry)
    if job_id:
        query = query.filter(WIPEntry.job_id == job_id)
    if status:
        query = query.filter(WIPEntry.status == status)
    
    entries = query.all()
    return [
        {
            "id": entry.id,
            "job_name": entry.job.name if entry.job else None,
            "date": entry.date.isoformat(),
            "hours": float(entry.hours) if entry.hours else None,
            "billing_amount": float(entry.billing_amount) if entry.billing_amount else None,
            "write_up_amount": float(entry.write_up_amount) if entry.write_up_amount else None,
            "write_off_amount": float(entry.write_off_amount) if entry.write_off_amount else None,
            "status": entry.status,
            "created_at": entry.created_at.isoformat()
        }
        for entry in entries
    ]

@router.get("/invoices")
def get_invoices(
    client_id: Optional[int] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(PMInvoice)
    if client_id:
        query = query.filter(PMInvoice.client_id == client_id)
    if status:
        query = query.filter(PMInvoice.status == status)
    
    invoices = query.all()
    return [
        {
            "id": invoice.id,
            "invoice_number": invoice.invoice_number,
            "client_name": invoice.client.name if invoice.client else None,
            "invoice_date": invoice.invoice_date.isoformat(),
            "due_date": invoice.due_date.isoformat() if invoice.due_date else None,
            "total_amount": float(invoice.total_amount) if invoice.total_amount else None,
            "status": invoice.status,
            "sent_at": invoice.sent_at.isoformat() if invoice.sent_at else None,
            "paid_at": invoice.paid_at.isoformat() if invoice.paid_at else None,
            "created_at": invoice.created_at.isoformat()
        }
        for invoice in invoices
    ]

@router.get("/deadlines")
def get_deadlines(
    client_id: Optional[int] = Query(None),
    deadline_type: Optional[str] = Query(None),
    overdue_only: Optional[bool] = Query(False),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Deadline)
    if client_id:
        query = query.filter(Deadline.client_id == client_id)
    if deadline_type:
        query = query.filter(Deadline.deadline_type == deadline_type)
    if overdue_only:
        query = query.filter(
            Deadline.due_date < date.today(),
            Deadline.status != "complete"
        )
    
    deadlines = query.all()
    return [
        {
            "id": deadline.id,
            "name": deadline.name,
            "client_name": deadline.client.name if deadline.client else None,
            "deadline_type": deadline.deadline_type,
            "regulatory_type": deadline.regulatory_type,
            "due_date": deadline.due_date.isoformat(),
            "status": deadline.status,
            "readiness_percentage": deadline.readiness_percentage,
            "escalated": deadline.escalated,
            "created_at": deadline.created_at.isoformat()
        }
        for deadline in deadlines
    ]

@router.get("/slas")
def get_slas(
    service_type: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(SLA).filter(SLA.is_active == True)
    if service_type:
        query = query.filter(SLA.service_type == service_type)
    
    slas = query.all()
    return [
        {
            "id": sla.id,
            "name": sla.name,
            "service_type": sla.service_type,
            "response_time_hours": sla.response_time_hours,
            "resolution_time_hours": sla.resolution_time_hours,
            "uptime_percentage": float(sla.uptime_percentage) if sla.uptime_percentage else None,
            "created_at": sla.created_at.isoformat()
        }
        for sla in slas
    ]

@router.get("/quality-reviews")
def get_quality_reviews(
    job_id: Optional[int] = Query(None),
    reviewer_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(QualityReview)
    if job_id:
        query = query.filter(QualityReview.job_id == job_id)
    if reviewer_id:
        query = query.filter(QualityReview.reviewer_id == reviewer_id)
    
    reviews = query.all()
    return [
        {
            "id": review.id,
            "job_name": review.job.name if review.job else None,
            "reviewer_name": review.reviewer.full_name if review.reviewer else None,
            "review_type": review.review_type,
            "sampling_reason": review.sampling_reason,
            "overall_rating": review.overall_rating,
            "remediation_required": review.remediation_required,
            "completed_at": review.completed_at.isoformat() if review.completed_at else None,
            "created_at": review.created_at.isoformat()
        }
        for review in reviews
    ]

@router.get("/risks")
def get_risks(
    client_id: Optional[int] = Query(None),
    risk_type: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(RiskRegister)
    if client_id:
        query = query.filter(RiskRegister.client_id == client_id)
    if risk_type:
        query = query.filter(RiskRegister.risk_type == risk_type)
    
    risks = query.all()
    return [
        {
            "id": risk.id,
            "client_name": risk.client.name if risk.client else None,
            "risk_type": risk.risk_type,
            "description": risk.description,
            "likelihood": risk.likelihood,
            "impact": risk.impact,
            "risk_score": risk.risk_score,
            "status": risk.status,
            "owner": risk.owner.full_name if risk.owner else None,
            "created_at": risk.created_at.isoformat()
        }
        for risk in risks
    ]

@router.get("/holds")
def get_holds(
    client_id: Optional[int] = Query(None),
    active_only: Optional[bool] = Query(True),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Hold)
    if client_id:
        query = query.filter(Hold.client_id == client_id)
    if active_only:
        query = query.filter(Hold.is_active == True)
    
    holds = query.all()
    return [
        {
            "id": hold.id,
            "client_name": hold.client.name if hold.client else None,
            "hold_type": hold.hold_type,
            "reason": hold.reason,
            "applied_by": hold.applier.full_name if hold.applier else None,
            "applied_at": hold.applied_at.isoformat(),
            "is_active": hold.is_active,
            "affects_filing": hold.affects_filing,
            "affects_billing": hold.affects_billing
        }
        for hold in holds
    ]

@router.get("/staff-skills")
def get_staff_skills(
    user_id: Optional[int] = Query(None),
    skill_category: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(StaffSkill)
    if user_id:
        query = query.filter(StaffSkill.user_id == user_id)
    if skill_category:
        query = query.filter(StaffSkill.skill_category == skill_category)
    
    skills = query.all()
    return [
        {
            "id": skill.id,
            "user_name": skill.user.full_name if skill.user else None,
            "skill_name": skill.skill_name,
            "skill_category": skill.skill_category,
            "proficiency_level": skill.proficiency_level,
            "certification_name": skill.certification_name,
            "expiry_date": skill.expiry_date.isoformat() if skill.expiry_date else None,
            "cpd_hours_required": skill.cpd_hours_required,
            "cpd_hours_completed": skill.cpd_hours_completed,
            "created_at": skill.created_at.isoformat()
        }
        for skill in skills
    ]

@router.get("/leave-requests")
def get_leave_requests(
    user_id: Optional[int] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(LeaveRequest)
    if user_id:
        query = query.filter(LeaveRequest.user_id == user_id)
    if status:
        query = query.filter(LeaveRequest.status == status)
    
    requests = query.all()
    return [
        {
            "id": request.id,
            "user_name": request.user.full_name if request.user else None,
            "leave_type": request.leave_type,
            "start_date": request.start_date.isoformat(),
            "end_date": request.end_date.isoformat(),
            "days_requested": float(request.days_requested),
            "status": request.status,
            "approved_by": request.approver.full_name if request.approver else None,
            "created_at": request.created_at.isoformat()
        }
        for request in requests
    ]

@router.get("/workflow-templates")
def get_workflow_templates(
    service_type: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(WorkflowTemplate).filter(WorkflowTemplate.is_active == True)
    if service_type:
        query = query.filter(WorkflowTemplate.service_type == service_type)
    
    templates = query.all()
    return [
        {
            "id": template.id,
            "name": template.name,
            "service_type": template.service_type,
            "description": template.description,
            "estimated_hours": template.estimated_hours,
            "version": template.version,
            "created_at": template.created_at.isoformat()
        }
        for template in templates
    ]

@router.get("/email-templates")
def get_email_templates(
    template_type: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(EmailTemplate).filter(EmailTemplate.is_active == True)
    if template_type:
        query = query.filter(EmailTemplate.template_type == template_type)
    
    templates = query.all()
    return [
        {
            "id": template.id,
            "name": template.name,
            "template_type": template.template_type,
            "subject": template.subject,
            "created_at": template.created_at.isoformat()
        }
        for template in templates
    ]

@router.get("/automation-rules")
def get_automation_rules(
    is_active: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(AutomationRule)
    if is_active is not None:
        query = query.filter(AutomationRule.is_active == is_active)
    
    rules = query.all()
    return [
        {
            "id": rule.id,
            "name": rule.name,
            "description": rule.description,
            "trigger_event": rule.trigger_event,
            "is_active": rule.is_active,
            "execution_count": rule.execution_count,
            "last_executed": rule.last_executed.isoformat() if rule.last_executed else None,
            "created_at": rule.created_at.isoformat()
        }
        for rule in rules
    ]

@router.get("/reports/utilization")
def get_utilization_report(
    date_from: Optional[date] = Query(None),
    date_to: Optional[date] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return {
        "overall_utilization": 78.5,
        "target_utilization": 80.0,
        "billable_hours": 1250,
        "total_hours": 1600,
        "by_user": [
            {"user_name": "John Smith", "utilization": 85.2, "billable_hours": 170, "total_hours": 200},
            {"user_name": "Sarah Johnson", "utilization": 72.1, "billable_hours": 144, "total_hours": 200},
            {"user_name": "Mike Wilson", "utilization": 81.5, "billable_hours": 163, "total_hours": 200}
        ]
    }

@router.get("/reports/profitability")
def get_profitability_report(
    client_id: Optional[int] = Query(None),
    service_type: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return {
        "total_revenue": 125000.00,
        "total_costs": 85000.00,
        "gross_profit": 40000.00,
        "margin_percentage": 32.0,
        "by_service": [
            {"service_type": "Bookkeeping", "revenue": 45000, "costs": 30000, "margin": 33.3},
            {"service_type": "Tax", "revenue": 35000, "costs": 25000, "margin": 28.6},
            {"service_type": "Audit", "revenue": 45000, "costs": 30000, "margin": 33.3}
        ]
    }
