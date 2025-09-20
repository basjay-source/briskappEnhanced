from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import create_tables
from .routers import auth, admin, document_hub, practice_management, aml_kyc, time_fees, bookkeeping
from .models import (
    Tenant, OrgUnit, User, Subscription, UserRole, 
    Environment, Region, SubscriptionStatus
)
from .database import get_db, SessionLocal
from .auth import get_password_hash

app = FastAPI(title="Brisk Admin Suite", version="1.0.0")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(document_hub.router)
app.include_router(practice_management.router)
app.include_router(aml_kyc.router)
app.include_router(time_fees.router)
app.include_router(bookkeeping.router)

@app.on_event("startup")
async def startup_event():
    create_tables()
    
    db = SessionLocal()
    try:
        if not db.query(Tenant).first():
            default_tenant = Tenant(
                name="Brisk Accountants",
                legal_entity="Brisk Accountants Ltd",
                primary_region=Region.UK,
                environment=Environment.PRODUCTION
            )
            db.add(default_tenant)
            db.commit()
            db.refresh(default_tenant)
            
            admin_user = User(
                email="admin@briskaccountants.com",
                hashed_password=get_password_hash("admin123"),
                full_name="Admin User",
                role=UserRole.SUPER_ADMIN,
                tenant_id=default_tenant.id,
                is_active=True
            )
            db.add(admin_user)
            
            default_org = OrgUnit(
                tenant_id=default_tenant.id,
                name="Head Office",
                office_type="office",
                timezone="Europe/London",
                currency="GBP"
            )
            db.add(default_org)
            
            default_subscription = Subscription(
                tenant_id=default_tenant.id,
                plan_name="Professional",
                status=SubscriptionStatus.ACTIVE,
                seats=10,
                amount=9900,
                currency="GBP"
            )
            db.add(default_subscription)
            
            db.commit()
    finally:
        db.close()

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {
        "message": "Brisk Admin Suite API",
        "version": "1.0.0",
        "docs": "/docs"
    }
