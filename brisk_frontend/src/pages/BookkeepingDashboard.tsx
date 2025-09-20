import React from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, Inbox, Banknote, ShoppingCart, Receipt, 
  Users, FolderOpen, BookOpen, Calculator, Building,
  Upload, CheckCircle, FileText, Lock, Archive, Settings, BarChart3, HardHat, Globe
} from 'lucide-react'

import Dashboard from '../components/bookkeeping/Dashboard'
import InboxOCR from '../components/bookkeeping/InboxOCR'
import Banking from '../components/bookkeeping/Banking'
import Sales from '../components/bookkeeping/Sales'
import Purchases from '../components/bookkeeping/Purchases'
import Expenses from '../components/bookkeeping/Expenses'
import ProjectsDimensions from '../components/bookkeeping/ProjectsDimensions'
import Journals from '../components/bookkeeping/Journals'
import VATGST from '../components/bookkeeping/VATGST'
import MTD from '../components/bookkeeping/MTD'
import CIS from '../components/bookkeeping/CIS'
import FixedAssets from '../components/bookkeeping/FixedAssets'
import PayrollImports from '../components/bookkeeping/PayrollImports'
import ApprovalsPayments from '../components/bookkeeping/ApprovalsPayments'
import Reports from '../components/bookkeeping/Reports'
import PeriodClose from '../components/bookkeeping/PeriodClose'
import DocumentHub from '../components/bookkeeping/DocumentHub'
import Integrations from '../components/bookkeeping/Integrations'
import BookkeepingSettings from '../components/bookkeeping/Settings'
import ProjectManagement from '../components/bookkeeping/ProjectManagement'
import PropertyAccounts from '../components/bookkeeping/PropertyAccounts'
import EcommerceIntegration from '../components/bookkeeping/EcommerceIntegration'
import InvoiceTracking from '../components/bookkeeping/InvoiceTracking'

const BookkeepingDashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inbox-ocr', label: 'Inbox & OCR', icon: Inbox },
    { id: 'banking', label: 'Banking', icon: Banknote },
    { id: 'sales', label: 'Sales (AR)', icon: ShoppingCart },
    { id: 'purchases', label: 'Purchases (AP)', icon: Receipt },
    { id: 'expenses', label: 'Expenses (Employees)', icon: Users },
    { id: 'projects-dimensions', label: 'Projects/Dimensions', icon: FolderOpen },
    { id: 'journals', label: 'Journals', icon: BookOpen },
    { id: 'vat-gst', label: 'VAT/GST', icon: Calculator },
    { id: 'mtd', label: 'MTD', icon: Archive },
    { id: 'cis', label: 'CIS', icon: HardHat },
    { id: 'fixed-assets', label: 'Fixed Assets', icon: Building },
    { id: 'payroll-imports', label: 'Payroll Imports', icon: Upload },
    { id: 'approvals-payments', label: 'Approvals & Payments', icon: CheckCircle },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'period-close', label: 'Period Close', icon: Lock },
    { id: 'document-hub', label: 'Document Hub', icon: FileText },
    { id: 'integrations', label: 'Integrations', icon: Archive },
    { id: 'project-management', label: 'Project Management', icon: FolderOpen },
    { id: 'property-accounts', label: 'Property Accounts', icon: Building },
    { id: 'ecommerce-integration', label: 'Ecommerce Integration', icon: Globe },
    { id: 'invoice-tracking', label: 'Invoice Tracking', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const currentPath = location.pathname.split('/').pop() || 'dashboard'

  const handleNavigation = (itemId: string) => {
    navigate(`/bookkeeping/${itemId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Acme Corp Ltd</option>
              <option>Tech Solutions Inc</option>
              <option>Global Enterprises</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Jan 2024</option>
              <option>Dec 2023</option>
              <option>Nov 2023</option>
            </select>
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                className="border border-gray-300 rounded-lg px-3 py-2 pl-8 text-sm w-64"
              />
              <div className="absolute left-2 top-2.5 w-4 h-4 text-gray-400">🔍</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Quick Add +
            </button>
            <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50">
              Sync/Feeds
            </button>
            <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50">
              Alerts/Tasks (3)
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900 mb-6">Bookkeeping</h1>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPath === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inbox-ocr" element={<InboxOCR />} />
            <Route path="/banking" element={<Banking />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/projects-dimensions" element={<ProjectsDimensions />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/vat-gst" element={<VATGST />} />
            <Route path="/mtd" element={<MTD />} />
            <Route path="/cis" element={<CIS />} />
            <Route path="/fixed-assets" element={<FixedAssets />} />
            <Route path="/payroll-imports" element={<PayrollImports />} />
            <Route path="/approvals-payments" element={<ApprovalsPayments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/period-close" element={<PeriodClose />} />
            <Route path="/document-hub" element={<DocumentHub />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/project-management" element={<ProjectManagement />} />
            <Route path="/property-accounts" element={<PropertyAccounts />} />
            <Route path="/ecommerce-integration" element={<EcommerceIntegration />} />
            <Route path="/invoice-tracking" element={<InvoiceTracking />} />
            <Route path="/settings" element={<BookkeepingSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default BookkeepingDashboard
