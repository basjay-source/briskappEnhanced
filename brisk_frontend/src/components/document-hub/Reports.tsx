import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Download, TrendingUp, Activity, Database
} from 'lucide-react'

const Reports: React.FC = () => {
  const [reportData, setReportData] = useState<any>(null)

  useEffect(() => {
    setReportData({
      usage_stats: {
        total_documents: 1247,
        documents_this_month: 156,
        storage_used_gb: 98.2,
        ocr_pages_processed: 2340
      },
      conversion_stats: {
        total_jobs: 456,
        success_rate: 94,
        avg_processing_time: 2.3,
        most_common_conversion: "DOCX → PDF"
      },
      esign_metrics: {
        envelopes_sent: 89,
        completion_rate: 87,
        avg_completion_time: "2.4 days"
      }
    })
  }, [])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">Document hub analytics and usage reports</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Usage & Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{reportData?.usage_stats?.total_documents}</p>
              <p className="text-sm text-gray-600">Total Documents</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{reportData?.usage_stats?.documents_this_month}</p>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{reportData?.usage_stats?.storage_used_gb}GB</p>
              <p className="text-sm text-gray-600">Storage Used</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{reportData?.usage_stats?.ocr_pages_processed}</p>
              <p className="text-sm text-gray-600">OCR Pages</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Conversion Throughput
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{reportData?.conversion_stats?.total_jobs}</p>
              <p className="text-sm text-gray-600">Total Jobs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{reportData?.conversion_stats?.success_rate}%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{reportData?.conversion_stats?.avg_processing_time}s</p>
              <p className="text-sm text-gray-600">Avg Time</p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-sm">
                {reportData?.conversion_stats?.most_common_conversion}
              </Badge>
              <p className="text-sm text-gray-600 mt-1">Most Common</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            E-Sign Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{reportData?.esign_metrics?.envelopes_sent}</p>
              <p className="text-sm text-gray-600">Envelopes Sent</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{reportData?.esign_metrics?.completion_rate}%</p>
              <p className="text-sm text-gray-600">Completion Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{reportData?.esign_metrics?.avg_completion_time}</p>
              <p className="text-sm text-gray-600">Avg Completion</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">12</p>
              <p className="text-sm text-gray-600">Active Templates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Reports
