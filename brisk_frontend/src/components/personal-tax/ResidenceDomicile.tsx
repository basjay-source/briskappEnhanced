import React, { useState } from 'react';
import { MapPin, Calculator, Globe, DollarSign } from 'lucide-react';

const ResidenceDomicile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('srt');

  const tabs = [
    { id: 'srt', label: 'SRT Days & Ties', icon: MapPin },
    { id: 'split', label: 'Split Year', icon: Calculator },
    { id: 'remittance', label: 'Remittance Basis', icon: Globe },
    { id: 'dtr', label: 'DTR Summary', icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Residence & Domicile (SA109)</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Calculate SRT
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
        {activeTab === 'srt' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Statutory Residence Test</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Days in UK</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Tax Year</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="120"
                      max="365"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Previous Year 1</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="90"
                      max="365"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Previous Year 2</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="60"
                      max="365"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Previous Year 3</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="30"
                      max="365"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">UK Ties</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="family-tie"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="family-tie" className="ml-2 text-sm text-gray-700">
                      Family Tie (spouse/partner/children under 18)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="accommodation-tie"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="accommodation-tie" className="ml-2 text-sm text-gray-700">
                      Accommodation Tie (available for 91+ days)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="work-tie"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="work-tie" className="ml-2 text-sm text-gray-700">
                      Work Tie (substantive work in UK)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="country-tie"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="country-tie" className="ml-2 text-sm text-gray-700">
                      Country Tie (UK is most visited country)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="90-day-tie"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="90-day-tie" className="ml-2 text-sm text-gray-700">
                      90 Day Tie (90+ days in UK in either of previous 2 years)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="font-medium text-green-900 mb-2">SRT Result</h4>
              <p className="text-lg font-semibold text-green-800">UK Resident</p>
              <p className="text-sm text-green-700 mt-1">
                Based on 120 days in UK with 2 ties - meets sufficient ties test
              </p>
            </div>
          </div>
        )}

        {activeTab === 'split' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Split Year Treatment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Split Year Case</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>No Split Year</option>
                  <option>Case 1 - Starting full-time work overseas</option>
                  <option>Case 2 - Partner of Case 1</option>
                  <option>Case 3 - Ceasing full-time work in UK</option>
                  <option>Case 4 - Starting full-time work in UK</option>
                  <option>Case 5 - Partner of Case 4</option>
                  <option>Case 6 - Ceasing full-time work overseas</option>
                  <option>Case 7 - Starting to have UK home</option>
                  <option>Case 8 - Ceasing to have UK home</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Split Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-2">Split Year Information</h4>
              <p className="text-sm text-blue-800">
                Split year treatment allows you to be treated as non-resident for part of the tax year
                if you meet specific conditions for arrival or departure.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'remittance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Remittance Basis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Claim Remittance Basis</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>No</option>
                  <option>Yes - Automatic (under £2,000)</option>
                  <option>Yes - With Charge</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years in UK (last 20)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0"
                  max="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foreign Income Arising</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foreign Income Remitted</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Remittance Basis Charge</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-800">7-11 years resident</span>
                  <span className="font-medium">£30,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-800">12+ years resident</span>
                  <span className="font-medium">£60,000</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dtr' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Double Tax Relief Summary</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Employment Income</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Foreign Tax</span>
                    <p className="font-medium">£1,500</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">UK Tax</span>
                    <p className="font-medium">£2,000</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Relief</span>
                    <p className="font-medium text-green-600">£1,500</p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Investment Income</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Foreign Tax</span>
                    <p className="font-medium">£500</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">UK Tax</span>
                    <p className="font-medium">£600</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Relief</span>
                    <p className="font-medium text-green-600">£500</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <h4 className="font-medium text-gray-900 mb-2">Total DTR Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Foreign Tax Paid</span>
                  <span className="font-medium">£2,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Relief Claimed</span>
                  <span className="font-medium">£2,000</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Net UK Tax Due</span>
                  <span>£600</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResidenceDomicile;
