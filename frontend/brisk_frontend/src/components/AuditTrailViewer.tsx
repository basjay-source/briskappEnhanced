import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Shield, 
  Download, 
  Search, 
  User,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react'
const format = (date: Date, formatStr: string) => {
  if (formatStr === 'MMM dd, HH:mm:ss') {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }
  if (formatStr === 'PPpp') {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }
  return date.toISOString()
}

interface AuditLog {
  id: number
  timestamp: string
  user_id?: string
  action: string
  entity_type: string
  entity_id: string
  details?: string
  risk_level?: string
  compliance_tags?: string[]
  ip_address?: string
  metadata?: any
}

interface AuditAnalytics {
  total_logs: number
  high_risk_count: number
  failed_requests: number
  unique_users: number
  top_actions: Array<{ action: string; count: number }>
  risk_distribution: Record<string, number>
  compliance_summary: Record<string, number>
}

export default function AuditTrailViewer() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [analytics, setAnalytics] = useState<AuditAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  
  const [filters, setFilters] = useState({
    search: '',
    risk_level: '',
    entity_type: '',
    start_date: '',
    end_date: '',
    page: 1,
    limit: 50
  })

  useEffect(() => {
    fetchAuditLogs()
    fetchAnalytics()
  }, [filters])

  const fetchAuditLogs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString())
      })
      
      const response = await fetch(`/api/v1/audit-logs?${params}`)
      const data = await response.json()
      setLogs(data.logs || [])
    } catch (error) {
      console.error('Failed to fetch audit logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/v1/audit-analytics')
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Failed to fetch audit analytics:', error)
    }
  }

  const exportLogs = async (format: 'csv' | 'json') => {
    try {
      const params = new URLSearchParams()
      params.append('format', format)
      if (filters.start_date) params.append('start_date', filters.start_date)
      if (filters.end_date) params.append('end_date', filters.end_date)
      
      const response = await fetch(`/api/v1/audit-export?${params}`)
      const blob = await response.blob()
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `audit_logs.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to export audit logs:', error)
    }
  }

  const getRiskLevelColor = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'CRITICAL': return 'bg-red-100 text-red-800'
      case 'HIGH': return 'bg-[#FFF4F0] text-[#B8441F]'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800'
      case 'LOW': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskLevelIcon = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'CRITICAL':
      case 'HIGH': return <AlertTriangle className="h-4 w-4 text-[#FF6B35]" />
      case 'MEDIUM': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'LOW': return <CheckCircle className="h-4 w-4 text-green-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Logs</p>
                  <p className="text-2xl font-bold">{analytics.total_logs.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Risk Events</p>
                  <p className="text-2xl font-bold">{analytics.high_risk_count}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-[#FF6B35]" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Failed Requests</p>
                  <p className="text-2xl font-bold">{analytics.failed_requests}</p>
                </div>
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold">{analytics.unique_users}</p>
                </div>
                <User className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Enterprise Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search actions..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                className="w-48"
              />
            </div>
            
            <Select value={filters.risk_level} onValueChange={(value) => 
              setFilters(prev => ({ ...prev, risk_level: value, page: 1 }))
            }>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.entity_type} onValueChange={(value) => 
              setFilters(prev => ({ ...prev, entity_type: value, page: 1 }))
            }>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Entity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="HTTP_REQUEST">HTTP Requests</SelectItem>
                <SelectItem value="VATReturn">VAT Returns</SelectItem>
                <SelectItem value="Invoice">Invoices</SelectItem>
                <SelectItem value="Client">Clients</SelectItem>
                <SelectItem value="User">Users</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => exportLogs('csv')}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button 
                variant="outline" 
                onClick={() => exportLogs('json')}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export JSON
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      Loading audit logs...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      No audit logs found
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
                        {format(new Date(log.timestamp), 'MMM dd, HH:mm:ss')}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-900">{log.user_id || 'System'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {log.action.replace(/_/g, ' ')}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge variant="outline">
                          {log.entity_type}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getRiskLevelIcon(log.risk_level)}
                          <Badge className={getRiskLevelColor(log.risk_level)}>
                            {log.risk_level || 'LOW'}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap font-mono text-sm text-gray-500">
                        {log.ip_address || 'N/A'}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {log.details}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedLog(log)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Audit Log Details</DialogTitle>
                            </DialogHeader>
                            {selectedLog && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Timestamp</label>
                                    <p className="font-mono text-sm">
                                      {format(new Date(selectedLog.timestamp), 'PPpp')}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">User ID</label>
                                    <p>{selectedLog.user_id || 'System'}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Action</label>
                                    <p>{selectedLog.action}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Entity Type</label>
                                    <p>{selectedLog.entity_type}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Entity ID</label>
                                    <p>{selectedLog.entity_id}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Risk Level</label>
                                    <Badge className={getRiskLevelColor(selectedLog.risk_level)}>
                                      {selectedLog.risk_level || 'LOW'}
                                    </Badge>
                                  </div>
                                </div>
                                
                                {selectedLog.compliance_tags && selectedLog.compliance_tags.length > 0 && (
                                  <div>
                                    <label className="text-sm font-medium">Compliance Tags</label>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {selectedLog.compliance_tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {selectedLog.details && (
                                  <div>
                                    <label className="text-sm font-medium">Details</label>
                                    <p className="text-sm bg-gray-50 p-3 rounded">
                                      {selectedLog.details}
                                    </p>
                                  </div>
                                )}
                                
                                {selectedLog.metadata && (
                                  <div>
                                    <label className="text-sm font-medium">Metadata</label>
                                    <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto max-h-40">
                                      {JSON.stringify(selectedLog.metadata, null, 2)}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
