import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Users, Search, Plus, Award, TrendingUp,
  Eye, Edit, BookOpen, Calendar
} from 'lucide-react'
import { practiceManagementApi, StaffSkill } from '../../services/api'

const PeopleTeamsSkills: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [skills, setSkills] = useState<StaffSkill[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'team' | 'skills' | 'certifications'>('team')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsData] = await Promise.all([
          practiceManagementApi.getStaffSkills()
        ])
        setSkills(skillsData)
      } catch (error) {
        console.error('Failed to fetch team data:', error)
        setTeamMembers([
          { id: 1, name: 'John Smith', role: 'Senior Accountant', department: 'Accounts', cost_rate: 45, billing_rate: 75, utilization: 85, skills: ['Accounts', 'Tax', 'Audit'], certifications: ['ACA'], cpd_hours: 35, hire_date: '2020-03-15', created_at: '2024-01-15T10:30:00Z' },
          { id: 2, name: 'Sarah Johnson', role: 'Bookkeeper', department: 'Bookkeeping', cost_rate: 25, billing_rate: 50, utilization: 92, skills: ['Bookkeeping', 'VAT', 'Payroll'], certifications: ['AAT'], cpd_hours: 28, hire_date: '2021-07-01', created_at: '2024-01-10T14:20:00Z' },
          { id: 3, name: 'Mike Wilson', role: 'Tax Specialist', department: 'Tax', cost_rate: 40, billing_rate: 65, utilization: 78, skills: ['Tax', 'Advisory', 'Planning'], certifications: ['CTA'], cpd_hours: 42, hire_date: '2019-11-20', created_at: '2024-01-05T09:15:00Z' },
          { id: 4, name: 'Emma Davis', role: 'Junior Accountant', department: 'Accounts', cost_rate: 20, billing_rate: 40, utilization: 65, skills: ['Accounts', 'Bookkeeping'], certifications: ['AAT'], cpd_hours: 15, hire_date: '2023-09-01', created_at: '2024-01-01T16:30:00Z' }
        ])
        setSkills([
          { id: 1, user_name: 'John Smith', skill_name: 'Accounts Preparation', skill_category: 'technical', proficiency_level: 'advanced', certification_name: 'ACA', expiry_date: null, cpd_hours_required: 40, cpd_hours_completed: 35, created_at: '2024-01-15T10:30:00Z' },
          { id: 2, user_name: 'Sarah Johnson', skill_name: 'VAT Returns', skill_category: 'technical', proficiency_level: 'intermediate', certification_name: 'AAT', expiry_date: null, cpd_hours_required: 35, cpd_hours_completed: 28, created_at: '2024-01-10T14:20:00Z' },
          { id: 3, user_name: 'Mike Wilson', skill_name: 'Tax Planning', skill_category: 'technical', proficiency_level: 'expert', certification_name: 'CTA', expiry_date: null, cpd_hours_required: 40, cpd_hours_completed: 42, created_at: '2024-01-05T09:15:00Z' },
          { id: 4, user_name: 'Emma Davis', skill_name: 'Bookkeeping', skill_category: 'technical', proficiency_level: 'beginner', certification_name: 'AAT', expiry_date: null, cpd_hours_required: 35, cpd_hours_completed: 15, created_at: '2024-01-01T16:30:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getRoleBadge = (role: string) => {
    const colors = {
      'Senior Accountant': 'bg-blue-50 text-blue-700 border-blue-200',
      'Bookkeeper': 'bg-green-50 text-green-700 border-green-200',
      'Tax Specialist': 'bg-orange-50 text-orange-700 border-orange-200',
      'Junior Accountant': 'bg-purple-50 text-purple-700 border-purple-200'
    }
    return (
      <Badge variant="outline" className={colors[role as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200'}>
        {role}
      </Badge>
    )
  }

  const getSkillLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Beginner</Badge>
      case 'intermediate':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Intermediate</Badge>
      case 'advanced':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Advanced</Badge>
      case 'expert':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Expert</Badge>
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600'
    if (utilization >= 80) return 'text-orange-600'
    if (utilization >= 70) return 'text-green-600'
    return 'text-blue-600'
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">People, Teams & Skills</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">People, Teams & Skills</h1>
          <p className="text-gray-600 mt-1">Manage team members, skills matrix and professional development</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            Training Plan
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Team Size</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{teamMembers.length}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Active team members
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {teamMembers.length > 0 ? Math.round(teamMembers.reduce((sum, member) => sum + member.utilization, 0) / teamMembers.length) : 0}%
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Target: 80%
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">CPD Hours</CardTitle>
            <BookOpen className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {teamMembers.reduce((sum, member) => sum + member.cpd_hours, 0)}
            </div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              This year total
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Skill Coverage</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">92%</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              Service capabilities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'team', label: 'Team Members', icon: Users },
            { id: 'skills', label: 'Skills Matrix', icon: Award },
            { id: 'certifications', label: 'Certifications & CPD', icon: BookOpen }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Team Tab */}
      {activeTab === 'team' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {member.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.department}</p>
                      </div>
                      {getRoleBadge(member.role)}
                    </div>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Utilization:</span>
                        <span className={`font-medium ml-2 ${getUtilizationColor(member.utilization)}`}>
                          {member.utilization}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Billing Rate:</span>
                        <span className="font-medium ml-2">£{member.billing_rate}/h</span>
                      </div>
                      <div>
                        <span className="text-gray-600">CPD Hours:</span>
                        <span className="font-medium ml-2">{member.cpd_hours}h</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Hire Date:</span>
                        <span className="font-medium ml-2">{new Date(member.hire_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Skills:</span>
                      <div className="flex space-x-1">
                        {member.skills.map((skill: string) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-1 flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Certifications:</span>
                      <div className="flex space-x-1">
                        {member.certifications.map((cert: string) => (
                          <Badge key={cert} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Skills Matrix</CardTitle>
            <CardDescription>Track team capabilities and skill gaps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{skill.skill_name}</h3>
                      {getSkillLevelBadge(skill.proficiency_level)}
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {skill.skill_category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {skill.user_name}
                      </span>
                      <span className="flex items-center">
                        CPD: {skill.cpd_hours_completed}/{skill.cpd_hours_required}h
                      </span>
                      <span className="flex items-center">
                        Certification: {skill.certification_name}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications Tab */}
      {activeTab === 'certifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Professional Certifications</CardTitle>
              <CardDescription>Track team qualifications and renewals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">ACA Qualified</h4>
                    <p className="text-sm text-gray-600">2 team members</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Current
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">AAT Qualified</h4>
                    <p className="text-sm text-gray-600">2 team members</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Current
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">CTA Qualified</h4>
                    <p className="text-sm text-gray-600">1 team member</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Current
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">CPD Progress</CardTitle>
              <CardDescription>Continuing professional development tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.cpd_hours}h completed</p>
                    </div>
                    <div className="text-right">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className={`h-2 rounded-full ${
                            member.cpd_hours >= 40 ? 'bg-green-600' :
                            member.cpd_hours >= 30 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${Math.min((member.cpd_hours / 40) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">Target: 40h</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default PeopleTeamsSkills
