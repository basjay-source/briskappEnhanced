import React, { useState, Suspense } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import TopNavigation from '../components/shared/TopNavigation'
import ErrorBoundary from '../components/ErrorBoundary'
import Dashboard from '../components/payroll/Dashboard'
import Employees from '../components/payroll/Employees'
import ContractsPayProfiles from '../components/payroll/ContractsPayProfiles'
import PayElements from '../components/payroll/PayElements'
import Timesheets from '../components/payroll/Timesheets'
import LeaveAbsence from '../components/payroll/LeaveAbsence'
import PayRuns from '../components/payroll/PayRuns'
import AutoEnrolmentPensions from '../components/payroll/AutoEnrolmentPensions'
import BenefitsExpenses from '../components/payroll/BenefitsExpenses'
import Deductions from '../components/payroll/Deductions'
import CompanyCars from '../components/payroll/CompanyCars'
import CIS from '../components/payroll/CIS'
import ApprovalsPayments from '../components/payroll/ApprovalsPayments'
import JournalsExports from '../components/payroll/JournalsExports'
import RTIHMRC from '../components/payroll/RTIHMRC'
import Reports from '../components/payroll/Reports'
import YearEnd from '../components/payroll/YearEnd'
import DocumentHub from '../components/payroll/DocumentHub'
import Integrations from '../components/payroll/Integrations'
import Settings from '../components/payroll/Settings'

const PayrollDashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedClient] = useState('Acme Corp Ltd')
  const [selectedPeriod] = useState('Jan 2024')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/payroll/dashboard', icon: '📊' },
    { id: 'employees', label: 'Employees', path: '/payroll/employees', icon: '👥' },
    { id: 'contracts-pay-profiles', label: 'Contracts & Pay Profiles', path: '/payroll/contracts-pay-profiles', icon: '📋' },
    { id: 'pay-elements', label: 'Pay Elements', path: '/payroll/pay-elements', icon: '💰' },
    { id: 'timesheets', label: 'Timesheets', path: '/payroll/timesheets', icon: '⏰' },
    { id: 'leave-absence', label: 'Leave & Absence', path: '/payroll/leave-absence', icon: '🏖️' },
    { id: 'pay-runs', label: 'Pay Runs', path: '/payroll/pay-runs', icon: '🏃' },
    { id: 'auto-enrolment-pensions', label: 'Auto-Enrolment & Pensions', path: '/payroll/auto-enrolment-pensions', icon: '🏦' },
    { id: 'benefits-expenses', label: 'Benefits & Expenses (P11D)', path: '/payroll/benefits-expenses', icon: '🎁' },
    { id: 'deductions', label: 'Deductions (AEO/Loans)', path: '/payroll/deductions', icon: '📉' },
    { id: 'company-cars', label: 'Company Cars', path: '/payroll/company-cars', icon: '🚗' },
    { id: 'cis', label: 'CIS (Construction Industry Scheme)', path: '/payroll/cis', icon: '🏗️' },
    { id: 'approvals-payments', label: 'Approvals & Payments', path: '/payroll/approvals-payments', icon: '✅' },
    { id: 'journals-exports', label: 'Journals & Exports', path: '/payroll/journals-exports', icon: '📤' },
    { id: 'rti-hmrc', label: 'RTI & HMRC', path: '/payroll/rti-hmrc', icon: '🏛️' },
    { id: 'reports', label: 'Reports', path: '/payroll/reports', icon: '📈' },
    { id: 'year-end', label: 'Year-End', path: '/payroll/year-end', icon: '📅' },
    { id: 'document-hub', label: 'Document Hub', path: '/payroll/document-hub', icon: '📁' },
    { id: 'integrations', label: 'Integrations', path: '/payroll/integrations', icon: '🔗' },
    { id: 'settings', label: 'Settings', path: '/payroll/settings', icon: '⚙️' }
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/payroll/dashboard' && location.pathname === '/payroll')
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Payroll</h1>
              <div className="mt-2 space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{selectedClient}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  Tax Year: 2024-25 • {selectedPeriod}
                </div>
              </div>
            </div>
            <TopNavigation />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 space-y-1 overflow-y-auto h-full">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center px-3 py-2 my-0.5 text-sm font-medium rounded-sm transition-all duration-200 shadow-md border border-gray-200 text-left ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105 border-orange-400 font-semibold text-shadow-sm'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:transform hover:scale-105 border-blue-400 font-medium text-shadow-sm hover:from-blue-600 hover:to-blue-700'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Acme Corp Ltd</option>
                <option>Beta Industries</option>
                <option>Gamma Solutions</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>2024-25</option>
                <option>2023-24</option>
                <option>2022-23</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>4-weekly</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Regular</option>
                <option>Off-cycle</option>
                <option>Bonus</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">RTI Connected</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Sync/RTI Status
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                Pension Gateway
              </button>
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-800">
                  <span className="sr-only">Alerts</span>
                  🔔
                </button>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <ErrorBoundary>
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Navigate to="/payroll/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/contracts-pay-profiles" element={<ContractsPayProfiles />} />
                <Route path="/pay-elements" element={<PayElements />} />
                <Route path="/timesheets" element={<Timesheets />} />
                <Route path="/leave-absence" element={<LeaveAbsence />} />
                <Route path="/pay-runs" element={<PayRuns />} />
                <Route path="/auto-enrolment-pensions" element={<AutoEnrolmentPensions />} />
                <Route path="/benefits-expenses" element={<BenefitsExpenses />} />
                <Route path="/deductions" element={<Deductions />} />
                <Route path="/company-cars" element={<CompanyCars />} />
                <Route path="/cis" element={<CIS />} />
                <Route path="/approvals-payments" element={<ApprovalsPayments />} />
                <Route path="/journals-exports" element={<JournalsExports />} />
                <Route path="/rti-hmrc" element={<RTIHMRC />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/year-end" element={<YearEnd />} />
                <Route path="/document-hub" element={<DocumentHub />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default PayrollDashboard
