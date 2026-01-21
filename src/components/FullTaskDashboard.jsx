import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Camera, Lock, CheckCircle, X, HardHat, Clock, AlertCircle } from 'lucide-react';

const TaskDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [submission, setSubmission] = useState({
    notes: '', beforePhoto: '', afterPhoto: ''
  });

  // Load projects on mount
  useEffect(() => {
    api.get('/projects').then(res => setProjects(res.data)).catch(console.error);
  }, []);

  // Fetch tasks when project changes
  const fetchTasks = async (projId) => {
    try {
      const res = await api.get(`/tasks/project/${projId}`);
      setTasks(res.data.tasks || []);
    } catch (err) {
      setTasks([]);
    }
  };

  // FIX: Reset submission form when task changes
  useEffect(() => {
    setSubmission({ notes: '', beforePhoto: '', afterPhoto: '' });
  }, [selectedTask]);

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!submission.beforePhoto || !submission.afterPhoto) {
      return alert("Evidence required: Please click the Before and After boxes.");
    }

    try {
      await api.post('/tasks/submit-completion', {
        taskId: selectedTask.taskId,
        beforePhoto: submission.beforePhoto,
        afterPhoto: submission.afterPhoto,
        submissionNotes: submission.notes,
        voiceNote: "https://via.placeholder.com/voice.mp3"
      });

      // Update local state immediately
      const updatedTasks = tasks.map(t => 
        t.taskId === selectedTask.taskId ? { ...t, isLocked: true, aiVerified: true } : t
      );
      setTasks(updatedTasks);
      setSelectedTask({ ...selectedTask, isLocked: true, aiVerified: true });
      setShowSubmitModal(false);
      alert("Task Locked Successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Submission failed");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased overflow-hidden">
      {/* 1. PROJECT NAVIGATION */}
      <div className="w-20 bg-slate-900 flex flex-col items-center py-6 gap-4 shadow-2xl z-20">
        <div className="text-indigo-400 font-black text-xl mb-4 italic">B</div>
        {projects.map(p => (
          <button 
            key={p._id} 
            onClick={() => { setSelectedProject(p); fetchTasks(p.projectId); setSelectedTask(null); }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs transition-all ${selectedProject?.projectId === p.projectId ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'bg-slate-800 text-slate-500 hover:text-white'}`}
          >
            {p.name.substring(0, 2).toUpperCase()}
          </button>
        ))}
      </div>

      {/* 2. TASK GRID */}
      <div className="flex-1 overflow-y-auto p-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Field_Operations</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{selectedProject ? `Project: ${selectedProject.name}` : "Select a project to view tasks"}</p>
        </div>

        {!selectedProject ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-slate-300">
            <AlertCircle size={48} className="mb-2 opacity-20" />
            <p className="text-sm font-bold uppercase tracking-widest">No Project Selected</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(t => (
              <div 
                key={t._id} 
                onClick={() => setSelectedTask(t)} // FIX: Clicking the card triggers the sidebar
                className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all active:scale-95 shadow-sm hover:shadow-md ${selectedTask?.taskId === t.taskId ? 'border-indigo-500 bg-white' : t.isLocked ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100 hover:border-slate-300'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter ${t.isLocked ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-white'}`}>
                    {t.isLocked ? 'Locked' : 'Active'}
                  </span>
                  {t.isLocked && <CheckCircle size={16} className="text-emerald-500" />}
                </div>
                <h3 className="font-black text-slate-800 uppercase text-lg leading-none">{t.category}</h3>
                <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-tighter">{t.taskId}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. TASK DETAILS SIDEBAR */}
      {selectedTask && (
        <div className="w-96 bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inspection Panel</span>
            <X className="cursor-pointer text-slate-400 hover:text-slate-900" onClick={() => setSelectedTask(null)} />
          </div>

          <div className="p-8 flex-1 overflow-y-auto space-y-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 leading-none italic uppercase">{selectedTask.category}</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                  <HardHat size={14} /> Supervisor: {selectedTask.assignedSupervisor?.name || "Assigned"}
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                  <Clock size={14} /> Due: {new Date(selectedTask.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Objective Brief</p>
              <p className="text-sm text-slate-600 italic leading-relaxed">"{selectedTask.description?.text || "No specific instructions."}"</p>
            </div>

            {selectedTask.isLocked && (
              <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex flex-col items-center text-center">
                <CheckCircle size={32} className="text-emerald-500 mb-2" />
                <p className="text-xs font-black text-emerald-700 uppercase">Verification Complete</p>
                <p className="text-[10px] text-emerald-600 mt-1 uppercase font-bold tracking-widest">AI Audit Approved</p>
              </div>
            )}
          </div>

          <div className="p-8 border-t bg-slate-50/80">
            {!selectedTask.isLocked ? (
              <button 
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                Complete Objective
              </button>
            ) : (
              <div className="w-full py-4 bg-slate-200 text-slate-500 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2">
                <Lock size={14} /> Record Locked
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. SUBMISSION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-[100] p-6">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-2xl font-black mb-8 italic uppercase tracking-tighter">Submit Evidence</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div 
                onClick={() => setSubmission({...submission, beforePhoto: 'https://via.placeholder.com/before'})}
                className={`p-8 border-2 border-dashed rounded-[2rem] text-center cursor-pointer transition-all ${submission.beforePhoto ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'border-slate-200 text-slate-400 hover:bg-slate-50'}`}
              >
                <Camera className="mx-auto mb-1" /> <span className="text-[10px] font-black uppercase tracking-widest">Before</span>
              </div>
              <div 
                onClick={() => setSubmission({...submission, afterPhoto: 'https://via.placeholder.com/after'})}
                className={`p-8 border-2 border-dashed rounded-[2rem] text-center cursor-pointer transition-all ${submission.afterPhoto ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'border-slate-200 text-slate-400 hover:bg-slate-50'}`}
              >
                <Camera className="mx-auto mb-1" /> <span className="text-[10px] font-black uppercase tracking-widest">After</span>
              </div>
            </div>

            <textarea 
              className="w-full p-5 bg-slate-50 border-none rounded-2xl h-24 mb-6 outline-none text-sm font-medium focus:ring-2 focus:ring-indigo-500" 
              placeholder="Operational notes..."
              value={submission.notes}
              onChange={e => setSubmission({...submission, notes: e.target.value})}
            />

            <button onClick={handleFinalSubmit} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs hover:bg-emerald-700 shadow-xl shadow-emerald-100">
              Verify and Lock Task
            </button>
            <button onClick={() => setShowSubmitModal(false)} className="w-full mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;