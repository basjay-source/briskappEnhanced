from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Enum, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid
import enum

class AdminPersona(enum.Enum):
    ORG_OWNER = "org_owner"
    BILLING_ADMIN = "billing_admin"
    REVOPS = "revops"
    PARTNER_MANAGER = "partner_manager"
    SUPPORT_ADMIN = "support_admin"
    READ_ONLY_AUDITOR = "read_only_auditor"
    FEATURE_FLAG_OPERATOR = "feature_flag_operator"
    DATA_STEWARD = "data_steward"

class SubscriptionStatus(enum.Enum):
    TRIAL = "trial"
    ACTIVE = "active"
    PAST_DUE = "past_due"
    GRACE = "grace"
    SUSPENDED = "suspended"
    PAUSED = "paused"
    CANCELED = "canceled"

class InvoiceStatus(enum.Enum):
    DRAFT = "draft"
    OPEN = "open"
    PAID = "paid"
    UNCOLLECTIBLE = "uncollectible"
    VOID = "void"

class PromotionStatus(enum.Enum):
    DRAFT = "draft"
    SCHEDULED = "scheduled"
    ACTIVE = "active"
    PAUSED = "paused"
    EXPIRED = "expired"

class ExperimentStatus(enum.Enum):
    DRAFT = "draft"
    RUNNING = "running"
    PAUSED = "paused"
    CONCLUDED = "concluded"
    ROLLED_OUT = "rolled_out"
    ROLLED_BACK = "rolled_back"


class Tenant(Base):
    __tablename__ = "tenants"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    domain = Column(String, unique=True, nullable=False)
    logo_url = Column(String)
    theme_colors = Column(JSON, default={"primary": "#0B5FFF", "accent": "#FF7A00"})
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    users = relationship("User", back_populates="tenant")
    subscriptions = relationship("Subscription", back_populates="tenant")

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    admin_persona = Column(Enum(AdminPersona))
    scopes = Column(JSON, default={})  # ABAC scopes: region, environment, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_login = Column(DateTime(timezone=True))
    
    tenant = relationship("Tenant", back_populates="users")
    roles = relationship("Role", secondary="user_roles", back_populates="users")

class Role(Base):
    __tablename__ = "roles"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    
    users = relationship("User", secondary="user_roles", back_populates="roles")
    permissions = relationship("Permission", secondary="role_permissions", back_populates="roles")

class Permission(Base):
    __tablename__ = "permissions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, nullable=False)
    resource = Column(String, nullable=False)
    action = Column(String, nullable=False)
    
    roles = relationship("Role", secondary="role_permissions", back_populates="permissions")

class FeatureFlag(Base):
    __tablename__ = "feature_flags"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    feature_name = Column(String, nullable=False)
    is_enabled = Column(Boolean, default=False)
    config = Column(JSON)

class Subscription(Base):
    __tablename__ = "subscriptions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    plan_version_id = Column(String, ForeignKey("plan_versions.id"))
    status = Column(Enum(SubscriptionStatus), default=SubscriptionStatus.TRIAL)
    seats = Column(Integer, default=1)
    addons = Column(JSON, default=[])
    promotions = Column(JSON, default=[])
    usage = Column(JSON, default={})
    starts_at = Column(DateTime(timezone=True))
    ends_at = Column(DateTime(timezone=True))
    renewal_date = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    tenant = relationship("Tenant", back_populates="subscriptions")
    plan_version = relationship("PlanVersion")

from sqlalchemy import Table
user_roles = Table(
    'user_roles', Base.metadata,
    Column('user_id', String, ForeignKey('users.id')),
    Column('role_id', String, ForeignKey('roles.id'))
)

role_permissions = Table(
    'role_permissions', Base.metadata,
    Column('role_id', String, ForeignKey('roles.id')),
    Column('permission_id', String, ForeignKey('permissions.id'))
)


class PlanVersion(Base):
    __tablename__ = "plan_versions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    version = Column(String, nullable=False)
    features = Column(JSON, default={})
    limits = Column(JSON, default={})
    pricing = Column(JSON, default={})
    meters = Column(JSON, default=[])
    regions = Column(JSON, default=[])
    active_from = Column(DateTime(timezone=True))
    status = Column(String, default="draft")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Promotion(Base):
    __tablename__ = "promotions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)  # percent, fixed, free_months
    value = Column(Numeric(10, 2))
    duration = Column(String)  # 3_months, forever, etc.
    eligibility = Column(Text)  # DSL query
    stacking = Column(String, default="exclusive")
    caps = Column(JSON, default={})
    status = Column(Enum(PromotionStatus), default=PromotionStatus.DRAFT)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True))

class UsageMeter(Base):
    __tablename__ = "usage_meters"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    meter_key = Column(String, nullable=False)  # esign.sent, ai.tokens.used
    value = Column(Integer, default=0)
    period_start = Column(DateTime(timezone=True))
    period_end = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Invoice(Base):
    __tablename__ = "invoices"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    subscription_id = Column(String, ForeignKey("subscriptions.id"))
    amount = Column(Numeric(10, 2), nullable=False)
    tax_amount = Column(Numeric(10, 2), default=0)
    status = Column(Enum(InvoiceStatus), default=InvoiceStatus.DRAFT)
    line_items = Column(JSON, default=[])
    due_date = Column(DateTime(timezone=True))
    paid_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Experiment(Base):
    __tablename__ = "experiments"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    description = Column(Text)
    variants = Column(JSON, default=[])  # A/B/n variants
    audience = Column(JSON, default={})  # targeting rules
    status = Column(Enum(ExperimentStatus), default=ExperimentStatus.DRAFT)
    results = Column(JSON, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    started_at = Column(DateTime(timezone=True))
    ended_at = Column(DateTime(timezone=True))

class ApprovalRequest(Base):
    __tablename__ = "approval_requests"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"))
    requester_id = Column(String, ForeignKey("users.id"), nullable=False)
    action_type = Column(String, nullable=False)  # catalog_change, refund, etc.
    entity_type = Column(String, nullable=False)
    entity_id = Column(String)
    data = Column(JSON, default={})
    required_approvers = Column(JSON, default=[])  # list of personas
    approvals = Column(JSON, default=[])  # list of approver_id, timestamp
    status = Column(String, default="pending")  # pending, approved, rejected
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    approved_at = Column(DateTime(timezone=True))
