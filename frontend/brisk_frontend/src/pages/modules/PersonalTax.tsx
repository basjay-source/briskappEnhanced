import { BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PersonalTax() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personal Tax</h1>
          <p className="text-gray-600 mt-2">SA returns, CGT optimization, and tax planning</p>
        </div>
        <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
          New SA Return
        </Button>
      </div>

      <div className="text-center py-20">
        <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Personal Tax Module</h2>
        <p className="text-gray-600 mb-6">
          Complete SA returns, CGT calculations, and personal tax optimization coming soon.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge className="bg-blue-100 text-blue-800">SA100 Returns</Badge>
          <Badge className="bg-green-100 text-green-800">CGT Optimization</Badge>
          <Badge className="bg-purple-100 text-purple-800">Tax Planning</Badge>
        </div>
      </div>
    </div>
  )
}
