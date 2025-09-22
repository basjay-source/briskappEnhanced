from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional, Dict, Any
from datetime import datetime, date
from pydantic import BaseModel
import json

router = APIRouter(prefix="/api/charity-accounts", tags=["charity-accounts"])

class Entity(BaseModel):
    id: str
    name: str
    type: str  # charity, academy, mat
    charity_number: Optional[str] = None
    company_number: Optional[str] = None
    esfa_uid: Optional[str] = None
    year_end: Optional[str] = None

class DashboardTile(BaseModel):
    id: str
    title: str
    description: str
    status: str  # error, warning, success, info
    count: Optional[int] = None
    action: str
    link: str

class ComplianceItem(BaseModel):
    id: str
    title: str
    due_date: str
    status: str  # overdue, due-soon, completed, pending
    type: str  # charity-commission, companies-house, esfa, hmrc

class Fund(BaseModel):
    id: str
    name: str
    type: str  # unrestricted, restricted, endowment, restricted-fa
    balance: float
    restrictions: Optional[str] = None

class GrantRecord(BaseModel):
    id: str
    donor: str
    amount: float
    fund_type: str
    recognition_method: str  # performance, deferral
    terms: Optional[str] = None
    received_date: Optional[str] = None

class SoFALine(BaseModel):
    id: str
    description: str
    unrestricted: float
    restricted: float
    endowment: float
    total: float
    category: str  # income, expenditure

SAMPLE_ENTITIES = [
    {
        "id": "1",
        "name": "St. Mary's Charity",
        "type": "charity",
        "charity_number": "123456",
        "company_number": "SC123456",
        "year_end": "2024-03-31"
    },
    {
        "id": "2",
        "name": "Greenfield Academy Trust",
        "type": "academy",
        "esfa_uid": "12345",
        "company_number": "12345678",
        "year_end": "2024-08-31"
    },
    {
        "id": "3",
        "name": "Excellence Multi Academy Trust",
        "type": "mat",
        "esfa_uid": "54321",
        "company_number": "87654321",
        "year_end": "2024-08-31"
    }
]

SAMPLE_DASHBOARD_TILES = [
    {
        "id": "funds-balance",
        "title": "Funds Not Balancing",
        "description": "Restricted fund showing deficit of £15,000",
        "status": "error",
        "count": 2,
        "action": "Review Fund Movements",
        "link": "/charity-accounts/fund-movements"
    },
    {
        "id": "unmapped-income",
        "title": "Unmapped Income Lines",
        "description": "12 income transactions need fund allocation",
        "status": "warning",
        "count": 12,
        "action": "Complete Mapping",
        "link": "/charity-accounts/import-mapping"
    },
    {
        "id": "capital-grants",
        "title": "Capital Grants Deferral Check",
        "description": "DfE capital grant requires deferral review",
        "status": "warning",
        "count": 1,
        "action": "Review Deferral",
        "link": "/charity-accounts/grants-donations"
    },
    {
        "id": "ready-to-file",
        "title": "Ready to File",
        "description": "All checks passed, ready for submission",
        "status": "success",
        "action": "Proceed to Filing",
        "link": "/charity-accounts/filing-returns"
    }
]

SAMPLE_COMPLIANCE = [
    {
        "id": "cc-annual-return",
        "title": "Charity Commission Annual Return",
        "due_date": "2024-12-31",
        "status": "due-soon",
        "type": "charity-commission"
    },
    {
        "id": "ch-accounts",
        "title": "Companies House Accounts Filing",
        "due_date": "2024-12-31",
        "status": "pending",
        "type": "companies-house"
    },
    {
        "id": "esfa-accounts-return",
        "title": "ESFA Accounts Return",
        "due_date": "2024-12-31",
        "status": "pending",
        "type": "esfa"
    }
]

SAMPLE_FUNDS = [
    {
        "id": "1",
        "name": "General Fund",
        "type": "unrestricted",
        "balance": 125000.00,
        "restrictions": None
    },
    {
        "id": "2",
        "name": "Building Fund",
        "type": "restricted",
        "balance": 75000.00,
        "restrictions": "Building maintenance and improvements only"
    },
    {
        "id": "3",
        "name": "Endowment Fund",
        "type": "endowment",
        "balance": 500000.00,
        "restrictions": "Capital to be maintained in perpetuity"
    },
    {
        "id": "4",
        "name": "Fixed Asset Fund",
        "type": "restricted-fa",
        "balance": 250000.00,
        "restrictions": "Represents fixed assets funded by restricted income"
    }
]

