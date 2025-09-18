import React, { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Badge } from './ui/badge'
import { SearchFilterHeader } from './SearchFilterHeader'
import { 
  ChevronUp, 
  ChevronDown, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  ExternalLink
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface Column {
  id: string
  label: string
  sortable?: boolean
  filterable?: boolean
  type?: 'text' | 'number' | 'date' | 'currency' | 'status' | 'actions'
  width?: string
  render?: (value: any, row: any) => React.ReactNode
  drillDownUrl?: (row: any) => string
}

interface DataGridProps {
  columns: Column[]
  data: any[]
  searchPlaceholder?: string
  onRowClick?: (row: any) => void
  onEdit?: (row: any) => void
  onDelete?: (row: any) => void
  onView?: (row: any) => void
  onBulkAction?: (action: string, selectedRows: any[]) => void
  bulkActions?: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[]
  filters?: { label: string; value: string; options: { label: string; value: string }[] }[]
  savedViews?: { name: string; id: string }[]
  onSaveView?: (name: string) => void
  onLoadView?: (viewId: string) => void
  exportFormats?: ('csv' | 'xlsx' | 'pdf')[]
  onExport?: (format: string, data: any[]) => void
  pageSize?: number
  showPagination?: boolean
  className?: string
}

export function DataGrid({
  columns,
  data,
  searchPlaceholder = "Search...",
  onRowClick,
  onEdit,
  onDelete,
  onView,
  onBulkAction,
  bulkActions = [],
  filters = [],
  savedViews = [],
  onSaveView,
  onLoadView,
  exportFormats = ['csv', 'xlsx', 'pdf'],
  onExport,
  pageSize = 50,
  showPagination = true,
  className = ''
}: DataGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map(col => col.id))
  )

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(row => {
      const searchMatch = searchTerm === '' || 
        Object.values(row).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      
      const filterMatch = Object.entries(activeFilters).every(([key, value]) => {
        if (!value || value === 'all') return true
        return String(row[key]).toLowerCase() === value.toLowerCase()
      })
      
      return searchMatch && filterMatch
    })

    if (sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]
        
        const column = columns.find(col => col.id === sortColumn)
        
        if (column?.type === 'number' || column?.type === 'currency') {
          const aNum = parseFloat(String(aVal).replace(/[^0-9.-]/g, '')) || 0
          const bNum = parseFloat(String(bVal).replace(/[^0-9.-]/g, '')) || 0
          return sortDirection === 'asc' ? aNum - bNum : bNum - aNum
        }
        
        if (column?.type === 'date') {
          const aDate = new Date(aVal).getTime() || 0
          const bDate = new Date(bVal).getTime() || 0
          return sortDirection === 'asc' ? aDate - bDate : bDate - aDate
        }
        
        const aStr = String(aVal).toLowerCase()
        const bStr = String(bVal).toLowerCase()
        
        if (sortDirection === 'asc') {
          return aStr < bStr ? -1 : aStr > bStr ? 1 : 0
        } else {
          return aStr > bStr ? -1 : aStr < bStr ? 1 : 0
        }
      })
    }

    return filtered
  }, [data, searchTerm, sortColumn, sortDirection, activeFilters])

  const paginatedData = useMemo(() => {
    if (!showPagination) return filteredAndSortedData
    const start = (currentPage - 1) * pageSize
    return filteredAndSortedData.slice(start, start + pageSize)
  }, [filteredAndSortedData, currentPage, pageSize, showPagination])

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)

  const handleSort = (columnId: string) => {
    const column = columns.find(col => col.id === columnId)
    if (!column?.sortable) return

    if (sortColumn === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnId)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map(row => row.id)))
    } else {
      setSelectedRows(new Set())
    }
  }

  const handleSelectRow = (rowId: string, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(rowId)
    } else {
      newSelected.delete(rowId)
    }
    setSelectedRows(newSelected)
  }

  const handleBulkAction = (action: string) => {
    const selectedData = data.filter(row => selectedRows.has(row.id))
    onBulkAction?.(action, selectedData)
    setSelectedRows(new Set())
  }

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf') => {
    onExport?.(format, filteredAndSortedData)
  }

  const renderCell = (column: Column, value: any, row: any) => {
    if (column.render) {
      return column.render(value, row)
    }

    switch (column.type) {
      case 'currency':
        const amount = parseFloat(String(value).replace(/[^0-9.-]/g, '')) || 0
        return new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP'
        }).format(amount)
      
      case 'date':
        return new Date(value).toLocaleDateString('en-GB')
      
      case 'number':
        return Number(value).toLocaleString('en-GB')
      
      case 'status':
        const statusColors = {
          active: 'bg-green-100 text-green-800',
          pending: 'bg-white text-black',
          inactive: 'bg-red-100 text-red-800',
          draft: 'bg-gray-100 text-black'
        }
        return (
          <Badge className={statusColors[value as keyof typeof statusColors] || 'bg-gray-100 text-black'}>
            {value}
          </Badge>
        )
      
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            {onView && (
              <Button variant="ghost" size="sm" onClick={() => onView(row)}>
                <Eye className="h-4 w-4 text-white" />
              </Button>
            )}
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={() => onEdit(row)}>
                <Edit className="h-4 w-4 text-white" />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="sm" onClick={() => onDelete(row)}>
                <Trash2 className="h-4 w-4 text-white" />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onView?.(row)}>
                  <Eye className="h-4 w-4 mr-2 text-white" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit?.(row)}>
                  <Edit className="h-4 w-4 mr-2 text-white" />
                  Edit
                </DropdownMenuItem>
                {column.drillDownUrl && (
                  <DropdownMenuItem onClick={() => window.open(column.drillDownUrl!(row), '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2 text-white" />
                    Drill Down
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      
      default:
        if (column.drillDownUrl) {
          return (
            <button
              className="text-brisk-blue-600 hover:text-brisk-orange-600 hover:underline text-left"
              onClick={() => window.open(column.drillDownUrl!(row), '_blank')}
            >
              {value}
            </button>
          )
        }
        return value
    }
  }

  const visibleColumnsArray = columns.filter(col => visibleColumns.has(col.id))

  return (
    <div className={`space-y-4 ${className}`}>
      <SearchFilterHeader
        searchPlaceholder={searchPlaceholder}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters.map(filter => ({
          label: filter.label,
          options: filter.options,
          value: activeFilters[filter.value] || 'all',
          onChange: (value: string) => setActiveFilters(prev => ({ ...prev, [filter.value]: value }))
        }))}
      />

      {selectedRows.size > 0 && bulkActions.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-brisk-blue-50 rounded-brisk-button border border-brisk-navy-blue">
          <span className="text-sm text-brisk-blue-700">
            {selectedRows.size} row(s) selected
          </span>
          {bulkActions.map((action) => (
            <Button
              key={action.value}
              variant="brisk-outline"
              size="sm"
              onClick={() => handleBulkAction(action.value)}
            >
              {action.icon && <action.icon className="h-4 w-4 mr-2 text-white" />}
              {action.label}
            </Button>
          ))}
        </div>
      )}

      <div className="rounded-brisk-button border border-brisk-navy-blue overflow-hidden">
        <Table>
          <TableHeader className="bg-brisk-blue-50">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {visibleColumnsArray.map((column) => (
                <TableHead
                  key={column.id}
                  className={`${column.sortable ? 'cursor-pointer hover:bg-brisk-blue-100' : ''} text-brisk-blue-700 font-semibold`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortColumn === column.id && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="h-4 w-4 text-white" /> : 
                        <ChevronDown className="h-4 w-4 text-white" />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow
                key={row.id || index}
                className={`
                  ${onRowClick ? 'cursor-pointer hover:bg-brisk-blue-50' : ''}
                  ${selectedRows.has(row.id) ? 'bg-brisk-orange-50' : ''}
                  border-brisk-blue-100
                `}
                onClick={() => onRowClick?.(row)}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(row.id)}
                    onCheckedChange={(checked) => handleSelectRow(row.id, checked as boolean)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                {visibleColumnsArray.map((column) => (
                  <TableCell key={column.id} className="text-brisk-blue-900">
                    {renderCell(column, row[column.id], row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-brisk-blue-600">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="brisk-outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-brisk-blue-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="brisk-outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
