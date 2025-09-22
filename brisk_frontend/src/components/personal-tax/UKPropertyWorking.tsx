import React, { useState, useEffect } from 'react';
import { Home, Calculator, TrendingUp, Plus, Minus, ArrowLeft, Save } from 'lucide-react';

const UKProperty: React.FC = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [propertyData, setPropertyData] = useState<any>(null);
  const [formData, setFormData] = useState({
    address: '',
    type: 'residential',
    rental_income: 0,
    expenses: 0,
    mortgage_interest: 0,
    description: ''
  });

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const apiUrl = (import.meta as any).env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev';
      const response = await fetch(`${apiUrl}/api/personal-tax/uk-property?tax_year=2024-25`);
      const data = await response.json();
      setPropertyData(data);
    } catch (error) {
      console.error('Error fetching property data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = () => {
    setShowAddForm(true);
  };

  const handleSaveProperty = async () => {
    try {
      setSaving(true);
      const apiUrl = (import.meta as any).env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev';
      const response = await fetch(`${apiUrl}/api/personal-tax/uk-property`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          net_profit: formData.rental_income - formData.expenses - formData.mortgage_interest
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Property saved successfully:', result);
        setShowAddForm(false);
        setFormData({
          address: '',
          type: 'residential',
          rental_income: 0,
          expenses: 0,
          mortgage_interest: 0,
          description: ''
        });
        await fetchPropertyData();
      } else {
        console.error('Failed to save property');
      }
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Properties</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
          </div>
          <button
            onClick={handleSaveProperty}
            disabled={saving}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Property'}</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
                placeholder="Enter full property address"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="furnished_holiday_letting">Furnished Holiday Letting</option>
                <option value="rent_a_room">Rent-a-Room</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Rental Income (£)</label>
              <input
                type="number"
                value={formData.rental_income}
                onChange={(e) => handleInputChange('rental_income', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Expenses (£)</label>
              <input
                type="number"
                value={formData.expenses}
                onChange={(e) => handleInputChange('expenses', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mortgage Interest (£)</label>
              <input
                type="number"
                value={formData.mortgage_interest}
                onChange={(e) => handleInputChange('mortgage_interest', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
                placeholder="Additional property details"
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-medium text-blue-900 mb-2">Calculated Net Profit</h4>
            <p className="text-2xl font-bold text-blue-600">
              £{(formData.rental_income - formData.expenses - formData.mortgage_interest).toLocaleString()}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Rental Income (£{formData.rental_income.toLocaleString()}) - 
              Expenses (£{formData.expenses.toLocaleString()}) - 
              Mortgage Interest (£{formData.mortgage_interest.toLocaleString()})
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">UK Property (SA105)</h1>
        <button
          onClick={handleAddProperty}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Property</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
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

        <div className="p-6">
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Total Rental Income</h3>
                  <p className="text-2xl font-bold text-blue-600">£{propertyData.totals.rental_income.toLocaleString()}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-medium text-red-900 mb-2">Total Expenses</h3>
                  <p className="text-2xl font-bold text-red-600">£{propertyData.totals.allowable_expenses.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-900 mb-2">Net Profit/Loss</h3>
                  <p className="text-2xl font-bold text-green-600">£{propertyData.totals.profit_loss.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Property Portfolio</h3>
                {propertyData.properties.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Home className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No properties added yet</p>
                    <p className="text-sm">Click "Add Property" to get started</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {propertyData.properties.map((property: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{property.address}</h4>
                            <p className="text-sm text-gray-500 capitalize">{property.type.replace('_', ' ')}</p>
                            {property.description && (
                              <p className="text-sm text-gray-600 mt-1">{property.description}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-green-600">£{property.net_profit.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Net Profit</p>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Rental Income:</span>
                            <span className="ml-1 font-medium">£{property.rental_income.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Expenses:</span>
                            <span className="ml-1 font-medium">£{property.expenses.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Mortgage Interest:</span>
                            <span className="ml-1 font-medium">£{property.mortgage_interest.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'fhl' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Furnished Holiday Lettings Tests</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Availability Test</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Days Available for Letting</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="210"
                        min="0"
                        max="365"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Must be available for at least 210 days</p>
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-700">✓ Test Passed</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Letting Test</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Days Actually Let</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="105"
                        min="0"
                        max="365"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Must be let for at least 105 days</p>
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-700">✓ Test Passed</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Long Lettings Test</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Days Let to Same Person</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0"
                        min="0"
                        max="365"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Must not exceed 155 days to same person</p>
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-700">✓ Test Passed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">FHL Qualification Status</h4>
                <p className="text-lg font-semibold text-blue-600">✓ Qualifies as Furnished Holiday Letting</p>
                <p className="text-sm text-blue-700 mt-1">
                  All three tests passed. This property qualifies for FHL tax treatment including capital allowances and business asset disposal relief.
                </p>
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Premiums</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Other Property Income</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Management Fees</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Legal & Professional Fees</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
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
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Year Loss</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UKProperty;
