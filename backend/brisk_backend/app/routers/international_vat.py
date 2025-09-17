from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from ..database import get_db
from ..models.international_vat import InternationalVATRate, VATRateHistory

router = APIRouter(tags=["International VAT"])

INTERNATIONAL_VAT_DATA = [
    {"country_code": "GBR", "country_name": "United Kingdom", "region": "Europe", "currency_code": "GBP", 
     "standard_rate": 20.0, "reduced_rate_1": 5.0, "zero_rate": True, "vat_system_name": "VAT",
     "registration_threshold": 85000, "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "DEU", "country_name": "Germany", "region": "Europe", "currency_code": "EUR", 
     "standard_rate": 19.0, "reduced_rate_1": 7.0, "zero_rate": True, "vat_system_name": "Mehrwertsteuer",
     "registration_threshold": 22000, "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "FRA", "country_name": "France", "region": "Europe", "currency_code": "EUR", 
     "standard_rate": 20.0, "reduced_rate_1": 10.0, "reduced_rate_2": 5.5, "super_reduced_rate": 2.1,
     "vat_system_name": "TVA", "registration_threshold": 34400, "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "ESP", "country_name": "Spain", "region": "Europe", "currency_code": "EUR", 
     "standard_rate": 21.0, "reduced_rate_1": 10.0, "reduced_rate_2": 4.0, "zero_rate": True,
     "vat_system_name": "IVA", "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "ITA", "country_name": "Italy", "region": "Europe", "currency_code": "EUR", 
     "standard_rate": 22.0, "reduced_rate_1": 10.0, "reduced_rate_2": 5.0, "reduced_rate_2": 4.0,
     "vat_system_name": "IVA", "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "NLD", "country_name": "Netherlands", "region": "Europe", "currency_code": "EUR", 
     "standard_rate": 21.0, "reduced_rate_1": 9.0, "zero_rate": True, "vat_system_name": "BTW",
     "registration_threshold": 20000, "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "BEL", "country_name": "Belgium", "region": "Europe", "currency_code": "EUR", 
     "standard_rate": 21.0, "reduced_rate_1": 12.0, "reduced_rate_2": 6.0, "zero_rate": True,
     "vat_system_name": "TVA/BTW", "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "AUT", "country_name": "Austria", "region": "Europe", "currency_code": "EUR", 
     "standard_rate": 20.0, "reduced_rate_1": 10.0, "reduced_rate_2": 13.0, "zero_rate": True,
     "vat_system_name": "USt", "registration_threshold": 35000, "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "SWE", "country_name": "Sweden", "region": "Europe", "currency_code": "SEK", 
     "standard_rate": 25.0, "reduced_rate_1": 12.0, "reduced_rate_2": 6.0, "zero_rate": True,
     "vat_system_name": "Moms", "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "DNK", "country_name": "Denmark", "region": "Europe", "currency_code": "DKK", 
     "standard_rate": 25.0, "zero_rate": True, "vat_system_name": "Moms",
     "registration_threshold": 50000, "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "NOR", "country_name": "Norway", "region": "Europe", "currency_code": "NOK", 
     "standard_rate": 25.0, "reduced_rate_1": 15.0, "reduced_rate_2": 12.0, "zero_rate": True,
     "vat_system_name": "MVA", "registration_threshold": 50000, "filing_frequency": "Bi-monthly", "digital_reporting_required": True},
    {"country_code": "CHE", "country_name": "Switzerland", "region": "Europe", "currency_code": "CHF", 
     "standard_rate": 7.7, "reduced_rate_1": 3.7, "reduced_rate_2": 2.5, "zero_rate": True,
     "vat_system_name": "MWST/TVA/IVA", "registration_threshold": 100000, "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "POL", "country_name": "Poland", "region": "Europe", "currency_code": "PLN", 
     "standard_rate": 23.0, "reduced_rate_1": 8.0, "reduced_rate_2": 5.0, "zero_rate": True,
     "vat_system_name": "VAT", "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "CZE", "country_name": "Czech Republic", "region": "Europe", "currency_code": "CZK", 
     "standard_rate": 21.0, "reduced_rate_1": 15.0, "reduced_rate_2": 10.0, "zero_rate": True,
     "vat_system_name": "DPH", "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "HUN", "country_name": "Hungary", "region": "Europe", "currency_code": "HUF", 
     "standard_rate": 27.0, "reduced_rate_1": 18.0, "reduced_rate_2": 5.0, "zero_rate": True,
     "vat_system_name": "ÁFA", "filing_frequency": "Monthly", "digital_reporting_required": True},
    
    {"country_code": "USA", "country_name": "United States", "region": "North America", "currency_code": "USD", 
     "standard_rate": 0.0, "zero_rate": True, "vat_system_name": "Sales Tax (State Level)",
     "notes": "No federal VAT/GST. State and local sales taxes vary by jurisdiction."},
    {"country_code": "CAN", "country_name": "Canada", "region": "North America", "currency_code": "CAD", 
     "standard_rate": 5.0, "vat_system_name": "GST/HST", "registration_threshold": 30000,
     "filing_frequency": "Quarterly", "digital_reporting_required": False,
     "notes": "Federal GST 5%. Provincial sales taxes vary. Some provinces have HST (combined)."},
    {"country_code": "MEX", "country_name": "Mexico", "region": "North America", "currency_code": "MXN", 
     "standard_rate": 16.0, "zero_rate": True, "vat_system_name": "IVA",
     "filing_frequency": "Monthly", "digital_reporting_required": True},
    
    {"country_code": "AUS", "country_name": "Australia", "region": "Asia Pacific", "currency_code": "AUD", 
     "standard_rate": 10.0, "zero_rate": True, "vat_system_name": "GST",
     "registration_threshold": 75000, "filing_frequency": "Quarterly", "digital_reporting_required": False},
    {"country_code": "NZL", "country_name": "New Zealand", "region": "Asia Pacific", "currency_code": "NZD", 
     "standard_rate": 15.0, "zero_rate": True, "vat_system_name": "GST",
     "registration_threshold": 60000, "filing_frequency": "Bi-monthly", "digital_reporting_required": False},
    {"country_code": "JPN", "country_name": "Japan", "region": "Asia Pacific", "currency_code": "JPY", 
     "standard_rate": 10.0, "reduced_rate_1": 8.0, "zero_rate": True, "vat_system_name": "Consumption Tax",
     "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "SGP", "country_name": "Singapore", "region": "Asia Pacific", "currency_code": "SGD", 
     "standard_rate": 8.0, "zero_rate": True, "vat_system_name": "GST",
     "registration_threshold": 1000000, "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "KOR", "country_name": "South Korea", "region": "Asia Pacific", "currency_code": "KRW", 
     "standard_rate": 10.0, "zero_rate": True, "vat_system_name": "VAT",
     "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "IND", "country_name": "India", "region": "Asia Pacific", "currency_code": "INR", 
     "standard_rate": 18.0, "reduced_rate_1": 12.0, "reduced_rate_2": 5.0, "zero_rate": True,
     "vat_system_name": "GST", "registration_threshold": 2000000, "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "CHN", "country_name": "China", "region": "Asia Pacific", "currency_code": "CNY", 
     "standard_rate": 13.0, "reduced_rate_1": 9.0, "reduced_rate_2": 6.0, "zero_rate": True,
     "vat_system_name": "VAT", "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "THA", "country_name": "Thailand", "region": "Asia Pacific", "currency_code": "THB", 
     "standard_rate": 7.0, "zero_rate": True, "vat_system_name": "VAT",
     "registration_threshold": 1800000, "filing_frequency": "Monthly", "digital_reporting_required": False},
    {"country_code": "MYS", "country_name": "Malaysia", "region": "Asia Pacific", "currency_code": "MYR", 
     "standard_rate": 6.0, "zero_rate": True, "vat_system_name": "SST",
     "registration_threshold": 500000, "filing_frequency": "Bi-monthly", "digital_reporting_required": False},
    {"country_code": "IDN", "country_name": "Indonesia", "region": "Asia Pacific", "currency_code": "IDR", 
     "standard_rate": 11.0, "zero_rate": True, "vat_system_name": "PPN",
     "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "PHL", "country_name": "Philippines", "region": "Asia Pacific", "currency_code": "PHP", 
     "standard_rate": 12.0, "zero_rate": True, "vat_system_name": "VAT",
     "registration_threshold": 3000000, "filing_frequency": "Quarterly", "digital_reporting_required": False},
    {"country_code": "VNM", "country_name": "Vietnam", "region": "Asia Pacific", "currency_code": "VND", 
     "standard_rate": 10.0, "reduced_rate_1": 5.0, "zero_rate": True, "vat_system_name": "VAT",
     "filing_frequency": "Monthly", "digital_reporting_required": True},
    
    {"country_code": "ARE", "country_name": "United Arab Emirates", "region": "Middle East", "currency_code": "AED", 
     "standard_rate": 5.0, "zero_rate": True, "vat_system_name": "VAT",
     "registration_threshold": 375000, "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "SAU", "country_name": "Saudi Arabia", "region": "Middle East", "currency_code": "SAR", 
     "standard_rate": 15.0, "zero_rate": True, "vat_system_name": "VAT",
     "registration_threshold": 375000, "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "QAT", "country_name": "Qatar", "region": "Middle East", "currency_code": "QAR", 
     "standard_rate": 0.0, "zero_rate": True, "vat_system_name": "No VAT",
     "notes": "No VAT system currently implemented."},
    {"country_code": "KWT", "country_name": "Kuwait", "region": "Middle East", "currency_code": "KWD", 
     "standard_rate": 0.0, "zero_rate": True, "vat_system_name": "No VAT",
     "notes": "No VAT system currently implemented."},
    {"country_code": "BHR", "country_name": "Bahrain", "region": "Middle East", "currency_code": "BHD", 
     "standard_rate": 5.0, "zero_rate": True, "vat_system_name": "VAT",
     "registration_threshold": 37500, "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "OMN", "country_name": "Oman", "region": "Middle East", "currency_code": "OMR", 
     "standard_rate": 5.0, "zero_rate": True, "vat_system_name": "VAT",
     "registration_threshold": 38500, "filing_frequency": "Quarterly", "digital_reporting_required": True},
    {"country_code": "ISR", "country_name": "Israel", "region": "Middle East", "currency_code": "ILS", 
     "standard_rate": 17.0, "zero_rate": True, "vat_system_name": "VAT",
     "filing_frequency": "Bi-monthly", "digital_reporting_required": True},
    {"country_code": "TUR", "country_name": "Turkey", "region": "Middle East", "currency_code": "TRY", 
     "standard_rate": 18.0, "reduced_rate_1": 8.0, "reduced_rate_2": 1.0, "zero_rate": True,
     "vat_system_name": "KDV", "filing_frequency": "Monthly", "digital_reporting_required": True},
    
    {"country_code": "ZAF", "country_name": "South Africa", "region": "Africa", "currency_code": "ZAR", 
     "standard_rate": 15.0, "zero_rate": True, "vat_system_name": "VAT",
     "registration_threshold": 1000000, "filing_frequency": "Bi-monthly", "digital_reporting_required": False},
    {"country_code": "EGY", "country_name": "Egypt", "region": "Africa", "currency_code": "EGP", 
     "standard_rate": 14.0, "zero_rate": True, "vat_system_name": "VAT",
     "filing_frequency": "Monthly", "digital_reporting_required": False},
    {"country_code": "NGA", "country_name": "Nigeria", "region": "Africa", "currency_code": "NGN", 
     "standard_rate": 7.5, "zero_rate": True, "vat_system_name": "VAT",
     "registration_threshold": 25000000, "filing_frequency": "Monthly", "digital_reporting_required": False},
    {"country_code": "KEN", "country_name": "Kenya", "region": "Africa", "currency_code": "KES", 
     "standard_rate": 16.0, "reduced_rate_1": 8.0, "zero_rate": True, "vat_system_name": "VAT",
     "registration_threshold": 5000000, "filing_frequency": "Monthly", "digital_reporting_required": False},
    {"country_code": "GHA", "country_name": "Ghana", "region": "Africa", "currency_code": "GHS", 
     "standard_rate": 12.5, "zero_rate": True, "vat_system_name": "VAT",
     "filing_frequency": "Monthly", "digital_reporting_required": False},
    {"country_code": "MAR", "country_name": "Morocco", "region": "Africa", "currency_code": "MAD", 
     "standard_rate": 20.0, "reduced_rate_1": 14.0, "reduced_rate_2": 10.0, "reduced_rate_2": 7.0,
     "vat_system_name": "TVA", "filing_frequency": "Monthly", "digital_reporting_required": False},
    
    {"country_code": "BRA", "country_name": "Brazil", "region": "South America", "currency_code": "BRL", 
     "standard_rate": 17.0, "vat_system_name": "ICMS/IPI/PIS/COFINS",
     "filing_frequency": "Monthly", "digital_reporting_required": True,
     "notes": "Complex multi-layered tax system with federal and state taxes."},
    {"country_code": "ARG", "country_name": "Argentina", "region": "South America", "currency_code": "ARS", 
     "standard_rate": 21.0, "reduced_rate_1": 10.5, "zero_rate": True, "vat_system_name": "IVA",
     "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "CHL", "country_name": "Chile", "region": "South America", "currency_code": "CLP", 
     "standard_rate": 19.0, "zero_rate": True, "vat_system_name": "IVA",
     "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "COL", "country_name": "Colombia", "region": "South America", "currency_code": "COP", 
     "standard_rate": 19.0, "reduced_rate_1": 5.0, "zero_rate": True, "vat_system_name": "IVA",
     "filing_frequency": "Bi-monthly", "digital_reporting_required": True},
    {"country_code": "PER", "country_name": "Peru", "region": "South America", "currency_code": "PEN", 
     "standard_rate": 18.0, "zero_rate": True, "vat_system_name": "IGV",
     "filing_frequency": "Monthly", "digital_reporting_required": True},
    {"country_code": "URY", "country_name": "Uruguay", "region": "South America", "currency_code": "UYU", 
     "standard_rate": 22.0, "reduced_rate_1": 10.0, "zero_rate": True, "vat_system_name": "IVA",
     "filing_frequency": "Monthly", "digital_reporting_required": False},
    {"country_code": "ECU", "country_name": "Ecuador", "region": "South America", "currency_code": "USD", 
     "standard_rate": 12.0, "zero_rate": True, "vat_system_name": "IVA",
     "filing_frequency": "Monthly", "digital_reporting_required": True}
]

