import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertCircle, Save, Plus, Trash2 } from 'lucide-react'
import { getAllAccounts } from '@/data/chartOfAccounts'

const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

interface JournalLine {
  id: string
  accountCode: string
  accountName: string
  description: string
  debit: number
  credit: number
}

interface JournalEntry {
  id?: string
  reference: string
  date: string
  description: string
  journalLines: JournalLine[]
  totalDebit: number
  totalCredit: number
  notes?: string
}

interface BookkeepingJournalFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  journalEntry?: JournalEntry
  onSave: (entry: Partial<JournalEntry>) => void
  mode: 'add' | 'edit'
}

export const BookkeepingJournalForm: React.FC<BookkeepingJournalFormProps> = ({
  open,
  onOpenChange,
  journalEntry,
  onSave,
  mode
}) => {
  const getInitialLines = (): JournalLine[] => {
    if (journalEntry?.journalLines && journalEntry.journalLines.length > 0) {
      return journalEntry.journalLines
    }
    return [
      { id: generateUniqueId(), accountCode: '', accountName: '', description: '', debit: 0, credit: 0 },
      { id: generateUniqueId(), accountCode: '', accountName: '', description: '', debit: 0, credit: 0 }
    ]
  }

  const [formData, setFormData] = useState<Partial<JournalEntry>>(journalEntry || {
    reference: `JE-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    journalLines: getInitialLines(),
    totalDebit: 0,
    totalCredit: 0
  })

  const [activeSearchRow, setActiveSearchRow] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const chartAccounts = getAllAccounts()

  useEffect(() => {
    if (open) {
      setFormData(journalEntry || {
        reference: `JE-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        journalLines: getInitialLines(),
        totalDebit: 0,
        totalCredit: 0
      })
      setActiveSearchRow(null)
      setSearchQuery('')
    }
  }, [open])

  useEffect(() => {
    calculateTotals()
  }, [formData.journalLines])

  const updateField = (field: keyof JournalEntry, value: any) => {
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

  const addNewLine = () => {
    const newLine: JournalLine = {
      id: generateUniqueId(),
      accountCode: '',
      accountName: '',
      description: '',
      debit: 0,
      credit: 0
    }
    updateField('journalLines', [...(formData.journalLines || []), newLine])
  }

  const updateLine = (lineId: string, field: keyof JournalLine, value: any) => {
    const updatedLines = (formData.journalLines || []).map(line => {
      if (line.id === lineId) {
        const updated = { ...line, [field]: value }
        
        if (field === 'debit' && value > 0) {
          updated.credit = 0
        }
        if (field === 'credit' && value > 0) {
          updated.debit = 0
        }
        
        return updated
      }
      return line
    })
    updateField('journalLines', updatedLines)
  }

  const deleteLine = (lineId: string) => {
    const filteredLines = (formData.journalLines || []).filter(line => line.id !== lineId)
    if (filteredLines.length < 2) {
      alert('You must have at least 2 journal lines (one debit and one credit)')
      return
    }
    updateField('journalLines', filteredLines)
  }

  const handleAccountCodeChange = (lineId: string, code: string) => {
    updateLine(lineId, 'accountCode', code)
    
    const exactMatch = chartAccounts.find(acc => acc.code === code)
    if (exactMatch) {
      updateLine(lineId, 'accountName', exactMatch.name)
      setActiveSearchRow(null)
    } else {
      setSearchQuery(code)
      if (code.length > 0) {
        setActiveSearchRow(lineId)
      } else {
        setActiveSearchRow(null)
      }
    }
  }

  const selectAccountForLine = (lineId: string, account: any) => {
    updateLine(lineId, 'accountCode', account.code)
    updateLine(lineId, 'accountName', account.name)
    setActiveSearchRow(null)
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
    
    const validLines = (formData.journalLines || []).filter(line => 
      line.accountCode && line.accountName && (line.debit > 0 || line.credit > 0)
    )
    
    if (validLines.length === 0) {
      alert('Cannot save a blank journal. Please add journal entries with amounts, or save as Draft.')
      return
    }
    
    if (validLines.length < 2) {
      alert('Please add at least 2 journal lines (minimum one debit and one credit)')
      return
    }
    
    const hasDebit = validLines.some(line => line.debit > 0)
    const hasCredit = validLines.some(line => line.credit > 0)
    
    if (!hasDebit || !hasCredit) {
      alert('Journal must have at least one debit entry and one credit entry')
      return
    }
    
    if (!isBalanced()) {
      alert('Journal is not balanced! Total debits must equal total credits.')
      return
    }

    onSave({ ...formData, journalLines: validLines })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto border-2 border-[#001f3f]">
        <DialogHeader>
          <DialogTitle className="text-[#001f3f] text-2xl">
            {mode === 'add' ? 'Add Journal Entry' : 'Edit Journal Entry'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label className="text-[#001f3f] font-semibold">Reference Number *</Label>
              <Input
                value={formData.reference || ''}
                onChange={(e) => updateField('reference', e.target.value)}
                className="text-[#001f3f] border-[#001f3f]"
                placeholder="JE-001"
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

            <div className="col-span-1"></div>

            <div className="col-span-3">
              <Label className="text-[#001f3f] font-semibold">Description *</Label>
              <Input
                value={formData.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                className="text-[#001f3f] border-[#001f3f]"
                placeholder="Brief description of journal entry"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#001f3f]">Journal Lines</h3>
              <Button 
                type="button"
                onClick={addNewLine}
                className="bg-[#001f3f] hover:bg-[#003366]"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />Add New Line
              </Button>
            </div>

            <div className="border-2 border-[#001f3f] rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#001f3f]">
                    <TableHead className="text-white w-32">Account Code *</TableHead>
                    <TableHead className="text-white w-64">Account Name</TableHead>
                    <TableHead className="text-white w-80">Description</TableHead>
                    <TableHead className="text-white w-32 text-right">Debit (£)</TableHead>
                    <TableHead className="text-white w-32 text-right">Credit (£)</TableHead>
                    <TableHead className="text-white w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(formData.journalLines || []).map((line) => (
                    <TableRow key={line.id} className="hover:bg-blue-50">
                      <TableCell className="p-2">
                        <div className="relative">
                          <Input
                            value={line.accountCode || ''}
                            onChange={(e) => handleAccountCodeChange(line.id, e.target.value)}
                            className="text-[#001f3f] border-[#001f3f] h-9 text-sm"
                            placeholder="Code"
                          />
                          {activeSearchRow === line.id && filteredAccounts.length > 0 && (
                            <div className="absolute z-50 mt-1 w-80 p-2 border-2 border-[#001f3f] rounded bg-white max-h-60 overflow-y-auto shadow-xl">
                              {filteredAccounts.map((account, idx) => (
                                <div
                                  key={idx}
                                  className="p-2 hover:bg-blue-100 cursor-pointer border-b text-sm"
                                  onClick={() => selectAccountForLine(line.id, account)}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-[#001f3f] min-w-[60px]">{account.code}</span>
                                    <span className="text-xs text-gray-700">-</span>
                                    <span className="text-xs text-gray-700">{account.name}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="p-2">
                        <Input
                          value={line.accountName || ''}
                          onChange={(e) => updateLine(line.id, 'accountName', e.target.value)}
                          className="text-[#001f3f] border-[#001f3f] h-9 text-sm"
                          placeholder="Account name"
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <Input
                          value={line.description || ''}
                          onChange={(e) => updateLine(line.id, 'description', e.target.value)}
                          className="text-[#001f3f] border-[#001f3f] h-9 text-sm"
                          placeholder="Line description"
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <input
                          type="text"
                          defaultValue={line.debit === 0 ? '' : line.debit.toFixed(2)}
                          onBlur={(e) => {
                            const value = e.target.value.trim()
                            if (value === '' || value === '0' || parseFloat(value) === 0) {
                              updateLine(line.id, 'debit', 0)
                              e.target.value = ''
                            } else {
                              const numValue = parseFloat(value)
                              if (!isNaN(numValue)) {
                                updateLine(line.id, 'debit', numValue)
                                e.target.value = numValue.toFixed(2)
                              }
                            }
                          }}
                          className="flex h-9 w-full rounded-md border border-[#001f3f] bg-transparent px-3 py-1 text-sm text-[#001f3f] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-right"
                          placeholder="0.00"
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <input
                          type="text"
                          defaultValue={line.credit === 0 ? '' : line.credit.toFixed(2)}
                          onBlur={(e) => {
                            const value = e.target.value.trim()
                            if (value === '' || value === '0' || parseFloat(value) === 0) {
                              updateLine(line.id, 'credit', 0)
                              e.target.value = ''
                            } else {
                              const numValue = parseFloat(value)
                              if (!isNaN(numValue)) {
                                updateLine(line.id, 'credit', numValue)
                                e.target.value = numValue.toFixed(2)
                              }
                            }
                          }}
                          className="flex h-9 w-full rounded-md border border-[#001f3f] bg-transparent px-3 py-1 text-sm text-[#001f3f] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-right"
                          placeholder="0.00"
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteLine(line.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-100 font-bold">
                    <TableCell colSpan={3} className="text-[#001f3f] text-right text-sm">TOTALS:</TableCell>
                    <TableCell className="text-[#001f3f] text-right text-sm font-bold">
                      £{(formData.totalDebit || 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-[#001f3f] text-right text-sm font-bold">
                      £{(formData.totalCredit || 0).toFixed(2)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center gap-2">
              {isBalanced() ? (
                <Badge className="bg-green-600 text-white">✓ Balanced</Badge>
              ) : (
                <Badge className="bg-red-600 text-white">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Out of Balance: £{Math.abs((formData.totalDebit || 0) - (formData.totalCredit || 0)).toFixed(2)}
                </Badge>
              )}
            </div>
          </div>

          <div>
            <Label className="text-[#001f3f] font-semibold">Notes</Label>
            <Textarea
              value={formData.notes || ''}
              onChange={(e) => updateField('notes', e.target.value)}
              className="text-[#001f3f] border-[#001f3f]"
              placeholder="Additional notes or explanations for this journal entry..."
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
            {mode === 'add' ? 'Create Entry' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
