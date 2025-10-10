import { useState } from 'react'
import { 
  Building2,
  FileText,
  Calculator,
  Upload,
  Eye,
  BarChart3,
  Plus,
  Send,
  FileSpreadsheet,
  CheckCircle,
  ChevronDown,
  Settings,
  FileCheck,
  Edit,
  Trash2,
  Download,
  TrendingUp,
  Globe,
  Save,
  Search,
  Filter,
  Clock,
  Users,
  Shield,
  Tag,
  Archive,
  AlertCircle,
  Layers,
  BookOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AIPromptSection from '../../components/AIPromptSection'
import KPICard from '../../components/KPICard'
import { ExportButton } from '@/components/ExportButton'
import ResponsiveLayout from '@/components/ResponsiveLayout'

// Interfaces
interface Client {
  id: string
  name: string
  type: 'sole-trader' | 'partnership' | 'limited-company' | 'llp' | 'charity' | 'cic'
  registrationNumber?: string
  yearEnd: string
  accountsStatus: 'not-started' | 'in-progress' | 'review' | 'completed' | 'filed'
  lastAccounts: string
  nextDue: string
  frsStandard: 'FRS 101' | 'FRS 102' | 'FRS 102 1A' | 'FRS 105' | 'IFRS'
  contactPerson: string
  email: string
  phone: string
}

interface TrialBalanceEntry {
  id: string
  clientId: string
  accountCode: string
  accountName: string
  debit: number
  credit: number
  category: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense'
  period: string
}

interface ChartOfAccount {
  id: string
  code: string
  name: string
  category: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense'
  subcategory: string
  isFavourite: boolean
  isActive: boolean
}

interface PostingBatch {
  id: string
  clientId: string
  name: string
  type: 'opening-balance' | 'adjusting-journal' | 'year-end' | 'trial-balance'
  date: string
  status: 'draft' | 'posted' | 'approved'
  totalDebit: number
  totalCredit: number
  entries: number
}

interface Adjustment {
  id: string
  clientId: string
  type: 'prepayment' | 'accrual' | 'depreciation' | 'provision' | 'reclassification'
  description: string
  amount: number
  date: string
  accountCode: string
  status: 'draft' | 'approved' | 'posted'
  reference: string
}

interface FinancialStatement {
  id: string
  clientId: string
  type: 'balance-sheet' | 'profit-loss' | 'cash-flow' | 'notes' | 'directors-report'
  period: string
  generatedDate: string
  status: 'draft' | 'review' | 'finalized' | 'filed'
  frsStandard: string
  version: number
}

interface iXBRLTag {
  id: string
  statementId: string
  element: string
  value: number
  context: string
  taxonomy: string
  status: 'tagged' | 'validated' | 'error'
}

interface FilingSubmission {
  id: string
  clientId: string
  type: 'companies-house' | 'hmrc'
  submissionDate: string
  status: 'pending' | 'submitted' | 'accepted' | 'rejected'
  reference: string
  confirmationNumber?: string
}

export default function AccountsProduction() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isAILoading, setIsAILoading] = useState(false)
  
  // Search and filter states
  const [clientSearchName, setClientSearchName] = useState('')
  const [clientSearchType, setClientSearchType] = useState('')
  const [clientSearchStatus, setClientSearchStatus] = useState('')
  const [tbSearchCode, setTbSearchCode] = useState('')
  const [tbSearchName, setTbSearchName] = useState('')
  const [tbSearchCategory, setTbSearchCategory] = useState('')
  const [adjSearchType, setAdjSearchType] = useState('')
  const [adjSearchStatus, setAdjSearchStatus] = useState('')
  
  // Sample data - Clients
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Acme Trading Ltd',
      type: 'limited-company',
      registrationNumber: '12345678',
      yearEnd: '2024-12-31',
      accountsStatus: 'in-progress',
      lastAccounts: '2023-12-31',
      nextDue: '2025-09-30',
      frsStandard: 'FRS 102',
      contactPerson: 'John Smith',
      email: 'john@acmetrading.com',
      phone: '020 7123 4567'
    },
    {
      id: '2',
      name: 'Green & Partners LLP',
      type: 'llp',
      registrationNumber: 'OC234567',
      yearEnd: '2024-03-31',
      accountsStatus: 'review',
      lastAccounts: '2024-03-31',
      nextDue: '2025-01-31',
      frsStandard: 'FRS 102',
      contactPerson: 'Sarah Green',
      email: 'sarah@greenpartners.com',
      phone: '020 7234 5678'
    },
    {
      id: '3',
      name: 'Smith & Co Solicitors',
      type: 'partnership',
      yearEnd: '2024-04-30',
      accountsStatus: 'not-started',
      lastAccounts: '2023-04-30',
      nextDue: '2025-01-31',
      frsStandard: 'FRS 102 1A',
      contactPerson: 'David Smith',
      email: 'david@smithco.com',
      phone: '020 7345 6789'
    },
    {
      id: '4',
      name: 'Tech Innovations Ltd',
      type: 'limited-company',
      registrationNumber: '87654321',
      yearEnd: '2024-06-30',
      accountsStatus: 'in-progress',
      lastAccounts: '2023-06-30',
      nextDue: '2025-04-30',
      frsStandard: 'FRS 102 1A',
      contactPerson: 'Emma Wilson',
      email: 'emma@techinnovations.com',
      phone: '020 7456 7890'
    },
    {
      id: '5',
      name: 'Community Care CIC',
      type: 'cic',
      registrationNumber: 'CE123456',
      yearEnd: '2024-03-31',
      accountsStatus: 'completed',
      lastAccounts: '2024-03-31',
      nextDue: '2025-01-31',
      frsStandard: 'FRS 105',
      contactPerson: 'Michael Brown',
      email: 'michael@communitycare.org',
      phone: '020 7567 8901'
    }
  ])
