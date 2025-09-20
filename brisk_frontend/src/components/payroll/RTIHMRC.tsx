import React, { useState, useEffect } from 'react'

interface RTISubmission {
  id: string
  type: 'FPS' | 'EPS'
  payPeriod: string
  submissionDate: string
  status: 'Draft' | 'Submitted' | 'Accepted' | 'Rejected'
  employees: number
  grossPay: number
  tax: number
  ni: number
  acknowledgment?: string
}

interface Liability {
  id: string
  type: 'PAYE' | 'NI' | 'Class 1A'
  period: string
  amount: number
  dueDate: string
  status: 'Outstanding' | 'Paid' | 'Overdue'
}

const RTIHMRC: React.FC = () => {
  const [activeTab, setActiveTab] = useState('connection')
  const [submissions, setSubmissions] = useState<RTISubmission[]>([])
  const [liabilities, setLiabilities] = useState<Liability[]>([])
  const [loading, setLoading] = useState(true)
  const [connectionStatus] = useState('Connected')

  const tabs = [
    { id: 'connection', label: 'Connection', icon: '🔗' },
    { id: 'fps', label: 'FPS', icon: '📄' },
    { id: 'eps', label: 'EPS', icon: '📋' },
    { id: 'liabilities', label: 'Liabilities', icon: '💰' },
    { id: 'receipts', label: 'Receipts', icon: '📨' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setSubmissions([
        {
          id: '1',
          type: 'FPS',
          payPeriod: 'January 2024',
          submissionDate: '2024-01-31',
          status: 'Accepted',
          employees: 156,
          grossPay: 485000,
          tax: 97000,
          ni: 58200,
          acknowledgment: 'ACK123456789'
        },
        {
          id: '2',
          type: 'EPS',
          payPeriod: 'January 2024',
          submissionDate: '2024-01-31',
          status: 'Accepted',
          employees: 0,
          grossPay: 0,
          tax: 0,
          ni: 0,
          acknowledgment: 'ACK987654321'
        },
        {
          id: '3',
          type: 'FPS',
          payPeriod: 'February 2024',
          submissionDate: '2024-02-29',
          status: 'Draft',
          employees: 158,
          grossPay: 492000,
          tax: 98400,
          ni: 59040
        }
      ])

      setLiabilities([
        {
          id: '1',
          type: 'PAYE',
          period: 'January 2024',
          amount: 97000,
          dueDate: '2024-02-19',
          status: 'Paid'
        },
        {
          id: '2',
          type: 'NI',
          period: 'January 2024',
          amount: 58200,
          dueDate: '2024-02-19',
          status: 'Paid'
        },
        {
          id: '3',
          type: 'PAYE',
          period: 'February 2024',
          amount: 98400,
          dueDate: '2024-03-19',
          status: 'Outstanding'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Submitted': 'bg-blue-100 text-blue-800',
      'Accepted': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Outstanding': 'bg-yellow-100 text-yellow-800',
      'Paid': 'bg-green-100 text-green-800',
      'Overdue': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderConnectionTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">HMRC Gateway Connection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Connection Status:</span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                connectionStatus === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {connectionStatus}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">PAYE Reference:</span>
              <span className="text-sm text-gray-900">123/AB12345</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Accounts Office Reference:</span>
              <span className="text-sm text-gray-900">123PA00012345</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Last Test:</span>
              <span className="text-sm text-gray-900">2024-01-15 14:30</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Test Connection
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Update Credentials
            </button>
            <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              View Certificates
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderFPSTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Full Payment Submissions (FPS)</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Create FPS
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pay Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submission Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gross Pay
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax &amp; NI
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
            {submissions.filter(s => s.type === 'FPS').map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{submission.payPeriod}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{submission.submissionDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{submission.employees}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{submission.grossPay.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    Tax: £{submission.tax.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    NI: £{submission.ni.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(submission.status)}`}>
                    {submission.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {submission.status === 'Draft' && (
                    <button className="text-green-600 hover:text-green-900 mr-3">Submit</button>
                  )}
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-gray-600 hover:text-gray-900">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderLiabilitiesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">PAYE &amp; NI Liabilities</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Calculate Liabilities
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
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
            {liabilities.map((liability) => (
              <tr key={liability.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{liability.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{liability.period}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{liability.amount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{liability.dueDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(liability.status)}`}>
                    {liability.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {liability.status === 'Outstanding' && (
                    <button className="text-green-600 hover:text-green-900 mr-3">Pay</button>
                  )}
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-gray-600 hover:text-gray-900">History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'connection': return renderConnectionTab()
      case 'fps': return renderFPSTab()
      case 'liabilities': return renderLiabilitiesTab()
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">
              Content for {tabs.find(tab => tab.id === activeTab)?.label} will be displayed here.
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
          <h1 className="text-2xl font-bold text-gray-900">RTI &amp; HMRC</h1>
          <p className="text-gray-600">Real Time Information submissions and HMRC compliance</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Submit All
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate Reports
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

export default RTIHMRC
