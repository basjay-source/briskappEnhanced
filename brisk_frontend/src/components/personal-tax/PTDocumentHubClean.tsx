import React, { useState, useEffect } from 'react';
import { Upload, FileText, Image, File, Trash2, Download, Eye } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  category: string;
  status: string;
}

const PTDocumentHubClean: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const tabs = [
    { id: 'upload', label: 'Upload Documents', icon: Upload },
    { id: 'documents', label: 'My Documents', icon: FileText },
    { id: 'categories', label: 'Categories', icon: File }
  ];

  const documentCategories = [
    'Employment (P60, P45, P11D)',
    'Self-Employment Records',
    'Property Income',
    'Bank Statements',
    'Investment Statements',
    'Pension Statements',
    'Charitable Donations',
    'Medical Expenses',
    'Other Supporting Documents'
  ];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/documents?taxpayer_id=1&tax_year=2024-25`);
      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList) => {
    try {
      setUploading(true);
      const formData = new FormData();
      
      Array.from(files).forEach((file) => {
        formData.append(`files`, file);
      });
      
      formData.append('taxpayer_id', '1');
      formData.append('tax_year', '2024-25');
      formData.append('category', 'General');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/upload-documents`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Documents uploaded successfully:', result);
        await fetchDocuments();
        alert(`Successfully uploaded ${files.length} document(s)!`);
      } else {
        const error = await response.text();
        console.error('Failed to upload documents:', error);
        alert('Failed to upload documents. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading documents:', error);
      alert('Error uploading documents. Please check your connection.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      if (confirm('Are you sure you want to delete this document?')) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/documents/${documentId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          await fetchDocuments();
          alert('Document deleted successfully!');
        } else {
          alert('Failed to delete document. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document. Please check your connection.');
    }
  };

  const downloadDocument = async (documentId: string, fileName: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/documents/${documentId}/download`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Failed to download document. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Error downloading document. Please check your connection.');
    }
  };

  const viewDocument = async (documentId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/documents/${documentId}/view`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        alert('Failed to view document. Please try again.');
      }
    } catch (error) {
      console.error('Error viewing document:', error);
      alert('Error viewing document. Please check your connection.');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return <Image className="w-5 h-5" />;
    if (fileType.includes('pdf')) return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Document Hub</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Bulk Download
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
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'upload' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Tax Documents</h3>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                {uploading ? 'Uploading documents...' : 'Drop files here or click to upload'}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Supports PDF, JPG, PNG, and other common formats. Maximum 10MB per file.
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                disabled={uploading}
              />
              <label
                htmlFor="file-upload"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                  uploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                } transition-colors`}
              >
                {uploading ? 'Uploading...' : 'Select Files'}
              </label>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Document Categories</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {documentCategories.map((category, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-900">{category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Uploaded Documents</h3>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            ) : documents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map((document) => (
                      <tr key={document.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getFileIcon(document.type)}
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{document.name}</div>
                              <div className="text-sm text-gray-500">{document.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {document.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatFileSize(document.size)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(document.uploadDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            document.status === 'Processed'
                              ? 'bg-green-100 text-green-800'
                              : document.status === 'Processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {document.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => viewDocument(document.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => downloadDocument(document.id, document.name)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteDocument(document.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No documents uploaded yet.</p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Upload Your First Document
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Categories</h3>
            <p className="text-sm text-gray-600 mb-6">
              Organize your documents by category for easier tax return preparation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documentCategories.map((category, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {documents.filter(doc => doc.category === category).length} documents
                    </span>
                    <button className="text-blue-600 hover:text-blue-900 text-sm">
                      View Documents
                    </button>
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

export default PTDocumentHubClean;
