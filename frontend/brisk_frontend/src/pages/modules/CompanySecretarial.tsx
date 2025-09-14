import React, { useState } from 'react'
import { 
  Building, 
  FileText, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Plus,
  Brain,
  Database,
  Receipt,
  Shield,
  Calendar,
  TrendingUp,
  Info,
  MapPin,
  XCircle,
  RotateCcw,
  Briefcase,
  User,
  Home,
  Globe,
  HardHat,
  Gift
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Progress } from '../../components/ui/progress'
import KPICard from '../../components/KPICard'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import CompaniesHouseLogo from '../../components/CompaniesHouseLogo'
import HMRCLogo from '../../components/HMRCLogo'
import AIPromptSection from '../../components/AIPromptSection'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'
import FormWizard from '../../components/FormWizard'

export default function CompanySecretarial() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCompanyType, setSelectedCompanyType] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [in01FormData, setIn01FormData] = useState<Record<string, string>>({})
  const [formData] = useState<Record<string, string>>({})

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
        incorporation: { label: 'Incorporation (IN01)', icon: FileText },
        accounts: { label: 'Accounts (AA01-AA06)', icon: Receipt },
        confirmation: { label: 'Confirmation Statement (CS01)', icon: CheckCircle },
        annual: { label: 'Annual Return (AR01)', icon: FileText },
        directors: { label: 'Director Changes (AP01-04)', icon: Users },
        secretaries: { label: 'Secretary Changes (CH01-04)', icon: Users },
        namechange: { label: 'Name Change (NM01-06)', icon: Edit },
        addresschange: { label: 'Address Change (AD01-05)', icon: MapPin },
        sharecapital: { label: 'Share Capital (SH01-19)', icon: Receipt },
        psc: { label: 'PSC Forms (PSC01-09)', icon: Users },
        dissolution: { label: 'Dissolution (DS01-02)', icon: XCircle },
        restoration: { label: 'Restoration (RT01)', icon: RotateCcw }
      }
    },
    psc: { label: 'PSC Register', icon: Users, hasSubTabs: false },
    hmrc: {
      label: 'HMRC Forms',
      icon: Shield,
      hasSubTabs: true,
      subTabs: {
        sa100: { label: 'Self Assessment (SA100)', icon: FileText },
        sa102: { label: 'SA Employment (SA102)', icon: Briefcase },
        sa103s: { label: 'SA Self Employment (SA103S)', icon: User },
        sa103f: { label: 'SA Self Employment Full (SA103F)', icon: User },
        sa104s: { label: 'SA Partnership Short (SA104S)', icon: Users },
        sa104f: { label: 'SA Partnership Full (SA104F)', icon: Users },
        sa105: { label: 'SA Property (SA105)', icon: Home },
        sa106: { label: 'SA Foreign (SA106)', icon: Globe },
        sa108: { label: 'SA Capital Gains (SA108)', icon: TrendingUp },
        sa109: { label: 'SA Residence (SA109)', icon: MapPin },
        ct600: { label: 'Corporation Tax (CT600)', icon: Receipt },
        ct41g: { label: 'CT Guidance (CT41G)', icon: FileText },
        p35: { label: 'End of Year Return (P35)', icon: Calendar },
        p11d: { label: 'Benefits & Expenses (P11D)', icon: Gift },
        p46: { label: 'Employee Starter Checklist (P46)', icon: User },
        cis300: { label: 'CIS Monthly Return (CIS300)', icon: HardHat },
        vat1: { label: 'VAT Registration (VAT1)', icon: Receipt },
        vat2: { label: 'VAT Group Registration (VAT2)', icon: Receipt }
      }
    },
    ai: { label: 'AI Company Secretary', icon: Brain, hasSubTabs: false }
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

  // Companies House Forms
  const renderIN01Form = () => {
    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting IN01 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving IN01 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Company Details - Enter proposed company name, type and registered office address",
        component: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Proposed company name</Label>
                <Input 
                  id="companyName" 
                  placeholder="Enter company name"
                  value={in01FormData.companyName || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, companyName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="companyType">Company type</Label>
                <Select value={in01FormData.companyType || ''} onValueChange={(value) => setIn01FormData({...in01FormData, companyType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private-limited">Private company limited by shares</SelectItem>
                    <SelectItem value="public-limited">Public limited company</SelectItem>
                    <SelectItem value="guarantee">Company limited by guarantee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="registeredOffice">Registered office address</Label>
              <Textarea 
                id="registeredOffice" 
                placeholder="Enter full registered office address"
                value={in01FormData.registeredOffice || ''}
                onChange={(e) => setIn01FormData({...in01FormData, registeredOffice: e.target.value})}
              />
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Share Capital - Enter share capital details, number of shares and nominal value",
        component: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shareCapital">Share capital</Label>
                <Input 
                  id="shareCapital" 
                  placeholder="£100"
                  value={in01FormData.shareCapital || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, shareCapital: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="shareClass">Share class</Label>
                <Select value={in01FormData.shareClass || ''} onValueChange={(value) => setIn01FormData({...in01FormData, shareClass: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select share class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ordinary">Ordinary shares</SelectItem>
                    <SelectItem value="preference">Preference shares</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numberOfShares">Number of shares</Label>
                <Input 
                  id="numberOfShares" 
                  placeholder="100"
                  value={in01FormData.numberOfShares || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, numberOfShares: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="nominalValue">Nominal value per share</Label>
                <Input 
                  id="nominalValue" 
                  placeholder="£1.00"
                  value={in01FormData.nominalValue || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, nominalValue: e.target.value})}
                />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Directors Information - Enter director personal details and service address",
        component: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="directorName">Director full name</Label>
                <Input 
                  id="directorName" 
                  placeholder="Enter director's full name"
                  value={in01FormData.directorName || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, directorName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="directorDOB">Date of birth</Label>
                <Input 
                  id="directorDOB" 
                  type="date"
                  value={in01FormData.directorDOB || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, directorDOB: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="directorAddress">Director's service address</Label>
              <Textarea 
                id="directorAddress" 
                placeholder="Enter director's service address"
                value={in01FormData.directorAddress || ''}
                onChange={(e) => setIn01FormData({...in01FormData, directorAddress: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="directorNationality">Nationality</Label>
                <Input 
                  id="directorNationality" 
                  placeholder="British"
                  value={in01FormData.directorNationality || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, directorNationality: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="directorOccupation">Occupation</Label>
                <Input 
                  id="directorOccupation" 
                  placeholder="Director"
                  value={in01FormData.directorOccupation || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, directorOccupation: e.target.value})}
                />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 4: Company Secretary - Enter company secretary details and service address",
        component: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="secretaryName">Secretary name</Label>
                <Input 
                  id="secretaryName" 
                  placeholder="Enter secretary's name"
                  value={in01FormData.secretaryName || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, secretaryName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="secretaryType">Secretary type</Label>
                <Select value={in01FormData.secretaryType || ''} onValueChange={(value) => setIn01FormData({...in01FormData, secretaryType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporate">Corporate body</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="secretaryAddress">Secretary's service address</Label>
              <Textarea 
                id="secretaryAddress" 
                placeholder="Enter secretary's service address"
                value={in01FormData.secretaryAddress || ''}
                onChange={(e) => setIn01FormData({...in01FormData, secretaryAddress: e.target.value})}
              />
            </div>
          </div>
        )
      },
      {
        title: "Step 5: Shareholders - Enter shareholder details and share allocation information",
        component: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shareholderName">Shareholder name</Label>
                <Input 
                  id="shareholderName" 
                  placeholder="Enter shareholder's name"
                  value={in01FormData.shareholderName || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, shareholderName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="shareholderShares">Number of shares</Label>
                <Input 
                  id="shareholderShares" 
                  placeholder="100"
                  value={in01FormData.shareholderShares || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, shareholderShares: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="shareholderAddress">Shareholder address</Label>
              <Textarea 
                id="shareholderAddress" 
                placeholder="Enter shareholder's address"
                value={in01FormData.shareholderAddress || ''}
                onChange={(e) => setIn01FormData({...in01FormData, shareholderAddress: e.target.value})}
              />
            </div>
          </div>
        )
      },
      {
        title: "Step 3: PSC Information - Enter People with Significant Control details and ownership percentages",
        component: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pscName">PSC name</Label>
                <Input 
                  id="pscName" 
                  placeholder="Enter PSC's name"
                  value={in01FormData.pscName || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, pscName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="pscDOB">Date of birth</Label>
                <Input 
                  id="pscDOB" 
                  type="date"
                  value={in01FormData.pscDOB || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, pscDOB: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pscAddress">PSC address</Label>
              <Textarea 
                id="pscAddress" 
                placeholder="Enter PSC's address"
                value={in01FormData.pscAddress || ''}
                onChange={(e) => setIn01FormData({...in01FormData, pscAddress: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="pscNature">Nature of control</Label>
              <Textarea 
                id="pscNature" 
                placeholder="Describe the nature of control"
                value={in01FormData.pscNature || ''}
                onChange={(e) => setIn01FormData({...in01FormData, pscNature: e.target.value})}
              />
            </div>
          </div>
        )
      },
      {
        title: "Step 7: Articles of Association - Choose standard model articles or upload custom articles of association",
        component: (
          <div className="space-y-4">
            <div>
              <Label htmlFor="articlesType">Articles type</Label>
              <Select value={in01FormData.articlesType || ''} onValueChange={(value) => setIn01FormData({...in01FormData, articlesType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select articles type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="model">Model articles</SelectItem>
                  <SelectItem value="bespoke">Bespoke articles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="articlesRestrictions">Share transfer restrictions</Label>
              <Textarea 
                id="articlesRestrictions" 
                placeholder="Enter any restrictions on share transfers"
                value={in01FormData.articlesRestrictions || ''}
                onChange={(e) => setIn01FormData({...in01FormData, articlesRestrictions: e.target.value})}
              />
            </div>
          </div>
        )
      },
      {
        title: "Step 8: Declaration & Submission - Review all information and submit your application to Companies House",
        component: (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Declaration</h4>
              <p className="text-sm text-gray-700">
                I confirm that the information provided in this application is true to the best of my knowledge and belief.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="declarantName">Declarant name</Label>
                <Input 
                  id="declarantName" 
                  placeholder="Enter your full name"
                  value={in01FormData.declarantName || ''}
                  onChange={(e) => setIn01FormData({...in01FormData, declarantName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="declarantCapacity">Capacity</Label>
                <Select value={in01FormData.declarantCapacity || ''} onValueChange={(value) => setIn01FormData({...in01FormData, declarantCapacity: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="director">Director</SelectItem>
                    <SelectItem value="secretary">Company Secretary</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <FormWizard
        title="Application to register a company (IN01)"
        pages={pages}
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
        formData={in01FormData}
        logoComponent={<CompaniesHouseLogo className="h-12 w-12" />}
      />
    )
  }

  const renderAA01Form = () => {
    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting AA01 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving AA01 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Company Details - Confirm your company information",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company number *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="12345678" maxLength={8} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter town/city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter county" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of incorporation</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select company type</option>
                    <option value="private-limited">Private company limited by shares</option>
                    <option value="public-limited">Public limited company</option>
                    <option value="private-guarantee">Private company limited by guarantee</option>
                    <option value="unlimited">Private unlimited company</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Company status</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Company is active and trading</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Company is dormant</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Company has ceased trading</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Accounts Period - Specify the accounting period for these accounts",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Accounting Period Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accounting period start date *</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accounting period end date *</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Length of accounting period (months)</label>
                  <input type="number" min="1" max="18" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type of accounts *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select accounts type</option>
                    <option value="full">Full accounts</option>
                    <option value="abbreviated">Abbreviated accounts</option>
                    <option value="micro">Micro-entity accounts</option>
                    <option value="dormant">Dormant company accounts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accounts preparation date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accounts approval date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Accounts characteristics</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>These are the company's first accounts</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Accounting period is longer than 12 months</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Accounting period is shorter than 12 months</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Company changed its accounting reference date</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for period length (if not 12 months)</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Explain why the accounting period is not 12 months"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Declaration and Submission - Review and submit your annual accounts",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration and Submission</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Annual accounts must be filed within 9 months of the accounting period end date</li>
                  <li>• Late filing penalties apply for overdue accounts</li>
                  <li>• Accounts must be approved by the board of directors before filing</li>
                  <li>• False information may result in prosecution</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Director approving accounts</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter director name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Director's signature date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company secretary (if applicable)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter secretary name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Auditor name (if applicable)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter auditor name" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Declaration</h4>
                <p className="text-sm text-gray-700 mb-4">
                  I confirm that the accounts comply with the requirements of the Companies Act 2006 and give a true and fair view of the company's affairs.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-sm">I confirm that I have read and understood the declaration above *</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">The accounts have been approved by the board of directors</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I am authorized to file these accounts on behalf of the company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">All required supporting documents are attached</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional information about these accounts"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#003078] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <CompaniesHouseLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Annual accounts (AA01)</h2>
              <p className="text-blue-100">File annual accounts with Companies House</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Annual accounts (AA01)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderAR01Form = () => {
    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting AR01 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving AR01 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Company Information - Confirm your company details for the annual return",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company number *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="12345678" maxLength={8} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual return made up to date *</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of incorporation</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Principal business activity *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter SIC code or description" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SIC code</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="12345" maxLength={5} />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Company type</label>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select company type</option>
                  <option value="private-limited">Private company limited by shares</option>
                  <option value="public-limited">Public limited company</option>
                  <option value="private-guarantee">Private company limited by guarantee</option>
                  <option value="unlimited">Private unlimited company</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description of principal business activity</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Describe your company's main business activity"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Registered Office - Confirm the registered office address",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Registered Office Address</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Important</h4>
                <p className="text-sm text-blue-700">
                  The registered office address is where official documents will be sent. 
                  This must be a physical address in the same country as your company registration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter town/city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter county" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select country</option>
                    <option value="england">England</option>
                    <option value="wales">Wales</option>
                    <option value="scotland">Scotland</option>
                    <option value="northern-ireland">Northern Ireland</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of change (if address changed)</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Address status</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="addressStatus" className="mr-2" />
                    <span>Address has not changed since last annual return</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="addressStatus" className="mr-2" />
                    <span>Address has changed since last annual return</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="addressStatus" className="mr-2" />
                    <span>This is the company's first annual return</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Share Capital - Provide details of the company's share capital",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Capital Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total number of shares *</label>
                  <input type="number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total aggregate nominal value *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="£100" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="GBP">GBP - British Pound</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Share class</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ordinary" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Share capital changes</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Share capital has increased since last annual return</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Share capital has decreased since last annual return</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>New share classes have been created</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Share classes have been cancelled</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Details of share capital changes</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Provide details of any changes to share capital"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 4: Declaration and Submission - Review and submit your annual return",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration and Submission</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Annual returns must be filed within 28 days of the made up to date</li>
                  <li>• Late filing penalties apply for overdue returns</li>
                  <li>• The information provided must be accurate as of the made up to date</li>
                  <li>• False information may result in prosecution</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person authorizing filing</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position in company</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select position</option>
                    <option value="director">Director</option>
                    <option value="secretary">Company Secretary</option>
                    <option value="agent">Agent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of authorization</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="01234 567890" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Declaration</h4>
                <p className="text-sm text-gray-700 mb-4">
                  I confirm that the information given in this annual return is true to the best of my knowledge and belief.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-sm">I confirm that I have read and understood the declaration above *</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I am authorized to file this annual return on behalf of the company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">All information is accurate as of the made up to date</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I understand the penalties for providing false information</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional information about this annual return"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#003078] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <CompaniesHouseLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Annual return (AR01)</h2>
              <p className="text-blue-100">File annual return with Companies House</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Annual return (AR01)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderTM01Form = () => {
    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting TM01 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving TM01 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Company Information - Confirm your company details",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company number *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="12345678" maxLength={8} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter town/city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter county" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of incorporation</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select company type</option>
                    <option value="private-limited">Private company limited by shares</option>
                    <option value="public-limited">Public limited company</option>
                    <option value="private-guarantee">Private company limited by guarantee</option>
                    <option value="unlimited">Private unlimited company</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Person Details - Provide details of the person whose appointment is being terminated",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Person Being Terminated</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Important</h4>
                <p className="text-sm text-blue-700">
                  Provide the full details of the director or company secretary whose appointment is being terminated.
                  All information must match the details currently held at Companies House.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position being terminated *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select position</option>
                    <option value="director">Director</option>
                    <option value="secretary">Company Secretary</option>
                    <option value="both">Director and Company Secretary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of termination *</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select title</option>
                    <option value="mr">Mr</option>
                    <option value="mrs">Mrs</option>
                    <option value="miss">Miss</option>
                    <option value="ms">Ms</option>
                    <option value="dr">Dr</option>
                    <option value="prof">Prof</option>
                    <option value="sir">Sir</option>
                    <option value="lady">Lady</option>
                    <option value="lord">Lord</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter first name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle names</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter middle names" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter last name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Former names</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter any former names" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of birth</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter nationality" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter occupation" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Termination Details - Specify the reason and circumstances of termination",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Termination Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for termination *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select reason</option>
                    <option value="resignation">Resignation</option>
                    <option value="removal">Removal by company</option>
                    <option value="removal-shareholders">Removal by shareholders</option>
                    <option value="death">Death</option>
                    <option value="disqualification">Disqualification</option>
                    <option value="retirement">Retirement</option>
                    <option value="end-of-term">End of term of office</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date appointment started</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Termination circumstances</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Voluntary resignation</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Resignation due to disagreement</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Removal by board resolution</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Removal by shareholder resolution</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Failed to be re-elected</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Disqualified by court order</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Deceased</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional details (if other reason selected)</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Provide additional details about the termination"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notice period (if applicable)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 3 months" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effective date of notice</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 4: Declaration and Submission - Review and submit the termination form",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration and Submission</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Termination forms must be filed within 14 days of the termination date</li>
                  <li>• Late filing penalties may apply for overdue notifications</li>
                  <li>• The information provided must be accurate and complete</li>
                  <li>• False information may result in prosecution</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person authorizing filing</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position in company</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select position</option>
                    <option value="director">Director</option>
                    <option value="secretary">Company Secretary</option>
                    <option value="agent">Agent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of authorization</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="01234 567890" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Declaration</h4>
                <p className="text-sm text-gray-700 mb-4">
                  I confirm that the information given in this termination form is true to the best of my knowledge and belief.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-sm">I confirm that I have read and understood the declaration above *</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I am authorized to file this termination on behalf of the company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">The termination has been properly authorized by the company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">All required procedures have been followed</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional information about this termination"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#003078] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <CompaniesHouseLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Termination of appointment (TM01)</h2>
              <p className="text-blue-100">Terminate appointment of director or secretary</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Termination of appointment (TM01)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderCH01Form = () => {
    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting CH01 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving CH01 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Company Information - Confirm your company details",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company number *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="12345678" maxLength={8} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter town/city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter county" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of incorporation</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select company type</option>
                    <option value="private-limited">Private company limited by shares</option>
                    <option value="public-limited">Public limited company</option>
                    <option value="private-guarantee">Private company limited by guarantee</option>
                    <option value="unlimited">Private unlimited company</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Secretary Type - Specify whether the secretary is an individual or corporate entity",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Secretary Type Selection</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Important</h4>
                <p className="text-sm text-blue-700">
                  A company secretary can be either an individual person or a corporate entity (another company).
                  Choose the appropriate type and provide the required information.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secretary type *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select secretary type</option>
                    <option value="individual">Individual person</option>
                    <option value="corporate">Corporate entity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of appointment *</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Appointment details</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This is a new appointment</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This is a replacement appointment</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This person/entity is also being appointed as a director</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This appointment requires shareholder approval</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for appointment</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select reason</option>
                    <option value="new-company">New company formation</option>
                    <option value="replacement">Replacement of previous secretary</option>
                    <option value="additional">Additional secretary appointment</option>
                    <option value="reappointment">Reappointment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous secretary (if replacement)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter previous secretary name" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional information about this appointment"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Secretary Details - Provide complete details of the secretary being appointed",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Secretary Personal/Corporate Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (if individual)</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select title</option>
                    <option value="mr">Mr</option>
                    <option value="mrs">Mrs</option>
                    <option value="miss">Miss</option>
                    <option value="ms">Ms</option>
                    <option value="dr">Dr</option>
                    <option value="prof">Prof</option>
                    <option value="sir">Sir</option>
                    <option value="lady">Lady</option>
                    <option value="lord">Lord</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First name / Company name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter first name or company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle names</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter middle names" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last name / Company registration number</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter last name or registration number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Former names (if individual)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter any former names" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of birth (if individual)</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality (if individual)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter nationality" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Occupation (if individual)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter occupation" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country of incorporation (if corporate)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter country" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Secretary qualifications (if applicable)</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Qualified lawyer</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Qualified accountant</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Company secretary qualification</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Professional company secretary service</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Other professional qualification</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 4: Service Address - Provide the service address for correspondence",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Address Details</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Service Address Information</h4>
                <p className="text-sm text-blue-700">
                  The service address is where correspondence will be sent. This can be the same as the residential address
                  or a different business address. For corporate secretaries, this should be the registered office address.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter town/city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter county" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select country</option>
                    <option value="england">England</option>
                    <option value="wales">Wales</option>
                    <option value="scotland">Scotland</option>
                    <option value="northern-ireland">Northern Ireland</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="01234 567890" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="secretary@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred contact method</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select method</option>
                    <option value="post">Post</option>
                    <option value="email">Email</option>
                    <option value="telephone">Telephone</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Address options</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Service address is the same as residential address</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Service address is the same as company registered office</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This is a business address</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Address is provided by professional service provider</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 5: Declaration and Submission - Review and submit the secretary appointment",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration and Submission</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Secretary appointments must be filed within 14 days of the appointment date</li>
                  <li>• Late filing penalties may apply for overdue notifications</li>
                  <li>• The information provided must be accurate and complete</li>
                  <li>• False information may result in prosecution</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person authorizing filing</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position in company</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select position</option>
                    <option value="director">Director</option>
                    <option value="secretary">Company Secretary</option>
                    <option value="agent">Agent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of authorization</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="01234 567890" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Declaration</h4>
                <p className="text-sm text-gray-700 mb-4">
                  I confirm that the information given in this appointment form is true to the best of my knowledge and belief.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-sm">I confirm that I have read and understood the declaration above *</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I am authorized to file this appointment on behalf of the company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">The appointment has been properly authorized by the company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">The secretary has consented to the appointment</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">All required procedures have been followed</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional information about this appointment"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#003078] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <CompaniesHouseLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Appointment of secretary (CH01)</h2>
              <p className="text-blue-100">Appoint a new company secretary</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Appointment of secretary (CH01)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderPSC01Form = () => {
    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting PSC01 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving PSC01 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Company Information - Confirm your company details",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company number *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="12345678" maxLength={8} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter town/city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter county" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of incorporation</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select company type</option>
                    <option value="private-limited">Private company limited by shares</option>
                    <option value="public-limited">Public limited company</option>
                    <option value="private-guarantee">Private company limited by guarantee</option>
                    <option value="unlimited">Private unlimited company</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: PSC Type - Specify the type of person with significant control",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">PSC Type Selection</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Important</h4>
                <p className="text-sm text-blue-700">
                  A person with significant control (PSC) can be an individual, corporate entity, or legal entity.
                  Choose the appropriate type based on the nature of the controlling party.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PSC type *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select PSC type</option>
                    <option value="individual">Individual person</option>
                    <option value="corporate">Corporate entity</option>
                    <option value="legal">Legal entity</option>
                    <option value="government">Government or government department</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date became PSC *</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Nature of control (select all that apply)</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Holds more than 25% of shares</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Holds more than 25% of voting rights</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Has right to appoint or remove majority of directors</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Has significant influence or control</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Has right to exercise significant influence or control over trust</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Has right to exercise significant influence or control over firm</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notification type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select notification type</option>
                    <option value="new">New PSC notification</option>
                    <option value="change">Change to existing PSC</option>
                    <option value="cessation">PSC ceased to be PSC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of change (if applicable)</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional information about this PSC notification"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: PSC Details - Provide complete details of the person with significant control",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">PSC Personal/Corporate Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (if individual)</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select title</option>
                    <option value="mr">Mr</option>
                    <option value="mrs">Mrs</option>
                    <option value="miss">Miss</option>
                    <option value="ms">Ms</option>
                    <option value="dr">Dr</option>
                    <option value="prof">Prof</option>
                    <option value="sir">Sir</option>
                    <option value="lady">Lady</option>
                    <option value="lord">Lord</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First name / Entity name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter first name or entity name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle names</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter middle names" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last name / Registration number</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter last name or registration number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Former names (if individual)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter any former names" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of birth (if individual)</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality (if individual)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter nationality" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country of residence (if individual)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter country" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country of incorporation (if entity)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter country" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Legal form (if entity)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Limited company, Partnership" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Governing law (if entity)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter governing law" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">PSC status</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Individual PSC</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Corporate entity PSC</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Legal entity PSC</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Super-secure PSC</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 4: Control Details - Specify the exact nature and extent of control",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nature and Extent of Control</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Control Thresholds</h4>
                <p className="text-sm text-blue-700">
                  Specify the exact percentages and nature of control. PSC thresholds are typically 25%, 50%, and 75%.
                  Provide accurate information about shareholdings, voting rights, and other forms of control.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shares held (%) *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select percentage range</option>
                    <option value="25-50">More than 25% but not more than 50%</option>
                    <option value="50-75">More than 50% but not more than 75%</option>
                    <option value="75-100">More than 75%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voting rights (%) *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select percentage range</option>
                    <option value="25-50">More than 25% but not more than 50%</option>
                    <option value="50-75">More than 50% but not more than 75%</option>
                    <option value="75-100">More than 75%</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exact number of shares held</label>
                  <input type="number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter number of shares" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total number of shares in issue</label>
                  <input type="number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter total shares" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Types of control exercised</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Ownership of shares (directly or indirectly)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Voting rights (directly or indirectly)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Right to appoint or remove directors</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Significant influence or control</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Control over trust or firm</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class of shares</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Ordinary, Preference" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency of shares</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select currency</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description of control</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Provide detailed description of how control is exercised"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 5: Service Address - Provide the service address for correspondence",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Address Details</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Service Address Information</h4>
                <p className="text-sm text-blue-700">
                  The service address is where correspondence will be sent. This can be the same as the residential address
                  or a different business address. For corporate PSCs, this should be the registered office address.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter town/city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter county" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select country</option>
                    <option value="england">England</option>
                    <option value="wales">Wales</option>
                    <option value="scotland">Scotland</option>
                    <option value="northern-ireland">Northern Ireland</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="01234 567890" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="psc@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred contact method</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select method</option>
                    <option value="post">Post</option>
                    <option value="email">Email</option>
                    <option value="telephone">Telephone</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Address options</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Service address is the same as residential address</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Service address is the same as company registered office</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This is a business address</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Address is provided by professional service provider</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 6: Declaration and Submission - Review and submit the PSC notification",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration and Submission</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• PSC notifications must be filed within 14 days of the relevant date</li>
                  <li>• Late filing penalties may apply for overdue notifications</li>
                  <li>• The information provided must be accurate and complete</li>
                  <li>• False information may result in prosecution</li>
                  <li>• PSC information will be publicly available on the Companies House register</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person authorizing filing</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position in company</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select position</option>
                    <option value="director">Director</option>
                    <option value="secretary">Company Secretary</option>
                    <option value="agent">Agent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of authorization</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="01234 567890" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Declaration</h4>
                <p className="text-sm text-gray-700 mb-4">
                  I confirm that the information given in this PSC notification is true to the best of my knowledge and belief.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-sm">I confirm that I have read and understood the declaration above *</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I am authorized to file this notification on behalf of the company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">The PSC has been properly identified and verified</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">All control thresholds have been accurately calculated</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">The PSC has been notified of this filing</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional information about this PSC notification"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#003078] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <CompaniesHouseLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">PSC notification (PSC01)</h2>
              <p className="text-blue-100">Notify of person with significant control</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="PSC notification (PSC01)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderAD01Form = () => {
    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting AD01 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving AD01 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Company Information - Confirm your company details",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company number *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="12345678" maxLength={8} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current registered office address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter current address" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current registered office address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter current address" readOnly />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter current town/city" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current county</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter current county" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="SW1A 1AA" readOnly />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of incorporation</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" disabled>
                    <option value="">Select company type</option>
                    <option value="private-limited">Private company limited by shares</option>
                    <option value="public-limited">Public limited company</option>
                    <option value="private-guarantee">Private company limited by guarantee</option>
                    <option value="unlimited">Private unlimited company</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Change Details - Specify the reason and date for the address change",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Change Information</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Important</h4>
                <p className="text-sm text-blue-700">
                  The registered office address change must be notified to Companies House within 14 days of the change.
                  The new address must be a physical address where documents can be delivered during business hours.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of address change *</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for change</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select reason</option>
                    <option value="business-relocation">Business relocation</option>
                    <option value="lease-expiry">Lease expiry</option>
                    <option value="cost-reduction">Cost reduction</option>
                    <option value="business-expansion">Business expansion</option>
                    <option value="administrative">Administrative convenience</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Change circumstances</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This is a permanent address change</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>The company is moving to new premises</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>The address change affects business operations</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>All statutory books will be kept at the new address</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>The new address is suitable for receiving legal documents</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effective time of change</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select time</option>
                    <option value="00:01">00:01 (Start of day)</option>
                    <option value="09:00">09:00 (Business hours)</option>
                    <option value="12:00">12:00 (Midday)</option>
                    <option value="17:00">17:00 (End of business)</option>
                    <option value="23:59">23:59 (End of day)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notice period given</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select period</option>
                    <option value="immediate">Immediate</option>
                    <option value="1-week">1 week</option>
                    <option value="2-weeks">2 weeks</option>
                    <option value="1-month">1 month</option>
                    <option value="3-months">3 months</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional details</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional information about this address change"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: New Address - Provide the complete new registered office address",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">New Registered Office Address</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Address Requirements</h4>
                <p className="text-sm text-blue-700">
                  The new registered office address must be a physical address in England, Wales, Scotland, or Northern Ireland.
                  It cannot be a PO Box and must be accessible during business hours for document delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter new address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter new address" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter new town/city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New county</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter new county" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select country</option>
                    <option value="england">England</option>
                    <option value="wales">Wales</option>
                    <option value="scotland">Scotland</option>
                    <option value="northern-ireland">Northern Ireland</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select property type</option>
                    <option value="office">Office building</option>
                    <option value="residential">Residential property</option>
                    <option value="commercial">Commercial premises</option>
                    <option value="industrial">Industrial premises</option>
                    <option value="serviced-office">Serviced office</option>
                    <option value="virtual-office">Virtual office</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="01234 567890" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="office@company.com" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Address characteristics</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This is a business address</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This is a residential address</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Address is accessible during business hours</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Address is suitable for receiving legal documents</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Address is provided by professional service provider</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Building access instructions</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Provide any special instructions for accessing the building or delivering documents"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 4: Declaration and Submission - Review and submit the address change",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration and Submission</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Address changes must be filed within 14 days of the change</li>
                  <li>• Late filing penalties may apply for overdue notifications</li>
                  <li>• The information provided must be accurate and complete</li>
                  <li>• False information may result in prosecution</li>
                  <li>• The new address will be publicly available on the Companies House register</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person authorizing filing</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position in company</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select position</option>
                    <option value="director">Director</option>
                    <option value="secretary">Company Secretary</option>
                    <option value="agent">Agent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of authorization</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="01234 567890" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Declaration</h4>
                <p className="text-sm text-gray-700 mb-4">
                  I confirm that the information given in this address change form is true to the best of my knowledge and belief.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-sm">I confirm that I have read and understood the declaration above *</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I am authorized to file this change on behalf of the company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">The address change has been properly authorized by the company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">The new address is suitable for receiving legal documents</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">All required procedures have been followed</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional information about this address change"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#003078] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <CompaniesHouseLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Change of registered office address (AD01)</h2>
              <p className="text-blue-100">Change your company's registered office address</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Change of registered office address (AD01)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderNM01Form = () => {
    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting NM01 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving NM01 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Company Information - Confirm your company details",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current company name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter current company name" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company number *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="12345678" maxLength={8} readOnly />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address" readOnly />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter town/city" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter county" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="SW1A 1AA" readOnly />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of incorporation</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" disabled>
                    <option value="">Select company type</option>
                    <option value="private-limited">Private company limited by shares</option>
                    <option value="public-limited">Public limited company</option>
                    <option value="private-guarantee">Private company limited by guarantee</option>
                    <option value="unlimited">Private unlimited company</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Name Change Details - Specify the new company name and resolution details",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">New Company Name Information</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Important</h4>
                <p className="text-sm text-blue-700">
                  The new company name must be available and comply with Companies House naming rules.
                  A special resolution is required to change the company name, and the change must be notified within 15 days.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New company name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter new company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company ending</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select ending</option>
                    <option value="limited">Limited</option>
                    <option value="ltd">Ltd</option>
                    <option value="plc">PLC</option>
                    <option value="public-limited-company">Public Limited Company</option>
                    <option value="community-interest-company">Community Interest Company</option>
                    <option value="cic">CIC</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of resolution *</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type of resolution *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select resolution type</option>
                    <option value="special">Special resolution</option>
                    <option value="ordinary">Ordinary resolution</option>
                    <option value="written">Written resolution</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Name change circumstances</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This is a voluntary name change</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Name change required by Companies House</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Name change due to business restructuring</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Name change for branding purposes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Name change to avoid confusion with existing company</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for name change</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select reason</option>
                    <option value="business-rebrand">Business rebrand</option>
                    <option value="merger-acquisition">Merger or acquisition</option>
                    <option value="trademark-issue">Trademark issue</option>
                    <option value="market-positioning">Market positioning</option>
                    <option value="regulatory-requirement">Regulatory requirement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effective date of name change</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional details</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional information about this name change"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Name Availability - Confirm name availability and compliance",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Name Availability and Compliance</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Name Requirements</h4>
                <p className="text-sm text-blue-700">
                  The new company name must not be the same as an existing company name and must comply with
                  Companies House naming rules. Certain words require approval from relevant authorities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name availability check</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select status</option>
                    <option value="available">Name is available</option>
                    <option value="similar">Similar name exists</option>
                    <option value="unavailable">Name is unavailable</option>
                    <option value="pending">Check pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of name check</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Name compliance checks</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Name does not contain prohibited words</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Name is not offensive or misleading</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Name does not suggest government connection</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Name does not infringe trademarks</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Sensitive words approval obtained (if applicable)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sensitive words requiring approval</label>
                  <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="List any sensitive words in the proposed name"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Approval reference (if applicable)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter approval reference" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trademark search conducted</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select status</option>
                    <option value="yes">Yes, search conducted</option>
                    <option value="no">No search conducted</option>
                    <option value="pending">Search pending</option>
                    <option value="not-required">Not required</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domain name availability</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select status</option>
                    <option value="available">Domain available</option>
                    <option value="unavailable">Domain unavailable</option>
                    <option value="not-checked">Not checked</option>
                    <option value="not-required">Not required</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name compliance notes</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional notes about name compliance or approval requirements"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 4: Declaration and Submission - Review and submit the name change",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration and Submission</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Name changes must be filed within 15 days of the resolution</li>
                  <li>• Late filing penalties may apply for overdue notifications</li>
                  <li>• The information provided must be accurate and complete</li>
                  <li>• False information may result in prosecution</li>
                  <li>• The new name will be publicly available on the Companies House register</li>
                  <li>• A certificate of incorporation on change of name will be issued</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person authorizing filing</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position in company</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select position</option>
                    <option value="director">Director</option>
                    <option value="secretary">Company Secretary</option>
                    <option value="agent">Agent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of authorization</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="01234 567890" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Declaration</h4>
                <p className="text-sm text-gray-700 mb-4">
                  I confirm that the information given in this name change form is true to the best of my knowledge and belief.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-sm">I confirm that I have read and understood the declaration above *</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I am authorized to file this change on behalf of the company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">The name change has been properly authorized by special resolution</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">The new name complies with Companies House naming rules</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">All required approvals have been obtained</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any additional information about this name change"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#003078] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <CompaniesHouseLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Change of company name (NM01)</h2>
              <p className="text-blue-100">Change your company's name</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Change of company name (NM01)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderSA100Form = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting SA100 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving SA100 draft:', data)
    }

    return (
      <FormWizard
        title="Self Assessment (SA100)"
        logoComponent={<HMRCLogo className="h-16 w-16" />}
        colorScheme="green"
        formData={formData}
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
        pages={[
          {
            title: "Step 1: Personal Details - Enter your tax reference and personal information",
            component: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="utr">Unique Taxpayer Reference (UTR)</Label>
                    <Input 
                      id="utr" 
                      value={formData.utr || ''} 
                      onChange={(e) => setFormData({...formData, utr: e.target.value})}
                      placeholder="1234567890" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxYear">Tax year</Label>
                    <Select value={formData.taxYear || ''} onValueChange={(value) => setFormData({...formData, taxYear: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023-24">2023-24</SelectItem>
                        <SelectItem value="2022-23">2022-23</SelectItem>
                        <SelectItem value="2021-22">2021-22</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="niNumber">National Insurance Number</Label>
                    <Input 
                      id="niNumber"
                      value={formData.niNumber || ''} 
                      onChange={(e) => setFormData({...formData, niNumber: e.target.value})}
                      placeholder="AB123456C" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of birth</Label>
                    <Input 
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth || ''} 
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )
          },
          {
            title: "Step 2: Employment Income - Report your employment earnings and tax deducted",
            component: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employmentPay">Pay from employment</Label>
                    <Input 
                      id="employmentPay"
                      value={formData.employmentPay || ''} 
                      onChange={(e) => setFormData({...formData, employmentPay: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxDeducted">UK tax deducted</Label>
                    <Input 
                      id="taxDeducted"
                      value={formData.taxDeducted || ''} 
                      onChange={(e) => setFormData({...formData, taxDeducted: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="tipsPayments">Tips and other payments</Label>
                    <Input 
                      id="tipsPayments"
                      value={formData.tipsPayments || ''} 
                      onChange={(e) => setFormData({...formData, tipsPayments: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="employmentBenefits">Benefits from employment</Label>
                    <Input 
                      id="employmentBenefits"
                      value={formData.employmentBenefits || ''} 
                      onChange={(e) => setFormData({...formData, employmentBenefits: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                </div>
              </div>
            )
          },
          {
            title: "Step 3: Self Employment - Declare business income, expenses and profit",
            component: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business name</Label>
                    <Input 
                      id="businessName"
                      value={formData.businessName || ''} 
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      placeholder="Enter business name" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessDescription">Business description</Label>
                    <Input 
                      id="businessDescription"
                      value={formData.businessDescription || ''} 
                      onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                      placeholder="Describe your business" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessIncome">Business income</Label>
                    <Input 
                      id="businessIncome"
                      value={formData.businessIncome || ''} 
                      onChange={(e) => setFormData({...formData, businessIncome: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessExpenses">Business expenses</Label>
                    <Input 
                      id="businessExpenses"
                      value={formData.businessExpenses || ''} 
                      onChange={(e) => setFormData({...formData, businessExpenses: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                </div>
              </div>
            )
          },
          {
            title: "Step 4: Other Income - Report additional income sources and investments",
            component: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyIncome">UK property income</Label>
                    <Input 
                      id="propertyIncome"
                      value={formData.propertyIncome || ''} 
                      onChange={(e) => setFormData({...formData, propertyIncome: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="dividends">UK dividends</Label>
                    <Input 
                      id="dividends"
                      value={formData.dividends || ''} 
                      onChange={(e) => setFormData({...formData, dividends: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="interest">UK interest</Label>
                    <Input 
                      id="interest"
                      value={formData.interest || ''} 
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="otherIncome">Other UK income</Label>
                    <Input 
                      id="otherIncome"
                      value={formData.otherIncome || ''} 
                      onChange={(e) => setFormData({...formData, otherIncome: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                </div>
              </div>
            )
          },
          {
            title: "Step 3: Tax Calculation - Complete final tax calculations and review before submission",
            component: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalIncome">Total income</Label>
                    <Input 
                      id="totalIncome"
                      value={formData.totalIncome || ''} 
                      onChange={(e) => setFormData({...formData, totalIncome: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxDue">Tax due</Label>
                    <Input 
                      id="taxDue"
                      value={formData.taxDue || ''} 
                      onChange={(e) => setFormData({...formData, taxDue: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxPaid">Tax already paid</Label>
                    <Input 
                      id="taxPaid"
                      value={formData.taxPaid || ''} 
                      onChange={(e) => setFormData({...formData, taxPaid: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxBalance">Tax to pay or refund</Label>
                    <Input 
                      id="taxBalance"
                      value={formData.taxBalance || ''} 
                      onChange={(e) => setFormData({...formData, taxBalance: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                </div>
              </div>
            )
          }
        ]}
      />
    )
  }

  const renderCT600Form = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting CT600 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving CT600 draft:', data)
    }

    return (
      <FormWizard
        title="Corporation Tax (CT600)"
        logoComponent={<HMRCLogo className="h-16 w-16" />}
        colorScheme="green"
        formData={formData}
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
        pages={[
          {
            title: "Step 1: Company Details - Enter company information and accounting period",
            component: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company name</Label>
                    <Input 
                      id="companyName"
                      value={formData.companyName || ''} 
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      placeholder="Enter company name" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyNumber">Company registration number</Label>
                    <Input 
                      id="companyNumber"
                      value={formData.companyNumber || ''} 
                      onChange={(e) => setFormData({...formData, companyNumber: e.target.value})}
                      placeholder="12345678" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="ctReference">Corporation Tax reference</Label>
                    <Input 
                      id="ctReference"
                      value={formData.ctReference || ''} 
                      onChange={(e) => setFormData({...formData, ctReference: e.target.value})}
                      placeholder="1234567890" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="periodEndDate">Accounting period end date</Label>
                    <Input 
                      id="periodEndDate"
                      type="date"
                      value={formData.periodEndDate || ''} 
                      onChange={(e) => setFormData({...formData, periodEndDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )
          },
          {
            title: "Step 2: Profit and Loss - Enter profit and loss account information and financial statements",
            component: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="turnover">Turnover</Label>
                    <Input 
                      id="turnover"
                      value={formData.turnover || ''} 
                      onChange={(e) => setFormData({...formData, turnover: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalExpenses">Total expenses</Label>
                    <Input 
                      id="totalExpenses"
                      value={formData.totalExpenses || ''} 
                      onChange={(e) => setFormData({...formData, totalExpenses: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="netProfit">Net profit before tax</Label>
                    <Input 
                      id="netProfit"
                      value={formData.netProfit || ''} 
                      onChange={(e) => setFormData({...formData, netProfit: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxAdjustments">Tax adjustments</Label>
                    <Input 
                      id="taxAdjustments"
                      value={formData.taxAdjustments || ''} 
                      onChange={(e) => setFormData({...formData, taxAdjustments: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                </div>
              </div>
            )
          },
          {
            title: "Step 3: Tax Calculation - Complete final tax calculations and review before submission",
            component: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="taxableProfit">Taxable profit</Label>
                    <Input 
                      id="taxableProfit"
                      value={formData.taxableProfit || ''} 
                      onChange={(e) => setFormData({...formData, taxableProfit: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="corporationTaxDue">Corporation tax due</Label>
                    <Input 
                      id="corporationTaxDue"
                      value={formData.corporationTaxDue || ''} 
                      onChange={(e) => setFormData({...formData, corporationTaxDue: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="corporationTaxPaid">Tax already paid</Label>
                    <Input 
                      id="corporationTaxPaid"
                      value={formData.corporationTaxPaid || ''} 
                      onChange={(e) => setFormData({...formData, corporationTaxPaid: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="corporationTaxPayable">Tax payable</Label>
                    <Input 
                      id="corporationTaxPayable"
                      value={formData.corporationTaxPayable || ''} 
                      onChange={(e) => setFormData({...formData, corporationTaxPayable: e.target.value})}
                      placeholder="£0" 
                    />
                  </div>
                </div>
              </div>
            )
          }
        ]}
      />
    )
  }

  const renderP11DForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting P11D form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving P11D draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Employee Details - Enter employee personal and employment information",
        component: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded">
              <h3 className="text-lg font-semibold text-green-900 mb-2">P11D - Expenses and benefits</h3>
              <p className="text-green-800 text-sm">Annual return of expenses payments and benefits for the tax year ending 5 April 2024</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-md font-semibold text-gray-900">Employee details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeTitle" className="text-sm font-medium">Title</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mr">Mr</SelectItem>
                      <SelectItem value="mrs">Mrs</SelectItem>
                      <SelectItem value="miss">Miss</SelectItem>
                      <SelectItem value="ms">Ms</SelectItem>
                      <SelectItem value="dr">Dr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employeeForename" className="text-sm font-medium">Forename *</Label>
                  <Input 
                    id="employeeForename" 
                    placeholder="First name"
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeSurname" className="text-sm font-medium">Surname *</Label>
                  <Input 
                    id="employeeSurname" 
                    placeholder="Last name"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="employeeNI" className="text-sm font-medium">National Insurance number *</Label>
                  <Input 
                    id="employeeNI" 
                    placeholder="AB123456C"
                    maxLength={9}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeAddress" className="text-sm font-medium">Employee's address</Label>
                  <Textarea 
                    id="employeeAddress" 
                    placeholder="Full address"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="payrollNumber" className="text-sm font-medium">Payroll number</Label>
                  <Input 
                    id="payrollNumber" 
                    placeholder="Employee payroll number"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="directorStatus" className="text-sm font-medium">Director status</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="director" name="directorStatus" value="director" className="h-4 w-4 text-green-600" />
                      <Label htmlFor="director" className="ml-2 text-sm">Director</Label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="employee" name="directorStatus" value="employee" className="h-4 w-4 text-green-600" />
                      <Label htmlFor="employee" className="ml-2 text-sm">Employee (not director)</Label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="employmentDate" className="text-sm font-medium">Date employment started</Label>
                  <Input 
                    id="employmentDate" 
                    type="date"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Cars and car fuel - Enter company car and fuel benefit details for employees",
        component: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Section A: Cars and car fuel</h3>
              <p className="text-green-800 text-sm">Company cars available for private use and fuel provided</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="hasCompanyCar"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <Label htmlFor="hasCompanyCar" className="text-sm font-medium">Employee had use of company car(s)</Label>
              </div>

              <div className="border rounded p-4">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Car 1 details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="carMake" className="text-sm font-medium">Make and model</Label>
                    <Input 
                      id="carMake" 
                      placeholder="e.g. Ford Focus"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="carRegistration" className="text-sm font-medium">Registration number</Label>
                    <Input 
                      id="carRegistration" 
                      placeholder="AB12 CDE"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="carListPrice" className="text-sm font-medium">List price when new</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                      <Input 
                        id="carListPrice" 
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Box A1</p>
                  </div>
                  <div>
                    <Label htmlFor="carCO2Emissions" className="text-sm font-medium">CO2 emissions (g/km)</Label>
                    <Input 
                      id="carCO2Emissions" 
                      placeholder="120"
                      type="number"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-600 mt-1">Box A2</p>
                  </div>
                  <div>
                    <Label htmlFor="carFuelType" className="text-sm font-medium">Fuel type</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="carAvailableFrom" className="text-sm font-medium">Date car first made available</Label>
                    <Input 
                      id="carAvailableFrom" 
                      type="date"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="carAvailableTo" className="text-sm font-medium">Date car withdrawn (if applicable)</Label>
                    <Input 
                      id="carAvailableTo" 
                      type="date"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="carCashEquivalent" className="text-sm font-medium">Cash equivalent of car benefit</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                      <Input 
                        id="carCashEquivalent" 
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Box A3</p>
                  </div>
                  <div>
                    <Label htmlFor="carFuelBenefit" className="text-sm font-medium">Cash equivalent of fuel benefit</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                      <Input 
                        id="carFuelBenefit" 
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Box A4</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="carUnavailable"
                      className="h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                    <Label htmlFor="carUnavailable" className="text-sm">Car was unavailable for 30 consecutive days or more</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Medical treatment and insurance - Enter medical benefits and private health insurance provided to employees",
        component: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Section B: Medical treatment and insurance</h3>
              <p className="text-green-800 text-sm">Medical insurance premiums and treatment provided</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="hasMedicalBenefits"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <Label htmlFor="hasMedicalBenefits" className="text-sm font-medium">Employee received medical benefits</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medicalInsurance" className="text-sm font-medium">Medical insurance premiums</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                    <Input 
                      id="medicalInsurance" 
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Box B1</p>
                </div>
                <div>
                  <Label htmlFor="medicalTreatment" className="text-sm font-medium">Medical treatment</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                    <Input 
                      id="medicalTreatment" 
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Box B2</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dentalTreatment" className="text-sm font-medium">Dental treatment</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                    <Input 
                      id="dentalTreatment" 
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Box B3</p>
                </div>
                <div>
                  <Label htmlFor="opticalTreatment" className="text-sm font-medium">Optical treatment</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                    <Input 
                      id="opticalTreatment" 
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Box B4</p>
                </div>
              </div>

              <div>
                <Label htmlFor="medicalDetails" className="text-sm font-medium">Details of medical benefits</Label>
                <Textarea 
                  id="medicalDetails" 
                  placeholder="Describe the medical benefits provided"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 4: Other benefits - Enter other taxable benefits and expenses provided to employees",
        component: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Section C: Other benefits</h3>
              <p className="text-green-800 text-sm">Accommodation, loans, and other benefits in kind</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900">Living accommodation</h4>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="hasAccommodation"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded"
                  />
                  <Label htmlFor="hasAccommodation" className="text-sm font-medium">Employee provided with living accommodation</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accommodationValue" className="text-sm font-medium">Cash equivalent of accommodation</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                      <Input 
                        id="accommodationValue" 
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Box C1</p>
                  </div>
                  <div>
                    <Label htmlFor="accommodationAddress" className="text-sm font-medium">Address of accommodation</Label>
                    <Textarea 
                      id="accommodationAddress" 
                      placeholder="Full address"
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900">Loans</h4>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="hasLoans"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded"
                  />
                  <Label htmlFor="hasLoans" className="text-sm font-medium">Employee provided with loans</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loanAmount" className="text-sm font-medium">Maximum amount of loan outstanding</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                      <Input 
                        id="loanAmount" 
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Box C2</p>
                  </div>
                  <div>
                    <Label htmlFor="loanBenefit" className="text-sm font-medium">Cash equivalent of loan benefit</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                      <Input 
                        id="loanBenefit" 
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Box C3</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900">Other benefits in kind</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="otherBenefits" className="text-sm font-medium">Other benefits (total cash equivalent)</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                      <Input 
                        id="otherBenefits" 
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Box C4</p>
                  </div>
                  <div>
                    <Label htmlFor="expensesPayments" className="text-sm font-medium">Expenses payments</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                      <Input 
                        id="expensesPayments" 
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Box C5</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="benefitsDescription" className="text-sm font-medium">Description of other benefits</Label>
                  <Textarea 
                    id="benefitsDescription" 
                    placeholder="Describe any other benefits provided"
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="bg-white">
        <div className="bg-[#00703c] text-white p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded">
              <FileText className="h-8 w-8 text-[#00703c]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">HM Revenue & Customs</h2>
              <p className="text-green-100">Expenses and benefits annual return (P11D)</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Expenses and benefits annual return (P11D)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderSA102Form = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting SA102 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving SA102 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Employment Details - Enter employer and employment information",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employer name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter employer name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAYE reference *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. 123/AB12345" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Employer address</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2" placeholder="Address line 1" />
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2" placeholder="Address line 2 (optional)" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Town/City" />
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="County" />
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Postcode" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment start date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment end date (if applicable)</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payroll number</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter payroll number" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Income & Tax - Enter employment income, tax deducted and National Insurance contributions",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Income and Tax Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pay from employment (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">UK tax deducted (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tips and other payments (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefits from employment (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student loan deductions (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postgraduate loan deductions (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Did you receive any of the following benefits?</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Company car or car fuel</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Medical insurance or treatment</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Loans from employer</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Living accommodation</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Vouchers, credit cards and excess mileage allowance</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Assets transferred or payments made on your behalf</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Other benefits</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Expenses & Deductions - Enter allowable employment expenses and tax deductions",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Expenses and Deductions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business travel and subsistence (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fixed deductions for expenses (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional fees and subscriptions (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other expenses and capital allowances (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Details of other expenses</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Provide details of any other employment expenses"></textarea>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Do any of these apply to you?</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You were a company director</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You had expenses payments that exceeded £2,500</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You received payments for expenses you did not pay</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You were in an employee share scheme</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Employment (SA102)</h2>
              <p className="text-green-100">Report employment income and benefits</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Employment (SA102)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderSA103SForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting SA103S form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving SA103S draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Business Details - Enter your business information and self-employment details",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter business name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business description *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Describe your business activity" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business start date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accounting period end date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Business address</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2" placeholder="Address line 1" />
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2" placeholder="Address line 2 (optional)" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Town/City" />
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="County" />
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Postcode" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Business type</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="businessType" className="mr-2" />
                    <span>Sole trader</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="businessType" className="mr-2" />
                    <span>Partnership</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="businessType" className="mr-2" />
                    <span>Limited company</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Income & Expenses - Enter business income and expense information for self-employment",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Income and Expenses</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total business income (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost of goods sold (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Office costs (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel costs (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Premises costs (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Repairs and renewals (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">General administrative costs (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business entertainment costs (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest on bank and other loans (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other business expenses (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Details of other business expenses</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Provide details of any other business expenses"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Capital Allowances & Adjustments - Enter capital allowances and business adjustments for tax calculations",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Capital Allowances and Adjustments</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capital allowances (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goods and services for your own use (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle expenses (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other adjustments (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Do any of these apply to your business?</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You used simplified expenses (flat rate expenses)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You had business premises partly used as your home</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You used your home for business purposes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You had losses brought forward from earlier years</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You made a loss this year</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional information</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Any additional information about your business"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Self-employment (short) (SA103S)</h2>
              <p className="text-green-100">Report self-employment income - short version</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Self-employment (short) (SA103S)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderSA104SForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting SA104S form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving SA104S draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Partnership Details - Enter partnership business information",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Partnership Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partnership name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter partnership name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partnership UTR *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="1234567890" maxLength={10} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partnership start date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accounting period end date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Partnership address</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2" placeholder="Address line 1" />
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2" placeholder="Address line 2 (optional)" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Town/City" />
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="County" />
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Postcode" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your percentage share of partnership (%)</label>
                  <input type="number" step="0.01" min="0" max="100" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nature of trade or profession</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Describe the business activity" />
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Partnership Income - Enter partnership profit share and income details",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Share of Partnership Income</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your share of partnership profit (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your share of partnership loss (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partnership charges (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profit share received (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax taken off trading income (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CIS deductions made by contractors (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Partnership details</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This is a limited liability partnership (LLP)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You were a partner for the whole of the partnership's accounting period</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You received partnership income from more than one partnership</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>The partnership made a loss this year</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Adjustments & Additional Information - Enter partnership adjustments and additional income details",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Adjustments and Additional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Losses brought forward (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loss relief claimed (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capital allowances (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Balancing charges (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Details of any adjustments</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Provide details of any adjustments to partnership income"></textarea>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Additional partnership information</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have other partnership income not included above</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You made capital contributions to the partnership</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You received capital distributions from the partnership</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>The partnership operates in multiple countries</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional information</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Any additional information about your partnership income"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Partnership (short) (SA104S)</h2>
              <p className="text-green-100">Report partnership income - short version</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Partnership (short) (SA104S)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderSA105Form = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting SA105 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving SA105 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Property Details - Enter UK property income information",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">UK Property Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of properties *</label>
                  <input type="number" min="1" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select property type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="mixed">Mixed use</option>
                    <option value="furnished">Furnished holiday lettings</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Property address</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2" placeholder="Address line 1" />
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2" placeholder="Address line 2 (optional)" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Town/City" />
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="County" />
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Postcode" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date property first let</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date property last let (if applicable)</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Property letting details</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Property was let for part of the year only</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Property was vacant for part of the year</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Property is jointly owned</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Property is furnished holiday lettings</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Property Income - Enter UK property rental income and allowable expenses",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Income Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rent received (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rent a room relief (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Premiums for the grant of a lease (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reverse premiums and inducements (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other property income (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax taken off any income (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Details of other property income</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Provide details of any other property income"></textarea>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Income details</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Income includes service charges</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Income includes insurance premiums</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Income received in advance</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Income received from overseas tenants</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Property Expenses - Enter property rental expenses and allowable deductions",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Expenses and Allowances</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rent, rates, insurance, ground rents etc (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property management (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Repairs, maintenance and renewals (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Finance costs, including interest (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Legal, management and other professional fees (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Costs of services provided, including wages (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other allowable property expenses (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Private use adjustment (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Balancing charges (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capital allowances (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Details of other allowable expenses</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Provide details of any other allowable property expenses"></textarea>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Expense details</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You used simplified expenses (flat rate expenses)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Property was used for business purposes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You had losses brought forward from earlier years</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You made a loss this year</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">UK property (SA105)</h2>
              <p className="text-green-100">Report UK property income</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="UK property (SA105)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderSA106Form = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting SA106 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving SA106 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Foreign Income Details - Enter foreign income sources and tax credit information",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Foreign Income Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country or territory *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter country name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select currency</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="JPY">Japanese Yen (JPY)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                    <option value="AUD">Australian Dollar (AUD)</option>
                    <option value="CHF">Swiss Franc (CHF)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment income (foreign currency)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment income (£ sterling)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Self-employment income (foreign currency)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Self-employment income (£ sterling)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property income (foreign currency)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property income (£ sterling)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Income type details</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Employment income from overseas employer</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Self-employment income from overseas business</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Property income from overseas property</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Pension income from overseas</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Foreign Tax & Relief - Enter foreign tax credits and relief information for overseas income",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Foreign Tax and Relief Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foreign tax paid on employment income (foreign currency)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foreign tax paid on employment income (£ sterling)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foreign tax paid on self-employment income (foreign currency)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foreign tax paid on self-employment income (£ sterling)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foreign tax paid on property income (foreign currency)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foreign tax paid on property income (£ sterling)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special withholding tax (foreign currency)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special withholding tax (£ sterling)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Tax relief claims</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Claiming foreign tax credit relief</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Claiming unilateral relief</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Claiming double taxation treaty relief</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Claiming expense relief</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Additional Information - Enter foreign tax credits and additional foreign income details",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Foreign Income Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exchange rate used</label>
                  <input type="number" step="0.0001" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="1.0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of exchange rate</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Overseas pension income (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other foreign income (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Details of other foreign income</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Provide details of any other foreign income"></textarea>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Additional details</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You were resident in the UK for the whole tax year</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You were domiciled in the UK</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have foreign income from multiple countries</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have foreign assets or investments</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional information</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Any additional information about your foreign income"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Foreign (SA106)</h2>
              <p className="text-green-100">Report foreign income</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Foreign (SA106)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderSA108Form = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting SA108 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving SA108 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Asset Disposals - Identifying your disposals",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Disposal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description of asset disposed of *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. Shares in ABC Ltd" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of disposal *</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disposal proceeds (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allowable costs (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of acquisition</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost or value at acquisition (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Type of disposal</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="disposalType" className="mr-2" />
                    <span>Sale or gift of quoted shares or securities</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="disposalType" className="mr-2" />
                    <span>Sale or gift of unquoted shares or securities</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="disposalType" className="mr-2" />
                    <span>Sale or gift of property</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="disposalType" className="mr-2" />
                    <span>Other asset disposal</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Additional disposal details</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This was a disposal to a connected person</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This disposal qualifies for entrepreneurs' relief</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This disposal qualifies for investors' relief</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This was a disposal of residential property</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Gains and Losses Calculation - Working out your gain or loss",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Capital Gains Calculation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disposal proceeds (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incidental costs of disposal (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost or value at acquisition (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incidental costs of acquisition (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enhancement expenditure (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Indexation allowance (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taper relief (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gain or loss (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Relief claims</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Claiming entrepreneurs' relief</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Claiming investors' relief</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Claiming gift relief</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Claiming rollover relief</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Summary and Tax Calculation - Deducting losses and calculating tax",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Capital Gains Tax Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total gains for the year (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total losses for the year (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Losses brought forward from earlier years (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Losses used this year (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual exempt amount (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="12300.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taxable gains (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capital gains tax due (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax already paid (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Additional information</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have losses to carry forward to next year</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have made disposals of residential property</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have claimed entrepreneurs' relief</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have claimed investors' relief</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional information</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Any additional information about your capital gains"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Capital gains (SA108)</h2>
              <p className="text-green-100">Report capital gains and losses</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Capital gains (SA108)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderSA109Form = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting SA109 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving SA109 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Residence Status - Your residence status for tax purposes",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">UK Residence Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax year *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select tax year</option>
                    <option value="2023-24">2023-24</option>
                    <option value="2022-23">2022-23</option>
                    <option value="2021-22">2021-22</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your residence status *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select status</option>
                    <option value="uk-resident">UK resident</option>
                    <option value="non-uk-resident">Non-UK resident</option>
                    <option value="split-year">Split year treatment</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date you became UK resident (if applicable)</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date you ceased to be UK resident (if applicable)</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Residence details</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You were UK resident for the whole tax year</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You were non-UK resident for the whole tax year</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You are claiming split year treatment</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have dual residence status</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Country of residence (if not UK)</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter country name" />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Details of residence status</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Provide details of your residence status and any changes during the year"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Remittance Basis - Claiming the remittance basis",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Remittance Basis Claim</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Are you claiming the remittance basis? *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Remittance basis charge (£)</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select charge</option>
                    <option value="0">£0 (qualifying conditions met)</option>
                    <option value="30000">£30,000</option>
                    <option value="60000">£60,000</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foreign income arising (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foreign income remitted to UK (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foreign gains arising (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foreign gains remitted to UK (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Remittance basis conditions</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You are not domiciled in the UK</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You are not ordinarily resident in the UK</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Your unremitted foreign income and gains are less than £2,000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have been UK resident for fewer than 7 of the last 9 tax years</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Additional Information - Other residence and domicile matters",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Residence Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your domicile status</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select domicile status</option>
                    <option value="uk-domiciled">UK domiciled</option>
                    <option value="non-uk-domiciled">Non-UK domiciled</option>
                    <option value="deemed-domiciled">Deemed UK domiciled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country of domicile (if not UK)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter country name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of days in UK during tax year</label>
                  <input type="number" min="0" max="366" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of years UK resident in last 20 years</label>
                  <input type="number" min="0" max="20" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Additional circumstances</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have a UK accommodation tie</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have a UK work tie</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have a UK family tie</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have a UK country tie</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional information</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Any additional information about your residence, domicile or remittance basis claim"></textarea>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Professional advice</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have taken professional advice on your residence status</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have taken professional advice on your domicile status</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>You have taken professional advice on the remittance basis</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Residence, remittance basis etc (SA109)</h2>
              <p className="text-green-100">Report residence and remittance basis claims</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Residence, remittance basis etc (SA109)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderCIS300Form = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting CIS300 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving CIS300 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Contractor Details - Your business information",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contractor Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contractor name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter contractor name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unique Taxpayer Reference (UTR) *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="1234567890" maxLength={10} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accounts Office reference *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="123PA00000000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return period *</label>
                  <input type="month" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter address" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter town/city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter county" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Return type</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="returnType" className="mr-2" />
                    <span>Monthly return</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="returnType" className="mr-2" />
                    <span>Final return</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="returnType" className="mr-2" />
                    <span>Nil return (no payments made)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Subcontractor Payments - Payments made to subcontractors",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subcontractor Payment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total payments made to subcontractors (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total deductions made (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost of materials included (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">VAT included in payments (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of subcontractors paid</label>
                  <input type="number" min="0" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of CIS25 vouchers issued</label>
                  <input type="number" min="0" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Payment details</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Payments made to registered subcontractors</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Payments made to unregistered subcontractors</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Payments made to partnerships</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Payments made to companies</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional payment information</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Any additional information about payments made"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Declaration and Submission - Review and submit your return",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration and Submission</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• You must submit your CIS300 return by the 19th of the month following the return period</li>
                  <li>• Late returns may result in penalties</li>
                  <li>• You must keep records of all payments and deductions for at least 3 years</li>
                  <li>• False information may result in prosecution</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return prepared by</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="01234 567890" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of preparation</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agent reference (if applicable)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter agent reference" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Declaration</h4>
                <p className="text-sm text-gray-700 mb-4">
                  I declare that the information I have given on this return is correct and complete to the best of my knowledge and belief.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-sm">I confirm that I have read and understood the declaration above *</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I am authorized to make this declaration on behalf of the contractor</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional comments</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Any additional comments or information"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Monthly return for contractors (CIS300)</h2>
              <p className="text-green-100">Submit monthly CIS return</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Monthly return for contractors (CIS300)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderP35Form = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting P35 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving P35 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Employer Details - Your business information for the tax year",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Employer Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employer name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter employer name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAYE reference *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="123/AB12345" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accounts Office reference *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="123PA00000000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax year ending *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select tax year</option>
                    <option value="2024-04-05">5 April 2024</option>
                    <option value="2023-04-05">5 April 2023</option>
                    <option value="2022-04-05">5 April 2022</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter address" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter town/city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter county" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Employer type</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="employerType" className="mr-2" />
                    <span>Company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employerType" className="mr-2" />
                    <span>Partnership</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employerType" className="mr-2" />
                    <span>Sole trader</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="employerType" className="mr-2" />
                    <span>Other</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Employee Summary - Summary of employees and payments",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee and Payment Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total number of employees during the year *</label>
                  <input type="number" min="0" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of employees at year end</label>
                  <input type="number" min="0" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total pay for all employees (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total PAYE tax deducted (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total employee National Insurance (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total employer National Insurance (£) *</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student loan deductions (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statutory payments made (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Employee categories</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Full-time employees</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Part-time employees</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Directors</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Apprentices</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Declaration and Submission - Review and submit your annual return",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration and Submission</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• You must submit your P35 return by 19 May following the end of the tax year</li>
                  <li>• You must also provide P60s to all employees by 31 May</li>
                  <li>• Late returns may result in penalties</li>
                  <li>• You must keep payroll records for at least 3 years</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return prepared by</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="01234 567890" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of preparation</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agent reference (if applicable)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter agent reference" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total amount due to HMRC (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount already paid (£)</label>
                  <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Declaration</h4>
                <p className="text-sm text-gray-700 mb-4">
                  I declare that the information I have given on this return is correct and complete to the best of my knowledge and belief.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-sm">I confirm that I have read and understood the declaration above *</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I am authorized to make this declaration on behalf of the employer</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">All P60s have been issued to employees</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional comments</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Any additional comments or information"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Employer Annual Return (P35)</h2>
              <p className="text-green-100">Submit end of year employer return</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Employer Annual Return (P35)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderVAT1Form = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting VAT1 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving VAT1 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Business Details - Enter your business information and VAT registration details",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter business name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trading name (if different)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter trading name" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Business address *</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2" placeholder="Address line 1" />
                <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2" placeholder="Address line 2 (optional)" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Town/City" />
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="County" />
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Postcode" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Business type *</label>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Select business type</option>
                  <option value="sole-trader">Sole trader</option>
                  <option value="partnership">Partnership</option>
                  <option value="limited-company">Limited company</option>
                  <option value="llp">Limited liability partnership</option>
                  <option value="charity">Charity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company registration number</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. 12345678" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of incorporation</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: VAT Liability - Enter VAT liability and registration information for your business",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">VAT Liability Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Reason for registration *</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="registration_reason" value="liable" className="mr-2" />
                      <span>Liable to register - taxable supplies exceeded £85,000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="registration_reason" value="voluntary" className="mr-2" />
                      <span>Voluntary registration</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="registration_reason" value="distance-selling" className="mr-2" />
                      <span>Distance selling</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="registration_reason" value="acquisitions" className="mr-2" />
                      <span>Acquisitions from other EU member states</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date liable to register</label>
                    <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date business started</label>
                    <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected annual taxable turnover (£)</label>
                  <input type="number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Do you make zero-rated or exempt supplies?</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="zero_rated" value="yes" className="mr-2" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="zero_rated" value="no" className="mr-2" />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Business Activities - Enter business activities and VAT scheme details for registration",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Activities</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Main business activity *</label>
                  <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Describe your main business activity"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SIC code (if known)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. 12345" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of employees</label>
                    <input type="number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual payroll (£)</label>
                    <input type="number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Do you sell goods or services online?</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="online_sales" value="yes" className="mr-2" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="online_sales" value="no" className="mr-2" />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Do you import or export goods?</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" name="import_export" value="import" className="mr-2" />
                      <span>Import goods</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="import_export" value="export" className="mr-2" />
                      <span>Export goods</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="import_export" value="neither" className="mr-2" />
                      <span>Neither</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Contact Details - Enter business contact information and correspondence address",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact name *</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position in business</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. Director, Owner" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telephone number *</label>
                    <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. 01234 567890" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile number</label>
                    <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. 07123 456789" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="example@email.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Preferred method of contact</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="contact_method" value="email" className="mr-2" />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="contact_method" value="telephone" className="mr-2" />
                      <span>Telephone</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="contact_method" value="post" className="mr-2" />
                      <span>Post</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Declaration</label>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <label className="flex items-start">
                      <input type="checkbox" className="mr-2 mt-1" required />
                      <span className="text-sm">I declare that the information I have given on this form is true and complete. I understand that if I give false information I may be liable to prosecution and/or a financial penalty.</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Application to register for VAT (VAT1)</h2>
              <p className="text-green-100">Register your business for VAT</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Application to register for VAT (VAT1)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderVAT2Form = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleSubmit = (data: Record<string, string>) => {
      console.log('Submitting VAT2 form:', data)
    }

    const handleSaveDraft = (data: Record<string, string>) => {
      console.log('Saving VAT2 draft:', data)
    }

    const pages = [
      {
        title: "Step 1: Representative Member - Details of the representative member company",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Representative Member Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company registration number *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="12345678" maxLength={8} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">VAT registration number (if already registered)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="GB123456789" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Corporation Tax UTR *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="1234567890" maxLength={10} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 1 *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered office address line 2</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter address" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town/City *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter town/city" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter county" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of incorporation</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nature of business *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Describe main business activity" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Representative member status</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This company will act as the representative member for the VAT group</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This company has authority to act on behalf of all group members</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>This company will be responsible for VAT compliance for the group</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: Group Members - Details of all companies to be included in the VAT group",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">VAT Group Member Companies</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Group Eligibility Requirements</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• All companies must be UK established</li>
                  <li>• Companies must be closely bound by financial, economic and organisational links</li>
                  <li>• At least one company must be liable to register for VAT</li>
                  <li>• Maximum of 99 companies in a VAT group</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total number of companies in group *</label>
                  <input type="number" min="2" max="99" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Proposed VAT group name *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter group name" />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Member Company 1 (excluding representative member)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company name *</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter company name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company registration number *</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="12345678" maxLength={8} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">VAT registration number (if registered)</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="GB123456789" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Corporation Tax UTR</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="1234567890" maxLength={10} />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Member Company 2</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company name</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter company name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company registration number</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="12345678" maxLength={8} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">VAT registration number (if registered)</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="GB123456789" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Corporation Tax UTR</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="1234567890" maxLength={10} />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Group structure and relationships</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>All companies are subsidiaries of the same parent company</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Companies have common ownership or control</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Companies operate as a single economic unit</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Companies have integrated business operations</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional member companies (if more than 3 total)</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={4} placeholder="List additional companies with their registration numbers and VAT numbers if applicable"></textarea>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: Declaration and Submission - Review group details and submit application",
        component: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration and Submission</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• VAT group registration takes effect from the date specified in your application</li>
                  <li>• All group members become jointly and severally liable for VAT</li>
                  <li>• Supplies between group members are disregarded for VAT purposes</li>
                  <li>• The representative member is responsible for all VAT obligations</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Proposed effective date of group registration *</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for group registration</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select reason</option>
                    <option value="administrative-efficiency">Administrative efficiency</option>
                    <option value="cash-flow-benefits">Cash flow benefits</option>
                    <option value="simplified-compliance">Simplified compliance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact person for this application</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact telephone number</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="01234 567890" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact email address</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="contact@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agent reference (if applicable)</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter agent reference" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Declaration</h4>
                <p className="text-sm text-gray-700 mb-4">
                  I declare that the information I have given on this application is correct and complete to the best of my knowledge and belief. I understand that giving false information may lead to prosecution.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-sm">I confirm that I have read and understood the declaration above *</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I am authorized to make this declaration on behalf of all group members</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">All group members consent to this VAT group registration</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">I understand the joint and several liability implications</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional information or comments</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} placeholder="Any additional information about the VAT group application"></textarea>
              </div>
            </div>
          </div>
        )
      }
    ]

    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Application for VAT group registration (VAT2)</h2>
              <p className="text-green-100">Register companies as a VAT group</p>
            </div>
          </div>
        </div>
        <FormWizard
          title="Application for VAT group registration (VAT2)"
          pages={pages}
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    )
  }

  const renderMainContent = () => {
    if (activeMainTab === 'forms' && activeSubTab) {
      switch (activeSubTab) {
        case 'incorporation': return renderIN01Form()
        case 'accounts': return renderAA01Form()
        case 'annual': return renderAR01Form()
        case 'directors': return renderTM01Form()
        case 'secretaries': return renderCH01Form()
        case 'psc': return renderPSC01Form()
        case 'addresschange': return renderAD01Form()
        case 'namechange': return renderNM01Form()
        default: return renderFormsOverview()
      }
    }

    if (activeMainTab === 'hmrc' && activeSubTab) {
      switch (activeSubTab) {
        case 'sa100': return renderSA100Form()
        case 'sa102': return renderSA102Form()
        case 'sa103s': return renderSA103SForm()
        case 'sa104s': return renderSA104SForm()
        case 'sa105': return renderSA105Form()
        case 'sa106': return renderSA106Form()
        case 'sa108': return renderSA108Form()
        case 'sa109': return renderSA109Form()
        case 'ct600': return renderCT600Form()
        case 'cis300': return renderCIS300Form()
        case 'p35': return renderP35Form()
        case 'p11d': return renderP11DForm()
        case 'vat1': return renderVAT1Form()
        case 'vat2': return renderVAT2Form()
        default: return renderHMRCOverview()
      }
    }

    switch (activeMainTab) {
      case 'dashboard': return renderDashboard()
      case 'companies': return renderCompanyManagement()
      case 'forms': return renderFormsOverview()
      case 'psc': return renderPSCRegister()
      case 'hmrc': return renderHMRCOverview()
      case 'ai': return renderAICompanySecretary()
      default: return renderDashboard()
    }
  }

  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon
            const drillDownData = {
              title: `${kpi.title} Analysis`,
              description: `Detailed company secretarial analysis and breakdown for ${kpi.title.toLowerCase()}`,
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Current Status</h4>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <p className={`text-sm ${kpi.color}`}>{kpi.change}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Compliance Score</h4>
                      <p className="text-sm text-gray-600">Companies House compliance</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Overall Score</span>
                          <span className="text-green-600">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  {kpi.title === 'Active Companies' && (
                    <div>
                      <h4 className="font-semibold mb-3">Company Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border rounded">
                          <span>Private Limited</span>
                          <span className="font-semibold">20 companies</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Public Limited</span>
                          <span className="font-semibold">3 companies</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>LLP</span>
                          <span className="font-semibold">1 company</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {kpi.title === 'Pending Filings' && (
                    <div>
                      <h4 className="font-semibold mb-3">Filing Status</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Confirmation Statements - 5 filings</span>
                          <Badge variant="default">Due Soon</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Annual Returns - 2 filings</span>
                          <Badge variant="secondary">In Progress</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Overdue - 1 filing</span>
                          <Badge variant="destructive">Urgent</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {kpi.title === 'PSC Updates' && (
                    <div>
                      <h4 className="font-semibold mb-3">PSC Register Status</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border rounded">
                          <span>Up to Date</span>
                          <span className="font-semibold">20 companies</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Pending Updates</span>
                          <span className="font-semibold">3 companies</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Verification Required</span>
                          <span className="font-semibold">1 company</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Company Data</Button>
                    <Button>File Returns</Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Filings</CardTitle>
              <CardDescription>Latest filing activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filings.slice(0, 5).map((filing) => (
                  <div key={filing.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(filing.status)}
                      <div>
                        <p className="font-medium">{filing.company}</p>
                        <p className="text-sm text-gray-500">{filing.type} - Due: {filing.dueDate}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{filing.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Important dates to remember</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companies.slice(0, 5).map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <p className="text-sm text-gray-500">{company.filingType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{company.nextFiling}</p>
                      <Badge className={getStatusColor(company.status)}>{company.status}</Badge>
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

  const renderCompanyManagement = () => {
    return (
      <div className="space-y-6">
        <SearchFilterHeader
          searchPlaceholder="Search companies..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Company Type',
              value: selectedCompanyType,
              onChange: setSelectedCompanyType,
              options: companyTypeOptions
            },
            {
              label: 'Status',
              value: selectedStatus,
              onChange: setSelectedStatus,
              options: statusOptions
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
            <CardTitle>Company Portfolio</CardTitle>
            <CardDescription>Manage your company registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companies.map((company) => (
                <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Building className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <p className="text-sm text-gray-500">Company No: {company.number}</p>
                      <p className="text-sm text-gray-500">Incorporated: {company.incorporationDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge className={getStatusColor(company.status)}>{company.status}</Badge>
                      <p className="text-sm text-gray-500 mt-1">Next filing: {company.nextFiling}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
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

  const renderFormsOverview = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('incorporation')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Incorporation (IN01)</span>
              </CardTitle>
              <CardDescription>Register a new company</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('accounts')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Receipt className="h-5 w-5" />
                <span>Annual Accounts (AA01)</span>
              </CardTitle>
              <CardDescription>Submit annual accounts</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('annual')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Annual Return (AR01)</span>
              </CardTitle>
              <CardDescription>Submit annual return</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('directors')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Director Changes (TM01)</span>
              </CardTitle>
              <CardDescription>Manage director appointments</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('secretaries')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Secretary Changes (CH01)</span>
              </CardTitle>
              <CardDescription>Manage secretary appointments</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('psc')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>PSC Forms (PSC01)</span>
              </CardTitle>
              <CardDescription>Manage PSC notifications</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }



  const renderPSCRegister = () => {
    return (
      <div className="space-y-6">
        <SearchFilterHeader
          searchPlaceholder="Search PSC register..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'PSC Type',
              value: selectedStatus,
              onChange: setSelectedStatus,
              options: [
                { label: 'All Types', value: 'all' },
                { label: 'Individual', value: 'individual' },
                { label: 'Corporate', value: 'corporate' }
              ]
            }
          ]}
        />

        <Card>
          <CardHeader>
            <CardTitle>People with Significant Control</CardTitle>
            <CardDescription>Manage your PSC register</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pscRegister.map((psc) => (
                <div key={psc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Users className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="font-medium">{psc.name}</p>
                      <p className="text-sm text-gray-500">{psc.type} - {psc.company}</p>
                      <p className="text-sm text-gray-500">Appointed: {psc.appointed}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm">Shares: {psc.shares}</p>
                      <p className="text-sm">Voting: {psc.voting}</p>
                      <Badge className={getStatusColor(psc.status)}>{psc.status}</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
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

  const renderHMRCOverview = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('sa100')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Self Assessment (SA100)</span>
              </CardTitle>
              <CardDescription>Complete your Self Assessment return</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('sa102')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Employment (SA102)</span>
              </CardTitle>
              <CardDescription>Report employment income</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('sa103s')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Self-employment (SA103S)</span>
              </CardTitle>
              <CardDescription>Report self-employment income</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('sa104s')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Partnership (SA104S)</span>
              </CardTitle>
              <CardDescription>Report partnership income</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('sa105')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>UK Property (SA105)</span>
              </CardTitle>
              <CardDescription>Report property income</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('sa106')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Foreign (SA106)</span>
              </CardTitle>
              <CardDescription>Report foreign income</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('sa108')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Capital Gains (SA108)</span>
              </CardTitle>
              <CardDescription>Report capital gains</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('sa109')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Residence (SA109)</span>
              </CardTitle>
              <CardDescription>Report residence status</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('ct600')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Receipt className="h-5 w-5" />
                <span>Corporation Tax (CT600)</span>
              </CardTitle>
              <CardDescription>Submit corporation tax return</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('cis300')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HardHat className="h-5 w-5" />
                <span>CIS Monthly Return (CIS300)</span>
              </CardTitle>
              <CardDescription>Submit CIS monthly return</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('p35')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>End of Year Return (P35)</span>
              </CardTitle>
              <CardDescription>Submit employer annual return</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('p11d')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5" />
                <span>Benefits &amp; Expenses (P11D)</span>
              </CardTitle>
              <CardDescription>Report employee benefits</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('vat1')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Receipt className="h-5 w-5" />
                <span>VAT Registration (VAT1)</span>
              </CardTitle>
              <CardDescription>Register for VAT</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubTabClick('vat2')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Receipt className="h-5 w-5" />
                <span>VAT Group Registration (VAT2)</span>
              </CardTitle>
              <CardDescription>Register VAT group</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  const renderAICompanySecretary = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-6 w-6" />
              <span>AI Company Secretary Assistant</span>
            </CardTitle>
            <CardDescription>Get intelligent assistance with company secretarial matters</CardDescription>
          </CardHeader>
          <CardContent>
            <AIPromptSection
              title="Company Secretarial AI Assistant"
              description="Ask questions about company filings, compliance requirements, or get help with form completion."
              placeholder="Ask about company filings, deadlines, or compliance requirements..."
              onSubmit={handleAIQuestion}
              isLoading={isAILoading}
              recentQuestions={[
                "What forms do I need to file for a new director appointment?",
                "When is my next confirmation statement due?",
                "How do I change my company's registered office address?",
                "What are the requirements for PSC notifications?",
                "Help me understand corporation tax filing deadlines"
              ]}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common company secretarial tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Register New Company
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Appoint Director
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                File Confirmation Statement
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Change Registered Address
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Calendar</CardTitle>
              <CardDescription>Upcoming deadlines and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Overdue Filing</span>
                  </div>
                  <span className="text-xs text-red-600">2 days overdue</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">CS01 Due</span>
                  </div>
                  <span className="text-xs text-orange-600">Due in 5 days</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Annual Return</span>
                  </div>
                  <span className="text-xs text-blue-600">Due in 2 weeks</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Secretarial</h2>
            <nav className="space-y-2">
              {Object.entries(menuStructure).map(([key, config]) => (
                <div key={key}>
                  <button
                    onClick={() => handleMainTabClick(key)}
                    className={`w-full flex items-center px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                      activeMainTab === key
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
                    }`}
                  >
                    <config.icon className="mr-3 h-4 w-4" />
                    {config.label}
                  </button>
                  
                  {config.hasSubTabs && activeMainTab === key && (
                    <div className="ml-6 mt-2 space-y-1">
                      {Object.entries(config.subTabs || {}).map(([subKey, subConfig]) => (
                        <button
                          key={subKey}
                          onClick={() => handleSubTabClick(subKey)}
                          className={`w-full flex items-center px-3 py-2 m-0.5 text-xs rounded-lg transition-all duration-200 shadow-sm ${
                            activeSubTab === subKey
                              ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-l-2 border-orange-300 shadow-md font-semibold'
                              : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
                          }`}
                        >
                          <subConfig.icon className="mr-2 h-3 w-3" />
                          {subConfig.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderMainContent()}
        </div>
      </div>
    </div>
  )
}
