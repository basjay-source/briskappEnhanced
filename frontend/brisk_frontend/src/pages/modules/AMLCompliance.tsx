import { 
  FileText, 
  Users, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  AlertCircle,
  Target,
  Activity,
  BarChart3,
  ChevronLeft
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Progress } from '../../components/ui/progress'
import { useIsMobile } from '../../hooks/use-mobile'
import KPICard from '../../components/KPICard'
import ResponsiveLayout from '../../components/ResponsiveLayout'
import AIPromptSection from '../../components/AIPromptSection'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'

export default function AMLCompliance() {
  const isMobile = useIsMobile()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['risk'])
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('')
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('all')

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

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      hasSubTabs: false
    },
    {
      id: 'risk',
      label: 'Risk Assessment',
      icon: AlertCircle,
      hasSubTabs: true,
      subTabs: [
        { id: 'client-risk', label: 'Client Risk Profiling' },
        { id: 'transaction-risk', label: 'Transaction Monitoring' },
        { id: 'country-risk', label: 'Country Risk Assessment' },
        { id: 'risk-reports', label: 'Risk Reports' }
      ]
    },
    {
      id: 'kyc',
      label: 'KYC & IDV',
      icon: Users,
      hasSubTabs: true,
      subTabs: [
        { id: 'customer-dd', label: 'Customer Due Diligence' },
        { id: 'enhanced-dd', label: 'Enhanced Due Diligence' },
        { id: 'identity-verification', label: 'Identity Verification' },
        { id: 'document-management', label: 'Document Management' }
      ]
    },
    {
      id: 'monitoring',
      label: 'Transaction Monitoring',
      icon: Activity,
      hasSubTabs: true,
      subTabs: [
        { id: 'real-time', label: 'Real-time Monitoring' },
        { id: 'suspicious-activity', label: 'Suspicious Activity' },
        { id: 'alerts', label: 'Alert Management' },
        { id: 'case-management', label: 'Case Management' }
      ]
    },
    {
      id: 'reporting',
      label: 'Regulatory Reporting',
      icon: FileText,
      hasSubTabs: true,
      subTabs: [
        { id: 'sar', label: 'Suspicious Activity Reports' },
        { id: 'ctr', label: 'Currency Transaction Reports' },
        { id: 'compliance-reports', label: 'Compliance Reports' },
        { id: 'audit-trail', label: 'Audit Trail' }
      ]
    },
    {
      id: 'training',
      label: 'Training & Awareness',
      icon: Target,
      hasSubTabs: true,
      subTabs: [
        { id: 'staff-training', label: 'Staff Training' },
        { id: 'compliance-updates', label: 'Compliance Updates' },
        { id: 'certification', label: 'Certification Management' },
        { id: 'knowledge-base', label: 'Knowledge Base' }
      ]
    }
  ]

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleMainTabClick = (tabId: string) => {
    setActiveMainTab(tabId)
    setActiveSubTab('')
    
    const category = menuStructure.find(cat => cat.id === tabId)
    if (category?.hasSubTabs && !expandedCategories.includes(tabId)) {
      toggleCategory(tabId)
    }
  }

  const handleSubTabClick = (subTabId: string) => {
    setActiveSubTab(subTabId)
  }

  function renderHorizontalSubmenus() {
    const currentTabConfig = menuStructure.find(item => item.id === activeMainTab)
    if (!currentTabConfig || !currentTabConfig.hasSubTabs || !currentTabConfig.subTabs) {
      return null
    }
    
    return (
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div className="flex flex-wrap gap-2">
          {currentTabConfig.subTabs.map((subTab) => {
            const isSubActive = activeSubTab === subTab.id
            
            return (
              <button
                key={subTab.id}
                onClick={() => handleSubTabClick(subTab.id)}
                className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                  isSubActive 
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md font-semibold' 
                    : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
                }`}
              >
                <span>{subTab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const riskLevelOptions = [
    { label: 'All Risk Levels', value: 'all' },
    { label: 'Low Risk', value: 'low' },
    { label: 'Medium Risk', value: 'medium' },
    { label: 'High Risk', value: 'high' },
    { label: 'Critical Risk', value: 'critical' }
  ]

  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Pending Review', value: 'pending' },
    { label: 'Under Investigation', value: 'investigating' },
    { label: 'Completed', value: 'completed' },
    { label: 'Escalated', value: 'escalated' }
  ]

  const jurisdictionOptions = [
    { label: 'All Jurisdictions', value: 'all' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'European Union', value: 'eu' },
    { label: 'United States', value: 'us' },
    { label: 'Other', value: 'other' }
  ]

  const kpis = [
    {
      title: 'Active Cases',
      value: '23',
      change: '+3 this week',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'High Risk Clients',
      value: '6',
      change: '2 new this month',
      icon: AlertCircle,
      color: 'text-red-600'
    },
    {
      title: 'Completed KYC',
      value: '156',
      change: '+12 this week',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Compliance Score',
      value: '96%',
      change: '+2% vs last month',
      icon: Shield,
      color: 'text-green-600'
    }
  ]

  const renderMainContent = () => {
    if (activeMainTab === 'dashboard') {
      return (
        <div className="space-y-6">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            {kpis.map((kpi, index) => {
              const Icon = kpi.icon
              const drillDownData = {
                title: `${kpi.title} Analysis`,
                description: `Detailed AML compliance analysis and breakdown for ${kpi.title.toLowerCase()}`,
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
                        <p className="text-sm text-gray-600">AML regulatory compliance</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs">
                            <span>Overall Score</span>
                            <span className="text-green-600">96%</span>
                          </div>
                          <Progress value={96} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    {kpi.title === 'Active Cases' && (
                      <div>
                        <h4 className="font-semibold mb-3">Case Risk Profile</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between p-2 border rounded">
                            <span>Low Risk</span>
                            <span className="font-semibold">15 cases (65%)</span>
                          </div>
                          <div className="flex justify-between p-2 border rounded">
                            <span>Medium Risk</span>
                            <span className="font-semibold">6 cases (26%)</span>
                          </div>
                          <div className="flex justify-between p-2 border rounded">
                            <span>High Risk</span>
                            <span className="font-semibold">2 cases (9%)</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline">Export Compliance Report</Button>
                      <Button>Generate SAR</Button>
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

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-900">High Risk Transaction</p>
                      <p className="text-sm text-red-700">Client ABC Ltd - £50,000 cash deposit</p>
                    </div>
                    <Badge variant="destructive">Urgent</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-orange-900">KYC Update Required</p>
                      <p className="text-sm text-orange-700">XYZ Corp - Annual review due</p>
                    </div>
                    <Badge variant="secondary">Review</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Compliance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Risk Assessment Completion</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>KYC Documentation</span>
                      <span className="font-semibold">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Training Compliance</span>
                      <span className="font-semibold">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">Content Coming Soon</h3>
        <p className="text-gray-600">This section is under development</p>
      </div>
    )
  }

  return (
    <ResponsiveLayout>
      <div className="flex min-h-screen bg-blue-50">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">AML Compliance</h1>
            <p className="text-sm text-gray-600 mt-1">Anti-Money Laundering & KYC</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {menuStructure.map((item) => {
                const Icon = item.icon
                const isActive = activeMainTab === item.id
                const isExpanded = expandedCategories.includes(item.id)
                
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => handleMainTabClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold' 
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-2" />
                        <span>{item.label}</span>
                      </div>
                      {item.hasSubTabs && (
                        <ChevronLeft className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      )}
                    </button>
                    
                  </div>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <SearchFilterHeader
              searchPlaceholder="Search clients, cases, or transactions..."
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              filters={[
                {
                  label: "Risk Level",
                  options: riskLevelOptions,
                  value: selectedRiskLevel,
                  onChange: setSelectedRiskLevel
                },
                {
                  label: "Status",
                  options: statusOptions,
                  value: selectedStatus,
                  onChange: setSelectedStatus
                },
                {
                  label: "Jurisdiction",
                  options: jurisdictionOptions,
                  value: selectedJurisdiction,
                  onChange: setSelectedJurisdiction
                }
              ]}
            />
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {renderHorizontalSubmenus()}
            {renderMainContent()}
          </div>
        </div>
      </div>
      
      <AIPromptSection
        title="Ask your AML Compliance Adviser"
        description="Get expert guidance on anti-money laundering and compliance matters"
        placeholder="Ask about risk assessments, KYC procedures, regulatory requirements..."
        isLoading={isAILoading}
        onSubmit={handleAIQuestion}
        recentQuestions={[
          "What are the latest AML regulatory updates?",
          "How do I conduct enhanced due diligence?",
          "What triggers a suspicious activity report?"
        ]}
      />
    </ResponsiveLayout>
  )
}
