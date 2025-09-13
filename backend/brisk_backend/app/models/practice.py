from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"))
    job_type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="not_started")
    priority = Column(String, default="medium")
    due_date = Column(Date)
    assigned_to = Column(String, ForeignKey("users.id"))
    created_by = Column(String, ForeignKey("users.id"), nullable=False)
    estimated_hours = Column(Numeric(5, 2))
    actual_hours = Column(Numeric(5, 2), default=0)
    progress_percentage = Column(Integer, default=0)
    workflow_template_id = Column(String, ForeignKey("workflow_templates.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
    
    tasks = relationship("Task", back_populates="job")
    time_entries = relationship("TimeEntry", back_populates="job")

class WorkflowTemplate(Base):
    __tablename__ = "workflow_templates"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    job_type = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    template_data = Column(JSON)
    created_by = Column(String, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    task_templates = relationship("TaskTemplate", back_populates="workflow_template")

class TaskTemplate(Base):
    __tablename__ = "task_templates"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    workflow_template_id = Column(String, ForeignKey("workflow_templates.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    order_index = Column(Integer, nullable=False)
    estimated_hours = Column(Numeric(5, 2))
    dependencies = Column(JSON)
    checklist_items = Column(JSON)
    
    workflow_template = relationship("WorkflowTemplate", back_populates="task_templates")

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    job_id = Column(String, ForeignKey("jobs.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="pending")
    priority = Column(String, default="medium")
    due_date = Column(Date)
    assigned_to = Column(String, ForeignKey("users.id"))
    estimated_hours = Column(Numeric(5, 2))
    actual_hours = Column(Numeric(5, 2), default=0)
    order_index = Column(Integer)
    dependencies = Column(JSON)
    checklist_items = Column(JSON)
    checklist_completed = Column(JSON, default=[])
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
    
    job = relationship("Job", back_populates="tasks")
    time_entries = relationship("TimeEntry", back_populates="task")
    comments = relationship("TaskComment", back_populates="task")

class TaskComment(Base):
    __tablename__ = "task_comments"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    task_id = Column(String, ForeignKey("tasks.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    attachments = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    task = relationship("Task", back_populates="comments")

class TimeEntry(Base):
    __tablename__ = "time_entries"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    job_id = Column(String, ForeignKey("jobs.id"), nullable=False)
    task_id = Column(String, ForeignKey("tasks.id"))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    description = Column(Text)
    hours = Column(Numeric(5, 2), nullable=False)
    billable = Column(Boolean, default=True)
    hourly_rate = Column(Numeric(8, 2))
    date = Column(Date, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    job = relationship("Job", back_populates="time_entries")
    task = relationship("Task", back_populates="time_entries")

class ComplianceDeadline(Base):
    __tablename__ = "compliance_deadlines"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"))
    deadline_type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text)
    due_date = Column(Date, nullable=False)
    status = Column(String, default="pending")
    priority = Column(String, default="medium")
    auto_generated = Column(Boolean, default=False)
    source = Column(String)
    job_id = Column(String, ForeignKey("jobs.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))

class ClientPortalAccess(Base):
    __tablename__ = "client_portal_access"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False)
    user_email = Column(String, nullable=False)
    user_name = Column(String, nullable=False)
    access_level = Column(String, default="client")
    is_active = Column(Boolean, default=True)
    last_login = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ClientMessage(Base):
    __tablename__ = "client_messages"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False)
    sender_type = Column(String, nullable=False)
    sender_id = Column(String, nullable=False)
    recipient_type = Column(String, nullable=False)
    recipient_id = Column(String, nullable=False)
    subject = Column(String)
    content = Column(Text, nullable=False)
    attachments = Column(JSON)
    is_read = Column(Boolean, default=False)
    thread_id = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class FirmKPI(Base):
    __tablename__ = "firm_kpis"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=False)
    billable_hours = Column(Numeric(10, 2))
    non_billable_hours = Column(Numeric(10, 2))
    wip_value = Column(Numeric(15, 2))
    recovery_percentage = Column(Numeric(5, 2))
    average_days_to_file = Column(Numeric(5, 1))
    client_satisfaction_score = Column(Numeric(3, 2))
    revenue = Column(Numeric(15, 2))
    profit_margin = Column(Numeric(5, 2))
    calculated_at = Column(DateTime(timezone=True), server_default=func.now())

class JobCode(Base):
    __tablename__ = "job_codes"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    code = Column(String, nullable=False)
    name = Column(String, nullable=False)
    default_rate = Column(Numeric(8, 2), nullable=False)
    billable = Column(Boolean, default=True)
    category = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class EmployeeRate(Base):
    __tablename__ = "employee_rates"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    employee_id = Column(String, nullable=False)
    employee_name = Column(String, nullable=False)
    job_code_id = Column(String, ForeignKey("job_codes.id"), nullable=False)
    hourly_rate = Column(Numeric(8, 2), nullable=False)
    role = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
