import React, { useState, useEffect } from 'react';
import { CheckCircle, Users, Lock, Send } from 'lucide-react';

interface SignoffPublishingProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const SignoffPublishing: React.FC<SignoffPublishingProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('workflow');
  const [loading, setLoading] = useState(true);
  const [signoffData, setSignoffData] = useState<any>({});

  const tabs = [
    { id: 'workflow', label: 'Workflow', icon: CheckCircle },
    { id: 'signatures', label: 'Signatures', icon: Users },
    { id: 'lock-version', label: 'Lock & Version', icon: Lock }
  ];

  useEffect(() => {
    fetchSignoffData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchSignoffData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/signoff-publishing?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setSignoffData(data);
    } catch (error) {
      console.error('Error fetching signoff data:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">Sign-off & Publishing</h1>
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
        {activeTab === 'workflow' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Maker-Checker Workflow</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Sign-off Process</h4>
                <p className="text-sm text-blue-800">
                  Accounts follow a maker-checker workflow: Preparer → Reviewer → Partner approval before publication.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-4 rounded-lg border ${
                  signoffData.workflow?.preparer?.status === 'complete' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <h4 className="font-medium mb-2">1. Preparer</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={signoffData.workflow?.preparer?.status === 'complete' ? 'text-green-600' : 'text-yellow-600'}>
                        {signoffData.workflow?.preparer?.status || 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>User:</span>
                      <span>{signoffData.workflow?.preparer?.user || 'Not assigned'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{signoffData.workflow?.preparer?.date || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${
                  signoffData.workflow?.reviewer?.status === 'complete' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <h4 className="font-medium mb-2">2. Reviewer</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={signoffData.workflow?.reviewer?.status === 'complete' ? 'text-green-600' : 'text-gray-600'}>
                        {signoffData.workflow?.reviewer?.status || 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>User:</span>
                      <span>{signoffData.workflow?.reviewer?.user || 'Not assigned'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{signoffData.workflow?.reviewer?.date || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${
                  signoffData.workflow?.partner?.status === 'complete' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <h4 className="font-medium mb-2">3. Partner</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={signoffData.workflow?.partner?.status === 'complete' ? 'text-green-600' : 'text-gray-600'}>
                        {signoffData.workflow?.partner?.status || 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>User:</span>
                      <span>{signoffData.workflow?.partner?.user || 'Not assigned'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{signoffData.workflow?.partner?.date || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Review Points</h4>
                <div className="space-y-2">
                  {(signoffData.reviewPoints || []).map((point: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm">{point.description}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        point.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        point.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {point.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'signatures' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Trustee/Governor Signatures</h3>
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">E-Signature Process</h4>
                <p className="text-sm text-purple-800">
                  Route signatures to trustees/governors via Document Hub e-sign workflow for accounts approval.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signatory</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Signed</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(signoffData.signatures || []).map((signature: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{signature.signatory}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{signature.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{signature.document}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            signature.status === 'signed' ? 'bg-green-100 text-green-800' :
                            signature.status === 'sent' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {signature.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{signature.dateSigned || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Send for Signature
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Download Signed Copy
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lock-version' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Lock & Version Control</h3>
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">Final Version Lock</h4>
                <p className="text-sm text-red-800">
                  Once accounts are finalized and signed, lock the final version and watermark all prior drafts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Version History</h4>
                  <div className="space-y-2">
                    {(signoffData.versions || []).map((version: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div>
                          <span className="text-sm font-medium">{version.name}</span>
                          <span className="text-xs text-gray-500 block">{version.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            version.status === 'final' ? 'bg-green-100 text-green-800' :
                            version.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {version.status}
                          </span>
                          {version.locked && (
                            <Lock className="w-3 h-3 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Lock Controls</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Final Version Locked:</span>
                      <span className={`text-sm font-medium ${
                        signoffData.lockStatus?.finalLocked ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {signoffData.lockStatus?.finalLocked ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Drafts Watermarked:</span>
                      <span className={`text-sm font-medium ${
                        signoffData.lockStatus?.draftsWatermarked ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {signoffData.lockStatus?.draftsWatermarked ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Archive Complete:</span>
                      <span className={`text-sm font-medium ${
                        signoffData.lockStatus?.archiveComplete ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {signoffData.lockStatus?.archiveComplete ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                      Lock Final Version
                    </button>
                    <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg">
                      Watermark Drafts
                    </button>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                      Archive All Versions
                    </button>
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

export default SignoffPublishing;
