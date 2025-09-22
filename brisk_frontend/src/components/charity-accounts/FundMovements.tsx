import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Plus, Eye, Download, Calculator } from 'lucide-react';

interface FundMovementsProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: 'charity' | 'academy';
  selectedFramework: 'sorp' | 'aad';
  selectedFund: string;
}

interface FundMovement {
  fundId: string;
  fundName: string;
  fundType: string;
  openingBalance: number;
  income: number;
  expenditure: number;
  transfersIn: number;
  transfersOut: number;
  gainsLosses: number;
  closingBalance: number;
}

interface Transfer {
  id: string;
  date: string;
  fromFund: string;
  toFund: string;
  amount: number;
  reason: string;
  approvedBy: string;
  status: 'pending' | 'approved' | 'completed';
}

const FundMovements: React.FC<FundMovementsProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework,
  selectedFund
}) => {
  const [activeTab, setActiveTab] = useState('movements');
  const [fundMovements, setFundMovements] = useState<FundMovement[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [designations, setDesignations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'movements', label: 'Movements Schedule', icon: Calculator },
    { id: 'transfers', label: 'Transfers', icon: ArrowRightLeft },
    { id: 'designations', label: 'Designations', icon: Plus }
  ];

  useEffect(() => {
    fetchFundMovements();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework, selectedFund]);

  const fetchFundMovements = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/fund-movements?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}&fund=${selectedFund}`);
      const data = await response.json();
      
      setFundMovements(data.movements || [
        {
          fundId: '1',
          fundName: 'General Fund',
          fundType: 'Unrestricted',
          openingBalance: 120000,
          income: 200000,
          expenditure: -170000,
          transfersIn: 0,
          transfersOut: 0,
          gainsLosses: 0,
          closingBalance: 150000
        },
        {
          fundId: '2',
          fundName: 'Building Fund',
          fundType: 'Restricted General',
          openingBalance: 50000,
          income: 100000,
          expenditure: -75000,
          transfersIn: 0,
          transfersOut: 0,
          gainsLosses: 0,
          closingBalance: 75000
        },
        {
          fundId: '3',
          fundName: 'Fixed Asset Fund',
          fundType: 'Restricted Fixed Asset',
          openingBalance: 480000,
          income: 150000,
          expenditure: -50000,
          transfersIn: 0,
          transfersOut: 0,
          gainsLosses: -60000,
          closingBalance: 520000
        }
      ]);

      setTransfers(data.transfers || [
        {
          id: '1',
          date: '2024-03-15',
          fromFund: 'General Fund',
          toFund: 'Building Fund',
          amount: 25000,
          reason: 'Transfer for building maintenance project',
          approvedBy: 'Board of Trustees',
          status: 'completed'
        },
        {
          id: '2',
          date: '2024-06-01',
          fromFund: 'Restricted General',
          toFund: 'Restricted Fixed Asset',
          amount: 50000,
          reason: 'Purchase of educational equipment',
          approvedBy: 'Finance Committee',
          status: 'pending'
        }
      ]);

      setDesignations(data.designations || [
        {
          id: '1',
          name: 'Building Maintenance Reserve',
          amount: 30000,
          purpose: 'Future building maintenance and repairs',
          dateDesignated: '2024-01-01',
          reviewDate: '2024-12-31'
        }
      ]);
    } catch (error) {
      console.error('Error fetching fund movements:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    return fundMovements.reduce((totals, movement) => ({
      openingBalance: totals.openingBalance + movement.openingBalance,
      income: totals.income + movement.income,
      expenditure: totals.expenditure + movement.expenditure,
      transfersIn: totals.transfersIn + movement.transfersIn,
      transfersOut: totals.transfersOut + movement.transfersOut,
      gainsLosses: totals.gainsLosses + movement.gainsLosses,
      closingBalance: totals.closingBalance + movement.closingBalance
    }), {
      openingBalance: 0,
      income: 0,
      expenditure: 0,
      transfersIn: 0,
      transfersOut: 0,
      gainsLosses: 0,
      closingBalance: 0
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading fund movements...</span>
      </div>
    );
  }

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Fund Movements & Transfers</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            <Plus className="w-4 h-4" />
            <span>New Transfer</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
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

      {activeTab === 'movements' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Fund Movement Analysis</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Balance</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Income</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Expenditure</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Transfers In</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Transfers Out</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gains/Losses</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Closing Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fundMovements.map((movement) => (
                  <tr key={movement.fundId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{movement.fundName}</div>
                        <div className="text-sm text-gray-500">{movement.fundType}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      £{movement.openingBalance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600">
                      £{movement.income.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-red-600">
                      £{Math.abs(movement.expenditure).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-blue-600">
                      £{movement.transfersIn.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-blue-600">
                      £{Math.abs(movement.transfersOut).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      £{movement.gainsLosses.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      £{movement.closingBalance.toLocaleString()}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-medium">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Total</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    £{totals.openingBalance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600">
                    £{totals.income.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-red-600">
                    £{Math.abs(totals.expenditure).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-blue-600">
                    £{totals.transfersIn.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-blue-600">
                    £{Math.abs(totals.transfersOut).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    £{totals.gainsLosses.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    £{totals.closingBalance.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'transfers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Fund Transfers</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Fund</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Fund</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transfers.map((transfer) => (
                    <tr key={transfer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(transfer.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transfer.fromFund}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transfer.toFund}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        £{transfer.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {transfer.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transfer.status === 'completed' ? 'bg-green-100 text-green-800' :
                          transfer.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Eye className="w-4 h-4" />
                        </button>
                        {transfer.status === 'pending' && (
                          <button className="text-green-600 hover:text-green-900">
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'designations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Designated Funds</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {designations.map((designation) => (
                  <div key={designation.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{designation.name}</h4>
                        <p className="text-sm text-gray-600">{designation.purpose}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Designated: {new Date(designation.dateDesignated).toLocaleDateString()} | 
                          Review: {new Date(designation.reviewDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">£{designation.amount.toLocaleString()}</p>
                        <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundMovements;
