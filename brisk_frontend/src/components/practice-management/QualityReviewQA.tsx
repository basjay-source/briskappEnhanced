import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Shield, Search, Plus, CheckCircle, AlertTriangle, Eye,
  Edit, FileText, Clock, TrendingUp, Award
} from 'lucide-react'
import { practiceManagementApi, QualityReview } from '../../services/api'

const QualityReviewQA: React.FC = () => {
  const [reviews, setReviews] = useState<QualityReview[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await practiceManagementApi.getQualityReviews()
        setReviews(data)
      } catch (error) {
        console.error('Failed to fetch QA reviews:', error)
        setReviews([
          { id: 1, job_name: 'Year-end Accounts - ABC Ltd', reviewer_name: 'Senior Partner', review_type: 'file_review', sampling_reason: 'High value client', overall_rating: 'satisfactory', remediation_required: false, completed_at: null, created_at: '2024-01-15T10:30:00Z' },
          { id: 2, job_name: 'VAT Return - DEF Ltd', reviewer_name: 'Tax Manager', review_type: 'sampling', sampling_reason: 'Random selection', overall_rating: 'good', remediation_required: false, completed_at: '2024-01-20T10:30:00Z', created_at: '2024-01-10T14:20:00Z' },
          { id: 3, job_name: 'Payroll Setup - GHI Corp', reviewer_name: 'Payroll Specialist', review_type: 'new_staff', sampling_reason: 'New staff work', overall_rating: 'needs_improvement', remediation_required: true, completed_at: null, created_at: '2024-01-05T09:15:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = (review.job_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (review.reviewer_name || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'pending' && !review.completed_at) ||
                         (statusFilter === 'complete' && review.completed_at) ||
                         (statusFilter === 'requires_remediation' && review.remediation_required)
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (review: QualityReview) => {
    if (review.completed_at) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Complete</Badge>
    } else if (review.remediation_required) {
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Requires Remediation</Badge>
    } else {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
    }
  }

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Excellent</Badge>
      case 'good':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Good</Badge>
      case 'satisfactory':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Satisfactory</Badge>
      case 'needs_improvement':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Needs Improvement</Badge>
      default:
        return <Badge variant="outline">{rating}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Quality Review & QA</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Quality Review & QA</h1>
          <p className="text-gray-600 mt-1">Manage quality assurance processes and file reviews</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            QA Checklists
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Review
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Reviews</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {reviews.filter(r => !r.completed_at).length}
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Quality Score</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">94%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Above target (90%)
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Findings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {reviews.filter(r => r.remediation_required).length}
            </div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Review Coverage</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              Jobs reviewed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Quality Reviews</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="complete">Complete</option>
                <option value="requires_remediation">Requires Remediation</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{review.job_name}</h3>
                    {getStatusBadge(review)}
                    {getRatingBadge(review.overall_rating)}
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {review.review_type.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Reviewer: {review.reviewer_name}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {review.sampling_reason}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {review.completed_at ? `Completed: ${new Date(review.completed_at).toLocaleDateString()}` : 'In Progress'}
                    </span>
                    <span className="flex items-center">
                      Created: {new Date(review.created_at).toLocaleDateString()}
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
                  {!review.completed_at && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Shield className="h-4 w-4 mr-2" />
                      {review.remediation_required ? 'Remediate' : 'Start Review'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-600 mb-4">Start your first quality review</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Review
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* QA Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Sampling Rules</CardTitle>
            <CardDescription>Automatic review selection criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">New Staff Work</h4>
                  <p className="text-sm text-gray-600">100% of work by staff with &lt;6 months experience</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">High Value Jobs</h4>
                  <p className="text-sm text-gray-600">All jobs &gt;£10k value</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">High Risk Clients</h4>
                  <p className="text-sm text-gray-600">50% sampling for high-risk clients</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Random Sampling</h4>
                  <p className="text-sm text-gray-600">10% of all other work</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Review Statistics</CardTitle>
            <CardDescription>Quality metrics and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">This Month</h4>
                  <p className="text-sm text-gray-600">23 reviews completed</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">94% pass rate</p>
                  <p className="text-xs text-gray-500">+2% vs last month</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Average Review Time</h4>
                  <p className="text-sm text-gray-600">2.3 hours per review</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">Within target</p>
                  <p className="text-xs text-gray-500">Target: &lt;3h</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Common Findings</h4>
                  <p className="text-sm text-gray-600">Documentation gaps (45%)</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-orange-600">Trending</p>
                  <p className="text-xs text-gray-500">Training needed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default QualityReviewQA
