from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class AdviceReport(Base):
    __tablename__ = "advice_reports"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"))
    client_id = Column(String, ForeignKey("clients.id"))
    adviser_type = Column(String, nullable=False)
    report_type = Column(String, nullable=False)
    executive_summary = Column(Text)
    actions = Column(JSON)
    technical_appendix = Column(Text)
    confidence_score = Column(Numeric(3, 2))
    generated_at = Column(DateTime(timezone=True), server_default=func.now())
    generated_by = Column(String, ForeignKey("users.id"))
    
    evidence = relationship("Evidence", back_populates="report")
    citations = relationship("Citation", back_populates="report")
    scenarios = relationship("Scenario", back_populates="report")

class Evidence(Base):
    __tablename__ = "evidence"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    report_id = Column(String, ForeignKey("advice_reports.id"), nullable=False)
    evidence_type = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    source_data = Column(JSON)
    weight = Column(Numeric(3, 2), default=1.0)
    
    report = relationship("AdviceReport", back_populates="evidence")

class Citation(Base):
    __tablename__ = "citations"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    report_id = Column(String, ForeignKey("advice_reports.id"), nullable=False)
    source_type = Column(String, nullable=False)
    source_reference = Column(String, nullable=False)
    section = Column(String)
    url = Column(String)
    relevance_score = Column(Numeric(3, 2))
    
    report = relationship("AdviceReport", back_populates="citations")

class Scenario(Base):
    __tablename__ = "scenarios"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    report_id = Column(String, ForeignKey("advice_reports.id"), nullable=False)
    scenario_name = Column(String, nullable=False)
    assumptions = Column(JSON, nullable=False)
    projected_impact = Column(JSON)
    risk_factors = Column(JSON)
    recommendations = Column(Text)
    
    report = relationship("AdviceReport", back_populates="scenarios")
