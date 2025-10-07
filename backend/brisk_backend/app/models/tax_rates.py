from sqlalchemy import Column, Integer, String, Float, Date, Boolean, DateTime, JSON
from sqlalchemy.sql import func
from app.database import Base
import uuid
from datetime import date

class TaxRate(Base):
    __tablename__ = "tax_rates"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    country = Column(String, nullable=False, index=True)
    tax_type = Column(String, nullable=False)  # corporation_tax, income_tax, vat, etc
    rate = Column(Float, nullable=False)
    effective_from = Column(Date, nullable=False)
    effective_to = Column(Date)
    tax_year = Column(String, nullable=False)
    band_lower = Column(Float)  # For banded rates
    band_upper = Column(Float)
    description = Column(String)
    metadata = Column(JSON)  # Additional rate-specific data
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class HistoricalTaxReturn(Base):
    __tablename__ = "historical_tax_returns"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, nullable=False, index=True)
    company_id = Column(String, nullable=False, index=True)
    tax_year = Column(String, nullable=False)
    return_type = Column(String, nullable=False)  # CT600, SA, VAT
    filing_date = Column(Date)
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=False)
    taxable_profit = Column(Float)
    tax_due = Column(Float)
    tax_paid = Column(Float)
    status = Column(String, default='draft')  # draft, filed, paid
    return_data = Column(JSON)  # Full return details
    supporting_documents = Column(JSON)  # Document references
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


UK_TAX_RATES_HISTORY = {
    "corporation_tax": [
        {"year": "2023/24", "rate": 25.0, "small_profits_rate": 19.0, "effective_from": date(2023, 4, 1)},
        {"year": "2022/23", "rate": 19.0, "effective_from": date(2022, 4, 1)},
        {"year": "2021/22", "rate": 19.0, "effective_from": date(2021, 4, 1)},
        {"year": "2020/21", "rate": 19.0, "effective_from": date(2020, 4, 1)},
        {"year": "2019/20", "rate": 19.0, "effective_from": date(2019, 4, 1)},
        {"year": "2018/19", "rate": 19.0, "effective_from": date(2018, 4, 1)},
        {"year": "2017/18", "rate": 19.0, "effective_from": date(2017, 4, 1)},
        {"year": "2016/17", "rate": 20.0, "effective_from": date(2016, 4, 1)},
        {"year": "2015/16", "rate": 20.0, "effective_from": date(2015, 4, 1)},
        {"year": "2014/15", "rate": 21.0, "effective_from": date(2014, 4, 1)},
        {"year": "2013/14", "rate": 23.0, "effective_from": date(2013, 4, 1)},
        {"year": "2012/13", "rate": 24.0, "effective_from": date(2012, 4, 1)},
        {"year": "2011/12", "rate": 26.0, "effective_from": date(2011, 4, 1)},
        {"year": "2010/11", "rate": 28.0, "effective_from": date(2010, 4, 1)},
        {"year": "2009/10", "rate": 28.0, "effective_from": date(2009, 4, 1)},
        {"year": "2008/09", "rate": 28.0, "effective_from": date(2008, 4, 1)},
        {"year": "2007/08", "rate": 30.0, "effective_from": date(2007, 4, 1)},
        {"year": "2006/07", "rate": 30.0, "effective_from": date(2006, 4, 1)},
        {"year": "2005/06", "rate": 30.0, "effective_from": date(2005, 4, 1)},
        {"year": "2004/05", "rate": 30.0, "effective_from": date(2004, 4, 1)},
        {"year": "2003/04", "rate": 30.0, "effective_from": date(2003, 4, 1)},
        {"year": "2002/03", "rate": 30.0, "effective_from": date(2002, 4, 1)},
        {"year": "2001/02", "rate": 30.0, "effective_from": date(2001, 4, 1)},
        {"year": "2000/01", "rate": 30.0, "effective_from": date(2000, 4, 1)},
        {"year": "1999/00", "rate": 30.0, "effective_from": date(1999, 4, 1)},
        {"year": "1998/99", "rate": 31.0, "effective_from": date(1998, 4, 1)},
        {"year": "1997/98", "rate": 31.0, "effective_from": date(1997, 4, 1)},
        {"year": "1996/97", "rate": 33.0, "effective_from": date(1996, 4, 1)},
        {"year": "1995/96", "rate": 33.0, "effective_from": date(1995, 4, 1)},
    ],
    "vat": [
        {"year": "2011-present", "standard": 20.0, "reduced": 5.0, "effective_from": date(2011, 1, 4)},
        {"year": "2010", "standard": 17.5, "reduced": 5.0, "effective_from": date(2010, 1, 1)},
        {"year": "2008-2009", "standard": 15.0, "reduced": 5.0, "effective_from": date(2008, 12, 1)},
        {"year": "1991-2008", "standard": 17.5, "reduced": 5.0, "effective_from": date(1991, 4, 1)},
    ],
    "income_tax": [
        {"year": "2023/24", "basic": 20.0, "higher": 40.0, "additional": 45.0, 
         "basic_threshold": 50270, "higher_threshold": 125140, "effective_from": date(2023, 4, 6)},
        {"year": "2022/23", "basic": 20.0, "higher": 40.0, "additional": 45.0,
         "basic_threshold": 50270, "higher_threshold": 150000, "effective_from": date(2022, 4, 6)},
        {"year": "2021/22", "basic": 20.0, "higher": 40.0, "additional": 45.0,
         "basic_threshold": 50270, "higher_threshold": 150000, "effective_from": date(2021, 4, 6)},
    ]
}
