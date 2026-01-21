import React, { useState } from 'react';
import { 
  MapPin, Calendar, DollarSign, AlertTriangle, TrendingUp, 
  TrendingDown, Download, ChevronRight, ChevronLeft, X, 
  CheckCircle, Clock, Image as ImageIcon, FileText, Phone,
  Mail, Maximize2, BarChart3, Minus, Eye, Share2
} from 'lucide-react';

const OwnerClientView = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showDailySummary, setShowDailySummary] = useState(null);
  const [showGantt, setShowGantt] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, photos, timeline, financials

  // Mock Data
  const portfolio = {
    totalInvestment: 58.6,
    activeProjects: 4,
    onTrack: 2,
    atRisk: 1,
    delayed: 1,
    totalProgress: 54
  };

  const projects = [
    {
      id: 1,
      name: 'Metro Plaza Commercial Complex',
      location: 'Bandra West, Mumbai',
      status: 'critical',
      health: 45,
      progress: 42,
      startDate: '2023-07-01',
      expectedCompletion: '2026-07-01',
      currentDelay: 12,
      revisedCompletion: '2026-07-13',
      budget: {
        total: 12.5,
        spent: 9.75,
        percentage: 78,
        remaining: 2.75,
        projected: 13.2,
        variance: 0.7
      },
      billing: {
        totalMilestones: 8,
        completed: 3,
        nextMilestone: 'Structural Work Completion',
        nextAmount: 2.5,
        nextDue: '2026-02-15'
      },
      risks: [
        { 
          type: 'critical', 
          category: 'Material',
          title: 'Steel shortage causing delay', 
          impact: '8-day delay in structural work',
          raisedDate: '2026-01-10',
          status: 'active'
        },
        { 
          type: 'critical', 
          category: 'Budget',
          title: 'Budget overrun projected', 
          impact: '₹70L excess due to material price increase',
          raisedDate: '2026-01-12',
          status: 'active'
        }
      ],
      recentPhotos: [
        {
          id: 1,
          milestone: 'Foundation Work',
          date: '2026-01-10',
          before: '/api/placeholder/400/300',
          after: '/api/placeholder/400/300',
          description: 'Foundation excavation and concrete pouring completed',
          approvedBy: 'Rajesh Kumar - Site Manager',
          location: 'Block A, Ground Level'
        },
        {
          id: 2,
          milestone: 'Column Casting - Floor 1',
          date: '2026-01-08',
          before: '/api/placeholder/400/300',
          after: '/api/placeholder/400/300',
          description: 'First floor column work in progress',
          approvedBy: 'Rajesh Kumar - Site Manager',
          location: 'Block A, Floor 1'
        }
      ],
      dailySummaries: [
        {
          date: '2026-01-15',
          weather: 'Clear',
          workCompleted: 'Foundation work Block B completed. Column reinforcement started.',
          workersPresent: 42,
          materialsUsed: 'Cement: 150 bags, Steel: 2.5 tons',
          issues: 'Steel delivery delayed by 1 day',
          nextDayPlan: 'Continue column work, start floor slab preparation',
          submittedBy: 'Rajesh Kumar',
          approvedBy: 'Amit Sharma - Project Manager'
        },
        {
          date: '2026-01-14',
          weather: 'Partly Cloudy',
          workCompleted: 'Column casting Floor 1 completed. Curing in progress.',
          workersPresent: 45,
          materialsUsed: 'Concrete: 8 cubic meters, Steel: 1.8 tons',
          issues: 'None',
          nextDayPlan: 'Foundation work Block B',
          submittedBy: 'Rajesh Kumar',
          approvedBy: 'Amit Sharma - Project Manager'
        }
      ],
      ganttData: [
        { phase: 'Site Preparation', start: 0, duration: 15, progress: 100, status: 'completed' },
        { phase: 'Foundation Work', start: 15, duration: 45, progress: 100, status: 'completed' },
        { phase: 'Structural Work', start: 60, duration: 90, progress: 45, status: 'in-progress' },
        { phase: 'MEP Installation', start: 120, duration: 60, progress: 0, status: 'pending' },
        { phase: 'Finishing Work', start: 180, duration: 75, status: 'pending' },
        { phase: 'Final Inspection', start: 255, duration: 10, status: 'pending' }
      ],
      manager: {
        name: 'Rajesh Kumar',
        role: 'Project Manager',
        phone: '+91 98765 43210',
        email: 'rajesh.kumar@construction.com'
      }
    },
    {
      id: 2,
      name: 'Green Valley Residential',
      location: 'Whitefield, Bangalore',
      status: 'warning',
      health: 68,
      progress: 58,
      startDate: '2023-08-15',
      expectedCompletion: '2026-05-15',
      currentDelay: 3,
      revisedCompletion: '2026-05-18',
      budget: {
        total: 8.3,
        spent: 5.64,
        percentage: 68,
        remaining: 2.66,
        projected: 8.5,
        variance: 0.2
      },
      billing: {
        totalMilestones: 6,
        completed: 3,
        nextMilestone: 'Roofing Completion',
        nextAmount: 1.8,
        nextDue: '2026-02-28'
      },
      risks: [
        { 
          type: 'warning', 
          category: 'Weather',
          title: 'Monsoon impact expected', 
          impact: 'Potential 5-day delay in exterior work',
          raisedDate: '2026-01-13',
          status: 'monitoring'
        }
      ],
      recentPhotos: [
        {
          id: 3,
          milestone: 'Roofing Work',
          date: '2026-01-12',
          before: '/api/placeholder/400/300',
          after: '/api/placeholder/400/300',
          description: 'Roof structure installation in progress',
          approvedBy: 'Suresh Patil - Site Manager',
          location: 'Building A'
        }
      ],
      dailySummaries: [
        {
          date: '2026-01-15',
          weather: 'Light Rain',
          workCompleted: 'Interior plastering Building A completed.',
          workersPresent: 32,
          materialsUsed: 'Cement: 80 bags, Sand: 4 tons',
          issues: 'Rain delayed exterior work',
          nextDayPlan: 'Continue interior work, weather permitting start exterior',
          submittedBy: 'Suresh Patil',
          approvedBy: 'Amit Sharma - Project Manager'
        }
      ],
      ganttData: [
        { phase: 'Site Preparation', start: 0, duration: 10, progress: 100, status: 'completed' },
        { phase: 'Foundation Work', start: 10, duration: 30, progress: 100, status: 'completed' },
        { phase: 'Structural Work', start: 40, duration: 60, progress: 85, status: 'in-progress' },
        { phase: 'Roofing', start: 90, duration: 20, progress: 40, status: 'in-progress' },
        { phase: 'Interior Work', start: 110, duration: 45, progress: 0, status: 'pending' },
        { phase: 'Final Touches', start: 155, duration: 15, status: 'pending' }
      ],
      manager: {
        name: 'Suresh Patil',
        role: 'Project Manager',
        phone: '+91 98765 43211',
        email: 'suresh.patil@construction.com'
      }
    },
    {
      id: 3,
      name: 'Prestige Heights Tower',
      location: 'Koramangala, Bangalore',
      status: 'good',
      health: 88,
      progress: 65,
      startDate: '2023-06-01',
      expectedCompletion: '2026-09-01',
      currentDelay: 0,
      revisedCompletion: '2026-09-01',
      budget: {
        total: 15.8,
        spent: 9.8,
        percentage: 62,
        remaining: 6.0,
        projected: 15.5,
        variance: -0.3
      },
      billing: {
        totalMilestones: 10,
        completed: 6,
        nextMilestone: 'Floor 8-10 Completion',
        nextAmount: 2.2,
        nextDue: '2026-03-15'
      },
      risks: [],
      recentPhotos: [
        {
          id: 4,
          milestone: 'Floor 7 Completion',
          date: '2026-01-14',
          before: '/api/placeholder/400/300',
          after: '/api/placeholder/400/300',
          description: 'Seventh floor structural work completed',
          approvedBy: 'Amit Sharma - Site Manager',
          location: 'Tower A, Floor 7'
        }
      ],
      dailySummaries: [
        {
          date: '2026-01-15',
          weather: 'Clear',
          workCompleted: 'Floor 8 slab casting completed. Floor 7 finishing work ongoing.',
          workersPresent: 58,
          materialsUsed: 'Concrete: 12 cubic meters, Steel: 3.2 tons',
          issues: 'None',
          nextDayPlan: 'Start Floor 9 column work, continue Floor 7 finishing',
          submittedBy: 'Amit Sharma',
          approvedBy: 'Vikram Singh - Project Director'
        }
      ],
      ganttData: [
        { phase: 'Site Preparation', start: 0, duration: 20, progress: 100, status: 'completed' },
        { phase: 'Foundation & Basement', start: 20, duration: 60, progress: 100, status: 'completed' },
        { phase: 'Structural Work (Floors 1-5)', start: 80, duration: 80, progress: 100, status: 'completed' },
        { phase: 'Structural Work (Floors 6-10)', start: 160, duration: 80, progress: 65, status: 'in-progress' },
        { phase: 'MEP & Finishing', start: 240, duration: 90, progress: 0, status: 'pending' },
        { phase: 'Final Handover', start: 330, duration: 20, status: 'pending' }
      ],
      manager: {
        name: 'Amit Sharma',
        role: 'Project Manager',
        phone: '+91 98765 43212',
        email: 'amit.sharma@construction.com'
      }
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' };
      case 'warning': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', dot: 'bg-yellow-500' };
      case 'good': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', dot: 'bg-green-500' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-500' };
    }
  };

  const formatCurrency = (amount) => `₹${amount.toFixed(2)} Cr`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const calculateDaysRemaining = (completionDate) => {
    const today = new Date();
    const completion = new Date(completionDate);
    const diffTime = completion - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Portfolio Dashboard
  const PortfolioDashboard = () => (
    <div className="space-y-6">
      {/* Portfolio Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Projects</h1>
            <p className="text-slate-300">Total Investment: {formatCurrency(portfolio.totalInvestment)}</p>
          </div>
          <button 
            onClick={() => setShowExportMenu(true)}
            className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <Download size={18} />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-3xl font-bold mb-1">{portfolio.activeProjects}</div>
            <div className="text-sm text-slate-300">Active Projects</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{portfolio.onTrack}</div>
            <div className="text-sm text-slate-300">On Track</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">{portfolio.atRisk}</div>
            <div className="text-sm text-slate-300">At Risk</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">{portfolio.delayed}</div>
            <div className="text-sm text-slate-300">Delayed</div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {projects.some(p => p.risks.some(r => r.type === 'critical')) && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-1">Critical Issues Require Attention</h3>
              <p className="text-sm text-red-700">
                {projects.filter(p => p.risks.some(r => r.type === 'critical')).length} project(s) have critical issues that may impact timeline or budget
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Project Cards */}
      <div className="space-y-4">
        {projects.sort((a, b) => {
          const priority = { critical: 0, warning: 1, good: 2 };
          return priority[a.status] - priority[b.status];
        }).map(project => {
          const colors = getStatusColor(project.status);
          const daysRemaining = calculateDaysRemaining(project.revisedCompletion);
          
          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`${colors.bg} border-2 ${colors.border} rounded-xl p-5 cursor-pointer hover:shadow-lg transition-all`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-xl text-gray-900">{project.name}</h3>
                    <div className={`w-3 h-3 rounded-full ${colors.dot}`}></div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin size={14} />
                    {project.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900">{project.health}</div>
                  <div className="text-xs text-gray-600">Health Score</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Overall Progress</span>
                  <span className="font-bold text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 ${colors.dot} transition-all duration-500`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                    <Calendar size={12} />
                    <span>Timeline</span>
                  </div>
                  <div className={`text-lg font-bold ${project.currentDelay > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {project.currentDelay > 0 ? `-${project.currentDelay}d` : 'On Time'}
                  </div>
                  <div className="text-xs text-gray-600">{daysRemaining} days left</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                    <DollarSign size={12} />
                    <span>Budget</span>
                  </div>
                  <div className={`text-lg font-bold ${project.budget.percentage > 75 ? 'text-red-600' : 'text-gray-900'}`}>
                    {project.budget.percentage}%
                  </div>
                  <div className="text-xs text-gray-600">{formatCurrency(project.budget.remaining)} left</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                    <CheckCircle size={12} />
                    <span>Billing</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {project.billing.completed}/{project.billing.totalMilestones}
                  </div>
                  <div className="text-xs text-gray-600">Milestones</div>
                </div>
              </div>

              {/* Critical Risks */}
              {project.risks.filter(r => r.type === 'critical').length > 0 && (
                <div className="space-y-2 mb-4">
                  {project.risks.filter(r => r.type === 'critical').slice(0, 2).map((risk, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-red-100 rounded-lg p-3">
                      <AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-red-900">{risk.title}</div>
                        <div className="text-xs text-red-800">{risk.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                <div className="text-sm text-gray-600">
                  Next Milestone: <span className="font-medium text-gray-900">{project.billing.nextMilestone}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Project Detail View
  const ProjectDetailView = ({ project }) => {
    const colors = getStatusColor(project.status);
    const daysRemaining = calculateDaysRemaining(project.revisedCompletion);

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ChevronLeft size={20} />
          Back to Portfolio
        </button>

        {/* Project Header */}
        <div className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
                <div className={`w-4 h-4 rounded-full ${colors.dot}`}></div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                <MapPin size={14} />
                {project.location}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone size={14} />
                  <a href={`tel:${project.manager.phone}`} className="hover:text-blue-600">{project.manager.phone}</a>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Mail size={14} />
                  <a href={`mailto:${project.manager.email}`} className="hover:text-blue-600">{project.manager.name}</a>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-gray-900 mb-1">{project.health}</div>
              <div className="text-sm text-gray-600">Health Score</div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">Overall Progress</span>
              <span className="font-bold text-gray-900">{project.progress}%</span>
            </div>
            <div className="w-full bg-white/60 rounded-full h-4 overflow-hidden">
              <div
                className={`h-4 ${colors.dot} transition-all duration-500`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/70 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-gray-900">{daysRemaining}</div>
              <div className="text-xs text-gray-600">Days Remaining</div>
            </div>
            <div className="bg-white/70 rounded-lg p-3 text-center">
              <div className={`text-2xl font-bold ${project.currentDelay > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {project.currentDelay > 0 ? `-${project.currentDelay}` : '0'}
              </div>
              <div className="text-xs text-gray-600">Days Delayed</div>
            </div>
            <div className="bg-white/70 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-gray-900">{project.budget.percentage}%</div>
              <div className="text-xs text-gray-600">Budget Used</div>
            </div>
            <div className="bg-white/70 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-gray-900">{project.billing.completed}/{project.billing.totalMilestones}</div>
              <div className="text-xs text-gray-600">Milestones</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {['overview', 'photos', 'timeline', 'financials'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[100px] px-4 py-3 font-medium text-sm transition-all ${
                  activeTab === tab
                    ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab project={project} />}
            {activeTab === 'photos' && <PhotosTab project={project} />}
            {activeTab === 'timeline' && <TimelineTab project={project} />}
            {activeTab === 'financials' && <FinancialsTab project={project} />}
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={() => setShowExportMenu(true)}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
        >
          <Download size={20} />
          Export Project Report
        </button>
      </div>
    );
  };

  // Overview Tab
  const OverviewTab = ({ project }) => (
    <div className="space-y-6">
      {/* Risks & Alerts */}
      {project.risks.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-600" />
            Active Risks & Issues
          </h3>
          <div className="space-y-3">
            {project.risks.map((risk, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-4 border-2 ${
                  risk.type === 'critical'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    risk.type === 'critical' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    <AlertTriangle size={18} className={risk.type === 'critical' ? 'text-red-600' : 'text-yellow-600'} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        risk.type === 'critical'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {risk.category.toUpperCase()}
                      </span>
                      <span className={`text-xs font-medium ${
                        risk.type === 'critical' ? 'text-red-700' : 'text-yellow-700'
                      }`}>
                        Raised on {formatDate(risk.raisedDate)}
                      </span>
                    </div>
                    <h4 className={`font-bold text-sm mb-1 ${
                      risk.type === 'critical' ? 'text-red-900' : 'text-yellow-900'
                    }`}>
                      {risk.title}
                    </h4>
                    <p className={`text-sm ${
                      risk.type === 'critical' ? 'text-red-800' : 'text-yellow-800'
                    }`}>
                      Impact: {risk.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline Summary */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Calendar size={18} className="text-blue-600" />
          Timeline Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Project Start Date</span>
            <span className="font-semibold text-gray-900">{formatDate(project.startDate)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Original Completion</span>
            <span className="font-semibold text-gray-900">{formatDate(project.expectedCompletion)}</span>
          </div>
          {project.currentDelay > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Current Delay</span>
              <span className="font-semibold text-red-600">{project.currentDelay} days</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-900">Revised Completion</span>
            <span className="font-bold text-lg text-gray-900">{formatDate(project.revisedCompletion)}</span>
          </div>
        </div>
      </div>

      {/* Recent Daily Summaries */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <FileText size={18} className="text-green-600" />
          Recent Daily Progress Reports
        </h3>
        <div className="space-y-3">
          {project.dailySummaries.slice(0, 3).map((summary, idx) => (
            <div
              key={idx}
              onClick={() => setShowDailySummary(summary)}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-gray-900">{formatDate(summary.date)}</div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Eye size={12} />
                  <span>View Details</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{summary.workCompleted}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Weather: {summary.weather}</span>
                <span>Workers: {summary.workersPresent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Milestone */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <h3 className="font-bold text-blue-900 mb-3">Next Billing Milestone</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">Milestone</span>
            <span className="font-semibold text-blue-900">{project.billing.nextMilestone}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">Amount</span>
            <span className="font-bold text-lg text-blue-900">{formatCurrency(project.billing.nextAmount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">Expected Date</span>
            <span className="font-semibold text-blue-900">{formatDate(project.billing.nextDue)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Photos Tab
  const PhotosTab = ({ project }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-900">Progress Photos</h3>
        <span className="text-sm text-gray-600">{project.recentPhotos.length} milestones documented</span>
      </div>

      <div className="space-y-6">
        {project.recentPhotos.map(photo => (
          <div key={photo.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">{photo.milestone}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(photo.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {photo.location}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPhoto(photo)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <Maximize2 size={14} />
                  View Full
                </button>
              </div>
              <p className="text-sm text-gray-700">{photo.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-0">
              <div className="relative group">
                <img
                  src={photo.before}
                  alt="Before"
                  className="w-full aspect-video object-cover cursor-pointer"
                  onClick={() => setSelectedPhoto({ ...photo, view: 'before' })}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold text-lg">BEFORE</span>
                </div>
              </div>
              <div className="relative group">
                <img
                  src={photo.after}
                  alt="After"
                  className="w-full aspect-video object-cover cursor-pointer"
                  onClick={() => setSelectedPhoto({ ...photo, view: 'after' })}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold text-lg">AFTER</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>Approved by: {photo.approvedBy}</span>
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle size={12} />
                  Verified
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Timeline Tab with Gantt Chart
  const TimelineTab = ({ project }) => {
    const totalDays = project.ganttData[project.ganttData.length - 1].start + 
                      (project.ganttData[project.ganttData.length - 1].duration || 0);
    const today = Math.floor((new Date() - new Date(project.startDate)) / (1000 * 60 * 60 * 24));

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Project Timeline</h3>
          <button
            onClick={() => setShowGantt(true)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
          >
            <Maximize2 size={14} />
            Full Screen View
          </button>
        </div>

        {/* Gantt Chart */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Duration: <span className="font-bold text-gray-900">{totalDays} days</span></span>
              <span className="text-gray-600">Current Day: <span className="font-bold text-gray-900">{today}</span></span>
            </div>
          </div>

          <div className="p-4 overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Timeline Header */}
              <div className="flex mb-2">
                <div className="w-48"></div>
                <div className="flex-1 relative h-8">
                  {/* Month markers */}
                  <div className="absolute inset-0 flex">
                    {Array.from({ length: Math.ceil(totalDays / 30) }).map((_, i) => (
                      <div key={i} className="flex-1 border-l border-gray-300 px-2">
                        <span className="text-xs text-gray-600">Month {i + 1}</span>
                      </div>
                    ))}
                  </div>
                  {/* Today marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                    style={{ left: `${(today / totalDays) * 100}%` }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                      Today
                    </div>
                  </div>
                </div>
              </div>

              {/* Gantt Bars */}
              <div className="space-y-3">
                {project.ganttData.map((phase, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-48 pr-4">
                      <div className="font-medium text-sm text-gray-900">{phase.phase}</div>
                      {phase.progress !== undefined && (
                        <div className="text-xs text-gray-600">{phase.progress}% complete</div>
                      )}
                    </div>
                    <div className="flex-1 relative h-10">
                      {/* Background grid */}
                      <div className="absolute inset-0 flex">
                        {Array.from({ length: Math.ceil(totalDays / 30) }).map((_, i) => (
                          <div key={i} className="flex-1 border-l border-gray-200"></div>
                        ))}
                      </div>
                      {/* Phase bar */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 h-6 rounded-lg overflow-hidden"
                        style={{
                          left: `${(phase.start / totalDays) * 100}%`,
                          width: `${((phase.duration || 0) / totalDays) * 100}%`
                        }}
                      >
                        <div className={`h-full ${
                          phase.status === 'completed' ? 'bg-green-500' :
                          phase.status === 'in-progress' ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`}>
                          {phase.progress !== undefined && (
                            <div
                              className="h-full bg-green-600"
                              style={{ width: `${phase.progress}%` }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-xs text-gray-600">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-xs text-gray-600">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span className="text-xs text-gray-600">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-0.5 h-4 bg-red-500"></div>
                  <span className="text-xs text-gray-600">Current Date</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Details */}
        <div className="space-y-3">
          {project.ganttData.map((phase, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-gray-900">{phase.phase}</div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                  phase.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  {phase.status === 'completed' ? 'Completed' :
                   phase.status === 'in-progress' ? 'In Progress' :
                   'Pending'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Duration: </span>
                  <span className="font-medium text-gray-900">{phase.duration || 'TBD'} days</span>
                </div>
                {phase.progress !== undefined && (
                  <div>
                    <span className="text-gray-600">Progress: </span>
                    <span className="font-medium text-gray-900">{phase.progress}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Financials Tab
  const FinancialsTab = ({ project }) => (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign size={20} className="text-green-600" />
          Budget Overview
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total Budget</span>
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(project.budget.total)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Amount Spent</span>
            <span className="text-xl font-bold text-gray-900">{formatCurrency(project.budget.spent)}</span>
          </div>
          <div className="w-full bg-white rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 transition-all duration-500 ${
                project.budget.percentage > 90 ? 'bg-red-500' :
                project.budget.percentage > 75 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${project.budget.percentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-green-200">
            <span className="text-gray-700">Remaining Budget</span>
            <span className="text-xl font-bold text-green-600">{formatCurrency(project.budget.remaining)}</span>
          </div>
        </div>
      </div>

      {/* Budget Variance */}
      <div className={`rounded-xl p-4 border-2 ${
        project.budget.variance > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-1">Projected vs Budget</div>
            <div className="flex items-center gap-2">
              {project.budget.variance > 0 ? (
                <TrendingUp className="text-red-600" size={20} />
              ) : (
                <TrendingDown className="text-green-600" size={20} />
              )}
              <span className={`text-2xl font-bold ${
                project.budget.variance > 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {project.budget.variance > 0 ? '+' : ''}{formatCurrency(Math.abs(project.budget.variance))}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Projected Total</div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(project.budget.projected)}</div>
          </div>
        </div>
        {project.budget.variance > 0 && (
          <div className="mt-3 pt-3 border-t border-red-200">
            <p className="text-sm text-red-800">
              ⚠️ Project is projected to exceed budget by {formatCurrency(project.budget.variance)}
            </p>
          </div>
        )}
      </div>

      {/* Billing Milestones */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">Billing Milestones</h3>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Milestones Completed</span>
              <span className="font-bold text-gray-900">
                {project.billing.completed} of {project.billing.totalMilestones}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(project.billing.completed / project.billing.totalMilestones) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {/* Completed Milestones */}
            {Array.from({ length: project.billing.completed }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Milestone {idx + 1}</div>
                    <div className="text-xs text-gray-600">Completed & Paid</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{formatCurrency(project.budget.total / project.billing.totalMilestones)}</div>
                  <div className="text-xs text-green-600">Paid</div>
                </div>
              </div>
            ))}

            {/* Next Milestone */}
            <div className="flex items-center justify-between p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="text-blue-600" size={20} />
                <div>
                  <div className="font-medium text-gray-900">{project.billing.nextMilestone}</div>
                  <div className="text-xs text-gray-600">Due: {formatDate(project.billing.nextDue)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{formatCurrency(project.billing.nextAmount)}</div>
                <div className="text-xs text-blue-600">Upcoming</div>
              </div>
            </div>

            {/* Pending Milestones */}
            {Array.from({ length: project.billing.totalMilestones - project.billing.completed - 1 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Minus className="text-gray-400" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Milestone {project.billing.completed + idx + 2}</div>
                    <div className="text-xs text-gray-600">Pending</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{formatCurrency(project.budget.total / project.billing.totalMilestones)}</div>
                  <div className="text-xs text-gray-500">Pending</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 mb-4">Cost Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="text-gray-700">Materials</span>
            <span className="font-semibold text-gray-900">{formatCurrency(project.budget.spent * 0.45)}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="text-gray-700">Labor</span>
            <span className="font-semibold text-gray-900">{formatCurrency(project.budget.spent * 0.35)}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="text-gray-700">Equipment</span>
            <span className="font-semibold text-gray-900">{formatCurrency(project.budget.spent * 0.12)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Other Expenses</span>
            <span className="font-semibold text-gray-900">{formatCurrency(project.budget.spent * 0.08)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Photo Viewer Modal
  const PhotoViewerModal = () => {
    if (!selectedPhoto) return null;

    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
        <div className="flex justify-between items-center p-4 bg-black/50">
          <div className="text-white">
            <h3 className="font-bold text-lg">{selectedPhoto.milestone}</h3>
            <p className="text-sm text-gray-300">{selectedPhoto.location} • {formatDate(selectedPhoto.date)}</p>
          </div>
          <button
            onClick={() => setSelectedPhoto(null)}
            className="text-white hover:text-gray-300 p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <img
                  src={selectedPhoto.before}
                  alt="Before"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg font-bold">
                  BEFORE
                </div>
              </div>
              <div className="relative">
                <img
                  src={selectedPhoto.after}
                  alt="After"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg font-bold">
                  AFTER
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-black/50 text-white">
          <p className="text-center mb-2">{selectedPhoto.description}</p>
          <p className="text-center text-sm text-gray-300">
            Approved by: {selectedPhoto.approvedBy}
          </p>
        </div>
      </div>
    );
  };

  // Daily Summary Modal
  const DailySummaryModal = () => {
    if (!showDailySummary) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-2xl">
            <div>
              <h2 className="font-bold text-lg text-gray-900">Daily Progress Report</h2>
              <p className="text-sm text-gray-600">{formatDate(showDailySummary.date)}</p>
            </div>
            <button
              onClick={() => setShowDailySummary(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-blue-600" />
                <h3 className="font-bold text-gray-900">Weather Conditions</h3>
              </div>
              <p className="text-gray-700">{showDailySummary.weather}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-green-600" />
                <h3 className="font-bold text-gray-900">Work Completed</h3>
              </div>
              <p className="text-gray-700">{showDailySummary.workCompleted}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={18} className="text-gray-600" />
                <h3 className="font-bold text-gray-900">Resources</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Workers Present</span>
                  <span className="font-semibold text-gray-900">{showDailySummary.workersPresent}</span>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Materials Used</div>
                  <p className="text-sm text-gray-700">{showDailySummary.materialsUsed}</p>
                </div>
              </div>
            </div>

            {showDailySummary.issues !== 'None' && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} className="text-yellow-600" />
                  <h3 className="font-bold text-gray-900">Issues Reported</h3>
                </div>
                <p className="text-gray-700">{showDailySummary.issues}</p>
              </div>
            )}

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} className="text-purple-600" />
                <h3 className="font-bold text-gray-900">Next Day Plan</h3>
              </div>
              <p className="text-gray-700">{showDailySummary.nextDayPlan}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="text-sm text-gray-600 space-y-1">
                <div>Submitted by: <span className="font-medium text-gray-900">{showDailySummary.submittedBy}</span></div>
                <div>Approved by: <span className="font-medium text-gray-900">{showDailySummary.approvedBy}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Export Menu Modal
  const ExportMenuModal = () => {
    if (!showExportMenu) return null;

    const exportOptions = [
      { id: 'summary', name: 'Executive Summary', desc: 'High-level overview with key metrics', icon: FileText },
      { id: 'detailed', name: 'Detailed Report', desc: 'Complete project report with all data', icon: FileText },
      { id: 'financial', name: 'Financial Report', desc: 'Budget, billing, and cost breakdown', icon: DollarSign },
      { id: 'timeline', name: 'Timeline Report', desc: 'Gantt chart and schedule analysis', icon: Calendar },
      { id: 'photos', name: 'Photo Documentation', desc: 'All progress photos with descriptions', icon: ImageIcon }
    ];

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-xl text-gray-900">Export Report</h2>
              <button
                onClick={() => setShowExportMenu(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">Choose the type of report you want to export</p>
          </div>

          <div className="p-6 space-y-3">
            {exportOptions.map(option => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    // Handle export
                    alert(`Exporting ${option.name}...`);
                    setShowExportMenu(false);
                  }}
                  className="w-full flex items-start gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-left"
                >
                  <div className="bg-white p-3 rounded-lg">
                    <Icon size={24} className="text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{option.name}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </div>
                  <Download size={20} className="text-gray-400 mt-1" />
                </button>
              );
            })}
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Share2 size={16} />
              <span>Reports will be generated as PDF and sent to your email</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Full Screen Gantt Modal
  const FullScreenGanttModal = () => {
    if (!showGantt || !selectedProject) return null;

    const totalDays = selectedProject.ganttData[selectedProject.ganttData.length - 1].start + 
                      (selectedProject.ganttData[selectedProject.ganttData.length - 1].duration || 0);
    const today = Math.floor((new Date() - new Date(selectedProject.startDate)) / (1000 * 60 * 60 * 24));

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">{selectedProject.name} - Project Timeline</h2>
            <p className="text-sm text-slate-300">Interactive Gantt Chart View</p>
          </div>
          <button
            onClick={() => setShowGantt(false)}
            className="text-white hover:text-gray-300 p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <div className="min-w-[800px]">
            {/* Timeline Header */}
            <div className="flex mb-4">
              <div className="w-64"></div>
              <div className="flex-1 relative h-16 bg-gray-50 rounded-lg">
                {/* Month markers */}
                <div className="absolute inset-0 flex">
                  {Array.from({ length: Math.ceil(totalDays / 30) }).map((_, i) => (
                    <div key={i} className="flex-1 border-l border-gray-300 px-3 py-2">
                      <div className="font-bold text-sm text-gray-900">Month {i + 1}</div>
                      <div className="text-xs text-gray-600">{30 * i} - {30 * (i + 1)} days</div>
                    </div>
                  ))}
                </div>
                {/* Today marker */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-red-500 z-10"
                  style={{ left: `${(today / totalDays) * 100}%` }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap font-bold">
                    TODAY (Day {today})
                  </div>
                </div>
              </div>
            </div>

            {/* Gantt Bars */}
            <div className="space-y-4">
              {selectedProject.ganttData.map((phase, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-64 pr-6">
                    <div className="font-bold text-gray-900 mb-1">{phase.phase}</div>
                    {phase.progress !== undefined && (
                      <div className="text-sm text-gray-600">Progress: {phase.progress}%</div>
                    )}
                    {phase.duration && (
                      <div className="text-sm text-gray-600">Duration: {phase.duration} days</div>
                    )}
                  </div>
                  <div className="flex-1 relative h-16 bg-gray-50 rounded-lg">
                    {/* Background grid */}
                    <div className="absolute inset-0 flex">
                      {Array.from({ length: Math.ceil(totalDays / 30) }).map((_, i) => (
                        <div key={i} className="flex-1 border-l border-gray-200"></div>
                      ))}
                    </div>
                    {/* Phase bar */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-10 rounded-lg overflow-hidden shadow-lg"
                      style={{
                        left: `${(phase.start / totalDays) * 100}%`,
                        width: `${((phase.duration || 0) / totalDays) * 100}%`
                      }}
                    >
                      <div className={`h-full relative ${
                        phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}>
                        {phase.progress !== undefined && (
                          <div
                            className="h-full bg-green-600 transition-all duration-500"
                            style={{ width: `${phase.progress}%` }}
                          ></div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                          {phase.progress !== undefined ? `${phase.progress}%` : phase.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-red-500"></div>
                <span className="text-sm font-medium text-gray-700">Current Date</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-3">
          <button
            onClick={() => alert('Downloading Gantt Chart...')}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Download size={18} />
            Download Chart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FieldTrack</h1>
              <p className="text-sm text-gray-600">Client Dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowExportMenu(true)}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {selectedProject ? (
          <ProjectDetailView project={selectedProject} />
        ) : (
          <PortfolioDashboard />
        )}
      </div>

      {/* Modals */}
      {selectedPhoto && <PhotoViewerModal />}
      {showDailySummary && <DailySummaryModal />}
      {showExportMenu && <ExportMenuModal />}
      {showGantt && <FullScreenGanttModal />}
    </div>
  );
};

export default OwnerClientView;