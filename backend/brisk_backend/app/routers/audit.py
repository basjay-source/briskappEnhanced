from fastapi import APIRouter, Depends, Request, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, desc, func
from datetime import datetime, timedelta
from typing import Optional, List
import csv
import io
import json
from fastapi.responses import StreamingResponse

from app.database import get_db
from app.models import AuditLog
from pydantic import BaseModel

router = APIRouter()

class AuditLogResponse(BaseModel):
    id: int
    tenant_id: Optional[str]
    user_id: Optional[str]
    action: str
    entity_type: str
    entity_id: str
    timestamp: datetime
    details: Optional[str]
    risk_level: Optional[str]
    compliance_tags: Optional[List[str]]
    ip_address: Optional[str]
    
    class Config:
        from_attributes = True

class AuditAnalytics(BaseModel):
    total_logs: int
    high_risk_count: int
    failed_requests: int
    unique_users: int
    top_actions: List[dict]
    risk_distribution: dict
    compliance_summary: dict

@router.get("/audit-logs", response_model=dict)
def get_audit_logs(
    request: Request,
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=1000),
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    user_id: Optional[str] = None,
    action: Optional[str] = None,
    entity_type: Optional[str] = None,
    risk_level: Optional[str] = None,
    compliance_tag: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get audit logs with comprehensive filtering and pagination"""
    
    query = db.query(AuditLog).filter(
        AuditLog.tenant_id == request.state.tenant_id
    )
    
    if start_date:
        query = query.filter(AuditLog.timestamp >= start_date)
    if end_date:
        query = query.filter(AuditLog.timestamp <= end_date)
    if user_id:
        query = query.filter(AuditLog.user_id == user_id)
    if action:
        query = query.filter(AuditLog.action.ilike(f"%{action}%"))
    if entity_type:
        query = query.filter(AuditLog.entity_type == entity_type)
    if risk_level:
        query = query.filter(AuditLog.risk_level == risk_level)
    if compliance_tag:
        query = query.filter(AuditLog.compliance_tags.contains([compliance_tag]))
    
    total_count = query.count()
    
    offset = (page - 1) * limit
    logs = query.order_by(desc(AuditLog.timestamp)).offset(offset).limit(limit).all()
    
    return {
        "logs": [AuditLogResponse.from_orm(log) for log in logs],
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total_count,
            "pages": (total_count + limit - 1) // limit
        }
    }

@router.get("/audit-analytics", response_model=AuditAnalytics)
def get_audit_analytics(
    request: Request,
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db)
):
    """Get comprehensive audit analytics and insights"""
    
    start_date = datetime.utcnow() - timedelta(days=days)
    
    base_query = db.query(AuditLog).filter(
        and_(
            AuditLog.tenant_id == request.state.tenant_id,
            AuditLog.timestamp >= start_date
        )
    )
    
    total_logs = base_query.count()
    
    high_risk_count = base_query.filter(
        AuditLog.risk_level.in_(["HIGH", "CRITICAL"])
    ).count()
    
    failed_requests = base_query.filter(
        AuditLog.metadata.contains({"response": {"status_code": 400}})
    ).count()
    
    unique_users = base_query.with_entities(AuditLog.user_id).distinct().count()
    
    top_actions = db.query(
        AuditLog.action,
        func.count(AuditLog.action).label('count')
    ).filter(
        and_(
            AuditLog.tenant_id == request.state.tenant_id,
            AuditLog.timestamp >= start_date
        )
    ).group_by(AuditLog.action).order_by(desc('count')).limit(10).all()
    
    top_actions_list = [
        {"action": action, "count": count} 
        for action, count in top_actions
    ]
    
    risk_dist = db.query(
        AuditLog.risk_level,
        func.count(AuditLog.risk_level).label('count')
    ).filter(
        and_(
            AuditLog.tenant_id == request.state.tenant_id,
            AuditLog.timestamp >= start_date
        )
    ).group_by(AuditLog.risk_level).all()
    
    risk_distribution = {
        risk_level or "UNKNOWN": count 
        for risk_level, count in risk_dist
    }
    
    compliance_summary = {
        "financial_data_operations": base_query.filter(
            AuditLog.compliance_tags.contains(["FINANCIAL_DATA"])
        ).count(),
        "personal_data_operations": base_query.filter(
            AuditLog.compliance_tags.contains(["PERSONAL_DATA"])
        ).count(),
        "admin_operations": base_query.filter(
            AuditLog.compliance_tags.contains(["ADMIN_OPERATION"])
        ).count()
    }
    
    return AuditAnalytics(
        total_logs=total_logs,
        high_risk_count=high_risk_count,
        failed_requests=failed_requests,
        unique_users=unique_users,
        top_actions=top_actions_list,
        risk_distribution=risk_distribution,
        compliance_summary=compliance_summary
    )

@router.get("/audit-export")
def export_audit_logs(
    request: Request,
    format: str = Query("csv", regex="^(csv|json)$"),
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    """Export audit logs for compliance reporting"""
    
    query = db.query(AuditLog).filter(
        AuditLog.tenant_id == request.state.tenant_id
    )
    
    if start_date:
        query = query.filter(AuditLog.timestamp >= start_date)
    if end_date:
        query = query.filter(AuditLog.timestamp <= end_date)
    
    logs = query.order_by(desc(AuditLog.timestamp)).all()
    
    if format == "csv":
        output = io.StringIO()
        writer = csv.writer(output)
        
        writer.writerow([
            'ID', 'Timestamp', 'User ID', 'Action', 'Entity Type', 
            'Entity ID', 'Details', 'Risk Level', 'IP Address', 'Compliance Tags'
        ])
        
        for log in logs:
            writer.writerow([
                log.id,
                log.timestamp.isoformat(),
                log.user_id or '',
                log.action,
                log.entity_type,
                log.entity_id,
                log.details or '',
                log.risk_level or '',
                log.ip_address or '',
                ','.join(log.compliance_tags or [])
            ])
        
        output.seek(0)
        
        return StreamingResponse(
            io.BytesIO(output.getvalue().encode()),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=audit_logs.csv"}
        )
    
    else:  # JSON format
        logs_data = [
            {
                "id": log.id,
                "timestamp": log.timestamp.isoformat(),
                "user_id": log.user_id,
                "action": log.action,
                "entity_type": log.entity_type,
                "entity_id": log.entity_id,
                "details": log.details,
                "risk_level": log.risk_level,
                "ip_address": log.ip_address,
                "compliance_tags": log.compliance_tags,
                "metadata": log.metadata
            }
            for log in logs
        ]
        
        return StreamingResponse(
            io.BytesIO(json.dumps(logs_data, indent=2).encode()),
            media_type="application/json",
            headers={"Content-Disposition": "attachment; filename=audit_logs.json"}
        )

@router.get("/audit-compliance-report")
def get_compliance_report(
    request: Request,
    report_type: str = Query("gdpr", regex="^(gdpr|sox|pci|hipaa)$"),
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    """Generate compliance-specific audit reports"""
    
    if not start_date:
        start_date = datetime.utcnow() - timedelta(days=90)
    if not end_date:
        end_date = datetime.utcnow()
    
    query = db.query(AuditLog).filter(
        and_(
            AuditLog.tenant_id == request.state.tenant_id,
            AuditLog.timestamp >= start_date,
            AuditLog.timestamp <= end_date
        )
    )
    
    if report_type == "gdpr":
        personal_data_ops = query.filter(
            AuditLog.compliance_tags.contains(["PERSONAL_DATA"])
        ).all()
        
        return {
            "report_type": "GDPR Compliance Report",
            "period": f"{start_date.date()} to {end_date.date()}",
            "personal_data_operations": len(personal_data_ops),
            "data_access_requests": [
                log for log in personal_data_ops 
                if "GET" in log.action and "clients" in log.action.lower()
            ],
            "data_modifications": [
                log for log in personal_data_ops 
                if log.action.startswith(("POST", "PUT", "PATCH", "DELETE"))
            ]
        }
    
    return {"message": f"{report_type.upper()} compliance report not implemented"}

@router.delete("/audit-logs/cleanup")
def cleanup_old_audit_logs(
    request: Request,
    days_to_keep: int = Query(2555, ge=30),  # Default 7 years
    db: Session = Depends(get_db)
):
    """Clean up old audit logs based on retention policy"""
    
    cutoff_date = datetime.utcnow() - timedelta(days=days_to_keep)
    
    deleted_count = db.query(AuditLog).filter(
        and_(
            AuditLog.tenant_id == request.state.tenant_id,
            AuditLog.timestamp < cutoff_date
        )
    ).delete()
    
    db.commit()
    
    return {
        "message": f"Cleaned up {deleted_count} audit log entries older than {days_to_keep} days",
        "cutoff_date": cutoff_date.isoformat()
    }
