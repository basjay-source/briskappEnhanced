import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Settings, Building, Upload, BarChart3, ArrowRightLeft, 
  Gift, Activity, TrendingDown, DollarSign, Users, FileText, 
  Calculator, Eye, CheckCircle, Send, Archive, Folder, 
  PieChart, Target, Plug, BarChart
} from 'lucide-react';

import Dashboard from '../components/charity-accounts/Dashboard';
import EngagementSetup from '../components/charity-accounts/EngagementSetup';
import FundStructure from '../components/charity-accounts/FundStructure';
import ImportMapping from '../components/charity-accounts/ImportMapping';
import SoFABuilder from '../components/charity-accounts/SoFABuilder';
import FundMovements from '../components/charity-accounts/FundMovements';
import GrantsDonations from '../components/charity-accounts/GrantsDonations';
import ActivitiesSupport from '../components/charity-accounts/ActivitiesSupport';
import FixedAssetsCapital from '../components/charity-accounts/FixedAssetsCapital';
import InvestmentsEndowments from '../components/charity-accounts/InvestmentsEndowments';
import TradingSubsidiaries from '../components/charity-accounts/TradingSubsidiaries';
import PayrollStaff from '../components/charity-accounts/PayrollStaff';
import RelatedParties from '../components/charity-accounts/RelatedParties';
import NotesDisclosures from '../components/charity-accounts/NotesDisclosures';
import TrusteesReport from '../components/charity-accounts/TrusteesReport';
import CashFlow from '../components/charity-accounts/CashFlow';
import AnalyticsReview from '../components/charity-accounts/Analytics';
import IXBRLTagging from '../components/charity-accounts/IXBRLTagging';
import ProofsReports from '../components/charity-accounts/ProofsReports';
import SignoffPublishing from '../components/charity-accounts/SignoffPublishing';
import FilingReturns from '../components/charity-accounts/FilingReturns';
import CADocumentHub from '../components/charity-accounts/CADocumentHub';
import CAIntegrations from '../components/charity-accounts/CAIntegrations';
import CASettings from '../components/charity-accounts/CASettings';
import CAReports from '../components/charity-accounts/CAReports';

interface Entity {
  id: string;
  name: string;
  type: 'charity' | 'academy' | 'mat';
  charityNumber?: string;
  companyNumber?: string;
  esfaUID?: string;
}

interface MenuStructure {
  id: string;
  label: string;
  icon: string;
  hasSubTabs?: boolean;
  subTabs?: Array<{
    id: string;
    label: string;
  }>;
}

