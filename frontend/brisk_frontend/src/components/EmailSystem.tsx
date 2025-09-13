import { useState } from 'react'
import { 
  Mail, 
  Send, 
  Reply, 
  ReplyAll, 
  Forward, 
  Archive, 
  Trash2, 
  Star, 
  Paperclip, 
  Search,
  Filter,
  MoreHorizontal,
  Bold,
  Italic,
  Underline,
  Link,
  Image,
  Smile,
  Calendar,
  Clock,
  Minimize2,
  Maximize2,
  X,
  Settings,
  Plus,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useIsMobile } from '@/hooks/use-mobile'

interface Email {
  id: string
  from: string
  to: string[]
  cc?: string[]
  bcc?: string[]
  subject: string
  body: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  hasAttachments: boolean
  priority: 'low' | 'normal' | 'high'
  labels: string[]
  threadId?: string
  clientId?: string
  jobId?: string
}

interface EmailThread {
  id: string
  subject: string
  participants: string[]
  emails: Email[]
  lastActivity: string
  isRead: boolean
  hasAttachments: boolean
  clientId?: string
  jobId?: string
}

interface EmailAccount {
  id: string
  email: string
  provider: 'gmail' | 'outlook' | 'exchange' | 'imap'
  status: 'connected' | 'disconnected' | 'syncing' | 'error'
  lastSync?: string
  isDefault?: boolean
}

