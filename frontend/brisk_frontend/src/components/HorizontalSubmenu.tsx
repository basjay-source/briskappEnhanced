import React from 'react'

interface SubTab {
  id?: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

interface HorizontalSubmenuProps {
  subTabs: SubTab[] | Record<string, SubTab>
  activeSubTab: string
  onSubTabClick: (subTabId: string) => void
  className?: string
}

export const HorizontalSubmenu: React.FC<HorizontalSubmenuProps> = ({
  subTabs,
  activeSubTab,
  onSubTabClick,
  className = ""
}) => {
  if (!subTabs || (Array.isArray(subTabs) && subTabs.length === 0) || 
      (!Array.isArray(subTabs) && Object.keys(subTabs).length === 0)) {
    return null
  }

  const subTabEntries = Array.isArray(subTabs) 
    ? subTabs.map(tab => [tab.id || tab.label, tab] as [string, SubTab])
    : Object.entries(subTabs)

  return (
    <div className={`mb-6 border-b border-gray-200 pb-4 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {subTabEntries.map(([subKey, subTab]) => {
          const SubIcon = subTab.icon
          const isSubActive = activeSubTab === subKey
          
          return (
            <button
              key={subKey}
              onClick={() => onSubTabClick(subKey)}
              className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                isSubActive 
                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md font-semibold' 
                  : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
              }`}
            >
              {SubIcon && <SubIcon className="h-4 w-4 mr-2" />}
              <span>{subTab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
