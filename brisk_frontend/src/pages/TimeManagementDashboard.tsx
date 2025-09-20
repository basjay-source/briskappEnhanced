import React, { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { 
  BarChart3, 
  Clock, 
  DollarSign, 
  FileText,
  Timer,
  Receipt,
  CheckCircle,
  Layers,
  CreditCard,
  Wallet,
  Target,
  TrendingUp,
  Percent,
  Globe,
  Archive,
  Settings,
  BarChart,
  Zap
} from 'lucide-react'

import TMDashboard from '../components/time-management/TMDashboard'
import EngagementsBudgets from '../components/time-management/EngagementsBudgets'
import RateCardsPricing from '../components/time-management/RateCardsPricing'
import TimeEntryGrid from '../components/time-management/TimeEntryGrid'
import TimersAutoCapture from '../components/time-management/TimersAutoCapture'
import ExpensesDisbursements from '../components/time-management/ExpensesDisbursements'
import ApprovalsLocks from '../components/time-management/ApprovalsLocks'
import WIPLedger from '../components/time-management/WIPLedger'
import PreBillingReview from '../components/time-management/PreBillingReview'
import BillingInvoicing from '../components/time-management/BillingInvoicing'
import RetainersTrust from '../components/time-management/RetainersTrust'
import FixedFeeMilestones from '../components/time-management/FixedFeeMilestones'
import RevenueRecognition from '../components/time-management/RevenueRecognition'
import WriteUpsOffs from '../components/time-management/WriteUpsOffs'
import MultiCurrencyVAT from '../components/time-management/MultiCurrencyVAT'
import CollectionsPayments from '../components/time-management/CollectionsPayments'
import TMReportingAnalytics from '../components/time-management/TMReportingAnalytics'
import TMIntegrationsComponent from '../components/time-management/TMIntegrationsComponent'
import TMSettingsComponent from '../components/time-management/TMSettingsComponent'

const TimeManagementDashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('dashboard')

  const sections = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, component: TMDashboard },
    { id: 'engagements-budgets', name: 'Engagements & Budgets', icon: Target, component: EngagementsBudgets },
    { id: 'rate-cards-pricing', name: 'Rate Cards & Pricing', icon: DollarSign, component: RateCardsPricing },
    { id: 'time-entry', name: 'Time Entry (Grid/Calendar)', icon: Clock, component: TimeEntryGrid },
    { id: 'timers-auto-capture', name: 'Timers & Auto-Capture', icon: Timer, component: TimersAutoCapture },
    { id: 'expenses-disbursements', name: 'Expenses & Disbursements', icon: Receipt, component: ExpensesDisbursements },
    { id: 'approvals-locks', name: 'Approvals & Locks', icon: CheckCircle, component: ApprovalsLocks },
    { id: 'wip-ledger', name: 'WIP Ledger & Transfers', icon: Layers, component: WIPLedger },
    { id: 'pre-billing-review', name: 'Pre-billing Review', icon: FileText, component: PreBillingReview },
    { id: 'billing-invoicing', name: 'Billing & Invoicing', icon: CreditCard, component: BillingInvoicing },
    { id: 'retainers-trust', name: 'Retainers & Trust Accounts', icon: Wallet, component: RetainersTrust },
    { id: 'fixed-fee-milestones', name: 'Fixed-Fee & Milestones', icon: Target, component: FixedFeeMilestones },
    { id: 'revenue-recognition', name: 'Revenue Recognition', icon: TrendingUp, component: RevenueRecognition },
    { id: 'write-ups-offs', name: 'Write-ups/Offs & Discounts', icon: Percent, component: WriteUpsOffs },
    { id: 'multi-currency-vat', name: 'Multi-currency & VAT', icon: Globe, component: MultiCurrencyVAT },
    { id: 'collections-payments', name: 'Collections & Payment Links', icon: Archive, component: CollectionsPayments },
    { id: 'reporting-analytics', name: 'Reporting & Analytics', icon: BarChart, component: TMReportingAnalytics },
    { id: 'integrations', name: 'Integrations', icon: Zap, component: TMIntegrationsComponent },
    { id: 'settings', name: 'Settings', icon: Settings, component: TMSettingsComponent }
  ]

  React.useEffect(() => {
    const path = location.pathname.split('/').pop()
    if (path && sections.find(s => s.id === path)) {
      setActiveSection(path)
    }
  }, [location])

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    navigate(`/time-management/${sectionId}`)
  }

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || TMDashboard

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Time Management</h1>
              <p className="text-sm text-gray-600">& Fees</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{section.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Clients</option>
                <option>Acme Corp</option>
                <option>Tech Ltd</option>
                <option>Global Inc</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>My View</option>
                <option>Team View</option>
                <option>All Users</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">Unbilled WIP:</span>
                <span className="font-semibold text-orange-600">£125,000</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">AR Due:</span>
                <span className="font-semibold text-red-600">£45,000</span>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Timer className="w-4 h-4" />
                <span>Start Timer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<ActiveComponent />} />
            <Route path="/:section" element={<ActiveComponent />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default TimeManagementDashboard
