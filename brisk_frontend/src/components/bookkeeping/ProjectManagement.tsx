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
        <div className="text-center py-12">
          <p className="text-gray-500">Tasks & milestones management coming soon...</p>
        </div>
      )}
      {activeTab === 'resources' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Resource planning coming soon...</p>
        </div>
      )}
      {activeTab === 'timesheets' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Project timesheets coming soon...</p>
        </div>
      )}
      {activeTab === 'budgets' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Budget & forecasting coming soon...</p>
        </div>
      )}
      {activeTab === 'gantt' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Gantt charts coming soon...</p>
        </div>
      )}
      {activeTab === 'reporting' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Project reporting coming soon...</p>
        </div>
      )}
      {activeTab === 'settings' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Project management settings coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default ProjectManagement
