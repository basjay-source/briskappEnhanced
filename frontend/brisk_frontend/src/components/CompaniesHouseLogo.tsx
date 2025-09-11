import { cn } from '@/lib/utils'

interface CompaniesHouseLogoProps {
  className?: string
}

export default function CompaniesHouseLogo({ className }: CompaniesHouseLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("text-white", className)}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
      <path d="M12 4.5L4.5 8.5v8c0 4.28 2.72 7.36 7.5 8.5 4.78-1.14 7.5-4.22 7.5-8.5v-8L12 4.5z" fill="#003078" />
      <circle cx="12" cy="10" r="2" fill="white" />
      <rect x="10" y="12" width="4" height="1" fill="white" />
      <rect x="9" y="14" width="6" height="1" fill="white" />
    </svg>
  )
}
