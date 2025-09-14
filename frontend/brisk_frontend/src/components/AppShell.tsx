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
      <div className="flex flex-col h-screen bg-background">
        <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3">
          <div className="flex items-center gap-3">
            <MobileNavigation />
            <BriskLogo className="h-6 w-6" showText={false} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="!text-blue-900 hover:!text-blue-900">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="!text-blue-900 hover:!text-blue-900">
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
          <div className="flex items-center justify-center w-full">
            <BriskLogo className="w-full h-10" showText={false} />
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
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-900" />
              <Input
                placeholder="Search across all modules... (⌘K)"
                className="w-96 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
              />
              
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-900 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-2 border-b flex items-center justify-between">
                    <span className="text-sm font-bold">Search Results</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowSearchResults(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {searchLoading ? (
                    <div className="p-4 text-center text-black">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <div 
                          key={index} 
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-sm text-black">
                                {result.title || result.name || result.statement_type}
                              </p>
                              <p className="text-xs text-black">
                                {result.module} • {result.type}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-black">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="!text-blue-900 hover:!text-blue-900">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="!text-blue-900 hover:!text-blue-900">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="!text-blue-900 hover:!text-blue-900"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="!text-blue-900 hover:!text-blue-900">
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
