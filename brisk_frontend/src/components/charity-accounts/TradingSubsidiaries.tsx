import React, { useState, useEffect } from 'react';
import { Building, Plus, ArrowRightLeft, FileText } from 'lucide-react';

interface TradingSubsidiariesProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: 'charity' | 'academy';
  selectedFramework: 'sorp' | 'aad';
}

interface Subsidiary {
  id: string;
  name: string;
  companyNumber: string;
  ownership: number;
  activity: string;
  revenue: number;
  profit: number;
  giftAidPaid: number;
}

const TradingSubsidiaries: React.FC<TradingSubsidiariesProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('subsidiaries');
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'subsidiaries', label: 'Subsidiary Setup', icon: Building },
    { id: 'intercompany', label: 'Intercompany', icon: ArrowRightLeft },
    { id: 'consolidation', label: 'Consolidation', icon: Plus },
    { id: 'gift-aid', label: 'Gift Aid Payments', icon: FileText }
  ];

  useEffect(() => {
    fetchSubsidiariesData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchSubsidiariesData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/subsidiaries?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      
      setSubsidiaries(data.subsidiaries || [
        {
          id: '1',
          name: 'St. Mary\'s Trading Ltd',
          companyNumber: '12345678',
          ownership: 100,
          activity: 'Conference facilities and catering',
          revenue: 150000,
          profit: 25000,
          giftAidPaid: 25000
        }
      ]);
    } catch (error) {
      console.error('Error fetching subsidiaries data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading subsidiaries data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Trading Subsidiaries & Consolidation</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" />
          <span>Add Subsidiary</span>
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

      {activeTab === 'subsidiaries' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Trading Subsidiaries</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ownership %</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gift Aid</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subsidiaries.map((subsidiary) => (
                  <tr key={subsidiary.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{subsidiary.name}</div>
                        <div className="text-sm text-gray-500">Co. No: {subsidiary.companyNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      {subsidiary.activity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {subsidiary.ownership}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      £{subsidiary.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600">
                      £{subsidiary.profit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-blue-600">
                      £{subsidiary.giftAidPaid.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'gift-aid' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gift Aid Payments</h3>
            <div className="space-y-4">
              {subsidiaries.map((subsidiary) => (
                <div key={subsidiary.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{subsidiary.name}</h4>
                      <p className="text-sm text-gray-600">Profit available: £{subsidiary.profit.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">£{subsidiary.giftAidPaid.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Gift Aid paid</p>
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

export default TradingSubsidiaries;
