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
        className={`border-2 border-blue-900 ${drillDownData ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
        onClick={handleClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
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
              <DialogTitle className="flex items-center gap-2 text-blue-900">
                <Icon className="h-5 w-5 text-blue-900" />
                {drillDownData.title}
              </DialogTitle>
              <DialogDescription className="text-blue-700">
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
