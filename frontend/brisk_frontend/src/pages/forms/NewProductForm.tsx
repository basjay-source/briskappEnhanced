import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { ArrowLeft, Package } from 'lucide-react'
import { apiClient } from '../../lib/api'
import { WORLD_CURRENCIES } from '../../lib/currencies'

export default function NewProductForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    sku: '',
    category: '',
    unit_price: '',
    cost_price: '',
    currency: 'GBP',
    vat_rate: '20',
    stock_quantity: '',
    reorder_level: '',
    unit_of_measure: 'each',
    notes: ''
  })

  const handleCreateProduct = async () => {
    if (!productData.name || !productData.unit_price) return

    setIsLoading(true)
    try {
      const product = {
        ...productData,
        unit_price: parseFloat(productData.unit_price),
        cost_price: productData.cost_price ? parseFloat(productData.cost_price) : 0,
        currency: productData.currency,
        vat_rate: parseFloat(productData.vat_rate),
        stock_quantity: productData.stock_quantity ? parseInt(productData.stock_quantity) : 0,
        reorder_level: productData.reorder_level ? parseInt(productData.reorder_level) : 0,
        status: 'active',
        created_date: new Date().toISOString().split('T')[0]
      }

      await apiClient.createProduct(product)
      navigate('/app/books', { 
        state: { message: 'Product created successfully!' }
      })
    } catch (error) {
      console.error('Failed to create product:', error)
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
          <h1 className="text-3xl font-bold">{t('bookkeeping.addNewProduct')}</h1>
          <p className="text-gray-600 mt-2">
            {t('bookkeeping.addProductDescription')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {t('bookkeeping.productDetails')}
            </CardTitle>
            <CardDescription>
              {t('bookkeeping.fillProductDetailsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">{t('bookkeeping.productName')} *</Label>
                <Input
                  id="name"
                  value={productData.name}
                  onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t('bookkeeping.productNamePlaceholder')}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sku">{t('bookkeeping.sku')}</Label>
                <Input
                  id="sku"
                  value={productData.sku}
                  onChange={(e) => setProductData(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="PRD-001"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">{t('bookkeeping.category')}</Label>
                <Select 
                  value={productData.category} 
                  onValueChange={(value) => setProductData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('bookkeeping.selectCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="products">Products</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="unit_of_measure">{t('bookkeeping.unitOfMeasure')}</Label>
                <Select 
                  value={productData.unit_of_measure} 
                  onValueChange={(value) => setProductData(prev => ({ ...prev, unit_of_measure: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="each">Each</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="litres">Litres</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="unit_price">{t('bookkeeping.unitPrice')} *</Label>
                <Input
                  id="unit_price"
                  type="number"
                  step="0.01"
                  value={productData.unit_price}
                  onChange={(e) => setProductData(prev => ({ ...prev, unit_price: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cost_price">{t('bookkeeping.costPrice')}</Label>
                <Input
                  id="cost_price"
                  type="number"
                  step="0.01"
                  value={productData.cost_price}
                  onChange={(e) => setProductData(prev => ({ ...prev, cost_price: e.target.value }))}
                  placeholder="0.00"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="currency">{t('bookkeeping.currency')}</Label>
                <Select 
                  value={productData.currency} 
                  onValueChange={(value) => setProductData(prev => ({ ...prev, currency: value }))}
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
                <Label htmlFor="vat_rate">{t('bookkeeping.vatRate')} (%)</Label>
                <Select 
                  value={productData.vat_rate} 
                  onValueChange={(value) => setProductData(prev => ({ ...prev, vat_rate: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0% (Zero rated)</SelectItem>
                    <SelectItem value="5">5% (Reduced rate)</SelectItem>
                    <SelectItem value="20">20% (Standard rate)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stock_quantity">{t('bookkeeping.stockQuantity')}</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  value={productData.stock_quantity}
                  onChange={(e) => setProductData(prev => ({ ...prev, stock_quantity: e.target.value }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">{t('bookkeeping.description')}</Label>
              <Textarea
                id="description"
                value={productData.description}
                onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={t('bookkeeping.productDescriptionPlaceholder')}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">{t('bookkeeping.notes')}</Label>
              <Textarea
                id="notes"
                value={productData.notes}
                onChange={(e) => setProductData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder={t('bookkeeping.notesPlaceholder')}
                rows={2}
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
            onClick={handleCreateProduct} 
            disabled={!productData.name || !productData.unit_price || isLoading}
          >
            {isLoading ? t('common.creating') : t('bookkeeping.addProduct')}
          </Button>
        </div>
      </div>
    </div>
  )
}
