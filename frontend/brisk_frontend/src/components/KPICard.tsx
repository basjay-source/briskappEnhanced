import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  change?: string
  icon?: LucideIcon
  color?: string
  subtitle?: string
  valueColor?: string
  onClick?: () => void
  drillDownData?: {
    title: string
    description?: string
    content?: React.ReactNode
    items?: Array<{
      label: string
      value: string
      detail?: string
    }>
  }
}

export default function KPICard({ title, value, change, icon: Icon, color, subtitle, valueColor, onClick, drillDownData }: KPICardProps) {
  const [showDrillDown, setShowDrillDown] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    if (drillDownData) {
      setShowDrillDown(true)
    }
  }

  const renderContent = () => {
    if (drillDownData?.content) {
      return drillDownData.content
    }
    
    if (drillDownData?.items) {
      return (
        <div className="space-y-3">
          {drillDownData.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
              <div className="flex-1">
                <div className="font-medium text-blue-900">{item.label}</div>
                {item.detail && <div className="text-sm text-blue-700">{item.detail}</div>}
              </div>
              <div className="font-bold text-blue-900 ml-4">{item.value}</div>
            </div>
          ))}
        </div>
      )
    }
    
    return null
  }

  return (
    <>
      <Card 
        className={`border-2 border-blue-900 rounded-[2px] ${drillDownData || onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
        onClick={handleClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-blue-900 truncate">{title}</p>
              <p className={`text-2xl font-bold truncate ${valueColor || 'text-blue-900'}`}>{value}</p>
              {(change || subtitle) && (
                <p className={`text-sm truncate ${color || 'text-blue-700'}`}>{change || subtitle}</p>
              )}
            </div>
            {Icon && <Icon className={`h-8 w-8 flex-shrink-0 ${color || 'text-blue-900'}`} />}
          </div>
        </CardContent>
      </Card>

      {drillDownData && (
        <Dialog open={showDrillDown} onOpenChange={setShowDrillDown}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-blue-900">
                {Icon && <Icon className={`h-5 w-5 ${color || 'text-blue-900'}`} />}
                {drillDownData.title}
              </DialogTitle>
              {drillDownData.description && (
                <DialogDescription className="text-blue-900">
                  {drillDownData.description}
                </DialogDescription>
              )}
            </DialogHeader>
            <div className="mt-6 text-blue-900">
              {renderContent()}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
