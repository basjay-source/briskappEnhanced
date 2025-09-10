import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Bookkeeping() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookkeeping</h1>
          <p className="text-gray-600 mt-2">Bank feeds, VAT MTD, reconciliation, and management accounts</p>
        </div>
        <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
          Connect Bank
        </Button>
      </div>

      <div className="text-center py-20">
        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Bookkeeping Module</h2>
        <p className="text-gray-600 mb-6">
          Automated bookkeeping with bank feeds, VAT MTD, and intelligent categorization.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge className="bg-blue-100 text-blue-800">Bank Feeds</Badge>
          <Badge className="bg-green-100 text-green-800">VAT MTD</Badge>
          <Badge className="bg-purple-100 text-purple-800">Auto Reconciliation</Badge>
        </div>
      </div>
    </div>
  )
}
