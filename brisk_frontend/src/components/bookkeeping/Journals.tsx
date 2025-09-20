import React, { useState, useEffect } from 'react'
import { BookOpen, Plus, Search, Filter, RefreshCw, Upload, Target, RotateCcw } from 'lucide-react'
import { bookkeepingApi } from '../../services/api'

const Journals: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general-journal')
  const [loading, setLoading] = useState(true)
  const [, setJournalEntries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await bookkeepingApi.getJournalEntries()
        setJournalEntries(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching journal entries:', error)
        setLoading(false)
      }
    }

    fetchJournalEntries()
  }, [])

  const mockJournalEntries = [
    {
      id: 1,
      journalNumber: 'JE-2024-001',
      entryDate: '2024-01-15',
      description: 'Depreciation adjustment',
      reference: 'DEP001',
      totalDebit: 2500.00,
      totalCredit: 2500.00,
      status: 'posted'
    },
    {
      id: 2,
      journalNumber: 'JE-2024-002',
      entryDate: '2024-01-12',
      description: 'Accrued expenses',
      reference: 'ACC001',
      totalDebit: 1500.00,
      totalCredit: 1500.00,
      status: 'draft'
    }
  ]

  const tabs = [
    { id: 'general-journal', name: 'General Journal', icon: BookOpen },
    { id: 'recurring', name: 'Recurring', icon: RefreshCw },
    { id: 'import-export', name: 'Import/Export', icon: Upload },
    { id: 'allocations', name: 'Allocations', icon: Target },
    { id: 'reversing-entries', name: 'Reversing Entries', icon: RotateCcw }
  ]

  const renderGeneralJournal = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">General Journal</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search journal entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Journal #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockJournalEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.journalNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.entryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{entry.totalDebit.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{entry.totalCredit.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      entry.status === 'posted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    {entry.status === 'draft' && (
                      <>
                        <button className="text-green-600 hover:text-green-900 mr-3">Post</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </>
                    )}
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
        <h1 className="text-2xl font-bold text-gray-900">Journals</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Bulk Import
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

      {activeTab === 'general-journal' && renderGeneralJournal()}
      {activeTab === 'recurring' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Recurring journal entries coming soon...</p>
        </div>
      )}
      {activeTab === 'import-export' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Import/Export functionality coming soon...</p>
        </div>
      )}
      {activeTab === 'allocations' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Allocation journals coming soon...</p>
        </div>
      )}
      {activeTab === 'reversing-entries' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Reversing entries coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default Journals
