import React, { useState, useEffect } from 'react'
import { Search, Filter, ArrowUpDown, Layers, DollarSign, AlertTriangle } from 'lucide-react'

const WIPLedger: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [engagementFilter, setEngagementFilter] = useState('all')

  useEffect(() => {
    const fetchWipItems = async () => {
      try {
        setLoading(false)
      } catch (error) {
        console.error('Error fetching WIP items:', error)
        setLoading(false)
      }
    }

    fetchWipItems()
  }, [])

  const mockWipItems = [
    {
      id: 1,
      engagement: 'Acme Corp Audit',
      client: 'Acme Corp',
      description: 'Audit planning and fieldwork',
      standardValue: 12500.00,
      billingValue: 12500.00,
      writeUpDown: 0,
      status: 'Unbilled',
      age: 15,
      currency: 'GBP',
      type: 'Time',
      user: 'John Smith'
    },
    {
      id: 2,
      engagement: 'Tech Ltd Tax',
      client: 'Tech Ltd',
      description: 'Corporation tax computation',
      standardValue: 3500.00,
      billingValue: 3150.00,
      writeUpDown: -350.00,
      status: 'Unbilled',
      age: 8,
      currency: 'GBP',
      type: 'Time',
      user: 'Sarah Johnson'
    },
    {
      id: 3,
      engagement: 'Global Inc Advisory',
      client: 'Global Inc',
      description: 'Strategic advisory services',
      standardValue: 8750.00,
      billingValue: 9625.00,
      writeUpDown: 875.00,
      status: 'Billed',
      age: 45,
      currency: 'GBP',
      type: 'Time',
      user: 'Mike Wilson'
    },
    {
      id: 4,
      engagement: 'Startup Co Due Diligence',
      client: 'Startup Co',
      description: 'Travel expenses',
      standardValue: 450.00,
      billingValue: 450.00,
      writeUpDown: 0,
      status: 'Unbilled',
      age: 3,
      currency: 'GBP',
      type: 'Expense',
      user: 'John Smith'
    }
  ]

  const filteredWipItems = mockWipItems.filter(item => {
    const matchesSearch = item.engagement.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter
    const matchesEngagement = engagementFilter === 'all' || item.engagement === engagementFilter
    return matchesSearch && matchesStatus && matchesEngagement
  })

  const totalUnbilled = mockWipItems
    .filter(item => item.status === 'Unbilled')
    .reduce((sum, item) => sum + item.billingValue, 0)

  const totalBilled = mockWipItems
    .filter(item => item.status === 'Billed')
    .reduce((sum, item) => sum + item.billingValue, 0)

  const totalWriteUpDown = mockWipItems
    .reduce((sum, item) => sum + item.writeUpDown, 0)

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">WIP Ledger &amp; Transfers</h1>
          <p className="text-gray-600 mt-2">View WIP at standard and billing values with aging and transfers</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4" />
            <span>Transfer WIP</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Layers className="w-4 h-4" />
            <span>Lock Snapshot</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Unbilled WIP</h3>
            <DollarSign className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            £{totalUnbilled.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">Ready for billing</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Billed WIP</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            £{totalBilled.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">Invoiced this period</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Write-ups/Downs</h3>
            <ArrowUpDown className="w-5 h-5 text-purple-500" />
          </div>
          <div className={`text-2xl font-bold ${totalWriteUpDown >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalWriteUpDown >= 0 ? '+' : ''}£{totalWriteUpDown.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">Net adjustments</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Aging Alert</h3>
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {mockWipItems.filter(item => item.age > 30).length}
          </div>
          <p className="text-sm text-gray-500 mt-1">Items over 30 days</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search WIP items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="unbilled">Unbilled</option>
              <option value="billed">Billed</option>
              <option value="written-off">Written-off</option>
            </select>
            <select
              value={engagementFilter}
              onChange={(e) => setEngagementFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Engagements</option>
              <option value="Acme Corp Audit">Acme Corp Audit</option>
              <option value="Tech Ltd Tax">Tech Ltd Tax</option>
              <option value="Global Inc Advisory">Global Inc Advisory</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Standard Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Billing Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Write-up/Down
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age (Days)
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
              {filteredWipItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    No WIP items found
                  </td>
                </tr>
              ) : (
                filteredWipItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.engagement}</div>
                        <div className="text-sm text-gray-500">{item.client}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{item.description}</div>
                      <div className="text-sm text-gray-500">by {item.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.type === 'Time' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      £{item.standardValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      £{item.billingValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        item.writeUpDown > 0 ? 'text-green-600' : 
                        item.writeUpDown < 0 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {item.writeUpDown !== 0 && (item.writeUpDown > 0 ? '+' : '')}
                        £{item.writeUpDown.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        item.age > 30 ? 'text-red-600' : 
                        item.age > 14 ? 'text-orange-600' : 'text-gray-900'
                      }`}>
                        {item.age}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.status === 'Unbilled' ? 'bg-yellow-100 text-yellow-800' :
                        item.status === 'Billed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        <button className="text-orange-600 hover:text-orange-900">Transfer</button>
                        <button className="text-gray-600 hover:text-gray-900">View</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">WIP by Engagement</h3>
          <div className="space-y-3">
            {Array.from(new Set(mockWipItems.map(item => item.engagement))).map((engagement) => {
              const engagementWip = mockWipItems
                .filter(item => item.engagement === engagement)
                .reduce((sum, item) => sum + item.billingValue, 0)
              return (
                <div key={engagement} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{engagement}</span>
                  <span className="text-sm font-semibold text-gray-900">£{engagementWip.toLocaleString()}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transfers</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Time entry transfer</p>
                <p className="text-sm text-gray-500">From Acme Corp Audit to Acme Corp Tax</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">£2,500</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Expense reclass</p>
                <p className="text-sm text-gray-500">Travel expense to correct engagement</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">£450</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WIPLedger
