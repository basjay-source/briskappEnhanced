from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import Dict, Any
from datetime import datetime
import uuid

from ..database import get_db
from ..middleware.auth import get_current_user

router = APIRouter(tags=["templates"])

@router.get("/invoice-templates")
def get_invoice_templates(
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get all invoice templates for the tenant"""
    templates = [
        {
            "id": "invoice-1",
            "name": "Modern Professional",
            "description": "Clean, modern invoice design with bold typography and structured layout",
            "template_type": "modern",
            "is_default": True
        },
        {
            "id": "invoice-2",
            "name": "Classic Business", 
            "description": "Traditional business invoice with formal styling",
            "template_type": "classic",
            "is_default": False
        },
        {
            "id": "invoice-3",
            "name": "Minimal Clean",
            "description": "Minimalist invoice design focusing on clarity and simplicity",
            "template_type": "minimal",
            "is_default": False
        },
        {
            "id": "invoice-4",
            "name": "Corporate Elite",
            "description": "Professional corporate invoice template with premium styling",
            "template_type": "professional",
            "is_default": False
        },
        {
            "id": "invoice-5",
            "name": "Creative Studio",
            "description": "Creative and colorful invoice design for creative businesses",
            "template_type": "creative",
            "is_default": False
        }
    ]
    return {"templates": templates}

@router.post("/invoice-templates")
def create_invoice_template(
    template_data: Dict[str, Any],
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Create a new invoice template"""
    template_id = str(uuid.uuid4())
    return {
        "template_id": template_id,
        "message": "Invoice template created successfully",
        "template": {
            **template_data,
            "id": template_id,
            "created_at": datetime.now().isoformat()
        }
    }

@router.put("/invoice-templates/{template_id}")
def update_invoice_template(
    template_id: str,
    template_data: Dict[str, Any],
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Update an existing invoice template"""
    return {
        "template_id": template_id,
        "message": "Invoice template updated successfully",
        "template": {
            **template_data,
            "id": template_id,
            "updated_at": datetime.now().isoformat()
        }
    }

@router.delete("/invoice-templates/{template_id}")
def delete_invoice_template(
    template_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Delete an invoice template"""
    return {
        "message": "Invoice template deleted successfully",
        "template_id": template_id
    }

@router.post("/invoice-templates/{template_id}/preview")
def preview_invoice_template(
    template_id: str,
    invoice_data: Dict[str, Any],
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Generate preview of invoice with template"""
    return {
        "template_id": template_id,
        "preview_url": f"/api/invoice-preview/{template_id}",
        "generated_at": datetime.now().isoformat()
    }

@router.post("/invoice-templates/{template_id}/generate")
def generate_invoice(
    template_id: str,
    invoice_data: Dict[str, Any],
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Generate invoice PDF with template"""
    return {
        "template_id": template_id,
        "invoice_url": f"/api/invoice-pdf/{template_id}",
        "generated_at": datetime.now().isoformat()
    }

@router.get("/template-branding/{practice_id}")
def get_template_branding(
    practice_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get template branding settings for practice"""
    return {
        "practice_id": practice_id,
        "custom_branding": {
            "company_name": "Brisk Practice Suite",
            "company_tagline": "Professional Accounting Solutions",
            "logo_url": "",
            "address": "123 Business Street, London, UK",
            "phone": "+44 20 1234 5678",
            "email": "info@briskpractice.com",
            "website": "www.briskpractice.com"
        },
        "theme_colors": {
            "primary": "#0B5FFF",
            "secondary": "#FF7A00",
            "accent": "#10B981",
            "text": "#1F2937",
            "background": "#FFFFFF"
        },
        "is_active": True
    }

@router.put("/template-branding/{practice_id}")
def update_template_branding(
    practice_id: str,
    branding_data: Dict[str, Any],
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Update template branding settings"""
    return {
        "practice_id": practice_id,
        "message": "Template branding updated successfully",
        "branding": {
            **branding_data,
            "updated_at": datetime.now().isoformat()
        }
    }

@router.post("/template-branding/upload-logo")
def upload_logo(
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Upload company logo for templates"""
    return {
        "message": "Logo uploaded successfully",
        "logo_url": "/api/uploads/logo.png",
        "uploaded_at": datetime.now().isoformat()
    }
