
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Clock, Users, TrendingUp, Calendar, MapPin, User, FileText, Play, Filter, Download, Send, Package, AlertCircle, Activity, PieChart as PieChartIcon, BarChart3, X } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useParams } from "react-router-dom";

const DPRScreen = () => {
  const { id } = useParams();

  const [layoutImages, setLayoutImages] = useState([]);
  const [layoutLoading, setLayoutLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState({});
  const [showApprovalSection, setShowApprovalSection] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [approvalTimestamp, setApprovalTimestamp] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [showMaterialRequest, setShowMaterialRequest] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [requestQuantity, setRequestQuantity] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [requestNote, setRequestNote] = useState('');

  const dprData = {
    projectName: "Skyline Residences - Tower A",
    location: "Sector 62, Noida",
    date: "December 26, 2025",
    supervisor: "Rajesh Kumar",
    status: "Pending Approval",
    metrics: {
      workersRequired: 45,
      workersPresent: 42,
      workforceGap: -3,
      tasksCompleted: 8,
      tasksInProgress: 5
    },
    budget: {
      total: 5500000,
      usedTillYesterday: 3200000,
      usedToday: 185000,
      remaining: 2115000,
      warning: "Budget usage 8% higher than planned schedule"
    },
    tasks: [
      {
        id: "TSK-2401",
        name: "Floor 12 - Concrete Pouring",
        location: "Level 12",
        status: "Completed",
        workers: 12,
        output: "450 cu.m",
        delayReason: null,
        hasPhotos: true,
        beforePhoto: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
        afterPhoto: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
        beforeTime: "06:30 AM",
        afterTime: "04:45 PM",
        note: "Concrete consistency was good. Curing started immediately after finishing."
      },
      {
        id: "TSK-2402",
        name: "Floor 11 - Plumbing Installation",
        location: "Level 11",
        status: "In Progress",
        workers: 8,
        output: "65%",
        delayReason: "Material delivery delayed by 2 hours",
        hasPhotos: true,
        beforePhoto: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop",
        afterPhoto: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
        beforeTime: "07:00 AM",
        afterTime: "05:00 PM",
        note: "Progress slower due to late material arrival. Will complete by tomorrow noon."
      },
      {
        id: "TSK-2403",
        name: "Floor 10 - Electrical Conduit Work",
        location: "Level 10",
        status: "Completed",
        workers: 6,
        output: "100%",
        delayReason: null,
        hasPhotos: true,
        beforePhoto: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
        afterPhoto: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&h=300&fit=crop",
        beforeTime: "08:00 AM",
        afterTime: "03:30 PM",
        note: "All conduits installed as per electrical layout drawings."
      },
      {
        id: "TSK-2404",
        name: "Floor 9 - Masonry Work",
        location: "Level 9",
        status: "In Progress",
        workers: 10,
        output: "40%",
        delayReason: null,
        hasPhotos: true,
        beforePhoto: "https://images.unsplash.com/photo-1572981799976-87e8d8c5c1e3?w=400&h=300&fit=crop",
        afterPhoto: "https://images.unsplash.com/photo-1590496793907-12a68d5c3f85?w=400&h=300&fit=crop",
        beforeTime: "07:30 AM",
        afterTime: "05:15 PM",
        note: "Work progressing as planned. 4 more walls to complete."
      },
      {
        id: "TSK-2405",
        name: "Basement - Waterproofing Application",
        location: "Basement",
        status: "Completed",
        workers: 6,
        output: "280 sq.m",
        delayReason: null,
        hasPhotos: true,
        beforePhoto: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
        afterPhoto: "https://images.unsplash.com/photo-1597582977019-e4813cd95952?w=400&h=300&fit=crop",
        beforeTime: "06:00 AM",
        afterTime: "02:00 PM",
        note: "Two coats applied. Surface inspection passed."
      },
      {
        id: "TSK-2406",
        name: "Floor 8 - Steel Fixing",
        location: "Level 8",
        status: "Completed",
        workers: 9,
        output: "320 kg",
        delayReason: null,
        hasPhotos: true,
        beforePhoto: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
        afterPhoto: "https://images.unsplash.com/photo-1583846112095-8ea4c6df3dd1?w=400&h=300&fit=crop",
        beforeTime: "06:45 AM",
        afterTime: "04:00 PM",
        note: "Rebar placement completed as per structural drawings."
      },
      {
        id: "TSK-2407",
        name: "Basement - MEP Installation",
        location: "Basement",
        status: "In Progress",
        workers: 7,
        output: "55%",
        delayReason: "Equipment malfunction - 1 hour lost",
        hasPhotos: true,
        beforePhoto: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop",
        afterPhoto: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
        beforeTime: "08:30 AM",
        afterTime: "05:30 PM",
        note: "MEP work progressing. Minor equipment issue resolved."
      }
    ],
    materials: [
      { name: "Cement (50kg bags)", current: 45, minimum: 100, unit: "bags", status: "critical", requestable: true },
      { name: "TMT Steel Bars (12mm)", current: 280, minimum: 200, unit: "kg", status: "ok", requestable: true },
      { name: "Ready Mix Concrete", current: 15, minimum: 30, unit: "cu.m", status: "low", requestable: true },
      { name: "Plumbing Pipes (CPVC)", current: 8, minimum: 25, unit: "meters", status: "critical", requestable: true },
      { name: "Electrical Wires", current: 450, minimum: 300, unit: "meters", status: "ok", requestable: true },
      { name: "Wall Bricks", current: 1200, minimum: 1000, unit: "nos", status: "ok", requestable: false },
      { name: "Waterproofing Chemical", current: 12, minimum: 20, unit: "liters", status: "low", requestable: true },
      { name: "Paint (Primer)", current: 35, minimum: 40, unit: "liters", status: "low", requestable: true }
    ],
    issues: [
      {
        type: "warning",
        message: "Labour shortage detected",
        detail: "3 workers short of daily requirement"
      },
      {
        type: "alert",
        message: "Budget risk warning",
        detail: "Current burn rate exceeds planned schedule by 8%"
      },
      {
        type: "critical",
        message: "Critical material shortage",
        detail: "2 materials below minimum stock level"
      },
      {
        type: "info",
        message: "Work output tracking",
        detail: "Task completion rate: 62% (within acceptable range)"
      }
    ]
  };

  // Analytics data
  const taskStatusData = [
    { name: 'Completed', value: 8, color: '#f97316' },
    { name: 'In Progress', value: 5, color: '#fb923c' },
    { name: 'Delayed', value: 2, color: '#fdba74' }
  ];

  const workforceDistribution = [
    { location: 'Level 12', workers: 12 },
    { location: 'Level 11', workers: 8 },
    { location: 'Level 10', workers: 6 },
    { location: 'Level 9', workers: 10 },
    { location: 'Level 8', workers: 9 },
    { location: 'Basement', workers: 13 }
  ];

  const weeklyProgress = [
    { day: 'Mon', completed: 6, planned: 8 },
    { day: 'Tue', completed: 7, planned: 8 },
    { day: 'Wed', completed: 8, planned: 9 },
    { day: 'Thu', completed: 9, planned: 10 },
    { day: 'Fri', completed: 8, planned: 8 }
  ];

  const budgetBreakdown = [
    { name: 'Labor', value: 35, color: '#f97316' },
    { name: 'Materials', value: 42, color: '#fb923c' },
    { name: 'Equipment', value: 15, color: '#fdba74' },
    { name: 'Other', value: 8, color: '#fed7aa' }
  ];

  const toggleRow = (taskId) => {
    setExpandedRows(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleApprove = () => {
    setIsApproved(true);
    setApprovalTimestamp(new Date().toLocaleString());
    setShowApprovalSection(false);
  };

  const handleMaterialRequest = () => {
    alert(`Material Request Submitted!\n\nMaterial: ${selectedMaterial.name}\nQuantity: ${requestQuantity} ${selectedMaterial.unit}\nUrgency: ${urgency.toUpperCase()}\nNote: ${requestNote || 'None'}\n\nRequest will be processed by procurement team.`);
    setShowMaterialRequest(false);
    setSelectedMaterial(null);
    setRequestQuantity('');
    setRequestNote('');
    setUrgency('normal');
  };

  const getStatusBadge = (status) => {
    const styles = {
      "Draft": "bg-gray-100 text-gray-700",
      "Pending Approval": "bg-orange-100 text-orange-700 border-2 border-orange-300",
      "Approved": "bg-orange-100 text-orange-700 border-2 border-orange-500"
    };
    return styles[status] || styles["Draft"];
  };

  const formatCurrency = (amount) => {
    return `₹${(amount / 100000).toFixed(2)}L`;
  };

  const getMaterialStatusColor = (status) => {
    const colors = {
      critical: 'border-red-300 bg-red-50',
      low: 'border-orange-300 bg-orange-50',
      ok: 'border-green-300 bg-green-50'
    };
    return colors[status] || colors.ok;
  };

  const getMaterialTextColor = (status) => {
    const colors = {
      critical: 'text-red-700',
      low: 'text-orange-700',
      ok: 'text-green-700'
    };
    return colors[status] || colors.ok;
  };

  const filteredTasks = dprData.tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || task.location === filterLocation;
    return matchesStatus && matchesLocation;
  });

  const locations = [...new Set(dprData.tasks.map(t => t.location))];

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${id}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();
        setLayoutImages(data.layoutImages || []);
      } catch (err) {
        console.error("Layout fetch error:", err);
      } finally {
        setLayoutLoading(false);
      }
    };

    fetchLayout();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b-4 border-orange-500 shadow-xl">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-3xl font-black text-gray-900">{dprData.projectName}</h1>
                <div className="flex items-center space-x-6 mt-2 text-base text-gray-700">
                  <span className="flex items-center font-semibold">
                    <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                    {dprData.location}
                  </span>
                  <span className="flex items-center font-semibold">
                    <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                    {dprData.date}
                  </span>
                  <span className="flex items-center font-semibold">
                    <User className="w-5 h-5 mr-2 text-orange-500" />
                    {dprData.supervisor}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-6 py-3 border-3 border-orange-500 text-gray-900 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl flex items-center">
                <Download className="w-5 h-5 mr-2 text-orange-500" />
                Export PDF
              </button>
              <span className={`px-6 py-3 rounded-xl text-base font-black shadow-lg ${getStatusBadge(isApproved ? "Approved" : dprData.status)}`}>
                {isApproved ? "✓ Approved" : dprData.status}
              </span>
              {!isApproved && (
                <button
                  onClick={() => setShowApprovalSection(true)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-black hover:from-orange-600 hover:to-orange-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Approve DPR
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Metrics Overview */}
            <div className="grid grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border-3 border-orange-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-bold text-gray-700">Workers Required</span>
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-4xl font-black text-gray-900">{dprData.metrics.workersRequired}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border-3 border-orange-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-bold text-gray-700">Workers Present</span>
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-4xl font-black text-gray-900">{dprData.metrics.workersPresent}</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-3 border-red-300 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-black text-red-700">Workforce Gap</span>
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-4xl font-black text-red-600">
                  {dprData.metrics.workforceGap}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-3 border-green-300 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-black text-green-700">Tasks Completed</span>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-4xl font-black text-green-600">{dprData.metrics.tasksCompleted}</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-3 border-orange-300 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-black text-orange-700">Tasks In Progress</span>
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-4xl font-black text-orange-600">{dprData.metrics.tasksInProgress}</div>
              </div>
            </div>

            {/* Budget Summary */}
            <div className="bg-white rounded-2xl p-8 border-3 border-orange-200 mb-8 shadow-xl">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-7 h-7 mr-3 text-orange-500" />
                Budget Summary
              </h2>
              <div className="grid grid-cols-4 gap-8">
                <div>
                  <div className="text-base text-gray-700 mb-2 font-bold">Total Project Budget</div>
                  <div className="text-3xl font-black text-gray-900">{formatCurrency(dprData.budget.total)}</div>
                </div>
                <div>
                  <div className="text-base text-gray-700 mb-2 font-bold">Used Till Yesterday</div>
                  <div className="text-3xl font-black text-gray-900">{formatCurrency(dprData.budget.usedTillYesterday)}</div>
                </div>
                <div>
                  <div className="text-base text-gray-700 mb-2 font-bold">Used Today</div>
                  <div className="text-3xl font-black text-orange-600">{formatCurrency(dprData.budget.usedToday)}</div>
                </div>
                <div>
                  <div className="text-base text-gray-700 mb-2 font-bold">Remaining Budget</div>
                  <div className="text-3xl font-black text-green-600">{formatCurrency(dprData.budget.remaining)}</div>
                </div>
              </div>
              {dprData.budget.warning && (
                <div className="mt-6 p-5 bg-orange-50 border-3 border-orange-300 rounded-xl flex items-start shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-base font-bold text-orange-900">{dprData.budget.warning}</span>
                </div>
              )}
            </div>

            {/* Task Table with Filters */}
            <div className="bg-white rounded-2xl border-3 border-orange-200 shadow-xl mb-8">
              <div className="px-8 py-6 border-b-3 border-orange-200 flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900 flex items-center">
                  <FileText className="w-7 h-7 mr-3 text-orange-500" />
                  Task-wise Daily Progress Report
                  <span className="ml-4 text-base font-bold text-gray-600 bg-orange-100 px-4 py-2 rounded-xl">
                    {filteredTasks.length} of {dprData.tasks.length} tasks
                  </span>
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Filter className="w-5 h-5 text-orange-500" />
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="text-base font-bold border-2 border-orange-300 rounded-xl px-4 py-2 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 shadow-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                    <select 
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="text-base font-bold border-2 border-orange-300 rounded-xl px-4 py-2 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 shadow-sm"
                    >
                      <option value="all">All Locations</option>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-orange-50 to-orange-100 border-b-3 border-orange-200">
                    <tr>
                      <th className="px-8 py-5 text-left text-sm font-black text-gray-900 uppercase tracking-wider">Task ID</th>
                      <th className="px-8 py-5 text-left text-sm font-black text-gray-900 uppercase tracking-wider">Task Name</th>
                      <th className="px-8 py-5 text-left text-sm font-black text-gray-900 uppercase tracking-wider">Location</th>
                      <th className="px-8 py-5 text-left text-sm font-black text-gray-900 uppercase tracking-wider">Status</th>
                      <th className="px-8 py-5 text-left text-sm font-black text-gray-900 uppercase tracking-wider">Workers</th>
                      <th className="px-8 py-5 text-left text-sm font-black text-gray-900 uppercase tracking-wider">Output</th>
                      <th className="px-8 py-5 text-left text-sm font-black text-gray-900 uppercase tracking-wider">Delay Reason</th>
                      <th className="px-8 py-5 text-left text-sm font-black text-gray-900 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y-2 divide-orange-100">
                    {filteredTasks.map((task) => (
                      <React.Fragment key={task.id}>
                        <tr className="hover:bg-orange-50 cursor-pointer transition-all" onClick={() => toggleRow(task.id)}>
                          <td className="px-8 py-5 whitespace-nowrap text-base font-black text-gray-900">{task.id}</td>
                          <td className="px-8 py-5 text-base font-bold text-gray-900">{task.name}</td>
                          <td className="px-8 py-5 whitespace-nowrap text-base font-semibold text-gray-700">{task.location}</td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <span className={`px-4 py-2 rounded-xl text-sm font-black shadow-md ${
                              task.status === 'Completed' 
                                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                                : 'bg-orange-100 text-orange-800 border-2 border-orange-300'
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-base font-black text-gray-900">{task.workers}</td>
                          <td className="px-8 py-5 whitespace-nowrap text-base font-black text-orange-600">{task.output}</td>
                          <td className="px-8 py-5 text-sm font-bold text-gray-700">
                            {task.delayReason ? (
                              <span className="text-orange-700 flex items-center bg-orange-100 px-3 py-2 rounded-lg border-2 border-orange-300">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                {task.delayReason}
                              </span>
                            ) : (
                              <span className="text-gray-400 font-bold">—</span>
                            )}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-right">
                            {expandedRows[task.id] ? (
                              <ChevronUp className="w-6 h-6 text-orange-500" />
                            ) : (
                              <ChevronDown className="w-6 h-6 text-orange-500" />
                            )}
                          </td>
                        </tr>
                        {expandedRows[task.id] && (
                          <tr>
                            <td colSpan="8" className="px-8 py-8 bg-gradient-to-br from-orange-50 to-white">
                              <div className="space-y-6">
                                <h4 className="text-lg font-black text-gray-900 mb-4 flex items-center">
                                  <Activity className="w-6 h-6 mr-3 text-orange-500" />
                                  Photo Verification & Details
                                </h4>
                                <div className="grid grid-cols-2 gap-8">
                                  <div>
                                    <div className="text-base font-black text-gray-900 mb-3">Before Work Started</div>
                                    <div className="relative group">
                                      <img 
                                        src={task.beforePhoto} 
                                        alt="Before" 
                                        className="w-full h-64 object-cover rounded-2xl border-4 border-orange-300 shadow-xl group-hover:scale-105 transition-transform duration-300"
                                      />
                                      <div className="absolute bottom-3 left-3 bg-gray-900 bg-opacity-90 text-white text-sm font-bold px-4 py-2 rounded-xl">
                                        {task.beforeTime}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-base font-black text-gray-900 mb-3">After Work Completed</div>
                                    <div className="relative group">
                                      <img 
                                        src={task.afterPhoto} 
                                        alt="After" 
                                        className="w-full h-64 object-cover rounded-2xl border-4 border-orange-300 shadow-xl group-hover:scale-105 transition-transform duration-300"
                                      />
                                      <div className="absolute bottom-3 left-3 bg-gray-900 bg-opacity-90 text-white text-sm font-bold px-4 py-2 rounded-xl">
                                        {task.afterTime}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-6 p-6 bg-white rounded-2xl border-3 border-orange-300 shadow-lg">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="text-base font-black text-gray-900 mb-2 flex items-center">
                                        <FileText className="w-5 h-5 mr-2 text-orange-500" />
                                        Supervisor Note
                                      </div>
                                      <p className="text-base font-semibold text-gray-700">{task.note}</p>
                                    </div>
                                    <button className="flex items-center text-base font-bold text-orange-600 hover:text-orange-700 px-5 py-3 border-2 border-orange-300 rounded-xl hover:bg-orange-50 transition-all shadow-md hover:shadow-lg">
                                      <Play className="w-5 h-5 mr-2" />
                                      Voice Note
                                    </button>
                                  </div>
                                </div>
                                {task.status === 'In Progress' && (
                                  <div className="flex items-center text-base font-black text-orange-700 bg-orange-100 border-3 border-orange-300 rounded-xl p-5 shadow-lg">
                                    <span className="mr-3 text-2xl">🔁</span>
                                    <span>Auto carried forward to next day's DPR</span>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              {/* Task Status Distribution */}
              <div className="bg-white rounded-2xl p-6 border-3 border-orange-200 shadow-xl">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                  <PieChartIcon className="w-6 h-6 mr-3 text-orange-500" />
                  Task Status Distribution
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-5 space-y-3">
                  {taskStatusData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-base">
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-3 shadow-md" style={{ backgroundColor: item.color }}></div>
                        <span className="font-bold text-gray-900">{item.name}</span>
                      </div>
                      <span className="font-black text-gray-900 text-lg">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workforce Distribution */}
              <div className="bg-white rounded-2xl p-6 border-3 border-orange-200 shadow-xl">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-orange-500" />
                  Workforce Distribution
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={workforceDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                    <XAxis dataKey="location" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                    <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
                    <Tooltip />
                    <Bar dataKey="workers" fill="#f97316" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Budget Breakdown */}
              <div className="bg-white rounded-2xl p-6 border-3 border-orange-200 shadow-xl">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                  <PieChartIcon className="w-6 h-6 mr-3 text-orange-500" />
                  Today's Budget Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={budgetBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={(entry) => `${entry.value}%`}
                    >
                      {budgetBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-5 space-y-3">
                  {budgetBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-base">
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-3 shadow-md" style={{ backgroundColor: item.color }}></div>
                        <span className="font-bold text-gray-900">{item.name}</span>
                      </div>
                      <span className="font-black text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Progress Trend */}
            <div className="bg-white rounded-2xl p-8 border-3 border-orange-200 shadow-xl mb-8">
              <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <Activity className="w-7 h-7 mr-3 text-orange-500" />
                Weekly Progress Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                  <XAxis dataKey="day" tick={{ fontWeight: 'bold' }} />
                  <YAxis tick={{ fontWeight: 'bold' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#f97316" strokeWidth={3} name="Completed Tasks" />
                  <Line type="monotone" dataKey="planned" stroke="#fb923c" strokeWidth={3} strokeDasharray="5 5" name="Planned Tasks" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Material Inventory Section */}
            <div className="bg-white rounded-2xl p-8 border-3 border-orange-200 shadow-xl mb-8">
              <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <Package className="w-7 h-7 mr-3 text-orange-500" />
                Material Inventory Status
                <span className="ml-4 text-base font-black text-red-700 bg-red-100 px-4 py-2 rounded-xl border-2 border-red-300">
                  2 Critical Alerts
                </span>
              </h3>
              <div className="grid grid-cols-4 gap-6">
                {dprData.materials.map((material, index) => (
                  <div key={index} className={`p-6 rounded-2xl border-3 shadow-lg hover:shadow-xl transition-all ${getMaterialStatusColor(material.status)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-base font-black text-gray-900">{material.name}</div>
                        <div className={`text-sm mt-2 font-black ${getMaterialTextColor(material.status)}`}>
                          {material.status === 'critical' ? '⚠️ Critical' : material.status === 'low' ? '⚡ Low Stock' : '✓ Adequate'}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                        <span>Current</span>
                        <span>Min Required</span>
                      </div>
                      <div className="flex justify-between text-base font-black">
                        <span className={material.current < material.minimum ? 'text-red-700' : 'text-gray-900'}>
                          {material.current} {material.unit}
                        </span>
                        <span className="text-gray-600">{material.minimum} {material.unit}</span>
                      </div>
                      <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full ${material.status === 'critical' ? 'bg-red-500' : material.status === 'low' ? 'bg-orange-500' : 'bg-green-500'}`}
                          style={{ width: `${Math.min((material.current / material.minimum) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    {material.requestable && material.status !== 'ok' && (
                      <button 
                        onClick={() => {
                          setSelectedMaterial(material);
                          setShowMaterialRequest(true);
                        }}
                        className="mt-4 w-full text-sm font-black bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Request Stock
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SITE LAYOUT PREVIEW */}
            <div className="bg-white rounded-2xl p-8 border-3 border-orange-200 mb-8 shadow-xl">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <MapPin className="w-7 h-7 mr-3 text-orange-500" />
                Site Layout
                <span className="ml-4 text-base font-bold text-gray-600">
                  (Project blueprints)
                </span>
              </h2>

              {layoutLoading ? (
                <div className="py-12 text-center text-gray-400 text-lg font-bold">
                  Loading layout…
                </div>
              ) : layoutImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {layoutImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-video rounded-2xl overflow-hidden border-3 border-orange-300 bg-orange-50 shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                    >
                      <img
                        src={img}
                        alt={`Layout ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border-4 border-dashed border-orange-300 rounded-2xl text-gray-400 text-lg font-bold bg-orange-50">
                  No layout images uploaded for this project
                </div>
              )}
            </div>

            {/* Approval Section */}
            {showApprovalSection && !isApproved && (
              <div className="bg-white rounded-2xl border-4 border-orange-500 p-8 shadow-2xl">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="w-7 h-7 mr-3 text-orange-500" />
                  Engineer Review & Approval
                </h3>
                <div className="mb-6">
                  <label className="block text-base font-black text-gray-900 mb-3">
                    Engineer Remarks (Optional)
                  </label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Add observations, concerns, or notes about today's progress. Include any deviations from plan, quality issues, or recommendations..."
                    className="w-full px-6 py-4 border-3 border-orange-300 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 resize-none font-semibold shadow-sm"
                    rows="4"
                  />
                </div>
                <div className="bg-orange-50 border-3 border-orange-300 rounded-2xl p-6 mb-6 shadow-lg">
                  <h4 className="text-lg font-black text-gray-900 mb-4">Pre-Approval Checklist</h4>
                  <div className="space-y-3 text-base font-bold text-gray-800">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                      All completed tasks have before & after photos
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                      Budget expenditure verified
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                      Worker attendance recorded
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-3 text-orange-600" />
                      2 materials require urgent restocking
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowApprovalSection(false)}
                    className="px-8 py-4 border-3 border-gray-300 text-gray-900 rounded-xl font-black hover:bg-gray-100 transition-all shadow-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApprove}
                    className="px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-black hover:from-green-600 hover:to-green-700 transition-all flex items-center shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    <CheckCircle className="w-6 h-6 mr-3" />
                    Approve & Lock DPR
                  </button>
                </div>
              </div>
            )}

            {isApproved && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-4 border-green-500 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-start">
                  <CheckCircle className="w-8 h-8 text-green-600 mr-4 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-green-900 mb-2">✓ DPR Approved Successfully</h3>
                    <p className="text-base font-bold text-green-800 mb-4">
                      Approved on {approvalTimestamp} • This report is now locked and will be used for billing, reporting, and invoicing.
                    </p>
                    {remarks && (
                      <div className="mt-5 p-6 bg-white rounded-2xl border-3 border-green-300 shadow-lg">
                        <div className="text-base font-black text-gray-900 mb-2">Engineer Remarks</div>
                        <p className="text-base font-semibold text-gray-700">{remarks}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl border-3 border-orange-200 p-6 sticky top-6 shadow-xl">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-orange-500" />
                Issues & Flags
              </h3>
              <div className="space-y-4">
                {dprData.issues.map((issue, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-xl border-3 shadow-lg hover:shadow-xl transition-all ${
                      issue.type === 'warning'
                        ? 'bg-red-50 border-red-300'
                        : issue.type === 'alert'
                        ? 'bg-orange-50 border-orange-300'
                        : issue.type === 'critical'
                        ? 'bg-red-100 border-red-400'
                        : 'bg-orange-50 border-orange-300'
                    }`}
                  >
                    <div className={`text-base font-black mb-2 ${
                      issue.type === 'warning' || issue.type === 'critical'
                        ? 'text-red-900'
                        : issue.type === 'alert'
                        ? 'text-orange-900'
                        : 'text-orange-900'
                    }`}>
                      {issue.message}
                    </div>
                    <div className={`text-sm font-bold ${
                      issue.type === 'warning' || issue.type === 'critical'
                        ? 'text-red-700'
                        : issue.type === 'alert'
                        ? 'text-orange-700'
                        : 'text-orange-700'
                    }`}>
                      {issue.detail}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t-3 border-orange-200">
                <h4 className="text-lg font-black text-gray-900 mb-5">Quick Stats</h4>
                <div className="space-y-4 text-base">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-700">Total Tasks Today</span>
                    <span className="font-black text-gray-900">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-700">Completion Rate</span>
                    <span className="font-black text-green-600">53%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-700">Avg. Task Duration</span>
                    <span className="font-black text-gray-900">6.8 hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-700">Weather Delay</span>
                    <span className="font-black text-gray-900">0 hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-700">Safety Incidents</span>
                    <span className="font-black text-green-600">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Material Request Modal */}
      {showMaterialRequest && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border-4 border-orange-500">
            <div className="flex items-center justify-between p-8 border-b-3 border-orange-200">
              <h3 className="text-2xl font-black text-gray-900 flex items-center">
                <Send className="w-7 h-7 mr-3 text-orange-500" />
                Material Stock Request
              </h3>
              <button 
                onClick={() => {
                  setShowMaterialRequest(false);
                  setSelectedMaterial(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-base font-black text-gray-900 mb-2">Material</label>
                <input 
                  type="text" 
                  value={selectedMaterial.name} 
                  disabled 
                  className="w-full px-6 py-4 border-3 border-orange-300 rounded-xl bg-orange-50 text-gray-900 font-bold shadow-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-black text-gray-900 mb-2">Current Stock</label>
                  <input 
                    type="text" 
                    value={`${selectedMaterial.current} ${selectedMaterial.unit}`} 
                    disabled 
                    className="w-full px-6 py-4 border-3 border-orange-300 rounded-xl bg-orange-50 text-gray-900 font-bold shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-base font-black text-gray-900 mb-2">Minimum Required</label>
                  <input 
                    type="text" 
                    value={`${selectedMaterial.minimum} ${selectedMaterial.unit}`} 
                    disabled 
                    className="w-full px-6 py-4 border-3 border-orange-300 rounded-xl bg-orange-50 text-gray-900 font-bold shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-base font-black text-gray-900 mb-2">Request Quantity*</label>
                <div className="flex items-center space-x-3">
                  <input 
                    type="number" 
                    value={requestQuantity}
                    onChange={(e) => setRequestQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    className="flex-1 px-6 py-4 border-3 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 font-bold shadow-sm"
                  />
                  <span className="text-base text-gray-700 font-black">{selectedMaterial.unit}</span>
                </div>
              </div>
              <div>
                <label className="block text-base font-black text-gray-900 mb-2">Urgency Level*</label>
                <select 
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-6 py-4 border-3 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 font-bold shadow-sm"
                >
                  <option value="normal">Normal (3-5 days)</option>
                  <option value="urgent">Urgent (1-2 days)</option>
                  <option value="critical">Critical (Same day)</option>
                </select>
              </div>
              <div>
                <label className="block text-base font-black text-gray-900 mb-2">Additional Notes</label>
                <textarea 
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  placeholder="Specify delivery location, quality requirements, or any special instructions..."
                  className="w-full px-6 py-4 border-3 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 resize-none font-semibold shadow-sm"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-8 border-t-3 border-orange-200 bg-orange-50">
              <button
                onClick={() => {
                  setShowMaterialRequest(false);
                  setSelectedMaterial(null);
                }}
                className="px-8 py-4 border-3 border-gray-300 text-gray-900 rounded-xl font-black hover:bg-gray-100 transition-all shadow-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleMaterialRequest}
                disabled={!requestQuantity}
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-black hover:from-orange-600 hover:to-orange-700 transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Send className="w-5 h-5 mr-3" />
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DPRScreen;
