import React, { useState } from 'react'
import { Building, Home, MapPin, DollarSign, FileText, Users, Calculator, TrendingUp } from 'lucide-react'

const PropertyAccounts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('properties')

  const tabs = [
    { id: 'properties', name: 'Properties', icon: Building },
    { id: 'tenants', name: 'Tenants & Leases', icon: Users },
    { id: 'rent-roll', name: 'Rent Roll', icon: DollarSign },
    { id: 'maintenance', name: 'Maintenance & Repairs', icon: Home },
    { id: 'expenses', name: 'Property Expenses', icon: Calculator },
    { id: 'valuations', name: 'Valuations', icon: TrendingUp },
    { id: 'reports', name: 'Property Reports', icon: FileText },
    { id: 'locations', name: 'Locations & Maps', icon: MapPin }
  ]

  const mockProperties = [
    {
      id: 1,
      address: '123 High Street, London',
      type: 'Commercial',
      units: 5,
      totalArea: 2500,
      occupancyRate: 80,
      monthlyRent: 12500,
      value: 1500000,
      manager: 'John Smith'
    },
    {
      id: 2,
      address: '456 Oak Avenue, Manchester',
      type: 'Residential',
      units: 12,
      totalArea: 1800,
      occupancyRate: 92,
      monthlyRent: 8400,
      value: 980000,
      manager: 'Sarah Johnson'
    }
  ]

  const mockTenants = [
    {
      id: 1,
      name: 'Tech Solutions Ltd',
      property: '123 High Street, London',
      unit: 'Unit 1A',
      leaseStart: '2023-01-01',
      leaseEnd: '2025-12-31',
      monthlyRent: 3500,
      deposit: 10500,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Marketing Agency Co',
      property: '123 High Street, London',
      unit: 'Unit 2B',
      leaseStart: '2023-06-01',
      leaseEnd: '2026-05-31',
      monthlyRent: 2800,
      deposit: 8400,
      status: 'Active'
    }
  ]

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Property Portfolio</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{property.address}</h4>
                <p className="text-sm text-gray-500">{property.type} Property</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-semibold rounded-full">
                {property.units} Units
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Total Area</p>
                <p className="font-semibold">{property.totalArea} sq ft</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Occupancy Rate</p>
                <p className="font-semibold">{property.occupancyRate}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Rent</p>
                <p className="font-semibold">£{property.monthlyRent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Property Value</p>
                <p className="font-semibold">£{property.value.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Manager: {property.manager}</span>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm">View</button>
                <button className="text-green-600 hover:text-green-900 text-sm">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTenants = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Tenants & Leases</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Add Tenant
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lease Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Rent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {tenant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tenant.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tenant.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tenant.leaseStart} - {tenant.leaseEnd}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{tenant.monthlyRent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {tenant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                    <button className="text-purple-600 hover:text-purple-900">Invoice</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Property Accounts</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Property Report
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

      {activeTab === 'properties' && renderProperties()}
      {activeTab === 'tenants' && renderTenants()}
      {activeTab === 'rent-roll' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Rent Roll Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Total Rent</h4>
              <p className="text-2xl font-bold text-blue-600">£20,900</p>
              <p className="text-sm text-blue-700">Monthly income</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">Collected</h4>
              <p className="text-2xl font-bold text-green-600">£19,650</p>
              <p className="text-sm text-green-700">94% collection rate</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Outstanding</h4>
              <p className="text-2xl font-bold text-yellow-600">£1,250</p>
              <p className="text-sm text-yellow-700">Arrears</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900">Void Rate</h4>
              <p className="text-2xl font-bold text-purple-600">8%</p>
              <p className="text-sm text-purple-700">Vacant units</p>
            </div>
          </div>
          <p className="text-gray-600">Track rental income, manage rent reviews, monitor collection rates, and analyze void periods with comprehensive rent roll reporting.</p>
        </div>
      )}
      {activeTab === 'maintenance' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance & Repairs</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Open Tickets</h4>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-blue-700">Active requests</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">Completed</h4>
              <p className="text-2xl font-bold text-green-600">89</p>
              <p className="text-sm text-green-700">This month</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Urgent</h4>
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-yellow-700">High priority</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900">Spend</h4>
              <p className="text-2xl font-bold text-purple-600">£8,450</p>
              <p className="text-sm text-purple-700">This month</p>
            </div>
          </div>
          <p className="text-gray-600">Manage maintenance requests, track repair costs, schedule preventive maintenance, and monitor contractor performance with integrated ticketing system.</p>
        </div>
      )}
      {activeTab === 'expenses' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Property Expenses</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Total Expenses</h4>
              <p className="text-2xl font-bold text-blue-600">£12,340</p>
              <p className="text-sm text-blue-700">This month</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">Maintenance</h4>
              <p className="text-2xl font-bold text-green-600">£4,560</p>
              <p className="text-sm text-green-700">37% of expenses</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Utilities</h4>
              <p className="text-2xl font-bold text-yellow-600">£3,280</p>
              <p className="text-sm text-yellow-700">27% of expenses</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900">Insurance</h4>
              <p className="text-2xl font-bold text-purple-600">£2,150</p>
              <p className="text-sm text-purple-700">17% of expenses</p>
            </div>
          </div>
          <p className="text-gray-600">Track property operating expenses, categorize costs, manage vendor payments, and analyze expense trends with detailed cost reporting.</p>
        </div>
      )}
      {activeTab === 'valuations' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Property Valuations</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Portfolio Value</h4>
              <p className="text-2xl font-bold text-blue-600">£4.8M</p>
              <p className="text-sm text-blue-700">Current valuation</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">YoY Growth</h4>
              <p className="text-2xl font-bold text-green-600">+8.5%</p>
              <p className="text-sm text-green-700">Value appreciation</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Yield</h4>
              <p className="text-2xl font-bold text-yellow-600">5.2%</p>
              <p className="text-sm text-yellow-700">Gross rental yield</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900">Last Valuation</h4>
              <p className="text-2xl font-bold text-purple-600">6</p>
              <p className="text-sm text-purple-700">Months ago</p>
            </div>
          </div>
          <p className="text-gray-600">Track property valuations, monitor market trends, calculate yields and returns, and schedule professional valuations with automated reporting.</p>
        </div>
      )}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Property Reports & Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Reports Generated</h4>
              <p className="text-2xl font-bold text-blue-600">45</p>
              <p className="text-sm text-blue-700">This month</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">Net Income</h4>
              <p className="text-2xl font-bold text-green-600">£8,560</p>
              <p className="text-sm text-green-700">Monthly profit</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Occupancy</h4>
              <p className="text-2xl font-bold text-yellow-600">92%</p>
              <p className="text-sm text-yellow-700">Average rate</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900">ROI</h4>
              <p className="text-2xl font-bold text-purple-600">12.3%</p>
              <p className="text-sm text-purple-700">Annual return</p>
            </div>
          </div>
          <p className="text-gray-600">Generate comprehensive property reports, analyze financial performance, track KPIs, and create investor presentations with advanced analytics.</p>
        </div>
      )}
      {activeTab === 'locations' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Locations & Mapping</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Properties</h4>
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-sm text-blue-700">Total locations</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">Regions</h4>
              <p className="text-2xl font-bold text-green-600">5</p>
              <p className="text-sm text-green-700">Geographic areas</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Avg Distance</h4>
              <p className="text-2xl font-bold text-yellow-600">12.5</p>
              <p className="text-sm text-yellow-700">Miles from office</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900">Transport Links</h4>
              <p className="text-2xl font-bold text-purple-600">18</p>
              <p className="text-sm text-purple-700">Near public transport</p>
            </div>
          </div>
          <p className="text-gray-600">Visualize property locations on interactive maps, analyze geographic distribution, track local market trends, and optimize portfolio positioning.</p>
        </div>
      )}
    </div>
  )
}

export default PropertyAccounts
