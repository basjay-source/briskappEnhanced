from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class Client(Base):
    __tablename__ = "clients"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    name = Column(String, nullable=False)
    company_number = Column(String)
    vat_number = Column(String)
    address = Column(JSON)
    contact_details = Column(JSON)
    industry_sector = Column(String)
    year_end = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    companies = relationship("Company", back_populates="client")

class Company(Base):
    __tablename__ = "companies"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"))
    name = Column(String, nullable=False)
    company_number = Column(String, unique=True)
    incorporation_date = Column(DateTime)
    company_type = Column(String)
    sic_codes = Column(JSON)
    registered_address = Column(JSON)
    is_active = Column(Boolean, default=True)
    
    client = relationship("Client", back_populates="companies")
    entity_groups = relationship("EntityGroup", secondary="entity_group_companies", back_populates="companies")

class EntityGroup(Base):
    __tablename__ = "entity_groups"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    name = Column(String, nullable=False)
    parent_company_id = Column(String, ForeignKey("companies.id"))
    consolidation_method = Column(String, default="full")
    
    companies = relationship("Company", secondary="entity_group_companies", back_populates="entity_groups")

from sqlalchemy import Table
entity_group_companies = Table(
    'entity_group_companies', Base.metadata,
    Column('entity_group_id', String, ForeignKey('entity_groups.id')),
    Column('company_id', String, ForeignKey('companies.id'))
)
