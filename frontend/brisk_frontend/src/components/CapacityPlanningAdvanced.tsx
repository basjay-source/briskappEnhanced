import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, AlertTriangle, CheckCircle, Clock, 
  BarChart3, Calendar, Target, Zap, ArrowRight, RefreshCw,
  User, Briefcase, Star
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  skills: string[]
  currentUtilization: number
  capacity: number
  assignedJobs: number
  performanceScore: number
  hourlyRate: number
  availability: {
    thisWeek: number
    nextWeek: number
    thisMonth: number
  }
}

interface Job {
  id: string
  title: string
  client: string
  type: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  estimatedHours: number
  requiredSkills: string[]
  dueDate: string
  assignedTo?: string
  status: 'unassigned' | 'assigned' | 'in_progress' | 'completed'
}

interface AIRecommendation {
  type: 'rebalance' | 'hire' | 'outsource' | 'delay' | 'optimize'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  effort: string
  savings: string
}

export default function CapacityPlanningAdvanced() {
  const [activeTab, setActiveTab] = useState('overview')
  const [draggedJob, setDraggedJob] = useState<string | null>(null)

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      role: 'Senior Accountant',
      skills: ['Accounts Preparation', 'Business Tax', 'VAT Returns', 'Audit'],
      currentUtilization: 120,
      capacity: 40,
      assignedJobs: 8,
      performanceScore: 94,
      hourlyRate: 85,
      availability: { thisWeek: 32, nextWeek: 40, thisMonth: 160 }
    },
    {
      id: 'mike-chen',
      name: 'Mike Chen',
      role: 'Tax Specialist',
      skills: ['Business Tax', 'Personal Tax', 'R&D Claims', 'Tax Planning'],
      currentUtilization: 75,
      capacity: 40,
      assignedJobs: 5,
      performanceScore: 88,
      hourlyRate: 90,
      availability: { thisWeek: 40, nextWeek: 40, thisMonth: 160 }
    },
    {
      id: 'emma-wilson',
      name: 'Emma Wilson',
      role: 'Payroll Manager',
      skills: ['Payroll Processing', 'RTI Submissions', 'Pension Admin', 'HR Support'],
      currentUtilization: 90,
      capacity: 40,
      assignedJobs: 6,
      performanceScore: 92,
      hourlyRate: 70,
      availability: { thisWeek: 36, nextWeek: 40, thisMonth: 160 }
    },
    {
      id: 'james-taylor',
      name: 'James Taylor',
      role: 'Junior Accountant',
      skills: ['Bookkeeping', 'VAT Returns', 'Basic Accounts', 'Data Entry'],
      currentUtilization: 65,
      capacity: 40,
      assignedJobs: 4,
      performanceScore: 78,
      hourlyRate: 45,
      availability: { thisWeek: 40, nextWeek: 40, thisMonth: 160 }
    }
  ])

  const [unassignedJobs] = useState<Job[]>([
    {
      id: 'job-1',
      title: 'ABC Ltd Year End Accounts',
      client: 'ABC Ltd',
      type: 'Accounts Preparation',
      priority: 'high',
      estimatedHours: 12,
      requiredSkills: ['Accounts Preparation', 'Business Tax'],
      dueDate: '2024-03-15',
      status: 'unassigned'
    },
    {
      id: 'job-2',
      title: 'XYZ Corp VAT Return',
      client: 'XYZ Corp',
      type: 'VAT Return',
      priority: 'medium',
      estimatedHours: 4,
      requiredSkills: ['VAT Returns'],
      dueDate: '2024-02-28',
      status: 'unassigned'
    },
    {
      id: 'job-3',
      title: 'DEF Ltd Payroll Setup',
      client: 'DEF Ltd',
      type: 'Payroll',
      priority: 'urgent',
      estimatedHours: 8,
      requiredSkills: ['Payroll Processing', 'RTI Submissions'],
      dueDate: '2024-02-20',
      status: 'unassigned'
    }
  ])

  const [aiRecommendations] = useState<AIRecommendation[]>([
    {
      type: 'rebalance',
      priority: 'high',
      title: 'Redistribute Sarah\'s Workload',
      description: 'Sarah is at 120% capacity. Reassign 2 VAT returns to Mike who has 25% availability.',
      impact: 'Reduce overtime by 8 hours',
      effort: 'Low - 15 minutes',
      savings: '£340 overtime costs'
    },
    {
      type: 'optimize',
      priority: 'medium',
      title: 'Skill Development Opportunity',
      description: 'Train James in Business Tax to increase team flexibility and reduce bottlenecks.',
      impact: '15% capacity increase',
      effort: 'Medium - 2 weeks training',
      savings: '£2,400 monthly efficiency'
    },
    {
      type: 'hire',
      priority: 'medium',
      title: 'Consider Additional Resource',
      description: 'Team consistently at 95%+ utilization. Consider hiring a mid-level accountant.',
      impact: '40 hours weekly capacity',
      effort: 'High - 6 weeks recruitment',
      savings: '£4,800 monthly revenue potential'
    }
  ])

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 100) return 'text-red-600'
    if (utilization > 85) return 'text-[#FF6B35]'
    if (utilization > 70) return 'text-green-600'
    return 'text-blue-600'
  }

  const getUtilizationBg = (utilization: number) => {
    if (utilization > 100) return 'bg-red-500'
    if (utilization > 85) return 'bg-[#FF6B35]'
    if (utilization > 70) return 'bg-green-500'
    return 'bg-blue-500'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-[#FFF4F0] text-[#C44B1C]'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDragStart = (jobId: string) => {
    setDraggedJob(jobId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, memberId: string) => {
    e.preventDefault()
    if (!draggedJob) return

    console.log(`Assigning job ${draggedJob} to ${memberId}`)
    setDraggedJob(null)
  }

  const calculateTeamMetrics = () => {
    const totalCapacity = teamMembers.reduce((sum, member) => sum + member.capacity, 0)
    const totalUtilized = teamMembers.reduce((sum, member) => sum + (member.capacity * member.currentUtilization / 100), 0)
    const avgUtilization = (totalUtilized / totalCapacity) * 100
    const overloadedMembers = teamMembers.filter(member => member.currentUtilization > 100).length
    
    return {
      totalCapacity,
      totalUtilized,
      avgUtilization,
      overloadedMembers,
      availableCapacity: totalCapacity - totalUtilized
    }
  }

  const metrics = calculateTeamMetrics()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Capacity Planning</h2>
          <p className="text-gray-600">AI-powered resource optimization and forecasting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button size="sm" className="bg-brisk-primary">
            <Zap className="h-4 w-4 mr-2" />
            Auto-Optimize
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Utilization</p>
                <p className="text-2xl font-bold">{metrics.avgUtilization.toFixed(1)}%</p>
                <p className={`text-xs ${getUtilizationColor(metrics.avgUtilization)}`}>
                  {metrics.overloadedMembers} overloaded
                </p>
              </div>
              <BarChart3 className={`h-8 w-8 ${getUtilizationColor(metrics.avgUtilization)}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Capacity</p>
                <p className="text-2xl font-bold">{metrics.availableCapacity.toFixed(0)}h</p>
                <p className="text-xs text-green-600">This week</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unassigned Jobs</p>
                <p className="text-2xl font-bold">{unassignedJobs.length}</p>
                <p className="text-xs text-[#FF6B35]">Require assignment</p>
              </div>
              <Briefcase className="h-8 w-8 text-[#FF6B35]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Efficiency Score</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-blue-600">+3% this month</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignment">Job Assignment</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Capacity Overview</CardTitle>
              <CardDescription>Current utilization and availability by team member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-brisk-primary-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-brisk-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className="bg-blue-100 text-blue-800">
                          <Star className="h-3 w-3 mr-1" />
                          {member.performanceScore}%
                        </Badge>
                        <Badge variant="outline">
                          £{member.hourlyRate}/hr
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3 mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Current Utilization</p>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={Math.min(member.currentUtilization, 100)} 
                            className="flex-1"
                          />
                          <span className={`text-sm font-medium ${getUtilizationColor(member.currentUtilization)}`}>
                            {member.currentUtilization}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Active Jobs</p>
                        <p className="text-lg font-bold">{member.assignedJobs}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Available This Week</p>
                        <p className="text-lg font-bold">{member.availability.thisWeek}h</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => console.log('View member details:', member.name)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignment" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Unassigned Jobs</CardTitle>
                <CardDescription>Drag jobs to team members to assign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {unassignedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-3 border rounded-lg cursor-move hover:bg-gray-50"
                      draggable
                      onDragStart={() => handleDragStart(job.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-sm">{job.title}</h4>
                          <p className="text-xs text-gray-600">{job.client}</p>
                        </div>
                        <Badge className={getPriorityColor(job.priority)}>
                          {job.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{job.estimatedHours}h estimated</span>
                        <span>Due: {job.dueDate}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.requiredSkills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Team Assignment Board</CardTitle>
                  <CardDescription>Drop jobs onto team members to assign work</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="p-4 border-2 border-dashed border-blue-900 rounded-lg hover:border-brisk-primary transition-colors"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, member.id)}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-8 w-8 bg-brisk-primary-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-brisk-primary" />
                          </div>
                          <div>
                            <h4 className="font-bold">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Utilization</span>
                            <span className={`text-sm font-medium ${getUtilizationColor(member.currentUtilization)}`}>
                              {member.currentUtilization}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getUtilizationBg(member.currentUtilization)}`}
                              style={{ width: `${Math.min(member.currentUtilization, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="text-center text-sm text-gray-500">
                          {member.currentUtilization < 85 ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600 mx-auto mb-1" />
                              Available for new work
                            </>
                          ) : member.currentUtilization < 100 ? (
                            <>
                              <AlertTriangle className="h-4 w-4 text-[#FF6B35] mx-auto mb-1" />
                              Near capacity
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-4 w-4 text-red-600 mx-auto mb-1" />
                              Overloaded
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Capacity Forecast</CardTitle>
                <CardDescription>Predicted utilization over next 4 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => {
                    const utilization = [92, 87, 95, 78][index]
                    return (
                      <div key={week} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{week}</span>
                        <div className="flex items-center gap-2 flex-1 ml-4">
                          <Progress value={utilization} className="flex-1" />
                          <span className={`text-sm font-medium ${getUtilizationColor(utilization)}`}>
                            {utilization}%
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workload Predictions</CardTitle>
                <CardDescription>AI-powered demand forecasting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">High Demand Period</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Week 3: Year-end deadline rush expected. 25% increase in workload.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-900">Optimal Scheduling</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Week 4: Lower demand period. Good time for training and development.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-[#FF6B35]" />
                      <span className="font-medium text-orange-900">Capacity Risk</span>
                    </div>
                    <p className="text-sm text-orange-700">
                      Week 2-3: Consider temporary resources or deadline adjustments.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-brisk-primary" />
                AI-Powered Recommendations
              </CardTitle>
              <CardDescription>Intelligent suggestions to optimize team capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={
                          rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'medium' ? 'bg-[#FFF4F0] text-[#C44B1C]' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {rec.priority} priority
                        </Badge>
                        <Badge variant="outline">{rec.type}</Badge>
                      </div>
                      <Button size="sm" className="bg-brisk-primary">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Apply
                      </Button>
                    </div>
                    <h4 className="font-bold mb-2">{rec.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                    <div className="grid gap-2 md:grid-cols-3 text-xs">
                      <div>
                        <span className="font-medium text-green-600">Impact:</span>
                        <p>{rec.impact}</p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-600">Effort:</span>
                        <p>{rec.effort}</p>
                      </div>
                      <div>
                        <span className="font-medium text-purple-600">Savings:</span>
                        <p>{rec.savings}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
