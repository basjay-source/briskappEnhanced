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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/app')
  }

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BriskLogo className="h-20 w-20" animated showText={false} />
          </div>
          <BriskLogo className="h-16 w-auto mb-2" showText={true} />
          <p className="text-white font-bold">Professional Accountancy Practice Management</p>
        </div>
        
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
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
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
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
