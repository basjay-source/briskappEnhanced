import React, { useState } from 'react';
import { CreditCard, Plus, Calculator, Clock } from 'lucide-react';

const PaymentsLiabilities: React.FC = () => {
  const [activeTab, setActiveTab] = useState('poa');

  const tabs = [
    { id: 'poa', label: 'Payments on Account', icon: CreditCard },
    { id: 'balancing', label: 'Balancing Payment/Refund', icon: Calculator },
    { id: 'cis', label: 'CIS Suffered', icon: Plus },
    { id: 'ttp', label: 'Time to Pay', icon: Clock }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Payments & Liabilities</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Calculate Payments
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
        {activeTab === 'poa' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Payments on Account</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Current Year POA</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">POA 1 (31 Jan)</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="1000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">POA 2 (31 Jul)</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="1000"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">POA Reduction Claim</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="poa-reduction"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="poa-reduction" className="ml-2 text-sm text-gray-700">
                      Claim POA reduction
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reduced Amount</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Justification</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      rows={3}
                      placeholder="Reason for reduction claim"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'balancing' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Balancing Payment/Refund</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <h4 className="font-medium text-gray-900 mb-2">Tax Calculation Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tax Due</span>
                  <span className="font-medium">£12,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Deducted (PAYE/CIS)</span>
                  <span className="font-medium">£8,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payments on Account</span>
                  <span className="font-medium">£2,000</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Balancing Payment Due</span>
                  <span className="text-red-600">£1,950</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="12345678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort Code</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="12-34-56"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cis' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">CIS Tax Suffered</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">ABC Construction Ltd</h4>
                    <p className="text-sm text-gray-600">UTR: 1234567890</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">£1,500</p>
                    <p className="text-sm text-gray-600">Tax Deducted</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Gross Payment</label>
                    <p className="text-lg font-semibold text-gray-900">£7,500</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">CIS Rate</label>
                    <p className="text-lg font-semibold text-gray-900">20%</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Net Payment</label>
                    <p className="text-lg font-semibold text-gray-900">£6,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ttp' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Time to Pay Arrangements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Outstanding Amount</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="1950"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Payment</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Time to Pay Information</h4>
              <p className="text-sm text-yellow-800">
                Interest will be charged on outstanding amounts. Contact HMRC to set up a payment plan.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsLiabilities;
