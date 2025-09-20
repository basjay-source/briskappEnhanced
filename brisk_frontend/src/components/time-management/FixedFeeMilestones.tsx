import React, { useState } from 'react'
import { Plus, Search, Target, Calendar, DollarSign, AlertTriangle, Edit } from 'lucide-react'

const FixedFeeMilestones: React.FC = () => {
  const [activeTab, setActiveTab] = useState('schedules')
  const [searchTerm, setSearchTerm] = useState('')

  const fixedFeeSchedules = [
    {
      id: 1,
      engagement: 'Acme Corp Audit',
      client: 'Acme Corp',
      totalFee: 50000.00,
      recognitionMethod: 'Over Time',
      milestones: [
        { name: 'Planning Complete', percentage: 25, amount: 12500.00, dueDate: '2024-02-15', status: 'Completed' },
        { name: 'Fieldwork Complete', percentage: 50, amount: 25000.00, dueDate: '2024-03-15', status: 'In Progress' },
        { name: 'Review Complete', percentage: 75, amount: 37500.00, dueDate: '2024-04-01', status: 'Pending' },
        { name: 'Final Report', percentage: 100, amount: 50000.00, dueDate: '2024-04-15', status: 'Pending' }
      ],
      percentComplete: 35,
      timeSpent: 180,
      budgetHours: 200
    },
    {
      id: 2,
      engagement: 'Tech Ltd Implementation',
      client: 'Tech Ltd',
      totalFee: 25000.00,
      recognitionMethod: 'Point in Time',
      milestones: [
        { name: 'System Setup', percentage: 30, amount: 7500.00, dueDate: '2024-01-31', status: 'Completed' },
        { name: 'Data Migration', percentage: 60, amount: 15000.00, dueDate: '2024-02-28', status: 'Completed' },
        { name: 'Testing & Go-Live', percentage: 100, amount: 25000.00, dueDate: '2024-03-15', status: 'In Progress' }
      ],
      percentComplete: 85,
      timeSpent: 95,
      budgetHours: 100
    },
    {
      id: 3,
      engagement: 'Global Inc Restructure',
      client: 'Global Inc',
      totalFee: 75000.00,
      recognitionMethod: 'Over Time',
      milestones: [
        { name: 'Due Diligence', percentage: 40, amount: 30000.00, dueDate: '2024-02-01', status: 'Completed' },
        { name: 'Structure Design', percentage: 70, amount: 52500.00, dueDate: '2024-03-01', status: 'In Progress' },
        { name: 'Implementation', percentage: 100, amount: 75000.00, dueDate: '2024-04-01', status: 'Pending' }
      ],
      percentComplete: 55,
      timeSpent: 220,
      budgetHours: 300
    }
  ]

  const changeOrders = [
    {
      id: 1,
      engagement: 'Acme Corp Audit',
      description: 'Additional testing required for new subsidiary',
      originalFee: 50000.00,
      additionalFee: 8000.00,
      newTotalFee: 58000.00,
      requestDate: '2024-01-20',
      status: 'Approved',
      approvedBy: 'Partner'
    },
    {
      id: 2,
      engagement: 'Tech Ltd Implementation',
      description: 'Extended training and support period',
      originalFee: 25000.00,
      additionalFee: 5000.00,
      newTotalFee: 30000.00,
      requestDate: '2024-01-18',
      status: 'Pending',
      approvedBy: null
    }
  ]

  const tabs = [
    { id: 'schedules', name: 'Schedules', icon: Calendar },
    { id: 'progress', name: '% Complete', icon: Target },
    { id: 'change-orders', name: 'Change Orders', icon: Edit }
  ]

  const renderSchedules = () => (
    <div className="space-y-6">
      {fixedFeeSchedules.map((schedule) => (
        <div key={schedule.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{schedule.engagement}</h3>
              <p className="text-sm text-gray-600">{schedule.client} • £{schedule.totalFee.toLocaleString()} • {schedule.recognitionMethod}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-lg font-semibold text-blue-600">{schedule.percentComplete}%</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Overall Progress</span>
              <span>{schedule.percentComplete}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${schedule.percentComplete}%` }}
              ></div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Milestone</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">%</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {schedule.milestones.map((milestone, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-900">{milestone.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{milestone.percentage}%</td>
                    <td className="px-4 py-2 text-sm text-gray-900">£{milestone.amount.toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{milestone.dueDate}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {milestone.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )

  const renderProgress = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fee</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Complete</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Spent</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Realization</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fixedFeeSchedules.map((schedule) => {
            const realization = (schedule.percentComplete / (schedule.timeSpent / schedule.budgetHours * 100)) * 100
            return (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{schedule.engagement}</div>
                    <div className="text-sm text-gray-500">{schedule.client}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{schedule.totalFee.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${schedule.percentComplete}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900">{schedule.percentComplete}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{schedule.timeSpent}h</div>
                  <div className="text-sm text-gray-500">of {schedule.budgetHours}h</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${
                    realization > 100 ? 'text-green-600' : 
                    realization > 90 ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {realization.toFixed(1)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    schedule.percentComplete === 100 ? 'bg-green-100 text-green-800' :
                    schedule.percentComplete > 50 ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {schedule.percentComplete === 100 ? 'Complete' :
                     schedule.percentComplete > 50 ? 'In Progress' : 'Starting'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Update</button>
                  <button className="text-gray-600 hover:text-gray-900">View</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

  const renderChangeOrders = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Fee</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Additional Fee</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {changeOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.engagement}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{order.description}</div>
                <div className="text-sm text-gray-500">Requested: {order.requestDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{order.originalFee.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                +£{order.additionalFee.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                £{order.newTotalFee.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  order.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  order.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {order.status === 'Pending' ? (
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-900">Approve</button>
                    <button className="text-red-600 hover:text-red-900">Reject</button>
                  </div>
                ) : (
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fixed-Fee &amp; Milestones</h1>
          <p className="text-gray-600 mt-2">Build fixed-fee schedules, track % complete, and manage change orders</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Schedule</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
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

        <div className="p-6">
          {activeTab === 'schedules' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search schedules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              {renderSchedules()}
            </div>
          )}
          {activeTab === 'progress' && renderProgress()}
          {activeTab === 'change-orders' && renderChangeOrders()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Fixed Fees</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            £{fixedFeeSchedules.reduce((sum, schedule) => sum + schedule.totalFee, 0).toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">Across all engagements</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Average Progress</h3>
            <Target className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(fixedFeeSchedules.reduce((sum, schedule) => sum + schedule.percentComplete, 0) / fixedFeeSchedules.length)}%
          </div>
          <p className="text-sm text-gray-500 mt-1">Across all projects</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Change Orders</h3>
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {changeOrders.filter(order => order.status === 'Pending').length}
          </div>
          <p className="text-sm text-gray-500 mt-1">Pending approval</p>
        </div>
      </div>
    </div>
  )
}

export default FixedFeeMilestones
