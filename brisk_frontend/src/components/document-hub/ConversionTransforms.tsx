import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  RefreshCw, Download, Upload, Settings,
  CheckCircle, AlertTriangle, Clock, Zap
} from 'lucide-react'

const ConversionTransforms: React.FC = () => {
  const [conversionJobs, setConversionJobs] = useState<any[]>([])
  const [conversionProfiles, setConversionProfiles] = useState<any[]>([])

  useEffect(() => {
    setConversionJobs([
      {
        id: 1,
        filename: "Annual_Report_2024.docx",
        source_format: "docx",
        target_format: "pdf",
        status: "completed",
        progress: 100,
        created_at: "2024-09-20T10:30:00Z",
        completed_at: "2024-09-20T10:31:15Z"
      },
      {
        id: 2,
        filename: "Financial_Data.xlsx",
        source_format: "xlsx",
        target_format: "csv",
        status: "in_progress",
        progress: 65,
        created_at: "2024-09-20T10:25:00Z",
        completed_at: null
      },
      {
        id: 3,
        filename: "Scanned_Invoice.pdf",
        source_format: "pdf",
        target_format: "docx",
        status: "failed",
        progress: 0,
        error: "OCR confidence too low",
        created_at: "2024-09-20T10:20:00Z",
        completed_at: null
      }
    ])

    setConversionProfiles([
      {
        id: 1,
        name: "Archive PDF/A-2u",
        description: "PDF/A-2u with compression and watermark",
        settings: { format: "pdf/a-2u", compress: true, watermark: "FINAL" }
      },
      {
        id: 2,
        name: "High Quality PDF",
        description: "PDF with bookmarks and accessibility tags",
        settings: { format: "pdf", quality: "high", bookmarks: true }
      },
      {
        id: 3,
        name: "Compressed Images",
        description: "JPEG with 80% quality for web use",
        settings: { format: "jpeg", quality: 80, optimize: true }
      }
    ])
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="w-full max-w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Conversion & Transforms</h1>
        <p className="text-gray-600 mt-2">Convert documents between formats with advanced processing options</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{conversionJobs.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <RefreshCw className="h-6 w-6 text-blue-600" />
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
                  {conversionJobs.filter(job => job.status === 'completed').length}
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
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {conversionJobs.filter(job => job.status === 'in_progress').length}
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
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {conversionJobs.filter(job => job.status === 'failed').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Quick Convert
          </CardTitle>
          <CardDescription>Convert documents with one-click profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Drop files here</p>
              <p className="text-xs text-gray-500">or click to browse</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Target Format</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="xlsx">XLSX</option>
                <option value="csv">CSV</option>
                <option value="jpg">JPEG</option>
                <option value="png">PNG</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Profile</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="default">Default</option>
                <option value="archive">Archive PDF/A-2u</option>
                <option value="high-quality">High Quality</option>
                <option value="compressed">Compressed</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Start Conversion
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Conversion Queue</CardTitle>
              <CardDescription>Monitor active and recent conversion jobs</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(job.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{job.filename}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">
                        {job.source_format.toUpperCase()} → {job.target_format.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(job.created_at).toLocaleString()}
                      </span>
                    </div>
                    {job.status === 'in_progress' && (
                      <div className="mt-2">
                        <div className="w-48 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{job.progress}% complete</span>
                      </div>
                    )}
                    {job.status === 'failed' && job.error && (
                      <p className="text-sm text-red-600 mt-1">{job.error}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {getStatusBadge(job.status)}
                  <div className="flex space-x-2">
                    {job.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                    {job.status === 'failed' && (
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
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
                Conversion Profiles
              </CardTitle>
              <CardDescription>Pre-configured conversion settings</CardDescription>
            </div>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              New Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conversionProfiles.map((profile) => (
              <div key={profile.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-2">{profile.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{profile.description}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Use</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ConversionTransforms
