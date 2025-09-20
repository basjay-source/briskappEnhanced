import React, { useState, useEffect } from 'react'
import { Calculator, Plus, Search, FileText, Globe, Send } from 'lucide-react'
import { bookkeepingApi } from '../../services/api'

const VATGST: React.FC = () => {
  const [activeTab, setActiveTab] = useState('returns')
  const [loading, setLoading] = useState(true)
  const [, setVatReturns] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchVATReturns = async () => {
      try {
        const response = await bookkeepingApi.getVATReturns()
        setVatReturns(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching VAT returns:', error)
        setLoading(false)
      }
    }

    fetchVATReturns()
  }, [])

  const internationalVATCodes = [
    { code: 'STD', description: 'Standard Rate', rate: 20.0, country: 'UK', servicePlace: 'UK' },
    { code: 'ZER', description: 'Zero Rate', rate: 0.0, country: 'UK', servicePlace: 'UK' },
    { code: 'EXE', description: 'Exempt', rate: 0.0, country: 'UK', servicePlace: 'UK' },
    { code: 'RED', description: 'Reduced Rate', rate: 5.0, country: 'UK', servicePlace: 'UK' },
    
    { code: 'EU-STD', description: 'EU Standard Rate', rate: 21.0, country: 'EU', servicePlace: 'EU' },
    { code: 'EU-REV', description: 'EU Reverse Charge', rate: 0.0, country: 'EU', servicePlace: 'EU' },
    { code: 'EU-INT', description: 'EU Intrastat', rate: 0.0, country: 'EU', servicePlace: 'EU' },
    
    { code: 'US-CA', description: 'California Sales Tax', rate: 7.25, country: 'US', servicePlace: 'California' },
    { code: 'US-NY', description: 'New York Sales Tax', rate: 8.0, country: 'US', servicePlace: 'New York' },
    { code: 'US-TX', description: 'Texas Sales Tax', rate: 6.25, country: 'US', servicePlace: 'Texas' },
    
    { code: 'CA-GST', description: 'Canadian GST', rate: 5.0, country: 'CA', servicePlace: 'Canada' },
    { code: 'CA-HST', description: 'Canadian HST', rate: 13.0, country: 'CA', servicePlace: 'Ontario' },
    
    { code: 'AU-GST', description: 'Australian GST', rate: 10.0, country: 'AU', servicePlace: 'Australia' },
    { code: 'AU-EXE', description: 'Australian GST-Free', rate: 0.0, country: 'AU', servicePlace: 'Australia' }
  ]

  const mockVATReturns = [
    {
      id: 1,
      periodStart: '2024-01-01',
      periodEnd: '2024-03-31',
      box1VatDueSales: 12500.00,
      box4VatReclaimed: 8750.00,
      box5NetVatDue: 3750.00,
      status: 'draft',
      dueDate: '2024-05-07'
    },
    {
      id: 2,
      periodStart: '2023-10-01',
      periodEnd: '2023-12-31',
      box1VatDueSales: 15000.00,
      box4VatReclaimed: 9500.00,
      box5NetVatDue: 5500.00,
      status: 'submitted',
      dueDate: '2024-02-07'
    }
  ]

  const tabs = [
    { id: 'returns', name: 'Returns', icon: Calculator },
    { id: 'mtd-filing', name: 'MTD/e-Filing', icon: Send },
    { id: 'tax-codes', name: 'Tax Codes', icon: FileText },
    { id: 'ec-intrastat', name: 'EC/Intrastat', icon: Globe },
    { id: 'adjustments', name: 'Adjustments', icon: Plus }
  ]

  const renderReturns = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">VAT Returns</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Return</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Due Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Reclaimed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net VAT Due</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockVATReturns.map((vatReturn) => (
                <tr key={vatReturn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vatReturn.periodStart} to {vatReturn.periodEnd}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{vatReturn.box1VatDueSales.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{vatReturn.box4VatReclaimed.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    £{vatReturn.box5NetVatDue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vatReturn.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      vatReturn.status === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vatReturn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    {vatReturn.status === 'draft' && (
                      <button className="text-green-600 hover:text-green-900 mr-3">Submit</button>
                    )}
                    <button className="text-purple-600 hover:text-purple-900">PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderTaxCodes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">International VAT/Tax Codes</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Code</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tax codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="">All Countries</option>
              <option value="UK">United Kingdom</option>
              <option value="EU">European Union</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Place</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {internationalVATCodes.map((code, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {code.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {code.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {code.rate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      code.country === 'UK' ? 'bg-blue-100 text-blue-800' :
                      code.country === 'EU' ? 'bg-green-100 text-green-800' :
                      code.country === 'US' ? 'bg-red-100 text-red-800' :
                      code.country === 'CA' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {code.country}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {code.servicePlace}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-green-600 hover:text-green-900">Apply</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">VAT/GST</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            MTD Connect
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Export Data
          </button>
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

      {activeTab === 'returns' && renderReturns()}
      {activeTab === 'tax-codes' && renderTaxCodes()}
      {activeTab === 'mtd-filing' && (
        <div className="text-center py-12">
          <p className="text-gray-500">MTD e-Filing functionality coming soon...</p>
        </div>
      )}
      {activeTab === 'ec-intrastat' && (
        <div className="text-center py-12">
          <p className="text-gray-500">EC/Intrastat reporting coming soon...</p>
        </div>
      )}
      {activeTab === 'adjustments' && (
        <div className="text-center py-12">
          <p className="text-gray-500">VAT adjustments coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default VATGST
