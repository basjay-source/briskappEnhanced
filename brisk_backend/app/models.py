from sqlalchemy import Column, Integer, String, Boolean, DateTime, Date, Text, ForeignKey, JSON, Enum, Numeric, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

Base = declarative_base()

class UserRole(enum.Enum):
    SUPER_ADMIN = "super_admin"
    ORG_ADMIN = "org_admin"
    SECURITY_ADMIN = "security_admin"
    COMPLIANCE_ADMIN = "compliance_admin"
    BILLING_ADMIN = "billing_admin"
    INTEGRATION_ADMIN = "integration_admin"
    SUPPORT_ADMIN = "support_admin"
    READ_ONLY_AUDITOR = "read_only_auditor"
    TEAM_ADMIN = "team_admin"

class Environment(enum.Enum):
    PRODUCTION = "production"
    SANDBOX = "sandbox"
    DEVELOPMENT = "development"

class Region(enum.Enum):
    UK = "uk"
    EU = "eu"
    US = "us"
    CUSTOM = "custom"

class SubscriptionStatus(enum.Enum):
    TRIAL = "trial"
    ACTIVE = "active"
    PAST_DUE = "past_due"
    GRACE = "grace"
    SUSPENDED = "suspended"
    CANCELED = "canceled"
    PAUSED = "paused"

class Tenant(Base):
    __tablename__ = "tenants"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    legal_entity = Column(String)
    billing_owner = Column(String)
    primary_region = Column(Enum(Region), default=Region.UK)
    data_residency_profile = Column(String)
    environment = Column(Enum(Environment), default=Environment.PRODUCTION)
    status = Column(String, default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    org_units = relationship("OrgUnit", back_populates="tenant")
    users = relationship("User", back_populates="tenant")
    subscriptions = relationship("Subscription", back_populates="tenant")

class OrgUnit(Base):
    __tablename__ = "org_units"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    office_type = Column(String)
    timezone = Column(String, default="UTC")
    currency = Column(String, default="GBP")
    working_hours = Column(JSON)
    holidays = Column(JSON)
    
    tenant = relationship("Tenant", back_populates="org_units")
    users = relationship("User", back_populates="org_unit")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    org_unit_id = Column(Integer, ForeignKey("org_units.id"), nullable=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role = Column(Enum(UserRole), default=UserRole.READ_ONLY_AUDITOR)
    is_active = Column(Boolean, default=True)
    sso_id = Column(String, nullable=True)
    mfa_enabled = Column(Boolean, default=False)
    last_login = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    tenant = relationship("Tenant", back_populates="users")
    org_unit = relationship("OrgUnit", back_populates="users")
    sessions = relationship("UserSession", back_populates="user")
    audit_logs = relationship("AuditLog", back_populates="user")

class UserSession(Base):
    __tablename__ = "user_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    session_token = Column(String, unique=True)
    device_info = Column(JSON)
    ip_address = Column(String)
    expires_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="sessions")

class Subscription(Base):
    __tablename__ = "subscriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    plan_name = Column(String, nullable=False)
    status = Column(Enum(SubscriptionStatus), default=SubscriptionStatus.TRIAL)
    seats = Column(Integer, default=1)
    billing_cycle = Column(String, default="monthly")
    amount = Column(Integer)
    currency = Column(String, default="GBP")
    trial_ends_at = Column(DateTime)
    current_period_start = Column(DateTime)
    current_period_end = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    tenant = relationship("Tenant", back_populates="subscriptions")
    invoices = relationship("Invoice", back_populates="subscription")

class Invoice(Base):
    __tablename__ = "invoices"
    
    id = Column(Integer, primary_key=True, index=True)
    subscription_id = Column(Integer, ForeignKey("subscriptions.id"))
    invoice_number = Column(String, unique=True)
    status = Column(String, default="draft")
    amount_due = Column(Integer)
    currency = Column(String, default="GBP")
    due_date = Column(DateTime)
    paid_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    subscription = relationship("Subscription", back_populates="invoices")

class FeatureFlag(Base):
    __tablename__ = "feature_flags"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(Text)
    is_enabled = Column(Boolean, default=False)
    targeting_rules = Column(JSON)
    plan_mapping = Column(JSON)
    kill_switch = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class SecurityPolicy(Base):
    __tablename__ = "security_policies"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    policy_type = Column(String)
    policy_config = Column(JSON)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(String, nullable=False)
    resource_type = Column(String)
    resource_id = Column(String)
    details = Column(JSON)
    ip_address = Column(String)
    user_agent = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="audit_logs")

