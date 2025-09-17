import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { apiClient } from '../../lib/api'

export default function NewApprovalRequestForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [approvalData, setApprovalData] = useState({
    title: '',
    description: '',
    priority: '',
    category: '',
    requested_by: '',
    justification: ''
  })

  const [approvalRequests] = useState([
    {
      id: 1,
      title: 'High-Value Transaction Approval',
      description: 'Client payment of £50,000 requires senior approval',
      priority: 'High',
      requestedBy: 'John Smith',
      date: '2024-01-15',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'New Client Onboarding',
      description: 'High-risk client requires compliance review',
      priority: 'Medium',
      requestedBy: 'Sarah Johnson',
      date: '2024-01-14',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'System Access Request',
      description: 'Temporary admin access for audit purposes',
      priority: 'Low',
      requestedBy: 'Mike Wilson',
      date: '2024-01-13',
      status: 'Pending'
    }
  ])

  const handleCreateRequest = async () => {
    if (!approvalData.title || !approvalData.description) return

    setIsLoading(true)
    try {
      const requestData = {
        ...approvalData,
        status: 'pending',
        created_date: new Date().toISOString().split('T')[0],
        requested_by: approvalData.requested_by || 'current_user'
      }

      await apiClient.createApprovalRequest(requestData)
      navigate('/app/admin', { 
        state: { message: 'Approval request created successfully!' }
      })
    } catch (error) {
      console.error('Failed to create approval request:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (requestId: number) => {
    try {
      await apiClient.approveRequest(requestId)
    } catch (error) {
      console.error('Failed to approve request:', error)
    }
  }

  const handleReject = async (requestId: number) => {
    try {
      await apiClient.rejectRequest(requestId)
    } catch (error) {
      console.error('Failed to reject request:', error)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/app/admin')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
          <h1 className="text-3xl font-bold">{t('admin.approvalRequests')}</h1>
          <p className="text-gray-600 mt-2">
            {t('admin.manageApprovalRequests')}
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {t('admin.pendingApprovals')}
              </CardTitle>
              <CardDescription>
                {t('admin.reviewHighRiskActions')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvalRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{request.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant={
                            request.priority === 'High' ? 'destructive' : 
                            request.priority === 'Medium' ? 'default' : 'secondary'
                          }>
                            {request.priority} Priority
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Requested by {request.requestedBy} on {request.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleApprove(request.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleReject(request.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {t('admin.createApprovalRequest')}
              </CardTitle>
              <CardDescription>
                {t('admin.submitNewApprovalRequest')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">{t('admin.requestTitle')} *</Label>
                  <Input
                    id="title"
                    value={approvalData.title}
                    onChange={(e) => setApprovalData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={t('admin.requestTitlePlaceholder')}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="priority">{t('admin.priority')}</Label>
                  <Select 
                    value={approvalData.priority} 
                    onValueChange={(value) => setApprovalData(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('admin.selectPriority')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{t('admin.priorityLow')}</SelectItem>
                      <SelectItem value="medium">{t('admin.priorityMedium')}</SelectItem>
                      <SelectItem value="high">{t('admin.priorityHigh')}</SelectItem>
                      <SelectItem value="urgent">{t('admin.priorityUrgent')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">{t('admin.category')}</Label>
                  <Select 
                    value={approvalData.category} 
                    onValueChange={(value) => setApprovalData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('admin.selectCategory')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financial Transaction</SelectItem>
                      <SelectItem value="client">Client Onboarding</SelectItem>
                      <SelectItem value="system">System Access</SelectItem>
                      <SelectItem value="compliance">Compliance Review</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="requested_by">{t('admin.requestedBy')}</Label>
                  <Input
                    id="requested_by"
                    value={approvalData.requested_by}
                    onChange={(e) => setApprovalData(prev => ({ ...prev, requested_by: e.target.value }))}
                    placeholder={t('admin.requestedByPlaceholder')}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">{t('admin.description')} *</Label>
                <Textarea
                  id="description"
                  value={approvalData.description}
                  onChange={(e) => setApprovalData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={t('admin.descriptionPlaceholder')}
                  rows={3}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="justification">{t('admin.justification')}</Label>
                <Textarea
                  id="justification"
                  value={approvalData.justification}
                  onChange={(e) => setApprovalData(prev => ({ ...prev, justification: e.target.value }))}
                  placeholder={t('admin.justificationPlaceholder')}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/app/admin')}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button 
            onClick={handleCreateRequest} 
            disabled={!approvalData.title || !approvalData.description || isLoading}
          >
            {isLoading ? t('common.creating') : t('admin.createRequest')}
          </Button>
        </div>
      </div>
    </div>
  )
}
