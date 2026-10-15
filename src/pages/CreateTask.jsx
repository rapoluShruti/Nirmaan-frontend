
// // // import React, { useState, useEffect } from 'react';
// // // import api from '../api/axiosConfig';

// // // const CreateTask = () => {
// // //   const [projects, setProjects] = useState([]);
// // //   const [selectedProject, setSelectedProject] = useState(null);
// // //   const [selectedImage, setSelectedImage] = useState('');
// // //   const [existingTasks, setExistingTasks] = useState([]);
  
// // //   // State for creating a NEW task
// // //   const [newCoords, setNewCoords] = useState(null);
// // //   const [showForm, setShowForm] = useState(false);
// // //   const [taskData, setTaskData] = useState({
// // //     category: '',
// // //     assignedSupervisor: '',
// // //     startDate: '',
// // //     endDate: '',
// // //     workersRequired: 1,
// // //     priority: 'Medium'
// // //   });

// // //   // 1. Fetch all projects on load
// // //   useEffect(() => {
// // //     api.get('/projects').then(res => setProjects(res.data)).catch(console.error);
// // //   }, []);

// // //   // 2. Fetch tasks whenever a project is selected
// // //   useEffect(() => {
// // //     if (selectedProject) {
// // //       // Endpoint from task.routes.js: /project/:projectId
// // //       api.get(`/tasks/project/${selectedProject.projectId}`)
// // //         .then(res => setExistingTasks(res.data.tasks))
// // //         .catch(() => setExistingTasks([])); // Reset if no tasks found
// // //     }
// // //   }, [selectedProject]);

// // //   const handleImageClick = (e) => {
// // //     const rect = e.target.getBoundingClientRect();
// // //     const x = ((e.clientX - rect.left) / rect.width) * 100;
// // //     const y = ((e.clientY - rect.top) / rect.height) * 100;
    
// // //     setNewCoords({ xPercent: x.toFixed(2), yPercent: y.toFixed(2) });
// // //     setShowForm(true);
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const payload = {
// // //         ...taskData,
// // //         projectId: selectedProject.projectId,
// // //         layoutImage: selectedImage,
// // //         coordinates: newCoords,
// // //       };
// // //       const res = await api.post('/tasks/create', payload);
      
// // //       // Refresh pins after creation
// // //       setExistingTasks([...existingTasks, res.data.task]);
// // //       setShowForm(false);
// // //       setNewCoords(null);
// // //     } catch (err) {
// // //       alert(err.response?.data?.error || "Error");
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-8 bg-gray-100 min-h-screen">
// // //       {/* Project Selector */}
// // //       <div className="mb-8 bg-white p-4 rounded shadow">
// // //         <label className="block font-bold mb-2">1. Select Project</label>
// // //         <select 
// // //           className="w-full p-2 border"
// // //           onChange={(e) => setSelectedProject(projects.find(p => p._id === e.target.value))}
// // //         >
// // //           <option value="">-- Choose --</option>
// // //           {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
// // //         </select>
// // //       </div>

// // //       {selectedProject && (
// // //         <div className="mb-8 bg-white p-4 rounded shadow">
// // //           <label className="block font-bold mb-2">2. Choose Floor Plan</label>
// // //           <div className="flex gap-4">
// // //             {selectedProject.layoutImages.map((img, i) => (
// // //               <img 
// // //                 key={i} src={img} alt="layout" 
// // //                 className={`w-24 h-24 cursor-pointer border-2 ${selectedImage === img ? 'border-teal-700' : 'border-gray-200'}`}
// // //                 onClick={() => setSelectedImage(img)}
// // //               />
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* THE LAYOUT VIEWPORT */}
// // //       {selectedImage && (
// // //         <div className="relative inline-block bg-white p-2 rounded shadow-xl border border-gray-300">
// // //           <h3 className="mb-2 font-semibold text-gray-600 text-center italic">Click anywhere to create a new task</h3>
          
// // //           <div className="relative">
// // //             <img 
// // //               src={selectedImage} 
// // //               alt="Layout" 
// // //               className="max-w-4xl block h-auto cursor-crosshair"
// // //               onClick={handleImageClick}
// // //             />

