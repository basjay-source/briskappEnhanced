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
        <div className="text-center py-12">
          <p className="text-gray-500">Rent roll management coming soon...</p>
        </div>
      )}
      {activeTab === 'maintenance' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Maintenance & repairs tracking coming soon...</p>
        </div>
      )}
      {activeTab === 'expenses' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Property expenses management coming soon...</p>
        </div>
      )}
      {activeTab === 'valuations' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Property valuations coming soon...</p>
        </div>
      )}
      {activeTab === 'reports' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Property reports coming soon...</p>
        </div>
      )}
      {activeTab === 'locations' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Location mapping coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default PropertyAccounts
