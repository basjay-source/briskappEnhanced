import React, { useState } from 'react'
import { FolderOpen, Users, Calendar, Target, BarChart3, Settings, Clock, DollarSign } from 'lucide-react'

const ProjectManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects')

  const tabs = [
    { id: 'projects', name: 'Projects', icon: FolderOpen },
    { id: 'tasks', name: 'Tasks & Milestones', icon: Target },
    { id: 'resources', name: 'Resource Planning', icon: Users },
    { id: 'timesheets', name: 'Timesheets', icon: Clock },
    { id: 'budgets', name: 'Budgets & Forecasting', icon: DollarSign },
    { id: 'gantt', name: 'Gantt Charts', icon: Calendar },
    { id: 'reporting', name: 'Project Reporting', icon: BarChart3 },
    { id: 'settings', name: 'PM Settings', icon: Settings }
  ]

  const mockProjects = [
    {
      id: 1,
      name: 'Office Renovation Project',
      client: 'Internal',
      status: 'In Progress',
      progress: 65,
      budget: 150000,
      spent: 97500,
      startDate: '2024-01-15',
      endDate: '2024-04-30',
      manager: 'Sarah Johnson'
    },
    {
      id: 2,
      name: 'IT System Upgrade',
      client: 'Internal',
      status: 'Planning',
      progress: 25,
      budget: 75000,
      spent: 18750,
      startDate: '2024-02-01',
      endDate: '2024-06-15',
      manager: 'Mike Wilson'
    }
  ]

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Advanced Project Management</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{project.name}</h4>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {project.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Budget:</span>
                <span className="font-medium">£{project.budget.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Spent:</span>
                <span className="font-medium">£{project.spent.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Manager:</span>
                <span className="font-medium">{project.manager}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Timeline:</span>
                <span className="font-medium">{project.startDate} - {project.endDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Create Project
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Import Projects
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {activeTab === 'projects' && renderProjects()}
      {activeTab === 'tasks' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tasks & Milestones</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Active Tasks</h4>
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-sm text-blue-700">In progress</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">Completed</h4>
              <p className="text-2xl font-bold text-green-600">156</p>
              <p className="text-sm text-green-700">This month</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Overdue</h4>
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-yellow-700">Need attention</p>
            </div>
          </div>
          <p className="text-gray-600">Manage project tasks, set milestones, track dependencies, and monitor progress with Gantt chart integration and resource allocation.</p>
        </div>
      )}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Planning</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Team Members</h4>
              <p className="text-2xl font-bold text-blue-600">45</p>
              <p className="text-sm text-blue-700">Available resources</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">Utilization</h4>
              <p className="text-2xl font-bold text-green-600">78%</p>
              <p className="text-sm text-green-700">Average capacity</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Conflicts</h4>
              <p className="text-2xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-yellow-700">Resource conflicts</p>
            </div>
          </div>
          <p className="text-gray-600">Allocate team members to projects, track capacity utilization, manage skills matrix, and resolve resource conflicts with advanced planning tools.</p>
        </div>
      )}
      {activeTab === 'timesheets' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Timesheets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Hours Logged</h4>
              <p className="text-2xl font-bold text-blue-600">1,248</p>
              <p className="text-sm text-blue-700">This month</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">Billable Hours</h4>
              <p className="text-2xl font-bold text-green-600">956</p>
              <p className="text-sm text-green-700">76.6% billable</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Pending Approval</h4>
              <p className="text-2xl font-bold text-yellow-600">12</p>
              <p className="text-sm text-yellow-700">Timesheets</p>
            </div>
          </div>
          <p className="text-gray-600">Track time spent on project activities, manage timesheet approvals, analyze billable vs non-billable hours, and integrate with payroll systems.</p>
        </div>
      )}
      {activeTab === 'budgets' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Budgets & Forecasting</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Total Budget</h4>
              <p className="text-2xl font-bold text-blue-600">£2.4M</p>
              <p className="text-sm text-blue-700">All active projects</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">Spent</h4>
              <p className="text-2xl font-bold text-green-600">£1.8M</p>
              <p className="text-sm text-green-700">75% utilized</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Variance</h4>
              <p className="text-2xl font-bold text-yellow-600">-5.2%</p>
              <p className="text-sm text-yellow-700">Under budget</p>
            </div>
          </div>
          <p className="text-gray-600">Create project budgets, track actual vs planned costs, forecast completion costs, and analyze budget variance with detailed financial reporting.</p>
        </div>
      )}
      {activeTab === 'gantt' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Gantt Charts & Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Active Projects</h4>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-blue-700">In timeline view</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">On Schedule</h4>
              <p className="text-2xl font-bold text-green-600">9</p>
              <p className="text-sm text-green-700">75% on track</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Critical Path</h4>
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-yellow-700">Tasks on critical path</p>
            </div>
          </div>
          <p className="text-gray-600">Visualize project timelines, manage task dependencies, identify critical paths, and track milestone progress with interactive Gantt charts.</p>
        </div>
      )}
      {activeTab === 'reporting' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Reporting & Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Reports Generated</h4>
              <p className="text-2xl font-bold text-blue-600">156</p>
              <p className="text-sm text-blue-700">This month</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">Profitability</h4>
              <p className="text-2xl font-bold text-green-600">23.5%</p>
              <p className="text-sm text-green-700">Average margin</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">ROI</h4>
              <p className="text-2xl font-bold text-yellow-600">18.2%</p>
              <p className="text-sm text-yellow-700">Portfolio ROI</p>
            </div>
          </div>
          <p className="text-gray-600">Generate comprehensive project reports, analyze profitability, track KPIs, and create executive dashboards with advanced analytics and forecasting.</p>
        </div>
      )}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Management Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">General Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <span className="text-sm text-gray-700">Auto-assign project codes</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <span className="text-sm text-gray-700">Require budget approval</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <span className="text-sm text-gray-700">Enable time tracking</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <span className="text-sm text-gray-700">Send milestone notifications</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Default Values</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Default project manager</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option>Sarah Johnson</option>
                    <option>Mike Wilson</option>
                    <option>Emma Davis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Default billing rate</label>
                  <input type="number" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" defaultValue="150" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Project code format</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" defaultValue="PRJ-{YYYY}-{####}" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectManagement
