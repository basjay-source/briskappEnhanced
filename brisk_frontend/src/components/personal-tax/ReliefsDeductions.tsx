import React, { useState } from 'react';
import { Shield, Plus, Heart, GraduationCap, TrendingUp } from 'lucide-react';

const ReliefsDeductions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('giftaid');

  const tabs = [
    { id: 'giftaid', label: 'Gift Aid', icon: Heart },
    { id: 'pensions', label: 'Pension Contributions', icon: Shield },
    { id: 'investments', label: 'EIS/SEIS/VCT', icon: TrendingUp },
    { id: 'losses', label: 'Trade/Property Losses', icon: Plus },
    { id: 'marriage', label: 'Marriage Allowance', icon: Heart },
    { id: 'allowances', label: 'Allowances', icon: GraduationCap }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reliefs & Deductions</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2">
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
                  defaultValue="2000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carry Back to Previous Year</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="font-medium text-green-900 mb-2">Gift Aid Relief</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-800">Donations Made</span>
                  <span className="font-medium">£2,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-800">Basic Rate Relief (25%)</span>
                  <span className="font-medium">£500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-800">Higher Rate Relief</span>
                  <span className="font-medium">£500</span>
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
                  defaultValue="6000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employer Contributions</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="3000"
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
                  <span className="font-medium">£60,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-800">Total Contributions</span>
                  <span className="font-medium">£9,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-800">Remaining Allowance</span>
                  <span className="font-medium text-green-600">£51,000</span>
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
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relief Rate</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value="30%"
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
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relief Rate</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value="50%"
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
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relief Rate</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value="30%"
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
                  defaultValue="1260"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receive from Spouse</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded-md p-4">
              <h4 className="font-medium text-pink-900 mb-2">Marriage Allowance 2024-25</h4>
              <p className="text-sm text-pink-800">
                Transfer up to £1,260 of personal allowance to your spouse if they earn less than £50,270
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
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="trading-allowance"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="trading-allowance" className="ml-2 text-sm text-gray-700">
                      Claim Trading Allowance (£1,000)
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Cannot claim expenses if using trading allowance
                  </p>
                </div>
              </div>
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
                      Claim Property Allowance (£1,000)
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Cannot claim expenses if using property allowance
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
