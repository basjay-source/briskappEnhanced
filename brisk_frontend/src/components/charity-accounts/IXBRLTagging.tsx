import React, { useState, useEffect } from 'react';
import { Tag, CheckCircle, AlertTriangle, Download, Upload } from 'lucide-react';

interface IXBRLTaggingProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const IXBRLTagging: React.FC<IXBRLTaggingProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('auto-tag');
  const [loading, setLoading] = useState(true);
  const [taggingData, setTaggingData] = useState<any>({});
  const [validationResults, setValidationResults] = useState<any>({});

  const tabs = [
    { id: 'auto-tag', label: 'Auto-Tag', icon: Tag },
    { id: 'manual', label: 'Manual Override', icon: Tag },
    { id: 'taxonomy', label: 'Taxonomy Version', icon: Tag },
    { id: 'validator', label: 'Validator', icon: CheckCircle }
  ];

  useEffect(() => {
    fetchTaggingData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchTaggingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/ixbrl-tagging?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setTaggingData(data);
    } catch (error) {
      console.error('Error fetching iXBRL tagging data:', error);
    } finally {
      setLoading(false);
    }
  };

  const runAutoTagging = async () => {
    try {
      setLoading(true);
      await fetch(`http://localhost:8000/charity-accounts/ixbrl-tagging/auto-tag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          entity: selectedEntity, 
          year: selectedYear,
          mode: selectedMode,
          framework: selectedFramework
        })
      });
      fetchTaggingData();
    } catch (error) {
      console.error('Error running auto-tagging:', error);
    } finally {
      setLoading(false);
    }
  };

  const runValidation = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/ixbrl-tagging/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          entity: selectedEntity, 
          year: selectedYear,
          mode: selectedMode,
          framework: selectedFramework
        })
      });
      const results = await response.json();
      setValidationResults(results);
    } catch (error) {
      console.error('Error running validation:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">iXBRL Tagging & Validation</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={runAutoTagging}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Tag className="w-4 h-4" />
            <span>Auto-Tag</span>
          </button>
          <button
            onClick={runValidation}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Validate</span>
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
        {activeTab === 'auto-tag' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Automatic Tagging</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Tagging Progress</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800">Primary Statements</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${taggingData.progress?.statements || 0}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-blue-900">{taggingData.progress?.statements || 0}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800">Notes to Accounts</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${taggingData.progress?.notes || 0}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-blue-900">{taggingData.progress?.notes || 0}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800">Trustees' Report</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${taggingData.progress?.report || 0}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-blue-900">{taggingData.progress?.report || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Element</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(taggingData.autoTags || []).map((tag: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tag.element}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{tag.tag}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{tag.value?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            tag.status === 'tagged' ? 'bg-green-100 text-green-800' :
                            tag.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {tag.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'manual' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Manual Tag Override</h3>
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Manual Tagging Required</h4>
                <p className="text-sm text-yellow-700">
                  Some elements require manual tagging or override of automatic tags. 
                  Review and update tags as needed before validation.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Element</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Tag</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggested Tag</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(taggingData.manualTags || []).map((tag: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tag.element}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{tag.currentTag}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-mono">{tag.suggestedTag}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{tag.value?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                          <button className="text-green-600 hover:text-green-800">Accept</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'taxonomy' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Taxonomy Version Management</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Current Taxonomy</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Charities SORP:</span>
                      <span className="text-sm font-medium">{taggingData.taxonomy?.sorp || 'v2.1'}</span>
                    </div>
                    {selectedMode === 'academy' && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Academy AAD:</span>
                        <span className="text-sm font-medium">{taggingData.taxonomy?.aad || 'v1.0'}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Companies House:</span>
                      <span className="text-sm font-medium">{taggingData.taxonomy?.ch || 'v2023'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Updated:</span>
                      <span className="text-sm font-medium">{taggingData.taxonomy?.lastUpdated || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Available Updates</h4>
                  <div className="space-y-2">
                    {(taggingData.taxonomy?.updates || []).map((update: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">{update.name}</span>
                          <span className="text-xs text-gray-600 block">{update.description}</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Update</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Taxonomy Mapping</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Configure how your chart of accounts maps to taxonomy elements.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxonomy Element</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(taggingData.taxonomy?.mappings || []).map((mapping: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mapping.account}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{mapping.element}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              mapping.confidence >= 90 ? 'bg-green-100 text-green-800' :
                              mapping.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {mapping.confidence}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'validator' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">iXBRL Validation Results</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-4 rounded-lg border ${
                  (validationResults.errors?.length || 0) === 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    {(validationResults.errors?.length || 0) === 0 ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-medium">Errors</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{validationResults.errors?.length || 0}</div>
                </div>

                <div className={`p-4 rounded-lg border ${
                  (validationResults.warnings?.length || 0) === 0 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">Warnings</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{validationResults.warnings?.length || 0}</div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Tagged Elements</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{validationResults.tagged || 0}</div>
                </div>
              </div>

              {validationResults.errors && validationResults.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-3">Validation Errors</h4>
                  <div className="space-y-2">
                    {validationResults.errors.map((error: any, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <div>
                          <span className="text-sm font-medium text-red-900">{error.element}</span>
                          <p className="text-sm text-red-800">{error.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {validationResults.warnings && validationResults.warnings.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-3">Validation Warnings</h4>
                  <div className="space-y-2">
                    {validationResults.warnings.map((warning: any, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <div>
                          <span className="text-sm font-medium text-yellow-900">{warning.element}</span>
                          <p className="text-sm text-yellow-800">{warning.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  <Download className="w-4 h-4" />
                  <span>Download iXBRL</span>
                </button>
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  <Upload className="w-4 h-4" />
                  <span>Upload to Filing Gateway</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IXBRLTagging;
