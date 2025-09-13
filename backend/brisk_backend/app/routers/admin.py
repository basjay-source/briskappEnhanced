from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, date
from decimal import Decimal

from app.database import get_db
from app.models import Tenant, User, Subscription, FeatureFlag, AuditLog

router = APIRouter()

class TenantCreate(BaseModel):
    name: str
    domain: str
    logo_url: Optional[str] = None
    theme_colors: Optional[dict] = None

class UserCreate(BaseModel):
    tenant_id: str
    email: str
    first_name: str
    last_name: str
    is_superuser: Optional[bool] = False

class SubscriptionCreate(BaseModel):
    tenant_id: str
    plan_name: str
    modules: List[str]
    starts_at: date
    ends_at: date

@router.post("/tenants")
def create_tenant(
    tenant_data: TenantCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    existing_tenant = db.query(Tenant).filter(
        Tenant.domain == tenant_data.domain
    ).first()
    
    if existing_tenant:
        raise HTTPException(status_code=400, detail="Domain already exists")
    
    tenant = Tenant(
        name=tenant_data.name,
        domain=tenant_data.domain,
        logo_url=tenant_data.logo_url,
        theme_colors=tenant_data.theme_colors or {"primary": "#0B5FFF", "accent": "#FF7A00"}
    )
    
    db.add(tenant)
    db.commit()
    db.refresh(tenant)
    
    default_subscription = Subscription(
        tenant_id=tenant.id,
        plan_name="starter",
        modules=["books", "accounts", "esign"],
        is_active=True,
        starts_at=date.today()
    )
    
    db.add(default_subscription)
    db.commit()
    
    return {
        "tenant": tenant,
        "subscription": default_subscription,
        "message": "Tenant created successfully"
    }

@router.get("/tenants")
def get_tenants(
    request: Request = None,
    db: Session = Depends(get_db)
):
    tenants = db.query(Tenant).filter(Tenant.is_active == True).all()
    
    tenant_stats = []
    for tenant in tenants:
        user_count = db.query(User).filter(
            User.tenant_id == tenant.id,
            User.is_active == True
        ).count()
        
        subscription = db.query(Subscription).filter(
            Subscription.tenant_id == tenant.id,
            Subscription.is_active == True
        ).first()
        
        tenant_stats.append({
            "tenant": tenant,
            "user_count": user_count,
            "subscription": subscription,
            "status": "active" if tenant.is_active else "inactive"
        })
    
    return {
        "tenants": tenant_stats,
        "total_tenants": len(tenants)
    }

@router.post("/users")
def create_user(
    user_data: UserCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    user = User(
        tenant_id=user_data.tenant_id,
        email=user_data.email,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        is_superuser=user_data.is_superuser
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    audit_log = AuditLog(
        tenant_id=user_data.tenant_id,
        user_id=request.state.user_id,
        action="create_user",
        entity_type="user",
        entity_id=user.id,
        after_data={"email": user.email, "name": f"{user.first_name} {user.last_name}"}
    )
    
    db.add(audit_log)
    db.commit()
    
    return {
        "user": user,
        "message": "User created successfully"
    }

@router.get("/users/{tenant_id}")
def get_tenant_users(
    tenant_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    users = db.query(User).filter(
        User.tenant_id == tenant_id,
        User.is_active == True
    ).all()
    
    return {
        "users": users,
        "total_users": len(users)
    }

@router.post("/subscriptions")
def create_subscription(
    subscription_data: SubscriptionCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    existing_subscription = db.query(Subscription).filter(
        Subscription.tenant_id == subscription_data.tenant_id,
        Subscription.is_active == True
    ).first()
    
    if existing_subscription:
        existing_subscription.is_active = False
    
    subscription = Subscription(
        tenant_id=subscription_data.tenant_id,
        plan_name=subscription_data.plan_name,
        modules=subscription_data.modules,
        starts_at=subscription_data.starts_at,
        ends_at=subscription_data.ends_at,
        is_active=True
    )
    
    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    
    return {
        "subscription": subscription,
        "message": "Subscription updated successfully"
    }

@router.get("/feature-flags/{tenant_id}")
def get_feature_flags(
    tenant_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    flags = db.query(FeatureFlag).filter(
        FeatureFlag.tenant_id == tenant_id
    ).all()
    
    return {
        "feature_flags": flags,
        "enabled_features": [flag.feature_name for flag in flags if flag.is_enabled]
    }

@router.post("/feature-flags")
def toggle_feature_flag(
    tenant_id: str,
    feature_name: str,
    enabled: bool,
    request: Request = None,
    db: Session = Depends(get_db)
):
    flag = db.query(FeatureFlag).filter(
        FeatureFlag.tenant_id == tenant_id,
        FeatureFlag.feature_name == feature_name
    ).first()
    
    if not flag:
        flag = FeatureFlag(
            tenant_id=tenant_id,
            feature_name=feature_name,
            is_enabled=enabled
        )
        db.add(flag)
    else:
        flag.is_enabled = enabled
    
    db.commit()
    
    return {
        "feature_flag": flag,
        "message": f"Feature '{feature_name}' {'enabled' if enabled else 'disabled'}"
    }

@router.get("/audit-logs/{tenant_id}")
def get_audit_logs(
    tenant_id: str,
    limit: int = 100,
    request: Request = None,
    db: Session = Depends(get_db)
):
    logs = db.query(AuditLog).filter(
        AuditLog.tenant_id == tenant_id
    ).order_by(AuditLog.timestamp.desc()).limit(limit).all()
    
    return {
        "audit_logs": logs,
        "total_logs": len(logs)
    }

@router.get("/system/health")
def system_health_check(
    request: Request = None,
    db: Session = Depends(get_db)
):
    try:
        tenant_count = db.query(Tenant).count()
        user_count = db.query(User).count()
        
        return {
            "status": "healthy",
            "database": "connected",
            "tenants": tenant_count,
            "users": user_count,
            "timestamp": datetime.now()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"System health check failed: {str(e)}")

@router.get("/system/metrics")
def get_system_metrics(
    request: Request = None,
    db: Session = Depends(get_db)
):
    total_tenants = db.query(Tenant).filter(Tenant.is_active == True).count()
    total_users = db.query(User).filter(User.is_active == True).count()
    
    active_subscriptions = db.query(Subscription).filter(
        Subscription.is_active == True
    ).count()
    
    recent_logins = db.query(User).filter(
        User.last_login >= datetime.now().replace(hour=0, minute=0, second=0)
    ).count()
    
    return {
        "metrics": {
            "total_tenants": total_tenants,
            "total_users": total_users,
            "active_subscriptions": active_subscriptions,
            "daily_active_users": recent_logins
        },
        "system_info": {
            "version": "1.0.0",
            "environment": "development",
            "uptime": "24h 15m"
        }
    }