// // //             {/* RENDER EXISTING TASK PINS */}
// // //             {existingTasks.filter(t => t.layoutImage === selectedImage).map((task) => (
// // //               <div 
// // //                 key={task._id}
// // //                 className="absolute group"
// // //                 style={{ 
// // //                   left: `${task.coordinates.xPercent}%`, 
// // //                   top: `${task.coordinates.yPercent}%`,
// // //                   transform: 'translate(-50%, -50%)'
// // //                 }}
// // //               >
// // //                 {/* The Pin Icon */}
// // //                 <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${task.priority === 'High' ? 'bg-red-600' : 'bg-teal-700'}`}></div>
                
// // //                 {/* Hover Tooltip with Task Details */}
// // //                 <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs p-2 rounded whitespace-nowrap z-50">
// // //                    <p><strong>{task.category}</strong></p>
// // //                    <p>ID: {task.taskId}</p>
// // //                    <p>Priority: {task.priority}</p>
// // //                 </div>
// // //               </div>
// // //             ))}

// // //             {/* TEMP PIN FOR NEW TASK */}
// // //             {newCoords && (
// // //               <div 
// // //                 className="absolute w-5 h-5 bg-yellow-400 border-2 border-black rounded-full animate-bounce"
// // //                 style={{ left: `${newCoords.xPercent}%`, top: `${newCoords.yPercent}%`, transform: 'translate(-50%, -50%)' }}
// // //               />
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* NEW TASK FORM MODAL/DRAWER */}
// // //       {showForm && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
// // //           <div className="bg-white p-6 rounded-lg w-96 shadow-2xl">
// // //             <h3 className="text-xl font-bold mb-4">New Task Detail</h3>
// // //             <form onSubmit={handleSubmit} className="space-y-3">
// // //               <input type="text" placeholder="Category" className="w-full p-2 border" required 
// // //                 onChange={e => setTaskData({...taskData, category: e.target.value})} />
// // //               <input type="text" placeholder="Supervisor ID" className="w-full p-2 border" required 
// // //                 onChange={e => setTaskData({...taskData, assignedSupervisor: e.target.value})} />
// // //               <select className="w-full p-2 border" onChange={e => setTaskData({...taskData, priority: e.target.value})}>
// // //                 <option value="Medium">Medium</option>
// // //                 <option value="High">High</option>
// // //                 <option value="Critical">Critical</option>
// // //               </select>
// // //               <div className="flex gap-2">
// // //                 <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded">Create</button>
// // //                 <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-300 py-2 rounded">Cancel</button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default CreateTask;
// import React, { useState, useEffect } from 'react';
// import api from '../api/axiosConfig';
// import { MapPin, Info, X, HardHat, Calendar, Layout, Plus, AlertCircle } from 'lucide-react';

// const CreateTask = () => {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [selectedImage, setSelectedImage] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);

//   // Form States
//   const [showForm, setShowForm] = useState(false);
//   const [newCoords, setNewCoords] = useState(null);
//   const [formData, setFormData] = useState({
//     category: '',
//     assignedSupervisor: '',
//     startDate: '',
//     endDate: '',
//     workersRequired: 1,
//     priority: 'Medium',
//     descriptionText: '' // Flat state for the input
//   });

//   // 1. Fetch Projects
//   useEffect(() => {
//     api.get('/projects').then(res => setProjects(res.data)).catch(console.error);
//   }, []);

//   // 2. Fetch Tasks when project/image is selected
//   useEffect(() => {
//     if (selectedProject) {
//       api.get(`/tasks/project/${selectedProject.projectId}`)
//         .then(res => setTasks(res.data.tasks || []))
//         .catch(() => setTasks([]));
      
//       if (selectedProject.layoutImages?.length > 0 && !selectedImage) {
//         setSelectedImage(selectedProject.layoutImages[0]);
//       }
//     }
//   }, [selectedProject]);

//   const handleImageClick = (e) => {
//     const rect = e.target.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
    
//     setNewCoords({ xPercent: parseFloat(x.toFixed(2)), yPercent: parseFloat(y.toFixed(2)) });
//     setShowForm(true);
//   };

