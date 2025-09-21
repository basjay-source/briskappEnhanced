import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus, Calculator, Shield, Minus, FileText } from 'lucide-react';

interface CapitalGainData {
  id: string;
  asset_type: string;
  disposal_date: string;
  proceeds: number;
  cost: number;
  enhancement_costs: number;
  incidental_costs: number;
  gain: number;
  relief_claimed: string;
}

const CapitalGains: React.FC = () => {
  const [activeTab, setActiveTab] = useState('disposals');
  const [loading, setLoading] = useState(true);
  const [capitalGains, setCapitalGains] = useState<CapitalGainData[]>([]);
  const [cgtRates, setCgtRates] = useState<any>(null);

  const tabs = [
    { id: 'disposals', label: 'Disposals', icon: TrendingUp },
    { id: 'matching', label: 'Share Matching', icon: Calculator },
    { id: 'property', label: 'Property Gains', icon: FileText },
    { id: 'reliefs', label: 'Reliefs (BADR/PPR/Rollover)', icon: Shield },
    { id: 'losses', label: 'Losses', icon: Minus }
  ];

  useEffect(() => {
    fetchCapitalGainsData();
  }, []);

  const fetchCapitalGainsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/capital-gains?tax_year=2024-25`);
      const data = await response.json();
      setCapitalGains(data.disposals || []);
      setCgtRates(data.rates);
    } catch (error) {
      console.error('Error fetching capital gains data:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">Capital Gains (SA108)</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button 
            onClick={() => console.log('Add disposal functionality')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Disposal</span>
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
        {activeTab === 'disposals' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Disposals</h3>
            <div className="space-y-4">
              {capitalGains.map((gain) => (
                <div key={gain.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{gain.asset_type}</h4>
                      <p className="text-sm text-gray-600">Disposed: {gain.disposal_date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${gain.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {gain.gain >= 0 ? 'Gain' : 'Loss'}: £{Math.abs(gain.gain).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Proceeds</label>
                      <p className="text-lg font-semibold text-gray-900">£{gain.proceeds.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Cost</label>
                      <p className="text-lg font-semibold text-gray-900">£{gain.cost.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Costs</label>
                      <p className="text-lg font-semibold text-gray-900">
                        £{(gain.enhancement_costs + gain.incidental_costs).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Relief</label>
                      <p className="text-sm text-gray-900">{gain.relief_claimed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'matching' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Matching Rules</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="font-medium text-blue-900 mb-2">Share Matching Order</h4>
                <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                  <li>Same day acquisitions</li>
                  <li>Acquisitions within 30 days after disposal</li>
                  <li>Section 104 holding (pool of shares)</li>
                </ol>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Same Day</h4>
                  <input
                    type="number"
                    className="w-full text-2xl font-bold text-gray-900 border-none bg-transparent"
                  />
                  <p className="text-sm text-gray-600">shares matched</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">30 Day Rule</h4>
                  <input
                    type="number"
                    className="w-full text-2xl font-bold text-gray-900 border-none bg-transparent"
                  />
                  <p className="text-sm text-gray-600">shares matched</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Section 104</h4>
                  <input
                    type="number"
                    className="w-full text-2xl font-bold text-gray-900 border-none bg-transparent"
                  />
                  <p className="text-sm text-gray-600">shares matched</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'property' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Gains</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Main Residence</option>
                    <option>Buy-to-Let</option>
                    <option>Commercial Property</option>
                    <option>Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Disposal Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <h4 className="font-medium text-green-900 mb-2">Private Residence Relief (PRR)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Total Ownership</label>
                    <input
                      type="number"
                      className="w-full border border-green-300 rounded-md px-3 py-2"
                      placeholder="Days"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Actual Residence</label>
                    <input
                      type="number"
                      className="w-full border border-green-300 rounded-md px-3 py-2"
                      placeholder="Days"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Letting Relief</label>
                    <input
                      type="number"
                      className="w-full border border-green-300 rounded-md px-3 py-2"
                      placeholder="£"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reliefs' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Capital Gains Tax Reliefs</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Business Asset Disposal Relief (BADR)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="badr-eligible"
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="badr-eligible" className="ml-2 text-sm text-gray-700">
                        Eligible for BADR
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lifetime Allowance Used</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Lifetime limit: £{cgtRates?.badr_lifetime_limit?.toLocaleString() || '1,000,000'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Rollover Relief</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rollover-claimed"
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="rollover-claimed" className="ml-2 text-sm text-gray-700">
                        Rollover relief claimed
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Replacement Asset Cost</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'losses' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Capital Losses</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Current Year Losses</h4>
                  <input
                    type="number"
                    className="text-2xl font-bold text-red-600 border-none bg-transparent w-full"
                  />
                  <p className="text-sm text-gray-600">Must be used first</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Losses Brought Forward</h4>
                  <input
                    type="number"
                    className="text-2xl font-bold text-gray-900 border-none bg-transparent w-full"
                  />
                  <p className="text-sm text-gray-600">Available to use</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Annual Exemption</h4>
                  <p className="text-2xl font-bold text-green-600">
                    £{cgtRates?.cgt_annual_exemption?.toLocaleString() || '6,000'}
                  </p>
                  <p className="text-sm text-gray-600">2024-25 allowance</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Loss Utilization</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Gains</span>
                      <span className="font-medium">£{capitalGains.reduce((sum, gain) => sum + Math.max(0, gain.gain), 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Year Losses</span>
                      <span className="font-medium">£{Math.abs(capitalGains.reduce((sum, gain) => sum + Math.min(0, gain.gain), 0)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Exemption</span>
                      <span className="font-medium">-£{cgtRates?.cgt_annual_exemption?.toLocaleString() || '6,000'}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Taxable Gains</span>
                      <span>£{Math.max(0, capitalGains.reduce((sum, gain) => sum + gain.gain, 0) - (cgtRates?.cgt_annual_exemption || 6000)).toLocaleString()}</span>
                    </div>
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

export default CapitalGains;
