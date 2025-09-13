import { cn } from '@/lib/utils'

interface BriskLogoProps {
  className?: string
  animated?: boolean
}

export default function BriskLogo({ className, animated = false }: BriskLogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-brisk-primary", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 6h12c2.21 0 4 1.79 4 4v4c0 1.1-.9 2-2 2h-6c-1.1 0-2 .9-2 2v4c0 2.21-1.79 4-4 4H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "animate-logo-draw" : ""}
        fill={animated ? "none" : "currentColor"}
      />
      <circle
        cx="20"
        cy="20"
        r="3"
        fill="#FF7A00"
        className={animated ? "animate-logo-draw" : ""}
      />
    </svg>
  )
}
