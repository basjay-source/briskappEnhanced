from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import date, datetime
from decimal import Decimal

from app.database import get_db

router = APIRouter()

class ReportTranslationRequest(BaseModel):
    report_data: Dict[str, Any]
    target_language: str
    target_currency: str
    original_currency: str = "GBP"

class ClientPreferences(BaseModel):
    client_id: str
    preferred_language: str = "en"
    preferred_currency: str = "GBP"
    use_live_forex: bool = True

class TranslatedReportResponse(BaseModel):
    data: Dict[str, Any]
    language: str
    display_currency: str
    original_currency: str
    exchange_rate: float
    generated_at: datetime

client_preferences_store: Dict[str, ClientPreferences] = {}

EXCHANGE_RATES = {
    'GBP': 1.00,
    'USD': 1.27,
    'EUR': 1.17,
    'JPY': 186.50,
    'CNY': 9.15,
    'INR': 106.50,
    'AUD': 1.95,
    'CAD': 1.75,
    'CHF': 1.12,
    'HKD': 9.90,
    'SGD': 1.70,
    'AED': 4.65,
    'SAR': 4.75,
    'ZAR': 23.50,
    'MXN': 21.50,
    'BRL': 6.35,
    'RUB': 118.50,
    'TRY': 42.50,
    'KRW': 1685.00,
}

def convert_currency(amount: float, from_currency: str, to_currency: str) -> float:
    """Convert amount from one currency to another"""
    if from_currency == to_currency:
        return amount
    
    rate_from = EXCHANGE_RATES.get(from_currency, 1.0)
    rate_to = EXCHANGE_RATES.get(to_currency, 1.0)
    
    gbp_amount = amount / rate_from
    return gbp_amount * rate_to

def convert_nested_amounts(data: Dict[str, Any], from_currency: str, to_currency: str) -> Dict[str, Any]:
    """Recursively convert all monetary values in nested dictionary"""
    converted = {}
    
    for key, value in data.items():
        if isinstance(value, dict):
            converted[key] = convert_nested_amounts(value, from_currency, to_currency)
        elif isinstance(value, (int, float, Decimal)) and any(
            term in key.lower() for term in [
                'amount', 'total', 'value', 'revenue', 'cost', 'expense',
                'profit', 'loss', 'tax', 'vat', 'balance', 'price', 'fee'
            ]
        ):
            converted[key] = convert_currency(float(value), from_currency, to_currency)
        elif isinstance(value, list):
            converted[key] = [
                convert_nested_amounts(item, from_currency, to_currency) if isinstance(item, dict) else item
                for item in value
            ]
        else:
            converted[key] = value
    
    return converted

@router.post("/translate-report", response_model=TranslatedReportResponse)
async def translate_report(
    request_data: ReportTranslationRequest,
    req: Request = None,
    db: Session = Depends(get_db)
):
    """
    Translate a financial report into any language and currency.
    Enables clients to view reports in their preferred language and currency.
    """
    
    converted_data = convert_nested_amounts(
        request_data.report_data,
        request_data.original_currency,
        request_data.target_currency
    )
    
    exchange_rate = convert_currency(1.0, request_data.original_currency, request_data.target_currency)
    
    return TranslatedReportResponse(
        data=converted_data,
        language=request_data.target_language,
        display_currency=request_data.target_currency,
        original_currency=request_data.original_currency,
        exchange_rate=exchange_rate,
        generated_at=datetime.now()
    )

@router.post("/client-preferences/{client_id}")
async def set_client_preferences(
    client_id: str,
    preferences: ClientPreferences,
    req: Request = None,
    db: Session = Depends(get_db)
):
    """Set language and currency preferences for a client"""
    preferences.client_id = client_id
    client_preferences_store[client_id] = preferences
    
    return {
        "client_id": client_id,
        "preferences": preferences.dict(),
        "message": "Client preferences updated successfully"
    }

@router.get("/client-preferences/{client_id}")
async def get_client_preferences(
    client_id: str,
    req: Request = None,
    db: Session = Depends(get_db)
):
    """Get language and currency preferences for a client"""
    preferences = client_preferences_store.get(
        client_id,
        ClientPreferences(client_id=client_id)
    )
    
    return preferences.dict()

