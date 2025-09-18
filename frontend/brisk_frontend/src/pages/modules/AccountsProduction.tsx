import React, { useState } from 'react'
import { 
  FileText, 
  Calculator, 
  TrendingUp, 
  Download, 
  Upload, 
  Eye,
  BarChart3,
  Globe,
  ChevronLeft,
  Plus
} from 'lucide-react'
import ResponsiveLayout from '../../components/ResponsiveLayout'
import AIPromptSection from '@/components/AIPromptSection'
import KPICard from '@/components/KPICard'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

const AccountsProduction: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['dashboard'])
  const [isAILoading, setIsAILoading] = useState(false)

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      hasSubTabs: false
    },
    {
      id: 'accounts',
      label: 'Accounts Production',
      icon: FileText,
      hasSubTabs: true,
      subTabs: [
        { id: 'trial-balance', label: 'Trial Balance' },
        { id: 'adjustments', label: 'Adjustments' },
        { id: 'statements', label: 'Financial Statements' },
        { id: 'consolidation', label: 'Consolidation' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: TrendingUp,
      hasSubTabs: true,
      subTabs: [
        { id: 'financial-reports', label: 'Financial Reports' },
        { id: 'management-accounts', label: 'Management Accounts' },
        { id: 'analysis', label: 'Analysis' }
      ]
    },
    {
      id: 'ixbrl',
      label: 'iXBRL',
      icon: Globe,
      hasSubTabs: false
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
    const menuItem = menuStructure.find(item => item.id === tabId)
    if (menuItem?.hasSubTabs) {
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

  const handleAIQuestion = async (question: string) => {
    setIsAILoading(true)
    try {
      console.log('AI Question:', question)
      await new Promise(resolve => setTimeout(resolve, 2000))
    } finally {
      setIsAILoading(false)
    }
  }

  const kpis = [
    { label: 'Total Assets', value: '£208,500', change: '+12.5%', positive: true },
    { label: 'Total Liabilities', value: '£84,500', change: '-3.2%', positive: true },
    { label: 'Net Equity', value: '£124,000', change: '+18.7%', positive: true },
    { label: 'Working Capital', value: '£56,000', change: '+8.9%', positive: true }
  ]

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'dashboard':
        return renderDashboardContent()
      case 'trial-balance':
        return renderTrialBalanceContent()
      case 'adjustments':
        return renderAdjustmentsContent()
      case 'statements':
        return renderStatementsContent()
      case 'consolidation':
        return renderConsolidationContent()
      case 'financial-reports':
      case 'management-accounts':
      case 'analysis':
        return renderReportsContent()
      case 'ixbrl':
        return renderIXBRLContent()
      default:
        return renderDashboardContent()
    }
  }

  const renderDashboardContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.label}
            value={kpi.value}
            change={kpi.change}
            icon={Calculator}
            color={kpi.positive ? 'text-green-600' : 'text-red-600'}
            drillDownData={{
              title: `${kpi.label} Analysis`,
              description: `Detailed financial analysis for ${kpi.label.toLowerCase()}`,
              content: <div>Detailed analysis content for {kpi.label}</div>
            }}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest accounts production activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Trial Balance Updated</h3>
                <p className="text-sm text-gray-600">Client: ABC Ltd - Period: Dec 2024</p>
              </div>
              <Badge variant="default">Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Financial Statements Generated</h3>
                <p className="text-sm text-gray-600">Client: XYZ Corp - Period: Q4 2024</p>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTrialBalanceContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Trial Balance</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trial Balance Summary</CardTitle>
          <CardDescription>Current period trial balance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Total Debits</h3>
                <p className="text-2xl font-bold text-blue-600">£208,500</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Total Credits</h3>
                <p className="text-2xl font-bold text-green-600">£208,500</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Balance</h3>
                <p className="text-2xl font-bold text-gray-600">£0.00</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAdjustmentsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Adjustments</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Adjustment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Adjustment Entries</CardTitle>
          <CardDescription>Year-end and period adjustments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">No adjustments recorded for this period</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderStatementsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Financial Statements</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Generate Statements
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Balance Sheet</CardTitle>
            <CardDescription>Statement of financial position</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Balance Sheet
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit & Loss</CardTitle>
            <CardDescription>Income statement</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View P&L
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderConsolidationContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Consolidation</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Consolidation
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Group Consolidation</CardTitle>
          <CardDescription>Multi-entity financial consolidation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">No consolidation entities configured</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReportsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Financial Reports</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Management Accounts</CardTitle>
            <CardDescription>Monthly management reporting</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Analysis</CardTitle>
            <CardDescription>Ratio and trend analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Analysis
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Variance Reports</CardTitle>
            <CardDescription>Budget vs actual analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Variances
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderIXBRLContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">iXBRL Generation</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Generate iXBRL
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>iXBRL Documents</CardTitle>
          <CardDescription>Interactive XBRL document generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">No iXBRL documents generated</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ResponsiveLayout>
      <div className="flex min-h-screen bg-blue-50">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Accounts Production</h1>
            <p className="text-sm text-gray-600 mt-1">Financial Statement Preparation</p>
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
          <div className="flex-1 overflow-y-auto p-6">
            {renderHorizontalSubmenus()}
            {renderTabContent(activeSubTab || activeMainTab)}
          </div>
        </div>
      </div>
      
      <AIPromptSection
        title="Ask your Accountant"
        description="Get expert accounting and financial reporting guidance"
        placeholder="Ask about FRS 102 disclosures, going concern assessments, ratio analysis, or accounting standards..."
        recentQuestions={[
          "What disclosures are required under FRS 102?",
          "How should we handle going concern assessments?",
          "What are the key ratio analysis insights for this client?",
          "How do we account for lease modifications under FRS 102?",
          "What are the latest updates to accounting standards?"
        ]}
        onSubmit={handleAIQuestion}
        isLoading={isAILoading}
      />
    </ResponsiveLayout>
  )
}

export default AccountsProduction
