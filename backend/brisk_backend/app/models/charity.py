from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class CharityAccount(Base):
    __tablename__ = "charity_accounts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"), nullable=False)
    name = Column(String, nullable=False)
    registration_number = Column(String, nullable=False)
    charity_type = Column(String, nullable=False)  # charity, academy, trust
    status = Column(String, default="active")  # active, dormant, pending
    year_end = Column(Date, nullable=False)
    total_income = Column(Numeric(15, 2), default=0)
    total_expenditure = Column(Numeric(15, 2), default=0)
    net_assets = Column(Numeric(15, 2), default=0)
    compliance_score = Column(Integer, default=0)
    last_filing = Column(Date)
    next_due = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    client = relationship("Client")
    funds = relationship("CharityFund", back_populates="charity")
    trustees = relationship("Trustee", back_populates="charity")

class CharityFund(Base):
    __tablename__ = "charity_funds"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    charity_id = Column(String, ForeignKey("charity_accounts.id"), nullable=False)
    name = Column(String, nullable=False)
    fund_type = Column(String, nullable=False)  # unrestricted, restricted, endowment
    balance = Column(Numeric(15, 2), default=0)
    purpose = Column(Text)
    restrictions = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    charity = relationship("CharityAccount", back_populates="funds")
    movements = relationship("FundMovement", back_populates="fund")

class FundMovement(Base):
    __tablename__ = "fund_movements"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    fund_id = Column(String, ForeignKey("charity_funds.id"), nullable=False)
    transaction_date = Column(Date, nullable=False)
    description = Column(Text, nullable=False)
    amount = Column(Numeric(15, 2), nullable=False)
    movement_type = Column(String, nullable=False)  # income, expenditure, transfer
    reference = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    fund = relationship("CharityFund", back_populates="movements")

class Trustee(Base):
    __tablename__ = "trustees"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    charity_id = Column(String, ForeignKey("charity_accounts.id"), nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    appointment_date = Column(Date, nullable=False)
    resignation_date = Column(Date)
    status = Column(String, default="active")  # active, resigned
    address = Column(Text)
    occupation = Column(String)
    other_trusteeships = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    charity = relationship("CharityAccount", back_populates="trustees")
