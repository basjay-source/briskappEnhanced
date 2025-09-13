from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class VATReturn(Base):
    __tablename__ = "vat_returns"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    period = Column(String, nullable=False)  # e.g., "Q4 2024"
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=False)
    due_date = Column(Date, nullable=False)
    status = Column(String, default="draft")  # draft, submitted, overdue
    
    net_sales = Column(Numeric(15, 2), default=0)
    vat_on_sales = Column(Numeric(15, 2), default=0)
    vat_on_purchases = Column(Numeric(15, 2), default=0)
    total_vat = Column(Numeric(15, 2), default=0)
    
    box1 = Column(Numeric(15, 2), default=0)  # VAT due on sales and other outputs
    box2 = Column(Numeric(15, 2), default=0)  # VAT due on acquisitions from other EC Member States
    box3 = Column(Numeric(15, 2), default=0)  # Total VAT due (box1 + box2)
    box4 = Column(Numeric(15, 2), default=0)  # VAT reclaimed on purchases and other inputs
    box5 = Column(Numeric(15, 2), default=0)  # Net VAT to be paid to HMRC or reclaimed (box3 - box4)
    box6 = Column(Numeric(15, 2), default=0)  # Total value of sales and all other outputs excluding VAT
    box7 = Column(Numeric(15, 2), default=0)  # Total value of purchases and all other inputs excluding VAT
    box8 = Column(Numeric(15, 2), default=0)  # Total value of all supplies of goods to other EC Member States
    box9 = Column(Numeric(15, 2), default=0)  # Total value of all acquisitions of goods from other EC Member States
    
    mtd_compliant = Column(Boolean, default=True)
    hmrc_submission_id = Column(String)  # HMRC reference after submission
    submitted_date = Column(DateTime(timezone=True))
    
    calculations = Column(JSON)  # Store detailed calculations
    adjustments = Column(JSON)   # Store any manual adjustments
    notes = Column(Text)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    company = relationship("Company")

class VATScheme(Base):
    __tablename__ = "vat_schemes"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    name = Column(String, nullable=False)
    scheme_type = Column(String, nullable=False)  # standard, flat_rate, cash_accounting
    description = Column(Text)
    
    rate = Column(Numeric(5, 2))  # For flat rate scheme
    threshold_annual = Column(Numeric(15, 2))  # Annual turnover threshold
    threshold_quarterly = Column(Numeric(15, 2))  # Quarterly threshold
    
    active = Column(Boolean, default=False)
    start_date = Column(Date)
    end_date = Column(Date)
    
    settings = Column(JSON)  # Store scheme-specific settings
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    company = relationship("Company")

class VATTransaction(Base):
    __tablename__ = "vat_transactions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    vat_return_id = Column(String, ForeignKey("vat_returns.id"), nullable=False)
    
    transaction_date = Column(Date, nullable=False)
    description = Column(String, nullable=False)
    reference = Column(String)
    
    net_amount = Column(Numeric(15, 2), nullable=False)
    vat_amount = Column(Numeric(15, 2), nullable=False)
    gross_amount = Column(Numeric(15, 2), nullable=False)
    vat_rate = Column(Numeric(5, 2), nullable=False)  # e.g., 20.00 for 20%
    
    transaction_type = Column(String, nullable=False)  # sale, purchase, adjustment
    vat_code = Column(String)  # Standard rate, zero rate, exempt, etc.
    category = Column(String)  # Business category for reporting
    
    source_system = Column(String)  # e.g., 'manual', 'bank_feed', 'integration'
    source_reference = Column(String)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    vat_return = relationship("VATReturn")
