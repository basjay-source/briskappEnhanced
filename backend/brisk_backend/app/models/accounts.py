from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class LedgerAccount(Base):
    __tablename__ = "ledger_accounts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    code = Column(String, nullable=False)
    name = Column(String, nullable=False)
    account_type = Column(String, nullable=False)
    category = Column(String)
    parent_account_id = Column(String, ForeignKey("ledger_accounts.id"))
    is_active = Column(Boolean, default=True)
    
    journal_entries = relationship("JournalEntry", back_populates="account")

class JournalEntry(Base):
    __tablename__ = "journal_entries"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    account_id = Column(String, ForeignKey("ledger_accounts.id"), nullable=False)
    transaction_date = Column(Date, nullable=False)
    description = Column(Text, nullable=False)
    reference = Column(String)
    debit_amount = Column(Numeric(15, 2), default=0)
    credit_amount = Column(Numeric(15, 2), default=0)
    currency = Column(String, default="GBP")
    exchange_rate = Column(Numeric(10, 6), default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    account = relationship("LedgerAccount", back_populates="journal_entries")

class TrialBalance(Base):
    __tablename__ = "trial_balances"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    period_end = Column(Date, nullable=False)
    account_code = Column(String, nullable=False)
    account_name = Column(String, nullable=False)
    debit_balance = Column(Numeric(15, 2), default=0)
    credit_balance = Column(Numeric(15, 2), default=0)
    imported_at = Column(DateTime(timezone=True), server_default=func.now())

class FXRate(Base):
    __tablename__ = "fx_rates"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    from_currency = Column(String, nullable=False)
    to_currency = Column(String, nullable=False)
    rate = Column(Numeric(10, 6), nullable=False)
    rate_date = Column(Date, nullable=False)
    source = Column(String, default="manual")

class ConsolidationRule(Base):
    __tablename__ = "consolidation_rules"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    entity_group_id = Column(String, ForeignKey("entity_groups.id"), nullable=False)
    rule_type = Column(String, nullable=False)
    source_account = Column(String)
    target_account = Column(String)
    elimination_percentage = Column(Numeric(5, 2), default=100)
    is_active = Column(Boolean, default=True)
