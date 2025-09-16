from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Numeric, Date
from sqlalchemy.sql import func
from app.database import Base
import uuid

class Product(Base):
    __tablename__ = "products"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    sku = Column(String)
    category = Column(String)
    unit_price = Column(Numeric(15, 2), nullable=False)
    cost_price = Column(Numeric(15, 2), default=0)
    currency = Column(String, default="GBP")
    vat_rate = Column(Numeric(5, 2), default=20)
    stock_quantity = Column(Integer, default=0)
    reorder_level = Column(Integer, default=0)
    unit_of_measure = Column(String, default="each")
    status = Column(String, default="active")
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class InventoryMovement(Base):
    __tablename__ = "inventory_movements"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=False)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)
    movement_type = Column(String, nullable=False)  # 'in', 'out', 'adjustment'
    quantity = Column(Integer, nullable=False)
    reference = Column(String)
    notes = Column(Text)
    movement_date = Column(Date, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
