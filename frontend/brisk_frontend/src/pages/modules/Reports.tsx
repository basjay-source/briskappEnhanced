import React, { useState } from 'react'
import { 
  FileText, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Download, 
  Building2,
  Calculator,
  Eye,
  Settings,
  ChevronDown,
  Activity
} from 'lucide-react'
import { SearchFilterHeader } from '@/components/SearchFilterHeader'
import ResponsiveLayout from '@/components/ResponsiveLayout'

const Reports: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState('financial')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['financial'])
  const [searchValue, setSearchValue] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  type SubTabConfig = {
    label: string
    icon: React.ComponentType<{ className?: string }>
  }

  type MenuConfig = {
    label: string
    icon: React.ComponentType<{ className?: string }>
    hasSubTabs: boolean
    subTabs?: Record<string, SubTabConfig>
  }

  const menuStructure: Record<string, MenuConfig> = {
    dashboard: { label: 'Dashboard', icon: Activity, hasSubTabs: false },
    financial: { 
      label: 'Financial Reports', 
      icon: FileText, 
      hasSubTabs: true,
      subTabs: {
        statements: { label: 'Financial Statements', icon: FileText },
        trial: { label: 'Trial Balance', icon: Calculator },
        cashflow: { label: 'Cash Flow', icon: TrendingUp },
        comparative: { label: 'Comparative Reports', icon: BarChart3 }
      }
    },
    management: { 
      label: 'Management Accounts', 
      icon: TrendingUp, 
      hasSubTabs: true,
      subTabs: {
        monthly: { label: 'Monthly Pack', icon: FileText },
        budget: { label: 'Budget vs Actual', icon: BarChart3 },
        forecast: { label: 'Cash Flow Forecast', icon: TrendingUp },
        departmental: { label: 'Departmental Analysis', icon: PieChart }
      }
    },
    analysis: { 
      label: 'Analysis', 
      icon: BarChart3, 
      hasSubTabs: true,
      subTabs: {
        ratio: { label: 'Ratio Analysis', icon: BarChart3 },
        trend: { label: 'Trend Analysis', icon: TrendingUp },
        benchmark: { label: 'Benchmarking', icon: PieChart },
        variance: { label: 'Variance Analysis', icon: Calculator }
      }
    },
    compliance: { 
      label: 'Compliance', 
      icon: Building2, 
      hasSubTabs: true,
      subTabs: {
        vat: { label: 'VAT Reports', icon: FileText },
        corporation: { label: 'Corporation Tax', icon: Calculator },
        statutory: { label: 'Statutory Accounts', icon: Building2 },
        audit: { label: 'Audit Trail', icon: Eye }
      }
    },
    custom: { label: 'Custom Reports', icon: Settings, hasSubTabs: false }
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleMainTabClick = (tabKey: string) => {
    setActiveMainTab(tabKey)
    const tabConfig = menuStructure[tabKey]
    if (tabConfig && tabConfig.hasSubTabs && tabConfig.subTabs) {
      const firstSubTab = Object.keys(tabConfig.subTabs)[0]
      setActiveSubTab(firstSubTab || '')
      if (!expandedCategories.includes(tabKey)) {
        toggleCategory(tabKey)
      }
    } else {
      setActiveSubTab('')
    }
  }

  const handleSubTabClick = (subTab: string, mainTab: string) => {
    setActiveSubTab(subTab)
    setActiveMainTab(mainTab)
  }

  function renderHorizontalSubmenus() {
    const currentTabConfig = menuStructure[activeMainTab]
    if (!currentTabConfig || !currentTabConfig.hasSubTabs || !currentTabConfig.subTabs) {
      return null
    }
    
    return (
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(currentTabConfig.subTabs).map(([subKey, subConfig]) => {
            const SubIcon = subConfig.icon
            const isSubActive = activeSubTab === subKey && activeMainTab === activeMainTab
            
            return (
              <button
                key={subKey}
                onClick={() => handleSubTabClick(subKey, activeMainTab)}
                className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                  isSubActive 
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md font-semibold' 
                    : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
                }`}
              >
                <SubIcon className="h-4 w-4 mr-2" />
                <span>{subConfig.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const financialReports = [
    {
      name: 'Profit & Loss Statement',
      description: 'Comprehensive P&L with period comparisons',
      icon: TrendingUp,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Balance Sheet',
      description: 'Statement of financial position',
      icon: Calculator,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Cash Flow Statement',
      description: 'Operating, investing, and financing activities',
      icon: BarChart3,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Trial Balance',
      description: 'Detailed account balances',
      icon: FileText,
      status: 'ready',
      lastGenerated: '2024-01-15'
    }
  ]

  const managementReports = [
    {
      name: 'Monthly Management Pack',
      description: 'KPIs, variance analysis, and commentary',
      icon: TrendingUp,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Budget vs Actual',
      description: 'Performance against budget with variances',
      icon: BarChart3,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Cash Flow Forecast',
      description: '13-week rolling cash flow projection',
      icon: Calculator,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Departmental Analysis',
      description: 'Cost center performance analysis',
      icon: PieChart,
      status: 'ready',
      lastGenerated: '2024-01-15'
    }
  ]

  const analysisReports = [
    {
      name: 'Ratio Analysis',
      description: 'Liquidity, profitability, and efficiency ratios',
      icon: BarChart3,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Trend Analysis',
      description: 'Multi-period trend identification',
      icon: TrendingUp,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Benchmarking Report',
      description: 'Industry comparison and benchmarks',
      icon: PieChart,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Variance Analysis',
      description: 'Detailed variance explanations',
      icon: Calculator,
      status: 'ready',
      lastGenerated: '2024-01-15'
    }
  ]

  const complianceReports = [
    {
      name: 'VAT Return Summary',
      description: 'VAT obligations and submissions',
      icon: FileText,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Corporation Tax Computation',
      description: 'CT600 supporting schedules',
      icon: Calculator,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Statutory Accounts Pack',
      description: 'Companies House filing package',
      icon: Building2,
      status: 'ready',
      lastGenerated: '2024-01-15'
    },
    {
      name: 'Audit Trail Report',
      description: 'Complete transaction audit trail',
      icon: Eye,
      status: 'ready',
      lastGenerated: '2024-01-15'
    }
  ]

  const renderReportGrid = (reports: typeof financialReports) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report, index) => (
        <div key={index} className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <report.icon className="h-8 w-8 text-blue-600" />
              <span 
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  report.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {report.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <div className="space-y-4">
              <div className="text-sm text-gray-500">
                Last generated: {report.lastGenerated}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Generate
                </button>
                <button className="border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderCustomReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Builder</h3>
          <p className="text-sm text-gray-600 mb-4">Create custom reports with your preferred data and formatting</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Report Type</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">Select report type</option>
                <option value="financial">Financial Statement</option>
                <option value="management">Management Report</option>
                <option value="analysis">Analysis Report</option>
                <option value="custom">Custom Layout</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Data Source</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">Select data source</option>
                <option value="trial-balance">Trial Balance</option>
                <option value="transactions">Transaction Data</option>
                <option value="budgets">Budget Data</option>
                <option value="all">All Sources</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Build Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Templates</h3>
            <div className="space-y-2">
              <div className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
                Monthly Board Pack
              </div>
              <div className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
                Quarterly Review
              </div>
              <div className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
                Year-end Package
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
            <div className="space-y-2">
              <div className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Q4 Analysis</div>
                <div className="text-sm text-gray-500">Generated 2 days ago</div>
              </div>
              <div className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Budget Review</div>
                <div className="text-sm text-gray-500">Generated 1 week ago</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Reports</h3>
            <div className="space-y-2">
              <div className="p-2 border rounded">
                <div className="font-medium">Monthly P&L</div>
                <div className="text-sm text-gray-500">Next: 1st of month</div>
              </div>
              <div className="p-2 border rounded">
                <div className="font-medium">Weekly Cash Flow</div>
                <div className="text-sm text-gray-500">Next: Monday</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  function renderMainContent() {
    if (activeMainTab === 'dashboard') {
      return renderDashboard()
    } else if (activeMainTab === 'financial') {
      return renderReportGrid(financialReports)
    } else if (activeMainTab === 'management') {
      return renderReportGrid(managementReports)
    } else if (activeMainTab === 'analysis') {
      return renderReportGrid(analysisReports)
    } else if (activeMainTab === 'compliance') {
      return renderReportGrid(complianceReports)
    } else if (activeMainTab === 'custom') {
      return renderCustomReports()
    }
    return renderReportGrid(financialReports)
  }

  function renderDashboard() {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports Dashboard</h2>
          <p className="text-gray-600">Generate comprehensive financial and management reports</p>
        </div>
        {renderReportGrid(financialReports)}
      </div>
    )
  }

  return (
    <ResponsiveLayout>
      <div className="flex min-h-screen bg-blue-50">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Reports</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="p-2">
              {Object.entries(menuStructure).map(([key, config]) => {
                const Icon = config.icon
                const isExpanded = expandedCategories.includes(key)
                const isActive = activeMainTab === key
                
                return (
                  <div key={key} className="mb-1">
                    <button
                      onClick={() => handleMainTabClick(key)}
                      className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold' 
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-3" />
                        <span>{config.label}</span>
                      </div>
                      {config.hasSubTabs && (
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`} />
                      )}
                    </button>
                    
                  </div>
                )
              })}
            </nav>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderHorizontalSubmenus()}
            <SearchFilterHeader
              searchPlaceholder="Search reports..."
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filters={[
                {
                  label: 'Period',
                  options: [
                    { label: 'All Periods', value: '' },
                    { label: 'Current Month', value: 'current-month' },
                    { label: 'Current Quarter', value: 'current-quarter' },
                    { label: 'Current Year', value: 'current-year' },
                    { label: 'Previous Year', value: 'previous-year' }
                  ],
                  value: selectedPeriod,
                  onChange: setSelectedPeriod
                },
                {
                  label: 'Client',
                  options: [
                    { label: 'All Clients', value: '' },
                    { label: 'ABC Corporation', value: 'abc-corp' },
                    { label: 'XYZ Ltd', value: 'xyz-ltd' },
                    { label: 'Tech Solutions Inc', value: 'tech-solutions' }
                  ],
                  value: selectedClient,
                  onChange: setSelectedClient
                }
              ]}
              dateRange={{
                from: dateFrom,
                to: dateTo,
                onFromChange: setDateFrom,
                onToChange: setDateTo
              }}
            />
            
            {renderMainContent()}
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  )
}

export default Reports
