import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { apiClient } from '../../lib/api'

export default function NewCustomerForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'United Kingdom',
    vat_number: '',
    payment_terms: 'Net 30',
    notes: ''
  })

  const handleCreateCustomer = async () => {
    if (!customerData.name || !customerData.email) return

    setIsLoading(true)
    try {
      const customer = {
        ...customerData,
        status: 'active',
        created_date: new Date().toISOString().split('T')[0]
      }

      await apiClient.createCustomer(customer)
      navigate('/app/books', { 
        state: { message: 'Customer created successfully!' }
      })
    } catch (error) {
      console.error('Failed to create customer:', error)
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
          <h1 className="text-3xl font-bold">{t('bookkeeping.addNewCustomer')}</h1>
          <p className="text-gray-600 mt-2">
            {t('bookkeeping.addCustomerDescription')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              {t('bookkeeping.customerDetails')}
            </CardTitle>
            <CardDescription>
              {t('bookkeeping.fillCustomerDetailsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">{t('bookkeeping.customerName')} *</Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t('bookkeeping.customerNamePlaceholder')}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">{t('bookkeeping.email')} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={t('bookkeeping.emailPlaceholder')}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">{t('bookkeeping.phone')}</Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder={t('bookkeeping.phonePlaceholder')}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="vat_number">{t('bookkeeping.vatNumber')}</Label>
                <Input
                  id="vat_number"
                  value={customerData.vat_number}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, vat_number: e.target.value }))}
                  placeholder="GB123456789"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">{t('bookkeeping.address')}</Label>
              <Input
                id="address"
                value={customerData.address}
                onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
                placeholder={t('bookkeeping.addressPlaceholder')}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="city">{t('bookkeeping.city')}</Label>
                <Input
                  id="city"
                  value={customerData.city}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder={t('bookkeeping.cityPlaceholder')}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="postal_code">{t('bookkeeping.postalCode')}</Label>
                <Input
                  id="postal_code"
                  value={customerData.postal_code}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, postal_code: e.target.value }))}
                  placeholder="SW1A 1AA"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="country">{t('bookkeeping.country')}</Label>
                <Select 
                  value={customerData.country} 
                  onValueChange={(value) => setCustomerData(prev => ({ ...prev, country: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Ireland">Ireland</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="payment_terms">{t('bookkeeping.paymentTerms')}</Label>
              <Select 
                value={customerData.payment_terms} 
                onValueChange={(value) => setCustomerData(prev => ({ ...prev, payment_terms: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Net 15">Net 15</SelectItem>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 60">Net 60</SelectItem>
                  <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">{t('bookkeeping.notes')}</Label>
              <Textarea
                id="notes"
                value={customerData.notes}
                onChange={(e) => setCustomerData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder={t('bookkeeping.notesPlaceholder')}
                rows={3}
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
            onClick={handleCreateCustomer} 
            disabled={!customerData.name || !customerData.email || isLoading}
          >
            {isLoading ? t('common.creating') : t('bookkeeping.addCustomer')}
          </Button>
        </div>
      </div>
    </div>
  )
}