@router.get("/rates", response_model=List[dict])
async def get_international_vat_rates(
    region: Optional[str] = Query(None, description="Filter by region"),
    country_code: Optional[str] = Query(None, description="Filter by country code"),
    search: Optional[str] = Query(None, description="Search countries or currencies"),
    db: Session = Depends(get_db)
):
    """Get comprehensive international VAT rates"""
    
    filtered_data = INTERNATIONAL_VAT_DATA.copy()
    
    if region and region.lower() != 'all':
        filtered_data = [rate for rate in filtered_data if rate['region'].lower() == region.lower()]
    
    if country_code:
        filtered_data = [rate for rate in filtered_data if rate['country_code'].lower() == country_code.lower()]
    
    if search:
        search_lower = search.lower()
        filtered_data = [
            rate for rate in filtered_data 
            if (search_lower in rate['country_name'].lower() or 
                search_lower in rate['country_code'].lower() or 
                search_lower in rate['currency_code'].lower())
        ]
    
    return filtered_data

@router.get("/regions")
async def get_regions():
    """Get all available regions"""
    regions = list(set(rate['region'] for rate in INTERNATIONAL_VAT_DATA))
    return sorted(regions)

@router.get("/countries/{region}")
async def get_countries_by_region(region: str):
    """Get countries in a specific region"""
    countries = [
        {"code": rate['country_code'], "name": rate['country_name']}
        for rate in INTERNATIONAL_VAT_DATA 
        if rate['region'].lower() == region.lower()
    ]
    return sorted(countries, key=lambda x: x['name'])

