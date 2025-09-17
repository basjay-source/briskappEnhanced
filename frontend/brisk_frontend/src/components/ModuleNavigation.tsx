import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  Heart,
  Settings
} from 'lucide-react'

export default function ModuleNavigation() {
  const location = useLocation()
  const { t } = useTranslation()

  const modules = [
    {
      name: t('navigation.ecosystemHub'),
      path: '/app',
      icon: Home,
      description: t('modules.ecosystemHub.description', 'Overview of all modules')
    },
    {
      name: t('navigation.practiceManagement'),
      path: '/app/practice',
      icon: Briefcase,
      description: t('modules.practiceManagement.description')
    },
    {
      name: t('navigation.accountsProduction'),
      path: '/app/accounts',
      icon: Calculator,
      description: t('modules.accountsProduction.description', 'FRS 102/105, IFRS, iXBRL')
    },
    {
      name: t('navigation.businessTax'),
      path: '/app/tax/ct',
      icon: Receipt,
      description: t('modules.businessTax.description')
    },
    {
      name: t('navigation.personalTax'),
      path: '/app/tax/sa',
      icon: BarChart3,
      description: t('modules.personalTax.description')
    },
    {
      name: t('navigation.payroll'),
      path: '/app/payroll',
      icon: Users,
      description: t('modules.payroll.description')
    },
    {
      name: t('navigation.amlCompliance'),
      path: '/app/aml',
      icon: Shield,
      description: t('modules.amlCompliance.description')
    },
    {
      name: t('navigation.companySecretarial'),
      path: '/app/cosec',
      icon: Building,
      description: t('modules.companySecretarial.description')
    },
    {
      name: t('navigation.bookkeeping'),
      path: '/app/books',
      icon: BookOpen,
      description: t('modules.bookkeeping.description')
    },
    {
      name: t('navigation.charityAccounts'),
      path: '/app/charity',
      icon: Heart,
      description: t('modules.charityAccounts.description', 'SORP compliance, fund accounting')
    },
    {
      name: t('navigation.docuSignage'),
      path: '/app/esign',
      icon: FileSignature,
      description: t('modules.docuSignage.description', 'Digital signing workflows')
    },
    {
      name: t('navigation.timeManagement'),
      path: '/app/time',
      icon: Clock,
      description: t('modules.timeManagement.description', 'Advanced time tracking & billing')
    },
    {
      name: t('navigation.admin'),
      path: '/app/admin',
      icon: Settings,
      description: t('modules.admin.description', 'System administration & settings')
    }
  ]

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
              <span className="font-bold">{module.name}</span>
              <span className="text-xs opacity-90">{module.description}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
