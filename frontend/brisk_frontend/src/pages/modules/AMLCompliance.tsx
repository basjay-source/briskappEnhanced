import { Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AMLCompliance() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AML/KYC Compliance</h1>
          <p className="text-gray-600 mt-2">Risk assessment, identity verification, and compliance monitoring</p>
        </div>
        <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
          New Risk Assessment
        </Button>
      </div>

      <div className="text-center py-20">
        <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">AML/KYC Module</h2>
        <p className="text-gray-600 mb-6">
          Comprehensive anti-money laundering and know your customer compliance tools.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge className="bg-red-100 text-red-800">Risk Assessment</Badge>
          <Badge className="bg-blue-100 text-blue-800">Identity Verification</Badge>
          <Badge className="bg-green-100 text-green-800">Compliance Monitoring</Badge>
        </div>
      </div>
    </div>
  )
}
