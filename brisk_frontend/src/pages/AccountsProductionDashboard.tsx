import React, { useState, Suspense } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import TopNavigation from '../components/shared/TopNavigation'
import ErrorBoundary from '../components/ErrorBoundary'
import Dashboard from '../components/accounts-production/Dashboard'
import EngagementSetup from '../components/accounts-production/EngagementSetup'
import ImportMapping from '../components/accounts-production/ImportMapping'
import ChartOfAccounts from '../components/accounts-production/ChartOfAccounts'
import Adjustments from '../components/accounts-production/Adjustments'
import LeadSchedules from '../components/accounts-production/LeadSchedules'
import NotesDisclosures from '../components/accounts-production/NotesDisclosures'
import DirectorsGovernance from '../components/accounts-production/DirectorsGovernance'
import ShareCapitalReserves from '../components/accounts-production/ShareCapitalReserves'
import CashFlow from '../components/accounts-production/CashFlow'
import Consolidation from '../components/accounts-production/Consolidation'
import AnalyticsReview from '../components/accounts-production/AnalyticsReview'
import IXBRLTagging from '../components/accounts-production/iXBRLTagging'
import ProofsReports from '../components/accounts-production/ProofsReports'
import SignoffPublishing from '../components/accounts-production/SignoffPublishing'
import FilingExports from '../components/accounts-production/FilingExports'
import FeedbackAuditTrail from '../components/accounts-production/FeedbackAuditTrail'
import DocumentHub from '../components/accounts-production/DocumentHub'
import Integrations from '../components/accounts-production/Integrations'
import Settings from '../components/accounts-production/Settings'

const AccountsProductionDashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedClient] = useState('Acme Corp Ltd')
  const [selectedPeriod] = useState('31/12/2023')
  const [selectedFramework] = useState('FRS 102')
  const [selectedVersion] = useState('Draft')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/accounts-production/dashboard', icon: '📊' },
    { id: 'engagement-setup', label: 'Engagement Setup', path: '/accounts-production/engagement-setup', icon: '⚙️' },
    { id: 'import-mapping', label: 'Import & Mapping', path: '/accounts-production/import-mapping', icon: '📥' },
    { id: 'chart-of-accounts', label: 'Chart of Accounts', path: '/accounts-production/chart-of-accounts', icon: '📋' },
    { id: 'adjustments', label: 'Adjustments', path: '/accounts-production/adjustments', icon: '📝' },
    { id: 'lead-schedules', label: 'Lead Schedules & Working Papers', path: '/accounts-production/lead-schedules', icon: '📋' },
    { id: 'notes-disclosures', label: 'Notes & Disclosures', path: '/accounts-production/notes-disclosures', icon: '📄' },
    { id: 'directors-governance', label: 'Directors & Governance', path: '/accounts-production/directors-governance', icon: '👥' },
    { id: 'share-capital-reserves', label: 'Share Capital & Reserves', path: '/accounts-production/share-capital-reserves', icon: '💰' },
    { id: 'cash-flow', label: 'Cash Flow', path: '/accounts-production/cash-flow', icon: '💸' },
    { id: 'consolidation', label: 'Consolidation & Groups', path: '/accounts-production/consolidation', icon: '🏢' },
    { id: 'analytics-review', label: 'Analytics & Review', path: '/accounts-production/analytics-review', icon: '📈' },
    { id: 'ixbrl-tagging', label: 'iXBRL Tagging & Validation', path: '/accounts-production/ixbrl-tagging', icon: '🏷️' },
    { id: 'proofs-reports', label: 'Proofs & Reports', path: '/accounts-production/proofs-reports', icon: '📜' },
    { id: 'signoff-publishing', label: 'Sign-off & Publishing', path: '/accounts-production/signoff-publishing', icon: '✅' },
    { id: 'filing-exports', label: 'Filing & Exports', path: '/accounts-production/filing-exports', icon: '📤' },
    { id: 'feedback-audit-trail', label: 'Feedback & Audit Trail', path: '/accounts-production/feedback-audit-trail', icon: '🔍' },
    { id: 'document-hub', label: 'Document Hub', path: '/accounts-production/document-hub', icon: '📁' },
    { id: 'integrations', label: 'Integrations', path: '/accounts-production/integrations', icon: '🔗' },
    { id: 'settings', label: 'Settings', path: '/accounts-production/settings', icon: '⚙️' }
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/accounts-production/dashboard' && location.pathname === '/accounts-production')
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Accounts Production</h1>
              <div className="mt-2 space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{selectedClient}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  {selectedPeriod} • {selectedFramework} • {selectedVersion}
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
                <option>31/12/2023</option>
                <option>31/12/2022</option>
                <option>31/03/2024</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>FRS 102</option>
                <option>FRS 105</option>
                <option>IFRS</option>
                <option>LLP</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Draft</option>
                <option>For Review</option>
                <option>Final</option>
              </select>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Materiality:</span>
                <span className="text-sm font-medium text-blue-600">£5,000</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Status:</span> TB Imported
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">In Progress</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Companies House
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                HMRC iXBRL
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
                <Route path="/" element={<Navigate to="/accounts-production/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/engagement-setup" element={<EngagementSetup />} />
                <Route path="/import-mapping" element={<ImportMapping />} />
                <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
                <Route path="/adjustments" element={<Adjustments />} />
                <Route path="/lead-schedules" element={<LeadSchedules />} />
                <Route path="/notes-disclosures" element={<NotesDisclosures />} />
                <Route path="/directors-governance" element={<DirectorsGovernance />} />
                <Route path="/share-capital-reserves" element={<ShareCapitalReserves />} />
                <Route path="/cash-flow" element={<CashFlow />} />
                <Route path="/consolidation" element={<Consolidation />} />
                <Route path="/analytics-review" element={<AnalyticsReview />} />
                <Route path="/ixbrl-tagging" element={<IXBRLTagging />} />
                <Route path="/proofs-reports" element={<ProofsReports />} />
                <Route path="/signoff-publishing" element={<SignoffPublishing />} />
                <Route path="/filing-exports" element={<FilingExports />} />
                <Route path="/feedback-audit-trail" element={<FeedbackAuditTrail />} />
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

export default AccountsProductionDashboard
