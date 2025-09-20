import React, { useState, useEffect } from 'react'

const GroupConsortia: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('group-members')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <div className="p-6"><div className="animate-pulse space-y-6"><div className="h-8 bg-gray-200 rounded w-1/4"></div><div className="space-y-4">{[...Array(4)].map((_, i) => (<div key={i} className="h-32 bg-gray-200 rounded"></div>))}</div></div></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Group & Consortia (Group relief)</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Add Member</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Generate Letters</button>
        </div>
      </div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[{ id: 'group-members', label: 'Group Members' }, { id: 'surrenders', label: 'Surrenders' }, { id: 'claims-allocations', label: 'Claims & Allocations' }].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{tab.label}</button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Group Relief Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Group Members</h3>
            <p className="text-2xl font-bold text-blue-600">3</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Available Relief</h3>
            <p className="text-2xl font-bold text-green-600">£24,000</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Claimed Relief</h3>
            <p className="text-2xl font-bold text-orange-600">£12,000</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Tax Saved</h3>
            <p className="text-2xl font-bold text-red-600">£3,000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupConsortia
