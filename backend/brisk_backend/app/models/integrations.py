from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class IntegrationAccount(Base):
    __tablename__ = "integration_accounts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    provider = Column(String, nullable=False)
    account_id = Column(String, nullable=False)
    account_name = Column(String)
    credentials = Column(JSON)
    last_sync = Column(DateTime(timezone=True))
    sync_status = Column(String, default="active")
    is_active = Column(Boolean, default=True)

class BankConnection(Base):
    __tablename__ = "bank_connections"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    bank_name = Column(String, nullable=False)
    account_number = Column(String)
    sort_code = Column(String)
    iban = Column(String)
    provider = Column(String, nullable=False)
    connection_id = Column(String, nullable=False)
    last_transaction_date = Column(Date)
    balance = Column(Numeric(15, 2))
    currency = Column(String, default="GBP")
    is_active = Column(Boolean, default=True)

class EcommerceConnection(Base):
    __tablename__ = "ecommerce_connections"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    platform = Column(String, nullable=False)
    store_name = Column(String)
    api_credentials = Column(JSON)
    last_sync = Column(DateTime(timezone=True))
    sync_settings = Column(JSON)
    is_active = Column(Boolean, default=True)
