import React, { useState, useEffect } from 'react'
import { Plus, Calendar, Clock, Save, Edit } from 'lucide-react'
import { timeFeesApi } from '../../services/api'

const TimeEntryGrid: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'day' | 'week'>('week')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [editingEntry, setEditingEntry] = useState<number | null>(null)

  useEffect(() => {
    const fetchTimeEntries = async () => {
      try {
        await timeFeesApi.getTimeEntries()
      } catch (error) {
        console.error('Error fetching time entries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTimeEntries()
  }, [])

  const mockTimeEntries = [
    {
      id: 1,
      date: '2024-01-15',
      client: 'Acme Corp',
      engagement: 'Annual Audit',
      task: 'Planning',
      hours: 2.5,
      rate: 250,
      narrative: 'Audit planning meeting with client management',
      billable: true,
      status: 'Draft'
    },
    {
      id: 2,
      date: '2024-01-15',
      client: 'Tech Ltd',
      engagement: 'Tax Return',
      task: 'Review',
      hours: 1.5,
      rate: 180,
      narrative: 'Review of corporation tax computation',
      billable: true,
      status: 'Submitted'
    },
    {
      id: 3,
      date: '2024-01-16',
      client: 'Global Inc',
      engagement: 'Advisory',
      task: 'Consultation',
      hours: 1.0,
      rate: 350,
      narrative: 'Strategic advisory call',
      billable: true,
      status: 'Approved'
    }
  ]

  const getWeekDates = (date: string) => {
    const currentDate = new Date(date)
    const week = []
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1))
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day.toISOString().split('T')[0])
    }
    return week
  }

  const weekDates = getWeekDates(selectedDate)

  const renderDayView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {new Date(selectedDate).toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        
        <div className="space-y-3">
          {mockTimeEntries
            .filter(entry => entry.date === selectedDate)
            .map((entry) => (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                    <input
                      type="text"
                      value={entry.client}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly={editingEntry !== entry.id}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
                    <input
                      type="text"
                      value={entry.task}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly={editingEntry !== entry.id}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                    <input
                      type="number"
                      step="0.25"
                      value={entry.hours}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly={editingEntry !== entry.id}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
                    <input
                      type="number"
                      value={entry.rate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly={editingEntry !== entry.id}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Billable</label>
                    <select
                      value={entry.billable ? 'yes' : 'no'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={editingEntry !== entry.id}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="flex items-end space-x-2">
                    {editingEntry === entry.id ? (
                      <button
                        onClick={() => setEditingEntry(null)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md flex items-center space-x-1"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingEntry(entry.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center space-x-1"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Narrative</label>
                  <textarea
                    value={entry.narrative}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly={editingEntry !== entry.id}
                  />
                </div>
              </div>
            ))}
          
          <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Time Entry</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderWeekView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                Client/Task
              </th>
              {weekDates.map((date) => (
                <th key={date} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div>
                    {new Date(date).toLocaleDateString('en-GB', { weekday: 'short' })}
                  </div>
                  <div className="text-sm font-normal">
                    {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockTimeEntries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{entry.client}</div>
                    <div className="text-sm text-gray-500">{entry.task}</div>
                  </div>
                </td>
                {weekDates.map((date) => (
                  <td key={date} className="px-6 py-4 text-center">
                    {entry.date === date ? (
                      <div className="space-y-1">
                        <input
                          type="number"
                          step="0.25"
                          value={entry.hours}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="text-xs text-gray-500">
                          £{(entry.hours * entry.rate).toFixed(0)}
                        </div>
                      </div>
                    ) : (
                      <input
                        type="number"
                        step="0.25"
                        placeholder="0"
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 text-center">
                  <div className="text-sm font-medium text-gray-900">{entry.hours}h</div>
                  <div className="text-sm text-gray-500">£{(entry.hours * entry.rate).toFixed(0)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Time Entry (Grid/Calendar)</h1>
          <p className="text-gray-600 mt-2">Log time via daily or weekly grid with quick-fill narratives</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                viewMode === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Week
            </button>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {viewMode === 'day' ? renderDayView() : renderWeekView()}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Summary</h3>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Hours</span>
              <span className="text-sm font-medium">7.5h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Billable Hours</span>
              <span className="text-sm font-medium">6.5h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Value</span>
              <span className="text-sm font-medium">£1,625</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <Plus className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Import from Calendar
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Copy Previous Day
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Bulk Edit
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Entries</h3>
            <Calendar className="w-5 h-5 text-purple-500" />
          </div>
          <div className="space-y-3">
            {mockTimeEntries.slice(0, 3).map((entry) => (
              <div key={entry.id} className="text-sm">
                <p className="font-medium text-gray-900">{entry.client}</p>
                <p className="text-gray-500">{entry.hours}h - {entry.task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeEntryGrid
