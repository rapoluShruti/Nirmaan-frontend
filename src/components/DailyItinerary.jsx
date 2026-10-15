// import React, { useState } from 'react';
// import { AlertCircle, Package, Calendar, Users, MapPin, Camera, Mic, ChevronRight, ArrowLeft, CheckCircle, Clock, Repeat } from 'lucide-react';

// const DailyItinerary = () => {
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [beforePhoto, setBeforePhoto] = useState(null);
//   const [afterPhoto, setAfterPhoto] = useState(null);
//   const [taskNote, setTaskNote] = useState('');

//   // Sample data
//   const projectInfo = {
//     name: 'Phoenix Heights Tower B',
//     date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
//     role: 'Supervisor'
//   };

//   const materialAlerts = [
//     {
//       id: 'M1',
//       materialName: 'Cement (ACC)',
//       taskId: 'T-204',
//       quantityRequired: '50 bags',
//       taskDate: 'Today'
//     },
//     {
//       id: 'M2',
//       materialName: 'Steel Rods (12mm)',
//       taskId: 'T-207',
//       quantityRequired: '200 rods',
//       taskDate: 'Today'
//     }
//   ];

//   const carriedForwardTasks = [
//     {
//       id: 'T-204',
//       name: 'Floor 3 Plastering - North Wing',
//       location: 'Block B, Floor 3, North',
//       workersRequired: 6,
//       status: 'In Progress',
//       originalDate: '25 Dec 2026',
//       reason: 'In Progress',
//       priority: 'high',
//       materialsNeeded: 'Cement, Sand',
//       systemNote: 'Task auto-generated from yesterday\'s pending work'
//     },
//     {
//       id: 'T-189',
//       name: 'Floor 2 Electrical Conduit Installation',
//       location: 'Block B, Floor 2, East',
//       workersRequired: 4,
//       status: 'In Progress',
//       originalDate: '24 Dec 2026',
//       reason: 'After photo missing',
//       priority: 'high',
//       materialsNeeded: 'PVC pipes, Junction boxes',
//       systemNote: 'Task auto-generated from yesterday\'s pending work'
//     }
//   ];

//   const todaysTasks = [
//     {
//       id: 'T-207',
//       name: 'Floor 4 Column Reinforcement',
//       location: 'Block B, Floor 4, Center',
//       workersRequired: 8,
//       status: 'Not Started',
//       materialsNeeded: 'Steel Rods, Binding Wire',
//       systemNote: 'Material approved and available'
//     },
//     {
//       id: 'T-208',
//       name: 'Staircase Railing Installation - Block A',
//       location: 'Block A, Floor 1-3',
//       workersRequired: 3,
//       status: 'Not Started',
//       materialsNeeded: 'Steel pipes, Welding rods',
//       systemNote: 'Material approved and available'
//     },
//     {
//       id: 'T-209',
//       name: 'Bathroom Tile Work - Floor 3',
//       location: 'Block B, Floor 3, Units 301-305',
//       workersRequired: 5,
//       status: 'Not Started',
//       materialsNeeded: 'Tiles, Adhesive, Grout',
//       systemNote: 'Material approved and available'
//     }
//   ];

