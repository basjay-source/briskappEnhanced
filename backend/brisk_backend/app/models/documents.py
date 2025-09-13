from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Numeric, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    client_id = Column(String, ForeignKey("clients.id"))
    company_id = Column(String, ForeignKey("companies.id"))
    name = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_size = Column(Integer)
    file_path = Column(String, nullable=False)
    category = Column(String)
    tags = Column(JSON)
    ocr_content = Column(Text)
    uploaded_by = Column(String, ForeignKey("users.id"))
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    is_confidential = Column(Boolean, default=False)

class SignatureEnvelope(Base):
    __tablename__ = "signature_envelopes"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    title = Column(String, nullable=False)
    status = Column(String, default="draft")
    created_by = Column(String, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
    expires_at = Column(DateTime(timezone=True))
    
    events = relationship("SignatureEvent", back_populates="envelope")

class SignatureEvent(Base):
    __tablename__ = "signature_events"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    envelope_id = Column(String, ForeignKey("signature_envelopes.id"), nullable=False)
    signer_email = Column(String, nullable=False)
    signer_name = Column(String, nullable=False)
    event_type = Column(String, nullable=False)
    event_timestamp = Column(DateTime(timezone=True), server_default=func.now())
    ip_address = Column(String)
    user_agent = Column(String)
    signature_data = Column(JSON)
    
    envelope = relationship("SignatureEnvelope", back_populates="events")