@router.get("/rate/{country_code}")
async def get_vat_rate_by_country(country_code: str):
    """Get VAT rate details for a specific country"""
    country_data = next(
        (rate for rate in INTERNATIONAL_VAT_DATA if rate['country_code'].lower() == country_code.lower()),
        None
    )
    
    if not country_data:
        raise HTTPException(status_code=404, detail="Country not found")
    
    return country_data

@router.get("/export")
async def export_vat_rates(format: str = Query("csv", description="Export format: csv, json, xlsx")):
    """Export international VAT rates in various formats"""
    
    if format.lower() == "json":
        return {"data": INTERNATIONAL_VAT_DATA, "format": "json"}
    
    return {
        "data": INTERNATIONAL_VAT_DATA,
        "format": format.lower(),
        "headers": [
            "Country Code", "Country Name", "Region", "Currency", 
            "Standard Rate (%)", "Reduced Rate 1 (%)", "Reduced Rate 2 (%)", 
            "Super Reduced Rate (%)", "Zero Rate", "VAT System Name",
            "Registration Threshold", "Filing Frequency", "Digital Reporting Required"
        ]
    }

@router.post("/calculate")
async def calculate_vat(
    amount: float,
    country_code: str,
    rate_type: str = "standard"  # standard, reduced_1, reduced_2, super_reduced
):
    """Calculate VAT for a given amount and country"""
    
    country_data = next(
        (rate for rate in INTERNATIONAL_VAT_DATA if rate['country_code'].lower() == country_code.lower()),
        None
    )
    
    if not country_data:
        raise HTTPException(status_code=404, detail="Country not found")
    
    rate_mapping = {
        "standard": "standard_rate",
        "reduced_1": "reduced_rate_1", 
        "reduced_2": "reduced_rate_2",
        "super_reduced": "super_reduced_rate"
    }
    
    rate_field = rate_mapping.get(rate_type, "standard_rate")
    vat_rate = country_data.get(rate_field, 0.0)
    
    if vat_rate is None:
        vat_rate = 0.0
    
    vat_amount = (amount * vat_rate) / 100
    total_amount = amount + vat_amount
    
    return {
        "country": country_data['country_name'],
        "country_code": country_code.upper(),
        "currency": country_data['currency_code'],
        "net_amount": amount,
        "vat_rate": vat_rate,
        "vat_amount": round(vat_amount, 2),
        "total_amount": round(total_amount, 2),
        "rate_type": rate_type
    }
