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
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import CompaniesHouseLogo from '../../components/CompaniesHouseLogo'
import HMRCLogo from '../../components/HMRCLogo'
import AIPromptSection from '../../components/AIPromptSection'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'

export default function CompanySecretarial() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
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
    return (
      <div className="space-y-6">
        <div className="bg-[#003078] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <CompaniesHouseLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Application to register a company (IN01)</h2>
              <p className="text-blue-100">Register a new company with Companies House</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
            <CardDescription>Enter the basic information about your new company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Proposed company name</Label>
                <Input id="companyName" placeholder="Enter company name" />
              </div>
              <div>
                <Label htmlFor="companyType">Company type</Label>
                <Select>
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
              <Textarea id="registeredOffice" placeholder="Enter full registered office address" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shareCapital">Share capital</Label>
                <Input id="shareCapital" placeholder="£100" />
              </div>
              <div>
                <Label htmlFor="shareClass">Share class</Label>
                <Select>
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

            <div className="flex space-x-4">
              <Button className="bg-[#003078] hover:bg-[#002060]">Save Draft</Button>
              <Button variant="outline">Submit Application</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderAA01Form = () => {
    return (
      <div className="space-y-6">
        <div className="bg-[#003078] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <CompaniesHouseLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Annual Accounts (AA01)</h2>
              <p className="text-blue-100">Submit annual accounts to Companies House</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Upload and submit your annual accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountsType">Accounts type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accounts type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full accounts</SelectItem>
                    <SelectItem value="abbreviated">Abbreviated accounts</SelectItem>
                    <SelectItem value="micro">Micro-entity accounts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="periodEnd">Period end date</Label>
                <Input id="periodEnd" type="date" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="turnover">Turnover</Label>
                <Input id="turnover" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="profit">Profit/Loss</Label>
                <Input id="profit" placeholder="£0" />
              </div>
            </div>

            <div>
              <Label htmlFor="accountsFile">Upload accounts file</Label>
              <Input id="accountsFile" type="file" accept=".pdf,.doc,.docx" />
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#003078] hover:bg-[#002060]">Save Draft</Button>
              <Button variant="outline">Submit Accounts</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderAR01Form = () => {
    return (
      <div className="space-y-6">
        <div className="bg-[#003078] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <CompaniesHouseLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Annual Return (AR01)</h2>
              <p className="text-blue-100">Submit your company's annual return</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Annual Return Details</CardTitle>
            <CardDescription>Confirm your company details for the annual return</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="returnDate">Return date</Label>
                <Input id="returnDate" type="date" />
              </div>
              <div>
                <Label htmlFor="registeredOfficeChanged">Registered office changed?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="principalActivity">Principal business activity</Label>
              <Textarea id="principalActivity" placeholder="Describe your main business activity" />
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#003078] hover:bg-[#002060]">Save Draft</Button>
              <Button variant="outline">Submit Return</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderTM01Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Termination Details</CardTitle>
            <CardDescription>Enter details of the termination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="personType">Person type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="director">Director</SelectItem>
                    <SelectItem value="secretary">Secretary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="terminationDate">Date of termination</Label>
                <Input id="terminationDate" type="date" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="personName">Full name</Label>
                <Input id="personName" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="reasonTermination">Reason for termination</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resignation">Resignation</SelectItem>
                    <SelectItem value="removal">Removal</SelectItem>
                    <SelectItem value="death">Death</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#003078] hover:bg-[#002060]">Save Draft</Button>
              <Button variant="outline">Submit Termination</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderCH01Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Secretary Details</CardTitle>
            <CardDescription>Enter details of the new secretary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="secretaryType">Secretary type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="appointmentDate">Date of appointment</Label>
                <Input id="appointmentDate" type="date" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="secretaryName">Full name/Company name</Label>
                <Input id="secretaryName" placeholder="Enter name" />
              </div>
              <div>
                <Label htmlFor="secretaryTitle">Title (if individual)</Label>
                <Input id="secretaryTitle" placeholder="Mr/Mrs/Ms/Dr" />
              </div>
            </div>

            <div>
              <Label htmlFor="serviceAddress">Service address</Label>
              <Textarea id="serviceAddress" placeholder="Enter service address" />
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#003078] hover:bg-[#002060]">Save Draft</Button>
              <Button variant="outline">Submit Appointment</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderPSC01Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>PSC Details</CardTitle>
            <CardDescription>Enter details of the person with significant control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pscType">PSC type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporate">Corporate entity</SelectItem>
                    <SelectItem value="legal">Legal entity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notificationDate">Date became PSC</Label>
                <Input id="notificationDate" type="date" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pscName">Full name</Label>
                <Input id="pscName" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="pscNationality">Nationality</Label>
                <Input id="pscNationality" placeholder="Enter nationality" />
              </div>
            </div>

            <div>
              <Label htmlFor="natureOfControl">Nature of control</Label>
              <Textarea id="natureOfControl" placeholder="Describe the nature of control" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sharesHeld">Shares held (%)</Label>
                <Input id="sharesHeld" placeholder="25%" />
              </div>
              <div>
                <Label htmlFor="votingRights">Voting rights (%)</Label>
                <Input id="votingRights" placeholder="25%" />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#003078] hover:bg-[#002060]">Save Draft</Button>
              <Button variant="outline">Submit Notification</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderAD01Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Address Change Details</CardTitle>
            <CardDescription>Enter the new registered office address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentAddress">Current registered office address</Label>
              <Textarea id="currentAddress" placeholder="Current address" readOnly />
            </div>

            <div>
              <Label htmlFor="newAddress">New registered office address</Label>
              <Textarea id="newAddress" placeholder="Enter new registered office address" />
            </div>

            <div>
              <Label htmlFor="changeDate">Date of change</Label>
              <Input id="changeDate" type="date" />
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#003078] hover:bg-[#002060]">Save Draft</Button>
              <Button variant="outline">Submit Change</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderNM01Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Name Change Details</CardTitle>
            <CardDescription>Enter the new company name</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentName">Current company name</Label>
              <Input id="currentName" placeholder="Current name" readOnly />
            </div>

            <div>
              <Label htmlFor="newName">New company name</Label>
              <Input id="newName" placeholder="Enter new company name" />
            </div>

            <div>
              <Label htmlFor="resolutionDate">Date of resolution</Label>
              <Input id="resolutionDate" type="date" />
            </div>

            <div>
              <Label htmlFor="resolutionType">Type of resolution</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select resolution type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="special">Special resolution</SelectItem>
                  <SelectItem value="ordinary">Ordinary resolution</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#003078] hover:bg-[#002060]">Save Draft</Button>
              <Button variant="outline">Submit Change</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSA100Form = () => {
    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Self Assessment tax return (SA100)</h2>
              <p className="text-green-100">Complete your annual Self Assessment return</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>Enter your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="utr">Unique Taxpayer Reference (UTR)</Label>
                <Input id="utr" placeholder="1234567890" />
              </div>
              <div>
                <Label htmlFor="taxYear">Tax year</Label>
                <Select>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalIncome">Total income</Label>
                <Input id="totalIncome" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="taxDue">Tax due</Label>
                <Input id="taxDue" placeholder="£0" readOnly />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Return</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderCT600Form = () => {
    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Company Tax Return (CT600)</h2>
              <p className="text-green-100">Submit your corporation tax return</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
            <CardDescription>Enter your company tax information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyUTR">Company UTR</Label>
                <Input id="companyUTR" placeholder="1234567890" />
              </div>
              <div>
                <Label htmlFor="accountingPeriod">Accounting period end</Label>
                <Input id="accountingPeriod" type="date" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalProfit">Total profits</Label>
                <Input id="totalProfit" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="corporationTax">Corporation tax</Label>
                <Input id="corporationTax" placeholder="£0" readOnly />
              </div>
            </div>

            <div>
              <Label htmlFor="computationFile">Upload tax computation</Label>
              <Input id="computationFile" type="file" accept=".pdf,.doc,.docx" />
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Return</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderP11DForm = () => {
    return (
      <div className="space-y-6">
        <div className="bg-[#00703c] text-white p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <HMRCLogo className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Expenses and benefits annual return (P11D)</h2>
              <p className="text-green-100">Report expenses and benefits provided to employees</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Benefits</CardTitle>
            <CardDescription>Enter details of benefits provided to employees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employeeName">Employee name</Label>
                <Input id="employeeName" placeholder="Enter employee name" />
              </div>
              <div>
                <Label htmlFor="employeeNI">National Insurance number</Label>
                <Input id="employeeNI" placeholder="AB123456C" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="carBenefit">Company car benefit</Label>
                <Input id="carBenefit" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="medicalBenefit">Medical insurance</Label>
                <Input id="medicalBenefit" placeholder="£0" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lunchVouchers">Lunch vouchers</Label>
                <Input id="lunchVouchers" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="otherBenefits">Other benefits</Label>
                <Input id="otherBenefits" placeholder="£0" />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Add Another Employee</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSA102Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
            <CardDescription>Enter your employment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employerName">Employer name</Label>
                <Input id="employerName" placeholder="Enter employer name" />
              </div>
              <div>
                <Label htmlFor="payrollNumber">Payroll number</Label>
                <Input id="payrollNumber" placeholder="Enter payroll number" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grossPay">Gross pay</Label>
                <Input id="grossPay" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="taxDeducted">Tax deducted</Label>
                <Input id="taxDeducted" placeholder="£0" />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Form</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSA103SForm = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
            <CardDescription>Enter your self-employment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business name</Label>
                <Input id="businessName" placeholder="Enter business name" />
              </div>
              <div>
                <Label htmlFor="businessDescription">Business description</Label>
                <Input id="businessDescription" placeholder="Describe your business" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="turnover">Turnover</Label>
                <Input id="turnover" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="expenses">Total expenses</Label>
                <Input id="expenses" placeholder="£0" />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Form</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSA104SForm = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Partnership Details</CardTitle>
            <CardDescription>Enter your partnership information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="partnershipName">Partnership name</Label>
                <Input id="partnershipName" placeholder="Enter partnership name" />
              </div>
              <div>
                <Label htmlFor="partnershipUTR">Partnership UTR</Label>
                <Input id="partnershipUTR" placeholder="1234567890" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shareOfProfit">Share of profit</Label>
                <Input id="shareOfProfit" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="shareOfLoss">Share of loss</Label>
                <Input id="shareOfLoss" placeholder="£0" />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Form</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSA105Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Enter your UK property information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyIncome">Total property income</Label>
                <Input id="propertyIncome" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="propertyExpenses">Total property expenses</Label>
                <Input id="propertyExpenses" placeholder="£0" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mortgageInterest">Mortgage interest</Label>
                <Input id="mortgageInterest" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="otherExpenses">Other allowable expenses</Label>
                <Input id="otherExpenses" placeholder="£0" />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Form</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSA106Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Foreign Income Details</CardTitle>
            <CardDescription>Enter your foreign income information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="foreignIncome">Foreign income</Label>
                <Input id="foreignIncome" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="foreignTax">Foreign tax paid</Label>
                <Input id="foreignTax" placeholder="£0" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="countryCode">Country code</Label>
                <Input id="countryCode" placeholder="Enter country code" />
              </div>
              <div>
                <Label htmlFor="specialWithholding">Special withholding tax</Label>
                <Input id="specialWithholding" placeholder="£0" />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Form</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSA108Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Capital Gains Details</CardTitle>
            <CardDescription>Enter your capital gains information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalGains">Total gains</Label>
                <Input id="totalGains" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="totalLosses">Total losses</Label>
                <Input id="totalLosses" placeholder="£0" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="annualExemption">Annual exemption</Label>
                <Input id="annualExemption" placeholder="£12,300" readOnly />
              </div>
              <div>
                <Label htmlFor="taxableGains">Taxable gains</Label>
                <Input id="taxableGains" placeholder="£0" readOnly />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Form</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSA109Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Residence Details</CardTitle>
            <CardDescription>Enter your residence information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="residenceStatus">Residence status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uk-resident">UK resident</SelectItem>
                    <SelectItem value="non-uk-resident">Non-UK resident</SelectItem>
                    <SelectItem value="split-year">Split year treatment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="remittanceBasis">Claiming remittance basis?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Form</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderCIS300Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>CIS Return Details</CardTitle>
            <CardDescription>Enter your CIS monthly return information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="returnPeriod">Return period</Label>
                <Input id="returnPeriod" type="month" />
              </div>
              <div>
                <Label htmlFor="totalPayments">Total payments to subcontractors</Label>
                <Input id="totalPayments" placeholder="£0" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalDeductions">Total deductions made</Label>
                <Input id="totalDeductions" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="costOfMaterials">Cost of materials</Label>
                <Input id="costOfMaterials" placeholder="£0" />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Return</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderP35Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Annual Return Details</CardTitle>
            <CardDescription>Enter your end of year return information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="taxYear">Tax year</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tax year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-24">2023-24</SelectItem>
                    <SelectItem value="2022-23">2022-23</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="employeeCount">Number of employees</Label>
                <Input id="employeeCount" placeholder="0" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalPAYE">Total PAYE tax</Label>
                <Input id="totalPAYE" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="totalNI">Total National Insurance</Label>
                <Input id="totalNI" placeholder="£0" />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Return</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderVAT1Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>VAT Registration Details</CardTitle>
            <CardDescription>Enter your VAT registration information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business name</Label>
                <Input id="businessName" placeholder="Enter business name" />
              </div>
              <div>
                <Label htmlFor="tradingName">Trading name</Label>
                <Input id="tradingName" placeholder="Enter trading name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectedTurnover">Expected annual turnover</Label>
                <Input id="expectedTurnover" placeholder="£0" />
              </div>
              <div>
                <Label htmlFor="registrationReason">Reason for registration</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="liable">Liable to register</SelectItem>
                    <SelectItem value="voluntary">Voluntary registration</SelectItem>
                    <SelectItem value="intending">Intending trader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Application</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderVAT2Form = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>VAT Group Registration</CardTitle>
            <CardDescription>Enter VAT group registration details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="representativeMember">Representative member</Label>
                <Input id="representativeMember" placeholder="Enter company name" />
              </div>
              <div>
                <Label htmlFor="groupName">Group name</Label>
                <Input id="groupName" placeholder="Enter group name" />
              </div>
            </div>

            <div>
              <Label htmlFor="memberCompanies">Member companies</Label>
              <Textarea id="memberCompanies" placeholder="List all companies to be included in the group" />
            </div>

            <div className="flex space-x-4">
              <Button className="bg-[#00703c] hover:bg-[#005a32]">Save Draft</Button>
              <Button variant="outline">Submit Application</Button>
            </div>
          </CardContent>
        </Card>
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
                <span>Benefits & Expenses (P11D)</span>
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
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeMainTab === key
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
                          className={`w-full flex items-center px-3 py-2 text-xs rounded-md transition-colors ${
                            activeSubTab === subKey
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
