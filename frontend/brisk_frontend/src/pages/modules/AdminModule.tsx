import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ResponsiveLayout from '@/components/ResponsiveLayout';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Settings,
  Shield,
  CreditCard,
  Target,
  Flag,
  Building,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  Play
} from 'lucide-react';

const AdminModule = () => {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState('overview');

  const [kpiData] = useState({
    mrr: 125000,
    arr: 1500000,
    nrr: 108,
    churn: 2.3,
    trials: 47,
    dunning: 12
  });

  const [tenants] = useState([
    { id: 'tn_abc123', name: 'Brisk Accounting Ltd', plan: 'Professional', status: 'active', mrr: 2400, users: 12, lastActive: '2025-01-10' },
    { id: 'tn_def456', name: 'Smith & Partners', plan: 'Enterprise', status: 'trial', mrr: 0, users: 3, lastActive: '2025-01-09' },
    { id: 'tn_ghi789', name: 'Johnson Associates', plan: 'Starter', status: 'past_due', mrr: 290, users: 2, lastActive: '2025-01-08' },
    { id: 'tn_jkl012', name: 'Williams & Co', plan: 'Professional', status: 'active', mrr: 790, users: 8, lastActive: '2025-01-10' },
    { id: 'tn_mno345', name: 'Brown Chartered', plan: 'Enterprise', status: 'active', mrr: 1990, users: 25, lastActive: '2025-01-10' }
  ]);

  const [plans] = useState([
    {
      id: 'plan_starter_v1_2',
      name: 'Starter',
      version: '1.2',
      price: 29,
      features: 8,
      status: 'active',
      activeFrom: '2025-01-01'
    },
    {
      id: 'plan_pro_v1_5',
      name: 'Professional',
      version: '1.5',
      price: 79,
      features: 15,
      status: 'active',
      activeFrom: '2025-01-15'
    },
    {
      id: 'plan_ent_v2_0',
      name: 'Enterprise',
      version: '2.0',
      price: 199,
      features: 25,
      status: 'scheduled',
      activeFrom: '2025-02-01'
    }
  ]);

  const [promotions] = useState([
    { id: 'SPRING25', name: 'Spring 2025 Discount', type: 'percent', value: 25, duration: '3 months', status: 'active', used: 127, cap: 500 },
    { id: 'WELCOME50', name: 'Welcome Offer', type: 'percent', value: 50, duration: '1 month', status: 'active', used: 89, cap: 200 },
    { id: 'UPGRADE20', name: 'Upgrade Incentive', type: 'percent', value: 20, duration: 'forever', status: 'paused', used: 45, cap: 100 }
  ]);

  const [experiments] = useState([
    {
      id: 'exp_trial_length',
      name: 'Trial Length Test',
      description: 'Testing 14 vs 21 day trial periods',
      variants: 2,
      traffic: 50,
      status: 'running',
      started: '2025-01-01'
    }
  ]);

  const adminPersonas = [
    { id: 'org_owner', name: 'Organization Owner', description: 'Full system access', users: 3 },
    { id: 'billing_admin', name: 'Billing Administrator', description: 'Subscription and billing management', users: 2 },
    { id: 'revops', name: 'Revenue Operations', description: 'Analytics and revenue optimization', users: 1 },
    { id: 'support_admin', name: 'Support Administrator', description: 'Customer support and troubleshooting', users: 5 },
    { id: 'read_only_auditor', name: 'Read-Only Auditor', description: 'View-only access for compliance', users: 2 }
  ];

  const renderLeftRail = () => (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Console</h2>
        <nav className="space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'catalog', label: 'Catalog and Pricing', icon: CreditCard },
            { id: 'promotions', label: 'Promotions', icon: Target },
            { id: 'experiments', label: 'Experiments and Flags', icon: Flag },
            { id: 'tenants', label: 'Tenants and Subscriptions', icon: Building },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Alerts ({kpiData.dunning})
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Quick Action
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{kpiData.mrr.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Recurring Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{(kpiData.arr / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">+18.2% year over year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Revenue Retention</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.nrr}%</div>
            <p className="text-xs text-muted-foreground">Above 100% target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.churn}%</div>
            <p className="text-xs text-muted-foreground">-0.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trials</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.trials}</div>
            <p className="text-xs text-muted-foreground">+8 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dunning Queue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{kpiData.dunning}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest admin actions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Plan version Pro v1.5 activated</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New tenant onboarded: Smith and Partners</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment retry failed: Johnson Associates</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system status and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Response Time</span>
                <Badge variant="outline" className="text-green-600">142ms</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Performance</span>
                <Badge variant="outline" className="text-green-600">Optimal</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Connections</span>
                <Badge variant="outline">1,247</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Error Rate</span>
                <Badge variant="outline" className="text-green-600">0.02%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCatalogPricing = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Catalog and Pricing</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Changes
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Plan Version
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                  <Badge variant="outline">v{plan.version}</Badge>
                  <Badge variant={plan.status === 'active' ? 'default' : 'secondary'}>
                    {plan.status}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-1 text-sm text-gray-600">£{plan.price}/month • {plan.features} features</div>
              <div className="mt-2 text-sm text-gray-600">
                Active from {plan.activeFrom}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Base Price</span>
                  <span className="font-medium">£{plan.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Features</span>
                  <span className="font-medium">{plan.features}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Status</span>
                  <Badge variant={plan.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {plan.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Regional Pricing</CardTitle>
          <CardDescription>Manage pricing across different regions and currencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">United Kingdom</p>
                  <p className="text-sm text-gray-600">GBP pricing</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">European Union</p>
                  <p className="text-sm text-gray-600">EUR pricing</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">United States</p>
                  <p className="text-sm text-gray-600">USD pricing</p>
                </div>
                <Badge variant="secondary">Planned</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPromotions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Promotions and Coupons</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Promotion
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <Card key={promo.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{promo.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Code: {promo.id}</p>
                </div>
                <Badge variant={promo.status === 'active' ? 'default' : 'secondary'}>
                  {promo.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Discount</span>
                  <span className="font-medium">{promo.value}% off</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Duration</span>
                  <span className="font-medium">{promo.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Usage</span>
                  <span className="font-medium">{promo.used}/{promo.cap}</span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderExperiments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Experiments and Feature Flags</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Flag className="h-4 w-4 mr-2" />
            Manage Flags
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Experiment
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Experiments</CardTitle>
          <CardDescription>A/B tests and feature rollouts currently running</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experiments.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-gray-900">{exp.name}</h3>
                    <Badge variant={exp.status === 'running' ? 'default' : 'secondary'}>
                      {exp.status}
                    </Badge>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">{exp.description}</div>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                    <span>{exp.variants} variants</span>
                    <span>{exp.traffic}% traffic</span>
                    <span>Started {exp.started}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
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
          <CardTitle>Feature Flags</CardTitle>
          <CardDescription>Control feature rollouts and system behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium">Advanced Analytics Dashboard</p>
                <p className="text-sm text-gray-600">Enhanced reporting features</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">50% rollout</Badge>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium">New Onboarding Flow</p>
                <p className="text-sm text-gray-600">Simplified user registration</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="default">100% rollout</Badge>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTenants = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tenants and Subscriptions</h1>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-2">
            <Input placeholder="Search tenants..." className="w-64" />
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenant Overview</CardTitle>
          <CardDescription>Manage customer accounts and subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tenants.map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{tenant.name}</h3>
                    <p className="text-sm text-gray-600">{tenant.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium">£{tenant.mrr}/month</p>
                    <p className="text-xs text-gray-600">{tenant.users} users</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      tenant.status === 'active' ? 'default' :
                      tenant.status === 'trial' ? 'secondary' :
                      tenant.status === 'past_due' ? 'destructive' : 'outline'
                    }>
                      {tenant.status}
                    </Badge>
                    <p className="text-xs text-gray-600 mt-1">{tenant.plan}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Inspect
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
          <Plus className="h-4 w-4 mr-2" />
          Add Admin User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>RBAC Personas</CardTitle>
          <CardDescription>Manage role-based access control and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminPersonas.map((persona) => (
              <div key={persona.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{persona.name}</h3>
                    <p className="text-sm text-gray-600">{persona.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{persona.users} users</Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>Global system settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Maintenance Mode</span>
                <Badge variant="outline" className="text-green-600">Disabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Rate Limiting</span>
                <Badge variant="outline">1000/hour</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Data Retention</span>
                <Badge variant="outline">7 years</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Authentication and security configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">MFA Required</span>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Session Timeout</span>
                <Badge variant="outline">8 hours</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Password Policy</span>
                <Badge variant="outline">Strong</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'catalog':
        return renderCatalogPricing();
      case 'promotions':
        return renderPromotions();
      case 'experiments':
        return renderExperiments();
      case 'tenants':
        return renderTenants();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  if (isMobile) {
    return (
      <ResponsiveLayout>
        <div className="p-4">
          <div className="mb-4">
            <Select value={activeSection} onValueChange={setActiveSection}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="catalog">Catalog and Pricing</SelectItem>
                <SelectItem value="promotions">Promotions</SelectItem>
                <SelectItem value="experiments">Experiments and Flags</SelectItem>
                <SelectItem value="tenants">Tenants and Subscriptions</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {renderContent()}
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout>
      <div className="flex h-screen bg-gray-50">
        {renderLeftRail()}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default AdminModule;
