import React, { useState, Suspense } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import TopNavigation from '../components/shared/TopNavigation'
import ErrorBoundary from '../components/ErrorBoundary'
import Dashboard from '../components/business-tax/Dashboard'
import EngagementSetup from '../components/business-tax/EngagementSetup'
import PrelimsImports from '../components/business-tax/PrelimsImports'
import TradeProfit from '../components/business-tax/TradeProfit'
import CapitalAllowances from '../components/business-tax/CapitalAllowances'
import DisallowablesAddbacks from '../components/business-tax/DisallowablesAddbacks'
import Losses from '../components/business-tax/Losses'
import ChargeableGains from '../components/business-tax/ChargeableGains'
import GroupConsortia from '../components/business-tax/GroupConsortia'
import RDCreativeReliefs from '../components/business-tax/RDCreativeReliefs'
import InterestRestriction from '../components/business-tax/InterestRestriction'
import TransferPricing from '../components/business-tax/TransferPricing'
import CTComputationRates from '../components/business-tax/CTComputationRates'
import QIPs from '../components/business-tax/QIPs'
import PaymentsLiabilities from '../components/business-tax/PaymentsLiabilities'
import CT600Schedules from '../components/business-tax/CT600Schedules'
import AttachmentsIXBRL from '../components/business-tax/AttachmentsIXBRL'
import ReviewChecklists from '../components/business-tax/ReviewChecklists'
import Filing from '../components/business-tax/Filing'
import PostFilingEnquiries from '../components/business-tax/PostFilingEnquiries'
import JournalsPostBack from '../components/business-tax/JournalsPostBack'
import DocumentHubBT from '../components/business-tax/DocumentHubBT'
import Integrations from '../components/business-tax/Integrations'
import BTSettings from '../components/business-tax/BTSettings'
import ReportsBT from '../components/business-tax/ReportsBT'

const BusinessTaxDashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedClient] = useState('Acme Corp Ltd')
  const [selectedPeriod] = useState('31/12/2023')
  const [selectedUTR] = useState('1234567890')
  const [selectedStatus] = useState('Draft')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/business-tax/dashboard', icon: '📊' },
    { id: 'engagement-setup', label: 'Engagement Setup', path: '/business-tax/engagement-setup', icon: '⚙️' },
    { id: 'prelims-imports', label: 'Prelims & Imports', path: '/business-tax/prelims-imports', icon: '📥' },
    { id: 'trade-profit', label: 'Trade Profit', path: '/business-tax/trade-profit', icon: '💼' },
    { id: 'capital-allowances', label: 'Capital Allowances', path: '/business-tax/capital-allowances', icon: '🏭' },
    { id: 'disallowables-addbacks', label: 'Disallowables & Add-backs', path: '/business-tax/disallowables-addbacks', icon: '❌' },
    { id: 'losses', label: 'Losses', path: '/business-tax/losses', icon: '📉' },
    { id: 'chargeable-gains', label: 'Chargeable Gains', path: '/business-tax/chargeable-gains', icon: '📈' },
    { id: 'group-consortia', label: 'Group & Consortia', path: '/business-tax/group-consortia', icon: '🏢' },
    { id: 'rd-creative-reliefs', label: 'R&D & Creative Reliefs', path: '/business-tax/rd-creative-reliefs', icon: '🔬' },
    { id: 'interest-restriction', label: 'Interest Restriction', path: '/business-tax/interest-restriction', icon: '🔒' },
    { id: 'transfer-pricing', label: 'Transfer Pricing', path: '/business-tax/transfer-pricing', icon: '💱' },
    { id: 'ct-computation', label: 'CT Computation & Rates', path: '/business-tax/ct-computation', icon: '🧮' },
    { id: 'qips', label: 'QIPs', path: '/business-tax/qips', icon: '📅' },
    { id: 'payments-liabilities', label: 'Payments & Liabilities', path: '/business-tax/payments-liabilities', icon: '💳' },
    { id: 'ct600-schedules', label: 'CT600 & Schedules', path: '/business-tax/ct600-schedules', icon: '📋' },
    { id: 'attachments-ixbrl', label: 'Attachments & iXBRL', path: '/business-tax/attachments-ixbrl', icon: '📎' },
    { id: 'review-checklists', label: 'Review & Checklists', path: '/business-tax/review-checklists', icon: '✅' },
    { id: 'filing', label: 'Filing', path: '/business-tax/filing', icon: '📤' },
    { id: 'post-filing-enquiries', label: 'Post-Filing & Enquiries', path: '/business-tax/post-filing-enquiries', icon: '📞' },
    { id: 'journals-postback', label: 'Journals & Post-back', path: '/business-tax/journals-postback', icon: '📝' },
    { id: 'document-hub', label: 'Document Hub', path: '/business-tax/document-hub', icon: '📁' },
    { id: 'integrations', label: 'Integrations', path: '/business-tax/integrations', icon: '🔗' },
    { id: 'settings', label: 'Settings', path: '/business-tax/settings', icon: '⚙️' },
    { id: 'reports', label: 'Reports', path: '/business-tax/reports', icon: '📊' }
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/business-tax/dashboard' && location.pathname === '/business-tax')
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Business Tax</h1>
              <div className="mt-2 space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{selectedClient}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  {selectedPeriod} • Corporation Tax • {selectedStatus}
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
              className={`w-full flex items-center px-3 py-2 my-0.5 text-sm font-medium rounded-sm transition-all duration-200 shadow-md border border-gray-200 ${
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
                <option>Draft</option>
                <option>For Review</option>
                <option>Final</option>
              </select>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">UTR:</span>
                <span className="text-sm font-medium text-blue-600">{selectedUTR}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Status:</span> CT Computation
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">In Progress</span>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                HMRC CT
              </button>
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-800">
                  <span className="sr-only">Alerts</span>
                  🔔
                </button>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
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
                <Route path="/" element={<Navigate to="/business-tax/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/engagement-setup" element={<EngagementSetup />} />
                <Route path="/prelims-imports" element={<PrelimsImports />} />
                <Route path="/trade-profit" element={<TradeProfit />} />
                <Route path="/capital-allowances" element={<CapitalAllowances />} />
                <Route path="/disallowables-addbacks" element={<DisallowablesAddbacks />} />
                <Route path="/losses" element={<Losses />} />
                <Route path="/chargeable-gains" element={<ChargeableGains />} />
                <Route path="/group-consortia" element={<GroupConsortia />} />
                <Route path="/rd-creative-reliefs" element={<RDCreativeReliefs />} />
                <Route path="/interest-restriction" element={<InterestRestriction />} />
                <Route path="/transfer-pricing" element={<TransferPricing />} />
                <Route path="/ct-computation" element={<CTComputationRates />} />
                <Route path="/qips" element={<QIPs />} />
                <Route path="/payments-liabilities" element={<PaymentsLiabilities />} />
                <Route path="/ct600-schedules" element={<CT600Schedules />} />
                <Route path="/attachments-ixbrl" element={<AttachmentsIXBRL />} />
                <Route path="/review-checklists" element={<ReviewChecklists />} />
                <Route path="/filing" element={<Filing />} />
                <Route path="/post-filing-enquiries" element={<PostFilingEnquiries />} />
                <Route path="/journals-postback" element={<JournalsPostBack />} />
                <Route path="/document-hub" element={<DocumentHubBT />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/settings" element={<BTSettings />} />
                <Route path="/reports" element={<ReportsBT />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default BusinessTaxDashboard
