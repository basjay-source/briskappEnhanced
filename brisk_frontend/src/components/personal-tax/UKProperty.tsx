import React, { useState, useEffect } from 'react';
import { Home, Plus, Calculator, TrendingUp, Minus } from 'lucide-react';

const UKProperty: React.FC = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [loading, setLoading] = useState(true);
  const [propertyData, setPropertyData] = useState<any>(null);

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/uk-property?tax_year=2024-25`);
      const data = await response.json();
      setPropertyData(data);
    } catch (error) {
      console.error('Error fetching property data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = () => {
    console.log('Add property functionality');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!propertyData) {
    return <div className="text-center text-gray-500">Failed to load property data</div>;
  }

  const tabs = [
    { id: 'properties', label: 'Property List', icon: Home },
    { id: 'fhl', label: 'FHL Tests', icon: Calculator },
    { id: 'income', label: 'Rents & Expenses', icon: TrendingUp },
    { id: 'allowances', label: 'Allowances', icon: Plus },
    { id: 'losses', label: 'Losses', icon: Minus }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">UK Property (SA105)</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button 
            onClick={handleAddProperty}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
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
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Property Portfolio</h3>
            {propertyData.properties.map((property: any) => (
              <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{property.address}</h4>
                    <p className="text-sm text-gray-600">{property.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">£{property.net_profit.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Annual Profit</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Rental Income</label>
                    <p className="text-lg font-semibold text-gray-900">£{property.rental_income.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Expenses</label>
                    <p className="text-lg font-semibold text-gray-900">£{property.expenses.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Mortgage Interest</label>
                    <p className="text-lg font-semibold text-gray-900">£{property.mortgage_interest.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Net Profit</label>
                    <p className="text-lg font-semibold text-green-600">£{property.net_profit.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'fhl' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Furnished Holiday Lettings Tests</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-2">FHL Qualification Tests</h4>
              <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                <li>Property must be available for letting for at least 210 days</li>
                <li>Property must be actually let for at least 105 days</li>
                <li>No single letting can exceed 31 consecutive days for more than 155 days</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Days Available</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder={propertyData.fhl_tests.days_available_required.toString()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Days Let</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder={propertyData.fhl_tests.days_let_required.toString()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Long Lettings (&gt;31 days)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'income' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Rental Income & Expenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Income</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rental Income</label>
                    <input
                      type="number"
                        />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Premiums</label>
                    <input
                      type="number"
                        />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Expenses</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Repairs & Maintenance</label>
                    <input
                      type="number"
                        />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Management Fees</label>
                    <input
                      type="number"
                        />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                    <input
                      type="number"
                        />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'allowances' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Property Allowances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Property Allowance</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="property-allowance"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="property-allowance" className="ml-2 text-sm text-gray-700">
                      Claim Property Allowance (£{propertyData.allowances.property_allowance.toLocaleString()})
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Cannot claim expenses if using property allowance
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Rent-a-Room Relief</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rent-a-room"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rent-a-room" className="ml-2 text-sm text-gray-700">
                      Claim Rent-a-Room Relief (£{propertyData.allowances.rent_a_room_relief.toLocaleString()})
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    For letting furnished rooms in your main home
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'losses' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Property Losses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Losses Brought Forward</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Year Loss</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UKProperty;
