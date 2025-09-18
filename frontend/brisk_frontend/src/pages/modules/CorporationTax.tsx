import { useState } from 'react'
import { 
  Calculator, 
  TrendingUp, 
  FileText, 
  Brain,
  DollarSign,
  Building2,
  Shield,
  Zap,
  Target,
  BarChart3,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AIPromptSection from '../../components/AIPromptSection'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'

export default function CorporationTax() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['computation'])
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTaxYear, setSelectedTaxYear] = useState('2024')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
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

  const taxYearOptions = [
    { label: 'All Tax Years', value: 'all' },
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' }
  ]

  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'In Progress', value: 'progress' },
    { label: 'Submitted', value: 'submitted' },
    { label: 'Approved', value: 'approved' }
  ]

  const typeOptions = [
    { label: 'All Types', value: 'all' },
    { label: 'CT600', value: 'ct600' },
    { label: 'R&D Claims', value: 'rd' },
    { label: 'Reliefs', value: 'reliefs' },
    { label: 'Computations', value: 'computations' }
  ]

  const taxData = {
    profitBeforeTax: 125000,
    adjustments: 8500,
    taxableProfit: 133500,
    corporationTax: 25365,
    rdRelief: 15000,
    optimizedTax: 22615
  }

  const rdClaims = [
    {
      project: 'AI Algorithm Development',
      expenditure: 45000,
      relief: 13500,
      status: 'approved'
    },
    {
      project: 'Green Energy Research',
      expenditure: 32000,
      relief: 9600,
      status: 'pending'
    },
    {
      project: 'Software Innovation',
      expenditure: 28000,
      relief: 8400,
      status: 'draft'
    }
  ]

  const aiRecommendations = [
    {
      type: 'savings',
      title: 'R and D Relief Opportunity',
      description: 'Additional £12,000 in qualifying expenditure identified for R and D claims.',
      impact: '£3,600 tax saving',
      confidence: 94,
      action: 'Review software development costs for Q3-Q4'
    },
    {
      type: 'timing',
      title: 'Capital Allowances Timing',
      description: 'Consider accelerating equipment purchases to maximize AIA relief.',
      impact: '£4,200 potential saving',
      confidence: 87,
      action: 'Purchase planned equipment before year-end'
    },
    {
      type: 'compliance',
      title: 'Filing Deadline Alert',
      description: 'CT600 due in 45 days. All supporting documentation ready.',
      impact: 'Avoid penalties',
      confidence: 99,
      action: 'Schedule final review meeting'
    },
    {
      type: 'optimization',
      title: 'Group Relief Optimization',
      description: 'Brisk Services Ltd losses can offset £85,000 of current year profits.',
      impact: '£20,400 tax saving',
      confidence: 92,
      action: 'Submit group relief election'
    },
    {
      type: 'planning',
      title: 'Patent Box Eligibility',
      description: 'Recent IP development may qualify for 10% patent box rate.',
      impact: '£7,650 annual saving',
      confidence: 78,
      action: 'Assess patent application timeline'
    }
  ]

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      hasSubTabs: false
    },
    {
      id: 'computation',
      label: 'CT Computation',
      icon: Calculator,
      hasSubTabs: true,
      subTabs: [
        { id: 'ct600', label: 'CT600 Computation' },
        { id: 'adjustments', label: 'Tax Adjustments' },
        { id: 'schedules', label: 'Supporting Schedules' },
        { id: 'validation', label: 'Validation' }
      ]
    },
    {
      id: 'rd-claims',
      label: 'R&D Claims',
      icon: TrendingUp,
      hasSubTabs: true,
      subTabs: [
        { id: 'projects', label: 'R&D Projects' },
        { id: 'expenditure', label: 'Qualifying Expenditure' },
        { id: 'claims', label: 'Claims Management' },
        { id: 'submissions', label: 'HMRC Submissions' }
      ]
    },
    {
      id: 'reliefs',
      label: 'Reliefs & Credits',
      icon: DollarSign,
      hasSubTabs: true,
      subTabs: [
        { id: 'capital-allowances', label: 'Capital Allowances' },
        { id: 'patent-box', label: 'Patent Box' },
        { id: 'creative-relief', label: 'Creative Industry Relief' },
        { id: 'other-reliefs', label: 'Other Reliefs' }
      ]
    },
    {
      id: 'group-relief',
      label: 'Group Relief',
      icon: Building2,
      hasSubTabs: true,
      subTabs: [
        { id: 'elections', label: 'Group Elections' },
        { id: 'surrenders', label: 'Loss Surrenders' },
        { id: 'claims', label: 'Relief Claims' },
        { id: 'planning', label: 'Group Planning' }
      ]
    },
    {
      id: 'quarterly',
      label: 'Quarterly Payments',
      icon: Clock,
      hasSubTabs: true,
      subTabs: [
        { id: 'calculations', label: 'Payment Calculations' },
        { id: 'schedule', label: 'Payment Schedule' },
        { id: 'submissions', label: 'HMRC Submissions' },
        { id: 'reconciliation', label: 'Reconciliation' }
      ]
    },
    {
      id: 'filing',
      label: 'Filing',
      icon: FileText,
      hasSubTabs: true,
      subTabs: [
        { id: 'preparation', label: 'Return Preparation' },
        { id: 'validation', label: 'Pre-submission Checks' },
        { id: 'submission', label: 'HMRC Submission' },
        { id: 'tracking', label: 'Status Tracking' }
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

  function renderMainContent() {
    if (activeSubTab) {
      switch (activeSubTab) {
        case 'ct600': return renderCT600()
        case 'adjustments': return renderAdjustments()
        case 'schedules': return renderSchedules()
        case 'validation': return renderValidation()
        case 'projects': return renderRDClaims()
        case 'expenditure': return renderRDClaims()
        case 'claims': return renderRDClaims()
        case 'submissions': return renderRDClaims()
        default: return renderDashboard()
      }
    }

    switch (activeMainTab) {
      case 'computation': return renderCT600()
      case 'rd-claims': return renderRDClaims()
      case 'reliefs': return renderReliefs()
      case 'group-relief': return renderGroupRelief()
      case 'quarterly': return renderQuarterly()
      case 'filing': return renderFiling()
      default: return renderDashboard()
    }
  }

  function renderDashboard() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Corporation Tax Dashboard</h2>
            <p className="text-gray-600 mt-2">CT600 computations, R&D claims, and corporation tax planning</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export CT600
            </Button>
            <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
              <Calculator className="h-4 w-4 mr-2" />
              New Computation
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Corporation Tax Computation
              </CardTitle>
              <CardDescription>
                Automated CT600 computation with real-time calculations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Profit Before Tax</label>
                  <div className="text-2xl font-bold text-green-600">
                    £{taxData.profitBeforeTax.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tax Adjustments</label>
                  <div className="text-2xl font-bold text-blue-600">
                    £{taxData.adjustments.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Taxable Profit</label>
                  <div className="text-2xl font-bold text-gray-900">
                    £{taxData.taxableProfit.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Corporation Tax</label>
                  <div className="text-2xl font-bold text-red-600">
                    £{taxData.corporationTax.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">R&D Relief Applied</span>
                  <span className="text-green-600 font-bold">
                    -£{taxData.rdRelief.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t">
                  <span className="font-bold">Optimized Tax Liability</span>
                  <span className="text-2xl font-bold text-brisk-primary">
                    £{taxData.optimizedTax.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  View CT600
                </Button>
                <Button className="flex-1 bg-brisk-primary hover:bg-brisk-primary-600">
                  <Calculator className="h-4 w-4 mr-2" />
                  Recalculate
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                R&D Claims
              </CardTitle>
              <CardDescription>
                Research & Development relief claims
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rdClaims.map((claim, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{claim.project}</span>
                    <Badge variant={
                      claim.status === 'approved' ? 'default' : 
                      claim.status === 'pending' ? 'secondary' : 'outline'
                    }>
                      {claim.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Expenditure: £{claim.expenditure.toLocaleString()}</div>
                    <div>Relief: £{claim.relief.toLocaleString()}</div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                New R&D Claim
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Tax Recommendations
            </CardTitle>
            <CardDescription>
              Intelligent suggestions for tax optimization and compliance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {rec.type === 'savings' && <DollarSign className="h-4 w-4 text-green-600" />}
                    {rec.type === 'timing' && <Clock className="h-4 w-4 text-blue-600" />}
                    {rec.type === 'compliance' && <Shield className="h-4 w-4 text-orange-600" />}
                    {rec.type === 'optimization' && <Zap className="h-4 w-4 text-purple-600" />}
                    {rec.type === 'planning' && <Target className="h-4 w-4 text-indigo-600" />}
                    <span className="font-medium">{rec.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{rec.confidence}% confidence</Badge>
                    <Badge className="bg-green-100 text-green-800">{rec.impact}</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <p className="text-xs font-medium text-brisk-primary">{rec.action}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg border p-6">
          <AIPromptSection
            title="Corporation Tax AI Assistant"
            description="Get expert corporation tax guidance and optimization strategies"
            placeholder="Ask about CT600 computations, R&D claims, tax planning strategies..."
            recentQuestions={[
              "How can we optimize our corporation tax liability?",
              "What R&D expenditure qualifies for relief claims?",
              "When are quarterly instalment payments due?",
              "How can we optimize group relief structures?",
              "What are the latest corporation tax rates and allowances?",
              "When should we consider quarterly instalment payments?",
              "How can we maximize capital allowances claims?"
            ]}
            onSubmit={handleAIQuestion}
            isLoading={isAILoading}
          />
        </div>
      </div>
    )
  }

  function renderCT600() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">CT600 Computation</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">CT600 Computation</h3>
          </div>
          
          <SearchFilterHeader
            searchPlaceholder="Search tax computations, reliefs, R&D claims..."
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            filters={[
              {
                label: 'Tax Year',
                options: taxYearOptions,
                value: selectedTaxYear,
                onChange: setSelectedTaxYear
              },
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

          <Card>
            <CardHeader>
              <CardTitle>Corporation Tax Computation</CardTitle>
              <CardDescription>Automated CT600 computation with real-time calculations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Profit Before Tax</label>
                  <div className="text-2xl font-bold text-green-600">
                    £{taxData.profitBeforeTax.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tax Adjustments</label>
                  <div className="text-2xl font-bold text-blue-600">
                    £{taxData.adjustments.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Taxable Profit</label>
                  <div className="text-2xl font-bold text-gray-900">
                    £{taxData.taxableProfit.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Corporation Tax</label>
                  <div className="text-2xl font-bold text-red-600">
                    £{taxData.corporationTax.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderAdjustments() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Tax Adjustments</h2>
        <p className="text-gray-600">Manage corporation tax adjustments and corrections</p>
      </div>
    )
  }

  function renderSchedules() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Supporting Schedules</h2>
        <p className="text-gray-600">CT600 supporting schedules and computations</p>
      </div>
    )
  }

  function renderValidation() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Validation</h2>
        <p className="text-gray-600">Validate CT600 computation and check for errors</p>
      </div>
    )
  }

  function renderRDClaims() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">R&D Claims</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">R&D Claims Management</h3>
          </div>
          
          <SearchFilterHeader
            searchPlaceholder="Search R&D projects, claims, expenditure..."
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
                label: 'Tax Year',
                options: taxYearOptions,
                value: selectedTaxYear,
                onChange: setSelectedTaxYear
              }
            ]}
            dateRange={{
              from: dateFrom,
              to: dateTo,
              onFromChange: setDateFrom,
              onToChange: setDateTo
            }}
          />

          <div className="grid gap-4">
            {rdClaims.map((claim, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{claim.project}</h3>
                      <p className="text-sm text-gray-600">
                        Expenditure: £{claim.expenditure.toLocaleString()} | 
                        Relief: £{claim.relief.toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={
                      claim.status === 'approved' ? 'default' : 
                      claim.status === 'pending' ? 'secondary' : 'outline'
                    }>
                      {claim.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  function renderReliefs() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Reliefs & Credits</h2>
        <p className="text-gray-600">Manage corporation tax reliefs and credits</p>
      </div>
    )
  }

  function renderGroupRelief() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Group Relief</h2>
        <p className="text-gray-600">Group relief elections and surrenders</p>
      </div>
    )
  }

  function renderQuarterly() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Quarterly Payments</h2>
        <p className="text-gray-600">Quarterly instalment payments and planning</p>
      </div>
    )
  }

  function renderFiling() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Filing</h2>
        <p className="text-gray-600">CT600 filing and HMRC submissions</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-blue-50">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Corporation Tax</h1>
          <p className="text-sm text-gray-600">CT600 & R&D Claims</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          <nav className="space-y-1">
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
                      {item.label}
                    </div>
                    {item.hasSubTabs && (
                      <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                        ▶
                      </div>
                    )}
                  </button>
                  
                  {item.hasSubTabs && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
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
                            {subTab.label}
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
        </div>
      </div>
    </div>
  )
}
