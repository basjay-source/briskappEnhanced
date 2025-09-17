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

interface BillItem {
  description: string
  quantity: number
  unit_price: number
  total: number
}

export default function NewBillForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [billData, setBillData] = useState({
    supplier_id: '',
    bill_number: '',
    reference: '',
    bill_date: new Date().toISOString().split('T')[0],
    due_date: '',
    currency: 'GBP',
    notes: ''
  })
  const [items, setItems] = useState<BillItem[]>([
    { description: '', quantity: 1, unit_price: 0, total: 0 }
  ])

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unit_price: 0, total: 0 }])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, field: keyof BillItem, value: string | number) => {
    const updatedItems = [...items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    
    if (field === 'quantity' || field === 'unit_price') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unit_price
    }
    
    setItems(updatedItems)
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateVAT = () => {
    return calculateSubtotal() * 0.2
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT()
  }

  const handleCreateBill = async () => {
    if (!billData.supplier_id || !billData.bill_number || items.length === 0) return

    setIsLoading(true)
    try {
      const billPayload = {
        ...billData,
        items: items.filter(item => item.description.trim() !== ''),
        subtotal: calculateSubtotal(),
        vat_amount: calculateVAT(),
        total_amount: calculateTotal(),
        status: 'draft'
      }

      await apiClient.createBill(billPayload)
      navigate('/app/books', { 
        state: { message: 'Bill created successfully!' }
      })
    } catch (error) {
      console.error('Failed to create bill:', error)
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
          <h1 className="text-3xl font-bold">{t('bookkeeping.createNewBill')}</h1>
          <p className="text-gray-600 mt-2">
            {t('bookkeeping.createBillDescription')}
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t('bookkeeping.billDetails')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="supplier">{t('bookkeeping.supplier')} *</Label>
                  <Select 
                    value={billData.supplier_id} 
                    onValueChange={(value) => setBillData(prev => ({ ...prev, supplier_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('bookkeeping.selectSupplier')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supplier-1">ABC Supplies Ltd</SelectItem>
                      <SelectItem value="supplier-2">Office Equipment Co</SelectItem>
                      <SelectItem value="supplier-3">Tech Solutions Inc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bill_number">{t('bookkeeping.billNumber')} *</Label>
                  <Input
                    id="bill_number"
                    value={billData.bill_number}
                    onChange={(e) => setBillData(prev => ({ ...prev, bill_number: e.target.value }))}
                    placeholder="BILL-001"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="reference">{t('bookkeeping.reference')}</Label>
                  <Input
                    id="reference"
                    value={billData.reference}
                    onChange={(e) => setBillData(prev => ({ ...prev, reference: e.target.value }))}
                    placeholder={t('bookkeeping.referencePlaceholder')}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="currency">{t('bookkeeping.currency')}</Label>
                  <Select 
                    value={billData.currency} 
                    onValueChange={(value) => setBillData(prev => ({ ...prev, currency: value }))}
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
                  <Label htmlFor="bill_date">{t('bookkeeping.billDate')} *</Label>
                  <Input
                    id="bill_date"
                    type="date"
                    value={billData.bill_date}
                    onChange={(e) => setBillData(prev => ({ ...prev, bill_date: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="due_date">{t('bookkeeping.dueDate')}</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={billData.due_date}
                    onChange={(e) => setBillData(prev => ({ ...prev, due_date: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">{t('bookkeeping.notes')}</Label>
                <Textarea
                  id="notes"
                  value={billData.notes}
                  onChange={(e) => setBillData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder={t('bookkeeping.notesPlaceholder')}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('bookkeeping.billItems')}</CardTitle>
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
                      <Label>{t('bookkeeping.unitPrice')}</Label>
                      <Input
                        type="number"
                        value={item.unit_price}
                        onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>{t('bookkeeping.total')}</Label>
                      <Input
                        value={formatCurrency(item.total, billData.currency)}
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
                
                <Button variant="outline" onClick={addItem} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('bookkeeping.addItem')}
                </Button>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{t('bookkeeping.subtotal')}:</span>
                    <span>{formatCurrency(calculateSubtotal(), billData.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('bookkeeping.vat')} (20%):</span>
                    <span>{formatCurrency(calculateVAT(), billData.currency)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>{t('bookkeeping.total')}:</span>
                    <span>{formatCurrency(calculateTotal(), billData.currency)}</span>
                  </div>
                </div>
              </div>
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
            onClick={handleCreateBill} 
            disabled={!billData.supplier_id || !billData.bill_number || isLoading}
          >
            {isLoading ? t('common.creating') : t('bookkeeping.createBill')}
          </Button>
        </div>
      </div>
    </div>
  )
}
