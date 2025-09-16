import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { ArrowLeft, Building2 } from 'lucide-react'
import { apiClient } from '../../lib/api'

export default function NewAccountForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [accountData, setAccountData] = useState({
    name: '',
    code: '',
    type: '',
    description: '',
    parent_account: '',
    is_active: true
  })

  const handleCreateAccount = async () => {
    if (!accountData.name || !accountData.type) return

    setIsLoading(true)
    try {
      await apiClient.createAccount(accountData)
      navigate('/app/books', { 
        state: { message: 'Account created successfully!' }
      })
    } catch (error) {
      console.error('Failed to create account:', error)
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
            onClick={() => navigate('/app/books')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
          <h1 className="text-3xl font-bold">{t('bookkeeping.createNewAccount')}</h1>
          <p className="text-gray-600 mt-2">
            {t('bookkeeping.addNewAccountDescription')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {t('bookkeeping.accountDetails')}
            </CardTitle>
            <CardDescription>
              {t('bookkeeping.fillAccountDetailsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="account-name">{t('bookkeeping.accountName')} *</Label>
              <Input
                id="account-name"
                value={accountData.name}
                onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                placeholder={t('bookkeeping.accountNamePlaceholder')}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="account-code">{t('bookkeeping.accountCode')}</Label>
              <Input
                id="account-code"
                value={accountData.code}
                onChange={(e) => setAccountData({ ...accountData, code: e.target.value })}
                placeholder={t('bookkeeping.accountCodePlaceholder')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="account-type">{t('bookkeeping.accountType')} *</Label>
              <Select 
                value={accountData.type} 
                onValueChange={(value) => setAccountData({ ...accountData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('bookkeeping.selectAccountType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asset">{t('bookkeeping.asset')}</SelectItem>
                  <SelectItem value="liability">{t('bookkeeping.liability')}</SelectItem>
                  <SelectItem value="equity">{t('bookkeeping.equity')}</SelectItem>
                  <SelectItem value="revenue">{t('bookkeeping.revenue')}</SelectItem>
                  <SelectItem value="expense">{t('bookkeeping.expense')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="account-description">{t('bookkeeping.description')}</Label>
              <Input
                id="account-description"
                value={accountData.description}
                onChange={(e) => setAccountData({ ...accountData, description: e.target.value })}
                placeholder={t('bookkeeping.descriptionPlaceholder')}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/app/books')}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button 
            onClick={handleCreateAccount} 
            disabled={!accountData.name || !accountData.type || isLoading}
          >
            {isLoading ? t('common.creating') : t('bookkeeping.createAccount')}
          </Button>
        </div>
      </div>
    </div>
  )
}
