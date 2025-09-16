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

class RecurringTransaction(Base):
    __tablename__ = "recurring_transactions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    template_name = Column(String, nullable=False)
    transaction_type = Column(String, nullable=False)  # sale, purchase
    frequency = Column(String, nullable=False)  # monthly, quarterly, annually
    next_date = Column(Date, nullable=False)
    end_date = Column(Date)
    amount = Column(Numeric(15, 2), nullable=False)
    description = Column(Text, nullable=False)
    account_id = Column(String, ForeignKey("ledger_accounts.id"), nullable=False)
    customer_id = Column(String, ForeignKey("clients.id"))
    supplier_id = Column(String, ForeignKey("clients.id"))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class AccrualPrepayment(Base):
    __tablename__ = "accrual_prepayments"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    type = Column(String, nullable=False)  # accrual, prepayment
    description = Column(Text, nullable=False)
    total_amount = Column(Numeric(15, 2), nullable=False)
    remaining_amount = Column(Numeric(15, 2), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    frequency = Column(String, default="monthly")  # monthly, quarterly
    account_id = Column(String, ForeignKey("ledger_accounts.id"), nullable=False)
    original_journal_entry_id = Column(String, ForeignKey("journal_entries.id"))
    is_reversed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class InvoiceTracking(Base):
    __tablename__ = "invoice_tracking"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    invoice_id = Column(String, nullable=False)
    email_sent_at = Column(DateTime(timezone=True))
    email_opened_at = Column(DateTime(timezone=True))
    payment_link_clicked_at = Column(DateTime(timezone=True))
    payment_completed_at = Column(DateTime(timezone=True))
    tracking_token = Column(String, unique=True)
    payment_link_url = Column(String)
    email_recipient = Column(String)

class TransactionCategorizationRule(Base):
    __tablename__ = "transaction_categorization_rules"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    rule_name = Column(String, nullable=False)
    rule_type = Column(String, nullable=False)
    pattern = Column(String, nullable=False)
    target_category = Column(String, nullable=False)
    target_account_id = Column(String, ForeignKey("ledger_accounts.id"))
    priority = Column(Integer, default=100)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class TransactionCategorization(Base):
    __tablename__ = "transaction_categorizations"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    journal_entry_id = Column(String, ForeignKey("journal_entries.id"), nullable=False)
    category = Column(String, nullable=False)
    account_id = Column(String, ForeignKey("ledger_accounts.id"))
    rule_id = Column(String, ForeignKey("transaction_categorization_rules.id"))
    is_manual_override = Column(Boolean, default=False)
    categorized_at = Column(DateTime(timezone=True), server_default=func.now())
