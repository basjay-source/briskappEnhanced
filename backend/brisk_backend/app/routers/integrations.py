from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime, date
from decimal import Decimal

from app.database import get_db
from app.models import IntegrationAccount, BankConnection, EcommerceConnection

router = APIRouter()

class IntegrationCreate(BaseModel):
    company_id: str
    provider: str
    account_name: str
    credentials: Dict[str, Any]

class SyncRequest(BaseModel):
    integration_id: str
    sync_type: str
    date_from: Optional[date] = None
    date_to: Optional[date] = None

@router.get("/providers")
def get_integration_providers():
    return {
        "accounting": [
            {
                "name": "Xero",
                "description": "Cloud-based accounting software",
                "auth_type": "OAuth2",
                "capabilities": ["trial_balance", "journals", "contacts", "invoices"]
            },
            {
                "name": "QuickBooks Online",
                "description": "Intuit's cloud accounting platform",
                "auth_type": "OAuth2", 
                "capabilities": ["trial_balance", "journals", "customers", "vendors"]
            },
            {
                "name": "Sage Business Cloud",
                "description": "Sage's cloud accounting solution",
                "auth_type": "API_Key",
                "capabilities": ["trial_balance", "transactions", "contacts"]
            },
            {
                "name": "FreeAgent",
                "description": "Accounting software for freelancers and small businesses",
                "auth_type": "OAuth2",
                "capabilities": ["trial_balance", "invoices", "expenses", "contacts"]
            }
        ],
        "banking": [
            {
                "name": "TrueLayer",
                "description": "Open Banking API provider",
                "auth_type": "OAuth2",
                "capabilities": ["account_info", "transactions", "balance"]
            },
            {
                "name": "GoCardless",
                "description": "Direct debit and Open Banking",
                "auth_type": "API_Key",
                "capabilities": ["account_info", "transactions", "direct_debits"]
            },
            {
                "name": "Plaid",
                "description": "Financial data aggregation",
                "auth_type": "API_Key",
                "capabilities": ["account_info", "transactions", "identity"]
            }
        ],
        "ecommerce": [
            {
                "name": "Amazon SP-API",
                "description": "Amazon Seller Partner API",
                "auth_type": "OAuth2",
                "capabilities": ["orders", "settlements", "fees", "inventory"]
            },
            {
                "name": "eBay",
                "description": "eBay Trading API",
                "auth_type": "OAuth2",
                "capabilities": ["orders", "fees", "listings"]
            },
            {
                "name": "Shopify",
                "description": "Shopify Admin API",
                "auth_type": "API_Key",
                "capabilities": ["orders", "products", "customers", "payouts"]
            },
            {
                "name": "Etsy",
                "description": "Etsy Open API",
                "auth_type": "OAuth2",
                "capabilities": ["orders", "listings", "fees"]
            }
        ],
        "government": [
            {
                "name": "HMRC MTD",
                "description": "Making Tax Digital API",
                "auth_type": "OAuth2",
                "capabilities": ["vat_returns", "income_tax", "corporation_tax"]
            },
            {
                "name": "Companies House",
                "description": "Companies House API",
                "auth_type": "API_Key",
                "capabilities": ["company_info", "filings", "officers", "pscs"]
            }
        ]
    }