//   const handlePhotoUpload = (type, e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (type === 'before') {
//           setBeforePhoto(reader.result);
//         } else {
//           setAfterPhoto(reader.result);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const TaskDetailView = ({ task }) => (
//     <div className="fixed inset-0 bg-gradient-to-b from-slate-50 to-slate-100 z-50 overflow-y-auto">
//       {/* Header */}
//       <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-xl z-10">
//         <div className="p-5">
//           <button 
//             onClick={() => setSelectedTask(null)} 
//             className="flex items-center gap-2 mb-3 active:opacity-70 transition-opacity"
//           >
//             <ArrowLeft size={24} strokeWidth={2.5} />
//             <span className="text-sm font-medium">Back</span>
//           </button>
//           <h2 className="text-xl font-bold mb-1 leading-tight">{task.name}</h2>
//           <div className="flex items-center gap-2">
//             <span className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">{task.id}</span>
//             <span className="text-sm opacity-90">{task.location}</span>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="px-4 py-5 -mt-4">
//         <div className="grid grid-cols-3 gap-3">
//           <div className="bg-white rounded-2xl shadow-lg p-4 text-center border border-slate-100">
//             <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
//               <Users size={24} className="text-white" strokeWidth={2.5} />
//             </div>
//             <p className="text-2xl font-bold text-slate-800 mb-1">{task.workersRequired}</p>
//             <p className="text-xs text-slate-500 font-medium">Workers</p>
//           </div>
//           <div className="bg-white rounded-2xl shadow-lg p-4 text-center border border-slate-100">
//             <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
//               <Package size={24} className="text-white" strokeWidth={2.5} />
//             </div>
//             <p className="text-xs font-bold text-slate-800 mb-1 leading-tight mt-2">{task.materialsNeeded.split(',')[0]}</p>
//             <p className="text-xs text-slate-500 font-medium">Material</p>
//           </div>
//           <div className="bg-white rounded-2xl shadow-lg p-4 text-center border border-slate-100">
//             <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
//               <Clock size={24} className="text-white" strokeWidth={2.5} />
//             </div>
//             <p className="text-xs font-bold text-slate-800 mb-1 leading-tight mt-2">{task.status}</p>
//             <p className="text-xs text-slate-500 font-medium">Status</p>
//           </div>
//         </div>
//       </div>

//       {/* System Note */}
//       {task.systemNote && (
//         <div className="mx-4 mb-5">
//           <div className="bg-gradient-to-r from-teal-50 to-indigo-50 border-l-4 border-teal-500 rounded-xl p-4 shadow-sm">
//             <div className="flex gap-3">
//               <div className="bg-teal-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
//                 <span className="text-white text-xs font-bold">i</span>
//               </div>
//               <p className="text-sm text-teal-900 leading-relaxed">{task.systemNote}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Photo Upload Section */}
//       <div className="px-4 pb-6">
//         <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
//           <Camera size={20} className="text-teal-600" />
//           Upload Photos
//         </h3>
        
//         {/* Before Photo */}
//         <div className="mb-5">
//           <label className="block text-sm font-semibold text-slate-700 mb-3">Before Photo</label>
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-dashed border-slate-200 hover:border-teal-400 transition-colors">
//             {beforePhoto ? (
//               <div className="relative">
//                 <img src={beforePhoto} alt="Before" className="w-full h-56 object-cover" />
//                 <button 
//                   onClick={() => setBeforePhoto(null)}
//                   className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg active:scale-95 transition-transform"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <label className="cursor-pointer block p-8 text-center">
//                 <div className="bg-gradient-to-br from-slate-100 to-slate-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
//                   <Camera size={32} className="text-slate-400" strokeWidth={2} />
//                 </div>
//                 <p className="text-sm font-semibold text-slate-700 mb-1">Tap to upload before photo</p>
//                 <p className="text-xs text-slate-500">Required for task completion</p>
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   className="hidden" 
//                   onChange={(e) => handlePhotoUpload('before', e)}
//                 />
//               </label>
//             )}
//           </div>
//         </div>

//         {/* After Photo */}
//         <div className="mb-5">
//           <label className="block text-sm font-semibold text-slate-700 mb-3">After Photo</label>
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-dashed border-slate-200 hover:border-teal-400 transition-colors">
//             {afterPhoto ? (
//               <div className="relative">
//                 <img src={afterPhoto} alt="After" className="w-full h-56 object-cover" />
//                 <button 
//                   onClick={() => setAfterPhoto(null)}
//                   className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg active:scale-95 transition-transform"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <label className="cursor-pointer block p-8 text-center">
//                 <div className="bg-gradient-to-br from-slate-100 to-slate-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
//                   <Camera size={32} className="text-slate-400" strokeWidth={2} />
//                 </div>
//                 <p className="text-sm font-semibold text-slate-700 mb-1">Tap to upload after photo</p>
//                 <p className="text-xs text-slate-500">Required for task completion</p>
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   className="hidden" 
//                   onChange={(e) => handlePhotoUpload('after', e)}
//                 />
//               </label>
//             )}
//           </div>
//         </div>

//         {/* Note Section */}
//         <div className="mb-5">
//           <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
//             <Mic size={16} className="text-teal-600" />
//             Add Note (Optional)
//           </label>
//           <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
//             <textarea 
//               value={taskNote}
//               onChange={(e) => setTaskNote(e.target.value)}
//               placeholder="Any comments, issues, or observations..."
//               className="w-full p-4 pr-14 min-h-32 text-slate-700 text-base resize-none focus:outline-none"
//             />
//             <button className="absolute bottom-4 right-4 bg-gradient-to-br from-teal-500 to-teal-600 text-white p-3 rounded-xl shadow-md active:scale-95 transition-transform">
//               <Mic size={20} strokeWidth={2.5} />
//             </button>
//           </div>
//         </div>

//         {/* Status Update */}
//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-slate-700 mb-3">Update Status</label>
//           <select className="w-full bg-white border-2 border-slate-200 rounded-2xl p-4 text-base font-medium text-slate-700 shadow-lg focus:outline-none focus:border-teal-500 appearance-none bg-no-repeat bg-right pr-12" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23475569\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem'}}>
//             <option value="not-started">Not Started</option>
//             <option value="in-progress">In Progress</option>
//             <option value="completed">Completed</option>
//             <option value="blocked">Blocked</option>
//           </select>
//         </div>

//         {/* Save Button */}
//         <button className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-5 rounded-2xl font-bold text-lg shadow-2xl active:scale-98 transition-transform flex items-center justify-center gap-2">
//           <CheckCircle size={24} strokeWidth={2.5} />
//           Save & Update Task
//         </button>
//       </div>
//     </div>
//   );

//   if (selectedTask) {
//     return <TaskDetailView task={selectedTask} />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-20">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-2xl">
//         <div className="p-5">
//           <div className="flex items-center gap-2 mb-2">
//             <div className="bg-white/20 p-2 rounded-lg">
//               <Package size={20} strokeWidth={2.5} />
//             </div>
//             <h1 className="text-xl font-bold flex-1 leading-tight">{projectInfo.name}</h1>
//           </div>
//           <div className="flex justify-between items-center mt-3">
//             <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
//               <Calendar size={16} strokeWidth={2.5} />
//               <span className="text-sm font-semibold">{projectInfo.date}</span>
//             </div>
//             <span className="bg-white text-teal-600 px-4 py-2 rounded-full text-sm font-bold shadow-md">
//               {projectInfo.role}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Material Alert Section - Sticky */}
//       {materialAlerts.length > 0 && (
//         <div className="sticky top-0 z-40 bg-gradient-to-r from-red-600 to-red-500 shadow-2xl">
//           <div className="p-5">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-white/20 p-2 rounded-xl">
//                 <AlertCircle className="text-white" size={28} strokeWidth={2.5} />
//               </div>
//               <h2 className="text-xl font-bold text-white">Material Required Today</h2>
//             </div>
//             {materialAlerts.map((alert) => (
//               <div key={alert.id} className="bg-white rounded-2xl p-5 mb-4 shadow-2xl border-l-4 border-red-600">
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-900 text-lg mb-1">{alert.materialName}</p>
//                     <p className="text-sm text-gray-600 font-medium">Task: {alert.taskId}</p>
//                   </div>
//                   <span className="bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md whitespace-nowrap ml-3">
//                     {alert.quantityRequired}
//                   </span>
//                 </div>
//                 <button className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold text-base shadow-xl active:scale-98 transition-transform flex items-center justify-center gap-2">
//                   <Package size={20} strokeWidth={2.5} />
//                   Request Material Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Carried Forward Work */}
//       <div className="p-5">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2.5 rounded-xl shadow-md">
//             <Repeat size={24} className="text-white" strokeWidth={2.5} />
//           </div>
//           <h2 className="text-xl font-bold text-slate-800">Carried Forward Work</h2>
//         </div>
//         {carriedForwardTasks.map((task) => (
//           <div 
//             key={task.id} 
//             onClick={() => setSelectedTask(task)}
//             className="bg-white rounded-2xl p-5 mb-4 shadow-xl border-l-4 border-teal-500 active:scale-98 transition-transform cursor-pointer"
//           >
//             <div className="flex justify-between items-start mb-3">
//               <div className="flex-1">
//                 <div className="flex flex-wrap items-center gap-2 mb-2">
//                   <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md">
//                     HIGH PRIORITY
//                   </span>
//                   <span className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md">
//                     Auto Carried
//                   </span>
//                 </div>
//                 <h3 className="font-bold text-slate-900 text-base leading-tight mb-2">{task.name}</h3>
//                 <p className="text-sm text-slate-500 font-medium bg-slate-100 inline-block px-3 py-1 rounded-lg">{task.id}</p>
//               </div>
//               <ChevronRight className="text-teal-500 flex-shrink-0 ml-3" size={24} strokeWidth={2.5} />
//             </div>
            
