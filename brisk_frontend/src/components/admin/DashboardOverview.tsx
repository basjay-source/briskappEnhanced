import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Users, Building, CreditCard, Shield, Activity, AlertTriangle,
  TrendingUp, Database, Zap
} from 'lucide-react'
import { adminApi, DashboardOverview as DashboardData } from '../../services/api'

const DashboardOverview: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [systemHealth, setSystemHealth] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overview, health] = await Promise.all([
          adminApi.getDashboardOverview(),
          adminApi.getSystemHealth()
        ])
        setDashboardData(overview)
        setSystemHealth(health)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const kpiCards = [
    {
      title: 'Total Tenants',
      value: dashboardData?.total_tenants || 0,
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Users',
      value: dashboardData?.active_users || 0,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Subscriptions',
      value: dashboardData?.total_subscriptions || 0,
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Security Alerts',
      value: dashboardData?.security_alerts || 0,
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: '-2',
      changeType: 'negative'
    }
  ]

  const systemTiles = [
    {
      title: 'SSO Configuration',
      status: 'warning',
      message: 'SAML certificate expires in 30 days',
      action: 'Review SSO Settings'
    },
    {
      title: 'API Keys',
      status: 'warning',
      message: '3 API keys expiring this month',
      action: 'Manage API Keys'
    },
    {
      title: 'MFA Coverage',
      status: 'success',
      message: '92% of users have MFA enabled',
      action: 'View Security Report'
    },
    {
      title: 'Storage Usage',
      status: 'info',
      message: 'Storage at 80% capacity',
      action: 'Manage Storage'
    },
    {
      title: 'Plan Renewal',
      status: 'info',
      message: 'Professional plan renews in 15 days',
      action: 'View Billing'
    },
    {
      title: 'Region Migration',
      status: 'info',
      message: 'EU data migration in progress',
      action: 'View Progress'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your system health, users, and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {card.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Status</span>
                <Badge className="bg-green-100 text-green-800">
                  {systemHealth?.status || 'Healthy'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uptime</span>
                <span className="text-sm text-gray-600">{systemHealth?.uptime || '99.9%'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Response Time</span>
                <span className="text-sm text-gray-600">{systemHealth?.response_time || '120ms'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Connections</span>
                <span className="text-sm text-gray-600">{systemHealth?.active_connections || '1,250'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Users & Roles
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Security Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="h-4 w-4 mr-2" />
                Backup & Recovery
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="h-4 w-4 mr-2" />
                Feature Flags
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Tiles */}
      <Card>
        <CardHeader>
          <CardTitle>System Alerts & Notifications</CardTitle>
          <CardDescription>Important items requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemTiles.map((tile, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{tile.title}</h4>
                  <Badge
                    variant={
                      tile.status === 'warning' ? 'destructive' :
                      tile.status === 'success' ? 'default' : 'secondary'
                    }
                    className={
                      tile.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                      tile.status === 'success' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }
                  >
                    {tile.status === 'warning' ? <AlertTriangle className="h-3 w-3 mr-1" /> : null}
                    {tile.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{tile.message}</p>
                <Button variant="outline" size="sm" className="text-xs">
                  {tile.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardOverview
