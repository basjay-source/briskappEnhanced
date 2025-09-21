import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, BarChart3, DollarSign } from 'lucide-react';

const CalculationsWhatIf: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sa302');
  const [taxCalculation, setTaxCalculation] = useState<any>(null);
  const [taxYear, setTaxYear] = useState('2024-25');

  const tabs = [
    { id: 'sa302', label: 'SA302 Summary', icon: Calculator },
    { id: 'scenario', label: 'Scenario Modeler', icon: TrendingUp },
    { id: 'marginal', label: 'Marginal Rate Graph', icon: BarChart3 },
    { id: 'hicbc', label: 'Child Benefit High Income Charge', icon: DollarSign }
  ];

  useEffect(() => {
    fetchTaxCalculation();
  }, [taxYear]);

  const fetchTaxCalculation = async () => {
    try {
      const response = await fetch(`/api/personal-tax/calculations?tax_year=${taxYear}`);
      const data = await response.json();
      setTaxCalculation(data);
    } catch (error) {
      console.error('Error fetching tax calculation:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Calculations & What-If (SA302)</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Generate SA302
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
        {activeTab === 'sa302' && taxCalculation && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Tax Calculation Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Income Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employment Income</span>
                    <span className="font-medium">£{taxCalculation.employment_income?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Self-Employment Profit</span>
                    <span className="font-medium">£{taxCalculation.self_employment_profit?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dividend Income</span>
                    <span className="font-medium">£{taxCalculation.dividend_income?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Interest</span>
                    <span className="font-medium">£{taxCalculation.bank_interest?.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Income</span>
                    <span>£{taxCalculation.total_income?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Tax Calculation</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Income</span>
                    <span className="font-medium">£{taxCalculation.total_income?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Personal Allowance</span>
                    <span className="font-medium">-£{taxCalculation.personal_allowance?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxable Income</span>
                    <span className="font-medium">£{taxCalculation.taxable_income?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Income Tax</span>
                    <span className="font-medium">£{taxCalculation.income_tax?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">National Insurance</span>
                    <span className="font-medium">£{taxCalculation.ni_contributions?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Deducted</span>
                    <span className="font-medium">-£{taxCalculation.tax_deducted?.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Balance Due</span>
                    <span className={taxCalculation.balance_due >= 0 ? 'text-red-600' : 'text-green-600'}>
                      £{Math.abs(taxCalculation.balance_due)?.toLocaleString()}
                      {taxCalculation.balance_due < 0 ? ' (Refund)' : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scenario' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Scenario Modeling</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Adjust Income</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment Income: £45,000
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      defaultValue="45000"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dividend Income: £2,500
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      defaultValue="2500"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pension Contributions: £6,000
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="40000"
                      defaultValue="6000"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Impact Analysis</h4>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Current Scenario</h5>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Total Tax</span>
                        <span>£12,450</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Effective Rate</span>
                        <span>19.5%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Marginal Rate</span>
                        <span>32%</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <h5 className="font-medium text-blue-900 mb-2">Optimized Scenario</h5>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm text-blue-800">
                        <span>Total Tax</span>
                        <span>£11,250</span>
                      </div>
                      <div className="flex justify-between text-sm text-blue-800">
                        <span>Effective Rate</span>
                        <span>17.6%</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600 font-medium">
                        <span>Tax Saving</span>
                        <span>£1,200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marginal' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Marginal Tax Rate Analysis</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-center">
                <BarChart3 className="mx-auto h-24 w-24 text-gray-400 mb-4" />
                <p className="text-gray-600">Interactive marginal rate chart would be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">
                  Shows effective tax rates across different income levels including taper points
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-medium text-gray-900">Current Rate</h4>
                <p className="text-2xl font-bold text-orange-600">32%</p>
                <p className="text-sm text-gray-600">Marginal</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-medium text-gray-900">Next Threshold</h4>
                <p className="text-2xl font-bold text-gray-900">£50,270</p>
                <p className="text-sm text-gray-600">Higher Rate</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-medium text-gray-900">PA Taper</h4>
                <p className="text-2xl font-bold text-gray-900">£100,000</p>
                <p className="text-sm text-gray-600">60% Rate</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-medium text-gray-900">Additional Rate</h4>
                <p className="text-2xl font-bold text-gray-900">£125,140</p>
                <p className="text-sm text-gray-600">45% Rate</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hicbc' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">High Income Child Benefit Charge</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h4 className="font-medium text-yellow-900 mb-2">HICBC Thresholds 2024-25</h4>
              <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
                <li>Charge starts at £60,000 adjusted net income</li>
                <li>1% charge for every £100 over £60,000</li>
                <li>Full charge (100%) at £80,000 and above</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Child Benefit Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Children</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Child Benefit Received</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="1884"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adjusted Net Income</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      defaultValue="65000"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">HICBC Calculation</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Child Benefit Received</span>
                    <span className="font-medium">£1,884</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Income over £60,000</span>
                    <span className="font-medium">£5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Charge Rate</span>
                    <span className="font-medium">50%</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>HICBC Due</span>
                    <span className="text-red-600">£942</span>
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

export default CalculationsWhatIf;
