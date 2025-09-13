import { Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function CompanySecretarial() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Secretarial</h1>
          <p className="text-gray-600 mt-2">Companies House filings, PSC registers, and compliance tracking</p>
        </div>
        <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
          New Filing
        </Button>
      </div>

      <div className="text-center py-20">
        <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Company Secretarial Module</h2>
        <p className="text-gray-600 mb-6">
          Streamlined Companies House filings and corporate compliance management.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge className="bg-blue-100 text-blue-800">Companies House</Badge>
          <Badge className="bg-green-100 text-green-800">PSC Registers</Badge>
          <Badge className="bg-purple-100 text-purple-800">Compliance Tracking</Badge>
        </div>
      </div>
    </div>
  )
}
