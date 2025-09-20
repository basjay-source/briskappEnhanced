import React, { useState, useEffect } from 'react'

interface Document {
  id: string
  name: string
  type: 'Contract' | 'Payslip' | 'P60' | 'P45' | 'Letter' | 'RTI' | 'AE Communication'
  employee: string
  uploadDate: string
  size: string
  status: 'Active' | 'Archived' | 'Pending'
}

interface Payslip {
  id: string
  employee: string
  payPeriod: string
  grossPay: number
  netPay: number
  generatedDate: string
  status: 'Generated' | 'Sent' | 'Viewed'
}

const DocumentHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('employee-files')
  const [documents, setDocuments] = useState<Document[]>([])
  const [payslips, setPayslips] = useState<Payslip[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'employee-files', label: 'Employee Files', icon: '📁' },
    { id: 'payslips', label: 'Payslips', icon: '📄' },
    { id: 'ae-communications', label: 'AE Communications', icon: '📧' },
    { id: 'rti-evidence', label: 'RTI Evidence', icon: '📋' },
    { id: 'letters', label: 'Letters', icon: '✉️' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setDocuments([
        {
          id: '1',
          name: 'Employment Contract - John Smith.pdf',
          type: 'Contract',
          employee: 'John Smith',
          uploadDate: '2024-01-15',
          size: '245 KB',
          status: 'Active'
        },
        {
          id: '2',
          name: 'P45 - Emma Davis.pdf',
          type: 'P45',
          employee: 'Emma Davis',
          uploadDate: '2024-02-01',
          size: '156 KB',
          status: 'Active'
        },
        {
          id: '3',
          name: 'Salary Increase Letter - Michael Brown.pdf',
          type: 'Letter',
          employee: 'Michael Brown',
          uploadDate: '2024-02-15',
          size: '89 KB',
          status: 'Active'
        },
        {
          id: '4',
          name: 'RTI Acknowledgment - FEB24.xml',
          type: 'RTI',
          employee: 'All Employees',
          uploadDate: '2024-02-29',
          size: '12 KB',
          status: 'Active'
        }
      ])

      setPayslips([
        {
          id: '1',
          employee: 'John Smith',
          payPeriod: 'February 2024',
          grossPay: 3750,
          netPay: 2890,
          generatedDate: '2024-02-29',
          status: 'Sent'
        },
        {
          id: '2',
          employee: 'Emma Davis',
          payPeriod: 'February 2024',
          grossPay: 3167,
          netPay: 2456,
          generatedDate: '2024-02-29',
          status: 'Viewed'
        },
        {
          id: '3',
          employee: 'Michael Brown',
          payPeriod: 'February 2024',
          grossPay: 4333,
          netPay: 3245,
          generatedDate: '2024-02-29',
          status: 'Generated'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Archived': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Generated': 'bg-blue-100 text-blue-800',
      'Sent': 'bg-green-100 text-green-800',
      'Viewed': 'bg-purple-100 text-purple-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      'Contract': 'bg-blue-100 text-blue-800',
      'Payslip': 'bg-green-100 text-green-800',
      'P60': 'bg-purple-100 text-purple-800',
      'P45': 'bg-orange-100 text-orange-800',
      'Letter': 'bg-gray-100 text-gray-800',
      'RTI': 'bg-red-100 text-red-800',
      'AE Communication': 'bg-yellow-100 text-yellow-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderEmployeeFilesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Employee Document Files</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Upload Document
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Bulk Upload
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Upload Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(doc.type)}`}>
                    {doc.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doc.employee}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doc.uploadDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doc.size}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(doc.status)}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Download</button>
                  <button className="text-gray-600 hover:text-gray-900">Share</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderPayslipsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Employee Payslips</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate Payslips
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Send to Portal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">156</div>
          <div className="text-sm text-gray-600">Total Payslips</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">142</div>
          <div className="text-sm text-gray-600">Sent to Portal</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">128</div>
          <div className="text-sm text-gray-600">Viewed by Employees</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">14</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pay Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gross Pay
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Pay
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Generated Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payslips.map((payslip) => (
              <tr key={payslip.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{payslip.employee}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payslip.payPeriod}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{payslip.grossPay.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{payslip.netPay.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payslip.generatedDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(payslip.status)}`}>
                    {payslip.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Download</button>
                  <button className="text-gray-600 hover:text-gray-900">Email</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderAECommunicationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Auto-Enrolment Communications</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-gray-600">Enrolment Letters Sent</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">18</div>
            <div className="text-sm text-gray-600">Opt-Out Confirmations</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">6</div>
            <div className="text-sm text-gray-600">Pending Communications</div>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Monthly AE Assessment Letters</h4>
              <p className="text-sm text-gray-600">Generated for February 2024 assessment</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                View Templates
              </button>
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                Send Batch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRTIEvidenceTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">RTI Submission Evidence</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <h4 className="font-medium text-green-900">February 2024 FPS</h4>
              <p className="text-sm text-green-700">Submitted: 29/02/2024 • Acknowledgment: ACK123456789</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                View XML
              </button>
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                Download
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <h4 className="font-medium text-green-900">February 2024 EPS</h4>
              <p className="text-sm text-green-700">Submitted: 29/02/2024 • Acknowledgment: ACK987654321</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                View XML
              </button>
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'employee-files': return renderEmployeeFilesTab()
      case 'payslips': return renderPayslipsTab()
      case 'ae-communications': return renderAECommunicationsTab()
      case 'rti-evidence': return renderRTIEvidenceTab()
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">
              Secure document storage with employee portal access and e-signature capabilities.
            </p>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Hub</h1>
          <p className="text-gray-600">Centralized payroll document management</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Archive Documents
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Document Reports
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {renderTabContent()}
    </div>
  )
}

export default DocumentHub
