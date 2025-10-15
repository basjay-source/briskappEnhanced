import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: string
  drillDownData?: {
    title: string
    description?: string
    content: React.ReactNode
  }
}

export default function KPICard({ title, value, change, icon: Icon, color, drillDownData }: KPICardProps) {
  const [showDrillDown, setShowDrillDown] = useState(false)

  const handleClick = () => {
    if (drillDownData) {
      setShowDrillDown(true)
    }
  }

  return (
    <>
      <Card 
        className={`border-2 border-[#001f3f] rounded-[5px] ${drillDownData ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
        onClick={handleClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#001f3f]">{title}</p>
              <p className="text-xl font-bold text-[#001f3f]">{value}</p>
              <p className={`text-sm ${color}`}>{change}</p>
            </div>
            <Icon className={`h-8 w-8 ${color}`} />
          </div>
        </CardContent>
      </Card>

      {drillDownData && (
        <Dialog open={showDrillDown} onOpenChange={setShowDrillDown}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[#001f3f] flex items-center gap-2 text-[#001f3f]">
                <Icon className="h-5 w-5 text-[#001f3f]" />
                {drillDownData.title}
              </DialogTitle>
              <DialogDescription className="text-[#001f3f]">
                {drillDownData.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6">
              {drillDownData.content}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
