import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { ArrowLeft, Plus } from 'lucide-react'
import { apiClient } from '../../lib/api'

export default function NewJobForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [newJobData, setNewJobData] = useState({
    title: '',
    client_id: '',
    priority: '',
    due_date: '',
    description: ''
  })

  const handleCreateJob = async () => {
    if (!newJobData.title || !newJobData.client_id) return

    setIsLoading(true)
    try {
      const jobData = {
        ...newJobData,
        status: 'pending',
        created_date: new Date().toISOString().split('T')[0],
        assigned_to: 'current_user'
      }

      await apiClient.createJob(jobData)
      navigate('/app/practice', { 
        state: { message: 'Job created successfully!' }
      })
    } catch (error) {
      console.error('Failed to create job:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/app/practice')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
          <h1 className="text-3xl font-bold">{t('practice.createNewJob')}</h1>
          <p className="text-gray-600 mt-2">
            {t('practice.addNewJobDescription')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {t('practice.jobDetails')}
            </CardTitle>
            <CardDescription>
              {t('practice.fillJobDetailsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="title">{t('practice.jobTitle')} *</Label>
              <Input
                id="title"
                value={newJobData.title}
                onChange={(e) => setNewJobData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={t('practice.jobTitlePlaceholder')}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="client">{t('practice.client')} *</Label>
              <Input
                id="client"
                value={newJobData.client_id}
                onChange={(e) => setNewJobData(prev => ({ ...prev, client_id: e.target.value }))}
                placeholder={t('practice.clientPlaceholder')}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority">{t('practice.priority')}</Label>
              <Select 
                value={newJobData.priority} 
                onValueChange={(value) => setNewJobData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('practice.selectPriority')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{t('practice.priorityLow')}</SelectItem>
                  <SelectItem value="medium">{t('practice.priorityMedium')}</SelectItem>
                  <SelectItem value="high">{t('practice.priorityHigh')}</SelectItem>
                  <SelectItem value="urgent">{t('practice.priorityUrgent')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="due_date">{t('practice.dueDate')}</Label>
              <Input
                id="due_date"
                type="date"
                value={newJobData.due_date}
                onChange={(e) => setNewJobData(prev => ({ ...prev, due_date: e.target.value }))}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">{t('practice.description')}</Label>
              <Textarea
                id="description"
                value={newJobData.description}
                onChange={(e) => setNewJobData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={t('practice.descriptionPlaceholder')}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/app/practice')}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button 
            onClick={handleCreateJob} 
            disabled={!newJobData.title || !newJobData.client_id || isLoading}
          >
            {isLoading ? t('common.creating') : t('practice.createJob')}
          </Button>
        </div>
      </div>
    </div>
  )
}
