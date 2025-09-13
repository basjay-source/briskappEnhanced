import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  FileText, 
  Calculator, 
  Settings, 
  BarChart3, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
} from 'lucide-react'
import { useResponsive } from '@/hooks/use-responsive'
import { apiClient } from '@/lib/api'

interface VATReturn {
  id: string
  period: string
  status: 'draft' | 'submitted' | 'overdue'
  dueDate: string
  totalVAT: number
  netSales: number
  vatOnSales: number
  vatOnPurchases: number
  submittedDate?: string
}

interface VATScheme {
  id: string
  name: string
  type: 'standard' | 'flat_rate' | 'cash_accounting'
  rate?: number
  description: string
  active: boolean
}

export default function VAT() {
  const { isMobile } = useResponsive()
  const [activeTab, setActiveTab] = useState('returns')
  const [vatReturns, setVatReturns] = useState<VATReturn[]>([])
  const [vatSchemes, setVatSchemes] = useState<VATScheme[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadVATData = async () => {
      try {
        const returnsData = await apiClient.getVATReturns()
        const schemesData = await apiClient.getVATSchemes()
        setVatReturns((returnsData as unknown as VATReturn[]) || mockVATReturns)
        setVatSchemes((schemesData as unknown as VATScheme[]) || mockVATSchemes)
      } catch (error) {
        console.error('Failed to load VAT data:', error)
        setVatReturns(mockVATReturns)
        setVatSchemes(mockVATSchemes)
      }
    }
    
    loadVATData()
  }, [])

  const mockVATReturns: VATReturn[] = [
    {
      id: '1',
      period: 'Q4 2024',
      status: 'submitted',
      dueDate: '2025-02-07',
      totalVAT: 12500.00,
      netSales: 62500.00,
      vatOnSales: 12500.00,
      vatOnPurchases: 8750.00,
      submittedDate: '2025-01-28'
    },
    {
      id: '2',
      period: 'Q1 2025',
      status: 'draft',
      dueDate: '2025-05-07',
      totalVAT: 8900.00,
      netSales: 44500.00,
      vatOnSales: 8900.00,
      vatOnPurchases: 6200.00
    },
    {
      id: '3',
      period: 'Q3 2024',
      status: 'overdue',
      dueDate: '2024-11-07',
      totalVAT: 15600.00,
      netSales: 78000.00,
      vatOnSales: 15600.00,
      vatOnPurchases: 10800.00
    }
  ]

  const mockVATSchemes: VATScheme[] = [
    {
      id: '1',
      name: 'Standard VAT',
      type: 'standard',
      description: 'Standard VAT scheme with 20% rate',
      active: true
    },
    {
      id: '2',
      name: 'Flat Rate Scheme',
      type: 'flat_rate',
      rate: 16.5,
      description: 'Simplified VAT scheme for small businesses',
      active: false
    },
    {
      id: '3',
      name: 'Cash Accounting',
      type: 'cash_accounting',
      description: 'VAT paid when money is received/paid',
      active: false
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'draft':
        return <Edit className="h-5 w-5 text-blue-500" />
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      submitted: 'default',
      draft: 'secondary',
      overdue: 'destructive'
    } as const
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const filteredReturns = vatReturns.filter(ret => 
    ret.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ret.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={`space-y-6 ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
        <div>
          <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            VAT Management
          </h1>
          <p className="text-gray-600 mt-2">Comprehensive VAT returns, schemes, and compliance management</p>
        </div>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
          <Button variant="outline" className={isMobile ? 'w-full' : ''}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`}>
            <Plus className="h-4 w-4 mr-2" />
            New VAT Return
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 h-auto' : 'grid-cols-4'}`}>
          <TabsTrigger value="returns" className={isMobile ? 'text-xs' : ''}>
            VAT Returns
          </TabsTrigger>
          <TabsTrigger value="schemes" className={isMobile ? 'text-xs' : ''}>
            VAT Schemes
          </TabsTrigger>
          <TabsTrigger value="analytics" className={isMobile ? 'text-xs' : ''}>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="compliance" className={isMobile ? 'text-xs' : ''}>
            Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="returns" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">VAT Returns</h2>
            <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search returns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredReturns.map((vatReturn) => (
              <Card key={vatReturn.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center justify-between'}`}>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(vatReturn.status)}
                      <div>
                        <CardTitle className="text-lg">VAT Return - {vatReturn.period}</CardTitle>
                        <CardDescription>Due: {vatReturn.dueDate}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(vatReturn.status)}
                      <span className="text-lg font-semibold">£{vatReturn.totalVAT.toLocaleString()}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} mb-4`}>
                    <div>
                      <Label className="text-sm text-gray-600">Net Sales</Label>
                      <p className="font-semibold">£{vatReturn.netSales.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">VAT on Sales</Label>
                      <p className="font-semibold">£{vatReturn.vatOnSales.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">VAT on Purchases</Label>
                      <p className="font-semibold">£{vatReturn.vatOnPurchases.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-2'}`}>
                    <Button variant="outline" size="sm" className={isMobile ? 'w-full' : ''}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className={isMobile ? 'w-full' : ''}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    {vatReturn.status === 'draft' && (
                      <Button size="sm" className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`}>
                        <Upload className="h-4 w-4 mr-2" />
                        Submit to HMRC
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schemes" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">VAT Schemes</h2>
            <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Scheme
            </Button>
          </div>

          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {vatSchemes.map((scheme) => (
              <Card key={scheme.id} className={`hover:shadow-md transition-shadow ${scheme.active ? 'ring-2 ring-brisk-primary' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-brisk-primary" />
                      <CardTitle className="text-lg">{scheme.name}</CardTitle>
                    </div>
                    <Badge variant={scheme.active ? 'default' : 'secondary'}>
                      {scheme.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <CardDescription>{scheme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {scheme.rate && (
                    <div className="mb-4">
                      <Label className="text-sm text-gray-600">Rate</Label>
                      <p className="text-2xl font-bold text-brisk-primary">{scheme.rate}%</p>
                    </div>
                  )}
                  <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'gap-2'}`}>
                    <Button variant="outline" size="sm" className={isMobile ? 'w-full' : 'flex-1'}>
                      <Edit className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                    {!scheme.active && (
                      <Button size="sm" className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : 'flex-1'}`}>
                        Activate
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">VAT Analytics & Reports</h2>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-brisk-primary" />
                  <CardTitle className="text-lg">VAT Liability Trend</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Track VAT liability over time</p>
                <Button className="w-full bg-brisk-primary hover:bg-brisk-primary-600">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-brisk-primary" />
                  <CardTitle className="text-lg">VAT Rate Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Analyze VAT rates across transactions</p>
                <Button className="w-full bg-brisk-primary hover:bg-brisk-primary-600">
                  <Calculator className="h-4 w-4 mr-2" />
                  View Analysis
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-brisk-primary" />
                  <CardTitle className="text-lg">Submission History</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Historical VAT return submissions</p>
                <Button className="w-full bg-brisk-primary hover:bg-brisk-primary-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">VAT Compliance & Audit Trail</h2>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Compliance Report
            </Button>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">MTD Compliance Status</CardTitle>
                <CardDescription>Making Tax Digital compliance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-semibold">Digital Records</p>
                      <p className="text-sm text-gray-600">Compliant</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-semibold">Software Integration</p>
                      <p className="text-sm text-gray-600">Active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-semibold">Quarterly Submissions</p>
                      <p className="text-sm text-gray-600">1 Overdue</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-semibold">API Connection</p>
                      <p className="text-sm text-gray-600">Connected</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Audit Trail</CardTitle>
                <CardDescription>Recent VAT-related activities and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Upload className="h-4 w-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="font-semibold">VAT Return Q4 2024 Submitted</p>
                      <p className="text-sm text-gray-600">Submitted to HMRC on 28 Jan 2025</p>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Edit className="h-4 w-4 text-green-500" />
                    <div className="flex-1">
                      <p className="font-semibold">VAT Scheme Updated</p>
                      <p className="text-sm text-gray-600">Changed to Standard VAT scheme</p>
                    </div>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <div className="flex-1">
                      <p className="font-semibold">Overdue Return Detected</p>
                      <p className="text-sm text-gray-600">Q3 2024 return is overdue</p>
                    </div>
                    <span className="text-sm text-gray-500">2 weeks ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