//   const handleCreateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // CONSTRUCTING THE EXACT JSON STRUCTURE YOU PROVIDED
//       const payload = {
//         projectId: selectedProject.projectId,
//         layoutImage: selectedImage,
//         coordinates: {
//           xPercent: newCoords.xPercent,
//           yPercent: newCoords.yPercent
//         },
//         category: formData.category,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         workersRequired: parseInt(formData.workersRequired),
//         assignedSupervisor: formData.assignedSupervisor,
//         priority: formData.priority,
//         description: {
//           text: formData.descriptionText // Nested object as requested
//         }
//       };

//       const res = await api.post('/tasks/create', payload);
//       setTasks([...tasks, res.data.task]);
//       setShowForm(false);
//       setNewCoords(null);
//       alert("Task Created Successfully!");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.error || "Check if Supervisor ID is valid and you are logged in.");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
//       {/* LEFT: PROJECT & FLOOR PLAN SELECTION */}
//       <div className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
//         <div className="p-6 border-b border-slate-100 bg-indigo-900 text-white">
//           <h2 className="text-xl font-bold flex items-center gap-2"><Layout size={20}/> Construction</h2>
//         </div>
        
//         <div className="flex-1 overflow-y-auto p-4 space-y-6">
//           <div>
//             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Select Project</label>
//             <select 
//               className="w-full mt-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
//               onChange={(e) => setSelectedProject(projects.find(p => p._id === e.target.value))}
//             >
//               <option value="">-- Choose Project --</option>
//               {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
//             </select>
//           </div>

//           {selectedProject && (
//             <div>
//               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Floor Plan</label>
//               <div className="grid grid-cols-2 gap-2 mt-2">
//                 {selectedProject.layoutImages.map((img, i) => (
//                   <button 
//                     key={i} 
//                     onClick={() => setSelectedImage(img)}
//                     className={`aspect-video rounded border-2 overflow-hidden ${selectedImage === img ? 'border-indigo-600' : 'border-slate-100'}`}
//                   >
//                     <img src={img} alt="layout" className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* CENTER: INTERACTIVE LAYOUT & LIST */}
//       <div className="flex-1 flex flex-col relative bg-slate-100 overflow-hidden">
//         {!selectedProject ? (
//           <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
//             <AlertCircle size={48} className="mb-2 opacity-20" />
//             <p>Select a project to view the construction layout</p>
//           </div>
//         ) : (
//           <>
//             {/* THE IMAGE CONTAINER */}
//             <div className="flex-[3] relative p-10 flex items-center justify-center overflow-auto border-b border-slate-200">
//               <div className="relative inline-block bg-white p-2 shadow-2xl rounded-lg border border-slate-300">
//                 <img 
//                   src={selectedImage} 
//                   alt="Layout" 
//                   className="max-h-[55vh] w-auto cursor-crosshair block"
//                   onClick={handleImageClick}
//                 />
                
//                 {/* TASK PINS */}
//                 {tasks.filter(t => t.layoutImage === selectedImage).map(task => (
//                   <div 
//                     key={task._id}
//                     className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-150 transition-all flex items-center justify-center
//                       ${task.priority === 'High' ? 'bg-red-500' : 'bg-indigo-500'}`}
//                     style={{ left: `${task.coordinates.xPercent}%`, top: `${task.coordinates.yPercent}%` }}
//                     onClick={(e) => { e.stopPropagation(); setSelectedTask(task); }}
//                   >
//                     <MapPin size={12} className="text-white" />
//                   </div>
//                 ))}

//                 {/* CREATION PIN */}
//                 {newCoords && (
//                   <div className="absolute w-6 h-6 -ml-3 -mt-3 bg-yellow-400 border-2 border-black rounded-full animate-bounce shadow-xl"
//                     style={{ left: `${newCoords.xPercent}%`, top: `${newCoords.yPercent}%` }} />
//                 )}
//               </div>
//             </div>

