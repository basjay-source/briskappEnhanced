import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Settings, 
  FileText, 
  Users, 
  Shield, 
  Clock, 
  BookOpen, 
  DollarSign, 
  Building, 
  Calculator, 
  TrendingUp,
  PieChart,
  FileSignature,
  Heart,
  ArrowRight,
  AlertTriangle,
  TrendingUp as TrendingUpIcon
} from 'lucide-react'

const EcosystemHub: React.FC = () => {
  const navigate = useNavigate()

  const modules = [
    {
      id: 'practice-management',
      title: 'Practice Management',
      description: 'Jobs, workflows, compliance deadlines',
      icon: Users,
      color: 'bg-purple-500',
      path: '/practice-management',
      status: 'active'
    },
    {
      id: 'accounts-production',
      title: 'Accounts Production',
      description: 'FRS 102/105, FRS, iXBRL generation',
      icon: PieChart,
      color: 'bg-blue-500',
      path: '/accounts-production',
      status: 'active'
    },
    {
      id: 'business-tax',
      title: 'Corporation Tax',
      description: 'CT600, R&D claims, reliefs',
      icon: Calculator,
      color: 'bg-green-500',
      path: '/business-tax',
      status: 'active'
    },
    {
      id: 'personal-tax',
      title: 'Personal Tax',
      description: 'SA returns, CGT optimization',
      icon: TrendingUp,
      color: 'bg-orange-500',
      path: '/personal-tax',
      status: 'active'
    },
    {
      id: 'payroll',
      title: 'Payroll',
      description: 'RTI, pensions, CIS, P11D',
      icon: DollarSign,
      color: 'bg-pink-500',
      path: '/payroll',
      status: 'active'
    },
    {
      id: 'aml-kyc',
      title: 'AML/KYC',
      description: 'Risk assessment, compliance',
      icon: Shield,
      color: 'bg-red-500',
      path: '/aml-kyc',
      status: 'active'
    },
    {
      id: 'company-secretarial',
      title: 'Company Secretarial',
      description: 'Companies House filings',
      icon: Building,
      color: 'bg-blue-600',
      path: '/company-secretarial',
      status: 'active'
    },
    {
      id: 'bookkeeping',
      title: 'Bookkeeping',
      description: 'Bank feeds, VAT MTD, management accounts',
      icon: BookOpen,
      color: 'bg-teal-500',
      path: '/bookkeeping',
      status: 'active'
    },
    {
      id: 'document-hub',
      title: 'DocuSignage',
      description: 'Digital signing workflows',
      icon: FileSignature,
      color: 'bg-blue-500',
      path: '/document-hub',
      status: 'active'
    }
  ]

  const sidebarModules = [
    { icon: Settings, title: 'Ecosystem Hub', subtitle: 'Overview of all modules', active: true },
    { icon: Users, title: 'Practice Management', subtitle: 'Jobs, workflows, deadlines', active: false },
    { icon: PieChart, title: 'Accounts Production', subtitle: 'FRS 102/105, FRS, iXBRL', active: false },
    { icon: Calculator, title: 'Corporation Tax', subtitle: 'CT600, R&D claims, reliefs', active: false },
    { icon: TrendingUp, title: 'Personal Tax', subtitle: 'SA returns, CGT, optimization', active: false },
    { icon: DollarSign, title: 'Payroll', subtitle: 'RTI, pensions, CIS, P11D', active: false },
    { icon: Shield, title: 'AML/KYC', subtitle: 'Risk assessment, compliance', active: false },
    { icon: Building, title: 'Company Secretarial', subtitle: 'Companies House filings', active: false },
    { icon: BookOpen, title: 'Bookkeeping', subtitle: 'Bank feeds, VAT MTD', active: false },
    { icon: Heart, title: 'Charity & Academy Accounts', subtitle: 'SORP compliance, fund accounting', active: false },
    { icon: FileText, title: 'Document/Hub', subtitle: 'Centralized document workflows', active: false },
    { icon: Clock, title: 'Time Management', subtitle: 'Advanced time tracking & analytics', active: false }
  ]

  const handleModuleClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-blue-600 text-white flex flex-col">
        <div className="p-6 border-b border-blue-500">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold">Ecosystem Hub</h1>
              <p className="text-blue-200 text-sm">Overview of all modules</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {sidebarModules.map((module, index) => {
            const IconComponent = module.icon
            return (
              <div
                key={index}
                className={`p-4 border-b border-blue-500 cursor-pointer hover:bg-blue-500 transition-colors ${
                  module.active ? 'bg-blue-500' : ''
                }`}
                onClick={() => module.title !== 'Ecosystem Hub' && handleModuleClick(`/${module.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`)}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{module.title}</div>
                    <div className="text-blue-200 text-xs">{module.subtitle}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ecosystem Hub</h1>
              <p className="text-gray-600">Welcome to your all-in-one practice management suite</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <span>View Practice Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                    <p className="text-green-600 text-sm">+12% from last week</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Overdue Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-red-600 text-sm">-50% from last week</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">This Week Hours</p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                    <p className="text-green-600 text-sm">+8% from last week</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Revenue MTD</p>
                    <p className="text-2xl font-bold text-gray-900">£45,200</p>
                    <p className="text-green-600 text-sm">+15% from last week</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUpIcon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Modules Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Modules</h2>
              <div className="grid grid-cols-3 gap-6">
                {modules.map((module) => {
                  const IconComponent = module.icon
                  return (
                    <div
                      key={module.id}
                      onClick={() => handleModuleClick(module.path)}
                      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow relative"
                    >
                      <div className="absolute top-4 right-4">
                        <span className="bg-black text-white text-xs px-2 py-1 rounded">active</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{module.title}</h3>
                          <p className="text-gray-600 text-sm">{module.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            {/* Recent Activity */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">VAT return completed</p>
                    <p className="text-xs text-gray-600">ABC Ltd</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payroll run processed</p>
                    <p className="text-xs text-gray-600">XYZ Corp</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Annual accounts filed</p>
                    <p className="text-xs text-gray-600">DEF Ltd</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">R&D claim submitted</p>
                    <p className="text-xs text-gray-600">GHI Tech</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">3 clients at risk of missing SA deadline</p>
                  <p className="text-xs text-blue-700 mt-1">Consider sending reminder emails</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-900">R&D claims available for 2 clients</p>
                  <p className="text-xs text-green-700 mt-1">Potential tax savings: £15,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EcosystemHub
