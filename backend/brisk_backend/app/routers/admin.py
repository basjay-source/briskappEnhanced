from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime, date
from decimal import Decimal

from app.database import get_db
from app.models import (
    Tenant, User, Subscription, FeatureFlag, AuditLog,
    PlanVersion, Promotion, UsageMeter, Invoice, Experiment, ApprovalRequest,
    AdminPersona, SubscriptionStatus, InvoiceStatus, PromotionStatus, ExperimentStatus
)

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


class PlanVersionCreate(BaseModel):
    name: str
    version: str
    features: Dict[str, Any] = {}
    limits: Dict[str, Any] = {}
    pricing: Dict[str, Any] = {}
    meters: List[Dict[str, Any]] = []
    regions: List[Dict[str, Any]] = []
    active_from: Optional[datetime] = None

class PromotionCreate(BaseModel):
    code: str
    name: str
    type: str
    value: Decimal
    duration: Optional[str] = None
    eligibility: Optional[str] = None
    stacking: str = "exclusive"
    caps: Dict[str, Any] = {}
    expires_at: Optional[datetime] = None

class ExperimentCreate(BaseModel):
    name: str
    description: Optional[str] = None
    variants: List[Dict[str, Any]] = []
    audience: Dict[str, Any] = {}

class ApprovalRequestCreate(BaseModel):
    action_type: str
    entity_type: str
    entity_id: Optional[str] = None
    data: Dict[str, Any] = {}
    required_approvers: List[str] = []

@router.post("/plan-versions")
def create_plan_version(
    plan_data: PlanVersionCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    plan_version = PlanVersion(
        name=plan_data.name,
        version=plan_data.version,
        features=plan_data.features,
        limits=plan_data.limits,
        pricing=plan_data.pricing,
        meters=plan_data.meters,
        regions=plan_data.regions,
        active_from=plan_data.active_from,
        status="draft"
    )
    
    db.add(plan_version)
    db.commit()
    db.refresh(plan_version)
    
    return {
        "plan_version": plan_version,
        "message": "Plan version created successfully"
    }

@router.get("/plan-versions")
def get_plan_versions(
    request: Request = None,
    db: Session = Depends(get_db)
):
    plan_versions = db.query(PlanVersion).all()
    return {
        "plan_versions": plan_versions,
        "total": len(plan_versions)
    }

@router.post("/promotions")
def create_promotion(
    promo_data: PromotionCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    promotion = Promotion(
        code=promo_data.code,
        name=promo_data.name,
        type=promo_data.type,
        value=promo_data.value,
        duration=promo_data.duration,
        eligibility=promo_data.eligibility,
        stacking=promo_data.stacking,
        caps=promo_data.caps,
        expires_at=promo_data.expires_at,
        status=PromotionStatus.DRAFT
    )
    
    db.add(promotion)
    db.commit()
    db.refresh(promotion)
    
    return {
        "promotion": promotion,
        "message": "Promotion created successfully"
    }

@router.get("/promotions")
def get_promotions(
    request: Request = None,
    db: Session = Depends(get_db)
):
    promotions = db.query(Promotion).all()
    return {
        "promotions": promotions,
        "total": len(promotions)
    }

@router.post("/experiments")
def create_experiment(
    exp_data: ExperimentCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    experiment = Experiment(
        name=exp_data.name,
        description=exp_data.description,
        variants=exp_data.variants,
        audience=exp_data.audience,
        status=ExperimentStatus.DRAFT
    )
    
    db.add(experiment)
    db.commit()
    db.refresh(experiment)
    
    return {
        "experiment": experiment,
        "message": "Experiment created successfully"
    }

@router.get("/experiments")
def get_experiments(
    request: Request = None,
    db: Session = Depends(get_db)
):
    experiments = db.query(Experiment).all()
    return {
        "experiments": experiments,
        "total": len(experiments)
    }

@router.post("/entitlements/resolve")
def resolve_entitlements(
    tenant_id: str,
    feature: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    
    subscription = db.query(Subscription).filter(
        Subscription.tenant_id == tenant_id,
        Subscription.status == SubscriptionStatus.ACTIVE
    ).first()
    
    if not subscription:
        return {
            "entitled": False,
            "reason": "No active subscription",
            "limits": {}
        }
    
    plan_version = db.query(PlanVersion).filter(
        PlanVersion.id == subscription.plan_version_id
    ).first()
    
    if not plan_version:
        return {
            "entitled": False,
            "reason": "Plan version not found",
            "limits": {}
        }
    
    entitled_features = plan_version.features
    limits = plan_version.limits
    
    if feature and feature not in entitled_features:
        return {
            "entitled": False,
            "reason": f"Feature '{feature}' not in plan",
            "limits": limits
        }
    
    return {
        "entitled": True,
        "features": entitled_features,
        "limits": limits,
        "usage": subscription.usage,
        "source": f"{plan_version.name} v{plan_version.version}"
    }

@router.post("/usage-meters")
def record_usage(
    tenant_id: str,
    meter_key: str,
    value: int,
    request: Request = None,
    db: Session = Depends(get_db)
):
    now = datetime.now()
    period_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    usage_meter = db.query(UsageMeter).filter(
        UsageMeter.tenant_id == tenant_id,
        UsageMeter.meter_key == meter_key,
        UsageMeter.period_start == period_start
    ).first()
    
    if usage_meter:
        usage_meter.value += value
    else:
        usage_meter = UsageMeter(
            tenant_id=tenant_id,
            meter_key=meter_key,
            value=value,
            period_start=period_start,
            period_end=period_start.replace(month=period_start.month + 1)
        )
        db.add(usage_meter)
    
    db.commit()
    
    return {
        "usage_meter": usage_meter,
        "message": "Usage recorded successfully"
    }

@router.get("/usage-meters/{tenant_id}")
def get_tenant_usage(
    tenant_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    usage_meters = db.query(UsageMeter).filter(
        UsageMeter.tenant_id == tenant_id
    ).all()
    
    return {
        "usage_meters": usage_meters,
        "total": len(usage_meters)
    }

@router.post("/approval-requests")
def create_approval_request(
    approval_data: ApprovalRequestCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    approval_request = ApprovalRequest(
        requester_id=request.state.user_id,
        action_type=approval_data.action_type,
        entity_type=approval_data.entity_type,
        entity_id=approval_data.entity_id,
        data=approval_data.data,
        required_approvers=approval_data.required_approvers,
        status="pending"
    )
    
    db.add(approval_request)
    db.commit()
    db.refresh(approval_request)
    
    return {
        "approval_request": approval_request,
        "message": "Approval request created successfully"
    }

@router.get("/approval-requests")
def get_approval_requests(
    status: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(ApprovalRequest)
    
    if status:
        query = query.filter(ApprovalRequest.status == status)
    
    approval_requests = query.all()
    
    return {
        "approval_requests": approval_requests,
        "total": len(approval_requests)
    }