SAMPLE_GRANTS = [
    {
        "id": "1",
        "donor": "Department for Education",
        "amount": 150000.00,
        "fund_type": "restricted-fa",
        "recognition_method": "deferral",
        "terms": "Capital grant for building improvements",
        "received_date": "2024-04-01"
    },
    {
        "id": "2",
        "donor": "Local Authority",
        "amount": 25000.00,
        "fund_type": "restricted",
        "recognition_method": "performance",
        "terms": "Youth program delivery",
        "received_date": "2024-06-15"
    },
    {
        "id": "3",
        "donor": "Private Foundation",
        "amount": 50000.00,
        "fund_type": "unrestricted",
        "recognition_method": "performance",
        "terms": "General charitable purposes",
        "received_date": "2024-07-01"
    }
]

@router.get("/entities")
async def get_entities() -> List[Dict[str, Any]]:
    """Get list of charity/academy entities"""
    return SAMPLE_ENTITIES

@router.get("/dashboard")
async def get_dashboard_data(
    entity: str,
    year: str,
    mode: str,
    framework: str
) -> Dict[str, Any]:
    """Get dashboard data including tiles and compliance timeline"""
    return {
        "tiles": SAMPLE_DASHBOARD_TILES,
        "compliance": SAMPLE_COMPLIANCE,
        "entity": entity,
        "year": year,
        "mode": mode,
        "framework": framework
    }

@router.get("/funds")
async def get_funds(entity: str, year: str) -> List[Dict[str, Any]]:
    """Get fund structure for entity"""
    return SAMPLE_FUNDS

@router.post("/funds")
async def create_fund(fund: Fund) -> Dict[str, Any]:
    """Create new fund"""
    new_fund = fund.dict()
    new_fund["id"] = str(len(SAMPLE_FUNDS) + 1)
    SAMPLE_FUNDS.append(new_fund)
    return {"message": "Fund created successfully", "fund": new_fund}

@router.put("/funds/{fund_id}")
async def update_fund(fund_id: str, fund: Fund) -> Dict[str, Any]:
    """Update existing fund"""
    for i, existing_fund in enumerate(SAMPLE_FUNDS):
        if existing_fund["id"] == fund_id:
            SAMPLE_FUNDS[i] = fund.dict()
            SAMPLE_FUNDS[i]["id"] = fund_id
            return {"message": "Fund updated successfully", "fund": SAMPLE_FUNDS[i]}
    raise HTTPException(status_code=404, detail="Fund not found")

@router.delete("/funds/{fund_id}")
async def delete_fund(fund_id: str) -> Dict[str, Any]:
    """Delete fund"""
    for i, fund in enumerate(SAMPLE_FUNDS):
        if fund["id"] == fund_id:
            deleted_fund = SAMPLE_FUNDS.pop(i)
            return {"message": "Fund deleted successfully", "fund": deleted_fund}
    raise HTTPException(status_code=404, detail="Fund not found")

@router.get("/grants")
async def get_grants(entity: str, year: str) -> List[Dict[str, Any]]:
    """Get grants and donations"""
    return SAMPLE_GRANTS

@router.post("/grants")
async def create_grant(grant: GrantRecord) -> Dict[str, Any]:
    """Create new grant record"""
    new_grant = grant.dict()
    new_grant["id"] = str(len(SAMPLE_GRANTS) + 1)
    SAMPLE_GRANTS.append(new_grant)
    return {"message": "Grant created successfully", "grant": new_grant}

@router.put("/grants/{grant_id}")
async def update_grant(grant_id: str, grant: GrantRecord) -> Dict[str, Any]:
    """Update existing grant"""
    for i, existing_grant in enumerate(SAMPLE_GRANTS):
        if existing_grant["id"] == grant_id:
            SAMPLE_GRANTS[i] = grant.dict()
            SAMPLE_GRANTS[i]["id"] = grant_id
            return {"message": "Grant updated successfully", "grant": SAMPLE_GRANTS[i]}
    raise HTTPException(status_code=404, detail="Grant not found")

@router.delete("/grants/{grant_id}")
async def delete_grant(grant_id: str) -> Dict[str, Any]:
    """Delete grant"""
    for i, grant in enumerate(SAMPLE_GRANTS):
        if grant["id"] == grant_id:
            deleted_grant = SAMPLE_GRANTS.pop(i)
            return {"message": "Grant deleted successfully", "grant": deleted_grant}
    raise HTTPException(status_code=404, detail="Grant not found")

