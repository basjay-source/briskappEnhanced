import React from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { 
  Shield, 
  Users, 
  Building, 
  Search, 
  AlertTriangle, 
  FileText, 
  Eye, 
  Settings,
  BarChart3,
  Database,
  Link,
  Activity
} from 'lucide-react'

import AMLDashboard from '../components/aml-kyc/AMLDashboard'
import CasesClients from '../components/aml-kyc/CasesClients'
import IndividualsKYC from '../components/aml-kyc/IndividualsKYC'
import EntitiesKYB from '../components/aml-kyc/EntitiesKYB'
import OwnershipUBO from '../components/aml-kyc/OwnershipUBO'
import ScreeningSanctions from '../components/aml-kyc/ScreeningSanctions'
import IdentityLiveness from '../components/aml-kyc/IdentityLiveness'
import AddressSOF from '../components/aml-kyc/AddressSOF'
import RiskAssessment from '../components/aml-kyc/RiskAssessment'
import EnhancedDueDiligence from '../components/aml-kyc/EnhancedDueDiligence'
import OngoingMonitoring from '../components/aml-kyc/OngoingMonitoring'
import TransactionSignals from '../components/aml-kyc/TransactionSignals'
import DecisionsHolds from '../components/aml-kyc/DecisionsHolds'
import SARReports from '../components/aml-kyc/SARReports'
import PoliciesTraining from '../components/aml-kyc/PoliciesTraining'
import AMLReports from '../components/aml-kyc/AMLReports'
import AMLDocumentHub from '../components/aml-kyc/AMLDocumentHub'
import AMLIntegrations from '../components/aml-kyc/AMLIntegrations'
import AMLSettings from '../components/aml-kyc/AMLSettings'

const AMLKYCDashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, component: AMLDashboard },
    { id: 'cases-clients', label: 'Cases & Clients', icon: Users, component: CasesClients },
    { id: 'individuals-kyc', label: 'Individuals (KYC)', icon: Users, component: IndividualsKYC },
    { id: 'entities-kyb', label: 'Entities (KYB)', icon: Building, component: EntitiesKYB },
    { id: 'ownership-ubo', label: 'Ownership & UBO Graph', icon: Activity, component: OwnershipUBO },
    { id: 'screening-sanctions', label: 'Screening (Sanctions/PEP/Adverse Media)', icon: Search, component: ScreeningSanctions },
    { id: 'identity-liveness', label: 'Identity & Liveness', icon: Shield, component: IdentityLiveness },
    { id: 'address-sof', label: 'Address, SOF/SOW', icon: FileText, component: AddressSOF },
    { id: 'risk-assessment', label: 'Risk Assessment & Scoring', icon: AlertTriangle, component: RiskAssessment },
    { id: 'enhanced-dd', label: 'Enhanced Due Diligence (EDD)', icon: Eye, component: EnhancedDueDiligence },
    { id: 'ongoing-monitoring', label: 'Ongoing Monitoring & Triggers', icon: Activity, component: OngoingMonitoring },
    { id: 'transaction-signals', label: 'Transaction Risk Signals', icon: AlertTriangle, component: TransactionSignals },
    { id: 'decisions-holds', label: 'Decisions, Holds & Escalations', icon: Shield, component: DecisionsHolds },
    { id: 'sar-reports', label: 'SAR/STR & Internal Reports', icon: FileText, component: SARReports },
    { id: 'policies-training', label: 'Policies, Registers & Training', icon: FileText, component: PoliciesTraining },
    { id: 'reports', label: 'Reports & MI', icon: BarChart3, component: AMLReports },
    { id: 'document-hub', label: 'Document Hub', icon: Database, component: AMLDocumentHub },
    { id: 'integrations', label: 'Integrations', icon: Link, component: AMLIntegrations },
    { id: 'settings', label: 'Settings', icon: Settings, component: AMLSettings }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-80 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AML & KYC</h1>
              <p className="text-sm text-gray-500">International Compliance</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700 font-medium">Jurisdiction:</span>
              <span className="text-blue-900">UK MLR</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-blue-700 font-medium">Risk Status:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Low</span>
            </div>
          </div>
        </div>

        <nav className="px-4 pb-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => navigate(`/aml-kyc${item.id === 'dashboard' ? '' : `/${item.id}`}`)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  (item.id === 'dashboard' && location.pathname === '/aml-kyc') || 
                  (item.id !== 'dashboard' && location.pathname === `/aml-kyc/${item.id}`)
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<AMLDashboard />} />
          <Route path="/cases-clients" element={<CasesClients />} />
          <Route path="/individuals-kyc" element={<IndividualsKYC />} />
          <Route path="/entities-kyb" element={<EntitiesKYB />} />
          <Route path="/ownership-ubo" element={<OwnershipUBO />} />
          <Route path="/screening-sanctions" element={<ScreeningSanctions />} />
          <Route path="/identity-liveness" element={<IdentityLiveness />} />
          <Route path="/address-sof" element={<AddressSOF />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/enhanced-dd" element={<EnhancedDueDiligence />} />
          <Route path="/ongoing-monitoring" element={<OngoingMonitoring />} />
          <Route path="/transaction-signals" element={<TransactionSignals />} />
          <Route path="/decisions-holds" element={<DecisionsHolds />} />
          <Route path="/sar-reports" element={<SARReports />} />
          <Route path="/policies-training" element={<PoliciesTraining />} />
          <Route path="/reports" element={<AMLReports />} />
          <Route path="/document-hub" element={<AMLDocumentHub />} />
          <Route path="/integrations" element={<AMLIntegrations />} />
          <Route path="/settings" element={<AMLSettings />} />
        </Routes>
      </div>
    </div>
  )
}

export default AMLKYCDashboard
