import { Outlet } from 'react-router-dom'
import { Search, Bell, Settings, User, HelpCircle, X } from 'lucide-react'
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
import { useState, useEffect } from 'react'
import { useResponsive } from '@/hooks/use-responsive'
import { apiClient } from '@/lib/api'
import BriskLogo from '@/components/BriskLogo'
import ModuleNavigation from '@/components/ModuleNavigation'
import MobileNavigation from '@/components/MobileNavigation'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import CurrencySwitcher from '@/components/CurrencySwitcher'

export default function AppShell() {
  const { theme, setTheme } = useTheme()
  const { isMobile } = useResponsive()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Array<{
    id: string;
    title?: string;
    name?: string;
    statement_type?: string;
    module: string;
    type: string;
  }>>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    setSearchLoading(true)
    try {
      const results = await apiClient.search(query) as {
        jobs: Array<{ id: string; title: string; client: string; status: string; type: string }>;
        clients: Array<{ id: string; name: string; company_number: string; type: string }>;
        companies: Array<{ id: string; name: string; company_number: string; type: string }>;
        statements: Array<{ id: string; statement_type: string; company_id: string; type: string }>;
      }
      const allResults = [
        ...results.jobs.map((item) => ({ ...item, module: 'Practice' })),
        ...results.clients.map((item) => ({ ...item, module: 'Clients' })),
        ...results.companies.map((item) => ({ ...item, module: 'Companies' })),
        ...results.statements.map((item) => ({ ...item, module: 'Accounts' }))
      ]
      setSearchResults(allResults)
      setShowSearchResults(true)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setSearchLoading(false)
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  if (isMobile) {
    return (
      <div className="flex flex-col h-full w-full bg-background">
        <header className="flex items-center justify-between border-b-2 border-[#001f3f] bg-background px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <MobileNavigation />
            <BriskLogo className="h-6 w-6" showText={false} />
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <CurrencySwitcher />
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4 text-[#001f3f]" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-4 w-4 text-[#001f3f]" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-full w-full bg-background">
        <Sidebar className="flex-shrink-0 h-full flex flex-col">
        <SidebarHeader className="border-b border-sidebar-border p-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <BriskLogo className="h-8 w-8" showText={true} />
          </div>
        </SidebarHeader>
        
        <SidebarContent className="flex-1 overflow-y-auto overflow-x-hidden">
          <ModuleNavigation />
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex items-center justify-between border-b-2 border-[#001f3f] bg-background px-4 md:px-6 py-3 flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
            <SidebarTrigger />
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#001f3f] cursor-pointer" />
              <Input
                placeholder="Search..."
                className="w-full pl-10 text-sm md:text-base border-2 border-[#001f3f]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
              />
              
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border-2 border-[#001f3f] dark:border-gray-700 rounded-[2px] shadow-lg z-50 max-h-[60vh] overflow-y-auto">
                  <div className="p-2 border-b flex items-center justify-between">
                    <span className="text-sm font-medium">Search Results</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowSearchResults(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {searchLoading ? (
                    <div className="p-4 text-center text-gray-500">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <div 
                          key={index} 
                          className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">
                                {result.title || result.name || result.statement_type}
                              </p>
                              <p className="text-xs text-gray-500">
                                {result.module} • {result.type}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <LanguageSwitcher />
            <CurrencySwitcher />
            <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10">
              <Bell className="h-4 w-4 text-[#001f3f]" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 hidden sm:flex">
              <HelpCircle className="h-4 w-4 text-[#001f3f]" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-9 w-9 md:h-10 md:w-10 hidden sm:flex"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Settings className="h-4 w-4 text-[#001f3f]" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10">
              <User className="h-4 w-4 text-[#001f3f]" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full">
          <Outlet />
        </main>
      </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
