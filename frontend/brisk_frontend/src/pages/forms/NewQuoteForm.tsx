import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { ArrowLeft, FileText, Plus, Trash2 } from 'lucide-react'
import { apiClient } from '../../lib/api'

export default function NewQuoteForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [quoteData, setQuoteData] = useState({
    client: '',
    quote_number: '',
    issue_date: '',
    valid_until: '',
    payment_terms: 'Net 30',
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    notes: ''
  })

  const addItem = () => {
    setQuoteData({
      ...quoteData,
      items: [...quoteData.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    })
  }

  const removeItem = (index: number) => {
    const newItems = quoteData.items.filter((_, i) => i !== index)
    setQuoteData({ ...quoteData, items: newItems })
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...quoteData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate
    }
    setQuoteData({ ...quoteData, items: newItems })
  }

  const subtotal = quoteData.items.reduce((sum, item) => sum + item.amount, 0)
  const vat = subtotal * 0.2
  const total = subtotal + vat

  const handleCreateQuote = async () => {
    if (!quoteData.client || !quoteData.quote_number) return

    setIsLoading(true)
    try {
      await apiClient.createQuote(quoteData)
      navigate('/app/books', { 
        state: { message: 'Quote created successfully!' }
      })
    } catch (error) {
      console.error('Failed to create quote:', error)
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
          <h1 className="text-3xl font-bold">{t('bookkeeping.createNewQuote')}</h1>
          <p className="text-gray-600 mt-2">
            {t('bookkeeping.createQuoteDescription')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('bookkeeping.quoteDetails')}
            </CardTitle>
            <CardDescription>
              {t('bookkeeping.fillQuoteDetailsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="client">{t('bookkeeping.client')} *</Label>
                <Input
                  id="client"
                  value={quoteData.client}
                  onChange={(e) => setQuoteData({ ...quoteData, client: e.target.value })}
                  placeholder={t('bookkeeping.clientPlaceholder')}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="quote-number">{t('bookkeeping.quoteNumber')} *</Label>
                <Input
                  id="quote-number"
                  value={quoteData.quote_number}
                  onChange={(e) => setQuoteData({ ...quoteData, quote_number: e.target.value })}
                  placeholder="QUO-001"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="issue-date">{t('bookkeeping.issueDate')}</Label>
                <Input
                  id="issue-date"
                  type="date"
                  value={quoteData.issue_date}
                  onChange={(e) => setQuoteData({ ...quoteData, issue_date: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="valid-until">{t('bookkeeping.validUntil')}</Label>
                <Input
                  id="valid-until"
                  type="date"
                  value={quoteData.valid_until}
                  onChange={(e) => setQuoteData({ ...quoteData, valid_until: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="payment-terms">{t('bookkeeping.paymentTerms')}</Label>
                <Select 
                  value={quoteData.payment_terms} 
                  onValueChange={(value) => setQuoteData({ ...quoteData, payment_terms: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Net 30">Net 30</SelectItem>
                    <SelectItem value="Net 15">Net 15</SelectItem>
                    <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                    <SelectItem value="Net 60">Net 60</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t('bookkeeping.quoteItems')}
              <Button onClick={addItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {t('bookkeeping.addItem')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-600">
                <div className="col-span-5">{t('bookkeeping.description')}</div>
                <div className="col-span-2">{t('bookkeeping.quantity')}</div>
                <div className="col-span-2">{t('bookkeeping.rate')}</div>
                <div className="col-span-2">{t('bookkeeping.amount')}</div>
                <div className="col-span-1"></div>
              </div>
              
              {quoteData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder={t('bookkeeping.itemDescriptionPlaceholder')}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                      min="1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="text-right font-medium">£{item.amount.toFixed(2)}</div>
                  </div>
                  <div className="col-span-1">
                    {quoteData.items.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 text-right">
              <div className="flex justify-between">
                <span>{t('bookkeeping.subtotal')}:</span>
                <span className="font-medium">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('bookkeeping.vat')} (20%):</span>
                <span className="font-medium">£{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>{t('bookkeeping.total')}:</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t('bookkeeping.additionalNotes')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={quoteData.notes}
              onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
              placeholder={t('bookkeeping.notesPlaceholder')}
            />
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
            onClick={handleCreateQuote} 
            disabled={!quoteData.client || !quoteData.quote_number || isLoading}
          >
            {isLoading ? t('common.creating') : t('bookkeeping.createQuote')}
          </Button>
        </div>
      </div>
    </div>
  )
}
