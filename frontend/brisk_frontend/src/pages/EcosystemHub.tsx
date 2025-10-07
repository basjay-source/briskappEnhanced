import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  Calculator, 
  Receipt, 
  Users, 
  Shield, 
  Building, 
  BookOpen, 
  FileSignature,
  BarChart3,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Clock,
  Settings,
  Heart,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import KPICard from '@/components/KPICard'
import { apiClient } from '@/lib/api'

interface DashboardData {
  kpis: {
    total_revenue: { value: number; change: string }
    active_clients: { value: number; change: string }
    completion_rate: { value: string; change: string }
    avg_response_time: { value: string; change: string }
  }
  summary: {
    active_jobs: number
    overdue_jobs: number
    upcoming_deadlines: number
    this_week_hours: number
  }
}

interface Activity {
  action: string
  client: string
  time: string
  job_id?: string
}

interface Insight {
  type: string
  title: string
  description: string
  action?: string
  priority?: string
}

export default function EcosystemHub() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [recentActivity, setRecentActivity] = useState<Activity[]>([])
  const [aiInsights, setAIInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [dashboard, activity, insights] = await Promise.all([
        apiClient.getDashboard(),
        apiClient.getRecentActivity(4),
        apiClient.getAIInsights()
      ])

      setDashboardData(dashboard)
      setRecentActivity(activity)
      setAIInsights(insights)
    } catch (err) {
      console.error('Error loading dashboard data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const modules = [
    {
      name: 'Practice Management',
      path: '/app/practice',
      icon: Briefcase,
      description: 'Jobs, workflows, compliance deadlines',
      status: 'active',
      color: 'bg-purple-500'
    },
    {
      name: 'Accounts Production',
      path: '/app/accounts',
      icon: Calculator,
      description: 'FRS 102/105, IFRS, iXBRL generation',
      status: 'active',
      color: 'bg-blue-500'
    },
    {
      name: 'Corporation Tax',
      path: '/app/tax/ct',
      icon: Receipt,
      description: 'CT600, R&D claims, reliefs',
      status: 'active',
      color: 'bg-green-500'
    },
    {
      name: 'Personal Tax',
      path: '/app/tax/sa',
      icon: BarChart3,
      description: 'SA returns, CGT optimization',
      status: 'active',
      color: 'bg-orange-500'
    },
    {
      name: 'Payroll',
      path: '/app/payroll',
      icon: Users,
      description: 'RTI, pensions, CIS, P11D',
      status: 'active',
      color: 'bg-pink-500'
    },
    {
      name: 'AML/KYC',
      path: '/app/aml',
      icon: Shield,
      description: 'Risk assessment, compliance',
      status: 'active',
      color: 'bg-red-500'
    },
    {
      name: 'Company Secretarial',
      path: '/app/cosec',
      icon: Building,
      description: 'Companies House filings',
      status: 'active',
      color: 'bg-indigo-500'
    },
    {
      name: 'Bookkeeping',
      path: '/app/books',
      icon: BookOpen,
      description: 'Bank feeds, VAT MTD, management accounts',
      status: 'active',
      color: 'bg-teal-500'
    },
    {
      name: 'Charity & Academy Accounts',
      path: '/app/charity',
      icon: Heart,
      description: 'SORP compliance, fund accounting',
      status: 'active',
      color: 'bg-pink-500'
    },
    {
      name: 'DocuSignage',
      path: '/app/esign',
      icon: FileSignature,
      description: 'Digital signing workflows',
      status: 'active',
      color: 'bg-blue-500'
    },
    {
      name: 'Time Management',
      path: '/app/time',
      icon: Clock,
      description: 'Advanced time tracking & billing',
      status: 'active',
      color: 'bg-purple-500'
    },
    {
      name: 'Admin',
      path: '/app/admin',
      icon: Settings,
      description: 'System administration & settings',
      status: 'active',
      color: 'bg-gray-500'
    }
  ]

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `£${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `£${(value / 1000).toFixed(1)}K`
    }
    return `£${value.toFixed(0)}`
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning':
      case 'alert':
        return 'bg-red-50 text-red-900'
      case 'opportunity':
        return 'bg-green-50 text-green-900'
      default:
        return 'bg-blue-50 text-blue-900'
    }
  }

  const getInsightTextColor = (type: string) => {
    switch (type) {
      case 'warning':
      case 'alert':
        return 'text-red-700'
      case 'opportunity':
        return 'text-green-700'
      default:
        return 'text-blue-700'
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brisk-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 space-y-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
            <p className="mt-4 text-gray-600">Error loading dashboard: {error}</p>
            <Button onClick={loadDashboardData} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ecosystem Hub</h1>
          <p className="text-gray-600 mt-2">Welcome to your all-in-one practice management suite</p>
        </div>
        <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
          <Link to="/app/practice" className="flex items-center gap-2">
            View Practice Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={dashboardData ? formatCurrency(dashboardData.kpis.total_revenue.value) : '£0'}
          change={dashboardData?.kpis.total_revenue.change || '+0%'}
          icon={TrendingUp}
          color="text-green-600"
          drillDownData={{
            title: "Revenue Analytics",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Revenue Sources</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Practice Management</span>
                        <span className="font-semibold">£850,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bookkeeping</span>
                        <span className="font-semibold">£645,230</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax Services</span>
                        <span className="font-semibold">£512,350</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AML Services</span>
                        <span className="font-semibold">£387,970</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900">Growth Metrics</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>New MRR</span>
                        <span className="font-semibold text-green-600">+£23,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expansion MRR</span>
                        <span className="font-semibold text-green-600">+£15,230</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Churn MRR</span>
                        <span className="font-semibold text-red-600">-£8,920</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    View Detailed Report
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    Export Data
                  </button>
                </div>
              </div>
            )
          }}
        />
        <KPICard
          title="Active Clients"
          value={dashboardData?.kpis.active_clients.value.toLocaleString() || '0'}
          change={dashboardData?.kpis.active_clients.change || '+0%'}
          icon={Users}
          color="text-blue-600"
          drillDownData={{
            title: "Client Analytics",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Client Segments</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Enterprise</span>
                        <span className="font-semibold">247</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SME</span>
                        <span className="font-semibold">645</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sole Traders</span>
                        <span className="font-semibold">355</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900">Client Health</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Healthy</span>
                        <span className="font-semibold text-green-600">1,089</span>
                      </div>
                      <div className="flex justify-between">
                        <span>At Risk</span>
                        <span className="font-semibold text-orange-600">127</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Churned</span>
                        <span className="font-semibold text-red-600">31</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    View Client List
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    Export Report
                  </button>
                </div>
              </div>
            )
          }}
        />
        <KPICard
          title="Completion Rate"
          value={dashboardData?.kpis.completion_rate.value || '0%'}
          change={dashboardData?.kpis.completion_rate.change || '+0%'}
          icon={BarChart3}
          color="text-purple-600"
          drillDownData={{
            title: "Task Completion Analytics",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">By Module</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Bookkeeping</span>
                        <span className="font-semibold">96.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax Returns</span>
                        <span className="font-semibold">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payroll</span>
                        <span className="font-semibold">92.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AML Compliance</span>
                        <span className="font-semibold">89.7%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900">Performance Trends</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>This Week</span>
                        <span className="font-semibold">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Week</span>
                        <span className="font-semibold">92.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Avg</span>
                        <span className="font-semibold">93.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    View Task Details
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    Performance Report
                  </button>
                </div>
              </div>
            )
          }}
        />
        <KPICard
          title="Avg Response Time"
          value={dashboardData?.kpis.avg_response_time.value || '0h'}
          change={dashboardData?.kpis.avg_response_time.change || '+0%'}
          icon={Clock}
          color="text-orange-600"
          drillDownData={{
            title: "Response Time Analytics",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">By Channel</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Email</span>
                        <span className="font-semibold">1.8h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone</span>
                        <span className="font-semibold">0.5h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Portal</span>
                        <span className="font-semibold">3.2h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chat</span>
                        <span className="font-semibold">0.3h</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900">SLA Performance</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Within 1h</span>
                        <span className="font-semibold text-green-600">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Within 4h</span>
                        <span className="font-semibold text-green-600">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Within 24h</span>
                        <span className="font-semibold text-green-600">94%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    View Response Log
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    SLA Report
                  </button>
                </div>
              </div>
            )
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => {
              const Icon = module.icon
              return (
                <Link key={index} to={module.path}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-2 border-blue-900">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg ${module.color} text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant={module.status === 'active' ? 'default' : 'secondary'}>
                          {module.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{module.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Recent Activity</h2>
          <Card className="border-2 border-blue-900">
            <CardContent className="p-6">
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                      <div className="w-2 h-2 bg-brisk-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.client}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No recent activity</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6 border-2 border-blue-900">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              {aiInsights.length > 0 ? (
                <div className="space-y-3">
                  {aiInsights.map((insight, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${getInsightColor(insight.type)}`}
                      onClick={() => {
                        if (insight.action) {
                          console.log('Navigate to:', insight.action)
                        }
                      }}
                    >
                      <p className="text-sm font-medium">{insight.title}</p>
                      <p className={`text-xs ${getInsightTextColor(insight.type)}`}>{insight.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No insights available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
