import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Plus } from 'lucide-react';

interface InvestmentsEndowmentsProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: 'charity' | 'academy';
  selectedFramework: 'sorp' | 'aad';
}

interface Investment {
  id: string;
  name: string;
  type: string;
  cost: number;
  marketValue: number;
  income: number;
  gains: number;
  fundType: string;
}

interface Endowment {
  id: string;
  name: string;
  type: 'permanent' | 'expendable';
  capitalValue: number;
  spendingPolicy: string;
  restrictions: string;
}

const InvestmentsEndowments: React.FC<InvestmentsEndowmentsProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('investments');
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [endowments, setEndowments] = useState<Endowment[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'investments', label: 'Investment Register', icon: DollarSign },
    { id: 'gains-losses', label: 'Gains/Losses', icon: TrendingUp },
    { id: 'endowments', label: 'Endowment Policies', icon: Plus }
  ];

  useEffect(() => {
    fetchInvestmentsData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchInvestmentsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/investments?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      
      setInvestments(data.investments || [
        {
          id: '1',
          name: 'UK Government Bonds',
          type: 'Fixed Income',
          cost: 500000,
          marketValue: 520000,
          income: 15000,
          gains: 20000,
          fundType: 'Permanent Endowment'
        },
        {
          id: '2',
          name: 'FTSE All-Share Index Fund',
          type: 'Equity',
          cost: 300000,
          marketValue: 340000,
          income: 8000,
          gains: 40000,
          fundType: 'Expendable Endowment'
        }
      ]);

      setEndowments(data.endowments || [
        {
          id: '1',
          name: 'Education Endowment Fund',
          type: 'permanent',
          capitalValue: 800000,
          spendingPolicy: '4% of 3-year rolling average',
          restrictions: 'Income only for educational purposes'
        }
      ]);
    } catch (error) {
      console.error('Error fetching investments data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading investments data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Investments & Endowments</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" />
          <span>Add Investment</span>
        </button>
      </div>

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
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'investments' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Investment Holdings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Market Value</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Income</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gains/Losses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {investments.map((investment) => (
                  <tr key={investment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{investment.name}</div>
                        <div className="text-sm text-gray-500">{investment.type}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      £{investment.cost.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      £{investment.marketValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600">
                      £{investment.income.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-blue-600">
                      £{investment.gains.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {investment.fundType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'endowments' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Endowment Funds</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {endowments.map((endowment) => (
                <div key={endowment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{endowment.name}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      endowment.type === 'permanent' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {endowment.type === 'permanent' ? 'Permanent' : 'Expendable'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Capital Value</p>
                      <p className="text-lg font-bold text-gray-900">£{endowment.capitalValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Spending Policy</p>
                      <p className="text-sm text-gray-900">{endowment.spendingPolicy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Restrictions</p>
                      <p className="text-sm text-gray-900">{endowment.restrictions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentsEndowments;
