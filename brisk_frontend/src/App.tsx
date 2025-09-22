import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './components/theme-provider'
import LoginPage from './pages/LoginPage'
import EcosystemHub from './pages/EcosystemHub'
import AdminDashboard from './pages/AdminDashboard'
import DocumentHubDashboard from './pages/DocumentHubDashboard'
import PracticeManagementDashboard from './pages/PracticeManagementDashboard'
import AMLKYCDashboard from './pages/AMLKYCDashboard'
import TimeManagementDashboard from './pages/TimeManagementDashboard'
import BookkeepingDashboard from './pages/BookkeepingDashboard'
import PayrollDashboard from './pages/PayrollDashboard'
import CompanySecretarialDashboard from './pages/CompanySecretarialDashboard'
import AccountsProductionDashboard from './pages/AccountsProductionDashboard'
import BusinessTaxDashboard from './pages/BusinessTaxDashboard'
import PersonalTaxDashboard from './pages/PersonalTaxDashboard'
import CharityAccountsDashboard from './pages/CharityAccountsDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="brisk-ui-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/document-hub/*" element={
              <ProtectedRoute>
                <DocumentHubDashboard />
              </ProtectedRoute>
            } />
            <Route path="/practice-management/*" element={
              <ProtectedRoute>
                <PracticeManagementDashboard />
              </ProtectedRoute>
            } />
            <Route path="/aml-kyc/*" element={
              <ProtectedRoute>
                <AMLKYCDashboard />
              </ProtectedRoute>
            } />
            <Route path="/time-management/*" element={
              <ProtectedRoute>
                <TimeManagementDashboard />
              </ProtectedRoute>
            } />
            <Route path="/bookkeeping/*" element={
              <ProtectedRoute>
                <BookkeepingDashboard />
              </ProtectedRoute>
            } />
            <Route path="/payroll/*" element={
              <ProtectedRoute>
                <PayrollDashboard />
              </ProtectedRoute>
            } />
            <Route path="/company-secretarial/*" element={
              <ProtectedRoute>
                <CompanySecretarialDashboard />
              </ProtectedRoute>
            } />
            <Route path="/accounts-production/*" element={
              <ProtectedRoute>
                <AccountsProductionDashboard />
              </ProtectedRoute>
            } />
            <Route path="/business-tax/*" element={
              <ProtectedRoute>
                <BusinessTaxDashboard />
              </ProtectedRoute>
            } />
            <Route path="/personal-tax/*" element={
              <ProtectedRoute>
                <PersonalTaxDashboard />
              </ProtectedRoute>
            } />
            <Route path="/charity-accounts/*" element={
              <ProtectedRoute>
                <CharityAccountsDashboard />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <EcosystemHub />
              </ProtectedRoute>
            } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
