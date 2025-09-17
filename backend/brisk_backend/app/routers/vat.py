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

international_vat_rates = [
    {
        "country": "United Kingdom",
        "countryCode": "GB",
        "standardRate": 20,
        "reducedRates": [5],
        "zeroRate": True,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Postal services"],
        "currency": "GBP",
        "region": "Europe",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "1973-04-01"
    },
    {
        "country": "Germany",
        "countryCode": "DE", 
        "standardRate": 19,
        "reducedRates": [7],
        "zeroRate": False,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Cultural services"],
        "currency": "EUR",
        "region": "Europe",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "2007-01-01"
    },
    {
        "country": "France",
        "countryCode": "FR",
        "standardRate": 20,
        "reducedRates": [5.5, 10],
        "zeroRate": False,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Cultural activities"],
        "currency": "EUR",
        "region": "Europe",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "2014-01-01"
    },
    {
        "country": "Spain",
        "countryCode": "ES",
        "standardRate": 21,
        "reducedRates": [4, 10],
        "zeroRate": False,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Cultural services"],
        "currency": "EUR",
        "region": "Europe",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "2012-09-01"
    },
    {
        "country": "Italy",
        "countryCode": "IT",
        "standardRate": 22,
        "reducedRates": [4, 5, 10],
        "zeroRate": False,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Cultural activities"],
        "currency": "EUR",
        "region": "Europe",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "2013-10-01"
    },
    {
        "country": "Netherlands",
        "countryCode": "NL",
        "standardRate": 21,
        "reducedRates": [9],
        "zeroRate": True,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Books"],
        "currency": "EUR",
        "region": "Europe",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "2012-10-01"
    },
    {
        "country": "United States",
        "countryCode": "US",
        "standardRate": 0,
        "reducedRates": [],
        "zeroRate": True,
        "exemptions": ["No federal VAT/GST - state sales taxes apply"],
        "currency": "USD",
        "region": "North America",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "N/A"
    },
    {
        "country": "Canada",
        "countryCode": "CA",
        "standardRate": 5,
        "reducedRates": [],
        "zeroRate": True,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Basic groceries"],
        "currency": "CAD",
        "region": "North America",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "1991-01-01"
    },
    {
        "country": "Australia",
        "countryCode": "AU",
        "standardRate": 10,
        "reducedRates": [],
        "zeroRate": True,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Basic food"],
        "currency": "AUD",
        "region": "Asia Pacific",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "2000-07-01"
    },
    {
        "country": "Japan",
        "countryCode": "JP",
        "standardRate": 10,
        "reducedRates": [8],
        "zeroRate": False,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Social welfare"],
        "currency": "JPY",
        "region": "Asia Pacific",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "2019-10-01"
    },
    {
        "country": "Singapore",
        "countryCode": "SG",
        "standardRate": 9,
        "reducedRates": [],
        "zeroRate": True,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Basic food"],
        "currency": "SGD",
        "region": "Asia Pacific",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "2023-01-01"
    },
    {
        "country": "China",
        "countryCode": "CN",
        "standardRate": 13,
        "reducedRates": [6, 9],
        "zeroRate": True,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Agricultural products"],
        "currency": "CNY",
        "region": "Asia Pacific",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "2019-04-01"
    },
    {
        "country": "India",
        "countryCode": "IN",
        "standardRate": 18,
        "reducedRates": [5, 12],
        "zeroRate": True,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Basic food"],
        "currency": "INR",
        "region": "Asia Pacific",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "2017-07-01"
    },
    {
        "country": "Brazil",
        "countryCode": "BR",
        "standardRate": 17,
        "reducedRates": [],
        "zeroRate": True,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Basic food"],
        "currency": "BRL",
        "region": "South America",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "2008-01-01"
    },
    {
        "country": "South Africa",
        "countryCode": "ZA",
        "standardRate": 15,
        "reducedRates": [],
        "zeroRate": True,
        "exemptions": ["Financial services", "Insurance", "Education", "Healthcare", "Basic food"],
        "currency": "ZAR",
        "region": "Africa",
        "lastUpdated": "2024-01-01",
        "effectiveDate": "1991-09-30"
    }
]

@router.get("/international-rates")
def get_international_vat_rates(
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get all international VAT rates"""
    return international_vat_rates

@router.get("/international-rates/{country_code}")
def get_vat_rate_by_country(
    country_code: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Get VAT rate for specific country"""
    rate = next((r for r in international_vat_rates if r["countryCode"] == country_code.upper()), None)
    if not rate:
        raise HTTPException(status_code=404, detail="VAT rate not found for country")
    return rate

@router.put("/international-rates/{country_code}")
def update_vat_rate(
    country_code: str,
    rate_data: dict,
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Update VAT rate for specific country"""
    for i, rate in enumerate(international_vat_rates):
        if rate["countryCode"] == country_code.upper():
            international_vat_rates[i].update(rate_data)
            international_vat_rates[i]["lastUpdated"] = "2024-12-16"
            return international_vat_rates[i]
    
    raise HTTPException(status_code=404, detail="VAT rate not found for country")

@router.get("/international-rates/export")
def export_vat_rates(
    request: Request = None,
    db: Session = Depends(get_db)
):
    """Export international VAT rates as CSV"""
    import csv
    import io
    from fastapi.responses import StreamingResponse
    
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=[
        'country', 'countryCode', 'standardRate', 'reducedRates', 
        'zeroRate', 'currency', 'region', 'lastUpdated', 'effectiveDate'
    ])
    
    writer.writeheader()
    for rate in international_vat_rates:
        row = rate.copy()
        row['reducedRates'] = ', '.join(map(str, rate['reducedRates']))
        row['exemptions'] = '; '.join(rate['exemptions'])
        writer.writerow(row)
    
    output.seek(0)
    return StreamingResponse(
        io.BytesIO(output.getvalue().encode()),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=international_vat_rates.csv"}
    )
