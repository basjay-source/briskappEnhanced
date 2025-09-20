import React, { useState, Suspense } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary'
import Dashboard from '../components/company-secretarial/Dashboard'
import CompanyProfile from '../components/company-secretarial/CompanyProfile'
import OfficersPSC from '../components/company-secretarial/OfficersPSC'
import ShareCapitalEvents from '../components/company-secretarial/ShareCapitalEvents'
import Dividends from '../components/company-secretarial/Dividends'
import MeetingsResolutions from '../components/company-secretarial/MeetingsResolutions'
import Registers from '../components/company-secretarial/Registers'
import ChargesMortgages from '../components/company-secretarial/ChargesMortgages'
import IncorporationsChanges from '../components/company-secretarial/IncorporationsChanges'
import OptionsESOPs from '../components/company-secretarial/OptionsESOPs'
import FilingsForms from '../components/company-secretarial/FilingsForms'
import ReportsCertificates from '../components/company-secretarial/ReportsCertificates'
import ApprovalsWorkflows from '../components/company-secretarial/ApprovalsWorkflows'
import DocumentHub from '../components/company-secretarial/DocumentHub'
import Integrations from '../components/company-secretarial/Integrations'
import Settings from '../components/company-secretarial/Settings'

const CompanySecretarialDashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedEntity] = useState('Acme Corp Ltd')
  const [selectedJurisdiction] = useState('UK')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/company-secretarial/dashboard', icon: '📊' },
    { id: 'company-profile', label: 'Company Profile', path: '/company-secretarial/company-profile', icon: '🏢' },
    { id: 'officers-psc', label: 'Officers & PSC', path: '/company-secretarial/officers-psc', icon: '👥' },
    { id: 'share-capital-events', label: 'Share Capital & Events', path: '/company-secretarial/share-capital-events', icon: '📈' },
    { id: 'dividends', label: 'Dividends', path: '/company-secretarial/dividends', icon: '💰' },
    { id: 'meetings-resolutions', label: 'Meetings & Resolutions', path: '/company-secretarial/meetings-resolutions', icon: '📋' },
    { id: 'registers', label: 'Registers (Statutory)', path: '/company-secretarial/registers', icon: '📚' },
    { id: 'charges-mortgages', label: 'Charges & Mortgages', path: '/company-secretarial/charges-mortgages', icon: '🏦' },
    { id: 'incorporations-changes', label: 'Incorporations & Name/Status Changes', path: '/company-secretarial/incorporations-changes', icon: '🏗️' },
    { id: 'options-esops', label: 'Options & ESOP (EMI/CSOP)', path: '/company-secretarial/options-esops', icon: '📊' },
    { id: 'filings-forms', label: 'Filings & Forms', path: '/company-secretarial/filings-forms', icon: '📄' },
    { id: 'reports-certificates', label: 'Reports & Certificates', path: '/company-secretarial/reports-certificates', icon: '📜' },
    { id: 'approvals-workflows', label: 'Approvals & Workflows', path: '/company-secretarial/approvals-workflows', icon: '✅' },
    { id: 'document-hub', label: 'Document Hub', path: '/company-secretarial/document-hub', icon: '📁' },
    { id: 'integrations', label: 'Integrations', path: '/company-secretarial/integrations', icon: '🔗' },
    { id: 'settings', label: 'Settings', path: '/company-secretarial/settings', icon: '⚙️' }
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/company-secretarial/dashboard' && location.pathname === '/company-secretarial')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Company Secretarial</h1>
          <div className="mt-2 space-y-1">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{selectedEntity}</span>
            </div>
            <div className="text-sm text-gray-500">
              {selectedJurisdiction} • Company No: 12345678
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 space-y-1 overflow-y-auto h-full">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
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
                <option>UK</option>
                <option>Ireland</option>
                <option>Jersey</option>
              </select>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Good Standing</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Next Filing:</span> CS01 due 15 Feb 2024
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">PSC Complete</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Companies House
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                HMRC ERS
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
                <Route path="/" element={<Navigate to="/company-secretarial/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/company-profile" element={<CompanyProfile />} />
                <Route path="/officers-psc" element={<OfficersPSC />} />
                <Route path="/share-capital-events" element={<ShareCapitalEvents />} />
                <Route path="/dividends" element={<Dividends />} />
                <Route path="/meetings-resolutions" element={<MeetingsResolutions />} />
                <Route path="/registers" element={<Registers />} />
                <Route path="/charges-mortgages" element={<ChargesMortgages />} />
                <Route path="/incorporations-changes" element={<IncorporationsChanges />} />
                <Route path="/options-esops" element={<OptionsESOPs />} />
                <Route path="/filings-forms" element={<FilingsForms />} />
                <Route path="/reports-certificates" element={<ReportsCertificates />} />
                <Route path="/approvals-workflows" element={<ApprovalsWorkflows />} />
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

export default CompanySecretarialDashboard
