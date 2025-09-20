import React, { useState, useEffect } from 'react'
import { Search, AlertTriangle, CheckCircle, XCircle, Eye, Filter } from 'lucide-react'
import { amlKycApi } from '../../services/api'

interface Screening {
  id: number
  screening_type: string
  watchlist_name: string
  match_score: number
  match_status: string
  created_at: string
}

const ScreeningSanctions: React.FC = () => {
  const [screenings, setScreenings] = useState<Screening[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const fetchScreenings = async () => {
      try {
        const data = await amlKycApi.getScreenings()
        setScreenings(data)
      } catch (error) {
        console.error('Error fetching screenings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchScreenings()
  }, [])

  const filteredScreenings = screenings.filter(screening => {
    const matchesSearch = screening.watchlist_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         screening.screening_type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || screening.match_status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'true_positive':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'false_positive':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Eye className="w-4 h-4 text-yellow-600" />
      default:
        return <XCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      'true_positive': 'bg-red-100 text-red-800',
      'false_positive': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-red-600 bg-red-100'
    if (score >= 70) return 'text-orange-600 bg-orange-100'
    if (score >= 50) return 'text-yellow-600 bg-yellow-100'
    return 'text-green-600 bg-green-100'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Screening (Sanctions/PEP/Adverse Media)</h1>
          <p className="text-gray-600">Monitor and review screening hits across international watchlists</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{screenings.length}</h3>
            <p className="text-gray-600 text-sm">Total Screenings</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {screenings.filter(s => s.match_status === 'pending').length}
            </h3>
            <p className="text-gray-600 text-sm">Pending Review</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {screenings.filter(s => s.match_status === 'true_positive').length}
            </h3>
            <p className="text-gray-600 text-sm">True Positives</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {screenings.filter(s => s.match_status === 'false_positive').length}
            </h3>
            <p className="text-gray-600 text-sm">False Positives</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Screening Queue</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Search className="w-4 h-4" />
                <span>Run Screening</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by watchlist or screening type..."
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
                <option value="pending">Pending</option>
                <option value="true_positive">True Positive</option>
                <option value="false_positive">False Positive</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Watchlist</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredScreenings.map((screening) => (
                  <tr key={screening.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {screening.screening_type.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {screening.watchlist_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchScoreColor(screening.match_score)}`}>
                        {screening.match_score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(screening.match_status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(screening.match_status)}`}>
                          {screening.match_status.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(screening.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Review</button>
                        <button className="text-green-600 hover:text-green-900">Accept</button>
                        <button className="text-red-600 hover:text-red-900">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Watchlists Monitored</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">UN Sanctions</p>
                  <p className="text-sm text-gray-600">United Nations Security Council</p>
                </div>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">OFAC SDN</p>
                  <p className="text-sm text-gray-600">US Treasury Department</p>
                </div>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">EU Sanctions</p>
                  <p className="text-sm text-gray-600">European Union</p>
                </div>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">UK HMT</p>
                  <p className="text-sm text-gray-600">HM Treasury</p>
                </div>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">PEP Categories</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-sm font-medium text-red-900">Tier 1 - Senior Officials</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">High Risk</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <span className="text-sm font-medium text-orange-900">Tier 2 - Mid-level Officials</span>
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Medium Risk</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <span className="text-sm font-medium text-yellow-900">Tier 3 - Associates</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Low Risk</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-sm font-medium text-blue-900">Family Members</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Variable</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Screening Rules</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fuzzy Match Threshold</label>
                <div className="flex items-center space-x-2">
                  <input type="range" min="50" max="100" value="85" className="flex-1" />
                  <span className="text-sm text-gray-600">85%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth Weight</label>
                <div className="flex items-center space-x-2">
                  <input type="range" min="0" max="100" value="30" className="flex-1" />
                  <span className="text-sm text-gray-600">30%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Review Threshold</label>
                <div className="flex items-center space-x-2">
                  <input type="range" min="90" max="100" value="95" className="flex-1" />
                  <span className="text-sm text-gray-600">95%</span>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Update Rules
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScreeningSanctions
