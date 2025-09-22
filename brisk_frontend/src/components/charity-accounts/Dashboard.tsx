import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, FileText } from 'lucide-react';

interface DashboardProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: 'charity' | 'academy';
  selectedFramework: 'sorp' | 'aad';
  selectedFund: string;
  selectedVersion: 'draft' | 'review' | 'final';
}

interface DashboardTile {
  id: string;
  title: string;
  description: string;
  status: 'error' | 'warning' | 'success' | 'info';
  count?: number;
  action: string;
  link: string;
}

interface ComplianceItem {
  id: string;
  title: string;
  dueDate: string;
  status: 'overdue' | 'due-soon' | 'completed' | 'pending';
  type: 'charity-commission' | 'companies-house' | 'esfa' | 'hmrc';
}

const Dashboard: React.FC<DashboardProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework,
  selectedVersion
}) => {
  const [dashboardTiles, setDashboardTiles] = useState<DashboardTile[]>([]);
  const [complianceTimeline, setComplianceTimeline] = useState<ComplianceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/charity-accounts/dashboard?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setDashboardTiles(data.tiles || []);
        setComplianceTimeline(data.compliance || []);
      } else {
        setSampleData();
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setSampleData();
    } finally {
      setLoading(false);
    }
  };

  const setSampleData = () => {
    const sampleTiles: DashboardTile[] = [
      {
        id: 'funds-balance',
        title: 'Funds Not Balancing',
        description: 'Restricted fund showing deficit of £15,000',
        status: 'error',
        count: 2,
        action: 'Review Fund Movements',
        link: '/charity-accounts/fund-movements'
      },
      {
        id: 'unmapped-income',
        title: 'Unmapped Income Lines',
        description: '12 income transactions need fund allocation',
        status: 'warning',
        count: 12,
        action: 'Complete Mapping',
        link: '/charity-accounts/import-mapping'
      },
      {
        id: 'capital-grants',
        title: 'Capital Grants Deferral Check',
        description: 'DfE capital grant requires deferral review',
        status: 'warning',
        count: 1,
        action: 'Review Deferral',
        link: '/charity-accounts/grants-donations'
      },
      {
        id: 'rpt-disclosure',
        title: 'RPT Disclosure Gaps',
        description: 'Missing related party transaction approvals',
        status: 'warning',
        count: 3,
        action: 'Complete Disclosures',
        link: '/charity-accounts/related-parties'
      },
      {
        id: 'academy-ar',
        title: 'Academy AR Mapping',
        description: 'ESFA Accounts Return mapping 85% complete',
        status: 'info',
        action: 'Complete Mapping',
        link: '/charity-accounts/filing-returns'
      },
      {
        id: 'ready-to-file',
        title: 'Ready to File',
        description: 'All checks passed, ready for submission',
        status: 'success',
        action: 'Proceed to Filing',
        link: '/charity-accounts/filing-returns'
      }
    ];

    const sampleCompliance: ComplianceItem[] = [
      {
        id: 'cc-annual-return',
        title: 'Charity Commission Annual Return',
        dueDate: '2024-12-31',
        status: 'due-soon',
        type: 'charity-commission'
      },
      {
        id: 'ch-accounts',
        title: 'Companies House Accounts Filing',
        dueDate: '2024-12-31',
        status: 'pending',
        type: 'companies-house'
      },
      {
        id: 'esfa-accounts-return',
        title: 'ESFA Accounts Return',
        dueDate: '2024-12-31',
        status: 'pending',
        type: 'esfa'
      },
      {
        id: 'ct600-subsidiary',
        title: 'CT600 Trading Subsidiary',
        dueDate: '2024-12-31',
        status: 'completed',
        type: 'hmrc'
      }
    ];

    setDashboardTiles(sampleTiles);
    setComplianceTimeline(sampleCompliance);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'error':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'info':
        return <Clock className="h-6 w-6 text-blue-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'due-soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {selectedMode === 'charity' ? 'Charity' : 'Academy'} Accounts Dashboard
        </h2>
        <p className="text-gray-600">
          {selectedFramework === 'sorp' ? 'SORP FRS 102' : 'Academy Accounts Direction'} • {selectedYear} • {selectedVersion.charAt(0).toUpperCase() + selectedVersion.slice(1)} Version
        </p>
      </div>

      {/* Dashboard Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardTiles.map((tile) => (
          <div
            key={tile.id}
            className={`border rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(tile.status)}`}
            onClick={() => window.location.href = tile.link}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {getStatusIcon(tile.status)}
                  <h3 className="ml-2 text-lg font-semibold text-gray-900">{tile.title}</h3>
                  {tile.count && (
                    <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
                      {tile.count}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{tile.description}</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  {tile.action} →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance Timeline</h3>
        <div className="space-y-4">
          {complianceTimeline.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {item.type === 'charity-commission' && <span className="text-2xl">🏛️</span>}
                  {item.type === 'companies-house' && <span className="text-2xl">🏢</span>}
                  {item.type === 'esfa' && <span className="text-2xl">🎓</span>}
                  {item.type === 'hmrc' && <span className="text-2xl">💼</span>}
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                  <p className="text-gray-600">Due: {new Date(item.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplianceStatusColor(item.status)}`}>
                {item.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-900">Build SoFA</h4>
            <p className="text-sm text-gray-600">Create Statement of Financial Activities</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="text-2xl mb-2">💸</div>
            <h4 className="font-medium text-gray-900">Fund Transfers</h4>
            <p className="text-sm text-gray-600">Manage fund movements</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="text-2xl mb-2">🎁</div>
            <h4 className="font-medium text-gray-900">Add Grant</h4>
            <p className="text-sm text-gray-600">Record new grant income</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="text-2xl mb-2">📑</div>
            <h4 className="font-medium text-gray-900">Generate Reports</h4>
            <p className="text-sm text-gray-600">Create charity reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
