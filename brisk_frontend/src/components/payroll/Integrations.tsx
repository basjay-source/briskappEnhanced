import React, { useState, useEffect } from 'react'

interface APIKey {
  id: string
  name: string
  key: string
  permissions: string[]
  created: string
  lastUsed: string
  status: 'Active' | 'Inactive' | 'Expired'
}

const Integrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hmrc-rti')
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'hmrc-rti', label: 'HMRC RTI', icon: '🏛️' },
    { id: 'pension-providers', label: 'Pension Providers', icon: '🏦' },
    { id: 'banking', label: 'Banking (BACS/SEPA)', icon: '💳' },
    { id: 'hris', label: 'HRIS/Time &amp; Attendance', icon: '⏰' },
    { id: 'bookkeeping-erp', label: 'Bookkeeping/ERP', icon: '📊' },
    { id: 'cosec-sync', label: 'CoSec Sync', icon: '🔄' },
    { id: 'api-keys', label: 'API Keys', icon: '🔑' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setApiKeys([
        {
          id: '1',
          name: 'Payroll API - Production',
          key: 'pk_live_51H...***',
          permissions: ['read:employees', 'write:payroll', 'read:reports'],
          created: '2024-01-15',
          lastUsed: '2024-02-29',
          status: 'Active'
        },
        {
          id: '2',
          name: 'Time Tracking Integration',
          key: 'pk_test_51H...***',
          permissions: ['read:timesheets', 'write:timesheets'],
          created: '2024-02-01',
          lastUsed: '2024-02-28',
          status: 'Active'
        },
        {
          id: '3',
          name: 'Legacy API Key',
          key: 'pk_live_49G...***',
          permissions: ['read:employees'],
          created: '2023-12-01',
          lastUsed: '2024-01-15',
          status: 'Inactive'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Connected': 'bg-green-100 text-green-800',
      'Disconnected': 'bg-red-100 text-red-800',
      'Error': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Expired': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }


  const renderHMRCTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">HMRC RTI Gateway Connection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Connection Status:</span>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Connected
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
              <span className="text-sm font-medium text-gray-700">Last Submission:</span>
              <span className="text-sm text-gray-900">29/02/2024 14:30</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Certificate Expiry:</span>
              <span className="text-sm text-gray-900">15/12/2024</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Test Connection
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Update Credentials
            </button>
            <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
              Renew Certificate
            </button>
            <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              View Submission Log
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPensionProvidersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Pension Provider Integrations</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Provider
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Aviva Pension Scheme</h4>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Connected
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Scheme Reference:</span>
              <span className="text-sm font-medium">AV123456789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Members:</span>
              <span className="text-sm font-medium">142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Contribution:</span>
              <span className="text-sm font-medium">28/02/2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Next Assessment:</span>
              <span className="text-sm font-medium text-blue-600">15/03/2024</span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Configure</button>
            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">Sync</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">NEST Workplace Pension</h4>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Pending Setup
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Employer ID:</span>
              <span className="text-sm font-medium">NEST987654</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Setup Progress:</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Expected Go-Live:</span>
              <span className="text-sm font-medium text-orange-600">01/04/2024</span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">Complete Setup</button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderBankingTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Banking &amp; Payment Integrations</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Bank Account
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bank &amp; Account
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">HSBC Business Account</div>
                  <div className="text-sm text-gray-500">****1234 - Payroll Account</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                  BACS
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">29/02/2024</div>
                <div className="text-sm text-gray-500">£45,678.90</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Configure</button>
                <button className="text-green-600 hover:text-green-900 mr-3">Test</button>
                <button className="text-gray-600 hover:text-gray-900">History</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">Barclays Corporate</div>
                  <div className="text-sm text-gray-500">****5678 - HMRC Payments</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Faster Payments
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">25/02/2024</div>
                <div className="text-sm text-gray-500">£12,345.67</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Configure</button>
                <button className="text-green-600 hover:text-green-900 mr-3">Test</button>
                <button className="text-gray-600 hover:text-gray-900">History</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderHRISTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">HRIS &amp; Time Tracking Integrations</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add HRIS System
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">BambooHR Integration</h4>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
              Disconnected
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">API Endpoint:</span>
              <span className="text-sm font-medium">api.bamboohr.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Sync:</span>
              <span className="text-sm font-medium text-red-600">15/02/2024 (Failed)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Sync Frequency:</span>
              <span className="text-sm font-medium">Daily at 06:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Data Types:</span>
              <span className="text-sm font-medium">Employee, Time, Leave</span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Reconnect</button>
            <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">View Logs</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Clockwise Time Tracking</h4>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Connected
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Workspace ID:</span>
              <span className="text-sm font-medium">CW-789123</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Sync:</span>
              <span className="text-sm font-medium text-green-600">29/02/2024 17:30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Users:</span>
              <span className="text-sm font-medium">142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Hours This Month:</span>
              <span className="text-sm font-medium">5,328</span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Configure</button>
            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">Sync Now</button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderERPTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">ERP &amp; Bookkeeping Integrations</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add ERP System
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                System
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Integration Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Journal Post
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">Sage Intacct</div>
                  <div className="text-sm text-gray-500">Financial Management</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                  Journal Posting
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Connected
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">29/02/2024 17:00</div>
                <div className="text-sm text-gray-500">Payroll Run #2024-02</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Configure</button>
                <button className="text-green-600 hover:text-green-900 mr-3">Test Post</button>
                <button className="text-gray-600 hover:text-gray-900">Mapping</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">Xero</div>
                  <div className="text-sm text-gray-500">Cloud Accounting</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Real-time Sync
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Connected
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">29/02/2024 16:45</div>
                <div className="text-sm text-gray-500">Auto-sync enabled</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Configure</button>
                <button className="text-green-600 hover:text-green-900 mr-3">Sync Now</button>
                <button className="text-gray-600 hover:text-gray-900">History</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderCoSecTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Company Secretarial Sync</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Configure Sync
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Companies House API</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Connection Status:</span>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Connected
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">API Key Status:</span>
              <span className="text-sm font-medium text-green-600">Valid</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Sync:</span>
              <span className="text-sm font-medium">28/02/2024 12:30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Companies Monitored:</span>
              <span className="text-sm font-medium">47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Directors Synced:</span>
              <span className="text-sm font-medium">156</span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Test Connection</button>
            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">Sync Now</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Director Payroll Sync</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Auto-sync Directors:</span>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Enabled
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">NIC Category Override:</span>
              <span className="text-sm font-medium">Category A (Directors)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Dividend Tracking:</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">P11D Auto-populate:</span>
              <span className="text-sm font-medium text-green-600">Enabled</span>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Recent Director Changes</h5>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• John Smith appointed as Director (25/02/2024)</div>
              <div>• Sarah Jones resigned as Director (20/02/2024)</div>
              <div>• Michael Brown address updated (18/02/2024)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAPIKeysTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">API Keys Management</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Generate New Key
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Used
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
            {apiKeys.map((key) => (
              <tr key={key.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{key.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono">{key.key}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {key.permissions.map((permission, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{key.created}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{key.lastUsed}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(key.status)}`}>
                    {key.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Rotate</button>
                  <button className="text-gray-600 hover:text-gray-900">Delete</button>
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
      case 'hmrc-rti': return renderHMRCTab()
      case 'pension-providers': return renderPensionProvidersTab()
      case 'banking': return renderBankingTab()
      case 'hris': return renderHRISTab()
      case 'bookkeeping-erp': return renderERPTab()
      case 'cosec-sync': return renderCoSecTab()
      case 'api-keys': return renderAPIKeysTab()
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">
              Seamless integration with HMRC, pension providers, banks, and other business systems.
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
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect payroll with external systems and services</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Sync All
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Integration Health
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

export default Integrations
