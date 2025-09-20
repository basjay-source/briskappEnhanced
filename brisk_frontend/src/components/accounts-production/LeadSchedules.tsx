import React, { useState, useEffect } from 'react'

interface LeadSchedule {
  id: string
  category: 'SOFP' | 'PL' | 'Subledgers'
  line: string
  currentYear: number
  priorYear: number
  movement: number
  reconciled: boolean
  tolerance: number
  workingPaperRef: string
  tickMarks: string[]
  reviewNotes: string[]
}

const LeadSchedules: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('sofp')
  const [selectedSchedule, setSelectedSchedule] = useState<LeadSchedule | null>(null)
  const [leadSchedules, setLeadSchedules] = useState<LeadSchedule[]>([])

  const sampleLeadSchedules: LeadSchedule[] = [
    {
      id: '1',
      category: 'SOFP',
      line: 'Tangible Fixed Assets',
      currentYear: 720000,
      priorYear: 650000,
      movement: 70000,
      reconciled: true,
      tolerance: 5000,
      workingPaperRef: 'WP-FA-001',
      tickMarks: ['√ Agreed to FA register', '√ Depreciation calculated', '√ Additions verified'],
      reviewNotes: ['All additions supported by invoices', 'Depreciation rates consistent with prior year']
    },
    {
      id: '2',
      category: 'SOFP',
      line: 'Trade Debtors',
      currentYear: 85000,
      priorYear: 65000,
      movement: 20000,
      reconciled: true,
      tolerance: 2000,
      workingPaperRef: 'WP-AR-001',
      tickMarks: ['√ Aged debtors reviewed', '√ Bad debt provision adequate'],
      reviewNotes: ['Increase due to new major customer', 'No significant post year-end receipts']
    },
    {
      id: '3',
      category: 'PL',
      line: 'Turnover',
      currentYear: 850000,
      priorYear: 780000,
      movement: 70000,
      reconciled: true,
      tolerance: 10000,
      workingPaperRef: 'WP-REV-001',
      tickMarks: ['√ Revenue recognition reviewed', '√ Cut-off testing performed'],
      reviewNotes: ['Growth driven by new product launch', 'Revenue recognition policies consistent']
    }
  ]

  useEffect(() => {
    setLeadSchedules(sampleLeadSchedules)
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredSchedules = leadSchedules.filter(schedule => {
    if (activeTab === 'sofp') return schedule.category === 'SOFP'
    if (activeTab === 'pl') return schedule.category === 'PL'
    if (activeTab === 'subledgers') return schedule.category === 'Subledgers'
    return true
  })

  const toggleReconciled = (id: string) => {
    setLeadSchedules(prev => prev.map(schedule => 
      schedule.id === id ? { ...schedule, reconciled: !schedule.reconciled } : schedule
    ))
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Lead Schedules & Working Papers</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate All Schedules
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Working Papers
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'sofp', label: 'Statement of Financial Position' },
            { id: 'pl', label: 'P&L' },
            { id: 'subledgers', label: 'Subledgers' },
            { id: 'tick-marks', label: 'Tick-marks & Cross-refs' }
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

      {(activeTab === 'sofp' || activeTab === 'pl' || activeTab === 'subledgers') && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line Item</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Year</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prior Year</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Movement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id} className={!schedule.reconciled ? 'bg-yellow-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {schedule.line}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                      £{schedule.currentYear.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      £{schedule.priorYear.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className={`font-medium ${
                        schedule.movement > 0 ? 'text-green-600' : 
                        schedule.movement < 0 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {schedule.movement > 0 ? '+' : ''}£{schedule.movement.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={schedule.reconciled}
                          onChange={() => toggleReconciled(schedule.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          schedule.reconciled 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {schedule.reconciled ? 'Reconciled' : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => setSelectedSchedule(schedule)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'tick-marks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Tick-mark Legend</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { symbol: '√', meaning: 'Agreed/Verified', color: 'green' },
                { symbol: '?', meaning: 'Query/Follow-up required', color: 'yellow' },
                { symbol: 'X', meaning: 'Exception/Error', color: 'red' },
                { symbol: 'TB', meaning: 'Agreed to Trial Balance', color: 'blue' },
                { symbol: 'PY', meaning: 'Agreed to Prior Year', color: 'purple' },
                { symbol: 'C', meaning: 'Calculated/Computed', color: 'indigo' }
              ].map((tick) => (
                <div key={tick.symbol} className="p-3 rounded-lg border-2 border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-800">{tick.symbol}</span>
                    <span className="text-sm text-gray-700">{tick.meaning}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedSchedule.line} - Working Paper Details</h2>
              <button
                onClick={() => setSelectedSchedule(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Financial Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Current Year</label>
                      <p className="text-lg font-bold">£{selectedSchedule.currentYear.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Prior Year</label>
                      <p className="text-lg">£{selectedSchedule.priorYear.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Movement</label>
                      <p className={`text-lg font-medium ${
                        selectedSchedule.movement > 0 ? 'text-green-600' : 
                        selectedSchedule.movement < 0 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {selectedSchedule.movement > 0 ? '+' : ''}£{selectedSchedule.movement.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Tolerance</label>
                      <p className="text-lg">£{selectedSchedule.tolerance.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Status & References</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Working Paper Reference</label>
                      <p className="text-lg font-mono">{selectedSchedule.workingPaperRef}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Reconciliation Status</label>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        selectedSchedule.reconciled 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedSchedule.reconciled ? 'Reconciled' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Tick Marks & Procedures</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  {selectedSchedule.tickMarks.map((tick, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span className="text-sm">{tick}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Review Notes</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  {selectedSchedule.reviewNotes.map((note, index) => (
                    <div key={index} className="p-2 bg-white rounded border-l-4 border-blue-500">
                      <span className="text-sm">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setSelectedSchedule(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Schedules</h3>
          <p className="text-2xl font-bold text-gray-900">{leadSchedules.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Reconciled</h3>
          <p className="text-2xl font-bold text-green-600">
            {leadSchedules.filter(s => s.reconciled).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {leadSchedules.filter(s => !s.reconciled).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Completion</h3>
          <p className="text-2xl font-bold text-blue-600">
            {Math.round((leadSchedules.filter(s => s.reconciled).length / leadSchedules.length) * 100)}%
          </p>
        </div>
      </div>
    </div>
  )
}

export default LeadSchedules
