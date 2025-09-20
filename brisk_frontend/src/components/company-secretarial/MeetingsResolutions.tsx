import React, { useState, useEffect } from 'react'

interface Meeting {
  id: string
  type: 'Board Meeting' | 'General Meeting' | 'AGM' | 'EGM'
  date: string
  time: string
  location: string
  attendees: string[]
  agenda: string[]
  status: 'Scheduled' | 'Completed' | 'Cancelled'
}

interface Resolution {
  id: string
  type: 'Ordinary' | 'Special' | 'Written'
  title: string
  description: string
  proposedDate: string
  passedDate?: string
  status: 'Draft' | 'Proposed' | 'Passed' | 'Failed'
  votesFor?: number
  votesAgainst?: number
}

const MeetingsResolutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('board-meetings')
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [resolutions, setResolutions] = useState<Resolution[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'board-meetings', label: 'Board Meetings', icon: '👔' },
    { id: 'general-meetings', label: 'General Meetings', icon: '🏛️' },
    { id: 'written-resolutions', label: 'Written Resolutions', icon: '📝' },
    { id: 'minute-book', label: 'Minute Book', icon: '📚' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setMeetings([
        {
          id: '1',
          type: 'Board Meeting',
          date: '2024-02-15',
          time: '10:00',
          location: 'Boardroom, Head Office',
          attendees: ['John Smith (Chairman)', 'Sarah Johnson', 'Michael Brown'],
          agenda: ['Approval of accounts', 'Dividend declaration', 'Director appointments'],
          status: 'Scheduled'
        },
        {
          id: '2',
          type: 'AGM',
          date: '2024-03-30',
          time: '14:00',
          location: 'Conference Room A',
          attendees: ['All shareholders'],
          agenda: ['Annual accounts', 'Director re-elections', 'Auditor appointment'],
          status: 'Scheduled'
        }
      ])

      setResolutions([
        {
          id: '1',
          type: 'Ordinary',
          title: 'Approval of Annual Accounts',
          description: 'To approve the annual accounts for the year ended 31 December 2023',
          proposedDate: '2024-01-15',
          passedDate: '2024-01-20',
          status: 'Passed',
          votesFor: 100000,
          votesAgainst: 0
        },
        {
          id: '2',
          type: 'Special',
          title: 'Amendment to Articles of Association',
          description: 'To amend Article 15 regarding director powers',
          proposedDate: '2024-02-01',
          status: 'Draft'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Scheduled': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Proposed': 'bg-blue-100 text-blue-800',
      'Passed': 'bg-green-100 text-green-800',
      'Failed': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'board-meetings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule New Board Meeting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Meeting location or video conference link"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">John Smith (Chairman)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Sarah Johnson</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Michael Brown</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>7 days (Standard)</option>
                      <option>14 days</option>
                      <option>21 days</option>
                      <option>Shorter notice (with consent)</option>
                    </select>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Schedule Meeting
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Send Notices
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Board Meetings</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date &amp; Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agenda Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {meetings.filter(m => m.type === 'Board Meeting').map((meeting) => (
                    <tr key={meeting.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(meeting.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">{meeting.time}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {meeting.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {meeting.attendees.length} attendees
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {meeting.agenda.length} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(meeting.status)}`}>
                          {meeting.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">Minutes</button>
                        <button className="text-gray-600 hover:text-gray-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'general-meetings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule General Meeting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Annual General Meeting (AGM)</option>
                      <option>Extraordinary General Meeting (EGM)</option>
                      <option>Class Meeting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>21 days (Standard)</option>
                      <option>14 days (Special resolution)</option>
                      <option>Shorter notice (with consent)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Meeting venue address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Proxy Voting</label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-gray-600">Allow proxy voting</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Schedule Meeting
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Generate Notice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'written-resolutions':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Written Resolution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Ordinary Resolution</option>
                      <option>Special Resolution</option>
                      <option>Board Resolution</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter resolution title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Text</label>
                    <textarea
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter the full text of the resolution"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Circulation Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Response Deadline</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Circulation Method</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Email</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Post</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Hand delivery</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Create Resolution
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Circulate for Signature
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Resolution Status</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposed Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Votes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resolutions.map((resolution) => (
                    <tr key={resolution.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{resolution.title}</div>
                        <div className="text-sm text-gray-500">{resolution.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resolution.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(resolution.proposedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resolution.votesFor !== undefined ? (
                          <div>
                            <div>For: {resolution.votesFor?.toLocaleString()}</div>
                            <div>Against: {resolution.votesAgainst?.toLocaleString()}</div>
                          </div>
                        ) : (
                          'Pending'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(resolution.status)}`}>
                          {resolution.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Sign</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'minute-book':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Minute Book</h3>
                <div className="flex space-x-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All meetings</option>
                    <option>Board meetings only</option>
                    <option>General meetings only</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Export Minute Book
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Board Meeting - 15 January 2024</h4>
                    <span className="text-sm text-gray-500">Signed</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Present: John Smith (Chairman), Sarah Johnson, Michael Brown
                  </div>
                  <div className="text-sm text-gray-600">
                    Resolutions: Approval of accounts, Dividend declaration (£10,000)
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">View Minutes</button>
                    <button className="text-green-600 hover:text-green-900 text-sm">Download PDF</button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">AGM - 30 March 2023</h4>
                    <span className="text-sm text-gray-500">Signed</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Present: All shareholders
                  </div>
                  <div className="text-sm text-gray-600">
                    Resolutions: Annual accounts approved, Directors re-elected
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">View Minutes</button>
                    <button className="text-green-600 hover:text-green-900 text-sm">Download PDF</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <div>Content not found</div>
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
          <h1 className="text-2xl font-bold text-gray-900">Meetings &amp; Resolutions</h1>
          <p className="text-gray-600">Schedule meetings, manage resolutions and maintain minute book</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Quick Meeting
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Export Minutes
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

export default MeetingsResolutions
