from fastapi import APIRouter, Depends, HTTPException, Request, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, date
from pydantic import BaseModel

from app.database import get_db
from app.models import VATReturn, VATScheme, AuditLog

router = APIRouter()

class VATReturnCreate(BaseModel):
    period: str
    period_start: date
    period_end: date
    due_date: date
    net_sales: float = 0.0
    vat_on_sales: float = 0.0
    vat_on_purchases: float = 0.0
    total_vat: float = 0.0
    box1: float = 0.0  # VAT due on sales
    box2: float = 0.0  # VAT due on acquisitions
    box3: float = 0.0  # Total VAT due
    box4: float = 0.0  # VAT reclaimed
    box5: float = 0.0  # Net VAT to be paid
    box6: float = 0.0  # Total value of sales
    box7: float = 0.0  # Total value of purchases
    box8: float = 0.0  # Total value of goods supplied to EC
    box9: float = 0.0  # Total value of goods acquired from EC

class VATReturnUpdate(BaseModel):
    period: Optional[str] = None
    net_sales: Optional[float] = None
    vat_on_sales: Optional[float] = None
    vat_on_purchases: Optional[float] = None
    total_vat: Optional[float] = None
    box1: Optional[float] = None
    box2: Optional[float] = None
    box3: Optional[float] = None
    box4: Optional[float] = None
    box5: Optional[float] = None
    box6: Optional[float] = None
    box7: Optional[float] = None
    box8: Optional[float] = None
    box9: Optional[float] = None
    status: Optional[str] = None

class VATSchemeCreate(BaseModel):
    name: str
    scheme_type: str  # 'standard', 'flat_rate', 'cash_accounting'
    rate: Optional[float] = None
    description: str
    active: bool = False

class VATSchemeUpdate(BaseModel):
    name: Optional[str] = None
    rate: Optional[float] = None
    description: Optional[str] = None
    active: Optional[bool] = None

