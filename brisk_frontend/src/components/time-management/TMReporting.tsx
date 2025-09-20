import React, { useState } from 'react'
import { TrendingUp, Users, DollarSign, Clock, Target, Calendar, Download } from 'lucide-react'

const TMReporting: React.FC = () => {
  const [activeTab, setActiveTab] = useState('utilization')
  const [dateRange, setDateRange] = useState('this-month')

  const utilizationData = [
    { name: 'John Smith', role: 'Partner', capacity: 160, billable: 142, utilization: 88.8, target: 85 },
    { name: 'Sarah Johnson', role: 'Manager', capacity: 160, billable: 128, utilization: 80.0, target: 80 },
    { name: 'Mike Wilson', role: 'Senior', capacity: 160, billable: 115, utilization: 71.9, target: 75 },
    { name: 'Emma Davis', role: 'Staff', capacity: 160, billable: 120, utilization: 75.0, target: 70 },
    { name: 'Tom Brown', role: 'Trainee', capacity: 160, billable: 95, utilization: 59.4, target: 60 }
  ]

  const realizationData = [
    { engagement: 'Acme Corp Audit', standard: 45000, billed: 42000, collected: 42000, realization: 93.3 },
    { engagement: 'Tech Ltd Tax', standard: 28000, billed: 26000, collected: 24000, realization: 85.7 },
    { engagement: 'Global Inc Advisory', standard: 35000, billed: 33000, collected: 30000, realization: 85.7 },
    { engagement: 'Startup Co Due Diligence', standard: 18000, billed: 18000, collected: 16000, realization: 88.9 },
    { engagement: 'Manufacturing Ltd Audit', standard: 52000, billed: 48000, collected: 48000, realization: 92.3 }
  ]

  const wipData = [
    { engagement: 'Acme Corp Audit', wipValue: 12500, age: 15, status: 'Ready to Bill' },
    { engagement: 'Tech Ltd Tax', wipValue: 8500, age: 8, status: 'In Progress' },
    { engagement: 'Global Inc Advisory', wipValue: 15000, age: 45, status: 'Overdue' },
    { engagement: 'Startup Co Due Diligence', wipValue: 6500, age: 3, status: 'Recent' },
    { engagement: 'Manufacturing Ltd Audit', wipValue: 22000, age: 22, status: 'Ready to Bill' }
  ]

  const arData = [
    { client: 'Acme Corp', amount: 15000, daysOutstanding: 2, bucket: '0-30 days' },
    { client: 'Tech Ltd', amount: 8500, daysOutstanding: 27, bucket: '0-30 days' },
    { client: 'Global Inc', amount: 12000, daysOutstanding: 63, bucket: '60-90 days' },
    { client: 'Startup Co', amount: 3500, daysOutstanding: 129, bucket: '90+ days' },
    { client: 'Manufacturing Ltd', amount: 25000, daysOutstanding: 5, bucket: '0-30 days' }
  ]

  const profitabilityData = [
    { serviceLine: 'Audit', revenue: 185000, costs: 125000, margin: 32.4 },
    { serviceLine: 'Tax', revenue: 95000, costs: 68000, margin: 28.4 },
    { serviceLine: 'Advisory', revenue: 145000, costs: 98000, margin: 32.4 },
    { serviceLine: 'Due Diligence', revenue: 75000, costs: 52000, margin: 30.7 },
    { serviceLine: 'Compliance', revenue: 65000, costs: 48000, margin: 26.2 }
  ]

  const forecastData = [
    { month: 'Jan 2024', pipeline: 125000, scheduled: 85000, retainers: 45000, total: 255000 },
    { month: 'Feb 2024', pipeline: 135000, scheduled: 92000, retainers: 45000, total: 272000 },
    { month: 'Mar 2024', pipeline: 145000, scheduled: 88000, retainers: 45000, total: 278000 },
    { month: 'Apr 2024', pipeline: 155000, scheduled: 95000, retainers: 45000, total: 295000 },
    { month: 'May 2024', pipeline: 165000, scheduled: 102000, retainers: 45000, total: 312000 }
  ]

  const tabs = [
    { id: 'utilization', name: 'Utilization', icon: Users },
    { id: 'realization', name: 'Realization & Effective Rate', icon: TrendingUp },
    { id: 'wip-days', name: 'WIP Days', icon: Clock },
    { id: 'ar-days', name: 'AR Days', icon: Calendar },
    { id: 'profitability', name: 'Profitability', icon: DollarSign },
    { id: 'forecast', name: 'Forecast', icon: Target }
  ]

  const renderUtilization = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Utilization</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">78.5%</div>
          <p className="text-sm text-gray-500">vs 75% target</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78.5%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Capacity</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">800h</div>
          <p className="text-sm text-gray-500">This month</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Billable: 628h</span>
              <span className="text-green-600">78.5%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Non-billable: 172h</span>
              <span className="text-gray-600">21.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">By Service Line</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Audit</span>
              <span className="text-sm font-medium">285h (45%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tax</span>
              <span className="text-sm font-medium">188h (30%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Advisory</span>
              <span className="text-sm font-medium">155h (25%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Person</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billable</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {utilizationData.map((person, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {person.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {person.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {person.capacity}h
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {person.billable}h
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${person.utilization}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{person.utilization}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {person.target}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    person.utilization >= person.target ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {person.utilization >= person.target ? '+' : ''}{(person.utilization - person.target).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderRealization = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Realization</h3>
          <div className="text-3xl font-bold text-green-600 mb-2">89.2%</div>
          <p className="text-sm text-gray-500">Billing to collection</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Realization</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">92.3%</div>
          <p className="text-sm text-gray-500">Standard to billed</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Realization</h3>
          <div className="text-3xl font-bold text-purple-600 mb-2">96.6%</div>
          <p className="text-sm text-gray-500">Billed to collected</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billed Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collected Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Realization</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {realizationData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.engagement}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{item.standard.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{item.billed.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{item.collected.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    item.realization >= 90 ? 'text-green-600' :
                    item.realization >= 80 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {item.realization}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderWIPDays = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average WIP Days</h3>
          <div className="text-3xl font-bold text-orange-600 mb-2">18.6</div>
          <p className="text-sm text-gray-500">Days to bill</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total WIP</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">£64.5k</div>
          <p className="text-sm text-gray-500">Unbilled value</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overdue WIP</h3>
          <div className="text-3xl font-bold text-red-600 mb-2">£15k</div>
          <p className="text-sm text-gray-500">Over 30 days</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WIP Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age (Days)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {wipData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.engagement}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{item.wipValue.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    item.age > 30 ? 'text-red-600' :
                    item.age > 14 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {item.age}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'Ready to Bill' ? 'bg-green-100 text-green-800' :
                    item.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                    item.status === 'Recent' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderARDays = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average AR Days</h3>
          <div className="text-3xl font-bold text-red-600 mb-2">45.2</div>
          <p className="text-sm text-gray-500">Days outstanding</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total AR</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">£64k</div>
          <p className="text-sm text-gray-500">Outstanding</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overdue AR</h3>
          <div className="text-3xl font-bold text-red-600 mb-2">£15.5k</div>
          <p className="text-sm text-gray-500">Over 30 days</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Outstanding</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aging Bucket</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {arData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{item.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    item.daysOutstanding > 60 ? 'text-red-600' :
                    item.daysOutstanding > 30 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {item.daysOutstanding}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    item.bucket === '0-30 days' ? 'bg-green-100 text-green-800' :
                    item.bucket === '60-90 days' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.bucket}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderProfitability = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Margin</h3>
          <div className="text-3xl font-bold text-green-600 mb-2">30.8%</div>
          <p className="text-sm text-gray-500">Gross margin</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Revenue</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">£565k</div>
          <p className="text-sm text-gray-500">This period</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Costs</h3>
          <div className="text-3xl font-bold text-gray-600 mb-2">£391k</div>
          <p className="text-sm text-gray-500">Direct costs</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Line</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Profit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin %</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profitabilityData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.serviceLine}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{item.revenue.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{item.costs.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  £{(item.revenue - item.costs).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    item.margin >= 30 ? 'text-green-600' :
                    item.margin >= 25 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {item.margin}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderForecast = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Month Forecast</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">£272k</div>
          <p className="text-sm text-gray-500">February 2024</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Value</h3>
          <div className="text-3xl font-bold text-green-600 mb-2">£135k</div>
          <p className="text-sm text-gray-500">Potential revenue</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recurring Revenue</h3>
          <div className="text-3xl font-bold text-purple-600 mb-2">£45k</div>
          <p className="text-sm text-gray-500">Monthly retainers</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pipeline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retainers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Forecast</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {forecastData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{item.pipeline.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{item.scheduled.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{item.retainers.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  £{item.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reporting &amp; Analytics</h1>
          <p className="text-gray-600 mt-2">Track utilization, realization, WIP/AR days, profitability and forecast revenue</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-quarter">This Quarter</option>
            <option value="this-year">This Year</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
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
          {activeTab === 'utilization' && renderUtilization()}
          {activeTab === 'realization' && renderRealization()}
          {activeTab === 'wip-days' && renderWIPDays()}
          {activeTab === 'ar-days' && renderARDays()}
          {activeTab === 'profitability' && renderProfitability()}
          {activeTab === 'forecast' && renderForecast()}
        </div>
      </div>
    </div>
  )
}

export default TMReporting