//             <div className="flex items-start gap-2 text-sm text-slate-600 mb-3 bg-slate-50 p-3 rounded-xl">
//               <MapPin size={16} className="flex-shrink-0 mt-0.5 text-teal-500" strokeWidth={2.5} />
//               <span className="font-medium">{task.location}</span>
//             </div>

//             <div className="flex items-center justify-between pt-3 border-t-2 border-slate-100">
//               <div className="flex items-center gap-2 bg-gradient-to-br from-teal-500 to-teal-600 px-4 py-2 rounded-xl shadow-md">
//                 <Users size={18} className="text-white" strokeWidth={2.5} />
//                 <span className="text-sm font-bold text-white">{task.workersRequired} Workers</span>
//               </div>
//               <span className="text-xs text-slate-500 font-semibold">
//                 From: {task.originalDate}
//               </span>
//             </div>

//             <div className="mt-3 pt-3 border-t-2 border-slate-100">
//               <p className="text-xs text-teal-800 font-semibold">
//                 <span className="text-teal-600">● </span>Reason: {task.reason}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Today's Work */}
//       <div className="p-5">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="bg-gradient-to-br from-green-500 to-green-600 p-2.5 rounded-xl shadow-md">
//             <Calendar size={24} className="text-white" strokeWidth={2.5} />
//           </div>
//           <h2 className="text-xl font-bold text-slate-800">Today's Tasks</h2>
//         </div>
//         {todaysTasks.map((task) => (
//           <div 
//             key={task.id} 
//             onClick={() => setSelectedTask(task)}
//             className="bg-white rounded-2xl p-5 mb-4 shadow-lg active:scale-98 transition-transform cursor-pointer border border-slate-100 hover:border-green-300"
//           >
//             <div className="flex justify-between items-start mb-3">
//               <div className="flex-1">
//                 <h3 className="font-bold text-slate-900 text-base leading-tight mb-2">{task.name}</h3>
//                 <p className="text-sm text-slate-500 font-medium bg-slate-100 inline-block px-3 py-1 rounded-lg">{task.id}</p>
//               </div>
//               <ChevronRight className="text-slate-400 flex-shrink-0 ml-3" size={24} strokeWidth={2.5} />
//             </div>
            
//             <div className="flex items-start gap-2 text-sm text-slate-600 mb-3 bg-slate-50 p-3 rounded-xl">
//               <MapPin size={16} className="flex-shrink-0 mt-0.5 text-green-500" strokeWidth={2.5} />
//               <span className="font-medium">{task.location}</span>
//             </div>

//             <div className="flex items-center justify-between pt-3 border-t-2 border-slate-100">
//               <div className="flex items-center gap-2 bg-gradient-to-br from-green-500 to-green-600 px-4 py-2 rounded-xl shadow-md">
//                 <Users size={18} className="text-white" strokeWidth={2.5} />
//                 <span className="text-sm font-bold text-white">{task.workersRequired} Workers</span>
//               </div>
//               <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold">
//                 {task.status}
//               </span>
//             </div>

//             {task.systemNote && (
//               <div className="mt-3 pt-3 border-t-2 border-slate-100">
//                 <div className="flex items-start gap-2 bg-teal-50 px-3 py-2 rounded-xl">
//                   <div className="bg-teal-500 rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
//                     <span className="text-white text-xs font-bold">i</span>
//                   </div>
//                   <p className="text-xs text-teal-800 font-medium leading-relaxed">{task.systemNote}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DailyItinerary;
import React, { useState } from 'react';
import {
  AlertCircle,
  Package,
  Calendar,
  Users,
  MapPin,
  Camera,
  Mic,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  Repeat
} from 'lucide-react';

