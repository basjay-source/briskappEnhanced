import { 
  Calendar, 
  Users, 
  Clock, 
  AlertTriangle, 
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  Circle,
  Pause,
  Mail
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout, { ResponsiveGrid } from '@/components/ResponsiveLayout'
import EmailSystem from '@/components/EmailSystem'

export default function PracticeManagement() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')

  const kpis = [
    {
      title: 'Active Jobs',
      value: '24',
      change: '+12%',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Overdue Tasks',
      value: '3',
      change: '-25%',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'Team Utilization',
      value: '87%',
      change: '+5%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Avg. Completion',
      value: '4.2 days',
      change: '-8%',
      icon: Clock,
      color: 'text-purple-600'
    }
  ]

  const jobs = [
    {
      id: '1',
      title: 'VAT Return Q4 2024',
      client: 'ABC Manufacturing Ltd',
      type: 'VAT Return',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-01-31',
      assignedTo: 'Sarah Johnson',
      progress: 75
    },
    {
      id: '2',
      title: 'Annual Accounts 2023',
      client: 'XYZ Services Ltd',
      type: 'Year End',
      status: 'not_started',
      priority: 'medium',
      dueDate: '2024-02-15',
      assignedTo: 'Mike Chen',
      progress: 0
    },
    {
      id: '3',
      title: 'Payroll Processing',
      client: 'DEF Consulting',
      type: 'Payroll',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-28',
      assignedTo: 'Emma Wilson',
      progress: 100
    }
  ]

  const upcomingDeadlines = [
    { type: 'VAT Return', client: 'ABC Ltd', date: '2024-01-31', days: 3 },
    { type: 'Corporation Tax', client: 'XYZ Corp', date: '2024-02-15', days: 18 },
    { type: 'Payroll RTI', client: 'DEF Ltd', date: '2024-02-05', days: 8 },
    { type: 'Confirmation Statement', client: 'GHI Ltd', date: '2024-02-20', days: 23 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in_progress':
        return <Circle className="h-4 w-4 text-blue-600" />
      case 'on_hold':
        return <Pause className="h-4 w-4 text-brisk-primary" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }


  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
          <div>
            <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Practice Management</h1>
            <p className="text-gray-600 mt-2">Workflow automation, job tracking, compliance management & communications</p>
          </div>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
            <Button variant="outline" className={isMobile ? 'w-full' : ''}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`}>
              <Plus className="h-4 w-4 mr-2" />
              New Job
            </Button>
          </div>
        </div>

        <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-4 border-b`}>
          <div className={`flex ${isMobile ? 'w-full' : ''} gap-2`}>
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('dashboard')}
              className={`${isMobile ? 'flex-1' : ''} ${activeTab === 'dashboard' ? 'bg-brisk-primary' : ''}`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'email' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('email')}
              className={`${isMobile ? 'flex-1' : ''} ${activeTab === 'email' ? 'bg-brisk-primary' : ''}`}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Studio
            </Button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <ResponsiveGrid className={isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}>
            {kpis.map((kpi, index) => {
              const Icon = kpi.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        <p className={`text-sm ${kpi.color}`}>{kpi.change} from last month</p>
                      </div>
                      <Icon className={`h-8 w-8 ${kpi.color}`} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
            </ResponsiveGrid>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          <div className={isMobile ? '' : 'lg:col-span-2'}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Jobs</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search jobs..." className={`pl-10 ${isMobile ? 'w-full' : 'w-64'}`} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                    <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                      {getStatusIcon(job.status)}
                      <div className="flex-1">
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.client}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {job.type}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(job.priority)}`}>
                            {job.priority}
                          </Badge>
                        </div>
                      </div>
                      {isMobile && (
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                      <div>
                        <p className="text-sm font-medium">Due: {job.dueDate}</p>
                        <p className="text-sm text-gray-600">{job.assignedTo}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`bg-gray-200 rounded-full h-2 ${isMobile ? 'w-16' : 'w-20'}`}>
                          <div 
                            className="bg-brisk-primary h-2 rounded-full" 
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{job.progress}%</span>
                      </div>
                    </div>
                    {!isMobile && (
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Critical dates to watch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{deadline.type}</p>
                      <p className="text-sm text-gray-600">{deadline.client}</p>
                      <p className="text-xs text-gray-500">{deadline.date}</p>
                    </div>
                    <Badge 
                      className={`${deadline.days <= 7 ? 'bg-red-100 text-red-800' : 'bg-brisk-primary-50 text-brisk-primary'}`}
                    >
                      {deadline.days} days
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Predictive workflow recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Workload Imbalance Detected</p>
                  <p className="text-xs text-blue-700">Sarah is 120% utilized. Consider reassigning 2 jobs to Mike.</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-orange-900">Deadline Risk Alert</p>
                  <p className="text-xs text-orange-700">3 VAT returns at risk of missing deadline. Recommend priority escalation.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Efficiency Opportunity</p>
                  <p className="text-xs text-green-700">Payroll jobs taking 40% longer than average. Review workflow template.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Capacity</CardTitle>
              <CardDescription>Current week utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sarah Johnson</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '120%' }}></div>
                    </div>
                    <span className="text-xs text-red-600">120%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mike Chen</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-xs text-green-600">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Emma Wilson</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span className="text-xs text-blue-600">90%</span>
                  </div>
                </div>
              </div>
            </CardContent>
            </Card>
          </div>
        </div>
          </>
        )}

        {activeTab === 'email' && (
          <div className="h-[calc(100vh-200px)]">
            <EmailSystem />
          </div>
        )}
      </div>
    </ResponsiveLayout>
  )
}
