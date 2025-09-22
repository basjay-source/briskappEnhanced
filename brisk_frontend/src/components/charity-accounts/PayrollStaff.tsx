import React, { useState, useEffect } from 'react';
import { Users, Calculator, Award, AlertTriangle } from 'lucide-react';

interface PayrollStaffProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: 'charity' | 'academy';
  selectedFramework: 'sorp' | 'aad';
}

const PayrollStaff: React.FC<PayrollStaffProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('headcount');
  const [staffData, setStaffData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'headcount', label: 'Headcount', icon: Users },
    { id: 'staff-costs', label: 'Staff Costs', icon: Calculator },
    { id: 'key-management', label: 'Key Management', icon: Award },
    { id: 'severance', label: 'Severance (Academy)', icon: AlertTriangle }
  ];

  useEffect(() => {
    fetchStaffData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchStaffData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/staff?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      
      setStaffData(data || {
        headcount: {
          teaching: 25,
          support: 15,
          management: 5,
          total: 45
        },
        staffCosts: {
          salaries: 1200000,
          socialSecurity: 120000,
          pensions: 180000,
          total: 1500000
        },
        keyManagement: [
          { role: 'Chief Executive', band: '£90,000 - £100,000' },
          { role: 'Finance Director', band: '£70,000 - £80,000' }
        ],
        severance: selectedMode === 'academy' ? [
          { amount: 25000, reason: 'Redundancy payment' }
        ] : []
      });
    } catch (error) {
      console.error('Error fetching staff data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading staff data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Payroll & Staff Costs</h1>
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

      {activeTab === 'headcount' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Teaching Staff</h3>
            <p className="text-3xl font-bold text-blue-600">{staffData.headcount?.teaching || 0}</p>
            <p className="text-sm text-gray-600">FTE</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Staff</h3>
            <p className="text-3xl font-bold text-green-600">{staffData.headcount?.support || 0}</p>
            <p className="text-sm text-gray-600">FTE</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Management</h3>
            <p className="text-3xl font-bold text-purple-600">{staffData.headcount?.management || 0}</p>
            <p className="text-sm text-gray-600">FTE</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Staff</h3>
            <p className="text-3xl font-bold text-gray-900">{staffData.headcount?.total || 0}</p>
            <p className="text-sm text-gray-600">FTE</p>
          </div>
        </div>
      )}

      {activeTab === 'staff-costs' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Cost Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Salaries & Wages</p>
              <p className="text-2xl font-bold text-gray-900">£{staffData.staffCosts?.salaries?.toLocaleString() || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Social Security</p>
              <p className="text-2xl font-bold text-gray-900">£{staffData.staffCosts?.socialSecurity?.toLocaleString() || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Pension Costs</p>
              <p className="text-2xl font-bold text-gray-900">£{staffData.staffCosts?.pensions?.toLocaleString() || 0}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">Total Staff Costs</p>
            <p className="text-3xl font-bold text-blue-600">£{staffData.staffCosts?.total?.toLocaleString() || 0}</p>
          </div>
        </div>
      )}

      {activeTab === 'key-management' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Key Management Personnel</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {staffData.keyManagement?.map((person: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">{person.role}</span>
                  <span className="text-gray-600">{person.band}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'severance' && selectedMode === 'academy' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Severance Payments</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {staffData.severance?.map((payment: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <span className="text-gray-900">{payment.reason}</span>
                  <span className="font-medium text-gray-900">£{payment.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollStaff;
