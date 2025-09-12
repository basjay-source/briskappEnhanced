import { cn } from '@/lib/utils'

interface CompaniesHouseLogoProps {
  className?: string
}

export default function CompaniesHouseLogo({ className }: CompaniesHouseLogoProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Official Companies House Crown Logo */}
      <defs>
        <style>
          {`.ch-crown { fill: #003078; }
           .ch-text { fill: #003078; font-family: Arial, sans-serif; font-weight: bold; }
           .ch-crown-detail { fill: #ffffff; }`}
        </style>
      </defs>
      
      {/* Crown base */}
      <path className="ch-crown" d="M20 45 L100 45 L95 75 L25 75 Z" />
      
      {/* Crown peaks */}
      <path className="ch-crown" d="M20 45 L30 25 L40 35 L50 20 L60 35 L70 20 L80 35 L90 25 L100 45" />
      
      {/* Crown jewels/details */}
      <circle className="ch-crown-detail" cx="35" cy="55" r="3" />
      <circle className="ch-crown-detail" cx="60" cy="55" r="3" />
      <circle className="ch-crown-detail" cx="85" cy="55" r="3" />
      
      {/* Crown band detail */}
      <rect className="ch-crown-detail" x="25" y="65" width="70" height="2" />
      
      {/* Text "CH" below crown */}
      <text className="ch-text" x="60" y="95" text-anchor="middle" font-size="16">CH</text>
    </svg>
  )
}
