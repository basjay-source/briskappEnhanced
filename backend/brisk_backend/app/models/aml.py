from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid
import enum

class RiskLevel(enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class AMLCaseStatus(enum.Enum):
    OPEN = "open"
    UNDER_REVIEW = "under_review"
    ENHANCED_DD = "enhanced_dd"
    APPROVED = "approved"
    REJECTED = "rejected"
    CLOSED = "closed"

class KYCStatus(enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    PENDING_DOCUMENTS = "pending_documents"
    COMPLETE = "complete"
    FAILED = "failed"

class ScreeningType(enum.Enum):
    PEP = "pep"
    SANCTIONS = "sanctions"
    ADVERSE_MEDIA = "adverse_media"
    WATCHLIST = "watchlist"

class DocumentVerificationStatus(enum.Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    FAILED = "failed"
    EXPIRED = "expired"

class SARStatus(enum.Enum):
    DRAFT = "draft"
    SUBMITTED = "submitted"
    ACKNOWLEDGED = "acknowledged"
    UNDER_REVIEW = "under_review"
    CLOSED = "closed"

class AMLCase(Base):
    __tablename__ = "aml_cases"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False)
    case_type = Column(String, nullable=False)
    status = Column(Enum(AMLCaseStatus), default=AMLCaseStatus.OPEN)
    risk_score = Column(Integer, default=0)
    risk_level = Column(Enum(RiskLevel), default=RiskLevel.LOW)
    opened_date = Column(Date, nullable=False)
    closed_date = Column(Date)
    assigned_to = Column(String, ForeignKey("users.id"))
    notes = Column(Text)
    ai_insights = Column(JSON, default={})
    monitoring_flags = Column(JSON, default=[])
    last_reviewed = Column(DateTime(timezone=True))
    next_review_due = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    risk_assessments = relationship("RiskAssessment", back_populates="aml_case")
    kyc_checks = relationship("KYCCheck", back_populates="aml_case")
    screenings = relationship("Screening", back_populates="aml_case")
    ubo_mappings = relationship("UBOMapping", back_populates="aml_case")
    monitoring_alerts = relationship("MonitoringAlert", back_populates="aml_case")

class RiskAssessment(Base):
    __tablename__ = "risk_assessments"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    aml_case_id = Column(String, ForeignKey("aml_cases.id"), nullable=False)
    assessment_date = Column(Date, nullable=False)
    jurisdiction_risk = Column(Integer, default=0)
    sector_risk = Column(Integer, default=0)
    pep_risk = Column(Integer, default=0)
    sanctions_risk = Column(Integer, default=0)
    ownership_complexity = Column(Integer, default=0)
    transaction_risk = Column(Integer, default=0)
    adverse_media_risk = Column(Integer, default=0)
    total_score = Column(Integer, default=0)
    risk_level = Column(Enum(RiskLevel), default=RiskLevel.LOW)
    risk_factors = Column(JSON, default=[])
    ai_explanation = Column(Text)
    recommendations = Column(JSON, default=[])
    assessor_id = Column(String, ForeignKey("users.id"))
    approved_by = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    aml_case = relationship("AMLCase", back_populates="risk_assessments")

class KYCCheck(Base):
    __tablename__ = "kyc_checks"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    aml_case_id = Column(String, ForeignKey("aml_cases.id"), nullable=False)
    check_type = Column(String, nullable=False)
    status = Column(Enum(KYCStatus), default=KYCStatus.PENDING)
    provider = Column(String)
    reference = Column(String)
    result = Column(JSON, default={})
    confidence_score = Column(Numeric(3, 2))
    liveness_check = Column(Boolean, default=False)
    biometric_match = Column(Boolean, default=False)
    fraud_indicators = Column(JSON, default=[])
    completed_at = Column(DateTime(timezone=True))
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    aml_case = relationship("AMLCase", back_populates="kyc_checks")
    documents = relationship("IdentityDocument", back_populates="kyc_check")

class IdentityDocument(Base):
    __tablename__ = "identity_documents"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    kyc_check_id = Column(String, ForeignKey("kyc_checks.id"), nullable=False)
    document_type = Column(String, nullable=False)
    document_number = Column(String)
    issuing_country = Column(String)
    issuing_authority = Column(String)
    issue_date = Column(Date)
    expiry_date = Column(Date)
    file_path = Column(String)
    file_hash = Column(String)
    verification_status = Column(Enum(DocumentVerificationStatus), default=DocumentVerificationStatus.PENDING)
    ocr_data = Column(JSON, default={})
    fraud_checks = Column(JSON, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    kyc_check = relationship("KYCCheck", back_populates="documents")

class SAR(Base):
    __tablename__ = "sars"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False)
    aml_case_id = Column(String, ForeignKey("aml_cases.id"))
    reference_number = Column(String, unique=True)
    submission_date = Column(Date, nullable=False)
    reason = Column(Text, nullable=False)
    amount = Column(Numeric(15, 2))
    currency = Column(String, default="GBP")
    status = Column(Enum(SARStatus), default=SARStatus.DRAFT)
    response_received = Column(Boolean, default=False)
    response_date = Column(Date)
    response_details = Column(Text)
    filed_by = Column(String, ForeignKey("users.id"))
    approved_by = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Screening(Base):
    __tablename__ = "screenings"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    aml_case_id = Column(String, ForeignKey("aml_cases.id"), nullable=False)
    screening_type = Column(Enum(ScreeningType), nullable=False)
    entity_name = Column(String, nullable=False)
    entity_type = Column(String)
    date_of_birth = Column(Date)
    nationality = Column(String)
    screening_date = Column(DateTime(timezone=True), server_default=func.now())
    provider = Column(String)
    reference = Column(String)
    matches_found = Column(Integer, default=0)
    results = Column(JSON, default=[])
    false_positive = Column(Boolean, default=False)
    reviewed_by = Column(String, ForeignKey("users.id"))
    review_notes = Column(Text)
    next_screening_due = Column(Date)
    
    aml_case = relationship("AMLCase", back_populates="screenings")

class UBOMapping(Base):
    __tablename__ = "ubo_mappings"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    aml_case_id = Column(String, ForeignKey("aml_cases.id"), nullable=False)
    entity_name = Column(String, nullable=False)
    entity_type = Column(String)
    ownership_percentage = Column(Numeric(5, 2))
    control_type = Column(String)
    parent_entity_id = Column(String, ForeignKey("ubo_mappings.id"))
    level = Column(Integer, default=1)
    is_ultimate_beneficial_owner = Column(Boolean, default=False)
    verification_status = Column(String, default="pending")
    verification_documents = Column(JSON, default=[])
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    aml_case = relationship("AMLCase", back_populates="ubo_mappings")
    children = relationship("UBOMapping", remote_side=[parent_entity_id])

class MonitoringAlert(Base):
    __tablename__ = "monitoring_alerts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    aml_case_id = Column(String, ForeignKey("aml_cases.id"), nullable=False)
    alert_type = Column(String, nullable=False)
    severity = Column(String, default="medium")
    title = Column(String, nullable=False)
    description = Column(Text)
    trigger_data = Column(JSON, default={})
    status = Column(String, default="open")
    assigned_to = Column(String, ForeignKey("users.id"))
    resolved_at = Column(DateTime(timezone=True))
    resolution_notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    aml_case = relationship("AMLCase", back_populates="monitoring_alerts")

class ComplianceRule(Base):
    __tablename__ = "compliance_rules"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    rule_name = Column(String, nullable=False)
    rule_type = Column(String, nullable=False)
    conditions = Column(JSON, default={})
    actions = Column(JSON, default=[])
    is_active = Column(Boolean, default=True)
    priority = Column(Integer, default=1)
    created_by = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
