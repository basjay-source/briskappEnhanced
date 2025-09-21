import React, { useState, useEffect } from 'react';
import { FileText, Upload, Send } from 'lucide-react';

const PTDocumentHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('source');
  const [loading, setLoading] = useState(true);
  const [documentsData, setDocumentsData] = useState<any>(null);

  useEffect(() => {
    fetchDocumentsData();
  }, []);

  const fetchDocumentsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/documents`);
      const data = await response.json();
      setDocumentsData(data);
    } catch (error) {
      console.error('Error fetching documents data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadDocuments = () => {
    console.log('Upload documents functionality');
  };

  const handleUploadCategory = (category: string) => {
    console.log(`Upload ${category} functionality`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!documentsData) {
    return <div className="text-center text-gray-500">Failed to load documents data</div>;
  }

  const tabs = [
    { id: 'source', label: 'Source Docs', icon: FileText },
    { id: 'statements', label: 'Statements & Certificates', icon: FileText },
    { id: 'comms', label: 'Client Comms & e-Sign', icon: Send }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Document Hub</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button 
            onClick={handleUploadDocuments}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Documents</span>
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
        {activeTab === 'source' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Source Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {documentsData.source_documents.map((category: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{category.category}</h4>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <p className="text-xs text-gray-500 mb-3">Documents: {category.count}</p>
                  <button 
                    onClick={() => handleUploadCategory(category.category)}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  >
                    Upload
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'statements' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Statements & Certificates</h3>
            <div className="space-y-4">
              {documentsData.uploaded_documents.map((document: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{document.name}</h4>
                      <p className="text-sm text-gray-600">Uploaded: {new Date(document.upload_date).toLocaleDateString('en-GB')}</p>
                      <p className="text-xs text-gray-500">Type: {document.type}</p>
                    </div>
                    <button 
                      onClick={() => console.log(`View document: ${document.name}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comms' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Client Communications</h3>
            <div className="space-y-4">
              {documentsData.client_communications.map((comm: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{comm.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">Status: {comm.status}</p>
                  <button 
                    onClick={() => console.log(`View ${comm.type}: ${comm.name}`)}
                    className={`px-4 py-2 rounded-md text-white ${
                      comm.status === 'Signed' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {comm.status === 'Signed' ? 'View Signed Document' : 'View Document'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PTDocumentHub;
