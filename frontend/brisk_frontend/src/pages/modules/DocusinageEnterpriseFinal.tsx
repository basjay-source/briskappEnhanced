import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Badge } from '../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { 
  Upload, Download, FileText, Eye, 
  CheckCircle, Clock, AlertCircle, RefreshCw,
  FileSpreadsheet, FileImage, Zap, Brain, Target,
  FileType, FileX, Trash2, Settings
} from 'lucide-react'

interface Document {
  id: string
  filename: string
  file_type: string
  file_size: number
  uploaded_at: string
  status: string
  processing_status: string
}

interface ProcessingResult {
  document_id: string
  status: string
  confidence?: number
  pages_processed?: number
  tables_found?: number
  error?: string
  processing_completed?: string
}

interface ConversionResult {
  document_id: string
  status: string
  output_file?: string
  quality_score?: number
  error?: string
  conversion_completed?: string
}

interface SupportedFormats {
  input_formats: string[]
  output_formats: string[]
  ocr_available: boolean
  max_file_size_mb: number
  features: string[]
}

const DocusinageEnterpriseFinal: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [processingResults, setProcessingResults] = useState<Record<string, ProcessingResult>>({})
  const [conversionResults, setConversionResults] = useState<Record<string, ConversionResult>>({})
  const [supportedFormats, setSupportedFormats] = useState<SupportedFormats | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [processing, setProcessing] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    loadSupportedFormats()
  }, [])

  const loadSupportedFormats = async () => {
    try {
      const response = await fetch('/api/v1/docusinage/formats', {
        headers: {
          'X-Tenant-ID': 'default-tenant'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setSupportedFormats(data)
      }
    } catch (error) {
      console.error('Failed to load supported formats:', error)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/v1/docusinage/upload', {
        method: 'POST',
        headers: {
          'X-Tenant-ID': 'default-tenant'
        },
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setDocuments(prev => [...prev, result.document])
        setSelectedFile(null)
        
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        const error = await response.json()
        console.error('Upload failed:', error)
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleProcess = async (documentId: string) => {
    setProcessing(prev => ({ ...prev, [documentId]: true }))
    try {
      const response = await fetch(`/api/v1/docusinage/${documentId}/process`, {
        method: 'POST',
        headers: {
          'X-Tenant-ID': 'default-tenant',
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        setProcessingResults(prev => ({ ...prev, [documentId]: result }))
      } else {
        const error = await response.json()
        setProcessingResults(prev => ({ 
          ...prev, 
          [documentId]: { 
            document_id: documentId, 
            status: 'failed', 
            error: error.detail || 'Processing failed' 
          } 
        }))
      }
    } catch (error) {
      setProcessingResults(prev => ({ 
        ...prev, 
        [documentId]: { 
          document_id: documentId, 
          status: 'failed', 
          error: 'Network error' 
        } 
      }))
    } finally {
      setProcessing(prev => ({ ...prev, [documentId]: false }))
    }
  }

  const handleConvert = async (documentId: string, targetFormat: string) => {
    try {
      const response = await fetch(`/api/v1/docusinage/${documentId}/convert?target_format=${targetFormat}`, {
        method: 'POST',
        headers: {
          'X-Tenant-ID': 'default-tenant',
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        setConversionResults(prev => ({ ...prev, [documentId]: result }))
      } else {
        const error = await response.json()
        setConversionResults(prev => ({ 
          ...prev, 
          [documentId]: { 
            document_id: documentId, 
            status: 'failed', 
            error: error.detail || 'Conversion failed' 
          } 
        }))
      }
    } catch (error) {
      setConversionResults(prev => ({ 
        ...prev, 
        [documentId]: { 
          document_id: documentId, 
          status: 'failed', 
          error: 'Network error' 
        } 
      }))
    }
  }

  const handleDownload = async (documentId: string, filename: string) => {
    try {
      const response = await fetch(`/api/v1/docusinage/${documentId}/download/${filename}`, {
        headers: {
          'X-Tenant-ID': 'default-tenant'
        }
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleDelete = async (documentId: string) => {
    try {
      const response = await fetch(`/api/v1/docusinage/${documentId}`, {
        method: 'DELETE',
        headers: {
          'X-Tenant-ID': 'default-tenant'
        }
      })

      if (response.ok) {
        setDocuments(prev => prev.filter(doc => doc.id !== documentId))
        setProcessingResults(prev => {
          const newResults = { ...prev }
          delete newResults[documentId]
          return newResults
        })
        setConversionResults(prev => {
          const newResults = { ...prev }
          delete newResults[documentId]
          return newResults
        })
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />
    if (fileType.includes('image')) return <FileImage className="h-5 w-5 text-blue-500" />
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return <FileSpreadsheet className="h-5 w-5 text-green-500" />
    return <FileType className="h-5 w-5 text-gray-500" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>
      case 'processing':
        return <Badge variant="default" className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Processing</Badge>
      case 'failed':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Failed</Badge>
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.filename.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || doc.file_type.includes(filterType)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Docusinage Enterprise</h1>
          <p className="text-gray-600 mt-1">Advanced document management with enterprise-grade OCR and conversion</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Zap className="h-3 w-3 mr-1" />
            AI-Powered OCR
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            <Brain className="h-3 w-3 mr-1" />
            Enterprise Grade
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Document Upload</TabsTrigger>
          <TabsTrigger value="library">Document Library</TabsTrigger>
          <TabsTrigger value="processing">Processing Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2 text-[#FF6B35]" />
                Document Upload
              </CardTitle>
              <CardDescription>
                Upload documents for OCR processing and format conversion. Supported formats:
                {supportedFormats && (
                  <span className="block mt-1 text-sm font-medium">
                    {supportedFormats.input_formats.join(', ')}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to browse</p>
                <p className="text-sm text-gray-500 mb-4">
                  Maximum file size: {supportedFormats?.max_file_size_mb || 100}MB
                </p>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" className="bg-[#FF6B35] text-white hover:bg-[#E55A2B]">
                    <Upload className="h-4 w-4 mr-2" />
                    Select File
                  </Button>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept={supportedFormats?.input_formats.join(',') || '*'}
                  />
                </Label>
              </div>

              {selectedFile && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getFileIcon(selectedFile.type)}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleUpload} 
                      disabled={uploading}
                      className="bg-[#FF6B35] text-white hover:bg-[#E55A2B]"
                    >
                      {uploading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#FF6B35]" />
                Document Library
              </CardTitle>
              <CardDescription>
                Manage your uploaded documents and view processing results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="word">Word</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <FileX className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">No documents uploaded yet</p>
                  <p className="text-gray-500">Upload a document to get started</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(doc.file_type)}
                            <div>
                              <h3 className="font-medium text-gray-900">{doc.filename}</h3>
                              <p className="text-sm text-gray-500">
                                {(doc.file_size / 1024 / 1024).toFixed(2)} MB • 
                                Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(processingResults[doc.id]?.status || 'pending')}
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleProcess(doc.id)}
                                disabled={processing[doc.id]}
                              >
                                {processing[doc.id] ? (
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                              <Select onValueChange={(format) => handleConvert(doc.id, format)}>
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Convert" />
                                </SelectTrigger>
                                <SelectContent>
                                  {supportedFormats?.output_formats.map((format) => (
                                    <SelectItem key={format} value={format.replace('.', '')}>
                                      {format.toUpperCase()}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(doc.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {conversionResults[doc.id] && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-green-800">
                                  Conversion completed
                                </p>
                                <p className="text-sm text-green-600">
                                  Quality Score: {conversionResults[doc.id].quality_score}%
                                </p>
                              </div>
                              {conversionResults[doc.id].output_file && (
                                <Button
                                  size="sm"
                                  onClick={() => handleDownload(doc.id, conversionResults[doc.id].output_file!)}
                                  className="bg-[#FF6B35] text-white hover:bg-[#E55A2B]"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-[#FF6B35]" />
                Processing Results
              </CardTitle>
              <CardDescription>
                View detailed OCR and analysis results for your documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(processingResults).length === 0 ? (
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">No processing results yet</p>
                  <p className="text-gray-500">Process a document to see results here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(processingResults).map(([docId, result]) => {
                    const doc = documents.find(d => d.id === docId)
                    return (
                      <Card key={docId} className="border-l-4 border-l-[#FF6B35]">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium text-gray-900">{doc?.filename}</h3>
                            {getStatusBadge(result.status)}
                          </div>
                          
                          {result.status === 'completed' && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              {result.confidence && (
                                <div>
                                  <p className="text-gray-500">OCR Confidence</p>
                                  <p className="font-medium">{result.confidence.toFixed(1)}%</p>
                                </div>
                              )}
                              {result.pages_processed && (
                                <div>
                                  <p className="text-gray-500">Pages Processed</p>
                                  <p className="font-medium">{result.pages_processed}</p>
                                </div>
                              )}
                              {result.tables_found !== undefined && (
                                <div>
                                  <p className="text-gray-500">Tables Found</p>
                                  <p className="font-medium">{result.tables_found}</p>
                                </div>
                              )}
                              <div>
                                <p className="text-gray-500">Completed</p>
                                <p className="font-medium">
                                  {result.processing_completed ? 
                                    new Date(result.processing_completed).toLocaleTimeString() : 
                                    'N/A'
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {result.status === 'failed' && result.error && (
                            <Alert>
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{result.error}</AlertDescription>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#FF6B35]">{documents.length}</div>
                <p className="text-xs text-gray-500 mt-1">Uploaded documents</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Processed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(processingResults).filter(r => r.status === 'completed').length}
                </div>
                <p className="text-xs text-gray-500 mt-1">Successfully processed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg. Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {Object.values(processingResults)
                    .filter(r => r.confidence)
                    .reduce((acc, r, _, arr) => acc + (r.confidence! / arr.length), 0)
                    .toFixed(1)}%
                </div>
                <p className="text-xs text-gray-500 mt-1">OCR accuracy</p>
              </CardContent>
            </Card>
          </div>

          {supportedFormats && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-[#FF6B35]" />
                  System Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Supported Input Formats</h4>
                    <div className="flex flex-wrap gap-2">
                      {supportedFormats.input_formats.map((format) => (
                        <Badge key={format} variant="outline" className="bg-blue-50 text-blue-700">
                          {format.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Output Formats</h4>
                    <div className="flex flex-wrap gap-2">
                      {supportedFormats.output_formats.map((format) => (
                        <Badge key={format} variant="outline" className="bg-green-50 text-green-700">
                          {format.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Enterprise Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {supportedFormats.features.map((feature) => (
                      <div key={feature} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DocusinageEnterpriseFinal
