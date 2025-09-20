import React, { useState, useEffect } from 'react'

interface Note {
  id: string
  title: string
  category: string
  required: boolean
  completed: boolean
  autoPopulated: boolean
  content: string
  figures: { [key: string]: number | string }
  missingInputs: string[]
}

const NotesDisclosures: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('accounting-policies')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [notes, setNotes] = useState<Note[]>([])

  const sampleNotes: Note[] = [
    {
      id: '1',
      title: 'Accounting Policies',
      category: 'Policies',
      required: true,
      completed: true,
      autoPopulated: true,
      content: 'The financial statements have been prepared under the historical cost convention and in accordance with Financial Reporting Standard 102.',
      figures: {},
      missingInputs: []
    },
    {
      id: '2',
      title: 'Tangible Fixed Assets',
      category: 'Fixed Assets',
      required: true,
      completed: true,
      autoPopulated: true,
      content: 'Tangible fixed assets are stated at cost less accumulated depreciation.',
      figures: {
        'Cost at start': 850000,
        'Additions': 120000,
        'Cost at end': 920000,
        'Net book value': 660000
      },
      missingInputs: []
    },
    {
      id: '3',
      title: 'Related Party Transactions',
      category: 'Related Parties',
      required: true,
      completed: false,
      autoPopulated: false,
      content: '',
      figures: {},
      missingInputs: ['Director loan balances', 'Transaction details', 'Terms and conditions']
    }
  ]

  useEffect(() => {
    setNotes(sampleNotes)
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredNotes = notes.filter(note => {
    if (activeTab === 'accounting-policies') return note.category === 'Policies'
    if (activeTab === 'fixed-assets') return note.category === 'Fixed Assets'
    if (activeTab === 'related-parties') return note.category === 'Related Parties'
    return true
  })

  const updateNoteContent = (id: string, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, content, completed: content.length > 0 } : note
    ))
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Notes & Disclosures</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Auto-Generate Notes
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Preview Accounts
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'accounting-policies', label: 'Accounting Policies' },
            { id: 'fixed-assets', label: 'Fixed Assets Note' },
            { id: 'debtors-creditors', label: 'Debtors/Creditors' },
            { id: 'related-parties', label: 'Related Parties' },
            { id: 'financial-instruments', label: 'Financial Instruments' },
            { id: 'employees', label: 'Average Employees' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
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

      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow border-l-4 border-blue-500">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                  {note.required && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Required</span>
                  )}
                  {note.autoPopulated && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Auto-populated</span>
                  )}
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    note.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {note.completed ? 'Complete' : 'Incomplete'}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedNote(note)}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-4">
                {note.content && (
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-700">{note.content}</p>
                  </div>
                )}

                {Object.keys(note.figures).length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(note.figures).map(([key, value]) => (
                          <tr key={key}>
                            <td className="px-4 py-2 text-sm text-gray-900">{key}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 text-right">
                              {typeof value === 'number' ? `£${value.toLocaleString()}` : value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {note.missingInputs.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="text-sm font-medium text-yellow-800 mb-2">Missing Inputs:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {note.missingInputs.map((input, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                          {input}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedNote.title}</h2>
              <button
                onClick={() => setSelectedNote(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note Content</label>
                <textarea
                  value={selectedNote.content}
                  onChange={(e) => updateNoteContent(selectedNote.id, e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter note content..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setSelectedNote(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Disclosure Completeness Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{notes.length}</div>
            <div className="text-sm text-gray-600">Total Notes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {notes.filter(n => n.completed).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {notes.filter(n => !n.completed).length}
            </div>
            <div className="text-sm text-gray-600">Incomplete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((notes.filter(n => n.completed).length / notes.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotesDisclosures
