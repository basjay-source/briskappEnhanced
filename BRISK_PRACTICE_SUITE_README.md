# Brisk Practice Suite

All-in-one, modular platform for accounting firms (multi-client) and businesses (single entity).

## Overview

Cloud-native, multilingual, ultra-fast accounting software with enterprise security and AI assistants embedded in each module.

### Key Features

- **Multi-tenant SaaS**: One tenant = one subscriber account (firm or business)
- **Modular Architecture**: Accounts Production, Tax, Payroll, AML, Company Secretarial, e-Signature
- **AI Assistants**: Embedded in each module with RAG-based advice and compliance guidance
- **Enterprise Security**: GDPR/UK-GDPR compliant, ISO 27001/SOC 2 ready
- **Modern UX**: React + TypeScript frontend with blue/orange theme, light/dark mode

### Pain Points Addressed

- Dated UX and fragmented workflows
- Slow desktop tools and weak integrations
- Expensive bloat and shallow reporting
- Stale compliance guidance

## Architecture

- **Frontend**: React + TypeScript (Next.js), Tailwind CSS, shadcn/ui
- **Backend**: Python FastAPI microservices, Pydantic models
- **Database**: PostgreSQL (multi-tenant with RLS), Redis, pgvector for AI
- **AI Layer**: LLM gateway, RAG with vector embeddings
- **Integrations**: Xero, QuickBooks, Sage, HMRC MTD, Companies House

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Infrastructure
```bash
cd infra
terraform init
terraform plan
```

## Modules

1. **Accounts Production** - FRS 102/105, IFRS, iXBRL
2. **Corporation Tax** - CT600, R&D claims, reliefs
3. **Personal Tax** - SA100/SA returns, CGT, IHT
4. **Payroll** - RTI, pensions, CIS, P11D
5. **AML/KYC** - Risk assessment, compliance
6. **Company Secretarial** - Companies House filings
7. **Bookkeeping** - Bank feeds, VAT MTD, management accounts
8. **e-Signature** - Native signing workflows

## AI Assistants

- **AccountsAdviser** - KPIs, ratios, disclosures, trends
- **Business Tax Adviser** - CT optimization, R&D, reliefs
- **Personal Tax Adviser** - Allowances, CGT/IHT planning
- **HR Adviser** - Payroll policies, compliance
- **Company Secretary** - Filing deadlines, forms guidance

## License

Proprietary - Brisk Accountants Ltd
