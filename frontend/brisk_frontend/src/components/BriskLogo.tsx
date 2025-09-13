import { cn } from '@/lib/utils'
import briskPracticeLogo from '@/assets/brisk_practice_logo.png'

interface BriskLogoProps {
  className?: string
  animated?: boolean
  showText?: boolean
}

export default function BriskLogo({ className, animated = false, showText = true }: BriskLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <img
          src={briskPracticeLogo}
          alt="Brisk Practice Suite"
          className={cn(
            "w-full h-auto object-contain relative z-10 drop-shadow-lg",
            animated && "animate-pulse"
          )}
          style={{filter: 'drop-shadow(0 4px 8px rgba(255, 255, 255, 0.3)) drop-shadow(0 2px 4px rgba(255, 255, 255, 0.5))'}}
        />
        <div className="absolute inset-0 bg-brisk-primary rounded-md -z-10" />
      </div>
      {showText && (
        <span className="text-lg font-semibold text-brisk-primary hidden sm:inline">
          Brisk Practice
        </span>
      )}
    </div>
  )
}
