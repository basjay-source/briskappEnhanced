import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { 
  LayoutDashboard, Users, Shield, CreditCard, Flag, 
  Key, Bell, Palette, GitBranch, Database, FileText, Activity,
  HelpCircle, Upload, Globe, FileCheck, BarChart3, LogOut,
  ChevronDown, Building, UserCheck, Lock, MapPin, Settings as SettingsIcon
} from 'lucide-react'
import DashboardOverview from '../components/admin/DashboardOverview'
import TenantsOrganizations from '../components/admin/TenantsOrganizations'
import UsersGroupsAccess from '../components/admin/UsersGroupsAccess'
import IdentitySSO from '../components/admin/IdentitySSO'
import RolesPermissions from '../components/admin/RolesPermissions'
import PoliciesGovernance from '../components/admin/PoliciesGovernance'
import SecurityPrivacy from '../components/admin/SecurityPrivacy'
import DataResidency from '../components/admin/DataResidency'
import BillingSubscriptions from '../components/admin/BillingSubscriptions'
import FeatureFlags from '../components/admin/FeatureFlags'
import Integrations from '../components/admin/Integrations'
import Notifications from '../components/admin/Notifications'
import Branding from '../components/admin/Branding'
import Environments from '../components/admin/Environments'
import Backups from '../components/admin/Backups'
import LogsAudit from '../components/admin/LogsAudit'
import MonitoringHealth from '../components/admin/MonitoringHealth'
import Support from '../components/admin/Support'
import Imports from '../components/admin/Imports'
import Localization from '../components/admin/Localization'
import Compliance from '../components/admin/Compliance'
import Settings from '../components/admin/Settings'
import Reports from '../components/admin/Reports'

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const [selectedTenant] = useState('Brisk Accountants')
  const [selectedEnvironment] = useState('Production')
  const [selectedRegion] = useState('UK')

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'tenants', label: 'Tenants & Organisations', icon: Building, path: '/tenants' },
    { id: 'users', label: 'Users, Groups & Access', icon: Users, path: '/users' },
    { id: 'identity', label: 'Identity & SSO', icon: UserCheck, path: '/identity' },
    { id: 'roles', label: 'Roles, Permissions & ABAC', icon: Shield, path: '/roles' },
    { id: 'policies', label: 'Policies & Governance', icon: Shield, path: '/policies' },
    { id: 'security', label: 'Security & Privacy', icon: Lock, path: '/security' },
    { id: 'data', label: 'Data & Residency', icon: MapPin, path: '/data' },
    { id: 'billing', label: 'Billing, Subscriptions & Entitlements', icon: CreditCard, path: '/billing' },
    { id: 'flags', label: 'Feature Flags & Plans', icon: Flag, path: '/flags' },
    { id: 'integrations', label: 'Integrations, API Keys & Webhooks', icon: Key, path: '/integrations' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' },
    { id: 'branding', label: 'Branding & White-label', icon: Palette, path: '/branding' },
    { id: 'environments', label: 'Environments, Releases & Experiments', icon: GitBranch, path: '/environments' },
    { id: 'backups', label: 'Backups, DR & Data Lifecycle', icon: Database, path: '/backups' },
    { id: 'logs', label: 'Logs, Audit & E-Discovery', icon: FileText, path: '/logs' },
    { id: 'monitoring', label: 'Monitoring & Service Health', icon: Activity, path: '/monitoring' },
    { id: 'support', label: 'Support & Ticketing', icon: HelpCircle, path: '/support' },
    { id: 'imports', label: 'Imports, Migrations & Seed Data', icon: Upload, path: '/imports' },
    { id: 'localization', label: 'Localization, Calendars & Working Time', icon: Globe, path: '/localization' },
    { id: 'compliance', label: 'Compliance, Policies & Attestations', icon: FileCheck, path: '/compliance' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/settings' },
    { id: 'reports', label: 'Reports & Admin Analytics', icon: BarChart3, path: '/reports' }
  ]

  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Brisk Admin</span>
            </div>
            <a 
              href="/document-hub" 
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Document Hub →
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 group"
              >
                <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">
                  {user?.full_name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.full_name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-400 hover:text-gray-600"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Tenant Switcher */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Tenant:</span>
                <Button variant="outline" size="sm" className="text-sm">
                  {selectedTenant}
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Environment */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Environment:</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {selectedEnvironment}
                </Badge>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Region */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Region:</span>
                <Badge variant="outline">{selectedRegion}</Badge>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Status */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                Professional Plan
              </Badge>
              <Badge variant="destructive" className="bg-orange-100 text-orange-800 border-orange-200">
                2 Alerts
              </Badge>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/tenants" element={<TenantsOrganizations />} />
            <Route path="/users" element={<UsersGroupsAccess />} />
            <Route path="/identity" element={<IdentitySSO />} />
            <Route path="/roles" element={<RolesPermissions />} />
            <Route path="/policies" element={<PoliciesGovernance />} />
            <Route path="/security" element={<SecurityPrivacy />} />
            <Route path="/data" element={<DataResidency />} />
            <Route path="/billing" element={<BillingSubscriptions />} />
            <Route path="/flags" element={<FeatureFlags />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/branding" element={<Branding />} />
            <Route path="/environments" element={<Environments />} />
            <Route path="/backups" element={<Backups />} />
            <Route path="/logs" element={<LogsAudit />} />
            <Route path="/monitoring" element={<MonitoringHealth />} />
            <Route path="/support" element={<Support />} />
            <Route path="/imports" element={<Imports />} />
            <Route path="/localization" element={<Localization />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<DashboardOverview />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
