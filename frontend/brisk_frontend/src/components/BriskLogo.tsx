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
            "w-full h-auto object-contain relative z-10",
            animated && "animate-pulse"
          )}
          style={{
            filter: 'sepia(1) saturate(2) hue-rotate(200deg) brightness(0.9) contrast(1.2)'
          }}
        />
        <div className="absolute inset-0 bg-brisk-primary rounded-md -z-10" />
      </div>
      {showText && (
        <span className="text-lg font-bold text-brisk-primary hidden sm:inline">
          Brisk Practice
        </span>
      )}
    </div>
  )
}