const DailyItinerary = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [beforePhoto, setBeforePhoto] = useState(null);
  const [afterPhoto, setAfterPhoto] = useState(null);
  const [taskNote, setTaskNote] = useState('');

  /* ------------------ DATA (UNCHANGED) ------------------ */

  const projectInfo = {
    name: 'Phoenix Heights Tower B',
    date: new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    role: 'Supervisor'
  };

  const materialAlerts = [
    {
      id: 'M1',
      materialName: 'Cement (ACC)',
      taskId: 'T-204',
      quantityRequired: '50 bags'
    },
    {
      id: 'M2',
      materialName: 'Steel Rods (12mm)',
      taskId: 'T-207',
      quantityRequired: '200 rods'
    }
  ];

  const carriedForwardTasks = [
    {
      id: 'T-204',
      name: 'Floor 3 Plastering - North Wing',
      location: 'Block B, Floor 3, North',
      workersRequired: 6,
      status: 'In Progress',
      originalDate: '25 Dec 2026',
      reason: 'In Progress',
      priority: 'high',
      materialsNeeded: 'Cement, Sand',
      systemNote: "Task auto-generated from yesterday's pending work"
    },
    {
      id: 'T-189',
      name: 'Floor 2 Electrical Conduit Installation',
      location: 'Block B, Floor 2, East',
      workersRequired: 4,
      status: 'In Progress',
      originalDate: '24 Dec 2026',
      reason: 'After photo missing',
      priority: 'high',
      materialsNeeded: 'PVC pipes, Junction boxes',
      systemNote: "Task auto-generated from yesterday's pending work"
    }
  ];

  const todaysTasks = [
    {
      id: 'T-207',
      name: 'Floor 4 Column Reinforcement',
      location: 'Block B, Floor 4, Center',
      workersRequired: 8,
      status: 'Not Started',
      materialsNeeded: 'Steel Rods, Binding Wire',
      systemNote: 'Material approved and available'
    },
    {
      id: 'T-208',
      name: 'Staircase Railing Installation - Block A',
      location: 'Block A, Floor 1-3',
      workersRequired: 3,
      status: 'Not Started',
      materialsNeeded: 'Steel pipes, Welding rods',
      systemNote: 'Material approved and available'
    },
    {
      id: 'T-209',
      name: 'Bathroom Tile Work - Floor 3',
      location: 'Block B, Floor 3, Units 301-305',
      workersRequired: 5,
      status: 'Not Started',
      materialsNeeded: 'Tiles, Adhesive, Grout',
      systemNote: 'Material approved and available'
    }
  ];

  /* ------------------ HANDLERS (UNCHANGED) ------------------ */

  const handlePhotoUpload = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      type === 'before'
        ? setBeforePhoto(reader.result)
        : setAfterPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /* ------------------ TASK DETAIL VIEW ------------------ */

  const TaskDetailView = ({ task }) => (
    <div className="fixed inset-0 bg-slate-50 z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-teal-600 text-white border-b border-teal-700">
        <div className="p-4">
          <button
            onClick={() => setSelectedTask(null)}
            className="flex items-center gap-2 text-sm mb-2"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <h2 className="text-base font-semibold leading-tight">{task.name}</h2>
          <p className="text-xs opacity-90">
            {task.id} · {task.location}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Meta */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border rounded-lg p-3 text-center shadow-sm">
            <Users size={18} className="mx-auto text-slate-600" />
            <p className="font-semibold text-sm mt-1">{task.workersRequired}</p>
            <p className="text-xs text-slate-500">Workers</p>
          </div>

          <div className="bg-white border rounded-lg p-3 text-center shadow-sm">
            <Package size={18} className="mx-auto text-slate-600" />
            <p className="text-xs font-semibold mt-1">
              {task.materialsNeeded.split(',')[0]}
            </p>
            <p className="text-xs text-slate-500">Material</p>
          </div>

          <div className="bg-white border rounded-lg p-3 text-center shadow-sm">
            <Clock size={18} className="mx-auto text-slate-600" />
            <p className="text-xs font-semibold mt-1">{task.status}</p>
            <p className="text-xs text-slate-500">Status</p>
          </div>
        </div>

        {task.systemNote && (
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-xs text-teal-800">
            {task.systemNote}
          </div>
        )}

        {/* Photos */}
        {['before', 'after'].map((type) => (
          <div key={type}>
            <p className="text-sm font-semibold mb-1 capitalize">
              {type} Photo
            </p>
            <div className="bg-white border border-dashed rounded-lg p-4 text-center">
              {(type === 'before' ? beforePhoto : afterPhoto) ? (
                <img
                  src={type === 'before' ? beforePhoto : afterPhoto}
                  alt={type}
                  className="w-full h-48 object-cover rounded-md"
                />
              ) : (
                <label className="cursor-pointer block">
                  <Camera className="mx-auto text-slate-400" />
                  <p className="text-xs text-slate-500 mt-1">
                    Tap to upload photo
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handlePhotoUpload(type, e)}
                  />
                </label>
              )}
            </div>
          </div>
        ))}

        {/* Note */}
        <div>
          <p className="text-sm font-semibold mb-1 flex items-center gap-1">
            <Mic size={14} /> Note (optional)
          </p>
          <textarea
            value={taskNote}
            onChange={(e) => setTaskNote(e.target.value)}
            className="w-full bg-white border rounded-lg p-3 text-sm"
            placeholder="Any issues, remarks, or observations..."
          />
        </div>

        {/* Status */}
        <select className="w-full bg-white border rounded-lg p-3 text-sm">
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Blocked</option>
        </select>

        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2">
          <CheckCircle size={18} />
          Save & Update Task
        </button>
      </div>
    </div>
  );

  if (selectedTask) return <TaskDetailView task={selectedTask} />;

  /* ------------------ MAIN LIST VIEW ------------------ */

  return (
    <div className="min-h-screen bg-[#f4f7f4]">
      {/* Header */}
      <div className="bg-teal-600 text-white border-b border-teal-700">
        <div className="p-4 flex justify-between items-center">
          <div>
            <h1 className="text-base font-semibold">{projectInfo.name}</h1>
            <p className="text-xs opacity-90">{projectInfo.date}</p>
          </div>
          <span className="bg-white text-teal-600 px-3 py-1 rounded-md text-xs font-semibold">
            {projectInfo.role}
          </span>
        </div>
      </div>

      {/* Material Alerts */}
      {materialAlerts.length > 0 && (
        <div className="bg-red-50 border-b border-red-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={18} className="text-red-600" />
            <p className="text-sm font-semibold text-red-700">
              Material Required Today
            </p>
          </div>

          {materialAlerts.map((m) => (
            <div
              key={m.id}
              className="bg-white border border-red-200 rounded-lg p-4 mb-3 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm">{m.materialName}</p>
                  <p className="text-xs text-slate-500">
                    Task {m.taskId}
                  </p>
                </div>
                <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-md">
                  {m.quantityRequired}
                </span>
              </div>

              <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white rounded-md py-2 text-sm font-semibold">
                Request Material
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Carried Forward */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Repeat size={16} className="text-slate-600" />
          <p className="text-sm font-semibold">Carried Forward Work</p>
        </div>

        {carriedForwardTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => setSelectedTask(task)}
            className="bg-white border rounded-lg p-4 mb-3 shadow-sm cursor-pointer hover:border-teal-400"
          >
            <p className="font-semibold text-sm">{task.name}</p>
            <p className="text-xs text-slate-500">{task.location}</p>

            <div className="flex justify-between items-center mt-2 text-xs">
              <span>{task.workersRequired} Workers</span>
              <span className="text-slate-500">
                From {task.originalDate}
              </span>
            </div>

            <p className="text-xs text-teal-700 mt-2">
              Reason: {task.reason}
            </p>
          </div>
        ))}
      </div>

      {/* Today's Tasks */}
      <div className="p-4">
        <p className="text-sm font-semibold mb-3">Today's Tasks</p>

        {todaysTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => setSelectedTask(task)}
            className="bg-white border rounded-lg p-4 mb-3 shadow-sm cursor-pointer hover:border-teal-400"
          >
            <p className="font-semibold text-sm">{task.name}</p>
            <p className="text-xs text-slate-500">{task.location}</p>

            <div className="flex justify-between items-center mt-2 text-xs">
              <span>{task.workersRequired} Workers</span>
              <span className="bg-slate-100 px-2 py-1 rounded-md">
                {task.status}
              </span>
            </div>

            {task.systemNote && (
              <p className="text-xs text-teal-700 mt-2">
                {task.systemNote}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyItinerary;
