import React, { useState, useEffect } from 'react'
import { Clock, DollarSign, AlertTriangle, TrendingUp, Users, FileText, Timer, CreditCard } from 'lucide-react'
import { timeFeesApi } from '../../services/api'

const TMDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await timeFeesApi.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const kpiCards = [
    {
      title: 'Active Timers',
      value: stats?.active_timers || 0,
      icon: Timer,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+2 from yesterday'
    },
    {
      title: 'Timesheets Due',
      value: stats?.timesheets_due || 0,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '5 overdue'
    },
    {
      title: 'Unbilled WIP',
      value: `£${(stats?.unbilled_wip || 0).toLocaleString()}`,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+£12k this week'
    },
    {
      title: 'AR Overdue',
      value: `£${(stats?.ar_overdue || 0).toLocaleString()}`,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: '8 invoices'
    },
    {
      title: 'Utilization Rate',
      value: `${stats?.utilization_rate || 0}%`,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+2.3% vs target'
    },
    {
      title: 'Realization Rate',
      value: `${stats?.realization_rate || 0}%`,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: 'Above target'
    },
    {
      title: 'Collection Rate',
      value: `${stats?.collection_rate || 0}%`,
      icon: CreditCard,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      change: '+1.2% this month'
    },
    {
      title: 'Avg Billing Cycle',
      value: `${stats?.avg_billing_cycle || 0} days`,
      icon: DollarSign,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      change: '2 days faster'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Time Management & Fees overview and key metrics</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Timer className="w-4 h-4" />
          <span>Start Timer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                <p className="text-sm text-gray-500 mt-1">{card.change}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Time Entries</h3>
          <div className="space-y-3">
            {[
              { client: 'Acme Corp', task: 'Audit Planning', hours: 2.5, user: 'John Smith' },
              { client: 'Tech Ltd', task: 'Tax Review', hours: 1.5, user: 'Sarah Johnson' },
              { client: 'Global Inc', task: 'Advisory Call', hours: 1.0, user: 'Mike Wilson' }
            ].map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{entry.client}</p>
                  <p className="text-sm text-gray-600">{entry.task} - {entry.user}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{entry.hours}h</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">WIP Alerts</h3>
          <div className="space-y-3">
            {[
              { type: 'Budget Exceeded', client: 'Acme Corp Audit', amount: '£45,000', status: 'warning' },
              { type: 'Fee Cap Reached', client: 'Tech Ltd Tax', amount: '£28,000', status: 'danger' },
              { type: 'Review Required', client: 'Global Inc Advisory', amount: '£15,000', status: 'info' }
            ].map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{alert.type}</p>
                  <p className="text-sm text-gray-600">{alert.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{alert.amount}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    alert.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    alert.status === 'danger' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TMDashboard
