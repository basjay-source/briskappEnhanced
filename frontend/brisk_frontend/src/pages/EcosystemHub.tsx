import { Link } from 'react-router-dom'
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
  AlertTriangle,
  Settings,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function EcosystemHub() {
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
      color: 'bg-orange-500'
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
      name: 'Charity & Academy Accounts',
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

  const kpis = [
    {
      title: 'Active Jobs',
      value: '24',
      change: '+12%',
      icon: Briefcase,
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
      title: 'This Week Hours',
      value: '156',
      change: '+8%',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Revenue MTD',
      value: '£45,200',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ]

  const recentActivity = [
    { action: 'VAT return completed', client: 'ABC Ltd', time: '2 hours ago' },
    { action: 'Payroll run processed', client: 'XYZ Corp', time: '4 hours ago' },
    { action: 'Annual accounts filed', client: 'DEF Ltd', time: '1 day ago' },
    { action: 'R&D claim submitted', client: 'GHI Tech', time: '2 days ago' }
  ]

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ecosystem Hub</h1>
          <p className="text-gray-600 mt-2">Welcome to your all-in-one practice management suite</p>
        </div>
        <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
          <Link to="/app/practice" className="flex items-center gap-2">
            View Practice Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <p className={`text-sm ${kpi.color}`}>{kpi.change} from last week</p>
                  </div>
                  <Icon className={`h-8 w-8 ${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => {
              const Icon = module.icon
              return (
                <Link key={index} to={module.path}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg ${module.color} text-white`}>
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
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brisk-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.client}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">3 clients at risk of missing SA deadline</p>
                  <p className="text-xs text-blue-700">Consider sending reminder emails</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">R&D claims available for 2 clients</p>
                  <p className="text-xs text-green-700">Potential tax savings: £15,000</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
