import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  FileText, Eye, AlertTriangle, FileSignature, Database, Clock,
  Activity, HardDrive
} from 'lucide-react'

const DocumentDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/document-hub/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json()
        setDashboardData(data)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
        setDashboardData({
          total_documents: 1247,
          pending_ocr: 23,
          conversion_failures: 5,
          pending_signatures: 8,
          storage_usage: {
            total_size_gb: 125.6,
            used_size_gb: 98.2,
            usage_percentage: 78
          },
          recent_activity: [
            {
              id: 1,
              action: "Document uploaded",
              document: "Invoice_2024_001.pdf",
              user: "John Smith",
              timestamp: "2024-09-20T10:30:00Z"
            },
            {
              id: 2,
              action: "OCR completed",
              document: "Bank_Statement_Sep.pdf",
              user: "System",
              timestamp: "2024-09-20T10:15:00Z"
            }
          ]
        })
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
      title: 'Total Documents',
      value: dashboardData?.total_documents || 0,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+156',
      changeType: 'positive'
    },
    {
      title: 'Pending OCR',
      value: dashboardData?.pending_ocr || 0,
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '-12',
      changeType: 'negative'
    },
    {
      title: 'Conversion Failures',
      value: dashboardData?.conversion_failures || 0,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'Pending Signatures',
      value: dashboardData?.pending_signatures || 0,
      icon: FileSignature,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '-3',
      changeType: 'negative'
    }
  ]

  const alertTiles = [
    {
      title: 'Docs Awaiting OCR',
      status: 'warning',
      message: '23 documents in OCR queue',
      action: 'View OCR Queue',
      count: 23
    },
    {
      title: 'Conversion Failures',
      status: 'error',
      message: '5 conversions failed in last 24h',
      action: 'Review Failures',
      count: 5
    },
    {
      title: 'Unsigned Packs',
      status: 'warning',
      message: '8 signature packs pending',
      action: 'View E-Sign',
      count: 8
    },
    {
      title: 'KYC Proofs Expiring',
      status: 'info',
      message: '12 KYC documents expire this month',
      action: 'Review KYC',
      count: 12
    },
    {
      title: 'Retention Due',
      status: 'info',
      message: '45 documents due for review',
      action: 'View Retention',
      count: 45
    },
    {
      title: 'Large Files',
      status: 'info',
      message: '18 files over 50MB need compression',
      action: 'Compress Files',
      count: 18
    }
  ]

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor document processing, storage, and workflow status</p>
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
                    <span className="text-sm text-gray-500 ml-1">this week</span>
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

      {/* Storage & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HardDrive className="h-5 w-5 mr-2 text-blue-600" />
              Storage & Residency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Storage</span>
                <span className="text-sm text-gray-600">
                  {dashboardData?.storage_usage?.used_size_gb}GB / {dashboardData?.storage_usage?.total_size_gb}GB
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${dashboardData?.storage_usage?.usage_percentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Region</span>
                <Badge variant="outline">UK</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Encryption</span>
                <Badge className="bg-green-100 text-green-800">AES-256</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Backup Status</span>
                <Badge className="bg-green-100 text-green-800">Current</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Process OCR Queue
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileSignature className="h-4 w-4 mr-2" />
                Create Signature Pack
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="h-4 w-4 mr-2" />
                Run Backup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Tiles */}
      <Card>
        <CardHeader>
          <CardTitle>Document Alerts & Tasks</CardTitle>
          <CardDescription>Items requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alertTiles.map((tile, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{tile.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        tile.status === 'error' ? 'destructive' :
                        tile.status === 'warning' ? 'default' : 'secondary'
                      }
                      className={
                        tile.status === 'error' ? 'bg-red-100 text-red-800' :
                        tile.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }
                    >
                      {tile.count}
                    </Badge>
                  </div>
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData?.recent_activity?.map((activity: any, index: number) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.document}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DocumentDashboard
