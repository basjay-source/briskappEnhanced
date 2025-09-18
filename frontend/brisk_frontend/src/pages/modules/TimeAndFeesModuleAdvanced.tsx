import { useState, useEffect } from 'react'
import { 
  Clock, 
  Play, 
  Pause, 
  Square, 
  Plus,
  CheckCircle,
  Circle,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Timer,
  BarChart3,
  Target,
  Brain,
  Zap,
  Settings,
  AlertTriangle,
  Lightbulb,
  Globe,
  Workflow,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResponsiveGrid } from '@/components/ResponsiveLayout'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'
import KPICard from '../../components/KPICard'
import AIPromptSection from '../../components/AIPromptSection'

export default function TimeAndFeesModuleAdvanced() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [selectedJob, setSelectedJob] = useState('')
  const [selectedTask, setSelectedTask] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProjectStatus, setSelectedProjectStatus] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      hasSubTabs: false
    },
    {
      id: 'time-tracking',
      label: 'Time Tracking',
      icon: Timer,
      hasSubTabs: true,
      subTabs: [
        { id: 'timer', label: 'Smart Timer', icon: Play },
        { id: 'entries', label: 'Time Entries', icon: Clock },
        { id: 'timesheets', label: 'Timesheets', icon: Calendar }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      hasSubTabs: true,
      subTabs: [
        { id: 'performance', label: 'Performance', icon: TrendingUp },
        { id: 'utilization', label: 'Utilization', icon: Target },
        { id: 'profitability', label: 'Profitability', icon: DollarSign }
      ]
    },
    {
      id: 'ai-insights',
      label: 'AI Insights',
      icon: Brain,
      hasSubTabs: false
    },
    {
      id: 'automation',
      label: 'Automation',
      icon: Zap,
      hasSubTabs: true,
      subTabs: [
        { id: 'workflows', label: 'Workflows', icon: Workflow },
        { id: 'rules', label: 'Rules', icon: Settings },
        { id: 'integrations', label: 'Integrations', icon: Globe }
      ]
    },
    {
      id: 'capacity',
      label: 'Capacity Planning',
      icon: Users,
      hasSubTabs: false
    }
  ]

  const handleMainTabClick = (tabId: string) => {
    setActiveMainTab(tabId)
    const tab = menuStructure.find(t => t.id === tabId)
    if (tab?.hasSubTabs && tab.subTabs && tab.subTabs.length > 0) {
      setActiveSubTab(tab.subTabs[0].id)
    } else {
      setActiveSubTab('')
    }
  }

  const handleSubTabClick = (subTabId: string) => {
    setActiveSubTab(subTabId)
  }

  const kpis = [
    {
      title: 'Total Hours This Week',
      value: '156.5',
      change: '+8%',
      icon: Clock,
      color: 'text-blue-600',
      trend: 'up'
    },
    {
      title: 'Billable Hours',
      value: '124.2',
      change: '+12%',
      icon: DollarSign,
      color: 'text-green-600',
      trend: 'up'
    },
    {
      title: 'Utilization Rate',
      value: '87%',
      change: '+5%',
      icon: Target,
      color: 'text-purple-600',
      trend: 'up'
    },
    {
      title: 'Revenue This Month',
      value: '£45,200',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-orange-600',
      trend: 'up'
    }
  ]

  const aiInsights = [
    {
      type: 'optimization',
      title: 'Optimize Team Allocation',
      description: 'Sarah Johnson has 15% higher efficiency on tax returns. Consider reallocating similar tasks.',
      impact: 'high',
      actionable: true
    },
    {
      type: 'warning',
      title: 'Capacity Alert',
      description: 'Team will reach 95% capacity by next week. Consider hiring or outsourcing.',
      impact: 'medium',
      actionable: true
    }
  ]

  const timeEntries = [
    {
      id: '1',
      jobTitle: 'ABC Manufacturing - Year End Accounts',
      clientName: 'ABC Manufacturing Ltd',
      description: 'Trial balance review and adjustments',
      hours: 3.5,
      hourlyRate: 125,
      date: '2024-01-15',
      status: 'approved' as const,
      employeeName: 'Sarah Johnson'
    },
    {
      id: '2',
      jobTitle: 'XYZ Services - VAT Return Q4',
      clientName: 'XYZ Services Ltd',
      description: 'VAT return preparation and submission',
      hours: 2.0,
      hourlyRate: 95,
      date: '2024-01-15',
      status: 'submitted' as const,
      employeeName: 'Mike Chen'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'submitted': return <Clock className="h-4 w-4 text-blue-600" />
      case 'draft': return <Circle className="h-4 w-4 text-gray-400" />
      default: return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case 'opportunity': return <Lightbulb className="h-4 w-4 text-blue-600" />
      default: return <Brain className="h-4 w-4 text-gray-600" />
    }
  }

  const getInsightColor = (impact: string): string => {
    switch (impact) {
      case 'high': return 'bg-red-50 border-red-200'
      case 'medium': return 'bg-orange-50 border-orange-200'
      case 'low': return 'bg-blue-50 border-blue-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = () => setIsTimerRunning(true)
  const pauseTimer = () => setIsTimerRunning(false)
  const stopTimer = () => {
    setIsTimerRunning(false)
    setCurrentTime(0)
  }

  const logTime = () => {
    if (currentTime > 0 && selectedJob) {
      console.log('Logging time:', { jobId: selectedJob, hours: (currentTime / 3600).toFixed(2) })
      setCurrentTime(0)
      setIsTimerRunning(false)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => setCurrentTime(prev => prev + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const renderMainContent = () => {
    if (activeMainTab === 'dashboard') {
      return (
        <div className="space-y-6">
          <SearchFilterHeader
            searchPlaceholder="Search projects, timesheets, clients..."
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            filters={[
              {
                label: 'Project Status',
                value: selectedProjectStatus,
                onChange: setSelectedProjectStatus,
                options: [
                  { label: 'All Status', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Completed', value: 'completed' }
                ]
              }
            ]}
            dateRange={{
              from: dateFrom,
              to: dateTo,
              onFromChange: setDateFrom,
              onToChange: setDateTo
            }}
          />

          <ResponsiveGrid>
            {kpis.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </ResponsiveGrid>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Recent Time Entries
                </CardTitle>
                <CardDescription>Latest time tracking activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{entry.jobTitle}</h4>
                          {getStatusIcon(entry.status)}
                          <Badge className={getStatusColor(entry.status)}>
                            {entry.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{entry.clientName}</p>
                        <p className="text-sm text-gray-500">{entry.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{entry.hours}h</p>
                        <p className="text-sm text-gray-500">{entry.employeeName}</p>
                        <p className="text-sm text-green-600">£{(entry.hours * entry.hourlyRate).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Insights
                </CardTitle>
                <CardDescription>Intelligent recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className={`p-3 border rounded-lg ${getInsightColor(insight.impact)}`}>
                      <div className="flex items-start gap-2">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{insight.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                          {insight.actionable && (
                            <Button size="sm" variant="outline" className="mt-2">
                              Take Action
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <AIPromptSection
            title="Ask your Time Management Adviser"
            description="Get expert guidance on time tracking and billing optimization"
            placeholder="Ask about time tracking best practices, billing rates, automation opportunities..."
            recentQuestions={[
              "How can I optimize my team's utilization rates?",
              "What's the best way to track project profitability?",
              "How do I set up automated time tracking rules?"
            ]}
            onSubmit={(question: string) => console.log('Time management question:', question)}
          />
        </div>
      )
    } else if (activeMainTab === 'time-tracking') {
      if (activeSubTab === 'timer') {
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-blue-600" />
                  Smart Timer
                </CardTitle>
                <CardDescription>AI-powered time tracking with automatic job detection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-mono font-bold text-gray-900 mb-4">
                      {formatTime(currentTime)}
                    </div>
                    <div className="flex justify-center gap-4">
                      {!isTimerRunning ? (
                        <Button onClick={startTimer} size="lg" className="bg-green-600 hover:bg-green-700">
                          <Play className="h-5 w-5 mr-2" />
                          Start
                        </Button>
                      ) : (
                        <Button onClick={pauseTimer} size="lg" variant="outline">
                          <Pause className="h-5 w-5 mr-2" />
                          Pause
                        </Button>
                      )}
                      <Button onClick={stopTimer} size="lg" variant="outline">
                        <Square className="h-5 w-5 mr-2" />
                        Stop
                      </Button>
                      {currentTime > 0 && (
                        <Button onClick={logTime} size="lg" className="bg-blue-600 hover:bg-blue-700">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Log Time
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job/Project</label>
                      <select
                        value={selectedJob}
                        onChange={(e) => setSelectedJob(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a job...</option>
                        <option value="J001">ACC-001 - Year End Accounts</option>
                        <option value="J002">VAT-001 - VAT Return</option>
                        <option value="J003">PAY-001 - Payroll Processing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Task (Optional)</label>
                      <select
                        value={selectedTask}
                        onChange={(e) => setSelectedTask(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a task...</option>
                        <option value="task1">Trial Balance Review</option>
                        <option value="task2">Adjustments & Reclassifications</option>
                        <option value="task3">Final Review</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      } else {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Time Entries</CardTitle>
              <CardDescription>Manage and review time tracking entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Time Entry Management</h3>
                <p className="text-gray-600">Review and manage time tracking entries</p>
              </div>
            </CardContent>
          </Card>
        )
      }
    } else if (activeMainTab === 'analytics') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>Performance metrics and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Advanced analytics and performance tracking</p>
            </div>
          </CardContent>
        </Card>
      )
    } else if (activeMainTab === 'ai-insights') {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI-Powered Insights
            </CardTitle>
            <CardDescription>Intelligent analysis and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className={`p-4 border rounded-lg ${getInsightColor(insight.impact)}`}>
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-gray-600 mt-1">{insight.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant={insight.impact === 'high' ? 'destructive' : insight.impact === 'medium' ? 'default' : 'secondary'}>
                          {insight.impact} impact
                        </Badge>
                        {insight.actionable && (
                          <Button size="sm" variant="outline">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )
    } else if (activeMainTab === 'automation') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Automation Hub</CardTitle>
            <CardDescription>Configure automated workflows and rules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Automation Center</h3>
              <p className="text-gray-600">Set up automated time tracking and billing workflows</p>
            </div>
          </CardContent>
        </Card>
      )
    } else if (activeMainTab === 'capacity') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Capacity Planning</CardTitle>
            <CardDescription>Plan and optimize team capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Capacity Management</h3>
              <p className="text-gray-600">Optimize team capacity and resource planning</p>
            </div>
          </CardContent>
        </Card>
      )
    }

    return <div>Select a tab to view content</div>
  }

  return (
    <div className="flex min-h-screen bg-blue-50">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Time Management</h1>
          <p className="text-sm text-gray-600 mt-1">AI-powered time tracking & billing</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuStructure.map((tab) => (
            <div key={tab.id}>
              <button
                onClick={() => handleMainTabClick(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                  activeMainTab === tab.id 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.hasSubTabs && <ChevronRight className="h-4 w-4" />}
              </button>
              
              {tab.hasSubTabs && activeMainTab === tab.id && tab.subTabs && (
                <div className="ml-6 mt-1 space-y-1">
                  {tab.subTabs.map((subTab) => (
                    <button
                      key={subTab.id}
                      onClick={() => handleSubTabClick(subTab.id)}
                      className={`w-full flex items-center px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                        activeSubTab === subTab.id 
                          ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-l-2 border-orange-300 shadow-md font-semibold' 
                          : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
                      }`}
                    >
                      <subTab.icon className="h-4 w-4 mr-2" />
                      <span>{subTab.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {menuStructure.find(t => t.id === activeMainTab)?.label || 'Dashboard'}
              </h2>
              <p className="text-gray-600 mt-1">
                AI-powered time tracking, advanced analytics, and intelligent workflow automation
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Brain className="h-4 w-4 mr-2" />
                AI Insights
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Time Entry
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {renderMainContent()}
        </div>
      </div>
    </div>
  )
}