export default function EmailSystem() {
  const [selectedFolder, setSelectedFolder] = useState('inbox')
  const [selectedThread, setSelectedThread] = useState<EmailThread | null>(null)
  const [isComposing, setIsComposing] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showAccountSettings, setShowAccountSettings] = useState(false)
  const [connectedAccounts, setConnectedAccounts] = useState<EmailAccount[]>([
    {
      id: '1',
      email: 'sarah.johnson@firm.com',
      provider: 'outlook',
      status: 'connected',
      lastSync: '2024-01-20 16:30',
      isDefault: true
    },
    {
      id: '2',
      email: 'sarah@gmail.com',
      provider: 'gmail',
      status: 'connected',
      lastSync: '2024-01-20 16:25'
    }
  ])
  const isMobile = useIsMobile()

  const folders = [
    { id: 'inbox', name: 'Inbox', count: 12, icon: Mail },
    { id: 'sent', name: 'Sent Items', count: 0, icon: Send },
    { id: 'drafts', name: 'Drafts', count: 3, icon: Clock },
    { id: 'archive', name: 'Archive', count: 0, icon: Archive },
    { id: 'trash', name: 'Deleted Items', count: 0, icon: Trash2 },
    { id: 'starred', name: 'Starred', count: 5, icon: Star }
  ]

  const emailThreads: EmailThread[] = [
    {
      id: '1',
      subject: 'VAT Return Q4 2024 - ABC Manufacturing Ltd',
      participants: ['sarah.johnson@firm.com', 'finance@abcmanufacturing.com'],
      lastActivity: '2024-01-20 14:30',
      isRead: false,
      hasAttachments: true,
      clientId: 'client_123',
      jobId: 'job_456',
      emails: [
        {
          id: 'email_1',
          from: 'sarah.johnson@firm.com',
          to: ['finance@abcmanufacturing.com'],
          subject: 'VAT Return Q4 2024 - ABC Manufacturing Ltd',
          body: 'Hi John,\n\nI hope this email finds you well. I\'m writing to request the following documents for your Q4 2024 VAT return:\n\n• Sales invoices for October-December 2024\n• Purchase invoices for the same period\n• Bank statements\n• Previous VAT return (Q3 2024)\n\nPlease upload these to the client portal or reply with the documents attached.\n\nBest regards,\nSarah Johnson\nSenior Accountant',
          timestamp: '2024-01-20 09:15',
          isRead: true,
          isStarred: false,
          hasAttachments: false,
          priority: 'normal',
          labels: ['client-communication', 'vat-return']
        },
        {
          id: 'email_2',
          from: 'finance@abcmanufacturing.com',
          to: ['sarah.johnson@firm.com'],
          subject: 'RE: VAT Return Q4 2024 - ABC Manufacturing Ltd',
          body: 'Hi Sarah,\n\nThank you for your email. I have attached the requested documents:\n\n• Q4 2024 Sales Invoices.pdf\n• Q4 2024 Purchase Invoices.pdf\n• Bank Statements Oct-Dec 2024.pdf\n\nPlease let me know if you need anything else.\n\nBest regards,\nJohn Smith\nFinance Manager\nABC Manufacturing Ltd',
          timestamp: '2024-01-20 14:30',
          isRead: false,
          isStarred: true,
          hasAttachments: true,
          priority: 'normal',
          labels: ['client-communication', 'vat-return']
        }
      ]
    }
  ]

  const [composeData, setComposeData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    priority: 'normal' as 'low' | 'normal' | 'high',
    attachments: [] as File[]
  })

  const handleCompose = () => {
    setIsComposing(true)
    setIsMinimized(false)
  }

  const handleSend = () => {
    console.log('Sending email:', composeData)
    setIsComposing(false)
    setComposeData({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: '',
      priority: 'normal',
      attachments: []
    })
  }

  const handleReply = (email: Email) => {
    setComposeData({
      ...composeData,
      to: email.from,
      subject: `RE: ${email.subject}`,
      body: `\n\n--- Original Message ---\nFrom: ${email.from}\nSent: ${email.timestamp}\nSubject: ${email.subject}\n\n${email.body}`
    })
    setIsComposing(true)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffHours = Math.abs(now.getTime() - date.getTime()) / 36e5

    if (diffHours < 24) {
      return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    } else if (diffHours < 168) {
      return date.toLocaleDateString('en-GB', { weekday: 'short' })
    } else {
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })
    }
  }

  const handleConnectAccount = (provider: 'gmail' | 'outlook' | 'exchange' | 'imap') => {
    console.log('Connecting to', provider)
    const newAccount: EmailAccount = {
      id: Date.now().toString(),
      email: `user@${provider === 'gmail' ? 'gmail.com' : provider === 'outlook' ? 'outlook.com' : 'company.com'}`,
      provider,
      status: 'syncing'
    }
    setConnectedAccounts([...connectedAccounts, newAccount])
    
    setTimeout(() => {
      setConnectedAccounts(prev => prev.map(acc => 
        acc.id === newAccount.id 
          ? { ...acc, status: 'connected', lastSync: new Date().toISOString() }
          : acc
      ))
    }, 2000)
  }

  const handleDisconnectAccount = (accountId: string) => {
    setConnectedAccounts(prev => prev.filter(acc => acc.id !== accountId))
  }

  const handleSyncAccount = (accountId: string) => {
    setConnectedAccounts(prev => prev.map(acc => 
      acc.id === accountId 
        ? { ...acc, status: 'syncing' }
        : acc
    ))
    
    setTimeout(() => {
      setConnectedAccounts(prev => prev.map(acc => 
        acc.id === accountId 
          ? { ...acc, status: 'connected', lastSync: new Date().toISOString() }
          : acc
      ))
    }, 1500)
  }

  if (isMobile) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Email</h2>
            <Button onClick={handleCompose} size="sm" className="bg-brisk-primary">
              <Mail className="h-4 w-4 mr-2" />
              Compose
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {emailThreads.map((thread) => (
            <div
              key={thread.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${!thread.isRead ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedThread(thread)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {thread.hasAttachments && <Paperclip className="h-4 w-4 text-gray-400" />}
                    <span className={`text-sm ${!thread.isRead ? 'font-semibold' : 'font-medium'}`}>
                      {thread.participants[0]}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${!thread.isRead ? 'font-semibold' : ''}`}>
                    {thread.subject}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(thread.lastActivity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isComposing && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="border-b p-4 flex items-center justify-between">
              <h3 className="font-semibold">New Message</h3>
              <div className="flex items-center gap-2">
                <Button onClick={handleSend} size="sm" className="bg-brisk-primary">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
                <Button onClick={() => setIsComposing(false)} variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 p-4 space-y-4">
              <Input placeholder="To" value={composeData.to} onChange={(e) => setComposeData({...composeData, to: e.target.value})} />
              <Input placeholder="Subject" value={composeData.subject} onChange={(e) => setComposeData({...composeData, subject: e.target.value})} />
              <textarea
                placeholder="Type your message..."
                value={composeData.body}
                onChange={(e) => setComposeData({...composeData, body: e.target.value})}
                className="w-full h-64 p-3 border rounded-md resize-none"
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="h-full flex bg-white">
      <div className="w-64 border-r flex flex-col">
        <div className="p-4 border-b space-y-3">
          <Button onClick={handleCompose} className="w-full bg-brisk-primary hover:bg-brisk-primary-600">
            <Mail className="h-4 w-4 mr-2" />
            New Message
          </Button>
          <Button 
            onClick={() => setShowAccountSettings(!showAccountSettings)} 
            variant="outline" 
            className="w-full"
          >
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto">
          {showAccountSettings ? (
            <div className="p-4 space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-medium text-sm mb-2">Connected Accounts</h3>
                <div className="space-y-2">
                  {connectedAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          account.status === 'connected' ? 'bg-green-500' :
                          account.status === 'syncing' ? 'bg-blue-500' :
                          account.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
                        }`} />
                        <div>
                          <p className="text-xs font-medium">{account.email}</p>
                          <p className="text-xs text-gray-500 capitalize">{account.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {account.status === 'syncing' ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleSyncAccount(account.id)}
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDisconnectAccount(account.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2">Add Account</h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => handleConnectAccount('gmail')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Connect Gmail
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleConnectAccount('outlook')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Connect Outlook
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleConnectAccount('exchange')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Connect Exchange
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleConnectAccount('imap')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Connect IMAP
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2">
              {folders.map((folder) => {
                const Icon = folder.icon
                return (
                  <div
                    key={folder.id}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 ${
                      selectedFolder === folder.id ? 'bg-brisk-primary-50 text-brisk-primary' : ''
                    }`}
                    onClick={() => setSelectedFolder(folder.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{folder.name}</span>
                    </div>
                    {folder.count > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {folder.count}
                      </Badge>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold capitalize">{selectedFolder}</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="w-1/2 border-r overflow-auto">
            {emailThreads.map((thread) => (
              <div
                key={thread.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedThread?.id === thread.id ? 'bg-brisk-primary-50' : ''
                } ${!thread.isRead ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedThread(thread)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {thread.hasAttachments && <Paperclip className="h-4 w-4 text-gray-400" />}
                    <span className={`text-sm ${!thread.isRead ? 'font-semibold' : 'font-medium'}`}>
                      {thread.participants.join(', ')}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(thread.lastActivity)}
                  </span>
                </div>
                
                <p className={`text-sm mb-1 ${!thread.isRead ? 'font-semibold' : ''}`}>
                  {thread.subject}
                </p>
                
                <div className="flex items-center gap-2">
                  {thread.clientId && (
                    <Badge variant="outline" className="text-xs">
                      Client: ABC Ltd
                    </Badge>
                  )}
                  {thread.jobId && (
                    <Badge variant="outline" className="text-xs">
                      Job: VAT Return
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 flex flex-col">
            {selectedThread ? (
              <>
                <div className="border-b p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{selectedThread.subject}</h3>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{selectedThread.emails.length} messages</span>
                    <span>{selectedThread.participants.length} participants</span>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {selectedThread.emails.map((email, index) => (
                    <Card key={email.id} className={!email.isRead ? 'border-brisk-primary' : ''}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-brisk-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {email.from.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{email.from}</p>
                              <p className="text-xs text-gray-500">
                                To: {email.to.join(', ')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(email.timestamp)}
                            </span>
                            {email.isStarred && <Star className="h-4 w-4 text-blue-500 fill-current" />}
                            {email.hasAttachments && <Paperclip className="h-4 w-4 text-gray-400" />}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="whitespace-pre-wrap text-sm">{email.body}</div>
                        
                        {email.hasAttachments && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 text-sm">
                              <Paperclip className="h-4 w-4" />
                              <span className="font-medium">3 attachments</span>
                            </div>
                          </div>
                        )}

                        {index === selectedThread.emails.length - 1 && (
                          <div className="mt-4 flex items-center gap-2">
                            <Button size="sm" onClick={() => handleReply(email)}>
                              <Reply className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                            <Button variant="outline" size="sm">
                              <ReplyAll className="h-4 w-4 mr-2" />
                              Reply All
                            </Button>
                            <Button variant="outline" size="sm">
                              <Forward className="h-4 w-4 mr-2" />
                              Forward
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Select an email to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isComposing && (
        <div className={`fixed ${isMinimized ? 'bottom-0 right-4 w-80 h-12' : 'bottom-0 right-4 w-96 h-96'} bg-white border border-gray-300 rounded-t-lg shadow-lg z-50 flex flex-col`}>
          <div className="flex items-center justify-between p-3 border-b bg-gray-50 rounded-t-lg">
            <h4 className="font-medium text-sm">New Message</h4>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsComposing(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="p-3 space-y-2 border-b">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium w-12">To:</span>
                  <Input
                    placeholder="Enter recipients"
                    value={composeData.to}
                    onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                    className="flex-1 h-8"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium w-12">Subject:</span>
                  <Input
                    placeholder="Enter subject"
                    value={composeData.subject}
                    onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                    className="flex-1 h-8"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1 p-2 border-b">
                <Button variant="ghost" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <Button variant="ghost" size="sm">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 p-3">
                <textarea
                  placeholder="Type your message..."
                  value={composeData.body}
                  onChange={(e) => setComposeData({...composeData, body: e.target.value})}
                  className="w-full h-full resize-none border-none outline-none text-sm"
                />
              </div>

              <div className="p-3 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button onClick={handleSend} size="sm" className="bg-brisk-primary hover:bg-brisk-primary-600">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={composeData.priority}
                    onChange={(e) => setComposeData({...composeData, priority: e.target.value as 'low' | 'normal' | 'high'})}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="low">Low Priority</option>
                    <option value="normal">Normal</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
