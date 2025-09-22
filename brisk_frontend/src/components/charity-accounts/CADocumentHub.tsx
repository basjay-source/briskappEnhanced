import React, { useState, useEffect } from 'react';
import { FileText, Upload, Search, Archive } from 'lucide-react';

interface CADocumentHubProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const CADocumentHub: React.FC<CADocumentHubProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('working-papers');
  const [loading, setLoading] = useState(true);
  const [documentsData, setDocumentsData] = useState<any>({});

  const tabs = [
    { id: 'working-papers', label: 'Working Papers', icon: FileText },
    { id: 'grant-evidence', label: 'Grant/Legacy Evidence', icon: Upload },
    { id: 'rpt-approvals', label: 'RPT Approvals', icon: Search },
    { id: 'filing-evidence', label: 'Filing Evidence', icon: Archive }
  ];

  useEffect(() => {
    fetchDocumentsData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchDocumentsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/document-hub?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setDocumentsData(data);
    } catch (error) {
      console.error('Error fetching documents data:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">Document Hub</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
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
        {activeTab === 'working-papers' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Working Papers Binder</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Period Binder Organization</h4>
                <p className="text-sm text-blue-800">
                  Organize working papers by section: funds, grants, legacies, RPT, assets, proofs, and acknowledgments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(documentsData.workingPapers || []).map((section: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{section.name}</h4>
                      <span className="text-sm text-gray-500">{section.documentCount} docs</span>
                    </div>
                    <div className="space-y-2">
                      {(section.documents || []).slice(0, 3).map((doc: any, docIndex: number) => (
                        <div key={docIndex} className="text-sm text-gray-600 truncate">
                          {doc.name}
                        </div>
                      ))}
                      {section.documents && section.documents.length > 3 && (
                        <div className="text-sm text-blue-600">
                          +{section.documents.length - 3} more documents
                        </div>
                      )}
                    </div>
                    <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                      View Section
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'grant-evidence' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Grant & Legacy Evidence</h3>
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Supporting Documentation</h4>
                <p className="text-sm text-green-800">
                  Store grant letters, legacy documentation, and performance evidence for income recognition.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grant/Legacy</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(documentsData.grantEvidence || []).map((evidence: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{evidence.grantName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evidence.documentType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evidence.uploadDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            evidence.status === 'verified' ? 'bg-green-100 text-green-800' :
                            evidence.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {evidence.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">View</button>
                          <button className="text-green-600 hover:text-green-800">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rpt-approvals' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Related Party Transaction Approvals</h3>
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Approval Documentation</h4>
                <p className="text-sm text-yellow-700">
                  Maintain approvals for related party transactions with timestamps and authorization evidence.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Related Party</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approver</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidence</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(documentsData.rptApprovals || []).map((approval: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{approval.transaction}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{approval.relatedParty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{approval.value?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{approval.approvalDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{approval.approver}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            approval.evidenceStatus === 'complete' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {approval.evidenceStatus}
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

        {activeTab === 'filing-evidence' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filing Evidence & Acknowledgments</h3>
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">Filing Documentation</h4>
                <p className="text-sm text-purple-800">
                  Store filing acknowledgments, submission confirmations, and regulatory correspondence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Charity Commission</h4>
                  <div className="space-y-2">
                    {(documentsData.filingEvidence?.charityCommission || []).map((filing: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                        <div>
                          <span className="text-sm font-medium">{filing.type}</span>
                          <span className="text-xs text-gray-500 block">{filing.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            filing.status === 'acknowledged' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {filing.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-xs">View</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Companies House</h4>
                  <div className="space-y-2">
                    {(documentsData.filingEvidence?.companiesHouse || []).map((filing: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                        <div>
                          <span className="text-sm font-medium">{filing.type}</span>
                          <span className="text-xs text-gray-500 block">{filing.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            filing.status === 'acknowledged' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {filing.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-xs">View</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedMode === 'academy' && (
                  <div className="md:col-span-2">
                    <h4 className="font-medium text-gray-900 mb-3">ESFA Returns</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(documentsData.filingEvidence?.esfa || []).map((filing: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                          <div>
                            <span className="text-sm font-medium">{filing.type}</span>
                            <span className="text-xs text-gray-500 block">{filing.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              filing.status === 'acknowledged' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {filing.status}
                            </span>
                            <button className="text-blue-600 hover:text-blue-800 text-xs">View</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Archive Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium">Total Documents</div>
                    <div>{documentsData.archiveSummary?.totalDocuments || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Acknowledged Filings</div>
                    <div>{documentsData.archiveSummary?.acknowledgedFilings || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Pending Filings</div>
                    <div>{documentsData.archiveSummary?.pendingFilings || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Archive Status</div>
                    <div className={documentsData.archiveSummary?.status === 'complete' ? 'text-green-600' : 'text-yellow-600'}>
                      {documentsData.archiveSummary?.status || 'In Progress'}
                    </div>
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

export default CADocumentHub;
