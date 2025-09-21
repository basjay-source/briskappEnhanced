import React, { useState, useEffect } from 'react'

interface KPICard {
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'neutral'
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

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  status: 'completed' | 'pending' | 'overdue'
}

const BTDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedKPI, setSelectedKPI] = useState<KPICard | null>(null)

  const kpiCards: KPICard[] = [
    {
      title: 'CT Liability',
      value: '£45,250',
      change: '+12.5%',
      trend: 'up',
      drillDownData: [
        { component: 'Trading Profits', amount: 180000, rate: 'Dynamic', liability: 45000 },
        { component: 'Chargeable Gains', amount: 5000, rate: 'Dynamic', liability: 1250 },
        { component: 'Marginal Relief', amount: -1000, rate: 'N/A', liability: -1000 }
      ]
    },
    {
      title: 'Effective Rate',
      value: '24.1%',
      change: '-0.9%',
      trend: 'down',
      drillDownData: [
        { year: '2023', rate: 'Dynamic', profits: 180000, liability: 45000 },
        { year: '2022', rate: 'Dynamic', profits: 165000, liability: 31350 },
        { year: '2021', rate: 'Dynamic', profits: 145000, liability: 27550 }
      ]
    },
    {
      title: 'Capital Allowances',
      value: '£28,500',
      change: '+15.2%',
      trend: 'up',
      drillDownData: [
        { pool: 'Main Pool', additions: 45000, wda: 18000, rate: '18%' },
        { pool: 'Special Rate', additions: 15000, wda: 900, rate: '6%' },
        { pool: 'AIA', additions: 25000, allowance: 25000, rate: '100%' }
      ]
    },
    {
      title: 'Group Relief',
      value: '£12,000',
      change: 'New',
      trend: 'neutral',
      drillDownData: [
        { company: 'Beta Ltd', surrender: 8000, claim: 8000, saving: 2000 },
        { company: 'Gamma Ltd', surrender: 16000, claim: 16000, saving: 4000 }
      ]
    }
  ]

  const exceptions: Exception[] = [
    {
      id: '1',
      type: 'error',
      title: 'TB not final',
      description: 'Trial balance import is still in draft status',
      module: 'Prelims',
      action: 'Finalize TB'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Capital allowances missing',
      description: 'No capital allowances computation found',
      module: 'Capital Allowances',
      action: 'Complete computation'
    },
    {
      id: '3',
      type: 'info',
      title: 'Group relief not allocated',
      description: 'Available group relief has not been allocated',
      module: 'Group & Consortia',
      action: 'Allocate relief'
    }
  ]

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: '2024-01-15',
      title: 'CT600 Filing Deadline',
      description: 'Corporation Tax return due for period ending 31/12/2023',
      status: 'pending'
    },
    {
      id: '2',
      date: '2024-01-01',
      title: 'QIP Due',
      description: 'Quarterly instalment payment due',
      status: 'completed'
    },
    {
      id: '3',
      date: '2023-12-31',
      title: 'Accounting Period End',
      description: 'Year end 31 December 2023',
      status: 'completed'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleKPIClick = (kpi: KPICard) => {
    setSelectedKPI(kpi)
  }

  const closeModal = () => {
    setSelectedKPI(null)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Business Tax Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Import TB
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Generate CT600
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
            { id: 'compliance-timeline', label: 'Compliance Timeline' }
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

      {activeTab === 'overview' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {kpiCards.map((kpi, index) => (
              <div
                key={index}
                onClick={() => handleKPIClick(kpi)}
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <h3 className="text-sm font-medium text-gray-500">{kpi.title}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{kpi.value}</p>
                  <p className={`ml-2 text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-600' : 
                    kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {kpi.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Exceptions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Exceptions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {exceptions.map((exception) => (
                  <div key={exception.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        exception.type === 'error' ? 'bg-red-500' :
                        exception.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <h3 className="font-medium text-gray-900">{exception.title}</h3>
                        <p className="text-sm text-gray-500">{exception.description}</p>
                        <span className="text-xs text-gray-400">{exception.module}</span>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      {exception.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'compliance-timeline' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Compliance Timeline</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {timelineEvents.map((event) => (
                <div key={event.id} className="flex items-center p-4 border rounded-lg">
                  <div className={`w-4 h-4 rounded-full mr-4 ${
                    event.status === 'completed' ? 'bg-green-500' :
                    event.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <span className="text-sm text-gray-500">{event.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* KPI Drill-down Modal */}
      {selectedKPI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedKPI.title} - Detailed Analysis</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Close</span>
                ✕
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {selectedKPI.drillDownData && selectedKPI.drillDownData.length > 0 && 
                      Object.keys(selectedKPI.drillDownData[0]).map((key) => (
                        <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedKPI.drillDownData?.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, cellIndex) => (
                        <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {typeof value === 'number' && value > 1000 ? `£${value.toLocaleString()}` : String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BTDashboard
