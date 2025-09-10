import { Outlet } from 'react-router-dom'
import { Search, Bell, Settings, User, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarTrigger,
  SidebarInset,
  SidebarProvider
} from '@/components/ui/sidebar'
import { useTheme } from '@/components/theme-provider'
import { useIsMobile } from '@/hooks/use-mobile'
import BriskLogo from '@/components/BriskLogo'
import ModuleNavigation from '@/components/ModuleNavigation'
import MobileNavigation from '@/components/MobileNavigation'

export default function AppShell() {
  const { theme, setTheme } = useTheme()
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3">
          <div className="flex items-center gap-3">
            <MobileNavigation />
            <BriskLogo className="h-6 w-6" />
            <span className="font-semibold text-brisk-primary">Brisk</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border p-4">
          <div className="flex items-center gap-2">
            <BriskLogo className="h-8 w-8" />
            <span className="font-semibold text-lg text-brisk-primary">Brisk Practice</span>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <ModuleNavigation />
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background px-6 py-3">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search across all modules... (⌘K)"
                className="w-96 pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
