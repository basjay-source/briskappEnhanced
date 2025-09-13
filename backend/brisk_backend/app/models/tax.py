from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class TaxReturnCT(Base):
    __tablename__ = "tax_returns_ct"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=False)
    utr = Column(String)
    status = Column(String, default="draft")
    profit_before_tax = Column(Numeric(15, 2))
    taxable_profit = Column(Numeric(15, 2))
    corporation_tax = Column(Numeric(15, 2))
    computations = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    rnd_claims = relationship("RnDClaim", back_populates="tax_return")

class TaxReturnSA(Base):
    __tablename__ = "tax_returns_sa"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False)
    tax_year = Column(String, nullable=False)
    utr = Column(String)
    status = Column(String, default="draft")
    employment_income = Column(Numeric(15, 2), default=0)
    self_employment_income = Column(Numeric(15, 2), default=0)
    property_income = Column(Numeric(15, 2), default=0)
    dividend_income = Column(Numeric(15, 2), default=0)
    capital_gains = Column(Numeric(15, 2), default=0)
    total_tax_due = Column(Numeric(15, 2))
    computations = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RnDClaim(Base):
    __tablename__ = "rnd_claims"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    tax_return_id = Column(String, ForeignKey("tax_returns_ct.id"), nullable=False)
    claim_type = Column(String, nullable=False)
    qualifying_expenditure = Column(Numeric(15, 2), nullable=False)
    enhancement_rate = Column(Numeric(5, 2), default=130)
    credit_rate = Column(Numeric(5, 2))
    total_relief = Column(Numeric(15, 2))
    project_details = Column(JSON)
    evidence_files = Column(JSON)
    
    tax_return = relationship("TaxReturnCT", back_populates="rnd_claims")
