import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import BriskLogo from '@/components/BriskLogo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/app')
  }

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-6">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="mb-4 max-w-md mx-auto">
            <BriskLogo className="w-full" showText={false} />
          </div>
          <p className="text-white font-bold">{t('auth.professionalAccountancy')}</p>
        </div>
        
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('common.welcome', 'Welcome back')}</CardTitle>
            <CardDescription style={{color: '#FF6B35'}}>
              {t('auth.signInToAccount')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" style={{backgroundColor: '#FF6B35'}}>
                {t('auth.login')}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t('auth.noAccount', "Don't have an account?")}{' '}
                <Link to="/" className="text-blue-600 hover:underline">
                  {t('auth.startFreeTrial', 'Start free trial')}
                </Link>
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm">
                {t('auth.forgotPassword')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
