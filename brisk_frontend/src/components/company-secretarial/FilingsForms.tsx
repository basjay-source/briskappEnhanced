import React, { useState, useEffect } from 'react'
import HMRCLogo from '../logos/HMRCLogo'
import CompaniesHouseLogo from '../logos/CompaniesHouseLogo'

interface Filing {
  id: string
  formType: string
  companyName: string
  filingDate: string
  status: 'Draft' | 'Submitted' | 'Accepted' | 'Rejected'
  reference?: string
  description: string
}

interface CompaniesHouseForm {
  code: string
  name: string
  description: string
  category: 'Incorporation' | 'Officers' | 'PSC' | 'Share Capital' | 'Charges' | 'Address/Name' | 'Articles' | 'Annual'
  pages: number
  fee: string
}

interface HMRCForm {
  code: string
  name: string
  description: string
  category: 'VAT' | 'PAYE' | 'Corporation Tax' | 'ERS' | 'CIS' | 'Registration'
  pages: number
  online: boolean
}

const FilingsForms: React.FC = () => {
  const [activeTab, setActiveTab] = useState('confirmation-statement')
  const [filings, setFilings] = useState<Filing[]>([])
  const [activeForm, setActiveForm] = useState<string | null>(null)
  const [formStep, setFormStep] = useState(1)
  const [companiesHouseForms] = useState<CompaniesHouseForm[]>([
    { code: 'CS01', name: 'Confirmation Statement', description: 'Annual confirmation of company details', category: 'Annual', pages: 4, fee: '£13' },
    
    { code: 'AP01', name: 'Appointment of Director', description: 'Appoint a company director', category: 'Officers', pages: 6, fee: '£13' },
    { code: 'AP02', name: 'Appointment of Director (Corporate)', description: 'Appoint a corporate director', category: 'Officers', pages: 8, fee: '£13' },
    { code: 'AP03', name: 'Appointment of Secretary', description: 'Appoint a company secretary', category: 'Officers', pages: 4, fee: '£13' },
    { code: 'AP04', name: 'Appointment of Secretary (Corporate)', description: 'Appoint a corporate secretary', category: 'Officers', pages: 6, fee: '£13' },
    { code: 'TM01', name: 'Termination of Director', description: 'Remove a company director', category: 'Officers', pages: 3, fee: '£13' },
    { code: 'TM02', name: 'Termination of Secretary', description: 'Remove a company secretary', category: 'Officers', pages: 3, fee: '£13' },
    { code: 'CH01', name: 'Change of Director Details', description: 'Update director information', category: 'Officers', pages: 5, fee: '£13' },
    { code: 'CH02', name: 'Change of Secretary Details', description: 'Update secretary information', category: 'Officers', pages: 4, fee: '£13' },
    
    { code: 'PSC01', name: 'PSC Notification', description: 'Notify PSC details', category: 'PSC', pages: 8, fee: '£13' },
    { code: 'PSC02', name: 'PSC Change', description: 'Change PSC details', category: 'PSC', pages: 6, fee: '£13' },
    { code: 'PSC03', name: 'PSC Cessation', description: 'Cease to be a PSC', category: 'PSC', pages: 4, fee: '£13' },
    { code: 'PSC04', name: 'PSC Statement', description: 'PSC statement of investigation', category: 'PSC', pages: 3, fee: '£13' },
    { code: 'PSC05', name: 'PSC Statement Withdrawal', description: 'Withdraw PSC statement', category: 'PSC', pages: 2, fee: '£13' },
    { code: 'PSC06', name: 'PSC Relevant Legal Entity', description: 'Relevant legal entity notification', category: 'PSC', pages: 6, fee: '£13' },
    { code: 'PSC07', name: 'PSC RLE Change', description: 'Change RLE details', category: 'PSC', pages: 5, fee: '£13' },
    { code: 'PSC08', name: 'PSC RLE Cessation', description: 'RLE ceases to be relevant', category: 'PSC', pages: 3, fee: '£13' },
    { code: 'PSC09', name: 'PSC Super Secure', description: 'Super secure PSC application', category: 'PSC', pages: 12, fee: '£100' },
    
    { code: 'SH01', name: 'Allotment of Shares', description: 'Return of allotment of shares', category: 'Share Capital', pages: 5, fee: '£13' },
    { code: 'SH02', name: 'Notice of Consolidation', description: 'Consolidation, division, subdivision of shares', category: 'Share Capital', pages: 4, fee: '£13' },
    { code: 'SH03', name: 'Return of Purchase', description: 'Return of purchase of own shares', category: 'Share Capital', pages: 6, fee: '£13' },
    { code: 'SH06', name: 'Notice of Name/Rights Change', description: 'Change of name or rights of shares', category: 'Share Capital', pages: 3, fee: '£13' },
    { code: 'SH19', name: 'Statement of Capital', description: 'Statement of capital following share reorganisation', category: 'Share Capital', pages: 4, fee: '£13' },
    
    { code: 'MR01', name: 'Register of Charges', description: 'Particulars of mortgage or charge', category: 'Charges', pages: 6, fee: '£13' },
    { code: 'MR02', name: 'Charge Amendment', description: 'Amendment to registered charge', category: 'Charges', pages: 4, fee: '£13' },
    { code: 'MR04', name: 'Satisfaction of Charge', description: 'Full or partial satisfaction of charge', category: 'Charges', pages: 3, fee: '£13' },
    { code: 'MR05', name: 'Release of Property', description: 'Release of property from charge', category: 'Charges', pages: 4, fee: '£13' },
    
    { code: 'AD01', name: 'Change of Registered Office', description: 'Change registered office address', category: 'Address/Name', pages: 2, fee: '£13' },
    { code: 'NM01', name: 'Change of Name', description: 'Change of company name', category: 'Address/Name', pages: 3, fee: '£13' },
    { code: 'NM04', name: 'Change of Name (Exempt)', description: 'Change of name by exempt company', category: 'Address/Name', pages: 4, fee: '£13' },
    
    { code: 'CC04', name: 'Statement of Compliance', description: 'Statement of compliance (articles)', category: 'Articles', pages: 2, fee: '£13' },
    
    { code: 'IN01', name: 'Application for Registration', description: 'Application to register a company', category: 'Incorporation', pages: 12, fee: '£12' },
    { code: 'AA01', name: 'Change of Accounting Reference Date', description: 'Change accounting reference date', category: 'Annual', pages: 2, fee: '£13' }
  ])

  const [hmrcForms] = useState<HMRCForm[]>([
    { code: 'VAT1', name: 'VAT Registration', description: 'Application to register for VAT', category: 'VAT', pages: 8, online: true },
    { code: 'VAT2', name: 'VAT Group Registration', description: 'Application for VAT group registration', category: 'VAT', pages: 12, online: true },
    { code: 'VAT68', name: 'VAT Deregistration', description: 'Application to cancel VAT registration', category: 'VAT', pages: 4, online: true },
    { code: 'VAT100', name: 'VAT Return', description: 'VAT return for accounting period', category: 'VAT', pages: 4, online: true },
    { code: 'VAT652', name: 'Notification of Changes', description: 'Notification of changes to VAT registration', category: 'VAT', pages: 6, online: true },
    
    { code: 'P46(Car)', name: 'PAYE Registration', description: 'Register as an employer for PAYE', category: 'PAYE', pages: 6, online: true },
    { code: 'P35', name: 'Employer Annual Return', description: 'End of year return for employers', category: 'PAYE', pages: 8, online: true },
    { code: 'P14', name: 'End of Year Summary', description: 'End of year summary for each employee', category: 'PAYE', pages: 2, online: true },
    { code: 'P60', name: 'End of Year Certificate', description: 'End of year certificate to employee', category: 'PAYE', pages: 1, online: false },
    { code: 'P45', name: 'Details of Employee Leaving', description: 'Details of employee leaving work', category: 'PAYE', pages: 4, online: true },
    { code: 'P46', name: 'Employee Without P45', description: 'Employee starting work without P45', category: 'PAYE', pages: 2, online: true },
    { code: 'P11D', name: 'Expenses and Benefits', description: 'Return of expenses payments and benefits', category: 'PAYE', pages: 6, online: true },
    { code: 'P11D(b)', name: 'Class 1A NIC Return', description: 'Return of Class 1A National Insurance', category: 'PAYE', pages: 2, online: true },
    
    { code: 'CT600', name: 'Corporation Tax Return', description: 'Company tax return', category: 'Corporation Tax', pages: 16, online: true },
    { code: 'CT603', name: 'Accounting Period Notification', description: 'Notice of accounting period', category: 'Corporation Tax', pages: 4, online: true },
    { code: 'CT41G', name: 'Corporation Tax Registration', description: 'Register for Corporation Tax', category: 'Registration', pages: 8, online: true },
    
    { code: 'ERS1', name: 'ERS Annual Return', description: 'Employment related securities annual return', category: 'ERS', pages: 12, online: true },
    { code: 'EMI1', name: 'EMI Notification', description: 'Enterprise Management Incentive notification', category: 'ERS', pages: 8, online: true },
    { code: 'EMI2', name: 'EMI Annual Declaration', description: 'EMI annual declaration of compliance', category: 'ERS', pages: 4, online: true },
    { code: 'CSOP1', name: 'CSOP Notification', description: 'Company Share Option Plan notification', category: 'ERS', pages: 6, online: true },
    
    { code: 'CIS300', name: 'CIS Registration', description: 'Register for Construction Industry Scheme', category: 'CIS', pages: 8, online: true },
    { code: 'CIS301', name: 'Monthly Return', description: 'CIS monthly return', category: 'CIS', pages: 6, online: true },
    { code: 'CIS302', name: 'Subcontractor Verification', description: 'Verify subcontractor for CIS', category: 'CIS', pages: 2, online: true }
  ])

  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'confirmation-statement', label: 'Confirmation Statement (CS01)', icon: '📋' },
    { id: 'officers', label: 'Officers (AP01/TM01 etc.)', icon: '👤' },
    { id: 'psc', label: 'PSC (PSC01–09)', icon: '👥' },
    { id: 'share-capital', label: 'Share Capital (SH01/03/06)', icon: '📈' },
    { id: 'charges', label: 'Charges (MR01/04/05)', icon: '🏦' },
    { id: 'address-name', label: 'Address/Name (AD01/NM01)', icon: '📝' },
    { id: 'articles', label: 'Articles (CC04)', icon: '📄' },
    { id: 'hmrc-forms', label: 'HMRC Forms', icon: '🏛️' },
    { id: 'companies-house', label: 'Companies House Forms', icon: '🏢' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setFilings([
        {
          id: '1',
          formType: 'CS01',
          companyName: 'Acme Corporation Limited',
          filingDate: '2024-02-15',
          status: 'Draft',
          description: 'Annual confirmation statement'
        },
        {
          id: '2',
          formType: 'AP01',
          companyName: 'Beta Industries Limited',
          filingDate: '2024-01-20',
          status: 'Accepted',
          reference: 'AP01-2024-001',
          description: 'Director appointment - Sarah Johnson'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Submitted': 'bg-blue-100 text-blue-800',
      'Accepted': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getFormName = (formCode: string) => {
    const allForms = [...companiesHouseForms, ...hmrcForms]
    const form = allForms.find(f => f.code === formCode)
    return form?.name || formCode
  }

  const getFormPages = (formCode: string) => {
    const allForms = [...companiesHouseForms, ...hmrcForms]
    const form = allForms.find(f => f.code === formCode)
    return form?.pages || 1
  }

  const renderFormWizard = (formCode: string, formName: string, pages: number) => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{formCode} - {formName}</h3>
            <p className="text-sm text-gray-600">Multi-page form wizard ({pages} pages)</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Page 1 of {pages}</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(1/pages) * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Number</label>
                <input
                  type="text"
                  value="12345678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value="Acme Corporation Limited"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filing Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Form Information</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>• Filing fee: £13 (online)</div>
                  <div>• Processing time: 24 hours</div>
                  <div>• Authentication required</div>
                  <div>• Digital signature needed</div>
                </div>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Pre-validation</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <div>✓ Company details verified</div>
                  <div>✓ Officer information complete</div>
                  <div>✓ PSC register up to date</div>
                  <div>✓ Share capital confirmed</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button 
              onClick={() => {
                if (formStep > 1) {
                  setFormStep(formStep - 1)
                } else {
                  setActiveForm(null)
                  setFormStep(1)
                }
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              ← Previous
            </button>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                Save Draft
              </button>
              <button 
                onClick={() => {
                  const form = companiesHouseForms.find(f => f.code === activeForm) || hmrcForms.find(f => f.code === activeForm)
                  if (form && formStep < form.pages) {
                    setFormStep(formStep + 1)
                  } else {
                    alert('Form submitted successfully!')
                    setActiveForm(null)
                    setFormStep(1)
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {(() => {
                  const form = companiesHouseForms.find(f => f.code === activeForm) || hmrcForms.find(f => f.code === activeForm)
                  return form && formStep >= form.pages ? 'Submit' : 'Next →'
                })()}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    if (activeForm) {
      const form = companiesHouseForms.find(f => f.code === activeForm) || hmrcForms.find(f => f.code === activeForm)
      if (form) {
        return renderFormWizard(activeForm, form.name, form.pages)
      }
    }

    switch (activeTab) {
      case 'confirmation-statement':
        return renderFormWizard('CS01', 'Confirmation Statement', 4)
      case 'officers':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companiesHouseForms.filter(form => form.category === 'Officers').map((form) => (
                <div key={form.code} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{form.code}</h4>
                    <span className="text-sm text-gray-500">{form.fee}</span>
                  </div>
                  <h5 className="text-sm font-medium text-gray-800 mb-2">{form.name}</h5>
                  <p className="text-xs text-gray-600 mb-3">{form.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{form.pages} pages</span>
                    <button 
                      onClick={() => {
                        setActiveForm(form.code)
                        setFormStep(1)
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                    >
                      Start Form
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'psc':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companiesHouseForms.filter(form => form.category === 'PSC').map((form) => (
                <div key={form.code} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{form.code}</h4>
                    <span className="text-sm text-gray-500">{form.fee}</span>
                  </div>
                  <h5 className="text-sm font-medium text-gray-800 mb-2">{form.name}</h5>
                  <p className="text-xs text-gray-600 mb-3">{form.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{form.pages} pages</span>
                    <button 
                      onClick={() => {
                        setActiveForm(form.code)
                        setFormStep(1)
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                    >
                      Start Form
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'share-capital':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companiesHouseForms.filter(form => form.category === 'Share Capital').map((form) => (
                <div key={form.code} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{form.code}</h4>
                    <span className="text-sm text-gray-500">{form.fee}</span>
                  </div>
                  <h5 className="text-sm font-medium text-gray-800 mb-2">{form.name}</h5>
                  <p className="text-xs text-gray-600 mb-3">{form.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{form.pages} pages</span>
                    <button 
                      onClick={() => {
                        setActiveForm(form.code)
                        setFormStep(1)
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                    >
                      Start Form
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'charges':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companiesHouseForms.filter(form => form.category === 'Charges').map((form) => (
                <div key={form.code} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{form.code}</h4>
                    <span className="text-sm text-gray-500">{form.fee}</span>
                  </div>
                  <h5 className="text-sm font-medium text-gray-800 mb-2">{form.name}</h5>
                  <p className="text-xs text-gray-600 mb-3">{form.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{form.pages} pages</span>
                    <button 
                      onClick={() => {
                        setActiveForm(form.code)
                        setFormStep(1)
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                    >
                      Start Form
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'address-name':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companiesHouseForms.filter(form => form.category === 'Address/Name').map((form) => (
                <div key={form.code} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{form.code}</h4>
                    <span className="text-sm text-gray-500">{form.fee}</span>
                  </div>
                  <h5 className="text-sm font-medium text-gray-800 mb-2">{form.name}</h5>
                  <p className="text-xs text-gray-600 mb-3">{form.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{form.pages} pages</span>
                    <button 
                      onClick={() => {
                        setActiveForm(form.code)
                        setFormStep(1)
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                    >
                      Start Form
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'articles':
        return renderFormWizard('CC04', 'Statement of Compliance (Articles)', 2)
      case 'hmrc-forms':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <HMRCLogo className="h-10 w-auto" showText={true} />
                <h3 className="text-lg font-semibold text-green-800">HMRC Forms Library</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {hmrcForms.map((form) => (
                  <div key={form.code} className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer" style={{ borderColor: '#00703c' }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{form.code}</h4>
                      <div className="flex items-center space-x-1">
                        {form.online && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Online</span>}
                        <span className="text-xs" style={{ color: '#00703c' }}>{form.category}</span>
                      </div>
                    </div>
                    <h5 className="text-sm font-medium text-gray-800 mb-2">{form.name}</h5>
                    <p className="text-xs text-gray-600 mb-3">{form.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{form.pages} pages</span>
                      <button 
                        onClick={() => {
                          setActiveForm(form.code)
                          setFormStep(1)
                        }}
                        className="px-3 py-1 text-white text-xs rounded hover:opacity-90 transition-colors"
                        style={{ backgroundColor: '#00703c' }}
                      >
                        Start Form
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VAT Registration Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <HMRCLogo className="h-8 w-auto" showText={false} />
                <h3 className="text-lg font-semibold text-green-800">VAT Registration</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600">
                      <option>Sole trader</option>
                      <option>Partnership</option>
                      <option>Limited company</option>
                      <option>Limited liability partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration Reason</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600">
                      <option>Taxable turnover exceeded £85,000</option>
                      <option>Voluntary registration</option>
                      <option>Distance selling</option>
                      <option>Acquisitions from EU</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Turnover</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Annual turnover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f8f0', borderColor: '#00703c', borderWidth: '1px' }}>
                    <h4 className="font-medium mb-2" style={{ color: '#00703c' }}>VAT Registration Checklist</h4>
                    <div className="text-sm space-y-1" style={{ color: '#00703c' }}>
                      <div>• Business registration details</div>
                      <div>• Bank account information</div>
                      <div>• Expected business activities</div>
                      <div>• Turnover estimates</div>
                      <div>• Principal place of business</div>
                    </div>
                  </div>
                  <button 
                    className="w-full px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors"
                    style={{ backgroundColor: '#00703c' }}
                  >
                    Start VAT Registration (VAT1)
                  </button>
                </div>
              </div>
            </div>

            {/* PAYE Registration Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <HMRCLogo className="h-8 w-auto" showText={false} />
                <h3 className="text-lg font-semibold text-green-800">PAYE Registration</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Employee Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Expected number of employees"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payroll Frequency</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600">
                      <option>Weekly</option>
                      <option>Fortnightly</option>
                      <option>4-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f8f0', borderColor: '#00703c', borderWidth: '1px' }}>
                    <h4 className="font-medium mb-2" style={{ color: '#00703c' }}>PAYE Registration Requirements</h4>
                    <div className="text-sm space-y-1" style={{ color: '#00703c' }}>
                      <div>• Company registration number</div>
                      <div>• Business bank account details</div>
                      <div>• Contact information</div>
                      <div>• Expected payroll start date</div>
                      <div>• Workplace pension details</div>
                    </div>
                  </div>
                  <button 
                    className="w-full px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors"
                    style={{ backgroundColor: '#00703c' }}
                  >
                    Start PAYE Registration
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      case 'companies-house':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CompaniesHouseLogo className="h-10 w-auto" showText={true} />
                <h3 className="text-lg font-semibold text-blue-800">Companies House Forms Library</h3>
              </div>
              
              {/* Group forms by category */}
              {['Incorporation', 'Annual', 'Officers', 'PSC', 'Share Capital', 'Charges', 'Address/Name', 'Articles'].map((category) => (
                <div key={category} className="mb-8">
                  <h4 className="text-md font-medium text-blue-800 mb-4 pb-2 border-b border-blue-200">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {companiesHouseForms.filter(form => form.category === category).map((form) => (
                      <div key={form.code} className="border border-blue-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-blue-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <CompaniesHouseLogo className="h-6 w-auto" showText={false} />
                            <h5 className="font-medium text-gray-900">{form.code}</h5>
                          </div>
                          <span className="text-sm text-blue-600">{form.fee}</span>
                        </div>
                        <h6 className="text-sm font-medium text-blue-800 mb-2">{form.name}</h6>
                        <p className="text-xs text-gray-600 mb-3">{form.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{form.pages} pages</span>
                          <button 
                            onClick={() => {
                              setActiveForm(form.code)
                              setFormStep(1)
                            }}
                            className="px-3 py-1 text-white text-xs rounded hover:opacity-90 transition-colors" 
                            style={{ backgroundColor: '#003078' }}
                          >
                            Start Form
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return <div>Content not found</div>
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Filings &amp; Forms</h1>
          <p className="text-gray-600">Complete and submit government forms with multi-page workflows</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Quick Filing
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Filing History
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {activeForm ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setActiveForm('')
                setFormStep(1)
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <span>←</span>
              <span>Back to Forms</span>
            </button>
          </div>
          {renderFormWizard(activeForm, getFormName(activeForm), getFormPages(activeForm))}
        </div>
      ) : (
        renderTabContent()
      )}

      {!activeForm && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Filings</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filing Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filings.map((filing) => (
              <tr key={filing.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{filing.formType}</div>
                  <div className="text-sm text-gray-500">{filing.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {filing.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(filing.filingDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {filing.reference || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(filing.status)}`}>
                    {filing.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Submit</button>
                  <button className="text-gray-600 hover:text-gray-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  )
}

export default FilingsForms
