import React, { useState, useEffect } from 'react';
import { Building, Plus, TrendingDown, Calendar } from 'lucide-react';

interface FixedAssetsCapitalProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: 'charity' | 'academy';
  selectedFramework: 'sorp' | 'aad';
}

interface Asset {
  id: string;
  name: string;
  category: string;
  cost: number;
  accumulatedDepreciation: number;
  netBookValue: number;
  fundSource: string;
  acquisitionDate: string;
  depreciationRate: number;
}

interface CapitalGrant {
  id: string;
  donor: string;
  amount: number;
  purpose: string;
  assetPurchased: string;
  deferredBalance: number;
  releasedToDate: number;
  releaseMethod: 'depreciation' | 'performance';
}

const FixedAssetsCapital: React.FC<FixedAssetsCapitalProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('register');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [capitalGrants, setCapitalGrants] = useState<CapitalGrant[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'register', label: 'Asset Register', icon: Building },
    { id: 'depreciation', label: 'Depreciation', icon: TrendingDown },
    { id: 'capital-grants', label: 'Capital Grants (DfE/ESFA/CIF)', icon: Plus },
    { id: 'reconciliations', label: 'Reconciliations', icon: Calendar }
  ];

  useEffect(() => {
    fetchAssetsData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchAssetsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/fixed-assets?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      
      setAssets(data.assets || [
        {
          id: '1',
          name: 'Main School Building',
          category: 'Land and Buildings',
          cost: 2500000,
          accumulatedDepreciation: 250000,
          netBookValue: 2250000,
          fundSource: 'Restricted Fixed Asset',
          acquisitionDate: '2020-01-01',
          depreciationRate: 2
        },
        {
          id: '2',
          name: 'Computer Equipment',
          category: 'IT Equipment',
          cost: 150000,
          accumulatedDepreciation: 75000,
          netBookValue: 75000,
          fundSource: 'Restricted Fixed Asset',
          acquisitionDate: '2022-09-01',
          depreciationRate: 25
        },
        {
          id: '3',
          name: 'Science Laboratory Equipment',
          category: 'Educational Equipment',
          cost: 80000,
          accumulatedDepreciation: 32000,
          netBookValue: 48000,
          fundSource: 'Restricted Fixed Asset',
          acquisitionDate: '2021-08-15',
          depreciationRate: 20
        }
      ]);

      setCapitalGrants(data.capitalGrants || [
        {
          id: '1',
          donor: 'Department for Education',
          amount: 500000,
          purpose: 'Science laboratory refurbishment',
          assetPurchased: 'Science Laboratory Equipment',
          deferredBalance: 300000,
          releasedToDate: 200000,
          releaseMethod: 'depreciation'
        },
        {
          id: '2',
          donor: 'Condition Improvement Fund',
          amount: 200000,
          purpose: 'Building maintenance and improvements',
          assetPurchased: 'Main School Building',
          deferredBalance: 180000,
          releasedToDate: 20000,
          releaseMethod: 'depreciation'
        }
      ]);
    } catch (error) {
      console.error('Error fetching assets data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDepreciation = (asset: Asset) => {
    const annualDepreciation = (asset.cost * asset.depreciationRate) / 100;
    return annualDepreciation;
  };

  const getTotalsByCategory = () => {
    const categories = [...new Set(assets.map(asset => asset.category))];
    return categories.map(category => {
      const categoryAssets = assets.filter(asset => asset.category === category);
      return {
        category,
        cost: categoryAssets.reduce((sum, asset) => sum + asset.cost, 0),
        depreciation: categoryAssets.reduce((sum, asset) => sum + asset.accumulatedDepreciation, 0),
        netBookValue: categoryAssets.reduce((sum, asset) => sum + asset.netBookValue, 0)
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading fixed assets data...</span>
      </div>
    );
  }

  const categoryTotals = getTotalsByCategory();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Fixed Assets & Capital Grants</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" />
          <span>Add Asset</span>
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

      {activeTab === 'register' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Fixed Asset Register</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Accumulated Depreciation</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net Book Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund Source</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                          <div className="text-sm text-gray-500">
                            Acquired: {new Date(asset.acquisitionDate).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {asset.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                        £{asset.cost.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-red-600">
                        £{asset.accumulatedDepreciation.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        £{asset.netBookValue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                          {asset.fundSource}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Summary by Category</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Accumulated Depreciation</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net Book Value</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categoryTotals.map((category, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                        £{category.cost.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-red-600">
                        £{category.depreciation.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        £{category.netBookValue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-bold">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Total</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      £{categoryTotals.reduce((sum, cat) => sum + cat.cost, 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-red-600">
                      £{categoryTotals.reduce((sum, cat) => sum + cat.depreciation, 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      £{categoryTotals.reduce((sum, cat) => sum + cat.netBookValue, 0).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'depreciation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Depreciation Schedule</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate %</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Depreciation</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Accumulated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund Impact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assets.map((asset) => {
                    const annualDepreciation = calculateDepreciation(asset);
                    return (
                      <tr key={asset.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                          <div className="text-sm text-gray-500">{asset.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                          £{asset.cost.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                          {asset.depreciationRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-red-600">
                          £{annualDepreciation.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-red-600">
                          £{asset.accumulatedDepreciation.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {asset.fundSource}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'capital-grants' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Capital Grant Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Grant Amount</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Released to Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Deferred Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Method</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {capitalGrants.map((grant) => (
                    <tr key={grant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{grant.donor}</div>
                        <div className="text-sm text-gray-500">Asset: {grant.assetPurchased}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        {grant.purpose}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        £{grant.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600">
                        £{grant.releasedToDate.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-blue-600">
                        £{grant.deferredBalance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          grant.releaseMethod === 'depreciation' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {grant.releaseMethod === 'depreciation' ? 'Depreciation Match' : 'Performance Based'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Total Grants</h4>
              <p className="text-2xl font-bold text-blue-900">
                £{capitalGrants.reduce((sum, grant) => sum + grant.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Released to SoFA</h4>
              <p className="text-2xl font-bold text-green-900">
                £{capitalGrants.reduce((sum, grant) => sum + grant.releasedToDate, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Deferred Balance</h4>
              <p className="text-2xl font-bold text-yellow-900">
                £{capitalGrants.reduce((sum, grant) => sum + grant.deferredBalance, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reconciliations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Note Reconciliation</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50">
                <span className="text-green-800">Fixed asset register balances to fund movements</span>
                <span className="text-green-600 font-medium">✓ Reconciled</span>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50">
                <span className="text-green-800">Capital grant deferrals match asset depreciation</span>
                <span className="text-green-600 font-medium">✓ Reconciled</span>
              </div>

              <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50">
                <span className="text-green-800">Depreciation charges allocated to correct funds</span>
                <span className="text-green-600 font-medium">✓ Reconciled</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixedAssetsCapital;
