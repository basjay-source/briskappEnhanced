import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Image,
  Table,
  Paperclip,
  Palette,
  Type,
  Send,
  Calendar,
  Clock,
  Star,
  Archive,
  FileText
} from 'lucide-react'

interface ComposeData {
  to: string
  cc: string
  bcc: string
  subject: string
  body: string
  priority: 'low' | 'normal' | 'high'
  attachments: File[]
}

interface EmailRibbonProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onFormatAction: (action: string, value?: string) => void
  composeData: ComposeData
  onComposeDataChange: (data: ComposeData) => void
}

export default function EmailRibbon({ 
  activeTab, 
  onTabChange, 
  onFormatAction, 
  composeData, 
  onComposeDataChange 
}: EmailRibbonProps) {
  const tabs = [
    { id: 'home', label: 'Home', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'insert', label: 'Insert', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'format', label: 'Format', color: 'bg-orange-500 hover:bg-orange-600' },
    { id: 'templates', label: 'Templates', color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'send', label: 'Send', color: 'bg-red-500 hover:bg-red-600' }
  ]

  const fontSizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '72']
  const fontFamilies = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia', 'Trebuchet MS']

  const renderHomeTab = () => (
    <div className="flex items-center gap-2 p-3 bg-white border-b">
      <div className="flex items-center gap-1">
        <Select onValueChange={(value) => onFormatAction('fontFamily', value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Arial" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map(font => (
              <SelectItem key={font} value={font}>{font}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select onValueChange={(value) => onFormatAction('fontSize', value)}>
          <SelectTrigger className="w-16">
            <SelectValue placeholder="12" />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map(size => (
              <SelectItem key={size} value={size}>{size}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => onFormatAction('bold')}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onFormatAction('italic')}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onFormatAction('underline')}>
          <Underline className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => onFormatAction('alignLeft')}>
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onFormatAction('alignCenter')}>
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onFormatAction('alignRight')}>
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onFormatAction('alignJustify')}>
          <AlignJustify className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => onFormatAction('bulletList')}>
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onFormatAction('numberedList')}>
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const renderInsertTab = () => (
    <div className="flex items-center gap-2 p-3 bg-white border-b">
      <Button variant="ghost" size="sm" onClick={() => onFormatAction('insertLink')}>
        <Link className="h-4 w-4 mr-2" />
        Link
      </Button>
      
      <Button variant="ghost" size="sm" onClick={() => onFormatAction('insertImage')}>
        <Image className="h-4 w-4 mr-2" />
        Image
      </Button>
      
      <Button variant="ghost" size="sm" onClick={() => onFormatAction('insertTable')}>
        <Table className="h-4 w-4 mr-2" />
        Table
      </Button>
      
      <Button variant="ghost" size="sm" onClick={() => onFormatAction('insertAttachment')}>
        <Paperclip className="h-4 w-4 mr-2" />
        Attachment
      </Button>

      <Separator orientation="vertical" className="h-8" />

      <Button variant="ghost" size="sm" onClick={() => onFormatAction('insertSignature')}>
        <FileText className="h-4 w-4 mr-2" />
        Signature
      </Button>
    </div>
  )

  const renderFormatTab = () => (
    <div className="flex items-center gap-2 p-3 bg-white border-b">
      <Button variant="ghost" size="sm" onClick={() => onFormatAction('textColor')}>
        <Type className="h-4 w-4 mr-2" />
        Text Color
      </Button>
      
      <Button variant="ghost" size="sm" onClick={() => onFormatAction('highlight')}>
        <Palette className="h-4 w-4 mr-2" />
        Highlight
      </Button>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-1">
        <span className="text-sm font-medium">Style:</span>
        <Select onValueChange={(value) => onFormatAction('textStyle', value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Normal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="heading1">Heading 1</SelectItem>
            <SelectItem value="heading2">Heading 2</SelectItem>
            <SelectItem value="heading3">Heading 3</SelectItem>
            <SelectItem value="quote">Quote</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderTemplatesTab = () => (
    <div className="flex items-center gap-2 p-3 bg-white border-b">
      <Button variant="ghost" size="sm" onClick={() => onFormatAction('loadTemplate', 'professional')}>
        <FileText className="h-4 w-4 mr-2" />
        Professional
      </Button>
      
      <Button variant="ghost" size="sm" onClick={() => onFormatAction('loadTemplate', 'followup')}>
        <FileText className="h-4 w-4 mr-2" />
        Follow-up
      </Button>
      
      <Button variant="ghost" size="sm" onClick={() => onFormatAction('loadTemplate', 'meeting')}>
        <FileText className="h-4 w-4 mr-2" />
        Meeting Request
      </Button>

      <Separator orientation="vertical" className="h-8" />

      <Button variant="ghost" size="sm" onClick={() => onFormatAction('saveTemplate')}>
        <Archive className="h-4 w-4 mr-2" />
        Save Template
      </Button>
    </div>
  )

  const renderSendTab = () => (
    <div className="flex items-center gap-2 p-3 bg-white border-b">
      <Button 
        className="bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => onFormatAction('send')}
      >
        <Send className="h-4 w-4 mr-2" />
        Send Now
      </Button>
      
      <Button variant="outline" onClick={() => onFormatAction('schedule')}>
        <Calendar className="h-4 w-4 mr-2" />
        Schedule Send
      </Button>
      
      <Button variant="outline" onClick={() => onFormatAction('delay')}>
        <Clock className="h-4 w-4 mr-2" />
        Delay Delivery
      </Button>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Priority:</span>
        <Select 
          value={composeData.priority} 
          onValueChange={(value) => onComposeDataChange({...composeData, priority: value as 'low' | 'normal' | 'high'})}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="ghost" size="sm" onClick={() => onFormatAction('markImportant')}>
        <Star className="h-4 w-4 mr-2" />
        Important
      </Button>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeTab()
      case 'insert':
        return renderInsertTab()
      case 'format':
        return renderFormatTab()
      case 'templates':
        return renderTemplatesTab()
      case 'send':
        return renderSendTab()
      default:
        return renderHomeTab()
    }
  }

  return (
    <div className="border border-gray-200 rounded-t-lg bg-gray-50">
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium text-white transition-colors ${
              activeTab === tab.id 
                ? `${tab.color} border-b-2 border-white` 
                : `${tab.color} opacity-80 hover:opacity-100`
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {renderTabContent()}
    </div>
  )
}
