from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class PayrollEmployee(Base):
    __tablename__ = "payroll_employees"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    employee_number = Column(String, nullable=False)
    ni_number = Column(String)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    date_of_birth = Column(Date)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    salary = Column(Numeric(10, 2))
    tax_code = Column(String, default="1257L")
    ni_category = Column(String, default="A")
    pension_scheme_id = Column(String, ForeignKey("pension_schemes.id"))
    is_active = Column(Boolean, default=True)
    
    payslips = relationship("Payslip", back_populates="employee")
    pension_scheme = relationship("PensionScheme", back_populates="employees")

class PayRun(Base):
    __tablename__ = "pay_runs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    pay_period_start = Column(Date, nullable=False)
    pay_period_end = Column(Date, nullable=False)
    pay_date = Column(Date, nullable=False)
    status = Column(String, default="draft")
    total_gross_pay = Column(Numeric(15, 2))
    total_tax = Column(Numeric(15, 2))
    total_ni = Column(Numeric(15, 2))
    total_net_pay = Column(Numeric(15, 2))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    payslips = relationship("Payslip", back_populates="pay_run")

class Payslip(Base):
    __tablename__ = "payslips"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    employee_id = Column(String, ForeignKey("payroll_employees.id"), nullable=False)
    pay_run_id = Column(String, ForeignKey("pay_runs.id"), nullable=False)
    gross_pay = Column(Numeric(10, 2), nullable=False)
    tax_deducted = Column(Numeric(10, 2), default=0)
    ni_deducted = Column(Numeric(10, 2), default=0)
    pension_deducted = Column(Numeric(10, 2), default=0)
    other_deductions = Column(Numeric(10, 2), default=0)
    net_pay = Column(Numeric(10, 2), nullable=False)
    ytd_gross = Column(Numeric(15, 2))
    ytd_tax = Column(Numeric(15, 2))
    ytd_ni = Column(Numeric(15, 2))
    
    employee = relationship("PayrollEmployee", back_populates="payslips")
    pay_run = relationship("PayRun", back_populates="payslips")

class PensionScheme(Base):
    __tablename__ = "pension_schemes"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    scheme_name = Column(String, nullable=False)
    provider_name = Column(String)
    employee_contribution_rate = Column(Numeric(5, 2), default=5.0)
    employer_contribution_rate = Column(Numeric(5, 2), default=3.0)
    is_auto_enrolment = Column(Boolean, default=True)
    
    employees = relationship("PayrollEmployee", back_populates="pension_scheme")

class CISStatement(Base):
    __tablename__ = "cis_statements"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    contractor_utr = Column(String)
    subcontractor_utr = Column(String)
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=False)
    gross_payment = Column(Numeric(15, 2), nullable=False)
    deduction_rate = Column(Numeric(5, 2), default=20.0)
    deduction_amount = Column(Numeric(15, 2))
    net_payment = Column(Numeric(15, 2))
