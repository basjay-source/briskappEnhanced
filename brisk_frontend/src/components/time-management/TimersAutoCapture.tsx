import React, { useState, useEffect } from 'react'
import { Play, Pause, Square, Timer, Clock, Zap, Settings } from 'lucide-react'

const TimersAutoCapture: React.FC = () => {
  const [activeTimers, setActiveTimers] = useState([
    {
      id: 1,
      client: 'Acme Corp',
      engagement: 'Annual Audit',
      task: 'Planning',
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRunning: true
    },
    {
      id: 2,
      client: 'Tech Ltd',
      engagement: 'Tax Return',
      task: 'Review',
      startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRunning: true
    }
  ])

  const [timerHistory, setTimerHistory] = useState([
    {
      id: 3,
      client: 'Global Inc',
      engagement: 'Advisory',
      task: 'Consultation',
      startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
      duration: 60,
      isRunning: false,
      converted: true
    },
    {
      id: 4,
      client: 'Startup Co',
      engagement: 'Due Diligence',
      task: 'Document Review',
      startTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 4.5 * 60 * 60 * 1000),
      duration: 90,
      isRunning: false,
      converted: false
    }
  ])

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatDuration = (startTime: Date, endTime?: Date) => {
    const end = endTime || currentTime
    const diff = Math.floor((end.getTime() - startTime.getTime()) / 1000)
    const hours = Math.floor(diff / 3600)
    const minutes = Math.floor((diff % 3600) / 60)
    const seconds = diff % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const startTimer = (client: string, engagement: string, task: string) => {
    const newTimer = {
      id: Date.now(),
      client,
      engagement,
      task,
      startTime: new Date(),
      isRunning: true
    }
    setActiveTimers([...activeTimers, newTimer])
  }

  const pauseTimer = (id: number) => {
    setActiveTimers(activeTimers.map(timer => 
      timer.id === id ? { ...timer, isRunning: false } : timer
    ))
  }

  const stopTimer = (id: number) => {
    const timer = activeTimers.find(t => t.id === id)
    if (timer) {
      const duration = Math.floor((currentTime.getTime() - timer.startTime.getTime()) / 60000)
      const historyEntry = {
        ...timer,
        endTime: currentTime,
        duration,
        isRunning: false,
        converted: false
      }
      setTimerHistory([historyEntry, ...timerHistory])
      setActiveTimers(activeTimers.filter(t => t.id !== id))
    }
  }

  const convertToTimeEntry = (id: number) => {
    setTimerHistory(timerHistory.map(entry =>
      entry.id === id ? { ...entry, converted: true } : entry
    ))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Timers &amp; Auto-Capture</h1>
          <p className="text-gray-600 mt-2">Start/stop multi-timers by task with auto-pause on idle</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Play className="w-4 h-4" />
          <span>Start New Timer</span>
        </button>
      </div>

      {/* Active Timers */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Timer className="w-5 h-5 text-green-500" />
            <span>Active Timers ({activeTimers.length})</span>
          </h2>
        </div>
        <div className="p-6">
          {activeTimers.length === 0 ? (
            <div className="text-center py-8">
              <Timer className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No active timers</p>
              <button
                onClick={() => startTimer('New Client', 'New Engagement', 'New Task')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Start Your First Timer
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {activeTimers.map((timer) => (
                <div key={timer.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{timer.client}</h3>
                          <p className="text-sm text-gray-600">{timer.engagement} - {timer.task}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-mono font-bold text-gray-900">
                            {formatDuration(timer.startTime)}
                          </div>
                          <p className="text-sm text-gray-500">
                            Started at {timer.startTime.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {timer.isRunning ? (
                        <button
                          onClick={() => pauseTimer(timer.id)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTimers(activeTimers.map(t => 
                            t.id === timer.id ? { ...t, isRunning: true } : t
                          ))}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => stopTimer(timer.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                      >
                        <Square className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {timer.isRunning && (
                    <div className="mt-3 flex items-center space-x-2 text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Timer running</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Timer History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span>Timer History</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client/Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Period
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
              {timerHistory.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{entry.client}</div>
                      <div className="text-sm text-gray-500">{entry.engagement} - {entry.task}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {entry.startTime.toLocaleTimeString()} - {entry.endTime?.toLocaleTimeString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {entry.startTime.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      entry.converted 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {entry.converted ? 'Converted' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {!entry.converted ? (
                      <button
                        onClick={() => convertToTimeEntry(entry.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Convert to Entry
                      </button>
                    ) : (
                      <span className="text-gray-400">Converted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Auto-Capture Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Auto-Capture</h3>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Browser Extension</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Desktop App</span>
              <span className="text-sm font-medium text-gray-400">Inactive</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Idle Detection</span>
              <span className="text-sm font-medium text-green-600">5 minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Stats</h3>
            <Timer className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Time</span>
              <span className="text-sm font-medium">6h 45m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Timers</span>
              <span className="text-sm font-medium">{activeTimers.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Converted Entries</span>
              <span className="text-sm font-medium">4</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
            <Settings className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Configure Auto-Pause
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Timer Notifications
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Default Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimersAutoCapture
