import { 
  Users, 
  Calculator, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  PoundSterling,
  Play,
  ChevronLeft,
  BarChart3,
  Shield,
  Building,
  Calendar
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'
import { HorizontalSubmenu } from '../../components/HorizontalSubmenu'
import KPICard from '../../components/KPICard'
import AIPromptSection from '../../components/AIPromptSection'

export default function Payroll() {
  const isMobile = useIsMobile()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['processing'])
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPayPeriod, setSelectedPayPeriod] = useState('all')

  const departmentOptions = [
    { label: 'All Departments', value: 'all' },
    { label: 'Development', value: 'development' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Finance', value: 'finance' },
    { label: 'HR', value: 'hr' }
  ]

  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'On Leave', value: 'on-leave' },
    { label: 'Terminated', value: 'terminated' }
  ]

  const payPeriodOptions = [
    { label: 'All Pay Periods', value: 'all' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Bi-weekly', value: 'bi-weekly' },
    { label: 'Monthly', value: 'monthly' }
  ]

  const handleAIQuestion = async (question: string) => {
    setIsAILoading(true)
    try {
      console.log('AI Question:', question)
    } catch (error) {
      console.error('Error asking AI:', error)
    } finally {
      setIsAILoading(false)
    }
  }

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      hasSubTabs: false
    },
    {
      id: 'processing',
      label: 'Payroll Processing',
      icon: Calculator,
      hasSubTabs: true,
      subTabs: [
        { id: 'run-payroll', label: 'Run Payroll' },
        { id: 'payslips', label: 'Payslips' },
        { id: 'adjustments', label: 'Adjustments' },
        { id: 'approvals', label: 'Approvals' }
      ]
    },
    {
      id: 'employees',
      label: 'Employee Management',
      icon: Users,
      hasSubTabs: true,
      subTabs: [
        { id: 'employee-records', label: 'Employee Records' },
        { id: 'starters-leavers', label: 'Starters & Leavers' },
        { id: 'benefits', label: 'Benefits & Deductions' },
        { id: 'timesheets', label: 'Timesheets' }
      ]
    },
    {
      id: 'rti',
      label: 'RTI Submissions',
      icon: FileText,
      hasSubTabs: true,
      subTabs: [
        { id: 'fps', label: 'Full Payment Submission' },
        { id: 'eps', label: 'Employer Payment Summary' },
        { id: 'earlier-year', label: 'Earlier Year Updates' },
        { id: 'submission-history', label: 'Submission History' }
      ]
    },
    {
      id: 'pensions',
      label: 'Auto Enrolment',
      icon: Shield,
      hasSubTabs: true,
      subTabs: [
        { id: 'ae-assessment', label: 'AE Assessment' },
        { id: 'contributions', label: 'Contributions' },
        { id: 'opt-outs', label: 'Opt Outs' },
        { id: 'provider-files', label: 'Provider Files' }
      ]
    },
    {
      id: 'cis',
      label: 'CIS Processing',
      icon: Building,
      hasSubTabs: true,
      subTabs: [
        { id: 'subcontractors', label: 'Subcontractors' },
        { id: 'verification', label: 'Verification' },
        { id: 'deductions', label: 'Deductions' },
        { id: 'monthly-returns', label: 'Monthly Returns' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: TrendingUp,
      hasSubTabs: true,
      subTabs: [
        { id: 'payroll-reports', label: 'Payroll Reports' },
        { id: 'statutory-reports', label: 'Statutory Reports' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'custom-reports', label: 'Custom Reports' }
      ]
    }
  ]

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleMainTabClick = (tabId: string) => {
    setActiveMainTab(tabId)
    setActiveSubTab('')
    
    const category = menuStructure.find(cat => cat.id === tabId)
    if (category?.hasSubTabs && !expandedCategories.includes(tabId)) {
      toggleCategory(tabId)
    }
  }

  const handleSubTabClick = (subTabId: string) => {
    setActiveSubTab(subTabId)
  }

  function renderHorizontalSubmenus() {
    const currentTabConfig = menuStructure.find(item => item.id === activeMainTab)
    if (!currentTabConfig || !currentTabConfig.hasSubTabs || !currentTabConfig.subTabs) {
      return null
    }
    
    return (
      <HorizontalSubmenu
        subTabs={currentTabConfig.subTabs}
        activeSubTab={activeSubTab}
        onSubTabClick={(subTabId) => handleSubTabClick(subTabId)}
      />
    )
  }

  const kpis = [
    {
      title: 'Active Employees',
      value: '247',
      change: '+12 this month',
      icon: Users,
      color: 'text-blue-600',
      drillDownData: {
        title: 'Employee Analysis',
        description: 'Detailed breakdown of active employees',
        content: (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Department Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Development</span>
                    <span className="font-semibold">89 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketing</span>
                    <span className="font-semibold">45 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finance</span>
                    <span className="font-semibold">32 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HR</span>
                    <span className="font-semibold">18 employees</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Employment Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Full-time</span>
                    <span className="font-semibold">198 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Part-time</span>
                    <span className="font-semibold">34 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contract</span>
                    <span className="font-semibold">15 employees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Monthly Payroll',
      value: '£1.2M',
      change: '+5.2% vs last month',
      icon: PoundSterling,
      color: 'text-green-600',
      drillDownData: {
        title: 'Payroll Analysis',
        description: 'Monthly payroll breakdown and trends',
        content: (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Cost Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Gross Pay</span>
                  <span className="font-semibold">£980,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Employer NI</span>
                  <span className="font-semibold">£135,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Pension Contributions</span>
                  <span className="font-semibold">£85,000</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: 'RTI Submissions',
      value: '98.5%',
      change: 'On-time rate',
      icon: FileText,
      color: 'text-green-600',
      drillDownData: {
        title: 'RTI Compliance',
        description: 'Real Time Information submission status',
        content: (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Submission History</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>December 2024</span>
                  <Badge variant="default">Submitted</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>November 2024</span>
                  <Badge variant="default">Submitted</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>October 2024</span>
                  <Badge variant="default">Submitted</Badge>
                </div>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Pending Actions',
      value: '7',
      change: '3 urgent',
      icon: AlertCircle,
      color: 'text-orange-600',
      drillDownData: {
        title: 'Pending Actions',
        description: 'Outstanding payroll tasks requiring attention',
        content: (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Action Items</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>New starter forms</span>
                  <Badge variant="destructive">Urgent</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pension opt-outs</span>
                  <Badge variant="secondary">Review</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Salary adjustments</span>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  ]

  const renderMainContent = () => {
    if (activeMainTab === 'dashboard') {
      return (
        <div className="space-y-6">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            {kpis.map((kpi, index) => {
              const Icon = kpi.icon
              return (
                <KPICard
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  icon={Icon}
                  color={kpi.color}
                  drillDownData={kpi.drillDownData}
                />
              )
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Payroll Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Monthly Payroll</p>
                      <p className="text-sm text-gray-600">December 2024</p>
                    </div>
                    <Badge variant="outline">Due: 28 Dec</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">RTI Submission</p>
                      <p className="text-sm text-gray-600">FPS December</p>
                    </div>
                    <Badge variant="secondary">Due: 19 Jan</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Payroll Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Monthly Cost</span>
                      <span className="font-semibold">£1.15M</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Employee Satisfaction</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance Score</span>
                      <span className="font-semibold">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    if (activeMainTab === 'processing' && !activeSubTab) {
      return (
        <div className="text-center py-8">
          <Calculator className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Select a Payroll Processing Option</h3>
          <p className="text-gray-600">Choose from the sub-menu to access payroll processing features</p>
        </div>
      )
    }

    if (activeMainTab === 'processing' && activeSubTab === 'run-payroll') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Run Payroll</h3>
            <Button>
              <Play className="h-4 w-4 mr-2" />
              Start Payroll Run
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Pay Period</CardTitle>
                <CardDescription>December 2024 - Monthly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Employees to Process</span>
                    <span className="font-semibold">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Gross Pay</span>
                    <span className="font-semibold">£980,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <Badge variant="secondary">Ready to Process</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payroll Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Timesheets approved</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Expenses processed</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-orange-600 mr-2" />
                    <span className="text-sm">Salary adjustments pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">Content Coming Soon</h3>
        <p className="text-gray-600">This section is under development</p>
      </div>
    )
  }

  return (
    <ResponsiveLayout>
      <div className="flex min-h-screen bg-blue-50">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Payroll</h1>
            <p className="text-sm text-gray-600 mt-1">Comprehensive payroll management</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {menuStructure.map((item) => {
                const Icon = item.icon
                const isActive = activeMainTab === item.id
                const isExpanded = expandedCategories.includes(item.id)
                
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => handleMainTabClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold' 
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-2" />
                        <span>{item.label}</span>
                      </div>
                      {item.hasSubTabs && (
                        <ChevronLeft className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      )}
                    </button>
                    
                  </div>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <SearchFilterHeader
              searchPlaceholder="Search employees, payslips, or submissions..."
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              filters={[
                {
                  label: "Department",
                  options: departmentOptions,
                  value: selectedDepartment,
                  onChange: setSelectedDepartment
                },
                {
                  label: "Status",
                  options: statusOptions,
                  value: selectedStatus,
                  onChange: setSelectedStatus
                },
                {
                  label: "Pay Period",
                  options: payPeriodOptions,
                  value: selectedPayPeriod,
                  onChange: setSelectedPayPeriod
                }
              ]}
            />
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {renderHorizontalSubmenus()}
            {renderMainContent()}
          </div>
        </div>
      </div>
      
      <AIPromptSection
        title="Ask your HR Adviser"
        description="Get expert HR and payroll guidance"
        placeholder="Ask about payroll processing, employee benefits, compliance..."
        isLoading={isAILoading}
        onSubmit={handleAIQuestion}
        recentQuestions={[
          "How do I process monthly payroll?",
          "What are the pension auto-enrollment requirements?",
          "How do I handle statutory sick pay?"
        ]}
      />
    </ResponsiveLayout>
  )
}