class APIKey(Base):
    __tablename__ = "api_keys"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    key_hash = Column(String, unique=True)
    scopes = Column(JSON)
    expires_at = Column(DateTime, nullable=True)
    last_used = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Webhook(Base):
    __tablename__ = "webhooks"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    url = Column(String, nullable=False)
    events = Column(JSON)
    secret = Column(String)
    is_active = Column(Boolean, default=True)
    retry_config = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

class NotificationTemplate(Base):
    __tablename__ = "notification_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    template_type = Column(String)
    subject = Column(String)
    body = Column(Text)
    variables = Column(JSON)
    locale = Column(String, default="en")
    created_at = Column(DateTime, default=datetime.utcnow)

class BrandingConfig(Base):
    __tablename__ = "branding_configs"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    org_unit_id = Column(Integer, ForeignKey("org_units.id"), nullable=True)
    logo_url = Column(String)
    primary_color = Column(String, default="#0B5FFF")
    secondary_color = Column(String, default="#FF7A00")
    custom_domain = Column(String)
    dkim_config = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)


class DocumentType(enum.Enum):
    INVOICE = "invoice"
    RECEIPT = "receipt"
    BANK_STATEMENT = "bank_statement"
    P60 = "p60"
    P11D = "p11d"
    MINUTE = "minute"
    RESOLUTION = "resolution"
    CONTRACT = "contract"
    ID_DOCUMENT = "id_document"
    PROOF_OF_ADDRESS = "proof_of_address"
    TAX_RETURN = "tax_return"
    ACCOUNTS = "accounts"
    WORKPAPER = "workpaper"
    OTHER = "other"

class DocumentStatus(enum.Enum):
    DRAFT = "draft"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    ARCHIVED = "archived"

