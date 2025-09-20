import React, { useState, useEffect } from 'react'
import { 
  Users, 
  AlertTriangle, 
  Search, 
  TrendingUp, 
  Clock,
  CheckCircle
} from 'lucide-react'
import { amlKycApi } from '../../services/api'

interface DashboardStats {
  total_cases: number
  pending_reviews: number
  high_risk_cases: number
  screening_hits: number
  approval_rate: number
  avg_review_time: number
}

const AMLDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total_cases: 0,
    pending_reviews: 0,
    high_risk_cases: 0,
    screening_hits: 0,
    approval_rate: 0,
    avg_review_time: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await amlKycApi.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching AML dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const kpiCards = [
    {
      title: 'Total Cases',
      value: stats.total_cases.toLocaleString(),
      icon: Users,
      color: 'blue',
      trend: '+12%'
    },
    {
      title: 'Pending Reviews',
      value: stats.pending_reviews.toLocaleString(),
      icon: Clock,
      color: 'orange',
      trend: '-5%'
    },
    {
      title: 'High Risk Cases',
      value: stats.high_risk_cases.toLocaleString(),
      icon: AlertTriangle,
      color: 'red',
      trend: '+3%'
    },
    {
      title: 'Screening Hits',
      value: stats.screening_hits.toLocaleString(),
      icon: Search,
      color: 'purple',
      trend: '+8%'
    },
    {
      title: 'Approval Rate',
      value: `${stats.approval_rate}%`,
      icon: CheckCircle,
      color: 'green',
      trend: '+2%'
    },
    {
      title: 'Avg Review Time',
      value: `${stats.avg_review_time} days`,
      icon: TrendingUp,
      color: 'indigo',
      trend: '-1.2 days'
    }
  ]

  const exceptions = [
    {
      id: 1,
      type: 'KYC Expiring',
      client: 'Acme Corp Ltd',
      description: 'KYC documentation expires in 7 days',
      priority: 'High',
      due_date: '2024-01-15'
    },
    {
      id: 2,
      type: 'Screening Hit',
      client: 'John Smith',
      description: 'Potential PEP match requiring review',
      priority: 'Critical',
      due_date: '2024-01-10'
    },
    {
      id: 3,
      type: 'EDD Required',
      client: 'Global Trading Inc',
      description: 'High-risk jurisdiction requires enhanced due diligence',
      priority: 'High',
      due_date: '2024-01-12'
    },
    {
      id: 4,
      type: 'Missing Documents',
      client: 'Tech Startup Ltd',
      description: 'Proof of address documentation missing',
      priority: 'Medium',
      due_date: '2024-01-18'
    }
  ]

  const monitoringFeed = [
    {
      id: 1,
      type: 'Sanctions Update',
      description: 'EU sanctions list updated - 15 new entries',
      timestamp: '2 hours ago',
      status: 'info'
    },
    {
      id: 2,
      type: 'PEP Status Change',
      description: 'Maria Rodriguez removed from PEP list',
      timestamp: '4 hours ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'Adverse Media',
      description: 'New adverse media alert for existing client',
      timestamp: '6 hours ago',
      status: 'warning'
    },
    {
      id: 4,
      type: 'System Alert',
      description: 'Screening service temporarily unavailable',
      timestamp: '8 hours ago',
      status: 'error'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">AML/KYC compliance overview and monitoring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpiCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${card.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    card.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {card.trend}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
                <p className="text-gray-600 text-sm">{card.title}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Exceptions & Tasks</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {exceptions.map((exception) => (
                  <div key={exception.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      exception.priority === 'Critical' ? 'bg-red-500' :
                      exception.priority === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{exception.type}</h4>
                        <span className="text-xs text-gray-500">{exception.due_date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{exception.client}</p>
                      <p className="text-sm text-gray-500">{exception.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Monitoring Feed</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {monitoringFeed.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      item.status === 'success' ? 'bg-green-500' :
                      item.status === 'warning' ? 'bg-yellow-500' :
                      item.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{item.type}</h4>
                        <span className="text-xs text-gray-500">{item.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AMLDashboard
