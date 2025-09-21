import React, { useState, useEffect } from 'react';
import { Globe, Plus, Calculator, DollarSign } from 'lucide-react';

const ForeignIncome: React.FC = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const [loading, setLoading] = useState(true);
  const [foreignIncomeData, setForeignIncomeData] = useState<any>(null);

  useEffect(() => {
    fetchForeignIncomeData();
  }, []);

  const fetchForeignIncomeData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/foreign-income?tax_year=2024-25`);
      const data = await response.json();
      setForeignIncomeData(data);
    } catch (error) {
      console.error('Error fetching foreign income data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddForeignIncome = () => {
    console.log('Add foreign income functionality');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!foreignIncomeData) {
    return <div className="text-center text-gray-500">Failed to load foreign income data</div>;
  }

  const tabs = [
    { id: 'categories', label: 'Categories', icon: Globe },
    { id: 'treaty', label: 'Country/Treaty', icon: Calculator },
    { id: 'fx', label: 'FX', icon: DollarSign },
    { id: 'dtr', label: 'Double Tax Relief', icon: Plus }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Foreign Income (SA106)</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button 
            onClick={handleAddForeignIncome}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Foreign Income</span>
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
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Foreign Income Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Income</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pension Income</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interest</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dividends</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Income</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Other Income</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'treaty' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Country & Treaty Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {foreignIncomeData.countries.map((country: string) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Treaty Available</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foreign Tax Paid</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fx' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Foreign Exchange</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foreign Currency</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {foreignIncomeData.currencies.map((currency: string) => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exchange Rate Method</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Spot Rate</option>
                  <option>Average Rate</option>
                  <option>HMRC Rate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foreign Amount</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GBP Equivalent</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dtr' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Double Tax Relief</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relief Method</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Credit Relief</option>
                  <option>Exemption</option>
                  <option>Deduction Relief</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relief Claimed</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-2">DTR Calculation</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-800">Foreign Tax Paid</span>
                  <span className="font-medium">£{foreignIncomeData.dtr_calculation.foreign_tax_paid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-800">UK Tax on Foreign Income</span>
                  <span className="font-medium">£{foreignIncomeData.dtr_calculation.uk_tax_on_foreign_income.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span className="text-blue-900">Relief Available</span>
                  <span className="text-blue-900">£{foreignIncomeData.dtr_calculation.relief_available.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForeignIncome;
