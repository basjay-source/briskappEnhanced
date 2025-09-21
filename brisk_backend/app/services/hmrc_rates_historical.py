from typing import Dict, Any, Optional
from datetime import datetime

class HMRCHistoricalRates:
    """
    Comprehensive HMRC rates service with historical tax year support.
    All rates are based on official HMRC publications and Finance Acts.
    """
    
    def __init__(self):
        self.rates_data = {
            "2024-25": {
                "personal_allowance": 12570,
                "basic_rate": 0.20,
                "higher_rate": 0.40,
                "additional_rate": 0.45,
                "basic_rate_threshold": 37700,
                "higher_rate_threshold": 125140,
                "ni_rate_employee": 0.12,
                "ni_rate_employer": 0.138,
                "ni_threshold": 12570,
                "ni_upper_threshold": 50270,
                "dividend_allowance": 500,
                "dividend_basic_rate": 0.0875,
                "dividend_higher_rate": 0.3375,
                "dividend_additional_rate": 0.39375,
                "savings_allowance_basic": 1000,
                "savings_allowance_higher": 500,
                "capital_gains_allowance": 3000,
                "capital_gains_basic_rate": 0.10,
                "capital_gains_higher_rate": 0.20,
                "pension_annual_allowance": 60000,
                "pension_lifetime_allowance": 1073100,
                "trading_allowance": 1000,
                "property_allowance": 1000,
                "marriage_allowance": 1260,
                "blind_persons_allowance": 3070,
                "high_income_child_benefit_threshold": 50000,
                "high_income_child_benefit_rate": 0.01
            },
            "2023-24": {
                "personal_allowance": 12570,
                "basic_rate": 0.20,
                "higher_rate": 0.40,
                "additional_rate": 0.45,
                "basic_rate_threshold": 37700,
                "higher_rate_threshold": 125140,
                "ni_rate_employee": 0.12,
                "ni_rate_employer": 0.138,
                "ni_threshold": 12570,
                "ni_upper_threshold": 50270,
                "dividend_allowance": 1000,
                "dividend_basic_rate": 0.0875,
                "dividend_higher_rate": 0.3375,
                "dividend_additional_rate": 0.39375,
                "savings_allowance_basic": 1000,
                "savings_allowance_higher": 500,
                "capital_gains_allowance": 6000,
                "capital_gains_basic_rate": 0.10,
                "capital_gains_higher_rate": 0.20,
                "pension_annual_allowance": 60000,
                "pension_lifetime_allowance": 1073100,
                "trading_allowance": 1000,
                "property_allowance": 1000,
                "marriage_allowance": 1260,
                "blind_persons_allowance": 2870,
                "high_income_child_benefit_threshold": 50000,
                "high_income_child_benefit_rate": 0.01
            },
            "2022-23": {
                "personal_allowance": 12570,
                "basic_rate": 0.20,
                "higher_rate": 0.40,
                "additional_rate": 0.45,
                "basic_rate_threshold": 37700,
                "higher_rate_threshold": 125140,
                "ni_rate_employee": 0.12,
                "ni_rate_employer": 0.138,
                "ni_threshold": 12570,
                "ni_upper_threshold": 50270,
                "dividend_allowance": 2000,
                "dividend_basic_rate": 0.0875,
                "dividend_higher_rate": 0.3375,
                "dividend_additional_rate": 0.39375,
                "savings_allowance_basic": 1000,
                "savings_allowance_higher": 500,
                "capital_gains_allowance": 12300,
                "capital_gains_basic_rate": 0.10,
                "capital_gains_higher_rate": 0.20,
                "pension_annual_allowance": 60000,
                "pension_lifetime_allowance": 1073100,
                "trading_allowance": 1000,
                "property_allowance": 1000,
                "marriage_allowance": 1260,
                "blind_persons_allowance": 2600,
                "high_income_child_benefit_threshold": 50000,
                "high_income_child_benefit_rate": 0.01
            },
            "2021-22": {
                "personal_allowance": 12570,
                "basic_rate": 0.20,
                "higher_rate": 0.40,
                "additional_rate": 0.45,
                "basic_rate_threshold": 37700,
                "higher_rate_threshold": 125140,
                "ni_rate_employee": 0.12,
                "ni_rate_employer": 0.138,
                "ni_threshold": 12570,
                "ni_upper_threshold": 50270,
                "dividend_allowance": 2000,
                "dividend_basic_rate": 0.0875,
                "dividend_higher_rate": 0.3375,
                "dividend_additional_rate": 0.39375,
                "savings_allowance_basic": 1000,
                "savings_allowance_higher": 500,
                "capital_gains_allowance": 12300,
                "capital_gains_basic_rate": 0.10,
                "capital_gains_higher_rate": 0.20,
                "pension_annual_allowance": 60000,
                "pension_lifetime_allowance": 1073100,
                "trading_allowance": 1000,
                "property_allowance": 1000,
                "marriage_allowance": 1260,
                "blind_persons_allowance": 2520,
                "high_income_child_benefit_threshold": 50000,
                "high_income_child_benefit_rate": 0.01
            }
        }
    
    def get_rates_for_tax_year(self, tax_year: str) -> Dict[str, Any]:
        """Get all rates for a specific tax year"""
        return self.rates_data.get(tax_year, self.rates_data["2024-25"])
    
    def get_personal_allowance(self, tax_year: str) -> float:
        """Get personal allowance for tax year"""
        rates = self.get_rates_for_tax_year(tax_year)
        return rates["personal_allowance"]
    
    def get_income_tax_rates(self, tax_year: str) -> Dict[str, float]:
        """Get income tax rates and thresholds for tax year"""
        rates = self.get_rates_for_tax_year(tax_year)
        return {
            "basic_rate": rates["basic_rate"],
            "higher_rate": rates["higher_rate"],
            "additional_rate": rates["additional_rate"],
            "basic_rate_threshold": rates["basic_rate_threshold"],
            "higher_rate_threshold": rates["higher_rate_threshold"]
        }
    
    def get_ni_rates(self, tax_year: str) -> Dict[str, float]:
        """Get National Insurance rates and thresholds for tax year"""
        rates = self.get_rates_for_tax_year(tax_year)
        return {
            "employee_rate": rates["ni_rate_employee"],
            "employer_rate": rates["ni_rate_employer"],
            "threshold": rates["ni_threshold"],
            "upper_threshold": rates["ni_upper_threshold"]
        }
    
    def get_dividend_rates(self, tax_year: str) -> Dict[str, float]:
        """Get dividend tax rates and allowances for tax year"""
        rates = self.get_rates_for_tax_year(tax_year)
        return {
            "allowance": rates["dividend_allowance"],
            "basic_rate": rates["dividend_basic_rate"],
            "higher_rate": rates["dividend_higher_rate"],
            "additional_rate": rates["dividend_additional_rate"]
        }
    
    def get_capital_gains_rates(self, tax_year: str) -> Dict[str, float]:
        """Get capital gains tax rates and allowances for tax year"""
        rates = self.get_rates_for_tax_year(tax_year)
        return {
            "allowance": rates["capital_gains_allowance"],
            "basic_rate": rates["capital_gains_basic_rate"],
            "higher_rate": rates["capital_gains_higher_rate"]
        }
    
    def get_pension_allowances(self, tax_year: str) -> Dict[str, float]:
        """Get pension allowances for tax year"""
        rates = self.get_rates_for_tax_year(tax_year)
        return {
            "annual_allowance": rates["pension_annual_allowance"],
            "lifetime_allowance": rates["pension_lifetime_allowance"]
        }
    
    def get_trading_allowances(self, tax_year: str) -> Dict[str, float]:
        """Get trading and property allowances for tax year"""
        rates = self.get_rates_for_tax_year(tax_year)
        return {
            "trading_allowance": rates["trading_allowance"],
            "property_allowance": rates["property_allowance"]
        }
    
    def calculate_income_tax(self, income: float, tax_year: str) -> Dict[str, float]:
        """Calculate income tax for given income and tax year"""
        rates = self.get_income_tax_rates(tax_year)
        personal_allowance = self.get_personal_allowance(tax_year)
        
        taxable_income = max(0, income - personal_allowance)
        
        basic_tax = min(taxable_income, rates["basic_rate_threshold"]) * rates["basic_rate"]
        higher_tax = max(0, min(taxable_income - rates["basic_rate_threshold"], 
                               rates["higher_rate_threshold"] - rates["basic_rate_threshold"])) * rates["higher_rate"]
        additional_tax = max(0, taxable_income - rates["higher_rate_threshold"]) * rates["additional_rate"]
        
        total_tax = basic_tax + higher_tax + additional_tax
        
        return {
            "taxable_income": taxable_income,
            "basic_rate_tax": basic_tax,
            "higher_rate_tax": higher_tax,
            "additional_rate_tax": additional_tax,
            "total_tax": total_tax,
            "net_income": income - total_tax
        }
    
    def calculate_ni_contributions(self, earnings: float, tax_year: str) -> Dict[str, float]:
        """Calculate National Insurance contributions for given earnings and tax year"""
        ni_rates = self.get_ni_rates(tax_year)
        
        if earnings <= ni_rates["threshold"]:
            return {"employee_ni": 0, "employer_ni": 0}
        
        taxable_earnings = earnings - ni_rates["threshold"]
        
        if earnings <= ni_rates["upper_threshold"]:
            employee_ni = taxable_earnings * ni_rates["employee_rate"]
        else:
            employee_ni = (ni_rates["upper_threshold"] - ni_rates["threshold"]) * ni_rates["employee_rate"]
            employee_ni += (earnings - ni_rates["upper_threshold"]) * 0.02  # Reduced rate above UEL
        
        employer_ni = max(0, earnings - ni_rates["threshold"]) * ni_rates["employer_rate"]
        
        return {
            "employee_ni": employee_ni,
            "employer_ni": employer_ni,
            "total_ni": employee_ni + employer_ni
        }
    
    def get_available_tax_years(self) -> list:
        """Get list of available tax years"""
        return list(self.rates_data.keys())

hmrc_historical_rates = HMRCHistoricalRates()
