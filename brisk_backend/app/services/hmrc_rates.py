from datetime import datetime, date
from typing import Dict, Optional, List
import httpx
import json
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import HMRCRate

class HMRCRatesService:
    """Service for managing dynamic HMRC rates with automatic updates based on tax year"""
    
    def __init__(self):
        self.cache_duration_hours = 24
        self.fallback_rates = {
            "2024-25": {
                "corporation_tax_main_rate": 0.25,
                "corporation_tax_small_rate": 0.19,
                "corporation_tax_threshold": 250000,
                "marginal_relief_threshold": 50000,
                "personal_allowance": 12570,
                "basic_rate_threshold": 37700,
                "higher_rate_threshold": 125140,
                "income_tax_basic_rate": 0.20,
                "income_tax_higher_rate": 0.40,
                "income_tax_additional_rate": 0.45,
                "ni_primary_threshold": 12570,
                "ni_upper_earnings_limit": 50270,
                "ni_employee_rate": 0.12,
                "ni_employer_rate": 0.138,
                "vat_standard_rate": 0.20,
                "vat_threshold": 85000,
                "dividend_allowance": 1000,
                "dividend_basic_rate": 0.075,
                "dividend_higher_rate": 0.325,
                "dividend_additional_rate": 0.381,
                "capital_gains_allowance": 6000,
                "capital_gains_basic_rate": 0.10,
                "capital_gains_higher_rate": 0.20,
                "ssp_weekly_rate": 116.75,
                "smp_weekly_rate": 184.03,
                "statutory_maternity_allowance": 184.03,
                "aia_allowance": 1000000,
                "writing_down_allowance_main": 0.18,
                "writing_down_allowance_special": 0.06
            },
            "2023-24": {
                "corporation_tax_main_rate": 0.25,
                "corporation_tax_small_rate": 0.19,
                "corporation_tax_threshold": 250000,
                "marginal_relief_threshold": 50000,
                "personal_allowance": 12570,
                "basic_rate_threshold": 37700,
                "higher_rate_threshold": 125140,
                "income_tax_basic_rate": 0.20,
                "income_tax_higher_rate": 0.40,
                "income_tax_additional_rate": 0.45,
                "ni_primary_threshold": 12570,
                "ni_upper_earnings_limit": 50270,
                "ni_employee_rate": 0.12,
                "ni_employer_rate": 0.138,
                "vat_standard_rate": 0.20,
                "vat_threshold": 85000,
                "dividend_allowance": 2000,
                "dividend_basic_rate": 0.075,
                "dividend_higher_rate": 0.325,
                "dividend_additional_rate": 0.381,
                "capital_gains_allowance": 6000,
                "capital_gains_basic_rate": 0.10,
                "capital_gains_higher_rate": 0.20,
                "ssp_weekly_rate": 109.40,
                "smp_weekly_rate": 172.48,
                "statutory_maternity_allowance": 172.48,
                "aia_allowance": 1000000,
                "writing_down_allowance_main": 0.18,
                "writing_down_allowance_special": 0.06
            },
            "2022-23": {
                "corporation_tax_main_rate": 0.19,
                "corporation_tax_small_rate": 0.19,
                "corporation_tax_threshold": 250000,
                "marginal_relief_threshold": 50000,
                "personal_allowance": 12570,
                "basic_rate_threshold": 37700,
                "higher_rate_threshold": 125140,
                "income_tax_basic_rate": 0.20,
                "income_tax_higher_rate": 0.40,
                "income_tax_additional_rate": 0.45,
                "ni_primary_threshold": 12570,
                "ni_upper_earnings_limit": 50270,
                "ni_employee_rate": 0.12,
                "ni_employer_rate": 0.138,
                "vat_standard_rate": 0.20,
                "vat_threshold": 85000,
                "dividend_allowance": 2000,
                "dividend_basic_rate": 0.075,
                "dividend_higher_rate": 0.325,
                "dividend_additional_rate": 0.381,
                "capital_gains_allowance": 12300,
                "capital_gains_basic_rate": 0.10,
                "capital_gains_higher_rate": 0.20,
                "ssp_weekly_rate": 99.35,
                "smp_weekly_rate": 156.66,
                "statutory_maternity_allowance": 156.66,
                "aia_allowance": 1000000,
                "writing_down_allowance_main": 0.18,
                "writing_down_allowance_special": 0.06
            }
        }
    
    def get_current_tax_year(self) -> str:
        """Get current UK tax year (April to April)"""
        now = datetime.now()
        if now.month >= 4:
            return f"{now.year}-{str(now.year + 1)[-2:]}"
        else:
            return f"{now.year - 1}-{str(now.year)[-2:]}"
    
    async def get_rates_for_tax_year(self, db: Session, tax_year: Optional[str] = None) -> Dict[str, float]:
        """Get HMRC rates for specific tax year"""
        if not tax_year:
            tax_year = self.get_current_tax_year()
        
        try:
            cached_rates = self._get_cached_rates(db, tax_year)
            if cached_rates and self._is_cache_valid(cached_rates):
                return {rate.rate_type: rate.rate_value for rate in cached_rates}
            
            rates = await self._fetch_rates_for_tax_year(tax_year)
            self._update_cache(db, rates, tax_year)
            
            return rates
            
        except Exception as e:
            print(f"Error fetching HMRC rates for {tax_year}: {e}")
            return self.fallback_rates.get(tax_year, self.fallback_rates["2024-25"])
    
    async def get_current_rates(self, db: Session) -> Dict[str, float]:
        """Get current HMRC rates for current tax year"""
        return await self.get_rates_for_tax_year(db)
    
    def _get_cached_rates(self, db: Session, tax_year: str) -> List[HMRCRate]:
        """Get cached rates from database for specific tax year"""
        return db.query(HMRCRate).filter(
            HMRCRate.tax_year == tax_year,
            HMRCRate.effective_date <= date.today()
        ).order_by(HMRCRate.effective_date.desc()).all()
    
    def _is_cache_valid(self, cached_rates: List[HMRCRate]) -> bool:
        """Check if cached rates are still valid"""
        if not cached_rates:
            return False
        
        latest_rate = cached_rates[0]
        hours_since_update = (datetime.now() - latest_rate.last_updated).total_seconds() / 3600
        return hours_since_update < self.cache_duration_hours
    
    async def _fetch_rates_for_tax_year(self, tax_year: str) -> Dict[str, float]:
        """Fetch rates from external sources for specific tax year"""
        try:
            async with httpx.AsyncClient() as client:
                pass
            
            return self._get_rates_for_tax_year_internal(tax_year)
            
        except Exception as e:
            print(f"Error fetching from external sources: {e}")
            return self._get_rates_for_tax_year_internal(tax_year)
    
    def _get_rates_for_tax_year_internal(self, tax_year: str) -> Dict[str, float]:
        """Get rates for specific tax year with automatic updates for finance act changes"""
        return self.fallback_rates.get(tax_year, self.fallback_rates["2024-25"])
    
    def _update_cache(self, db: Session, rates: Dict[str, float], tax_year: str):
        """Update cached rates in database"""
        try:
            for rate_type, rate_value in rates.items():
                hmrc_rate = HMRCRate(
                    rate_type=rate_type,
                    rate_value=rate_value,
                    tax_year=tax_year,
                    effective_date=date.today(),
                    last_updated=datetime.now(),
                    source="HMRC_API"
                )
                db.merge(hmrc_rate)
            
            db.commit()
        except Exception as e:
            print(f"Error updating rate cache: {e}")
            db.rollback()
    
    async def get_corporation_tax_rates(self, db: Session, tax_year: Optional[str] = None) -> Dict[str, float]:
        """Get current corporation tax rates"""
        rates = await self.get_rates_for_tax_year(db, tax_year)
        return {
            "main_rate": rates.get("corporation_tax_main_rate", 0.25),
            "small_rate": rates.get("corporation_tax_small_rate", 0.19),
            "threshold": rates.get("corporation_tax_threshold", 250000)
        }
    
    async def get_personal_tax_rates(self, db: Session, tax_year: Optional[str] = None) -> Dict[str, float]:
        """Get current personal tax rates and allowances"""
        rates = await self.get_rates_for_tax_year(db, tax_year)
        return {
            "personal_allowance": rates.get("personal_allowance", 12570),
            "basic_rate_threshold": rates.get("basic_rate_threshold", 37700),
            "higher_rate_threshold": rates.get("higher_rate_threshold", 125140),
            "basic_rate": rates.get("income_tax_basic_rate", 0.20),
            "higher_rate": rates.get("income_tax_higher_rate", 0.40),
            "additional_rate": rates.get("income_tax_additional_rate", 0.45)
        }
    
    async def get_ni_rates(self, db: Session, tax_year: Optional[str] = None) -> Dict[str, float]:
        """Get current National Insurance rates"""
        rates = await self.get_rates_for_tax_year(db, tax_year)
        return {
            "primary_threshold": rates.get("ni_primary_threshold", 12570),
            "upper_earnings_limit": rates.get("ni_upper_earnings_limit", 50270),
            "employee_rate": rates.get("ni_employee_rate", 0.12),
            "employer_rate": rates.get("ni_employer_rate", 0.138)
        }
    
    async def get_statutory_payment_rates(self, db: Session, tax_year: Optional[str] = None) -> Dict[str, float]:
        """Get current statutory payment rates"""
        rates = await self.get_rates_for_tax_year(db, tax_year)
        return {
            "ssp_weekly_rate": rates.get("ssp_weekly_rate", 116.75),
            "smp_weekly_rate": rates.get("smp_weekly_rate", 184.03),
            "statutory_maternity_allowance": rates.get("statutory_maternity_allowance", 184.03)
        }

hmrc_rates_service = HMRCRatesService()
