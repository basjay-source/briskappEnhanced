from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
import json

from ..database import get_db
from ..auth import get_current_user
from ..models import (
    User, Client, Engagement, Binder, BinderTab, Document, DocumentVersion,
    ConversionJob, OCRResult, ESignEnvelope, DocumentTemplate, DocumentShare,
    RetentionPolicy, LegalHold, DocumentPack, DocumentType, DocumentStatus,
    ConversionStatus, ESignStatus
)

router = APIRouter(prefix="/document-hub", tags=["document-hub"])

@router.get("/dashboard")
async def get_dashboard_overview(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    total_documents = db.query(Document).filter(
        Document.tenant_id == current_user.tenant_id
    ).count()
    
    pending_ocr = db.query(Document).filter(
        Document.tenant_id == current_user.tenant_id,
        Document.status == DocumentStatus.PROCESSING
    ).count()
    
    conversion_failures = db.query(ConversionJob).filter(
        ConversionJob.tenant_id == current_user.tenant_id,
        ConversionJob.status == ConversionStatus.FAILED
    ).count()
    
    pending_signatures = db.query(ESignEnvelope).filter(
        ESignEnvelope.tenant_id == current_user.tenant_id,
        ESignEnvelope.status.in_([ESignStatus.SENT, ESignStatus.VIEWED])
    ).count()
    
    storage_usage = {
        "total_size_gb": 125.6,
        "used_size_gb": 98.2,
        "usage_percentage": 78
    }
    
    recent_activity = [
        {
            "id": 1,
            "action": "Document uploaded",
            "document": "Invoice_2024_001.pdf",
            "user": "John Smith",
            "timestamp": "2024-09-20T10:30:00Z"
        },
        {
            "id": 2,
            "action": "OCR completed",
            "document": "Bank_Statement_Sep.pdf",
            "user": "System",
            "timestamp": "2024-09-20T10:15:00Z"
        }
    ]
    
    return {
        "total_documents": total_documents,
        "pending_ocr": pending_ocr,
        "conversion_failures": conversion_failures,
        "pending_signatures": pending_signatures,
        "storage_usage": storage_usage,
        "recent_activity": recent_activity
    }

@router.get("/clients")
async def get_clients(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    clients = db.query(Client).filter(
        Client.tenant_id == current_user.tenant_id,
        Client.is_active == True
    ).all()
    
    return [
        {
            "id": client.id,
            "name": client.name,
            "client_code": client.client_code,
            "contact_email": client.contact_email,
            "document_count": len(client.documents),
            "created_at": client.created_at
        }
        for client in clients
    ]

@router.post("/clients")
async def create_client(
    name: str = Form(...),
    client_code: str = Form(...),
    contact_email: str = Form(None),
    contact_phone: str = Form(None),
    address: str = Form(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    client = Client(
        tenant_id=current_user.tenant_id,
        name=name,
        client_code=client_code,
        contact_email=contact_email,
        contact_phone=contact_phone,
        address=address
    )
    
    db.add(client)
    db.commit()
    db.refresh(client)
    
    return {"id": client.id, "message": "Client created successfully"}

@router.get("/binders")
async def get_binders(
    client_id: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Binder).filter(Binder.tenant_id == current_user.tenant_id)
    
    if client_id:
        query = query.filter(Binder.client_id == client_id)
    
    binders = query.all()
    
    return [
        {
            "id": binder.id,
            "name": binder.name,
            "binder_type": binder.binder_type,
            "client_name": binder.client.name if binder.client else None,
            "document_count": len(binder.documents),
            "is_locked": binder.is_locked,
            "created_at": binder.created_at
        }
        for binder in binders
    ]

@router.post("/binders")
async def create_binder(
    name: str = Form(...),
    client_id: int = Form(...),
    binder_type: str = Form("general"),
    engagement_id: Optional[int] = Form(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    binder = Binder(
        tenant_id=current_user.tenant_id,
        client_id=client_id,
        engagement_id=engagement_id,
        name=name,
        binder_type=binder_type,
        structure={"tabs": []}
    )
    
    db.add(binder)
    db.commit()
    db.refresh(binder)
    
    return {"id": binder.id, "message": "Binder created successfully"}

@router.get("/documents")
async def get_documents(
    client_id: Optional[int] = None,
    binder_id: Optional[int] = None,
    document_type: Optional[str] = None,
    search: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Document).filter(Document.tenant_id == current_user.tenant_id)
    
    if client_id:
        query = query.filter(Document.client_id == client_id)
    if binder_id:
        query = query.filter(Document.binder_id == binder_id)
    if document_type:
        query = query.filter(Document.document_type == document_type)
    if search:
        query = query.filter(Document.filename.contains(search))
    
    documents = query.order_by(Document.created_at.desc()).limit(100).all()
    
    return [
        {
            "id": doc.id,
            "filename": doc.filename,
            "document_type": doc.document_type.value if doc.document_type else None,
            "status": doc.status.value,
            "file_size": doc.file_size,
            "client_name": doc.client.name if doc.client else None,
            "binder_name": doc.binder.name if doc.binder else None,
            "tags": doc.tags or [],
            "is_favorite": doc.is_favorite,
            "created_at": doc.created_at,
            "updated_at": doc.updated_at
        }
        for doc in documents
    ]

@router.post("/documents/upload")
async def upload_document(
    file: UploadFile = File(...),
    client_id: int = Form(...),
    binder_id: Optional[int] = Form(None),
    document_type: str = Form("other"),
    tags: str = Form("[]"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    import os
    import hashlib
    
    upload_dir = f"/tmp/documents/{current_user.tenant_id}"
    os.makedirs(upload_dir, exist_ok=True)
    
    file_path = f"{upload_dir}/{file.filename}"
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    checksum = hashlib.md5(content).hexdigest()
    
    try:
        parsed_tags = json.loads(tags)
    except:
        parsed_tags = []
    
    document = Document(
        tenant_id=current_user.tenant_id,
        client_id=client_id,
        binder_id=binder_id,
        filename=file.filename,
        original_filename=file.filename,
        file_path=file_path,
        file_size=len(content),
        mime_type=file.content_type,
        document_type=DocumentType(document_type),
        checksum=checksum,
        tags=parsed_tags,
        uploaded_by=current_user.id,
        status=DocumentStatus.COMPLETED
    )
    
    db.add(document)
    db.commit()
    db.refresh(document)
    
    return {"id": document.id, "message": "Document uploaded successfully"}

@router.get("/conversions")
async def get_conversion_jobs(
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(ConversionJob).filter(ConversionJob.tenant_id == current_user.tenant_id)
    
    if status:
        query = query.filter(ConversionJob.status == status)
    
    jobs = query.order_by(ConversionJob.created_at.desc()).limit(50).all()
    
    return [
        {
            "id": job.id,
            "document_filename": job.document.filename if job.document else None,
            "source_format": job.source_format,
            "target_format": job.target_format,
            "status": job.status.value,
            "progress": job.progress,
            "error_message": job.error_message,
            "created_at": job.created_at,
            "completed_at": job.completed_at
        }
        for job in jobs
    ]

@router.post("/conversions")
async def create_conversion_job(
    document_id: int = Form(...),
    target_format: str = Form(...),
    conversion_profile: str = Form("default"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.tenant_id == current_user.tenant_id
    ).first()
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    source_format = document.mime_type.split('/')[-1] if document.mime_type else "unknown"
    
    job = ConversionJob(
        tenant_id=current_user.tenant_id,
        document_id=document_id,
        source_format=source_format,
        target_format=target_format,
        conversion_profile=conversion_profile,
        created_by=current_user.id
    )
    
    db.add(job)
    db.commit()
    db.refresh(job)
    
    return {"id": job.id, "message": "Conversion job created successfully"}

@router.get("/ocr-results")
async def get_ocr_results(
    document_id: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(OCRResult).join(Document).filter(
        Document.tenant_id == current_user.tenant_id
    )
    
    if document_id:
        query = query.filter(OCRResult.document_id == document_id)
    
    results = query.order_by(OCRResult.created_at.desc()).limit(50).all()
    
    return [
        {
            "id": result.id,
            "document_filename": result.document.filename,
            "language": result.language,
            "confidence_score": result.confidence_score,
            "extracted_text": result.extracted_text[:500] + "..." if len(result.extracted_text or "") > 500 else result.extracted_text,
            "structured_data": result.structured_data,
            "processing_time": result.processing_time,
            "created_at": result.created_at
        }
        for result in results
    ]

@router.get("/esign-envelopes")
async def get_esign_envelopes(
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(ESignEnvelope).filter(ESignEnvelope.tenant_id == current_user.tenant_id)
    
    if status:
        query = query.filter(ESignEnvelope.status == status)
    
    envelopes = query.order_by(ESignEnvelope.created_at.desc()).limit(50).all()
    
    return [
        {
            "id": envelope.id,
            "name": envelope.name,
            "status": envelope.status.value,
            "document_count": len(envelope.documents),
            "recipient_count": len(envelope.recipients),
            "completed_at": envelope.completed_at,
            "expires_at": envelope.expires_at,
            "created_at": envelope.created_at
        }
        for envelope in envelopes
    ]

@router.get("/templates")
async def get_document_templates(
    template_type: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(DocumentTemplate).filter(
        DocumentTemplate.tenant_id == current_user.tenant_id,
        DocumentTemplate.is_active == True
    )
    
    if template_type:
        query = query.filter(DocumentTemplate.template_type == template_type)
    
    templates = query.order_by(DocumentTemplate.name).all()
    
    return [
        {
            "id": template.id,
            "name": template.name,
            "template_type": template.template_type,
            "description": template.description,
            "merge_fields": template.merge_fields,
            "created_at": template.created_at
        }
        for template in templates
    ]

@router.get("/shares")
async def get_document_shares(
    document_id: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(DocumentShare).join(Document).filter(
        Document.tenant_id == current_user.tenant_id
    )
    
    if document_id:
        query = query.filter(DocumentShare.document_id == document_id)
    
    shares = query.order_by(DocumentShare.created_at.desc()).limit(50).all()
    
    return [
        {
            "id": share.id,
            "document_filename": share.document.filename,
            "recipient_email": share.recipient_email,
            "share_token": share.share_token,
            "permissions": share.permissions,
            "expires_at": share.expires_at,
            "access_count": share.access_count,
            "last_accessed": share.last_accessed,
            "created_at": share.created_at
        }
        for share in shares
    ]

@router.get("/retention-policies")
async def get_retention_policies(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    policies = db.query(RetentionPolicy).filter(
        RetentionPolicy.tenant_id == current_user.tenant_id
    ).order_by(RetentionPolicy.document_type).all()
    
    return [
        {
            "id": policy.id,
            "document_type": policy.document_type,
            "retention_period_years": policy.retention_period_years,
            "jurisdiction": policy.jurisdiction,
            "auto_delete": policy.auto_delete,
            "legal_hold_exempt": policy.legal_hold_exempt,
            "description": policy.description,
            "created_at": policy.created_at
        }
        for policy in policies
    ]

@router.get("/legal-holds")
async def get_legal_holds(
    is_active: Optional[bool] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(LegalHold).filter(LegalHold.tenant_id == current_user.tenant_id)
    
    if is_active is not None:
        query = query.filter(LegalHold.is_active == is_active)
    
    holds = query.order_by(LegalHold.created_at.desc()).all()
    
    return [
        {
            "id": hold.id,
            "name": hold.name,
            "description": hold.description,
            "matter_reference": hold.matter_reference,
            "hold_criteria": hold.hold_criteria,
            "is_active": hold.is_active,
            "created_at": hold.created_at,
            "released_at": hold.released_at
        }
        for hold in holds
    ]

@router.get("/document-packs")
async def get_document_packs(
    client_id: Optional[int] = None,
    pack_type: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(DocumentPack).filter(DocumentPack.tenant_id == current_user.tenant_id)
    
    if client_id:
        query = query.filter(DocumentPack.client_id == client_id)
    if pack_type:
        query = query.filter(DocumentPack.pack_type == pack_type)
    
    packs = query.order_by(DocumentPack.created_at.desc()).limit(50).all()
    
    return [
        {
            "id": pack.id,
            "name": pack.name,
            "pack_type": pack.pack_type,
            "client_name": pack.client.name if pack.client else None,
            "status": pack.status,
            "component_count": len(pack.component_list or []),
            "created_at": pack.created_at
        }
        for pack in packs
    ]

@router.get("/reports/usage")
async def get_usage_reports(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    total_documents = db.query(Document).filter(
        Document.tenant_id == current_user.tenant_id
    ).count()
    
    documents_by_type = {}
    for doc_type in DocumentType:
        count = db.query(Document).filter(
            Document.tenant_id == current_user.tenant_id,
            Document.document_type == doc_type
        ).count()
        documents_by_type[doc_type.value] = count
    
    conversion_stats = {
        "total_jobs": db.query(ConversionJob).filter(
            ConversionJob.tenant_id == current_user.tenant_id
        ).count(),
        "successful": db.query(ConversionJob).filter(
            ConversionJob.tenant_id == current_user.tenant_id,
            ConversionJob.status == ConversionStatus.COMPLETED
        ).count(),
        "failed": db.query(ConversionJob).filter(
            ConversionJob.tenant_id == current_user.tenant_id,
            ConversionJob.status == ConversionStatus.FAILED
        ).count()
    }
    
    return {
        "total_documents": total_documents,
        "documents_by_type": documents_by_type,
        "conversion_stats": conversion_stats,
        "storage_usage": {
            "total_size_gb": 125.6,
            "used_size_gb": 98.2,
            "usage_percentage": 78
        }
    }
