import { useState } from 'react'
import { 
  Calculator, 
  TrendingUp, 
  FileText, 
  Brain,
  AlertCircle,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function CorporationTax() {
  const [activeTab, setActiveTab] = useState('computation')

  const tabs = [
    { id: 'computation', label: 'CT Computation', icon: Calculator },
    { id: 'rd-claims', label: 'R&D Claims', icon: TrendingUp },
    { id: 'reliefs', label: 'Reliefs', icon: DollarSign },
    { id: 'filing', label: 'Filing', icon: FileText }
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
      title: 'R&D Relief Opportunity',
      description: 'Additional £12,000 in qualifying expenditure identified for R&D claims.',
      impact: '£3,600 tax saving',
      confidence: 94
    },
    {
      type: 'timing',
      title: 'Capital Allowances Timing',
      description: 'Consider accelerating equipment purchases to maximize AIA relief.',
      impact: '£4,200 potential saving',
      confidence: 87
    },
    {
      type: 'compliance',
      title: 'Filing Deadline Alert',
      description: 'CT600 due in 45 days. All supporting documentation ready.',
      impact: 'Avoid penalties',
      confidence: 99
    }
  ]

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Corporation Tax</h1>
          <p className="text-gray-600 mt-2">CT600 computations, R&D claims, and tax optimization</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            Import Accounts Data
          </Button>
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
            Generate CT600
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Taxable Profit</p>
              <p className="text-2xl font-bold">£{taxData.taxableProfit.toLocaleString()}</p>
              <p className="text-sm text-blue-600">+6.8% vs last year</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Corporation Tax</p>
              <p className="text-2xl font-bold">£{taxData.corporationTax.toLocaleString()}</p>
              <p className="text-sm text-red-600">19% rate applied</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">R&D Relief</p>
              <p className="text-2xl font-bold">£{taxData.rdRelief.toLocaleString()}</p>
              <p className="text-sm text-green-600">£4,500 tax saving</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Optimized Tax</p>
              <p className="text-2xl font-bold">£{taxData.optimizedTax.toLocaleString()}</p>
              <p className="text-sm text-green-600">£2,750 saved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Corporation Tax Workflow</CardTitle>
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
              {activeTab === 'computation' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">CT600 Computation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Profit Calculation</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Profit before tax</span>
                          <span className="tabular-nums">£{taxData.profitBeforeTax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Add: Disallowable expenses</span>
                          <span className="tabular-nums">£{taxData.adjustments.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-semibold">
                          <span>Taxable profit</span>
                          <span className="tabular-nums">£{taxData.taxableProfit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Tax Calculation</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Corporation tax @ 19%</span>
                          <span className="tabular-nums">£{taxData.corporationTax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Less: R&D relief</span>
                          <span className="tabular-nums">(£{(taxData.rdRelief * 0.19).toLocaleString()})</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-semibold">
                          <span>Corporation tax due</span>
                          <span className="tabular-nums">£{taxData.optimizedTax.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'rd-claims' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">R&D Claims</h3>
                    <Button size="sm">Add New Claim</Button>
                  </div>
                  <div className="space-y-4">
                    {rdClaims.map((claim, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{claim.project}</h4>
                            <p className="text-sm text-gray-600">
                              Expenditure: £{claim.expenditure.toLocaleString()} | 
                              Relief: £{claim.relief.toLocaleString()}
                            </p>
                          </div>
                          <Badge className={
                            claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                            claim.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {claim.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">R&D Relief Summary</h4>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-blue-700">Total Expenditure</p>
                        <p className="font-semibold text-blue-900">£105,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-700">Total Relief</p>
                        <p className="font-semibold text-blue-900">£31,500</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-700">Tax Saving</p>
                        <p className="font-semibold text-blue-900">£5,985</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reliefs' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Available Reliefs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Annual Investment Allowance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold">£1,000,000</p>
                          <p className="text-sm text-gray-600">Available allowance</p>
                          <p className="text-sm text-green-600">£45,000 claimed this year</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Patent Box Relief</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold">10%</p>
                          <p className="text-sm text-gray-600">Effective tax rate</p>
                          <p className="text-sm text-blue-600">Qualifying IP income</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 'filing' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Filing Status</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">CT600 Return</h4>
                          <p className="text-sm text-gray-600">Due: 31 March 2024</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                          <Button size="sm">Complete Filing</Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Tax Payment</h4>
                          <p className="text-sm text-gray-600">Amount: £22,615</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-red-100 text-red-800">Due</Badge>
                          <Button size="sm">Make Payment</Button>
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
                Tax Adviser
              </CardTitle>
              <CardDescription>AI-powered tax optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    rec.type === 'savings' ? 'bg-green-50 border border-green-200' :
                    rec.type === 'timing' ? 'bg-blue-50 border border-blue-200' :
                    'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <div className="flex items-start gap-2">
                      {rec.type === 'savings' && <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />}
                      {rec.type === 'timing' && <Calculator className="h-4 w-4 text-blue-600 mt-0.5" />}
                      {rec.type === 'compliance' && <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{rec.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                        <p className="text-xs font-medium text-green-600 mt-1">{rec.impact}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-xs text-gray-500">Confidence:</span>
                          <span className="text-xs font-medium">{rec.confidence}%</span>
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
