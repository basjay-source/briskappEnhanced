import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import AppShell from '@/components/AppShell'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import EcosystemHub from '@/pages/EcosystemHub'
import AccountsProduction from '@/pages/modules/AccountsProduction'
import CorporationTax from '@/pages/modules/CorporationTax'
import PersonalTax from '@/pages/modules/PersonalTax'
import Payroll from '@/pages/modules/Payroll'
import AMLCompliance from '@/pages/modules/AMLCompliance'
import CompanySecretarial from '@/pages/modules/CompanySecretarial'
import Bookkeeping from '@/pages/modules/Bookkeeping'
import ESignature from '@/pages/modules/ESignature'
import PracticeManagement from '@/pages/modules/PracticeManagement'
import ClientPortal from '@/components/ClientPortal'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="brisk-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Navigate to="/app/hub" replace />} />
            <Route path="hub" element={<EcosystemHub />} />
            <Route path="practice" element={<PracticeManagement />} />
            <Route path="accounts" element={<AccountsProduction />} />
            <Route path="tax/ct" element={<CorporationTax />} />
            <Route path="tax/sa" element={<PersonalTax />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="aml" element={<AMLCompliance />} />
            <Route path="cosec" element={<CompanySecretarial />} />
            <Route path="books" element={<Bookkeeping />} />
            <Route path="esign" element={<ESignature />} />
            <Route path="portal" element={<ClientPortal />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