@router.post("/connect")
def create_integration(
    integration_data: IntegrationCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    integration = IntegrationAccount(
        tenant_id=request.state.tenant_id,
        company_id=integration_data.company_id,
        provider=integration_data.provider,
        account_id=f"{integration_data.provider.lower()}-{integration_data.company_id[:8]}",
        account_name=integration_data.account_name,
        credentials=integration_data.credentials,
        sync_status="connected"
    )
    
    db.add(integration)
    db.commit()
    db.refresh(integration)
    
    return {
        "integration": integration,
        "status": "connected",
        "message": f"Successfully connected to {integration_data.provider}",
        "next_steps": [
            "Configure sync settings",
            "Run initial data sync",
            "Set up automated sync schedule"
        ]
    }

@router.get("/connections/{company_id}")
def get_integrations(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    integrations = db.query(IntegrationAccount).filter(
        IntegrationAccount.tenant_id == request.state.tenant_id,
        IntegrationAccount.company_id == company_id,
        IntegrationAccount.is_active == True
    ).all()
    
    return {
        "integrations": integrations,
        "total_connections": len(integrations),
        "by_provider": {
            integration.provider: integration.sync_status 
            for integration in integrations
        }
    }

@router.post("/sync")
def sync_integration_data(
    sync_request: SyncRequest,
    request: Request = None,
    db: Session = Depends(get_db)
):
    integration = db.query(IntegrationAccount).filter(
        IntegrationAccount.tenant_id == request.state.tenant_id,
        IntegrationAccount.id == sync_request.integration_id
    ).first()
    
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    
    if sync_request.sync_type == "trial_balance":
        mock_data = generate_mock_trial_balance(integration.provider)
    elif sync_request.sync_type == "transactions":
        mock_data = generate_mock_transactions(integration.provider)
    elif sync_request.sync_type == "contacts":
        mock_data = generate_mock_contacts(integration.provider)
    else:
        mock_data = {"message": "Sync type not supported"}
    
    integration.last_sync = datetime.now()
    integration.sync_status = "synced"
    db.commit()
    
    return {
        "integration_id": sync_request.integration_id,
        "provider": integration.provider,
        "sync_type": sync_request.sync_type,
        "status": "completed",
        "data": mock_data,
        "records_synced": len(mock_data.get("records", [])),
        "last_sync": integration.last_sync
    }

@router.post("/xero/oauth/callback")
def xero_oauth_callback(
    code: str,
    state: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    mock_token_response = {
        "access_token": "xero_access_token_123",
        "refresh_token": "xero_refresh_token_456",
        "expires_in": 3600,
        "token_type": "Bearer",
        "scope": "accounting.transactions accounting.contacts"
    }
    
    return {
        "status": "success",
        "message": "Xero authorization successful",
        "tokens": mock_token_response,
        "next_step": "Create integration with received tokens"
    }

@router.post("/quickbooks/oauth/callback")
def quickbooks_oauth_callback(
    code: str,
    state: str,
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    mock_token_response = {
        "access_token": "qbo_access_token_789",
        "refresh_token": "qbo_refresh_token_012",
        "expires_in": 3600,
        "company_id": company_id
    }
    
    return {
        "status": "success",
        "message": "QuickBooks Online authorization successful",
        "tokens": mock_token_response,
        "company_id": company_id
    }

@router.post("/hmrc/oauth/callback")
def hmrc_oauth_callback(
    code: str,
    state: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    mock_token_response = {
        "access_token": "hmrc_access_token_345",
        "refresh_token": "hmrc_refresh_token_678",
        "expires_in": 14400,
        "scope": "read:vat write:vat"
    }
    
    return {
        "status": "success",
        "message": "HMRC MTD authorization successful",
        "tokens": mock_token_response,
        "available_services": ["VAT", "Income Tax", "Corporation Tax"]
    }

def generate_mock_trial_balance(provider: str) -> Dict[str, Any]:
    return {
        "provider": provider,
        "records": [
            {"account_code": "1000", "account_name": "Bank Current Account", "debit": 15000.00, "credit": 0.00},
            {"account_code": "1200", "account_name": "Trade Debtors", "debit": 8500.00, "credit": 0.00},
            {"account_code": "2100", "account_name": "Trade Creditors", "debit": 0.00, "credit": 4200.00},
            {"account_code": "4000", "account_name": "Sales", "debit": 0.00, "credit": 45000.00},
            {"account_code": "5000", "account_name": "Cost of Sales", "debit": 18000.00, "credit": 0.00},
            {"account_code": "6000", "account_name": "Office Expenses", "debit": 3200.00, "credit": 0.00},
            {"account_code": "7000", "account_name": "Professional Fees", "debit": 2500.00, "credit": 0.00}
        ],
        "period_end": "2024-01-31",
        "currency": "GBP"
    }

def generate_mock_transactions(provider: str) -> Dict[str, Any]:
    return {
        "provider": provider,
        "records": [
            {
                "date": "2024-01-15",
                "description": "Customer Payment - ABC Ltd",
                "amount": 2500.00,
                "type": "receipt",
                "account": "Bank Current Account"
            },
            {
                "date": "2024-01-16",
                "description": "Office Rent Payment",
                "amount": -800.00,
                "type": "payment",
                "account": "Office Expenses"
            },
            {
                "date": "2024-01-17",
                "description": "Supplier Payment - XYZ Corp",
                "amount": -1200.00,
                "type": "payment",
                "account": "Trade Creditors"
            }
        ]
    }

def generate_mock_contacts(provider: str) -> Dict[str, Any]:
    return {
        "provider": provider,
        "records": [
            {
                "name": "ABC Limited",
                "type": "customer",
                "email": "accounts@abcltd.com",
                "phone": "+44 20 7123 4567",
                "address": "123 Business Street, London, EC1A 1BB"
            },
            {
                "name": "XYZ Corporation",
                "type": "supplier",
                "email": "invoices@xyzcorp.com",
                "phone": "+44 161 234 5678",
                "address": "456 Industrial Road, Manchester, M1 2CD"
            }
        ]
    }
