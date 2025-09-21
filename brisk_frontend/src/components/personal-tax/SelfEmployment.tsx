import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Calculator, TrendingUp, FileText, DollarSign } from 'lucide-react';

interface SelfEmploymentData {
  id: string;
  business_name: string;
  trade_description: string;
  start_date: string;
  accounting_basis: string;
  turnover: number;
  expenses: number;
  capital_allowances: number;
  cis_deducted: number;
}

const SelfEmployment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('businesses');
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState<SelfEmploymentData[]>([]);

  const tabs = [
    { id: 'businesses', label: 'Businesses', icon: Briefcase },
    { id: 'basis', label: 'Basis (Cash/Accruals)', icon: Calculator },
    { id: 'turnover', label: 'Turnover & Expenses', icon: DollarSign },
    { id: 'allowances', label: 'Capital Allowances', icon: TrendingUp },
    { id: 'losses', label: 'Losses & CIS', icon: FileText }
  ];

  useEffect(() => {
    fetchSelfEmploymentData();
  }, []);

  const fetchSelfEmploymentData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/personal-tax/self-employment?tax_year=2024-25');
      const data = await response.json();
      setBusinesses(data.businesses || []);
    } catch (error) {
      console.error('Error fetching self-employment data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Self-Employment (SA103)</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Business</span>
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
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'businesses' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
            <div className="space-y-4">
              {businesses.map((business) => (
                <div key={business.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{business.business_name}</h4>
                      <p className="text-sm text-gray-600">{business.trade_description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Started: {business.start_date}</p>
                      <p className="text-sm text-gray-600">Basis: {business.accounting_basis}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Turnover</label>
                      <p className="text-lg font-semibold text-gray-900">£{business.turnover.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Expenses</label>
                      <p className="text-lg font-semibold text-gray-900">£{business.expenses.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Capital Allowances</label>
                      <p className="text-lg font-semibold text-gray-900">£{business.capital_allowances.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Profit</label>
                      <p className="text-lg font-semibold text-green-600">
                        £{(business.turnover - business.expenses - business.capital_allowances).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'basis' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accounting Basis</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Accounting Basis</label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="cash-basis"
                      name="accounting-basis"
                      type="radio"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="cash-basis" className="ml-3 block text-sm font-medium text-gray-700">
                      Cash Basis
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="accruals-basis"
                      name="accounting-basis"
                      type="radio"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                    />
                    <label htmlFor="accruals-basis" className="ml-3 block text-sm font-medium text-gray-700">
                      Traditional Accounting (Accruals)
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="font-medium text-blue-900 mb-2">Cash Basis Information</h4>
                <p className="text-sm text-blue-800">
                  Under cash basis, you record income when you receive it and expenses when you pay them. 
                  This is simpler but has restrictions on allowable expenses and capital allowances.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'turnover' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Turnover & Expenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Income</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sales/Turnover</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Business Income</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Expenses</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost of Goods Sold</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Office Costs</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Travel Costs</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'allowances' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Capital Allowances</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Annual Investment Allowance</h4>
                  <input
                    type="number"
                    className="text-2xl font-bold text-gray-900 border-none bg-transparent w-full"
                  />
                  <p className="text-sm text-gray-600">100% allowance</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Writing Down Allowance</h4>
                  <input
                    type="number"
                    className="text-2xl font-bold text-gray-900 border-none bg-transparent w-full"
                  />
                  <p className="text-sm text-gray-600">18% rate</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">First Year Allowance</h4>
                  <input
                    type="number"
                    className="text-2xl font-bold text-gray-900 border-none bg-transparent w-full"
                  />
                  <p className="text-sm text-gray-600">100% allowance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'losses' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Losses & CIS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Loss Relief</h4>
                <div className="space-y-4">
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
              <div>
                <h4 className="font-medium text-gray-900 mb-4">CIS Deductions</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CIS Tax Deducted</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total CIS Income</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfEmployment;
