import React from 'react'
import { FileText, Calendar, Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function PracticeReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Practice Reports</h2>
          <p className="text-blue-900">Generate comprehensive practice management reports</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700"><Calendar className="h-4 w-4 mr-2" />Schedule Report</Button>
          <Button className="bg-blue-600 hover:bg-blue-700"><FileText className="h-4 w-4 mr-2" />Generate Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]" onClick={() => alert('Total Reports\n\nGenerated: 0\nThis Month: 0')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-blue-900">Total Reports</p><p className="text-3xl font-bold text-blue-900">0</p></div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]" onClick={() => alert('Scheduled Reports\n\nActive Schedules: 0')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-blue-900">Scheduled</p><p className="text-3xl font-bold text-green-600">0</p></div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]" onClick={() => alert('Reports This Month\n\nGenerated: 0')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-blue-900">This Month</p><p className="text-3xl font-bold text-blue-900">0</p></div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]" onClick={() => alert('Generation Time\n\nAverage: 0s')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-blue-900">Avg Time</p><p className="text-3xl font-bold text-blue-900">0s</p></div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-blue-900 rounded-[2px]">
        <CardContent className="p-12 text-center">
          <FileText className="h-16 w-16 mx-auto text-blue-900 mb-4" />
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Practice Reports Coming Soon</h3>
          <p className="text-blue-900 mb-4">Generate comprehensive practice management reports with full CRUD functionality, navy blue borders (2px rounded corners), clickable data cards with drill-down, and advanced features.</p>
          <div className="flex gap-3 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700"><FileText className="h-4 w-4 mr-2" />Generate Report</Button>
            <Button variant="outline" className="border-2 border-blue-900 text-blue-900"><Calendar className="h-4 w-4 mr-2" />Schedule Report</Button>
            <Button variant="outline" className="border-2 border-blue-900 text-blue-900"><Download className="h-4 w-4 mr-2" />Download</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
