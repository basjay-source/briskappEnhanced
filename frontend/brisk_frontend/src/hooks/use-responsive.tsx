import * as React from "react"

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
}

export function useResponsive() {
  const [breakpoint, setBreakpoint] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.mobile) {
        setBreakpoint('mobile')
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('desktop')
      }
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return {
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    breakpoint,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1280
  }
}

export function useBreakpoint() {
  const { breakpoint } = useResponsive()
  return breakpoint
}

export function useIsMobile() {
  const { isMobile } = useResponsive()
  return isMobile
}
