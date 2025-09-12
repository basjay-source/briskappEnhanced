import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ChevronLeft, ChevronRight, Save } from 'lucide-react'

interface FormWizardProps {
  title: string
  pages: Array<{
    title: string
    component: React.ReactNode
  }>
  onSubmit: (data: Record<string, string>) => void
  onSaveDraft?: (data: Record<string, string>) => void
  formData: Record<string, string>
  logoComponent?: React.ReactNode
  colorScheme?: 'blue' | 'green'
}

export default function FormWizard({ 
  title, 
  pages, 
  onSubmit, 
  onSaveDraft,
  formData,
  logoComponent,
  colorScheme = 'blue'
}: FormWizardProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft(formData)
    }
  }


  const handlePageJump = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  const headerBgColor = colorScheme === 'green' ? 'bg-[#00703c]' : 'bg-[#003078]'
  const progressColor = colorScheme === 'green' ? 'bg-green-600' : 'bg-blue-600'
  const buttonColor = colorScheme === 'green' ? 'bg-[#00703c] hover:bg-[#005a30]' : 'bg-[#003078] hover:bg-[#002060]'
  const activePageColor = colorScheme === 'green' ? 'bg-green-600' : 'bg-blue-600'
  const textAccentColor = colorScheme === 'green' ? 'text-green-100' : 'text-blue-100'

  return (
    <div className="space-y-6">
      {logoComponent && (
        <div className={`${headerBgColor} text-white p-6 rounded-lg`}>
          <div className="flex items-center space-x-4">
            {logoComponent}
            <div>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className={textAccentColor}>Complete all sections to submit your application</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{pages[currentPage].title}</h3>
        <div className="text-sm text-gray-500">
          Page {currentPage + 1} of {pages.length}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${progressColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
        />
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageJump(index)}
            className={`px-2 py-1 text-xs rounded ${
              index === currentPage
                ? `${activePageColor} text-white`
                : index < currentPage
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{pages[currentPage].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {pages[currentPage].component}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex space-x-2">
          {onSaveDraft && (
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          )}
          
          {currentPage === pages.length - 1 ? (
            <Button onClick={handleSubmit} className={buttonColor}>
              Submit Form
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
