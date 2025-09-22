import React, { useState, useEffect } from 'react';

interface PropertyData {
  properties: any[];
  allowances: {
    property_allowance: number;
    rent_a_room_relief: number;
  };
  totals: {
    rental_income: number;
    allowable_expenses: number;
    profit_loss: number;
  };
}

const UKProperty: React.FC = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [loading, setLoading] = useState(true);
  const [propertyData, setPropertyData] = useState<PropertyData>({
    properties: [],
    allowances: {
      property_allowance: 1000,
      rent_a_room_relief: 7500
    },
    totals: {
      rental_income: 0,
      allowable_expenses: 0,
      profit_loss: 0
    }
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    propertyType: 'residential',
    rentalIncome: 0,
    expenses: 0,
    mortgageInterest: 0
  });

  const fetchPropertyData = async () => {
    try {
      const response = await fetch(`${(import.meta as any).env.VITE_API_URL}/api/personal-tax/uk-property`);
      if (response.ok) {
        const data = await response.json();
        setPropertyData(data);
      }
    } catch (error) {
      console.error('Error fetching property data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const handleAddProperty = () => {
    setShowAddForm(true);
  };

  const handleSaveProperty = async () => {
    try {
      const response = await fetch(`${(import.meta as any).env.VITE_API_URL}/api/personal-tax/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: formData.address,
          property_type: formData.propertyType,
          rental_income: formData.rentalIncome,
          expenses: formData.expenses,
          mortgage_interest: formData.mortgageInterest,
          net_profit: formData.rentalIncome - formData.expenses - formData.mortgageInterest
        }),
      });

      if (response.ok) {
        await fetchPropertyData();
        setShowAddForm(false);
        setFormData({
          address: '',
          propertyType: 'residential',
          rentalIncome: 0,
          expenses: 0,
          mortgageInterest: 0
        });
      }
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'properties', label: 'Properties' },
    { id: 'fhl', label: 'FHL Tests' },
    { id: 'income', label: 'Income & Expenses' },
    { id: 'allowances', label: 'Allowances' },
    { id: 'losses', label: 'Losses' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
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

        <div className="p-6">
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Property Portfolio</h3>
                <button
                  onClick={handleAddProperty}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                >
                  Add Property
                </button>
              </div>

              {showAddForm && (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Add New Property</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter property address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => handleInputChange('propertyType', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="furnished_holiday">Furnished Holiday Letting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Annual Rental Income</label>
                      <input
                        type="number"
                        value={formData.rentalIncome}
                        onChange={(e) => handleInputChange('rentalIncome', parseFloat(e.target.value) || 0)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Annual Expenses</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mortgage Interest</label>
                      <input
                        type="number"
                        value={formData.mortgageInterest}
                        onChange={(e) => handleInputChange('mortgageInterest', parseFloat(e.target.value) || 0)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Net Profit</label>
                      <input
                        type="number"
                        value={formData.rentalIncome - formData.expenses - formData.mortgageInterest}
                        readOnly
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProperty}
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                    >
                      Save Property
                    </button>
                  </div>
                </div>
              )}

              {propertyData.properties.length === 0 && !showAddForm && (
                <div className="text-center py-8 text-gray-500">
                  <p>No properties added yet. Click "Add Property" to get started.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'fhl' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Furnished Holiday Lettings Tests</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <p className="text-xs text-gray-500">
                      Must be available for at least 210 days in the tax year
                    </p>
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
                    <p className="text-xs text-gray-500">
                      Must be let for at least 105 days in the tax year
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">FHL Qualification Status</h4>
                <p className="text-sm text-blue-700">
                  Property qualifies for FHL treatment if both tests are met. FHL properties benefit from capital gains reliefs and business asset disposal relief.
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
