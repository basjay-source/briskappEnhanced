import React, { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, DollarSign } from 'lucide-react';

interface RelatedPartiesProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const RelatedParties: React.FC<RelatedPartiesProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('trustees');
  const [loading, setLoading] = useState(true);
  const [trustees, setTrustees] = useState<any[]>([]);
  const [rptRegister, setRptRegister] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [regularity, setRegularity] = useState<any>({});

  const tabs = [
    { id: 'trustees', label: 'Trustees/Governors', icon: Users },
    { id: 'rpt-register', label: 'RPT Register', icon: FileText },
    { id: 'expenses', label: 'Trustee Expenses', icon: DollarSign },
    { id: 'regularity', label: 'Regularity (Academy)', icon: CheckCircle }
  ];

  useEffect(() => {
    fetchRelatedPartiesData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchRelatedPartiesData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/related-parties?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      
      setTrustees(data.trustees || []);
      setRptRegister(data.rptRegister || []);
      setExpenses(data.expenses || []);
      setRegularity(data.regularity || {});
    } catch (error) {
      console.error('Error fetching related parties data:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">Related Parties & Trustees</h1>
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
        {activeTab === 'trustees' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Trustees/Governors Register</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remuneration</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trustees.map((trustee, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trustee.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trustee.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trustee.appointed}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          trustee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {trustee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{trustee.remuneration?.toLocaleString() || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'rpt-register' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Related Party Transactions Register</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Related Party</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nature</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ESFA Report</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rptRegister.map((rpt, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rpt.party}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rpt.nature}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{rpt.value?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          rpt.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {rpt.approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {selectedMode === 'academy' ? (rpt.esfaReport ? 'Yes' : 'No') : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Trustee Expenses & Remuneration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Expenses:</span>
                    <span className="text-sm font-medium">£{expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Number of Trustees:</span>
                    <span className="text-sm font-medium">{expenses.length}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Remuneration Policy</h4>
                <p className="text-sm text-gray-600">
                  Trustees receive no remuneration for their services as trustees. 
                  Expenses are reimbursed for travel and accommodation costs incurred 
                  in the performance of trustee duties.
                </p>
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trustee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map((expense, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.trustee}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{expense.amount?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'regularity' && selectedMode === 'academy' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Regularity Questionnaire</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Regularity Statement</h4>
                <p className="text-sm text-blue-800">
                  As accounting officer, I confirm that the academy trust has complied with the 
                  requirements of the Academy Trust Handbook and that I am not aware of any 
                  material irregularities.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Key Questions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Novel payments made?</span>
                      <span className="text-sm font-medium text-green-600">No</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Special payments made?</span>
                      <span className="text-sm font-medium text-green-600">No</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Gifts made?</span>
                      <span className="text-sm font-medium text-green-600">No</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Write-offs made?</span>
                      <span className="text-sm font-medium text-green-600">No</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Compliance Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Handbook compliance confirmed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Related party procedures followed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Procurement rules adhered to</span>
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

export default RelatedParties;
