import { useState } from 'react'
import { 
  FileText, 
  Send, 
  Clock, 
  CheckCircle, 
  Settings, 
  BarChart3, 
  TrendingUp,
  ChevronLeft,
  PenTool,
  Shield,
  Zap
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Progress } from '../../components/ui/progress'
import { useIsMobile } from '../../hooks/use-mobile'
import KPICard from '../../components/KPICard'
import ResponsiveLayout from '../../components/ResponsiveLayout'
import AIPromptSection from '../../components/AIPromptSection'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'

export default function DocuSignage() {
  const isMobile = useIsMobile()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['envelopes'])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDocumentType, setSelectedDocumentType] = useState('all')
  const [selectedSignatureStatus, setSelectedSignatureStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [isAILoading, setIsAILoading] = useState(false)

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
      id: 'envelopes',
      label: 'Envelopes',
      icon: FileText,
      hasSubTabs: true,
      subTabs: [
        { id: 'sent', label: 'Sent Envelopes' },
        { id: 'drafts', label: 'Draft Envelopes' },
        { id: 'completed', label: 'Completed' },
        { id: 'expired', label: 'Expired' }
      ]
    },
    {
      id: 'signing',
      label: 'Signing Requests',
      icon: PenTool,
      hasSubTabs: true,
      subTabs: [
        { id: 'pending', label: 'Pending Signatures' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'completed-signing', label: 'Completed' },
        { id: 'declined', label: 'Declined' }
      ]
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: Settings,
      hasSubTabs: true,
      subTabs: [
        { id: 'document-templates', label: 'Document Templates' },
        { id: 'workflow-templates', label: 'Workflow Templates' },
        { id: 'signature-templates', label: 'Signature Templates' },
        { id: 'branding', label: 'Branding' }
      ]
    },
    {
      id: 'compliance',
      label: 'Compliance & Audit',
      icon: Shield,
      hasSubTabs: true,
      subTabs: [
        { id: 'audit-trail', label: 'Audit Trail' },
        { id: 'compliance-reports', label: 'Compliance Reports' },
        { id: 'certificate-validation', label: 'Certificate Validation' },
        { id: 'legal-holds', label: 'Legal Holds' }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      hasSubTabs: true,
      subTabs: [
        { id: 'usage-analytics', label: 'Usage Analytics' },
        { id: 'performance-metrics', label: 'Performance Metrics' },
        { id: 'user-activity', label: 'User Activity' },
        { id: 'cost-analysis', label: 'Cost Analysis' }
      ]
    },
    {
      id: 'automation',
      label: 'Automation',
      icon: Zap,
      hasSubTabs: true,
      subTabs: [
        { id: 'workflow-automation', label: 'Workflow Automation' },
        { id: 'bulk-operations', label: 'Bulk Operations' },
        { id: 'api-integrations', label: 'API Integrations' },
        { id: 'scheduled-tasks', label: 'Scheduled Tasks' }
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

  const kpis = [
    {
      title: 'Envelopes Sent',
      value: '1,247',
      change: '+18% this month',
      icon: Send,
      color: 'text-blue-600'
    },
    {
      title: 'Completion Rate',
      value: '94.2%',
      change: '+2.1% vs last month',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Avg. Completion Time',
      value: '2.3 days',
      change: '-0.5 days improvement',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Active Templates',
      value: '156',
      change: '+12 new this month',
      icon: FileText,
      color: 'text-purple-600'
    }
  ]

  const documentTypeOptions = [
    { label: 'All Document Types', value: 'all' },
    { label: 'Contracts', value: 'contracts' },
    { label: 'NDAs', value: 'ndas' },
    { label: 'Employment', value: 'employment' },
    { label: 'Financial', value: 'financial' }
  ]

  const signatureStatusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Declined', value: 'declined' }
  ]

  const priorityOptions = [
    { label: 'All Priorities', value: 'all' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' }
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
                description: `Detailed e-signature analysis and breakdown for ${kpi.title.toLowerCase()}`,
                content: (
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Current Status</h4>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        <p className={`text-sm ${kpi.color}`}>{kpi.change}</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Performance Score</h4>
                        <p className="text-sm text-gray-600">E-signature efficiency</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs">
                            <span>Overall Score</span>
                            <span className="text-green-600">94%</span>
                          </div>
                          <Progress value={94} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline">Export Report</Button>
                      <Button>Create Template</Button>
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
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">Contract Signed</p>
                      <p className="text-sm text-blue-700">Employment Agreement - John Smith</p>
                    </div>
                    <Badge variant="default">Completed</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-orange-900">Signature Pending</p>
                      <p className="text-sm text-orange-700">NDA - ABC Corp</p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion Rate</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Template Usage</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Adoption</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
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
      <div className="flex h-screen bg-blue-50">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">DocuSignage</h1>
            <p className="text-sm text-gray-600 mt-1">Digital Document Signing</p>
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
                    
                    {item.hasSubTabs && isExpanded && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.subTabs?.map((subTab) => {
                          const isSubActive = activeSubTab === subTab.id
                          return (
                            <button
                              key={subTab.id}
                              onClick={() => handleSubTabClick(subTab.id)}
                              className={`w-full flex items-center px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                                isSubActive 
                                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-l-2 border-orange-300 shadow-md font-semibold' 
                                  : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
                              }`}
                            >
                              <span>{subTab.label}</span>
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <SearchFilterHeader
              searchPlaceholder="Search envelopes, templates, or signers..."
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              filters={[
                {
                  label: "Document Type",
                  options: documentTypeOptions,
                  value: selectedDocumentType,
                  onChange: setSelectedDocumentType
                },
                {
                  label: "Status",
                  options: signatureStatusOptions,
                  value: selectedSignatureStatus,
                  onChange: setSelectedSignatureStatus
                },
                {
                  label: "Priority",
                  options: priorityOptions,
                  value: selectedPriority,
                  onChange: setSelectedPriority
                }
              ]}
            />
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {renderMainContent()}
          </div>
        </div>
      </div>
      
      <AIPromptSection
        title="Ask your DocuSignage Adviser"
        description="Get expert guidance on digital document signing and workflow automation"
        placeholder="Ask about signature workflows, compliance, template creation..."
        isLoading={isAILoading}
        onSubmit={handleAIQuestion}
        recentQuestions={[
          "How do I create a signature template?",
          "What are the compliance requirements for e-signatures?",
          "How can I automate document workflows?"
        ]}
      />
    </ResponsiveLayout>
  )
}