//             {/* THE TASK LIST TABLE */}
//             <div className="flex-[2] bg-white overflow-y-auto shadow-inner">
//               <div className="p-4 border-b bg-slate-50 sticky top-0 font-bold text-xs uppercase text-slate-500 flex justify-between">
//                 <span>Task Overview</span>
//                 <span>{tasks.length} Total</span>
//               </div>
//               <table className="w-full text-left">
//                 <tbody className="divide-y divide-slate-100">
//                   {tasks.map(t => (
//                     <tr 
//                       key={t._id} 
//                       onClick={() => setSelectedTask(t)}
//                       className="hover:bg-indigo-50 cursor-pointer transition-colors"
//                     >
//                       <td className="p-4">
//                         <p className="font-bold text-slate-700 text-sm">{t.category}</p>
//                         <p className="text-[10px] text-slate-400 font-mono">{t.taskId}</p>
//                       </td>
//                       <td className="p-4">
//                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
//                           {t.priority}
//                         </span>
//                       </td>
//                       <td className="p-4 text-right">
//                         <Info size={16} className="inline text-slate-300" />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>

//       {/* RIGHT: DETAIL SIDEBAR */}
//       {selectedTask && (
//         <div className="w-80 bg-white border-l border-slate-200 shadow-2xl flex flex-col p-6 animate-in slide-in-from-right">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold text-slate-800">Task Information</h3>
//             <button onClick={() => setSelectedTask(null)} className="p-1 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
//           </div>
          
//           <div className="space-y-6 flex-1 overflow-y-auto">
//             <div>
//               <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Category</p>
//               <h2 className="text-2xl font-black text-indigo-900">{selectedTask.category}</h2>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-slate-50 p-3 rounded-lg">
//                 <p className="text-[10px] font-bold text-slate-400 uppercase">Priority</p>
//                 <p className="font-bold text-sm">{selectedTask.priority}</p>
//               </div>
//               <div className="bg-slate-50 p-3 rounded-lg">
//                 <p className="text-[10px] font-bold text-slate-400 uppercase">Workers</p>
//                 <p className="font-bold text-sm">{selectedTask.workersRequired}</p>
//               </div>
//             </div>

//             <div className="space-y-4 pt-4 border-t border-slate-100">
//               <div className="flex gap-3">
//                 <HardHat className="text-indigo-500" size={18} />
//                 <div><p className="text-[10px] font-bold text-slate-400">SUPERVISOR</p><p className="text-sm">{selectedTask.assignedSupervisor?.name || selectedTask.assignedSupervisor}</p></div>
//               </div>
//               <div className="flex gap-3">
//                 <Calendar className="text-indigo-500" size={18} />
//                 <div><p className="text-[10px] font-bold text-slate-400">DATE</p><p className="text-sm">{new Date(selectedTask.startDate).toLocaleDateString()}</p></div>
//               </div>
//             </div>

//             <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 italic text-sm text-indigo-700">
//               "{selectedTask.description?.text || "No specific instructions provided."}"
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CREATION MODAL */}
//       {showForm && (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
//           <form onSubmit={handleCreateSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
//             <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
//               <div>
//                 <h3 className="text-xl font-bold">Add Task</h3>
//                 <p className="text-xs opacity-70">Location: {newCoords.xPercent}% , {newCoords.yPercent}%</p>
//               </div>
//               <Plus className="rotate-45 cursor-pointer" onClick={() => setShowForm(false)} />
//             </div>
            
//             <div className="p-8 space-y-4">
//               <input type="text" placeholder="Category (e.g. Plumbing)" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" required 
//                 onChange={e => setFormData({...formData, category: e.target.value})} />
              
//               <div className="grid grid-cols-2 gap-3">
//                 <input type="date" className="w-full p-3 border rounded-xl text-sm" required 
//                   onChange={e => setFormData({...formData, startDate: e.target.value})} />
//                 <input type="date" className="w-full p-3 border rounded-xl text-sm" required 
//                   onChange={e => setFormData({...formData, endDate: e.target.value})} />
//               </div>

//               <input type="text" placeholder="Supervisor User ID (24-char ID)" className="w-full p-3 border rounded-xl outline-none" required 
//                 onChange={e => setFormData({...formData, assignedSupervisor: e.target.value})} />

//               <div className="grid grid-cols-2 gap-3">
//                  <select className="p-3 border rounded-xl text-sm" onChange={e => setFormData({...formData, priority: e.target.value})}>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                     <option value="Critical">Critical</option>
//                  </select>
//                  <input type="number" placeholder="Workers" className="p-3 border rounded-xl text-sm" onChange={e => setFormData({...formData, workersRequired: e.target.value})} />
//               </div>

