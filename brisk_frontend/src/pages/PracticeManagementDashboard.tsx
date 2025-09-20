import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { 
  LayoutDashboard, Users, FileText, Package, UserCheck, Briefcase,
  CheckSquare, Calendar, Clock, CreditCard, DollarSign, AlertTriangle,
  Award, Shield, BookOpen, Zap, Plug, BarChart3, Settings as SettingsIcon,
  LogOut, ChevronDown, Plus, Search, Filter, Mail
} from 'lucide-react'

import PMDashboard from '../components/practice-management/PMDashboard'
import CRMClients from '../components/practice-management/CRMClients'
import ProposalsEngagements from '../components/practice-management/ProposalsEngagements'
import ScopingPricing from '../components/practice-management/ScopingPricing'
import OnboardingKYC from '../components/practice-management/OnboardingKYC'
import JobsWorkflows from '../components/practice-management/JobsWorkflows'
import TaskingChecklists from '../components/practice-management/TaskingChecklists'
import SchedulingCapacity from '../components/practice-management/SchedulingCapacity'
import TimeWIP from '../components/practice-management/TimeWIP'
import BillingInvoicing from '../components/practice-management/BillingInvoicing'
import CollectionsPayments from '../components/practice-management/CollectionsPayments'
import DeadlinesCompliance from '../components/practice-management/DeadlinesCompliance'
import SLAsQoS from '../components/practice-management/SLAsQoS'
import QualityReviewQA from '../components/practice-management/QualityReviewQA'
import RisksHoldsControls from '../components/practice-management/RisksHoldsControls'
import PeopleTeamsSkills from '../components/practice-management/PeopleTeamsSkills'
import LeaveHolidaysResourcing from '../components/practice-management/LeaveHolidaysResourcing'
import KnowledgebaseTemplates from '../components/practice-management/KnowledgebaseTemplates'
import AutomationsRules from '../components/practice-management/AutomationsRules'
import PMIntegrations from '../components/practice-management/PMIntegrations'
import PMDocumentHub from '../components/practice-management/PMDocumentHub'
import AnalyticsBI from '../components/practice-management/AnalyticsBI'
import PMSettings from '../components/practice-management/PMSettings'
import EmailStudio from '../components/practice-management/EmailStudio'

const PracticeManagementDashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const [selectedFirm] = useState('Brisk Accountants Ltd')
  const [selectedTeam] = useState('All Teams')
  const [selectedPeriod] = useState('Q4 2024')
  const [selectedPortfolio] = useState('All Clients')

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/practice-management/' },
    { id: 'crm', label: 'CRM & Clients', icon: Users, path: '/practice-management/crm' },
    { id: 'proposals', label: 'Proposals & Engagements', icon: FileText, path: '/practice-management/proposals' },
    { id: 'scoping', label: 'Scoping & Pricing', icon: Package, path: '/practice-management/scoping' },
    { id: 'onboarding', label: 'Onboarding & KYC Gate', icon: UserCheck, path: '/practice-management/onboarding' },
    { id: 'jobs', label: 'Jobs & Workflows', icon: Briefcase, path: '/practice-management/jobs' },
    { id: 'tasking', label: 'Tasking & Checklists', icon: CheckSquare, path: '/practice-management/tasking' },
    { id: 'scheduling', label: 'Scheduling & Capacity', icon: Calendar, path: '/practice-management/scheduling' },
    { id: 'time', label: 'Time & WIP', icon: Clock, path: '/practice-management/time' },
    { id: 'billing', label: 'Billing & Invoicing', icon: CreditCard, path: '/practice-management/billing' },
    { id: 'collections', label: 'Collections & Payments', icon: DollarSign, path: '/practice-management/collections' },
    { id: 'deadlines', label: 'Deadlines & Compliance Calendar', icon: AlertTriangle, path: '/practice-management/deadlines' },
    { id: 'slas', label: 'SLAs & QoS', icon: Award, path: '/practice-management/slas' },
    { id: 'quality', label: 'Quality Review & QA', icon: Shield, path: '/practice-management/quality' },
    { id: 'risks', label: 'Risks, Holds & Controls', icon: Shield, path: '/practice-management/risks' },
    { id: 'people', label: 'People, Teams & Skills', icon: Users, path: '/practice-management/people' },
    { id: 'leave', label: 'Leave, Holidays & Resourcing', icon: Calendar, path: '/practice-management/leave' },
    { id: 'knowledge', label: 'Knowledgebase & Templates', icon: BookOpen, path: '/practice-management/knowledge' },
    { id: 'automations', label: 'Automations & Rules', icon: Zap, path: '/practice-management/automations' },
    { id: 'integrations', label: 'Integrations', icon: Plug, path: '/practice-management/integrations' },
    { id: 'document-hub', label: 'Document Hub', icon: FileText, path: '/practice-management/document-hub' },
    { id: 'analytics', label: 'Analytics & BI', icon: BarChart3, path: '/practice-management/analytics' },
    { id: 'email-studio', label: 'Email Studio', icon: Mail, path: '/practice-management/email-studio' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/practice-management/settings' }
  ]

  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PM</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Practice Mgmt</span>
            </div>
            <div className="flex space-x-2">
              <a 
                href="/admin" 
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Admin
              </a>
              <span className="text-xs text-gray-400">•</span>
              <a 
                href="/document-hub" 
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Docs
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 group"
              >
                <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">
                  {user?.full_name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.full_name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-400 hover:text-gray-600"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Firm/Office Switcher */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Firm:</span>
                <Button variant="outline" size="sm" className="text-sm">
                  {selectedFirm}
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Team Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Team:</span>
                <Button variant="outline" size="sm" className="text-sm">
                  {selectedTeam}
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Period View */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Period:</span>
                <Button variant="outline" size="sm" className="text-sm">
                  {selectedPeriod}
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Portfolio */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Portfolio:</span>
                <Badge variant="outline">{selectedPortfolio}</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Global Search
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Capacity Heatmap
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Badge variant="destructive" className="bg-orange-100 text-orange-800 border-orange-200">
                <AlertTriangle className="h-3 w-3 mr-1" />
                5 Overdue
              </Badge>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<PMDashboard />} />
            <Route path="/crm" element={<CRMClients />} />
            <Route path="/proposals" element={<ProposalsEngagements />} />
            <Route path="/scoping" element={<ScopingPricing />} />
            <Route path="/onboarding" element={<OnboardingKYC />} />
            <Route path="/jobs" element={<JobsWorkflows />} />
            <Route path="/tasking" element={<TaskingChecklists />} />
            <Route path="/scheduling" element={<SchedulingCapacity />} />
            <Route path="/time" element={<TimeWIP />} />
            <Route path="/billing" element={<BillingInvoicing />} />
            <Route path="/collections" element={<CollectionsPayments />} />
            <Route path="/deadlines" element={<DeadlinesCompliance />} />
            <Route path="/slas" element={<SLAsQoS />} />
            <Route path="/quality" element={<QualityReviewQA />} />
            <Route path="/risks" element={<RisksHoldsControls />} />
            <Route path="/people" element={<PeopleTeamsSkills />} />
            <Route path="/leave" element={<LeaveHolidaysResourcing />} />
            <Route path="/knowledge" element={<KnowledgebaseTemplates />} />
            <Route path="/automations" element={<AutomationsRules />} />
            <Route path="/integrations" element={<PMIntegrations />} />
            <Route path="/document-hub" element={<PMDocumentHub />} />
            <Route path="/analytics" element={<AnalyticsBI />} />
            <Route path="/email-studio" element={<EmailStudio />} />
            <Route path="/settings" element={<PMSettings />} />
            <Route path="*" element={<PMDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default PracticeManagementDashboard
