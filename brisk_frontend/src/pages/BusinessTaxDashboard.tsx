import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

import BTDashboard from '../components/business-tax/Dashboard'
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
import CTComputation from '../components/business-tax/CTComputation'
import QIPs from '../components/business-tax/QIPs'
import PaymentsLiabilities from '../components/business-tax/PaymentsLiabilities'
import CT600Schedules from '../components/business-tax/CT600Schedules'
import AttachmentsiXBRL from '../components/business-tax/AttachmentsiXBRL'
import ReviewChecklists from '../components/business-tax/ReviewChecklists'
import Filing from '../components/business-tax/Filing'
import PostFilingEnquiries from '../components/business-tax/PostFilingEnquiries'
import JournalsPostBack from '../components/business-tax/JournalsPostBack'
import BTDocumentHub from '../components/business-tax/DocumentHub'
import BTIntegrations from '../components/business-tax/Integrations'
import BTSettings from '../components/business-tax/BTSettings'
import BTReports from '../components/business-tax/Reports'

interface MenuItem {
  id: string
  label: string
  icon: string
  hasSubTabs?: boolean
  subTabs?: string[]
}

const BusinessTaxDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', hasSubTabs: true, subTabs: ['Overview', 'Tasks', 'Exceptions', 'Compliance Timeline'] },
    { id: 'engagement-setup', label: 'Engagement Setup', icon: '⚙️', hasSubTabs: true, subTabs: ['Company Profile', 'APs & CT Rate Year', 'Agent Auth', 'Materiality'] },
    { id: 'prelims-imports', label: 'Prelims: Imports & Accounts', icon: '📥', hasSubTabs: true, subTabs: ['Trial Balance', 'Final Accounts (iXBRL)', 'B/F Attributes'] },
    { id: 'trade-profit', label: 'Trade Profit (Adjusted profit)', icon: '💰', hasSubTabs: true, subTabs: ['Starting Profit', 'Tax Adjustments', 'Non-trading Items'] },
    { id: 'capital-allowances', label: 'Capital Allowances', icon: '🏭', hasSubTabs: true, subTabs: ['Pools (Main/SR/SCBA/SBA)', 'AIA/FYA', 'Cars', 'Disposal/BA/WDAs'] },
    { id: 'disallowables-addbacks', label: 'Disallowables & Add-backs', icon: '❌', hasSubTabs: true, subTabs: ['Policy Rules', 'Review Queue', 'Permanent vs Temporary'] },
    { id: 'losses', label: 'Losses (b/f, in-year, c/f, carry-back)', icon: '📉', hasSubTabs: true, subTabs: ['Brought-forward', 'In-year', 'Carry-back/Forward', 'Streaming'] },
    { id: 'chargeable-gains', label: 'Chargeable Gains (Corp tax on gains)', icon: '📈', hasSubTabs: true, subTabs: ['Disposals', 'Indexation (legacy)', 'Rollover/Sch 7AC', 'Substantial Shareholding'] },
    { id: 'group-consortia', label: 'Group & Consortia (Group relief)', icon: '🏢', hasSubTabs: true, subTabs: ['Group Members', 'Surrenders', 'Claims & Allocations'] },
    { id: 'rd-creative-reliefs', label: 'R&D / Creative Reliefs / Patent Box', icon: '🔬', hasSubTabs: true, subTabs: ['Projects', 'Qualifying Costs', 'SME/RDEC', 'Creative (if relevant)', 'Patent Box Computation'] },
    { id: 'interest-restriction', label: 'Interest Restriction (CIR)', icon: '🔒', hasSubTabs: true, subTabs: ['Groups/Period', 'Tax-EBITDA', 'Net Interest', 'Disallowance/Spare Capacity'] },
    { id: 'transfer-pricing', label: 'Transfer Pricing & Related Parties', icon: '🔄', hasSubTabs: true, subTabs: ['Intra-group Charges', 'Methods', 'CbCR/Local File (status)', 'Directors\' Loans (s455 checks)'] },
    { id: 'ct-computation', label: 'CT Computation & Rates', icon: '🧮', hasSubTabs: true, subTabs: ['Summary', 'Detailed Computation', 'Marginal Relief', 'Allocation (straddling periods)'] },
    { id: 'quarterly-instalments', label: 'Quarterly Instalment Payments (QIPs)', icon: '📅', hasSubTabs: true, subTabs: ['Threshold Test', 'Schedule', 'Interest'] },
    { id: 'payments-liabilities', label: 'Payments & Liabilities', icon: '💳', hasSubTabs: true, subTabs: ['Liability Summary', 'Payments', 'Interest/Penalties', 'Time to Pay'] },
    { id: 'ct600-schedules', label: 'CT600 & Schedules', icon: '📋', hasSubTabs: true, subTabs: ['Header', 'Trading/Non-trading', 'Losses', 'Capital Allowances', 'Gains', 'Group Relief', 'R&D/Patent Box', 'CIR', 's455', 'Attachments Index'] },
    { id: 'attachments-ixbrl', label: 'Attachments & iXBRL', icon: '📎', hasSubTabs: true, subTabs: ['Accounts (iXBRL)', 'Computation (iXBRL/PDF)', 'Supporting Docs'] },
    { id: 'review-checklists', label: 'Review & Checklists', icon: '✅', hasSubTabs: true, subTabs: ['Exceptions', 'Disclosure/Tax Checklists', 'Representation Letter'] },
    { id: 'filing', label: 'Filing', icon: '📤', hasSubTabs: true, subTabs: ['HMRC Connection', 'Validate', 'e-File', 'Acknowledgements'] },
    { id: 'post-filing-enquiries', label: 'Post-Filing & Enquiries', icon: '📨', hasSubTabs: true, subTabs: ['Statement of Account', 'Amendments', 'Enquiry Management'] },
    { id: 'journals-postback', label: 'Journals & Post-Back', icon: '📝', hasSubTabs: true, subTabs: ['Mapping', 'Preview & Post', 'Deferred Tax (optional)'] },
    { id: 'document-hub', label: 'Document Hub', icon: '📁', hasSubTabs: true, subTabs: ['Working Papers', 'Letters & Elections', 'Filing Evidence'] },
    { id: 'integrations', label: 'Integrations', icon: '🔗', hasSubTabs: true, subTabs: ['Bookkeeping', 'Accounts Production', 'HMRC CT', 'CoSec', 'Payroll', 'Banking'] },
    { id: 'settings', label: 'Settings', icon: '⚙️', hasSubTabs: true, subTabs: ['CT Rates & Thresholds', 'Roles/Permissions', 'Templates', 'Mapping Libraries'] },
    { id: 'reports', label: 'Reports', icon: '📊', hasSubTabs: true, subTabs: ['Computation Pack', 'Losses Register', 'Capital Allowances Movements', 'Group Relief Summary', 'CIR Report', 'Payments Forecast'] }
  ]

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return <BTDashboard />
      case 'engagement-setup': return <EngagementSetup />
      case 'prelims-imports': return <PrelimsImports />
      case 'trade-profit': return <TradeProfit />
      case 'capital-allowances': return <CapitalAllowances />
      case 'disallowables-addbacks': return <DisallowablesAddbacks />
      case 'losses': return <Losses />
      case 'chargeable-gains': return <ChargeableGains />
      case 'group-consortia': return <GroupConsortia />
      case 'rd-creative-reliefs': return <RDCreativeReliefs />
      case 'interest-restriction': return <InterestRestriction />
      case 'transfer-pricing': return <TransferPricing />
      case 'ct-computation': return <CTComputation />
      case 'quarterly-instalments': return <QIPs />
      case 'payments-liabilities': return <PaymentsLiabilities />
      case 'ct600-schedules': return <CT600Schedules />
      case 'attachments-ixbrl': return <AttachmentsiXBRL />
      case 'review-checklists': return <ReviewChecklists />
      case 'filing': return <Filing />
      case 'post-filing-enquiries': return <PostFilingEnquiries />
      case 'journals-postback': return <JournalsPostBack />
      case 'document-hub': return <BTDocumentHub />
      case 'integrations': return <BTIntegrations />
      case 'settings': return <BTSettings />
      case 'reports': return <BTReports />
      default: return <BTDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-gradient-to-b from-blue-900 to-blue-800 text-white overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Business Tax</h1>
          <p className="text-blue-200 text-sm">Corporation Tax Module</p>
        </div>
        
        <nav className="px-4 pb-6">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-2">
              <button
                onClick={() => {
                  setActiveMenu(item.id)
                  if (item.hasSubTabs) {
                    toggleMenu(item.id)
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 transform hover:scale-105 ${
                  activeMenu === item.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'bg-gradient-to-r from-blue-700 to-blue-600 text-blue-100 hover:from-blue-600 hover:to-blue-500'
                } mb-1`}
                style={{
                  background: activeMenu === item.id 
                    ? 'linear-gradient(135deg, #FF7A00 0%, #FF6B00 100%)'
                    : 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
                  boxShadow: activeMenu === item.id 
                    ? '0 4px 15px rgba(255, 122, 0, 0.3)'
                    : '0 2px 10px rgba(30, 64, 175, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  fontWeight: '600',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.hasSubTabs && (
                  expandedMenus.includes(item.id) ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {item.hasSubTabs && expandedMenus.includes(item.id) && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.subTabs?.map((subTab, index) => (
                    <div key={index} className="px-3 py-2 text-xs text-blue-200 bg-blue-800/50 rounded">
                      {subTab}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Acme Corp Ltd</option>
                <option>Beta Ltd</option>
                <option>Gamma plc</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>31/12/2023</option>
                <option>31/03/2024</option>
                <option>30/06/2024</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>In Progress</option>
                <option>For Review</option>
                <option>Ready to File</option>
                <option>Filed</option>
                <option>Amended</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Current</option>
                <option>Scenario</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">HMRC Connected</span>
              </div>
              <div className="text-sm text-gray-600">CT Rate Year: 2023/24</div>
              <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                3 Alerts
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default BusinessTaxDashboard
