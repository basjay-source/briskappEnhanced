import React, { useState } from 'react'
import { 
  Building, 
  FileText, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Edit,
  Plus,
  Search,
  Brain,
  ExternalLink,
  Settings,
  ChevronDown,
  ChevronRight,
  Database,
  Receipt,
  CreditCard,
  Shield,
  Calendar,
  TrendingUp,
  Info,
  AlertCircle,
  Landmark
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { useIsMobile } from '../../hooks/use-mobile'
import ResponsiveLayout from '../../components/ResponsiveLayout'
import CompaniesHouseLogo from '../../components/CompaniesHouseLogo'
import HMRCLogo from '../../components/HMRCLogo'
import AIPromptSection from '../../components/AIPromptSection'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'

export default function CompanySecretarial() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['forms', 'hmrc'])
  const [selectedCompany, setSelectedCompany] = useState('all')
  const [isAILoading, setIsAILoading] = useState(false)
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilingType, setSelectedFilingType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCompanyType, setSelectedCompanyType] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

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

  const filingTypeOptions = [
    { label: 'All Filing Types', value: 'all' },
    { label: 'Annual Returns', value: 'annual-returns' },
    { label: 'Confirmation Statements', value: 'confirmation-statements' },
    { label: 'Officer Changes', value: 'officer-changes' },
    { label: 'PSC Updates', value: 'psc-updates' },
    { label: 'Share Allotments', value: 'share-allotments' }
  ]

  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'Pending', value: 'pending' },
    { label: 'Submitted', value: 'submitted' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Rejected', value: 'rejected' }
  ]

  const companyTypeOptions = [
    { label: 'All Company Types', value: 'all' },
    { label: 'Private Limited', value: 'private-limited' },
    { label: 'Public Limited', value: 'public-limited' },
    { label: 'LLP', value: 'llp' },
    { label: 'Community Interest', value: 'cic' },
    { label: 'Charity', value: 'charity' }
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
    dashboard: { label: 'Dashboard', icon: Building, hasSubTabs: false },
    companies: { label: 'Company Management', icon: Database, hasSubTabs: false },
    forms: { 
      label: 'Forms & Filing', 
      icon: FileText, 
      hasSubTabs: true,
      subTabs: {
        confirmation: { label: 'Confirmation Statement', icon: CheckCircle },
        annual: { label: 'Annual Return', icon: FileText },
        officers: { label: 'Officer Changes', icon: Users },
        shares: { label: 'Share Allotments', icon: Receipt }
      }
    },
    psc: { label: 'PSC Register', icon: Users, hasSubTabs: false },
    hmrc: {
      label: 'HMRC Registration',
      icon: Shield,
      hasSubTabs: true,
      subTabs: {
        vat: { label: 'VAT Registration', icon: Receipt },
        paye: { label: 'PAYE Registration', icon: CreditCard },
        ct: { label: 'Corporation Tax', icon: Receipt }
      }
    },
    ai: { label: 'AI Company Secretary', icon: Brain, hasSubTabs: false }
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleMainTabClick = (tab: string) => {
    setActiveMainTab(tab)
    setActiveSubTab('')
    
    if (menuStructure[tab]?.hasSubTabs) {
      const firstSubTab = Object.keys(menuStructure[tab].subTabs || {})[0]
      if (firstSubTab) {
        setActiveSubTab(firstSubTab)
      }
    }
  }

  const handleSubTabClick = (subTab: string) => {
    setActiveSubTab(subTab)
  }

  const kpis = [
    {
      title: 'Active Companies',
      value: '24',
      change: '+2 this month',
      trend: 'up',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Filings',
      value: '8',
      change: '3 due this week',
      trend: 'neutral',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      title: 'Compliance Score',
      value: '94%',
      change: '+2% this quarter',
      trend: 'up',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      title: 'PSC Updates',
      value: '12',
      change: '5 require action',
      trend: 'down',
      icon: Users,
      color: 'text-purple-600'
    }
  ]

  const companies = [
    { id: '1', name: 'TechCorp Ltd', number: '12345678', status: 'Active', incorporationDate: '2020-01-15', nextFiling: '2024-03-31', filingType: 'Confirmation Statement', pscCount: 2, lastUpdate: '2024-01-15' },
    { id: '2', name: 'Digital Solutions Ltd', number: '87654321', status: 'Active', incorporationDate: '2019-06-20', nextFiling: '2024-04-15', filingType: 'Annual Return', pscCount: 1, lastUpdate: '2024-01-10' },
    { id: '3', name: 'Innovation Hub Ltd', number: '11223344', status: 'Dormant', incorporationDate: '2021-03-10', nextFiling: '2024-05-01', filingType: 'Dormant Filing', pscCount: 1, lastUpdate: '2024-01-05' },
    { id: '4', name: 'StartUp Ventures Ltd', number: '44332211', status: 'Active', incorporationDate: '2022-09-05', nextFiling: '2024-03-20', filingType: 'Confirmation Statement', pscCount: 3, lastUpdate: '2024-01-20' },
    { id: '5', name: 'Local Trading Ltd', number: '55667788', status: 'Active', incorporationDate: '2018-11-30', nextFiling: '2024-02-28', filingType: 'Overdue Filing', pscCount: 1, lastUpdate: '2023-12-15' }
  ]

  const filings = [
    { id: '1', company: 'TechCorp Ltd', type: 'CS01', status: 'In Progress', progress: 75, dueDate: '2024-03-31', assignee: 'Sarah Johnson' },
    { id: '2', company: 'Digital Solutions Ltd', type: 'AR01', status: 'Review', progress: 90, dueDate: '2024-04-15', assignee: 'Mike Chen' },
    { id: '3', company: 'Innovation Hub Ltd', type: 'DS01', status: 'Draft', progress: 25, dueDate: '2024-05-01', assignee: 'Emma Wilson' },
    { id: '4', company: 'StartUp Ventures Ltd', type: 'CS01', status: 'Submitted', progress: 100, dueDate: '2024-03-20', assignee: 'David Brown' },
    { id: '5', company: 'Local Trading Ltd', type: 'CS01', status: 'Overdue', progress: 60, dueDate: '2024-02-28', assignee: 'Lisa Garcia' }
  ]

  const pscRegister = [
    { id: '1', name: 'John Smith', type: 'Individual', status: 'Active', shares: '75%', voting: '75%', appointed: '2020-01-15', company: 'TechCorp Ltd' },
    { id: '2', name: 'Sarah Johnson', type: 'Individual', status: 'Active', shares: '60%', voting: '60%', appointed: '2019-06-20', company: 'Digital Solutions Ltd' },
    { id: '3', name: 'Innovation Holdings Ltd', type: 'Corporate', status: 'Active', shares: '100%', voting: '100%', appointed: '2021-03-10', company: 'Innovation Hub Ltd' },
    { id: '4', name: 'Mike Chen', type: 'Individual', status: 'Active', shares: '45%', voting: '45%', appointed: '2022-09-05', company: 'StartUp Ventures Ltd' },
    { id: '5', name: 'Emma Wilson', type: 'Individual', status: 'Ceased', shares: '0%', voting: '0%', appointed: '2018-11-30', company: 'Local Trading Ltd' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Submitted':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'In Progress':
      case 'Review':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'Draft':
        return <Edit className="h-4 w-4 text-gray-500" />
      case 'Overdue':
      case 'Ceased':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Dormant':
        return 'bg-brisk-primary-50 text-brisk-primary'
      case 'Dissolved':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderMainContent = () => {
    if (activeMainTab === 'dashboard') return renderDashboard()
    if (activeMainTab === 'companies') return renderCompanyManagement()
    if (activeMainTab === 'forms') {
      if (activeSubTab === 'confirmation') return renderConfirmationStatementForm()
      if (activeSubTab === 'annual') return renderAnnualReturnForm()
      if (activeSubTab === 'officers') return renderOfficerChangesForm()
      if (activeSubTab === 'shares') return renderShareAllotmentForm()
      return renderFormsOverview()
    }
    if (activeMainTab === 'psc') return renderPSCRegister()
    if (activeMainTab === 'hmrc') {
      if (activeSubTab === 'vat') return renderVATRegistrationForm()
      if (activeSubTab === 'paye') return renderPAYERegistrationForm()
      if (activeSubTab === 'ct') return renderCorporationTaxRegistration()
      return renderHMRCOverview()
    }
    if (activeMainTab === 'ai') return renderAICompanySecretary()
    return renderDashboard()
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Company Secretarial Dashboard</h1>
          <p className="text-gray-600">Manage company compliance and filings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Filing
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{kpi.change}</p>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Filings</CardTitle>
            <CardDescription>Latest company filing activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filings.slice(0, 3).map((filing) => (
                <div key={filing.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(filing.status)}
                    <div>
                      <p className="font-medium">{filing.company}</p>
                      <p className="text-sm text-gray-600">{filing.type} - {filing.status}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{filing.dueDate}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Alerts</CardTitle>
            <CardDescription>Important deadlines and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900">Overdue Filing</p>
                  <p className="text-sm text-red-700">Local Trading Ltd CS01 was due 2024-02-28</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-brisk-primary-50 border border-brisk-primary-200 rounded-lg">
                <Clock className="h-5 w-5 text-brisk-primary mt-0.5" />
                <div>
                  <p className="font-medium text-brisk-primary">Due Soon</p>
                  <p className="text-sm text-brisk-primary">TechCorp Ltd CS01 due in 14 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">New Guidance</p>
                  <p className="text-sm text-blue-700">Companies House updated PSC requirements</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderCompanyManagement = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Company Management</h2>
          <p className="text-gray-600">Manage company records and compliance status</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input placeholder="Search companies..." className="flex-1" />
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Company Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="dormant">Dormant</SelectItem>
                <SelectItem value="dissolved">Dissolved</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="space-y-4">
            {companies.map((company) => (
              <Card key={company.id} className="border-l-4 border-l-brisk-primary">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{company.name}</h3>
                        <Badge className={getStatusColor(company.status)}>
                          {company.status}
                        </Badge>
                        <Badge variant="outline">#{company.number}</Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                        <span>Next Filing: {company.nextFiling}</span>
                        <span>Type: {company.filingType}</span>
                        <span>PSCs: {company.pscCount}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Last updated: {company.lastUpdate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Companies House
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderFormsOverview = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Forms & Filing</h2>
            <p className="text-gray-600">Companies House forms and submissions</p>
          </div>
        </div>
        
        <SearchFilterHeader
          searchPlaceholder="Search companies, filings, officers..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Filing Type',
              options: filingTypeOptions,
              value: selectedFilingType,
              onChange: setSelectedFilingType
            },
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Company Type',
              options: companyTypeOptions,
              value: selectedCompanyType,
              onChange: setSelectedCompanyType
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(menuStructure.forms.subTabs || {}).map(([key, subTab]) => (
            <Card key={key} className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer" onClick={() => handleSubTabClick(key)}>
              <CardContent className="p-6 text-center">
                {key === 'cs01' || key === 'ar01' || key === 'ap01' || key === 'sh01' ? (
                  <CompaniesHouseLogo className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                ) : key === 'vat' || key === 'paye' ? (
                  <HMRCLogo className="h-8 w-8 text-green-500 mx-auto mb-2" />
                ) : (
                  <subTab.icon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                )}
                <h3 className="font-semibold mb-1">{subTab.label}</h3>
                <p className="text-sm text-gray-600">Generate and submit form</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const renderConfirmationStatementForm = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Confirmation Statement (CS01)</h2>
          <p className="text-gray-600">Annual confirmation of company details</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <Card className="border-2 border-[#003078] bg-blue-50/30">
        <CardHeader className="bg-[#003078] text-white">
          <CardTitle className="flex items-center gap-2">
            <CompaniesHouseLogo className="h-6 w-6" />
            Companies House - Confirmation Statement
          </CardTitle>
          <CardDescription className="text-blue-100">
            This form replicates the official Companies House CS01 form
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
              <p className="text-sm text-blue-800">
                You must file a confirmation statement at least once every 12 months. 
                The information in this statement must be correct as at the confirmation date.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company Name</label>
                <Input value="TechCorp Ltd" readOnly className="bg-gray-50 border-gray-300" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company Number</label>
                <Input value="12345678" readOnly className="bg-gray-50 border-gray-300" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirmation Date</label>
                <Input type="date" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Made up to Date</label>
                <Input type="date" className="border-gray-300" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Registered Office Address</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50" 
                rows={3} 
                readOnly
                value="123 Business Street, London, EC1A 1BB"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Standard Industrial Classification (SIC) Codes</label>
              <Input value="62012 - Business and domestic software development" readOnly className="bg-gray-50 border-gray-300" />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Statement of Capital and Shareholdings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Total Number of Shares</label>
                  <Input value="1000" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Aggregate Nominal Value</label>
                  <Input value="£1000" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Currency</label>
                  <Select>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="GBP" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gbp">GBP</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="usd">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Confirmation Checklist</h3>
              <div className="space-y-3">
                {[
                  'The registered office address shown is correct',
                  'The directors and company secretary details are up to date',
                  'The PSC (People with Significant Control) register is current',
                  'The share capital information is accurate',
                  'The SIC codes reflect the current business activities'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded border">
                    <input type="checkbox" id={`check-${index}`} className="mt-1 rounded border-gray-300" />
                    <label htmlFor={`check-${index}`} className="text-sm text-gray-700 flex-1">{item}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-brisk-primary-50 border border-brisk-primary-200 rounded">
              <h4 className="font-semibold text-brisk-primary mb-2">Filing Fee</h4>
              <p className="text-sm text-brisk-primary">
                The filing fee for this confirmation statement is £13 if filed online, or £40 if filed by post.
              </p>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button className="flex-1 bg-[#003078] hover:bg-[#003078]/90">
                <ExternalLink className="h-4 w-4 mr-2" />
                Submit to Companies House
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnnualReturnForm = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Annual Return (AR01)</h2>
          <p className="text-gray-600">Annual return for companies incorporated before 30 June 2016</p>
        </div>
        <Badge variant="outline" className="bg-brisk-primary-50 text-brisk-primary">Legacy Form</Badge>
      </div>

      <Card className="border-2 border-[#003078] bg-blue-50/30">
        <CardHeader className="bg-[#003078] text-white">
          <CardTitle className="flex items-center gap-2">
            <CompaniesHouseLogo className="h-6 w-6" />
            Annual Return (AR01)
          </CardTitle>
          <CardDescription className="text-blue-100">
            For companies incorporated before 30 June 2016
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <Info className="h-4 w-4 inline mr-2" />
                Most companies now file a Confirmation Statement (CS01) instead of an Annual Return.
                This form is only for companies incorporated before 30 June 2016.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Made up to date</label>
                <Input type="date" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Next due date</label>
                <Input type="date" className="border-gray-300" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderOfficerChangesForm = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Officer Changes</h2>
          <p className="text-gray-600">Appointment and resignation of directors and secretaries</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2 border-[#003078] hover:border-[#003078]/80 transition-colors cursor-pointer">
          <CardHeader className="bg-[#003078] text-white">
            <CardTitle className="flex items-center gap-2">
              <CompaniesHouseLogo className="h-5 w-5" />
              Appointment of Director (AP01)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Use this form to appoint a new director or company secretary
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded border">
                  <h4 className="font-medium text-green-900">Required Information:</h4>
                  <ul className="text-sm text-green-800 mt-2 space-y-1">
                    <li>• Full name and title</li>
                    <li>• Date of birth</li>
                    <li>• Nationality</li>
                    <li>• Usual residential address</li>
                    <li>• Service address</li>
                    <li>• Date of appointment</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full bg-[#003078] hover:bg-[#003078]/90">
                <Plus className="h-4 w-4 mr-2" />
                Start AP01 Form
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-[#003078] hover:border-[#003078]/80 transition-colors cursor-pointer">
          <CardHeader className="bg-[#003078] text-white">
            <CardTitle className="flex items-center gap-2">
              <CompaniesHouseLogo className="h-5 w-5" />
              Termination of Appointment (TM01)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Use this form to remove a director or company secretary
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded border">
                  <h4 className="font-medium text-red-900">Required Information:</h4>
                  <ul className="text-sm text-red-800 mt-2 space-y-1">
                    <li>• Full name of person being removed</li>
                    <li>• Date of cessation</li>
                    <li>• Reason for cessation</li>
                    <li>• Signature of remaining directors</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full bg-[#003078] hover:bg-[#003078]/90">
                <Plus className="h-4 w-4 mr-2" />
                Start TM01 Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderShareAllotmentForm = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Share Allotments (SH01)</h2>
          <p className="text-gray-600">Return of allotment of shares</p>
        </div>
      </div>

      <Card className="border-2 border-[#003078] bg-blue-50/30">
        <CardHeader className="bg-[#003078] text-white">
          <CardTitle className="flex items-center gap-2">
            <CompaniesHouseLogo className="h-6 w-6" />
            Share Allotment (SH01)
          </CardTitle>
          <CardDescription className="text-blue-100">
            Details of shares being allotted
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Number of shares allotted</label>
                <Input type="number" placeholder="1000" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nominal value per share</label>
                <Input placeholder="£1.00" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Class of shares</label>
                <Select>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ordinary">Ordinary</SelectItem>
                    <SelectItem value="preference">Preference</SelectItem>
                    <SelectItem value="redeemable">Redeemable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date of allotment</label>
                <Input type="date" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Amount paid per share</label>
                <Input placeholder="£1.00" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Amount unpaid per share</label>
                <Input placeholder="£0.00" className="border-gray-300" />
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 border border-[#003078] rounded">
              <h4 className="font-semibold text-[#003078] mb-2">Filing Requirements</h4>
              <p className="text-sm text-blue-800">
                This return must be delivered to Companies House within one month of the allotment.
                The filing fee is £15 if filed online, or £40 if filed by post.
              </p>
            </div>
            
            <div className="flex gap-4 pt-4 border-t">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button className="flex-1 bg-[#003078] hover:bg-[#003078]/90">
                <ExternalLink className="h-4 w-4 mr-2" />
                Submit to Companies House
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPSCRegister = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">PSC Register Management</h2>
          <p className="text-gray-600">Persons with Significant Control register</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add PSC
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {pscRegister.map((psc) => (
              <Card key={psc.id} className="border">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{psc.name}</h3>
                        <Badge variant="outline">{psc.type}</Badge>
                        {getStatusIcon(psc.status)}
                        <span className="text-sm font-medium">{psc.status}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
                        <span>Shares: {psc.shares}</span>
                        <span>Voting: {psc.voting}</span>
                        <span>Appointed: {psc.appointed}</span>
                      </div>
                      <p className="text-sm text-gray-600">Company: {psc.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Update
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderHMRCOverview = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">HMRC Registration</h2>
          <p className="text-gray-600">VAT, PAYE and Corporation Tax registration</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(menuStructure.hmrc.subTabs || {}).map(([key, subTab]) => (
          <Card key={key} className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer" onClick={() => handleSubTabClick(key)}>
            <CardContent className="p-6 text-center">
              {key === 'cs01' || key === 'ar01' || key === 'ap01' || key === 'sh01' ? (
                <CompaniesHouseLogo className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              ) : key === 'vat' || key === 'paye' ? (
                <HMRCLogo className="h-8 w-8 text-green-500 mx-auto mb-2" />
              ) : (
                <subTab.icon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              )}
              <h3 className="font-semibold mb-1">{subTab.label}</h3>
              <p className="text-sm text-gray-600">Register with HMRC</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderVATRegistrationForm = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">VAT Registration (VAT1)</h2>
          <p className="text-gray-600">Register for Value Added Tax</p>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800">Estimated time: 30 minutes</Badge>
      </div>

      <Card className="border-2 border-[#00703c] bg-green-50/30">
        <CardHeader className="bg-[#00703c] text-white">
          <CardTitle className="flex items-center gap-2">
            <HMRCLogo className="h-6 w-6" />
            HM Revenue and Customs - VAT Registration
          </CardTitle>
          <CardDescription className="text-green-100">
            Application to register for Value Added Tax (VAT1)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">Mandatory Registration</h3>
                <p className="text-sm text-blue-800">
                  You must register if your taxable turnover exceeds £85,000 in any 12-month period
                </p>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
                <h3 className="font-semibold text-green-900 mb-2">Voluntary Registration</h3>
                <p className="text-sm text-green-800">
                  You can register voluntarily if you expect to make taxable supplies
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Expected annual turnover</label>
                  <Input placeholder="£0" className="border-gray-300" />
                  <p className="text-xs text-gray-500">Enter your expected taxable turnover for the next 12 months</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date business started trading</label>
                  <Input type="date" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Main business activity</label>
                  <Select>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">VAT scheme</label>
                  <Select>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard VAT</SelectItem>
                      <SelectItem value="flat-rate">Flat Rate Scheme</SelectItem>
                      <SelectItem value="cash">Cash Accounting</SelectItem>
                      <SelectItem value="annual">Annual Accounting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Registration Reason</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="mandatory" name="reason" className="border-gray-300" />
                  <label htmlFor="mandatory" className="text-sm text-gray-700">Mandatory - turnover exceeded threshold</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="voluntary" name="reason" className="border-gray-300" />
                  <label htmlFor="voluntary" className="text-sm text-gray-700">Voluntary registration</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="distance" name="reason" className="border-gray-300" />
                  <label htmlFor="distance" className="text-sm text-gray-700">Distance selling</label>
                </div>
              </div>
            </div>

            <div className="p-4 bg-brisk-primary-50 border border-brisk-primary-200 rounded">
              <h4 className="font-semibold text-brisk-primary mb-2">Important Notes</h4>
              <ul className="text-sm text-brisk-primary space-y-1">
                <li>• You must register within 30 days of exceeding the threshold</li>
                <li>• Late registration may result in penalties</li>
                <li>• You'll receive your VAT number within 2-3 weeks</li>
                <li>• First VAT return is due within 3 months of registration</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button className="flex-1 bg-[#00703c] hover:bg-[#00703c]/90">
                <ExternalLink className="h-4 w-4 mr-2" />
                Submit to HMRC
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPAYERegistrationForm = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">PAYE Registration</h2>
          <p className="text-gray-600">Register as an employer for PAYE</p>
        </div>
        <Badge variant="outline" className="bg-blue-100 text-blue-800">Estimated time: 20 minutes</Badge>
      </div>

      <Card className="border-2 border-[#00703c] bg-green-50/30">
        <CardHeader className="bg-[#00703c] text-white">
          <CardTitle className="flex items-center gap-2">
            <HMRCLogo className="h-6 w-6" />
            HM Revenue and Customs - PAYE Registration
          </CardTitle>
          <CardDescription className="text-green-100">
            Register as an employer for Pay As You Earn (PAYE)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="space-y-6">
            <div className="p-4 bg-brisk-primary-50 border-l-4 border-brisk-primary rounded">
              <h3 className="font-semibold text-brisk-primary mb-2">When You Must Register</h3>
              <p className="text-sm text-brisk-primary">
                You must register if you pay any employee £123 or more per week, or if you employ someone 
                who has another job or receives a pension.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Employer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First employee start date</label>
                  <Input type="date" className="border-gray-300" />
                  <p className="text-xs text-gray-500">Date when your first employee started or will start</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Number of employees</label>
                  <Input type="number" placeholder="1" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Payroll frequency</label>
                  <Select>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="fortnightly">Fortnightly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Workplace pension scheme</label>
                  <Select>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, already set up</SelectItem>
                      <SelectItem value="no">No, will set up later</SelectItem>
                      <SelectItem value="exempt">Exempt from auto-enrolment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Employee Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Highest paid employee salary</label>
                  <Input placeholder="£25,000" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Do any employees have other jobs?</label>
                  <Select>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="unknown">Don't know</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Payroll Software</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="hmrc-software" name="software" className="border-gray-300" />
                  <label htmlFor="hmrc-software" className="text-sm text-gray-700">HMRC Basic PAYE Tools (free)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="commercial-software" name="software" className="border-gray-300" />
                  <label htmlFor="commercial-software" className="text-sm text-gray-700">Commercial payroll software</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="accountant" name="software" className="border-gray-300" />
                  <label htmlFor="accountant" className="text-sm text-gray-700">Accountant or payroll agent</label>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">What Happens Next</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You'll receive your PAYE reference number within 5 working days</li>
                <li>• Set up payroll software or contact an agent</li>
                <li>• Register for workplace pension auto-enrolment if required</li>
                <li>• Submit your first Full Payment Submission (FPS) before paying employees</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button className="flex-1 bg-[#00703c] hover:bg-[#00703c]/90">
                <ExternalLink className="h-4 w-4 mr-2" />
                Submit to HMRC
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCorporationTaxRegistration = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Corporation Tax Registration</h2>
          <p className="text-gray-600">Register for Corporation Tax</p>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800">Automatic for new companies</Badge>
      </div>

      <Card className="border-2 border-[#00703c] bg-green-50/30">
        <CardHeader className="bg-[#00703c] text-white">
          <CardTitle className="flex items-center gap-2">
            <HMRCLogo className="h-6 w-6" />
            HM Revenue and Customs - Corporation Tax Registration
          </CardTitle>
          <CardDescription className="text-green-100">
            Automatic registration when you incorporate your company
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
              <h3 className="font-semibold text-green-900 mb-2">Automatic Registration</h3>
              <p className="text-sm text-green-800">
                When you register a company with Companies House, it's automatically registered for Corporation Tax. 
                You'll receive a Unique Taxpayer Reference (UTR) within 2-3 weeks of incorporation.
              </p>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <h3 className="font-semibold text-blue-900 mb-2">First Return Due</h3>
              <p className="text-sm text-blue-800">
                Your first Corporation Tax return is due 12 months after your accounting period ends, 
                or 3 months after you receive your UTR, whichever is later.
              </p>
            </div>
            <div className="p-4 bg-brisk-primary-50 border-l-4 border-brisk-primary rounded">
              <h3 className="font-semibold text-brisk-primary mb-2">Important Dates</h3>
              <ul className="text-sm text-brisk-primary space-y-1">
                <li>• Corporation Tax return: 12 months after accounting period ends</li>
                <li>• Corporation Tax payment: 9 months and 1 day after accounting period ends</li>
                <li>• Late filing penalty: £100 minimum (increases with delay)</li>
                <li>• Late payment interest: charged from the due date</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAICompanySecretary = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">AI Company Secretary</h2>
          <p className="text-gray-600">Intelligent compliance guidance and deadline management</p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Configure Alerts
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              Compliance Insights
            </CardTitle>
            <CardDescription>AI-powered analysis of your compliance status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-green-900">Overall Compliance: Excellent</h3>
              </div>
              <p className="text-sm text-green-700">94% of your companies are fully compliant with current filing requirements.</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-orange-500 mt-1" />
                <div>
                  <p className="font-medium text-orange-900">Action Required</p>
                  <p className="text-sm text-orange-700">1 company has an overdue filing that needs immediate attention</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium text-blue-900">Upcoming Deadlines</p>
                  <p className="text-sm text-blue-700">3 filings due within the next 30 days</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Info className="h-4 w-4 text-purple-500 mt-1" />
                <div>
                  <p className="font-medium text-purple-900">Optimization Opportunity</p>
                  <p className="text-sm text-purple-700">Consider consolidating filing schedules for better efficiency</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              Smart Deadline Management
            </CardTitle>
            <CardDescription>Proactive deadline tracking and reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">TechCorp Ltd - CS01</span>
                  <Badge variant="outline">14 days</Badge>
                </div>
                <p className="text-sm text-gray-600">Confirmation statement due March 31, 2024</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline">Remind in 7 days</Button>
                  <Button size="sm">Start Filing</Button>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Digital Solutions Ltd - AR01</span>
                  <Badge variant="outline">21 days</Badge>
                </div>
                <p className="text-sm text-gray-600">Annual return due April 15, 2024</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline">Set Reminder</Button>
                  <Button size="sm">Prepare Form</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-5 w-5 text-red-500" />
              Companies House Updates
            </CardTitle>
            <CardDescription>Latest regulatory changes and guidance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-blue-900">New Guidance</span>
                </div>
                <p className="text-sm text-blue-700">Updated PSC register requirements effective from April 2024</p>
                <Button size="sm" variant="outline" className="mt-2">Read More</Button>
              </div>
              
              <div className="p-3 bg-brisk-primary-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="h-4 w-4 text-brisk-primary" />
                  <span className="font-medium text-brisk-primary">Fee Changes</span>
                </div>
                <p className="text-sm text-brisk-primary">Companies House filing fees increased by 5% from March 2024</p>
                <Button size="sm" variant="outline" className="mt-2">View Details</Button>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-green-900">System Update</span>
                </div>
                <p className="text-sm text-green-700">WebFiling service improvements now live</p>
                <Button size="sm" variant="outline" className="mt-2">Learn More</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              Performance Analytics
            </CardTitle>
            <CardDescription>Track your compliance performance over time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">98%</p>
                <p className="text-sm text-green-700">On-time filings</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">2.3</p>
                <p className="text-sm text-blue-700">Avg days early</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Filing efficiency</span>
                <span>94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Full Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ask the AI Company Secretary</CardTitle>
          <CardDescription>Get instant answers to compliance questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Ask about deadlines, forms, or compliance requirements..." className="flex-1" />
              <Button>
                <Brain className="h-4 w-4 mr-2" />
                Ask AI
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-1">Recent Questions:</p>
                <div className="space-y-1">
                  <button className="text-sm text-blue-600 hover:underline block">When is my next CS01 due?</button>
                  <button className="text-sm text-blue-600 hover:underline block">How do I update PSC information?</button>
                  <button className="text-sm text-blue-600 hover:underline block">What are the new filing fee rates?</button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ResponsiveLayout>
      <div className="flex h-screen bg-gray-50">
        <div className={`${isMobile ? 'w-full' : 'w-64'} bg-white border-r border-gray-200 flex flex-col`}>
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Company Secretarial</h2>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {Object.entries(menuStructure).map(([key, config]) => (
                <div key={key}>
                  <button
                    onClick={() => config.hasSubTabs ? toggleCategory(key) : handleMainTabClick(key)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeMainTab === key
                        ? 'bg-brisk-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <config.icon className="h-4 w-4" />
                      <span>{config.label}</span>
                    </div>
                    {config.hasSubTabs && (
                      expandedCategories.includes(key) ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {config.hasSubTabs && expandedCategories.includes(key) && (
                    <div className="ml-6 mt-2 space-y-1">
                      {Object.entries(config.subTabs || {}).map(([subKey, subConfig]) => (
                        <button
                          key={subKey}
                          onClick={() => {
                            handleMainTabClick(key)
                            handleSubTabClick(subKey)
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                            activeMainTab === key && activeSubTab === subKey
                              ? 'bg-brisk-primary/10 text-brisk-primary'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <subConfig.icon className="h-4 w-4" />
                          <span>{subConfig.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderMainContent()}
          </div>
        </div>
        
        <AIPromptSection
          title="Ask your Company Secretary"
          description="Get instant guidance on company law, filings, and compliance"
          placeholder="Ask about company formations, annual returns, PSC registers, or compliance deadlines..."
          recentQuestions={[
            "What are the deadlines for confirmation statements?",
            "How do I register a new PSC?",
            "What forms are needed for a director resignation?",
            "How do we handle share allotment procedures?",
            "What are the latest Companies House filing requirements?"
          ]}
          onSubmit={handleAIQuestion}
          isLoading={isAILoading}
        />
      </div>
    </ResponsiveLayout>
  )
}
