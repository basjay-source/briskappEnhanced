import React, { useState } from 'react'
import { FileText, Tag, Send, MessageSquare, Download, Eye } from 'lucide-react'

const DocumentHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('client-binder')

  const tabs = [
    { id: 'client-binder', name: 'Client Binder', icon: FileText },
    { id: 'tags', name: 'Tags', icon: Tag },
    { id: 'e-sign', name: 'E-Sign', icon: Send },
    { id: 'requests', name: 'Requests', icon: MessageSquare }
  ]

  const mockDocuments = [
    { id: 1, name: 'VAT Return Q1 2024.pdf', type: 'VAT Return', size: '2.4 MB', uploadDate: '2024-04-15', tags: ['VAT', 'Q1 2024'], status: 'Filed' },
    { id: 2, name: 'Bank Statement March 2024.pdf', type: 'Bank Statement', size: '1.8 MB', uploadDate: '2024-04-01', tags: ['Banking', 'March 2024'], status: 'Processed' },
    { id: 3, name: 'Invoice INV-001234.pdf', type: 'Sales Invoice', size: '156 KB', uploadDate: '2024-04-14', tags: ['Sales', 'Invoice'], status: 'Sent' },
    { id: 4, name: 'Purchase Receipt PUR-5678.jpg', type: 'Purchase Receipt', size: '892 KB', uploadDate: '2024-04-13', tags: ['Purchases', 'Receipt'], status: 'Coded' },
    { id: 5, name: 'Payroll Summary April 2024.xlsx', type: 'Payroll', size: '3.2 MB', uploadDate: '2024-04-30', tags: ['Payroll', 'April 2024'], status: 'Posted' }
  ]

  const mockTags = [
    { id: 1, name: 'VAT', color: 'blue', documentCount: 15, description: 'VAT returns and related documents' },
    { id: 2, name: 'Banking', color: 'green', documentCount: 28, description: 'Bank statements and reconciliations' },
    { id: 3, name: 'Sales', color: 'purple', documentCount: 45, description: 'Sales invoices and receipts' },
    { id: 4, name: 'Purchases', color: 'orange', documentCount: 32, description: 'Purchase invoices and receipts' },
    { id: 5, name: 'Payroll', color: 'red', documentCount: 12, description: 'Payroll documents and summaries' },
    { id: 6, name: 'Assets', color: 'yellow', documentCount: 8, description: 'Fixed asset documentation' }
  ]

  const mockESignRequests = [
    { id: 1, document: 'Management Accounts March 2024.pdf', recipient: 'john.smith@client.com', status: 'Signed', sentDate: '2024-04-10', signedDate: '2024-04-12' },
    { id: 2, document: 'VAT Return Approval Q1 2024.pdf', recipient: 'sarah.jones@client.com', status: 'Pending', sentDate: '2024-04-15', signedDate: null },
    { id: 3, document: 'Annual Accounts 2023.pdf', recipient: 'mike.wilson@client.com', status: 'Signed', sentDate: '2024-04-08', signedDate: '2024-04-09' },
    { id: 4, document: 'Engagement Letter 2024.pdf', recipient: 'emma.davis@client.com', status: 'Expired', sentDate: '2024-03-20', signedDate: null }
  ]

  const mockDocumentRequests = [
    { id: 1, description: 'Bank statements for March 2024', client: 'Acme Corp Ltd', requestedBy: 'John Smith', dueDate: '2024-05-01', status: 'Pending', priority: 'High' },
    { id: 2, description: 'Purchase invoices over £500', client: 'Tech Solutions Inc', requestedBy: 'Sarah Johnson', dueDate: '2024-04-25', status: 'Received', priority: 'Medium' },
    { id: 3, description: 'Payroll records for Q1 2024', client: 'Global Enterprises', requestedBy: 'Mike Wilson', dueDate: '2024-04-30', status: 'Overdue', priority: 'High' },
    { id: 4, description: 'Fixed asset register update', client: 'Manufacturing Ltd', requestedBy: 'Emma Davis', dueDate: '2024-05-05', status: 'In Progress', priority: 'Low' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Document Hub</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Upload Document
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Send Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900">Total Documents</h4>
          <p className="text-2xl font-bold text-blue-600">1,247</p>
          <p className="text-sm text-blue-700">All clients</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-900">Pending E-Signs</h4>
          <p className="text-2xl font-bold text-green-600">3</p>
          <p className="text-sm text-green-700">Awaiting signature</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900">Open Requests</h4>
          <p className="text-2xl font-bold text-yellow-600">8</p>
          <p className="text-sm text-yellow-700">From clients</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-purple-900">Storage Used</h4>
          <p className="text-2xl font-bold text-purple-600">2.8GB</p>
          <p className="text-sm text-purple-700">Of 10GB limit</p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {activeTab === 'client-binder' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Client Documents</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search documents..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">All Types</option>
                <option value="vat">VAT Returns</option>
                <option value="banking">Bank Statements</option>
                <option value="invoices">Invoices</option>
                <option value="receipts">Receipts</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Upload
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{doc.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag, index) => (
                          <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        doc.status === 'Filed' || doc.status === 'Posted' ? 'bg-green-100 text-green-800' :
                        doc.status === 'Sent' || doc.status === 'Processed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 mr-2">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <Send className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'tags' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Document Tags</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search tags..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Create Tag
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {mockTags.map((tag) => (
              <div key={tag.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full bg-${tag.color}-100 text-${tag.color}-800`}>
                    {tag.name}
                  </span>
                  <span className="text-sm text-gray-500">{tag.documentCount} docs</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{tag.description}</p>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-900 text-sm">View Docs</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'e-sign' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">E-Signature Requests</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search requests..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="signed">Signed</option>
                <option value="expired">Expired</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Send for Signature
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signed Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockESignRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.document}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.recipient}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        request.status === 'Signed' ? 'bg-green-100 text-green-800' :
                        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.sentDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.signedDate || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                      {request.status === 'Pending' && (
                        <button className="text-orange-600 hover:text-orange-900">Remind</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Document Requests</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search requests..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="received">Received</option>
                <option value="overdue">Overdue</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                New Request
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockDocumentRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requestedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        request.priority === 'High' ? 'bg-red-100 text-red-800' :
                        request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        request.status === 'Received' ? 'bg-green-100 text-green-800' :
                        request.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                        request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Send Reminder</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentHub
