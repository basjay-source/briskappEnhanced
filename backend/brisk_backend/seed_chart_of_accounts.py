#!/usr/bin/env python3
"""
Seed the Chart of Accounts with IAS-compliant account structure
"""
import sys
import re
from app.database import SessionLocal
from app.models.accounts import ChartOfAccount

def parse_typescript_accounts(ts_file_path: str):
    """Parse the TypeScript chartOfAccounts.ts file and extract account data"""
    accounts = []
    
    with open(ts_file_path, 'r') as f:
        content = f.read()
    
    pattern = r"\{\s*code:\s*'([^']+)',\s*name:\s*['\"]([^'\"]+)['\"],\s*(?:groupNumber:\s*'([^']+)',\s*)?(?:category:\s*'([^']+)')?\s*\}"
    
    matches = re.finditer(pattern, content)
    
    for match in matches:
        code = match.group(1)
        name = match.group(2)
        group_number = match.group(3) if match.group(3) else None
        category = match.group(4) if match.group(4) else None
        
        accounts.append({
            'code': code,
            'name': name,
            'group_number': group_number,
            'category': category
        })
    
    return accounts

def seed_database(tenant_id: str = "default-tenant"):
    """Seed the database with Chart of Accounts"""
    db = SessionLocal()
    
    try:
        existing_count = db.query(ChartOfAccount).filter(
            ChartOfAccount.tenant_id == tenant_id
        ).count()
        
        if existing_count > 0:
            print(f"⚠️  Chart of Accounts already contains {existing_count} entries for tenant {tenant_id}")
            response = input("Do you want to clear and re-seed? (y/n): ")
            if response.lower() != 'y':
                print("❌ Seeding cancelled")
                return
            
            db.query(ChartOfAccount).filter(
                ChartOfAccount.tenant_id == tenant_id
            ).delete()
            db.commit()
            print(f"✅ Cleared {existing_count} existing entries")
        
        ts_file = '/home/ubuntu/repos/briskappEnhanced/frontend/brisk_frontend/src/data/chartOfAccounts.ts'
        print(f"📖 Parsing accounts from {ts_file}...")
        accounts_data = parse_typescript_accounts(ts_file)
        
        print(f"✅ Found {len(accounts_data)} accounts to seed")
        
        seeded = 0
        for account_data in accounts_data:
            account = ChartOfAccount(
                tenant_id=tenant_id,
                code=account_data['code'],
                name=account_data['name'],
                group_number=account_data['group_number'],
                category=account_data['category'],
                is_system=True,  # Mark as system account (cannot be deleted)
                is_active=True
            )
            db.add(account)
            seeded += 1
            
            if seeded % 100 == 0:
                print(f"  ⏳ Seeded {seeded} accounts...")
        
        db.commit()
        print(f"✅ Successfully seeded {seeded} Chart of Accounts entries for tenant '{tenant_id}'")
        
        final_count = db.query(ChartOfAccount).filter(
            ChartOfAccount.tenant_id == tenant_id
        ).count()
        print(f"✅ Database now contains {final_count} accounts")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    tenant_id = sys.argv[1] if len(sys.argv) > 1 else "default-tenant"
    print(f"🌱 Seeding Chart of Accounts for tenant: {tenant_id}\n")
    seed_database(tenant_id)
