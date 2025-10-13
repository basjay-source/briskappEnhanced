import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Save, Plus, Trash2, Search } from 'lucide-react'
import { getAllAccounts } from '../data/chartOfAccounts'

interface JournalLine {
  id: string
  accountCode: string
  accountName: string
  description: string
  debit: number
  credit: number
}

interface Adjustment {
  id?: string
  type: 'prepayment' | 'accrual' | 'depreciation' | 'provision' | 'reclassification' | 'write-off' | 'revaluation'
  reference: string
  description: string
  date: string
  status: 'draft' | 'approved' | 'posted'
  journalLines: JournalLine[]
  totalDebit: number
  totalCredit: number
  createdBy?: string
  approvedBy?: string
  approvedDate?: string
  notes?: string
}

interface JournalAdjustmentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  adjustment?: Adjustment | null
  onSave: (adjustment: Partial<Adjustment>) => void
  mode: 'add' | 'edit'
}

export const JournalAdjustmentForm: React.FC<JournalAdjustmentFormProps> = ({
  open,
  onOpenChange,
  adjustment,
  onSave,
  mode
}) => {
  const [formData, setFormData] = useState<Partial<Adjustment>>(adjustment || {
    type: 'accrual',
    reference: `ADJ-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'draft',
    journalLines: [],
    totalDebit: 0,
    totalCredit: 0
  })

  const [lineFormData, setLineFormData] = useState<Partial<JournalLine>>({
    accountCode: '',
    accountName: '',
    description: '',
    debit: 0,
    credit: 0
  })

  const [isAddingLine, setIsAddingLine] = useState(false)
  const [editingLineId, setEditingLineId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAccountSelector, setShowAccountSelector] = useState(false)

  const chartAccounts = getAllAccounts()

  useEffect(() => {
    calculateTotals()
  }, [formData.journalLines])

  const updateField = (field: keyof Adjustment, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const calculateTotals = () => {
    const lines = formData.journalLines || []
    const totalDebit = lines.reduce((sum, line) => sum + (line.debit || 0), 0)
    const totalCredit = lines.reduce((sum, line) => sum + (line.credit || 0), 0)
    setFormData(prev => ({ ...prev, totalDebit, totalCredit }))
  }

  const isBalanced = () => {
    return Math.abs((formData.totalDebit || 0) - (formData.totalCredit || 0)) < 0.01
  }

  const addJournalLine = () => {
    if (!lineFormData.accountCode || !lineFormData.accountName) {
      alert('Please select an account')
      return
    }
    if ((lineFormData.debit || 0) === 0 && (lineFormData.credit || 0) === 0) {
      alert('Please enter a debit or credit amount')
      return
    }
    if ((lineFormData.debit || 0) > 0 && (lineFormData.credit || 0) > 0) {
      alert('A line can only have a debit OR credit, not both')
      return
    }

    const newLine: JournalLine = {
      id: Date.now().toString(),
      accountCode: lineFormData.accountCode!,
      accountName: lineFormData.accountName!,
      description: lineFormData.description || '',
      debit: lineFormData.debit || 0,
      credit: lineFormData.credit || 0
    }

    updateField('journalLines', [...(formData.journalLines || []), newLine])
    setLineFormData({
      accountCode: '',
      accountName: '',
      description: '',
      debit: 0,
      credit: 0
    })
    setIsAddingLine(false)
  }

  const updateJournalLine = () => {
    if (!editingLineId) return

    const updatedLines = (formData.journalLines || []).map(line =>
      line.id === editingLineId
        ? { ...line, ...lineFormData }
        : line
    )

    updateField('journalLines', updatedLines)
    setEditingLineId(null)
    setLineFormData({
      accountCode: '',
      accountName: '',
      description: '',
      debit: 0,
      credit: 0
    })
  }

  const deleteJournalLine = (lineId: string) => {
    updateField('journalLines', (formData.journalLines || []).filter(line => line.id !== lineId))
  }

  const startEditLine = (line: JournalLine) => {
    setEditingLineId(line.id)
    setLineFormData(line)
  }

  const selectAccount = (account: any) => {
    setLineFormData(prev => ({
      ...prev,
      accountCode: account.code,
      accountName: account.name
    }))
    setShowAccountSelector(false)
    setSearchQuery('')
  }

  const filteredAccounts = chartAccounts.filter(account =>
    account.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 10)

  const handleSave = () => {
    if (!formData.reference || !formData.description || !formData.date) {
      alert('Please fill in all required fields (Reference, Description, Date)')
      return
    }
    if (!formData.journalLines || formData.journalLines.length === 0) {
      alert('Please add at least one journal line')
      return
    }
    if (!isBalanced()) {
      alert('Journal is not balanced! Total debits must equal total credits.')
      return
    }

    onSave(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto border-2 border-[#001f3f]">
        <DialogHeader>
          <DialogTitle className="text-[#001f3f] text-2xl">
            {mode === 'add' ? 'Add Year-End Adjustment' : 'Edit Year-End Adjustment'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label className="text-[#001f3f] font-semibold">Adjustment Type *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => updateField('type', value)}
              >
                <SelectTrigger className="border-[#001f3f]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prepayment">Prepayment</SelectItem>
                  <SelectItem value="accrual">Accrual</SelectItem>
                  <SelectItem value="depreciation">Depreciation</SelectItem>
                  <SelectItem value="provision">Provision</SelectItem>
                  <SelectItem value="reclassification">Reclassification</SelectItem>
                  <SelectItem value="write-off">Write-off</SelectItem>
                  <SelectItem value="revaluation">Revaluation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[#001f3f] font-semibold">Reference Number *</Label>
              <Input
                value={formData.reference || ''}
                onChange={(e) => updateField('reference', e.target.value)}
                className="text-[#001f3f] border-[#001f3f]"
                placeholder="ADJ-001"
              />
            </div>

            <div>
              <Label className="text-[#001f3f] font-semibold">Date *</Label>
              <Input
                type="date"
                value={formData.date || ''}
                onChange={(e) => updateField('date', e.target.value)}
                className="text-[#001f3f] border-[#001f3f]"
              />
            </div>

            <div className="col-span-3">
              <Label className="text-[#001f3f] font-semibold">Description *</Label>
              <Input
                value={formData.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                className="text-[#001f3f] border-[#001f3f]"
                placeholder="Brief description of adjustment"
              />
            </div>

            <div>
              <Label className="text-[#001f3f] font-semibold">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => updateField('status', value)}
              >
                <SelectTrigger className="border-[#001f3f]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="posted">Posted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Journal Lines Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#001f3f]">Journal Lines</h3>
              <Button 
                onClick={() => setIsAddingLine(true)}
                className="bg-[#001f3f] hover:bg-[#003366]"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />Add Line
              </Button>
            </div>

            {/* Add/Edit Line Form */}
            {(isAddingLine || editingLineId) && (
              <div className="p-4 border-2 border-[#001f3f] rounded-lg bg-blue-50">
                <h4 className="text-[#001f3f] font-semibold mb-3">
                  {editingLineId ? 'Edit Line' : 'New Line'}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Account *</Label>
                    <div className="flex gap-2">
                      <Input
                        value={lineFormData.accountCode || ''}
                        onChange={(e) => setLineFormData({...lineFormData, accountCode: e.target.value})}
                        className="text-[#001f3f] border-[#001f3f] w-24"
                        placeholder="Code"
                      />
                      <Input
                        value={lineFormData.accountName || ''}
                        readOnly
                        className="text-[#001f3f] border-[#001f3f] flex-1"
                        placeholder="Account name"
                      />
                      <Button 
                        type="button"
                        onClick={() => setShowAccountSelector(!showAccountSelector)}
                        className="bg-[#001f3f] hover:bg-[#003366]"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Account Selector Dropdown */}
                    {showAccountSelector && (
                      <div className="mt-2 p-2 border-2 border-[#001f3f] rounded bg-white max-h-60 overflow-y-auto">
                        <Input
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search accounts..."
                          className="mb-2"
                        />
                        {filteredAccounts.map((account, idx) => (
                          <div
                            key={idx}
                            className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                            onClick={() => selectAccount(account)}
                          >
                            <div className="font-semibold text-[#001f3f]">{account.code}</div>
                            <div className="text-sm text-gray-600">{account.name}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-[#001f3f] font-semibold">Line Description</Label>
                    <Input
                      value={lineFormData.description || ''}
                      onChange={(e) => setLineFormData({...lineFormData, description: e.target.value})}
                      className="text-[#001f3f] border-[#001f3f]"
                      placeholder="Optional line description"
                    />
                  </div>

                  <div>
                    <Label className="text-[#001f3f] font-semibold">Debit (£)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={lineFormData.debit || 0}
                      onChange={(e) => setLineFormData({...lineFormData, debit: parseFloat(e.target.value) || 0, credit: 0})}
                      className="text-[#001f3f] border-[#001f3f]"
                    />
                  </div>

                  <div>
                    <Label className="text-[#001f3f] font-semibold">Credit (£)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={lineFormData.credit || 0}
                      onChange={(e) => setLineFormData({...lineFormData, credit: parseFloat(e.target.value) || 0, debit: 0})}
                      className="text-[#001f3f] border-[#001f3f]"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={editingLineId ? updateJournalLine : addJournalLine}
                    className="bg-[#001f3f] hover:bg-[#003366]"
                  >
                    {editingLineId ? 'Update Line' : 'Add Line'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsAddingLine(false)
                      setEditingLineId(null)
                      setLineFormData({ accountCode: '', accountName: '', description: '', debit: 0, credit: 0 })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Journal Lines Table */}
            <div className="border-2 border-[#001f3f] rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#001f3f]">
                    <TableHead className="text-white">Account Code</TableHead>
                    <TableHead className="text-white">Account Name</TableHead>
                    <TableHead className="text-white">Description</TableHead>
                    <TableHead className="text-white text-right">Debit (£)</TableHead>
                    <TableHead className="text-white text-right">Credit (£)</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(formData.journalLines || []).map((line) => (
                    <TableRow key={line.id}>
                      <TableCell className="text-[#001f3f] font-semibold">{line.accountCode}</TableCell>
                      <TableCell className="text-[#001f3f]">{line.accountName}</TableCell>
                      <TableCell className="text-[#001f3f] text-sm">{line.description}</TableCell>
                      <TableCell className="text-[#001f3f] text-right font-semibold">
                        {line.debit > 0 ? line.debit.toFixed(2) : ''}
                      </TableCell>
                      <TableCell className="text-[#001f3f] text-right font-semibold">
                        {line.credit > 0 ? line.credit.toFixed(2) : ''}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEditLine(line)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteJournalLine(line.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-100 font-bold">
                    <TableCell colSpan={3} className="text-[#001f3f] text-right">TOTALS:</TableCell>
                    <TableCell className="text-[#001f3f] text-right">{(formData.totalDebit || 0).toFixed(2)}</TableCell>
                    <TableCell className="text-[#001f3f] text-right">{(formData.totalCredit || 0).toFixed(2)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Balance Indicator */}
            <div className="flex items-center gap-2">
              {isBalanced() ? (
                <Badge className="bg-green-600">✓ Balanced</Badge>
              ) : (
                <Badge className="bg-red-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Out of Balance: £{Math.abs((formData.totalDebit || 0) - (formData.totalCredit || 0)).toFixed(2)}
                </Badge>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <Label className="text-[#001f3f] font-semibold">Notes</Label>
            <Textarea
              value={formData.notes || ''}
              onChange={(e) => updateField('notes', e.target.value)}
              className="text-[#001f3f] border-[#001f3f]"
              placeholder="Additional notes or explanations for this adjustment..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-[#001f3f] hover:bg-[#003366]"
            disabled={!isBalanced()}
          >
            <Save className="h-4 w-4 mr-2" />
            {mode === 'add' ? 'Create Adjustment' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
