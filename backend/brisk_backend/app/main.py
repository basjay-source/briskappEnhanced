from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from contextlib import asynccontextmanager
import uvicorn

from app.database import create_tables
from app.routers import accounts, tax_ct, tax_sa, payroll, aml, cosec, books, esign, ai_advisers, integrations, admin, practice, charity, templates, search, vat, vat_enhanced, documents, docusinage, docusinage_enterprise, audit, reports, international_vat
from app.middleware.tenant import TenantMiddleware
from app.middleware.auth import AuthMiddleware
from app.middleware.audit import AuditMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield

app = FastAPI(
    title="Brisk Practice Suite API",
    description="All-in-one accounting software with AI assistants",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(TenantMiddleware)
app.add_middleware(AuthMiddleware)
app.add_middleware(AuditMiddleware)

app.include_router(accounts.router, prefix="/api/v1/accounts", tags=["Accounts Production"])
app.include_router(tax_ct.router, prefix="/api/v1/tax/ct", tags=["Business Tax"])
app.include_router(tax_sa.router, prefix="/api/v1/tax/sa", tags=["Personal Tax"])
app.include_router(payroll.router, prefix="/api/v1/payroll", tags=["Payroll"])
app.include_router(aml.router, prefix="/api/v1/aml", tags=["AML/KYC"])
app.include_router(cosec.router, prefix="/api/v1/cosec", tags=["Company Secretarial"])
app.include_router(books.router, prefix="/api/v1/books", tags=["Bookkeeping"])
app.include_router(esign.router, prefix="/api/v1/esign", tags=["e-Signature"])
app.include_router(ai_advisers.router, prefix="/api/v1/ai", tags=["AI Advisers"])
app.include_router(integrations.router, prefix="/api/v1/integrations", tags=["Integrations"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Administration"])
app.include_router(practice.router, prefix="/api/v1/practice", tags=["Practice Management"])
app.include_router(search.router, prefix="/api/v1", tags=["Search"])
app.include_router(vat.router, prefix="/api/v1/vat", tags=["VAT"])
app.include_router(vat_enhanced.router, prefix="/api/v1/vat", tags=["VAT Enhanced"])
app.include_router(international_vat.router, prefix="/api/v1/international-vat", tags=["International VAT"])
app.include_router(charity.router, prefix="/api/v1/charity", tags=["Charity & Academy Accounts"])
app.include_router(templates.router, prefix="/api/v1/templates", tags=["Templates"])
app.include_router(documents.router, prefix="/api/v1", tags=["Document Management"])
app.include_router(docusinage.router, prefix="/api/v1", tags=["Docusinage Enterprise"])
app.include_router(docusinage_enterprise.router, prefix="/api/v1", tags=["Docusinage Enterprise"])
app.include_router(audit.router, prefix="/api/v1", tags=["Enterprise Audit Trail"])
app.include_router(reports.router, prefix="/api/v1", tags=["Financial Reports"])

@app.get("/")
def read_root():
    return {
        "message": "Brisk Practice Suite API",
        "version": "1.0.0",
        "modules": [
            "Accounts Production",
            "Business Tax", 
            "Personal Tax",
            "Payroll",
            "AML/KYC",
            "Company Secretarial",
            "Bookkeeping",
            "e-Signature"
        ],
        "ai_advisers": [
            "AccountsAdviser",
            "Business Tax Adviser",
            "Personal Tax Adviser", 
            "HR Adviser",
            "Company Secretary"
        ]
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
