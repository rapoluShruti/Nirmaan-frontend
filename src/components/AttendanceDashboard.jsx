import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { HardHat, UserPlus, Users, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

const AttendanceDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [workerPool, setWorkerPool] = useState([]);
  const [presentIds, setPresentIds] = useState([]);
  const [requiredToday, setRequiredToday] = useState(0);
  const [newWorkerName, setNewWorkerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState({ flagged: false, message: '' });

  // 1. Fetch available projects on load
  useEffect(() => {
    api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error("Could not load projects", err));
  }, []);

  // 2. Fetch Workers and "Needed" count when Project changes
  useEffect(() => {
    if (selectedProjectId) {
      loadProjectData();
    }
  }, [selectedProjectId]);

  const loadProjectData = async () => {
    setLoading(true);
    try {
      // Hits the route: router.get("/data/:projectId", ...)
      const res = await api.get(`/attendance/data/${selectedProjectId}`);
      setWorkerPool(res.data.workerPool);
      setRequiredToday(res.data.totalNeeded); // This will now show '2' if tasks are found
      setSyncStatus({ flagged: false, message: '' });
    } catch (err) {
      console.error("Error loading project data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWorker = async (e) => {
    e.preventDefault();
    if (!newWorkerName.trim()) return;
    try {
      const res = await api.post('/attendance/worker', { 
        name: newWorkerName, 
        projectId: selectedProjectId 
      });
      setWorkerPool([...workerPool, res.data]);
      setNewWorkerName('');
    } catch (err) {
      alert("Error adding worker");
    }
  };

  const toggleAttendance = (id) => {
    setPresentIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSyncAttendance = async () => {
    try {
      const res = await api.post('/attendance/mark', {
        projectId: selectedProjectId,
        workerIds: presentIds,
        totalNeeded: requiredToday // Sending the '2' needed workers to backend
      });
      setSyncStatus({ flagged: res.data.isFlagged, message: res.data.message });
      alert(res.data.isFlagged ? "⚠️ FLAG: Project Delayed!" : "✅ Sync Successful");
    } catch (err) {
      alert("Failed to sync attendance");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#e6f3ee] p-3 rounded-2xl">
              <HardHat className="text-teal-700" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight uppercase">Daily Attendance</h1>
              <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Workforce Tracking System</p>
            </div>
          </div>
          
          <select 
            className="w-full md:w-80 bg-slate-100 border-none rounded-2xl p-4 font-bold text-slate-700 focus:ring-2 focus:ring-teal-600 outline-none transition-all cursor-pointer"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
          >
            <option value="">Choose Project...</option>
            {projects.map(p => (
              <option key={p.projectId} value={p.projectId}>{p.name} ({p.projectId})</option>
            ))}
          </select>
        </header>

        {!selectedProjectId ? (
          <div className="flex flex-col items-center justify-center p-20 border-4 border-dashed border-slate-200 rounded-[3rem] text-slate-300">
            <Users size={64} className="mb-4 opacity-20" />
            <p className="font-black text-xl uppercase tracking-tighter">Please select a project to begin</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-teal-700" size={48} /></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sidebar: Stats & Add Worker */}
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Workers Needed Today</p>
                  <h2 className="text-8xl font-black">{requiredToday}</h2>
                  <p className="text-slate-500 text-xs mt-4">Based on tasks starting today or carried forward.</p>
                </div>
                <Users className="absolute -bottom-4 -right-4 text-slate-800 opacity-50" size={140} />
              </div>

              {syncStatus.flagged && (
                <div className="bg-red-50 border-2 border-red-200 p-6 rounded-[2rem] flex items-start gap-4 animate-pulse">
                  <AlertTriangle className="text-red-600 shrink-0" size={24} />
                  <div>
                    <h4 className="text-red-700 font-black text-sm uppercase">Delay Flagged</h4>
                    <p className="text-red-600 text-xs mt-1 font-medium">{syncStatus.message}</p>
                  </div>
                </div>
              )}

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <UserPlus size={16} /> Register New Worker
                </h3>
                <form onSubmit={handleAddWorker} className="space-y-4">
                  <input 
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-teal-600 transition-all"
                    placeholder="Full Name..."
                    value={newWorkerName}
                    onChange={(e) => setNewWorkerName(e.target.value)}
                  />
                  <button className="w-full bg-teal-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-800 transform active:scale-95 transition-all shadow-lg shadow-teal-100">
                    Add to Roster
                  </button>
                </form>
              </div>
            </div>

            {/* Main Section: Attendance Roster */}
            <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Worker Roster</h2>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Daily Log</p>
                </div>
                <div className="bg-white px-6 py-2 rounded-full border border-slate-200 shadow-sm text-xs font-black text-teal-700">
                  {presentIds.length} / {workerPool.length} PRESENT
                </div>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[500px] divide-y divide-slate-50 px-4">
                {workerPool.length === 0 ? (
                  <div className="p-20 text-center text-slate-300 font-bold uppercase tracking-widest italic text-sm">No workers found for this project</div>
                ) : (
                  workerPool.map((worker) => (
                    <div key={worker._id} className="p-6 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all ${presentIds.includes(worker._id) ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                          {worker.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-700 text-lg group-hover:text-slate-900 transition-colors">{worker.name}</span>
                      </div>
                      <button 
                        onClick={() => toggleAttendance(worker._id)}
                        className={`px-10 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                          presentIds.includes(worker._id) 
                          ? 'bg-green-500 text-white shadow-lg shadow-green-100' 
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {presentIds.includes(worker._id) ? 'PRESENT' : 'ABSENT'}
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <button 
                  onClick={handleSyncAttendance}
                  disabled={workerPool.length === 0}
                  className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] hover:bg-black transition-all transform active:scale-[0.98] shadow-2xl shadow-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm & Sync Attendance
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceDashboard;