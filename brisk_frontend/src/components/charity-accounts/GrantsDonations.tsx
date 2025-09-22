import React, { useState, useEffect } from 'react';
import { Gift, Plus, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface GrantsDonationsProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: 'charity' | 'academy';
  selectedFramework: 'sorp' | 'aad';
}

interface Grant {
  id: string;
  donor: string;
  amount: number;
  purpose: string;
  status: 'received' | 'pending' | 'deferred';
  receivedDate: string;
  recognitionMethod: 'performance' | 'deferral';
  conditions: string;
  fundType: string;
}

interface Legacy {
  id: string;
  estate: string;
  estimatedAmount: number;
  actualAmount?: number;
  probateStage: string;
  likelihood: 'probable' | 'possible' | 'remote';
  dateNotified: string;
  recognitionDate?: string;
}

interface GiftAid {
  id: string;
  donorName: string;
  donationAmount: number;
  giftAidAmount: number;
  claimDate: string;
  status: 'claimed' | 'pending' | 'received';
}

const GrantsDonations: React.FC<GrantsDonationsProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('grants');
  const [grants, setGrants] = useState<Grant[]>([]);
  const [legacies, setLegacies] = useState<Legacy[]>([]);
  const [giftAid, setGiftAid] = useState<GiftAid[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'grants', label: 'Incoming Grants', icon: Gift },
    { id: 'performance', label: 'Performance/Deferral', icon: Calendar },
    { id: 'legacies', label: 'Legacies', icon: CheckCircle },
    { id: 'gift-aid', label: 'Gift Aid', icon: Plus }
  ];

  useEffect(() => {
    fetchGrantsData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchGrantsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/grants-donations?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      
      setGrants(data.grants || [
        {
          id: '1',
          donor: 'Department for Education',
          amount: 250000,
          purpose: 'Educational equipment and resources',
          status: 'received',
          receivedDate: '2024-01-15',
          recognitionMethod: 'performance',
          conditions: 'Must be spent on educational equipment within 12 months',
          fundType: 'Restricted General'
        },
        {
          id: '2',
          donor: 'Local Authority',
          amount: 50000,
          purpose: 'Community outreach programs',
          status: 'pending',
          receivedDate: '2024-03-01',
          recognitionMethod: 'deferral',
          conditions: 'Performance conditions to be met over 2 years',
          fundType: 'Restricted General'
        },
        {
          id: '3',
          donor: 'Private Foundation',
          amount: 100000,
          purpose: 'Building renovation project',
          status: 'deferred',
          receivedDate: '2024-02-10',
          recognitionMethod: 'deferral',
          conditions: 'Capital grant for building improvements',
          fundType: 'Restricted Fixed Asset'
        }
      ]);

      setLegacies(data.legacies || [
        {
          id: '1',
          estate: 'Estate of John Smith',
          estimatedAmount: 75000,
          actualAmount: 80000,
          probateStage: 'Grant obtained',
          likelihood: 'probable',
          dateNotified: '2024-01-20',
          recognitionDate: '2024-03-15'
        },
        {
          id: '2',
          estate: 'Estate of Mary Johnson',
          estimatedAmount: 25000,
          probateStage: 'Probate pending',
          likelihood: 'possible',
          dateNotified: '2024-02-10'
        }
      ]);

      setGiftAid(data.giftAid || [
        {
          id: '1',
          donorName: 'Various Donors',
          donationAmount: 40000,
          giftAidAmount: 10000,
          claimDate: '2024-04-01',
          status: 'claimed'
        },
        {
          id: '2',
          donorName: 'Various Donors',
          donationAmount: 32000,
          giftAidAmount: 8000,
          claimDate: '2024-07-01',
          status: 'pending'
        }
      ]);
    } catch (error) {
      console.error('Error fetching grants data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
      case 'claimed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'deferred':
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading grants and donations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Grants, Donations & Legacies</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" />
          <span>Add Grant</span>
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

      {activeTab === 'grants' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Grant Register</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recognition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grants.map((grant) => (
                  <tr key={grant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{grant.donor}</div>
                      <div className="text-sm text-gray-500">Received: {new Date(grant.receivedDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      £{grant.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="truncate">{grant.purpose}</div>
                      <div className="text-xs text-gray-500 mt-1">{grant.conditions}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        grant.fundType === 'Unrestricted' ? 'bg-green-100 text-green-800' :
                        grant.fundType === 'Restricted General' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {grant.fundType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {grant.recognitionMethod === 'performance' ? 'Performance Model' : 'Deferral Model'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(grant.status)}
                        <span className="text-sm text-gray-900 capitalize">{grant.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Grant Recognition Methods</h3>
            <div className="space-y-4">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h4 className="font-medium text-blue-900 mb-2">Performance Model</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Income is recognized as performance conditions are met. Used when grants have specific performance obligations.
                </p>
                <div className="space-y-2">
                  {grants.filter(g => g.recognitionMethod === 'performance').map(grant => (
                    <div key={grant.id} className="flex items-center justify-between">
                      <span className="text-sm text-blue-900">{grant.donor}</span>
                      <span className="text-sm font-medium text-blue-900">£{grant.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-medium text-green-900 mb-2">Deferral Model</h4>
                <p className="text-sm text-green-800 mb-3">
                  Income is deferred and recognized over time or when conditions are met. Commonly used for capital grants.
                </p>
                <div className="space-y-2">
                  {grants.filter(g => g.recognitionMethod === 'deferral').map(grant => (
                    <div key={grant.id} className="flex items-center justify-between">
                      <span className="text-sm text-green-900">{grant.donor}</span>
                      <span className="text-sm font-medium text-green-900">£{grant.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'legacies' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Legacy Register</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probate Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likelihood</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recognition</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {legacies.map((legacy) => (
                  <tr key={legacy.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{legacy.estate}</div>
                      <div className="text-sm text-gray-500">Notified: {new Date(legacy.dateNotified).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      £{legacy.estimatedAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {legacy.actualAmount ? `£${legacy.actualAmount.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {legacy.probateStage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        legacy.likelihood === 'probable' ? 'bg-green-100 text-green-800' :
                        legacy.likelihood === 'possible' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {legacy.likelihood.charAt(0).toUpperCase() + legacy.likelihood.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {legacy.recognitionDate ? new Date(legacy.recognitionDate).toLocaleDateString() : 'Not recognized'}
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
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Gift Aid Claims</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donation Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gift Aid Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {giftAid.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {claim.donorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{claim.donationAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        £{claim.giftAidAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(claim.claimDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(claim.status)}
                          <span className="text-sm text-gray-900 capitalize">{claim.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Gift Aid Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-blue-800">Total Donations</p>
                <p className="text-lg font-bold text-blue-900">
                  £{giftAid.reduce((sum, claim) => sum + claim.donationAmount, 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-800">Total Gift Aid</p>
                <p className="text-lg font-bold text-blue-900">
                  £{giftAid.reduce((sum, claim) => sum + claim.giftAidAmount, 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-800">Effective Rate</p>
                <p className="text-lg font-bold text-blue-900">25%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrantsDonations;
