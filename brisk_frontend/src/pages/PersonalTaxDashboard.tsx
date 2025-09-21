import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, User, Briefcase, Users, Home, PiggyBank, 
  TrendingUp, Globe, Shield, Calculator, CreditCard, CheckSquare,
  Send, Archive, Folder, Settings, BarChart3, 
  Building, Receipt
} from 'lucide-react';

import PTDashboard from '../components/personal-tax/PTDashboard';
import TaxpayerProfile from '../components/personal-tax/TaxpayerProfile';
import Employment from '../components/personal-tax/Employment';
import SelfEmployment from '../components/personal-tax/SelfEmployment';
import Partnerships from '../components/personal-tax/Partnerships';
import UKProperty from '../components/personal-tax/UKProperty';
import SavingsInvestments from '../components/personal-tax/SavingsInvestments';
import CapitalGains from '../components/personal-tax/CapitalGains';
import ForeignIncome from '../components/personal-tax/ForeignIncome';
import TrustsEstates from '../components/personal-tax/TrustsEstates';
import ReliefsDeductions from '../components/personal-tax/ReliefsDeductions';
import ResidenceDomicile from '../components/personal-tax/ResidenceDomicile';
import CalculationsWhatIf from '../components/personal-tax/CalculationsWhatIf';
import PaymentsLiabilities from '../components/personal-tax/PaymentsLiabilities';
import ReviewChecklists from '../components/personal-tax/ReviewChecklists';
import Filing from '../components/personal-tax/Filing';
import PostFiling from '../components/personal-tax/PostFiling';
import PTDocumentHub from '../components/personal-tax/PTDocumentHub';
import PTIntegrations from '../components/personal-tax/PTIntegrations';
import PTSettings from '../components/personal-tax/PTSettings';
import PTReports from '../components/personal-tax/PTReports';

const PersonalTaxDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [taxpayerSwitcher, setTaxpayerSwitcher] = useState('John Smith');
  const [taxYear, setTaxYear] = useState('2024-25');
  const [returnStatus] = useState('In progress');
  const [scenario, setScenario] = useState('Current');
  const [hmrcConnection] = useState('Connected');
  const [agentAuth] = useState('Valid');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/personal-tax' },
    { id: 'taxpayer-profile', label: 'Taxpayer Profile & Authorisations', icon: User, path: '/personal-tax/taxpayer-profile' },
    { id: 'employment', label: 'Employment (SA102)', icon: Briefcase, path: '/personal-tax/employment' },
    { id: 'self-employment', label: 'Self-Employment (SA103)', icon: Building, path: '/personal-tax/self-employment' },
    { id: 'partnerships', label: 'Partnerships (SA104)', icon: Users, path: '/personal-tax/partnerships' },
    { id: 'uk-property', label: 'UK Property (SA105)', icon: Home, path: '/personal-tax/uk-property' },
    { id: 'savings-investments', label: 'Savings & Investments', icon: PiggyBank, path: '/personal-tax/savings-investments' },
    { id: 'capital-gains', label: 'Capital Gains (SA108)', icon: TrendingUp, path: '/personal-tax/capital-gains' },
    { id: 'foreign-income', label: 'Foreign Income (SA106)', icon: Globe, path: '/personal-tax/foreign-income' },
    { id: 'trusts-estates', label: 'Trusts & Estates', icon: Shield, path: '/personal-tax/trusts-estates' },
    { id: 'reliefs-deductions', label: 'Reliefs & Deductions', icon: Receipt, path: '/personal-tax/reliefs-deductions' },
    { id: 'residence-domicile', label: 'Residence & Domicile (SA109)', icon: Globe, path: '/personal-tax/residence-domicile' },
    { id: 'calculations', label: 'Calculations & What-If (SA302)', icon: Calculator, path: '/personal-tax/calculations' },
    { id: 'payments-liabilities', label: 'Payments & Liabilities', icon: CreditCard, path: '/personal-tax/payments-liabilities' },
    { id: 'review-checklists', label: 'Review & Checklists', icon: CheckSquare, path: '/personal-tax/review-checklists' },
    { id: 'filing', label: 'Filing', icon: Send, path: '/personal-tax/filing' },
    { id: 'post-filing', label: 'Post-Filing', icon: Archive, path: '/personal-tax/post-filing' },
    { id: 'document-hub', label: 'Document Hub', icon: Folder, path: '/personal-tax/document-hub' },
    { id: 'integrations', label: 'Integrations', icon: Settings, path: '/personal-tax/integrations' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/personal-tax/settings' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/personal-tax/reports' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const getCurrentPath = () => {
    return location.pathname;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <select 
              value={taxpayerSwitcher} 
              onChange={(e) => setTaxpayerSwitcher(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="John Smith">John Smith</option>
              <option value="Jane Doe">Jane Doe</option>
              <option value="Robert Johnson">Robert Johnson</option>
            </select>
            
            <select 
              value={taxYear} 
              onChange={(e) => setTaxYear(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="2024-25">2024-25</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
            </select>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                returnStatus === 'Filed' ? 'bg-green-100 text-green-800' :
                returnStatus === 'Ready to file' ? 'bg-blue-100 text-blue-800' :
                returnStatus === 'For review' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {returnStatus}
              </span>
            </div>
            
            <select 
              value={scenario} 
              onChange={(e) => setScenario(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="Current">Current</option>
              <option value="What-if">What-if</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">HMRC:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                hmrcConnection === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {hmrcConnection}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Agent Auth:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                agentAuth === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {agentAuth}
              </span>
            </div>
            
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              3 Alerts
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Tax</h2>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = getCurrentPath() === item.path;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<PTDashboard />} />
            <Route path="/taxpayer-profile" element={<TaxpayerProfile />} />
            <Route path="/employment" element={<Employment />} />
            <Route path="/self-employment" element={<SelfEmployment />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/uk-property" element={<UKProperty />} />
            <Route path="/savings-investments" element={<SavingsInvestments />} />
            <Route path="/capital-gains" element={<CapitalGains />} />
            <Route path="/foreign-income" element={<ForeignIncome />} />
            <Route path="/trusts-estates" element={<TrustsEstates />} />
            <Route path="/reliefs-deductions" element={<ReliefsDeductions />} />
            <Route path="/residence-domicile" element={<ResidenceDomicile />} />
            <Route path="/calculations" element={<CalculationsWhatIf />} />
            <Route path="/payments-liabilities" element={<PaymentsLiabilities />} />
            <Route path="/review-checklists" element={<ReviewChecklists />} />
            <Route path="/filing" element={<Filing />} />
            <Route path="/post-filing" element={<PostFiling />} />
            <Route path="/document-hub" element={<PTDocumentHub />} />
            <Route path="/integrations" element={<PTIntegrations />} />
            <Route path="/settings" element={<PTSettings />} />
            <Route path="/reports" element={<PTReports />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default PersonalTaxDashboard;
