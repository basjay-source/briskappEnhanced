import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { LocaleProvider } from '@/contexts/LocaleContextNew'
import AppShell from '@/components/AppShell'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import EcosystemHub from '@/pages/EcosystemHub'
import AccountsProduction from '@/pages/modules/AccountsProduction'
import CharityAccounts from '@/pages/modules/CharityAccounts'
import CorporationTax from '@/pages/modules/CorporationTax'
import PersonalTax from '@/pages/modules/PersonalTax'
import Payroll from '@/pages/modules/Payroll'
import AMLCompliance from '@/pages/modules/AMLCompliance'
import CompanySecretarial from '@/pages/modules/CompanySecretarial'
import BookkeepingVAT from '@/pages/modules/BookkeepingVAT'
import ESignature from '@/pages/modules/ESignature'
import TimeAndFeesModuleAdvanced from '@/pages/modules/TimeAndFeesModuleAdvanced'
import AdminModule from '@/pages/modules/AdminModule'
import PracticeManagement from '@/pages/modules/PracticeManagement'
import VAT from '@/pages/modules/VAT'
import DocusinageEnterpriseFinal from '@/pages/modules/DocusinageEnterpriseFinal'
import ClientPortal from '@/components/ClientPortal'
import NewJobForm from './pages/forms/NewJobForm'
import NewInvoiceTemplateForm from './pages/forms/NewInvoiceTemplateForm'
import NewInvoiceForm from './pages/forms/NewInvoiceForm'
import NewPayslipTemplateForm from './pages/forms/NewPayslipTemplateForm'
import NewCustomerForm from './pages/forms/NewCustomerForm'
import NewSupplierForm from './pages/forms/NewSupplierForm'
import NewProductForm from './pages/forms/NewProductForm'
import NewBillForm from './pages/forms/NewBillForm'
import NewExpenseForm from './pages/forms/NewExpenseForm'
import NewAccountForm from './pages/forms/NewAccountForm'
import NewQuoteForm from './pages/forms/NewQuoteForm'
import NewApprovalRequestForm from './pages/forms/NewApprovalRequestForm'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="brisk-ui-theme">
      <LocaleProvider>
        <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Navigate to="/app/hub" replace />} />
            <Route path="hub" element={<EcosystemHub />} />
            <Route path="practice" element={<PracticeManagement />} />
            <Route path="accounts" element={<AccountsProduction />} />
            <Route path="charity" element={<CharityAccounts />} />
            <Route path="tax/ct" element={<CorporationTax />} />
            <Route path="tax/sa" element={<PersonalTax />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="aml" element={<AMLCompliance />} />
            <Route path="cosec" element={<CompanySecretarial />} />
            <Route path="books" element={<BookkeepingVAT />} />
            <Route path="bookkeeping" element={<BookkeepingVAT />} />
            <Route path="vat" element={<VAT />} />
            <Route path="esign" element={<ESignature />} />
            <Route path="docusinage" element={<DocusinageEnterpriseFinal />} />
            <Route path="time" element={<TimeAndFeesModuleAdvanced />} />
            <Route path="admin" element={<AdminModule />} />
            <Route path="portal" element={<ClientPortal />} />
            <Route path="practice/jobs/new" element={<NewJobForm />} />
            <Route path="admin/templates/invoice/new" element={<NewInvoiceTemplateForm />} />
            <Route path="admin/templates/payslip/new" element={<NewPayslipTemplateForm />} />
            <Route path="books/invoices/new" element={<NewInvoiceForm />} />
            <Route path="books/customers/new" element={<NewCustomerForm />} />
            <Route path="books/suppliers/new" element={<NewSupplierForm />} />
            <Route path="books/products/new" element={<NewProductForm />} />
            <Route path="books/bills/new" element={<NewBillForm />} />
            <Route path="books/expenses/new" element={<NewExpenseForm />} />
            <Route path="books/accounts/new" element={<NewAccountForm />} />
            <Route path="books/quotes/new" element={<NewQuoteForm />} />
            <Route path="admin/approvals/new" element={<NewApprovalRequestForm />} />
          </Route>
        </Routes>
        </Router>
      </LocaleProvider>
    </ThemeProvider>
  )
}

export default App
