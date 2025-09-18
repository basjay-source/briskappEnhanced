import { useState } from 'react'
import { 
  Settings, 
  Users, 
  CreditCard, 
  BarChart3, 
  Shield, 
  Database, 
  Flag, 
  TestTube, 
  FileText,
  Activity,
  Building,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Gift,
  Download
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import KPICard from '../../components/KPICard'
import { DataGrid } from '../../components/DataGrid'
import AIPromptSection from '../../components/AIPromptSection'

export default function EnterpriseAdmin() {
  const [activeMainTab, setActiveMainTab] = useState('overview')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [isAILoading, setIsAILoading] = useState(false)

  const handleAIQuestion = async (question: string) => {
    setIsAILoading(true)
    try {
      console.log('Enterprise Admin AI Question:', question)
    } catch (error) {
      console.error('Error asking AI:', error)
    } finally {
      setIsAILoading(false)
    }
  }

  interface SubTabItem {
    label: string
    icon: any
  }

  interface MenuStructureItem {
    label: string
    icon: any
    hasSubTabs: boolean
    subTabs?: Record<string, SubTabItem>
  }

  const menuStructure: Record<string, MenuStructureItem> = {
    overview: { label: 'Overview', icon: BarChart3, hasSubTabs: false },
    catalog: { 
      label: 'Catalog & Pricing', 
      icon: DollarSign, 
      hasSubTabs: true,
      subTabs: {
        plans: { label: 'Plans & Pricing', icon: CreditCard },
        features: { label: 'Feature Catalog', icon: Settings },
        addons: { label: 'Add-ons & Modules', icon: Database }
      }
    },
    promotions: { label: 'Promotions', icon: Gift, hasSubTabs: false },
    experiments: { 
      label: 'Experiments & Flags', 
      icon: TestTube, 
      hasSubTabs: true,
      subTabs: {
        experiments: { label: 'A/B Experiments', icon: TestTube },
        flags: { label: 'Feature Flags', icon: Flag },
        rollouts: { label: 'Rollout Management', icon: TrendingUp }
      }
    },
    tenants: { 
      label: 'Tenants & Subscriptions', 
      icon: Building, 
      hasSubTabs: true,
      subTabs: {
        tenants: { label: 'Tenant Management', icon: Building },
        subscriptions: { label: 'Subscriptions', icon: CreditCard },
        usage: { label: 'Usage Monitoring', icon: Activity }
      }
    },
    billing: { 
      label: 'Invoices & Dunning', 
      icon: FileText, 
      hasSubTabs: true,
      subTabs: {
        invoices: { label: 'Invoice Management', icon: FileText },
        dunning: { label: 'Dunning & Collections', icon: AlertTriangle },
        revenue: { label: 'Revenue Analytics', icon: TrendingUp }
      }
    },
    partners: { 
      label: 'Partners & Referrals', 
      icon: Users, 
      hasSubTabs: true,
      subTabs: {
        partners: { label: 'Partner Management', icon: Users },
        referrals: { label: 'Referral Program', icon: TrendingUp },
        commissions: { label: 'Commission Tracking', icon: DollarSign }
      }
    },
    growth: { 
      label: 'Growth Journeys', 
      icon: TrendingUp, 
      hasSubTabs: true,
      subTabs: {
        onboarding: { label: 'Onboarding Flows', icon: Users },
        activation: { label: 'User Activation', icon: CheckCircle },
        retention: { label: 'Retention Campaigns', icon: Clock }
      }
    },
    settings: { 
      label: 'Settings', 
      icon: Settings, 
      hasSubTabs: true,
      subTabs: {
        general: { label: 'General Settings', icon: Settings },
        security: { label: 'Security & Compliance', icon: Shield },
        integrations: { label: 'Integrations', icon: Database }
      }
    },
    audit: { label: 'Audit Log', icon: Shield, hasSubTabs: false }
  }

  const kpis = [
    {
      title: 'Total Tenants',
      value: '1,247',
      change: '+12.5% from last month',
      color: 'text-green-600',
      icon: Building
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '£124,750',
      change: '+8.3% from last month',
      color: 'text-green-600',
      icon: DollarSign
    },
    {
      title: 'Active Subscriptions',
      value: '1,156',
      change: '+5.2% from last month',
      color: 'text-green-600',
      icon: CreditCard
    },
    {
      title: 'Churn Rate',
      value: '2.1%',
      change: '-0.5% from last month',
      color: 'text-green-600',
      icon: TrendingUp
    },
    {
      title: 'Support Tickets',
      value: '23',
      change: '-15.2% from last week',
      color: 'text-green-600',
      icon: AlertTriangle
    },
    {
      title: 'System Uptime',
      value: '99.97%',
      change: '+0.02% from last month',
      color: 'text-green-600',
      icon: Activity
    }
  ]

  const tenantData = [
    {
      id: '1',
      name: 'Hartwell Accounting Ltd',
      domain: 'hartwell.brisk.app',
      plan: 'Professional',
      status: 'active',
      users: 12,
      mrr: 299,
      created: '2024-01-15',
      lastActive: '2024-01-20'
    },
    {
      id: '2',
      name: 'Smith & Partners',
      domain: 'smith.brisk.app',
      plan: 'Enterprise',
      status: 'active',
      users: 25,
      mrr: 599,
      created: '2024-01-10',
      lastActive: '2024-01-20'
    },
    {
      id: '3',
      name: 'Green Tax Solutions',
      domain: 'green.brisk.app',
      plan: 'Starter',
      status: 'trial',
      users: 3,
      mrr: 0,
      created: '2024-01-18',
      lastActive: '2024-01-19'
    }
  ]

  const tenantColumns = [
    { id: 'name', label: 'Tenant Name', sortable: true, type: 'text' as const },
    { id: 'domain', label: 'Domain', sortable: true, type: 'text' as const },
    { id: 'plan', label: 'Plan', sortable: true, type: 'text' as const },
    { id: 'status', label: 'Status', sortable: true, type: 'status' as const },
    { id: 'users', label: 'Users', sortable: true, type: 'number' as const },
    { id: 'mrr', label: 'MRR', sortable: true, type: 'currency' as const },
    { id: 'created', label: 'Created', sortable: true, type: 'date' as const },
    { id: 'lastActive', label: 'Last Active', sortable: true, type: 'date' as const },
    { id: 'actions', label: 'Actions', type: 'actions' as const }
  ]

  const renderContent = () => {
    switch (activeMainTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpis.map((kpi, index) => (
                <KPICard key={index} {...kpi} />
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-brisk-card border-brisk-navy-blue">
                <CardHeader>
                  <CardTitle className="text-brisk-blue-700">Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-brisk-blue-500">
                    Revenue Chart Placeholder
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-brisk-card border-brisk-navy-blue">
                <CardHeader>
                  <CardTitle className="text-brisk-blue-700">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-brisk-blue-50 rounded-brisk-button">
                      <CheckCircle className="h-4 w-4 text-white" />
                      <span className="text-sm">New tenant onboarded: Hartwell Accounting</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-brisk-orange-50 rounded-brisk-button">
                      <AlertTriangle className="h-4 w-4 text-white" />
                      <span className="text-sm">Payment failed: Smith and Partners</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-brisk-blue-50 rounded-brisk-button">
                      <Activity className="h-4 w-4 text-white" />
                      <span className="text-sm">Feature flag updated: advanced-reporting</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      
      case 'tenants':
        if (activeSubTab === 'tenants' || !activeSubTab) {
          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-brisk-blue-900">Tenant Management</h2>
                <Button className="bg-gradient-to-r from-brisk-orange-500 to-brisk-orange-600 text-white shadow-brisk-button hover:shadow-brisk-button-active text-shadow-brisk-etched rounded-brisk-button">
                  <Building className="h-4 w-4 mr-2 text-white" />
                  Add New Tenant
                </Button>
              </div>
              
              <DataGrid
                columns={tenantColumns}
                data={tenantData}
                searchPlaceholder="Search tenants..."
                filters={[
                  {
                    label: 'Plan',
                    value: 'plan',
                    options: [
                      { label: 'Starter', value: 'starter' },
                      { label: 'Professional', value: 'professional' },
                      { label: 'Enterprise', value: 'enterprise' }
                    ]
                  },
                  {
                    label: 'Status',
                    value: 'status',
                    options: [
                      { label: 'Active', value: 'active' },
                      { label: 'Trial', value: 'trial' },
                      { label: 'Suspended', value: 'suspended' }
                    ]
                  }
                ]}
                bulkActions={[
                  { label: 'Suspend', value: 'suspend', icon: AlertTriangle },
                  { label: 'Export', value: 'export', icon: Download }
                ]}
                onRowClick={(row) => console.log('View tenant:', row)}
                onEdit={(row) => console.log('Edit tenant:', row)}
                onView={(row) => console.log('View tenant details:', row)}
              />
            </div>
          )
        }
        return <div>Other tenant sub-tabs</div>
      
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-brisk-blue-700 mb-2">
              {menuStructure[activeMainTab]?.label || 'Module'} Coming Soon
            </h3>
            <p className="text-brisk-blue-500">
              This section is under development and will be available soon.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-64 bg-white shadow-lg border-r border-brisk-navy-blue">
          <div className="p-6 border-b border-brisk-navy-blue">
            <h1 className="text-xl font-bold text-brisk-blue-900">Enterprise Admin</h1>
            <p className="text-sm text-brisk-blue-600 mt-1">System Management</p>
          </div>
          
          <nav className="p-4 space-y-2">
            {Object.entries(menuStructure).map(([key, item]) => (
              <div key={key}>
                <button
                  onClick={() => {
                    setActiveMainTab(key)
                    setActiveSubTab('')
                  }}
                  className={`w-full flex items-center gap-3 p-3 transition-all duration-200 group relative overflow-hidden ${
                    activeMainTab === key
                      ? 'bg-gradient-to-r from-brisk-orange-500 to-brisk-orange-600 text-white shadow-brisk-button-active text-shadow-brisk-etched rounded-brisk-button'
                      : 'bg-gradient-to-r from-brisk-blue-500 to-brisk-blue-600 text-white hover:from-brisk-blue-600 hover:to-brisk-blue-700 shadow-brisk-button text-shadow-brisk-etched rounded-brisk-button hover:shadow-brisk-button-active'
                  } focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-transparent mb-2`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0 drop-shadow-sm text-white" />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-semibold text-sm leading-tight">{item.label}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:animate-brisk-sheen"></div>
                </button>
                
                {item.hasSubTabs && activeMainTab === key && item.subTabs && (
                  <div className="ml-4 space-y-1">
                    {Object.entries(item.subTabs).map(([subKey, subItem]) => {
                      const SubIcon = subItem.icon
                      return (
                        <button
                          key={subKey}
                          onClick={() => setActiveSubTab(subKey)}
                          className={`w-full flex items-center gap-2 p-2 text-sm transition-all duration-200 rounded-lg ${
                            activeSubTab === subKey
                              ? 'bg-brisk-orange-100 text-brisk-orange-700 border border-brisk-orange-300'
                              : 'text-brisk-blue-600 hover:bg-brisk-blue-50 hover:text-brisk-blue-700'
                          }`}
                        >
                          <SubIcon className="h-4 w-4 text-white" />
                          {subItem.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <div className="p-6">
            {renderContent()}
          </div>
          
          <div className="mt-8 border-t border-brisk-navy-blue p-6">
            <AIPromptSection
              description="Get help with enterprise administration, tenant management, billing, and system configuration."
              placeholder="Ask about tenant setup, billing issues, feature flags, or system administration..."
              recentQuestions={[
                "How do I set up a new tenant with custom branding?",
                "What are the current subscription limits?",
                "How do I configure feature flags for gradual rollout?",
                "Show me the audit trail for recent admin actions"
              ]}
              onSubmit={handleAIQuestion}
              isLoading={isAILoading}
              agentType="general"
              capabilities={[
                "Tenant Management",
                "Billing & Subscriptions", 
                "Feature Flags",
                "System Administration",
                "Audit & Compliance",
                "Usage Analytics"
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
