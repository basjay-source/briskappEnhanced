import React, { useState } from 'react'
import { 
  CreditCard, 
  Receipt, 
  TrendingUp, 
  TrendingDown,
  Download,
  Upload,
  Eye,
  Edit,
  Filter,
  Link,
  FileText,
  Calculator,
  PoundSterling,
  BarChart3,
  Building,
  Users,
  Plus,
  PieChart,
  LineChart,
  Activity,
  Target,
  ShoppingCart,
  Percent,
  Package,
  RefreshCw,
  Scan,
  UserCheck,
  ChevronDown,
  BookOpen,
  Database,
  Landmark,
  Clock,
  Copy,
  RotateCcw,
  AlertCircle,
  ExternalLink,
  CheckCircle,
  Search,
  Settings,
  Calendar,
  ArrowLeftRight,
  Tags,
  Trash2,
  Warehouse,
  Box,
  ClipboardList,
  Bell,
  BarChart,
  Layers,
  Hash
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import AIPromptSection from '../../components/AIPromptSection'
import KPICard from '../../components/KPICard'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'
import InvoiceTemplateManager from '../../components/InvoiceTemplateManager'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ExportButton } from '@/components/ExportButton'

export default function Bookkeeping() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['transactions', 'reports'])
  const isMobile = useIsMobile()
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  
  const [reportsSearchTerm, setReportsSearchTerm] = useState('')
  const [reportsSelectedPeriod, setReportsSelectedPeriod] = useState('current')
  const [reportsSelectedClient, setReportsSelectedClient] = useState('all')
  const [reportsSelectedDepartment, setReportsSelectedDepartment] = useState('all')
  const [reportsSelectedAnalysis, setReportsSelectedAnalysis] = useState('ratio')
  const [reportsSelectedComparison, setReportsSelectedComparison] = useState('industry')
  const [reportsDateFrom, setReportsDateFrom] = useState('')
  const [reportsDateTo, setReportsDateTo] = useState('')

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<any>(null)
  const [editFormData, setEditFormData] = useState<any>({})
  const [addFormData, setAddFormData] = useState<any>({
    name: '',
    bank: '',
    accountNumber: '',
    balance: 0,
    type: 'Current',
    status: 'Active'
  })

  const [isTransactionDetailOpen, setIsTransactionDetailOpen] = useState(false)
  const [isTransactionEditOpen, setIsTransactionEditOpen] = useState(false)
  const [isCashCodingOpen, setIsCashCodingOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [transactionFormData, setTransactionFormData] = useState<any>({})

  const [isMatchTransactionOpen, setIsMatchTransactionOpen] = useState(false)
  const [isBankingRulesOpen, setIsBankingRulesOpen] = useState(false)
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false)
  const [selectedReconciliationItem, setSelectedReconciliationItem] = useState<any>(null)
  const [matchCandidates, setMatchCandidates] = useState<any[]>([])
  const [bankingRules, setBankingRules] = useState<any[]>([
    { id: 1, name: 'Auto-categorize Office Rent', condition: 'Description contains "Rent"', category: 'Rent', autoMatch: true, status: 'Active' },
    { id: 2, name: 'Supplier Payments', condition: 'Description contains "Supplier" OR "Tech Co"', category: 'Purchases', autoMatch: true, status: 'Active' },
    { id: 3, name: 'Customer Receipts', condition: 'Amount > 1000 AND Type = Credit', category: 'Sales', autoMatch: false, status: 'Active' }
  ])
  const [ruleFormData, setRuleFormData] = useState<any>({
    name: '',
    condition: '',
    category: '',
    autoMatch: true,
    status: 'Active'
  })

  const [bankFeeds, setBankFeeds] = useState<any[]>([
    { id: 1, bank: 'Barclays Business', account: '****1234', status: 'Active', lastSync: '2 hours ago', frequency: 'Every 4 hours', transactions: 156, accountId: 'ACC-001' },
    { id: 2, bank: 'HSBC Business', account: '****5678', status: 'Active', lastSync: '1 hour ago', frequency: 'Every 2 hours', transactions: 89, accountId: 'ACC-002' },
    { id: 3, bank: 'Lloyds Payroll', account: '****9012', status: 'Active', lastSync: '3 hours ago', frequency: 'Daily', transactions: 23, accountId: 'ACC-003' },
    { id: 4, bank: 'NatWest Savings', account: '****3456', status: 'Warning', lastSync: '12 hours ago', frequency: 'Daily', transactions: 5, accountId: 'ACC-004' },
    { id: 5, bank: 'Santander Petty Cash', account: '****7890', status: 'Error', lastSync: '2 days ago', frequency: 'Every 6 hours', transactions: 0, accountId: 'ACC-005' }
  ])
  const [isAddFeedOpen, setIsAddFeedOpen] = useState(false)
  const [isEditFeedOpen, setIsEditFeedOpen] = useState(false)
  const [isViewFeedOpen, setIsViewFeedOpen] = useState(false)
  const [selectedFeed, setSelectedFeed] = useState<any>(null)
  const [feedFormData, setFeedFormData] = useState<any>({
    bank: '',
    account: '',
    accountId: '',
    frequency: 'Every 4 hours',
    status: 'Active'
  })

  const [stockItems, _setStockItems] = useState<any[]>([
    { id: 1, sku: 'PRD-001', name: 'Office Chair - Executive', category: 'Furniture', quantity: 45, reorderLevel: 10, reorderQuantity: 20, cost: 145.00, sellPrice: 249.99, warehouse: 'Main Warehouse', location: 'A-12-03', status: 'In Stock', lastUpdated: '2024-01-15' },
    { id: 2, sku: 'PRD-002', name: 'Laptop - Dell XPS 15', category: 'Electronics', quantity: 8, reorderLevel: 5, reorderQuantity: 10, cost: 1250.00, sellPrice: 1899.99, warehouse: 'Main Warehouse', location: 'B-05-01', status: 'Low Stock', lastUpdated: '2024-01-14' },
    { id: 3, sku: 'PRD-003', name: 'Printer Toner - HP 85A', category: 'Supplies', quantity: 125, reorderLevel: 30, reorderQuantity: 50, cost: 45.50, sellPrice: 79.99, warehouse: 'Main Warehouse', location: 'C-08-15', status: 'In Stock', lastUpdated: '2024-01-16' },
    { id: 4, sku: 'PRD-004', name: 'Standing Desk', category: 'Furniture', quantity: 3, reorderLevel: 5, reorderQuantity: 10, cost: 285.00, sellPrice: 499.99, warehouse: 'Secondary Warehouse', location: 'D-01-02', status: 'Critical', lastUpdated: '2024-01-13' },
    { id: 5, sku: 'PRD-005', name: 'Conference Phone', category: 'Electronics', quantity: 15, reorderLevel: 8, reorderQuantity: 12, cost: 195.00, sellPrice: 349.99, warehouse: 'Main Warehouse', location: 'B-10-05', status: 'In Stock', lastUpdated: '2024-01-15' }
  ])
  const [warehouses, _setWarehouses] = useState<any[]>([
    { id: 1, name: 'Main Warehouse', location: 'London, UK', capacity: 10000, used: 6500, status: 'Active', manager: 'John Smith', contact: '+44 20 7123 4567' },
    { id: 2, name: 'Secondary Warehouse', location: 'Manchester, UK', capacity: 5000, used: 2800, status: 'Active', manager: 'Sarah Johnson', contact: '+44 161 234 5678' },
    { id: 3, name: 'Distribution Center', location: 'Birmingham, UK', capacity: 8000, used: 4200, status: 'Active', manager: 'Michael Brown', contact: '+44 121 345 6789' }
  ])
  const [stockAdjustments, _setStockAdjustments] = useState<any[]>([
    { id: 1, date: '2024-01-15', sku: 'PRD-001', productName: 'Office Chair - Executive', type: 'Increase', quantity: 10, reason: 'Stock Replenishment', notes: 'Received from Supplier ABC', adjustedBy: 'Admin User' },
    { id: 2, date: '2024-01-14', sku: 'PRD-002', productName: 'Laptop - Dell XPS 15', type: 'Decrease', quantity: 2, reason: 'Damaged', notes: 'Found damaged during inspection', adjustedBy: 'Warehouse Manager' },
    { id: 3, date: '2024-01-13', sku: 'PRD-003', productName: 'Printer Toner - HP 85A', type: 'Increase', quantity: 50, reason: 'Purchase Order', notes: 'PO-2024-0156', adjustedBy: 'Admin User' }
  ])
  const [reorderAlerts, _setReorderAlerts] = useState<any[]>([
    { id: 1, sku: 'PRD-004', productName: 'Standing Desk', currentStock: 3, reorderLevel: 5, reorderQuantity: 10, suggestedOrder: 10, priority: 'High', estimatedCost: 2850.00, supplier: 'Furniture Direct Ltd', leadTime: '7 days' },
    { id: 2, sku: 'PRD-002', productName: 'Laptop - Dell XPS 15', currentStock: 8, reorderLevel: 5, reorderQuantity: 10, suggestedOrder: 10, priority: 'Medium', estimatedCost: 12500.00, supplier: 'Tech Supplies UK', leadTime: '5 days' }
  ])
  const [stockTakes, _setStockTakes] = useState<any[]>([
    { id: 1, date: '2024-01-10', warehouse: 'Main Warehouse', status: 'Completed', itemsChecked: 156, discrepancies: 3, variance: -125.50, performedBy: 'Warehouse Team', completedDate: '2024-01-10' },
    { id: 2, date: '2024-01-08', warehouse: 'Secondary Warehouse', status: 'Completed', itemsChecked: 89, discrepancies: 1, variance: 45.00, performedBy: 'Sarah Johnson', completedDate: '2024-01-08' },
    { id: 3, date: '2024-01-20', warehouse: 'Distribution Center', status: 'Planned', itemsChecked: 0, discrepancies: 0, variance: 0, performedBy: 'TBD', completedDate: null }
  ])
  const [_isStockDialogOpen, _setIsStockDialogOpen] = useState(false)
  const [_isStockEditOpen, _setIsStockEditOpen] = useState(false)
  const [_isStockAddOpen, _setIsStockAddOpen] = useState(false)
  const [_selectedStockItem, _setSelectedStockItem] = useState<any>(null)
  const [_stockFormData, _setStockFormData] = useState<any>({
    sku: '',
    name: '',
    category: '',
    quantity: 0,
    reorderLevel: 0,
    reorderQuantity: 0,
    cost: 0,
    sellPrice: 0,
    warehouse: '',
    location: '',
    status: 'In Stock'
  })
  const [_editingStock, _setEditingStock] = useState<any>(null)
  const [_showStockForm, _setShowStockForm] = useState(false)

  // Inventory modal states
  const [isKPIDrilldownOpen, setIsKPIDrilldownOpen] = useState(false)
  const [kpiDrilldownData, setKpiDrilldownData] = useState<any>(null)
  const [isStockDetailOpen, setIsStockDetailOpen] = useState(false)
  const [selectedStockItem, setSelectedStockItem] = useState<any>(null)
  const [isStockFormOpen, setIsStockFormOpen] = useState(false)
  const [isWarehouseDetailOpen, setIsWarehouseDetailOpen] = useState(false)
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null)
  const [isAdjustmentDetailOpen, setIsAdjustmentDetailOpen] = useState(false)
  const [selectedAdjustment, setSelectedAdjustment] = useState<any>(null)
  const [isReorderDetailOpen, setIsReorderDetailOpen] = useState(false)
  const [selectedReorderAlert, setSelectedReorderAlert] = useState<any>(null)
  const [isStockTakeDetailOpen, setIsStockTakeDetailOpen] = useState(false)
  const [selectedStockTake, setSelectedStockTake] = useState<any>(null)
  const [isStockTakeFormOpen, setIsStockTakeFormOpen] = useState(false)

  const handleAIQuestion = async (question: string) => {
    setIsAILoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('AI Question:', question)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsAILoading(false)
    }

  }
  const handleViewAccount = (account: any) => {
    setSelectedAccount(account)
    setIsViewDialogOpen(true)
  }

  const handleEditAccount = (account: any) => {
    setSelectedAccount(account)
    setEditFormData({ ...account })
    setIsEditDialogOpen(true)
  }

  const handleRefreshAccount = (account: any) => {
    console.log('Refreshing account:', account)
    console.log('Account Refreshed', `Successfully refreshed ${account.name}!\n\nBalance updated: £${account.balance.toLocaleString()}\nLast updated: Just now`, 'success')
  }

  const handleSaveEdit = () => {
    console.log('Saving edited account:', editFormData)
    console.log('Account Updated', `Successfully updated ${editFormData.name}!\n\nChanges saved to the system.`, 'success')
    setIsEditDialogOpen(false)
  }

  const handleSaveAdd = () => {
    console.log('Adding new account:', addFormData)
    if (!addFormData.name || !addFormData.bank || !addFormData.accountNumber) {
      console.log('Missing Information', 'Please fill in all required fields: Account Name, Bank, and Account Number', 'error')
      return
    }
    console.log('Account Added', `Successfully added ${addFormData.name}!\n\nNew bank account has been created.`, 'success')
    setIsAddDialogOpen(false)
    setAddFormData({
      name: '',
      bank: '',
      accountNumber: '',
      balance: 0,
      type: 'Current',
      status: 'Active'
    })
  }

  const confirmDelete = () => {
    console.log('Deleting account:', selectedAccount)
    console.log('Account Deleted', `Successfully deleted ${selectedAccount?.name}!\n\nBank account has been removed from the system.`, 'success')
    setIsDeleteDialogOpen(false)
  }

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action)
    
    switch(action) {
      case 'Create Invoice':
        setActiveMainTab('sales')
        setActiveSubTab('invoices')
        if (!expandedCategories.includes('sales')) {
          toggleCategory('sales')
        }
        console.log('Create Invoice', 'Navigated to Sales > Invoices section.\nClick \"Add Invoice\" button to create a new invoice.', 'info')
        break
      case 'Record Expense':
        setActiveMainTab('purchases')
        setActiveSubTab('expenses')
        if (!expandedCategories.includes('purchases')) {
          toggleCategory('purchases')
        }
        console.log('Record Expense', 'Navigated to Purchases > Expenses section.\nClick \"Add Expense\" button to record a new expense.', 'info')
        break
      case 'Bank Reconciliation':
        setActiveMainTab('banking')
        setActiveSubTab('reconciliation')
        if (!expandedCategories.includes('banking')) {
          toggleCategory('banking')
        }
        console.log('Bank Reconciliation', 'Navigated to Banking > Reconciliation section.\nYou can now match transactions and reconcile your accounts.', 'info')
        break
      case 'Generate Report':
        setActiveMainTab('reports')
        setActiveSubTab('financial')
        if (!expandedCategories.includes('reports')) {
          toggleCategory('reports')
        }
        console.log('Generate Report', 'Navigated to Reports > Financial Reports section.\nSelect a report type to generate.', 'info')
        break
      default:
        console.log('Coming Soon', `${action} functionality will be implemented`, 'info')
    }
  }

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsTransactionDetailOpen(true)
  }

  const handleEditTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setTransactionFormData({ ...transaction })
    setIsTransactionEditOpen(true)
  }

  const handleCashCoding = (transaction: any) => {
    setSelectedTransaction(transaction)
    setTransactionFormData({ ...transaction })
    setIsCashCodingOpen(true)
  }

  const handleSaveTransactionEdit = () => {
    console.log('Saving transaction:', transactionFormData)
    console.log('Transaction Updated', 'Successfully updated transaction!\n\nChanges saved to the system.', 'success')
    setIsTransactionEditOpen(false)
  }

  const handleSaveCashCoding = () => {
    console.log('Saving cash coding:', transactionFormData)
    if (!transactionFormData.category) {
      console.log('Missing Category', 'Please select a category for this transaction', 'error')
      return
    }
    console.log('Transaction Coded', `Successfully coded transaction!\n\nCategory: ${transactionFormData.category}`, 'success')
    setIsCashCodingOpen(false)
  }

  const handleMatchTransaction = (item: any) => {
    setSelectedReconciliationItem(item)
    const candidates = [
      { id: 1, date: '2024-01-18', description: 'Customer Invoice Payment - INV-001', amount: 1500, type: 'Invoice', matchScore: 95 },
      { id: 2, date: '2024-01-17', description: 'Client Deposit', amount: 1500, type: 'Receipt', matchScore: 85 },
      { id: 3, date: '2024-01-16', description: 'Payment Received', amount: 1485, type: 'Receipt', matchScore: 75 }
    ]
    setMatchCandidates(candidates)
    setIsMatchTransactionOpen(true)
  }

  const handleConfirmMatch = (candidateId: number) => {
    const candidate = matchCandidates.find(c => c.id === candidateId)
    console.log('Matching transaction:', selectedReconciliationItem, 'with', candidate)
    console.log(`✅ Successfully matched transaction!\n\nReconciliation item matched with ${candidate?.description}`)
    setIsMatchTransactionOpen(false)
  }

  const handleOpenBankingRules = () => {
    setIsBankingRulesOpen(true)
  }

  const handleAddRule = () => {
    setIsAddRuleOpen(true)
  }

  const handleSaveRule = () => {
    console.log('Saving banking rule:', ruleFormData)
    if (!ruleFormData.name || !ruleFormData.condition || !ruleFormData.category) {
      console.log('⚠️ Please fill in all required fields: Name, Condition, and Category')
      return
    }
    const newRule = {
      id: bankingRules.length + 1,
      ...ruleFormData
    }
    setBankingRules([...bankingRules, newRule])
    console.log(`✅ Successfully created banking rule!\n\nRule: ${ruleFormData.name}`)
    setIsAddRuleOpen(false)
    setRuleFormData({
      name: '',
      condition: '',
      category: '',
      autoMatch: true,
      status: 'Active'
    })
  }

  const handleToggleRule = (ruleId: number) => {
    setBankingRules(bankingRules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'Active' ? 'Inactive' : 'Active' }
        : rule
    ))
  }

  const handleDeleteRule = (ruleId: number) => {
    if (confirm('Are you sure you want to delete this banking rule?')) {
      setBankingRules(bankingRules.filter(rule => rule.id !== ruleId))
      console.log('✅ Successfully deleted banking rule!')
    }

  }
  const handleViewFeed = (feed: any) => {
    setSelectedFeed(feed)
    setIsViewFeedOpen(true)
  }

  const handleEditFeed = (feed: any) => {
    setSelectedFeed(feed)
    setFeedFormData({ ...feed })
    setIsEditFeedOpen(true)
  }

  const handleAddFeed = () => {
    setIsAddFeedOpen(true)
  }

  const handleSaveFeed = () => {
    console.log('Saving feed:', feedFormData)
    if (!feedFormData.bank || !feedFormData.account || !feedFormData.accountId) {
      console.log('⚠️ Please fill in all required fields: Bank Name, Account Number, and Account ID')
      return
    }
    const updatedFeed = {
      ...selectedFeed,
      ...feedFormData,
      lastSync: 'Just now',
      transactions: selectedFeed?.transactions || 0
    }
    setBankFeeds(bankFeeds.map(f => f.id === selectedFeed.id ? updatedFeed : f))
    console.log(`✅ Successfully updated ${feedFormData.bank}!\n\nBank feed has been updated.`)
    setIsEditFeedOpen(false)
  }

  const handleSaveAddFeed = () => {
    console.log('Adding feed:', feedFormData)
    if (!feedFormData.bank || !feedFormData.account || !feedFormData.accountId) {
      console.log('⚠️ Please fill in all required fields: Bank Name, Account Number, and Account ID')
      return
    }
    const newFeed = {
      id: bankFeeds.length + 1,
      ...feedFormData,
      lastSync: 'Never',
      transactions: 0,
      status: 'Active'
    }
    setBankFeeds([...bankFeeds, newFeed])
    console.log(`✅ Successfully added ${feedFormData.bank}!\n\nNew bank feed has been created.`)
    setIsAddFeedOpen(false)
    setFeedFormData({
      bank: '',
      account: '',
      accountId: '',
      frequency: 'Every 4 hours',
      status: 'Active'
    })
  }

  const handleSyncFeed = (feed: any) => {
    console.log('Syncing feed:', feed)
    const randomTransactions = Math.floor(Math.random() * 50) + 1
    const updatedFeed = {
      ...feed,
      lastSync: 'Just now',
      transactions: feed.transactions + randomTransactions,
      status: 'Active'
    }
    setBankFeeds(bankFeeds.map(f => f.id === feed.id ? updatedFeed : f))
    console.log(`✅ Successfully synced ${feed.bank}!\n\n${randomTransactions} new transactions imported.`)
  }

  const handleSyncAll = () => {
    console.log('Syncing all feeds')
    const updatedFeeds = bankFeeds.map(feed => ({
      ...feed,
      lastSync: 'Just now',
      transactions: feed.transactions + Math.floor(Math.random() * 20) + 1,
      status: 'Active'
    }))
    setBankFeeds(updatedFeeds)
    const totalNew = updatedFeeds.reduce((sum, _f, i) => sum + (updatedFeeds[i].transactions - bankFeeds[i].transactions), 0)
    console.log(`✅ Successfully synced all bank feeds!\n\n${totalNew} new transactions imported across ${bankFeeds.length} feeds.`)
  }

  const handleDeleteFeed = (feed: any) => {
    if (confirm(`Are you sure you want to delete ${feed.bank}?\n\nThis will stop automatic synchronization for this account.`)) {
      setBankFeeds(bankFeeds.filter(f => f.id !== feed.id))
      console.log(`✅ Successfully deleted ${feed.bank}!\n\nBank feed has been removed.`)
    }
  }

  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Paid', value: 'paid' },
    { label: 'Overdue', value: 'overdue' }
  ]

  const typeOptions = [
    { label: 'All Types', value: 'all' },
    { label: 'Invoice', value: 'invoice' },
    { label: 'Credit Note', value: 'credit' },
    { label: 'Purchase Order', value: 'po' },
    { label: 'Bill', value: 'bill' },
    { label: 'Expense', value: 'expense' }
  ]

  const categoryOptions = [
    { label: 'All Categories', value: 'all' },
    { label: 'Sales', value: 'sales' },
    { label: 'Purchases', value: 'purchases' },
    { label: 'Banking', value: 'banking' },
    { label: 'Expenses', value: 'expenses' },
    { label: 'Assets', value: 'assets' }
  ]

  type SubTabConfig = {
    label: string
    icon: React.ComponentType<{ className?: string }>
  }

  type MenuConfig = {
    label: string
    icon: React.ComponentType<{ className?: string }>
    hasSubTabs: boolean
    subTabs?: Record<string, SubTabConfig>
  }

  const menuStructure: Record<string, MenuConfig> = {
    dashboard: { label: 'Dashboard', icon: Activity, hasSubTabs: false },
    accounts: { label: 'Chart of Accounts', icon: Database, hasSubTabs: false },
    sales: { 
      label: 'Sales', 
      icon: TrendingUp, 
      hasSubTabs: true,
      subTabs: {
        invoices: { label: 'Invoices', icon: Receipt },
        quotes: { label: 'Quotes', icon: FileText },
        customers: { label: 'Customers', icon: Users },
        products: { label: 'Products', icon: Package }
      }
    },
    purchases: { 
      label: 'Purchases', 
      icon: TrendingDown, 
      hasSubTabs: true,
      subTabs: {
        bills: { label: 'Bills', icon: Receipt },
        orders: { label: 'Purchase Orders', icon: ShoppingCart },
        suppliers: { label: 'Suppliers', icon: Building },
        expenses: { label: 'Expenses', icon: CreditCard }
      }
    },
    inventory: { 
      label: 'Inventory', 
      icon: Warehouse, 
      hasSubTabs: true,
      subTabs: {
        dashboard: { label: 'Inventory Dashboard', icon: Activity },
        stock: { label: 'Stock Management', icon: Box },
        warehouses: { label: 'Warehouse Management', icon: Warehouse },
        adjustments: { label: 'Stock Adjustments', icon: ClipboardList },
        reorder: { label: 'Reorder Management', icon: Bell },
        valuation: { label: 'Inventory Valuation', icon: BarChart },
        stocktake: { label: 'Stock Take', icon: Layers },
        serialbatch: { label: 'Serial/Batch Tracking', icon: Hash },
        reports: { label: 'Inventory Reports', icon: FileText }
      }
    },
    banking: {
      label: 'Banking', 
      icon: CreditCard, 
      hasSubTabs: true,
      subTabs: {
        bankaccounts: { label: 'Bank Accounts', icon: Landmark },
        transactions: { label: 'Transactions', icon: Receipt },
        reconciliation: { label: 'Reconciliation', icon: RefreshCw },
        feeds: { label: 'Bank Feeds', icon: Link }
      }
    },
    journals: { 
      label: 'Journals', 
      icon: BookOpen, 
      hasSubTabs: true,
      subTabs: {
        general: { label: 'General Journal', icon: Edit },
        adjustments: { label: 'Adjustments', icon: RefreshCw },
        reversals: { label: 'Reversals', icon: RotateCcw },
        templates: { label: 'Templates', icon: Copy }
      }
    },
    vat: { 
      label: 'VAT', 
      icon: Percent, 
      hasSubTabs: true,
      subTabs: {
        returns: { label: 'VAT Returns', icon: FileText },
        schemes: { label: 'VAT Schemes', icon: RefreshCw },
        reports: { label: 'VAT Reports', icon: BarChart3 },
        compliance: { label: 'Compliance', icon: UserCheck }
      }
    },
    reports: {
      label: 'Reports',
      icon: FileText,
      hasSubTabs: true,
      subTabs: {
        financial: { label: 'Financial Reports', icon: BarChart3 },
        management: { label: 'Management Reports', icon: PieChart },
        analytics: { label: 'Analytics', icon: LineChart }
      }
    },
    projects: { 
      label: 'Projects', 
      icon: Target, 
      hasSubTabs: true,
      subTabs: {
        overview: { label: 'Project Overview', icon: Target },
        tracking: { label: 'Time Tracking', icon: Clock },
        costing: { label: 'Project Costing', icon: Calculator },
        reports: { label: 'Project Reports', icon: FileText }
      }
    },
    budgets: { 
      label: 'Budgets', 
      icon: Calculator, 
      hasSubTabs: true,
      subTabs: {
        planning: { label: 'Budget Planning', icon: Calculator },
        monitoring: { label: 'Budget Monitoring', icon: TrendingUp },
        forecasting: { label: 'Forecasting', icon: LineChart },
        variance: { label: 'Variance Analysis', icon: BarChart3 }
      }
    },
    property: { 
      label: 'Property', 
      icon: Landmark, 
      hasSubTabs: true,
      subTabs: {
        portfolio: { label: 'Property Portfolio', icon: Building },
        tenants: { label: 'Tenant Management', icon: Users },
        income: { label: 'Rental Income', icon: PoundSterling },
        expenses: { label: 'Property Expenses', icon: Receipt }
      }
    },
    ecommerce: { 
      label: 'eCommerce', 
      icon: ShoppingCart, 
      hasSubTabs: true,
      subTabs: {
        platforms: { label: 'Connected Platforms', icon: Link },
        orders: { label: 'Order Management', icon: Package },
        settlements: { label: 'Settlement Tracking', icon: CreditCard },
        analytics: { label: 'Sales Analytics', icon: BarChart3 }
      }
    },
    documents: { label: 'Documents', icon: Scan, hasSubTabs: false },
    integrations: { label: 'Integrations', icon: Link, hasSubTabs: false }
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleMainTabClick = (tabKey: string) => {
    setActiveMainTab(tabKey)
    const tabConfig = menuStructure[tabKey]
    if (tabConfig && tabConfig.hasSubTabs && tabConfig.subTabs) {
      const firstSubTab = Object.keys(tabConfig.subTabs)[0]
      setActiveSubTab(firstSubTab || '')
      if (!expandedCategories.includes(tabKey)) {
        toggleCategory(tabKey)
      }
    } else {
      setActiveSubTab('')
    }


  }
  const handleSubTabClick = (subTab: string, mainTab: string) => {
    setActiveSubTab(subTab)
    setActiveMainTab(mainTab)
  }

  const kpis = [
    {
      title: "Total Revenue",
      value: "£125,430",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Outstanding Invoices",
      value: "£23,450",
      change: "-8.2%",
      trend: "down",
      icon: Receipt,
      color: "text-orange-600"
    },
    {
      title: "Bank Balance",
      value: "£45,230",
      change: "+5.1%",
      trend: "up",
      icon: CreditCard,
      color: "text-blue-600"
    },
    {
      title: "Monthly Expenses",
      value: "£18,920",
      change: "+3.4%",
      trend: "up",
      icon: TrendingDown,
      color: "text-red-600"
    }
  ]

  function renderMainContent() {
    if (activeMainTab === 'dashboard') {
      return renderDashboard()
    } else if (activeMainTab === 'accounts') {
      return renderChartOfAccounts()
    } else if (activeMainTab === 'sales') {
      if (activeSubTab === 'invoices') return renderInvoicesManagement()
      if (activeSubTab === 'quotes') return renderQuotesManagement()
      if (activeSubTab === 'customers') return renderCustomersManagement()
      if (activeSubTab === 'products') return renderProductsManagement()
      return renderSalesContent()
    } else if (activeMainTab === 'purchases') {
      if (activeSubTab === 'bills') return renderBillsManagement()
      if (activeSubTab === 'orders') return renderPurchaseOrdersManagement()
      if (activeSubTab === 'suppliers') return renderSuppliersManagement()
      if (activeSubTab === 'expenses') return renderExpensesManagement()
      return renderPurchasesContent()
    } else if (activeMainTab === 'inventory') {
      if (activeSubTab === 'dashboard') return renderInventoryDashboard()
      if (activeSubTab === 'stock') return renderStockManagement()
      if (activeSubTab === 'warehouses') return renderWarehouseManagement()
      if (activeSubTab === 'adjustments') return renderStockAdjustments()
      if (activeSubTab === 'reorder') return renderReorderManagement()
      if (activeSubTab === 'valuation') return renderInventoryValuation()
      if (activeSubTab === 'stocktake') return renderStockTake()
      if (activeSubTab === 'serialbatch') return renderSerialBatchTracking()
      if (activeSubTab === 'reports') return renderInventoryReports()
      return renderInventoryDashboard()
    } else if (activeMainTab === 'banking') {
      if (activeSubTab === 'bankaccounts') return renderBankAccountsManagement()
      if (activeSubTab === 'transactions') return renderBankTransactionsManagement()
      if (activeSubTab === 'reconciliation') return renderReconciliationManagement()
      if (activeSubTab === 'feeds') return renderBankFeedsManagement()
      return renderBankingContent()
    } else if (activeMainTab === 'journals') {
      if (activeSubTab === 'general') return renderGeneralJournal()
      if (activeSubTab === 'adjustments') return renderJournalAdjustments()
      if (activeSubTab === 'reversals') return renderJournalReversals()
      if (activeSubTab === 'templates') return renderJournalTemplates()
      return renderJournalsContent()
    } else if (activeMainTab === 'vat') {
      if (activeSubTab === 'returns') return renderVATReturns()
      if (activeSubTab === 'schemes') return renderVATSchemes()
      if (activeSubTab === 'reports') return renderVATReports()
      if (activeSubTab === 'compliance') return renderVATCompliance()
      return renderVATContent()
    } else if (activeMainTab === 'reports') {
      if (activeSubTab === 'financial') return renderFinancialReports()
      if (activeSubTab === 'management') return renderManagementReports()
      if (activeSubTab === 'analytics') return renderAnalyticsReports()
      return renderFinancialReports()
    } else if (activeMainTab === 'projects') {
      if (activeSubTab === 'overview') return renderProjectOverview()
      if (activeSubTab === 'tracking') return renderTimeTracking()
      if (activeSubTab === 'costing') return renderProjectCosting()
      if (activeSubTab === 'reports') return renderProjectReports()
      return renderProjectsContent()
    } else if (activeMainTab === 'budgets') {
      if (activeSubTab === 'planning') return renderBudgetPlanning()
      if (activeSubTab === 'monitoring') return renderBudgetMonitoring()
      if (activeSubTab === 'forecasting') return renderForecasting()
      if (activeSubTab === 'variance') return renderVarianceAnalysis()
      return renderBudgetsContent()
    } else if (activeMainTab === 'property') {
      if (activeSubTab === 'portfolio') return renderPropertyPortfolio()
      if (activeSubTab === 'tenants') return renderTenantManagement()
      if (activeSubTab === 'income') return renderRentalIncome()
      if (activeSubTab === 'expenses') return renderPropertyExpenses()
      return renderPropertyContent()
    } else if (activeMainTab === 'ecommerce') {
      if (activeSubTab === 'platforms') return renderConnectedPlatforms()
      if (activeSubTab === 'orders') return renderOrderManagement()
      if (activeSubTab === 'settlements') return renderSettlementTracking()
      if (activeSubTab === 'analytics') return renderSalesAnalytics()
      return renderEcommerceContent()
    } else if (activeMainTab === 'documents') {
      return renderDocumentsContent()
    } else if (activeMainTab === 'integrations') {
      return renderIntegrationsContent()
    }
    return renderDashboard()
  }

  function renderDashboard() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Bookkeeping Dashboard</h2>
            <p className="text-[#001f3f]">Overview of your financial position and key metrics</p>
          </div>
          <div className="flex gap-2">
            <ExportButton
              data={[
                ['Metric', 'Value', 'Change'],
                ['Total Revenue', '£125,430', '+12%'],
                ['Total Expenses', '£87,650', '+8%'],
                ['Net Profit', '£37,780', '+15%'],
                ['Outstanding Invoices', '£23,450', '-5%']
              ]}
              filename={`bookkeeping-dashboard-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Data"
              variant="outline"
            />
            <ExportButton
              data={[
                ['Report Section', 'Details'],
                ['Financial Overview', 'Summary of income and expenses'],
                ['Bank Accounts', 'Account balances and transactions'],
                ['VAT Summary', 'VAT returns and compliance'],
                ['Profit & Loss', 'Revenue vs expenses analysis']
              ]}
              filename={`financial-report-${new Date().toISOString().split('T')[0]}`}
              buttonText="Generate Report"
            />
          </div>
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon
            const drillDownData = {
              title: `${kpi.title} Analysis`,
              description: `Detailed breakdown and insights for ${kpi.title.toLowerCase()}`,
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                      <h4 className="font-semibold text-[#001f3f] mb-2">Current Value</h4>
                      <p className="text-xl font-bold">{kpi.value}</p>
                      <p className={`text-sm ${kpi.color}`}>{kpi.change}</p>
                    </div>
                    <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                      <h4 className="font-semibold text-[#001f3f] mb-2">Monthly Trend</h4>
                      <p className="text-sm text-[#001f3f]">Performance over time</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Last 6 months</span>
                          <span className="text-green-600">+18%</span>
                        </div>
                        <Progress value={72} className="mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  {kpi.title === 'Total Revenue' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">Revenue Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Product Sales</span>
                          <span className="font-semibold">£89,200 (71%)</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Services</span>
                          <span className="font-semibold">£28,430 (23%)</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Other Income</span>
                          <span className="font-semibold">£7,800 (6%)</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {kpi.title === 'Outstanding Invoices' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">Outstanding Invoice Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>INV-001 - ABC Corp</span>
                          <Badge variant="destructive">£12,500 (15 days)</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>INV-002 - XYZ Ltd</span>
                          <Badge variant="secondary">£8,950 (5 days)</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>INV-003 - DEF Services</span>
                          <Badge variant="outline">£2,000 (current)</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {kpi.title === 'Bank Balance' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">Account Balances</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Current Account</span>
                          <span className="font-semibold">£32,450</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Savings Account</span>
                          <span className="font-semibold">£12,780</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {kpi.title === 'Monthly Expenses' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">Expense Categories</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>Office Rent - £8,500</span>
                          <Badge variant="default">On Budget</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>Utilities - £2,420</span>
                          <Badge variant="destructive">+£420 over</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>Marketing - £4,200</span>
                          <Badge variant="default">-£800 under</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Data</Button>
                    <Button>View Detailed Report</Button>
                  </div>
                </div>
              )
            }
            return (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                icon={Icon}
                color={kpi.color}
                drillDownData={drillDownData}
              />
            )
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Recent Transactions</CardTitle>
              <CardDescription>Latest financial transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Payment from ABC Corp</p>
                      <Badge className="bg-green-100 text-green-800">Received</Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">Invoice INV-001</p>
                    <p className="text-xs text-gray-500">Today, 2:30 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+£2,500</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Quick Actions</CardTitle>
              <CardDescription>Common bookkeeping tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start border-2 border-[#001f3f] rounded-lg" onClick={() => handleQuickAction('Create Invoice')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
                <Button variant="outline" className="justify-start border-2 border-[#001f3f] rounded-lg" onClick={() => handleQuickAction('Record Expense')}>
                  <Receipt className="h-4 w-4 mr-2" />
                  Record Expense
                </Button>
                <Button variant="outline" className="justify-start border-2 border-[#001f3f] rounded-lg" onClick={() => handleQuickAction('Bank Reconciliation')}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Bank Reconciliation
                </Button>
                <Button variant="outline" className="justify-start border-2 border-[#001f3f] rounded-lg" onClick={() => handleQuickAction('Generate Report')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }


  function renderSalesContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Sales Management</h2>
            <p className="text-[#001f3f]">Invoices, quotes, customers, and sales analytics</p>
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
        
        <SearchFilterHeader
          searchPlaceholder="Search invoices, quotes, customers..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Type',
              options: typeOptions,
              value: selectedType,
              onChange: setSelectedType
            },
            {
              label: 'Category',
              options: categoryOptions,
              value: selectedCategory,
              onChange: setSelectedCategory
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Outstanding Invoices</p>
                  <p className="text-xl font-bold">£12,000</p>
                  <p className="text-xs text-gray-500">4 invoices</p>
                </div>
                <Receipt className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">This Month Sales</p>
                  <p className="text-xl font-bold">£28,500</p>
                  <p className="text-xs text-green-600">+15.2%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Active Customers</p>
                  <p className="text-xl font-bold">156</p>
                  <p className="text-xs text-[#001f3f]">+8 new</p>
                </div>
                <Users className="h-8 w-8 text-[#001f3f]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Avg. Invoice Value</p>
                  <p className="text-xl font-bold">£1,850</p>
                  <p className="text-xs text-purple-600">+5.8%</p>
                </div>
                <Calculator className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Invoices</CardTitle>
            <CardDescription>Latest sales invoices and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">INV-001</p>
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </div>
                  <p className="text-sm text-[#001f3f]">ABC Corp</p>
                  <p className="text-xs text-gray-500">Due: 2024-01-30</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£2,500</p>
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
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Invoice Template Management</CardTitle>
            <CardDescription>Customize invoice templates with your company branding</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceTemplateManager />
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderPurchasesContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Purchases Overview</h2>
            <p className="text-[#001f3f]">Complete purchase management dashboard and quick access to all purchase functions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Quick Bill
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Purchase Report
            </Button>
          </div>
        </div>
        
        <SearchFilterHeader
          searchPlaceholder="Search bills, purchase orders, suppliers..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Type',
              options: typeOptions,
              value: selectedType,
              onChange: setSelectedType
            },
            {
              label: 'Category',
              options: categoryOptions,
              value: selectedCategory,
              onChange: setSelectedCategory
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Outstanding Bills</p>
                  <p className="text-xl font-bold">£18,750</p>
                  <p className="text-xs text-gray-500">8 bills</p>
                </div>
                <Receipt className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">This Month Purchases</p>
                  <p className="text-xl font-bold">£32,400</p>
                  <p className="text-xs text-orange-600">+8.5%</p>
                </div>
                <TrendingDown className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Active Suppliers</p>
                  <p className="text-xl font-bold">89</p>
                  <p className="text-xs text-[#001f3f]">+3 new</p>
                </div>
                <Building className="h-8 w-8 text-[#001f3f]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Avg. Bill Value</p>
                  <p className="text-xl font-bold">£1,245</p>
                  <p className="text-xs text-purple-600">-2.1%</p>
                </div>
                <PoundSterling className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Purchase Functions</CardTitle>
              <CardDescription>Quick access to all purchase management features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start h-12" onClick={() => handleSubTabClick('bills', 'purchases')}>
                  <Receipt className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Bill Management</div>
                    <div className="text-sm text-[#001f3f]">Process, approve, and track bills</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-12" onClick={() => handleSubTabClick('orders', 'purchases')}>
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Purchase Orders</div>
                    <div className="text-sm text-[#001f3f]">Create and track purchase orders</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-12" onClick={() => handleSubTabClick('suppliers', 'purchases')}>
                  <Building className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Supplier Database</div>
                    <div className="text-sm text-[#001f3f]">Manage supplier information and terms</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-12" onClick={() => handleSubTabClick('expenses', 'purchases')}>
                  <CreditCard className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Expense Management</div>
                    <div className="text-sm text-[#001f3f]">Track and categorize expenses</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Recent Activity</CardTitle>
              <CardDescription>Latest purchase transactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'Bill', ref: 'BILL-2024-001', supplier: 'Office Supplies Ltd', amount: 450, status: 'Pending', time: '1 hour ago' },
                  { type: 'PO', ref: 'PO-2024-008', supplier: 'Tech Equipment Co', amount: 2850, status: 'Approved', time: '3 hours ago' },
                  { type: 'Expense', ref: 'EXP-2024-045', supplier: 'Travel Agency', amount: 185, status: 'Submitted', time: '5 hours ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{activity.ref}</p>
                        <Badge className={`${
                          activity.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                          activity.status === 'Submitted' ? 'bg-blue-100 text-[#001f3f]' : 
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#001f3f]">{activity.supplier}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{activity.amount}</p>
                      <p className="text-sm text-[#001f3f]">{activity.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderBankingContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Banking & Reconciliation</h2>
            <p className="text-[#001f3f]">Bank feeds, reconciliation, and transaction management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>
        
        <SearchFilterHeader
          searchPlaceholder="Search transactions, bank accounts, reconciliations..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Type',
              options: typeOptions,
              value: selectedType,
              onChange: setSelectedType
            },
            {
              label: 'Category',
              options: categoryOptions,
              value: selectedCategory,
              onChange: setSelectedCategory
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Bank Accounts</CardTitle>
            <CardDescription>Connected bank accounts and their balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-8 w-8 text-[#001f3f]" />
                  <div>
                    <p className="font-medium">Barclays Business Current</p>
                    <p className="text-sm text-[#001f3f]">****1234</p>
                    <p className="text-xs text-gray-500">Last sync: 2 hours ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">£45,230</p>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderJournalsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Journal Entries</h2>
            <p className="text-[#001f3f]">Manual journal entries and adjustments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Journal Entries</CardTitle>
            <CardDescription>Latest manual entries and adjustments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                <div className="flex-1">
                  <p className="font-medium">Office supplies purchase</p>
                  <p className="text-sm text-[#001f3f]">JE001 - Office Expenses</p>
                  <p className="text-xs text-gray-500">2024-01-15</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£250</p>
                  <p className="text-xs text-gray-500">Debit</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderVATContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">VAT Returns</h2>
            <p className="text-[#001f3f]">VAT calculations and Making Tax Digital submissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate VAT
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Submit Return
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">VAT Summary</CardTitle>
            <CardDescription>Current quarter VAT position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-blue-50 rounded-[2px]">
                <p className="text-sm font-medium text-[#001f3f]">VAT on Sales</p>
                <p className="text-xl font-bold text-[#001f3f]">£5,700</p>
              </div>
              <div className="p-4 bg-green-50 rounded-[2px]">
                <p className="text-sm font-medium text-green-600">VAT on Purchases</p>
                <p className="text-xl font-bold text-green-900">£1,890</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-[2px]">
                <p className="text-sm font-medium text-orange-600">VAT Due</p>
                <p className="text-xl font-bold text-orange-900">£3,810</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }


  function renderFinancialReports() {

    const periodOptions = [
      { label: 'Current Period', value: 'current' },
      { label: 'Previous Period', value: 'previous' },
      { label: 'Year to Date', value: 'ytd' },
      { label: 'Custom Range', value: 'custom' }
    ]

    const clientOptions = [
      { label: 'All Clients', value: 'all' },
      { label: 'ABC Ltd', value: 'abc' },
      { label: 'XYZ Corp', value: 'xyz' },
      { label: 'Smith & Co', value: 'smith' }
    ]

    const financialReports = [
      {
        title: 'Profit & Loss',
        description: 'Comprehensive P&L with comparatives',
        icon: BarChart3,
        color: 'text-blue-500',
        status: 'Generated',
        lastGenerated: '2 hours ago'
      },
      {
        title: 'Balance Sheet',
        description: 'Assets, liabilities & equity',
        icon: FileText,
        color: 'text-purple-500',
        status: 'Scheduled',
        lastGenerated: '1 day ago'
      },
      {
        title: 'Cash Flow Statement',
        description: 'Operating, investing & financing',
        icon: PoundSterling,
        color: 'text-green-500',
        status: 'Generated',
        lastGenerated: '3 hours ago'
      },
      {
        title: 'Trial Balance',
        description: 'Detailed account balances',
        icon: Calculator,
        color: 'text-orange-500',
        status: 'Generated',
        lastGenerated: '1 hour ago'
      },
      {
        title: 'Aged Debtors',
        description: 'Outstanding customer invoices',
        icon: Users,
        color: 'text-red-500',
        status: 'Generated',
        lastGenerated: '4 hours ago'
      },
      {
        title: 'Aged Creditors',
        description: 'Outstanding supplier bills',
        icon: Building,
        color: 'text-indigo-500',
        status: 'Scheduled',
        lastGenerated: '2 days ago'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Financial Reports</h2>
            <p className="text-[#001f3f]">Generate comprehensive financial statements and reports</p>
          </div>
          <div className="flex gap-2">
            <ExportButton
              data={[
                ['Report Name', 'Type', 'Period', 'Status'],
                ['Profit & Loss', 'Financial', 'Current Month', 'Ready'],
                ['Balance Sheet', 'Financial', 'Current Month', 'Ready'],
                ['Cash Flow Statement', 'Financial', 'Current Month', 'Ready'],
                ['Trial Balance', 'Financial', 'Current Month', 'Ready']
              ]}
              filename={`financial-reports-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export All"
              variant="outline"
            />
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Schedule Reports
            </Button>
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search financial reports..."
          searchValue={reportsSearchTerm}
          onSearchChange={setReportsSearchTerm}
          filters={[
            {
              label: 'Period',
              options: periodOptions,
              value: reportsSelectedPeriod,
              onChange: setReportsSelectedPeriod
            },
            {
              label: 'Client',
              options: clientOptions,
              value: reportsSelectedClient,
              onChange: setReportsSelectedClient
            }
          ]}
          dateRange={{
            from: reportsDateFrom,
            to: reportsDateTo,
            onFromChange: setReportsDateFrom,
            onToChange: setReportsDateTo
          }}
        />

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {financialReports.map((report, index) => {
            const Icon = report.icon
            const drillDownData = {
              title: `${report.title} Analysis`,
              description: `Detailed financial analysis and breakdown for ${report.title.toLowerCase()}`,
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                      <h4 className="font-semibold text-[#001f3f] mb-2">Report Status</h4>
                      <p className="text-sm text-[#001f3f]">{report.description}</p>
                      <div className="mt-2">
                        <Badge variant={report.status === 'Generated' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Last generated: {report.lastGenerated}</p>
                      </div>
                    </div>
                    <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                      <h4 className="font-semibold text-[#001f3f] mb-2">Report Metrics</h4>
                      <p className="text-sm text-[#001f3f]">Financial performance indicators</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Accuracy Score</span>
                          <span className="text-green-600">98%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  {report.title === 'Profit & Loss' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">P&L Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Total Revenue</span>
                          <span className="font-semibold">£125,430</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Total Expenses</span>
                          <span className="font-semibold">£89,250</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded bg-green-50">
                          <span>Net Profit</span>
                          <span className="font-semibold text-green-600">£36,180</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Balance Sheet' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">Balance Sheet Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Total Assets</span>
                          <span className="font-semibold">£245,680</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Total Liabilities</span>
                          <span className="font-semibold">£89,420</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded bg-blue-50">
                          <span>Net Worth</span>
                          <span className="font-semibold text-[#001f3f]">£156,260</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Cash Flow Statement' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">Cash Flow Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Operating Cash Flow</span>
                          <span className="font-semibold">£42,350</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Investing Cash Flow</span>
                          <span className="font-semibold">-£15,200</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Financing Cash Flow</span>
                          <span className="font-semibold">-£8,500</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <ExportButton
                      data={[
                        ['Report Type', 'Period', 'Value'],
                        ['Operating Cash Flow', 'Current Period', '£42,350'],
                        ['Investing Cash Flow', 'Current Period', '-£15,200'],
                        ['Financing Cash Flow', 'Current Period', '-£8,500']
                      ]}
                      filename={`financial-report-${report.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}`}
                      buttonText="Export Report"
                      variant="outline"
                    />
                    <Button>Generate New</Button>
                  </div>
                </div>
              )
            }
            return (
              <KPICard
                key={index}
                title={report.title}
                value={report.status}
                change={`Last: ${report.lastGenerated}`}
                icon={Icon}
                color={report.color}
                drillDownData={drillDownData}
              />
            )
          })}
        </div>
      </div>
    )
  }

  function renderManagementReports() {

    const periodOptions = [
      { label: 'Monthly', value: 'monthly' },
      { label: 'Quarterly', value: 'quarterly' },
      { label: 'Annual', value: 'annual' },
      { label: 'Custom', value: 'custom' }
    ]

    const departmentOptions = [
      { label: 'All Departments', value: 'all' },
      { label: 'Sales', value: 'sales' },
      { label: 'Operations', value: 'operations' },
      { label: 'Administration', value: 'admin' }
    ]

    const managementReports = [
      {
        title: 'Monthly Management Pack',
        description: 'Executive summary with KPIs',
        icon: FileText,
        color: 'text-blue-500',
        status: 'Current',
        value: '98% Complete'
      },
      {
        title: 'Budget vs Actual',
        description: 'Variance analysis and forecasting',
        icon: BarChart3,
        color: 'text-green-500',
        status: 'Updated',
        value: '5% Variance'
      },
      {
        title: 'Cash Flow Forecast',
        description: '13-week rolling cash forecast',
        icon: TrendingUp,
        color: 'text-purple-500',
        status: 'Projected',
        value: '£45K Surplus'
      },
      {
        title: 'Departmental Analysis',
        description: 'Cost center performance',
        icon: PieChart,
        color: 'text-orange-500',
        status: 'Analyzed',
        value: '3 Departments'
      },
      {
        title: 'Key Performance Indicators',
        description: 'Business metrics dashboard',
        icon: Target,
        color: 'text-red-500',
        status: 'Tracking',
        value: '12 KPIs'
      },
      {
        title: 'Profitability Analysis',
        description: 'Product and service margins',
        icon: Calculator,
        color: 'text-indigo-500',
        status: 'Reviewed',
        value: '28% Margin'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Management Reports</h2>
            <p className="text-[#001f3f]">Strategic insights and performance analytics for decision making</p>
          </div>
          <div className="flex gap-2">
            <ExportButton
              data={[
                ['Report Name', 'Type', 'Period', 'Status'],
                ['Departmental Performance', 'Management', 'Current Month', 'Ready'],
                ['Budget vs Actual', 'Management', 'Current Month', 'Ready'],
                ['KPI Dashboard', 'Management', 'Current Month', 'Ready'],
                ['Resource Allocation', 'Management', 'Current Month', 'Ready']
              ]}
              filename={`management-reports-pack-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Pack"
              variant="outline"
            />
            <Button>
              <Target className="h-4 w-4 mr-2" />
              Create Dashboard
            </Button>
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search management reports..."
          searchValue={reportsSearchTerm}
          onSearchChange={setReportsSearchTerm}
          filters={[
            {
              label: 'Period',
              options: periodOptions,
              value: reportsSelectedPeriod,
              onChange: setReportsSelectedPeriod
            },
            {
              label: 'Department',
              options: departmentOptions,
              value: reportsSelectedDepartment,
              onChange: setReportsSelectedDepartment
            }
          ]}
          dateRange={{
            from: reportsDateFrom,
            to: reportsDateTo,
            onFromChange: setReportsDateFrom,
            onToChange: setReportsDateTo
          }}
        />

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {managementReports.map((report, index) => {
            const Icon = report.icon
            const drillDownData = {
              title: `${report.title} Analysis`,
              description: `Detailed management analysis and insights for ${report.title.toLowerCase()}`,
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                      <h4 className="font-semibold text-[#001f3f] mb-2">Current Status</h4>
                      <p className="text-xl font-bold">{report.value}</p>
                      <p className="text-sm text-[#001f3f]">{report.description}</p>
                    </div>
                    <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                      <h4 className="font-semibold text-[#001f3f] mb-2">Performance Score</h4>
                      <p className="text-sm text-[#001f3f]">Management effectiveness</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Overall Score</span>
                          <span className="text-green-600">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  {report.title === 'Monthly Management Pack' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">Executive Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Revenue Growth</span>
                          <span className="font-semibold text-green-600">+12.5%</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Cost Control</span>
                          <span className="font-semibold text-[#001f3f]">-3.2%</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Customer Satisfaction</span>
                          <span className="font-semibold">96%</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Budget vs Actual' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">Variance Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>Revenue Variance</span>
                          <Badge variant="default">+8.2%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>Expense Variance</span>
                          <Badge variant="secondary">-2.1%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>Overall Variance</span>
                          <Badge variant="outline">+5.0%</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Cash Flow Forecast' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">13-Week Forecast</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Week 1-4 Projection</span>
                          <span className="font-semibold">£125K</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Week 5-8 Projection</span>
                          <span className="font-semibold">£98K</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Week 9-13 Projection</span>
                          <span className="font-semibold">£156K</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Analysis</Button>
                    <Button>Schedule Report</Button>
                  </div>
                </div>
              )
            }
            return (
              <KPICard
                key={index}
                title={report.title}
                value={report.value}
                change={report.status}
                icon={Icon}
                color={report.color}
                drillDownData={drillDownData}
              />
            )
          })}
        </div>
      </div>
    )
  }

  function renderAnalyticsReports() {

    const analysisOptions = [
      { label: 'Ratio Analysis', value: 'ratio' },
      { label: 'Trend Analysis', value: 'trend' },
      { label: 'Variance Analysis', value: 'variance' },
      { label: 'Benchmarking', value: 'benchmark' }
    ]

    const comparisonOptions = [
      { label: 'Industry Average', value: 'industry' },
      { label: 'Previous Period', value: 'previous' },
      { label: 'Budget Target', value: 'budget' },
      { label: 'Peer Companies', value: 'peers' }
    ]

    const analyticsReports = [
      {
        title: 'Ratio Analysis',
        description: 'Financial ratios and performance metrics',
        icon: Calculator,
        color: 'text-blue-500',
        status: 'Excellent',
        value: '8.5/10'
      },
      {
        title: 'Trend Analysis',
        description: 'Historical performance trends',
        icon: TrendingUp,
        color: 'text-green-500',
        status: 'Improving',
        value: '+15% YoY'
      },
      {
        title: 'Benchmarking Report',
        description: 'Industry comparison analysis',
        icon: BarChart3,
        color: 'text-purple-500',
        status: 'Above Average',
        value: '75th Percentile'
      },
      {
        title: 'Variance Analysis',
        description: 'Budget vs actual performance',
        icon: PieChart,
        color: 'text-orange-500',
        status: 'On Target',
        value: '3% Variance'
      },
      {
        title: 'Profitability Analysis',
        description: 'Margin and profit analysis',
        icon: Target,
        color: 'text-red-500',
        status: 'Strong',
        value: '28.5% Margin'
      },
      {
        title: 'Efficiency Metrics',
        description: 'Operational efficiency indicators',
        icon: Activity,
        color: 'text-indigo-500',
        status: 'Optimized',
        value: '92% Efficiency'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Analytics & Insights</h2>
            <p className="text-[#001f3f]">Advanced analytics and business intelligence for strategic planning</p>
          </div>
          <div className="flex gap-2">
            <ExportButton
              data={[
                ['Metric', 'Analysis Type', 'Value', 'Trend'],
                ['Revenue Growth', 'Ratio Analysis', '15%', 'Up'],
                ['Profit Margin', 'Ratio Analysis', '28%', 'Stable'],
                ['Cash Flow Ratio', 'Liquidity Analysis', '1.8', 'Up'],
                ['ROI', 'Performance Metrics', '22%', 'Up']
              ]}
              filename={`analytics-insights-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Analytics"
              variant="outline"
            />
            <Button>
              <BarChart3 className="h-4 w-4 mr-2" />
              Create Dashboard
            </Button>
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search analytics reports..."
          searchValue={reportsSearchTerm}
          onSearchChange={setReportsSearchTerm}
          filters={[
            {
              label: 'Analysis Type',
              options: analysisOptions,
              value: reportsSelectedAnalysis,
              onChange: setReportsSelectedAnalysis
            },
            {
              label: 'Comparison',
              options: comparisonOptions,
              value: reportsSelectedComparison,
              onChange: setReportsSelectedComparison
            }
          ]}
          dateRange={{
            from: reportsDateFrom,
            to: reportsDateTo,
            onFromChange: setReportsDateFrom,
            onToChange: setReportsDateTo
          }}
        />

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {analyticsReports.map((report, index) => {
            const Icon = report.icon
            const drillDownData = {
              title: `${report.title} Deep Dive`,
              description: `Advanced analytics and insights for ${report.title.toLowerCase()}`,
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                      <h4 className="font-semibold text-[#001f3f] mb-2">Current Performance</h4>
                      <p className="text-xl font-bold">{report.value}</p>
                      <p className="text-sm text-[#001f3f]">{report.status}</p>
                    </div>
                    <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                      <h4 className="font-semibold text-[#001f3f] mb-2">Analytics Score</h4>
                      <p className="text-sm text-[#001f3f]">Data quality and insights</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Overall Score</span>
                          <span className="text-green-600">96%</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  {report.title === 'Ratio Analysis' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">Key Financial Ratios</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Current Ratio</span>
                          <span className="font-semibold">2.4</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Quick Ratio</span>
                          <span className="font-semibold">1.8</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Debt-to-Equity</span>
                          <span className="font-semibold">0.35</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Trend Analysis' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">Performance Trends</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>Revenue Trend</span>
                          <Badge variant="default">+15% YoY</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>Profit Trend</span>
                          <Badge variant="secondary">+22% YoY</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border-2 border-[#001f3f] rounded">
                          <span>Efficiency Trend</span>
                          <Badge variant="outline">+8% YoY</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Benchmarking Report' && (
                    <div>
                      <h4 className="font-semibold text-[#001f3f] mb-3">Industry Comparison</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Revenue per Employee</span>
                          <span className="font-semibold">75th percentile</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Profit Margin</span>
                          <span className="font-semibold">80th percentile</span>
                        </div>
                        <div className="flex justify-between p-2 border-2 border-[#001f3f] rounded">
                          <span>Asset Turnover</span>
                          <span className="font-semibold">65th percentile</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Analysis</Button>
                    <Button>Generate Insights</Button>
                  </div>
                </div>
              )
            }
            return (
              <KPICard
                key={index}
                title={report.title}
                value={report.value}
                change={report.status}
                icon={Icon}
                color={report.color}
                drillDownData={drillDownData}
              />
            )
          })}
        </div>
      </div>
    )
  }

  function renderProjectsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Project Management</h2>
            <p className="text-[#001f3f]">Track project costs, time, and profitability</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Active Projects</CardTitle>
            <CardDescription>Current projects and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                <div className="flex-1">
                  <p className="font-medium">Website Redesign</p>
                  <p className="text-sm text-[#001f3f]">Client: ABC Corp</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">65%</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£8,500</p>
                  <p className="text-xs text-gray-500">Budget: £12,000</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderBudgetsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Budgets & Forecasting</h2>
            <p className="text-[#001f3f]">Budget planning and financial forecasting</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Budget
            </Button>
            <Button>
              <Calculator className="h-4 w-4 mr-2" />
              Forecast
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Budget vs Actual</CardTitle>
            <CardDescription>Current year budget performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                <div className="flex-1">
                  <p className="font-medium">Revenue</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">85%</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£125,430</p>
                  <p className="text-xs text-gray-500">Budget: £150,000</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderPropertyContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Property Management</h2>
            <p className="text-[#001f3f]">Rental properties, tenants, and property income</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Manage Tenants
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Property Portfolio</CardTitle>
            <CardDescription>Overview of rental properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                <div className="flex items-center gap-4">
                  <Building className="h-8 w-8 text-[#001f3f]" />
                  <div>
                    <p className="font-medium">123 Main Street</p>
                    <p className="text-sm text-[#001f3f]">2 bed apartment</p>
                    <p className="text-xs text-gray-500">Tenant: John Smith</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">£1,200/month</p>
                  <Badge className="bg-green-100 text-green-800">Occupied</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderEcommerceContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">eCommerce Integration</h2>
            <p className="text-[#001f3f]">Connect and sync with online sales platforms</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Link className="h-4 w-4 mr-2" />
              Connect Platform
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Connected Platforms</CardTitle>
            <CardDescription>Your eCommerce integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                <div className="flex items-center gap-4">
                  <ShoppingCart className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="font-medium">Amazon Seller Central</p>
                    <p className="text-sm text-[#001f3f]">Last sync: 1 hour ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">£15,430</p>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderDocumentsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Document Management</h2>
            <p className="text-[#001f3f]">Upload, scan, and organize financial documents</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button>
              <Scan className="h-4 w-4 mr-2" />
              Scan Receipt
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Documents</CardTitle>
            <CardDescription>Latest uploaded and scanned documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-[#001f3f]" />
                  <div>
                    <p className="font-medium">Office Supplies Receipt</p>
                    <p className="text-sm text-[#001f3f]">Uploaded today</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderIntegrationsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Integrations & Import</h2>
            <p className="text-[#001f3f]">Connect external bookkeeping software and import trial balance data</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Link className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Available Integrations</CardTitle>
            <CardDescription>Connect with popular accounting software</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-[2px] flex items-center justify-center">
                    <Database className="h-6 w-6 text-[#001f3f]" />
                  </div>
                  <div>
                    <p className="font-medium">Xero</p>
                    <p className="text-sm text-[#001f3f]">Cloud accounting</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderProjectOverview() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Project Overview</h2>
            <p className="text-[#001f3f]">Monitor all active projects and their progress</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
            <ExportButton
              data={[
                ['Project', 'Client', 'Budget', 'Spent', 'Status'],
                ['Website Redesign', 'Client A', '£15,000', '£12,500', 'In Progress'],
                ['Tax Compliance', 'Client B', '£8,000', '£7,200', 'In Progress'],
                ['Audit Support', 'Client C', '£12,000', '£11,000', 'In Progress']
              ]}
              filename={`project-overview-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Report"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">12</div>
              <p className="text-sm text-[#001f3f]">Currently in progress</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£145,000</div>
              <p className="text-sm text-[#001f3f]">Across all projects</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">68%</div>
              <p className="text-sm text-[#001f3f]">Average progress</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Projects</CardTitle>
            <CardDescription>Latest project activity and status updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Website Redesign', client: 'ABC Corp', progress: 75, budget: 12000, spent: 8500, status: 'On Track' },
                { name: 'Mobile App Development', client: 'XYZ Ltd', progress: 45, budget: 25000, spent: 11250, status: 'Behind' },
                { name: 'Brand Identity', client: 'StartupCo', progress: 90, budget: 8000, spent: 7200, status: 'Ahead' }
              ].map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <Target className="h-8 w-8 text-brisk-primary" />
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-[#001f3f]">Client: {project.client}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-brisk-primary h-2 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">£{project.spent.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Budget: £{project.budget.toLocaleString()}</p>
                    <Badge className={`mt-1 ${
                      project.status === 'On Track' ? 'bg-green-100 text-green-800' :
                      project.status === 'Behind' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-[#001f3f]'
                    }`}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderTimeTracking() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Time Tracking</h2>
            <p className="text-[#001f3f]">Track time spent on projects and tasks</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Start Timer
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">7.5h</div>
              <p className="text-sm text-[#001f3f]">Hours logged</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">38h</div>
              <p className="text-sm text-[#001f3f]">Total hours</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Billable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">32h</div>
              <p className="text-sm text-[#001f3f]">This week</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">84%</div>
              <p className="text-sm text-[#001f3f]">Efficiency rate</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Time Entries</CardTitle>
            <CardDescription>Latest time tracking entries across projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { project: 'Website Redesign', task: 'Frontend Development', hours: 3.5, date: 'Today', billable: true },
                { project: 'Mobile App', task: 'UI Design', hours: 2.0, date: 'Today', billable: true },
                { project: 'Brand Identity', task: 'Logo Design', hours: 1.5, date: 'Yesterday', billable: true },
                { project: 'Internal', task: 'Team Meeting', hours: 1.0, date: 'Yesterday', billable: false }
              ].map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{entry.project}</p>
                      <p className="text-sm text-[#001f3f]">{entry.task}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{entry.hours}h</p>
                    <p className="text-xs text-gray-500">{entry.date}</p>
                    <Badge className={`mt-1 ${entry.billable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-[#001f3f]'}`}>
                      {entry.billable ? 'Billable' : 'Non-billable'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderProjectCosting() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Project Costing</h2>
            <p className="text-[#001f3f]">Analyze project costs and profitability</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calculator className="h-4 w-4 mr-2" />
              Cost Calculator
            </Button>
            <ExportButton
              data={[
                ['Cost Category', 'Budget', 'Actual', 'Variance', 'Margin'],
                ['Labour', '£8,000', '£7,500', '-£500', '35%'],
                ['Materials', '£3,000', '£3,200', '+£200', '28%'],
                ['Overheads', '£2,000', '£1,800', '-£200', '15%']
              ]}
              filename={`project-costing-analysis-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Analysis"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£89,500</div>
              <p className="text-sm text-[#001f3f]">From completed projects</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">£62,300</div>
              <p className="text-sm text-[#001f3f]">Direct and indirect costs</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Profit Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">30.4%</div>
              <p className="text-sm text-[#001f3f]">Average across projects</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Project Cost Breakdown</CardTitle>
            <CardDescription>Detailed cost analysis by project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Website Redesign', budget: 12000, labor: 7200, materials: 800, overhead: 500, total: 8500, margin: 29.2 },
                { name: 'Mobile App Development', budget: 25000, labor: 15000, materials: 2000, overhead: 1500, total: 18500, margin: 26.0 },
                { name: 'Brand Identity', budget: 8000, labor: 4800, materials: 400, overhead: 300, total: 5500, margin: 31.3 }
              ].map((project, index) => (
                <div key={index} className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[#001f3f]">{project.name}</h3>
                    <Badge className={`${project.margin > 30 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                      {project.margin}% margin
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-[#001f3f]">Budget</p>
                      <p className="font-semibold">£{project.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#001f3f]">Labor</p>
                      <p className="font-semibold">£{project.labor.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#001f3f]">Materials</p>
                      <p className="font-semibold">£{project.materials.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#001f3f]">Overhead</p>
                      <p className="font-semibold">£{project.overhead.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#001f3f]">Total Cost</p>
                      <p className="font-semibold">£{project.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderProjectReports() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Project Reports</h2>
            <p className="text-[#001f3f]">Comprehensive project reporting and analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter Reports
            </Button>
            <ExportButton
              data={[
                ['Report Type', 'Project', 'Date', 'Status'],
                ['Progress Report', 'Website Redesign', '2024-01-15', 'Completed'],
                ['Financial Summary', 'Tax Compliance', '2024-01-14', 'Completed'],
                ['Resource Report', 'Audit Support', '2024-01-13', 'Completed'],
                ['Timeline Analysis', 'Website Redesign', '2024-01-12', 'Completed']
              ]}
              filename={`project-reports-all-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export All"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-brisk-primary mx-auto mb-2" />
              <h3 className="font-semibold text-[#001f3f] mb-1">Project Summary</h3>
              <p className="text-sm text-[#001f3f] mb-3">Overview of all project metrics</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-[#001f3f] mb-1">Time Analysis</h3>
              <p className="text-sm text-[#001f3f] mb-3">Detailed time tracking reports</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6 text-center">
              <PoundSterling className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold text-[#001f3f] mb-1">Profitability</h3>
              <p className="text-sm text-[#001f3f] mb-3">Project profitability analysis</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Reports</CardTitle>
            <CardDescription>Generated project reports and scheduled deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Monthly Project Summary', type: 'Summary', generated: '2 hours ago', size: '2.4 MB' },
                { name: 'Q4 Time Analysis', type: 'Time Tracking', generated: '1 day ago', size: '1.8 MB' },
                { name: 'Project Profitability Report', type: 'Financial', generated: '3 days ago', size: '3.1 MB' },
                { name: 'Client Project Status', type: 'Status', generated: '1 week ago', size: '1.2 MB' }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-[#001f3f]">{report.type} • {report.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{report.generated}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderBudgetPlanning() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Budget Planning</h2>
            <p className="text-[#001f3f]">Create and manage financial budgets</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Budget
            </Button>
            <Button>
              <Calculator className="h-4 w-4 mr-2" />
              Budget Wizard
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Annual Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£450,000</div>
              <p className="text-sm text-[#001f3f]">2024 total budget</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Allocated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£380,000</div>
              <p className="text-sm text-[#001f3f]">84% allocated</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">£70,000</div>
              <p className="text-sm text-[#001f3f]">Available to allocate</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">8</div>
              <p className="text-sm text-[#001f3f]">Budget categories</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Budget Categories</CardTitle>
            <CardDescription>Budget allocation by department and category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Operations', allocated: 150000, spent: 125000, remaining: 25000, percentage: 83.3 },
                { category: 'Marketing', allocated: 80000, spent: 65000, remaining: 15000, percentage: 81.3 },
                { category: 'Technology', allocated: 60000, spent: 45000, remaining: 15000, percentage: 75.0 },
                { category: 'Human Resources', allocated: 90000, spent: 78000, remaining: 12000, percentage: 86.7 }
              ].map((budget, index) => (
                <div key={index} className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[#001f3f]">{budget.category}</h3>
                    <Badge className={`${budget.percentage > 85 ? 'bg-red-100 text-red-800' : budget.percentage > 75 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                      {budget.percentage}% used
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                    <div>
                      <p className="text-[#001f3f]">Allocated</p>
                      <p className="font-semibold">£{budget.allocated.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#001f3f]">Spent</p>
                      <p className="font-semibold">£{budget.spent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#001f3f]">Remaining</p>
                      <p className="font-semibold">£{budget.remaining.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${budget.percentage > 85 ? 'bg-red-600' : budget.percentage > 75 ? 'bg-orange-600' : 'bg-green-600'}`}
                      style={{ width: `${budget.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderBudgetMonitoring() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Budget Monitoring</h2>
            <p className="text-[#001f3f]">Track budget performance and spending patterns</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter Period
            </Button>
            <ExportButton
              data={[
                ['Category', 'Budget', 'Actual', 'Variance', 'Status'],
                ['Revenue', '£150,000', '£145,000', '-£5,000', 'Warning'],
                ['Operating Costs', '£80,000', '£75,000', '-£5,000', 'Good'],
                ['Marketing', '£20,000', '£22,000', '+£2,000', 'Over'],
                ['Salaries', '£50,000', '£48,000', '-£2,000', 'Good']
              ]}
              filename={`budget-monitoring-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Report"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Budget Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">Good</div>
              <p className="text-sm text-[#001f3f]">Overall status</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Variance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">-5.2%</div>
              <p className="text-sm text-[#001f3f]">vs planned</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Burn Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£31,667</div>
              <p className="text-sm text-[#001f3f]">Monthly average</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">£425,000</div>
              <p className="text-sm text-[#001f3f]">Year-end projection</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Monthly Budget Performance</CardTitle>
            <CardDescription>Budget vs actual spending by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: 'January', budgeted: 37500, actual: 35200, variance: -6.1, status: 'Under' },
                { month: 'February', budgeted: 37500, actual: 39800, variance: 6.1, status: 'Over' },
                { month: 'March', budgeted: 37500, actual: 36900, variance: -1.6, status: 'Under' },
                { month: 'April', budgeted: 37500, actual: 38200, variance: 1.9, status: 'Over' }
              ].map((month, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-4">
                    <TrendingUp className={`h-6 w-6 ${month.status === 'Over' ? 'text-red-600' : 'text-green-600'}`} />
                    <div>
                      <p className="font-medium">{month.month}</p>
                      <p className="text-sm text-[#001f3f]">
                        £{month.actual.toLocaleString()} / £{month.budgeted.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${month.status === 'Over' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {month.variance > 0 ? '+' : ''}{month.variance}%
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">{month.status} Budget</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderForecasting() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Financial Forecasting</h2>
            <p className="text-[#001f3f]">Predict future financial performance and trends</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <LineChart className="h-4 w-4 mr-2" />
              Run Forecast
            </Button>
            <ExportButton
              data={[
                ['Period', 'Revenue Forecast', 'Expense Forecast', 'Net Profit', 'Confidence'],
                ['Q1 2024', '£175,000', '£95,000', '£80,000', '85%'],
                ['Q2 2024', '£185,000', '£98,000', '£87,000', '80%'],
                ['Q3 2024', '£195,000', '£102,000', '£93,000', '75%'],
                ['Q4 2024', '£205,000', '£105,000', '£100,000', '70%']
              ]}
              filename={`financial-forecast-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Forecast"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">6-Month Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£275,000</div>
              <p className="text-sm text-[#001f3f]">Projected revenue</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">+12.5%</div>
              <p className="text-sm text-[#001f3f]">Year over year</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">87%</div>
              <p className="text-sm text-[#001f3f]">Forecast accuracy</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Forecast Scenarios</CardTitle>
            <CardDescription>Different financial scenarios and their projections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { scenario: 'Conservative', revenue: 240000, expenses: 180000, profit: 60000, probability: 70 },
                { scenario: 'Most Likely', revenue: 275000, expenses: 195000, profit: 80000, probability: 85 },
                { scenario: 'Optimistic', revenue: 320000, expenses: 210000, profit: 110000, probability: 45 }
              ].map((scenario, index) => (
                <div key={index} className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[#001f3f]">{scenario.scenario}</h3>
                    <Badge className={`${scenario.probability > 70 ? 'bg-green-100 text-green-800' : scenario.probability > 50 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                      {scenario.probability}% likely
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-[#001f3f]">Revenue</p>
                      <p className="font-semibold text-green-600">£{scenario.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#001f3f]">Expenses</p>
                      <p className="font-semibold text-red-600">£{scenario.expenses.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#001f3f]">Profit</p>
                      <p className="font-semibold text-brisk-primary">£{scenario.profit.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderVarianceAnalysis() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Variance Analysis</h2>
            <p className="text-[#001f3f]">Analyze differences between budgeted and actual performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Analysis
            </Button>
            <ExportButton
              data={[
                ['Category', 'Budget', 'Actual', 'Variance', 'Variance %'],
                ['Sales', '£200,000', '£195,000', '-£5,000', '-2.5%'],
                ['COGS', '£80,000', '£78,000', '-£2,000', '-2.5%'],
                ['Operating Expenses', '£60,000', '£65,000', '+£5,000', '+8.3%'],
                ['Net Profit', '£60,000', '£52,000', '-£8,000', '-13.3%']
              ]}
              filename={`variance-analysis-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Report"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Revenue Variance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">+£15,000</div>
              <p className="text-sm text-[#001f3f]">Above budget</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Cost Variance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">+£8,500</div>
              <p className="text-sm text-[#001f3f]">Over budget</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Net Variance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">+£6,500</div>
              <p className="text-sm text-[#001f3f]">Favorable</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Variance %</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">2.8%</div>
              <p className="text-sm text-[#001f3f]">Of total budget</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Detailed Variance Analysis</CardTitle>
            <CardDescription>Line-by-line comparison of budget vs actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Sales Revenue', budgeted: 120000, actual: 135000, variance: 15000, type: 'Favorable' },
                { category: 'Cost of Sales', budgeted: 45000, actual: 48500, variance: -3500, type: 'Unfavorable' },
                { category: 'Operating Expenses', budgeted: 35000, actual: 40000, variance: -5000, type: 'Unfavorable' },
                { category: 'Marketing Costs', budgeted: 15000, actual: 12000, variance: 3000, type: 'Favorable' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-4">
                    <BarChart3 className={`h-6 w-6 ${item.type === 'Favorable' ? 'text-green-600' : 'text-red-600'}`} />
                    <div>
                      <p className="font-medium">{item.category}</p>
                      <p className="text-sm text-[#001f3f]">
                        Budget: £{item.budgeted.toLocaleString()} | Actual: £{item.actual.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${item.type === 'Favorable' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.variance > 0 ? '+' : ''}£{item.variance.toLocaleString()}
                    </p>
                    <Badge className={`${item.type === 'Favorable' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderPropertyPortfolio() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Property Portfolio</h2>
            <p className="text-[#001f3f]">Manage your rental property portfolio</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
            <Button>
              <Building className="h-4 w-4 mr-2" />
              Portfolio Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">15</div>
              <p className="text-sm text-[#001f3f]">In portfolio</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Occupied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">13</div>
              <p className="text-sm text-[#001f3f]">87% occupancy</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Monthly Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">£18,500</div>
              <p className="text-sm text-[#001f3f]">Rental income</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">£2.4M</div>
              <p className="text-sm text-[#001f3f]">Total value</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Property List</CardTitle>
            <CardDescription>Overview of all properties in your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { address: '123 Main Street', type: '2 bed apartment', tenant: 'John Smith', rent: 1200, status: 'Occupied', value: 180000 },
                { address: '456 Oak Avenue', type: '3 bed house', tenant: 'Sarah Johnson', rent: 1800, status: 'Occupied', value: 250000 },
                { address: '789 Pine Road', type: '1 bed flat', tenant: null, rent: 900, status: 'Vacant', value: 120000 },
                { address: '321 Elm Street', type: '4 bed house', tenant: 'Mike Wilson', rent: 2200, status: 'Occupied', value: 320000 }
              ].map((property, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-4">
                    <Building className="h-8 w-8 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{property.address}</p>
                      <p className="text-sm text-[#001f3f]">{property.type}</p>
                      <p className="text-xs text-gray-500">
                        {property.tenant ? `Tenant: ${property.tenant}` : 'No tenant'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{property.rent}/month</p>
                    <p className="text-sm text-[#001f3f]">Value: £{property.value.toLocaleString()}</p>
                    <Badge className={`${property.status === 'Occupied' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {property.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderTenantManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Tenant Management</h2>
            <p className="text-[#001f3f]">Manage tenant relationships and communications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Tenant
            </Button>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Send Notice
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Active Tenants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">13</div>
              <p className="text-sm text-[#001f3f]">Current tenants</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Lease Renewals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">3</div>
              <p className="text-sm text-[#001f3f]">Due this quarter</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Outstanding Rent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">£2,400</div>
              <p className="text-sm text-[#001f3f]">Overdue payments</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">4.2/5</div>
              <p className="text-sm text-[#001f3f]">Average rating</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Tenant Directory</CardTitle>
            <CardDescription>Complete list of current and past tenants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'John Smith', property: '123 Main Street', lease: '2023-01-15 to 2024-01-14', rent: 1200, status: 'Current', contact: 'john@email.com' },
                { name: 'Sarah Johnson', property: '456 Oak Avenue', lease: '2022-06-01 to 2024-05-31', rent: 1800, status: 'Current', contact: 'sarah@email.com' },
                { name: 'Mike Wilson', property: '321 Elm Street', lease: '2023-03-01 to 2025-02-28', rent: 2200, status: 'Current', contact: 'mike@email.com' },
                { name: 'Emma Davis', property: '789 Pine Road', lease: '2022-12-01 to 2023-11-30', rent: 900, status: 'Former', contact: 'emma@email.com' }
              ].map((tenant, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{tenant.name}</p>
                      <p className="text-sm text-[#001f3f]">{tenant.property}</p>
                      <p className="text-xs text-gray-500">{tenant.lease}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{tenant.rent}/month</p>
                    <p className="text-sm text-[#001f3f]">{tenant.contact}</p>
                    <Badge className={`${tenant.status === 'Current' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-[#001f3f]'}`}>
                      {tenant.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderRentalIncome() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Rental Income</h2>
            <p className="text-[#001f3f]">Track and analyze rental income streams</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <PoundSterling className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Income Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£18,500</div>
              <p className="text-sm text-[#001f3f]">Collected rent</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">YTD Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£185,000</div>
              <p className="text-sm text-[#001f3f]">Year to date</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Collection Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">96%</div>
              <p className="text-sm text-[#001f3f]">On-time payments</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Yield</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">7.8%</div>
              <p className="text-sm text-[#001f3f]">Annual yield</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Rent Payments</CardTitle>
            <CardDescription>Latest rental income transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { tenant: 'John Smith', property: '123 Main Street', amount: 1200, date: '2024-01-01', status: 'Paid', method: 'Bank Transfer' },
                { tenant: 'Sarah Johnson', property: '456 Oak Avenue', amount: 1800, date: '2024-01-01', status: 'Paid', method: 'Standing Order' },
                { tenant: 'Mike Wilson', property: '321 Elm Street', amount: 2200, date: '2024-01-01', status: 'Paid', method: 'Direct Debit' },
                { tenant: 'Emma Davis', property: '789 Pine Road', amount: 900, date: '2024-01-01', status: 'Overdue', method: 'Bank Transfer' }
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-4">
                    <PoundSterling className={`h-6 w-6 ${payment.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`} />
                    <div>
                      <p className="font-medium">{payment.tenant}</p>
                      <p className="text-sm text-[#001f3f]">{payment.property}</p>
                      <p className="text-xs text-gray-500">{payment.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{payment.amount}</p>
                    <p className="text-sm text-[#001f3f]">{payment.date}</p>
                    <Badge className={`${payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderPropertyExpenses() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Property Expenses</h2>
            <p className="text-[#001f3f]">Track maintenance, repairs, and property-related costs</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
            <Button>
              <Receipt className="h-4 w-4 mr-2" />
              Expense Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">£3,200</div>
              <p className="text-sm text-[#001f3f]">Total expenses</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">YTD Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">£28,500</div>
              <p className="text-sm text-[#001f3f]">Year to date</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£15,200</div>
              <p className="text-sm text-[#001f3f]">Repairs & upkeep</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Net Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£156,500</div>
              <p className="text-sm text-[#001f3f]">After expenses</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Expenses</CardTitle>
            <CardDescription>Latest property-related expenditures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { description: 'Plumbing Repair', property: '123 Main Street', amount: 450, date: '2024-01-15', category: 'Maintenance', status: 'Paid' },
                { description: 'Property Insurance', property: 'All Properties', amount: 1200, date: '2024-01-10', category: 'Insurance', status: 'Paid' },
                { description: 'Garden Maintenance', property: '456 Oak Avenue', amount: 180, date: '2024-01-08', category: 'Maintenance', status: 'Pending' },
                { description: 'Electrical Safety Check', property: '321 Elm Street', amount: 320, date: '2024-01-05', category: 'Safety', status: 'Paid' }
              ].map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-4">
                    <Receipt className="h-6 w-6 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-[#001f3f]">{expense.property}</p>
                      <p className="text-xs text-gray-500">{expense.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{expense.amount}</p>
                    <p className="text-sm text-[#001f3f]">{expense.date}</p>
                    <Badge className={`${expense.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                      {expense.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderConnectedPlatforms() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Connected Platforms</h2>
            <p className="text-[#001f3f]">Manage your eCommerce platform integrations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Link className="h-4 w-4 mr-2" />
              Connect Platform
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Connected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">5</div>
              <p className="text-sm text-[#001f3f]">Active platforms</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£45,230</div>
              <p className="text-sm text-[#001f3f]">This month</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">1,247</div>
              <p className="text-sm text-[#001f3f]">This month</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Last Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">2h</div>
              <p className="text-sm text-[#001f3f]">Ago</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Platform Integrations</CardTitle>
            <CardDescription>Your connected eCommerce platforms and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Amazon Seller Central', type: 'Marketplace', sales: 18500, orders: 456, status: 'Connected', lastSync: '1 hour ago' },
                { name: 'eBay Store', type: 'Marketplace', sales: 12300, orders: 234, status: 'Connected', lastSync: '2 hours ago' },
                { name: 'Shopify Store', type: 'Website', sales: 8900, orders: 167, status: 'Connected', lastSync: '30 minutes ago' },
                { name: 'Etsy Shop', type: 'Marketplace', sales: 3200, orders: 89, status: 'Error', lastSync: '1 day ago' },
                { name: 'WooCommerce', type: 'Website', sales: 2330, orders: 45, status: 'Connected', lastSync: '1 hour ago' }
              ].map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-4">
                    <ShoppingCart className="h-8 w-8 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{platform.name}</p>
                      <p className="text-sm text-[#001f3f]">{platform.type}</p>
                      <p className="text-xs text-gray-500">Last sync: {platform.lastSync}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{platform.sales.toLocaleString()}</p>
                    <p className="text-sm text-[#001f3f]">{platform.orders} orders</p>
                    <Badge className={`${platform.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {platform.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderOrderManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Order Management</h2>
            <p className="text-[#001f3f]">Track and manage orders across all platforms</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter Orders
            </Button>
            <ExportButton
              data={[
                ['Order ID', 'Customer', 'Date', 'Amount', 'Status'],
                ['ORD-001', 'Customer A', '2024-01-15', '£2,500', 'Completed'],
                ['ORD-002', 'Customer B', '2024-01-14', '£1,800', 'Processing'],
                ['ORD-003', 'Customer C', '2024-01-13', '£3,200', 'Shipped']
              ]}
              filename={`ecommerce-orders-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Orders"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Today's Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">47</div>
              <p className="text-sm text-[#001f3f]">New orders</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">23</div>
              <p className="text-sm text-[#001f3f]">Awaiting fulfillment</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Shipped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">156</div>
              <p className="text-sm text-[#001f3f]">This week</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">8</div>
              <p className="text-sm text-[#001f3f]">Pending processing</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Orders</CardTitle>
            <CardDescription>Latest orders from all connected platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { orderId: 'AMZ-001234', platform: 'Amazon', customer: 'John Doe', amount: 89.99, status: 'Shipped', date: '2024-01-15' },
                { orderId: 'EB-567890', platform: 'eBay', customer: 'Sarah Smith', amount: 45.50, status: 'Pending', date: '2024-01-15' },
                { orderId: 'SH-112233', platform: 'Shopify', customer: 'Mike Johnson', amount: 129.99, status: 'Processing', date: '2024-01-14' },
                { orderId: 'ET-445566', platform: 'Etsy', customer: 'Emma Wilson', amount: 24.99, status: 'Delivered', date: '2024-01-14' }
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-4">
                    <Package className="h-6 w-6 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{order.orderId}</p>
                      <p className="text-sm text-[#001f3f]">{order.platform} • {order.customer}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{order.amount}</p>
                    <Badge className={`${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-[#001f3f]' :
                      order.status === 'Processing' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-[#001f3f]'
                    }`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderSettlementTracking() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Settlement Tracking</h2>
            <p className="text-[#001f3f]">Monitor platform payouts and settlement schedules</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Reconcile
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Settlement Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">£8,450</div>
              <p className="text-sm text-[#001f3f]">Awaiting settlement</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£42,300</div>
              <p className="text-sm text-[#001f3f]">Settled amount</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">£3,180</div>
              <p className="text-sm text-[#001f3f]">Platform fees</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Net Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£39,120</div>
              <p className="text-sm text-[#001f3f]">After fees</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Settlement History</CardTitle>
            <CardDescription>Recent platform settlements and payouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { platform: 'Amazon', amount: 15430, fees: 1234, net: 14196, date: '2024-01-10', status: 'Settled' },
                { platform: 'eBay', amount: 8900, fees: 712, net: 8188, date: '2024-01-08', status: 'Settled' },
                { platform: 'Shopify', amount: 12500, fees: 375, net: 12125, date: '2024-01-05', status: 'Settled' },
                { platform: 'Etsy', amount: 3200, fees: 256, net: 2944, date: '2024-01-03', status: 'Pending' }
              ].map((settlement, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-4">
                    <CreditCard className={`h-6 w-6 ${settlement.status === 'Settled' ? 'text-green-600' : 'text-orange-600'}`} />
                    <div>
                      <p className="font-medium">{settlement.platform}</p>
                      <p className="text-sm text-[#001f3f]">Gross: £{settlement.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Fees: £{settlement.fees.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{settlement.net.toLocaleString()}</p>
                    <p className="text-sm text-[#001f3f]">{settlement.date}</p>
                    <Badge className={`${settlement.status === 'Settled' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                      {settlement.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderInvoicesManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Invoice Management</h2>
            <p className="text-[#001f3f]">Create, manage, and track all customer invoices</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
            <ExportButton
              data={[
                ['Invoice #', 'Customer', 'Date', 'Amount', 'Status'],
                ['INV-001', 'Customer A', '2024-01-15', '£2,500', 'Paid'],
                ['INV-002', 'Customer B', '2024-01-14', '£1,800', 'Pending'],
                ['INV-003', 'Customer C', '2024-01-13', '£3,200', 'Overdue']
              ]}
              filename={`invoices-list-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export List"
            />
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search invoices by customer, number, amount..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Type',
              options: typeOptions,
              value: selectedType,
              onChange: setSelectedType
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">£23,450</div>
              <p className="text-sm text-[#001f3f]">12 invoices</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">£8,200</div>
              <p className="text-sm text-[#001f3f]">3 invoices</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Paid This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£45,600</div>
              <p className="text-sm text-[#001f3f]">28 invoices</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Average Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£1,850</div>
              <p className="text-sm text-[#001f3f]">Per invoice</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Invoices</CardTitle>
            <CardDescription>Latest invoice activity and payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { number: 'INV-2024-001', customer: 'ABC Corporation', amount: 2500, date: '2024-01-15', status: 'Paid', dueDate: '2024-02-14' },
                { number: 'INV-2024-002', customer: 'XYZ Limited', amount: 1850, date: '2024-01-16', status: 'Outstanding', dueDate: '2024-02-15' },
                { number: 'INV-2024-003', customer: 'StartupCo Ltd', amount: 950, date: '2024-01-17', status: 'Overdue', dueDate: '2024-02-01' },
                { number: 'INV-2024-004', customer: 'Tech Solutions Inc', amount: 3200, date: '2024-01-18', status: 'Outstanding', dueDate: '2024-02-17' },
                { number: 'INV-2024-005', customer: 'Marketing Pro Ltd', amount: 1450, date: '2024-01-19', status: 'Paid', dueDate: '2024-02-18' }
              ].map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{invoice.number}</p>
                      <Badge className={`${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">{invoice.customer}</p>
                    <p className="text-xs text-gray-500">Due: {invoice.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{invoice.amount}</p>
                    <p className="text-sm text-[#001f3f]">{invoice.date}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Invoice Template Management</CardTitle>
            <CardDescription>Customize invoice templates with your company branding</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceTemplateManager />
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderQuotesManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Quote Management</h2>
            <p className="text-[#001f3f]">Create, manage, and convert quotes to invoices</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Quote
            </Button>
            <ExportButton
              data={[
                ['Quote #', 'Customer', 'Date', 'Amount', 'Status'],
                ['QTE-001', 'Customer A', '2024-01-15', '£2,500', 'Sent'],
                ['QTE-002', 'Customer B', '2024-01-14', '£1,800', 'Accepted'],
                ['QTE-003', 'Customer C', '2024-01-13', '£3,200', 'Draft']
              ]}
              filename={`quotes-list-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export List"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Pending Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-[#001f3f]">15</div>
              <p className="text-sm text-[#001f3f]">Awaiting response</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Accepted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">8</div>
              <p className="text-sm text-[#001f3f]">This month</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">68%</div>
              <p className="text-sm text-[#001f3f]">Quotes to sales</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£34,750</div>
              <p className="text-sm text-[#001f3f]">Pending quotes</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Quotes</CardTitle>
            <CardDescription>Latest quotes and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { number: 'QUO-2024-015', customer: 'ABC Corporation', amount: 3500, date: '2024-01-20', status: 'Pending', validUntil: '2024-02-20' },
                { number: 'QUO-2024-016', customer: 'XYZ Limited', amount: 2850, date: '2024-01-19', status: 'Accepted', validUntil: '2024-02-19' },
                { number: 'QUO-2024-017', customer: 'StartupCo Ltd', amount: 1950, date: '2024-01-18', status: 'Declined', validUntil: '2024-02-18' },
                { number: 'QUO-2024-018', customer: 'Tech Solutions Inc', amount: 4200, date: '2024-01-17', status: 'Pending', validUntil: '2024-02-17' },
                { number: 'QUO-2024-019', customer: 'Marketing Pro Ltd', amount: 1650, date: '2024-01-16', status: 'Accepted', validUntil: '2024-02-16' }
              ].map((quote, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{quote.number}</p>
                      <Badge className={`${
                        quote.status === 'Accepted' ? 'bg-green-100 text-green-800' : 
                        quote.status === 'Declined' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-[#001f3f]'
                      }`}>
                        {quote.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">{quote.customer}</p>
                    <p className="text-xs text-gray-500">Valid until: {quote.validUntil}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{quote.amount}</p>
                    <p className="text-sm text-[#001f3f]">{quote.date}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      {quote.status === 'Accepted' && (
                        <Button variant="ghost" size="sm">
                          <Receipt className="h-3 w-3" />
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
    )
  }

  function renderCustomersManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Customer Management</h2>
            <p className="text-[#001f3f]">Manage customer information, contacts, and transaction history</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
            <ExportButton
              data={[
                ['Customer Name', 'Email', 'Phone', 'Total Sales', 'Status'],
                ['Customer A', 'customerA@email.com', '020 1234 5678', '£12,500', 'Active'],
                ['Customer B', 'customerB@email.com', '020 9876 5432', '£8,200', 'Active'],
                ['Customer C', 'customerC@email.com', '020 5555 1234', '£15,800', 'Active']
              ]}
              filename={`customers-list-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export List"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">156</div>
              <p className="text-sm text-[#001f3f]">Active customers</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">8</div>
              <p className="text-sm text-[#001f3f]">+12% growth</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Top Customer Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">£12,450</div>
              <p className="text-sm text-[#001f3f]">Lifetime value</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Average Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">£1,850</div>
              <p className="text-sm text-[#001f3f]">Per customer</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Customer Database</CardTitle>
            <CardDescription>Complete customer information and transaction history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'ABC Corporation', email: 'accounts@abccorp.com', phone: '+44 20 7123 4567', totalSpent: 12450, lastOrder: '2024-01-15', status: 'Active' },
                { name: 'XYZ Limited', email: 'finance@xyzltd.com', phone: '+44 161 234 5678', totalSpent: 8750, lastOrder: '2024-01-12', status: 'Active' },
                { name: 'StartupCo Ltd', email: 'admin@startupco.com', phone: '+44 113 345 6789', totalSpent: 3200, lastOrder: '2024-01-10', status: 'Active' },
                { name: 'Tech Solutions Inc', email: 'billing@techsolutions.com', phone: '+44 121 456 7890', totalSpent: 15600, lastOrder: '2024-01-08', status: 'VIP' },
                { name: 'Marketing Pro Ltd', email: 'accounts@marketingpro.com', phone: '+44 131 567 8901', totalSpent: 5400, lastOrder: '2024-01-05', status: 'Active' }
              ].map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{customer.name}</p>
                      <Badge className={`${
                        customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {customer.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">{customer.email}</p>
                    <p className="text-xs text-gray-500">{customer.phone}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">£{customer.totalSpent}</p>
                    <p className="text-sm text-[#001f3f]">Total spent</p>
                    <p className="text-xs text-gray-500">Last: {customer.lastOrder}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Receipt className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderProductsManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Product Catalog</h2>
            <p className="text-[#001f3f]">Manage products, services, pricing, and inventory</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
            <ExportButton
              data={[
                ['Product Name', 'SKU', 'Category', 'Price', 'Stock'],
                ['Product A', 'SKU-001', 'Services', '£150', 'N/A'],
                ['Product B', 'SKU-002', 'Goods', '£250', '50'],
                ['Product C', 'SKU-003', 'Services', '£350', 'N/A']
              ]}
              filename={`products-catalog-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Catalog"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">45</div>
              <p className="text-sm text-[#001f3f]">Active products</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">28</div>
              <p className="text-sm text-[#001f3f]">Service offerings</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Top Seller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">£45,600</div>
              <p className="text-sm text-[#001f3f]">Revenue this month</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Average Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">£1,245</div>
              <p className="text-sm text-[#001f3f]">Per product</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Product Catalog</CardTitle>
            <CardDescription>Complete product and service listings with pricing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Professional Services Package', category: 'Services', price: 2500, cost: 1200, margin: 52, sales: 24, status: 'Active' },
                { name: 'Consultation Services', category: 'Services', price: 1800, cost: 800, margin: 56, sales: 18, status: 'Active' },
                { name: 'Software License', category: 'Products', price: 850, cost: 400, margin: 53, sales: 35, status: 'Active' },
                { name: 'Training Program', category: 'Services', price: 1500, cost: 600, margin: 60, sales: 12, status: 'Active' },
                { name: 'Support Package', category: 'Services', price: 950, cost: 350, margin: 63, sales: 28, status: 'Active' }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{product.name}</p>
                      <Badge className="bg-blue-100 text-[#001f3f]">{product.category}</Badge>
                      <Badge className={`${
                        product.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-[#001f3f]'
                      }`}>
                        {product.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">Cost: £{product.cost} | Margin: {product.margin}%</p>
                    <p className="text-xs text-gray-500">{product.sales} units sold this month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{product.price}</p>
                    <p className="text-sm text-[#001f3f]">Unit price</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderBillsManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Bill Management</h2>
            <p className="text-[#001f3f]">Process, approve, and track supplier bills and payments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Bill
            </Button>
            <ExportButton
              data={[
                ['Bill #', 'Supplier', 'Date', 'Amount', 'Status'],
                ['BILL-001', 'Supplier A', '2024-01-15', '£1,500', 'Pending'],
                ['BILL-002', 'Supplier B', '2024-01-14', '£2,800', 'Approved'],
                ['BILL-003', 'Supplier C', '2024-01-13', '£1,200', 'Paid']
              ]}
              filename={`bills-list-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export List"
            />
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search bills by supplier, amount, due date..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Category',
              options: categoryOptions,
              value: selectedCategory,
              onChange: setSelectedCategory
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Outstanding Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">£18,750</div>
              <p className="text-sm text-[#001f3f]">8 bills</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">£5,200</div>
              <p className="text-sm text-[#001f3f]">2 bills</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Paid This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£32,400</div>
              <p className="text-sm text-[#001f3f]">18 bills</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Average Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£1,245</div>
              <p className="text-sm text-[#001f3f]">Per bill</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Bills</CardTitle>
            <CardDescription>Latest supplier bills and payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { number: 'BILL-2024-001', supplier: 'Office Supplies Ltd', amount: 450, date: '2024-01-20', status: 'Pending', dueDate: '2024-02-19' },
                { number: 'BILL-2024-002', supplier: 'Tech Equipment Co', amount: 2850, date: '2024-01-19', status: 'Approved', dueDate: '2024-02-18' },
                { number: 'BILL-2024-003', supplier: 'Utilities Provider', amount: 185, date: '2024-01-18', status: 'Paid', dueDate: '2024-02-17' },
                { number: 'BILL-2024-004', supplier: 'Marketing Agency', amount: 3200, date: '2024-01-17', status: 'Overdue', dueDate: '2024-02-01' },
                { number: 'BILL-2024-005', supplier: 'Legal Services', amount: 1450, date: '2024-01-16', status: 'Pending', dueDate: '2024-02-15' }
              ].map((bill, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{bill.number}</p>
                      <Badge className={`${
                        bill.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        bill.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                        bill.status === 'Approved' ? 'bg-blue-100 text-[#001f3f]' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {bill.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">{bill.supplier}</p>
                    <p className="text-xs text-gray-500">Due: {bill.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{bill.amount}</p>
                    <p className="text-sm text-[#001f3f]">{bill.date}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      {bill.status === 'Approved' && (
                        <Button variant="ghost" size="sm">
                          <CreditCard className="h-3 w-3" />
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
    )
  }

  function renderPurchaseOrdersManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Purchase Order Management</h2>
            <p className="text-[#001f3f]">Create, track, and manage purchase orders</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New PO
            </Button>
            <ExportButton
              data={[
                ['PO #', 'Supplier', 'Date', 'Amount', 'Status'],
                ['PO-001', 'Supplier A', '2024-01-15', '£3,500', 'Pending'],
                ['PO-002', 'Supplier B', '2024-01-14', '£2,800', 'Approved'],
                ['PO-003', 'Supplier C', '2024-01-13', '£4,200', 'Received']
              ]}
              filename={`purchase-orders-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export List"
            />
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search purchase orders by supplier, amount, status..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Category',
              options: categoryOptions,
              value: selectedCategory,
              onChange: setSelectedCategory
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Active POs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-[#001f3f]">12</div>
              <p className="text-sm text-[#001f3f]">In progress</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">5</div>
              <p className="text-sm text-[#001f3f]">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">28</div>
              <p className="text-sm text-[#001f3f]">This month</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£45,600</div>
              <p className="text-sm text-[#001f3f]">Active POs</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Purchase Orders</CardTitle>
            <CardDescription>Latest purchase orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { number: 'PO-2024-008', supplier: 'Tech Equipment Co', amount: 2850, date: '2024-01-20', status: 'Approved', deliveryDate: '2024-02-05' },
                { number: 'PO-2024-009', supplier: 'Office Furniture Ltd', amount: 1650, date: '2024-01-19', status: 'Pending', deliveryDate: '2024-02-10' },
                { number: 'PO-2024-010', supplier: 'Software Vendor', amount: 950, date: '2024-01-18', status: 'Delivered', deliveryDate: '2024-01-25' },
                { number: 'PO-2024-011', supplier: 'Stationery Supplies', amount: 320, date: '2024-01-17', status: 'In Transit', deliveryDate: '2024-01-30' },
                { number: 'PO-2024-012', supplier: 'Marketing Materials', amount: 1450, date: '2024-01-16', status: 'Approved', deliveryDate: '2024-02-08' }
              ].map((po, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{po.number}</p>
                      <Badge className={`${
                        po.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        po.status === 'In Transit' ? 'bg-blue-100 text-[#001f3f]' : 
                        po.status === 'Approved' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {po.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">{po.supplier}</p>
                    <p className="text-xs text-gray-500">Delivery: {po.deliveryDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{po.amount}</p>
                    <p className="text-sm text-[#001f3f]">{po.date}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ShoppingCart className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderSuppliersManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Supplier Management</h2>
            <p className="text-[#001f3f]">Manage supplier information, payment terms, and transaction history</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
            <ExportButton
              data={[
                ['Supplier Name', 'Email', 'Phone', 'Total Purchases', 'Status'],
                ['Supplier A', 'supplierA@email.com', '020 1234 5678', '£25,500', 'Active'],
                ['Supplier B', 'supplierB@email.com', '020 9876 5432', '£18,200', 'Active'],
                ['Supplier C', 'supplierC@email.com', '020 5555 1234', '£35,800', 'Active']
              ]}
              filename={`suppliers-list-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export List"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">89</div>
              <p className="text-sm text-[#001f3f]">Active suppliers</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">3</div>
              <p className="text-sm text-[#001f3f]">+5% growth</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Top Supplier Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">£8,450</div>
              <p className="text-sm text-[#001f3f]">This month</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Average Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">£1,245</div>
              <p className="text-sm text-[#001f3f]">Per supplier</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Supplier Database</CardTitle>
            <CardDescription>Complete supplier information and payment terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Tech Equipment Co', email: 'orders@techequipment.com', phone: '+44 20 8123 4567', totalSpent: 8450, paymentTerms: '30 days', status: 'Preferred' },
                { name: 'Office Supplies Ltd', email: 'sales@officesupplies.com', phone: '+44 161 234 5678', totalSpent: 3200, paymentTerms: '14 days', status: 'Active' },
                { name: 'Marketing Agency', email: 'billing@marketingagency.com', phone: '+44 113 345 6789', totalSpent: 5600, paymentTerms: '30 days', status: 'Active' },
                { name: 'Legal Services', email: 'accounts@legalservices.com', phone: '+44 121 456 7890', totalSpent: 2850, paymentTerms: '7 days', status: 'Active' },
                { name: 'Utilities Provider', email: 'billing@utilities.com', phone: '+44 131 567 8901', totalSpent: 1450, paymentTerms: '30 days', status: 'Active' }
              ].map((supplier, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{supplier.name}</p>
                      <Badge className={`${
                        supplier.status === 'Preferred' ? 'bg-purple-100 text-purple-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {supplier.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">{supplier.email}</p>
                    <p className="text-xs text-gray-500">{supplier.phone} | Terms: {supplier.paymentTerms}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">£{supplier.totalSpent}</p>
                    <p className="text-sm text-[#001f3f]">Total spent</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Receipt className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderExpensesManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Expense Management</h2>
            <p className="text-[#001f3f]">Track, categorize, and manage business expenses</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
            <ExportButton
              data={[
                ['Date', 'Category', 'Description', 'Amount', 'Status'],
                ['2024-01-15', 'Office Supplies', 'Stationery', '£150', 'Approved'],
                ['2024-01-14', 'Travel', 'Client Meeting', '£280', 'Pending'],
                ['2024-01-13', 'Software', 'Subscriptions', '£420', 'Approved']
              ]}
              filename={`expenses-report-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Report"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">£12,450</div>
              <p className="text-sm text-[#001f3f]">Total expenses</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">£2,850</div>
              <p className="text-sm text-[#001f3f]">8 expenses</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Reimbursable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-[#001f3f]">£1,650</div>
              <p className="text-sm text-[#001f3f]">Employee expenses</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Average Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">£185</div>
              <p className="text-sm text-[#001f3f]">Per transaction</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Expenses</CardTitle>
            <CardDescription>Latest expense submissions and approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { reference: 'EXP-2024-045', description: 'Travel - Client Meeting', category: 'Travel', amount: 185, date: '2024-01-20', status: 'Approved', submittedBy: 'John Smith' },
                { reference: 'EXP-2024-046', description: 'Office Supplies', category: 'Office', amount: 95, date: '2024-01-19', status: 'Pending', submittedBy: 'Sarah Johnson' },
                { reference: 'EXP-2024-047', description: 'Software Subscription', category: 'Software', amount: 450, date: '2024-01-18', status: 'Approved', submittedBy: 'Mike Chen' },
                { reference: 'EXP-2024-048', description: 'Client Lunch', category: 'Meals', amount: 85, date: '2024-01-17', status: 'Submitted', submittedBy: 'Emma Wilson' },
                { reference: 'EXP-2024-049', description: 'Parking Fees', category: 'Travel', amount: 25, date: '2024-01-16', status: 'Approved', submittedBy: 'David Brown' }
              ].map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{expense.reference}</p>
                      <Badge className={`${
                        expense.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                        expense.status === 'Submitted' ? 'bg-blue-100 text-[#001f3f]' : 
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {expense.status}
                      </Badge>
                      <Badge className="bg-gray-100 text-[#001f3f]">{expense.category}</Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">{expense.description}</p>
                    <p className="text-xs text-gray-500">By: {expense.submittedBy} | {expense.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{expense.amount}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Expense Categories</CardTitle>
              <CardDescription>Breakdown by expense category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: 'Travel', amount: 3450, percentage: 28, color: 'bg-brisk-primary' },
                  { category: 'Office Supplies', amount: 2850, percentage: 23, color: 'bg-orange-500' },
                  { category: 'Software', amount: 2200, percentage: 18, color: 'bg-green-500' },
                  { category: 'Meals & Entertainment', amount: 1950, percentage: 16, color: 'bg-purple-500' },
                  { category: 'Other', amount: 2000, percentage: 15, color: 'bg-gray-500' }
                ].map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{category.category}</p>
                      <p className="font-semibold">£{category.amount}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${category.color}`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-[#001f3f]">{category.percentage}% of total expenses</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Monthly Trend</CardTitle>
              <CardDescription>Expense trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: 'January 2024', amount: 12450, change: '+8%' },
                  { month: 'December 2023', amount: 11520, change: '-3%' },
                  { month: 'November 2023', amount: 11890, change: '+12%' },
                  { month: 'October 2023', amount: 10620, change: '+5%' },
                  { month: 'September 2023', amount: 10120, change: '-2%' },
                  { month: 'August 2023', amount: 10350, change: '+7%' }
                ].map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                    <div className="flex-1">
                      <p className="font-medium">{month.month}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{month.amount}</p>
                      <p className={`text-sm ${month.change.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                        {month.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderBankAccountsManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Bank Account Management</h2>
            <p className="text-[#001f3f]">Manage bank accounts, balances, and account settings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
            <ExportButton
              data={[
                ['Account Name', 'Bank', 'Account Number', 'Balance', 'Type', 'Status'],
                ['Business Current Account', 'Barclays', '****1234', '45230', 'Current', 'Active'],
                ['Business Savings Account', 'HSBC', '****5678', '32100', 'Savings', 'Active'],
                ['Payroll Account', 'Lloyds', '****9012', '28900', 'Current', 'Active'],
                ['Tax Reserve Account', 'NatWest', '****3456', '12800', 'Savings', 'Active'],
                ['Petty Cash Account', 'Santander', '****7890', '6400', 'Current', 'Active']
              ]}
              filename={`bank-accounts-report-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export Report"
            />
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search bank accounts by name, bank, account number..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Type',
              options: typeOptions,
              value: selectedCategory,
              onChange: setSelectedCategory
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
            setActiveMainTab('banking')
            setActiveSubTab('accounts')
          }}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£125,430</div>
              <p className="text-sm text-[#001f3f]">Across all accounts</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
            setActiveMainTab('banking')
            setActiveSubTab('accounts')
          }}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Active Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">8</div>
              <p className="text-sm text-[#001f3f]">Connected accounts</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
            setActiveMainTab('banking')
            setActiveSubTab('transactions')
          }}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Monthly Inflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-[#001f3f]">£45,230</div>
              <p className="text-sm text-[#001f3f]">This month</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
            setActiveMainTab('banking')
            setActiveSubTab('transactions')
          }}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Monthly Outflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">£32,180</div>
              <p className="text-sm text-[#001f3f]">This month</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Bank Accounts</CardTitle>
            <CardDescription>All connected bank accounts and their current balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Business Current Account', bank: 'Barclays', accountNumber: '****1234', balance: 45230, type: 'Current', status: 'Active' },
                { name: 'Business Savings Account', bank: 'HSBC', accountNumber: '****5678', balance: 32100, type: 'Savings', status: 'Active' },
                { name: 'Payroll Account', bank: 'Lloyds', accountNumber: '****9012', balance: 28900, type: 'Current', status: 'Active' },
                { name: 'Tax Reserve Account', bank: 'NatWest', accountNumber: '****3456', balance: 12800, type: 'Savings', status: 'Active' },
                { name: 'Petty Cash Account', bank: 'Santander', accountNumber: '****7890', balance: 6400, type: 'Current', status: 'Active' }
              ].map((account, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center gap-4">
                    <Landmark className="h-8 w-8 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-[#001f3f]">{account.bank} • {account.accountNumber}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge className="bg-blue-100 text-[#001f3f]">{account.type}</Badge>
                        <Badge className="bg-green-100 text-green-800">{account.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">£{account.balance.toLocaleString()}</p>
                    <div className="flex gap-1 mt-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewAccount(account)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditAccount(account)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleRefreshAccount(account)}>
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderBankTransactionsManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Bank Transactions</h2>
            <p className="text-[#001f3f]">View, categorize, and manage all bank transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleOpenBankingRules}>
              <Settings className="h-4 w-4 mr-2" />
              Banking Rules
            </Button>
            <Button onClick={() => handleCashCoding({ description: 'Select a transaction first' })}>
              <Tags className="h-4 w-4 mr-2" />
              Cash Coding
            </Button>
            <ExportButton
              data={[
                ['Date', 'Description', 'Amount', 'Category', 'Status'],
                ['2024-01-15', 'Payment from Client A', '£2,500', 'Income', 'Categorized'],
                ['2024-01-14', 'Office Supplies', '£156', 'Expenses', 'Categorized'],
                ['2024-01-13', 'Software Subscription', '£89', 'IT', 'Categorized'],
                ['2024-01-12', 'Bank Transfer', '£500', 'Uncategorized', 'Uncategorized']
              ]}
              filename={`bank-transactions-${new Date().toISOString().split('T')[0]}`}
              buttonText="Export"
            />
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search transactions by description, amount, category..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: [
                { label: 'All Statuses', value: 'all' },
                { label: 'Categorized', value: 'categorized' },
                { label: 'Uncategorized', value: 'uncategorized' }
              ],
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Type',
              options: [
                { label: 'All Types', value: 'all' },
                { label: 'Credit', value: 'credit' },
                { label: 'Debit', value: 'debit' }
              ],
              value: selectedType,
              onChange: setSelectedType
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => console.log('📊 Viewing all transactions this month\n\nTotal: 1,245 transactions')}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">1,245</div>
              <p className="text-sm text-[#001f3f]">Total transactions</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-orange-50 transition-colors" onClick={() => console.log('⚠️ Uncategorized Transactions\n\n23 transactions need categorization')}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Uncategorized</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">23</div>
              <p className="text-sm text-[#001f3f]">Need attention</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-green-50 transition-colors" onClick={() => console.log('💰 Income Transactions\n\n£45,230 received this month')}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£45,230</div>
              <p className="text-sm text-[#001f3f]">This month</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-red-50 transition-colors" onClick={() => console.log('💸 Expense Transactions\n\n£32,180 spent this month')}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">£32,180</div>
              <p className="text-sm text-[#001f3f]">This month</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Transactions</CardTitle>
            <CardDescription className="text-[#001f3f]">Latest bank transactions across all accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: '2024-01-20', description: 'Customer Payment - INV-001', account: 'Business Current', amount: 2500, type: 'Credit', category: 'Sales', status: 'Categorized' },
                { date: '2024-01-20', description: 'Office Rent Payment', account: 'Business Current', amount: -1200, type: 'Debit', category: 'Rent', status: 'Categorized' },
                { date: '2024-01-19', description: 'Supplier Payment - Tech Co', account: 'Business Current', amount: -850, type: 'Debit', category: 'Purchases', status: 'Categorized' },
                { date: '2024-01-19', description: 'Bank Transfer In', account: 'Business Savings', amount: 5000, type: 'Credit', category: '', status: 'Uncategorized' },
                { date: '2024-01-18', description: 'Utilities - Electric', account: 'Business Current', amount: -185, type: 'Debit', category: 'Utilities', status: 'Categorized' }
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => handleViewTransaction(transaction)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{transaction.description}</p>
                      <Badge className={`${
                        transaction.status === 'Categorized' ? 'bg-green-100 text-green-800' : 
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {transaction.status}
                      </Badge>
                      {transaction.category && (
                        <Badge className="bg-blue-100 text-[#001f3f]">{transaction.category}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#001f3f]">{transaction.account} • {transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}£{Math.abs(transaction.amount)}
                    </p>
                    <p className="text-sm text-[#001f3f]">{transaction.type}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleViewTransaction(transaction); }}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleEditTransaction(transaction); }}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleCashCoding(transaction); }}>
                        <Tags className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderReconciliationManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Bank Reconciliation</h2>
            <p className="text-[#001f3f]">Reconcile bank statements with your accounting records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleOpenBankingRules}>
              <Settings className="h-4 w-4 mr-2" />
              Banking Rules
            </Button>
            <Button variant="outline" onClick={() => console.log('📥 Import Statement\n\nSelect a bank statement file to import')}>
              <Upload className="h-4 w-4 mr-2" />
              Import Statement
            </Button>
            <Button onClick={() => console.log('🔄 Auto Reconcile\n\nAutomatically matching transactions...')}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Auto Reconcile
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-green-50 transition-colors" onClick={() => console.log('✅ Reconciled Transactions\n\n£123,450 reconciled this month')}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Reconciled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£123,450</div>
              <p className="text-sm text-[#001f3f]">This month</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-orange-50 transition-colors" onClick={() => console.log('⚠️ Outstanding Items\n\n£2,850 needs reconciliation')}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">£2,850</div>
              <p className="text-sm text-[#001f3f]">Needs attention</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-red-50 transition-colors" onClick={() => console.log('❌ Discrepancies Found\n\n3 items need review')}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Discrepancies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">3</div>
              <p className="text-sm text-[#001f3f]">Items to review</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => console.log('📊 Auto-Match Rate\n\n97.8% of transactions auto-matched')}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Match Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">97.8%</div>
              <p className="text-sm text-[#001f3f]">Auto-matched</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Reconciliation Status</CardTitle>
              <CardDescription>Current reconciliation status by account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { account: 'Business Current Account', lastReconciled: '2024-01-15', status: 'Complete', balance: 45230, difference: 0 },
                  { account: 'Business Savings Account', lastReconciled: '2024-01-10', status: 'Outstanding', balance: 32100, difference: 150 },
                  { account: 'Payroll Account', lastReconciled: '2024-01-12', status: 'Complete', balance: 28900, difference: 0 },
                  { account: 'Tax Reserve Account', lastReconciled: '2024-01-08', status: 'Pending', balance: 12800, difference: -75 }
                ].map((account, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                    <div className="flex-1">
                      <p className="font-medium">{account.account}</p>
                      <p className="text-sm text-[#001f3f]">Last: {account.lastReconciled}</p>
                      <Badge className={`${
                        account.status === 'Complete' ? 'bg-green-100 text-green-800' : 
                        account.status === 'Outstanding' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-[#001f3f]'
                      }`}>
                        {account.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{account.balance.toLocaleString()}</p>
                      {account.difference !== 0 && (
                        <p className={`text-sm ${account.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {account.difference > 0 ? '+' : ''}£{account.difference}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Outstanding Items</CardTitle>
              <CardDescription className="text-[#001f3f]">Items requiring manual reconciliation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { description: 'Unmatched Deposit', amount: 1500, date: '2024-01-18', type: 'Credit' },
                  { description: 'Bank Charges', amount: -25, date: '2024-01-17', type: 'Debit' },
                  { description: 'Interest Payment', amount: 45, date: '2024-01-16', type: 'Credit' },
                  { description: 'Unknown Transfer', amount: -200, date: '2024-01-15', type: 'Debit' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-[#001f3f]">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.amount > 0 ? '+' : ''}£{Math.abs(item.amount)}
                      </p>
                      <div className="flex gap-1 mt-1">
                        <Button variant="ghost" size="sm" onClick={() => console.log(`📋 Transaction Details\n\n${item.description}\nAmount: £${Math.abs(item.amount)}\nDate: ${item.date}`)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleMatchTransaction(item)}>
                          <UserCheck className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderBankFeedsManagement() {
    const activeFeeds = bankFeeds.filter(f => f.status === 'Active').length
    const totalTransactions = bankFeeds.reduce((sum, f) => sum + f.transactions, 0)
    const avgTransactionsPerFeed = bankFeeds.length > 0 ? Math.round(totalTransactions / bankFeeds.length) : 0
    const successRate = bankFeeds.filter(f => f.status === 'Active').length / bankFeeds.length * 100

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Bank Feed Management</h2>
            <p className="text-[#001f3f]">Manage automatic bank feed connections and data synchronization</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAddFeed}>
              <Plus className="h-4 w-4 mr-2" />
              Add Feed
            </Button>
            <Button onClick={handleSyncAll}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => {
            const activeList = bankFeeds.filter(f => f.status === 'Active')
            console.log(`✅ Active Bank Feeds (${activeFeeds})\n\n${activeList.map(f => `• ${f.bank}\n  ${f.account}\n  ${f.transactions} transactions`).join('\n\n')}`)
          }}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Active Feeds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">{activeFeeds}</div>
              <p className="text-sm text-[#001f3f]">Connected banks</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => {
            const recentSync = bankFeeds.sort((a, b) => {
              const timeA = a.lastSync.includes('hour') ? parseInt(a.lastSync) : (a.lastSync.includes('day') ? parseInt(a.lastSync) * 24 : 0)
              const timeB = b.lastSync.includes('hour') ? parseInt(b.lastSync) : (b.lastSync.includes('day') ? parseInt(b.lastSync) * 24 : 0)
              return timeA - timeB
            })[0]
            console.log(`🕐 Last Sync Information\n\nMost Recent: ${recentSync.bank}\n${recentSync.lastSync}\n\nAll Feeds:\n${bankFeeds.map(f => `• ${f.bank}: ${f.lastSync}`).join('\n')}`)
          }}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Last Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">{bankFeeds[0]?.lastSync.split(' ')[0] || '0'} {bankFeeds[0]?.lastSync.split(' ')[1] || 'hrs'}</div>
              <p className="text-sm text-[#001f3f]">Ago</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => {
            console.log(`📊 Total Transactions\n\nAcross All Feeds: ${totalTransactions}\n\nBreakdown:\n${bankFeeds.map(f => `• ${f.bank}: ${f.transactions} transactions`).join('\n')}\n\nAverage per Feed: ${avgTransactionsPerFeed}`)
          }}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-[#001f3f]">{totalTransactions}</div>
              <p className="text-sm text-[#001f3f]">Across all feeds</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => {
            const active = bankFeeds.filter(f => f.status === 'Active').length
            const warning = bankFeeds.filter(f => f.status === 'Warning').length
            const error = bankFeeds.filter(f => f.status === 'Error').length
            console.log(`📈 Sync Success Rate\n\nSuccess Rate: ${successRate.toFixed(1)}%\n\nStatus Breakdown:\n• Active: ${active} feeds\n• Warning: ${warning} feeds\n• Error: ${error} feeds\n\nTotal Feeds: ${bankFeeds.length}`)
          }}>
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Sync Success</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">{successRate.toFixed(1)}%</div>
              <p className="text-sm text-[#001f3f]">Success rate</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Bank Feed Status</CardTitle>
            <CardDescription className="text-[#001f3f]">Status and configuration of all bank feed connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bankFeeds.map((feed) => (
                <div key={feed.id} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => handleViewFeed(feed)}>
                  <div className="flex items-center gap-4">
                    <Link className={`h-6 w-6 ${
                      feed.status === 'Active' ? 'text-green-600' : 
                      feed.status === 'Warning' ? 'text-orange-600' : 
                      'text-red-600'
                    }`} />
                    <div>
                      <p className="font-medium text-[#001f3f]">{feed.bank}</p>
                      <p className="text-sm text-[#001f3f]">{feed.account} • {feed.frequency}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge className={`${
                          feed.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          feed.status === 'Warning' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {feed.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#001f3f]">{feed.transactions} transactions</p>
                    <p className="text-sm text-[#001f3f]">Last sync: {feed.lastSync}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleViewFeed(feed); }}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleEditFeed(feed); }}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleSyncFeed(feed); }}>
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteFeed(feed); }}>
                        <Trash2 className="h-3 w-3 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Feed Configuration</CardTitle>
            <CardDescription>Configure automatic categorization rules and sync settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-medium">Auto-Categorization Rules</h4>
                {[
                  { rule: 'Contains "SALARY" → Payroll', matches: 45 },
                  { rule: 'Contains "RENT" → Office Expenses', matches: 12 },
                  { rule: 'Contains "HMRC" → Tax Payments', matches: 8 },
                  { rule: 'Amount > £1000 → Manual Review', matches: 23 }
                ].map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                    <p className="text-sm">{rule.rule}</p>
                    <Badge className="bg-blue-100 text-[#001f3f]">{rule.matches} matches</Badge>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Sync Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-sync frequency</span>
                    <span className="text-sm font-medium">Every 2 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Duplicate detection</span>
                    <span className="text-sm font-medium">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-categorization</span>
                    <span className="text-sm font-medium">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notification alerts</span>
                    <span className="text-sm font-medium">Email + In-app</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderSalesAnalytics() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Sales Analytics</h2>
            <p className="text-[#001f3f]">Analyze sales performance across all platforms</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Custom Report
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">£125,430</div>
              <p className="text-sm text-[#001f3f]">This quarter</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-brisk-primary">+18.5%</div>
              <p className="text-sm text-[#001f3f]">vs last quarter</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Best Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-600">Amazon</div>
              <p className="text-sm text-[#001f3f]">£45,230 revenue</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">3.2%</div>
              <p className="text-sm text-[#001f3f]">Average rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Revenue by Platform</CardTitle>
              <CardDescription>Sales breakdown by eCommerce platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { platform: 'Amazon', revenue: 45230, percentage: 36, color: 'bg-orange-500' },
                  { platform: 'eBay', revenue: 32100, percentage: 26, color: 'bg-blue-500' },
                  { platform: 'Shopify', revenue: 28900, percentage: 23, color: 'bg-green-500' },
                  { platform: 'Etsy', revenue: 12800, percentage: 10, color: 'bg-purple-500' },
                  { platform: 'WooCommerce', revenue: 6400, percentage: 5, color: 'bg-gray-500' }
                ].map((platform, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${platform.color}`}></div>
                      <span className="font-medium">{platform.platform}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{platform.revenue.toLocaleString()}</p>
                      <p className="text-sm text-[#001f3f]">{platform.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Top Products</CardTitle>
              <CardDescription>Best-selling products across all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { product: 'Wireless Headphones', sales: 234, revenue: 18720, platform: 'Amazon' },
                  { product: 'Smart Watch', sales: 156, revenue: 15600, platform: 'eBay' },
                  { product: 'Phone Case', sales: 445, revenue: 8900, platform: 'Shopify' },
                  { product: 'Bluetooth Speaker', sales: 89, revenue: 7120, platform: 'Etsy' },
                  { product: 'Laptop Stand', sales: 67, revenue: 4020, platform: 'Amazon' }
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                    <div>
                      <p className="font-medium">{product.product}</p>
                      <p className="text-sm text-[#001f3f]">{product.platform} • {product.sales} sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderChartOfAccounts() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Chart of Accounts</h2>
            <p className="text-[#001f3f]">Manage your complete chart of accounts structure</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Chart
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Total Accounts</p>
                  <p className="text-xl font-bold">247</p>
                  <p className="text-xs text-[#001f3f]">Active accounts</p>
                </div>
                <Database className="h-8 w-8 text-[#001f3f]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Asset Accounts</p>
                  <p className="text-xl font-bold">89</p>
                  <p className="text-xs text-green-600">Including current assets</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Liability Accounts</p>
                  <p className="text-xl font-bold">34</p>
                  <p className="text-xs text-orange-600">Current & long-term</p>
                </div>
                <TrendingDown className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Revenue Accounts</p>
                  <p className="text-xl font-bold">45</p>
                  <p className="text-xs text-purple-600">Income streams</p>
                </div>
                <PoundSterling className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Account Categories</CardTitle>
            <CardDescription>Organized by account type and classification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Current Assets', accounts: 45, balance: '£125,430', type: 'Assets' },
                { category: 'Fixed Assets', accounts: 23, balance: '£89,200', type: 'Assets' },
                { category: 'Current Liabilities', accounts: 18, balance: '£34,500', type: 'Liabilities' },
                { category: 'Revenue', accounts: 32, balance: '£245,600', type: 'Income' },
                { category: 'Operating Expenses', accounts: 67, balance: '£78,900', type: 'Expenses' }
              ].map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{category.category}</p>
                      <Badge className={`${
                        category.type === 'Assets' ? 'bg-green-100 text-green-800' : 
                        category.type === 'Liabilities' ? 'bg-red-100 text-red-800' : 
                        category.type === 'Income' ? 'bg-blue-100 text-[#001f3f]' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {category.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">{category.accounts} accounts</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{category.balance}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderGeneralJournal() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">General Journal</h2>
            <p className="text-[#001f3f]">Record and manage all journal entries</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Journal
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Total Entries</p>
                  <p className="text-xl font-bold">1,247</p>
                  <p className="text-xs text-[#001f3f]">This period</p>
                </div>
                <BookOpen className="h-8 w-8 text-[#001f3f]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Pending Review</p>
                  <p className="text-xl font-bold">23</p>
                  <p className="text-xs text-orange-600">Awaiting approval</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Auto Entries</p>
                  <p className="text-xl font-bold">456</p>
                  <p className="text-xs text-green-600">System generated</p>
                </div>
                <RefreshCw className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Manual Entries</p>
                  <p className="text-xl font-bold">791</p>
                  <p className="text-xs text-purple-600">User created</p>
                </div>
                <Edit className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Recent Journal Entries</CardTitle>
            <CardDescription>Latest journal entries and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'JE-2024-001', description: 'Monthly depreciation', date: '2024-01-31', amount: 2500, status: 'Posted' },
                { id: 'JE-2024-002', description: 'Accrued expenses adjustment', date: '2024-01-30', amount: 1850, status: 'Pending' },
                { id: 'JE-2024-003', description: 'Bank reconciliation adjustment', date: '2024-01-29', amount: 450, status: 'Posted' },
                { id: 'JE-2024-004', description: 'Prepaid insurance allocation', date: '2024-01-28', amount: 750, status: 'Draft' }
              ].map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{entry.id}</p>
                      <Badge className={`${
                        entry.status === 'Posted' ? 'bg-green-100 text-green-800' : 
                        entry.status === 'Pending' ? 'bg-orange-100 text-orange-800' : 
                        'bg-gray-100 text-[#001f3f]'
                      }`}>
                        {entry.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">{entry.description}</p>
                    <p className="text-xs text-gray-500">{entry.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{entry.amount}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderJournalAdjustments() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Journal Adjustments</h2>
            <p className="text-[#001f3f]">Period-end adjustments and corrections</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Adjustment
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Process All
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Adjustment Categories</CardTitle>
            <CardDescription>Common adjustment types and their impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { type: 'Accruals', count: 12, amount: 15600, description: 'Expenses incurred but not yet recorded' },
                { type: 'Prepayments', count: 8, amount: 9200, description: 'Expenses paid in advance' },
                { type: 'Depreciation', count: 15, amount: 22400, description: 'Asset depreciation charges' },
                { type: 'Bad Debt', count: 3, amount: 4500, description: 'Provision for doubtful debts' }
              ].map((adjustment, index) => (
                <div key={index} className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-[#001f3f]">{adjustment.type}</h3>
                    <Badge>{adjustment.count} entries</Badge>
                  </div>
                  <p className="text-sm text-[#001f3f] mb-2">{adjustment.description}</p>
                  <p className="text-lg font-semibold">£{adjustment.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderJournalReversals() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Journal Reversals</h2>
            <p className="text-[#001f3f]">Reverse and correct journal entries</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              New Reversal
            </Button>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Find Entry
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Reversal History</CardTitle>
            <CardDescription>Recently reversed journal entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { original: 'JE-2024-045', reversal: 'JE-2024-046', date: '2024-01-25', amount: 1200, reason: 'Incorrect account coding' },
                { original: 'JE-2024-032', reversal: 'JE-2024-047', date: '2024-01-24', amount: 850, reason: 'Duplicate entry' },
                { original: 'JE-2024-028', reversal: 'JE-2024-048', date: '2024-01-23', amount: 2100, reason: 'Wrong period' }
              ].map((reversal, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{reversal.original}</p>
                      <ArrowLeftRight className="h-4 w-4 text-gray-400" />
                      <p className="font-medium">{reversal.reversal}</p>
                    </div>
                    <p className="text-sm text-[#001f3f]">{reversal.reason}</p>
                    <p className="text-xs text-gray-500">{reversal.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{reversal.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderJournalTemplates() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Journal Templates</h2>
            <p className="text-[#001f3f]">Reusable journal entry templates</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
            <Button>
              <Copy className="h-4 w-4 mr-2" />
              Use Template
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Available Templates</CardTitle>
            <CardDescription>Pre-configured journal entry templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: 'Monthly Depreciation', category: 'Fixed Assets', usage: 12, description: 'Standard monthly depreciation entries' },
                { name: 'Accrued Expenses', category: 'Liabilities', usage: 8, description: 'Period-end expense accruals' },
                { name: 'Prepaid Insurance', category: 'Assets', usage: 6, description: 'Insurance prepayment allocation' },
                { name: 'Bank Charges', category: 'Expenses', usage: 15, description: 'Monthly bank fee entries' }
              ].map((template, index) => (
                <div key={index} className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-[#001f3f]">{template.name}</h3>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <p className="text-sm text-[#001f3f] mb-2">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">Used {template.usage} times</p>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderVATReturns() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">VAT Returns</h2>
            <p className="text-[#001f3f]">Manage VAT returns and submissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Return
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Submit to HMRC
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Current Period</p>
                  <p className="text-xl font-bold">Q1 2024</p>
                  <p className="text-xs text-[#001f3f]">Due: 7 May 2024</p>
                </div>
                <Calendar className="h-8 w-8 text-[#001f3f]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">VAT Due</p>
                  <p className="text-xl font-bold">£8,450</p>
                  <p className="text-xs text-red-600">Amount payable</p>
                </div>
                <PoundSterling className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">VAT Reclaim</p>
                  <p className="text-xl font-bold">£3,200</p>
                  <p className="text-xs text-green-600">Input VAT</p>
                </div>
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#001f3f]">Net Due</p>
                  <p className="text-xl font-bold">£5,250</p>
                  <p className="text-xs text-orange-600">Final amount</p>
                </div>
                <Calculator className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">VAT Return History</CardTitle>
            <CardDescription>Previous VAT return submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { period: 'Q4 2023', submitted: '2024-02-07', due: 5250, status: 'Submitted', reference: 'VAT-2023-Q4' },
                { period: 'Q3 2023', submitted: '2023-11-06', due: 4800, status: 'Paid', reference: 'VAT-2023-Q3' },
                { period: 'Q2 2023', submitted: '2023-08-05', due: 6100, status: 'Paid', reference: 'VAT-2023-Q2' }
              ].map((return_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{return_.period}</p>
                      <Badge className={`${
                        return_.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        return_.status === 'Submitted' ? 'bg-blue-100 text-[#001f3f]' : 
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {return_.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">{return_.reference}</p>
                    <p className="text-xs text-gray-500">Submitted: {return_.submitted}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{return_.due}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderVATSchemes() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">VAT Schemes</h2>
            <p className="text-[#001f3f]">Manage VAT scheme settings and configurations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Change Scheme
            </Button>
            <Button>
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Impact
            </Button>
          </div>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Current VAT Scheme</CardTitle>
            <CardDescription>Your active VAT registration details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border-2 border-[#001f3f] rounded-[2px] bg-blue-50">
                <h3 className="font-medium text-[#001f3f] text-[#001f3f]">Standard VAT Scheme</h3>
                <p className="text-sm text-[#001f3f] mt-1">Standard rate: 20%</p>
                <p className="text-sm text-[#001f3f]">Registration: GB123456789</p>
                <p className="text-sm text-[#001f3f]">Effective from: 1 April 2023</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-[#001f3f]">Quarterly returns</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#001f3f]">Digital submissions</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#001f3f]">MTD compliant</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Available VAT Schemes</CardTitle>
            <CardDescription>Compare different VAT scheme options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Standard VAT', rate: '20%', threshold: '£85,000', description: 'Standard VAT registration with full input tax recovery' },
                { name: 'Flat Rate Scheme', rate: '16.5%', threshold: '£150,000', description: 'Simplified scheme with fixed percentage on turnover' },
                { name: 'Cash Accounting', rate: '20%', threshold: '£1.35m', description: 'Pay VAT when you receive payment from customers' },
                { name: 'Annual Accounting', rate: '20%', threshold: '£1.35m', description: 'Make monthly payments with annual return' }
              ].map((scheme, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{scheme.name}</p>
                      <Badge variant="outline">{scheme.rate}</Badge>
                    </div>
                    <p className="text-sm text-[#001f3f]">{scheme.description}</p>
                    <p className="text-xs text-gray-500">Threshold: {scheme.threshold}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Calculator className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderVATReports() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">VAT Reports</h2>
            <p className="text-[#001f3f]">Comprehensive VAT analysis and reporting</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Custom Report
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">VAT Summary</CardTitle>
              <CardDescription>Current period overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#001f3f]">Output VAT</span>
                  <span className="font-medium">£8,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#001f3f]">Input VAT</span>
                  <span className="font-medium">£3,200</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Net VAT Due</span>
                  <span className="font-bold">£5,250</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">VAT by Rate</CardTitle>
              <CardDescription>Breakdown by VAT rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#001f3f]">Standard (20%)</span>
                  <span className="font-medium">£7,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#001f3f]">Reduced (5%)</span>
                  <span className="font-medium">£850</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#001f3f]">Zero (0%)</span>
                  <span className="font-medium">£400</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Compliance Status</CardTitle>
              <CardDescription>VAT compliance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#001f3f]">MTD Compliant</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#001f3f]">Returns Up to Date</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#001f3f]">No Penalties</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">VAT Analysis by Month</CardTitle>
            <CardDescription>Monthly VAT liability trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: 'January 2024', output: 2800, input: 1200, net: 1600 },
                { month: 'February 2024', output: 3200, input: 1100, net: 2100 },
                { month: 'March 2024', output: 2450, input: 900, net: 1550 }
              ].map((month, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex-1">
                    <p className="font-medium">{month.month}</p>
                    <div className="flex gap-4 mt-1">
                      <span className="text-sm text-[#001f3f]">Output: £{month.output}</span>
                      <span className="text-sm text-[#001f3f]">Input: £{month.input}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{month.net}</p>
                    <p className="text-xs text-gray-500">Net VAT</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderVATCompliance() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">VAT Compliance</h2>
            <p className="text-[#001f3f]">Monitor VAT compliance and regulatory requirements</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              Check Status
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Compliance Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Compliance Checklist</CardTitle>
              <CardDescription>Essential VAT compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { item: 'VAT registration up to date', status: 'complete', description: 'Registration details current' },
                  { item: 'Quarterly returns submitted', status: 'complete', description: 'All returns filed on time' },
                  { item: 'MTD software compliant', status: 'complete', description: 'Using approved software' },
                  { item: 'Digital records maintained', status: 'complete', description: 'Records stored digitally' },
                  { item: 'VAT invoices compliant', status: 'warning', description: 'Some invoices missing details' }
                ].map((check, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border-2 border-[#001f3f] rounded-[2px]">
                    <div className="mt-1">
                      {check.status === 'complete' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{check.item}</p>
                      <p className="text-sm text-[#001f3f]">{check.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Upcoming Deadlines</CardTitle>
              <CardDescription>Important VAT dates and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { task: 'Q1 2024 VAT Return', date: '7 May 2024', days: 15, type: 'return' },
                  { task: 'VAT Payment Due', date: '7 May 2024', days: 15, type: 'payment' },
                  { task: 'Annual VAT Review', date: '31 March 2024', days: -5, type: 'review' }
                ].map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px]">
                    <div className="flex-1">
                      <p className="font-medium">{deadline.task}</p>
                      <p className="text-sm text-[#001f3f]">{deadline.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`${
                        deadline.days < 0 ? 'bg-red-100 text-red-800' : 
                        deadline.days <= 7 ? 'bg-orange-100 text-orange-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {deadline.days < 0 ? `${Math.abs(deadline.days)} days overdue` : 
                         deadline.days === 0 ? 'Due today' : 
                         `${deadline.days} days`}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Compliance Alerts</CardTitle>
            <CardDescription>Recent compliance notifications and actions required</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'warning', message: 'VAT invoice missing customer VAT number', date: '2024-01-28', action: 'Update invoice template' },
                { type: 'info', message: 'New VAT rate changes effective April 2024', date: '2024-01-25', action: 'Review rate settings' },
                { type: 'success', message: 'Q4 2023 VAT return successfully submitted', date: '2024-01-20', action: 'No action required' }
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="mt-1">
                    {alert.type === 'warning' ? (
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    ) : alert.type === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <ExternalLink className="h-4 w-4 text-[#001f3f]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-[#001f3f]">{alert.action}</p>
                    <p className="text-xs text-gray-500">{alert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Inventory Management Handlers
  const handleAddStock = () => {
    setSelectedStockItem(null)
    setIsStockFormOpen(true)
  }

  const handleViewStock = (item: any) => {
    setSelectedStockItem(item)
    setIsStockDetailOpen(true)
  }

  const handleKPIClick = (title: string, value: string) => {
    let data: any = { title, value, items: [] }
    
    if (title === 'Total Stock Value') {
      data.items = stockItems.map(i => ({
        name: i.name,
        value: `£${(i.quantity * i.cost).toFixed(2)}`,
        quantity: i.quantity,
        cost: i.cost
      }))
    } else if (title === 'Total Items') {
      data.items = stockItems.map(i => ({
        name: i.name,
        quantity: i.quantity,
        status: i.status
      }))
    } else if (title === 'Low Stock Alerts') {
      const lowStock = stockItems.filter(i => i.quantity <= i.reorderLevel)
      data.items = lowStock.map(i => ({
        name: i.name,
        current: i.quantity,
        reorderLevel: i.reorderLevel,
        status: i.status
      }))
    } else {
      data.description = 'Detailed analytics for ' + title
    }
    
    setKpiDrilldownData(data)
    setIsKPIDrilldownOpen(true)
  }

  const handleWarehouseClick = (warehouse: any) => {
    setSelectedWarehouse(warehouse)
    setIsWarehouseDetailOpen(true)
  }

  const handleAdjustmentClick = (adj: any) => {
    setSelectedAdjustment(adj)
    setIsAdjustmentDetailOpen(true)
  }

  const handleReorderAlertClick = (alert: any) => {
    setSelectedReorderAlert(alert)
    setIsReorderDetailOpen(true)
  }

  const handleStockTakeClick = (take: any) => {
    setSelectedStockTake(take)
    setIsStockTakeDetailOpen(true)
  }

  const handleRecordStockTake = () => {
    setSelectedStockTake(null)
    setIsStockTakeFormOpen(true)
  }

  const handleGenerateInventoryReport = (reportType: string) => {
    console.log(`📊 Generating ${reportType} Report...\n\nReport Type: ${reportType}\nDate Range: Last 30 days\nFormat: PDF\n\nReport will be downloaded shortly.\n\nReport includes:\n- Stock levels by category\n- Valuation analysis\n- Movement history\n- Reorder recommendations\n- Variance analysis`)
  }

  function renderInventoryDashboard() {
    const totalStockValue = stockItems.reduce((sum, item) => sum + (item.quantity * item.cost), 0)
    const lowStockItems = stockItems.filter(item => item.quantity <= item.reorderLevel).length
    const totalItems = stockItems.length

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Inventory Dashboard</h2>
            <p className="text-[#001f3f]">Overview of inventory levels, stock valuation, and key metrics</p>
          </div>
          <Button onClick={handleAddStock}><Plus className="h-4 w-4 mr-2" />Add Stock Item</Button>
        </div>
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <div onClick={() => handleKPIClick('Total Stock Value', `£${totalStockValue.toLocaleString()}`)} className="cursor-pointer">
            <KPICard title="Total Stock Value" value={`£${totalStockValue.toLocaleString()}`} change="+8.3%" icon={PoundSterling} color="text-green-600" />
          </div>
          <div onClick={() => handleKPIClick('Total Items', totalItems.toString())} className="cursor-pointer">
            <KPICard title="Total Items" value={totalItems.toString()} change="+12" icon={Box} color="text-blue-600" />
          </div>
          <div onClick={() => handleKPIClick('Low Stock Alerts', lowStockItems.toString())} className="cursor-pointer">
            <KPICard title="Low Stock Alerts" value={lowStockItems.toString()} change="-2" icon={Bell} color="text-orange-600" />
          </div>
          <div onClick={() => handleKPIClick('Avg Turnover', '45 days')} className="cursor-pointer">
            <KPICard title="Avg Turnover" value="45 days" change="-5 days" icon={RefreshCw} color="text-purple-600" />
          </div>
        </div>
        
        {/* Stock Level Summary */}
        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Stock Level Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {stockItems.map((item, idx) => (
                <div key={idx} onClick={() => handleViewStock(item)} className="p-4 border-2 border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                  <p className="font-semibold text-[#001f3f]">{item.name}</p>
                  <p className="text-sm text-[#001f3f]">{item.quantity} units</p>
                  <Badge variant={item.status === 'Critical' ? 'destructive' : item.status === 'Low Stock' ? 'outline' : 'default'}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderStockManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Stock Management</h2>
            <p className="text-[#001f3f]">Manage inventory items, quantities, and stock levels</p>
          </div>
          <Button onClick={handleAddStock}><Plus className="h-4 w-4 mr-2" />Add Stock Item</Button>
        </div>
        <div className="grid gap-4">
          {stockItems.map((item, index) => (
            <Card key={index} className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleViewStock(item)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#001f3f]">{item.name}</h3>
                    <p className="text-sm text-[#001f3f]">SKU: {item.sku} | {item.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#001f3f]">{item.quantity} units</p>
                      <p className="text-sm text-[#001f3f]">£{item.cost.toFixed(2)}</p>
                    </div>
                    <Badge variant={item.status === 'Critical' ? 'destructive' : 'outline'}>{item.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function renderWarehouseManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Warehouse Management</h2>
            <p className="text-[#001f3f]">Manage warehouse locations and stock transfers</p>
          </div>
          <Button onClick={() => console.log('Add new warehouse feature coming soon!')}><Plus className="h-4 w-4 mr-2" />Add Warehouse</Button>
        </div>
        
        {/* Warehouse KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Total Warehouses: 3\n\nMain Warehouse\nNorth Distribution Center\nSouth Storage Facility')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Total Warehouses</p>
              <p className="text-2xl font-bold text-[#001f3f]">3</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Total Capacity: 45,000 sqft\n\nMain: 20,000 sqft\nNorth: 15,000 sqft\nSouth: 10,000 sqft')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Total Capacity</p>
              <p className="text-2xl font-bold text-[#001f3f]">45,000 sqft</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Space Utilized: 30,500 sqft (67.8%)\n\nMain: 15,000/20,000\nNorth: 10,000/15,000\nSouth: 5,500/10,000')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Space Utilized</p>
              <p className="text-2xl font-bold text-[#001f3f]">67.8%</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Active Transfers: 2\n\nTransfer #TRF-001: Main → North (15 items)\nTransfer #TRF-002: North → South (8 items)')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Active Transfers</p>
              <p className="text-2xl font-bold text-[#001f3f]">2</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Warehouse Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {warehouses.map((warehouse, index) => (
            <Card key={index} className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleWarehouseClick(warehouse)}>
              <CardHeader>
                <CardTitle className="text-[#001f3f]">{warehouse.name}</CardTitle>
                <CardDescription className="text-[#001f3f]">{warehouse.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-[#001f3f]"><span className="font-semibold">Manager:</span> {warehouse.manager}</p>
                  <p className="text-sm text-[#001f3f]"><span className="font-semibold">Capacity:</span> {warehouse.used}/{warehouse.capacity} sqft ({((warehouse.used/warehouse.capacity)*100).toFixed(1)}%)</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: `${(warehouse.used/warehouse.capacity)*100}%`}}></div>
                  </div>
                  <Badge variant={warehouse.status === 'Active' ? 'default' : 'outline'}>{warehouse.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function renderStockAdjustments() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Stock Adjustments</h2>
            <p className="text-[#001f3f]">Track inventory adjustments with full audit trail</p>
          </div>
          <Button onClick={() => {
            const product = prompt('Product Name:')
            if (product) {
              const qty = prompt('Adjustment Quantity (use negative for decrease):')
              const reason = prompt('Reason for adjustment:')
              if (qty && reason) {
                console.log(`✅ Stock Adjustment Created!\n\nProduct: ${product}\nQuantity: ${qty}\nReason: ${reason}\nDate: ${new Date().toLocaleDateString()}\nAdjustment ID: ADJ-${Date.now()}`)
              }
            }
          }}><Plus className="h-4 w-4 mr-2" />New Adjustment</Button>
        </div>
        
        {/* Adjustment Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Total Adjustments This Month: 4\n\nIncreases: 2\nDecreases: 1\nDamaged: 1')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">This Month</p>
              <p className="text-2xl font-bold text-[#001f3f]">4</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Net Adjustment: +85 units\n\nIncreases: +120\nDecreases: -35')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Net Adjustment</p>
              <p className="text-2xl font-bold text-green-600">+85 units</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Value Impact: £2,450\n\nIncreases: +£3,200\nDecreases: -£750')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Value Impact</p>
              <p className="text-2xl font-bold text-[#001f3f]">£2,450</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Pending Approvals: 0\n\nAll adjustments have been approved.')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Pending</p>
              <p className="text-2xl font-bold text-[#001f3f]">0</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Adjustment List */}
        <div className="grid gap-4">
          {stockAdjustments.map((adj, index) => (
            <Card key={index} className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleAdjustmentClick(adj)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#001f3f]">{adj.productName}</h3>
                    <p className="text-sm text-[#001f3f]">SKU: {adj.sku} | {adj.date}</p>
                    <p className="text-sm text-[#001f3f] mt-1"><span className="font-medium">{adj.type}:</span> {adj.quantity} units - {adj.reason}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={adj.type === 'Increase' ? 'default' : adj.type === 'Decrease' ? 'outline' : 'destructive'}>{adj.type}</Badge>
                    <p className="text-xs text-gray-500 mt-1">By {adj.adjustedBy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function renderReorderManagement() {
    const criticalAlerts = reorderAlerts.filter(a => a.priority === 'Critical').length
    const highAlerts = reorderAlerts.filter(a => a.priority === 'High').length
    
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Reorder Management</h2>
            <p className="text-[#001f3f]">Automated reorder alerts and purchase suggestions</p>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-2 border-red-500 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600">{criticalAlerts}</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-orange-500 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">High Priority</p>
              <p className="text-2xl font-bold text-orange-600">{highAlerts}</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Suggested Orders</p>
              <p className="text-2xl font-bold text-[#001f3f]">3</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Est. Cost</p>
              <p className="text-2xl font-bold text-[#001f3f]">£12,450</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4">
          {reorderAlerts.map((alert, index) => (
            <Card key={index} className={`border-2 ${alert.priority === 'Critical' ? 'border-red-500' : 'border-orange-500'} cursor-pointer hover:shadow-lg transition-shadow`} onClick={() => handleReorderAlertClick(alert)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#001f3f]">{alert.productName}</h3>
                      <Badge variant={alert.priority === 'Critical' ? 'destructive' : 'default'}>{alert.priority}</Badge>
                    </div>
                    <p className="text-sm text-[#001f3f] mt-1">SKU: {alert.sku}</p>
                    <p className="text-sm text-[#001f3f]">Current: {alert.currentStock} | Reorder Level: {alert.reorderLevel}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#001f3f]">Suggested Order</p>
                    <p className="text-xl font-bold text-[#001f3f]">{alert.suggestedOrder} units</p>
                    <p className="text-sm text-[#001f3f]">£{alert.estimatedCost.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function renderInventoryValuation() {
    const totalValue = stockItems.reduce((sum, item) => sum + (item.quantity * item.cost), 0)
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Inventory Valuation</h2>
            <p className="text-[#001f3f]">Calculate inventory value using different methods</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader><CardTitle className="text-[#001f3f]">FIFO Method</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold text-[#001f3f]">£{totalValue.toLocaleString()}</p></CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader><CardTitle className="text-[#001f3f]">LIFO Method</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold text-[#001f3f]">£{totalValue.toLocaleString()}</p></CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f]">
            <CardHeader><CardTitle className="text-[#001f3f]">Weighted Average</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold text-[#001f3f]">£{totalValue.toLocaleString()}</p></CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderStockTake() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Stock Take Management</h2>
            <p className="text-[#001f3f]">Physical inventory counts and variance analysis</p>
          </div>
          <Button onClick={handleRecordStockTake}><Plus className="h-4 w-4 mr-2" />Record Stock Take</Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">This Year</p>
              <p className="text-2xl font-bold text-[#001f3f]">12</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Completed</p>
              <p className="text-2xl font-bold text-green-600">10</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Discrepancies</p>
              <p className="text-2xl font-bold text-orange-600">28</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Total Variance</p>
              <p className="text-2xl font-bold text-[#001f3f]">£1,250</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4">
          {stockTakes.map((take, index) => (
            <Card key={index} className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStockTakeClick(take)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#001f3f]">{take.warehouse} - Stock Take</h3>
                      <Badge variant={take.status === 'Completed' ? 'default' : 'outline'}>{take.status}</Badge>
                    </div>
                    <p className="text-sm text-[#001f3f] mt-1">Date: {take.date}</p>
                    <p className="text-sm text-[#001f3f]">Items Checked: {take.itemsChecked} | Discrepancies: {take.discrepancies}</p>
                    <p className="text-sm text-[#001f3f]">Performed By: {take.performedBy}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#001f3f]">Variance</p>
                    <p className={`text-xl font-bold ${take.variance < 0 ? 'text-red-600' : 'text-green-600'}`}>£{Math.abs(take.variance).toFixed(2)}</p>
                    {take.completedDate && <p className="text-xs text-gray-500 mt-1">Completed: {take.completedDate}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function renderSerialBatchTracking() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Serial & Batch Tracking</h2>
            <p className="text-[#001f3f]">Complete traceability for serialized inventory</p>
          </div>
        </div>
        <div className="grid gap-4">
          {stockItems.filter(item => item.category === 'Electronics').map((item, index) => (
            <Card key={index} className="border-2 border-[#001f3f]">
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#001f3f]">{item.name}</h3>
                <p className="text-sm text-[#001f3f]">Tracked Units: {item.quantity}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function renderInventoryReports() {
    const reports = [
      { name: 'Stock Level Report', description: 'Current stock levels across all locations', icon: '📊' },
      { name: 'Inventory Valuation Report', description: 'Total inventory value by method (FIFO/LIFO/Avg)', icon: '💷' },
      { name: 'Stock Movement Report', description: 'Detailed history of stock movements', icon: '📈' },
      { name: 'Reorder Report', description: 'Items requiring reorder with suggestions', icon: '🔔' },
      { name: 'Stock Aging Report', description: 'Age analysis of inventory items', icon: '⏱️' },
      { name: 'Variance Analysis Report', description: 'Stock take variances and discrepancies', icon: '🔍' },
      { name: 'Warehouse Utilization Report', description: 'Space usage across warehouses', icon: '🏭' },
      { name: 'Slow Moving Stock Report', description: 'Items with low turnover', icon: '🐌' },
    ]
    
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Inventory Reports</h2>
            <p className="text-[#001f3f]">Comprehensive inventory reporting and analytics</p>
          </div>
        </div>
        
        {/* Report Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Reports Generated This Month: 24\n\nStock Level: 8\nValuation: 4\nMovement: 6\nOther: 6')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Reports This Month</p>
              <p className="text-2xl font-bold text-[#001f3f]">24</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Scheduled Reports: 5\n\nWeekly stock level report\nMonthly valuation report\nDaily reorder check\nWeekly variance report\nMonthly warehouse report')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Scheduled</p>
              <p className="text-2xl font-bold text-[#001f3f]">5</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Export Formats Available:\n\n✓ PDF\n✓ CSV\n✓ Excel (.xlsx)\n✓ JSON')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Export Formats</p>
              <p className="text-2xl font-bold text-[#001f3f]">4</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#001f3f] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => console.log('Last Report Generated:\n\nStock Level Report\nGenerated: Today at 09:15\nFormat: PDF')}>
            <CardContent className="p-4">
              <p className="text-sm text-[#001f3f] font-medium">Last Generated</p>
              <p className="text-lg font-bold text-[#001f3f]">Today</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Available Reports */}
        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Available Reports</CardTitle>
            <CardDescription>Click any report to generate and export</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {reports.map((report, idx) => (
                <div key={idx} className="p-4 border-2 border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-all" onClick={() => handleGenerateInventoryReport(report.name)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{report.icon}</span>
                      <div>
                        <p className="font-semibold text-[#001f3f]">{report.name}</p>
                        <p className="text-sm text-[#001f3f]">{report.description}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={(e) => {
                      e.stopPropagation()
                      handleGenerateInventoryReport(report.name)
                    }}>
                      <FileText className="h-4 w-4 mr-1" />
                      Generate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Export Options */}
        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Export All Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button onClick={() => handleGenerateInventoryReport('Complete Inventory Export')}>
                <Download className="h-4 w-4 mr-2" />
                Export Inventory Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }



  return (
    <ResponsiveLayout>
      <div className="flex min-h-screen bg-blue-50">
        <div className="w-64 bg-white border-r-2 border-[#001f3f] flex flex-col">
          <div className="p-4 border-b-2 border-[#001f3f]">
            <h2 className="text-lg font-semibold text-[#001f3f]">Bookkeeping</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="p-2">
              {Object.entries(menuStructure).map(([key, config]) => {
                const Icon = config.icon
                const isExpanded = expandedCategories.includes(key)
                const isActive = activeMainTab === key
                
                return (
                  <div key={key} className="mb-1">
                    <button
                      onClick={() => handleMainTabClick(key)}
                      className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all duration-200 shadow-sm ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold' 
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-3" />
                        <span>{config.label}</span>
                      </div>
                      {config.hasSubTabs && (
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`} />
                      )}
                    </button>
                    
                    {config.hasSubTabs && isExpanded && config.subTabs && (
                      <div className="ml-4 mt-1 space-y-1">
                        {Object.entries(config.subTabs).map(([subKey, subConfig]) => {
                          const SubIcon = subConfig.icon
                          const isSubActive = activeSubTab === subKey && activeMainTab === key
                          
                          return (
                            <button
                              key={subKey}
                              onClick={() => handleSubTabClick(subKey, key)}
                              className={`w-full flex items-center px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all duration-200 shadow-sm ${
                                isSubActive 
                                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-l-2 border-orange-300 shadow-md font-semibold' 
                                  : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
                              }`}
                            >
                              <SubIcon className="h-4 w-4 mr-3" />
                              <span>{subConfig.label}</span>
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

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderMainContent()}
            
            <AIPromptSection
              title="Ask your Bookkeeping Adviser"
              description="Get expert bookkeeping and accounting guidance"
              placeholder="Ask about transactions, reconciliation, VAT, reporting..."
              isLoading={isAILoading}
              onSubmit={handleAIQuestion}
              recentQuestions={[
                "How do I reconcile bank transactions?",
                "What are the VAT filing requirements?",
                "How do I categorize business expenses?"
              ]}
            />
          </div>
        </div>
      </div>

      <Dialog open={isTransactionDetailOpen} onOpenChange={setIsTransactionDetailOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Transaction Details</DialogTitle>
            <DialogDescription className="text-[#001f3f]">View complete information for this transaction</DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-[#001f3f] font-semibold">Description</Label>
                <p className="text-sm text-[#001f3f]">{selectedTransaction.description}</p>
              </div>
              <div className="grid gap-2">
                <Label className="text-[#001f3f] font-semibold">Amount</Label>
                <p className={`text-xl font-bold ${selectedTransaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedTransaction.amount > 0 ? '+' : ''}£{Math.abs(selectedTransaction.amount)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Date</Label>
                  <p className="text-sm text-[#001f3f]">{selectedTransaction.date}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Type</Label>
                  <Badge className="mt-1 bg-blue-100 text-[#001f3f]">{selectedTransaction.type}</Badge>
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-[#001f3f] font-semibold">Account</Label>
                <p className="text-sm text-[#001f3f]">{selectedTransaction.account}</p>
              </div>
              {selectedTransaction.category && (
                <div className="grid gap-2">
                  <Label className="text-[#001f3f] font-semibold">Category</Label>
                  <Badge className="bg-green-100 text-green-800">{selectedTransaction.category}</Badge>
                </div>
              )}
              <div className="grid gap-2">
                <Label className="text-[#001f3f] font-semibold">Status</Label>
                <Badge className={selectedTransaction.status === 'Categorized' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                  {selectedTransaction.status}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransactionDetailOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTransactionEditOpen} onOpenChange={setIsTransactionEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Edit Transaction</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Update transaction information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="trans-desc" className="text-[#001f3f]">Description</Label>
              <Input
                id="trans-desc"
                value={transactionFormData.description || ''}
                onChange={(e) => setTransactionFormData({...transactionFormData, description: e.target.value})}
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="trans-amount" className="text-[#001f3f]">Amount</Label>
              <Input
                id="trans-amount"
                type="number"
                value={transactionFormData.amount || 0}
                onChange={(e) => setTransactionFormData({...transactionFormData, amount: parseFloat(e.target.value)})}
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="trans-category" className="text-[#001f3f]">Category</Label>
              <select
                id="trans-category"
                value={transactionFormData.category || ''}
                onChange={(e) => setTransactionFormData({...transactionFormData, category: e.target.value})}
                className="border-2 border-[#001f3f] rounded-[2px] p-2"
              >
                <option value="">Select Category</option>
                <option value="Sales">Sales</option>
                <option value="Purchases">Purchases</option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Salaries">Salaries</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransactionEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveTransactionEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCashCodingOpen} onOpenChange={setIsCashCodingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Cash Coding</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Assign category and tax code to this transaction</DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-[2px] border-2 border-[#001f3f]">
                <p className="font-medium">{selectedTransaction.description}</p>
                <p className={`text-lg font-bold ${selectedTransaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedTransaction.amount > 0 ? '+' : ''}£{Math.abs(selectedTransaction.amount)}
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cash-category" className="text-[#001f3f]">Category *</Label>
                <select
                  id="cash-category"
                  value={transactionFormData.category || ''}
                  onChange={(e) => setTransactionFormData({...transactionFormData, category: e.target.value})}
                  className="border-2 border-[#001f3f] rounded-[2px] p-2"
                >
                  <option value="">Select Category</option>
                  <option value="Sales">Sales</option>
                  <option value="Purchases">Purchases</option>
                  <option value="Rent">Rent</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Salaries">Salaries</option>
                  <option value="Banking Fees">Banking Fees</option>
                  <option value="Interest">Interest</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tax-code" className="text-[#001f3f]">Tax Code</Label>
                <select
                  id="tax-code"
                  value={transactionFormData.taxCode || 'T0'}
                  onChange={(e) => setTransactionFormData({...transactionFormData, taxCode: e.target.value})}
                  className="border-2 border-[#001f3f] rounded-[2px] p-2"
                >
                  <option value="T0">T0 - No VAT</option>
                  <option value="T1">T1 - Standard Rate (20%)</option>
                  <option value="T2">T2 - Exempt</option>
                  <option value="T4">T4 - Reduced Rate (5%)</option>
                  <option value="T9">T9 - Zero Rated</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes" className="text-[#001f3f]">Notes</Label>
                <textarea
                  id="notes"
                  value={transactionFormData.notes || ''}
                  onChange={(e) => setTransactionFormData({...transactionFormData, notes: e.target.value})}
                  className="border-2 border-[#001f3f] rounded-[2px] p-2 min-h-[80px]"
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCashCodingOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveCashCoding}>Save Coding</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isMatchTransactionOpen} onOpenChange={setIsMatchTransactionOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Match Transaction</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Find and match this item with existing transactions</DialogDescription>
          </DialogHeader>
          {selectedReconciliationItem && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-[2px] border-2 border-[#001f3f]">
                <p className="font-medium">{selectedReconciliationItem.description}</p>
                <p className={`text-lg font-bold ${selectedReconciliationItem.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedReconciliationItem.amount > 0 ? '+' : ''}£{Math.abs(selectedReconciliationItem.amount)}
                </p>
                <p className="text-sm text-[#001f3f]">{selectedReconciliationItem.date}</p>
              </div>
              <div>
                <Label className="text-[#001f3f] font-semibold mb-2 block">Suggested Matches</Label>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {matchCandidates.map((candidate) => (
                    <div key={candidate.id} className="p-3 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => handleConfirmMatch(candidate.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{candidate.description}</p>
                          <p className="text-sm text-[#001f3f]">{candidate.date} • {candidate.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">£{candidate.amount}</p>
                          <Badge className={
                            candidate.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                            candidate.matchScore >= 75 ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-[#001f3f]'
                          }>
                            {candidate.matchScore}% Match
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMatchTransactionOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isBankingRulesOpen} onOpenChange={setIsBankingRulesOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Banking Rules</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Manage automatic categorization and matching rules</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button onClick={handleAddRule} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New Rule
            </Button>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {bankingRules.map((rule) => (
                <div key={rule.id} className="p-3 border-2 border-[#001f3f] rounded-[2px]">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-sm text-[#001f3f]">{rule.condition}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge className="bg-blue-100 text-[#001f3f]">{rule.category}</Badge>
                        {rule.autoMatch && <Badge className="bg-green-100 text-green-800">Auto-Match</Badge>}
                        <Badge className={rule.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-[#001f3f]'}>
                          {rule.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Button variant="ghost" size="sm" onClick={() => handleToggleRule(rule.id)}>
                        {rule.status === 'Active' ? <Eye className="h-4 w-4" /> : <Eye className="h-4 w-4 opacity-50" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteRule(rule.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBankingRulesOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddRuleOpen} onOpenChange={setIsAddRuleOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Add Banking Rule</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Create a new rule for automatic transaction categorization</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="rule-name" className="text-[#001f3f]">Rule Name *</Label>
              <Input
                id="rule-name"
                value={ruleFormData.name}
                onChange={(e) => setRuleFormData({...ruleFormData, name: e.target.value})}
                placeholder="e.g., Auto-categorize Office Rent"
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rule-condition" className="text-[#001f3f]">Condition *</Label>
              <Input
                id="rule-condition"
                value={ruleFormData.condition}
                onChange={(e) => setRuleFormData({...ruleFormData, condition: e.target.value})}
                placeholder='e.g., Description contains "Rent"'
                className="border-2 border-[#001f3f]"
              />
              <p className="text-xs text-[#001f3f]">Use operators: contains, equals, greater than, less than</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rule-category" className="text-[#001f3f]">Category *</Label>
              <select
                id="rule-category"
                value={ruleFormData.category}
                onChange={(e) => setRuleFormData({...ruleFormData, category: e.target.value})}
                className="border-2 border-[#001f3f] rounded-[2px] p-2"
              >
                <option value="">Select Category</option>
                <option value="Sales">Sales</option>
                <option value="Purchases">Purchases</option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Salaries">Salaries</option>
                <option value="Banking Fees">Banking Fees</option>
                <option value="Interest">Interest</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="auto-match"
                checked={ruleFormData.autoMatch}
                onChange={(e) => setRuleFormData({...ruleFormData, autoMatch: e.target.checked})}
                className="h-4 w-4"
              />
              <Label htmlFor="auto-match" className="text-[#001f3f]">Enable auto-matching</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRuleOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveRule}>Create Rule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewFeedOpen} onOpenChange={setIsViewFeedOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Bank Feed Details</DialogTitle>
            <DialogDescription className="text-[#001f3f]">View complete information for this bank feed</DialogDescription>
          </DialogHeader>
          {selectedFeed && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-[#001f3f] font-semibold">Bank Name</Label>
                <p className="text-sm text-[#001f3f]">{selectedFeed.bank}</p>
              </div>
              <div className="grid gap-2">
                <Label className="text-[#001f3f] font-semibold">Account Number</Label>
                <p className="text-sm text-[#001f3f]">{selectedFeed.account}</p>
              </div>
              <div className="grid gap-2">
                <Label className="text-[#001f3f] font-semibold">Account ID</Label>
                <p className="text-sm text-[#001f3f]">{selectedFeed.accountId}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Status</Label>
                  <Badge className={`mt-1 ${
                    selectedFeed.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    selectedFeed.status === 'Warning' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>{selectedFeed.status}</Badge>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Frequency</Label>
                  <p className="text-sm text-[#001f3f]">{selectedFeed.frequency}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Last Sync</Label>
                  <p className="text-sm text-[#001f3f]">{selectedFeed.lastSync}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Transactions</Label>
                  <p className="text-sm font-semibold text-[#001f3f]">{selectedFeed.transactions}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewFeedOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditFeedOpen} onOpenChange={setIsEditFeedOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Edit Bank Feed</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Update bank feed configuration</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="feed-bank" className="text-[#001f3f]">Bank Name *</Label>
              <Input
                id="feed-bank"
                value={feedFormData.bank || ''}
                onChange={(e) => setFeedFormData({...feedFormData, bank: e.target.value})}
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feed-account" className="text-[#001f3f]">Account Number *</Label>
              <Input
                id="feed-account"
                value={feedFormData.account || ''}
                onChange={(e) => setFeedFormData({...feedFormData, account: e.target.value})}
                placeholder="e.g., ****1234"
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feed-accountId" className="text-[#001f3f]">Account ID *</Label>
              <Input
                id="feed-accountId"
                value={feedFormData.accountId || ''}
                onChange={(e) => setFeedFormData({...feedFormData, accountId: e.target.value})}
                placeholder="e.g., ACC-001"
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feed-frequency" className="text-[#001f3f]">Sync Frequency</Label>
              <select
                id="feed-frequency"
                value={feedFormData.frequency || 'Every 4 hours'}
                onChange={(e) => setFeedFormData({...feedFormData, frequency: e.target.value})}
                className="border-2 border-[#001f3f] rounded-[2px] p-2 text-[#001f3f]"
              >
                <option value="Every 2 hours">Every 2 hours</option>
                <option value="Every 4 hours">Every 4 hours</option>
                <option value="Every 6 hours">Every 6 hours</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditFeedOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveFeed}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddFeedOpen} onOpenChange={setIsAddFeedOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Add Bank Feed</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Connect a new bank feed for automatic transaction synchronization</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="add-feed-bank" className="text-[#001f3f]">Bank Name *</Label>
              <Input
                id="add-feed-bank"
                value={feedFormData.bank}
                onChange={(e) => setFeedFormData({...feedFormData, bank: e.target.value})}
                placeholder="e.g., Barclays Business"
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-feed-account" className="text-[#001f3f]">Account Number *</Label>
              <Input
                id="add-feed-account"
                value={feedFormData.account}
                onChange={(e) => setFeedFormData({...feedFormData, account: e.target.value})}
                placeholder="e.g., ****1234"
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-feed-accountId" className="text-[#001f3f]">Account ID *</Label>
              <Input
                id="add-feed-accountId"
                value={feedFormData.accountId}
                onChange={(e) => setFeedFormData({...feedFormData, accountId: e.target.value})}
                placeholder="e.g., ACC-001"
                className="border-2 border-[#001f3f]"
              />
              <p className="text-xs text-[#001f3f]">The account ID from your bank's API</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-feed-frequency" className="text-[#001f3f]">Sync Frequency</Label>
              <select
                id="add-feed-frequency"
                value={feedFormData.frequency}
                onChange={(e) => setFeedFormData({...feedFormData, frequency: e.target.value})}
                className="border-2 border-[#001f3f] rounded-[2px] p-2 text-[#001f3f]"
              >
                <option value="Every 2 hours">Every 2 hours</option>
                <option value="Every 4 hours">Every 4 hours</option>
                <option value="Every 6 hours">Every 6 hours</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddFeedOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAddFeed}>Add Bank Feed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Bank Account Details</DialogTitle>
            <DialogDescription className="text-[#001f3f]">View complete information for this bank account</DialogDescription>
          </DialogHeader>
          {selectedAccount && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-[#001f3f] font-semibold">Account Name</Label>
                <p className="text-sm text-[#001f3f]">{selectedAccount.name}</p>
              </div>
              <div className="grid gap-2">
                <Label className="text-[#001f3f] font-semibold">Bank</Label>
                <p className="text-sm text-[#001f3f]">{selectedAccount.bank}</p>
              </div>
              <div className="grid gap-2">
                <Label className="text-[#001f3f] font-semibold">Account Number</Label>
                <p className="text-sm text-[#001f3f]">{selectedAccount.accountNumber}</p>
              </div>
              <div className="grid gap-2">
                <Label className="text-[#001f3f] font-semibold">Balance</Label>
                <p className="text-xl font-bold text-[#001f3f]">£{selectedAccount.balance?.toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Type</Label>
                  <Badge className="mt-1 bg-blue-100 text-[#001f3f]">{selectedAccount.type}</Badge>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Status</Label>
                  <Badge className="mt-1 bg-green-100 text-green-800">{selectedAccount.status}</Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Edit Bank Account</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Update bank account information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name" className="text-[#001f3f]">Account Name</Label>
              <Input
                id="edit-name"
                value={editFormData.name || ''}
                onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-bank" className="text-[#001f3f]">Bank</Label>
              <Input
                id="edit-bank"
                value={editFormData.bank || ''}
                onChange={(e) => setEditFormData({...editFormData, bank: e.target.value})}
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-account-number" className="text-[#001f3f]">Account Number</Label>
              <Input
                id="edit-account-number"
                value={editFormData.accountNumber || ''}
                onChange={(e) => setEditFormData({...editFormData, accountNumber: e.target.value})}
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-balance" className="text-[#001f3f]">Balance</Label>
              <Input
                id="edit-balance"
                type="number"
                value={editFormData.balance || 0}
                onChange={(e) => setEditFormData({...editFormData, balance: parseFloat(e.target.value)})}
                className="border-2 border-[#001f3f]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Add Bank Account</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Add a new bank account to your bookkeeping system</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="add-name" className="text-[#001f3f]">Account Name</Label>
              <Input
                id="add-name"
                value={addFormData.name}
                onChange={(e) => setAddFormData({...addFormData, name: e.target.value})}
                placeholder="e.g., Business Current Account"
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-bank" className="text-[#001f3f]">Bank</Label>
              <Input
                id="add-bank"
                value={addFormData.bank}
                onChange={(e) => setAddFormData({...addFormData, bank: e.target.value})}
                placeholder="e.g., Barclays"
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-account-number" className="text-[#001f3f]">Account Number</Label>
              <Input
                id="add-account-number"
                value={addFormData.accountNumber}
                onChange={(e) => setAddFormData({...addFormData, accountNumber: e.target.value})}
                placeholder="e.g., ****1234"
                className="border-2 border-[#001f3f]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-balance" className="text-[#001f3f]">Initial Balance</Label>
              <Input
                id="add-balance"
                type="number"
                value={addFormData.balance}
                onChange={(e) => setAddFormData({...addFormData, balance: parseFloat(e.target.value)})}
                placeholder="0"
                className="border-2 border-[#001f3f]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAdd}>Add Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#001f3f]">Delete Bank Account</AlertDialogTitle>
            <AlertDialogDescription className="text-[#001f3f]">
              Are you sure you want to delete <strong>{selectedAccount?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Inventory KPI Drilldown Modal */}
      <Dialog open={isKPIDrilldownOpen} onOpenChange={setIsKPIDrilldownOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">{kpiDrilldownData?.title}</DialogTitle>
            <DialogDescription className="text-[#001f3f]">
              {kpiDrilldownData?.value} - Detailed Breakdown
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {kpiDrilldownData?.items?.map((item: any, idx: number) => (
              <Card key={idx} className="border-2 border-blue-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#001f3f]">{item.name}</p>
                      {item.quantity && <p className="text-sm text-[#001f3f]">Quantity: {item.quantity}</p>}
                      {item.current && <p className="text-sm text-[#001f3f]">Current: {item.current} / Reorder: {item.reorderLevel}</p>}
                    </div>
                    <div className="text-right">
                      {item.value && <p className="text-lg font-bold text-[#001f3f]">{item.value}</p>}
                      {item.status && <Badge variant={item.status === 'Critical' ? 'destructive' : 'outline'}>{item.status}</Badge>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {kpiDrilldownData?.description && (
              <p className="text-[#001f3f]">{kpiDrilldownData.description}</p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsKPIDrilldownOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock Item Detail Modal */}
      <Dialog open={isStockDetailOpen} onOpenChange={setIsStockDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">{selectedStockItem?.name}</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Stock Item Details</DialogDescription>
          </DialogHeader>
          {selectedStockItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">SKU</Label>
                  <p className="text-[#001f3f]">{selectedStockItem.sku}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Category</Label>
                  <p className="text-[#001f3f]">{selectedStockItem.category}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Quantity</Label>
                  <p className="text-2xl font-bold text-[#001f3f]">{selectedStockItem.quantity} units</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Cost</Label>
                  <p className="text-2xl font-bold text-[#001f3f]">£{selectedStockItem.cost?.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Reorder Level</Label>
                  <p className="text-[#001f3f]">{selectedStockItem.reorderLevel} units</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Status</Label>
                  <Badge variant={selectedStockItem.status === 'Critical' ? 'destructive' : 'outline'}>{selectedStockItem.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Warehouse</Label>
                  <p className="text-[#001f3f]">{selectedStockItem.warehouse}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Location</Label>
                  <p className="text-[#001f3f]">{selectedStockItem.location}</p>
                </div>
              </div>
              <div>
                <Label className="text-[#001f3f] font-semibold">Total Value</Label>
                <p className="text-xl font-bold text-[#001f3f]">£{(selectedStockItem.quantity * selectedStockItem.cost).toFixed(2)}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStockDetailOpen(false)}>Close</Button>
            <Button onClick={() => {
              setIsStockDetailOpen(false)
              setIsStockFormOpen(true)
            }}>Edit Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock Form Modal (Add/Edit) */}
      <Dialog open={isStockFormOpen} onOpenChange={setIsStockFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">{selectedStockItem ? 'Edit' : 'Add'} Stock Item</DialogTitle>
            <DialogDescription className="text-[#001f3f]">
              {selectedStockItem ? 'Update stock item details' : 'Add a new stock item to inventory'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f]">SKU</Label>
                <Input defaultValue={selectedStockItem?.sku || ''} className="border-2 border-[#001f3f]" />
              </div>
              <div>
                <Label className="text-[#001f3f]">Name</Label>
                <Input defaultValue={selectedStockItem?.name || ''} className="border-2 border-[#001f3f]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f]">Category</Label>
                <Input defaultValue={selectedStockItem?.category || ''} className="border-2 border-[#001f3f]" />
              </div>
              <div>
                <Label className="text-[#001f3f]">Quantity</Label>
                <Input type="number" defaultValue={selectedStockItem?.quantity || 0} className="border-2 border-[#001f3f]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f]">Cost (£)</Label>
                <Input type="number" step="0.01" defaultValue={selectedStockItem?.cost || 0} className="border-2 border-[#001f3f]" />
              </div>
              <div>
                <Label className="text-[#001f3f]">Reorder Level</Label>
                <Input type="number" defaultValue={selectedStockItem?.reorderLevel || 0} className="border-2 border-[#001f3f]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f]">Warehouse</Label>
                <Input defaultValue={selectedStockItem?.warehouse || ''} className="border-2 border-[#001f3f]" />
              </div>
              <div>
                <Label className="text-[#001f3f]">Location</Label>
                <Input defaultValue={selectedStockItem?.location || ''} className="border-2 border-[#001f3f]" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStockFormOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              setIsStockFormOpen(false)
              console.log('Stock item saved successfully!')
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Warehouse Detail Modal */}
      <Dialog open={isWarehouseDetailOpen} onOpenChange={setIsWarehouseDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">{selectedWarehouse?.name}</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Warehouse Details</DialogDescription>
          </DialogHeader>
          {selectedWarehouse && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Location</Label>
                  <p className="text-[#001f3f]">{selectedWarehouse.location}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Manager</Label>
                  <p className="text-[#001f3f]">{selectedWarehouse.manager}</p>
                </div>
              </div>
              <div>
                <Label className="text-[#001f3f] font-semibold">Contact</Label>
                <p className="text-[#001f3f]">{selectedWarehouse.contact}</p>
              </div>
              <div>
                <Label className="text-[#001f3f] font-semibold">Capacity</Label>
                <p className="text-[#001f3f]">{selectedWarehouse.used} / {selectedWarehouse.capacity} sqft</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div 
                    className="bg-blue-600 h-3 rounded-full" 
                    style={{width: `${(selectedWarehouse.used/selectedWarehouse.capacity)*100}%`}}
                  ></div>
                </div>
                <p className="text-sm text-[#001f3f] mt-1">
                  {((selectedWarehouse.used/selectedWarehouse.capacity)*100).toFixed(1)}% Utilized
                </p>
              </div>
              <div>
                <Label className="text-[#001f3f] font-semibold">Status</Label>
                <Badge variant="default">{selectedWarehouse.status}</Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWarehouseDetailOpen(false)}>Close</Button>
            <Button>Manage Warehouse</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjustment Detail Modal */}
      <Dialog open={isAdjustmentDetailOpen} onOpenChange={setIsAdjustmentDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Stock Adjustment Details</DialogTitle>
            <DialogDescription className="text-[#001f3f]">{selectedAdjustment?.productName}</DialogDescription>
          </DialogHeader>
          {selectedAdjustment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Date</Label>
                  <p className="text-[#001f3f]">{selectedAdjustment.date}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">SKU</Label>
                  <p className="text-[#001f3f]">{selectedAdjustment.sku}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Type</Label>
                  <Badge variant={selectedAdjustment.type === 'Increase' ? 'default' : 'destructive'}>{selectedAdjustment.type}</Badge>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Quantity</Label>
                  <p className="text-2xl font-bold text-[#001f3f]">{selectedAdjustment.quantity} units</p>
                </div>
              </div>
              <div>
                <Label className="text-[#001f3f] font-semibold">Reason</Label>
                <p className="text-[#001f3f]">{selectedAdjustment.reason}</p>
              </div>
              <div>
                <Label className="text-[#001f3f] font-semibold">Notes</Label>
                <p className="text-[#001f3f]">{selectedAdjustment.notes}</p>
              </div>
              <div>
                <Label className="text-[#001f3f] font-semibold">Adjusted By</Label>
                <p className="text-[#001f3f]">{selectedAdjustment.adjustedBy}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsAdjustmentDetailOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reorder Alert Modal */}
      <Dialog open={isReorderDetailOpen} onOpenChange={setIsReorderDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Reorder Alert</DialogTitle>
            <DialogDescription className="text-[#001f3f]">{selectedReorderAlert?.productName}</DialogDescription>
          </DialogHeader>
          {selectedReorderAlert && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">SKU</Label>
                  <p className="text-[#001f3f]">{selectedReorderAlert.sku}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Priority</Label>
                  <Badge variant={selectedReorderAlert.priority === 'Critical' ? 'destructive' : 'default'}>{selectedReorderAlert.priority}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Current Stock</Label>
                  <p className="text-2xl font-bold text-red-600">{selectedReorderAlert.currentStock} units</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Reorder Level</Label>
                  <p className="text-2xl font-bold text-[#001f3f]">{selectedReorderAlert.reorderLevel} units</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Suggested Order</Label>
                  <p className="text-xl font-bold text-green-600">{selectedReorderAlert.suggestedOrder} units</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Estimated Cost</Label>
                  <p className="text-xl font-bold text-[#001f3f]">£{selectedReorderAlert.estimatedCost?.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Supplier</Label>
                  <p className="text-[#001f3f]">{selectedReorderAlert.supplier}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Lead Time</Label>
                  <p className="text-[#001f3f]">{selectedReorderAlert.leadTime}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReorderDetailOpen(false)}>Close</Button>
            <Button onClick={() => {
              setIsReorderDetailOpen(false)
              console.log(`Purchase Order PO-${Date.now()} created for ${selectedReorderAlert?.productName}`)
            }}>Create Purchase Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock Take Detail Modal */}
      <Dialog open={isStockTakeDetailOpen} onOpenChange={setIsStockTakeDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Stock Take Details</DialogTitle>
            <DialogDescription className="text-[#001f3f]">{selectedStockTake?.warehouse}</DialogDescription>
          </DialogHeader>
          {selectedStockTake && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Date</Label>
                  <p className="text-[#001f3f]">{selectedStockTake.date}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Status</Label>
                  <Badge variant={selectedStockTake.status === 'Completed' ? 'default' : 'outline'}>{selectedStockTake.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Items Checked</Label>
                  <p className="text-2xl font-bold text-[#001f3f]">{selectedStockTake.itemsChecked}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f] font-semibold">Discrepancies</Label>
                  <p className="text-2xl font-bold text-orange-600">{selectedStockTake.discrepancies}</p>
                </div>
              </div>
              <div>
                <Label className="text-[#001f3f] font-semibold">Variance</Label>
                <p className={`text-xl font-bold ${selectedStockTake.variance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  £{Math.abs(selectedStockTake.variance).toFixed(2)}
                </p>
              </div>
              <div>
                <Label className="text-[#001f3f] font-semibold">Performed By</Label>
                <p className="text-[#001f3f]">{selectedStockTake.performedBy}</p>
              </div>
              {selectedStockTake.completedDate && (
                <div>
                  <Label className="text-[#001f3f] font-semibold">Completed Date</Label>
                  <p className="text-[#001f3f]">{selectedStockTake.completedDate}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsStockTakeDetailOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock Take Form Modal */}
      <Dialog open={isStockTakeFormOpen} onOpenChange={setIsStockTakeFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Record Stock Take</DialogTitle>
            <DialogDescription className="text-[#001f3f]">Record a new physical stock count</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-[#001f3f]">Warehouse</Label>
              <Input placeholder="Enter warehouse name" className="border-2 border-[#001f3f]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f]">Items Checked</Label>
                <Input type="number" placeholder="0" className="border-2 border-[#001f3f]" />
              </div>
              <div>
                <Label className="text-[#001f3f]">Discrepancies Found</Label>
                <Input type="number" placeholder="0" className="border-2 border-[#001f3f]" />
              </div>
            </div>
            <div>
              <Label className="text-[#001f3f]">Notes</Label>
              <Input placeholder="Any observations or notes..." className="border-2 border-[#001f3f]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStockTakeFormOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              setIsStockTakeFormOpen(false)
              console.log('Stock take recorded successfully!')
            }}>Save Stock Take</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ResponsiveLayout>
  )
}
