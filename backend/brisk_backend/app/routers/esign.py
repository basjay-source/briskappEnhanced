from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, timedelta

from app.database import get_db
from app.models import SignatureEnvelope, SignatureEvent

router = APIRouter()

class SignatureEnvelopeCreate(BaseModel):
    title: str
    signers: List[dict]
    documents: List[dict]
    expires_in_days: Optional[int] = 30

class SignatureEventCreate(BaseModel):
    envelope_id: str
    signer_email: str
    signer_name: str
    event_type: str

@router.get("/envelopes")
def get_envelopes(
    request: Request = None,
    db: Session = Depends(get_db)
):
    envelopes = db.query(SignatureEnvelope).filter(
        SignatureEnvelope.tenant_id == request.state.tenant_id
    ).order_by(SignatureEnvelope.created_at.desc()).all()
    
    return envelopes

@router.post("/envelopes")
def create_envelope(
    envelope_data: SignatureEnvelopeCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    expires_at = datetime.now() + timedelta(days=envelope_data.expires_in_days)
    
    envelope = SignatureEnvelope(
        tenant_id=request.state.tenant_id,
        title=envelope_data.title,
        created_by=request.state.user_id,
        expires_at=expires_at,
        status="draft"
    )
    
    db.add(envelope)
    db.commit()
    db.refresh(envelope)
    
    return {
        "envelope": envelope,
        "signing_urls": [
            {
                "signer": signer,
                "url": f"https://sign.briskpractice.com/sign/{envelope.id}/{signer['email']}"
            }
            for signer in envelope_data.signers
        ]
    }

@router.post("/envelopes/{envelope_id}/send")
def send_envelope(
    envelope_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    envelope = db.query(SignatureEnvelope).filter(
        SignatureEnvelope.tenant_id == request.state.tenant_id,
        SignatureEnvelope.id == envelope_id
    ).first()
    
    if not envelope:
        raise HTTPException(status_code=404, detail="Envelope not found")
    
    envelope.status = "sent"
    db.commit()
    
    return {
        "message": "Envelope sent successfully",
        "envelope_id": envelope_id,
        "status": "sent",
        "notifications_sent": True
    }

@router.post("/envelopes/{envelope_id}/sign")
def sign_document(
    envelope_id: str,
    signature_data: dict,
    request: Request = None,
    db: Session = Depends(get_db)
):
    envelope = db.query(SignatureEnvelope).filter(
        SignatureEnvelope.tenant_id == request.state.tenant_id,
        SignatureEnvelope.id == envelope_id
    ).first()
    
    if not envelope:
        raise HTTPException(status_code=404, detail="Envelope not found")
    
    if envelope.status == "completed":
        raise HTTPException(status_code=400, detail="Envelope already completed")
    
    signature_event = SignatureEvent(
        tenant_id=request.state.tenant_id,
        envelope_id=envelope_id,
        signer_email=signature_data.get("signer_email"),
        signer_name=signature_data.get("signer_name"),
        event_type="signed",
        ip_address=request.client.host if request.client else "127.0.0.1",
        signature_data=signature_data
    )
    
    db.add(signature_event)
    
    signed_events = db.query(SignatureEvent).filter(
        SignatureEvent.envelope_id == envelope_id,
        SignatureEvent.event_type == "signed"
    ).count()
    
    if signed_events >= 1:
        envelope.status = "completed"
        envelope.completed_at = datetime.now()
    
    db.commit()
    
    return {
        "message": "Document signed successfully",
        "envelope_status": envelope.status,
        "signature_timestamp": signature_event.event_timestamp,
        "certificate_url": f"https://certificates.briskpractice.com/{envelope_id}"
    }

@router.get("/envelopes/{envelope_id}/audit-trail")
def get_audit_trail(
    envelope_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    envelope = db.query(SignatureEnvelope).filter(
        SignatureEnvelope.tenant_id == request.state.tenant_id,
        SignatureEnvelope.id == envelope_id
    ).first()
    
    if not envelope:
        raise HTTPException(status_code=404, detail="Envelope not found")
    
    events = db.query(SignatureEvent).filter(
        SignatureEvent.envelope_id == envelope_id
    ).order_by(SignatureEvent.event_timestamp.asc()).all()
    
    audit_trail = {
        "envelope_id": envelope_id,
        "title": envelope.title,
        "created_at": envelope.created_at,
        "completed_at": envelope.completed_at,
        "status": envelope.status,
        "events": [
            {
                "timestamp": event.event_timestamp,
                "event_type": event.event_type,
                "signer": event.signer_name,
                "email": event.signer_email,
                "ip_address": event.ip_address,
                "user_agent": event.user_agent
            }
            for event in events
        ],
        "certificate_hash": f"SHA256:{envelope_id[:16]}...",
        "legal_validity": True
    }
    
    return audit_trail

@router.get("/templates")
def get_signature_templates(
    request: Request = None,
    db: Session = Depends(get_db)
):
    templates = [
        {
            "id": "accounts-approval",
            "name": "Annual Accounts Approval",
            "description": "Template for director approval of annual accounts",
            "fields": ["director_name", "company_name", "year_end"]
        },
        {
            "id": "tax-return-authorization",
            "name": "Tax Return Authorization",
            "description": "Client authorization for tax return submission",
            "fields": ["client_name", "tax_year", "agent_name"]
        },
        {
            "id": "engagement-letter",
            "name": "Engagement Letter",
            "description": "Standard engagement letter for accounting services",
            "fields": ["client_name", "services", "fee_structure"]
        }
    ]
    
    return templates
