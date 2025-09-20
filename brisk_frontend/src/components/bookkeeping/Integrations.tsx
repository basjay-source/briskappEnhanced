import React, { useState } from 'react'
import { Banknote, Eye, CreditCard, Users, Globe, Key } from 'lucide-react'

const Integrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bank-feeds')

  const tabs = [
    { id: 'bank-feeds', name: 'Bank Feeds', icon: Banknote },
    { id: 'ocr-apps', name: 'OCR Apps', icon: Eye },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'payroll', name: 'Payroll', icon: Users },
    { id: 'hmrc-mtd', name: 'HMRC/MTD', icon: Globe },
    { id: 'cosec-sync', name: 'CoSec Sync', icon: Users },
    { id: 'api-keys', name: 'API Keys', icon: Key }
  ]

  const mockBankFeeds = [
    { id: 1, bank: 'Barclays Business', account: '**** 1234', status: 'Connected', lastSync: '2024-04-15 14:30', transactions: 156, balance: 125000 },
    { id: 2, bank: 'HSBC Business', account: '**** 5678', status: 'Connected', lastSync: '2024-04-15 14:25', transactions: 89, balance: 45000 },
    { id: 3, bank: 'Lloyds Commercial', account: '**** 9012', status: 'Error', lastSync: '2024-04-14 09:15', transactions: 0, balance: 0 },
    { id: 4, bank: 'NatWest Business', account: '**** 3456', status: 'Pending', lastSync: null, transactions: 0, balance: 0 }
  ]

  const mockOCRApps = [
    { id: 1, name: 'Receipt Bank', status: 'Connected', documentsProcessed: 1250, accuracy: 98, lastSync: '2024-04-15 16:00' },
    { id: 2, name: 'Dext', status: 'Connected', documentsProcessed: 890, accuracy: 96, lastSync: '2024-04-15 15:45' },
    { id: 3, name: 'AutoEntry', status: 'Disconnected', documentsProcessed: 0, accuracy: 0, lastSync: null },
    { id: 4, name: 'Hubdoc', status: 'Connected', documentsProcessed: 567, accuracy: 94, lastSync: '2024-04-15 14:20' }
  ]

  const mockPaymentProviders = [
    { id: 1, provider: 'GoCardless', type: 'Direct Debit', status: 'Connected', transactions: 45, volume: 125000, fees: 450 },
    { id: 2, provider: 'Stripe', type: 'Card Payments', status: 'Connected', transactions: 234, volume: 89000, fees: 2670 },
    { id: 3, provider: 'PayPal Business', type: 'Online Payments', status: 'Connected', transactions: 156, volume: 34000, fees: 1020 },
    { id: 4, provider: 'Wise Business', type: 'International', status: 'Pending', transactions: 0, volume: 0, fees: 0 }
  ]

  const mockPayrollSystems = [
    { id: 1, system: 'SAGE Payroll', status: 'Connected', employees: 45, lastSync: '2024-04-30', payPeriod: 'Monthly' },
    { id: 2, system: 'Xero Payroll', status: 'Connected', employees: 23, lastSync: '2024-04-30', payPeriod: 'Weekly' },
    { id: 3, system: 'QuickBooks Payroll', status: 'Error', employees: 0, lastSync: '2024-04-25', payPeriod: 'Monthly' },
    { id: 4, system: 'BrightPay', status: 'Disconnected', employees: 0, lastSync: null, payPeriod: 'Monthly' }
  ]

  const mockAPIKeys = [
    { id: 1, name: 'HMRC VAT API', key: 'hmrc_vat_****_1234', status: 'Active', created: '2024-01-15', expires: '2025-01-15', lastUsed: '2024-04-15' },
    { id: 2, name: 'Companies House API', key: 'ch_api_****_5678', status: 'Active', created: '2024-02-01', expires: '2025-02-01', lastUsed: '2024-04-14' },
    { id: 3, name: 'Bank Feed API', key: 'bank_feed_****_9012', status: 'Expired', created: '2023-04-01', expires: '2024-04-01', lastUsed: '2024-03-30' },
    { id: 4, name: 'OCR Service API', key: 'ocr_svc_****_3456', status: 'Active', created: '2024-03-10', expires: '2025-03-10', lastUsed: '2024-04-15' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Add Integration
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Test Connections
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900">Active Integrations</h4>
          <p className="text-2xl font-bold text-blue-600">12</p>
          <p className="text-sm text-blue-700">Connected services</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-900">Data Synced Today</h4>
          <p className="text-2xl font-bold text-green-600">2,456</p>
          <p className="text-sm text-green-700">Transactions</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900">Sync Errors</h4>
          <p className="text-2xl font-bold text-yellow-600">3</p>
          <p className="text-sm text-yellow-700">Need attention</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-purple-900">API Usage</h4>
          <p className="text-2xl font-bold text-purple-600">78%</p>
          <p className="text-sm text-purple-700">Of monthly limit</p>
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

      {activeTab === 'bank-feeds' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Bank Feed Connections</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search banks..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add Bank
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockBankFeeds.map((feed) => (
                  <tr key={feed.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feed.bank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{feed.account}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        feed.status === 'Connected' ? 'bg-green-100 text-green-800' :
                        feed.status === 'Error' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {feed.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feed.lastSync || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{feed.transactions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {feed.balance > 0 ? `£${feed.balance.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Sync</button>
                      <button className="text-green-600 hover:text-green-900">Configure</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'ocr-apps' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">OCR Applications</h3>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add OCR App
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Documents Processed</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockOCRApps.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        app.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{app.documentsProcessed.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{app.accuracy > 0 ? `${app.accuracy}%` : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.lastSync || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Configure</button>
                      <button className="text-green-600 hover:text-green-900">Test</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Payment Providers</h3>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add Provider
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPaymentProviders.map((provider) => (
                  <tr key={provider.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.provider}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        provider.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {provider.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{provider.transactions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{provider.volume.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{provider.fees.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Configure</button>
                      <button className="text-green-600 hover:text-green-900">View Reports</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'payroll' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Payroll Systems</h3>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add Payroll System
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPayrollSystems.map((system) => (
                  <tr key={system.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{system.system}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        system.status === 'Connected' ? 'bg-green-100 text-green-800' :
                        system.status === 'Error' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {system.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{system.employees}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{system.payPeriod}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{system.lastSync || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Sync</button>
                      <button className="text-green-600 hover:text-green-900">Configure</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'api-keys' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">API Keys</h3>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Generate Key
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockAPIKeys.map((apiKey) => (
                  <tr key={apiKey.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{apiKey.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{apiKey.key}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        apiKey.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {apiKey.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apiKey.created}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apiKey.expires}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apiKey.lastUsed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Regenerate</button>
                      <button className="text-red-600 hover:text-red-900">Revoke</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(activeTab === 'hmrc-mtd' || activeTab === 'cosec-sync') && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {activeTab === 'hmrc-mtd' && 'HMRC & Making Tax Digital Integration'}
            {activeTab === 'cosec-sync' && 'Company Secretarial Sync'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">
                {activeTab === 'hmrc-mtd' ? 'API Connections' : 'Sync Status'}
              </h4>
              <p className="text-2xl font-bold text-blue-600">
                {activeTab === 'hmrc-mtd' ? '4' : 'Active'}
              </p>
              <p className="text-sm text-blue-700">
                {activeTab === 'hmrc-mtd' ? 'Active endpoints' : 'Real-time sync'}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">
                {activeTab === 'hmrc-mtd' ? 'Submissions' : 'Documents Synced'}
              </h4>
              <p className="text-2xl font-bold text-green-600">
                {activeTab === 'hmrc-mtd' ? '12' : '156'}
              </p>
              <p className="text-sm text-green-700">
                {activeTab === 'hmrc-mtd' ? 'This year' : 'This month'}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">
                {activeTab === 'hmrc-mtd' ? 'Compliance' : 'Last Sync'}
              </h4>
              <p className="text-2xl font-bold text-yellow-600">
                {activeTab === 'hmrc-mtd' ? '98%' : '2 hrs'}
              </p>
              <p className="text-sm text-yellow-700">
                {activeTab === 'hmrc-mtd' ? 'Score' : 'Ago'}
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            {activeTab === 'hmrc-mtd' && 'Connect to HMRC APIs for VAT MTD, Income Tax MTD, and Corporation Tax digital submissions. Manage authentication, test connections, and monitor compliance status.'}
            {activeTab === 'cosec-sync' && 'Synchronize company secretarial data including director appointments, share allotments, and filing requirements with Companies House and internal systems.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default Integrations
