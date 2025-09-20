import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Eye, FileText, Settings, Download, Upload, Zap,
  CheckCircle, Clock, Database
} from 'lucide-react'

const OCRDataCapture: React.FC = () => {
  const [ocrQueue, setOcrQueue] = useState<any[]>([])
  const [zonalTemplates, setZonalTemplates] = useState<any[]>([])
  const [ocrResults, setOcrResults] = useState<any[]>([])

  useEffect(() => {
    setOcrQueue([
      {
        id: 1,
        filename: "Invoice_Scan_001.pdf",
        status: "processing",
        language: "en",
        confidence: 0,
        created_at: "2024-09-20T10:30:00Z"
      },
      {
        id: 2,
        filename: "Bank_Statement_Scan.pdf",
        status: "completed",
        language: "en",
        confidence: 94,
        created_at: "2024-09-20T10:25:00Z"
      },
      {
        id: 3,
        filename: "P60_Document.pdf",
        status: "failed",
        language: "en",
        confidence: 0,
        error: "Poor image quality",
        created_at: "2024-09-20T10:20:00Z"
      }
    ])

    setZonalTemplates([
      {
        id: 1,
        name: "UK Invoice Template",
        document_type: "invoice",
        fields: ["invoice_number", "date", "amount", "vat", "supplier"],
        usage_count: 145
      },
      {
        id: 2,
        name: "Bank Statement Template",
        document_type: "bank_statement",
        fields: ["account_number", "date", "description", "amount", "balance"],
        usage_count: 89
      },
      {
        id: 3,
        name: "P60 Template",
        document_type: "p60",
        fields: ["employee_name", "ni_number", "tax_year", "gross_pay", "tax_paid"],
        usage_count: 67
      }
    ])

    setOcrResults([
      {
        id: 1,
        filename: "Invoice_ABC_Corp.pdf",
        confidence: 96,
        extracted_data: {
          invoice_number: "INV-2024-001",
          date: "2024-09-15",
          amount: "£1,250.00",
          vat: "£250.00",
          supplier: "ABC Corporation Ltd"
        },
        processing_time: 2.3,
        created_at: "2024-09-20T09:15:00Z"
      },
      {
        id: 2,
        filename: "Receipt_Office_Supplies.pdf",
        confidence: 88,
        extracted_data: {
          merchant: "Office Depot",
          date: "2024-09-18",
          amount: "£45.99",
          items: ["Paper", "Pens", "Folders"]
        },
        processing_time: 1.8,
        created_at: "2024-09-20T08:30:00Z"
      }
    ])
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="w-full max-w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">OCR & Data Capture</h1>
        <p className="text-gray-600 mt-2">Extract text and structured data from scanned documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">OCR Queue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{ocrQueue.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {ocrQueue.filter(item => item.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {ocrQueue.filter(item => item.status === 'processing').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">92%</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>OCR Queue</CardTitle>
              <CardDescription>Documents being processed for text extraction</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Add to Queue
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ocrQueue.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-blue-100">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.filename}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">Language: {item.language.toUpperCase()}</span>
                      {item.confidence > 0 && (
                        <span className={`text-sm font-medium ${getConfidenceColor(item.confidence)}`}>
                          Confidence: {item.confidence}%
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                    </div>
                    {item.error && (
                      <p className="text-sm text-red-600 mt-1">{item.error}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {getStatusBadge(item.status)}
                  <div className="flex space-x-2">
                    {item.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    )}
                    {item.status === 'failed' && (
                      <Button variant="outline" size="sm">
                        <Zap className="h-4 w-4 mr-2" />
                        Retry
                      </Button>
                    )}
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Zonal Templates
              </CardTitle>
              <CardDescription>Pre-configured field extraction templates</CardDescription>
            </div>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zonalTemplates.map((template) => (
              <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <Badge variant="outline">{template.usage_count} uses</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">Type: {template.document_type}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Fields:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.fields.slice(0, 3).map((field: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {field}
                      </Badge>
                    ))}
                    {template.fields.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.fields.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">Use</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Recent OCR Results
              </CardTitle>
              <CardDescription>Successfully extracted data from documents</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ocrResults.map((result) => (
              <div key={result.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{result.filename}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                      {result.confidence}% confidence
                    </span>
                    <span className="text-sm text-gray-500">
                      {result.processing_time}s
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(result.extracted_data).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded">
                      <p className="text-xs font-medium text-gray-600 uppercase">{key.replace('_', ' ')}</p>
                      <p className="text-sm text-gray-900 mt-1">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm">View Full Text</Button>
                  <Button variant="outline" size="sm">Post to Module</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OCRDataCapture
