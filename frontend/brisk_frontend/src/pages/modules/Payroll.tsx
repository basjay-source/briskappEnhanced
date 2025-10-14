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
  Calendar,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Send,
  UserPlus,
  UserMinus
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'
import KPICard from '../../components/KPICard'
import AIPromptSection from '../../components/AIPromptSection'

export default function Payroll() {
  const isMobile = useIsMobile()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPayPeriod, setSelectedPayPeriod] = useState('all')
  
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [showRTIModal, setShowRTIModal] = useState(false)
  const [showCISModal, setShowCISModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  
  const [employees, setEmployees] = useState<any[]>([
    {
      id: '1',
      name: 'John Smith',
      employeeNumber: 'EMP001',
      department: 'Development',
      jobTitle: 'Senior Developer',
      salary: 55000,
      status: 'Active',
      startDate: '2020-01-15',
      niNumber: 'AB123456C',
      email: 'john.smith@company.com',
      phone: '07700 900123'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      employeeNumber: 'EMP002',
      department: 'Marketing',
      jobTitle: 'Marketing Manager',
      salary: 48000,
      status: 'Active',
      startDate: '2021-06-01',
      niNumber: 'CD789012D',
      email: 'sarah.johnson@company.com',
      phone: '07700 900789'
    }
  ])
  
  const [rtiSubmissions, setRTISubmissions] = useState<any[]>([
    {
      id: '1',
      type: 'FPS',
      period: 'December 2024',
      submissionDate: '2024-12-28',
      status: 'Submitted',
      employeeCount: 247
    },
    {
      id: '2',
      type: 'EPS',
      period: 'December 2024',
      submissionDate: '2024-12-28',
      status: 'Accepted',
      employeeCount: 247
    }
  ])
  
  const [cisSubcontractors, setCISSubcontractors] = useState<any[]>([
    {
      id: '1',
      name: 'ABC Construction Ltd',
      utr: '1234567890',
      verificationNumber: 'VERIFY-123456',
      deductionRate: 20,
      status: 'Active'
    }
  ])

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
              <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                <h4 className="font-semibold text-[#001f3f] mb-2">Department Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#001f3f]">Development</span>
                    <span className="font-semibold text-[#001f3f]">89 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#001f3f]">Marketing</span>
                    <span className="font-semibold text-[#001f3f]">45 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#001f3f]">Finance</span>
                    <span className="font-semibold text-[#001f3f]">32 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#001f3f]">HR</span>
                    <span className="font-semibold text-[#001f3f]">18 employees</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                <h4 className="font-semibold text-[#001f3f] mb-2">Employment Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#001f3f]">Full-time</span>
                    <span className="font-semibold text-[#001f3f]">198 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#001f3f]">Part-time</span>
                    <span className="font-semibold text-[#001f3f]">34 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#001f3f]">Contract</span>
                    <span className="font-semibold text-[#001f3f]">15 employees</span>
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
            <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
              <h4 className="font-semibold text-[#001f3f] mb-2">Cost Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#001f3f]">Gross Pay</span>
                  <span className="font-semibold text-[#001f3f]">£980,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#001f3f]">Employer NI</span>
                  <span className="font-semibold text-[#001f3f]">£135,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#001f3f]">Pension Contributions</span>
                  <span className="font-semibold text-[#001f3f]">£85,000</span>
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
            <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
              <h4 className="font-semibold text-[#001f3f] mb-2">Submission History</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#001f3f]">December 2024</span>
                  <Badge variant="default">Submitted</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#001f3f]">November 2024</span>
                  <Badge variant="default">Submitted</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#001f3f]">October 2024</span>
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
            <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
              <h4 className="font-semibold text-[#001f3f] mb-2">Action Items</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#001f3f]">New starter forms</span>
                  <Badge variant="destructive">Urgent</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#001f3f]">Pension opt-outs</span>
                  <Badge variant="secondary">Review</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#001f3f]">Salary adjustments</span>
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
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-[2px]">
                    <div>
                      <p className="font-medium">Monthly Payroll</p>
                      <p className="text-sm text-[#001f3f]">December 2024</p>
                    </div>
                    <Badge variant="outline">Due: 28 Dec</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-[2px]">
                    <div>
                      <p className="font-medium">RTI Submission</p>
                      <p className="text-sm text-[#001f3f]">FPS December</p>
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
          <p className="text-[#001f3f]">Choose from the sub-menu to access payroll processing features</p>
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
                <CardTitle className="text-[#001f3f]">Current Pay Period</CardTitle>
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
                <CardTitle className="text-[#001f3f]">Payroll Checklist</CardTitle>
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

    if (activeMainTab === 'employees' && activeSubTab === 'employee-records') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-[#001f3f]">Employee Records</h3>
            <Button onClick={() => { setEditingItem(null); setShowEmployeeModal(true); }} className="bg-gradient-to-r from-orange-500 to-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Add New Employee
            </Button>
          </div>
          
          <div className="bg-white rounded-[2px] border-2 border-[#001f3f] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#001f3f] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Employee No.</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Department</th>
                  <th className="px-4 py-3 text-left">Job Title</th>
                  <th className="px-4 py-3 text-left">Salary</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => (
                  <tr key={emp.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 text-[#001f3f]">{emp.employeeNumber}</td>
                    <td className="px-4 py-3 font-medium text-[#001f3f]">{emp.name}</td>
                    <td className="px-4 py-3 text-[#001f3f]">{emp.department}</td>
                    <td className="px-4 py-3 text-[#001f3f]">{emp.jobTitle}</td>
                    <td className="px-4 py-3 text-[#001f3f]">£{emp.salary.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge variant={emp.status === 'Active' ? 'default' : 'secondary'}>{emp.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => { setEditingItem(emp); setShowEmployeeModal(true); }}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEmployees(employees.filter(e => e.id !== emp.id))}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    if (activeMainTab === 'rti' && activeSubTab === 'fps') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-[#001f3f]">Full Payment Submission (FPS)</h3>
            <Button onClick={() => setShowRTIModal(true)} className="bg-gradient-to-r from-orange-500 to-orange-600">
              <Send className="h-4 w-4 mr-2" />
              Submit New FPS
            </Button>
          </div>
          
          <div className="bg-white rounded-[2px] border-2 border-[#001f3f] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#001f3f] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Submission Type</th>
                  <th className="px-4 py-3 text-left">Tax Period</th>
                  <th className="px-4 py-3 text-left">Submission Date</th>
                  <th className="px-4 py-3 text-left">Employees</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rtiSubmissions.filter(s => s.type === 'FPS').map((sub, idx) => (
                  <tr key={sub.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium text-[#001f3f]">{sub.type}</td>
                    <td className="px-4 py-3 text-[#001f3f]">{sub.period}</td>
                    <td className="px-4 py-3 text-[#001f3f]">{sub.submissionDate}</td>
                    <td className="px-4 py-3 text-[#001f3f]">{sub.employeeCount}</td>
                    <td className="px-4 py-3">
                      <Badge variant={sub.status === 'Accepted' ? 'default' : 'secondary'}>{sub.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    if (activeMainTab === 'cis' && activeSubTab === 'subcontractors') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-[#001f3f]">CIS Subcontractors</h3>
            <Button onClick={() => setShowCISModal(true)} className="bg-gradient-to-r from-orange-500 to-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Subcontractor
            </Button>
          </div>
          
          <div className="bg-white rounded-[2px] border-2 border-[#001f3f] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#001f3f] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Business Name</th>
                  <th className="px-4 py-3 text-left">UTR</th>
                  <th className="px-4 py-3 text-left">Verification No.</th>
                  <th className="px-4 py-3 text-left">Deduction Rate</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cisSubcontractors.map((cis, idx) => (
                  <tr key={cis.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium text-[#001f3f]">{cis.name}</td>
                    <td className="px-4 py-3 text-[#001f3f]">{cis.utr}</td>
                    <td className="px-4 py-3 text-[#001f3f]">{cis.verificationNumber}</td>
                    <td className="px-4 py-3 text-[#001f3f]">{cis.deductionRate}%</td>
                    <td className="px-4 py-3">
                      <Badge variant={cis.status === 'Active' ? 'default' : 'secondary'}>{cis.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2 text-[#001f3f]">Feature In Progress</h3>
        <p className="text-[#001f3f]">This section is being enhanced with full functionality</p>
      </div>
    )
  }

  return (
    <ResponsiveLayout>
      <div className="flex min-h-screen bg-blue-50">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r-2 border-[#001f3f] flex flex-col">
          <div className="p-4 border-b-2 border-[#001f3f]">
            <h1 className="text-xl font-bold text-[#001f3f]">Payroll</h1>
            <p className="text-sm text-[#001f3f] mt-1">Comprehensive payroll management</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <nav className="space-y-0.5">
              {menuStructure.map((item) => {
                const Icon = item.icon
                const isActive = activeMainTab === item.id
                const isExpanded = expandedCategories.includes(item.id)
                
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => handleMainTabClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all duration-200 shadow-sm ${
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
                    
                    {item.hasSubTabs && isExpanded && (
                      <div className="ml-0.5 mt-0.5 space-y-0.5">
                        {item.subTabs?.map((subTab) => {
                          const isSubActive = activeSubTab === subTab.id
                          return (
                            <button
                              key={subTab.id}
                              onClick={() => handleSubTabClick(subTab.id)}
                              className={`w-full flex items-center px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all duration-200 shadow-sm ${
                                isSubActive 
                                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-l-2 border-orange-300 shadow-md font-semibold' 
                                  : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
                              }`}
                            >
                              <span>{subTab.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b-2 border-[#001f3f] bg-white">
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
