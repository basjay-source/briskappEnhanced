import React, { useState } from 'react'
import { 
  Building2, FileText, Calculator, Upload, Eye, BarChart3,
  Plus, Send, FileSpreadsheet, CheckCircle, ChevronDown, Settings, FileCheck
} from 'lucide-react'
import ResponsiveLayout from '../../components/ResponsiveLayout'
import AIPromptSection from '@/components/AIPromptSection'
import KPICard from '@/components/KPICard'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'

interface Client {
  id: string
  name: string
  type: 'sole-trader' | 'partnership' | 'limited-company' | 'llp' | 'charity' | 'academy' | 'cic'
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

const AccountsProduction: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isAILoading, setIsAILoading] = useState(false)

  const [clients] = useState<Client[]>([
    {
      id: '1', name: 'Acme Trading Ltd', type: 'limited-company',
      registrationNumber: '12345678', yearEnd: '2024-12-31',
      accountsStatus: 'in-progress', lastAccounts: '2023-12-31',
      nextDue: '2025-09-30', frsStandard: 'FRS 102',
      contactPerson: 'John Smith', email: 'john@acmetrading.com',
      phone: '020 7123 4567'
    },
    {
      id: '2', name: 'Green & Partners LLP', type: 'llp',
      registrationNumber: 'OC234567', yearEnd: '2024-03-31',
      accountsStatus: 'review', lastAccounts: '2024-03-31',
      nextDue: '2025-01-31', frsStandard: 'FRS 102',
      contactPerson: 'Sarah Green', email: 'sarah@greenpartners.com',
      phone: '020 7234 5678'
    }
  ])

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
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, hasSubTabs: false },
    {
      id: 'clients', label: 'Client Management', icon: Building2, hasSubTabs: true,
      subTabs: {
        'client-list': { label: 'Client List', icon: Building2 },
        'entity-setup': { label: 'Entity Setup', icon: Settings }
      }
    },
    {
      id: 'trial-balance', label: 'Trial Balance', icon: Calculator, hasSubTabs: true,
      subTabs: {
        'import': { label: 'Import TB', icon: Upload },
        'review': { label: 'Review & Adjust', icon: Eye }
      }
    },
    {
      id: 'accounts', label: 'Financial Statements', icon: FileSpreadsheet, hasSubTabs: true,
      subTabs: {
        'generate': { label: 'Generate Accounts', icon: FileSpreadsheet },
        'formats': { label: 'Account Formats', icon: FileCheck }
      }
    },
    {
      id: 'filing', label: 'Statutory Filing', icon: Send, hasSubTabs: true,
      subTabs: {
        'companies-house': { label: 'Companies House', icon: Building2 },
        'hmrc': { label: 'HMRC Filing', icon: FileCheck }
      }
    }
  ]

  const handleMainTabClick = (tabKey: string) => {
    setActiveMainTab(tabKey)
    const tabConfig = menuStructure.find(item => item.id === tabKey)
    if (tabConfig && tabConfig.hasSubTabs && tabConfig.subTabs) {
      const firstSubTab = Object.keys(tabConfig.subTabs)[0]
      setActiveSubTab(firstSubTab || '')
      setExpandedCategories([tabKey])
    } else {
      setActiveSubTab('')
      setExpandedCategories([])
    }
  }

  const handleSubTabClick = (subTab: string) => {
    setActiveSubTab(subTab)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'review': return 'secondary'
      case 'in-progress': return 'outline'
      case 'not-started': return 'destructive'
      default: return 'outline'
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#001f3f]">Accounts Production Dashboard</h2>
          <p className="text-[#001f3f]">Client accounts and production workflow</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />New Client</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard title="Total Clients" value={clients.length.toString()} 
          change="+3 this month" icon={Building2} color="text-blue-600" />
        <KPICard title="In Progress" 
          value={clients.filter(c => c.accountsStatus === 'in-progress').length.toString()} 
          change="Active" icon={FileText} color="text-orange-600" />
        <KPICard title="Review" 
          value={clients.filter(c => c.accountsStatus === 'review').length.toString()}
          change="Pending" icon={Eye} color="text-blue-600" />
        <KPICard title="Completed" 
          value={clients.filter(c => c.accountsStatus === 'completed').length.toString()}
          change="Ready" icon={CheckCircle} color="text-green-600" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Client Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-[#001f3f]">Client</TableHead>
              <TableHead className="text-[#001f3f]">Type</TableHead>
              <TableHead className="text-[#001f3f]">Year End</TableHead>
              <TableHead className="text-[#001f3f]">Status</TableHead>
              <TableHead className="text-[#001f3f]">Due Date</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {clients.map(client => (
                <TableRow key={client.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="text-[#001f3f] font-semibold">{client.name}</TableCell>
                  <TableCell className="text-[#001f3f]">{client.type}</TableCell>
                  <TableCell className="text-[#001f3f]">{client.yearEnd}</TableCell>
                  <TableCell><Badge variant={getStatusBadge(client.accountsStatus)}>{client.accountsStatus}</Badge></TableCell>
                  <TableCell className="text-[#001f3f]">{client.nextDue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderMainContent = () => {
    if (activeMainTab === 'dashboard') return renderDashboard()
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-[#001f3f] mb-4">
          {menuStructure.find(m => m.id === activeMainTab)?.label}
        </h3>
        <p className="text-[#001f3f]">Content implementation in progress...</p>
      </div>
    )
  }

  return (
    <ResponsiveLayout>
      <div className="flex h-full">
        <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="p-2">
            <nav className="space-y-0.5">
              {menuStructure.map((config) => {
                const Icon = config.icon
                const isExpanded = expandedCategories.includes(config.id)
                const isActive = activeMainTab === config.id
                return (
                  <div key={config.id}>
                    <button onClick={() => handleMainTabClick(config.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all shadow-sm ${
                        isActive && !config.hasSubTabs
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold'
                          : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 font-medium'
                      }`}>
                      <div className="flex items-center"><Icon className="h-4 w-4 mr-2" />{config.label}</div>
                      {config.hasSubTabs && <ChevronDown className={`h-4 w-4 ${isExpanded ? 'rotate-180' : ''}`} />}
                    </button>
                    {config.hasSubTabs && isExpanded && config.subTabs && (
                      <div className="ml-0.5 mt-0.5 space-y-0.5">
                        {Object.entries(config.subTabs).map(([subKey, subConfig]) => {
                          const isSubActive = activeSubTab === subKey
                          return (
                            <button key={subKey} onClick={() => handleSubTabClick(subKey)}
                              className={`w-full px-3 py-2 m-0.5 text-sm rounded-[2px] ${
                                isSubActive
                                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold'
                                  : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 font-medium'
                              }`}>
                              {subConfig.label}
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
            <div className="mt-8">
              <AIPromptSection title="Ask your Accountant"
                description="Get expert guidance on accounts production and compliance"
                placeholder="Ask about FRS standards, iXBRL tagging, Companies House filing..."
                isLoading={isAILoading} onSubmit={handleAIQuestion}
                recentQuestions={[
                  "How do I apply FRS 102 Section 1A?",
                  "What's required for Companies House filing?"
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  )
}

export default AccountsProduction
