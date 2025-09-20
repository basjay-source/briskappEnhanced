import React, { useState } from 'react'
import { FileText, CheckCircle, AlertTriangle, DollarSign, Edit, Eye } from 'lucide-react'

const PreBillingReview: React.FC = () => {
  const [selectedEngagement, setSelectedEngagement] = useState('acme-audit')

  const engagements = [
    {
      id: 'acme-audit',
      name: 'Acme Corp Audit',
      client: 'Acme Corp',
      wipValue: 45000,
      budgetValue: 50000,
      feeCapStatus: 'Under Cap',
      readyForBilling: true,
      lastReview: '2024-01-10'
    },
    {
      id: 'tech-tax',
      name: 'Tech Ltd Tax',
      client: 'Tech Ltd',
      wipValue: 28500,
      budgetValue: 30000,
      feeCapStatus: 'Near Cap',
      readyForBilling: false,
      lastReview: '2024-01-08'
    },
    {
      id: 'global-advisory',
      name: 'Global Inc Advisory',
      client: 'Global Inc',
      wipValue: 35000,
      budgetValue: 35000,
      feeCapStatus: 'At Cap',
      readyForBilling: true,
      lastReview: '2024-01-12'
    }
  ]

  const wipDetails = [
    {
      id: 1,
      date: '2024-01-15',
      user: 'John Smith',
      task: 'Audit Planning',
      hours: 8.0,
      rate: 250,
      value: 2000,
      narrative: 'Initial audit planning meeting with client management team',
      billable: true,
      selected: true
    },
    {
      id: 2,
      date: '2024-01-16',
      user: 'Sarah Johnson',
      task: 'Fieldwork',
      hours: 6.5,
      rate: 180,
      value: 1170,
      narrative: 'Testing of sales transactions and controls',
      billable: true,
      selected: true
    },
    {
      id: 3,
      date: '2024-01-17',
      user: 'Mike Wilson',
      task: 'Review',
      hours: 4.0,
      rate: 220,
      value: 880,
      narrative: 'Review of junior staff work papers',
      billable: true,
      selected: false
    },
    {
      id: 4,
      date: '2024-01-18',
      user: 'John Smith',
      task: 'Travel',
      hours: 2.0,
      rate: 250,
      value: 500,
      narrative: 'Travel time to client site',
      billable: false,
      selected: false
    }
  ]

  const selectedEngagementData = engagements.find(e => e.id === selectedEngagement)
  const selectedWipValue = wipDetails.filter(item => item.selected).reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pre-billing Review</h1>
          <p className="text-gray-600 mt-2">Review WIP, check fee caps, edit narratives, and prepare billing packs</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Generate Draft Pack</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Selected WIP</h3>
            <DollarSign className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            £{selectedWipValue.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">Ready for billing</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Budget vs Actual</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {selectedEngagementData ? Math.round((selectedEngagementData.wipValue / selectedEngagementData.budgetValue) * 100) : 0}%
          </div>
          <p className="text-sm text-gray-500 mt-1">Budget consumed</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Fee Cap Status</h3>
            <AlertTriangle className={`w-5 h-5 ${
              selectedEngagementData?.feeCapStatus === 'At Cap' ? 'text-red-500' :
              selectedEngagementData?.feeCapStatus === 'Near Cap' ? 'text-orange-500' :
              'text-green-500'
            }`} />
          </div>
          <div className={`text-lg font-bold ${
            selectedEngagementData?.feeCapStatus === 'At Cap' ? 'text-red-600' :
            selectedEngagementData?.feeCapStatus === 'Near Cap' ? 'text-orange-600' :
            'text-green-600'
          }`}>
            {selectedEngagementData?.feeCapStatus || 'Under Cap'}
          </div>
          <p className="text-sm text-gray-500 mt-1">Current status</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Items Selected</h3>
            <FileText className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {wipDetails.filter(item => item.selected).length}
          </div>
          <p className="text-sm text-gray-500 mt-1">of {wipDetails.length} total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Engagement</h3>
          <div className="space-y-3">
            {engagements.map((engagement) => (
              <button
                key={engagement.id}
                onClick={() => setSelectedEngagement(engagement.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedEngagement === engagement.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{engagement.name}</p>
                    <p className="text-sm text-gray-500">{engagement.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">£{engagement.wipValue.toLocaleString()}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      engagement.feeCapStatus === 'At Cap' ? 'bg-red-100 text-red-800' :
                      engagement.feeCapStatus === 'Near Cap' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {engagement.feeCapStatus}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">WIP Detail - {selectedEngagementData?.name}</h3>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-900">Select All</button>
                <button className="text-sm text-gray-600 hover:text-gray-900">Clear All</button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {wipDetails.map((item) => (
                  <tr key={item.id} className={`hover:bg-gray-50 ${item.selected ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-4">
                      <input 
                        type="checkbox" 
                        checked={item.selected}
                        className="rounded border-gray-300"
                        onChange={() => {}}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.task}</div>
                      <div className="text-sm text-gray-500">{item.narrative}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.hours}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">£{item.value.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">@ £{item.rate}/hr</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Draft Billing Pack Preview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Engagement Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Client:</span>
                <span className="font-medium">{selectedEngagementData?.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Engagement:</span>
                <span className="font-medium">{selectedEngagementData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Budget:</span>
                <span className="font-medium">£{selectedEngagementData?.budgetValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">WIP to Date:</span>
                <span className="font-medium">£{selectedEngagementData?.wipValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Selected for Billing:</span>
                <span className="font-medium text-blue-600">£{selectedWipValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recommended Adjustments</h4>
            <div className="space-y-2">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Write-down Suggestion</p>
                <p className="text-sm text-yellow-700">Consider 5% write-down on travel time (£25)</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Narrative Enhancement</p>
                <p className="text-sm text-blue-700">Add more detail to fieldwork descriptions</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
            Request Partner Approval
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Proceed to Billing
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreBillingReview
