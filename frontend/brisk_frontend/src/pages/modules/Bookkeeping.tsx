import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BookOpen,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Download,
  Upload,
  FileText,
  Users,
  CreditCard,
  Building,
  Package,
  Receipt,
  DollarSign,
  Banknote,
  ArrowUpDown,
  CheckCircle,
  Clock,
  AlertCircle,
  Circle
} from 'lucide-react'
import { useResponsive } from '@/hooks/use-responsive'

interface Invoice {
  id: string
  number: string
  customer: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  dueDate: string
  issueDate: string
}

interface Quote {
  id: string
  number: string
  customer: string
  amount: number
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'expired'
  validUntil: string
  issueDate: string
}

interface Bill {
  id: string
  supplier: string
  amount: number
  status: 'pending' | 'approved' | 'paid'
  dueDate: string
  reference: string
  issueDate: string
}

interface PurchaseOrder {
  id: string
  supplier: string
  amount: number
  status: 'draft' | 'sent' | 'confirmed' | 'delivered' | 'cancelled'
  orderDate: string
  deliveryDate: string
  reference: string
}

interface BankTransaction {
  id: string
  date: string
  description: string
  amount: number
  type: 'credit' | 'debit'
  status: 'reconciled' | 'pending' | 'unmatched'
  account: string
  reference: string
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOwed: number
  status: 'active' | 'inactive'
}

interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  totalOwed: number
  status: 'active' | 'inactive'
}

interface SearchAndFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  statusOptions: { value: string; label: string }[]
  dateFrom: string
  dateTo: string
  onDateChange: (type: 'from' | 'to', value: string) => void
  showDateFilter?: boolean
  accountFilter?: string
  onAccountChange?: (value: string) => void
  accountOptions?: { value: string; label: string }[]
  showAccountFilter?: boolean
}

