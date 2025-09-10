from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class FinancialStatement(Base):
    __tablename__ = "financial_statements"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    statement_type = Column(String, nullable=False)
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=False)
    status = Column(String, default="draft")
    data = Column(JSON)
    ixbrl_content = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    disclosures = relationship("NoteDisclosure", back_populates="statement")

class NoteDisclosure(Base):
    __tablename__ = "note_disclosures"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    statement_id = Column(String, ForeignKey("financial_statements.id"), nullable=False)
    note_number = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    is_required = Column(Boolean, default=False)
    materiality_threshold = Column(Numeric(15, 2))
    
    statement = relationship("FinancialStatement", back_populates="disclosures")
