import React, { useState, useEffect } from 'react'
import {
  FileText, Download, Calendar, Eye, Clock, TrendingUp,
  Trash2, Edit
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'

interface Report {
  id: string
  name: string
  type: string
  description: string
  lastGenerated?: string
  schedule?: string
  recipients?: string[]
  format: string
  status: string
}

interface ReportMetrics {
  totalReports: number
  scheduledReports: number
  reportsThisMonth: number
  avgGenerationTime: string
}

export default function PracticeReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [metrics, setMetrics] = useState<ReportMetrics>({
    totalReports: 0,
    scheduledReports: 0,
    reportsThisMonth: 0,
    avgGenerationTime: '0s'
  })
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [activeTab, setActiveTab] = useState('available')
  
  const [generateForm, setGenerateForm] = useState({
    reportType: 'performance',
    dateFrom: '',
    dateTo: '',
    format: 'pdf',
    includeCharts: true,
    includeDetails: true
  })
  
  const [scheduleForm, setScheduleForm] = useState({
    reportType: 'performance',
    frequency: 'weekly',
    dayOfWeek: 'monday',
    recipients: '',
    format: 'pdf'
  })

  useEffect(() => {
    loadReports()
    loadMetrics()
  }, [])

  const loadReports = async () => {
    try {
      const response = await api.get('/practice/reports')
      setReports(response.data || [])
    } catch (error) {
      console.error('Failed to load reports:', error)
    }
  }

  const loadMetrics = async () => {
    try {
      const response = await api.get('/practice/report-metrics')
      setMetrics(response.data || metrics)
    } catch (error) {
      console.error('Failed to load metrics:', error)
    }
  }

  const handleGenerateReport = async () => {
    try {
      const response = await api.post('/practice/reports/generate', generateForm)
      alert(`Report generated successfully! Report ID: ${response.data.id}`)
      setShowGenerateDialog(false)
      loadReports()
      loadMetrics()
    } catch (error) {
      console.error('Failed to generate report:', error)
      alert('Failed to generate report. Please try again.')
    }
  }

  const handleScheduleReport = async () => {
    try {
      await api.post('/practice/reports/schedule', {
        ...scheduleForm,
        recipients: scheduleForm.recipients.split(',').map(e => e.trim())
      })
      alert('Report scheduled successfully!')
      setShowScheduleDialog(false)
      loadReports()
      loadMetrics()
    } catch (error) {
      console.error('Failed to schedule report:', error)
      alert('Failed to schedule report. Please try again.')
    }
  }

  const handleViewReport = (report: Report) => {
    setSelectedReport(report)
    setShowViewDialog(true)
  }

  const handleDownloadReport = async (report: Report) => {
    try {
      alert(`Downloading ${report.name} as ${report.format.toUpperCase()}...`)
    } catch (error) {
      console.error('Failed to download report:', error)
    }
  }

  const handleDeleteReport = async (id: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return
    try {
      await api.delete(`/practice/reports/${id}`)
      setReports(reports.filter(r => r.id !== id))
      loadMetrics()
    } catch (error) {
      console.error('Failed to delete report:', error)
    }
  }

  const reportTypes = [
    { value: 'performance', label: 'Performance Report', desc: 'Overall practice performance metrics' },
    { value: 'financial', label: 'Financial Report', desc: 'Revenue, expenses, and profitability' },
    { value: 'client', label: 'Client Report', desc: 'Client engagement and retention' },
    { value: 'job', label: 'Job Completion Report', desc: 'Job status and completion rates' },
    { value: 'time', label: 'Time Tracking Report', desc: 'Staff time allocation and utilization' },
    { value: 'revenue', label: 'Revenue Analytics', desc: 'Detailed revenue breakdown and trends' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Practice Reports</h2>
          <p className="text-blue-900">Generate comprehensive practice management reports</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowScheduleDialog(true)} className="bg-blue-600 hover:bg-blue-700">
            <Calendar className="h-4 w-4 mr-2" />Schedule Report
          </Button>
          <Button onClick={() => setShowGenerateDialog(true)} className="bg-blue-600 hover:bg-blue-700">
            <FileText className="h-4 w-4 mr-2" />Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]" onClick={() => alert(`Total Reports\n\nGenerated: ${metrics.totalReports}\nThis Month: ${metrics.reportsThisMonth}`)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-blue-900">Total Reports</p><p className="text-3xl font-bold text-blue-900">{metrics.totalReports}</p></div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]" onClick={() => alert(`Scheduled Reports\n\nActive Schedules: ${metrics.scheduledReports}`)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-blue-900">Scheduled Reports</p><p className="text-3xl font-bold text-green-600">{metrics.scheduledReports}</p></div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]" onClick={() => alert(`Reports This Month\n\nGenerated: ${metrics.reportsThisMonth}`)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-blue-900">This Month</p><p className="text-3xl font-bold text-blue-900">{metrics.reportsThisMonth}</p></div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]" onClick={() => alert(`Generation Time\n\nAverage: ${metrics.avgGenerationTime}`)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-blue-900">Avg Gen Time</p><p className="text-3xl font-bold text-blue-900">{metrics.avgGenerationTime}</p></div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white border-2 border-blue-900">
          <TabsTrigger value="available" className="text-blue-900 data-[state=active]:bg-orange-500 data-[state=active]:text-white">Available Reports</TabsTrigger>
          <TabsTrigger value="scheduled" className="text-blue-900 data-[state=active]:bg-orange-500 data-[state=active]:text-white">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="history" className="text-blue-900 data-[state=active]:bg-orange-500 data-[state=active]:text-white">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((type) => (
              <Card key={type.value} className="border-2 border-blue-900 rounded-[2px] hover:shadow-lg transition-shadow">
                <CardHeader><CardTitle className="text-blue-900">{type.label}</CardTitle><CardDescription className="text-blue-900">{type.desc}</CardDescription></CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => { setGenerateForm({ ...generateForm, reportType: type.value }); setShowGenerateDialog(true) }} className="flex-1 bg-blue-600 hover:bg-blue-700"><FileText className="h-4 w-4 mr-1" />Generate</Button>
                    <Button size="sm" variant="outline" onClick={() => { setScheduleForm({ ...scheduleForm, reportType: type.value }); setShowScheduleDialog(true) }} className="flex-1 border-blue-900 text-blue-900"><Calendar className="h-4 w-4 mr-1" />Schedule</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          {reports.filter(r => r.schedule).length === 0 ? (
            <Card className="border-2 border-blue-900 rounded-[2px]"><CardContent className="p-12 text-center"><Calendar className="h-16 w-16 mx-auto text-blue-900 mb-4" /><h3 className="text-xl font-semibold text-blue-900 mb-2">No Scheduled Reports</h3><p className="text-blue-900 mb-4">Schedule reports to receive them automatically</p><Button onClick={() => setShowScheduleDialog(true)} className="bg-blue-600 hover:bg-blue-700"><Calendar className="h-4 w-4 mr-2" />Schedule Report</Button></CardContent></Card>
          ) : (
            <div className="space-y-4">{reports.filter(r => r.schedule).map((report) => (
              <Card key={report.id} className="border-2 border-blue-900 rounded-[2px]"><CardContent className="p-6"><div className="flex items-start justify-between"><div className="flex-1"><h4 className="font-semibold text-blue-900 mb-2">{report.name}</h4><p className="text-sm text-blue-900 mb-3">{report.description}</p><div className="flex gap-4 text-sm"><div><span className="text-blue-900">Schedule: </span><Badge className="bg-blue-100 text-blue-900">{report.schedule}</Badge></div><div><span className="text-blue-900">Format: </span><Badge className="bg-blue-100 text-blue-900">{report.format.toUpperCase()}</Badge></div></div></div><div className="flex gap-2"><Button size="sm" variant="outline" className="border-blue-900 text-blue-900"><Edit className="h-4 w-4" /></Button><Button size="sm" variant="outline" onClick={() => handleDeleteReport(report.id)} className="border-red-600 text-red-600"><Trash2 className="h-4 w-4" /></Button></div></div></CardContent></Card>
            ))}</div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          {reports.filter(r => r.status === 'completed').length === 0 ? (
            <Card className="border-2 border-blue-900 rounded-[2px]"><CardContent className="p-12 text-center"><FileText className="h-16 w-16 mx-auto text-blue-900 mb-4" /><h3 className="text-xl font-semibold text-blue-900 mb-2">No Report History</h3><p className="text-blue-900 mb-4">Generate your first report to see history</p><Button onClick={() => setShowGenerateDialog(true)} className="bg-blue-600 hover:bg-blue-700"><FileText className="h-4 w-4 mr-2" />Generate Report</Button></CardContent></Card>
          ) : (
            <div className="space-y-4">{reports.filter(r => r.status === 'completed').map((report) => (
              <Card key={report.id} className="border-2 border-blue-900 rounded-[2px] hover:shadow-lg transition-shadow"><CardContent className="p-6"><div className="flex items-start justify-between"><div className="flex-1"><h4 className="font-semibold text-blue-900 mb-2">{report.name}</h4><p className="text-sm text-blue-900 mb-3">{report.description}</p><div className="flex gap-4 text-sm"><div><span className="text-blue-900">Generated: </span><span className="text-blue-900 font-medium">{report.lastGenerated}</span></div><div><span className="text-blue-900">Format: </span><Badge className="bg-blue-100 text-blue-900">{report.format.toUpperCase()}</Badge></div><div><span className="text-blue-900">Type: </span><Badge className="bg-green-100 text-green-900">{report.type}</Badge></div></div></div><div className="flex gap-2"><Button size="sm" onClick={() => handleViewReport(report)} className="bg-blue-600 hover:bg-blue-700"><Eye className="h-4 w-4 mr-1" />View</Button><Button size="sm" variant="outline" onClick={() => handleDownloadReport(report)} className="border-blue-900 text-blue-900"><Download className="h-4 w-4 mr-1" />Download</Button></div></div></CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent className="max-w-2xl border-2 border-blue-900">
          <DialogHeader><DialogTitle className="text-blue-900">Generate Report</DialogTitle><DialogDescription className="text-blue-900">Configure and generate a practice management report</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div><Label className="text-sm font-medium text-blue-900">Report Type</Label><Select value={generateForm.reportType} onValueChange={(v) => setGenerateForm({ ...generateForm, reportType: v })}><SelectTrigger className="border-2 border-blue-900 text-blue-900"><SelectValue /></SelectTrigger><SelectContent>{reportTypes.map(type => (<SelectItem key={type.value} value={type.value} className="text-blue-900">{type.label}</SelectItem>))}</SelectContent></Select></div>
            <div className="grid grid-cols-2 gap-4"><div><Label className="text-sm font-medium text-blue-900">Date From</Label><Input type="date" value={generateForm.dateFrom} onChange={(e) => setGenerateForm({ ...generateForm, dateFrom: e.target.value })} className="border-2 border-blue-900 text-blue-900" /></div><div><Label className="text-sm font-medium text-blue-900">Date To</Label><Input type="date" value={generateForm.dateTo} onChange={(e) => setGenerateForm({ ...generateForm, dateTo: e.target.value })} className="border-2 border-blue-900 text-blue-900" /></div></div>
            <div><Label className="text-sm font-medium text-blue-900">Format</Label><Select value={generateForm.format} onValueChange={(v) => setGenerateForm({ ...generateForm, format: v })}><SelectTrigger className="border-2 border-blue-900 text-blue-900"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pdf" className="text-blue-900">PDF</SelectItem><SelectItem value="excel" className="text-blue-900">Excel</SelectItem><SelectItem value="csv" className="text-blue-900">CSV</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={generateForm.includeCharts} onChange={(e) => setGenerateForm({ ...generateForm, includeCharts: e.target.checked })} className="w-4 h-4 border-2 border-blue-900 rounded" /><span className="text-sm text-blue-900">Include Charts and Visualizations</span></label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={generateForm.includeDetails} onChange={(e) => setGenerateForm({ ...generateForm, includeDetails: e.target.checked })} className="w-4 h-4 border-2 border-blue-900 rounded" /><span className="text-sm text-blue-900">Include Detailed Breakdown</span></label></div>
          </div>
          <DialogFooter className="gap-3"><Button variant="outline" onClick={() => setShowGenerateDialog(false)} className="border-2 border-blue-900 text-blue-900">Cancel</Button><Button onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-700"><FileText className="h-4 w-4 mr-2" />Generate Report</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl border-2 border-blue-900">
          <DialogHeader><DialogTitle className="text-blue-900">Schedule Report</DialogTitle><DialogDescription className="text-blue-900">Set up automatic report generation and delivery</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div><Label className="text-sm font-medium text-blue-900">Report Type</Label><Select value={scheduleForm.reportType} onValueChange={(v) => setScheduleForm({ ...scheduleForm, reportType: v })}><SelectTrigger className="border-2 border-blue-900 text-blue-900"><SelectValue /></SelectTrigger><SelectContent>{reportTypes.map(type => (<SelectItem key={type.value} value={type.value} className="text-blue-900">{type.label}</SelectItem>))}</SelectContent></Select></div>
            <div className="grid grid-cols-2 gap-4"><div><Label className="text-sm font-medium text-blue-900">Frequency</Label><Select value={scheduleForm.frequency} onValueChange={(v) => setScheduleForm({ ...scheduleForm, frequency: v })}><SelectTrigger className="border-2 border-blue-900 text-blue-900"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="daily" className="text-blue-900">Daily</SelectItem><SelectItem value="weekly" className="text-blue-900">Weekly</SelectItem><SelectItem value="monthly" className="text-blue-900">Monthly</SelectItem><SelectItem value="quarterly" className="text-blue-900">Quarterly</SelectItem></SelectContent></Select></div><div><Label className="text-sm font-medium text-blue-900">Day of Week</Label><Select value={scheduleForm.dayOfWeek} onValueChange={(v) => setScheduleForm({ ...scheduleForm, dayOfWeek: v })}><SelectTrigger className="border-2 border-blue-900 text-blue-900"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="monday" className="text-blue-900">Monday</SelectItem><SelectItem value="tuesday" className="text-blue-900">Tuesday</SelectItem><SelectItem value="wednesday" className="text-blue-900">Wednesday</SelectItem><SelectItem value="thursday" className="text-blue-900">Thursday</SelectItem><SelectItem value="friday" className="text-blue-900">Friday</SelectItem></SelectContent></Select></div></div>
            <div><Label className="text-sm font-medium text-blue-900">Recipients (comma-separated emails)</Label><Input value={scheduleForm.recipients} onChange={(e) => setScheduleForm({ ...scheduleForm, recipients: e.target.value })} placeholder="user@example.com, team@example.com" className="border-2 border-blue-900 text-blue-900" /></div>
            <div><Label className="text-sm font-medium text-blue-900">Format</Label><Select value={scheduleForm.format} onValueChange={(v) => setScheduleForm({ ...scheduleForm, format: v })}><SelectTrigger className="border-2 border-blue-900 text-blue-900"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pdf" className="text-blue-900">PDF</SelectItem><SelectItem value="excel" className="text-blue-900">Excel</SelectItem><SelectItem value="csv" className="text-blue-900">CSV</SelectItem></SelectContent></Select></div>
          </div>
          <DialogFooter className="gap-3"><Button variant="outline" onClick={() => setShowScheduleDialog(false)} className="border-2 border-blue-900 text-blue-900">Cancel</Button><Button onClick={handleScheduleReport} className="bg-blue-600 hover:bg-blue-700"><Calendar className="h-4 w-4 mr-2" />Schedule Report</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl border-2 border-blue-900">
          <DialogHeader><DialogTitle className="text-blue-900">{selectedReport?.name}</DialogTitle><DialogDescription className="text-blue-900">{selectedReport?.description}</DialogDescription></DialogHeader>
          <div className="space-y-4"><Card className="border-2 border-blue-900 rounded-[2px]"><CardContent className="p-6"><h4 className="font-semibold text-blue-900 mb-4">Report Summary</h4><div className="grid grid-cols-2 md:grid-cols-4 gap-4"><div className="border-2 border-blue-900 rounded-[2px] p-3 cursor-pointer hover:bg-blue-50" onClick={() => alert('Performance Metrics\n\nTotal Jobs: 156\nCompleted: 142\nOn Time: 98%')}><p className="text-sm text-blue-900">Total Jobs</p><p className="text-2xl font-bold text-blue-900">156</p></div><div className="border-2 border-blue-900 rounded-[2px] p-3 cursor-pointer hover:bg-blue-50" onClick={() => alert('Revenue Data\n\nTotal: £245,680\nGrowth: +12.4%')}><p className="text-sm text-blue-900">Revenue</p><p className="text-2xl font-bold text-green-600">£245K</p></div><div className="border-2 border-blue-900 rounded-[2px] p-3 cursor-pointer hover:bg-blue-50" onClick={() => alert('Client Metrics\n\nActive: 89\nNew This Month: 12')}><p className="text-sm text-blue-900">Clients</p><p className="text-2xl font-bold text-blue-900">89</p></div><div className="border-2 border-blue-900 rounded-[2px] p-3 cursor-pointer hover:bg-blue-50" onClick={() => alert('Completion Rate\n\nRate: 91.0%\nTrend: +2.3%')}><p className="text-sm text-blue-900">Completion</p><p className="text-2xl font-bold text-blue-900">91%</p></div></div></CardContent></Card></div>
          <DialogFooter className="gap-3"><Button variant="outline" onClick={() => setShowViewDialog(false)} className="border-2 border-blue-900 text-blue-900">Close</Button><Button onClick={() => selectedReport && handleDownloadReport(selectedReport)} className="bg-blue-600 hover:bg-blue-700"><Download className="h-4 w-4 mr-2" />Download Report</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
