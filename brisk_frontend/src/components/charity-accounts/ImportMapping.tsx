import React, { useState, useEffect } from 'react';
import { Upload, Download, CheckCircle, AlertTriangle } from 'lucide-react';

interface ImportMappingProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const ImportMapping: React.FC<ImportMappingProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('trial-balance');
  const [loading, setLoading] = useState(true);
  const [mappingData, setMappingData] = useState<any>({});

  const tabs = [
    { id: 'trial-balance', label: 'Trial Balance Import', icon: Upload },
    { id: 'mapping-library', label: 'Mapping Library', icon: Download },
    { id: 'fund-mapping', label: 'Fund Mapping', icon: CheckCircle },
    { id: 'validation', label: 'Validation & Review', icon: AlertTriangle }
  ];

  useEffect(() => {
    fetchMappingData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchMappingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/import-mapping?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setMappingData(data);
    } catch (error) {
      console.error('Error fetching mapping data:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">Import & Mapping</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Upload className="w-4 h-4" />
          <span>Import Trial Balance</span>
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
        {activeTab === 'trial-balance' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Trial Balance Import</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Import Process</h4>
                <p className="text-sm text-blue-800">
                  Import trial balance data from your bookkeeping system with fund dimensions for charity accounts preparation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Import Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Last Import:</span>
                      <span>{mappingData.importStatus?.lastImport || 'Never'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Records Imported:</span>
                      <span>{mappingData.importStatus?.recordsImported || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mapping Status:</span>
                      <span className={mappingData.importStatus?.mappingComplete ? 'text-green-600' : 'text-red-600'}>
                        {mappingData.importStatus?.mappingComplete ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Validation Status:</span>
                      <span className={mappingData.importStatus?.validationPassed ? 'text-green-600' : 'text-red-600'}>
                        {mappingData.importStatus?.validationPassed ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Import Options</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={mappingData.importOptions?.includeFunds} />
                      <span className="text-sm">Include fund dimensions</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={mappingData.importOptions?.includeComparatives} />
                      <span className="text-sm">Include comparative figures</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={mappingData.importOptions?.includeBudgets} />
                      <span className="text-sm">Include budget data</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={mappingData.importOptions?.autoMap} />
                      <span className="text-sm">Auto-map using library</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <h4 className="mt-2 text-lg font-medium text-gray-900">Upload Trial Balance</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Drag and drop your trial balance file here, or click to browse
                </p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Choose File
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mapping-library' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mapping Library</h3>
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Auto-Mapping Rules</h4>
                <p className="text-sm text-green-800">
                  Maintain mapping rules to automatically categorize trial balance accounts to SORP/AAD presentation lines.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Pattern</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SORP Line</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default Fund</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(mappingData.mappingLibrary || []).map((rule: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.pattern}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.sorpLine}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.defaultFund}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            rule.confidence >= 90 ? 'bg-green-100 text-green-800' :
                            rule.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {rule.confidence}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Add Mapping Rule
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Import Library
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                  Export Library
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fund-mapping' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fund Mapping</h3>
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Fund Dimension Mapping</h4>
                <p className="text-sm text-yellow-700">
                  Map trial balance fund dimensions to charity fund categories for proper SORP presentation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Source Fund Codes</h4>
                  <div className="space-y-2">
                    {(mappingData.sourceFunds || []).map((fund: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                        <span className="text-sm font-medium">{fund.code}</span>
                        <span className="text-xs text-gray-500">{fund.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Target Fund Categories</h4>
                  <div className="space-y-2">
                    {(mappingData.targetFunds || []).map((fund: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded border">
                        <span className="text-sm font-medium">{fund.name}</span>
                        <span className="text-xs text-blue-600">{fund.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Fund Mapping Rules</h4>
                <div className="space-y-3">
                  {(mappingData.fundMappingRules || []).map((rule: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">{rule.sourceCode}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-sm text-blue-600">{rule.targetFund}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          rule.status === 'mapped' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {rule.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'validation' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Validation & Review</h3>
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">Validation Results</h4>
                <p className="text-sm text-red-800">
                  Review mapping validation results and resolve any issues before proceeding to SoFA building.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <CheckCircle className="mx-auto h-8 w-8 text-green-600 mb-2" />
                  <div className="text-lg font-medium text-green-900">{mappingData.validation?.mapped || 0}</div>
                  <div className="text-sm text-green-700">Accounts Mapped</div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <AlertTriangle className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
                  <div className="text-lg font-medium text-yellow-900">{mappingData.validation?.unmapped || 0}</div>
                  <div className="text-sm text-yellow-700">Unmapped Accounts</div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <AlertTriangle className="mx-auto h-8 w-8 text-red-600 mb-2" />
                  <div className="text-lg font-medium text-red-900">{mappingData.validation?.errors || 0}</div>
                  <div className="text-sm text-red-700">Validation Errors</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(mappingData.validationDetails || []).map((account: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{account.balance?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            account.status === 'mapped' ? 'bg-green-100 text-green-800' :
                            account.status === 'unmapped' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {account.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">Map</button>
                          <button className="text-green-600 hover:text-green-800">Review</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Auto-Map Remaining
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Validate All
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                  Export Issues
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportMapping;
