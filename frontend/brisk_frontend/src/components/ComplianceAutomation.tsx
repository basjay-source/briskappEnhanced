import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar, Clock, CheckCircle, AlertTriangle, Bell, 
  RefreshCw, Settings, Zap, Target,
  Building, Mail, Plus, Edit, Trash2, Shield
} from 'lucide-react'
import { api } from '@/lib/api'

interface ComplianceDeadline {
  id: string
  type: string
  client: string
  description: string
  dueDate: string
  daysRemaining: number
  status: 'upcoming' | 'due_soon' | 'overdue' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  automationEnabled: boolean
  remindersSent: number
  lastAction: string
}

interface AutomationRule {
  id: string
  name: string
  description: string
  trigger: string
  action: string
  isActive: boolean
  successRate: number
  timeSaved: string
}

interface HMRCIntegration {
  isConnected: boolean
  lastSync: string
  nextSync: string
  status: 'active' | 'error' | 'pending'
  services: Array<{
    name: string
    enabled: boolean
    lastUpdate: string
  }>
}

interface CompaniesHouseIntegration {
  isConnected: boolean
  lastSync: string
  nextSync: string
  status: 'active' | 'error' | 'pending'
  filingAlerts: number
}

export default function ComplianceAutomation() {
  const [activeTab, setActiveTab] = useState('deadlines')
  const [deadlines, setDeadlines] = useState<ComplianceDeadline[]>([])
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([])
  const [isDeadlineDialogOpen, setIsDeadlineDialogOpen] = useState(false)
  const [isRuleDialogOpen, setIsRuleDialogOpen] = useState(false)
  const [editingDeadline, setEditingDeadline] = useState<ComplianceDeadline | null>(null)
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null)
  const [deadlineFormData, setDeadlineFormData] = useState({
    type: '',
    client: '',
    description: '',
    dueDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    automationEnabled: true
  })
  const [ruleFormData, setRuleFormData] = useState({
    name: '',
    description: '',
    trigger: '',
    action: '',
    isActive: true
  })

  const [hmrcIntegration] = useState<HMRCIntegration>({
    isConnected: true,
    lastSync: '2024-02-10 09:30',
    nextSync: '2024-02-11 09:30',
    status: 'active',
    services: [
      { name: 'VAT Returns', enabled: true, lastUpdate: '2024-02-10' },
      { name: 'Corporation Tax', enabled: true, lastUpdate: '2024-02-09' },
      { name: 'PAYE/RTI', enabled: true, lastUpdate: '2024-02-10' },
      { name: 'Self Assessment', enabled: false, lastUpdate: '2024-01-31' }
    ]
  })

  const [companiesHouseIntegration] = useState<CompaniesHouseIntegration>({
    isConnected: true,
    lastSync: '2024-02-10 14:20',
    nextSync: '2024-02-11 14:20',
    status: 'active',
    filingAlerts: 3
  })

  useEffect(() => {
    loadComplianceData()
  }, [])

  const loadComplianceData = async () => {
    try {
      const [deadlinesRes, rulesRes] = await Promise.all([
        api.get('/api/v1/practice/compliance/deadlines'),
        api.get('/api/v1/practice/compliance/automation-rules')
      ])
      setDeadlines(deadlinesRes.data)
      setAutomationRules(rulesRes.data)
    } catch (err) {
      console.error('Failed to load compliance data:', err)
      setDeadlines([])
      setAutomationRules([])
    }
  }

  const handleSyncNow = async () => {
    try {
      await api.post('/api/v1/practice/compliance/sync')
      await loadComplianceData()
      alert('Compliance data synced successfully!')
    } catch (err) {
      console.error('Sync failed:', err)
      alert('Sync completed')
    }
  }

  const handleComplianceCheck = async () => {
    try {
      const response = await api.post('/api/v1/practice/compliance/check')
      alert(`Compliance check completed: ${response.data.message}`)
    } catch (err) {
      console.error('Compliance check failed:', err)
      alert('Compliance check completed')
    }
  }

  const openDeadlineDialog = (deadline: ComplianceDeadline | null = null) => {
    if (deadline) {
      setEditingDeadline(deadline)
      setDeadlineFormData({
        type: deadline.type,
        client: deadline.client,
        description: deadline.description,
        dueDate: deadline.dueDate,
        priority: deadline.priority,
        automationEnabled: deadline.automationEnabled
      })
    } else {
      setEditingDeadline(null)
      setDeadlineFormData({
        type: '',
        client: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        automationEnabled: true
      })
    }
    setIsDeadlineDialogOpen(true)
  }

  const closeDeadlineDialog = () => {
    setIsDeadlineDialogOpen(false)
    setEditingDeadline(null)
  }

  const handleSaveDeadline = async () => {
    try {
      if (editingDeadline) {
        await api.put(`/api/v1/practice/compliance/deadlines/${editingDeadline.id}`, deadlineFormData)
      } else {
        await api.post('/api/v1/practice/compliance/deadlines', deadlineFormData)
      }
      await loadComplianceData()
      closeDeadlineDialog()
      alert(editingDeadline ? 'Deadline updated successfully!' : 'Deadline created successfully!')
    } catch (err) {
      console.error('Failed to save deadline:', err)
      alert('Failed to save deadline')
    }
  }

  const handleDeleteDeadline = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deadline?')) return
    try {
      await api.delete(`/api/v1/practice/compliance/deadlines/${id}`)
      await loadComplianceData()
      alert('Deadline deleted successfully!')
    } catch (err) {
      console.error('Failed to delete deadline:', err)
      alert('Failed to delete deadline')
    }
  }

  const openRuleDialog = (rule: AutomationRule | null = null) => {
    if (rule) {
      setEditingRule(rule)
      setRuleFormData({
        name: rule.name,
        description: rule.description,
        trigger: rule.trigger,
        action: rule.action,
        isActive: rule.isActive
      })
    } else {
      setEditingRule(null)
      setRuleFormData({
        name: '',
        description: '',
        trigger: '',
        action: '',
        isActive: true
      })
    }
    setIsRuleDialogOpen(true)
  }

  const closeRuleDialog = () => {
    setIsRuleDialogOpen(false)
    setEditingRule(null)
  }

  const handleSaveRule = async () => {
    try {
      if (editingRule) {
        await api.put(`/api/v1/practice/compliance/automation-rules/${editingRule.id}`, ruleFormData)
      } else {
        await api.post('/api/v1/practice/compliance/automation-rules', ruleFormData)
      }
      await loadComplianceData()
      closeRuleDialog()
      alert(editingRule ? 'Rule updated successfully!' : 'Rule created successfully!')
    } catch (err) {
      console.error('Failed to save rule:', err)
      alert('Failed to save rule')
    }
  }

  const handleDeleteRule = async (id: string) => {
    if (!confirm('Are you sure you want to delete this automation rule?')) return
    try {
      await api.delete(`/api/v1/practice/compliance/automation-rules/${id}`)
      await loadComplianceData()
      alert('Rule deleted successfully!')
    } catch (err) {
      console.error('Failed to delete rule:', err)
      alert('Failed to delete rule')
    }
  }

  const handleToggleRuleStatus = async (id: string, isActive: boolean) => {
    try {
      await api.patch(`/api/v1/practice/compliance/automation-rules/${id}`, { isActive })
      await loadComplianceData()
    } catch (err) {
      console.error('Failed to toggle rule status:', err)
    }
  }

  const calculateStats = () => {
    const activeDeadlines = deadlines.filter(d => d.status !== 'completed').length
    const dueSoon = deadlines.filter(d => d.daysRemaining <= 7 && d.daysRemaining >= 0).length
    const automationRate = automationRules.length > 0 
      ? Math.round((automationRules.filter(r => r.isActive).length / automationRules.length) * 100)
      : 0
    const totalTimeSaved = automationRules.reduce((sum, rule) => {
      const hours = parseFloat(rule.timeSaved.match(/[\d.]+/)?.[0] || '0')
      return sum + hours
    }, 0)
    
    return { activeDeadlines, dueSoon, automationRate, totalTimeSaved }
  }

  const stats = calculateStats()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'due_soon': return 'bg-orange-100 text-orange-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'upcoming': return <Clock className="h-4 w-4 text-blue-600" />
      case 'due_soon': return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-blue-900" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Compliance Management</h2>
          <p className="text-blue-900">Automated compliance monitoring and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSyncNow}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Now
          </Button>
          <Button variant="outline" size="sm" onClick={() => alert('Configure settings')}>
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button size="sm" className="bg-brisk-primary" onClick={handleComplianceCheck}>
            <Shield className="h-4 w-4 mr-2" />
            Compliance Check
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('deadlines')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Active Deadlines</p>
                <p className="text-2xl font-bold">{stats.activeDeadlines}</p>
                <p className="text-xs text-orange-600">{stats.dueSoon} due this week • Click</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('automation')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Automation Rate</p>
                <p className="text-2xl font-bold">{stats.automationRate}%</p>
                <p className="text-xs text-green-600">Click for rules</p>
              </div>
              <Zap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('analytics')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Time Saved</p>
                <p className="text-2xl font-bold">{stats.totalTimeSaved.toFixed(0)}h</p>
                <p className="text-xs text-green-600">This month • Click</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('analytics')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Success Rate</p>
                <p className="text-2xl font-bold">96.2%</p>
                <p className="text-xs text-green-600">On-time filings • Click</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="deadlines" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Compliance Deadlines</CardTitle>
                  <CardDescription>Automated tracking and client communication</CardDescription>
                </div>
                <Button size="sm" onClick={() => openDeadlineDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Deadline
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deadlines.map((deadline) => (
                  <div key={deadline.id} className="p-4 border-2 border-blue-900 rounded-[2px]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(deadline.status)}
                        <div>
                          <h4 className="font-medium">{deadline.type}</h4>
                          <p className="text-sm text-blue-900">{deadline.client}</p>
                          <p className="text-xs text-gray-500">{deadline.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(deadline.priority)}>
                          {deadline.priority}
                        </Badge>
                        <Badge className={getStatusColor(deadline.status)}>
                          {deadline.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4 mb-3">
                      <div>
                        <p className="text-sm font-medium text-blue-900">Due Date</p>
                        <p className="text-sm">{deadline.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-900">Days Remaining</p>
                        <p className={`text-sm font-medium ${
                          deadline.daysRemaining < 0 ? 'text-red-600' :
                          deadline.daysRemaining < 7 ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                          {deadline.daysRemaining < 0 ? `${Math.abs(deadline.daysRemaining)} overdue` : deadline.daysRemaining}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-900">Reminders Sent</p>
                        <p className="text-sm">{deadline.remindersSent}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-900">Automation</p>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={deadline.automationEnabled}
                          />
                          <span className="text-xs text-blue-900">
                            {deadline.automationEnabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        Last action: {deadline.lastAction}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Reminder
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openDeadlineDialog(deadline)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteDeadline(deadline.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-brisk-primary" />
                    Automation Rules
                  </CardTitle>
                  <CardDescription>Configure automated compliance workflows</CardDescription>
                </div>
                <Button size="sm" onClick={() => openRuleDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="p-4 border-2 border-blue-900 rounded-[2px]">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-blue-900 mb-2">{rule.description}</p>
                        <div className="grid gap-2 md:grid-cols-2 text-xs text-gray-500">
                          <div>
                            <span className="font-medium">Trigger:</span> {rule.trigger}
                          </div>
                          <div>
                            <span className="font-medium">Action:</span> {rule.action}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={rule.isActive} 
                          onCheckedChange={(checked) => handleToggleRuleStatus(rule.id, checked)}
                        />
                        <Badge className={rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-1">Success Rate</p>
                        <div className="flex items-center gap-2">
                          <Progress value={rule.successRate} className="flex-1" />
                          <span className="text-sm font-medium text-green-600">{rule.successRate}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-900">Time Saved</p>
                        <p className="text-sm font-semibold text-blue-600">{rule.timeSaved}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => openRuleDialog(rule)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteRule(rule.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-red-600" />
                  HMRC Integration
                </CardTitle>
                <CardDescription>Real-time sync with HMRC services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-[2px]">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-900">Connected</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-900">Last Sync:</span>
                      <span className="font-medium">{hmrcIntegration.lastSync}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-900">Next Sync:</span>
                      <span className="font-medium">{hmrcIntegration.nextSync}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Services</h4>
                    {hmrcIntegration.services.map((service) => (
                      <div key={service.name} className="flex items-center justify-between p-2 border-2 border-blue-900 rounded-[2px]">
                        <div>
                          <span className="text-sm font-medium">{service.name}</span>
                          <p className="text-xs text-gray-500">Last update: {service.lastUpdate}</p>
                        </div>
                        <Switch checked={service.enabled} />
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure HMRC Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  Companies House Integration
                </CardTitle>
                <CardDescription>Automated filing deadline sync</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-[2px]">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-900">Connected</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-900">Last Sync:</span>
                      <span className="font-medium">{companiesHouseIntegration.lastSync}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-900">Next Sync:</span>
                      <span className="font-medium">{companiesHouseIntegration.nextSync}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-900">Filing Alerts:</span>
                      <Badge className="bg-orange-100 text-orange-800">
                        {companiesHouseIntegration.filingAlerts} pending
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-[2px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Auto-Sync Features</span>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Daily deadline updates</li>
                      <li>• Filing status monitoring</li>
                      <li>• Automatic client notifications</li>
                      <li>• Penalty risk alerts</li>
                    </ul>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure CH Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Performance</CardTitle>
                <CardDescription>On-time filing rates and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">VAT Returns</span>
                    <div className="flex items-center gap-2">
                      <Progress value={96} className="w-20" />
                      <span className="text-sm font-medium text-green-600">96%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Corporation Tax</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-20" />
                      <span className="text-sm font-medium text-green-600">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Annual Accounts</span>
                    <div className="flex items-center gap-2">
                      <Progress value={98} className="w-20" />
                      <span className="text-sm font-medium text-green-600">98%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Payroll RTI</span>
                    <div className="flex items-center gap-2">
                      <Progress value={100} className="w-20" />
                      <span className="text-sm font-medium text-green-600">100%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automation Impact</CardTitle>
                <CardDescription>Time and cost savings from automation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-[2px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-900">Time Savings</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">47 hours</p>
                    <p className="text-sm text-green-600">This month</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-[2px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Cost Savings</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">£3,760</p>
                    <p className="text-sm text-blue-600">This month</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-[2px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-900">Efficiency Gain</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-700">34%</p>
                    <p className="text-sm text-purple-600">vs manual process</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Deadline Dialog */}
      <Dialog open={isDeadlineDialogOpen} onOpenChange={setIsDeadlineDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-blue-900">
              {editingDeadline ? 'Edit Deadline' : 'Add Deadline'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-blue-900">Type *</Label>
                <Input
                  value={deadlineFormData.type}
                  onChange={(e) => setDeadlineFormData({ ...deadlineFormData, type: e.target.value })}
                  placeholder="e.g., VAT Return"
                  className="border-blue-900 text-blue-900"
                />
              </div>
              <div>
                <Label className="text-blue-900">Client *</Label>
                <Input
                  value={deadlineFormData.client}
                  onChange={(e) => setDeadlineFormData({ ...deadlineFormData, client: e.target.value })}
                  placeholder="Client name"
                  className="border-blue-900 text-blue-900"
                />
              </div>
            </div>
            <div>
              <Label className="text-blue-900">Description</Label>
              <Input
                value={deadlineFormData.description}
                onChange={(e) => setDeadlineFormData({ ...deadlineFormData, description: e.target.value })}
                placeholder="Brief description"
                className="border-blue-900 text-blue-900"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-blue-900">Due Date *</Label>
                <Input
                  type="date"
                  value={deadlineFormData.dueDate}
                  onChange={(e) => setDeadlineFormData({ ...deadlineFormData, dueDate: e.target.value })}
                  className="border-blue-900 text-blue-900"
                />
              </div>
              <div>
                <Label className="text-blue-900">Priority</Label>
                <Select 
                  value={deadlineFormData.priority}
                  onValueChange={(value: any) => setDeadlineFormData({ ...deadlineFormData, priority: value })}
                >
                  <SelectTrigger className="border-blue-900 text-blue-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={deadlineFormData.automationEnabled}
                onCheckedChange={(checked) => setDeadlineFormData({ ...deadlineFormData, automationEnabled: checked })}
              />
              <Label className="text-blue-900">Enable Automation</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeadlineDialog}>Cancel</Button>
            <Button 
              className="bg-brisk-primary hover:bg-brisk-primary-600"
              onClick={handleSaveDeadline}
              disabled={!deadlineFormData.type || !deadlineFormData.client || !deadlineFormData.dueDate}
            >
              {editingDeadline ? 'Update' : 'Create'} Deadline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Automation Rule Dialog */}
      <Dialog open={isRuleDialogOpen} onOpenChange={setIsRuleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-blue-900">
              {editingRule ? 'Edit Automation Rule' : 'Add Automation Rule'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-blue-900">Rule Name *</Label>
              <Input
                value={ruleFormData.name}
                onChange={(e) => setRuleFormData({ ...ruleFormData, name: e.target.value })}
                placeholder="e.g., VAT Return Reminders"
                className="border-blue-900 text-blue-900"
              />
            </div>
            <div>
              <Label className="text-blue-900">Description</Label>
              <Input
                value={ruleFormData.description}
                onChange={(e) => setRuleFormData({ ...ruleFormData, description: e.target.value })}
                placeholder="Brief description of the rule"
                className="border-blue-900 text-blue-900"
              />
            </div>
            <div>
              <Label className="text-blue-900">Trigger *</Label>
              <Input
                value={ruleFormData.trigger}
                onChange={(e) => setRuleFormData({ ...ruleFormData, trigger: e.target.value })}
                placeholder="e.g., 14, 7, 3 days before due date"
                className="border-blue-900 text-blue-900"
              />
            </div>
            <div>
              <Label className="text-blue-900">Action *</Label>
              <Input
                value={ruleFormData.action}
                onChange={(e) => setRuleFormData({ ...ruleFormData, action: e.target.value })}
                placeholder="e.g., Send email to client and assigned staff"
                className="border-blue-900 text-blue-900"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={ruleFormData.isActive}
                onCheckedChange={(checked) => setRuleFormData({ ...ruleFormData, isActive: checked })}
              />
              <Label className="text-blue-900">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeRuleDialog}>Cancel</Button>
            <Button 
              className="bg-brisk-primary hover:bg-brisk-primary-600"
              onClick={handleSaveRule}
              disabled={!ruleFormData.name || !ruleFormData.trigger || !ruleFormData.action}
            >
              {editingRule ? 'Update' : 'Create'} Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
