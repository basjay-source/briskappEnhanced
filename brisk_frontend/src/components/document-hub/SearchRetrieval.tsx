import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  Search, Filter, Save, FileText,
  Download, Eye, Star
} from 'lucide-react'

const SearchRetrieval: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [savedSearches, setSavedSearches] = useState<any[]>([])

  useEffect(() => {
    setSavedSearches([
      { id: 1, name: "Recent Invoices", query: "type:invoice date:last-30-days", count: 45 },
      { id: 2, name: "Signed Documents", query: "has:signature status:completed", count: 123 },
      { id: 3, name: "KYC Documents", query: "tag:kyc client:new-clients", count: 28 }
    ])

    setSearchResults([
      {
        id: 1,
        filename: "Invoice_ABC_Corp_2024.pdf",
        client: "ABC Corporation",
        type: "invoice",
        size: "245 KB",
        tags: ["urgent", "reviewed"],
        created_at: "2024-09-20T10:30:00Z",
        has_signature: false,
        confidence: 95
      },
      {
        id: 2,
        filename: "Bank_Statement_Sep_2024.pdf",
        client: "XYZ Services",
        type: "bank_statement",
        size: "1.2 MB",
        tags: ["final", "reconciled"],
        created_at: "2024-09-19T14:20:00Z",
        has_signature: true,
        confidence: 88
      }
    ])
  }, [])

  return (
    <div className="w-full max-w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Search & Retrieval</h1>
        <p className="text-gray-600 mt-2">Advanced document search with filters and saved searches</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Document Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input placeholder="Search by title, content, OCR text, tags..." className="w-full" />
              </div>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Document Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value="">All Types</option>
                  <option value="invoice">Invoice</option>
                  <option value="receipt">Receipt</option>
                  <option value="bank_statement">Bank Statement</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Date Range</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value="">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Client</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value="">All Clients</option>
                  <option value="abc-corp">ABC Corporation</option>
                  <option value="xyz-services">XYZ Services</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Has E-Sign</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value="">Any</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>{searchResults.length} documents found</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {searchResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-blue-100">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{result.filename}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">Client: {result.client}</span>
                      <span className="text-sm text-gray-500">Size: {result.size}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(result.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-500">Match: {result.confidence}%</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{result.type}</Badge>
                      {result.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {result.has_signature && (
                        <Badge className="bg-green-100 text-green-800">Signed</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Save className="h-5 w-5 mr-2" />
            Saved Searches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedSearches.map((search) => (
              <div key={search.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{search.name}</h4>
                  <Badge variant="outline">{search.count}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{search.query}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Run</Button>
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

export default SearchRetrieval