const CharityAccountsDashboard: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string>('loading');
  const [selectedYear, setSelectedYear] = useState<string>('2024-25');
  const [selectedMode, setSelectedMode] = useState<'charity' | 'academy'>('charity');
  const [selectedFramework, setSelectedFramework] = useState<'sorp' | 'aad'>('sorp');
  const [selectedFund, setSelectedFund] = useState<string>('all');
  const [selectedVersion, setSelectedVersion] = useState<'draft' | 'review' | 'final'>('draft');
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [activeSubTab, setActiveSubTab] = useState<string>('');
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);

  const menuStructure: MenuStructure[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'engagement-setup', label: 'Engagement Setup', icon: '⚙️' },
    { id: 'fund-structure', label: 'Fund Structure & Dimensions', icon: '🏗️' },
    { id: 'import-mapping', label: 'Import & Mapping', icon: '📥' },
    { id: 'sofa-builder', label: 'SoFA Builder', icon: '📋' },
    { id: 'fund-movements', label: 'Fund Movements & Transfers', icon: '💸' },
    { id: 'grants-donations', label: 'Grants, Donations & Legacies', icon: '🎁' },
    { id: 'activities-support', label: 'Activities & Support Cost Allocation', icon: '📈' },
    { id: 'fixed-assets', label: 'Fixed Assets & Capital Grants', icon: '🏢' },
    { id: 'investments', label: 'Investments & Endowments', icon: '💰' },
    { id: 'trading-subsidiaries', label: 'Trading Subsidiaries & Consolidation', icon: '🏪' },
    { id: 'payroll-staff', label: 'Payroll & Staff Costs', icon: '👥' },
    { id: 'related-parties', label: 'Related Parties & Trustees', icon: '🤝' },
    { id: 'notes-disclosures', label: 'Notes & Disclosures', icon: '📝' },
    { id: 'trustees-report', label: 'Trustees\'/Governors\' Report', icon: '📄' },
    { id: 'cash-flow', label: 'Cash Flow', icon: '💧' },
    { id: 'analytics-review', label: 'Analytics & Review', icon: '📊' },
    { id: 'ixbrl-tagging', label: 'iXBRL Tagging & Validation', icon: '🏷️' },
    { id: 'proofs-reports', label: 'Proofs & Reports', icon: '📑' },
    { id: 'signoff-publishing', label: 'Sign-off & Publishing', icon: '✅' },
    { id: 'filing-returns', label: 'Filing & Returns', icon: '📤' },
    { id: 'document-hub', label: 'Document Hub', icon: '📁' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'reports', label: 'Reports', icon: '📊' }
  ];

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/charity-accounts/entities`);
      if (response.ok) {
        const data = await response.json();
        setEntities(data);
        if (data.length > 0) {
          setSelectedEntity(data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching entities:', error);
      const sampleEntities: Entity[] = [
        {
          id: '1',
          name: 'St. Mary\'s Charity',
          type: 'charity',
          charityNumber: '123456',
          companyNumber: 'SC123456'
        },
        {
          id: '2',
          name: 'Greenfield Academy Trust',
          type: 'academy',
          esfaUID: '12345',
          companyNumber: '12345678'
        },
        {
          id: '3',
          name: 'Excellence Multi Academy Trust',
          type: 'mat',
          esfaUID: '54321',
          companyNumber: '87654321'
        }
      ];
      setEntities(sampleEntities);
      setSelectedEntity(sampleEntities[0].id);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const handleMenuClick = (sectionId: string, subTabId?: string) => {
    setActiveSection(sectionId);
    if (subTabId) {
      setActiveSubTab(subTabId);
    } else {
      setActiveSubTab('');
    }
  };

  const renderActiveComponent = () => {
    const props = {
      selectedEntity,
      selectedYear,
      selectedMode,
      selectedFramework,
      selectedFund,
      selectedVersion
    };

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard {...props} />;
      case 'engagement-setup':
        return <EngagementSetup {...props} />;
      case 'fund-structure':
        return <FundStructure {...props} />;
      case 'import-mapping':
        return <ImportMapping {...props} />;
      case 'sofa-builder':
        return <SoFABuilder {...props} />;
      case 'fund-movements':
        return <FundMovements {...props} />;
      case 'grants-donations':
        return <GrantsDonations {...props} />;
      case 'activities-support':
        return <ActivitiesSupport {...props} />;
      case 'fixed-assets':
        return <FixedAssetsCapital {...props} />;
      case 'investments':
        return <InvestmentsEndowments {...props} />;
      case 'trading-subsidiaries':
        return <TradingSubsidiaries {...props} />;
      case 'payroll-staff':
        return <PayrollStaff {...props} />;
      case 'related-parties':
        return <RelatedParties {...props} />;
      case 'notes-disclosures':
        return <NotesDisclosures {...props} />;
      case 'trustees-report':
        return <TrusteesReport {...props} />;
      case 'cash-flow':
        return <CashFlow {...props} />;
      case 'analytics-review':
        return <AnalyticsReview {...props} />;
      case 'ixbrl-tagging':
        return <IXBRLTagging {...props} />;
      case 'proofs-reports':
        return <ProofsReports {...props} />;
      case 'signoff-publishing':
        return <SignoffPublishing {...props} />;
      case 'filing-returns':
        return <FilingReturns {...props} />;
      case 'document-hub':
        return <CADocumentHub {...props} />;
      case 'integrations':
        return <CAIntegrations {...props} />;
      case 'settings':
        return <CASettings {...props} />;
      case 'reports':
        return <CAReports {...props} />;
      default:
        return <Dashboard {...props} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Charity Accounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-gray-900">Charity/Academy Accounts</h1>
            
            {/* Entity Switcher */}
            <select
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {entities.map((entity) => (
                <option key={entity.id} value={entity.id}>
                  {entity.name} ({entity.type.toUpperCase()})
                </option>
              ))}
            </select>

            {/* Year End */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2024-25">2024-25</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
            </select>

            {/* Mode */}
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value as 'charity' | 'academy')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="charity">Charity</option>
              <option value="academy">Academy Trust</option>
            </select>

            {/* Framework */}
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value as 'sorp' | 'aad')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sorp">SORP FRS 102</option>
              <option value="aad">AAD</option>
            </select>

            {/* Fund Filter */}
            <select
              value={selectedFund}
              onChange={(e) => setSelectedFund(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Funds</option>
              <option value="unrestricted">Unrestricted</option>
              <option value="restricted">Restricted</option>
              <option value="endowment">Endowment</option>
              <option value="restricted-fa">Restricted FA</option>
            </select>

            {/* Version */}
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value as 'draft' | 'review' | 'final')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="review">For Review</option>
              <option value="final">Final</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Healthy</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Charity Commission:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">ESFA:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Connected</span>
            </div>
            <div className="text-orange-600 font-medium">3 Alerts</div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <nav className="space-y-1">
              {menuStructure.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-md hover:transform hover:scale-105'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.hasSubTabs && (
                      <ChevronRightIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default CharityAccountsDashboard;
