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
  Settings
} from 'lucide-react'
import { SearchFilterHeader } from '@/components/SearchFilterHeader'

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('financial')
  const [searchValue, setSearchValue] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const tabs = [
    { id: 'financial', label: 'Financial Reports', icon: FileText },
    { id: 'management', label: 'Management Accounts', icon: TrendingUp },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'compliance', label: 'Compliance', icon: Building2 },
    { id: 'custom', label: 'Custom Reports', icon: Settings }
  ]

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'financial':
        return renderReportGrid(financialReports)
      case 'management':
        return renderReportGrid(managementReports)
      case 'analysis':
        return renderReportGrid(analysisReports)
      case 'compliance':
        return renderReportGrid(complianceReports)
      case 'custom':
        return renderCustomReports()
      default:
        return renderReportGrid(financialReports)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">Generate comprehensive financial and management reports</p>
        </div>

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

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b">
            <div className="grid grid-cols-5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
