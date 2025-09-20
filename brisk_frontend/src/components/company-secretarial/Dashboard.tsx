import React, { useState, useEffect } from 'react'

interface KPICard {
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: string
  drillDownData?: any[]
}

interface Task {
  id: string
  title: string
  type: 'filing' | 'appointment' | 'psc' | 'certificate' | 'charge'
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'overdue'
}

const Dashboard: React.FC = () => {
  const [kpiCards, setKpiCards] = useState<KPICard[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedKPI, setSelectedKPI] = useState<KPICard | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setKpiCards([
        {
          title: 'Active Companies',
          value: 47,
          change: '+3 this month',
          trend: 'up',
          icon: '🏢',
          drillDownData: [
            { name: 'Acme Corp Ltd', status: 'Active', nextFiling: '15 Feb 2024' },
            { name: 'Beta Industries', status: 'Active', nextFiling: '28 Feb 2024' },
            { name: 'Gamma Solutions', status: 'Dormant', nextFiling: '10 Mar 2024' }
          ]
        },
        {
          title: 'Filings Due (30 days)',
          value: 12,
          change: '3 overdue',
          trend: 'down',
          icon: '📄',
          drillDownData: [
            { company: 'Acme Corp Ltd', form: 'CS01', due: '15 Feb 2024', status: 'Due' },
            { company: 'Beta Industries', form: 'AP01', due: '20 Feb 2024', status: 'Overdue' },
            { company: 'Delta Corp', form: 'PSC01', due: '25 Feb 2024', status: 'Due' }
          ]
        },
        {
          title: 'PSC Statements',
          value: '94%',
          change: 'Complete',
          trend: 'up',
          icon: '👥',
          drillDownData: [
            { company: 'Acme Corp Ltd', pscCount: 2, status: 'Complete' },
            { company: 'Beta Industries', pscCount: 1, status: 'Pending' },
            { company: 'Gamma Solutions', pscCount: 3, status: 'Complete' }
          ]
        },
        {
          title: 'Share Certificates',
          value: 156,
          change: '8 pending issue',
          trend: 'neutral',
          icon: '📜',
          drillDownData: [
            { company: 'Acme Corp Ltd', issued: 45, pending: 2 },
            { company: 'Beta Industries', issued: 78, pending: 4 },
            { company: 'Delta Corp', issued: 33, pending: 2 }
          ]
        },
        {
          title: 'Dividend Payments',
          value: '£2.4M',
          change: 'YTD distributed',
          trend: 'up',
          icon: '💰',
          drillDownData: [
            { company: 'Acme Corp Ltd', amount: '£850K', date: '15 Jan 2024' },
            { company: 'Beta Industries', amount: '£1.2M', date: '20 Jan 2024' },
            { company: 'Gamma Solutions', amount: '£350K', date: '25 Jan 2024' }
          ]
        },
        {
          title: 'Charges Registered',
          value: 23,
          change: '2 pending satisfaction',
          trend: 'neutral',
          icon: '🏦',
          drillDownData: [
            { company: 'Acme Corp Ltd', charges: 8, pending: 1 },
            { company: 'Beta Industries', charges: 12, pending: 1 },
            { company: 'Delta Corp', charges: 3, pending: 0 }
          ]
        }
      ])

      setTasks([
        {
          id: '1',
          title: 'CS01 Confirmation Statement - Acme Corp Ltd',
          type: 'filing',
          dueDate: '2024-02-15',
          priority: 'high',
          status: 'pending'
        },
        {
          id: '2',
          title: 'Director Appointment - Beta Industries',
          type: 'appointment',
          dueDate: '2024-02-20',
          priority: 'medium',
          status: 'in-progress'
        },
        {
          id: '3',
          title: 'PSC Statement Missing - Gamma Solutions',
          type: 'psc',
          dueDate: '2024-02-10',
          priority: 'high',
          status: 'overdue'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'text-red-600 bg-red-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const handleKPIClick = (kpi: KPICard) => {
    setSelectedKPI(kpi)
  }

  const closeDrillDown = () => {
    setSelectedKPI(null)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Secretarial Dashboard</h1>
          <p className="text-gray-600">Overview of corporate compliance and filing status</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Quick Filing
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Companies House Sync
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((kpi, index) => (
          <div
            key={index}
            onClick={() => handleKPIClick(kpi)}
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                  {kpi.change}
                </p>
              </div>
              <div className="text-3xl">{kpi.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks & Exceptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Urgent Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="text-sm font-medium">New Filing</div>
                </div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">👤</div>
                  <div className="text-sm font-medium">Add Officer</div>
                </div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="text-sm font-medium">Share Allotment</div>
                </div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-sm font-medium">Declare Dividend</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drill-down Modal */}
      {selectedKPI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{selectedKPI.title} - Detailed Analysis</h3>
                <button onClick={closeDrillDown} className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {selectedKPI.drillDownData?.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(item).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                          <span className="text-gray-900">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
