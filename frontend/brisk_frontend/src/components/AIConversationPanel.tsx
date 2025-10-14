import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Brain, Send, FileText, Download, Trash2, Copy, CheckCircle } from 'lucide-react'
import { AIAdviserEngine, type ConversationMessage, type AIReport } from '@/services/advancedAI'
import notifications from '@/lib/notifications'

interface AIConversationPanelProps {
  module: string
  moduleName: string
  userId?: string
  context?: any
}

export default function AIConversationPanel({
  module,
  moduleName,
  userId,
  context
}: AIConversationPanelProps) {
  const [aiEngine] = useState(() => new AIAdviserEngine(module, userId))
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showReportOptions, setShowReportOptions] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const question = input.trim()
    setInput('')
    setIsLoading(true)

    try {
      const response = await aiEngine.ask(question, context)
      setMessages(aiEngine.getHistory())
      notifications.custom('Response received', 'success')
    } catch (error) {
      console.error('AI Error:', error)
      notifications.custom('Failed to get response', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleGenerateReport = async () => {
    setIsLoading(true)
    try {
      const topic = 'Tax Planning Analysis'
      const report = await aiEngine.generateReport(topic, context)
      
      downloadReport(report)
      notifications.saved('Report Generated', 'Professional report ready for download')
    } catch (error) {
      console.error('Report generation error:', error)
      notifications.custom('Failed to generate report', 'error')
    } finally {
      setIsLoading(false)
      setShowReportOptions(false)
    }
  }

  const downloadReport = (report: AIReport) => {
    const reportContent = formatReportAsHTML(report)
    const blob = new Blob([reportContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${report.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`
    link.click()
    URL.revokeObjectURL(url)
  }

  const formatReportAsHTML = (report: AIReport): string => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${report.title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    h1 { color: #001f3f; border-bottom: 3px solid #001f3f; padding-bottom: 10px; }
    h2 { color: #001f3f; margin-top: 30px; }
    .executive-summary { background: #f0f4f8; padding: 20px; border-left: 4px solid #001f3f; margin: 20px 0; }
    .section { margin: 30px 0; }
    .recommendations { background: #e8f5e9; padding: 15px; border-radius: 5px; }
    .action-items { margin-top: 20px; }
    .action-item { padding: 10px; margin: 10px 0; border-left: 4px solid #ff9800; background: #fff3e0; }
    .high-priority { border-left-color: #f44336; background: #ffebee; }
    .medium-priority { border-left-color: #ff9800; background: #fff3e0; }
    .low-priority { border-left-color: #4caf50; background: #e8f5e9; }
    .metadata { color: #666; font-size: 0.9em; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <h1>${report.title}</h1>
  
  ${report.generatedFor ? `<p><strong>Prepared for:</strong> ${report.generatedFor}</p>` : ''}
  <p><strong>Generated:</strong> ${new Date(report.generatedAt).toLocaleString('en-GB')}</p>
  
  <div class="executive-summary">
    <h2>Executive Summary</h2>
    <p>${report.executiveSummary}</p>
  </div>
  
  ${report.sections.map(section => `
    <div class="section">
      <h2>${section.heading}</h2>
      <p>${section.content}</p>
      ${section.subsections ? section.subsections.map(sub => `
        <h3>${sub.heading}</h3>
        <p>${sub.content}</p>
      `).join('') : ''}
    </div>
  `).join('')}
  
  <div class="recommendations">
    <h2>Recommendations</h2>
    <ul>
      ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
    </ul>
  </div>
  
  <div class="action-items">
    <h2>Action Items</h2>
    ${report.actionItems.map(item => `
      <div class="action-item ${item.priority}-priority">
        <strong>${item.priority.toUpperCase()}:</strong> ${item.task}
        ${item.deadline ? `<br><small>Deadline: ${item.deadline}</small>` : ''}
        ${item.responsible ? `<br><small>Responsible: ${item.responsible}</small>` : ''}
      </div>
    `).join('')}
  </div>
  
  <div class="metadata">
    <p><em>This report was generated by ${moduleName} AI Adviser using real-time data from HMRC, Companies House, and other official sources. All information is current as of the generation date.</em></p>
  </div>
</body>
</html>
    `
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    notifications.custom('Copied to clipboard', 'success')
  }

  const clearConversation = () => {
    aiEngine.clearHistory()
    setMessages([])
    notifications.custom('Conversation cleared', 'success')
  }

  const exportConversation = () => {
    const exported = aiEngine.exportConversation()
    const blob = new Blob([exported], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ai-conversation-${module}-${new Date().toISOString()}.json`
    link.click()
    URL.revokeObjectURL(url)
    notifications.saved('Conversation Exported', 'Conversation history saved')
  }

  const suggestedQuestions = [
    "What are the key deadlines I need to be aware of?",
    "Can you explain the current tax rates?",
    "What are best practices for compliance?",
    "Generate a comprehensive report on my situation",
    "What recent legislative changes should I know about?"
  ]

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-[#001f3f]" />
            <div>
              <CardTitle className="text-[#001f3f]">AI Professional Adviser</CardTitle>
              <CardDescription>Real-time guidance with HMRC & Companies House integration</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReportOptions(true)}
              className="border-[#001f3f] text-[#001f3f]"
            >
              <FileText className="h-4 w-4 mr-1" />
              Generate Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportConversation}
              className="border-[#001f3f] text-[#001f3f]"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearConversation}
              className="border-red-600 text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Brain className="h-12 w-12 mx-auto mb-4 text-[#001f3f] opacity-30" />
              <p className="text-lg font-medium">Start a conversation</p>
              <p className="text-sm mt-2">Ask me anything about {moduleName}</p>
              
              <div className="mt-6 space-y-2">
                <p className="text-sm font-medium text-[#001f3f]">Suggested questions:</p>
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(q)}
                    className="block w-full text-left text-sm p-2 hover:bg-blue-50 rounded border border-gray-200 text-[#001f3f]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.role === 'user'
                      ? 'bg-[#001f3f] text-white'
                      : 'bg-white border-2 border-[#001f3f]'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-[#001f3f]" />
                      <span className="text-xs font-semibold text-[#001f3f]">Professional Adviser</span>
                      <button
                        onClick={() => copyMessage(msg.content)}
                        className="ml-auto text-[#001f3f] hover:text-[#003366]"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  
                  <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'text-white' : 'text-[#001f3f]'}`}>
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                  
                  {msg.metadata && (
                    <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
                      <div className="flex items-center gap-2 flex-wrap">
                        {msg.metadata.sources && msg.metadata.sources.length > 0 && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>Sources: {msg.metadata.sources.join(', ')}</span>
                          </div>
                        )}
                        <span className="text-gray-400">•</span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString('en-GB')}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-[#001f3f] rounded-lg p-4 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-[#001f3f] animate-pulse" />
                  <span className="text-sm text-[#001f3f]">Analyzing and fetching real-time data...</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#001f3f] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-[#001f3f] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[#001f3f] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask your professional adviser anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 border-[#001f3f]"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-[#001f3f] hover:bg-[#003366]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      
      {/* Report Generation Dialog */}
      {showReportOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Generate Professional Report</CardTitle>
              <CardDescription>Create a comprehensive client-ready report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  The report will include:
                </p>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>✓ Executive summary</li>
                  <li>✓ Detailed analysis with real-time data</li>
                  <li>✓ Professional recommendations</li>
                  <li>✓ Action items with deadlines</li>
                  <li>✓ Legislative references</li>
                  <li>✓ HMRC/Companies House citations</li>
                </ul>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleGenerateReport}
                  className="flex-1 bg-[#001f3f] hover:bg-[#003366]"
                  disabled={isLoading}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowReportOptions(false)}
                  className="border-[#001f3f] text-[#001f3f]"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  )
}
