from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class AMLCase(Base):
    __tablename__ = "aml_cases"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False)
    case_type = Column(String, nullable=False)
    status = Column(String, default="open")
    risk_score = Column(Integer, default=0)
    risk_level = Column(String, default="low")
    opened_date = Column(Date, nullable=False)
    closed_date = Column(Date)
    assigned_to = Column(String, ForeignKey("users.id"))
    notes = Column(Text)
    
    risk_assessments = relationship("RiskAssessment", back_populates="aml_case")
    kyc_checks = relationship("KYCCheck", back_populates="aml_case")

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
    total_score = Column(Integer, default=0)
    risk_factors = Column(JSON)
    
    aml_case = relationship("AMLCase", back_populates="risk_assessments")

class KYCCheck(Base):
    __tablename__ = "kyc_checks"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    aml_case_id = Column(String, ForeignKey("aml_cases.id"), nullable=False)
    check_type = Column(String, nullable=False)
    status = Column(String, default="pending")
    provider = Column(String)
    reference = Column(String)
    result = Column(JSON)
    completed_at = Column(DateTime(timezone=True))
    
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
    expiry_date = Column(Date)
    file_path = Column(String)
    verification_status = Column(String, default="pending")
    
    kyc_check = relationship("KYCCheck", back_populates="documents")

class SAR(Base):
    __tablename__ = "sars"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False)
    reference_number = Column(String, unique=True)
    submission_date = Column(Date, nullable=False)
    reason = Column(Text, nullable=False)
    amount = Column(Numeric(15, 2))
    status = Column(String, default="submitted")
    response_received = Column(Boolean, default=False)
