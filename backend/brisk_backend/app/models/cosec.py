from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class CompanyFiling(Base):
    __tablename__ = "company_filings"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    filing_type = Column(String, nullable=False)
    form_type = Column(String, nullable=False)
    due_date = Column(Date, nullable=False)
    submission_date = Column(Date)
    status = Column(String, default="pending")
    companies_house_reference = Column(String)
    filing_data = Column(JSON)
    
    company = relationship("Company")

class PSC(Base):
    __tablename__ = "pscs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    name = Column(String, nullable=False)
    date_of_birth = Column(Date)
    nationality = Column(String)
    address = Column(JSON)
    nature_of_control = Column(JSON)
    notified_date = Column(Date)
    ceased_date = Column(Date)
    is_active = Column(Boolean, default=True)

class Officer(Base):
    __tablename__ = "officers"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    title = Column(String)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    officer_role = Column(String, nullable=False)
    appointed_date = Column(Date, nullable=False)
    resigned_date = Column(Date)
    address = Column(JSON)
    date_of_birth = Column(Date)
    nationality = Column(String)
    occupation = Column(String)
    is_active = Column(Boolean, default=True)

class ShareClass(Base):
    __tablename__ = "share_classes"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    class_name = Column(String, nullable=False)
    currency = Column(String, default="GBP")
    nominal_value = Column(Numeric(10, 4), nullable=False)
    rights = Column(JSON)
    total_authorized = Column(Integer)
    total_issued = Column(Integer, default=0)
    
    allotments = relationship("ShareAllotment", back_populates="share_class")

class ShareAllotment(Base):
    __tablename__ = "share_allotments"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    share_class_id = Column(String, ForeignKey("share_classes.id"), nullable=False)
    allottee_name = Column(String, nullable=False)
    number_of_shares = Column(Integer, nullable=False)
    allotment_date = Column(Date, nullable=False)
    consideration = Column(Numeric(15, 2))
    certificate_number = Column(String)
    
    share_class = relationship("ShareClass", back_populates="allotments")