class ConversionStatus(enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

class ESignStatus(enum.Enum):
    DRAFT = "draft"
    SENT = "sent"
    VIEWED = "viewed"
    SIGNED = "signed"
    COMPLETED = "completed"
    DECLINED = "declined"
    EXPIRED = "expired"

class Client(Base):
    __tablename__ = "clients"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    client_code = Column(String, unique=True)
    contact_email = Column(String)
    contact_phone = Column(String)
    address = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    documents = relationship("Document", back_populates="client")
    binders = relationship("Binder", back_populates="client")

class Engagement(Base):
    __tablename__ = "engagements"
    
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    engagement_type = Column(String)
    period_start = Column(DateTime)
    period_end = Column(DateTime)
    year_end = Column(DateTime)
    status = Column(String, default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    documents = relationship("Document", back_populates="engagement")
    binders = relationship("Binder", back_populates="engagement")

class Binder(Base):
    __tablename__ = "binders"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    engagement_id = Column(Integer, ForeignKey("engagements.id"), nullable=True)
    name = Column(String, nullable=False)
    binder_type = Column(String)
    template_id = Column(Integer, nullable=True)
    structure = Column(JSON)
    is_locked = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    client = relationship("Client", back_populates="binders")
    engagement = relationship("Engagement", back_populates="binders")
    documents = relationship("Document", back_populates="binder")
    tabs = relationship("BinderTab", back_populates="binder")

class BinderTab(Base):
    __tablename__ = "binder_tabs"
    
    id = Column(Integer, primary_key=True, index=True)
    binder_id = Column(Integer, ForeignKey("binders.id"))
    name = Column(String, nullable=False)
    tab_order = Column(Integer, default=0)
    description = Column(Text)
    
    binder = relationship("Binder", back_populates="tabs")
    documents = relationship("Document", back_populates="binder_tab")

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    engagement_id = Column(Integer, ForeignKey("engagements.id"), nullable=True)
    binder_id = Column(Integer, ForeignKey("binders.id"), nullable=True)
    binder_tab_id = Column(Integer, ForeignKey("binder_tabs.id"), nullable=True)
    filename = Column(String, nullable=False)
    original_filename = Column(String)
    file_path = Column(String, nullable=False)
    file_size = Column(Integer)
    mime_type = Column(String)
    document_type = Column(Enum(DocumentType), default=DocumentType.OTHER)
    status = Column(Enum(DocumentStatus), default=DocumentStatus.DRAFT)
    checksum = Column(String)
    language = Column(String, default="en")
    sensitivity_level = Column(String, default="normal")
    data_residency = Column(Enum(Region), default=Region.UK)
    encryption_key_id = Column(String)
    document_metadata = Column(JSON)
    tags = Column(JSON)
    is_favorite = Column(Boolean, default=False)
    is_workpaper = Column(Boolean, default=False)
    uploaded_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    client = relationship("Client", back_populates="documents")
    engagement = relationship("Engagement", back_populates="documents")
    binder = relationship("Binder", back_populates="documents")
    binder_tab = relationship("BinderTab", back_populates="documents")
    uploader = relationship("User")
    versions = relationship("DocumentVersion", back_populates="document")
    conversions = relationship("ConversionJob", back_populates="document")
    ocr_results = relationship("OCRResult", back_populates="document")
    shares = relationship("DocumentShare", back_populates="document")

class DocumentVersion(Base):
    __tablename__ = "document_versions"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"))
    version_number = Column(Integer, nullable=False)
    file_path = Column(String, nullable=False)
    file_size = Column(Integer)
    checksum = Column(String)
    conversion_profile = Column(String)
    source_version_id = Column(Integer, nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    document = relationship("Document", back_populates="versions")
    creator = relationship("User")

class ConversionJob(Base):
    __tablename__ = "conversion_jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    document_id = Column(Integer, ForeignKey("documents.id"))
    source_format = Column(String, nullable=False)
    target_format = Column(String, nullable=False)
    conversion_profile = Column(String)
    status = Column(Enum(ConversionStatus), default=ConversionStatus.PENDING)
    progress = Column(Integer, default=0)
    error_message = Column(Text)
    output_file_path = Column(String)
    started_at = Column(DateTime)
    completed_at = Column(DateTime)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    document = relationship("Document", back_populates="conversions")
    creator = relationship("User")

class OCRResult(Base):
    __tablename__ = "ocr_results"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"))
    language = Column(String, default="en")
    confidence_score = Column(Integer)
    extracted_text = Column(Text)
    structured_data = Column(JSON)
    bounding_boxes = Column(JSON)
    processing_time = Column(Integer)
    ocr_engine = Column(String, default="tesseract")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    document = relationship("Document", back_populates="ocr_results")

class ESignEnvelope(Base):
    __tablename__ = "esign_envelopes"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    status = Column(Enum(ESignStatus), default=ESignStatus.DRAFT)
    envelope_config = Column(JSON)
    certificate_data = Column(JSON)
    completed_at = Column(DateTime)
    expires_at = Column(DateTime)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    creator = relationship("User")
    documents = relationship("ESignDocument", back_populates="envelope")
    recipients = relationship("ESignRecipient", back_populates="envelope")

class ESignDocument(Base):
    __tablename__ = "esign_documents"
    
    id = Column(Integer, primary_key=True, index=True)
    envelope_id = Column(Integer, ForeignKey("esign_envelopes.id"))
    document_id = Column(Integer, ForeignKey("documents.id"))
    document_order = Column(Integer, default=0)
    
    envelope = relationship("ESignEnvelope", back_populates="documents")
    document = relationship("Document")

class ESignRecipient(Base):
    __tablename__ = "esign_recipients"
    
    id = Column(Integer, primary_key=True, index=True)
    envelope_id = Column(Integer, ForeignKey("esign_envelopes.id"))
    email = Column(String, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, default="signer")
    signing_order = Column(Integer, default=0)
    status = Column(String, default="pending")
    signed_at = Column(DateTime)
    ip_address = Column(String)
    
    envelope = relationship("ESignEnvelope", back_populates="recipients")

class DocumentTemplate(Base):
    __tablename__ = "document_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    template_type = Column(String)
    file_path = Column(String, nullable=False)
    merge_fields = Column(JSON)
    description = Column(Text)
    is_active = Column(Boolean, default=True)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    creator = relationship("User")

class DocumentShare(Base):
    __tablename__ = "document_shares"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"))
    share_token = Column(String, unique=True, nullable=False)
    recipient_email = Column(String)
    permissions = Column(JSON)
    expires_at = Column(DateTime)
    password_protected = Column(Boolean, default=False)
    password_hash = Column(String)
    access_count = Column(Integer, default=0)
    last_accessed = Column(DateTime)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    document = relationship("Document", back_populates="shares")
    creator = relationship("User")

class RetentionPolicy(Base):
    __tablename__ = "retention_policies"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    document_type = Column(String, nullable=False)
    retention_period_years = Column(Integer, nullable=False)
    jurisdiction = Column(String, default="UK")
    auto_delete = Column(Boolean, default=False)
    legal_hold_exempt = Column(Boolean, default=False)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class LegalHold(Base):
    __tablename__ = "legal_holds"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    description = Column(Text)
    matter_reference = Column(String)
    hold_criteria = Column(JSON)
    is_active = Column(Boolean, default=True)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    released_at = Column(DateTime)
    
    creator = relationship("User")

class DocumentPack(Base):
    __tablename__ = "document_packs"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    name = Column(String, nullable=False)
    pack_type = Column(String)
    component_list = Column(JSON)
    output_file_path = Column(String)
    watermarks = Column(JSON)
    toc_config = Column(JSON)
    status = Column(String, default="draft")
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    client = relationship("Client")
    creator = relationship("User")


class ServiceCatalog(Base):
    __tablename__ = "service_catalog"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    service_type = Column(String)  # bookkeeping, tax, audit, advisory, etc.
    description = Column(Text)
    scope_template = Column(JSON)
    deliverables = Column(JSON)
    workflow_template_id = Column(Integer)
    default_sla_hours = Column(Integer)
    pricing_model = Column(String)  # fixed, hourly, value, retainer
    base_price = Column(Numeric(10, 2))
    hourly_rate = Column(Numeric(10, 2))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Opportunity(Base):
    __tablename__ = "opportunities"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    name = Column(String, nullable=False)
    description = Column(Text)
    value_estimate = Column(Numeric(10, 2))
    probability = Column(Integer, default=50)  # percentage
    stage = Column(String, default="prospecting")  # prospecting, proposal, negotiation, closed_won, closed_lost
    source = Column(String)  # referral, website, cold_call, etc.
    expected_close_date = Column(Date)
    assigned_to = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    client = relationship("Client")
    assignee = relationship("User")

class Proposal(Base):
    __tablename__ = "proposals"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    opportunity_id = Column(Integer, ForeignKey("opportunities.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    proposal_number = Column(String, unique=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    services = Column(JSON)  # list of service catalog items
    total_value = Column(Numeric(10, 2))
    pricing_model = Column(String)
    payment_terms = Column(String)
    validity_period_days = Column(Integer, default=30)
    status = Column(String, default="draft")  # draft, sent, accepted, rejected, expired
    sent_at = Column(DateTime)
    responded_at = Column(DateTime)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    opportunity = relationship("Opportunity")
    client = relationship("Client")
    creator = relationship("User")

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    engagement_id = Column(Integer, ForeignKey("engagements.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    job_number = Column(String, unique=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    job_type = Column(String)  # recurring, one_off, project
    service_line = Column(String)
    status = Column(String, default="planned")  # planned, in_progress, waiting_client, review, complete, cancelled
    priority = Column(String, default="medium")  # low, medium, high, urgent
    budget_hours = Column(Integer)
    budget_amount = Column(Numeric(10, 2))
    actual_hours = Column(Integer, default=0)
    actual_amount = Column(Numeric(10, 2), default=0)
    start_date = Column(Date)
    due_date = Column(Date)
    completed_date = Column(Date)
    assigned_to = Column(Integer, ForeignKey("users.id"))
    reviewer_id = Column(Integer, ForeignKey("users.id"))
    sla_hours = Column(Integer)
    is_billable = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    engagement = relationship("Engagement")
    client = relationship("Client")
    assignee = relationship("User", foreign_keys=[assigned_to])
    reviewer = relationship("User", foreign_keys=[reviewer_id])

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    parent_task_id = Column(Integer, ForeignKey("tasks.id"))
    name = Column(String, nullable=False)
    description = Column(Text)
    task_type = Column(String)  # checklist_item, approval, review, filing
    status = Column(String, default="pending")  # pending, in_progress, waiting_approval, complete, cancelled
    priority = Column(String, default="medium")
    estimated_hours = Column(Integer)
    actual_hours = Column(Integer, default=0)
    due_date = Column(DateTime)
    completed_date = Column(DateTime)
    assigned_to = Column(Integer, ForeignKey("users.id"))
    created_by = Column(Integer, ForeignKey("users.id"))
    approval_required = Column(Boolean, default=False)
    approved_by = Column(Integer, ForeignKey("users.id"))
    approved_at = Column(DateTime)
    evidence_links = Column(JSON)  # links to documents, workpapers
    created_at = Column(DateTime, default=datetime.utcnow)
    
    job = relationship("Job")
    assignee = relationship("User", foreign_keys=[assigned_to])
    creator = relationship("User", foreign_keys=[created_by])
    approver = relationship("User", foreign_keys=[approved_by])
    subtasks = relationship("Task", remote_side=[id])

class TimeEntry(Base):
    __tablename__ = "time_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    task_id = Column(Integer, ForeignKey("tasks.id"))
    date = Column(Date, nullable=False)
    hours = Column(Numeric(4, 2), nullable=False)
    description = Column(Text)
    billable = Column(Boolean, default=True)
    hourly_rate = Column(Numeric(10, 2))
    status = Column(String, default="draft")  # draft, submitted, approved, billed
    approved_by = Column(Integer, ForeignKey("users.id"))
    approved_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", foreign_keys=[user_id])
    job = relationship("Job")
    task = relationship("Task")
    approver = relationship("User", foreign_keys=[approved_by])

class WIPEntry(Base):
    __tablename__ = "wip_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    time_entry_id = Column(Integer, ForeignKey("time_entries.id"))
    date = Column(Date, nullable=False)
    hours = Column(Numeric(4, 2))
    standard_rate = Column(Numeric(10, 2))
    billing_rate = Column(Numeric(10, 2))
    standard_amount = Column(Numeric(10, 2))
    billing_amount = Column(Numeric(10, 2))
    write_up_amount = Column(Numeric(10, 2), default=0)
    write_off_amount = Column(Numeric(10, 2), default=0)
    status = Column(String, default="unbilled")  # unbilled, billed, written_off
    billed_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    job = relationship("Job")
    time_entry = relationship("TimeEntry")

class PMInvoice(Base):
    __tablename__ = "pm_invoices"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    invoice_number = Column(String, unique=True)
    invoice_date = Column(Date, nullable=False)
    due_date = Column(Date)
    subtotal = Column(Numeric(10, 2))
    tax_amount = Column(Numeric(10, 2), default=0)
    total_amount = Column(Numeric(10, 2))
    currency = Column(String, default="GBP")
    status = Column(String, default="draft")  # draft, sent, paid, overdue, cancelled
    payment_terms = Column(String)
    notes = Column(Text)
    sent_at = Column(DateTime)
    paid_at = Column(DateTime)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    client = relationship("Client")
    job = relationship("Job")
    creator = relationship("User")

class Deadline(Base):
    __tablename__ = "deadlines"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    name = Column(String, nullable=False)
    deadline_type = Column(String)  # statutory, internal, client
    regulatory_type = Column(String)  # CT, SA, VAT, RTI, CS01, etc.
    due_date = Column(Date, nullable=False)
    reminder_days = Column(Integer, default=7)
    status = Column(String, default="pending")  # pending, in_progress, complete, overdue
    readiness_percentage = Column(Integer, default=0)
    escalated = Column(Boolean, default=False)
    escalated_at = Column(DateTime)
    completed_at = Column(DateTime)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    client = relationship("Client")
    job = relationship("Job")

class SLA(Base):
    __tablename__ = "slas"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    service_type = Column(String)
    description = Column(Text)
    response_time_hours = Column(Integer)
    resolution_time_hours = Column(Integer)
    uptime_percentage = Column(Numeric(5, 2))
    breach_escalation = Column(JSON)
    client_credit_rules = Column(JSON)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class QualityReview(Base):
    __tablename__ = "quality_reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    reviewer_id = Column(Integer, ForeignKey("users.id"))
    review_type = Column(String)  # cold, hot, file
    sampling_reason = Column(String)  # new_staff, high_value, high_risk, random
    checklist_items = Column(JSON)
    findings = Column(JSON)
    overall_rating = Column(String)  # excellent, good, satisfactory, needs_improvement
    remediation_required = Column(Boolean, default=False)
    remediation_notes = Column(Text)
    completed_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    job = relationship("Job")
    reviewer = relationship("User")

class RiskRegister(Base):
    __tablename__ = "risk_register"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    engagement_id = Column(Integer, ForeignKey("engagements.id"))
    risk_type = Column(String)  # scope, legal, reputational, financial
    description = Column(Text, nullable=False)
    likelihood = Column(String)  # low, medium, high
    impact = Column(String)  # low, medium, high
    risk_score = Column(Integer)  # calculated from likelihood x impact
    mitigation_plan = Column(Text)
    owner_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="open")  # open, mitigated, closed
    review_date = Column(Date)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    client = relationship("Client")
    engagement = relationship("Engagement")
    owner = relationship("User")

class Hold(Base):
    __tablename__ = "holds"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    hold_type = Column(String)  # kyc, payment, legal, compliance
    reason = Column(Text, nullable=False)
    applied_by = Column(Integer, ForeignKey("users.id"))
    applied_at = Column(DateTime, default=datetime.utcnow)
    released_by = Column(Integer, ForeignKey("users.id"))
    released_at = Column(DateTime)
    is_active = Column(Boolean, default=True)
    affects_filing = Column(Boolean, default=True)
    affects_billing = Column(Boolean, default=False)
    
    client = relationship("Client")
    applier = relationship("User", foreign_keys=[applied_by])
    releaser = relationship("User", foreign_keys=[released_by])

class StaffSkill(Base):
    __tablename__ = "staff_skills"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    skill_name = Column(String, nullable=False)
    skill_category = Column(String)  # technical, regulatory, software, language
    proficiency_level = Column(String)  # beginner, intermediate, advanced, expert
    certification_name = Column(String)
    certification_body = Column(String)
    certification_date = Column(Date)
    expiry_date = Column(Date)
    cpd_hours_required = Column(Integer)
    cpd_hours_completed = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User")

class LeaveRequest(Base):
    __tablename__ = "leave_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    leave_type = Column(String)  # annual, sick, maternity, study
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    days_requested = Column(Numeric(3, 1))
    reason = Column(Text)
    status = Column(String, default="pending")  # pending, approved, rejected, cancelled
    approved_by = Column(Integer, ForeignKey("users.id"))
    approved_at = Column(DateTime)
    rejection_reason = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", foreign_keys=[user_id])
    approver = relationship("User", foreign_keys=[approved_by])

class WorkflowTemplate(Base):
    __tablename__ = "workflow_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    service_type = Column(String)
    description = Column(Text)
    template_steps = Column(JSON)  # ordered list of tasks/checklists
    estimated_hours = Column(Integer)
    is_active = Column(Boolean, default=True)
    version = Column(String, default="1.0")
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    creator = relationship("User")

class AutomationRule(Base):
    __tablename__ = "automation_rules"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    description = Column(Text)
    trigger_event = Column(String)  # job.status_changed, wip.over_budget, etc.
    trigger_conditions = Column(JSON)
    actions = Column(JSON)  # send_email, create_task, update_status, etc.
    is_active = Column(Boolean, default=True)
    execution_count = Column(Integer, default=0)
    last_executed = Column(DateTime)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    creator = relationship("User")

class EmailTemplate(Base):
    __tablename__ = "email_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    template_type = Column(String)  # proposal, reminder, welcome, invoice
    subject = Column(String)
    body_html = Column(Text)
    body_text = Column(Text)
    merge_fields = Column(JSON)
    is_active = Column(Boolean, default=True)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    creator = relationship("User")

class TMEngagement(Base):
    __tablename__ = "tm_engagements"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    name = Column(String, nullable=False)
    description = Column(Text)
    fee_arrangement = Column(String)  # T&M, fixed, retainer, success, mixed
    budget_hours = Column(Float)
    budget_amount = Column(Float)
    fee_cap = Column(Float)
    currency = Column(String, default="GBP")
    billing_plan = Column(String)  # milestones, monthly, completion
    status = Column(String, default="Active")
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    
    client = relationship("Client")

class TMTaskCode(Base):
    __tablename__ = "tm_task_codes"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    code = Column(String, nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    billable = Column(Boolean, default=True)
    service_line = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class TMRateCard(Base):
    __tablename__ = "tm_rate_cards"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    role = Column(String, nullable=False)
    rate = Column(Float, nullable=False)
    currency = Column(String, default="GBP")
    effective_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

class TMPersonRateOverride(Base):
    __tablename__ = "tm_person_rate_overrides"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=True)
    engagement_id = Column(Integer, ForeignKey("tm_engagements.id"), nullable=True)
    rate = Column(Float, nullable=False)
    currency = Column(String, default="GBP")
    effective_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User")
    client = relationship("Client")
    engagement = relationship("TMEngagement")

class TMTimeEntry(Base):
    __tablename__ = "tm_time_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    engagement_id = Column(Integer, ForeignKey("tm_engagements.id"))
    task_code_id = Column(Integer, ForeignKey("tm_task_codes.id"))
    date = Column(Date, nullable=False)
    hours = Column(Float, nullable=False)
    rate = Column(Float, nullable=False)
    currency = Column(String, default="GBP")
    narrative = Column(Text)
    billable = Column(Boolean, default=True)
    status = Column(String, default="Draft")  # Draft, Submitted, Approved, Locked
    submitted_at = Column(DateTime)
    approved_at = Column(DateTime)
    approved_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", foreign_keys=[user_id])
    engagement = relationship("TMEngagement")
    task_code = relationship("TMTaskCode")
    approver = relationship("User", foreign_keys=[approved_by])

class TMTimerRun(Base):
    __tablename__ = "tm_timer_runs"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    engagement_id = Column(Integer, ForeignKey("tm_engagements.id"))
    task_code_id = Column(Integer, ForeignKey("tm_task_codes.id"))
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime)
    description = Column(Text)
    status = Column(String, default="Running")  # Running, Stopped, Converted
    time_entry_id = Column(Integer, ForeignKey("tm_time_entries.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User")
    engagement = relationship("TMEngagement")
    task_code = relationship("TMTaskCode")
    time_entry = relationship("TMTimeEntry")

class TMExpense(Base):
    __tablename__ = "tm_expenses"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    engagement_id = Column(Integer, ForeignKey("tm_engagements.id"), nullable=True)
    expense_type = Column(String, nullable=False)  # Staff, Disbursement, Mileage
    amount = Column(Float, nullable=False)
    currency = Column(String, default="GBP")
    tax_code = Column(String)
    description = Column(Text)
    billable = Column(Boolean, default=False)
    markup_rate = Column(Float, default=0.0)
    receipt_url = Column(String)
    date = Column(Date, nullable=False)
    status = Column(String, default="Draft")  # Draft, Submitted, Approved
    submitted_at = Column(DateTime)
    approved_at = Column(DateTime)
    approved_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", foreign_keys=[user_id])
    engagement = relationship("TMEngagement")
    approver = relationship("User", foreign_keys=[approved_by])

class TMWIPItem(Base):
    __tablename__ = "tm_wip_items"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    engagement_id = Column(Integer, ForeignKey("tm_engagements.id"))
    time_entry_id = Column(Integer, ForeignKey("tm_time_entries.id"), nullable=True)
    expense_id = Column(Integer, ForeignKey("tm_expenses.id"), nullable=True)
    standard_value = Column(Float, nullable=False)
    billing_value = Column(Float, nullable=False)
    currency = Column(String, default="GBP")
    status = Column(String, default="Unbilled")  # Unbilled, Billed, Written-off
    write_up_down = Column(Float, default=0.0)
    write_off_reason = Column(Text)
    transfer_to_engagement_id = Column(Integer, ForeignKey("tm_engagements.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    
    engagement = relationship("TMEngagement", foreign_keys=[engagement_id])
    time_entry = relationship("TMTimeEntry")
    expense = relationship("TMExpense")
    transfer_engagement = relationship("TMEngagement", foreign_keys=[transfer_to_engagement_id])

class TMInvoice(Base):
    __tablename__ = "tm_invoices"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    invoice_number = Column(String, unique=True, nullable=False)
    invoice_date = Column(Date, nullable=False)
    due_date = Column(Date, nullable=False)
    currency = Column(String, default="GBP")
    subtotal = Column(Float, nullable=False)
    tax_amount = Column(Float, default=0.0)
    total_amount = Column(Float, nullable=False)
    status = Column(String, default="Draft")  # Draft, Issued, Paid, Overdue, Cancelled
    payment_terms = Column(String)
    notes = Column(Text)
    pdf_url = Column(String)
    issued_at = Column(DateTime)
    paid_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    
    client = relationship("Client")

class TMInvoiceLine(Base):
    __tablename__ = "tm_invoice_lines"
    
    id = Column(Integer, primary_key=True, index=True)
    invoice_id = Column(Integer, ForeignKey("tm_invoices.id"))
    wip_item_id = Column(Integer, ForeignKey("tm_wip_items.id"), nullable=True)
    description = Column(Text, nullable=False)
    quantity = Column(Float, default=1.0)
    rate = Column(Float, nullable=False)
    amount = Column(Float, nullable=False)
    tax_code = Column(String)
    tax_rate = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    invoice = relationship("TMInvoice")
    wip_item = relationship("TMWIPItem")

class TMRetainerAccount(Base):
    __tablename__ = "tm_retainer_accounts"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    engagement_id = Column(Integer, ForeignKey("tm_engagements.id"), nullable=True)
    account_name = Column(String, nullable=False)
    currency = Column(String, default="GBP")
    balance = Column(Float, default=0.0)
    target_balance = Column(Float)
    low_balance_threshold = Column(Float)
    status = Column(String, default="Active")  # Active, Suspended, Closed
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    
    client = relationship("Client")
    engagement = relationship("TMEngagement")

class TMRetainerTransaction(Base):
    __tablename__ = "tm_retainer_transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    retainer_account_id = Column(Integer, ForeignKey("tm_retainer_accounts.id"))
    transaction_type = Column(String, nullable=False)  # Deposit, Drawdown, Interest, Adjustment
    amount = Column(Float, nullable=False)
    currency = Column(String, default="GBP")
    description = Column(Text)
    reference = Column(String)
    invoice_id = Column(Integer, ForeignKey("tm_invoices.id"), nullable=True)
    transaction_date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    retainer_account = relationship("TMRetainerAccount")
    invoice = relationship("TMInvoice")

class TMRevenueSchedule(Base):
    __tablename__ = "tm_revenue_schedules"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    engagement_id = Column(Integer, ForeignKey("tm_engagements.id"))
    recognition_method = Column(String, nullable=False)  # Over time, Point in time
    total_amount = Column(Float, nullable=False)
    currency = Column(String, default="GBP")
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    status = Column(String, default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    engagement = relationship("TMEngagement")

class TMRevenueRecognition(Base):
    __tablename__ = "tm_revenue_recognitions"
    
    id = Column(Integer, primary_key=True, index=True)
    revenue_schedule_id = Column(Integer, ForeignKey("tm_revenue_schedules.id"))
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String, default="GBP")
    journal_reference = Column(String)
    status = Column(String, default="Pending")  # Pending, Posted, Reversed
    posted_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    revenue_schedule = relationship("TMRevenueSchedule")

class TMPayment(Base):
    __tablename__ = "tm_payments"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    invoice_id = Column(Integer, ForeignKey("tm_invoices.id"))
    payment_method = Column(String, nullable=False)  # Card, Bank Transfer, Direct Debit, Cash
    amount = Column(Float, nullable=False)
    currency = Column(String, default="GBP")
    payment_date = Column(Date, nullable=False)
    reference = Column(String)
    status = Column(String, default="Pending")  # Pending, Completed, Failed, Refunded
    gateway_transaction_id = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    invoice = relationship("TMInvoice")

class TMCollectionAction(Base):
    __tablename__ = "tm_collection_actions"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    invoice_id = Column(Integer, ForeignKey("tm_invoices.id"))
    action_type = Column(String, nullable=False)  # Email, SMS, Call, Letter, Legal
    action_date = Column(Date, nullable=False)
    description = Column(Text)
    outcome = Column(String)  # Contacted, Promise to Pay, Dispute, No Response
    next_action_date = Column(Date)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    invoice = relationship("TMInvoice")
    user = relationship("User")

class AMLCase(Base):
    __tablename__ = "aml_cases"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    case_number = Column(String, unique=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    jurisdiction = Column(String)
    case_type = Column(String)  # KYC, KYB, Periodic Review
    status = Column(String)  # Unstarted, In Progress, EDD, Approved, Rejected
    risk_level = Column(String)  # Low, Medium, High, Prohibited
    assigned_to = Column(Integer, ForeignKey("users.id"))
    mlro_id = Column(Integer, ForeignKey("users.id"))
    review_due_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    
    client = relationship("Client")
    assigned_user = relationship("User", foreign_keys=[assigned_to])
    mlro = relationship("User", foreign_keys=[mlro_id])

class Individual(Base):
    __tablename__ = "individuals"
    
    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("aml_cases.id"))
    legal_name = Column(String)
    aliases = Column(JSON)  # List of aliases
    date_of_birth = Column(DateTime)
    nationalities = Column(JSON)  # List of nationalities
    tax_ids = Column(JSON)  # TIN/NINO/SSN etc
    document_type = Column(String)
    document_number = Column(String)
    document_expiry = Column(DateTime)
    roles = Column(JSON)  # director, trustee, signatory, beneficial owner
    verification_status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    case = relationship("AMLCase")

class Entity(Base):
    __tablename__ = "entities"
    
    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("aml_cases.id"))
    legal_form = Column(String)
    company_number = Column(String)
    lei = Column(String)
    registered_address = Column(Text)
    operating_address = Column(Text)
    tax_residencies = Column(JSON)
    tax_ids = Column(JSON)
    verification_status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    case = relationship("AMLCase")

class OwnershipStructure(Base):
    __tablename__ = "ownership_structures"
    
    id = Column(Integer, primary_key=True, index=True)
    entity_id = Column(Integer, ForeignKey("entities.id"))
    owner_type = Column(String)  # individual, entity, trust
    owner_id = Column(Integer)  # Reference to individual or entity
    ownership_percentage = Column(Numeric(5, 2))
    control_type = Column(String)  # direct, indirect, voting, beneficial
    is_ubo = Column(Boolean, default=False)
    verification_status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    entity = relationship("Entity")

class Screening(Base):
    __tablename__ = "screenings"
    
    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("aml_cases.id"))
    subject_type = Column(String)  # individual, entity
    subject_id = Column(Integer)
    screening_type = Column(String)  # sanctions, pep, adverse_media
    watchlist_name = Column(String)
    match_score = Column(Numeric(5, 2))
    match_status = Column(String)  # pending, true_positive, false_positive
    reviewed_by = Column(Integer, ForeignKey("users.id"))
    reviewed_at = Column(DateTime)
    rationale = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    case = relationship("AMLCase")
    reviewer = relationship("User")

class RiskAssessment(Base):
    __tablename__ = "risk_assessments"
    
    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("aml_cases.id"))
    client_risk_score = Column(Numeric(5, 2))
    geography_risk_score = Column(Numeric(5, 2))
    product_risk_score = Column(Numeric(5, 2))
    delivery_risk_score = Column(Numeric(5, 2))
    overall_risk_level = Column(String)
    risk_factors = Column(JSON)
    assessment_date = Column(DateTime, default=datetime.utcnow)
    assessed_by = Column(Integer, ForeignKey("users.id"))
    
    case = relationship("AMLCase")
    assessor = relationship("User")

class SARReport(Base):
    __tablename__ = "sar_reports"
    
    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("aml_cases.id"))
    report_type = Column(String)  # SAR, STR, Internal
    jurisdiction = Column(String)
    suspicion_reason = Column(Text)
    transaction_details = Column(JSON)
    filing_status = Column(String)  # draft, submitted, acknowledged
    filed_by = Column(Integer, ForeignKey("users.id"))
    filed_at = Column(DateTime)
    acknowledgment_ref = Column(String)
    tipping_off_applied = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    case = relationship("AMLCase")
    filer = relationship("User")
