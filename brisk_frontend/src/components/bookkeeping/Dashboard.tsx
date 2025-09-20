import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react'
import { bookkeepingApi } from '../../services/api'

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>({})

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await bookkeepingApi.getDashboardStats()
        setStats(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const kpiCards = [
    {
      title: 'Bank Unreconciled',
      value: stats.bank_unreconciled || 54,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '+12%',
      trendUp: false
    },
    {
      title: 'AR Overdue',
      value: `£${(stats.ar_overdue || 12500).toLocaleString()}`,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      trend: '-5%',
      trendUp: false
    },
    {
      title: 'AP Due',
      value: `£${(stats.ap_due || 8750).toLocaleString()}`,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'VAT Due Date',
      value: stats.vat_due_date || '2024-02-07',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '7 days',
      trendUp: false
    }
  ]

  const exceptionTiles = [
    {
      title: 'Unposted Journals',
      count: stats.unposted_journals || 3,
      description: 'Journal entries awaiting posting',
      action: 'Review Journals',
      priority: 'medium'
    },
    {
      title: 'Asset Depreciation Due',
      count: stats.asset_depreciation_due || 2,
      description: 'Fixed assets requiring depreciation run',
      action: 'Run Depreciation',
      priority: 'high'
    },
    {
      title: 'Period Lock Status',
      count: stats.period_lock_status || 'Open',
      description: 'Current period is open for transactions',
      action: 'Review Period',
      priority: 'low'
    },
    {
      title: 'Trial Balance',
      count: stats.trial_balance_date || '2024-01-31',
      description: 'Last trial balance generated',
      action: 'Generate TB',
      priority: 'medium'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Refresh Data
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Export Summary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${card.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {card.trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{card.trend}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exception Tiles</h3>
          <div className="space-y-4">
            {exceptionTiles.map((tile, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      tile.priority === 'high' ? 'bg-red-500' :
                      tile.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                    <h4 className="font-medium text-gray-900">{tile.title}</h4>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
                      {tile.count}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 ml-6">{tile.description}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  {tile.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <DollarSign className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-medium text-gray-900">New Invoice</h4>
              <p className="text-sm text-gray-500">Create sales invoice</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-medium text-gray-900">Bank Reconcile</h4>
              <p className="text-sm text-gray-500">Reconcile transactions</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <Clock className="w-6 h-6 text-orange-600 mb-2" />
              <h4 className="font-medium text-gray-900">Journal Entry</h4>
              <p className="text-sm text-gray-500">Create adjustment</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
              <h4 className="font-medium text-gray-900">Trial Balance</h4>
              <p className="text-sm text-gray-500">Generate report</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
