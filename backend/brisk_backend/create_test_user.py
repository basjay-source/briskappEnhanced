from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db, engine
from app.models import User, Tenant
import uuid

def create_test_user():
    db = Session(bind=engine)
    
    try:
        db.execute(text("DROP TABLE IF EXISTS users"))
        db.execute(text("DROP TABLE IF EXISTS tenants"))
        db.commit()
        
        from app.database import create_tables
        create_tables()
        
        tenant = db.query(Tenant).filter(Tenant.id == "default-tenant").first()
        if not tenant:
            tenant = Tenant(
                id="default-tenant",
                name="Brisk Accountants",
                domain="briskaccountants.com",
                is_active=True
            )
            db.add(tenant)
            db.commit()
        
        user = db.query(User).filter(User.email == "admin@briskaccountants.com").first()
        if not user:
            user = User(
                id=str(uuid.uuid4()),
                tenant_id="default-tenant",
                email="admin@briskaccountants.com",
                first_name="Admin",
                last_name="User",
                is_active=True,
                is_superuser=True
            )
            db.add(user)
            db.commit()
        
        db.close()
        print("Test user created successfully!")
        
    except Exception as e:
        print(f"Error creating test user: {e}")
        db.rollback()
        db.close()

if __name__ == "__main__":
    create_test_user()