//               <textarea placeholder="Instructions..." className="w-full p-3 border rounded-xl h-24 resize-none outline-none" required 
//                 onChange={e => setFormData({...formData, descriptionText: e.target.value})} />

//               <div className="flex gap-3 pt-4">
//                 <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Create Task</button>
//                 <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-100 text-slate-500 py-3 rounded-xl font-bold">Cancel</button>
//               </div>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateTask;
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { 
  MapPin, X, HardHat, Calendar, Layout, Plus, AlertCircle, 
  Hammer, ShieldCheck, ShieldAlert, Navigation, Package, Clock, Users, Layers 
} from 'lucide-react';

const CreateTask = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Form State for creation
  const [showForm, setShowForm] = useState(false);
  const [newCoords, setNewCoords] = useState(null);
  const [formData, setFormData] = useState({
    category: '', assignedSupervisor: '', startDate: '', endDate: '',
    workersRequired: 1, priority: 'Medium', descriptionText: '', materialsRequired: '' 
  });

  // Load Projects
  useEffect(() => {
    api.get('/projects').then(res => setProjects(res.data)).catch(console.error);
  }, []);

  // Fetch Tasks when project/floor-plan changes
  useEffect(() => {
    if (selectedProject) {
      api.get(`/tasks/project/${selectedProject.projectId}`)
        .then(res => setTasks(res.data.tasks || []))
        .catch(() => setTasks([]));
      
      if (selectedProject.layoutImages?.length > 0 && !selectedImage) {
        setSelectedImage(selectedProject.layoutImages[0]);
      }
    }
  }, [selectedProject, selectedImage]);

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setNewCoords({ xPercent: parseFloat(x.toFixed(2)), yPercent: parseFloat(y.toFixed(2)) });
    setShowForm(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        projectId: selectedProject.projectId,
        layoutImage: selectedImage,
        coordinates: { xPercent: newCoords.xPercent, yPercent: newCoords.yPercent },
        category: formData.category,
        startDate: formData.startDate,
        endDate: formData.endDate,
        workersRequired: parseInt(formData.workersRequired),
        assignedSupervisor: formData.assignedSupervisor,
        priority: formData.priority,
        description: { text: formData.descriptionText },
        materialsRequired: formData.materialsRequired.split(',').map(m => m.trim())
      };
      const res = await api.post('/tasks/create', payload);
      setTasks([...tasks, res.data.task]);
      setShowForm(false);
      setNewCoords(null);
    } catch (err) {
      alert(err.response?.data?.error || "Error creating task");
    }
  };

  // Helper to render Supervisor safely (Handles both ID strings and Objects)
  const renderSupervisor = (sup) => {
    if (!sup) return "Unassigned";
    if (typeof sup === 'object') return sup.name || sup._id;
    return sup;
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* LEFT PANEL: PROJECT SELECTOR */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col z-10">
        <div className="p-6 border-b border-slate-100 bg-slate-900 text-white font-bold italic tracking-tighter flex items-center gap-2">
          <Layout size={18}/> NIRMAAN WORKSPACE
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Active Project</label>
            <select className="w-full mt-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-600"
              onChange={(e) => setSelectedProject(projects.find(p => p._id === e.target.value))}>
              <option value="">-- Select Project --</option>
              {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
          </div>

          {selectedProject && (
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Floor Selection</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {selectedProject.layoutImages.map((img, i) => (
                  <img key={i} src={img} onClick={() => setSelectedImage(img)}
                    className={`aspect-square object-cover rounded-lg cursor-pointer border-2 transition-all ${selectedImage === img ? 'border-teal-700 ring-2 ring-teal-100' : 'border-transparent opacity-60 hover:opacity-100'}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CENTER PANEL: INTERACTIVE MAP + CARD LIST */}
      <div className="flex-1 flex flex-col relative bg-slate-100 overflow-hidden">
        {!selectedProject ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
            <AlertCircle size={48} className="mb-2 opacity-20" />
            <p className="font-medium uppercase tracking-widest text-xs">Select a project to start pinning</p>
          </div>
        ) : (
          <>
            {/* TOP HALF: MAP */}
            <div className="h-[45%] relative p-6 flex items-center justify-center overflow-auto border-b border-slate-200 bg-white">
              <div className="relative inline-block border-8 border-slate-50 shadow-2xl rounded-xl overflow-hidden">
                <img src={selectedImage} className="max-h-[35vh] w-auto cursor-crosshair block" onClick={handleImageClick} />
                
                {tasks.filter(t => t.layoutImage === selectedImage).map(task => (
                  <div key={task._id} 
                    className={`absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center transition-all 
                    ${selectedTask?._id === task._id ? 'scale-150 z-50 ring-4 ring-teal-600/20' : 'z-40'} 
                    ${task.priority === 'High' || task.priority === 'Critical' ? 'bg-red-500' : 'bg-teal-700'}`}
                    style={{ left: `${task.coordinates.xPercent}%`, top: `${task.coordinates.yPercent}%` }}
                    onClick={() => setSelectedTask(task)}>
                    <MapPin size={14} className="text-white" />
                  </div>
                ))}

                {newCoords && (
                  <div className="absolute w-7 h-7 -ml-3.5 -mt-3.5 bg-yellow-400 border-2 border-black rounded-full animate-bounce shadow-xl z-50"
                    style={{ left: `${newCoords.xPercent}%`, top: `${newCoords.yPercent}%` }} />
                )}
              </div>
            </div>

            {/* BOTTOM HALF: CARD GRID */}
            <div className="h-[55%] p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Layers size={14}/> Active Task Board
                </h3>
                <div className="h-[1px] flex-1 bg-slate-200 mx-4"></div>
                <span className="text-[10px] font-bold text-slate-400">{tasks.filter(t => t.layoutImage === selectedImage).length} Tasks on this floor</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {tasks.filter(t => t.layoutImage === selectedImage).map(task => (
                  <div key={task._id} 
                    onClick={() => setSelectedTask(task)}
                    className={`p-5 rounded-2xl cursor-pointer border-2 transition-all duration-300 relative overflow-hidden group
                    ${selectedTask?._id === task._id 
                      ? 'bg-teal-700 border-teal-700 shadow-xl -translate-y-1' 
                      : 'bg-white border-white hover:border-[#b9d9cf] shadow-sm'}`}>
                    
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-lg ${selectedTask?._id === task._id ? 'bg-[#e6f3ee]0' : 'bg-slate-50'}`}>
                        <Hammer size={18} className={selectedTask?._id === task._id ? 'text-white' : 'text-teal-700'}/>
                      </div>
                      <span className={`text-[9px] px-2 py-1 rounded-md font-black uppercase tracking-tighter 
                        ${task.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-[#e6f3ee] text-teal-700'}`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    <h4 className={`font-bold text-lg mb-4 ${selectedTask?._id === task._id ? 'text-white' : 'text-slate-800'}`}>
                      {task.category}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-y-3">
                      <div className={`flex items-center gap-2 text-[11px] font-medium ${selectedTask?._id === task._id ? 'text-teal-100' : 'text-slate-500'}`}>
                        <Calendar size={12}/> {new Date(task.startDate).toLocaleDateString()}
                      </div>
                      <div className={`flex items-center gap-2 text-[11px] font-medium ${selectedTask?._id === task._id ? 'text-teal-100' : 'text-slate-500'}`}>
                        <Users size={12}/> {task.workersRequired} Men
                      </div>
                      <div className={`flex items-center gap-2 text-[11px] font-medium col-span-2 ${selectedTask?._id === task._id ? 'text-teal-100' : 'text-slate-500'}`}>
                        <HardHat size={12}/> {renderSupervisor(task.assignedSupervisor)}
                      </div>
                    </div>

                    <div className={`mt-4 pt-4 border-t flex justify-between items-center ${selectedTask?._id === task._id ? 'border-teal-300' : 'border-slate-50'}`}>
                      <div className={`flex items-center gap-1 text-[10px] font-bold uppercase ${selectedTask?._id === task._id ? 'text-teal-200' : 'text-slate-400'}`}>
                        {task.aiVerified ? <ShieldCheck size={12}/> : <ShieldAlert size={12}/>}
                        {task.aiVerified ? 'AI Verified' : 'Awaiting Audit'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* RIGHT SIDEBAR: FULL DATA FETCH */}
      {selectedTask && (
        <div className="w-96 bg-white border-l border-slate-200 flex flex-col p-8 animate-in slide-in-from-right shadow-2xl z-50">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-700 animate-pulse"></div>
              <h3 className="font-black text-slate-900 text-[10px] uppercase tracking-[0.3em]">Data Explorer</h3>
            </div>
            <button onClick={() => setSelectedTask(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><X size={20}/></button>
          </div>
          
          <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
             <div>
                <p className="text-[10px] font-black text-teal-700 uppercase mb-2">Primary Category</p>
                <h2 className="text-3xl font-black text-slate-900 leading-none tracking-tight">{selectedTask.category}</h2>
                <p className="text-[10px] font-mono text-slate-400 mt-2">UUID: {selectedTask.taskId}</p>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Status</p>
                   <p className={`text-xs font-bold ${selectedTask.isLocked ? 'text-amber-600' : 'text-green-600'}`}>
                    {selectedTask.isLocked ? 'LOCKED / AUDIT' : 'ACTIVE / OPEN'}
                   </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Coordination</p>
                   <p className="text-xs font-bold text-slate-700">{selectedTask.coordinates.xPercent}% , {selectedTask.coordinates.yPercent}%</p>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600"><HardHat size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Supervisor</p>
                    <p className="text-sm font-bold text-slate-800">{renderSupervisor(selectedTask.assignedSupervisor)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600"><Package size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Materials Logged</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedTask.materialsRequired?.map((m, i) => (
                        <span key={i} className="px-2 py-1 bg-white border border-slate-200 text-[10px] font-bold text-slate-600 rounded-md shadow-sm">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600"><Clock size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Timeline</p>
                    <p className="text-sm font-bold text-slate-800">
                      {new Date(selectedTask.startDate).toLocaleDateString('en-GB')} — {new Date(selectedTask.endDate).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                </div>
             </div>

             <div className="p-6 bg-teal-700 rounded-[2rem] text-white shadow-xl shadow-teal-100 relative overflow-hidden">
                <Layers className="absolute -right-4 -bottom-4 text-teal-500 opacity-30" size={100} />
                <p className="text-[10px] font-black uppercase mb-3 opacity-60">Field Instructions</p>
                <p className="text-sm font-medium leading-relaxed italic relative z-10">
                  "{selectedTask.description?.text || "No manual override instructions provided for this deployment."}"
                </p>
             </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <form onSubmit={handleCreateSubmit} className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg p-10 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">DEPLOY TASK</h3>
              <X className="cursor-pointer text-slate-300 hover:text-red-500 transition-colors" onClick={() => {setShowForm(false); setNewCoords(null);}} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Work Category</label>
                <input type="text" placeholder="e.g. Electrical" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-600 outline-none" required 
                  onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Priority Level</label>
                <select className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm outline-none" onChange={e => setFormData({...formData, priority: e.target.value})}>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="p-4 bg-slate-50 border-none rounded-2xl text-sm" required onChange={e => setFormData({...formData, startDate: e.target.value})} />
              <input type="date" className="p-4 bg-slate-50 border-none rounded-2xl text-sm" required onChange={e => setFormData({...formData, endDate: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Supervisor ID" className="p-4 bg-slate-50 border-none rounded-2xl text-sm" required onChange={e => setFormData({...formData, assignedSupervisor: e.target.value})} />
              <input type="number" placeholder="Workers Needed" className="p-4 bg-slate-50 border-none rounded-2xl text-sm" onChange={e => setFormData({...formData, workersRequired: e.target.value})} />
            </div>

            <input type="text" placeholder="Materials (Cement, Pipes...)" className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm" onChange={e => setFormData({...formData, materialsRequired: e.target.value})} />
            <textarea placeholder="Write technical instructions..." className="w-full p-4 bg-slate-50 border-none rounded-2xl h-28 resize-none text-sm" required 
              onChange={e => setFormData({...formData, descriptionText: e.target.value})} />

            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 bg-teal-700 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-teal-800 shadow-lg shadow-teal-100 transition-all">Submit to Field</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTask;