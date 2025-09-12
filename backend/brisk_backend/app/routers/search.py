from fastapi import APIRouter, Depends, Request, Query
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from app.database import get_db
from app.models import Job, Client, Company, FinancialStatement

router = APIRouter()

@router.get("/search")
def search_across_modules(
    q: str = Query(..., description="Search query"),
    modules: Optional[str] = Query(None, description="Comma-separated module names"),
    request: Request = None,
    db: Session = Depends(get_db)
):
    results = {
        "jobs": [],
        "clients": [],
        "companies": [],
        "statements": [],
        "total_results": 0
    }
    
    search_modules = modules.split(',') if modules else []
    
    if not modules or "practice" in search_modules:
        jobs = db.query(Job).filter(
            Job.tenant_id == request.state.tenant_id,
            Job.title.ilike(f"%{q}%")
        ).limit(10).all()
        results["jobs"] = [
            {
                "id": job.id,
                "title": job.title,
                "client": job.client_name,
                "status": job.status,
                "type": "job"
            } for job in jobs
        ]
    
    if not modules or "clients" in search_modules:
        clients = db.query(Client).filter(
            Client.tenant_id == request.state.tenant_id,
            Client.name.ilike(f"%{q}%")
        ).limit(10).all()
        results["clients"] = [
            {
                "id": client.id,
                "name": client.name,
                "company_number": client.company_number,
                "type": "client"
            } for client in clients
        ]
    
    if not modules or "companies" in search_modules:
        companies = db.query(Company).filter(
            Company.tenant_id == request.state.tenant_id,
            Company.name.ilike(f"%{q}%")
        ).limit(10).all()
        results["companies"] = [
            {
                "id": company.id,
                "name": company.name,
                "company_number": company.company_number,
                "type": "company"
            } for company in companies
        ]
    
    if not modules or "accounts" in search_modules:
        statements = db.query(FinancialStatement).filter(
            FinancialStatement.tenant_id == request.state.tenant_id,
            FinancialStatement.statement_type.ilike(f"%{q}%")
        ).limit(10).all()
        results["statements"] = [
            {
                "id": statement.id,
                "statement_type": statement.statement_type,
                "company_id": statement.company_id,
                "period_start": statement.period_start.isoformat() if statement.period_start else None,
                "period_end": statement.period_end.isoformat() if statement.period_end else None,
                "type": "statement"
            } for statement in statements
        ]
    
    results["total_results"] = (
        len(results["jobs"]) + 
        len(results["clients"]) + 
        len(results["companies"]) + 
        len(results["statements"])
    )
    
    return results

@router.get("/search/suggestions")
def get_search_suggestions(
    q: str = Query(..., description="Partial search query"),
    request: Request = None,
    db: Session = Depends(get_db)
):
    suggestions = []
    
    if len(q) >= 2:
        job_titles = db.query(Job.title).filter(
            Job.tenant_id == request.state.tenant_id,
            Job.title.ilike(f"%{q}%")
        ).limit(5).all()
        
        client_names = db.query(Client.name).filter(
            Client.tenant_id == request.state.tenant_id,
            Client.name.ilike(f"%{q}%")
        ).limit(5).all()
        
        suggestions.extend([title[0] for title in job_titles])
        suggestions.extend([name[0] for name in client_names])
    
    return {"suggestions": list(set(suggestions))[:10]}
