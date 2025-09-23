import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import BriskLogo from '@/components/BriskLogo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (email === 'admin@briskaccountants.com' && password === 'brisk2024') {
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGVtby11c2VyIiwiZW1haWwiOiJhZG1pbkBicmlza2FjY291bnRhbnRzLmNvbSIsInRlbmFudF9pZCI6ImRlZmF1bHQtdGVuYW50IiwiZXhwIjoxNzU4NjgyMDM4fQ.demo-signature'
      const mockUser = {
        id: 'demo-user',
        email: 'admin@briskaccountants.com',
        first_name: 'Admin',
        last_name: 'User',
        tenant_id: 'default-tenant'
      }
      
      localStorage.setItem('access_token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      navigate('/app')
    } else {
      alert('Invalid credentials. Please use: admin@briskaccountants.com / brisk2024')
    }
  }

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="mb-4 max-w-md mx-auto">
            <BriskLogo className="w-full" showText={false} />
          </div>
          <p className="text-white font-bold">Professional Accountancy Practice Management</p>
        </div>
        
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription style={{color: '#FF6B35'}}>
              Sign in to your Brisk Practice Suite account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" style={{backgroundColor: '#FF6B35'}}>
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/" className="text-blue-600 hover:underline">
                  Start free trial
                </Link>
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm">
                Forgot password?
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
