import React, { useState, useEffect } from 'react';
import { TrendingUp, Calculator, RefreshCw, CheckCircle } from 'lucide-react';

interface CashFlowProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const CashFlow: React.FC<CashFlowProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('method');
  const [loading, setLoading] = useState(true);
  const [cashFlowData, setCashFlowData] = useState<any>({});
  const [method, setMethod] = useState('indirect');

  const tabs = [
    { id: 'method', label: 'Method Selection', icon: Calculator },
    { id: 'operating', label: 'Operating Activities', icon: TrendingUp },
    { id: 'investing', label: 'Investing Activities', icon: TrendingUp },
    { id: 'financing', label: 'Financing Activities', icon: TrendingUp },
    { id: 'reconciliation', label: 'Reconciliation', icon: CheckCircle }
  ];

  useEffect(() => {
    fetchCashFlowData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchCashFlowData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/cash-flow?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setCashFlowData(data);
      setMethod(data.method || 'indirect');
    } catch (error) {
      console.error('Error fetching cash flow data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateCashFlow = async () => {
    try {
      setLoading(true);
      await fetch(`http://localhost:8000/charity-accounts/cash-flow/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          entity: selectedEntity, 
          year: selectedYear, 
          method,
          mode: selectedMode,
          framework: selectedFramework
        })
      });
      fetchCashFlowData();
    } catch (error) {
      console.error('Error generating cash flow:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Cash Flow Statement</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={generateCashFlow}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate Cash Flow</span>
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
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow">
        {activeTab === 'method' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cash Flow Method Selection</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    method === 'indirect' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setMethod('indirect')}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      method === 'indirect' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {method === 'indirect' && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Indirect Method</h4>
                      <p className="text-sm text-gray-600">Start with net income and adjust for non-cash items</p>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <p>• Recommended for most charities</p>
                    <p>• Easier to prepare from existing accounts</p>
                    <p>• Shows reconciliation to net income</p>
                  </div>
                </div>

                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    method === 'direct' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setMethod('direct')}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      method === 'direct' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {method === 'direct' && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Direct Method</h4>
                      <p className="text-sm text-gray-600">Show actual cash receipts and payments</p>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <p>• More detailed cash flow information</p>
                    <p>• Requires detailed cash records</p>
                    <p>• Preferred by some users</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Method Selection Guidance</h4>
                <p className="text-sm text-yellow-700">
                  The indirect method is typically used by most charities as it's easier to prepare from 
                  existing financial statements. The direct method provides more detailed information but 
                  requires comprehensive cash records.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'operating' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cash Flows from Operating Activities</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prior Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {method === 'indirect' ? (
                    <>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Net income/(expenditure)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.netIncome?.current?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.netIncome?.prior?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SoFA</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Depreciation</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.depreciation?.current?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.depreciation?.prior?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fixed Assets</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Investment income</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.investmentIncome?.current?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.investmentIncome?.prior?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SoFA</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Decrease/(increase) in debtors</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.debtors?.current?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.debtors?.prior?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Balance Sheet</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Increase/(decrease) in creditors</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.creditors?.current?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.creditors?.prior?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Balance Sheet</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cash received from donors</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.donations?.current?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.donations?.prior?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cash Records</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cash received from grants</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.grants?.current?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.grants?.prior?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cash Records</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cash paid to suppliers</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.suppliers?.current?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.suppliers?.prior?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cash Records</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cash paid to employees</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.employees?.current?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.employees?.prior?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cash Records</td>
                      </tr>
                    </>
                  )}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Net cash from operating activities</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{cashFlowData.operating?.total?.current?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{cashFlowData.operating?.total?.prior?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Calculated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'investing' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cash Flows from Investing Activities</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prior Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Purchase of fixed assets</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.purchases?.current?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.purchases?.prior?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fixed Assets</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Proceeds from disposal of fixed assets</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.disposals?.current?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.disposals?.prior?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fixed Assets</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Purchase of investments</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.investmentPurchases?.current?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.investmentPurchases?.prior?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Investments</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Proceeds from sale of investments</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.investmentSales?.current?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.investmentSales?.prior?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Investments</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Investment income received</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.income?.current?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.income?.prior?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SoFA</td>
                  </tr>
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Net cash from investing activities</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{cashFlowData.investing?.total?.current?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{cashFlowData.investing?.total?.prior?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Calculated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'financing' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cash Flows from Financing Activities</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prior Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Proceeds from borrowings</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.financing?.borrowings?.current?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.financing?.borrowings?.prior?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Balance Sheet</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Repayment of borrowings</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.financing?.repayments?.current?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.financing?.repayments?.prior?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Balance Sheet</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Interest paid</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.financing?.interest?.current?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.financing?.interest?.prior?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SoFA</td>
                  </tr>
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Net cash from financing activities</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{cashFlowData.financing?.total?.current?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{cashFlowData.financing?.total?.prior?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Calculated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reconciliation' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cash Flow Reconciliation</h3>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Year</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prior Year</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cash at beginning of year</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.reconciliation?.opening?.current?.toLocaleString() || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.reconciliation?.opening?.prior?.toLocaleString() || 0}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Net cash from operating activities</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.total?.current?.toLocaleString() || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.operating?.total?.prior?.toLocaleString() || 0}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Net cash from investing activities</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.total?.current?.toLocaleString() || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.investing?.total?.prior?.toLocaleString() || 0}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Net cash from financing activities</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.financing?.total?.current?.toLocaleString() || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.financing?.total?.prior?.toLocaleString() || 0}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Net increase/(decrease) in cash</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.reconciliation?.netChange?.current?.toLocaleString() || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{cashFlowData.reconciliation?.netChange?.prior?.toLocaleString() || 0}</td>
                    </tr>
                    <tr className="bg-gray-50 font-medium">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cash at end of year</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{cashFlowData.reconciliation?.closing?.current?.toLocaleString() || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{cashFlowData.reconciliation?.closing?.prior?.toLocaleString() || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Balance Sheet Reconciliation</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-800">Cash per balance sheet:</span>
                      <span className="text-sm font-medium text-blue-900">£{cashFlowData.reconciliation?.balanceSheet?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-800">Cash per cash flow:</span>
                      <span className="text-sm font-medium text-blue-900">£{cashFlowData.reconciliation?.closing?.current?.toLocaleString() || 0}</span>
                    </div>
                    <div className="border-t border-blue-300 pt-2 flex justify-between">
                      <span className="text-sm font-medium text-blue-900">Difference:</span>
                      <span className="text-sm font-medium text-blue-900">£{cashFlowData.reconciliation?.difference?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                </div>

                <div className={`border rounded-lg p-4 ${
                  (cashFlowData.reconciliation?.difference || 0) === 0 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <h4 className={`font-medium mb-2 ${
                    (cashFlowData.reconciliation?.difference || 0) === 0 
                      ? 'text-green-900' 
                      : 'text-red-900'
                  }`}>
                    Reconciliation Status
                  </h4>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`w-5 h-5 ${
                      (cashFlowData.reconciliation?.difference || 0) === 0 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      (cashFlowData.reconciliation?.difference || 0) === 0 
                        ? 'text-green-900' 
                        : 'text-red-900'
                    }`}>
                      {(cashFlowData.reconciliation?.difference || 0) === 0 
                        ? 'Cash flow reconciles to balance sheet' 
                        : 'Cash flow does not reconcile - review required'}
                    </span>
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

export default CashFlow;
