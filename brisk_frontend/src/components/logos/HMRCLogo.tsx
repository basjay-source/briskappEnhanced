import React from 'react'

interface HMRCLogoProps {
  className?: string
  showText?: boolean
}

const HMRCLogo: React.FC<HMRCLogoProps> = ({ className = "h-8 w-auto", showText = true }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <svg viewBox="0 0 60 60" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" fill="#00703c" stroke="#00703c" strokeWidth="2"/>
        <path d="M30 8L35 18H45L37 26L40 36L30 30L20 36L23 26L15 18H25L30 8Z" fill="white"/>
        <circle cx="30" cy="30" r="6" fill="#00703c"/>
        <text x="30" y="50" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">HMRC</text>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-green-800">HM Revenue</span>
          <span className="text-sm font-bold text-green-800">& Customs</span>
        </div>
      )}
    </div>
  )
}

export default HMRCLogo
