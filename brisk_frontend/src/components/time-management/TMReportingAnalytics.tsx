import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, DollarSign, Clock, Download } from 'lucide-react'

const TMReportingAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedReport, setSelectedReport] = useState('utilization')

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(false)
      } catch (error) {
        console.error('Error fetching reports:', error)
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const utilizationData = [
    { name: 'Jan', utilization: 78, target: 80 },
    { name: 'Feb', utilization: 82, target: 80 },
    { name: 'Mar', utilization: 75, target: 80 },
    { name: 'Apr', utilization: 88, target: 80 },
    { name: 'May', utilization: 85, target: 80 },
    { name: 'Jun', utilization: 79, target: 80 }
  ]

  const realizationData = [
    { name: 'Partner', realization: 95.2, effective_rate: 332 },
    { name: 'Manager', realization: 92.8, effective_rate: 186 },
    { name: 'Senior', realization: 89.5, effective_rate: 134 },
    { name: 'Staff', realization: 87.1, effective_rate: 87 }
  ]

  const profitabilityData = [
    { name: 'Audit', value: 45, color: '#0B5FFF' },
    { name: 'Tax', value: 30, color: '#FF7A00' },
    { name: 'Advisory', value: 20, color: '#10B981' },
    { name: 'Other', value: 5, color: '#6B7280' }
  ]

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">Reporting &amp; Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive time and billing analytics with forecasting</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Utilization</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">78.5%</div>
          <div className="text-sm text-gray-600">
            <span className="text-green-600">+2.3%</span> from last month
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Realization</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">91.2%</div>
          <div className="text-sm text-gray-600">
            <span className="text-green-600">+1.8%</span> from last month
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">WIP Days</h3>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">45</div>
          <div className="text-sm text-gray-600">
            <span className="text-red-600">+3</span> from last month
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">£285K</div>
          <div className="text-sm text-gray-600">
            <span className="text-green-600">+8.2%</span> from last month
          </div>
        </div>
      </div>

      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setSelectedReport('utilization')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            selectedReport === 'utilization' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          Utilization
        </button>
        <button
          onClick={() => setSelectedReport('realization')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            selectedReport === 'realization' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          Realization
        </button>
        <button
          onClick={() => setSelectedReport('profitability')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            selectedReport === 'profitability' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          Profitability
        </button>
        <button
          onClick={() => setSelectedReport('forecast')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            selectedReport === 'forecast' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          Forecast
        </button>
      </div>

      {selectedReport === 'utilization' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilization Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="utilization" stroke="#0B5FFF" strokeWidth={2} />
              <Line type="monotone" dataKey="target" stroke="#FF7A00" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {selectedReport === 'realization' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Realization by Role</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={realizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="realization" fill="#0B5FFF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {selectedReport === 'profitability' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profitability by Service Line</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={profitabilityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {profitabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {selectedReport === 'forecast' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Forecast</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">£320K</div>
              <div className="text-sm text-blue-700">Next Month</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">£950K</div>
              <div className="text-sm text-green-700">Next Quarter</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">£3.8M</div>
              <div className="text-sm text-purple-700">Next Year</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-xs text-gray-600">Manager - Tax</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">95.2%</p>
                <p className="text-xs text-gray-600">Utilization</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Mike Wilson</p>
                <p className="text-xs text-gray-600">Senior - Audit</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">92.8%</p>
                <p className="text-xs text-gray-600">Utilization</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Lisa Brown</p>
                <p className="text-xs text-gray-600">Partner - Advisory</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">89.5%</p>
                <p className="text-xs text-gray-600">Utilization</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Hourly Rate</span>
              <span className="text-sm font-medium">£185</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Effective Rate</span>
              <span className="text-sm font-medium">£169</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Write-off Rate</span>
              <span className="text-sm font-medium text-red-600">8.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Collection Rate</span>
              <span className="text-sm font-medium text-green-600">87.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">AR Days Outstanding</span>
              <span className="text-sm font-medium text-orange-600">62</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">WIP to Revenue Ratio</span>
              <span className="text-sm font-medium">0.44</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TMReportingAnalytics
