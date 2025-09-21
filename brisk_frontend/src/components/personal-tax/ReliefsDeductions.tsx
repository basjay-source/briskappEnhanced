import React, { useState, useEffect } from 'react';
import { Shield, Plus, Heart, TrendingUp, TrendingDown, Users, Calculator } from 'lucide-react';

const ReliefsDeductions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('giftaid');
  const [loading, setLoading] = useState(true);
  const [reliefsData, setReliefsData] = useState<any>(null);

  useEffect(() => {
    fetchReliefsData();
  }, []);

  const fetchReliefsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/reliefs-deductions?tax_year=2024-25`);
      const data = await response.json();
      setReliefsData(data);
    } catch (error) {
      console.error('Error fetching reliefs data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRelief = async (reliefType: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/reliefs-deductions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: reliefType, taxpayer_id: 1 })
      });
      if (response.ok) {
        fetchReliefsData();
      }
    } catch (error) {
      console.error('Error adding relief:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!reliefsData) {
    return <div className="text-center text-gray-500">Failed to load reliefs data</div>;
  }

  const tabs = [
    { id: 'giftaid', label: 'Gift Aid', icon: Heart },
    { id: 'pensions', label: 'Pension Contributions', icon: Shield },
    { id: 'investments', label: 'EIS/SEIS/VCT', icon: TrendingUp },
    { id: 'losses', label: 'Trade/Property Losses', icon: TrendingDown },
    { id: 'marriage', label: 'Marriage Allowance', icon: Users },
    { id: 'allowances', label: 'Allowances', icon: Calculator }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reliefs & Deductions</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button 
            onClick={() => handleAddRelief('general')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Relief</span>
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
        {activeTab === 'giftaid' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Gift Aid Donations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Donations</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carry Back to Previous Year</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="font-medium text-green-900 mb-2">Gift Aid Relief</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-800">Donations Made</span>
                  <span className="font-medium">£{reliefsData.gift_aid.total_donations.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-800">Basic Rate Relief ({(reliefsData.gift_aid.basic_rate_relief * 100).toFixed(0)}%)</span>
                  <span className="font-medium">£{(reliefsData.gift_aid.total_donations * reliefsData.gift_aid.basic_rate_relief).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-800">Higher Rate Relief</span>
                  <span className="font-medium">£{(reliefsData.gift_aid.total_donations * reliefsData.gift_aid.higher_rate_relief).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pensions' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Pension Contributions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Personal Contributions</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employer Contributions</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relief at Source</label>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Net Pay Arrangement</label>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-2">Annual Allowance Check</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-800">Annual Allowance 2024-25</span>
                  <span className="font-medium">£{reliefsData.pensions.annual_allowance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-800">Total Contributions</span>
                  <span className="font-medium">£{(reliefsData.pensions.personal_contributions + reliefsData.pensions.employer_contributions).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-800">Remaining Allowance</span>
                  <span className="font-medium text-green-600">£{(reliefsData.pensions.annual_allowance - reliefsData.pensions.personal_contributions - reliefsData.pensions.employer_contributions).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investments' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Investment Reliefs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">EIS (Enterprise Investment Scheme)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relief Rate</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={`${(reliefsData.investment_reliefs.eis_relief_rate * 100).toFixed(0)}%`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">SEIS (Seed Enterprise Investment Scheme)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relief Rate</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={`${(reliefsData.investment_reliefs.seis_relief_rate * 100).toFixed(0)}%`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">VCT (Venture Capital Trust)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relief Rate</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={`${(reliefsData.investment_reliefs.vct_relief_rate * 100).toFixed(0)}%`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marriage' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Marriage Allowance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transfer to Spouse</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receive from Spouse</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded-md p-4">
              <h4 className="font-medium text-pink-900 mb-2">Marriage Allowance 2024-25</h4>
              <p className="text-sm text-pink-800">
                Transfer up to £{reliefsData.marriage_allowance.transfer_amount.toLocaleString()} of personal allowance to your spouse if they earn less than £{reliefsData.marriage_allowance.income_limit.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'allowances' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Trading & Property Allowances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Trading Allowance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Limit</span>
                    <span className="font-medium">£{reliefsData?.other_allowances?.trading_allowance?.toLocaleString() || '1,000'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Claimed</span>
                    <span className="font-medium">£0</span>
                  </div>
                  <button 
                    onClick={() => handleAddRelief('trading_allowance')}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Claim Trading Allowance
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Property Allowance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Limit</span>
                    <span className="font-medium">£{reliefsData?.other_allowances?.property_allowance?.toLocaleString() || '1,000'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Claimed</span>
                    <span className="font-medium">£0</span>
                  </div>
                  <button 
                    onClick={() => handleAddRelief('property_allowance')}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Claim Property Allowance
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'losses' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Trade & Property Losses</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Trading Losses</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Year Loss</span>
                    <span className="font-medium">£0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brought Forward</span>
                    <span className="font-medium">£0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carried Back</span>
                    <span className="font-medium">£0</span>
                  </div>
                  <button 
                    onClick={() => handleAddRelief('trading_loss')}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Add Trading Loss
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Property Losses</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Year Loss</span>
                    <span className="font-medium">£0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brought Forward</span>
                    <span className="font-medium">£0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Relief</span>
                    <span className="font-medium">£0</span>
                  </div>
                  <button 
                    onClick={() => handleAddRelief('property_loss')}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Add Property Loss
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Loss Relief Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-blue-800">Carry Forward</h5>
                  <p className="text-blue-700">
                    Use losses against future profits from the same trade
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800">Carry Back</h5>
                  <p className="text-blue-700">
                    Use losses against profits from previous 3 years
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800">Sideways Relief</h5>
                  <p className="text-blue-700">
                    Use losses against other income in same or previous year
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReliefsDeductions;
