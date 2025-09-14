import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Zap, Shield, Globe, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import BriskLogo from '@/components/BriskLogo'

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: "Ultra-Fast Performance",
      description: "Cloud-native architecture with P95 API responses under 150ms"
    },
    {
      icon: Brain,
      title: "AI-Powered Advisers",
      description: "5 specialized AI assistants for accounts, tax, payroll, AML, and company secretarial"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "GDPR compliant with field-level encryption and audit trails"
    },
    {
      icon: Globe,
      title: "UK-First, Global Ready",
      description: "Pre-loaded HMRC & Companies House workflows with multi-currency support"
    }
  ]

  const modules = [
    "Accounts Production", "Corporation Tax", "Personal Tax", "Payroll",
    "AML/KYC", "Company Secretarial", "Bookkeeping", "e-Signature"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brisk-primary-50 to-white">
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BriskLogo className="h-10 w-10" animated />
            <span className="text-2xl font-bold text-brisk-primary">Brisk Practice Suite</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/app">
              <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6">
        <section className="text-center py-20">
          <h1 className="text-6xl font-bold mb-6">
            All-in-one accounting software
            <span className="text-brisk-primary"> with AI assistants</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Cloud-native, multilingual, ultra-fast platform for accounting firms and businesses. 
            Complete with AI advisers, advanced integrations, and enterprise security.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/app">
              <Button size="lg" className="bg-brisk-primary hover:bg-brisk-primary-600">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </section>

        <section className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Brisk?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-brisk-primary mx-auto mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Complete Module Suite</h2>
            <p className="text-xl text-gray-600">Everything you need in one integrated platform</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
                <CheckCircle className="h-5 w-5 text-brisk-accent" />
                <span className="font-bold">{module}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="bg-brisk-primary rounded-2xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to transform your practice?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of accounting professionals using Brisk Practice Suite
            </p>
            <Link to="/app">
              <Button size="lg" variant="secondary" className="bg-white text-brisk-primary hover:bg-gray-100">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-12 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BriskLogo className="h-8 w-8" showText={true} />
          </div>
          <p className="text-gray-600">© 2024 Brisk Accountants Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