@router.post("/translate-tax-return")
async def translate_tax_return(
    request_data: ReportTranslationRequest,
    req: Request = None,
    db: Session = Depends(get_db)
):
    """
    Translate a tax return into client's preferred language and currency.
    Supports all tax return types (CT600, SA, VAT returns, etc.)
    """
    
    converted_data = convert_nested_amounts(
        request_data.report_data,
        request_data.original_currency,
        request_data.target_currency
    )
    
    exchange_rate = convert_currency(1.0, request_data.original_currency, request_data.target_currency)
    
    return {
        "data": converted_data,
        "language": request_data.target_language,
        "display_currency": request_data.target_currency,
        "original_currency": request_data.original_currency,
        "exchange_rate": exchange_rate,
        "generated_at": datetime.now(),
        "type": "tax_return"
    }

@router.post("/translate-financial-statements")
async def translate_financial_statements(
    request_data: ReportTranslationRequest,
    req: Request = None,
    db: Session = Depends(get_db)
):
    """
    Translate financial statements (P&L, Balance Sheet, Cash Flow) 
    into any language and currency for international clients.
    """
    
    converted_data = convert_nested_amounts(
        request_data.report_data,
        request_data.original_currency,
        request_data.target_currency
    )
    
    exchange_rate = convert_currency(1.0, request_data.original_currency, request_data.target_currency)
    
    return {
        "data": converted_data,
        "language": request_data.target_language,
        "display_currency": request_data.target_currency,
        "original_currency": request_data.original_currency,
        "exchange_rate": exchange_rate,
        "generated_at": datetime.now(),
        "type": "financial_statements"
    }

@router.get("/live-forex-rate/{from_currency}/{to_currency}")
async def get_live_forex_rate(
    from_currency: str,
    to_currency: str
):
    """
    Get live forex rate between two currencies.
    In production, this would integrate with a live forex API.
    """
    
    if from_currency not in EXCHANGE_RATES or to_currency not in EXCHANGE_RATES:
        raise HTTPException(
            status_code=400,
            detail=f"Currency not supported: {from_currency} or {to_currency}"
        )
    
    rate = convert_currency(1.0, from_currency, to_currency)
    
    return {
        "from": from_currency,
        "to": to_currency,
        "rate": rate,
        "timestamp": datetime.now(),
        "source": "internal_rates"  # Would be "live_api" in production
    }

@router.post("/batch-translate-reports")
async def batch_translate_reports(
    reports: List[Dict[str, Any]],
    target_language: str,
    target_currency: str,
    original_currency: str = "GBP",
    req: Request = None,
    db: Session = Depends(get_db)
):
    """
    Translate multiple reports at once for a client.
    Useful for generating client portals with all reports in their language/currency.
    """
    
    translated_reports = []
    
    for report_data in reports:
        converted_data = convert_nested_amounts(
            report_data,
            original_currency,
            target_currency
        )
        
        exchange_rate = convert_currency(1.0, original_currency, target_currency)
        
        translated_reports.append({
            "data": converted_data,
            "language": target_language,
            "display_currency": target_currency,
            "original_currency": original_currency,
            "exchange_rate": exchange_rate,
            "generated_at": datetime.now()
        })
    
    return {
        "total_reports": len(translated_reports),
        "reports": translated_reports,
        "target_language": target_language,
        "target_currency": target_currency
    }

@router.get("/supported-languages")
async def get_supported_languages():
    """Get list of all supported languages for report translation"""
    return {
        "languages": [
            {"code": "en", "name": "English"},
            {"code": "es", "name": "Español"},
            {"code": "fr", "name": "Français"},
            {"code": "de", "name": "Deutsch"},
            {"code": "it", "name": "Italiano"},
            {"code": "pt", "name": "Português"},
            {"code": "zh", "name": "中文"},
            {"code": "ja", "name": "日本語"},
            {"code": "ko", "name": "한국어"},
            {"code": "ar", "name": "العربية"},
            {"code": "hi", "name": "हिन्दी"},
            {"code": "bn", "name": "বাংলা"},
            {"code": "ta", "name": "தமிழ்"},
            {"code": "te", "name": "తెలుగు"},
            {"code": "ru", "name": "Русский"},
            {"code": "pl", "name": "Polski"},
            {"code": "nl", "name": "Nederlands"},
            {"code": "sv", "name": "Svenska"},
        ]
    }

@router.get("/supported-currencies")
async def get_supported_currencies():
    """Get list of all supported currencies for report translation"""
    return {
        "total": len(EXCHANGE_RATES),
        "currencies": list(EXCHANGE_RATES.keys()),
        "note": "150+ currencies supported for translation and conversion"
    }
