import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Settings, 
  FileText, 
  Users, 
  Shield, 
  Clock, 
  BookOpen, 
  DollarSign, 
  Building, 
  Calculator, 
  TrendingUp,
  PieChart,
  FileSignature
} from 'lucide-react'

const EcosystemHub: React.FC = () => {
  const navigate = useNavigate()

  const modules = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Advanced SaaS administration with multi-tenant, region-aware, and policy-driven controls',
      icon: Settings,
      color: 'from-blue-500 to-blue-600',
      path: '/admin',
      features: ['Multi-tenant', 'RBAC/ABAC', 'SSO/SCIM', 'Billing', 'Security']
    },
    {
      id: 'document-hub',
      title: 'Document Hub',
      description: 'Centralized document management with OCR, AI assist, and client portal integration',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      path: '/document-hub',
      features: ['OCR Processing', 'AI Assist', 'Client Portal', 'E-Sign', 'Retention']
    },
    {
      id: 'practice-management',
      title: 'Practice Management',
      description: 'Complete practice workflow management from client onboarding to billing',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      path: '/practice-management',
      features: ['CRM', 'Workflows', 'Billing', 'Quality Review', 'Analytics']
    },
    {
      id: 'aml-kyc',
      title: 'AML & KYC',
      description: 'Anti-money laundering and know your customer compliance management',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      path: '/aml-kyc',
      features: ['Identity Verification', 'Risk Assessment', 'Screening', 'SAR Reports', 'Monitoring']
    },
    {
      id: 'time-management',
      title: 'Time Management',
      description: 'Time tracking, billing, and revenue recognition with advanced analytics',
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
      path: '/time-management',
      features: ['Time Tracking', 'Billing', 'WIP Management', 'Revenue Recognition', 'Analytics']
    },
    {
      id: 'bookkeeping',
      title: 'Bookkeeping',
      description: 'Complete bookkeeping solution with bank feeds, OCR, and MTD integration',
      icon: BookOpen,
      color: 'from-orange-500 to-orange-600',
      path: '/bookkeeping',
      features: ['Bank Feeds', 'OCR Processing', 'MTD Integration', 'Reporting', 'Multi-currency']
    },
    {
      id: 'payroll',
      title: 'Payroll',
      description: 'Full payroll processing with RTI, auto-enrolment, and HMRC integration',
      icon: DollarSign,
      color: 'from-blue-500 to-blue-600',
      path: '/payroll',
      features: ['RTI Filing', 'Auto-enrolment', 'CIS', 'Benefits', 'Year-end']
    },
    {
      id: 'company-secretarial',
      title: 'Company Secretarial',
      description: 'Companies House filings, registers, and corporate governance management',
      icon: Building,
      color: 'from-orange-500 to-orange-600',
      path: '/company-secretarial',
      features: ['CH Filings', 'Registers', 'Dividends', 'Share Capital', 'Governance']
    },
    {
      id: 'accounts-production',
      title: 'Accounts Production',
      description: 'Statutory accounts preparation with iXBRL tagging and filing integration',
      icon: PieChart,
      color: 'from-blue-500 to-blue-600',
      path: '/accounts-production',
      features: ['iXBRL Tagging', 'Lead Schedules', 'Consolidation', 'Filing', 'Analytics']
    },
    {
      id: 'business-tax',
      title: 'Business Tax',
      description: 'Corporation Tax computations, filing, and compliance management',
      icon: Calculator,
      color: 'from-orange-500 to-orange-600',
      path: '/business-tax',
      features: ['CT Computations', 'Capital Allowances', 'Group Relief', 'R&D Claims', 'Filing']
    },
    {
      id: 'personal-tax',
      title: 'Personal Tax',
      description: 'Self Assessment and personal tax planning with HMRC integration',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      path: '/personal-tax',
      features: ['Self Assessment', 'Tax Planning', 'HMRC Integration', 'Capital Gains', 'Dividends']
    },
    {
      id: 'e-signature',
      title: 'e-Signature',
      description: 'Digital signature workflows with audit trails and compliance tracking',
      icon: FileSignature,
      color: 'from-orange-500 to-orange-600',
      path: '/e-signature',
      features: ['Digital Signing', 'Audit Trails', 'Workflows', 'Templates', 'Compliance']
    }
  ]

  const handleModuleClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Brisk Accountancy Practice Suite
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrated practice management ecosystem with 12 comprehensive modules for modern accounting firms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon
            return (
              <div
                key={module.id}
                onClick={() => handleModuleClick(module.path)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">
                  <div className={`h-32 bg-gradient-to-r ${module.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <IconComponent className="w-12 h-12 text-white relative z-10" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {module.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Key Features
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {module.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {module.features.length > 3 && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                            +{module.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform group-hover:scale-105">
                      Launch Module
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Unified Practice Management
            </h2>
            <p className="text-gray-600 mb-6">
              All modules are fully integrated with cross-module data sharing, unified client records, 
              and seamless workflow automation. Experience the power of a truly connected practice management ecosystem.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-gray-600">Modules</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-600">Integrated</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-orange-600">Real-time</div>
                <div className="text-sm text-gray-600">Data Sync</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-blue-600">Cloud</div>
                <div className="text-sm text-gray-600">Native</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EcosystemHub
