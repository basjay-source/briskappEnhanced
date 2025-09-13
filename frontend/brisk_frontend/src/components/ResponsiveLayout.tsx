import { useResponsive } from '@/hooks/use-responsive'
import { cn } from '@/lib/utils'

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function ResponsiveLayout({ children, className }: ResponsiveLayoutProps) {
  const { isMobile } = useResponsive()

  return (
    <div className={cn(
      "min-h-screen bg-background",
      isMobile ? "px-4 py-2" : "px-6 py-4",
      className
    )}>
      {children}
    </div>
  )
}

export function ResponsiveGrid({ children, className }: ResponsiveLayoutProps) {
  const { isMobile, isTablet } = useResponsive()

  return (
    <div className={cn(
      "grid gap-4",
      isMobile 
        ? "grid-cols-1" 
        : isTablet
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      className
    )}>
      {children}
    </div>
  )
}

export function ResponsiveCard({ children, className }: ResponsiveLayoutProps) {
  const { isMobile } = useResponsive()

  return (
    <div className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      isMobile ? "p-4" : "p-6",
      className
    )}>
      {children}
    </div>
  )
}
