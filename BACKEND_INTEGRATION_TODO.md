# Backend Persistence Integration - Remaining Work

## Status: Partial Implementation Complete

**Completed:**
- ✅ Backend models & API endpoints (15 endpoints)
- ✅ Frontend API client methods (11 methods)
- ✅ Client CRUD connected to backend APIs
- ✅ Consolidated Accounts UI added
- ✅ HMRC filing removed from Accounts Production

**Not Yet Complete:**
- ❌ Database migrations (tables don't exist)
- ❌ Trial Balance API integration
- ❌ Year-End Adjustments API integration
- ❌ Chart of Accounts API integration
- ❌ IAS Chart of Accounts data seeding

---

## Step 1: Create Database Migrations

### Commands:
```bash
cd /home/ubuntu/repos/briskappEnhanced/backend/brisk_backend

# Initialize Alembic (if not already done)
alembic init alembic

# Create migration for new tables
alembic revision --autogenerate -m "Add Accounts Production tables"

# Apply migrations
alembic upgrade head
```

### Expected New Tables:
- `accounts_production_clients`
- `year_end_adjustments`
- `chart_of_accounts`

---

## Step 2: Seed IAS Chart of Accounts

The 1200+ IAS accounts from `frontend/brisk_frontend/src/data/chartOfAccounts.ts` need to be loaded into the database.

### Create Seeding Script:
```python
# backend/brisk_backend/seed_chart_of_accounts.py
from app.database import SessionLocal
from app.models.accounts import ChartOfAccount
from data.chart_of_accounts import get_all_accounts  # Import from frontend data

def seed_chart_of_accounts(tenant_id: str):
    db = SessionLocal()
    accounts = get_all_accounts()
    
    for account in accounts:
        db_account = ChartOfAccount(
            tenant_id=tenant_id,
            code=account['code'],
            name=account['name'],
            group_number=account.get('groupNumber'),
            category=account.get('category'),
            is_system=True,  # System accounts can't be deleted
            is_active=True
        )
        db.add(db_account)
    
    db.commit()
    print(f"Seeded {len(accounts)} chart of accounts")
```

---

## Step 3: Connect Trial Balance to Backend APIs

### File: `frontend/brisk_frontend/src/pages/modules/AccountsProduction.tsx`

**Replace Trial Balance state initialization:**
```typescript
// Current (line ~84):
const [trialBalanceEntries, setTrialBalanceEntries] = useState<TrialBalanceEntry[]>([...hardcoded data...])

// Change to:
const [trialBalanceEntries, setTrialBalanceEntries] = useState<TrialBalanceEntry[]>([])

// Add useEffect:
useEffect(() => {
  const loadTrialBalance = async () => {
    try {
      const companyId = 'default-company-id' // Or get from selected client
      const response = await api.getTrialBalance(companyId)
      setTrialBalanceEntries(response.trial_balance || [])
    } catch (error) {
      console.error('Failed to load trial balance:', error)
    }
  }
  loadTrialBalance()
}, [])
```

**Update handlers:**
```typescript
// handleSaveNewTBEntry (line ~259):
const handleSaveNewTBEntry = async () => {
  try {
    await api.createTrialBalanceEntry({
      company_id: 'default-company-id',
      period_end: new Date().toISOString().split('T')[0],
      ...tbFormData
    })
    // Reload trial balance
    const response = await api.getTrialBalance('default-company-id')
    setTrialBalanceEntries(response.trial_balance || [])
    setIsTBAddOpen(false)
  } catch (error) {
    console.error('Failed to create trial balance entry:', error)
  }
}

// handleSaveTBEntry (line ~273):
const handleSaveTBEntry = async () => {
  if (selectedTBEntry) {
    try {
      await api.updateTrialBalanceEntry(selectedTBEntry.id, tbFormData)
      setTrialBalanceEntries(trialBalanceEntries.map(e => 
        e.id === selectedTBEntry.id ? { ...selectedTBEntry, ...tbFormData } as TrialBalanceEntry : e
      ))
    } catch (error) {
      console.error('Failed to update trial balance entry:', error)
    }
  }
  setIsTBEditOpen(false)
}

// handleConfirmDeleteTBEntry (line ~282):
const handleConfirmDeleteTBEntry = async () => {
  if (selectedTBEntry) {
    try {
      await api.deleteTrialBalanceEntry(selectedTBEntry.id)
      setTrialBalanceEntries(trialBalanceEntries.filter(e => e.id !== selectedTBEntry.id))
    } catch (error) {
      console.error('Failed to delete trial balance entry:', error)
    }
  }
  setIsTBDeleteOpen(false)
}
```

---

## Step 4: Connect Year-End Adjustments to Backend APIs

### File: `frontend/brisk_frontend/src/pages/modules/AccountsProduction.tsx`

**Replace Adjustments state initialization:**
```typescript
// Current (line ~94):
const [adjustments, setAdjustments] = useState<Adjustment[]>([...hardcoded data...])

// Change to:
const [adjustments, setAdjustments] = useState<Adjustment[]>([])

// Add useEffect:
useEffect(() => {
  const loadAdjustments = async () => {
    try {
      const companyId = 'default-company-id'
      const response = await api.getAdjustments(companyId)
      setAdjustments(response || [])
    } catch (error) {
      console.error('Failed to load adjustments:', error)
    }
  }
  loadAdjustments()
}, [])
```

**Update handlers (similar pattern as Trial Balance):**
- `handleSaveAdjustment` → call `api.updateAdjustment()`
- Add create handler → call `api.createAdjustment()`
- Add delete handler → call `api.deleteAdjustment()`

---

## Step 5: Connect Chart of Accounts to Backend APIs

### File: `frontend/brisk_frontend/src/pages/modules/AccountsProduction.tsx`

**Update renderChartOfAccounts:**
```typescript
// Current (line ~1545):
const allAccounts = getAllAccounts()  // Gets from local data file

// Change to load from API:
const [chartAccounts, setChartAccounts] = useState<AccountCode[]>([])

useEffect(() => {
  const loadChartOfAccounts = async () => {
    try {
      const response = await api.getChartOfAccounts()
      setChartAccounts(response || [])
    } catch (error) {
      console.error('Failed to load chart of accounts:', error)
      // Fallback to local data
      setChartAccounts(getAllAccounts())
    }
  }
  loadChartOfAccounts()
}, [])
```

**Update CRUD handlers:**
- `handleSaveNewAccount` → call `api.createChartAccount()`
- `handleUpdateAccount` → call `api.updateChartAccount()`
- `handleConfirmDeleteAccount` → call `api.deleteChartAccount()`

---

## Step 6: Test End-to-End

### Test Scenarios:
1. **Client CRUD:**
   - Create new client → Refresh page → Verify data persists
   - Edit client → Refresh → Verify changes saved
   - Delete client → Refresh → Verify deletion

2. **Trial Balance:**
   - Import CSV → Verify entries saved
   - Sync from Bookkeeping → Verify sync works
   - Add manual entry → Refresh → Verify persists

3. **Adjustments:**
   - Create prepayment → Refresh → Verify saved
   - Update adjustment → Verify changes persist
   - Delete adjustment → Verify deletion

4. **Chart of Accounts:**
   - Search for account → Verify 1200+ accounts load
   - Add custom account → Refresh → Verify saved
   - Try deleting system account → Verify blocked

---

## Estimated Effort

- Database Migrations: 30 minutes
- Data Seeding Script: 1 hour
- Trial Balance Integration: 2 hours
- Adjustments Integration: 1.5 hours
- Chart of Accounts Integration: 2 hours
- Testing & Bug Fixes: 2 hours

**Total: ~9 hours of development work**

---

## Priority Order

1. Database migrations (CRITICAL - nothing works without this)
2. Chart of Accounts seeding (needed for account code lookups)
3. Client operations (already partially done)
4. Trial Balance integration
5. Adjustments integration
6. End-to-end testing

---

## Backend Deployment Checklist

Before deploying to production:
- [ ] Run database migrations on prod database
- [ ] Seed Chart of Accounts for all tenants
- [ ] Test tenant isolation (create data as different tenants)
- [ ] Verify RLS policies working correctly
- [ ] Load test API endpoints
- [ ] Set up monitoring/logging for new endpoints

---

## Contact

For questions about this implementation:
- Backend models: `/backend/brisk_backend/app/models/accounts.py`
- API endpoints: `/backend/brisk_backend/app/routers/accounts.py`
- Frontend API client: `/frontend/brisk_frontend/src/lib/api.ts`
- Frontend component: `/frontend/brisk_frontend/src/pages/modules/AccountsProduction.tsx`
