import React, { useState } from 'react'
import { Send, CheckCircle, AlertTriangle, Globe, Archive } from 'lucide-react'

const MTD: React.FC = () => {
  const [activeTab, setActiveTab] = useState('vat-mtd')

  const tabs = [
    { id: 'vat-mtd', name: 'VAT MTD', icon: Send },
    { id: 'income-tax-mtd', name: 'Income Tax MTD', icon: Archive },
    { id: 'digital-records', name: 'Digital Records', icon: Globe },
    { id: 'compliance', name: 'Compliance', icon: CheckCircle },
    { id: 'api-connections', name: 'API Connections', icon: AlertTriangle }
  ]

  const mockVATSubmissions = [
    { id: 1, period: 'Q1 2024', status: 'Submitted', submissionDate: '2024-04-30', amount: 12500, acknowledgment: 'ACK123456', dueDate: '2024-05-07' },
    { id: 2, period: 'Q4 2023', status: 'Submitted', submissionDate: '2024-01-31', amount: 8750, acknowledgment: 'ACK123455', dueDate: '2024-02-07' },
    { id: 3, period: 'Q3 2023', status: 'Submitted', submissionDate: '2023-10-31', amount: 15200, acknowledgment: 'ACK123454', dueDate: '2023-11-07' },
    { id: 4, period: 'Q2 2024', status: 'Draft', submissionDate: null, amount: 9800, acknowledgment: null, dueDate: '2024-08-07' }
  ]

  const mockDigitalRecords = [
    { id: 1, type: 'Sales Invoices', count: 1250, lastUpdated: '2024-04-15', compliance: 'Compliant', software: 'Brisk Bookkeeping' },
    { id: 2, type: 'Purchase Invoices', count: 890, lastUpdated: '2024-04-15', compliance: 'Compliant', software: 'Brisk Bookkeeping' },
    { id: 3, type: 'Bank Transactions', count: 2340, lastUpdated: '2024-04-15', compliance: 'Compliant', software: 'Bank Feed' },
    { id: 4, type: 'VAT Returns', count: 4, lastUpdated: '2024-04-30', compliance: 'Compliant', software: 'HMRC API' },
    { id: 5, type: 'Journal Entries', count: 156, lastUpdated: '2024-04-14', compliance: 'Compliant', software: 'Brisk Bookkeeping' }
  ]

  const mockAPIConnections = [
    { id: 1, service: 'HMRC VAT API', status: 'Connected', lastSync: '2024-04-15 14:30', endpoint: 'https://api.service.hmrc.gov.uk/organisations/vat', version: 'v1.0' },
    { id: 2, service: 'HMRC Income Tax API', status: 'Connected', lastSync: '2024-04-15 14:25', endpoint: 'https://api.service.hmrc.gov.uk/individuals/income-tax', version: 'v1.0' },
    { id: 3, service: 'HMRC Corporation Tax API', status: 'Pending', lastSync: null, endpoint: 'https://api.service.hmrc.gov.uk/organisations/corporation-tax', version: 'v1.0' },
    { id: 4, service: 'HMRC Test Environment', status: 'Connected', lastSync: '2024-04-15 09:00', endpoint: 'https://test-api.service.hmrc.gov.uk', version: 'v1.0' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">MTD</h1>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Connect HMRC
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Test Connection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-900">MTD Status</h4>
          <p className="text-2xl font-bold text-green-600">Connected</p>
          <p className="text-sm text-green-700">HMRC API active</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900">VAT Returns Filed</h4>
          <p className="text-2xl font-bold text-blue-600">4</p>
          <p className="text-sm text-blue-700">This year</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900">Next Due</h4>
          <p className="text-2xl font-bold text-yellow-600">7</p>
          <p className="text-sm text-yellow-700">Days remaining</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-purple-900">Compliance Score</h4>
          <p className="text-2xl font-bold text-purple-600">98%</p>
          <p className="text-sm text-purple-700">Excellent</p>
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

      {activeTab === 'vat-mtd' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">VAT MTD Submissions</h3>
              <div className="flex space-x-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                  Submit Return
                </button>
                <button className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50">
                  View Obligations
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acknowledgment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockVATSubmissions.map((submission) => (
                    <tr key={submission.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.status === 'Submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.submissionDate || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{submission.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{submission.acknowledgment || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                        {submission.status === 'Draft' && (
                          <button className="text-green-600 hover:text-green-900">Submit</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'digital-records' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Digital Records Compliance</h3>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                  Run Audit
                </button>
                <button className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50">
                  Export Report
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Type</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Software</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockDigitalRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{record.count.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.lastUpdated}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.software}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {record.compliance}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Audit</button>
                        <button className="text-green-600 hover:text-green-900">Export</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'api-connections' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">HMRC API Connections</h3>
              <div className="flex space-x-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                  Test All
                </button>
                <button className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50">
                  Refresh Tokens
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockAPIConnections.map((connection) => (
                    <tr key={connection.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{connection.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          connection.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {connection.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{connection.lastSync || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">{connection.endpoint}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{connection.version}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Test</button>
                        <button className="text-green-600 hover:text-green-900">Configure</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'income-tax-mtd' || activeTab === 'compliance') && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {activeTab === 'income-tax-mtd' && 'Income Tax Making Tax Digital'}
            {activeTab === 'compliance' && 'MTD Compliance Dashboard'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">
                {activeTab === 'income-tax-mtd' ? 'Quarterly Updates' : 'Compliance Score'}
              </h4>
              <p className="text-2xl font-bold text-blue-600">
                {activeTab === 'income-tax-mtd' ? '4' : '98%'}
              </p>
              <p className="text-sm text-blue-700">
                {activeTab === 'income-tax-mtd' ? 'This year' : 'Excellent'}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">
                {activeTab === 'income-tax-mtd' ? 'Annual Declaration' : 'Digital Records'}
              </h4>
              <p className="text-2xl font-bold text-green-600">
                {activeTab === 'income-tax-mtd' ? 'Due' : 'Compliant'}
              </p>
              <p className="text-sm text-green-700">
                {activeTab === 'income-tax-mtd' ? '31 Jan 2025' : 'All systems'}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">
                {activeTab === 'income-tax-mtd' ? 'Next Update' : 'API Health'}
              </h4>
              <p className="text-2xl font-bold text-yellow-600">
                {activeTab === 'income-tax-mtd' ? '15' : '100%'}
              </p>
              <p className="text-sm text-yellow-700">
                {activeTab === 'income-tax-mtd' ? 'Days remaining' : 'All connected'}
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            {activeTab === 'income-tax-mtd' && 'Manage Income Tax MTD submissions, quarterly updates, and annual declarations through HMRC APIs.'}
            {activeTab === 'compliance' && 'Monitor MTD compliance status, digital record requirements, and regulatory obligations across all tax types.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default MTD
