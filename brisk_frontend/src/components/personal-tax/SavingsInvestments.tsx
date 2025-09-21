import React, { useState, useEffect } from 'react';
import { PiggyBank, Plus, TrendingUp, Shield, FileText, BarChart3 } from 'lucide-react';

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

const SavingsInvestments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('interest');
  const [loading, setLoading] = useState(true);
  const [savingsData, setSavingsData] = useState<SavingsData | null>(null);
  const [exchanges, setExchanges] = useState<any[]>([]);
  const [dividendPortfolio, setDividendPortfolio] = useState<any>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [taxYear] = useState('2024-25');

  useEffect(() => {
    fetchSavingsData();
    fetchExchanges();
    fetchDividendPortfolio();
  }, [taxYear]);

  const fetchSavingsData = async () => {
    try {
      setLoading(true);
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/api/personal-tax/savings-investments?tax_year=${taxYear}`);
      if (!response.ok) {
        throw new Error('Failed to fetch savings data');
      }
      const data = await response.json();
      setSavingsData(data);
    } catch (error) {
      console.error('Error fetching savings data:', error);
      const mockData: SavingsData = {
        bankAccounts: [
          {
            id: '1',
            name: 'Barclays Current Account',
            accountNumber: '****1234',
            grossInterest: 450,
            taxDeducted: 0,
            netInterest: 450
          }
        ],
        dividends: [
          {
            id: '1',
            company: 'ABC Company Ltd',
            shareType: 'Ordinary Shares',
            dividendReceived: 2500,
            taxCredit: 0,
            grossDividend: 2500
          }
        ],
        isas: {
          cashISA: {
            provider: 'Nationwide',
            balance: 15000,
            interestEarned: 750
          },
          stocksSharesISA: {
            provider: 'Vanguard',
            value: 5000,
            dividends: 200
          }
        },
        allowances: {
          personalSavingsAllowance: {
            basicRate: 1000,
            higherRate: 500,
            additionalRate: 0
          },
          dividendAllowance: 500,
          isaAllowance: {
            annual: 20000,
            junior: 9000,
            lifetime: 4000
          }
        }
      };
      setSavingsData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const fetchExchanges = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/api/personal-tax/dividends/exchanges`);
      const data = await response.json();
      setExchanges(data.exchanges || []);
    } catch (error) {
      console.error('Error fetching exchanges:', error);
    }
  };

  const fetchDividendPortfolio = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/api/personal-tax/dividends/portfolio`);
      const data = await response.json();
      setDividendPortfolio(data);
    } catch (error) {
      console.error('Error fetching dividend portfolio:', error);
    }
  };

  const handleImportDividends = async (importData: any) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/api/personal-tax/dividends/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(importData)
      });
      const result = await response.json();
      if (response.ok) {
        alert(`Successfully imported ${result.imported_count} dividend records`);
        fetchDividendPortfolio();
        setShowImportModal(false);
      }
    } catch (error) {
      console.error('Error importing dividends:', error);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const tabs = [
    { id: 'interest', label: 'Interest', icon: PiggyBank },
    { id: 'dividends', label: 'Dividends', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio Management', icon: BarChart3 },
    { id: 'isas', label: 'ISAs', icon: Shield },
    { id: 'statements', label: 'Investment Statements', icon: FileText }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!savingsData) {
    return <div className="text-center text-gray-500">No savings data found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Savings & Investments</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Investment</span>
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
        {activeTab === 'interest' && (
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
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(account.grossInterest)}</p>
                      <p className="text-sm text-gray-600">Gross Interest</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Gross Interest</label>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(account.grossInterest)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tax Deducted</label>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(account.taxDeducted)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Net Interest</label>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(account.netInterest)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="font-medium text-green-900 mb-2">Personal Savings Allowance ({taxYear})</h4>
              <p className="text-sm text-green-800">
                Basic rate taxpayers: {formatCurrency(savingsData.allowances.personalSavingsAllowance.basicRate)} | 
                Higher rate taxpayers: {formatCurrency(savingsData.allowances.personalSavingsAllowance.higherRate)} | 
                Additional rate taxpayers: {formatCurrency(savingsData.allowances.personalSavingsAllowance.additionalRate)}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'dividends' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Dividend Income</h3>
              <button 
                onClick={() => setShowImportModal(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Import from Exchange
              </button>
            </div>

            {showImportModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h4 className="text-lg font-semibold mb-4">Import Dividend Data</h4>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const importData = {
                      exchange: formData.get('exchange'),
                      portfolio_id: formData.get('portfolio_id'),
                      date_from: formData.get('date_from'),
                      date_to: formData.get('date_to')
                    };
                    handleImportDividends(importData);
                  }}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Exchange</label>
                        <select 
                          name="exchange"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          required
                        >
                          <option value="">Select Exchange</option>
                          {exchanges.map((exchange) => (
                            <option key={exchange.id} value={exchange.id}>
                              {exchange.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Portfolio ID</label>
                        <input 
                          type="text" 
                          name="portfolio_id"
                          placeholder="Enter your portfolio/account ID"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">From Date</label>
                        <input 
                          type="date" 
                          name="date_from"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">To Date</label>
                        <input 
                          type="date" 
                          name="date_to"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          required 
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <button 
                        type="button"
                        onClick={() => setShowImportModal(false)}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Import Data
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {savingsData.dividends.map((dividend) => (
                <div key={dividend.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{dividend.company}</h4>
                      <p className="text-sm text-gray-600">{dividend.shareType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(dividend.dividendReceived)}</p>
                      <p className="text-sm text-gray-600">Dividend Received</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Dividend Received</label>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(dividend.dividendReceived)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tax Credit</label>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(dividend.taxCredit)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Gross Dividend</label>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(dividend.grossDividend)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-2">Dividend Allowance ({taxYear})</h4>
              <p className="text-sm text-blue-800">
                Annual dividend allowance: {formatCurrency(savingsData.allowances.dividendAllowance)} - First {formatCurrency(savingsData.allowances.dividendAllowance)} of dividends are tax-free
              </p>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Portfolio Management</h3>
            
            {dividendPortfolio && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900">Total Holdings</h4>
                    <p className="text-2xl font-bold text-blue-600">{dividendPortfolio.portfolio?.total_holdings}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900">Portfolio Value</h4>
                    <p className="text-2xl font-bold text-green-600">£{dividendPortfolio.portfolio?.total_value?.toLocaleString()}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900">Dividend Yield</h4>
                    <p className="text-2xl font-bold text-purple-600">{dividendPortfolio.portfolio?.dividend_yield}%</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium text-orange-900">Annual Dividends</h4>
                    <p className="text-2xl font-bold text-orange-600">£{dividendPortfolio.portfolio?.annual_dividends?.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900">Holdings</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbol</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shares</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Market Value</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Yield</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Annual Dividend</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dividendPortfolio.holdings?.map((holding: any, index: number) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{holding.symbol}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{holding.company}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{holding.shares}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">${holding.current_price}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">£{holding.market_value?.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{holding.dividend_yield}%</td>
                            <td className="px-4 py-3 text-sm text-gray-900">£{holding.annual_dividend?.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'isas' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">ISA Investments</h3>
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
                    <span className="font-medium text-green-600">{formatCurrency(savingsData.isas.cashISA.interestEarned)}</span>
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
                    <span className="font-medium text-green-600">{formatCurrency(savingsData.isas.stocksSharesISA.dividends)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h4 className="font-medium text-yellow-900 mb-2">ISA Allowance {taxYear}</h4>
              <p className="text-sm text-yellow-800">
                Annual ISA allowance: {formatCurrency(savingsData.allowances.isaAllowance.annual)} | 
                Junior ISA: {formatCurrency(savingsData.allowances.isaAllowance.junior)} | 
                Lifetime ISA: {formatCurrency(savingsData.allowances.isaAllowance.lifetime)}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'statements' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Investment Statements</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Upload Investment Statements
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Upload broker statements, dividend vouchers, and interest certificates
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsInvestments;
