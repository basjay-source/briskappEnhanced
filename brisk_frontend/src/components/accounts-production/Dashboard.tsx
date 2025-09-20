import React, { useState, useEffect } from 'react'

interface KPICard {
  id: string
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'stable'
  status: 'good' | 'warning' | 'error'
  drillDownData?: any[]
}

interface Exception {
  id: string
  type: 'error' | 'warning' | 'info'
  title: string
  description: string
  module: string
  action: string
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedKPI, setSelectedKPI] = useState<KPICard | null>(null)

  const kpiCards: KPICard[] = [
    {
      id: 'unmapped-accounts',
      title: 'Unmapped Accounts',
      value: 12,
      change: '-3 from last period',
      trend: 'down',
      status: 'warning',
      drillDownData: [
        { code: '7200', description: 'Miscellaneous Income', amount: '£2,450' },
        { code: '8100', description: 'Professional Fees', amount: '£15,600' },
        { code: '8250', description: 'Marketing Costs', amount: '£8,900' }
      ]
    },
    {
      id: 'tb-status',
      title: 'Trial Balance Status',
      value: 'Final',
      change: 'Locked 2 days ago',
      trend: 'stable',
      status: 'good',
      drillDownData: [
        { period: '31/12/2023', status: 'Final', locked: '15/01/2024' },
        { period: '31/12/2022', status: 'Final', locked: '20/01/2023' }
      ]
    },
    {
      id: 'disclosure-gaps',
      title: 'Disclosure Gaps',
      value: 5,
      change: '+2 new items',
      trend: 'up',
      status: 'error',
      drillDownData: [
        { note: 'Related Party Transactions', status: 'Missing', priority: 'High' },
        { note: 'Post Balance Sheet Events', status: 'Incomplete', priority: 'Medium' },
        { note: 'Financial Instruments', status: 'Missing', priority: 'Low' }
      ]
    },
    {
      id: 'ixbrl-errors',
      title: 'iXBRL Errors',
      value: 8,
      change: '-4 resolved',
      trend: 'down',
      status: 'warning',
      drillDownData: [
        { tag: 'Turnover', error: 'Missing mandatory tag', severity: 'High' },
        { tag: 'Directors Remuneration', error: 'Invalid format', severity: 'Medium' }
      ]
    },
    {
      id: 'signatures-pending',
      title: 'Signatures Pending',
      value: 3,
      change: 'Directors approval needed',
      trend: 'stable',
      status: 'warning',
      drillDownData: [
        { signatory: 'John Smith (Director)', document: 'Annual Accounts', status: 'Pending' },
        { signatory: 'Jane Doe (Director)', document: 'Directors Report', status: 'Pending' }
      ]
    },
    {
      id: 'materiality-threshold',
      title: 'Materiality Threshold',
      value: '£5,000',
      change: 'Based on 5% of PBT',
      trend: 'stable',
      status: 'good',
      drillDownData: [
        { metric: 'Profit Before Tax', amount: '£100,000', percentage: '5%' },
        { metric: 'Total Assets', amount: '£500,000', percentage: '1%' }
      ]
    }
  ]

  const exceptions: Exception[] = [
    {
      id: '1',
      type: 'error',
      title: 'Negative Reserves',
      description: 'Retained earnings showing negative balance of £15,000',
      module: 'Share Capital & Reserves',
      action: 'Review capital structure'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Rounding Difference',
      description: 'Balance sheet out by £2 - exceeds tolerance',
      module: 'Lead Schedules',
      action: 'Investigate variance'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Missing Directors Report',
      description: 'Principal activities section incomplete',
      module: 'Directors & Governance',
      action: 'Complete narrative'
    },
    {
      id: '4',
      type: 'info',
      title: 'Audit Exemption Available',
      description: 'Company qualifies for audit exemption',
      module: 'Engagement Setup',
      action: 'Consider exemption'
    }
  ]

  const statusTimeline = [
    { date: '2024-01-15', event: 'Trial Balance Imported', status: 'completed' },
    { date: '2024-01-16', event: 'Accounts Mapping Complete', status: 'completed' },
    { date: '2024-01-18', event: 'Year-end Adjustments Posted', status: 'completed' },
    { date: '2024-01-20', event: 'Lead Schedules Prepared', status: 'in-progress' },
    { date: '2024-01-22', event: 'Notes & Disclosures', status: 'pending' },
    { date: '2024-01-25', event: 'iXBRL Tagging', status: 'pending' },
    { date: '2024-01-28', event: 'Final Review', status: 'pending' },
    { date: '2024-01-30', event: 'Filing Deadline', status: 'pending' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleKPIClick = (kpi: KPICard) => {
    setSelectedKPI(kpi)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200'
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'error': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      case 'stable': return '➡️'
      default: return '➡️'
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Accounts Production Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Import Latest TB
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Generate Proofs
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'tasks', label: 'Tasks' },
            { id: 'exceptions', label: 'Exceptions' },
            { id: 'timeline', label: 'Status Timeline' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpiCards.map((kpi) => (
              <div
                key={kpi.id}
                onClick={() => handleKPIClick(kpi)}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${getStatusColor(kpi.status)}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{kpi.title}</h3>
                  <span className="text-lg">{getTrendIcon(kpi.trend)}</span>
                </div>
                <div className="mt-2">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-sm mt-1">{kpi.change}</p>
                </div>
              </div>
            ))}
          </div>

          {/* KPI Drill-down Modal */}
          {selectedKPI && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">{selectedKPI.title} - Detailed Analysis</h2>
                  <button
                    onClick={() => setSelectedKPI(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  {selectedKPI.drillDownData?.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(item).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-sm font-medium text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="ml-2 text-sm text-gray-900">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Outstanding Tasks</h2>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { task: 'Complete Fixed Assets Note', priority: 'High', due: '2024-01-22', assignee: 'John Smith' },
                  { task: 'Review Related Party Transactions', priority: 'Medium', due: '2024-01-23', assignee: 'Jane Doe' },
                  { task: 'Validate iXBRL Tags', priority: 'High', due: '2024-01-24', assignee: 'Mike Johnson' },
                  { task: 'Prepare Cash Flow Statement', priority: 'Medium', due: '2024-01-25', assignee: 'Sarah Wilson' }
                ].map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{task.task}</h3>
                      <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.priority}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">Due: {task.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exceptions Tab */}
      {activeTab === 'exceptions' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Exceptions & Issues</h2>
          <div className="space-y-4">
            {exceptions.map((exception) => (
              <div key={exception.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-3 h-3 rounded-full mt-1 ${
                    exception.type === 'error' ? 'bg-red-500' :
                    exception.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{exception.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{exception.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500">Module: {exception.module}</span>
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        {exception.action}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Status Timeline</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-6">
              {statusTimeline.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.event}</h3>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
