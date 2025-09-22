import React, { useState, useEffect } from 'react';
import { PiggyBank, Plus, TrendingUp, Shield, FileText, BarChart3, ArrowLeft } from 'lucide-react';

interface SavingsData {
  bankAccounts: Array<{
    id: string;
    name: string;
    accountNumber: string;
    grossInterest: number;
    taxDeducted: number;
    netInterest: number;
  }>;
  dividends: Array<{
    id: string;
    company: string;
    shareType: string;
    dividendReceived: number;
    taxCredit: number;
    grossDividend: number;
  }>;
  isas: {
    cashISA: {
      provider: string;
      balance: number;
      interestEarned: number;
    };
    stocksSharesISA: {
      provider: string;
      value: number;
      dividends: number;
    };
  };
  allowances: {
    personalSavingsAllowance: {
      basicRate: number;
      higherRate: number;
      additionalRate: number;
    };
    dividendAllowance: number;
    isaAllowance: {
      annual: number;
      junior: number;
      lifetime: number;
    };
  };
}

interface Exchange {
  id: string;
  name: string;
  country: string;
  supported: boolean;
}

const SavingsInvestmentsClean: React.FC = () => {
  const [activeTab, setActiveTab] = useState('interest');
  const [loading, setLoading] = useState(true);
  const [savingsData, setSavingsData] = useState<SavingsData | null>(null);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [showImportForm, setShowImportForm] = useState(false);
  const [importLoading, setImportLoading] = useState(false);

  const tabs = [
    { id: 'interest', label: 'Bank Interest', icon: PiggyBank },
    { id: 'dividends', label: 'Dividends', icon: TrendingUp },
    { id: 'isas', label: 'ISAs', icon: Shield },
    { id: 'allowances', label: 'Allowances', icon: FileText },
    { id: 'reports', label: 'Reports', icon: BarChart3 }
  ];

  useEffect(() => {
    fetchSavingsData();
    fetchExchanges();
  }, []);

  const fetchSavingsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/savings-investments?tax_year=2024-25`);
      const data = await response.json();
      setSavingsData(data);
    } catch (error) {
      console.error('Error fetching savings data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExchanges = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/supported-exchanges`);
      const data = await response.json();
      setExchanges(data.exchanges || []);
    } catch (error) {
      console.error('Error fetching exchanges:', error);
    }
  };

  const handleImportDividends = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setImportLoading(true);
      const formData = new FormData(e.target as HTMLFormElement);
      const importData = {
        exchange: formData.get('exchange'),
        api_key: formData.get('api_key'),
        account_id: formData.get('account_id'),
        date_from: formData.get('date_from'),
        date_to: formData.get('date_to'),
        taxpayer_id: 1,
        tax_year: '2024-25'
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/import-dividends`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(importData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Dividends imported successfully:', result);
        await fetchSavingsData();
        setShowImportForm(false);
        alert(`Successfully imported ${result.imported_count || 0} dividend records!`);
      } else {
        const error = await response.text();
        console.error('Failed to import dividends:', error);
        alert('Failed to import dividends. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error importing dividends:', error);
      alert('Error importing dividends. Please check your connection.');
    } finally {
      setImportLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  if (showImportForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Import Dividend Data</h1>
              <button
                onClick={() => setShowImportForm(false)}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dividends
              </button>
            </div>

            <form onSubmit={handleImportDividends}>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Exchange Connection</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exchange Platform *</label>
                    <select
                      name="exchange"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select Exchange</option>
                      {exchanges.map((exchange) => (
                        <option key={exchange.id} value={exchange.id} disabled={!exchange.supported}>
                          {exchange.name} ({exchange.country}) {!exchange.supported && '- Coming Soon'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account ID</label>
                    <input
                      type="text"
                      name="account_id"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Your account identifier"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key *</label>
                    <input
                      type="password"
                      name="api_key"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Your API key (kept secure)"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Import Period</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Date *</label>
                    <input
                      type="date"
                      name="date_from"
                      required
                      defaultValue="2024-04-06"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To Date *</label>
                    <input
                      type="date"
                      name="date_to"
                      required
                      defaultValue="2025-04-05"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Supported Exchanges</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    We support real-time data import from major exchanges and brokers:
                  </p>
                  <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                    <li>London Stock Exchange (LSE)</li>
                    <li>Interactive Brokers</li>
                    <li>Hargreaves Lansdown</li>
                    <li>AJ Bell</li>
                    <li>Vanguard UK</li>
                    <li>Charles Schwab</li>
                    <li>More exchanges coming soon...</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowImportForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={importLoading}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {importLoading ? 'Importing...' : 'Import Dividend Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Savings & Investments</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      )}

      {activeTab === 'interest' && !loading && savingsData && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Bank & Building Society Interest</h3>
          <div className="space-y-4">
            {savingsData.bankAccounts.map((account) => (
              <div key={account.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{account.name}</h4>
                    <p className="text-sm text-gray-600">Account: {account.accountNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(account.grossInterest)}</p>
                    <p className="text-sm text-gray-600">Gross Interest</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Gross Interest:</span>
                    <p className="font-medium">{formatCurrency(account.grossInterest)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Tax Deducted:</span>
                    <p className="font-medium">{formatCurrency(account.taxDeducted)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Net Interest:</span>
                    <p className="font-medium">{formatCurrency(account.netInterest)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'dividends' && !loading && savingsData && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Dividend Income</h3>
            <button
              onClick={() => setShowImportForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Import from Exchange
            </button>
          </div>
          
          <div className="space-y-4">
            {savingsData.dividends.length > 0 ? (
              savingsData.dividends.map((dividend) => (
                <div key={dividend.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{dividend.company}</h4>
                      <p className="text-sm text-gray-600">{dividend.shareType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-green-600">{formatCurrency(dividend.grossDividend)}</p>
                      <p className="text-sm text-gray-600">Gross Dividend</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Dividend Received:</span>
                      <p className="font-medium">{formatCurrency(dividend.dividendReceived)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Tax Credit:</span>
                      <p className="font-medium">{formatCurrency(dividend.taxCredit)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Gross Dividend:</span>
                      <p className="font-medium">{formatCurrency(dividend.grossDividend)}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No dividend data found.</p>
                <button
                  onClick={() => setShowImportForm(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Import Dividend Data
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'isas' && !loading && savingsData && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Individual Savings Accounts (ISAs)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Cash ISA</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider</span>
                  <span className="font-medium">{savingsData.isas.cashISA.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Balance</span>
                  <span className="font-medium">{formatCurrency(savingsData.isas.cashISA.balance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Earned</span>
                  <span className="font-medium">{formatCurrency(savingsData.isas.cashISA.interestEarned)}</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Stocks & Shares ISA</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider</span>
                  <span className="font-medium">{savingsData.isas.stocksSharesISA.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Value</span>
                  <span className="font-medium">{formatCurrency(savingsData.isas.stocksSharesISA.value)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dividends</span>
                  <span className="font-medium">{formatCurrency(savingsData.isas.stocksSharesISA.dividends)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'allowances' && !loading && savingsData && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Tax Allowances & Limits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Personal Savings Allowance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Basic Rate (20%)</span>
                  <span className="font-medium">{formatCurrency(savingsData.allowances.personalSavingsAllowance.basicRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Higher Rate (40%)</span>
                  <span className="font-medium">{formatCurrency(savingsData.allowances.personalSavingsAllowance.higherRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Additional Rate (45%)</span>
                  <span className="font-medium">{formatCurrency(savingsData.allowances.personalSavingsAllowance.additionalRate)}</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Other Allowances</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dividend Allowance</span>
                  <span className="font-medium">{formatCurrency(savingsData.allowances.dividendAllowance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ISA Annual Limit</span>
                  <span className="font-medium">{formatCurrency(savingsData.allowances.isaAllowance.annual)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Junior ISA Limit</span>
                  <span className="font-medium">{formatCurrency(savingsData.allowances.isaAllowance.junior)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lifetime ISA Limit</span>
                  <span className="font-medium">{formatCurrency(savingsData.allowances.isaAllowance.lifetime)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Savings & Investment Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Interest Summary</h4>
              <p className="text-sm text-gray-600 mb-4">Detailed breakdown of all bank and building society interest</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Generate Report
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Dividend Report</h4>
              <p className="text-sm text-gray-600 mb-4">Complete dividend income analysis with tax calculations</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Generate Report
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">ISA Summary</h4>
              <p className="text-sm text-gray-600 mb-4">ISA contributions, withdrawals, and tax-free growth</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Generate Report
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Tax Efficiency Analysis</h4>
              <p className="text-sm text-gray-600 mb-4">Optimization recommendations for tax-efficient investing</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsInvestmentsClean;
