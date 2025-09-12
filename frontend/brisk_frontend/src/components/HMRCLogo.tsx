import { cn } from '@/lib/utils'

interface HMRCLogoProps {
  className?: string
}

export default function HMRCLogo({ className }: HMRCLogoProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Official HMRC Crown Logo */}
      <defs>
        <style>
          {`.hmrc-crown { fill: #00703c; }
           .hmrc-text { fill: #00703c; font-family: Arial, sans-serif; font-weight: bold; }
           .hmrc-crown-detail { fill: #ffffff; }`}
        </style>
      </defs>
      
      {/* Crown base */}
      <path className="hmrc-crown" d="M20 45 L100 45 L95 75 L25 75 Z" />
      
      {/* Crown peaks */}
      <path className="hmrc-crown" d="M20 45 L30 25 L40 35 L50 20 L60 35 L70 20 L80 35 L90 25 L100 45" />
      
      {/* Crown jewels/details */}
      <circle className="hmrc-crown-detail" cx="35" cy="55" r="3" />
      <circle className="hmrc-crown-detail" cx="60" cy="55" r="3" />
      <circle className="hmrc-crown-detail" cx="85" cy="55" r="3" />
      
      {/* Crown band detail */}
      <rect className="hmrc-crown-detail" x="25" y="65" width="70" height="2" />
      
      {/* Text "HMRC" below crown */}
      <text className="hmrc-text" x="60" y="95" text-anchor="middle" font-size="12">HMRC</text>
    </svg>
  )
}
