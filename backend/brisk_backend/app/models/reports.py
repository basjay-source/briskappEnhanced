from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, ForeignKey
from sqlalchemy.types import DECIMAL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class GeneralLedger(Base):
    __tablename__ = "general_ledger"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    account_code = Column(String, nullable=False)
    account_name = Column(String, nullable=False)
    transaction_date = Column(DateTime, nullable=False)
    description = Column(Text)
    reference = Column(String)
    debit_amount = Column(DECIMAL(15, 2), default=0)
    credit_amount = Column(DECIMAL(15, 2), default=0)
    running_balance = Column(DECIMAL(15, 2), default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class NominalLedger(Base):
    __tablename__ = "nominal_ledger"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    nominal_code = Column(String, nullable=False)
    nominal_name = Column(String, nullable=False)
    category = Column(String, nullable=False)  # Assets, Liabilities, Income, Expenses
    subcategory = Column(String)
    opening_balance = Column(DECIMAL(15, 2), default=0)
    current_balance = Column(DECIMAL(15, 2), default=0)
    ytd_movement = Column(DECIMAL(15, 2), default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class FinancialStatement(Base):
    __tablename__ = "financial_statements"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    statement_type = Column(String, nullable=False)  # P&L, Balance Sheet, Cash Flow
    period_start = Column(DateTime, nullable=False)
    period_end = Column(DateTime, nullable=False)
    statement_data = Column(Text)  # JSON data
    generated_at = Column(DateTime, default=datetime.utcnow)
    generated_by = Column(String)

class ManagementReport(Base):
    __tablename__ = "management_reports"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    report_type = Column(String, nullable=False)  # Monthly Pack, Budget vs Actual, etc.
    report_name = Column(String, nullable=False)
    period_start = Column(DateTime, nullable=False)
    period_end = Column(DateTime, nullable=False)
    report_data = Column(Text)  # JSON data
    generated_at = Column(DateTime, default=datetime.utcnow)
    generated_by = Column(String)

class ComplianceReport(Base):
    __tablename__ = "compliance_reports"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    report_type = Column(String, nullable=False)  # VAT Return, Corporation Tax, etc.
    compliance_period = Column(String, nullable=False)
    due_date = Column(DateTime)
    submission_date = Column(DateTime)
    status = Column(String, default="pending")  # pending, submitted, accepted, rejected
    report_data = Column(Text)  # JSON data
    created_at = Column(DateTime, default=datetime.utcnow)
