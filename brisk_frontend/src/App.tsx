import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import DocumentHubDashboard from './pages/DocumentHubDashboard'
import PracticeManagementDashboard from './pages/PracticeManagementDashboard'
import AMLKYCDashboard from './pages/AMLKYCDashboard'
import TimeManagementDashboard from './pages/TimeManagementDashboard'
import BookkeepingDashboard from './pages/BookkeepingDashboard'
import PayrollDashboard from './pages/PayrollDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
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
            <Route path="/" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
