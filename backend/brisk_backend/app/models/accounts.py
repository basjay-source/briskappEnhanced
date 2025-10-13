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

class AccountsProductionClient(Base):
    __tablename__ = "accounts_production_clients"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    registration_number = Column(String)
    incorporation_date = Column(Date)
    vat_number = Column(String)
    utr = Column(String)
    
    year_end = Column(Date, nullable=False)
    accounts_status = Column(String, default="not-started")
    last_accounts = Column(Date)
    next_due = Column(Date)
    frs_standard = Column(String, default="FRS 102")
    
    contact_person = Column(String)
    email = Column(String)
    phone = Column(String)
    website = Column(String)
    
    address_line1 = Column(String)
    address_line2 = Column(String)
    city = Column(String)
    county = Column(String)
    postcode = Column(String)
    country = Column(String, default="United Kingdom")
    
    industry = Column(String)
    turnover = Column(Numeric(15, 2))
    number_of_employees = Column(Integer)
    
    audit_required = Column(Boolean, default=False)
    dormant = Column(Boolean, default=False)
    
    annual_fee = Column(Numeric(10, 2))
    engagement_letter_signed = Column(Boolean, default=False)
    engagement_letter_date = Column(Date)
    
    notes = Column(Text)
    tags = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class YearEndAdjustment(Base):
    __tablename__ = "year_end_adjustments"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    adjustment_type = Column(String, nullable=False)
    reference = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    adjustment_date = Column(Date, nullable=False)
    status = Column(String, default="draft")
    total_debit = Column(Numeric(15, 2), default=0)
    total_credit = Column(Numeric(15, 2), default=0)
    created_by = Column(String)
    approved_by = Column(String)
    approved_date = Column(Date)
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    journal_lines = relationship("AdjustmentJournalLine", back_populates="adjustment", cascade="all, delete-orphan")

class AdjustmentJournalLine(Base):
    __tablename__ = "adjustment_journal_lines"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    adjustment_id = Column(String, ForeignKey("year_end_adjustments.id"), nullable=False)
    account_code = Column(String, nullable=False)
    account_name = Column(String, nullable=False)
    description = Column(Text)
    debit_amount = Column(Numeric(15, 2), default=0)
    credit_amount = Column(Numeric(15, 2), default=0)
    line_order = Column(Integer, default=0)
    
    adjustment = relationship("YearEndAdjustment", back_populates="journal_lines")

class ChartOfAccount(Base):
    __tablename__ = "chart_of_accounts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    code = Column(String, nullable=False)
    name = Column(String, nullable=False)
    group_number = Column(String)
    category = Column(String)
    is_system = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
