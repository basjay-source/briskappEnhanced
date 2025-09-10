import { useState } from 'react'
import { 
  CreditCard, 
  Receipt, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  AlertCircle,
  Download,
  Upload,
  Eye,
  Edit,
  Filter,
  Search,
  Brain,
  Settings,
  Link,
  FileText,
  Calculator,
  PoundSterling,
  BarChart3,
  Building,
  Camera,
  Users,
  Calendar,
  CheckCircle,
  Plus,
  PieChart,
  LineChart,
  Activity,
  Target,
  Wrench,
  Zap,
  ShoppingCart,
  Percent,
  Package,
  RefreshCw,
  Scan,
  Clock,
  UserCheck,
  Truck,
  CreditCard as Invoice,
  Phone,
  Mail,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout from '@/components/ResponsiveLayout'

export default function Bookkeeping() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedAccount, setSelectedAccount] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('GBP')

  const kpis = [
    {
      title: 'Bank Balance',
      value: '£45,230',
      change: '+£2,340 this week',
      icon: CreditCard,
      color: 'text-blue-600'
    },
    {
      title: 'Unreconciled',
      value: '23',
      change: 'Transactions pending',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      title: 'VAT Due',
      value: '£8,450',
      change: 'Due in 12 days',
      icon: Receipt,
      color: 'text-red-600'
    },
    {
      title: 'Monthly Profit',
      value: '£12,680',
      change: '+18% vs last month',
      icon: TrendingUp,
      color: 'text-green-600'
    }
  ]

  const bankAccounts = [
    {
      id: 'BA001',
      name: 'Current Account',
      bank: 'Barclays',
      number: '****1234',
      balance: '£45,230.50',
      status: 'Connected',
      lastSync: '2024-01-20 16:30',
      unreconciled: 5
    },
    {
      id: 'BA002',
      name: 'Savings Account',
      bank: 'HSBC',
      number: '****5678',
      balance: '£25,000.00',
      status: 'Connected',
      lastSync: '2024-01-20 16:25',
      unreconciled: 0
    },
    {
      id: 'BA003',
      name: 'Business Credit Card',
      bank: 'Santander',
      number: '****9012',
      balance: '-£3,450.25',
      status: 'Syncing',
      lastSync: '2024-01-20 15:45',
      unreconciled: 8
    }
  ]

  const transactions = [
    {
      id: 'T001',
      date: '2024-01-20',
      description: 'Office Supplies Ltd',
      amount: '-£234.50',
      category: 'Office Expenses',
      status: 'Categorized',
      account: 'Current Account',
      vatRate: '20%'
    },
    {
      id: 'T002',
      date: '2024-01-19',
      description: 'Client Payment - ABC Corp',
      amount: '+£5,000.00',
      category: 'Sales',
      status: 'Reconciled',
      account: 'Current Account',
      vatRate: '20%'
    },
    {
      id: 'T003',
      date: '2024-01-18',
      description: 'Fuel Station',
      amount: '-£85.60',
      category: 'Travel',
      status: 'Pending Review',
      account: 'Business Credit Card',
      vatRate: '20%'
    }
  ]

  const vatReturns = [
    {
      id: 'VAT001',
      period: 'Q4 2024',
      dueDate: '2024-02-07',
      status: 'In Progress',
      vatDue: '£8,450.25',
      salesVat: '£12,340.50',
      purchaseVat: '£3,890.25',
      progress: 75
    },
    {
      id: 'VAT002',
      period: 'Q3 2024',
      dueDate: '2024-11-07',
      status: 'Submitted',
      vatDue: '£6,230.75',
      salesVat: '£9,850.00',
      purchaseVat: '£3,619.25',
      progress: 100
    }
  ]

  const properties = [
    {
      id: 'PROP001',
      address: '123 High Street, London',
      type: 'Residential',
      tenants: 2,
      monthlyRent: '£2,400',
      occupancy: '100%',
      nextRentDue: '2024-02-01',
      maintenanceIssues: 0,
      status: 'Occupied'
    },
    {
      id: 'PROP002',
      address: '456 Commercial Road, Manchester',
      type: 'Commercial',
      tenants: 1,
      monthlyRent: '£4,800',
      occupancy: '100%',
      nextRentDue: '2024-02-15',
      maintenanceIssues: 2,
      status: 'Occupied'
    },
    {
      id: 'PROP003',
      address: '789 Garden Lane, Birmingham',
      type: 'Residential',
      tenants: 0,
      monthlyRent: '£1,800',
      occupancy: '0%',
      nextRentDue: 'N/A',
      maintenanceIssues: 1,
      status: 'Vacant'
    }
  ]

  const ecommerceConnections = [
    {
      id: 'ECOM001',
      platform: 'Amazon',
      storeName: 'BriskStore UK',
      status: 'Connected',
      lastSync: '2024-01-20 16:30',
      monthlyRevenue: '£15,240',
      pendingOrders: 23,
      fees: '£2,286',
      netRevenue: '£12,954'
    },
    {
      id: 'ECOM002',
      platform: 'Shopify',
      storeName: 'Brisk Boutique',
      status: 'Connected',
      lastSync: '2024-01-20 16:25',
      monthlyRevenue: '£8,950',
      pendingOrders: 12,
      fees: '£268',
      netRevenue: '£8,682'
    },
    {
      id: 'ECOM003',
      platform: 'eBay',
      storeName: 'BriskSales',
      status: 'Syncing',
      lastSync: '2024-01-20 15:45',
      monthlyRevenue: '£3,420',
      pendingOrders: 8,
      fees: '£342',
      netRevenue: '£3,078'
    }
  ]

  const documents = [
    {
      id: 'DOC001',
      name: 'Office Supplies Invoice.pdf',
      type: 'Invoice',
      uploadDate: '2024-01-20',
      status: 'Processed',
      ocrConfidence: 98,
      suggestedCategory: 'Office Expenses',
      amount: '£234.50',
      supplier: 'Office Supplies Ltd'
    },
    {
      id: 'DOC002',
      name: 'Fuel Receipt.jpg',
      type: 'Receipt',
      uploadDate: '2024-01-19',
      status: 'Pending Review',
      ocrConfidence: 85,
      suggestedCategory: 'Travel',
      amount: '£85.60',
      supplier: 'Shell Petrol Station'
    },
    {
      id: 'DOC003',
      name: 'Bank Statement.pdf',
      type: 'Statement',
      uploadDate: '2024-01-18',
      status: 'Auto-Posted',
      ocrConfidence: 95,
      suggestedCategory: 'Bank Charges',
      amount: '£25.00',
      supplier: 'Barclays Bank'
    }
  ]

  const currencies = [
    { code: 'GBP', name: 'British Pound', rate: 1.0000, symbol: '£' },
    { code: 'USD', name: 'US Dollar', rate: 0.7850, symbol: '$' },
    { code: 'EUR', name: 'Euro', rate: 0.8650, symbol: '€' },
    { code: 'CAD', name: 'Canadian Dollar', rate: 0.5920, symbol: 'C$' }
  ]

  const analyticsData = {
    cashFlowTrend: [
      { month: 'Aug', inflow: 45000, outflow: 32000, net: 13000 },
      { month: 'Sep', inflow: 52000, outflow: 35000, net: 17000 },
      { month: 'Oct', inflow: 48000, outflow: 38000, net: 10000 },
      { month: 'Nov', inflow: 55000, outflow: 41000, net: 14000 },
      { month: 'Dec', inflow: 62000, outflow: 45000, net: 17000 },
      { month: 'Jan', inflow: 58000, outflow: 43000, net: 15000 }
    ],
    expenseBreakdown: [
      { category: 'Office Expenses', amount: 8500, percentage: 25 },
      { category: 'Travel', amount: 6800, percentage: 20 },
      { category: 'Marketing', amount: 5100, percentage: 15 },
      { category: 'Utilities', amount: 4250, percentage: 12.5 },
      { category: 'Professional Fees', amount: 3400, percentage: 10 },
      { category: 'Other', amount: 5950, percentage: 17.5 }
    ]
  }

  const projectData = [
    {
      id: 'PROJ001',
      name: 'Website Redesign',
      client: 'ABC Corp',
      budget: '£25,000',
      actual: '£18,500',
      variance: '+£6,500',
      status: 'In Progress',
      completion: 74,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      manager: 'Sarah Johnson'
    },
    {
      id: 'PROJ002',
      name: 'ERP Implementation',
      client: 'XYZ Ltd',
      budget: '£85,000',
      actual: '£92,300',
      variance: '-£7,300',
      status: 'Over Budget',
      completion: 89,
      startDate: '2023-10-01',
      endDate: '2024-02-28',
      manager: 'Mike Chen'
    },
    {
      id: 'PROJ003',
      name: 'Mobile App Development',
      client: 'Tech Startup',
      budget: '£45,000',
      actual: '£12,800',
      variance: '+£32,200',
      status: 'On Track',
      completion: 28,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      manager: 'Emma Wilson'
    }
  ]

  const budgetData = [
    {
      category: 'Revenue',
      budgeted: 150000,
      actual: 142500,
      variance: -7500,
      variancePercent: -5.0,
      forecast: 155000
    },
    {
      category: 'Cost of Sales',
      budgeted: 60000,
      actual: 58200,
      variance: 1800,
      variancePercent: 3.0,
      forecast: 62000
    },
    {
      category: 'Operating Expenses',
      budgeted: 45000,
      actual: 47800,
      variance: -2800,
      variancePercent: -6.2,
      forecast: 46500
    },
    {
      category: 'Marketing',
      budgeted: 15000,
      actual: 13200,
      variance: 1800,
      variancePercent: 12.0,
      forecast: 16000
    }
  ]

  const forecastData = {
    cashFlow: [
      { month: 'Feb', actual: 15000, forecast: 16200, confidence: 91 },
      { month: 'Mar', actual: null, forecast: 18500, confidence: 87 },
      { month: 'Apr', actual: null, forecast: 21000, confidence: 82 },
      { month: 'May', actual: null, forecast: 19500, confidence: 78 },
      { month: 'Jun', actual: null, forecast: 22000, confidence: 74 }
    ],
    scenarios: [
      { name: 'Conservative', probability: 30, revenue: 140000, profit: 25000 },
      { name: 'Most Likely', probability: 50, revenue: 155000, profit: 32000 },
      { name: 'Optimistic', probability: 20, revenue: 175000, profit: 42000 }
    ]
  }

  const projectionData = {
    revenueProjections: [
      { period: 'Q1 2024', historical: 125000, projected: 135000, confidence: 92, growth: 8.0 },
      { period: 'Q2 2024', historical: 142000, projected: 158000, confidence: 88, growth: 11.3 },
      { period: 'Q3 2024', historical: null, projected: 172000, confidence: 84, growth: 8.9 },
      { period: 'Q4 2024', historical: null, projected: 185000, confidence: 79, growth: 7.6 }
    ],
    cashFlowProjections: [
      { month: 'Mar 2024', opening: 45000, inflows: 158000, outflows: 142000, closing: 61000, cumulative: 61000 },
      { month: 'Apr 2024', opening: 61000, inflows: 165000, outflows: 148000, closing: 78000, cumulative: 139000 },
      { month: 'May 2024', opening: 78000, inflows: 172000, outflows: 155000, closing: 95000, cumulative: 234000 },
      { month: 'Jun 2024', opening: 95000, inflows: 178000, outflows: 162000, closing: 111000, cumulative: 345000 }
    ],
    profitabilityProjections: [
      { metric: 'Gross Profit Margin', current: 68.5, projected: 71.2, target: 75.0, trend: 'improving' },
      { metric: 'Operating Margin', current: 24.8, projected: 27.3, target: 30.0, trend: 'improving' },
      { metric: 'Net Profit Margin', current: 18.2, projected: 21.1, target: 25.0, trend: 'improving' },
      { metric: 'EBITDA Margin', current: 32.1, projected: 35.8, target: 40.0, trend: 'improving' }
    ],
    keyDrivers: [
      { driver: 'Customer Acquisition', current: 45, projected: 62, impact: 'High', confidence: 87 },
      { driver: 'Average Order Value', current: 285, projected: 315, impact: 'Medium', confidence: 91 },
      { driver: 'Customer Retention', current: 78, projected: 84, impact: 'High', confidence: 89 },
      { driver: 'Market Expansion', current: 2, projected: 4, impact: 'Medium', confidence: 72 }
    ],
    riskFactors: [
      { risk: 'Economic Downturn', probability: 25, impact: 'High', mitigation: 'Diversify revenue streams' },
      { risk: 'Supply Chain Disruption', probability: 35, impact: 'Medium', mitigation: 'Multiple supplier strategy' },
      { risk: 'Competitive Pressure', probability: 45, impact: 'Medium', mitigation: 'Innovation & differentiation' },
      { risk: 'Regulatory Changes', probability: 20, impact: 'Low', mitigation: 'Compliance monitoring' }
    ]
  }

  const salesData = {
    invoices: [
      { id: 'INV-001', customer: 'ABC Corp', amount: 2500, date: '2024-01-15', status: 'Paid', dueDate: '2024-02-14' },
      { id: 'INV-002', customer: 'XYZ Ltd', amount: 1800, date: '2024-01-18', status: 'Overdue', dueDate: '2024-02-17' },
      { id: 'INV-003', customer: 'Tech Solutions', amount: 3200, date: '2024-01-20', status: 'Pending', dueDate: '2024-02-19' },
      { id: 'INV-004', customer: 'Global Industries', amount: 4500, date: '2024-01-22', status: 'Draft', dueDate: '2024-02-21' }
    ],
    customers: [
      { id: 'CUST-001', name: 'ABC Corp', email: 'contact@abccorp.com', phone: '+44 20 7123 4567', balance: 2500, status: 'Active' },
      { id: 'CUST-002', name: 'XYZ Ltd', email: 'info@xyzltd.co.uk', phone: '+44 161 234 5678', balance: 1800, status: 'Overdue' },
      { id: 'CUST-003', name: 'Tech Solutions', email: 'hello@techsolutions.com', phone: '+44 113 345 6789', balance: 3200, status: 'Active' },
      { id: 'CUST-004', name: 'Global Industries', email: 'accounts@global.com', phone: '+44 121 456 7890', balance: 0, status: 'Active' }
    ],
    quotes: [
      { id: 'QUO-001', customer: 'Potential Client A', amount: 5500, date: '2024-01-25', status: 'Sent', validUntil: '2024-02-25' },
      { id: 'QUO-002', customer: 'Potential Client B', amount: 3800, date: '2024-01-26', status: 'Accepted', validUntil: '2024-02-26' },
      { id: 'QUO-003', customer: 'Potential Client C', amount: 2200, date: '2024-01-27', status: 'Draft', validUntil: '2024-02-27' }
    ]
  }

  const purchasesData = {
    bills: [
      { id: 'BILL-001', supplier: 'Office Supplies Ltd', amount: 850, date: '2024-01-10', status: 'Paid', dueDate: '2024-02-09' },
      { id: 'BILL-002', supplier: 'Tech Equipment Co', amount: 2400, date: '2024-01-12', status: 'Pending', dueDate: '2024-02-11' },
      { id: 'BILL-003', supplier: 'Utilities Provider', amount: 320, date: '2024-01-14', status: 'Overdue', dueDate: '2024-02-13' },
      { id: 'BILL-004', supplier: 'Marketing Agency', amount: 1500, date: '2024-01-16', status: 'Draft', dueDate: '2024-02-15' }
    ],
    suppliers: [
      { id: 'SUPP-001', name: 'Office Supplies Ltd', email: 'orders@officesupplies.co.uk', phone: '+44 20 8123 4567', balance: 0, status: 'Active' },
      { id: 'SUPP-002', name: 'Tech Equipment Co', email: 'sales@techequipment.com', phone: '+44 161 234 5678', balance: 2400, status: 'Active' },
      { id: 'SUPP-003', name: 'Utilities Provider', email: 'billing@utilities.co.uk', phone: '+44 113 345 6789', balance: 320, status: 'Overdue' },
      { id: 'SUPP-004', name: 'Marketing Agency', email: 'hello@marketingagency.com', phone: '+44 121 456 7890', balance: 1500, status: 'Active' }
    ],
    purchaseOrders: [
      { id: 'PO-001', supplier: 'Office Supplies Ltd', amount: 650, date: '2024-01-28', status: 'Delivered', expectedDate: '2024-02-05' },
      { id: 'PO-002', supplier: 'Tech Equipment Co', amount: 3200, date: '2024-01-29', status: 'Pending', expectedDate: '2024-02-10' },
      { id: 'PO-003', supplier: 'Marketing Agency', amount: 1800, date: '2024-01-30', status: 'Approved', expectedDate: '2024-02-15' }
    ],
    creditNotes: [
      { id: 'CN-001', supplier: 'Office Supplies Ltd', amount: 120, date: '2024-01-20', reason: 'Damaged goods', status: 'Applied' },
      { id: 'CN-002', supplier: 'Tech Equipment Co', amount: 350, date: '2024-01-22', reason: 'Partial return', status: 'Pending' }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
      case 'Reconciled':
      case 'Submitted':
        return 'text-green-600 bg-green-50'
      case 'Syncing':
      case 'In Progress':
      case 'Categorized':
        return 'text-yellow-600 bg-yellow-50'
      case 'Pending Review':
      case 'Overdue':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-blue-600 bg-blue-50'
    }
  }

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Bookkeeping</h1>
            <p className="text-gray-600">Bank feeds, VAT MTD, reconciliation and management accounts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size={isMobile ? "sm" : "default"}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size={isMobile ? "sm" : "default"}>
              <Link className="h-4 w-4 mr-2" />
              Connect Bank
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-6' : 'grid-cols-13'}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="banking">Banking</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="vat">VAT Returns</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
            <TabsTrigger value="property">Property</TabsTrigger>
            <TabsTrigger value="ecommerce">eCommerce</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Sales Management</h2>
                <p className="text-gray-600">Invoices, quotes, customers, and sales analytics</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
                <Button>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </div>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Outstanding Invoices</p>
                      <p className="text-2xl font-bold">£12,000</p>
                      <p className="text-xs text-gray-500">4 invoices</p>
                    </div>
                    <Invoice className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Overdue Amount</p>
                      <p className="text-2xl font-bold text-red-600">£1,800</p>
                      <p className="text-xs text-gray-500">1 invoice</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Customers</p>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-xs text-gray-500">+3 this month</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Sales</p>
                      <p className="text-2xl font-bold">£45,200</p>
                      <p className="text-xs text-green-600">+12% vs last month</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>Latest sales invoices and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.invoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{invoice.id}</p>
                            <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{invoice.customer}</p>
                          <p className="text-xs text-gray-500">Due: {invoice.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">£{invoice.amount.toLocaleString()}</p>
                          <div className="flex gap-1 mt-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Overview</CardTitle>
                  <CardDescription>Active customers and their balances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.customers.map((customer) => (
                      <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{customer.name}</p>
                            <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {customer.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {customer.phone}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">£{customer.balance.toLocaleString()}</p>
                          <div className="flex gap-1 mt-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quotes & Estimates</CardTitle>
                <CardDescription>Pending quotes and their conversion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.quotes.map((quote) => (
                    <div key={quote.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{quote.id}</p>
                          <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{quote.customer}</p>
                        <p className="text-xs text-gray-500">Valid until: {quote.validUntil}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">£{quote.amount.toLocaleString()}</p>
                        <div className="flex gap-1 mt-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          {quote.status === 'Accepted' && (
                            <Button variant="ghost" size="sm">
                              <Plus className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchases" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Purchase Management</h2>
                <p className="text-gray-600">Bills, purchase orders, suppliers, and expense tracking</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  New Bill
                </Button>
                <Button>
                  <Truck className="h-4 w-4 mr-2" />
                  Add Supplier
                </Button>
              </div>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Outstanding Bills</p>
                      <p className="text-2xl font-bold">£5,070</p>
                      <p className="text-xs text-gray-500">3 bills</p>
                    </div>
                    <FileText className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Overdue Bills</p>
                      <p className="text-2xl font-bold text-red-600">£320</p>
                      <p className="text-xs text-gray-500">1 bill</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                      <p className="text-2xl font-bold">18</p>
                      <p className="text-xs text-gray-500">+2 this month</p>
                    </div>
                    <Truck className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
                      <p className="text-2xl font-bold">£28,400</p>
                      <p className="text-xs text-red-600">+8% vs last month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bills</CardTitle>
                  <CardDescription>Latest supplier bills and payment status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchasesData.bills.map((bill) => (
                      <div key={bill.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{bill.id}</p>
                            <Badge className={getStatusColor(bill.status)}>{bill.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{bill.supplier}</p>
                          <p className="text-xs text-gray-500">Due: {bill.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">£{bill.amount.toLocaleString()}</p>
                          <div className="flex gap-1 mt-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supplier Overview</CardTitle>
                  <CardDescription>Active suppliers and outstanding balances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchasesData.suppliers.map((supplier) => (
                      <div key={supplier.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{supplier.name}</p>
                            <Badge className={getStatusColor(supplier.status)}>{supplier.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {supplier.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {supplier.phone}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">£{supplier.balance.toLocaleString()}</p>
                          <div className="flex gap-1 mt-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Orders</CardTitle>
                  <CardDescription>Active purchase orders and delivery tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchasesData.purchaseOrders.map((po) => (
                      <div key={po.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{po.id}</p>
                            <Badge className={getStatusColor(po.status)}>{po.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{po.supplier}</p>
                          <p className="text-xs text-gray-500">Expected: {po.expectedDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">£{po.amount.toLocaleString()}</p>
                          <div className="flex gap-1 mt-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Credit Notes</CardTitle>
                  <CardDescription>Supplier credit notes and returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchasesData.creditNotes.map((cn) => (
                      <div key={cn.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{cn.id}</p>
                            <Badge className={getStatusColor(cn.status)}>{cn.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{cn.supplier}</p>
                          <p className="text-xs text-gray-500">{cn.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">£{cn.amount.toLocaleString()}</p>
                          <div className="flex gap-1 mt-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              {kpis.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        <p className="text-xs text-gray-500">{kpi.change}</p>
                      </div>
                      <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest bank feed transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{transaction.description}</p>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{transaction.date} | {transaction.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount}
                          </span>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bank Account Status</CardTitle>
                  <CardDescription>Connected accounts overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bankAccounts.map((account) => (
                      <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{account.name}</p>
                            <Badge className={getStatusColor(account.status)}>
                              {account.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{account.bank} {account.number}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{account.balance}</p>
                          <p className="text-xs text-gray-500">{account.unreconciled} unreconciled</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brisk-primary" />
                  Bookkeeping AI Insights
                </CardTitle>
                <CardDescription>Intelligent categorization and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Smart Categorization</h3>
                    <p className="text-sm text-blue-700">23 transactions auto-categorized this week with 98% accuracy. Review suggested categories for 3 pending items.</p>
                    <Button size="sm" className="mt-2">Review Categories</Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900">VAT Optimization</h3>
                    <p className="text-sm text-green-700">Potential VAT savings of £450 identified through expense categorization improvements.</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-orange-900">Cash Flow Alert</h3>
                    <p className="text-sm text-orange-700">Large payment due next week may impact cash flow. Consider payment scheduling options.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banking" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Banking & Reconciliation</h2>
                <p className="text-gray-600">Bank feeds, reconciliation, and comprehensive transaction management</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Statement
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Connect Bank
                </Button>
              </div>
            </div>

            <Tabs defaultValue="accounts" className="space-y-6">
              <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="feeds">Bank Feeds</TabsTrigger>
              </TabsList>

              <TabsContent value="accounts" className="space-y-6">
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Balance</p>
                          <p className="text-2xl font-bold">£67,890.75</p>
                          <p className="text-xs text-gray-500">Across all accounts</p>
                        </div>
                        <PoundSterling className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Unreconciled</p>
                          <p className="text-2xl font-bold">13</p>
                          <p className="text-xs text-gray-500">Transactions pending</p>
                        </div>
                        <AlertCircle className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Auto-Matched</p>
                          <p className="text-2xl font-bold">89%</p>
                          <p className="text-xs text-gray-500">This month</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Connected Banks</p>
                          <p className="text-2xl font-bold">3</p>
                          <p className="text-xs text-gray-500">Active connections</p>
                        </div>
                        <Building className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Bank Account Management</CardTitle>
                    <CardDescription>Connect and manage bank feeds with real-time synchronization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bankAccounts.map((account) => (
                        <Card key={account.id} className="border-l-4 border-l-brisk-primary">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold">{account.name}</h3>
                                  <Badge className={getStatusColor(account.status)}>
                                    {account.status}
                                  </Badge>
                                  <Badge variant="outline">{account.bank}</Badge>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                                  <span>Balance: {account.balance}</span>
                                  <span>Account: {account.number}</span>
                                  <span>Unreconciled: {account.unreconciled}</span>
                                  <span>Last sync: {account.lastSync}</span>
                                </div>
                                <div className="mt-2">
                                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Reconciliation Progress</span>
                                    <span>87%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Zap className="h-4 w-4 mr-2" />
                                  Sync Now
                                </Button>
                                <Button variant="outline" size="sm">
                                  <BarChart3 className="h-4 w-4 mr-2" />
                                  Reconcile
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Settings className="h-4 w-4 mr-2" />
                                  Settings
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Connect New Bank</CardTitle>
                    <CardDescription>Add new bank connections via Open Banking, CSV import, or API integration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <CreditCard className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Open Banking</h3>
                          <p className="text-sm text-gray-600 mb-3">Secure bank connection via Open Banking</p>
                          <Button size="sm" variant="outline">Connect</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <Upload className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">CSV Import</h3>
                          <p className="text-sm text-gray-600 mb-3">Upload bank statements manually</p>
                          <Button size="sm" variant="outline">Import</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <Link className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">API Integration</h3>
                          <p className="text-sm text-gray-600 mb-3">Connect via banking API</p>
                          <Button size="sm" variant="outline">Setup</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reconciliation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-brisk-primary" />
                      Bank Reconciliation
                    </CardTitle>
                    <CardDescription>Statement vs book balance comparison with reconciling items</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 lg:grid-cols-2">
                      <Card className="border">
                        <CardHeader>
                          <CardTitle className="text-lg">Current Account - Barclays</CardTitle>
                          <CardDescription>Reconciliation for period ending 31 Jan 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-semibold text-blue-900">Bank Statement Balance</h3>
                                <p className="text-2xl font-bold text-blue-900">£45,230.50</p>
                                <p className="text-sm text-blue-700">As per bank statement</p>
                              </div>
                              <div className="p-4 bg-green-50 rounded-lg">
                                <h3 className="font-semibold text-green-900">Book Balance</h3>
                                <p className="text-2xl font-bold text-green-900">£45,230.50</p>
                                <p className="text-sm text-green-700">As per accounting records</p>
                              </div>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">Reconciliation Status</h3>
                                <Badge className="bg-green-100 text-green-800">Reconciled</Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>Difference: £0.00</p>
                                <p>Last reconciled: 2024-01-31 16:30</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border">
                        <CardHeader>
                          <CardTitle className="text-lg">Savings Account - HSBC</CardTitle>
                          <CardDescription>Reconciliation for period ending 31 Jan 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-semibold text-blue-900">Bank Statement Balance</h3>
                                <p className="text-2xl font-bold text-blue-900">£25,000.00</p>
                                <p className="text-sm text-blue-700">As per bank statement</p>
                              </div>
                              <div className="p-4 bg-orange-50 rounded-lg">
                                <h3 className="font-semibold text-orange-900">Book Balance</h3>
                                <p className="text-2xl font-bold text-orange-900">£24,850.00</p>
                                <p className="text-sm text-orange-700">As per accounting records</p>
                              </div>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">Reconciliation Status</h3>
                                <Badge className="bg-orange-100 text-orange-800">Pending</Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>Difference: £150.00</p>
                                <p>Reconciling items: 2</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Reconciling Items</CardTitle>
                        <CardDescription>Outstanding items requiring reconciliation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold">Outstanding Deposit</h3>
                                  <Badge className="bg-blue-100 text-blue-800">Deposit in Transit</Badge>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                                  <span>Date: 2024-01-30</span>
                                  <span>Reference: DEP001</span>
                                  <span>Account: Savings - HSBC</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Customer payment not yet cleared by bank</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-lg font-bold text-green-600">+£150.00</span>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Match
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 border rounded-lg">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold">Bank Charges</h3>
                                  <Badge className="bg-red-100 text-red-800">Outstanding Charge</Badge>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                                  <span>Date: 2024-01-31</span>
                                  <span>Reference: CHG002</span>
                                  <span>Account: Current - Barclays</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Monthly account maintenance fee</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-lg font-bold text-red-600">-£15.00</span>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Match
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-6 pt-4 border-t">
                          <div className="text-sm text-gray-600">
                            <p>Total reconciling items: £135.00</p>
                            <p>2 items pending reconciliation</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Export Report
                            </Button>
                            <Button>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Complete Reconciliation
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="summary" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-brisk-primary" />
                      Bank Summary Dashboard
                    </CardTitle>
                    <CardDescription>Comprehensive overview of banking activity and reconciliation status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                      <Card className="border">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Total Credits</p>
                              <p className="text-2xl font-bold text-green-600">£45,280</p>
                              <p className="text-xs text-gray-500">This month</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Total Debits</p>
                              <p className="text-2xl font-bold text-red-600">£38,450</p>
                              <p className="text-xs text-gray-500">This month</p>
                            </div>
                            <TrendingDown className="h-8 w-8 text-red-600" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Net Movement</p>
                              <p className="text-2xl font-bold text-green-600">+£6,830</p>
                              <p className="text-xs text-gray-500">This month</p>
                            </div>
                            <BarChart3 className="h-8 w-8 text-blue-600" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Reconciliation Rate</p>
                              <p className="text-2xl font-bold text-blue-600">94%</p>
                              <p className="text-xs text-gray-500">Auto-matched</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2 mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Transaction Categories</CardTitle>
                          <CardDescription>Breakdown by transaction type</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="font-medium">Sales Receipts</span>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-green-600">£28,450</p>
                                <p className="text-xs text-gray-500">63% of credits</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="font-medium">Other Income</span>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-green-600">£16,830</p>
                                <p className="text-xs text-gray-500">37% of credits</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="font-medium">Supplier Payments</span>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-red-600">£22,150</p>
                                <p className="text-xs text-gray-500">58% of debits</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span className="font-medium">Operating Expenses</span>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-red-600">£16,300</p>
                                <p className="text-xs text-gray-500">42% of debits</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Reconciliation Status</CardTitle>
                          <CardDescription>Account-by-account reconciliation overview</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">Current Account</h3>
                                <Badge className="bg-green-100 text-green-800">Reconciled</Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <span>Balance: £45,230.50</span>
                                <span>Unreconciled: 0</span>
                                <span>Last reconciled: 31 Jan 2024</span>
                                <span>Variance: £0.00</span>
                              </div>
                              <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">Savings Account</h3>
                                <Badge className="bg-orange-100 text-orange-800">Pending</Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <span>Balance: £25,000.00</span>
                                <span>Unreconciled: 2</span>
                                <span>Last reconciled: 30 Jan 2024</span>
                                <span>Variance: £150.00</span>
                              </div>
                              <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">Credit Card</h3>
                                <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <span>Balance: -£3,450.25</span>
                                <span>Unreconciled: 8</span>
                                <span>Last reconciled: 28 Jan 2024</span>
                                <span>Variance: £125.50</span>
                              </div>
                              <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Recent Banking Activity</CardTitle>
                        <CardDescription>Latest transactions and reconciliation updates</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div>
                                <p className="font-medium">Customer Payment - ABC Ltd</p>
                                <p className="text-sm text-gray-500">Current Account • 2024-02-01 09:15</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">+£2,450.00</p>
                              <Badge className="bg-green-100 text-green-800 text-xs">Reconciled</Badge>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <div>
                                <p className="font-medium">Supplier Payment - XYZ Supplies</p>
                                <p className="text-sm text-gray-500">Current Account • 2024-02-01 08:30</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-red-600">-£1,250.00</p>
                              <Badge className="bg-green-100 text-green-800 text-xs">Reconciled</Badge>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <div>
                                <p className="font-medium">Bank Transfer</p>
                                <p className="text-sm text-gray-500">Savings Account • 2024-01-31 16:45</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-blue-600">+£5,000.00</p>
                              <Badge className="bg-orange-100 text-orange-800 text-xs">Pending</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feeds" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-brisk-primary" />
                      Bank Feed Management
                    </CardTitle>
                    <CardDescription>Configure and monitor automated bank feed synchronization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                        <Card className="border">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">Active Feeds</p>
                                <p className="text-2xl font-bold">3</p>
                                <p className="text-xs text-gray-500">Connected banks</p>
                              </div>
                              <Zap className="h-8 w-8 text-green-600" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">Sync Frequency</p>
                                <p className="text-2xl font-bold">4x</p>
                                <p className="text-xs text-gray-500">Daily updates</p>
                              </div>
                              <RefreshCw className="h-8 w-8 text-blue-600" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">Last Sync</p>
                                <p className="text-2xl font-bold">2m</p>
                                <p className="text-xs text-gray-500">Minutes ago</p>
                              </div>
                              <Clock className="h-8 w-8 text-orange-600" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                                <p className="text-2xl font-bold">99.8%</p>
                                <p className="text-xs text-gray-500">This month</p>
                              </div>
                              <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Feed Configuration</CardTitle>
                          <CardDescription>Manage bank feed settings and synchronization preferences</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  <div>
                                    <h3 className="font-semibold">Barclays Current Account</h3>
                                    <p className="text-sm text-gray-500">Open Banking • ****1234</p>
                                  </div>
                                </div>
                                <Badge className="bg-green-100 text-green-800">Active</Badge>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                                <span>Sync: Every 6 hours</span>
                                <span>Auto-categorize: Enabled</span>
                                <span>Last sync: 2 minutes ago</span>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Settings className="h-4 w-4 mr-2" />
                                  Configure
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Zap className="h-4 w-4 mr-2" />
                                  Sync Now
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Log
                                </Button>
                              </div>
                            </div>

                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  <div>
                                    <h3 className="font-semibold">HSBC Savings Account</h3>
                                    <p className="text-sm text-gray-500">Open Banking • ****5678</p>
                                  </div>
                                </div>
                                <Badge className="bg-green-100 text-green-800">Active</Badge>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                                <span>Sync: Daily at 9 AM</span>
                                <span>Auto-categorize: Enabled</span>
                                <span>Last sync: 3 hours ago</span>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Settings className="h-4 w-4 mr-2" />
                                  Configure
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Zap className="h-4 w-4 mr-2" />
                                  Sync Now
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Log
                                </Button>
                              </div>
                            </div>

                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                  <div>
                                    <h3 className="font-semibold">Santander Credit Card</h3>
                                    <p className="text-sm text-gray-500">API Integration • ****9012</p>
                                  </div>
                                </div>
                                <Badge className="bg-yellow-100 text-yellow-800">Syncing</Badge>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                                <span>Sync: Every 12 hours</span>
                                <span>Auto-categorize: Enabled</span>
                                <span>Last sync: In progress</span>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Settings className="h-4 w-4 mr-2" />
                                  Configure
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                  Syncing...
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Log
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Sync History & Logs</CardTitle>
                          <CardDescription>Recent synchronization activity and error logs</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <div>
                                  <p className="font-medium">Barclays Current Account</p>
                                  <p className="text-sm text-gray-500">Sync completed • 15 transactions imported</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">2024-02-01 14:30</p>
                                <p className="text-xs text-gray-500">2 minutes ago</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <div>
                                  <p className="font-medium">HSBC Savings Account</p>
                                  <p className="text-sm text-gray-500">Sync completed • 3 transactions imported</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">2024-02-01 11:00</p>
                                <p className="text-xs text-gray-500">3 hours ago</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <AlertCircle className="h-5 w-5 text-orange-500" />
                                <div>
                                  <p className="font-medium">Santander Credit Card</p>
                                  <p className="text-sm text-gray-500">Sync warning • Rate limit reached, retrying</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">2024-02-01 10:45</p>
                                <p className="text-xs text-gray-500">3 hours ago</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Management</CardTitle>
                <CardDescription>Review and categorize transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Input placeholder="Search transactions..." className="flex-1" />
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Accounts</SelectItem>
                      <SelectItem value="current">Current Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <Card key={transaction.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{transaction.description}</h3>
                              <Badge className={getStatusColor(transaction.status)}>
                                {transaction.status}
                              </Badge>
                              <Badge variant="outline">{transaction.category}</Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                              <span>Date: {transaction.date}</span>
                              <span>Account: {transaction.account}</span>
                              <span>VAT: {transaction.vatRate}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`text-lg font-bold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {transaction.amount}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>VAT Returns Management</CardTitle>
                <CardDescription>Making Tax Digital (MTD) compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vatReturns.map((vatReturn) => (
                    <Card key={vatReturn.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{vatReturn.period}</h3>
                              <Badge className={getStatusColor(vatReturn.status)}>
                                {vatReturn.status}
                              </Badge>
                              <Badge variant="outline">Due: {vatReturn.dueDate}</Badge>
                            </div>
                            <div className="mb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-gray-600">Progress:</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-brisk-primary h-2 rounded-full" 
                                    style={{ width: `${vatReturn.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{vatReturn.progress}%</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                              <span>VAT Due: {vatReturn.vatDue}</span>
                              <span>Sales VAT: {vatReturn.salesVat}</span>
                              <span>Purchase VAT: {vatReturn.purchaseVat}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Calculator className="h-4 w-4 mr-2" />
                              Calculate
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                            <Button size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Submit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Management Reports</CardTitle>
                <CardDescription>Financial reports and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">P&amp;L Report</h3>
                      <p className="text-sm text-gray-600 mb-3">Profit and loss statement</p>
                      <Button size="sm" variant="outline">Generate</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <PoundSterling className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Cash Flow</h3>
                      <p className="text-sm text-gray-600 mb-3">Cash flow forecast</p>
                      <Button size="sm" variant="outline">Generate</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Balance Sheet</h3>
                      <p className="text-sm text-gray-600 mb-3">Assets and liabilities</p>
                      <Button size="sm" variant="outline">Generate</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">KPI Dashboard</h3>
                      <p className="text-sm text-gray-600 mb-3">Key performance indicators</p>
                      <Button size="sm" variant="outline">View</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <Receipt className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">VAT Analysis</h3>
                      <p className="text-sm text-gray-600 mb-3">VAT breakdown and analysis</p>
                      <Button size="sm" variant="outline">Generate</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <Download className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Custom Report</h3>
                      <p className="text-sm text-gray-600 mb-3">Build custom reports</p>
                      <Button size="sm" variant="outline">Create</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Project Management</h2>
                <p className="text-gray-600">Advanced project tracking, cost centres, and resource management</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Projects</p>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-xs text-gray-500">2 on track, 1 over budget</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Budget</p>
                      <p className="text-2xl font-bold">£155,000</p>
                      <p className="text-xs text-gray-500">Across all projects</p>
                    </div>
                    <PoundSterling className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Utilization</p>
                      <p className="text-2xl font-bold">78%</p>
                      <p className="text-xs text-gray-500">Resource allocation</p>
                    </div>
                    <Activity className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Profitability</p>
                      <p className="text-2xl font-bold">24.5%</p>
                      <p className="text-xs text-gray-500">Average margin</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Portfolio</CardTitle>
                <CardDescription>Track project progress, budgets, and profitability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectData.map((project) => (
                    <Card key={project.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{project.name}</h3>
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                              <Badge variant="outline">{project.client}</Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                              <span>Budget: {project.budget}</span>
                              <span>Actual: {project.actual}</span>
                              <span>Variance: {project.variance}</span>
                              <span>Manager: {project.manager}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex-1">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>Progress</span>
                                  <span>{project.completion}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-brisk-primary h-2 rounded-full" 
                                    style={{ width: `${project.completion}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">{project.startDate} - {project.endDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-2" />
                              Timeline
                            </Button>
                            <Button variant="outline" size="sm">
                              <Users className="h-4 w-4 mr-2" />
                              Team
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-brisk-primary" />
                    Resource Allocation
                  </CardTitle>
                  <CardDescription>Team capacity and project assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-blue-900">Development Team</h3>
                        <span className="text-sm text-blue-700">85% utilized</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">5 developers across 3 projects</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-green-900">Design Team</h3>
                        <span className="text-sm text-green-700">62% utilized</span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                      <p className="text-sm text-green-700 mt-1">3 designers, capacity available</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-orange-900">Project Managers</h3>
                        <span className="text-sm text-orange-700">95% utilized</span>
                      </div>
                      <div className="w-full bg-orange-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                      <p className="text-sm text-orange-700 mt-1">2 PMs, near capacity</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-brisk-primary" />
                    Project Profitability
                  </CardTitle>
                  <CardDescription>Revenue and margin analysis by project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Website Redesign</span>
                        <span className="text-sm text-green-600">High Margin</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <span>Revenue: £25,000</span>
                        <span>Cost: £18,500</span>
                        <span>Margin: 26%</span>
                        <span>ROI: 35%</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">ERP Implementation</span>
                        <span className="text-sm text-red-600">Low Margin</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <span>Revenue: £85,000</span>
                        <span>Cost: £92,300</span>
                        <span>Margin: -8.6%</span>
                        <span>ROI: -8.6%</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Mobile App</span>
                        <span className="text-sm text-blue-600">Projected</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <span>Revenue: £45,000</span>
                        <span>Cost: £32,000 (est)</span>
                        <span>Margin: 29% (proj)</span>
                        <span>ROI: 41% (proj)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Budgets & Forecasting</h2>
                <p className="text-gray-600">Management accounts, variance analysis, and predictive modeling</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Budget
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Budget
                </Button>
              </div>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Budget vs Actual</p>
                      <p className="text-2xl font-bold">94.2%</p>
                      <p className="text-xs text-gray-500">YTD performance</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Forecast Accuracy</p>
                      <p className="text-2xl font-bold">87%</p>
                      <p className="text-xs text-gray-500">Rolling 12 months</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Variance Alert</p>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-xs text-gray-500">Categories over threshold</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Next Forecast</p>
                      <p className="text-2xl font-bold">£32k</p>
                      <p className="text-xs text-gray-500">Projected profit</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual Analysis</CardTitle>
                <CardDescription>Detailed variance analysis by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetData.map((item, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{item.category}</h3>
                              <Badge className={item.variance >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {item.variancePercent > 0 ? '+' : ''}{item.variancePercent.toFixed(1)}%
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                              <span>Budgeted: £{item.budgeted.toLocaleString()}</span>
                              <span>Actual: £{item.actual.toLocaleString()}</span>
                              <span>Variance: £{item.variance.toLocaleString()}</span>
                              <span>Forecast: £{item.forecast.toLocaleString()}</span>
                            </div>
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress vs Budget</span>
                                <span>{((item.actual / item.budgeted) * 100).toFixed(1)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${item.variance >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                  style={{ width: `${Math.min((item.actual / item.budgeted) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Trend
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Adjust
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-brisk-primary" />
                    Cash Flow Forecast
                  </CardTitle>
                  <CardDescription>AI-powered cash flow predictions with confidence intervals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Interactive Cash Flow Chart</p>
                        <p className="text-xs text-gray-500">Actual vs Forecast with Confidence Bands</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {forecastData.cashFlow.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="font-medium">{item.month}</span>
                          <div className="flex items-center gap-4 text-sm">
                            {item.actual && <span>Actual: £{item.actual.toLocaleString()}</span>}
                            <span>Forecast: £{item.forecast.toLocaleString()}</span>
                            <Badge variant="outline">{item.confidence}% confidence</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-brisk-primary" />
                    Scenario Planning
                  </CardTitle>
                  <CardDescription>Multiple forecast scenarios with probability weighting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forecastData.scenarios.map((scenario, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{scenario.name}</h3>
                          <Badge variant="outline">{scenario.probability}% probability</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <span>Revenue: £{scenario.revenue.toLocaleString()}</span>
                          <span>Profit: £{scenario.profit.toLocaleString()}</span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-brisk-primary h-2 rounded-full" 
                              style={{ width: `${scenario.probability}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900">Weighted Average</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-blue-700 mt-1">
                        <span>Expected Revenue: £157,500</span>
                        <span>Expected Profit: £33,100</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brisk-primary" />
                  AI Budget Insights
                </CardTitle>
                <CardDescription>Intelligent recommendations and predictive analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-900">Cost Optimization</h3>
                      <p className="text-sm text-green-700">Marketing spend is 12% under budget. Consider reallocating £1,800 to high-performing channels for Q2.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900">Revenue Opportunity</h3>
                      <p className="text-sm text-blue-700">Historical data suggests 15% revenue uptick in Q2. Adjust forecast and resource planning accordingly.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold text-orange-900">Risk Alert</h3>
                      <p className="text-sm text-orange-700">Operating expenses trending 6.2% over budget. Review discretionary spending and vendor contracts.</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-purple-900">Seasonal Adjustment</h3>
                      <p className="text-sm text-purple-700">Q3 typically shows 8% revenue decline. Plan cash flow and adjust expense budgets proactively.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projections" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Financial Projections & Modeling</h2>
                <p className="text-gray-600">AI-powered forecasting, scenario planning, and predictive analytics based on client data</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Model
                </Button>
                <Button>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Forecast
                </Button>
              </div>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Forecast Accuracy</p>
                      <p className="text-2xl font-bold">91%</p>
                      <p className="text-xs text-gray-500">Last 12 months</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue Growth</p>
                      <p className="text-2xl font-bold">+12.8%</p>
                      <p className="text-xs text-gray-500">Projected YoY</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cash Position</p>
                      <p className="text-2xl font-bold">£345k</p>
                      <p className="text-xs text-gray-500">6-month projection</p>
                    </div>
                    <PoundSterling className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Risk Score</p>
                      <p className="text-2xl font-bold">Low</p>
                      <p className="text-xs text-gray-500">Weighted assessment</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Projections</CardTitle>
                <CardDescription>AI-powered revenue forecasting with confidence intervals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectionData.revenueProjections.map((item, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{item.period}</h3>
                              <Badge className="bg-blue-100 text-blue-800">
                                {item.confidence}% confidence
                              </Badge>
                              <Badge className="bg-green-100 text-green-800">
                                +{item.growth.toFixed(1)}% growth
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                              {item.historical && <span>Historical: £{item.historical.toLocaleString()}</span>}
                              <span>Projected: £{item.projected.toLocaleString()}</span>
                              <span>Growth: +{item.growth.toFixed(1)}%</span>
                            </div>
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Confidence Level</span>
                                <span>{item.confidence}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${item.confidence}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <LineChart className="h-4 w-4 mr-2" />
                              Trend
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Adjust
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PoundSterling className="h-5 w-5 text-brisk-primary" />
                    Cash Flow Projections
                  </CardTitle>
                  <CardDescription>Monthly cash flow forecasting with opening/closing balances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Interactive Cash Flow Chart</p>
                        <p className="text-xs text-gray-500">Monthly Inflows vs Outflows</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {projectionData.cashFlowProjections.map((item, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{item.month}</span>
                            <span className="text-sm text-green-600">Net: £{(item.inflows - item.outflows).toLocaleString()}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                            <span>Opening: £{item.opening.toLocaleString()}</span>
                            <span>Closing: £{item.closing.toLocaleString()}</span>
                            <span>Inflows: £{item.inflows.toLocaleString()}</span>
                            <span>Outflows: £{item.outflows.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-brisk-primary" />
                    Profitability Projections
                  </CardTitle>
                  <CardDescription>Margin analysis and profitability forecasting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectionData.profitabilityProjections.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{item.metric}</h3>
                          <Badge className={item.trend === 'improving' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {item.trend}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                          <span>Current: {item.current}%</span>
                          <span>Projected: {item.projected}%</span>
                          <span>Target: {item.target}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-brisk-primary h-2 rounded-full" 
                            style={{ width: `${(item.projected / item.target) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Progress to Target</span>
                          <span>{((item.projected / item.target) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brisk-primary" />
                  Key Performance Drivers
                </CardTitle>
                <CardDescription>Critical business metrics driving financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {projectionData.keyDrivers.map((driver, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{driver.driver}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={driver.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                            {driver.impact} Impact
                          </Badge>
                          <Badge variant="outline">{driver.confidence}% confidence</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                        <span>Current: {driver.current}</span>
                        <span>Projected: {driver.projected}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${driver.impact === 'High' ? 'bg-red-500' : 'bg-yellow-500'}`}
                          style={{ width: `${driver.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-brisk-primary" />
                  Risk Assessment & Mitigation
                </CardTitle>
                <CardDescription>Identified risks and recommended mitigation strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectionData.riskFactors.map((risk, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{risk.risk}</h3>
                              <Badge className={risk.probability > 40 ? 'bg-red-100 text-red-800' : risk.probability > 25 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                                {risk.probability}% probability
                              </Badge>
                              <Badge className={risk.impact === 'High' ? 'bg-red-100 text-red-800' : risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                                {risk.impact} impact
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Mitigation:</strong> {risk.mitigation}
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${risk.probability > 40 ? 'bg-red-500' : risk.probability > 25 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                style={{ width: `${risk.probability}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Monitor
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-2" />
                              Mitigate
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brisk-primary" />
                  AI-Powered Insights & Recommendations
                </CardTitle>
                <CardDescription>Machine learning insights based on client data patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900">Revenue Optimization</h3>
                      <p className="text-sm text-blue-700">Analysis of client data suggests 15% revenue increase possible through customer retention programs. Historical data shows 8% improvement in similar businesses.</p>
                      <div className="mt-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-xs text-blue-600">Confidence: 89% | Impact: High</span>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-900">Cost Efficiency</h3>
                      <p className="text-sm text-green-700">Predictive model identifies £18,500 annual savings through vendor consolidation and automated processes based on transaction patterns.</p>
                      <div className="mt-2 flex items-center gap-2">
                        <PoundSterling className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-green-600">Confidence: 92% | Savings: £18.5k</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-purple-900">Market Timing</h3>
                      <p className="text-sm text-purple-700">Seasonal analysis indicates optimal expansion timing in Q2. Client data patterns show 23% higher success rates for initiatives launched in this period.</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="text-xs text-purple-600">Optimal Window: Q2 2024</span>
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold text-orange-900">Cash Flow Optimization</h3>
                      <p className="text-sm text-orange-700">Payment term adjustments could improve cash flow by £45,000 over 6 months. Model based on 500+ similar client scenarios.</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-orange-600" />
                        <span className="text-xs text-orange-600">Improvement: £45k over 6 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="property" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Property Management</h2>
                <p className="text-gray-600">Landlord portfolio, rent schedules, and tenant management</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Properties</p>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-xs text-gray-500">2 occupied, 1 vacant</p>
                    </div>
                    <Building className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Rent</p>
                      <p className="text-2xl font-bold">£7,200</p>
                      <p className="text-xs text-gray-500">66.7% occupancy</p>
                    </div>
                    <PoundSterling className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Tenants</p>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-xs text-gray-500">All rent current</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Maintenance</p>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-xs text-gray-500">Issues pending</p>
                    </div>
                    <Wrench className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Property Portfolio</CardTitle>
                <CardDescription>Manage your rental properties and tenants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <Card key={property.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{property.address}</h3>
                              <Badge className={getStatusColor(property.status)}>
                                {property.status}
                              </Badge>
                              <Badge variant="outline">{property.type}</Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                              <span>Rent: {property.monthlyRent}</span>
                              <span>Tenants: {property.tenants}</span>
                              <span>Occupancy: {property.occupancy}</span>
                              <span>Issues: {property.maintenanceIssues}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Next rent due: {property.nextRentDue}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Users className="h-4 w-4 mr-2" />
                              Tenants
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-brisk-primary" />
                    Rent Schedule
                  </CardTitle>
                  <CardDescription>Upcoming rent payments and due dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-green-900">123 High Street</h3>
                          <p className="text-sm text-green-700">Due: Feb 1, 2024</p>
                        </div>
                        <span className="text-lg font-bold text-green-900">£2,400</span>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-yellow-900">456 Commercial Road</h3>
                          <p className="text-sm text-yellow-700">Due: Feb 15, 2024</p>
                        </div>
                        <span className="text-lg font-bold text-yellow-900">£4,800</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-brisk-primary" />
                    Maintenance Tracker
                  </CardTitle>
                  <CardDescription>Property maintenance and repair requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h3 className="font-semibold text-red-900">Heating System Repair</h3>
                      <p className="text-sm text-red-700">456 Commercial Road - Urgent</p>
                      <p className="text-xs text-red-600 mt-1">Reported: Jan 18, 2024</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold text-orange-900">Plumbing Issue</h3>
                      <p className="text-sm text-orange-700">789 Garden Lane - Medium</p>
                      <p className="text-xs text-orange-600 mt-1">Reported: Jan 20, 2024</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h3 className="font-semibold text-yellow-900">Window Cleaning</h3>
                      <p className="text-sm text-yellow-700">456 Commercial Road - Low</p>
                      <p className="text-xs text-yellow-600 mt-1">Scheduled: Feb 1, 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ecommerce" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">eCommerce Integration</h2>
                <p className="text-gray-600">Multi-platform sales, settlement parsing, and reconciliation</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Connect Platform
              </Button>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold">£27,610</p>
                      <p className="text-xs text-gray-500">This month</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Platform Fees</p>
                      <p className="text-2xl font-bold">£2,896</p>
                      <p className="text-xs text-gray-500">10.5% of revenue</p>
                    </div>
                    <Percent className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Net Settlement</p>
                      <p className="text-2xl font-bold">£24,714</p>
                      <p className="text-xs text-gray-500">After fees</p>
                    </div>
                    <PoundSterling className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                      <p className="text-2xl font-bold">43</p>
                      <p className="text-xs text-gray-500">Awaiting fulfillment</p>
                    </div>
                    <Package className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Platform Connections</CardTitle>
                <CardDescription>Manage your eCommerce platform integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ecommerceConnections.map((connection) => (
                    <Card key={connection.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{connection.storeName}</h3>
                              <Badge className={getStatusColor(connection.status)}>
                                {connection.status}
                              </Badge>
                              <Badge variant="outline">{connection.platform}</Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                              <span>Revenue: {connection.monthlyRevenue}</span>
                              <span>Fees: {connection.fees}</span>
                              <span>Net: {connection.netRevenue}</span>
                              <span>Orders: {connection.pendingOrders}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Last sync: {connection.lastSync}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Sync
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Analytics
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-2" />
                              Settings
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Settlement Parsing</CardTitle>
                  <CardDescription>Automated fee breakdown and reconciliation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900">Amazon Settlement</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-blue-700 mt-2">
                        <span>Gross Sales: £15,240</span>
                        <span>Referral Fees: £1,524</span>
                        <span>FBA Fees: £762</span>
                        <span>Net Settlement: £12,954</span>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-900">Shopify Payout</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-green-700 mt-2">
                        <span>Gross Sales: £8,950</span>
                        <span>Transaction Fees: £268</span>
                        <span>Chargebacks: £0</span>
                        <span>Net Payout: £8,682</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Multi-Channel SKU Mapping</CardTitle>
                  <CardDescription>Product synchronization across platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Wireless Headphones</h3>
                        <Badge variant="outline">SKU: WH001</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                        <span>Amazon: B08XYZ123</span>
                        <span>eBay: 123456789</span>
                        <span>Shopify: WH-001-BLK</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Bluetooth Speaker</h3>
                        <Badge variant="outline">SKU: BS002</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                        <span>Amazon: B09ABC456</span>
                        <span>eBay: 987654321</span>
                        <span>Shopify: BS-002-WHT</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Document Management & OCR</h2>
                <p className="text-gray-600">Intelligent document processing with auto-posting and approval workflows</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Scan Mobile
                </Button>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </div>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Documents Processed</p>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-xs text-gray-500">This month</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">OCR Accuracy</p>
                      <p className="text-2xl font-bold">94%</p>
                      <p className="text-xs text-gray-500">Average confidence</p>
                    </div>
                    <Scan className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Auto-Posted</p>
                      <p className="text-2xl font-bold">89</p>
                      <p className="text-xs text-gray-500">57% automation rate</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Review</p>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-xs text-gray-500">Awaiting approval</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Document Processing Queue</CardTitle>
                <CardDescription>OCR processing and auto-posting suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((document) => (
                    <Card key={document.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{document.name}</h3>
                              <Badge className={getStatusColor(document.status)}>
                                {document.status}
                              </Badge>
                              <Badge variant="outline">{document.type}</Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                              <span>Amount: {document.amount}</span>
                              <span>Supplier: {document.supplier}</span>
                              <span>Category: {document.suggestedCategory}</span>
                              <span>Confidence: {document.ocrConfidence}%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Uploaded: {document.uploadDate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-brisk-primary" />
                    AI Document Insights
                  </CardTitle>
                  <CardDescription>Intelligent categorization and anomaly detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900">Smart Categorization</h3>
                      <p className="text-sm text-blue-700">12 documents auto-categorized with 95%+ confidence. Review 3 uncertain classifications.</p>
                      <Button size="sm" className="mt-2">Review Suggestions</Button>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-900">Duplicate Detection</h3>
                      <p className="text-sm text-green-700">2 potential duplicate invoices detected. Prevent double-posting with smart matching.</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold text-orange-900">Expense Anomaly</h3>
                      <p className="text-sm text-orange-700">Office supplies expense 40% higher than usual. Review for accuracy.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Approval Workflow</CardTitle>
                  <CardDescription>Multi-step approval process for document posting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">High-Value Expenses</h3>
                        <Badge variant="outline">£500+ threshold</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Requires manager approval before posting</p>
                      <div className="flex items-center gap-2 mt-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Auto-approved: 23 documents</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Uncertain Classifications</h3>
                        <Badge variant="outline">&lt;85% confidence</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Manual review required for accuracy</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Pending review: 5 documents</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Advanced Analytics</h2>
                <p className="text-gray-600">Interactive dashboards, forecasting, and business intelligence</p>
              </div>
              <div className="flex gap-2">
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cash Flow Trend</p>
                      <p className="text-2xl font-bold">+12.5%</p>
                      <p className="text-xs text-gray-500">vs last period</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Expense Ratio</p>
                      <p className="text-2xl font-bold">74.2%</p>
                      <p className="text-xs text-gray-500">Of total revenue</p>
                    </div>
                    <PieChart className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                      <p className="text-2xl font-bold">25.8%</p>
                      <p className="text-xs text-gray-500">Net margin</p>
                    </div>
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Forecast Accuracy</p>
                      <p className="text-2xl font-bold">91%</p>
                      <p className="text-xs text-gray-500">AI prediction</p>
                    </div>
                    <Activity className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cash Flow Analysis</CardTitle>
                  <CardDescription>6-month trend with forecasting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Interactive Cash Flow Chart</p>
                        <p className="text-xs text-gray-500">Inflow vs Outflow Trends</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm font-medium text-green-600">Average Inflow</p>
                        <p className="text-lg font-bold">£53,333</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-600">Average Outflow</p>
                        <p className="text-lg font-bold">£39,000</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Net Average</p>
                        <p className="text-lg font-bold">£14,333</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>Category analysis with trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Interactive Expense Pie Chart</p>
                        <p className="text-xs text-gray-500">Category Breakdown</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {analyticsData.expenseBreakdown.slice(0, 3).map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{category.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">£{category.amount.toLocaleString()}</span>
                            <span className="text-xs text-gray-500">{category.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brisk-primary" />
                  AI-Powered Business Insights
                </CardTitle>
                <CardDescription>Predictive analytics and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900">Cash Flow Forecast</h3>
                      <p className="text-sm text-blue-700">Based on current trends, expect £16,200 net cash flow next month with 91% confidence.</p>
                      <div className="mt-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-xs text-blue-600">12% improvement vs current month</span>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-900">Expense Optimization</h3>
                      <p className="text-sm text-green-700">Potential savings of £2,400/month identified through vendor consolidation and contract renegotiation.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold text-orange-900">Seasonal Patterns</h3>
                      <p className="text-sm text-orange-700">Revenue typically increases 18% in Q2. Consider increasing inventory and marketing spend.</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-purple-900">Risk Assessment</h3>
                      <p className="text-sm text-purple-700">Customer concentration risk: Top 3 clients represent 45% of revenue. Diversification recommended.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Multi-Currency Dashboard</CardTitle>
                  <CardDescription>Real-time FX rates and currency exposure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currencies.map((currency) => (
                      <div key={currency.code} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">{currency.symbol}</span>
                          </div>
                          <div>
                            <p className="font-medium">{currency.code}</p>
                            <p className="text-sm text-gray-600">{currency.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{currency.rate.toFixed(4)}</p>
                          <p className="text-xs text-gray-500">vs GBP</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Benchmarks</CardTitle>
                  <CardDescription>Industry comparisons and KPI tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Gross Margin</span>
                        <span className="text-sm text-green-600">Above Average</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Your: 78%</span>
                        <span>Industry: 65%</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Operating Efficiency</span>
                        <span className="text-sm text-yellow-600">Average</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Your: 62%</span>
                        <span>Industry: 68%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveLayout>
  )
}
