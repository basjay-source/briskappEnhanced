import React, { useState, useEffect } from 'react'
import { Plus, Calculator, FileText } from 'lucide-react'

interface HMRCRates {
  corporation_tax_main_rate: number
  corporation_tax_small_rate: number
}

const RDCreativeReliefs: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('projects')
  const [rates, setRates] = useState<HMRCRates | null>(null)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('/api/business-tax/hmrc-rates')
        if (response.ok) {
          const data = await response.json()
          setRates(data.rates)
        }
      } catch (error) {
        console.error('Error fetching HMRC rates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">R&D / Creative Reliefs / Patent Box</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Add Project
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <Calculator className="w-4 h-4 mr-2 inline" />
            Calculate Claim
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'projects', label: 'Projects' },
            { id: 'qualifying-costs', label: 'Qualifying Costs' },
            { id: 'sme-rdec', label: 'SME/RDEC' },
            { id: 'creative', label: 'Creative (if relevant)' },
            { id: 'patent-box', label: 'Patent Box Computation' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
          <p className="text-2xl font-bold text-blue-600">2</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Qualifying Costs</h3>
          <p className="text-2xl font-bold text-green-600">£45,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">SME Claim</h3>
          <p className="text-2xl font-bold text-orange-600">£58,500</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Tax Credit</h3>
          <p className="text-2xl font-bold text-red-600">£0</p>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">R&D Projects</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Costs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AI Algorithm Development</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">01/04/2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£28,500</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <button className="hover:text-blue-900">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Green Energy Solutions</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15/06/2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Planning
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£16,500</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <button className="hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'qualifying-costs' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Qualifying Costs Analysis</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Cost Categories</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Staff Costs</span>
                    <span>£32,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subcontractor Costs</span>
                    <span>£8,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Materials & Consumables</span>
                    <span>£3,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Software & Equipment</span>
                    <span>£1,300</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Total Qualifying Costs</span>
                    <span>£45,000</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Enhancement Rates</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>SME Rate (130%)</span>
                    <span>£58,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Large Company Rate (130%)</span>
                    <span>£58,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RDEC Rate (20%)</span>
                    <span>£9,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sme-rdec' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">SME vs RDEC Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">SME Scheme</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Qualifying Costs</span>
                  <span>£45,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Enhancement (130%)</span>
                  <span>£58,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Relief ({rates ? (rates.corporation_tax_main_rate * 100).toFixed(0) : '25'}%)</span>
                  <span>£14,625</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Total Benefit</span>
                  <span>£14,625</span>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">RDEC Scheme</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Qualifying Costs</span>
                  <span>£45,000</span>
                </div>
                <div className="flex justify-between">
                  <span>RDEC Rate (20%)</span>
                  <span>£9,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Corporation Tax ({rates ? (rates.corporation_tax_main_rate * 100).toFixed(0) : '25'}%)</span>
                  <span>£2,250</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Net Benefit</span>
                  <span>£6,750</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'creative' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Creative Industry Reliefs</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <div>
                <h3 className="font-medium text-blue-900">Creative Reliefs Available</h3>
                <p className="text-sm text-blue-800 mt-1">
                  Film Tax Relief, High-end TV Tax Relief, Animation Tax Relief, Video Games Tax Relief, Theatre Tax Relief, Orchestra Tax Relief
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-3">Current Claims</h3>
            <p className="text-gray-500">No creative industry reliefs currently claimed for this period.</p>
          </div>
        </div>
      )}

      {activeTab === 'patent-box' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Patent Box Computation</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Patent Box Profits</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Relevant IP Profits</span>
                    <span>£0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Patent Box Rate (10%)</span>
                    <span>0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard Rate ({rates ? (rates.corporation_tax_main_rate * 100).toFixed(0) : '25'}%)</span>
                    <span>{rates ? (rates.corporation_tax_main_rate * 100).toFixed(0) : '25'}%</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Tax Saving</span>
                    <span>£0</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Development Fraction</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Development Expenditure</span>
                    <span>£0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Expenditure</span>
                    <span>£0</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Development Fraction</span>
                    <span>0%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                No qualifying patent box profits identified for this period. Ensure all relevant IP income is properly classified.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RDCreativeReliefs