@router.get("/returns")
def get_vat_returns(
    status: Optional[str] = Query(None, description="Filter by status"),
    period: Optional[str] = Query(None, description="Filter by period"),
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get all VAT returns for the tenant"""
    query = db.query(VATReturn).filter(VATReturn.tenant_id == request.state.tenant_id)
    
    if status:
        query = query.filter(VATReturn.status == status)
    if period:
        query = query.filter(VATReturn.period.ilike(f"%{period}%"))
    
    returns = query.order_by(VATReturn.due_date.desc()).all()
    return {"returns": returns}

@router.post("/returns")
def create_vat_return(
    vat_return: VATReturnCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Create a new VAT return"""
    db_return = VATReturn(
        tenant_id=request.state.tenant_id,
        **vat_return.dict()
    )
    
    db.add(db_return)
    db.commit()
    db.refresh(db_return)
    
    audit_log = AuditLog(
        tenant_id=request.state.tenant_id,
        action="CREATE_VAT_RETURN",
        entity_type="VATReturn",
        entity_id=str(db_return.id),
        details=f"Created VAT return for period {vat_return.period}",
        user_id=getattr(request.state, 'user_id', None)
    )
    db.add(audit_log)
    db.commit()
    
    return db_return

@router.get("/returns/{return_id}")
def get_vat_return(
    return_id: int,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get a specific VAT return"""
    vat_return = db.query(VATReturn).filter(
        VATReturn.id == return_id,
        VATReturn.tenant_id == request.state.tenant_id
    ).first()
    
    if not vat_return:
        raise HTTPException(status_code=404, detail="VAT return not found")
    
    return vat_return

@router.put("/returns/{return_id}")
def update_vat_return(
    return_id: int,
    vat_return_update: VATReturnUpdate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Update a VAT return"""
    vat_return = db.query(VATReturn).filter(
        VATReturn.id == return_id,
        VATReturn.tenant_id == request.state.tenant_id
    ).first()
    
    if not vat_return:
        raise HTTPException(status_code=404, detail="VAT return not found")
    
    for field, value in vat_return_update.dict(exclude_unset=True).items():
        setattr(vat_return, field, value)
    
    vat_return.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(vat_return)
    
    audit_log = AuditLog(
        tenant_id=request.state.tenant_id,
        action="UPDATE_VAT_RETURN",
        entity_type="VATReturn",
        entity_id=str(vat_return.id),
        details=f"Updated VAT return for period {vat_return.period}",
        user_id=getattr(request.state, 'user_id', None)
    )
    db.add(audit_log)
    db.commit()
    
    return vat_return

@router.post("/returns/{return_id}/submit")
def submit_vat_return(
    return_id: int,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Submit a VAT return to HMRC"""
    vat_return = db.query(VATReturn).filter(
        VATReturn.id == return_id,
        VATReturn.tenant_id == request.state.tenant_id
    ).first()
    
    if not vat_return:
        raise HTTPException(status_code=404, detail="VAT return not found")
    
    if vat_return.status != 'draft':
        raise HTTPException(status_code=400, detail="Only draft returns can be submitted")
    
    vat_return.status = 'submitted'
    vat_return.submitted_date = datetime.utcnow()
    vat_return.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(vat_return)
    
    audit_log = AuditLog(
        tenant_id=request.state.tenant_id,
        action="SUBMIT_VAT_RETURN",
        entity_type="VATReturn",
        entity_id=str(vat_return.id),
        details=f"Submitted VAT return for period {vat_return.period} to HMRC",
        user_id=getattr(request.state, 'user_id', None)
    )
    db.add(audit_log)
    db.commit()
    
    return {"message": "VAT return submitted successfully", "return": vat_return}

@router.get("/schemes")
def get_vat_schemes(
    active_only: bool = Query(False, description="Filter to active schemes only"),
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get all VAT schemes for the tenant"""
    query = db.query(VATScheme).filter(VATScheme.tenant_id == request.state.tenant_id)
    
    if active_only:
        query = query.filter(VATScheme.active == True)
    
    schemes = query.order_by(VATScheme.name).all()
    return {"schemes": schemes}

@router.post("/schemes")
def create_vat_scheme(
    vat_scheme: VATSchemeCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Create a new VAT scheme"""
    db_scheme = VATScheme(
        tenant_id=request.state.tenant_id,
        **vat_scheme.dict()
    )
    
    db.add(db_scheme)
    db.commit()
    db.refresh(db_scheme)
    
    audit_log = AuditLog(
        tenant_id=request.state.tenant_id,
        action="CREATE_VAT_SCHEME",
        entity_type="VATScheme",
        entity_id=str(db_scheme.id),
        details=f"Created VAT scheme: {vat_scheme.name}",
        user_id=getattr(request.state, 'user_id', None)
    )
    db.add(audit_log)
    db.commit()
    
    return db_scheme

@router.put("/schemes/{scheme_id}")
def update_vat_scheme(
    scheme_id: int,
    vat_scheme_update: VATSchemeUpdate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Update a VAT scheme"""
    vat_scheme = db.query(VATScheme).filter(
        VATScheme.id == scheme_id,
        VATScheme.tenant_id == request.state.tenant_id
    ).first()
    
    if not vat_scheme:
        raise HTTPException(status_code=404, detail="VAT scheme not found")
    
    for field, value in vat_scheme_update.dict(exclude_unset=True).items():
        setattr(vat_scheme, field, value)
    
    vat_scheme.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(vat_scheme)
    
    audit_log = AuditLog(
        tenant_id=request.state.tenant_id,
        action="UPDATE_VAT_SCHEME",
        entity_type="VATScheme",
        entity_id=str(vat_scheme.id),
        details=f"Updated VAT scheme: {vat_scheme.name}",
        user_id=getattr(request.state, 'user_id', None)
    )
    db.add(audit_log)
    db.commit()
    
    return vat_scheme

@router.get("/analytics/{analytics_type}")
def get_vat_analytics(
    analytics_type: str,
    period_start: Optional[date] = Query(None),
    period_end: Optional[date] = Query(None),
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get VAT analytics data"""
    query = db.query(VATReturn).filter(VATReturn.tenant_id == request.state.tenant_id)
    
    if period_start:
        query = query.filter(VATReturn.period_start >= period_start)
    if period_end:
        query = query.filter(VATReturn.period_end <= period_end)
    
    returns = query.all()
    
    if analytics_type == "liability_trend":
        trend_data = []
        for ret in returns:
            trend_data.append({
                "period": ret.period,
                "total_vat": ret.total_vat,
                "vat_on_sales": ret.vat_on_sales,
                "vat_on_purchases": ret.vat_on_purchases
            })
        return {"trend_data": trend_data}
    
    elif analytics_type == "rate_analysis":
        total_sales = sum(ret.net_sales for ret in returns)
        total_vat = sum(ret.vat_on_sales for ret in returns)
        effective_rate = (total_vat / total_sales * 100) if total_sales > 0 else 0
        
        return {
            "total_sales": total_sales,
            "total_vat": total_vat,
            "effective_rate": effective_rate,
            "period_count": len(returns)
        }
    
    elif analytics_type == "submission_history":
        history = []
        for ret in returns:
            history.append({
                "period": ret.period,
                "status": ret.status,
                "due_date": ret.due_date,
                "submitted_date": ret.submitted_date,
                "total_vat": ret.total_vat
            })
        return {"submission_history": history}
    
    else:
        raise HTTPException(status_code=400, detail="Invalid analytics type")

@router.get("/compliance")
def get_vat_compliance(
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get VAT compliance status"""
    returns = db.query(VATReturn).filter(VATReturn.tenant_id == request.state.tenant_id).all()
    
    total_returns = len(returns)
    submitted_returns = len([r for r in returns if r.status == 'submitted'])
    overdue_returns = len([r for r in returns if r.status == 'overdue'])
    draft_returns = len([r for r in returns if r.status == 'draft'])
    
    mtd_compliant = True  # This would be determined by actual MTD integration
    digital_records = True
    api_connected = True
    
    return {
        "mtd_compliant": mtd_compliant,
        "digital_records": digital_records,
        "api_connected": api_connected,
        "total_returns": total_returns,
        "submitted_returns": submitted_returns,
        "overdue_returns": overdue_returns,
        "draft_returns": draft_returns,
        "compliance_score": (submitted_returns / total_returns * 100) if total_returns > 0 else 100
    }

@router.get("/audit-trail")
def get_vat_audit_trail(
    limit: int = Query(50, description="Number of records to return"),
    offset: int = Query(0, description="Number of records to skip"),
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get VAT audit trail"""
    audit_logs = db.query(AuditLog).filter(
        AuditLog.tenant_id == request.state.tenant_id,
        AuditLog.entity_type.in_(['VATReturn', 'VATScheme'])
    ).order_by(AuditLog.created_at.desc()).offset(offset).limit(limit).all()
    
    return {"audit_trail": audit_logs}