const SearchAndFilters = ({ 
  searchTerm,
  onSearchChange, 
  statusFilter,
  onStatusChange, 
  statusOptions, 
  dateFrom,
  dateTo,
  onDateChange,
  showDateFilter = true,
  accountFilter,
  onAccountChange,
  accountOptions,
  showAccountFilter = false
}: SearchAndFiltersProps) => {
  const { isMobile } = useResponsive()
  
  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 mb-6`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input 
          placeholder="Search..." 
          className="pl-10" 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className={`${isMobile ? 'w-full' : 'w-48'}`}>
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {statusOptions.map(status => (
            <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showAccountFilter && accountOptions && onAccountChange && (
        <Select value={accountFilter} onValueChange={onAccountChange}>
          <SelectTrigger className={`${isMobile ? 'w-full' : 'w-48'}`}>
            <SelectValue placeholder="All Accounts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>
            {accountOptions.map(account => (
              <SelectItem key={account.value} value={account.value}>{account.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {showDateFilter && (
        <>
          <Input 
            type="date" 
            placeholder="From Date" 
            value={dateFrom}
            onChange={(e) => onDateChange('from', e.target.value)}
            className={`${isMobile ? 'w-full' : 'w-40'}`}
          />
          <Input 
            type="date" 
            placeholder="To Date" 
            value={dateTo}
            onChange={(e) => onDateChange('to', e.target.value)}
            className={`${isMobile ? 'w-full' : 'w-40'}`}
          />
        </>
      )}
    </div>
  )
}

export default function Bookkeeping() {
  const { isMobile } = useResponsive()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [activeSalesTab, setActiveSalesTab] = useState('invoices')
  const [activePurchasesTab, setActivePurchasesTab] = useState('bills')
  const [activeBankingTab, setActiveBankingTab] = useState('accounts')

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [accountFilter, setAccountFilter] = useState('all')

  const [invoicesData, setInvoicesData] = useState<Invoice[]>([])
  const [quotesData, setQuotesData] = useState<Quote[]>([])
  const [billsData, setBillsData] = useState<Bill[]>([])
  const [purchaseOrdersData, setPurchaseOrdersData] = useState<PurchaseOrder[]>([])
  const [bankTransactionsData, setBankTransactionsData] = useState<BankTransaction[]>([])
  const [customersData, setCustomersData] = useState<Customer[]>([])
  const [suppliersData, setSuppliersData] = useState<Supplier[]>([])

  useEffect(() => {
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        number: 'INV-2024-001',
        customer: 'ABC Manufacturing Ltd',
        amount: 2500.00,
        status: 'sent',
        dueDate: '2024-02-15',
        issueDate: '2024-01-15'
      },
      {
        id: '2',
        number: 'INV-2024-002',
        customer: 'Tech Solutions Ltd',
        amount: 1800.00,
        status: 'paid',
        dueDate: '2024-02-20',
        issueDate: '2024-01-20'
      },
      {
        id: '3',
        number: 'INV-2024-003',
        customer: 'Green Energy Co',
        amount: 3200.00,
        status: 'overdue',
        dueDate: '2024-01-30',
        issueDate: '2024-01-01'
      },
      {
        id: '4',
        number: 'INV-2024-004',
        customer: 'Digital Marketing Agency',
        amount: 950.00,
        status: 'draft',
        dueDate: '2024-02-25',
        issueDate: '2024-01-25'
      }
    ]

    const mockQuotes: Quote[] = [
      {
        id: '1',
        number: 'QUO-2024-001',
        customer: 'Future Tech Ltd',
        amount: 4500.00,
        status: 'sent',
        validUntil: '2024-02-28',
        issueDate: '2024-01-28'
      },
      {
        id: '2',
        number: 'QUO-2024-002',
        customer: 'Retail Solutions Inc',
        amount: 2200.00,
        status: 'accepted',
        validUntil: '2024-02-15',
        issueDate: '2024-01-15'
      }
    ]

    const mockBills: Bill[] = [
      {
        id: '1',
        supplier: 'Office Supplies Ltd',
        amount: 450.00,
        status: 'pending',
        dueDate: '2024-02-10',
        reference: 'OS-2024-001',
        issueDate: '2024-01-10'
      },
      {
        id: '2',
        supplier: 'Utilities Company',
        amount: 280.00,
        status: 'approved',
        dueDate: '2024-02-05',
        reference: 'UC-JAN-2024',
        issueDate: '2024-01-05'
      },
      {
        id: '3',
        supplier: 'Software Licensing Corp',
        amount: 1200.00,
        status: 'paid',
        dueDate: '2024-01-31',
        reference: 'SLC-2024-Q1',
        issueDate: '2024-01-01'
      }
    ]

    const mockPurchaseOrders: PurchaseOrder[] = [
      {
        id: '1',
        supplier: 'Equipment Supplier Ltd',
        amount: 5500.00,
        status: 'confirmed',
        orderDate: '2024-01-20',
        deliveryDate: '2024-02-20',
        reference: 'PO-2024-001'
      },
      {
        id: '2',
        supplier: 'Raw Materials Inc',
        amount: 3200.00,
        status: 'delivered',
        orderDate: '2024-01-15',
        deliveryDate: '2024-02-01',
        reference: 'PO-2024-002'
      }
    ]

    const mockBankTransactions: BankTransaction[] = [
      {
        id: '1',
        date: '2024-01-25',
        description: 'Payment from ABC Manufacturing Ltd',
        amount: 2500.00,
        type: 'credit',
        status: 'reconciled',
        account: 'Current Account',
        reference: 'TXN-001'
      },
      {
        id: '2',
        date: '2024-01-24',
        description: 'Office rent payment',
        amount: -1200.00,
        type: 'debit',
        status: 'reconciled',
        account: 'Current Account',
        reference: 'TXN-002'
      },
      {
        id: '3',
        date: '2024-01-23',
        description: 'Unknown transfer',
        amount: 500.00,
        type: 'credit',
        status: 'unmatched',
        account: 'Savings Account',
        reference: 'TXN-003'
      }
    ]

    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'ABC Manufacturing Ltd',
        email: 'accounts@abcmanufacturing.com',
        phone: '+44 20 1234 5678',
        totalOwed: 2500.00,
        status: 'active'
      },
      {
        id: '2',
        name: 'Tech Solutions Ltd',
        email: 'billing@techsolutions.co.uk',
        phone: '+44 161 987 6543',
        totalOwed: 0.00,
        status: 'active'
      }
    ]

    const mockSuppliers: Supplier[] = [
      {
        id: '1',
        name: 'Office Supplies Ltd',
        email: 'invoices@officesupplies.com',
        phone: '+44 113 456 7890',
        totalOwed: 450.00,
        status: 'active'
      },
      {
        id: '2',
        name: 'Utilities Company',
        email: 'billing@utilities.co.uk',
        phone: '+44 20 9876 5432',
        totalOwed: 280.00,
        status: 'active'
      }
    ]

    setInvoicesData(mockInvoices)
    setQuotesData(mockQuotes)
    setBillsData(mockBills)
    setPurchaseOrdersData(mockPurchaseOrders)
    setBankTransactionsData(mockBankTransactions)
    setCustomersData(mockCustomers)
    setSuppliersData(mockSuppliers)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
      case 'reconciled':
      case 'delivered':
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
      case 'sent':
      case 'confirmed':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'overdue':
      case 'unmatched':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'draft':
        return <FileText className="h-4 w-4 text-gray-600" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: 'bg-green-100 text-green-800',
      sent: 'bg-blue-100 text-blue-800',
      overdue: 'bg-red-100 text-red-800',
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      reconciled: 'bg-green-100 text-green-800',
      unmatched: 'bg-red-100 text-red-800',
      confirmed: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      accepted: 'bg-green-100 text-green-800',
      declined: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800'
    }
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const filteredInvoices = useMemo(() => {
    return invoicesData.filter(invoice => {
      const matchesSearch = invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           invoice.number.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
      const matchesDateRange = (!dateFrom || invoice.issueDate >= dateFrom) && 
                              (!dateTo || invoice.issueDate <= dateTo)
      return matchesSearch && matchesStatus && matchesDateRange
    })
  }, [invoicesData, searchTerm, statusFilter, dateFrom, dateTo])

  const filteredQuotes = useMemo(() => {
    return quotesData.filter(quote => {
      const matchesSearch = quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quote.number.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || quote.status === statusFilter
      const matchesDateRange = (!dateFrom || quote.issueDate >= dateFrom) && 
                              (!dateTo || quote.issueDate <= dateTo)
      return matchesSearch && matchesStatus && matchesDateRange
    })
  }, [quotesData, searchTerm, statusFilter, dateFrom, dateTo])

  const filteredBills = useMemo(() => {
    return billsData.filter(bill => {
      const matchesSearch = bill.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bill.reference.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || bill.status === statusFilter
      const matchesDateRange = (!dateFrom || bill.issueDate >= dateFrom) && 
                              (!dateTo || bill.issueDate <= dateTo)
      return matchesSearch && matchesStatus && matchesDateRange
    })
  }, [billsData, searchTerm, statusFilter, dateFrom, dateTo])

  const filteredPurchaseOrders = useMemo(() => {
    return purchaseOrdersData.filter(po => {
      const matchesSearch = po.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           po.reference.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || po.status === statusFilter
      const matchesDateRange = (!dateFrom || po.orderDate >= dateFrom) && 
                              (!dateTo || po.orderDate <= dateTo)
      return matchesSearch && matchesStatus && matchesDateRange
    })
  }, [purchaseOrdersData, searchTerm, statusFilter, dateFrom, dateTo])

  const filteredBankTransactions = useMemo(() => {
    return bankTransactionsData.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
      const matchesAccount = accountFilter === 'all' || transaction.account === accountFilter
      const matchesDateRange = (!dateFrom || transaction.date >= dateFrom) && 
                              (!dateTo || transaction.date <= dateTo)
      return matchesSearch && matchesStatus && matchesAccount && matchesDateRange
    })
  }, [bankTransactionsData, searchTerm, statusFilter, accountFilter, dateFrom, dateTo])

  const filteredCustomers = useMemo(() => {
    return customersData.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [customersData, searchTerm, statusFilter])

  const filteredSuppliers = useMemo(() => {
    return suppliersData.filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [suppliersData, searchTerm, statusFilter])

  const invoiceStatusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' }
  ]

  const quoteStatusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'declined', label: 'Declined' },
    { value: 'expired', label: 'Expired' }
  ]

  const billStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'paid', label: 'Paid' }
  ]

  const purchaseOrderStatusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  const bankTransactionStatusOptions = [
    { value: 'reconciled', label: 'Reconciled' },
    { value: 'pending', label: 'Pending' },
    { value: 'unmatched', label: 'Unmatched' }
  ]

  const accountOptions = [
    { value: 'Current Account', label: 'Current Account' },
    { value: 'Savings Account', label: 'Savings Account' },
    { value: 'Business Account', label: 'Business Account' }
  ]

  const customerStatusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]

  const supplierStatusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
        <div>
          <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Bookkeeping</h1>
          <p className="text-gray-600 mt-2">Bank feeds, VAT MTD, reconciliation, and management accounts</p>
        </div>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
          <Button variant="outline" className={isMobile ? 'w-full' : ''}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`}>
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="purchases" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Purchases
          </TabsTrigger>
          <TabsTrigger value="banking" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Banking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                    <p className="text-2xl font-bold">£8,450</p>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Outstanding Bills</p>
                    <p className="text-2xl font-bold">£730</p>
                    <p className="text-sm text-orange-600">Due this week</p>
                  </div>
                  <Receipt className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bank Balance</p>
                    <p className="text-2xl font-bold">£15,280</p>
                    <p className="text-sm text-green-600">Across all accounts</p>
                  </div>
                  <Banknote className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Unreconciled</p>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-red-600">Transactions pending</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Tabs value={activeSalesTab} onValueChange={setActiveSalesTab}>
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="quotes">Quotes</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>

            <TabsContent value="invoices" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={invoiceStatusOptions}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Invoices</CardTitle>
                  <CardDescription>Manage customer invoices and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredInvoices.map((invoice) => (
                      <div key={invoice.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                        <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                          {getStatusIcon(invoice.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{invoice.number}</h4>
                            <p className="text-sm text-gray-600">{invoice.customer}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${getStatusBadge(invoice.status)}`}>
                                {invoice.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                          <div>
                            <p className="text-sm font-medium">£{invoice.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Due: {invoice.dueDate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quotes" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={quoteStatusOptions}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Quotes</CardTitle>
                  <CardDescription>Manage customer quotes and proposals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredQuotes.map((quote) => (
                      <div key={quote.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                        <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                          {getStatusIcon(quote.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{quote.number}</h4>
                            <p className="text-sm text-gray-600">{quote.customer}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${getStatusBadge(quote.status)}`}>
                                {quote.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                          <div>
                            <p className="text-sm font-medium">£{quote.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Valid until: {quote.validUntil}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={customerStatusOptions}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
                showDateFilter={false}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Customers</CardTitle>
                  <CardDescription>Manage customer information and relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredCustomers.map((customer) => (
                      <div key={customer.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                        <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                          <Users className="h-8 w-8 text-blue-600" />
                          <div className="flex-1">
                            <h4 className="font-medium">{customer.name}</h4>
                            <p className="text-sm text-gray-600">{customer.email}</p>
                            <p className="text-sm text-gray-600">{customer.phone}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${getStatusBadge(customer.status)}`}>
                                {customer.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                          <div>
                            <p className="text-sm font-medium">Outstanding: £{customer.totalOwed.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
                showDateFilter={false}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Products & Services</CardTitle>
                  <CardDescription>Manage your product and service catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No products configured yet</p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="purchases" className="space-y-6">
          <Tabs value={activePurchasesTab} onValueChange={setActivePurchasesTab}>
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <TabsTrigger value="bills">Bills</TabsTrigger>
              <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>

            <TabsContent value="bills" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={billStatusOptions}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Bills</CardTitle>
                  <CardDescription>Manage supplier bills and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredBills.map((bill) => (
                      <div key={bill.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                        <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                          {getStatusIcon(bill.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{bill.reference}</h4>
                            <p className="text-sm text-gray-600">{bill.supplier}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${getStatusBadge(bill.status)}`}>
                                {bill.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                          <div>
                            <p className="text-sm font-medium">£{bill.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Due: {bill.dueDate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={purchaseOrderStatusOptions}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Orders</CardTitle>
                  <CardDescription>Manage purchase orders and deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredPurchaseOrders.map((po) => (
                      <div key={po.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                        <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                          {getStatusIcon(po.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{po.reference}</h4>
                            <p className="text-sm text-gray-600">{po.supplier}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${getStatusBadge(po.status)}`}>
                                {po.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                          <div>
                            <p className="text-sm font-medium">£{po.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Delivery: {po.deliveryDate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suppliers" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={supplierStatusOptions}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
                showDateFilter={false}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Suppliers</CardTitle>
                  <CardDescription>Manage supplier information and relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredSuppliers.map((supplier) => (
                      <div key={supplier.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                        <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                          <Building className="h-8 w-8 text-purple-600" />
                          <div className="flex-1">
                            <h4 className="font-medium">{supplier.name}</h4>
                            <p className="text-sm text-gray-600">{supplier.email}</p>
                            <p className="text-sm text-gray-600">{supplier.phone}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${getStatusBadge(supplier.status)}`}>
                                {supplier.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                          <div>
                            <p className="text-sm font-medium">Outstanding: £{supplier.totalOwed.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={[{ value: 'pending', label: 'Pending' }, { value: 'approved', label: 'Approved' }, { value: 'reimbursed', label: 'Reimbursed' }]}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Expenses</CardTitle>
                  <CardDescription>Manage employee expenses and reimbursements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No expenses recorded yet</p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Expense
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="banking" className="space-y-6">
          <Tabs value={activeBankingTab} onValueChange={setActiveBankingTab}>
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <TabsTrigger value="accounts">Bank Accounts</TabsTrigger>
              <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
              <TabsTrigger value="feeds">Bank Feeds</TabsTrigger>
              <TabsTrigger value="transfers">Transfers</TabsTrigger>
            </TabsList>

            <TabsContent value="accounts" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
                showDateFilter={false}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Bank Accounts</CardTitle>
                  <CardDescription>Manage connected bank accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CreditCard className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Current Account</h4>
                          <p className="text-sm text-gray-600">****1234</p>
                          <Badge className="text-xs bg-green-100 text-green-800">Connected</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">£12,580.00</p>
                        <p className="text-sm text-gray-600">Last sync: 2 hours ago</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CreditCard className="h-8 w-8 text-green-600" />
                        <div>
                          <h4 className="font-medium">Savings Account</h4>
                          <p className="text-sm text-gray-600">****5678</p>
                          <Badge className="text-xs bg-green-100 text-green-800">Connected</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">£2,700.00</p>
                        <p className="text-sm text-gray-600">Last sync: 1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reconciliation" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={bankTransactionStatusOptions}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
                accountFilter={accountFilter}
                onAccountChange={setAccountFilter}
                accountOptions={accountOptions}
                showAccountFilter={true}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Bank Reconciliation</CardTitle>
                  <CardDescription>Match bank transactions with accounting records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredBankTransactions.map((transaction) => (
                      <div key={transaction.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                        <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                          {getStatusIcon(transaction.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{transaction.description}</h4>
                            <p className="text-sm text-gray-600">{transaction.account} • {transaction.reference}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`text-xs ${getStatusBadge(transaction.status)}`}>
                                {transaction.status}
                              </Badge>
                              <Badge className={`text-xs ${transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {transaction.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                          <div>
                            <p className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {transaction.amount >= 0 ? '+' : ''}£{Math.abs(transaction.amount).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">{transaction.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {transaction.status === 'unmatched' && (
                              <Button variant="ghost" size="sm">
                                <ArrowUpDown className="h-4 w-4" />
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

            <TabsContent value="feeds" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={[{ value: 'connected', label: 'Connected' }, { value: 'disconnected', label: 'Disconnected' }, { value: 'error', label: 'Error' }]}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
                showDateFilter={false}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Bank Feeds</CardTitle>
                  <CardDescription>Manage automatic bank feed connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Bank feeds are automatically syncing</p>
                    <p className="text-sm text-gray-500 mt-2">Last update: 2 hours ago</p>
                    <Button className="mt-4">
                      <Upload className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transfers" className="space-y-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statusOptions={[{ value: 'completed', label: 'Completed' }, { value: 'pending', label: 'Pending' }, { value: 'failed', label: 'Failed' }]}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateChange={(type, value) => type === 'from' ? setDateFrom(value) : setDateTo(value)}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Bank Transfers</CardTitle>
                  <CardDescription>Manage inter-account transfers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <ArrowUpDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No transfers recorded yet</p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      New Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}
