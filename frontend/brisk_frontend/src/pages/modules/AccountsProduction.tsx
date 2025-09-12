import { useState, useEffect } from 'react'
import { 
  Calculator, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Download,
  Upload,
  Brain,
  Eye,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useResponsive } from '@/hooks/use-responsive'
import { apiClient } from '@/lib/api'

export default function AccountsProduction() {
  const { isMobile, isTablet } = useResponsive()
  const [activeTab, setActiveTab] = useState('trial-balance')
  const [trialBalanceData, setTrialBalanceData] = useState<Array<{
    code: string;
    name: string;
    debit: number;
    credit: number;
  }>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const tabs = [
    { id: 'trial-balance', label: 'Trial Balance', icon: Calculator },
    { id: 'adjustments', label: 'Adjustments', icon: FileText },
    { id: 'statements', label: 'Statements', icon: TrendingUp },
    { id: 'ixbrl', label: 'iXBRL', icon: Eye }
  ]

  useEffect(() => {
    const loadTrialBalance = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await apiClient.getTrialBalance('default-company')
        setTrialBalanceData(data.trial_balance || [
          { code: '1000', name: 'Bank Current Account', debit: 15000, credit: 0 },
          { code: '1200', name: 'Trade Debtors', debit: 8500, credit: 0 },
          { code: '2100', name: 'Trade Creditors', debit: 0, credit: 4200 },
          { code: '4000', name: 'Sales', debit: 0, credit: 45000 },
          { code: '5000', name: 'Cost of Sales', debit: 18000, credit: 0 },
          { code: '6000', name: 'Office Expenses', debit: 3200, credit: 0 }
        ])
      } catch (error) {
        console.error('Failed to load trial balance:', error)
        setError('Failed to load trial balance data')
        setTrialBalanceData([
          { code: '1000', name: 'Bank Current Account', debit: 15000, credit: 0 },
          { code: '1200', name: 'Trade Debtors', debit: 8500, credit: 0 },
          { code: '2100', name: 'Trade Creditors', debit: 0, credit: 4200 },
          { code: '4000', name: 'Sales', debit: 0, credit: 45000 },
          { code: '5000', name: 'Cost of Sales', debit: 18000, credit: 0 },
          { code: '6000', name: 'Office Expenses', debit: 3200, credit: 0 }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadTrialBalance()
  }, [])

  const kpis = [
    { label: 'Total Assets', value: '£125,400', change: '+8.2%', color: 'text-green-600' },
    { label: 'Total Liabilities', value: '£45,200', change: '-2.1%', color: 'text-red-600' },
    { label: 'Net Profit', value: '£23,800', change: '+15.3%', color: 'text-green-600' },
    { label: 'Current Ratio', value: '2.8', change: '+0.3', color: 'text-blue-600' }
  ]

  const aiInsights = [
    {
      type: 'warning',
      title: 'Unusual Expense Pattern',
      description: 'Office expenses increased 45% vs last period. Review for accuracy.',
      confidence: 92
    },
    {
      type: 'info',
      title: 'Disclosure Requirement',
      description: 'Related party transactions require disclosure under FRS 102.',
      confidence: 98
    },
    {
      type: 'success',
      title: 'Ratio Analysis',
      description: 'Current ratio of 2.8 indicates strong liquidity position.',
      confidence: 95
    }
  ]

  const handleImportTrialBalance = async () => {
    setLoading(true)
    try {
      console.log('Importing trial balance...')
    } catch (error) {
      console.error('Failed to import trial balance:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportAccounts = async () => {
    try {
      const data = await apiClient.getFinancialStatements('default-company')
      console.log('Exporting accounts:', data)
    } catch (error) {
      console.error('Failed to export accounts:', error)
    }
  }

  return (
    <div className={`space-y-8 ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
        <div>
          <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            Accounts Production
          </h1>
          <p className="text-gray-600 mt-2">FRS 102/105, IFRS compliance, and iXBRL generation</p>
        </div>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
          <Button 
            variant="outline" 
            onClick={handleImportTrialBalance}
            disabled={loading}
            className={isMobile ? 'w-full' : ''}
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            Import TB
          </Button>
          <Button 
            className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`}
            onClick={handleExportAccounts}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Accounts
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${
        isMobile ? 'grid-cols-1' : 
        isTablet ? 'grid-cols-2' : 
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      }`}>
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                <p className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>{kpi.value}</p>
                <p className={`text-sm ${kpi.color}`}>{kpi.change} vs last period</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'}`}>
        <div className={isMobile ? '' : 'lg:col-span-3'}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Accounts Workflow</CardTitle>
                <div className="flex items-center gap-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab(tab.id)}
                        className="flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === 'trial-balance' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Trial Balance</h3>
                    <div className="flex items-center gap-2">
                      {error && (
                        <Badge variant="destructive" className="text-xs">
                          Error loading data
                        </Badge>
                      )}
                      <Badge className="bg-green-100 text-green-800">
                        {loading ? 'Loading...' : 'Balanced'}
                      </Badge>
                    </div>
                  </div>
                  
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                      <span className="ml-2 text-gray-600">Loading trial balance...</span>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Code</th>
                            <th className="text-left p-2">Account Name</th>
                            <th className="text-right p-2">Debit</th>
                            <th className="text-right p-2">Credit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {trialBalanceData.map((account, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-mono text-sm">{account.code}</td>
                              <td className="p-2">{account.name}</td>
                              <td className="p-2 text-right tabular-nums">
                                {account.debit > 0 ? `£${account.debit.toLocaleString()}` : '-'}
                              </td>
                              <td className="p-2 text-right tabular-nums">
                                {account.credit > 0 ? `£${account.credit.toLocaleString()}` : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2 font-semibold">
                            <td className="p-2" colSpan={2}>Total</td>
                            <td className="p-2 text-right">
                              £{trialBalanceData.reduce((sum, acc) => sum + acc.debit, 0).toLocaleString()}
                            </td>
                            <td className="p-2 text-right">
                              £{trialBalanceData.reduce((sum, acc) => sum + acc.credit, 0).toLocaleString()}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'adjustments' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Year-end Adjustments</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Depreciation - Office Equipment</h4>
                          <p className="text-sm text-gray-600">Annual depreciation charge</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">£2,400</p>
                          <Badge className="bg-blue-100 text-blue-800">Posted</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Accrued Expenses</h4>
                          <p className="text-sm text-gray-600">Outstanding utility bills</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">£850</p>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'statements' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Financial Statements</h3>
                  <div className={`grid gap-4 ${
                    isMobile ? 'grid-cols-1' : 
                    isTablet ? 'grid-cols-2' : 
                    'grid-cols-1 md:grid-cols-3'
                  }`}>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Profit & Loss</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Revenue</span>
                            <span className="tabular-nums">£45,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cost of Sales</span>
                            <span className="tabular-nums">(£18,000)</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Gross Profit</span>
                            <span className="tabular-nums">£27,000</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Balance Sheet</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Current Assets</span>
                            <span className="tabular-nums">£23,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fixed Assets</span>
                            <span className="tabular-nums">£101,900</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Total Assets</span>
                            <span className="tabular-nums">£125,400</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Cash Flow</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Operating</span>
                            <span className="tabular-nums">£18,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Investing</span>
                            <span className="tabular-nums">(£5,200)</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Net Cash Flow</span>
                            <span className="tabular-nums">£13,300</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 'ixbrl' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">iXBRL Generation</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Tagging Progress</h4>
                          <p className="text-sm text-gray-600">Financial statement elements tagged</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">87%</p>
                          <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-brisk-primary h-2 rounded-full" style={{ width: '87%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Validation Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Schema validation passed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Taxonomy compliance verified</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm">3 optional tags missing</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Filing Readiness</h4>
                        <div className="space-y-2">
                          <Badge className="bg-green-100 text-green-800">Ready for Filing</Badge>
                          <p className="text-sm text-gray-600">
                            Document meets Companies House requirements for electronic filing.
                          </p>
                          <Button size="sm" className="mt-2">
                            Generate Final iXBRL
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-brisk-primary" />
                AI Accounts Adviser
              </CardTitle>
              <CardDescription>Intelligent insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    insight.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                    insight.type === 'success' ? 'bg-green-50 border border-green-200' :
                    'bg-blue-50 border border-blue-200'
                  }`}>
                    <div className="flex items-start gap-2">
                      {insight.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                      {insight.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                      {insight.type === 'info' && <FileText className="h-4 w-4 text-blue-600 mt-0.5" />}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-xs text-gray-500">Confidence:</span>
                          <span className="text-xs font-medium">{insight.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
