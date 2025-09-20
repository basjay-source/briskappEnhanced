import React, { useState, useEffect } from 'react'

interface Vehicle {
  id: string
  make: string
  model: string
  registration: string
  co2Emissions: number
  listPrice: number
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'
  registrationDate: string
  status: 'Available' | 'Assigned' | 'Maintenance'
}

interface Assignment {
  id: string
  vehicle: string
  employee: string
  startDate: string
  endDate?: string
  privateMileage: boolean
  fuelProvided: boolean
  annualBenefit: number
  status: 'Active' | 'Terminated'
}

const CompanyCars: React.FC = () => {
  const [activeTab, setActiveTab] = useState('vehicles')
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'vehicles', label: 'Vehicles', icon: '🚗' },
    { id: 'assignments', label: 'Assignments', icon: '👤' },
    { id: 'fuel-benefit', label: 'Fuel Benefit', icon: '⛽' },
    { id: 'terminations', label: 'Terminations', icon: '🔚' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setVehicles([
        {
          id: '1',
          make: 'BMW',
          model: '320d',
          registration: 'AB24 XYZ',
          co2Emissions: 120,
          listPrice: 35000,
          fuelType: 'Diesel',
          registrationDate: '2024-01-15',
          status: 'Assigned'
        },
        {
          id: '2',
          make: 'Tesla',
          model: 'Model 3',
          registration: 'EV24 ABC',
          co2Emissions: 0,
          listPrice: 42000,
          fuelType: 'Electric',
          registrationDate: '2024-02-01',
          status: 'Available'
        },
        {
          id: '3',
          make: 'Ford',
          model: 'Focus',
          registration: 'CD24 DEF',
          co2Emissions: 110,
          listPrice: 25000,
          fuelType: 'Petrol',
          registrationDate: '2024-01-20',
          status: 'Assigned'
        }
      ])

      setAssignments([
        {
          id: '1',
          vehicle: 'BMW 320d (AB24 XYZ)',
          employee: 'John Smith',
          startDate: '2024-01-15',
          privateMileage: true,
          fuelProvided: true,
          annualBenefit: 4800,
          status: 'Active'
        },
        {
          id: '2',
          vehicle: 'Ford Focus (CD24 DEF)',
          employee: 'Emma Davis',
          startDate: '2024-01-20',
          privateMileage: true,
          fuelProvided: false,
          annualBenefit: 3200,
          status: 'Active'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Available': 'bg-green-100 text-green-800',
      'Assigned': 'bg-blue-100 text-blue-800',
      'Maintenance': 'bg-yellow-100 text-yellow-800',
      'Active': 'bg-green-100 text-green-800',
      'Terminated': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getFuelTypeBadge = (fuelType: string) => {
    const colors = {
      'Petrol': 'bg-orange-100 text-orange-800',
      'Diesel': 'bg-blue-100 text-blue-800',
      'Electric': 'bg-green-100 text-green-800',
      'Hybrid': 'bg-purple-100 text-purple-800'
    }
    return colors[fuelType as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderVehiclesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Vehicle Fleet</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Vehicle
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CO2 / Fuel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                List Price
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
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</div>
                    <div className="text-sm text-gray-500">Registered: {vehicle.registrationDate}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{vehicle.registration}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{vehicle.co2Emissions}g/km</div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFuelTypeBadge(vehicle.fuelType)}`}>
                    {vehicle.fuelType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{vehicle.listPrice.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Assign</button>
                  <button className="text-gray-600 hover:text-gray-900">History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderAssignmentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Vehicle Assignments</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          New Assignment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Benefits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Annual Benefit
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
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{assignment.employee}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{assignment.vehicle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{assignment.startDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    {assignment.privateMileage && (
                      <span className="inline-flex px-1 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                        Private Use
                      </span>
                    )}
                    {assignment.fuelProvided && (
                      <span className="inline-flex px-1 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                        Fuel
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{assignment.annualBenefit.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Calculate</button>
                  <button className="text-red-600 hover:text-red-900">Terminate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderFuelBenefitTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fuel Benefit Calculations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">£25,300</div>
            <div className="text-sm text-gray-600">Fuel Benefit Multiplier (2024-25)</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">2</div>
            <div className="text-sm text-gray-600">Active Fuel Benefits</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">£8,450</div>
            <div className="text-sm text-gray-600">Total Annual Fuel Benefits</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'vehicles': return renderVehiclesTab()
      case 'assignments': return renderAssignmentsTab()
      case 'fuel-benefit': return renderFuelBenefitTab()
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">
              Content for {tabs.find(tab => tab.id === activeTab)?.label} will be displayed here.
            </p>
          </div>
        )
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
          <h1 className="text-2xl font-bold text-gray-900">Company Cars</h1>
          <p className="text-gray-600">Manage company vehicles and benefit calculations</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Calculate Benefits
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

export default CompanyCars
