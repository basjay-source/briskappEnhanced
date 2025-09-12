import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import InvoiceTemplateManager from '../../components/InvoiceTemplateManager';
import AIPromptSection from '../../components/AIPromptSection';
import KPICard from '../../components/KPICard';
import { SearchFilterHeader } from '../../components/SearchFilterHeader';
import { useIsMobile } from '../../hooks/use-mobile';
import {
  BarChart3,
  Users,
  CreditCard,
  Target,
  Flag,
  Building,
  FileText,
  TrendingUp,
  Settings,
  Shield,
  Eye,
  Edit,
  Plus,
  Play,
  Download,
  RefreshCw,
  Activity,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

const AdminModule = () => {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState('overview');
  const [isAILoading, setIsAILoading] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);

  const handleAIQuestion = async () => {
    setIsAILoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setIsAILoading(false);
    }
  };

  const kpiData = [
    { title: 'Monthly Recurring Revenue', value: '£847,230', change: '+12.3% vs last month', trend: 'up' },
    { title: 'Annual Recurring Revenue', value: '£10.2M', change: '+18.7% vs last year', trend: 'up' },
    { title: 'Net Revenue Retention', value: '118%', change: '+3.2% vs last quarter', trend: 'up' },
    { title: 'Churn Rate', value: '2.1%', change: '-0.8% vs last month', trend: 'down' },
    { title: 'Active Trials', value: '247', change: '+15.4% vs last month', trend: 'up' },
    { title: 'Dunning Queue', value: '23', change: '-12 vs yesterday', trend: 'down' }
  ];

  const tenants = [
    { id: 'tn_001', name: 'Acme Accounting Ltd', plan: 'Enterprise', status: 'active', mrr: 2450, seats: 25, region: 'GB' },
    { id: 'tn_002', name: 'Smith & Partners', plan: 'Professional', status: 'trial', mrr: 890, seats: 8, region: 'US' },
    { id: 'tn_003', name: 'Global Finance Corp', plan: 'Enterprise', status: 'past_due', mrr: 4200, seats: 45, region: 'EU' }
  ];

  const plans = [
    { id: 'plan_starter_v1_2', name: 'Starter', version: '1.2', status: 'active', tenants: 1247, mrr: 124700 },
    { id: 'plan_pro_v1_5', name: 'Professional', version: '1.5', status: 'active', tenants: 892, mrr: 267600 },
    { id: 'plan_enterprise_v2_1', name: 'Enterprise', version: '2.1', status: 'active', tenants: 156, mrr: 468000 }
  ];

  const promotions = [
    { id: 'SPRING25', name: 'Spring Promotion', type: 'percent', value: 25, status: 'active', redemptions: 1247 },
    { id: 'WINBACK60', name: 'Win-back Campaign', type: 'free_months', value: 2, status: 'scheduled', redemptions: 0 }
  ];

  const experiments = [
    { id: 'exp_trial_14vs21', name: 'Trial Duration Test', status: 'running', variants: 2, exposure: 5420, winner: null },
    { id: 'exp_pricing_tiers', name: 'Pricing Tier Optimization', status: 'concluded', variants: 3, exposure: 12450, winner: 'variant_b' },
    { id: 'exp_onboarding_flow', name: 'Onboarding Flow A/B', status: 'draft', variants: 2, exposure: 0, winner: null }
  ];

  const invoices = [
    { id: 'inv_001', tenant: 'Acme Accounting Ltd', amount: 2450, status: 'paid', due_date: '2025-01-15' },
    { id: 'inv_002', tenant: 'Smith & Partners', amount: 890, status: 'open', due_date: '2025-01-20' },
    { id: 'inv_003', tenant: 'Global Finance Corp', amount: 4200, status: 'past_due', due_date: '2025-01-10' }
  ];

  const partners = [
    { id: 'partner_001', name: 'Channel Partner UK', tier: 'Gold', margin: 15, tenants: 45, revenue: 125000 },
    { id: 'partner_002', name: 'Reseller Network EU', tier: 'Silver', margin: 12, tenants: 28, revenue: 89000 }
  ];

  const referrals = [
    { id: 'ref_001', referrer: 'Acme Accounting Ltd', referee: 'New Client Co', status: 'converted', reward: 500 },
    { id: 'ref_002', referrer: 'Smith & Partners', referee: 'Startup Inc', status: 'pending', reward: 250 }
  ];

  const growthJourneys = [
    { id: 'journey_001', name: 'Trial Activation', trigger: 'trial_day_3', actions: 3, active: true, conversions: 156 },
    { id: 'journey_002', name: 'Feature Adoption', trigger: 'module_not_used', actions: 2, active: true, conversions: 89 }
  ];

  const approvalRequests = [
    { id: 'req_001', type: 'refund', amount: 5000, status: 'pending', requester: 'Support Admin' },
    { id: 'req_002', type: 'plan_change', description: 'Bulk plan migration', status: 'pending', requester: 'RevOps' }
  ];

  const auditLogs = [
    { id: 'audit_001', actor: 'admin@brisk.com', action: 'subscription.cancel', entity: 'tn_003', timestamp: '2025-01-15T10:30:00Z' },
    { id: 'audit_002', actor: 'billing@brisk.com', action: 'invoice.void', entity: 'inv_004', timestamp: '2025-01-15T09:15:00Z' }
  ];

  const adminPersonas = [
    {
      id: 'org_owner',
      name: 'Org Owner',
      permissions: ['*'],
      scopes: { tenant_id: '*', region: '*', environment: '*', action: '*', sensitivity: 'high' },
      dual_control: false,
      description: 'Full system access with all permissions'
    },
    {
      id: 'billing_admin',
      name: 'Billing Admin',
      permissions: ['billing.*', 'invoices.*', 'subscriptions.*', 'promotions.*'],
      scopes: { tenant_id: '*', region: '*', environment: 'prod', action: 'billing.*', sensitivity: 'medium' },
      dual_control: true,
      description: 'Billing operations with dual-control for high-value actions'
    },
    {
      id: 'revops',
      name: 'RevOps',
      permissions: ['analytics.*', 'experiments.*', 'catalog.*', 'pricing.*'],
      scopes: { tenant_id: '*', region: '*', environment: '*', action: 'analytics.*', sensitivity: 'medium' },
      dual_control: true,
      description: 'Revenue operations and experimentation management'
    },
    {
      id: 'partner_manager',
      name: 'Partner Manager',
      permissions: ['partners.*', 'referrals.*', 'commissions.*'],
      scopes: { tenant_id: 'partner.*', region: '*', environment: 'prod', action: 'partner.*', sensitivity: 'low' },
      dual_control: false,
      description: 'Partner and referral program management'
    },
    {
      id: 'support_admin',
      name: 'Support Admin',
      permissions: ['tenants.read', 'subscriptions.read', 'invoices.read', 'support.*'],
      scopes: { tenant_id: '*', region: '*', environment: 'prod', action: 'support.*', sensitivity: 'low' },
      dual_control: true,
      description: 'Customer support with limited modification rights'
    },
    {
      id: 'auditor',
      name: 'Read-only Auditor',
      permissions: ['audit.*', '*.read'],
      scopes: { tenant_id: '*', region: '*', environment: '*', action: 'read', sensitivity: 'high' },
      dual_control: false,
      description: 'Read-only access for compliance and auditing'
    },
    {
      id: 'feature_flag_operator',
      name: 'Feature Flag Operator',
      permissions: ['flags.*', 'experiments.read'],
      scopes: { tenant_id: '*', region: '*', environment: '*', action: 'flags.*', sensitivity: 'medium' },
      dual_control: true,
      description: 'Feature flag and experiment management'
    },
    {
      id: 'data_steward',
      name: 'Data Steward',
      permissions: ['data.*', 'exports.*', 'privacy.*'],
      scopes: { tenant_id: '*', region: '*', environment: '*', action: 'data.*', sensitivity: 'high' },
      dual_control: true,
      description: 'Data governance and privacy compliance'
    }
  ];

  const renderLeftRail = () => (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Admin Control</h2>
        <p className="text-sm text-gray-600">Multi-tenant management</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'catalog', label: 'Catalog & Pricing', icon: CreditCard },
          { id: 'promotions', label: 'Promotions', icon: Target },
          { id: 'experiments', label: 'Experiments & Flags', icon: Flag },
          { id: 'tenants', label: 'Tenants & Subscriptions', icon: Building },
          { id: 'invoices', label: 'Invoices & Dunning', icon: FileText },
          { id: 'partners', label: 'Partners & Referrals', icon: Users },
          { id: 'growth', label: 'Growth Journeys', icon: TrendingUp },
          { id: 'templates', label: 'Templates', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings },
          { id: 'audit', label: 'Audit Log', icon: Shield }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );

  const renderOverview = () => {
    const drillDownData = {
      title: 'Revenue Analytics',
      description: 'Comprehensive revenue breakdown and analysis',
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Revenue Sources</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subscriptions</span>
                  <span className="font-semibold">£789,450</span>
                </div>
                <div className="flex justify-between">
                  <span>Usage Overages</span>
                  <span className="font-semibold">£45,230</span>
                </div>
                <div className="flex justify-between">
                  <span>Add-ons</span>
                  <span className="font-semibold">£12,550</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Growth Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>New MRR</span>
                  <span className="font-semibold text-green-600">+£23,450</span>
                </div>
                <div className="flex justify-between">
                  <span>Expansion MRR</span>
                  <span className="font-semibold text-green-600">+£15,230</span>
                </div>
                <div className="flex justify-between">
                  <span>Churn MRR</span>
                  <span className="font-semibold text-red-600">-£8,920</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setShowApprovalDialog(true)}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Pending Approvals ({approvalRequests.length})
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              icon={DollarSign}
              color="text-blue-600"
              drillDownData={drillDownData}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest admin actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-gray-600">{log.actor}</p>
                    </div>
                    <Badge variant="outline">{new Date(log.timestamp).toLocaleTimeString()}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Platform performance and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>API Response Time</span>
                  <Badge variant="secondary">145ms</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Database Performance</span>
                  <Badge variant="secondary">Optimal</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active Connections</span>
                  <Badge variant="secondary">2,847</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Error Rate</span>
                  <Badge variant="secondary">0.02%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Pending Approval Requests</DialogTitle>
              <DialogDescription>
                Review and approve high-risk administrative actions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {approvalRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{request.type}</h4>
                    <Badge variant="secondary">{request.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {request.type === 'refund' ? `Refund request: £${request.amount}` : request.description}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Reject</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderCatalogPricing = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Catalog & Pricing</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Catalog
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Plan Version
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KPICard
          title="Active Plans"
          value={plans.filter(p => p.status === 'active').length.toString()}
          change="+1 this quarter"
          icon={CreditCard}
          color="text-blue-600"
          drillDownData={{
            title: 'Plan Portfolio',
            description: 'Plan distribution and performance metrics',
            content: (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Plan Distribution</h4>
                    {plans.map(plan => (
                      <div key={plan.id} className="flex justify-between py-1">
                        <span>{plan.name}</span>
                        <span className="font-semibold">{plan.tenants} tenants</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Revenue by Plan</h4>
                    {plans.map(plan => (
                      <div key={plan.id} className="flex justify-between py-1">
                        <span>{plan.name}</span>
                        <span className="font-semibold">£{plan.mrr.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          }}
        />
        <KPICard
          title="Total MRR"
          value={`£${plans.reduce((sum, p) => sum + p.mrr, 0).toLocaleString()}`}
          change="+15.2% vs last month"
          icon={DollarSign}
          color="text-green-600"
          drillDownData={{
            title: 'MRR Analysis',
            description: 'Monthly recurring revenue breakdown',
            content: <div>MRR drill-down content</div>
          }}
        />
        <KPICard
          title="Plan Versions"
          value="12"
          change="2 scheduled for release"
          icon={Flag}
          color="text-orange-600"
          drillDownData={{
            title: 'Version Management',
            description: 'Plan version lifecycle and scheduling',
            content: <div>Version management content</div>
          }}
        />
      </div>

      <SearchFilterHeader
        searchPlaceholder="Search plans..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={[
          {
            label: 'Status',
            options: [
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'scheduled', label: 'Scheduled' },
              { value: 'deprecated', label: 'Deprecated' }
            ],
            value: selectedStatus,
            onChange: setSelectedStatus
          }
        ]}
        dateRange={{
          from: dateFrom,
          to: dateTo,
          onFromChange: setDateFrom,
          onToChange: setDateTo
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Plan Catalog</CardTitle>
          <CardDescription>Manage pricing plans and versions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <Badge variant="outline">v{plan.version}</Badge>
                    <Badge variant={plan.status === 'active' ? 'default' : 'secondary'}>
                      {plan.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {plan.tenants} tenants • £{plan.mrr.toLocaleString()} MRR
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPromotions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Promotions & Coupons</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Performance
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Promotion
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KPICard
          title="Active Promotions"
          value={promotions.filter(p => p.status === 'active').length.toString()}
          change="+2 this month"
          icon={Target}
          color="text-blue-600"
          drillDownData={{
            title: 'Promotion Performance',
            description: 'Active promotion metrics and redemption rates',
            content: <div>Promotion performance content</div>
          }}
        />
        <KPICard
          title="Total Redemptions"
          value={promotions.reduce((sum, p) => sum + p.redemptions, 0).toLocaleString()}
          change="+23.4% vs last month"
          icon={Activity}
          color="text-green-600"
          drillDownData={{
            title: 'Redemption Analysis',
            description: 'Detailed redemption patterns and trends',
            content: <div>Redemption analysis content</div>
          }}
        />
        <KPICard
          title="Revenue Impact"
          value="£45,230"
          change="Discount given this month"
          icon={DollarSign}
          color="text-orange-600"
          drillDownData={{
            title: 'Revenue Impact',
            description: 'Promotion impact on revenue and margins',
            content: <div>Revenue impact content</div>
          }}
        />
      </div>

      <SearchFilterHeader
        searchPlaceholder="Search promotions..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={[
          {
            label: 'Status',
            options: [
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'scheduled', label: 'Scheduled' },
              { value: 'expired', label: 'Expired' }
            ],
            value: selectedStatus,
            onChange: setSelectedStatus
          }
        ]}
        dateRange={{
          from: dateFrom,
          to: dateTo,
          onFromChange: setDateFrom,
          onToChange: setDateTo
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Promotion Management</CardTitle>
          <CardDescription>Manage promotional campaigns and coupon codes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {promotions.map((promo) => (
              <div key={promo.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{promo.name}</h3>
                    <Badge variant="outline">{promo.id}</Badge>
                    <Badge variant={promo.status === 'active' ? 'default' : 'secondary'}>
                      {promo.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {promo.type === 'percent' ? `${promo.value}% discount` : `${promo.value} free months`} • 
                    {promo.redemptions} redemptions
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderExperiments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Experiments & Feature Flags</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Experiment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KPICard
          title="Running Experiments"
          value={experiments.filter(e => e.status === 'running').length.toString()}
          change="2 concluded this week"
          icon={Flag}
          color="text-blue-600"
          drillDownData={{
            title: 'Experiment Status',
            description: 'Current experiment pipeline and results',
            content: <div>Experiment status content</div>
          }}
        />
        <KPICard
          title="Total Exposure"
          value={experiments.reduce((sum, e) => sum + e.exposure, 0).toLocaleString()}
          change="+1,247 this week"
          icon={Users}
          color="text-green-600"
          drillDownData={{
            title: 'Exposure Analysis',
            description: 'User exposure across all experiments',
            content: <div>Exposure analysis content</div>
          }}
        />
        <KPICard
          title="Conversion Lift"
          value="12.3%"
          change="Average across concluded tests"
          icon={TrendingUp}
          color="text-orange-600"
          drillDownData={{
            title: 'Conversion Impact',
            description: 'Experiment impact on key metrics',
            content: <div>Conversion impact content</div>
          }}
        />
      </div>

      <SearchFilterHeader
        searchPlaceholder="Search experiments..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={[
          {
            label: 'Status',
            options: [
              { value: 'all', label: 'All Status' },
              { value: 'draft', label: 'Draft' },
              { value: 'running', label: 'Running' },
              { value: 'concluded', label: 'Concluded' }
            ],
            value: selectedStatus,
            onChange: setSelectedStatus
          }
        ]}
        dateRange={{
          from: dateFrom,
          to: dateTo,
          onFromChange: setDateFrom,
          onToChange: setDateTo
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Experiment Management</CardTitle>
          <CardDescription>A/B tests and feature flag management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experiments.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{exp.name}</h3>
                    <Badge variant={exp.status === 'running' ? 'default' : 'secondary'}>
                      {exp.status}
                    </Badge>
                    {exp.winner && <Badge variant="outline">Winner: {exp.winner}</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {exp.variants} variants • {exp.exposure.toLocaleString()} exposed users
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {exp.status === 'running' && (
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTenants = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tenants & Subscriptions</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Tenants
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Tenant
          </Button>
        </div>
      </div>

      <SearchFilterHeader
        searchPlaceholder="Search tenants..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={[
          {
            label: 'Status',
            options: [
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'trial', label: 'Trial' },
              { value: 'past_due', label: 'Past Due' },
              { value: 'suspended', label: 'Suspended' }
            ],
            value: selectedStatus,
            onChange: setSelectedStatus
          }
        ]}
        dateRange={{
          from: dateFrom,
          to: dateTo,
          onFromChange: setDateFrom,
          onToChange: setDateTo
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Tenant Management</CardTitle>
          <CardDescription>Manage customer subscriptions and entitlements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tenants.map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{tenant.name}</h3>
                    <Badge variant="outline">{tenant.plan}</Badge>
                    <Badge variant={
                      tenant.status === 'active' ? 'default' : 
                      tenant.status === 'trial' ? 'secondary' : 'destructive'
                    }>
                      {tenant.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    £{tenant.mrr} MRR • {tenant.seats} seats • {tenant.region}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>RBAC Configuration</CardTitle>
            <CardDescription>Role-based access control settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adminPersonas.slice(0, 4).map((persona) => (
                <div key={persona.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{persona.name}</h4>
                    <p className="text-sm text-gray-600">{persona.description}</p>
                  </div>
                  <Badge variant={persona.dual_control ? 'destructive' : 'secondary'}>
                    {persona.dual_control ? 'Dual Control' : 'Single Control'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>Platform-wide settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Audit Retention</span>
                <Badge variant="outline">7 years</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Residency</span>
                <Badge variant="outline">EU/UK</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Encryption</span>
                <Badge variant="outline">AES-256</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Backup Frequency</span>
                <Badge variant="outline">Every 6 hours</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderInvoicesDunning = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Invoices & Dunning</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Invoices
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KPICard
          title="Outstanding Invoices"
          value={invoices.filter(i => i.status !== 'paid').length.toString()}
          change="-3 vs yesterday"
          icon={FileText}
          color="text-orange-600"
          drillDownData={{
            title: 'Invoice Status',
            description: 'Breakdown of invoice statuses and aging',
            content: <div>Invoice status content</div>
          }}
        />
        <KPICard
          title="Dunning Queue"
          value="23"
          change="12 resolved today"
          icon={AlertTriangle}
          color="text-red-600"
          drillDownData={{
            title: 'Dunning Analysis',
            description: 'Failed payment recovery and retry status',
            content: <div>Dunning analysis content</div>
          }}
        />
        <KPICard
          title="Collection Rate"
          value="94.2%"
          change="+1.3% vs last month"
          icon={TrendingUp}
          color="text-green-600"
          drillDownData={{
            title: 'Collection Performance',
            description: 'Payment collection efficiency metrics',
            content: <div>Collection performance content</div>
          }}
        />
      </div>

      <div className="space-y-6">
          <SearchFilterHeader
            searchPlaceholder="Search invoices..."
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            filters={[
              {
                label: 'Status',
                options: [
                  { value: 'all', label: 'All Status' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'open', label: 'Open' },
                  { value: 'paid', label: 'Paid' },
                  { value: 'past_due', label: 'Past Due' },
                  { value: 'void', label: 'Void' }
                ],
                value: selectedStatus,
                onChange: setSelectedStatus
              }
            ]}
            dateRange={{
              from: dateFrom,
              to: dateTo,
              onFromChange: setDateFrom,
              onToChange: setDateTo
            }}
          />

          <Card>
            <CardHeader>
              <CardTitle>Invoice Management</CardTitle>
              <CardDescription>Manage customer invoices and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{invoice.id}</h3>
                        <Badge variant={
                          invoice.status === 'paid' ? 'default' : 
                          invoice.status === 'past_due' ? 'destructive' : 'secondary'
                        }>
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {invoice.tenant} • £{invoice.amount} • Due: {invoice.due_date}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );

  const renderPartnersReferrals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Partners & Referrals</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KPICard
          title="Active Partners"
          value={partners.length.toString()}
          change="+2 this quarter"
          icon={Users}
          color="text-blue-600"
          drillDownData={{
            title: 'Partner Performance',
            description: 'Partner tier distribution and performance',
            content: <div>Partner performance content</div>
          }}
        />
        <KPICard
          title="Partner Revenue"
          value={`£${partners.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}`}
          change="+18.5% vs last quarter"
          icon={DollarSign}
          color="text-green-600"
          drillDownData={{
            title: 'Revenue Analysis',
            description: 'Partner-driven revenue and commissions',
            content: <div>Revenue analysis content</div>
          }}
        />
        <KPICard
          title="Referral Conversions"
          value={referrals.filter(r => r.status === 'converted').length.toString()}
          change="12.3% conversion rate"
          icon={TrendingUp}
          color="text-orange-600"
          drillDownData={{
            title: 'Referral Pipeline',
            description: 'Referral conversion funnel and performance',
            content: <div>Referral pipeline content</div>
          }}
        />
      </div>

      <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Partner Management</CardTitle>
              <CardDescription>Manage channel partners and commission structures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{partner.name}</h3>
                        <Badge variant="outline">{partner.tier}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {partner.margin}% margin • {partner.tenants} tenants • £{partner.revenue.toLocaleString()} revenue
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        
          <Card>
            <CardHeader>
              <CardTitle>Referral Management</CardTitle>
              <CardDescription>Track referral program performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{referral.referee}</h3>
                        <Badge variant={referral.status === 'converted' ? 'default' : 'secondary'}>
                          {referral.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Referred by: {referral.referrer} • Reward: £{referral.reward}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );

  const renderGrowthJourneys = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Growth Journeys</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Analytics
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Journey
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KPICard
          title="Active Journeys"
          value={growthJourneys.filter(j => j.active).length.toString()}
          change="2 launched this month"
          icon={TrendingUp}
          color="text-blue-600"
          drillDownData={{
            title: 'Journey Performance',
            description: 'Growth journey effectiveness and conversion rates',
            content: <div>Journey performance content</div>
          }}
        />
        <KPICard
          title="Total Conversions"
          value={growthJourneys.reduce((sum, j) => sum + j.conversions, 0).toString()}
          change="+34 this week"
          icon={Target}
          color="text-green-600"
          drillDownData={{
            title: 'Conversion Analysis',
            description: 'Journey step conversion and drop-off analysis',
            content: <div>Conversion analysis content</div>
          }}
        />
        <KPICard
          title="Engagement Rate"
          value="67.8%"
          change="+5.2% vs last month"
          icon={Activity}
          color="text-orange-600"
          drillDownData={{
            title: 'Engagement Metrics',
            description: 'User engagement across journey touchpoints',
            content: <div>Engagement metrics content</div>
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Journey Management</CardTitle>
          <CardDescription>Automated growth and engagement campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {growthJourneys.map((journey) => (
              <div key={journey.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{journey.name}</h3>
                    <Badge variant={journey.active ? 'default' : 'secondary'}>
                      {journey.active ? 'Active' : 'Paused'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Trigger: {journey.trigger} • {journey.actions} actions • {journey.conversions} conversions
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAuditLog = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Audit Trail
          </Button>
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Verify Hash Chain
          </Button>
        </div>
      </div>

      <SearchFilterHeader
        searchPlaceholder="Search audit logs..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={[
          {
            label: 'Actions',
            options: [
              { value: 'all', label: 'All Actions' },
              { value: 'create', label: 'Create' },
              { value: 'update', label: 'Update' },
              { value: 'delete', label: 'Delete' },
              { value: 'approve', label: 'Approve' }
            ],
            value: selectedStatus,
            onChange: setSelectedStatus
          }
        ]}
        dateRange={{
          from: dateFrom,
          to: dateTo,
          onFromChange: setDateFrom,
          onToChange: setDateTo
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>System Audit Trail</CardTitle>
          <CardDescription>Tamper-evident log of all administrative actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{log.action}</h3>
                    <Badge variant="outline">{log.entity}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Actor: {log.actor} • {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Templates & Branding</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <InvoiceTemplateManager />
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'catalog': return renderCatalogPricing();
      case 'promotions': return renderPromotions();
      case 'experiments': return renderExperiments();
      case 'tenants': return renderTenants();
      case 'invoices': return renderInvoicesDunning();
      case 'partners': return renderPartnersReferrals();
      case 'growth': return renderGrowthJourneys();
      case 'templates': return renderTemplates();
      case 'settings': return renderSettings();
      case 'audit': return renderAuditLog();
      default: return renderOverview();
    }
  };

  return (
    <ResponsiveLayout>
      <div className="flex h-screen bg-gray-50">
        {!isMobile && renderLeftRail()}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {isMobile && (
            <div className="p-4 bg-white border-b border-gray-200">
              <Select value={activeSection} onValueChange={setActiveSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select admin section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="catalog">Catalog & Pricing</SelectItem>
                  <SelectItem value="promotions">Promotions</SelectItem>
                  <SelectItem value="experiments">Experiments & Flags</SelectItem>
                  <SelectItem value="tenants">Tenants & Subscriptions</SelectItem>
                  <SelectItem value="invoices">Invoices & Dunning</SelectItem>
                  <SelectItem value="partners">Partners & Referrals</SelectItem>
                  <SelectItem value="growth">Growth Journeys</SelectItem>
                  <SelectItem value="templates">Templates</SelectItem>
                  <SelectItem value="settings">Settings</SelectItem>
                  <SelectItem value="audit">Audit Log</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      <AIPromptSection
        title="Admin AI Assistant"
        description="Get insights about tenant management, billing operations, and system analytics"
        isLoading={isAILoading}
        onSubmit={handleAIQuestion}
        placeholder="Ask about admin operations, tenant management, billing, or system analytics..."
        recentQuestions={[
          "Show me tenants with past due invoices",
          "What's the conversion rate for our current experiments?",
          "Which promotions are performing best this quarter?",
          "How many approval requests are pending?"
        ]}
      />
    </ResponsiveLayout>
  );
};

export default AdminModule;
