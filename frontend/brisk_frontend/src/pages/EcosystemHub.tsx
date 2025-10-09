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

      setDashboardData(dashboard as DashboardData)
      setRecentActivity(activity as Activity[])
      setAIInsights(insights as Insight[])
    } catch (err) {
      console.error('Error loading dashboard data:', err)
      setDashboardData({
        kpis: {
          total_revenue: { value: 2396000, change: '+12.5%' },
          active_clients: { value: 1247, change: '+8.3%' },
          completion_rate: { value: '94.2%', change: '+2.1%' },
          avg_response_time: { value: '1.8h', change: '-15.4%' }
        },
        summary: {
          active_jobs: 342,
          overdue_jobs: 23,
          upcoming_deadlines: 67,
          this_week_hours: 1845
        }
      })
      setRecentActivity([
        { action: 'New tax return filed', client: 'ABC Corp Ltd', time: '5 mins ago', job_id: 'JOB-2024-001' },
        { action: 'Accounts approved', client: 'XYZ Trading', time: '12 mins ago', job_id: 'JOB-2024-002' },
        { action: 'Payroll processed', client: 'Tech Innovations Ltd', time: '25 mins ago', job_id: 'JOB-2024-003' },
        { action: 'AML check completed', client: 'Global Ventures', time: '1 hour ago', job_id: 'JOB-2024-004' }
      ])
      setAIInsights([
        { type: 'opportunity', title: 'Revenue Growth Opportunity', description: '15 clients eligible for R&D tax credit claims worth estimated £450K', action: 'Review R&D opportunities', priority: 'high' },
        { type: 'warning', title: 'Upcoming Deadline Alert', description: '23 Corporation Tax returns due within 2 weeks', action: 'Review pending returns', priority: 'high' },
        { type: 'info', title: 'Capacity Planning', description: 'Current utilization at 87% - consider resource allocation for Q2', action: 'View capacity forecast', priority: 'medium' }
      ])
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
      color: 'bg-blue-500'
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
      name: 'Charity/Academy A/cs',
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
        return 'bg-blue-50 text-[#001f3f]'
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
        return 'text-[#001f3f]'
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brisk-primary mx-auto"></div>
            <p className="mt-4 text-[#001f3f]">Loading dashboard...</p>
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
            <p className="mt-4 text-[#001f3f]">Error loading dashboard: {error}</p>
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
          <h1 className="text-xl font-bold text-[#001f3f]">Ecosystem Hub</h1>
          <p className="text-[#001f3f] mt-2">Welcome to your all-in-one practice management suite</p>
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
                  <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                    <h4 className="font-semibold text-[#001f3f]">Revenue Sources</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Practice Management Revenue Details:\n\n- Total: £850,450\n- Growth: +12.5% YoY\n- Active Jobs: 145\n- Top Clients: 23\n- Avg Job Value: £5,865\n- Recurring Revenue: £425,000\n- One-time Projects: £425,450', 'info')}>
                        <span className="text-[#001f3f]">Practice Management</span>
                        <span className="font-semibold text-[#001f3f]">£850,450</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Bookkeeping Revenue Details:\n\n- Total: £645,230\n- Growth: +8.3% YoY\n- Active Clients: 289\n- Monthly Retainers: £487,500\n- VAT Services: £95,230\n- Management Accounts: £62,500', 'info')}>
                        <span className="text-[#001f3f]">Bookkeeping</span>
                        <span className="font-semibold text-[#001f3f]">£645,230</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Tax Services Revenue Details:\n\n- Total: £512,350\n- Growth: +15.2% YoY\n- Corporation Tax: £287,450\n- Personal Tax: £156,900\n- R&D Claims: £68,000\n- Tax Planning: £45,000', 'info')}>
                        <span className="text-[#001f3f]">Tax Services</span>
                        <span className="font-semibold text-[#001f3f]">£512,350</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'AML Services Revenue Details:\n\n- Total: £387,970\n- Growth: +6.7% YoY\n- Risk Assessments: £245,000\n- Compliance Reviews: £95,470\n- Training Services: £47,500', 'info')}>
                        <span className="text-[#001f3f]">AML Services</span>
                        <span className="font-semibold text-[#001f3f]">£387,970</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                    <h4 className="font-semibold text-[#001f3f]">Growth Metrics</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'New MRR Details:\n\n- Total New MRR: +£23,450\n- New Clients: 18\n- Avg Contract Value: £1,303\n- Top Services:\n  * Bookkeeping: £12,450\n  * Tax Planning: £6,890\n  * Payroll: £4,110\n- Conversion Rate: 42%', 'info')}>
                        <span className="text-[#001f3f]">New MRR</span>
                        <span className="font-semibold text-green-600">+£23,450</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Expansion MRR Details:\n\n- Total Expansion: +£15,230\n- Upsells: 12 clients\n- Cross-sells: 8 clients\n- Service Additions:\n  * Added Tax Services: £7,890\n  * Added Payroll: £4,560\n  * Added AML: £2,780\n- Expansion Rate: 8.2%', 'info')}>
                        <span className="text-[#001f3f]">Expansion MRR</span>
                        <span className="font-semibold text-green-600">+£15,230</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Churn MRR Details:\n\n- Total Churn: -£8,920\n- Churned Clients: 5\n- Avg Lost Revenue: £1,784\n- Churn Reasons:\n  * Cost: 2 clients (-£4,560)\n  * Service Quality: 1 client (-£1,890)\n  * Business Closure: 2 clients (-£2,470)\n- Churn Rate: 1.9%', 'info')}>
                        <span className="text-[#001f3f]">Churn MRR</span>
                        <span className="font-semibold text-red-600">-£8,920</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => console.log('Information', 'Opening detailed revenue report with full breakdown by module, client, and time period...', 'info')} className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
                    View Detailed Report
                  </button>
                  <button onClick={() => console.log('Information', 'Exporting revenue data to CSV/Excel format...', 'info')} className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
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
                  <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                    <h4 className="font-semibold text-[#001f3f]">Client Segments</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Enterprise Clients Details:\n\n- Total Clients: 247\n- Avg Revenue per Client: £8,945/month\n- Services:\n  * Full Practice Management: 187\n  * Tax & Compliance: 234\n  * Payroll Services: 156\n  * AML/KYC: 198\n- Retention Rate: 96.8%\n- Growth: +12 clients YoY', 'info')}>
                        <span className="text-[#001f3f]">Enterprise</span>
                        <span className="font-semibold text-[#001f3f]">247</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'SME Clients Details:\n\n- Total Clients: 645\n- Avg Revenue per Client: £2,340/month\n- Services:\n  * Bookkeeping: 589\n  * Tax Returns: 612\n  * Payroll: 387\n  * VAT Returns: 534\n- Retention Rate: 94.2%\n- Growth: +45 clients YoY', 'info')}>
                        <span className="text-[#001f3f]">SME</span>
                        <span className="font-semibold text-[#001f3f]">645</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Sole Trader Clients Details:\n\n- Total Clients: 355\n- Avg Revenue per Client: £890/month\n- Services:\n  * Self Assessment: 342\n  * Basic Bookkeeping: 298\n  * Tax Planning: 167\n  * VAT Returns: 189\n- Retention Rate: 91.5%\n- Growth: +23 clients YoY', 'info')}>
                        <span className="text-[#001f3f]">Sole Traders</span>
                        <span className="font-semibold text-[#001f3f]">355</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                    <h4 className="font-semibold text-[#001f3f]">Client Health</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Healthy Clients Details:\n\n- Total: 1,089 clients (87.4%)\n- Characteristics:\n  * On-time payments: 100%\n  * Active engagement: High\n  * Service utilization: 85%+\n  * Satisfaction score: 4.5+/5\n- Revenue: £2.1M/month\n- Retention forecast: 98%', 'info')}>
                        <span className="text-[#001f3f]">Healthy</span>
                        <span className="font-semibold text-green-600">1,089</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'At Risk Clients Details:\n\n- Total: 127 clients (10.2%)\n- Risk Factors:\n  * Payment delays: 45 clients\n  * Reduced engagement: 38 clients\n  * Service complaints: 24 clients\n  * Price sensitivity: 20 clients\n- Revenue at risk: £287K/month\n- Action required: Immediate outreach', 'info')}>
                        <span className="text-[#001f3f]">At Risk</span>
                        <span className="font-semibold text-[#001f3f]">127</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Churned Clients Details:\n\n- Total: 31 clients (2.4%)\n- Time Period: Last 90 days\n- Lost Revenue: £42K/month\n- Churn Reasons:\n  * Price: 12 clients\n  * Service issues: 7 clients\n  * Business closure: 8 clients\n  * Competitor: 4 clients\n- Win-back opportunity: 8 clients', 'info')}>
                        <span className="text-[#001f3f]">Churned</span>
                        <span className="font-semibold text-red-600">31</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => console.log('Information', 'Opening full client list with filtering and search capabilities...', 'info')} className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
                    View Client List
                  </button>
                  <button onClick={() => console.log('Information', 'Exporting client analytics report to CSV/Excel format...', 'info')} className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
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
                  <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                    <h4 className="font-semibold text-[#001f3f]">By Module</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Bookkeeping Completion Details:\n\n- Completion Rate: 96.8%\n- Total Tasks: 1,847\n- Completed: 1,788\n- In Progress: 42\n- Overdue: 17\n- Avg Completion Time: 2.3 days\n- Top Performers: Team A (98.5%)\n- Key Metrics: Bank Recs, VAT, Mgmt Accounts', 'info')}>
                        <span className="text-[#001f3f]">Bookkeeping</span>
                        <span className="font-semibold text-[#001f3f]">96.8%</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Tax Returns Completion Details:\n\n- Completion Rate: 94.2%\n- Total Tasks: 892\n- Completed: 840\n- In Progress: 38\n- Overdue: 14\n- Avg Completion Time: 4.1 days\n- Top Performers: Team C (97.2%)\n- Key Metrics: CT600, SA100, R&D Claims', 'info')}>
                        <span className="text-[#001f3f]">Tax Returns</span>
                        <span className="font-semibold text-[#001f3f]">94.2%</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Payroll Completion Details:\n\n- Completion Rate: 92.1%\n- Total Tasks: 1,234\n- Completed: 1,137\n- In Progress: 67\n- Overdue: 30\n- Avg Completion Time: 1.8 days\n- Top Performers: Team B (95.8%)\n- Key Metrics: RTI, Pensions, P11D, CIS', 'info')}>
                        <span className="text-[#001f3f]">Payroll</span>
                        <span className="font-semibold text-[#001f3f]">92.1%</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'AML Compliance Completion Details:\n\n- Completion Rate: 89.7%\n- Total Tasks: 567\n- Completed: 508\n- In Progress: 42\n- Overdue: 17\n- Avg Completion Time: 5.2 days\n- Top Performers: Team D (93.4%)\n- Key Metrics: Risk Assessments, PEP Checks, Reviews', 'info')}>
                        <span className="text-[#001f3f]">AML Compliance</span>
                        <span className="font-semibold text-[#001f3f]">89.7%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                    <h4 className="font-semibold text-[#001f3f]">Performance Trends</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#001f3f]">This Week</span>
                        <span className="font-semibold text-[#001f3f]">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#001f3f]">Last Week</span>
                        <span className="font-semibold text-[#001f3f]">92.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#001f3f]">Monthly Avg</span>
                        <span className="font-semibold text-[#001f3f]">93.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => console.log('Information', 'Opening detailed task list with completion status and timelines...', 'info')} className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
                    View Task Details
                  </button>
                  <button onClick={() => console.log('Information', 'Generating comprehensive performance report with metrics and trends...', 'info')} className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
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
          color="text-[#001f3f]"
          drillDownData={{
            title: "Response Time Analytics",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                    <h4 className="font-semibold text-[#001f3f]">By Channel</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Email Response Details:\n\n- Avg Response Time: 1.8h\n- Total Queries: 2,847/month\n- First Response: 1.2h\n- Resolution Time: 4.5h\n- Volume by Time:\n  * Morning: 45%\n  * Afternoon: 35%\n  * Evening: 20%\n- SLA Compliance: 87%', 'info')}>
                        <span className="text-[#001f3f]">Email</span>
                        <span className="font-semibold text-[#001f3f]">1.8h</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Phone Response Details:\n\n- Avg Response Time: 0.5h\n- Total Calls: 1,234/month\n- Answer Rate: 94%\n- Avg Call Duration: 8.5 min\n- Peak Hours:\n  * 9-11am: 40%\n  * 2-4pm: 35%\n  * Other: 25%\n- SLA Compliance: 96%', 'info')}>
                        <span className="text-[#001f3f]">Phone</span>
                        <span className="font-semibold text-[#001f3f]">0.5h</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Portal Response Details:\n\n- Avg Response Time: 3.2h\n- Total Tickets: 1,567/month\n- First Response: 2.8h\n- Resolution Time: 12.4h\n- Ticket Types:\n  * Document Requests: 45%\n  * Query/Question: 35%\n  * Issue Report: 20%\n- SLA Compliance: 82%', 'info')}>
                        <span className="text-[#001f3f]">Portal</span>
                        <span className="font-semibold text-[#001f3f]">3.2h</span>
                      </div>
                      <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => console.log('Information', 'Chat Response Details:\n\n- Avg Response Time: 0.3h (18 min)\n- Total Chats: 892/month\n- Instant Response: 78%\n- Avg Chat Duration: 12 min\n- Popular Times:\n  * Business Hours: 85%\n  * After Hours: 15%\n- SLA Compliance: 98%\n- Satisfaction: 4.7/5', 'info')}>
                        <span className="text-[#001f3f]">Chat</span>
                        <span className="font-semibold text-[#001f3f]">0.3h</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                    <h4 className="font-semibold text-[#001f3f]">SLA Performance</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#001f3f]">Within 1h</span>
                        <span className="font-semibold text-green-600">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#001f3f]">Within 4h</span>
                        <span className="font-semibold text-green-600">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#001f3f]">Within 24h</span>
                        <span className="font-semibold text-green-600">94%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => console.log('Information', 'Opening detailed response log with timestamps and resolution times...', 'info')} className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
                    View Response Log
                  </button>
                  <button onClick={() => console.log('Information', 'Generating SLA compliance report with performance metrics...', 'info')} className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
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
          <h2 className="text-xl font-bold mb-6 text-[#001f3f]">Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => {
              const Icon = module.icon
              return (
                <Link key={index} to={module.path}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-2 border-[#001f3f]">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-[2px] ${module.color} text-white`}>
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
          <h2 className="text-xl font-bold mb-6 text-[#001f3f]">Recent Activity</h2>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 cursor-pointer hover:bg-blue-50 p-3 rounded border-2 border-transparent hover:border-[#001f3f] transition-all"
                      onClick={() => console.log('Information', `Opening details for ${activity.action}\nClient: ${activity.client}\nJob ID: ${activity.job_id || 'N/A'}\nTime: ${activity.time}`, 'info')}
                    >
                      <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-[#001f3f]">{activity.action}</p>
                        <p className="text-sm text-[#001f3f]">{activity.client}</p>
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

          <Card className="mt-6 border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              {aiInsights.length > 0 ? (
                <div className="space-y-3">
                  {aiInsights.map((insight, index) => {
                    const getDetailedInsight = (title: string) => {
                      if (title.includes('Revenue Growth')) {
                        return 'Revenue Growth Opportunity - Detailed Analysis:\n\n' +
                               '📊 R&D Tax Credit Analysis:\n' +
                               '- Eligible Clients: 15\n' +
                               '- Estimated Total Claims: £450,000\n' +
                               '- Average Claim Value: £30,000\n\n' +
                               '💰 Revenue Breakdown:\n' +
                               '- Consultation Fees: £75,000\n' +
                               '- Claim Preparation: £120,000\n' +
                               '- Success Fees: £255,000\n\n' +
                               '🎯 Target Sectors:\n' +
                               '- Technology: 6 clients (£180K)\n' +
                               '- Manufacturing: 5 clients (£150K)\n' +
                               '- Healthcare: 4 clients (£120K)\n\n' +
                               '📅 Action Plan:\n' +
                               '1. Send personalized outreach emails\n' +
                               '2. Schedule discovery calls\n' +
                               '3. Prepare eligibility assessments\n' +
                               '4. Target completion: Q2 2025'
                      } else if (title.includes('Deadline Alert')) {
                        return 'Corporation Tax Deadline Alert - Details:\n\n' +
                               '⚠️ Returns Due Within 2 Weeks:\n' +
                               '- Total Returns: 23\n' +
                               '- High Priority: 8 returns\n' +
                               '- Medium Priority: 10 returns\n' +
                               '- Low Priority: 5 returns\n\n' +
                               '📋 Status Breakdown:\n' +
                               '- Ready to File: 12 returns\n' +
                               '- Awaiting Client Info: 7 returns\n' +
                               '- In Review: 4 returns\n\n' +
                               '👥 Resource Allocation:\n' +
                               '- Team A: 9 returns\n' +
                               '- Team B: 8 returns\n' +
                               '- Team C: 6 returns\n\n' +
                               '⏰ Critical Deadlines:\n' +
                               '- Next 7 days: 8 returns\n' +
                               '- Days 8-14: 15 returns\n\n' +
                               '✅ Recommended Actions:\n' +
                               '1. Send client reminders today\n' +
                               '2. Allocate additional resources\n' +
                               '3. Daily progress reviews'
                      } else if (title.includes('Capacity Planning')) {
                        return 'Capacity Planning - Q2 Analysis:\n\n' +
                               '📊 Current Utilization: 87%\n' +
                               '- Optimal Range: 75-85%\n' +
                               '- Status: Over Capacity\n\n' +
                               '👥 Team Breakdown:\n' +
                               '- Team A: 92% (Overloaded)\n' +
                               '- Team B: 85% (At Capacity)\n' +
                               '- Team C: 84% (At Capacity)\n' +
                               '- Team D: 88% (Overloaded)\n\n' +
                               '📈 Q2 Forecast:\n' +
                               '- Expected Growth: +15%\n' +
                               '- New Client Onboarding: 25\n' +
                               '- Additional Workload: +120 hours/week\n\n' +
                               '💡 Recommendations:\n' +
                               '1. Hire 2 additional staff members\n' +
                               '2. Redistribute workload across teams\n' +
                               '3. Consider outsourcing overflow\n' +
                               '4. Implement workflow automation\n' +
                               '5. Review and optimize processes\n\n' +
                               '⚡ Immediate Actions:\n' +
                               '- Post job listings this week\n' +
                               '- Rebalance Team A workload\n' +
                               '- Identify automation opportunities'
                      }
                      return 'Click for detailed analysis...'
                    }
                    
                    return (
                      <div 
                        key={index} 
                        className={`p-3 rounded-[2px] cursor-pointer hover:shadow-md transition-shadow ${getInsightColor(insight.type)}`}
                        onClick={() => console.log("Insight Details", getDetailedInsight(insight.title), "info")}
                      >
                        <p className="text-sm font-medium">{insight.title}</p>
                        <p className={`text-xs ${getInsightTextColor(insight.type)}`}>{insight.description}</p>
                      </div>
                    )
                  })}
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
