from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import (
    Tenant, OrgUnit, User, Subscription, Invoice, FeatureFlag, 
    SecurityPolicy, AuditLog, APIKey, Webhook, NotificationTemplate,
    BrandingConfig, UserRole, Environment, Region, SubscriptionStatus
)
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/admin", tags=["admin"])

class TenantResponse(BaseModel):
    id: int
    name: str
    legal_entity: Optional[str]
    primary_region: Region
    environment: Environment
    status: str
    created_at: datetime

class OrgUnitResponse(BaseModel):
    id: int
    tenant_id: int
    name: str
    office_type: Optional[str]
    timezone: str
    currency: str

class UserListResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: UserRole
    is_active: bool
    last_login: Optional[datetime]

class SubscriptionResponse(BaseModel):
    id: int
    tenant_id: int
    plan_name: str
    status: SubscriptionStatus
    seats: int
    amount: Optional[int]
    currency: str

class AuditLogResponse(BaseModel):
    id: int
    user_id: Optional[int]
    action: str
    resource_type: Optional[str]
    timestamp: datetime
    ip_address: Optional[str]

@router.get("/dashboard/overview")
async def get_dashboard_overview(db: Session = Depends(get_db)):
    total_tenants = db.query(Tenant).count()
    active_users = db.query(User).filter(User.is_active == True).count()
    total_subscriptions = db.query(Subscription).count()
    recent_logins = db.query(User).filter(User.last_login.isnot(None)).count()
    
    return {
        "total_tenants": total_tenants,
        "active_users": active_users,
        "total_subscriptions": total_subscriptions,
        "recent_logins": recent_logins,
        "security_alerts": 2,
        "system_health": "healthy"
    }

@router.get("/tenants", response_model=List[TenantResponse])
async def get_tenants(db: Session = Depends(get_db)):
    tenants = db.query(Tenant).all()
    return tenants

@router.post("/tenants")
async def create_tenant(
    name: str,
    legal_entity: str,
    primary_region: Region,
    db: Session = Depends(get_db)
):
    tenant = Tenant(
        name=name,
        legal_entity=legal_entity,
        primary_region=primary_region
    )
    db.add(tenant)
    db.commit()
    db.refresh(tenant)
    return tenant

@router.get("/tenants/{tenant_id}/org-units", response_model=List[OrgUnitResponse])
async def get_org_units(tenant_id: int, db: Session = Depends(get_db)):
    org_units = db.query(OrgUnit).filter(OrgUnit.tenant_id == tenant_id).all()
    return org_units

@router.get("/users", response_model=List[UserListResponse])
async def get_users(
    tenant_id: Optional[int] = None,
    role: Optional[UserRole] = None,
    db: Session = Depends(get_db)
):
    query = db.query(User)
    if tenant_id:
        query = query.filter(User.tenant_id == tenant_id)
    if role:
        query = query.filter(User.role == role)
    users = query.all()
    return users

@router.put("/users/{user_id}/role")
async def update_user_role(
    user_id: int,
    new_role: UserRole,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.role = new_role
    db.commit()
    return {"message": "User role updated successfully"}

@router.get("/subscriptions", response_model=List[SubscriptionResponse])
async def get_subscriptions(db: Session = Depends(get_db)):
    subscriptions = db.query(Subscription).all()
    return subscriptions

@router.post("/subscriptions")
async def create_subscription(
    tenant_id: int,
    plan_name: str,
    seats: int,
    amount: int,
    db: Session = Depends(get_db)
):
    subscription = Subscription(
        tenant_id=tenant_id,
        plan_name=plan_name,
        seats=seats,
        amount=amount,
        status=SubscriptionStatus.TRIAL
    )
    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    return subscription

@router.get("/feature-flags")
async def get_feature_flags(db: Session = Depends(get_db)):
    flags = db.query(FeatureFlag).all()
    return flags

@router.post("/feature-flags")
async def create_feature_flag(
    name: str,
    description: str,
    is_enabled: bool = False,
    db: Session = Depends(get_db)
):
    flag = FeatureFlag(
        name=name,
        description=description,
        is_enabled=is_enabled
    )
    db.add(flag)
    db.commit()
    db.refresh(flag)
    return flag

@router.put("/feature-flags/{flag_id}/toggle")
async def toggle_feature_flag(flag_id: int, db: Session = Depends(get_db)):
    flag = db.query(FeatureFlag).filter(FeatureFlag.id == flag_id).first()
    if not flag:
        raise HTTPException(status_code=404, detail="Feature flag not found")
    
    flag.is_enabled = not flag.is_enabled
    db.commit()
    return {"message": f"Feature flag {'enabled' if flag.is_enabled else 'disabled'}"}

@router.get("/audit-logs", response_model=List[AuditLogResponse])
async def get_audit_logs(
    tenant_id: Optional[int] = None,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    query = db.query(AuditLog).order_by(AuditLog.timestamp.desc())
    if tenant_id:
        query = query.filter(AuditLog.tenant_id == tenant_id)
    logs = query.limit(limit).all()
    return logs

@router.get("/security/policies")
async def get_security_policies(db: Session = Depends(get_db)):
    policies = db.query(SecurityPolicy).all()
    return policies

@router.get("/api-keys")
async def get_api_keys(tenant_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(APIKey)
    if tenant_id:
        query = query.filter(APIKey.tenant_id == tenant_id)
    keys = query.all()
    return keys

@router.post("/api-keys")
async def create_api_key(
    tenant_id: int,
    name: str,
    scopes: List[str],
    db: Session = Depends(get_db)
):
    import secrets
    key_value = secrets.token_urlsafe(32)
    
    api_key = APIKey(
        tenant_id=tenant_id,
        name=name,
        key_hash=key_value,
        scopes=scopes
    )
    db.add(api_key)
    db.commit()
    db.refresh(api_key)
    
    return {
        "id": api_key.id,
        "name": api_key.name,
        "key": key_value,
        "scopes": api_key.scopes
    }

@router.get("/webhooks")
async def get_webhooks(tenant_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(Webhook)
    if tenant_id:
        query = query.filter(Webhook.tenant_id == tenant_id)
    webhooks = query.all()
    return webhooks

@router.post("/webhooks")
async def create_webhook(
    tenant_id: int,
    url: str,
    events: List[str],
    db: Session = Depends(get_db)
):
    import secrets
    secret = secrets.token_urlsafe(16)
    
    webhook = Webhook(
        tenant_id=tenant_id,
        url=url,
        events=events,
        secret=secret
    )
    db.add(webhook)
    db.commit()
    db.refresh(webhook)
    return webhook

@router.get("/monitoring/health")
async def get_system_health():
    return {
        "status": "healthy",
        "uptime": "99.9%",
        "response_time": "120ms",
        "error_rate": "0.1%",
        "active_connections": 1250,
        "queue_depth": 5
    }

@router.get("/monitoring/metrics")
async def get_system_metrics():
    return {
        "cpu_usage": 45.2,
        "memory_usage": 67.8,
        "disk_usage": 34.1,
        "network_io": {"in": "125 MB/s", "out": "89 MB/s"},
        "database_connections": 45,
        "cache_hit_rate": 94.5
    }
