import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, Clock, CheckCircle, AlertTriangle, Bell, 
  FileText, RefreshCw, Settings, Zap, Target,
  Building, Mail
} from 'lucide-react'

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

  const [deadlines] = useState<ComplianceDeadline[]>([
    {
      id: 'deadline-1',
      type: 'VAT Return',
      client: 'ABC Manufacturing Ltd',
      description: 'Q4 2023 VAT Return submission',
      dueDate: '2024-02-07',
      daysRemaining: -3,
      status: 'overdue',
      priority: 'critical',
      automationEnabled: true,
      remindersSent: 3,
      lastAction: 'Final reminder sent'
    },
    {
      id: 'deadline-2',
      type: 'Corporation Tax',
      client: 'XYZ Services Ltd',
      description: 'CT600 return for year ending 31/03/2023',
      dueDate: '2024-02-15',
      daysRemaining: 5,
      status: 'due_soon',
      priority: 'high',
      automationEnabled: true,
      remindersSent: 2,
      lastAction: 'Second reminder sent'
    },
    {
      id: 'deadline-3',
      type: 'Annual Accounts',
      client: 'DEF Consulting Ltd',
      description: 'Statutory accounts filing',
      dueDate: '2024-02-28',
      daysRemaining: 18,
      status: 'upcoming',
      priority: 'medium',
      automationEnabled: true,
      remindersSent: 1,
      lastAction: 'Initial reminder sent'
    },
    {
      id: 'deadline-4',
      type: 'Confirmation Statement',
      client: 'GHI Trading Ltd',
      description: 'Annual confirmation statement',
      dueDate: '2024-03-10',
      daysRemaining: 28,
      status: 'upcoming',
      priority: 'low',
      automationEnabled: false,
      remindersSent: 0,
      lastAction: 'None'
    }
  ])

  const [automationRules] = useState<AutomationRule[]>([
    {
      id: 'rule-1',
      name: 'VAT Return Reminders',
      description: 'Automated email reminders for VAT return deadlines',
      trigger: '14, 7, 3 days before due date',
      action: 'Send email to client and assigned staff',
      isActive: true,
      successRate: 94,
      timeSaved: '2.5 hours/month'
    },
    {
      id: 'rule-2',
      name: 'Corporation Tax Alerts',
      description: 'Escalating alerts for CT600 submissions',
      trigger: '30, 14, 7 days before due date',
      action: 'Email + SMS + calendar reminder',
      isActive: true,
      successRate: 89,
      timeSaved: '4 hours/month'
    },
    {
      id: 'rule-3',
      name: 'Companies House Sync',
      description: 'Daily sync with Companies House for filing deadlines',
      trigger: 'Daily at 9:00 AM',
      action: 'Update deadline database + notify changes',
      isActive: true,
      successRate: 98,
      timeSaved: '1 hour/day'
    },
    {
      id: 'rule-4',
      name: 'HMRC Status Updates',
      description: 'Monitor HMRC submission status and update clients',
      trigger: 'After each submission',
      action: 'Check status + send confirmation email',
      isActive: true,
      successRate: 96,
      timeSaved: '30 minutes/submission'
    }
  ])

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
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Compliance Automation</h2>
          <p className="text-gray-600">Automated deadline tracking and client communication</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Now
          </Button>
          <Button size="sm" className="bg-brisk-primary">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deadlines</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-orange-600">3 due this week</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Automation Rate</p>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-xs text-green-600">+2% this month</p>
              </div>
              <Zap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time Saved</p>
                <p className="text-2xl font-bold">47h</p>
                <p className="text-xs text-green-600">This month</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">96.2%</p>
                <p className="text-xs text-green-600">On-time filings</p>
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
              <CardTitle>Compliance Deadlines</CardTitle>
              <CardDescription>Automated tracking and client communication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deadlines.map((deadline) => (
                  <div key={deadline.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(deadline.status)}
                        <div>
                          <h4 className="font-medium">{deadline.type}</h4>
                          <p className="text-sm text-gray-600">{deadline.client}</p>
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
                        <p className="text-sm font-medium text-gray-600">Due Date</p>
                        <p className="text-sm">{deadline.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Days Remaining</p>
                        <p className={`text-sm font-medium ${
                          deadline.daysRemaining < 0 ? 'text-red-600' :
                          deadline.daysRemaining < 7 ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                          {deadline.daysRemaining < 0 ? `${Math.abs(deadline.daysRemaining)} overdue` : deadline.daysRemaining}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Reminders Sent</p>
                        <p className="text-sm">{deadline.remindersSent}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Automation</p>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={deadline.automationEnabled}
                          />
                          <span className="text-xs text-gray-600">
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
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
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
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-brisk-primary" />
                Automation Rules
              </CardTitle>
              <CardDescription>Configure automated compliance workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{rule.description}</p>
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
                        <Switch checked={rule.isActive} />
                        <Badge className={rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Success Rate</p>
                        <div className="flex items-center gap-2">
                          <Progress value={rule.successRate} className="flex-1" />
                          <span className="text-sm font-medium text-green-600">{rule.successRate}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Time Saved</p>
                        <p className="text-sm font-semibold text-blue-600">{rule.timeSaved}</p>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
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
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-900">Connected</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Sync:</span>
                      <span className="font-medium">{hmrcIntegration.lastSync}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Sync:</span>
                      <span className="font-medium">{hmrcIntegration.nextSync}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Services</h4>
                    {hmrcIntegration.services.map((service) => (
                      <div key={service.name} className="flex items-center justify-between p-2 border rounded">
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
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-900">Connected</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Sync:</span>
                      <span className="font-medium">{companiesHouseIntegration.lastSync}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Sync:</span>
                      <span className="font-medium">{companiesHouseIntegration.nextSync}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Filing Alerts:</span>
                      <Badge className="bg-orange-100 text-orange-800">
                        {companiesHouseIntegration.filingAlerts} pending
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
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
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-900">Time Savings</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">47 hours</p>
                    <p className="text-sm text-green-600">This month</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Cost Savings</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">£3,760</p>
                    <p className="text-sm text-blue-600">This month</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
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
    </div>
  )
}
