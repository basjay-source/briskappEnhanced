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
  Briefcase
} from 'lucide-react'
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

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
    name: 'e-Signature',
    path: '/app/esign',
    icon: FileSignature,
    description: 'Digital signing workflows'
  },
  {
    name: 'VAT',
    path: '/app/vat',
    icon: Calculator,
    description: 'VAT returns, schemes & compliance'
  },
  {
    name: 'Reports',
    path: '/app/reports',
    icon: BarChart3,
    description: 'Financial reports & analytics'
  },
  {
    name: 'Client Portal',
    path: '/app/portal',
    icon: FileSignature,
    description: 'Client communication & documents'
  }
]

export default function ModuleNavigation() {
  const location = useLocation()

  return (
    <SidebarMenu>
      {modules.map((module) => {
        const Icon = module.icon
        const isActive = location.pathname === module.path
        
        return (
          <SidebarMenuItem key={module.path}>
            <SidebarMenuButton asChild isActive={isActive}>
              <Link to={module.path} className="flex items-center gap-3 p-3">
                <Icon className={cn(
                  "h-5 w-5",
                  isActive ? "text-brisk-primary" : "text-muted-foreground"
                )} />
                <div className="flex flex-col">
                  <span className={cn(
                    "font-medium",
                    isActive ? "text-brisk-primary" : "text-foreground"
                  )}>
                    {module.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {module.description}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