@router.get("/sofa")
async def get_sofa_data(entity: str, year: str, fund: str = "all") -> Dict[str, Any]:
    """Get Statement of Financial Activities data"""
    sample_sofa = {
        "income": [
            {
                "id": "donations",
                "description": "Donations and legacies",
                "unrestricted": 125000.00,
                "restricted": 75000.00,
                "endowment": 0.00,
                "total": 200000.00,
                "category": "income"
            },
            {
                "id": "charitable-activities",
                "description": "Income from charitable activities",
                "unrestricted": 85000.00,
                "restricted": 150000.00,
                "endowment": 0.00,
                "total": 235000.00,
                "category": "income"
            },
            {
                "id": "investments",
                "description": "Investment income",
                "unrestricted": 15000.00,
                "restricted": 0.00,
                "endowment": 25000.00,
                "total": 40000.00,
                "category": "income"
            }
        ],
        "expenditure": [
            {
                "id": "charitable-activities-exp",
                "description": "Charitable activities",
                "unrestricted": 180000.00,
                "restricted": 200000.00,
                "endowment": 0.00,
                "total": 380000.00,
                "category": "expenditure"
            },
            {
                "id": "raising-funds",
                "description": "Raising funds",
                "unrestricted": 25000.00,
                "restricted": 0.00,
                "endowment": 0.00,
                "total": 25000.00,
                "category": "expenditure"
            }
        ]
    }
    return sample_sofa

@router.post("/sofa")
async def update_sofa_line(sofa_line: SoFALine) -> Dict[str, Any]:
    """Update SoFA line item"""
    return {"message": "SoFA line updated successfully", "line": sofa_line.dict()}

@router.get("/trial-balance")
async def get_trial_balance(entity: str, year: str) -> Dict[str, Any]:
    """Get trial balance data"""
    sample_tb = {
        "accounts": [
            {"code": "1000", "name": "Cash at Bank", "debit": 125000.00, "credit": 0.00, "fund": "unrestricted"},
            {"code": "1100", "name": "Debtors", "debit": 25000.00, "credit": 0.00, "fund": "unrestricted"},
            {"code": "1200", "name": "Fixed Assets", "debit": 500000.00, "credit": 0.00, "fund": "restricted-fa"},
            {"code": "2000", "name": "Creditors", "debit": 0.00, "credit": 15000.00, "fund": "unrestricted"},
            {"code": "3000", "name": "Unrestricted Funds", "debit": 0.00, "credit": 125000.00, "fund": "unrestricted"},
            {"code": "3100", "name": "Restricted Funds", "debit": 0.00, "credit": 75000.00, "fund": "restricted"},
            {"code": "3200", "name": "Endowment Funds", "debit": 0.00, "credit": 500000.00, "fund": "endowment"}
        ],
        "totals": {
            "total_debit": 650000.00,
            "total_credit": 650000.00,
            "balanced": True
        }
    }
    return sample_tb

@router.get("/reports/fund-movements")
async def get_fund_movements_report(entity: str, year: str) -> Dict[str, Any]:
    """Get fund movements report"""
    sample_movements = {
        "funds": [
            {
                "fund_name": "Unrestricted",
                "opening_balance": 100000.00,
                "income": 225000.00,
                "expenditure": -205000.00,
                "transfers_in": 0.00,
                "transfers_out": 0.00,
                "gains_losses": 5000.00,
                "closing_balance": 125000.00
            },
            {
                "fund_name": "Restricted",
                "opening_balance": 50000.00,
                "income": 225000.00,
                "expenditure": -200000.00,
                "transfers_in": 0.00,
                "transfers_out": 0.00,
                "gains_losses": 0.00,
                "closing_balance": 75000.00
            }
        ]
    }
    return sample_movements

@router.get("/reports/free-reserves")
async def get_free_reserves_report(entity: str, year: str) -> Dict[str, Any]:
    """Get free reserves analysis"""
    sample_reserves = {
        "unrestricted_funds": 125000.00,
        "designated_funds": 25000.00,
        "fixed_assets": 500000.00,
        "free_reserves": 100000.00,
        "months_cover": 6.2,
        "reserves_policy": "Maintain 3-6 months operating costs",
        "policy_compliance": "Within policy range"
    }
    return sample_reserves
