import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  FileText, 
  Download,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react'
import { useResponsive } from '@/hooks/use-responsive'
import { apiClient } from '@/lib/api'

export default function Reports() {
  const { isMobile, isTablet } = useResponsive()
  const [activeTab, setActiveTab] = useState('financial')
  const [loading, setLoading] = useState(false)

  const financialReports = [
    { 
      id: 'profit-loss', 
      name: 'Profit & Loss', 
      description: 'Income statement analysis',
      icon: TrendingUp,
      status: 'ready'
    },
    { 
      id: 'balance-sheet', 
      name: 'Balance Sheet', 
      description: 'Financial position statement',
      icon: BarChart3,
      status: 'ready'
    },
    { 
      id: 'cash-flow', 
      name: 'Cash Flow', 
      description: 'Cash movement analysis',
      icon: FileText,
      status: 'ready'
    },
    { 
      id: 'trial-balance', 
      name: 'Trial Balance', 
      description: 'Account balances verification',
      icon: PieChart,
      status: 'ready'
    }
  ]

  const managementReports = [
    { 
      id: 'budget-variance', 
      name: 'Budget vs Actual', 
      description: 'Performance against budget',
      icon: BarChart3,
      status: 'ready'
    },
    { 
      id: 'kpi-dashboard', 
      name: 'KPI Dashboard', 
      description: 'Key performance indicators',
      icon: TrendingUp,
      status: 'ready'
    },
    { 
      id: 'aged-debtors', 
      name: 'Aged Debtors', 
      description: 'Outstanding receivables analysis',
      icon: Calendar,
      status: 'ready'
    },
    { 
      id: 'expense-analysis', 
      name: 'Expense Analysis', 
      description: 'Cost breakdown and trends',
      icon: PieChart,
      status: 'ready'
    }
  ]

  const analysisReports = [
    { 
      id: 'ratio-analysis', 
      name: 'Ratio Analysis', 
      description: 'Financial ratio calculations',
      icon: BarChart3,
      status: 'ready'
    },
    { 
      id: 'trend-analysis', 
      name: 'Trend Analysis', 
      description: 'Multi-period comparisons',
      icon: TrendingUp,
      status: 'ready'
    },
    { 
      id: 'benchmarking', 
      name: 'Industry Benchmarking', 
      description: 'Sector performance comparison',
      icon: PieChart,
      status: 'ready'
    },
    { 
      id: 'forecasting', 
      name: 'Financial Forecasting', 
      description: 'Future performance projections',
      icon: Calendar,
      status: 'ready'
    }
  ]

  const generateReport = async (reportId: string, reportType: string) => {
    setLoading(true)
    try {
      if (reportType === 'financial') {
        const data = await apiClient.getFinancialStatements('default-company', reportId)
        console.log('Generated report:', data)
      }
    } catch (error) {
      console.error('Failed to generate report:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderReportGrid = (reports: Array<{
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    status: string;
  }>, reportType: string) => (
    <div className={`grid gap-4 ${
      isMobile ? 'grid-cols-1' : 
      isTablet ? 'grid-cols-2' : 
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
      {reports.map(report => {
        const Icon = report.icon
        return (
          <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-brisk-primary" />
                <Badge variant={report.status === 'ready' ? 'default' : 'secondary'}>
                  {report.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{report.name}</CardTitle>
              <CardDescription className="text-sm">{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  className="w-full bg-brisk-primary hover:bg-brisk-primary-600"
                  onClick={() => generateReport(report.id, reportType)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  return (
    <div className={`space-y-6 ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
        <div>
          <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-2">Comprehensive financial reporting and analysis</p>
        </div>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
          <Button variant="outline" className={isMobile ? 'w-full' : ''}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 h-auto' : 'grid-cols-3'}`}>
          <TabsTrigger value="financial" className={isMobile ? 'w-full' : ''}>
            Financial Reports
          </TabsTrigger>
          <TabsTrigger value="management" className={isMobile ? 'w-full' : ''}>
            Management Accounts
          </TabsTrigger>
          <TabsTrigger value="analysis" className={isMobile ? 'w-full' : ''}>
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Financial Reports</h2>
            <Badge variant="outline">{financialReports.length} reports available</Badge>
          </div>
          {renderReportGrid(financialReports, 'financial')}
        </TabsContent>

        <TabsContent value="management" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Management Accounts</h2>
            <Badge variant="outline">{managementReports.length} reports available</Badge>
          </div>
          {renderReportGrid(managementReports, 'management')}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Analysis & Insights</h2>
            <Badge variant="outline">{analysisReports.length} reports available</Badge>
          </div>
          {renderReportGrid(analysisReports, 'analysis')}
        </TabsContent>
      </Tabs>
    </div>
  )
}
