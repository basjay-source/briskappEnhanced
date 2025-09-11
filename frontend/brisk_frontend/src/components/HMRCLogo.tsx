import { cn } from '@/lib/utils'

interface HMRCLogoProps {
  className?: string
}

export default function HMRCLogo({ className }: HMRCLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("text-white", className)}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#00703c" />
      <path d="M6 8h3v8H6V8zm5 0h3v8h-3V8z" fill="white" />
      <path d="M16 8h2v2h-2V8zm0 3h2v2h-2v-2zm0 3h2v3h-2v-3z" fill="white" />
      <rect x="4" y="18" width="16" height="2" fill="#00703c" />
    </svg>
  )
}
