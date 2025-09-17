import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { ArrowLeft, Receipt } from 'lucide-react'
import { apiClient } from '../../lib/api'

export default function NewExpenseForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    category: '',
    expense_date: new Date().toISOString().split('T')[0],
    payment_method: 'card',
    supplier: '',
    reference: '',
    vat_amount: '',
    account_code: '',
    project_id: '',
    notes: ''
  })

  const handleCreateExpense = async () => {
    if (!expenseData.description || !expenseData.amount || !expenseData.category) return

    setIsLoading(true)
    try {
      const expense = {
        ...expenseData,
        amount: parseFloat(expenseData.amount),
        vat_amount: expenseData.vat_amount ? parseFloat(expenseData.vat_amount) : 0,
        status: 'pending',
        created_date: new Date().toISOString().split('T')[0]
      }

      await apiClient.createExpense(expense)
      navigate('/app/books', { 
        state: { message: 'Expense created successfully!' }
      })
    } catch (error) {
      console.error('Failed to create expense:', error)
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
          <h1 className="text-3xl font-bold">{t('bookkeeping.addNewExpense')}</h1>
          <p className="text-gray-600 mt-2">
            {t('bookkeeping.addExpenseDescription')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              {t('bookkeeping.expenseDetails')}
            </CardTitle>
            <CardDescription>
              {t('bookkeeping.fillExpenseDetailsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="description">{t('bookkeeping.description')} *</Label>
                <Input
                  id="description"
                  value={expenseData.description}
                  onChange={(e) => setExpenseData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={t('bookkeeping.expenseDescriptionPlaceholder')}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="amount">{t('bookkeeping.amount')} *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={expenseData.amount}
                  onChange={(e) => setExpenseData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="vat_amount">{t('bookkeeping.vatAmount')}</Label>
                <Input
                  id="vat_amount"
                  type="number"
                  step="0.01"
                  value={expenseData.vat_amount}
                  onChange={(e) => setExpenseData(prev => ({ ...prev, vat_amount: e.target.value }))}
                  placeholder="0.00"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">{t('bookkeeping.category')} *</Label>
                <Select 
                  value={expenseData.category} 
                  onValueChange={(value) => setExpenseData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('bookkeeping.selectCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office-supplies">Office Supplies</SelectItem>
                    <SelectItem value="travel">Travel & Transport</SelectItem>
                    <SelectItem value="meals">Meals & Entertainment</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="software">Software & Subscriptions</SelectItem>
                    <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                    <SelectItem value="professional-services">Professional Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="payment_method">{t('bookkeeping.paymentMethod')}</Label>
                <Select 
                  value={expenseData.payment_method} 
                  onValueChange={(value) => setExpenseData(prev => ({ ...prev, payment_method: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="expense_date">{t('bookkeeping.expenseDate')} *</Label>
                <Input
                  id="expense_date"
                  type="date"
                  value={expenseData.expense_date}
                  onChange={(e) => setExpenseData(prev => ({ ...prev, expense_date: e.target.value }))}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="supplier">{t('bookkeeping.supplier')}</Label>
                <Input
                  id="supplier"
                  value={expenseData.supplier}
                  onChange={(e) => setExpenseData(prev => ({ ...prev, supplier: e.target.value }))}
                  placeholder={t('bookkeeping.supplierPlaceholder')}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reference">{t('bookkeeping.reference')}</Label>
                <Input
                  id="reference"
                  value={expenseData.reference}
                  onChange={(e) => setExpenseData(prev => ({ ...prev, reference: e.target.value }))}
                  placeholder={t('bookkeeping.referencePlaceholder')}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="account_code">{t('bookkeeping.accountCode')}</Label>
                <Select 
                  value={expenseData.account_code} 
                  onValueChange={(value) => setExpenseData(prev => ({ ...prev, account_code: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('bookkeeping.selectAccount')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6000">6000 - Office Expenses</SelectItem>
                    <SelectItem value="6100">6100 - Travel Expenses</SelectItem>
                    <SelectItem value="6200">6200 - Marketing Expenses</SelectItem>
                    <SelectItem value="6300">6300 - Professional Fees</SelectItem>
                    <SelectItem value="6400">6400 - Utilities</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="project_id">{t('bookkeeping.project')}</Label>
                <Select 
                  value={expenseData.project_id} 
                  onValueChange={(value) => setExpenseData(prev => ({ ...prev, project_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('bookkeeping.selectProject')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project-1">Website Redesign</SelectItem>
                    <SelectItem value="project-2">Marketing Campaign</SelectItem>
                    <SelectItem value="project-3">Office Renovation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">{t('bookkeeping.notes')}</Label>
              <Textarea
                id="notes"
                value={expenseData.notes}
                onChange={(e) => setExpenseData(prev => ({ ...prev, notes: e.target.value }))}
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
            onClick={handleCreateExpense} 
            disabled={!expenseData.description || !expenseData.amount || !expenseData.category || isLoading}
          >
            {isLoading ? t('common.creating') : t('bookkeeping.addExpense')}
          </Button>
        </div>
      </div>
    </div>
  )
}
