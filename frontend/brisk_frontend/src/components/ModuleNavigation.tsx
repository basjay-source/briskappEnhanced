import { Link, useLocation } from 'react-router-dom'
import { 
  Calculator, 
  Receipt, 
  Users, 
  Shield, 
  Building, 
  BookOpen, 
  FileSignature,
  BarChart3,
  Home,
  Briefcase,
  Clock,
  Heart
} from 'lucide-react'

const modules = [
  {
    name: 'Ecosystem Hub',
    path: '/app',
    icon: Home,
    description: 'Overview of all modules'
  },
  {
    name: 'Practice Management',
    path: '/app/practice',
    icon: Briefcase,
    description: 'Jobs, workflows, deadlines'
  },
  {
    name: 'Accounts Production',
    path: '/app/accounts',
    icon: Calculator,
    description: 'FRS 102/105, IFRS, iXBRL'
  },
  {
    name: 'Corporation Tax',
    path: '/app/tax/ct',
    icon: Receipt,
    description: 'CT600, R&D claims, reliefs'
  },
  {
    name: 'Personal Tax',
    path: '/app/tax/sa',
    icon: BarChart3,
    description: 'SA returns, CGT, optimization'
  },
  {
    name: 'Payroll',
    path: '/app/payroll',
    icon: Users,
    description: 'RTI, pensions, CIS, P11D'
  },
  {
    name: 'AML/KYC',
    path: '/app/aml',
    icon: Shield,
    description: 'Risk assessment, compliance'
  },
  {
    name: 'Company Secretarial',
    path: '/app/cosec',
    icon: Building,
    description: 'Companies House filings'
  },
  {
    name: 'Bookkeeping',
    path: '/app/books',
    icon: BookOpen,
    description: 'Bank feeds, VAT MTD'
  },
  {
    name: 'Charity & Academy Accounts',
    path: '/app/charity',
    icon: Heart,
    description: 'SORP compliance, fund accounting'
  },
  {
    name: 'DocuSignage',
    path: '/app/esign',
    icon: FileSignature,
    description: 'Digital signing workflows'
  },
  {
    name: 'Time Management',
    path: '/app/time',
    icon: Clock,
    description: 'Advanced time tracking & billing'
  }
]

export default function ModuleNavigation() {
  const location = useLocation()

  return (
    <div className="p-2">
      {modules.map((module) => {
        const Icon = module.icon
        const isActive = location.pathname === module.path || 
          (module.path !== '/app' && location.pathname.startsWith(module.path))
        
        return (
          <Link 
            key={module.path}
            to={module.path} 
            className={`w-full flex items-center gap-3 px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
              isActive 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
            }`}
          >
            <Icon className="h-4 w-4" />
            <div className="flex flex-col items-start">
              <span className="font-medium">{module.name}</span>
              <span className="text-xs opacity-90">{module.description}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
