import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  DollarSign, Search, Plus, Calendar, AlertTriangle, TrendingUp,
  CheckCircle, Eye, Edit, Send, CreditCard, Phone
} from 'lucide-react'

const CollectionsPayments: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [agingFilter, setAgingFilter] = useState<string>('all')

  const arData = [
    { id: 1, client_name: 'ABC Manufacturing Ltd', invoice_number: 'INV-2024-001', amount: 2400, days_overdue: 15, last_contact: '2024-01-10', status: 'first_reminder', contact_method: 'email' },
    { id: 2, client_name: 'GHI Holdings', invoice_number: 'INV-2023-089', amount: 5200, days_overdue: 45, last_contact: '2024-01-05', status: 'final_notice', contact_method: 'phone' },
    { id: 3, client_name: 'JKL Services', invoice_number: 'INV-2024-015', amount: 1800, days_overdue: 75, last_contact: '2023-12-20', status: 'collections', contact_method: 'letter' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const getAgingBadge = (days: number) => {
    if (days <= 30) return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">0-30 days</Badge>
    if (days <= 60) return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">31-60 days</Badge>
    if (days <= 90) return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">61-90 days</Badge>
    return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">90+ days</Badge>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'first_reminder':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">First Reminder</Badge>
      case 'second_reminder':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Second Reminder</Badge>
      case 'final_notice':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Final Notice</Badge>
      case 'collections':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Collections</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Collections & Payments</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collections & Payments</h1>
          <p className="text-gray-600 mt-1">Monitor AR aging, manage dunning and process payments</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Send Reminders
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total AR</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              £{arData.reduce((sum, ar) => sum + ar.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              Outstanding receivables
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue (60+ days)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              £{arData.filter(ar => ar.days_overdue > 60).reduce((sum, ar) => sum + ar.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Requires action
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Collection Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">94%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Last 12 months
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Collection Time</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">22</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              Days average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AR Aging */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">AR Aging</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search AR..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={agingFilter}
                onChange={(e) => setAgingFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Ages</option>
                <option value="current">Current</option>
                <option value="30">0-30 days</option>
                <option value="60">31-60 days</option>
                <option value="90">61-90 days</option>
                <option value="over90">90+ days</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {arData.map((ar) => (
              <div key={ar.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{ar.client_name}</h3>
                    {getAgingBadge(ar.days_overdue)}
                    {getStatusBadge(ar.status)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {ar.invoice_number}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      £{ar.amount.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {ar.days_overdue} days overdue
                    </span>
                    <span className="flex items-center">
                      Last contact: {new Date(ar.last_contact).toLocaleDateString()}
                    </span>
                    <span className="flex items-center capitalize">
                      via {ar.contact_method}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Record Payment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods & Dunning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Payment Methods</CardTitle>
            <CardDescription>Available payment options for clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">Card Payments</h4>
                    <p className="text-sm text-gray-600">Stripe integration active</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">Direct Debit</h4>
                    <p className="text-sm text-gray-600">GoCardless integration</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                  <div>
                    <h4 className="font-medium">Bank Transfer</h4>
                    <p className="text-sm text-gray-600">Manual reconciliation</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Manual
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Dunning Sequences</CardTitle>
            <CardDescription>Automated reminder workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Standard Sequence</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Day 1 (Due date)</span>
                    <Badge variant="outline" className="text-xs">Email reminder</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Day 7</span>
                    <Badge variant="outline" className="text-xs">First notice</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Day 21</span>
                    <Badge variant="outline" className="text-xs">Second notice</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Day 45</span>
                    <Badge variant="outline" className="text-xs">Final notice</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Day 60</span>
                    <Badge variant="outline" className="text-xs">Collections</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit Sequence
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Payments</CardTitle>
          <CardDescription>Latest payment activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">XYZ Services Ltd</p>
                  <p className="text-sm text-gray-600">INV-2024-002 • £800.00</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Card Payment</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">MNO Corporation</p>
                  <p className="text-sm text-gray-600">INV-2024-008 • £1,200.00</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Direct Debit</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">PQR Holdings</p>
                  <p className="text-sm text-gray-600">INV-2024-005 • £3,500.00</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Bank Transfer</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CollectionsPayments
