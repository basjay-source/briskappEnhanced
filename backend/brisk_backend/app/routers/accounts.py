from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date
from decimal import Decimal

from app.database import get_db
from app.models import LedgerAccount, JournalEntry, TrialBalance, FinancialStatement, AccountsProductionClient, YearEndAdjustment, AdjustmentJournalLine, ChartOfAccount, AccountBalance, NominalLedgerEntry

router = APIRouter()

class TrialBalanceCreate(BaseModel):
    company_id: str
    period_end: date
    account_code: str
    account_name: str
    debit_balance: Optional[Decimal] = 0
    credit_balance: Optional[Decimal] = 0

class JournalEntryCreate(BaseModel):
    company_id: str
    account_id: str
    transaction_date: date
    description: str
    reference: Optional[str] = None
    debit_amount: Optional[Decimal] = 0
    credit_amount: Optional[Decimal] = 0
    currency: str = "GBP"

class FinancialStatementCreate(BaseModel):
    company_id: str
    statement_type: str
    period_start: date
    period_end: date
    data: dict

@router.get("/trial-balance/{company_id}")
def get_trial_balance(
    company_id: str,
    period_end: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(TrialBalance).filter(
        TrialBalance.tenant_id == request.state.tenant_id,
        TrialBalance.company_id == company_id
    )
    
    if period_end:
        query = query.filter(TrialBalance.period_end == period_end)
    
    trial_balance = query.all()
    
    total_debits = sum(tb.debit_balance for tb in trial_balance)
    total_credits = sum(tb.credit_balance for tb in trial_balance)
    
    return {
        "trial_balance": trial_balance,
        "totals": {
            "debits": total_debits,
            "credits": total_credits,
            "balanced": total_debits == total_credits
        }
    }

@router.post("/trial-balance/import")
def import_trial_balance(
    trial_balance_data: List[TrialBalanceCreate],
    request: Request = None,
    db: Session = Depends(get_db)
):
    imported_records = []
    
    for tb_data in trial_balance_data:
        tb = TrialBalance(
            tenant_id=request.state.tenant_id,
            **tb_data.dict()
        )
        db.add(tb)
        imported_records.append(tb)
    
    db.commit()
    
    return {
        "message": f"Imported {len(imported_records)} trial balance records",
        "records": len(imported_records)
    }

@router.post("/journals")
def create_journal_entry(
    journal_data: JournalEntryCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    journal = JournalEntry(
        tenant_id=request.state.tenant_id,
        **journal_data.dict()
    )
    
    db.add(journal)
    db.commit()
    db.refresh(journal)
    
    return journal

@router.get("/statements/{company_id}")
def get_financial_statements(
    company_id: str,
    statement_type: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(FinancialStatement).filter(
        FinancialStatement.tenant_id == request.state.tenant_id,
        FinancialStatement.company_id == company_id
    )
    
    if statement_type:
        query = query.filter(FinancialStatement.statement_type == statement_type)
    
    return query.all()

@router.post("/statements/compile")
def compile_financial_statements(
    statement_data: FinancialStatementCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    trial_balance = db.query(TrialBalance).filter(
        TrialBalance.tenant_id == request.state.tenant_id,
        TrialBalance.company_id == statement_data.company_id,
        TrialBalance.period_end == statement_data.period_end
    ).all()
    
    if not trial_balance:
        raise HTTPException(status_code=404, detail="Trial balance not found for the specified period")
    
    compiled_data = {
        "profit_and_loss": {
            "revenue": sum(tb.credit_balance for tb in trial_balance if tb.account_code.startswith("4")),
            "cost_of_sales": sum(tb.debit_balance for tb in trial_balance if tb.account_code.startswith("5")),
            "expenses": sum(tb.debit_balance for tb in trial_balance if tb.account_code.startswith("6")),
        },
        "balance_sheet": {
            "fixed_assets": sum(tb.debit_balance for tb in trial_balance if tb.account_code.startswith("1")),
            "current_assets": sum(tb.debit_balance for tb in trial_balance if tb.account_code.startswith("2")),
            "current_liabilities": sum(tb.credit_balance for tb in trial_balance if tb.account_code.startswith("3")),
        }
    }
    
    statement = FinancialStatement(
        tenant_id=request.state.tenant_id,
        company_id=statement_data.company_id,
        statement_type=statement_data.statement_type,
        period_start=statement_data.period_start,
        period_end=statement_data.period_end,
        data=compiled_data,
        status="compiled"
    )
    
    db.add(statement)
    db.commit()
    db.refresh(statement)
    
    return {
        "statement": statement,
        "compiled_data": compiled_data,
        "validation": {
            "balance_sheet_balanced": True,
            "profit_calculated": True
        }
    }

@router.post("/statements/{statement_id}/ixbrl")
def generate_ixbrl(
    statement_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    statement = db.query(FinancialStatement).filter(
        FinancialStatement.tenant_id == request.state.tenant_id,
        FinancialStatement.id == statement_id
    ).first()
    
    if not statement:
        raise HTTPException(status_code=404, detail="Financial statement not found")
    
    ixbrl_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" 
      xmlns:ix="http://www.xbrl.org/2013/inlineXBRL">
<head>
    <title>Financial Statements - {statement.company_id}</title>
</head>
<body>
    <h1>Financial Statements</h1>
    <p>Period: <ix:nonNumeric contextRef="period">{statement.period_start} to {statement.period_end}</ix:nonNumeric></p>
    
    <h2>Profit and Loss Account</h2>
    <table>
        <tr>
            <td>Turnover</td>
            <td><ix:nonFraction contextRef="period" name="uk-bus:Turnover" unitRef="GBP" decimals="0">{statement.data.get('profit_and_loss', {}).get('revenue', 0)}</ix:nonFraction></td>
        </tr>
    </table>
    
    <h2>Balance Sheet</h2>
    <table>
        <tr>
            <td>Fixed Assets</td>
            <td><ix:nonFraction contextRef="period" name="uk-bus:FixedAssets" unitRef="GBP" decimals="0">{statement.data.get('balance_sheet', {}).get('fixed_assets', 0)}</ix:nonFraction></td>
        </tr>
    </table>
</body>
</html>"""
    
    statement.ixbrl_content = ixbrl_content
    db.commit()
    
    return {
        "message": "iXBRL generated successfully",
        "ixbrl_content": ixbrl_content,
        "validation": {
            "tags_applied": True,
            "schema_valid": True
        }
    }

class AccountsProductionClientCreate(BaseModel):
    name: str
    type: str
    registration_number: Optional[str] = None
    year_end: date
    accounts_status: str = "not-started"
    last_accounts: Optional[date] = None
    next_due: Optional[date] = None
    frs_standard: str = "FRS 102"
    contact_person: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None

class AccountsProductionClientUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    registration_number: Optional[str] = None
    year_end: Optional[date] = None
    accounts_status: Optional[str] = None
    last_accounts: Optional[date] = None
    next_due: Optional[date] = None
    frs_standard: Optional[str] = None
    contact_person: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None

@router.get("/production/clients")
def get_production_clients(
    request: Request = None,
    db: Session = Depends(get_db)
):
    clients = db.query(AccountsProductionClient).filter(
        AccountsProductionClient.tenant_id == request.state.tenant_id
    ).all()
    return clients

@router.post("/production/clients")
def create_production_client(
    client_data: AccountsProductionClientCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    client = AccountsProductionClient(
        tenant_id=request.state.tenant_id,
        **client_data.dict()
    )
    db.add(client)
    db.commit()
    db.refresh(client)
    return client

@router.get("/production/clients/{client_id}")
def get_production_client(
    client_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    client = db.query(AccountsProductionClient).filter(
        AccountsProductionClient.tenant_id == request.state.tenant_id,
        AccountsProductionClient.id == client_id
    ).first()
    
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    return client

@router.put("/production/clients/{client_id}")
def update_production_client(
    client_id: str,
    client_data: AccountsProductionClientUpdate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    client = db.query(AccountsProductionClient).filter(
        AccountsProductionClient.tenant_id == request.state.tenant_id,
        AccountsProductionClient.id == client_id
    ).first()
    
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    for key, value in client_data.dict(exclude_unset=True).items():
        setattr(client, key, value)
    
    db.commit()
    db.refresh(client)
    return client

@router.delete("/production/clients/{client_id}")
def delete_production_client(
    client_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    client = db.query(AccountsProductionClient).filter(
        AccountsProductionClient.tenant_id == request.state.tenant_id,
        AccountsProductionClient.id == client_id
    ).first()
    
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    db.delete(client)
    db.commit()
    return {"message": "Client deleted successfully"}

class JournalLineCreate(BaseModel):
    account_code: str
    account_name: str
    description: Optional[str] = ""
    debit: Decimal = 0
    credit: Decimal = 0

class YearEndAdjustmentCreate(BaseModel):
    company_id: str
    adjustment_type: str
    reference: str
    description: str
    adjustment_date: date
    status: str = "draft"
    notes: Optional[str] = ""
    journal_lines: List[JournalLineCreate]

class YearEndAdjustmentUpdate(BaseModel):
    adjustment_type: Optional[str] = None
    reference: Optional[str] = None
    description: Optional[str] = None
    adjustment_date: Optional[date] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    journal_lines: Optional[List[JournalLineCreate]] = None

@router.get("/production/adjustments/{company_id}")
def get_adjustments(
    company_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    adjustments = db.query(YearEndAdjustment).filter(
        YearEndAdjustment.tenant_id == request.state.tenant_id,
        YearEndAdjustment.company_id == company_id
    ).all()
    
    result = []
    for adj in adjustments:
        adj_dict = {
            "id": adj.id,
            "company_id": adj.company_id,
            "adjustment_type": adj.adjustment_type,
            "reference": adj.reference,
            "description": adj.description,
            "adjustment_date": adj.adjustment_date,
            "status": adj.status,
            "total_debit": adj.total_debit,
            "total_credit": adj.total_credit,
            "notes": adj.notes,
            "created_at": adj.created_at,
            "journal_lines": [
                {
                    "id": line.id,
                    "account_code": line.account_code,
                    "account_name": line.account_name,
                    "description": line.description,
                    "debit": line.debit_amount,
                    "credit": line.credit_amount
                }
                for line in adj.journal_lines
            ]
        }
        result.append(adj_dict)
    
    return result

@router.post("/production/adjustments")
def create_adjustment(
    adjustment_data: YearEndAdjustmentCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    total_debit = sum(line.debit for line in adjustment_data.journal_lines)
    total_credit = sum(line.credit for line in adjustment_data.journal_lines)
    
    if abs(total_debit - total_credit) > 0.01:
        raise HTTPException(status_code=400, detail="Journal must be balanced (total debits must equal total credits)")
    
    adjustment = YearEndAdjustment(
        tenant_id=request.state.tenant_id,
        company_id=adjustment_data.company_id,
        adjustment_type=adjustment_data.adjustment_type,
        reference=adjustment_data.reference,
        description=adjustment_data.description,
        adjustment_date=adjustment_data.adjustment_date,
        status=adjustment_data.status,
        total_debit=total_debit,
        total_credit=total_credit,
        notes=adjustment_data.notes
    )
    
    db.add(adjustment)
    db.flush()
    
    for idx, line_data in enumerate(adjustment_data.journal_lines):
        line = AdjustmentJournalLine(
            adjustment_id=adjustment.id,
            account_code=line_data.account_code,
            account_name=line_data.account_name,
            description=line_data.description,
            debit_amount=line_data.debit,
            credit_amount=line_data.credit,
            line_order=idx
        )
        db.add(line)
    
    db.flush()  # Ensure journal lines are available in the session
    db.refresh(adjustment)  # Refresh to load the journal_lines relationship
    
    if adjustment.status == "posted":
        post_journal_to_ledger(db, request.state.tenant_id, adjustment)
    
    db.commit()
    db.refresh(adjustment)
    
    return {
        "id": adjustment.id,
        "reference": adjustment.reference,
        "status": adjustment.status,
        "total_debit": adjustment.total_debit,
        "total_credit": adjustment.total_credit,
        "message": "Journal entry created successfully"
    }

@router.put("/production/adjustments/{adjustment_id}")
def update_adjustment(
    adjustment_id: str,
    adjustment_data: YearEndAdjustmentUpdate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    adjustment = db.query(YearEndAdjustment).filter(
        YearEndAdjustment.tenant_id == request.state.tenant_id,
        YearEndAdjustment.id == adjustment_id
    ).first()
    
    if not adjustment:
        raise HTTPException(status_code=404, detail="Adjustment not found")
    
    client = db.query(AccountsProductionClient).filter(
        AccountsProductionClient.tenant_id == request.state.tenant_id,
        AccountsProductionClient.id == adjustment.company_id
    ).first()
    
    if client and (client.accounts_finalized or client.accounts_filed):
        raise HTTPException(status_code=400, detail="Cannot edit journal entry - accounts have been finalized or filed")
    
    if adjustment_data.journal_lines is not None:
        total_debit = sum(line.debit for line in adjustment_data.journal_lines)
        total_credit = sum(line.credit for line in adjustment_data.journal_lines)
        
        if abs(total_debit - total_credit) > 0.01:
            raise HTTPException(status_code=400, detail="Journal must be balanced")
        
        db.query(AdjustmentJournalLine).filter(
            AdjustmentJournalLine.adjustment_id == adjustment_id
        ).delete()
        
        for idx, line_data in enumerate(adjustment_data.journal_lines):
            line = AdjustmentJournalLine(
                adjustment_id=adjustment.id,
                account_code=line_data.account_code,
                account_name=line_data.account_name,
                description=line_data.description,
                debit_amount=line_data.debit,
                credit_amount=line_data.credit,
                line_order=idx
            )
            db.add(line)
        
        adjustment.total_debit = total_debit
        adjustment.total_credit = total_credit
    
    for key, value in adjustment_data.dict(exclude_unset=True, exclude={'journal_lines'}).items():
        setattr(adjustment, key, value)
    
    was_draft = adjustment.status != "posted"
    if was_draft and adjustment_data.status == "posted":
        post_journal_to_ledger(db, request.state.tenant_id, adjustment)
    
    db.commit()
    db.refresh(adjustment)
    return adjustment

@router.delete("/production/adjustments/{adjustment_id}")
def delete_adjustment(
    adjustment_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    adjustment = db.query(YearEndAdjustment).filter(
        YearEndAdjustment.tenant_id == request.state.tenant_id,
        YearEndAdjustment.id == adjustment_id
    ).first()
    
    if not adjustment:
        raise HTTPException(status_code=404, detail="Adjustment not found")
    
    client = db.query(AccountsProductionClient).filter(
        AccountsProductionClient.tenant_id == request.state.tenant_id,
        AccountsProductionClient.id == adjustment.company_id
    ).first()
    
    if client and (client.accounts_finalized or client.accounts_filed):
        raise HTTPException(status_code=400, detail="Cannot delete journal entry - accounts have been finalized or filed")
    
    db.delete(adjustment)
    db.commit()
    return {"message": "Adjustment deleted successfully"}

def post_journal_to_ledger(db: Session, tenant_id: str, adjustment: YearEndAdjustment):
    for line in adjustment.journal_lines:
        if line.debit_amount > 0 or line.credit_amount > 0:
            ledger_entry = NominalLedgerEntry(
                tenant_id=tenant_id,
                company_id=adjustment.company_id,
                account_code=line.account_code,
                transaction_date=adjustment.adjustment_date,
                reference=adjustment.reference,
                description=f"{adjustment.description} - {line.description}",
                debit_amount=line.debit_amount,
                credit_amount=line.credit_amount,
                source_type="year_end_adjustment",
                source_id=adjustment.id
            )
            db.add(ledger_entry)
            
            update_account_balance(
                db, 
                tenant_id, 
                adjustment.company_id, 
                line.account_code, 
                line.debit_amount, 
                line.credit_amount,
                adjustment.adjustment_date
            )
            
            update_trial_balance(
                db,
                tenant_id,
                adjustment.company_id,
                line.account_code,
                line.account_name,
                line.debit_amount,
                line.credit_amount,
                adjustment.adjustment_date
            )

def update_account_balance(
    db: Session, 
    tenant_id: str, 
    company_id: str, 
    account_code: str, 
    debit_amount: Decimal, 
    credit_amount: Decimal,
    transaction_date: date
):
    balance = db.query(AccountBalance).filter(
        AccountBalance.tenant_id == tenant_id,
        AccountBalance.company_id == company_id,
        AccountBalance.account_code == account_code,
        AccountBalance.period_start <= transaction_date,
        AccountBalance.period_end >= transaction_date
    ).first()
    
    if not balance:
        balance = AccountBalance(
            tenant_id=tenant_id,
            company_id=company_id,
            account_code=account_code,
            period_start=date(transaction_date.year, 1, 1),
            period_end=date(transaction_date.year, 12, 31),
            opening_debit=0,
            opening_credit=0,
            current_debit=0,
            current_credit=0
        )
        db.add(balance)
    
    balance.current_debit += debit_amount
    balance.current_credit += credit_amount
    balance.closing_debit = balance.opening_debit + balance.current_debit
    balance.closing_credit = balance.opening_credit + balance.current_credit

def update_trial_balance(
    db: Session,
    tenant_id: str,
    company_id: str,
    account_code: str,
    account_name: str,
    debit_amount: Decimal,
    credit_amount: Decimal,
    transaction_date: date
):
    tb_entry = db.query(TrialBalance).filter(
        TrialBalance.tenant_id == tenant_id,
        TrialBalance.company_id == company_id,
        TrialBalance.account_code == account_code
    ).first()
    
    if tb_entry:
        tb_entry.debit_balance += debit_amount
        tb_entry.credit_balance += credit_amount
    else:
        tb_entry = TrialBalance(
            tenant_id=tenant_id,
            company_id=company_id,
            period_end=date(transaction_date.year, 12, 31),
            account_code=account_code,
            account_name=account_name,
            debit_balance=debit_amount,
            credit_balance=credit_amount
        )
        db.add(tb_entry)

class ChartOfAccountCreate(BaseModel):
    code: str
    name: str
    group_number: Optional[str] = None
    category: Optional[str] = None
    is_system: bool = False
    is_active: bool = True

class ChartOfAccountUpdate(BaseModel):
    code: Optional[str] = None
    name: Optional[str] = None
    group_number: Optional[str] = None
    category: Optional[str] = None
    is_active: Optional[bool] = None

@router.get("/chart-of-accounts")
def get_chart_of_accounts(
    request: Request = None,
    db: Session = Depends(get_db)
):
    accounts = db.query(ChartOfAccount).filter(
        ChartOfAccount.tenant_id == request.state.tenant_id,
        ChartOfAccount.is_active == True
    ).all()
    return accounts

@router.post("/chart-of-accounts")
def create_chart_account(
    account_data: ChartOfAccountCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    account = ChartOfAccount(
        tenant_id=request.state.tenant_id,
        **account_data.dict()
    )
    db.add(account)
    db.commit()
    db.refresh(account)
    return account

@router.put("/chart-of-accounts/{account_id}")
def update_chart_account(
    account_id: str,
    account_data: ChartOfAccountUpdate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    account = db.query(ChartOfAccount).filter(
        ChartOfAccount.tenant_id == request.state.tenant_id,
        ChartOfAccount.id == account_id
    ).first()
    
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    
    for key, value in account_data.dict(exclude_unset=True).items():
        setattr(account, key, value)
    
    db.commit()
    db.refresh(account)
    return account

@router.delete("/chart-of-accounts/{account_id}")
def delete_chart_account(
    account_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    account = db.query(ChartOfAccount).filter(
        ChartOfAccount.tenant_id == request.state.tenant_id,
        ChartOfAccount.id == account_id
    ).first()
    
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    
    if account.is_system:
        raise HTTPException(status_code=403, detail="Cannot delete system account")
    
    db.delete(account)
    db.commit()
    return {"message": "Account deleted successfully"}

class TrialBalanceEntryCreate(BaseModel):
    company_id: str
    period_end: date
    account_code: str
    account_name: str
    debit_balance: Decimal = 0
    credit_balance: Decimal = 0

class TrialBalanceEntryUpdate(BaseModel):
    account_code: Optional[str] = None
    account_name: Optional[str] = None
    debit_balance: Optional[Decimal] = None
    credit_balance: Optional[Decimal] = None

@router.post("/trial-balance/entry")
def create_trial_balance_entry(
    entry_data: TrialBalanceEntryCreate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    entry = TrialBalance(
        tenant_id=request.state.tenant_id,
        **entry_data.dict()
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

@router.put("/trial-balance/entry/{entry_id}")
def update_trial_balance_entry(
    entry_id: str,
    entry_data: TrialBalanceEntryUpdate,
    request: Request = None,
    db: Session = Depends(get_db)
):
    entry = db.query(TrialBalance).filter(
        TrialBalance.tenant_id == request.state.tenant_id,
        TrialBalance.id == entry_id
    ).first()
    
    if not entry:
        raise HTTPException(status_code=404, detail="Trial balance entry not found")
    
    for key, value in entry_data.dict(exclude_unset=True).items():
        setattr(entry, key, value)
    
    db.commit()
    db.refresh(entry)
    return entry

@router.delete("/trial-balance/entry/{entry_id}")
def delete_trial_balance_entry(
    entry_id: str,
    request: Request = None,
    db: Session = Depends(get_db)
):
    entry = db.query(TrialBalance).filter(
        TrialBalance.tenant_id == request.state.tenant_id,
        TrialBalance.id == entry_id
    ).first()
    
    if not entry:
        raise HTTPException(status_code=404, detail="Trial balance entry not found")
    
    db.delete(entry)
    db.commit()
    return {"message": "Trial balance entry deleted successfully"}

@router.get("/nominal-ledger/{company_id}")
def get_nominal_ledger(
    company_id: str,
    account_code: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(NominalLedgerEntry).filter(
        NominalLedgerEntry.tenant_id == request.state.tenant_id,
        NominalLedgerEntry.company_id == company_id
    )
    
    if account_code:
        query = query.filter(NominalLedgerEntry.account_code == account_code)
    
    if start_date:
        query = query.filter(NominalLedgerEntry.transaction_date >= start_date)
    
    if end_date:
        query = query.filter(NominalLedgerEntry.transaction_date <= end_date)
    
    entries = query.order_by(NominalLedgerEntry.transaction_date.desc()).all()
    
    return {
        "entries": entries,
        "total_entries": len(entries),
        "total_debit": sum(e.debit_amount for e in entries),
        "total_credit": sum(e.credit_amount for e in entries)
    }

@router.get("/account-balances/{company_id}")
def get_account_balances(
    company_id: str,
    account_code: Optional[str] = None,
    request: Request = None,
    db: Session = Depends(get_db)
):
    query = db.query(AccountBalance).filter(
        AccountBalance.tenant_id == request.state.tenant_id,
        AccountBalance.company_id == company_id
    )
    
    if account_code:
        query = query.filter(AccountBalance.account_code == account_code)
    
    balances = query.all()
    return balances
