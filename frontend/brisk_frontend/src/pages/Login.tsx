import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication - you can enhance this later
    if (username && password) {
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001f3f] to-[#003366]">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#001f3f] mb-2">Brisk Accountants</h1>
          <p className="text-gray-600">Enterprise Accounting Software</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="username" className="text-[#001f3f] font-semibold">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 border-[#001f3f]"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="text-[#001f3f] font-semibold">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 border-[#001f3f]"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
          >
            Sign In
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo Credentials: Any username/password</p>
        </div>
      </div>
    </div>
  )
}
