import React, { useState, useEffect } from 'react';
import { FileText, Download, Send, Eye, Palette } from 'lucide-react';

interface ProofsReportsProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const ProofsReports: React.FC<ProofsReportsProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('draft-accounts');
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState<any>({});

  const tabs = [
    { id: 'draft-accounts', label: 'Draft Accounts', icon: FileText },
    { id: 'fund-packs', label: 'Fund Packs', icon: FileText },
    { id: 'management-pack', label: 'Management Pack', icon: FileText },
    { id: 'branding', label: 'Styles/Branding', icon: Palette }
  ];

  useEffect(() => {
    fetchReportsData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/proofs-reports?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setReportsData(data);
    } catch (error) {
      console.error('Error fetching proofs reports data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (reportType: string) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:8000/charity-accounts/proofs-reports/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          entity: selectedEntity, 
          year: selectedYear,
          mode: selectedMode,
          framework: selectedFramework,
          reportType
        })
      });
      fetchReportsData();
    } catch (error) {
      console.error('Error generating report:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">Proofs & Reports</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => generateReport('draft-accounts')}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Draft</span>
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
        {activeTab === 'draft-accounts' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Draft Accounts Generation</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Account Types</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Full Charity Accounts</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                      <span className="ml-2 text-sm text-gray-700">Filleted Accounts</span>
                    </label>
                    {selectedMode === 'academy' && (
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Academy AAD Set</span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Output Formats</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">PDF</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                      <span className="ml-2 text-sm text-gray-700">Word Document</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                      <span className="ml-2 text-sm text-gray-700">iXBRL</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(reportsData.draftAccounts || []).map((report: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            report.status === 'ready' ? 'bg-green-100 text-green-800' :
                            report.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.generated}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="text-orange-600 hover:text-orange-800">
                            <Send className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fund-packs' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fund Packs</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Fund-Specific Reporting</h4>
                <p className="text-sm text-blue-800">
                  Generate SoFA and fund movement reports for individual funds or academy segments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(reportsData.fundPacks || []).map((pack: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{pack.fundName}</h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        pack.type === 'restricted' ? 'bg-red-100 text-red-800' :
                        pack.type === 'endowment' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {pack.type}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Opening Balance:</span>
                        <span>£{pack.opening?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Income:</span>
                        <span>£{pack.income?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expenditure:</span>
                        <span>£{pack.expenditure?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Closing Balance:</span>
                        <span>£{pack.closing?.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded">
                        Generate Pack
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'management-pack' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Management Pack</h3>
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Management Reporting</h4>
                <p className="text-sm text-green-800">
                  Comprehensive management pack including variance analysis, KPIs, and commentary.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Included Reports</h4>
                  <div className="space-y-2">
                    {(reportsData.managementPack?.reports || []).map((report: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                        <span className="text-sm text-gray-700">{report}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Distribution</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                        rows={3}
                        placeholder="Enter email addresses..."
                        defaultValue={reportsData.managementPack?.recipients || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                        rows={2}
                        placeholder="Optional message..."
                        defaultValue={reportsData.managementPack?.message || ''}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Generate Management Pack
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Send to Recipients
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'branding' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Styles & Branding</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Document Styling</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Standard Charity Template</option>
                        <option>Academy Template</option>
                        <option>Custom Template</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Arial</option>
                        <option>Times New Roman</option>
                        <option>Calibri</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Color Scheme</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Default Blue</option>
                        <option>Charity Green</option>
                        <option>Academy Purple</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Branding Elements</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600">
                          {reportsData.branding?.logo ? 'Logo uploaded' : 'Click to upload logo'}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Watermark</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="e.g., DRAFT, CONFIDENTIAL"
                        defaultValue={reportsData.branding?.watermark || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                        rows={2}
                        placeholder="Custom footer text..."
                        defaultValue={reportsData.branding?.footer || ''}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Preview</h4>
                <p className="text-sm text-yellow-700">
                  Preview your styling changes before generating final reports. 
                  Changes will be applied to all future report generations.
                </p>
                <div className="mt-3 flex space-x-2">
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm">
                    Preview Sample
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                    Save Styling
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProofsReports;
