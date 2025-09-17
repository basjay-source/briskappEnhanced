import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Brain } from 'lucide-react'

interface AIPromptSectionProps {
  title: string
  description: string
  placeholder: string
  recentQuestions: string[]
  onSubmit: (question: string) => void
  isLoading?: boolean
}

export default function AIPromptSection({
  title,
  description,
  placeholder,
  recentQuestions,
  onSubmit,
  isLoading = false
}: AIPromptSectionProps) {
  const [question, setQuestion] = useState('')

  const handleSubmit = () => {
    if (question.trim()) {
      onSubmit(question.trim())
      setQuestion('')
    }
  }

  const handleQuestionClick = (q: string) => {
    setQuestion(q)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder={placeholder}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1" 
            />
            <Button variant="outline" onClick={handleSubmit} disabled={isLoading || !question.trim()}>
              <Brain className="h-4 w-4 mr-2" />
              Ask Adviser
            </Button>
          </div>
          
          {recentQuestions && recentQuestions.length > 0 && (
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-1">Recent Questions:</p>
                <div className="space-y-1">
                  {recentQuestions.map((q, index) => (
                    <button 
                      key={index}
                      className="text-sm text-blue-600 hover:underline block"
                      onClick={() => handleQuestionClick(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
