import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Bot, Eye
} from 'lucide-react'

const AIAssist: React.FC = () => {
  const [aiJobs, setAiJobs] = useState<any[]>([])

  useEffect(() => {
    setAiJobs([
      {
        id: 1,
        type: "classification",
        document: "Unknown_Document.pdf",
        result: "Invoice",
        confidence: 95,
        status: "completed"
      },
      {
        id: 2,
        type: "redaction",
        document: "ID_Document.pdf",
        result: "3 PII fields redacted",
        confidence: 98,
        status: "completed"
      }
    ])
  }, [])

  return (
    <div className="w-full max-w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Assist</h1>
        <p className="text-gray-600 mt-2">AI-powered document classification, summarization, and redaction</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{aiJobs.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Processing Results</CardTitle>
          <CardDescription>Automated classification and processing results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{job.document}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">Type: {job.type}</span>
                    <span className="text-sm text-gray-500">Result: {job.result}</span>
                    <span className="text-sm text-gray-500">Confidence: {job.confidence}%</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-100 text-green-800">{job.status}</Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AIAssist
