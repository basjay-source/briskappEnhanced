import React from 'react'

interface CompaniesHouseLogoProps {
  className?: string
  showText?: boolean
}

const CompaniesHouseLogo: React.FC<CompaniesHouseLogoProps> = ({ className = "h-8 w-auto", showText = true }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <svg viewBox="0 0 60 60" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" fill="#003078" stroke="#003078" strokeWidth="2"/>
        <path d="M30 8L35 18H45L37 26L40 36L30 30L20 36L23 26L15 18H25L30 8Z" fill="white"/>
        <circle cx="30" cy="30" r="6" fill="#003078"/>
        <text x="30" y="50" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CH</text>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-blue-800">Companies</span>
          <span className="text-sm font-bold text-blue-800">House</span>
        </div>
      )}
    </div>
  )
}

export default CompaniesHouseLogo
