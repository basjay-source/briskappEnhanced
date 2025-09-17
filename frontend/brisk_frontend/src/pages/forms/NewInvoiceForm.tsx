import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { ArrowLeft, FileText, Plus, Trash2 } from 'lucide-react'
import { apiClient } from '../../lib/api'
import { WORLD_CURRENCIES, formatCurrency } from '../../lib/currencies'

interface InvoiceItem {
  description: string
  quantity: number
  rate: number
  amount: number
}

export default function NewInvoiceForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [invoiceData, setInvoiceData] = useState({
    client_id: '',
    invoice_number: '',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    currency: 'GBP',
    notes: '',
    terms: 'Net 30'
  })
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, rate: 0, amount: 0 }
  ])

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0, amount: 0 }])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = [...items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    
    if (field === 'quantity' || field === 'rate') {
      updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate
    }
    
    setItems(updatedItems)
  }

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const vatRate = 0.20
  const vatAmount = subtotal * vatRate
  const total = subtotal + vatAmount

  const handleCreateInvoice = async () => {
    if (!invoiceData.client_id || !invoiceData.invoice_number) return

    setIsLoading(true)
    try {
      const invoicePayload = {
        ...invoiceData,
        items,
        subtotal,
        vat_amount: vatAmount,
        total,
        status: 'draft'
      }

      await apiClient.createInvoice(invoicePayload)
      navigate('/app/books', { 
        state: { message: 'Invoice created successfully!' }
      })
    } catch (error) {
      console.error('Failed to create invoice:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/app/books')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
          <h1 className="text-3xl font-bold">{t('bookkeeping.createNewInvoice')}</h1>
          <p className="text-gray-600 mt-2">
            {t('bookkeeping.createInvoiceDescription')}
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t('bookkeeping.invoiceDetails')}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="client">{t('bookkeeping.client')} *</Label>
                <Input
                  id="client"
                  value={invoiceData.client_id}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, client_id: e.target.value }))}
                  placeholder={t('bookkeeping.clientPlaceholder')}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="invoice_number">{t('bookkeeping.invoiceNumber')} *</Label>
                <Input
                  id="invoice_number"
                  value={invoiceData.invoice_number}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, invoice_number: e.target.value }))}
                  placeholder="INV-001"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="issue_date">{t('bookkeeping.issueDate')}</Label>
                <Input
                  id="issue_date"
                  type="date"
                  value={invoiceData.issue_date}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, issue_date: e.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="due_date">{t('bookkeeping.dueDate')}</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={invoiceData.due_date}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, due_date: e.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="currency">{t('bookkeeping.currency')}</Label>
                <Select 
                  value={invoiceData.currency} 
                  onValueChange={(value) => setInvoiceData(prev => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WORLD_CURRENCIES.map(currency => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name} ({currency.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="terms">{t('bookkeeping.paymentTerms')}</Label>
                <Select 
                  value={invoiceData.terms} 
                  onValueChange={(value) => setInvoiceData(prev => ({ ...prev, terms: value }))}
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('bookkeeping.invoiceItems')}</CardTitle>
                <Button onClick={addItem} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('bookkeeping.addItem')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-end">
                    <div className="col-span-5">
                      <Label>{t('bookkeeping.description')}</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        placeholder={t('bookkeeping.itemDescription')}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>{t('bookkeeping.quantity')}</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>{t('bookkeeping.rate')}</Label>
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>{t('bookkeeping.amount')}</Label>
                      <Input
                        value={formatCurrency(item.amount, invoiceData.currency)}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span>{t('bookkeeping.subtotal')}:</span>
                      <span>{formatCurrency(subtotal, invoiceData.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('bookkeeping.vat')} (20%):</span>
                      <span>{formatCurrency(vatAmount, invoiceData.currency)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>{t('bookkeeping.total')}:</span>
                      <span>{formatCurrency(total, invoiceData.currency)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('bookkeeping.additionalNotes')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder={t('bookkeeping.notesPlaceholder')}
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/app/books')}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button 
            onClick={handleCreateInvoice} 
            disabled={!invoiceData.client_id || !invoiceData.invoice_number || isLoading}
          >
            {isLoading ? t('common.creating') : t('bookkeeping.createInvoice')}
          </Button>
        </div>
      </div>
    </div>
  )
}
