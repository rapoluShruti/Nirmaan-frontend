// import { useEffect, useState } from "react";
// import api from "../api/axiosConfig";
// import LayoutTaskMap from "../components/LayoutTaskMap";
// import TaskDetailsPanel from "../components/TaskDetailsPanel";

// export default function SupervisorItineraryPage() {
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [selectedLayout, setSelectedLayout] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sentRequests, setSentRequests] = useState(new Set());
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupData, setPopupData] = useState(null);
//   const [showMaterialRequests, setShowMaterialRequests] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [showSidePanel, setShowSidePanel] = useState(false);

//   const [searchText, setSearchText] = useState("");
//   const [filterStatus, setFilterStatus] = useState("ALL");
//   const [filterDate, setFilterDate] = useState("ALL");

//   useEffect(() => {
//     api.get("/tasks/supervisor")
//       .then(res => {
//         const fetchedTasks = res.data.tasks || [];
//         const tasksWithMaterials = fetchedTasks.map((task, idx) => {
//           if (idx % 3 === 0) {
//             return {
//               ...task,
//               requiredMaterials: [
//                 { name: "Cement Bags", required: 50, inStock: 20 },
//                 { name: "Steel Rods", required: 100, inStock: 45 }
//               ]
//             };
//           } else if (idx % 3 === 1) {
//             return {
//               ...task,
//               requiredMaterials: [
//                 { name: "Bricks", required: 500, inStock: 200 },
//                 { name: "Sand (tons)", required: 10, inStock: 3 }
//               ]
//             };
//           } else if (idx % 5 === 0) {
//             return {
//               ...task,
//               requiredMaterials: [
//                 { name: "Paint Buckets", required: 20, inStock: 5 }
//               ]
//             };
//           }
//           return task;
//         });
//         setTasks(tasksWithMaterials);
//       })
//       .catch(err => console.error("Error:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-zinc-50">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-10 lg:w-12 h-10 lg:h-12 border-2 border-zinc-200 border-t-indigo-600 rounded-full animate-spin"></div>
//           <span className="text-xs lg:text-sm text-zinc-500 font-mono tracking-wider">INITIALIZING WORKSPACE</span>
//         </div>
//       </div>
//     );
//   }

//   const autoCarriedForward = []; 
//   const scheduledToday = [];
//   const todayStr = new Date().toDateString();

//   tasks.forEach((task) => {
//     const taskDateStr = task.startDate ? new Date(task.startDate).toDateString() : null;
//     const isToday = taskDateStr === todayStr;
//     const isInProgress = task.derivedStatus?.includes("IN_PROGRESS");
//     const isCompleted = task.derivedStatus?.includes("COMPLETED");

//     if (isCompleted) return;

//     if (isInProgress || (task.overdue && !isToday)) {
//       autoCarriedForward.push(task);
//     } 
//     else if (isToday) {
//       scheduledToday.push(task);
//     }
//   });

//   const grouped = {
//     "Auto Carried Forward": autoCarriedForward,
//     "Scheduled Today": scheduledToday,
//   };

//   const totalTasks = tasks.filter(t => !t.derivedStatus?.includes("COMPLETED")).length;
//   const inProgressCount = tasks.filter(t => t.derivedStatus?.includes("IN_PROGRESS")).length;
//   const overdueCount = tasks.filter(t => t.overdue && !t.derivedStatus?.includes("IN_PROGRESS") && !t.derivedStatus?.includes("COMPLETED")).length;

//   const materialRequestsCount = tasks.filter(t => {
//     if (t.derivedStatus?.includes("COMPLETED")) return false;
//     if (!t.requiredMaterials || t.requiredMaterials.length === 0) return false;
//     return t.requiredMaterials.some(mat => mat.required > mat.inStock);
//   }).length;

//   const handleSendRequest = (taskId) => {
//     const task = tasks.find(t => t._id === taskId);
//     const shortages = task.requiredMaterials.filter(mat => mat.required > mat.inStock);
    
//     setPopupData({
//       taskId: task.taskId,
//       description: task.description,
//       materials: shortages
//     });
//     setShowPopup(true);
//     setSentRequests(prev => new Set([...prev, taskId]));
//     console.log(`Sending material request for task: ${taskId}`);
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50">
      
//       {/* POPUP MODAL */}
//       {showPopup && popupData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-2xl max-w-md w-full border-2 border-amber-300">
//             <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 lg:px-6 py-3 lg:py-4 rounded-t-lg">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-white font-bold text-base lg:text-lg">Request Sent for Approval</h3>
//                 <button 
//                   onClick={() => setShowPopup(false)}
//                   className="text-white hover:text-amber-100 transition-colors"
//                 >
//                   <svg className="w-5 lg:w-6 h-5 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
            
//             <div className="p-4 lg:p-6">
//               <div className="mb-4">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className="w-14 lg:w-16 h-14 lg:h-16 bg-green-100 rounded-full flex items-center justify-center">
//                     <svg className="w-8 lg:w-10 h-8 lg:h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                 </div>
//                 <p className="text-center text-xs lg:text-sm font-semibold text-zinc-900 mb-1">{popupData.description}</p>
//                 <p className="text-center text-[10px] lg:text-xs font-mono text-zinc-500">#{popupData.taskId?.slice(-6).toUpperCase()}</p>
//               </div>
              
//               <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 lg:p-4 mb-4">
//                 <p className="text-[10px] lg:text-xs font-bold text-zinc-700 mb-3 uppercase">Materials Requested:</p>
//                 <div className="space-y-2">
//                   {popupData.materials.map((mat, idx) => (
//                     <div key={idx} className="bg-white border border-amber-200 rounded p-2">
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="text-xs lg:text-sm font-semibold text-zinc-900">{mat.name}</span>
//                       </div>
//                       <div className="grid grid-cols-2 gap-2 text-[10px] lg:text-xs">
//                         <div className="bg-red-50 border border-red-200 rounded px-2 py-1">
//                           <span className="text-red-600 font-mono">In Stock: {mat.inStock}</span>
//                         </div>
//                         <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1">
//                           <span className="text-blue-600 font-mono">Required: {mat.required}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <button 
//                 onClick={() => setShowPopup(false)}
//                 className="w-full px-4 py-2.5 lg:py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-lg transition-all text-sm lg:text-base"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* TOP BAR */}
//       <div className="bg-white border-b border-zinc-200">
//         <div className="max-w-[2000px] mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3 lg:gap-6">
//             <div className="flex items-center gap-2 lg:gap-3">
//               <div className="w-7 lg:w-8 h-7 lg:h-8 bg-zinc-900 flex items-center justify-center rounded">
//                 <svg className="w-4 lg:w-5 h-4 lg:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-zinc-900 text-xs lg:text-sm font-mono font-bold tracking-wider">SITE OPERATIONS</h1>
//                 <p className="text-zinc-500 text-[9px] lg:text-xs font-mono hidden sm:block">SUPERVISOR CONSOLE v2.4</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2 lg:gap-6">
//             <div className="hidden sm:flex items-center gap-2 lg:gap-4 px-2 lg:px-4 py-1.5 lg:py-2 bg-zinc-100 border border-zinc-200 rounded">
//               <div className="flex items-center gap-1.5 lg:gap-2">
//                 <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-indigo-600 rounded-full animate-pulse"></div>
//                 <span className="text-zinc-600 text-[10px] lg:text-xs font-mono">LIVE</span>
//               </div>
//               <div className="w-px h-3 lg:h-4 bg-zinc-300"></div>
//               <span className="text-zinc-900 text-[10px] lg:text-xs font-mono">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</span>
//             </div>

//             {materialRequestsCount > 0 && (
//               <button
//                 onClick={() => setShowMaterialRequests(!showMaterialRequests)}
//                 className={`flex items-center gap-2 lg:gap-3 px-2 lg:px-4 py-1.5 lg:py-2 border-2 rounded transition-all ${
//                   showMaterialRequests 
//                     ? 'bg-amber-600 border-amber-600 text-white' 
//                     : 'bg-white border-amber-300 text-amber-700 hover:bg-amber-50'
//                 }`}
//               >
//                 <svg className="w-4 lg:w-5 h-4 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                 </svg>
//                 <div className="text-left hidden sm:block">
//                   <div className="text-[10px] lg:text-xs font-bold font-mono">MATERIAL REQUESTS</div>
//                   <div className="text-[9px] lg:text-[10px] font-mono opacity-90">{materialRequestsCount} Pending</div>
//                 </div>
//                 <span className="sm:hidden text-xs font-bold">{materialRequestsCount}</span>
//                 <svg 
//                   className={`w-3 lg:w-4 h-3 lg:h-4 transition-transform hidden sm:block ${showMaterialRequests ? 'rotate-180' : ''}`} 
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* STATS BAR */}
//       <div className="bg-white border-b border-zinc-200">
//         <div className="max-w-[2000px] mx-auto px-4 lg:px-8 py-4 lg:py-6">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
//             <div className="bg-white border border-zinc-200 p-3 lg:p-4 rounded shadow-sm">
//               <div className="flex items-center justify-between mb-1.5 lg:mb-2">
//                 <span className="text-zinc-500 text-[9px] lg:text-[10px] font-mono tracking-widest">TOTAL ACTIVE</span>
//                 <div className="w-5 lg:w-6 h-5 lg:h-6 bg-zinc-100 flex items-center justify-center rounded">
//                   <svg className="w-2.5 lg:w-3 h-2.5 lg:h-3 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
//                   </svg>
//                 </div>
//               </div>
//               <div className="text-zinc-900 text-2xl lg:text-3xl font-mono font-bold">{totalTasks.toString().padStart(2, '0')}</div>
//             </div>
            
//             <div className="bg-indigo-50/30 border border-indigo-100 p-3 lg:p-4 rounded shadow-sm">
//               <div className="flex items-center justify-between mb-1.5 lg:mb-2">
//                 <span className="text-indigo-700 text-[9px] lg:text-[10px] font-mono tracking-widest">IN PROGRESS</span>
//                 <div className="w-5 lg:w-6 h-5 lg:h-6 bg-indigo-100 flex items-center justify-center rounded">
//                   <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-indigo-600 rounded-full animate-pulse"></div>
//                 </div>
//               </div>
//               <div className="text-indigo-700 text-2xl lg:text-3xl font-mono font-bold">{inProgressCount.toString().padStart(2, '0')}</div>
//             </div>
            
//             <div className="bg-red-50/30 border border-red-100 p-3 lg:p-4 rounded shadow-sm">
//               <div className="flex items-center justify-between mb-1.5 lg:mb-2">
//                 <span className="text-red-700 text-[9px] lg:text-[10px] font-mono tracking-widest">OVERDUE</span>
//                 <div className="w-5 lg:w-6 h-5 lg:h-6 bg-red-100 flex items-center justify-center rounded">
//                   <svg className="w-2.5 lg:w-3 h-2.5 lg:h-3 text-red-600" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
//                   </svg>
//                 </div>
//               </div>
//               <div className="text-red-700 text-2xl lg:text-3xl font-mono font-bold">{overdueCount.toString().padStart(2, '0')}</div>
//             </div>
            
//             <div className="bg-emerald-50/30 border border-emerald-100 p-3 lg:p-4 rounded shadow-sm">
//               <div className="flex items-center justify-between mb-1.5 lg:mb-2">
//                 <span className="text-emerald-700 text-[9px] lg:text-[10px] font-mono tracking-widest">TODAY</span>
//                 <div className="w-5 lg:w-6 h-5 lg:h-6 bg-emerald-100 flex items-center justify-center rounded">
//                   <svg className="w-2.5 lg:w-3 h-2.5 lg:h-3 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
//                   </svg>
//                 </div>
//               </div>
//               <div className="text-emerald-700 text-2xl lg:text-3xl font-mono font-bold">{scheduledToday.length.toString().padStart(2, '0')}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FILTER BAR */}
//       <div className="bg-white border-b border-zinc-200">
//         <div className="max-w-[2000px] mx-auto px-4 lg:px-8 py-3 lg:py-4">
//           {/* Mobile Filter Toggle */}
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="lg:hidden w-full flex items-center justify-between px-3 py-2 bg-zinc-100 border border-zinc-300 rounded text-xs font-mono mb-3"
//           >
//             <span>FILTERS</span>
//             <svg 
//               className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>

//           <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 items-end">
//               <div>
//                 <label className="block text-[9px] lg:text-[10px] font-mono text-zinc-500 mb-1 tracking-widest">
//                   SEARCH
//                 </label>
//                 <input
//                   type="text"
//                   value={searchText}
//                   onChange={(e) => setSearchText(e.target.value)}
//                   placeholder="Task / location / ID"
//                   className="w-full px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-[9px] lg:text-[10px] font-mono text-zinc-500 mb-1 tracking-widest">
//                   STATUS
//                 </label>
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="w-full px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm border border-zinc-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="ALL">All</option>
//                   <option value="IN_PROGRESS">In Progress</option>
//                   <option value="OVERDUE">Overdue</option>
//                   <option value="SCHEDULED">Scheduled</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[9px] lg:text-[10px] font-mono text-zinc-500 mb-1 tracking-widest">
//                   DATE
//                 </label>
//                 <select
//                   value={filterDate}
//                   onChange={(e) => setFilterDate(e.target.value)}
//                   className="w-full px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm border border-zinc-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="ALL">All</option>
//                   <option value="TODAY">Today</option>
//                   <option value="PAST">Past</option>
//                 </select>
//               </div>

//               <button
//                 onClick={() => {
//                   setSearchText("");
//                   setFilterStatus("ALL");
//                   setFilterDate("ALL");
//                 }}
//                 className="px-3 lg:px-4 py-1.5 lg:py-2 border border-zinc-300 rounded text-[10px] lg:text-xs font-mono hover:bg-zinc-100 transition-colors"
//               >
//                 RESET
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MATERIAL REQUESTS */}
//       {showMaterialRequests && (() => {
//         const materialRequests = tasks.filter(t => {
//           if (t.derivedStatus?.includes("COMPLETED")) return false;
//           if (!t.requiredMaterials || t.requiredMaterials.length === 0) return false;
//           return t.requiredMaterials.some(mat => mat.required > mat.inStock);
//         });

//         if (materialRequests.length === 0) return null;

//         return (
//           <div className="max-w-[2000px] mx-auto px-4 lg:px-8 pb-3 lg:pb-4 pt-3 lg:pt-4">
//             <div className="bg-amber-50 border border-amber-300 rounded shadow-sm overflow-hidden">
//               <div className="bg-amber-100 border-b border-amber-300 px-3 lg:px-4 py-2">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-amber-600 rounded-full animate-pulse"></div>
//                     <span className="text-[9px] lg:text-[10px] font-mono text-amber-900 tracking-widest font-bold">MATERIAL REQUESTS REQUIRED</span>
//                   </div>
//                   <span className="text-[8px] lg:text-[9px] font-mono text-amber-700 bg-white px-1.5 lg:px-2 py-0.5 border border-amber-200 rounded-full">
//                     {materialRequests.length.toString().padStart(2, '0')} TASKS
//                   </span>
//                 </div>
//               </div>
              
//               <div className="p-2 lg:p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3">
//                 {materialRequests.map(task => {
//                   const isRequested = sentRequests.has(task._id);
                  
//                   return (
//                     <div key={task._id} className="bg-white border border-amber-200 rounded p-2 lg:p-3 shadow-sm hover:shadow-md transition-shadow">
//                       <div className="mb-2">
//                         <p className="text-[10px] lg:text-xs font-semibold text-zinc-900 mb-1 line-clamp-1">{task.description || "Site Activity"}</p>
//                         <span className="text-[8px] lg:text-[9px] font-mono text-amber-700 bg-amber-50 px-1.5 lg:px-2 py-0.5 rounded border border-amber-200">
//                           #{task.taskId?.slice(-6).toUpperCase()}
//                         </span>
//                       </div>
                      
//                       <div className="mb-2 space-y-1">
//                         {task.requiredMaterials
//                           .filter(mat => mat.required > mat.inStock)
//                           .map((mat, idx) => (
//                             <div key={idx} className="text-[9px] lg:text-[10px] font-mono">
//                               <div className="flex items-center justify-between">
//                                 <span className="text-zinc-700 font-semibold truncate mr-2">{mat.name}</span>
//                                 <span className="text-red-600 font-bold whitespace-nowrap">{mat.inStock}/{mat.required}</span>
//                               </div>
//                             </div>
//                           ))}
//                       </div>
                      
//                       {isRequested ? (
//                         <div className="w-full px-2 py-1.5 bg-green-100 border border-green-300 rounded flex items-center justify-center gap-1">
//                           <svg className="w-2.5 lg:w-3 h-2.5 lg:h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                           </svg>
//                           <span className="text-[8px] lg:text-[9px] font-bold text-green-700 font-mono">SENT</span>
//                         </div>
//                       ) : (
//                         <button 
//                           onClick={() => handleSendRequest(task._id)}
//                           className="w-full px-2 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[8px] lg:text-[9px] font-bold font-mono rounded transition-colors"
//                         >
//                           SEND REQUEST
//                         </button>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         );
//       })()}

//       <div className="max-w-[2000px] mx-auto p-4 lg:p-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

//           {/* MAIN TABLE */}
//           <div className="lg:col-span-2">
//             <div className="bg-white border border-zinc-200 rounded shadow-sm overflow-hidden">
              
//               {/* TABLE HEADER - Hidden on mobile, shown as cards */}
//               <div className="hidden lg:block bg-zinc-50 border-b border-zinc-200">
//                 <div className="grid grid-cols-12 gap-6 px-6 py-4 items-center">
//                   <div className="col-span-1 text-[10px] font-mono text-zinc-500 tracking-widest">#</div>
//                   <div className="col-span-4 text-[10px] font-mono text-zinc-500 tracking-widest">TASK DESCRIPTION</div>
//                   <div className="col-span-2 text-[10px] font-mono text-zinc-500 tracking-widest">STATUS</div>
//                   <div className="col-span-2 text-[10px] font-mono text-zinc-500 tracking-widest">LOCATION</div>
//                   <div className="col-span-2 text-[10px] font-mono text-zinc-500 tracking-widest">SCHEDULED</div>
//                   <div className="col-span-1 text-[10px] font-mono text-zinc-500 tracking-widest text-right">ID</div>
//                 </div>
//               </div>

//               {/* TABLE BODY */}
//               <div className="divide-y divide-zinc-100">
//                 {Object.entries(grouped).map(([group, list]) => (
//                   <div key={group}>
//                     {/* SECTION DIVIDER */}
//                     <div className="bg-zinc-50/50 border-y border-zinc-200">
//                       <div className="px-3 lg:px-6 py-2 flex items-center justify-between">
//                         <div className="flex items-center gap-2 lg:gap-3">
//                           <div className={`w-1 h-3 lg:h-4 rounded-full ${group === "Auto Carried Forward" ? "bg-orange-500" : "bg-emerald-500"}`}></div>
//                           <span className="text-[9px] lg:text-[10px] font-mono font-bold tracking-widest text-zinc-700">{group.toUpperCase()}</span>
//                         </div>
//                         <span className="text-[9px] lg:text-[10px] font-mono text-zinc-500 bg-white px-2 lg:px-3 py-0.5 border border-zinc-200 rounded-full">
//                           {list.length.toString().padStart(2, '0')}
//                         </span>
//                       </div>
//                     </div>

//                     {list.length === 0 ? (
//                       <div className="px-3 lg:px-6 py-8 lg:py-12 text-center">
//                         <p className="text-[10px] lg:text-xs font-mono text-zinc-400">NO TASKS ASSIGNED</p>
//                       </div>
//                     ) : (
//                       list.map((task, idx) => {
//                         const isInProgress = task.derivedStatus?.includes("IN_PROGRESS");
//                         const isSelected = selectedTask?._id === task._id;

//                         return (
//                           <div key={task._id}>
//                             {/* Desktop View */}
//                             <div
//                               onClick={() => {
//                                 setSelectedTask(task);
//                                 setSelectedLayout(task.layoutImage);
//                                 setShowSidePanel(true);
//                               }}
//                               className={`hidden lg:grid grid-cols-12 gap-6 px-6 py-4 items-center cursor-pointer transition-all
//                                 ${isSelected 
//                                   ? "bg-indigo-50/50 border-l-4 border-l-indigo-600" 
//                                   : "hover:bg-zinc-50 border-l-4 border-l-transparent"
//                                 }`}
//                             >
//                               <div className="col-span-1">
//                                 <span className="text-zinc-400 text-sm font-mono">{(idx + 1).toString().padStart(2, '0')}</span>
//                               </div>

//                               <div className="col-span-4">
//                                 <p className="text-zinc-900 text-sm font-semibold mb-0.5">{task.description || "Site Activity"}</p>
//                                 <p className="text-zinc-500 text-[10px] font-mono uppercase">{task.locationTag || "GENERAL AREA"}</p>
//                               </div>

//                               <div className="col-span-2">
//                                 {group === "Auto Carried Forward" ? (
//                                   isInProgress ? (
//                                     <div className="inline-flex items-center gap-2 px-2 py-1 bg-indigo-100 rounded text-indigo-700">
//                                       <div className="w-1 h-1 bg-indigo-600 rounded-full animate-pulse"></div>
//                                       <span className="text-[9px] font-mono font-bold">IN_PROGRESS</span>
//                                     </div>
//                                   ) : (
//                                     <div className="inline-flex items-center gap-2 px-2 py-1 bg-red-100 rounded text-red-700">
//                                       <span className="text-[9px] font-mono font-bold">OVERDUE</span>
//                                     </div>
//                                   )
//                                 ) : (
//                                   <div className="inline-flex items-center gap-2 px-2 py-1 bg-emerald-100 rounded text-emerald-700">
//                                     <span className="text-[9px] font-mono font-bold">SCHEDULED</span>
//                                   </div>
//                                 )}
//                               </div>

//                               <div className="col-span-2">
//                                 <span className="text-zinc-600 text-xs font-mono">{task.locationTag || "SITE GENERAL"}</span>
//                               </div>

//                               <div className="col-span-2">
//                                 <span className="text-zinc-500 text-xs font-mono">
//                                   {task.startDate ? new Date(task.startDate).toLocaleDateString("en-GB").replace(/\//g, '-') : "---"}
//                                 </span>
//                               </div>

//                               <div className="col-span-1 text-right">
//                                 <span className="text-[10px] font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
//                                   {task.taskId?.slice(-6).toUpperCase()}
//                                 </span>
//                               </div>
//                             </div>

//                             {/* Mobile Card View */}
//                             <div
//                               onClick={() => {
//                                 setSelectedTask(task);
//                                 setSelectedLayout(task.layoutImage);
//                                 setShowSidePanel(true);
//                               }}
//                               className={`lg:hidden p-3 cursor-pointer transition-all border-l-4 ${
//                                 isSelected 
//                                   ? "bg-indigo-50/50 border-l-indigo-600" 
//                                   : "hover:bg-zinc-50 border-l-transparent"
//                               }`}
//                             >
//                               <div className="flex items-start justify-between mb-2">
//                                 <div className="flex-1">
//                                   <p className="text-xs font-semibold text-zinc-900 mb-1">{task.description || "Site Activity"}</p>
//                                   <p className="text-[9px] font-mono text-zinc-500 uppercase">{task.locationTag || "GENERAL AREA"}</p>
//                                 </div>
//                                 <span className="text-[9px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded ml-2">
//                                   {task.taskId?.slice(-6).toUpperCase()}
//                                 </span>
//                               </div>

//                               <div className="flex items-center gap-2 mb-2">
//                                 {group === "Auto Carried Forward" ? (
//                                   isInProgress ? (
//                                     <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-100 rounded text-indigo-700">
//                                       <div className="w-1 h-1 bg-indigo-600 rounded-full animate-pulse"></div>
//                                       <span className="text-[8px] font-mono font-bold">IN_PROGRESS</span>
//                                     </div>
//                                   ) : (
//                                     <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-100 rounded text-red-700">
//                                       <span className="text-[8px] font-mono font-bold">OVERDUE</span>
//                                     </div>
//                                   )
//                                 ) : (
//                                   <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100 rounded text-emerald-700">
//                                     <span className="text-[8px] font-mono font-bold">SCHEDULED</span>
//                                   </div>
//                                 )}
//                               </div>

//                               <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
//                                 <span>{task.startDate ? new Date(task.startDate).toLocaleDateString("en-GB").replace(/\//g, '-') : "---"}</span>
//                                 <span className="text-[8px]">#{(idx + 1).toString().padStart(2, '0')}</span>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* SIDE PANELS - Desktop */}
//           <div className="hidden lg:block lg:col-span-1 space-y-6">
            
//             {/* LAYOUT MAP */}
//             <div className="bg-white border border-zinc-200 rounded shadow-sm overflow-hidden">
//               <div className="border-b border-zinc-200 px-4 py-3 bg-zinc-50">
//                 <div className="flex items-center justify-between">
//                   <span className="text-[10px] font-mono text-zinc-500 tracking-widest font-bold">SITE LAYOUT</span>
//                   <span className="text-[9px] font-mono text-emerald-600 font-bold">● ACTIVE</span>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <div className="aspect-video bg-zinc-50 border border-zinc-200 rounded overflow-hidden">
//                   {selectedLayout ? (
//                     <LayoutTaskMap
//                       layoutImage={selectedLayout}
//                       tasks={tasks.filter(t => t.layoutImage === selectedLayout)}
//                       onSelectTask={setSelectedTask}
//                     />
//                   ) : (
//                     <div className="h-full flex flex-col items-center justify-center grayscale opacity-50">
//                       <p className="text-[10px] font-mono text-zinc-400">MAP_OBLIQUE_VIEW_PENDING</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* TASK DETAILS */}
//             <div className="bg-white border border-zinc-200 rounded shadow-sm overflow-hidden">
//               <div className="border-b border-zinc-200 px-4 py-3 bg-zinc-50">
//                 <div className="flex items-center justify-between">
//                   <span className="text-[10px] font-mono text-zinc-500 tracking-widest font-bold">PROGRESS LOG</span>
//                   {selectedTask && (
//                     <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 border border-indigo-100 rounded">
//                       #{selectedTask.taskId?.slice(-6).toUpperCase()}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               <div className="p-4">
//                 {selectedTask ? (
//                   <TaskDetailsPanel 
//                     task={selectedTask} 
//                     onActionDone={() => setSelectedTask(null)} 
//                   />
//                 ) : (
//                   <div className="py-12 text-center border border-dashed border-zinc-200 rounded">
//                     <p className="text-[10px] font-mono text-zinc-400">SELECT_ENTRY_FOR_DETAILS</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Mobile Side Panel Modal */}
//       {showSidePanel && selectedTask && (
//         <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
//           <div className="bg-white w-full max-h-[85vh] rounded-t-2xl overflow-hidden flex flex-col">
//             <div className="border-b border-zinc-200 px-4 py-3 bg-zinc-50 flex items-center justify-between">
//               <span className="text-[10px] font-mono text-zinc-500 tracking-widest font-bold">TASK DETAILS</span>
//               <button 
//                 onClick={() => setShowSidePanel(false)}
//                 className="p-1 hover:bg-zinc-200 rounded transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="flex-1 overflow-y-auto">
//               {/* Layout Map */}
//               <div className="p-4 border-b border-zinc-200">
//                 <div className="mb-2">
//                   <span className="text-[10px] font-mono text-zinc-500 tracking-widest font-bold">SITE LAYOUT</span>
//                 </div>
//                 <div className="aspect-video bg-zinc-50 border border-zinc-200 rounded overflow-hidden">
//                   {selectedLayout ? (
//                     <LayoutTaskMap
//                       layoutImage={selectedLayout}
//                       tasks={tasks.filter(t => t.layoutImage === selectedLayout)}
//                       onSelectTask={setSelectedTask}
//                     />
//                   ) : (
//                     <div className="h-full flex flex-col items-center justify-center grayscale opacity-50">
//                       <p className="text-[10px] font-mono text-zinc-400">MAP_OBLIQUE_VIEW_PENDING</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Task Details */}
//               <div className="p-4">
//                 <TaskDetailsPanel 
//                   task={selectedTask} 
//                   onActionDone={() => {
//                     setSelectedTask(null);
//                     setShowSidePanel(false);
//                   }} 
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import LayoutTaskMap from "../components/LayoutTaskMap";
import TaskDetailsPanel from "../components/TaskDetailsPanel";

export default function SupervisorItineraryPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sentRequests, setSentRequests] = useState(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [showMaterialRequests, setShowMaterialRequests] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterDate, setFilterDate] = useState("ALL");

  useEffect(() => {
    api.get("/tasks/supervisor")
      .then(res => {
        const fetchedTasks = res.data.tasks || [];
        const tasksWithMaterials = fetchedTasks.map((task, idx) => {
          if (idx % 3 === 0) {
            return {
              ...task,
              requiredMaterials: [
                { name: "Cement Bags", required: 50, inStock: 20 },
                { name: "Steel Rods", required: 100, inStock: 45 }
              ]
            };
          } else if (idx % 3 === 1) {
            return {
              ...task,
              requiredMaterials: [
                { name: "Bricks", required: 500, inStock: 200 },
                { name: "Sand (tons)", required: 10, inStock: 3 }
              ]
            };
          } else if (idx % 5 === 0) {
            return {
              ...task,
              requiredMaterials: [
                { name: "Paint Buckets", required: 20, inStock: 5 }
              ]
            };
          }
          return task;
        });
        setTasks(tasksWithMaterials);
      })
      .catch(err => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 lg:w-12 h-10 lg:h-12 border-2 border-zinc-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <span className="text-xs lg:text-sm text-zinc-500 font-mono tracking-wider">INITIALIZING WORKSPACE</span>
        </div>
      </div>
    );
  }

  const autoCarriedForward = []; 
  const scheduledToday = [];
  const todayStr = new Date().toDateString();

  tasks.forEach((task) => {
    const taskDateStr = task.startDate ? new Date(task.startDate).toDateString() : null;
    const isToday = taskDateStr === todayStr;
    const isInProgress = task.derivedStatus?.includes("IN_PROGRESS");
    const isCompleted = task.derivedStatus?.includes("COMPLETED");

    if (isCompleted) return;

    if (isInProgress || (task.overdue && !isToday)) {
      autoCarriedForward.push(task);
    } 
    else if (isToday) {
      scheduledToday.push(task);
    }
  });

  const grouped = {
    "Auto Carried Forward": autoCarriedForward,
    "Scheduled Today": scheduledToday,
  };

  const totalTasks = tasks.filter(t => !t.derivedStatus?.includes("COMPLETED")).length;
  const inProgressCount = tasks.filter(t => t.derivedStatus?.includes("IN_PROGRESS")).length;
  const overdueCount = tasks.filter(t => t.overdue && !t.derivedStatus?.includes("IN_PROGRESS") && !t.derivedStatus?.includes("COMPLETED")).length;

  const materialRequestsCount = tasks.filter(t => {
    if (t.derivedStatus?.includes("COMPLETED")) return false;
    if (!t.requiredMaterials || t.requiredMaterials.length === 0) return false;
    return t.requiredMaterials.some(mat => mat.required > mat.inStock);
  }).length;

  const handleSendRequest = (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    const shortages = task.requiredMaterials.filter(mat => mat.required > mat.inStock);
    
    setPopupData({
      taskId: task.taskId,
      description: task.description,
      materials: shortages
    });
    setShowPopup(true);
    setSentRequests(prev => new Set([...prev, taskId]));
    console.log(`Sending material request for task: ${taskId}`);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      
      {/* POPUP MODAL */}
      {showPopup && popupData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full border-2 border-amber-300">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 lg:px-6 py-3 lg:py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-base lg:text-lg">Request Sent for Approval</h3>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="text-white hover:text-amber-100 transition-colors"
                >
                  <svg className="w-5 lg:w-6 h-5 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6">
              <div className="mb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 lg:w-16 h-14 lg:h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 lg:w-10 h-8 lg:h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-center text-xs lg:text-sm font-semibold text-zinc-900 mb-1">{popupData.description}</p>
                <p className="text-center text-[10px] lg:text-xs font-mono text-zinc-500">#{popupData.taskId?.slice(-6).toUpperCase()}</p>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 lg:p-4 mb-4">
                <p className="text-[10px] lg:text-xs font-bold text-zinc-700 mb-3 uppercase">Materials Requested:</p>
                <div className="space-y-2">
                  {popupData.materials.map((mat, idx) => (
                    <div key={idx} className="bg-white border border-amber-200 rounded p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs lg:text-sm font-semibold text-zinc-900">{mat.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] lg:text-xs">
                        <div className="bg-red-50 border border-red-200 rounded px-2 py-1">
                          <span className="text-red-600 font-mono">In Stock: {mat.inStock}</span>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1">
                          <span className="text-blue-600 font-mono">Required: {mat.required}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setShowPopup(false)}
                className="w-full px-4 py-2.5 lg:py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-lg transition-all text-sm lg:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* TOP BAR */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-[2000px] mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-7 lg:w-8 h-7 lg:h-8 bg-zinc-900 flex items-center justify-center rounded">
                <svg className="w-4 lg:w-5 h-4 lg:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-zinc-900 text-xs lg:text-sm font-mono font-bold tracking-wider">SITE OPERATIONS</h1>
                <p className="text-zinc-500 text-[9px] lg:text-xs font-mono hidden sm:block">SUPERVISOR CONSOLE v2.4</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-6">
            <div className="hidden sm:flex items-center gap-2 lg:gap-4 px-2 lg:px-4 py-1.5 lg:py-2 bg-zinc-100 border border-zinc-200 rounded">
              <div className="flex items-center gap-1.5 lg:gap-2">
                <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-indigo-600 rounded-full animate-pulse"></div>
                <span className="text-zinc-600 text-[10px] lg:text-xs font-mono">LIVE</span>
              </div>
              <div className="w-px h-3 lg:h-4 bg-zinc-300"></div>
              <span className="text-zinc-900 text-[10px] lg:text-xs font-mono">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</span>
            </div>

            {materialRequestsCount > 0 && (
              <button
                onClick={() => setShowMaterialRequests(!showMaterialRequests)}
                className={`flex items-center gap-2 lg:gap-3 px-2 lg:px-4 py-1.5 lg:py-2 border-2 rounded transition-all ${
                  showMaterialRequests 
                    ? 'bg-amber-600 border-amber-600 text-white' 
                    : 'bg-white border-amber-300 text-amber-700 hover:bg-amber-50'
                }`}
              >
                <svg className="w-4 lg:w-5 h-4 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <div className="text-left hidden sm:block">
                  <div className="text-[10px] lg:text-xs font-bold font-mono">MATERIAL REQUESTS</div>
                  <div className="text-[9px] lg:text-[10px] font-mono opacity-90">{materialRequestsCount} Pending</div>
                </div>
                <span className="sm:hidden text-xs font-bold">{materialRequestsCount}</span>
                <svg 
                  className={`w-3 lg:w-4 h-3 lg:h-4 transition-transform hidden sm:block ${showMaterialRequests ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-[2000px] mx-auto px-4 lg:px-8 py-4 lg:py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <div className="bg-white border border-zinc-200 p-3 lg:p-4 rounded shadow-sm">
              <div className="flex items-center justify-between mb-1.5 lg:mb-2">
                <span className="text-zinc-500 text-[9px] lg:text-[10px] font-mono tracking-widest">TOTAL ACTIVE</span>
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-zinc-100 flex items-center justify-center rounded">
                  <svg className="w-2.5 lg:w-3 h-2.5 lg:h-3 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
              </div>
              <div className="text-zinc-900 text-2xl lg:text-3xl font-mono font-bold">{totalTasks.toString().padStart(2, '0')}</div>
            </div>
            
            <div className="bg-indigo-50/30 border border-indigo-100 p-3 lg:p-4 rounded shadow-sm">
              <div className="flex items-center justify-between mb-1.5 lg:mb-2">
                <span className="text-indigo-700 text-[9px] lg:text-[10px] font-mono tracking-widest">IN PROGRESS</span>
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-indigo-100 flex items-center justify-center rounded">
                  <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-indigo-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-indigo-700 text-2xl lg:text-3xl font-mono font-bold">{inProgressCount.toString().padStart(2, '0')}</div>
            </div>
            
            <div className="bg-red-50/30 border border-red-100 p-3 lg:p-4 rounded shadow-sm">
              <div className="flex items-center justify-between mb-1.5 lg:mb-2">
                <span className="text-red-700 text-[9px] lg:text-[10px] font-mono tracking-widest">OVERDUE</span>
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-red-100 flex items-center justify-center rounded">
                  <svg className="w-2.5 lg:w-3 h-2.5 lg:h-3 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                </div>
              </div>
              <div className="text-red-700 text-2xl lg:text-3xl font-mono font-bold">{overdueCount.toString().padStart(2, '0')}</div>
            </div>
            
            <div className="bg-emerald-50/30 border border-emerald-100 p-3 lg:p-4 rounded shadow-sm">
              <div className="flex items-center justify-between mb-1.5 lg:mb-2">
                <span className="text-emerald-700 text-[9px] lg:text-[10px] font-mono tracking-widest">TODAY</span>
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-emerald-100 flex items-center justify-center rounded">
                  <svg className="w-2.5 lg:w-3 h-2.5 lg:h-3 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              </div>
              <div className="text-emerald-700 text-2xl lg:text-3xl font-mono font-bold">{scheduledToday.length.toString().padStart(2, '0')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-[2000px] mx-auto px-4 lg:px-8 py-3 lg:py-4">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden w-full flex items-center justify-between px-3 py-2 bg-zinc-100 border border-zinc-300 rounded text-xs font-mono mb-3"
          >
            <span>FILTERS</span>
            <svg 
              className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 items-end">
              <div>
                <label className="block text-[9px] lg:text-[10px] font-mono text-zinc-500 mb-1 tracking-widest">
                  SEARCH
                </label>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Task / location / ID"
                  className="w-full px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[9px] lg:text-[10px] font-mono text-zinc-500 mb-1 tracking-widest">
                  STATUS
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm border border-zinc-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">All</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="OVERDUE">Overdue</option>
                  <option value="SCHEDULED">Scheduled</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] lg:text-[10px] font-mono text-zinc-500 mb-1 tracking-widest">
                  DATE
                </label>
                <select
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm border border-zinc-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">All</option>
                  <option value="TODAY">Today</option>
                  <option value="PAST">Past</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchText("");
                  setFilterStatus("ALL");
                  setFilterDate("ALL");
                }}
                className="px-3 lg:px-4 py-1.5 lg:py-2 border border-zinc-300 rounded text-[10px] lg:text-xs font-mono hover:bg-zinc-100 transition-colors"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MATERIAL REQUESTS */}
      {showMaterialRequests && (() => {
        const materialRequests = tasks.filter(t => {
          if (t.derivedStatus?.includes("COMPLETED")) return false;
          if (!t.requiredMaterials || t.requiredMaterials.length === 0) return false;
          return t.requiredMaterials.some(mat => mat.required > mat.inStock);
        });

        if (materialRequests.length === 0) return null;

        return (
          <div className="max-w-[2000px] mx-auto px-4 lg:px-8 pb-3 lg:pb-4 pt-3 lg:pt-4">
            <div className="bg-amber-50 border border-amber-300 rounded shadow-sm overflow-hidden">
              <div className="bg-amber-100 border-b border-amber-300 px-3 lg:px-4 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-amber-600 rounded-full animate-pulse"></div>
                    <span className="text-[9px] lg:text-[10px] font-mono text-amber-900 tracking-widest font-bold">MATERIAL REQUESTS REQUIRED</span>
                  </div>
                  <span className="text-[8px] lg:text-[9px] font-mono text-amber-700 bg-white px-1.5 lg:px-2 py-0.5 border border-amber-200 rounded-full">
                    {materialRequests.length.toString().padStart(2, '0')} TASKS
                  </span>
                </div>
              </div>
              
              <div className="p-2 lg:p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3">
                {materialRequests.map(task => {
                  const isRequested = sentRequests.has(task._id);
                  
                  return (
                    <div key={task._id} className="bg-white border border-amber-200 rounded p-2 lg:p-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-2">
                        <p className="text-[10px] lg:text-xs font-semibold text-zinc-900 mb-1 line-clamp-1">{task.description || "Site Activity"}</p>
                        <span className="text-[8px] lg:text-[9px] font-mono text-amber-700 bg-amber-50 px-1.5 lg:px-2 py-0.5 rounded border border-amber-200">
                          #{task.taskId?.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="mb-2 space-y-1">
                        {task.requiredMaterials
                          .filter(mat => mat.required > mat.inStock)
                          .map((mat, idx) => (
                            <div key={idx} className="text-[9px] lg:text-[10px] font-mono">
                              <div className="flex items-center justify-between">
                                <span className="text-zinc-700 font-semibold truncate mr-2">{mat.name}</span>
                                <span className="text-red-600 font-bold whitespace-nowrap">{mat.inStock}/{mat.required}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                      
                      {isRequested ? (
                        <div className="w-full px-2 py-1.5 bg-green-100 border border-green-300 rounded flex items-center justify-center gap-1">
                          <svg className="w-2.5 lg:w-3 h-2.5 lg:h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[8px] lg:text-[9px] font-bold text-green-700 font-mono">SENT</span>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleSendRequest(task._id)}
                          className="w-full px-2 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[8px] lg:text-[9px] font-bold font-mono rounded transition-colors"
                        >
                          SEND REQUEST
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      <div className="max-w-[2000px] mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

          {/* MAIN TABLE */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-zinc-200 rounded shadow-sm overflow-hidden">
              
              {/* TABLE HEADER - Hidden on mobile, shown as cards */}
              <div className="hidden lg:block bg-zinc-50 border-b border-zinc-200">
                <div className="grid grid-cols-12 gap-6 px-6 py-4 items-center">
                  <div className="col-span-1 text-[10px] font-mono text-zinc-500 tracking-widest">#</div>
                  <div className="col-span-4 text-[10px] font-mono text-zinc-500 tracking-widest">TASK DESCRIPTION</div>
                  <div className="col-span-2 text-[10px] font-mono text-zinc-500 tracking-widest">STATUS</div>
                  <div className="col-span-2 text-[10px] font-mono text-zinc-500 tracking-widest">LOCATION</div>
                  <div className="col-span-2 text-[10px] font-mono text-zinc-500 tracking-widest">SCHEDULED</div>
                  <div className="col-span-1 text-[10px] font-mono text-zinc-500 tracking-widest text-right">ID</div>
                </div>
              </div>

              {/* TABLE BODY */}
              <div className="divide-y divide-zinc-100">
                {Object.entries(grouped).map(([group, list]) => (
                  <div key={group}>
                    {/* SECTION DIVIDER */}
                    <div className="bg-zinc-50/50 border-y border-zinc-200">
                      <div className="px-3 lg:px-6 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 lg:gap-3">
                          <div className={`w-1 h-3 lg:h-4 rounded-full ${group === "Auto Carried Forward" ? "bg-orange-500" : "bg-emerald-500"}`}></div>
                          <span className="text-[9px] lg:text-[10px] font-mono font-bold tracking-widest text-zinc-700">{group.toUpperCase()}</span>
                        </div>
                        <span className="text-[9px] lg:text-[10px] font-mono text-zinc-500 bg-white px-2 lg:px-3 py-0.5 border border-zinc-200 rounded-full">
                          {list.length.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {list.length === 0 ? (
                      <div className="px-3 lg:px-6 py-8 lg:py-12 text-center">
                        <p className="text-[10px] lg:text-xs font-mono text-zinc-400">NO TASKS ASSIGNED</p>
                      </div>
                    ) : (
                      list.map((task, idx) => {
                        const isInProgress = task.derivedStatus?.includes("IN_PROGRESS");
                        const isSelected = selectedTask?._id === task._id;

                        return (
                          <div key={task._id}>
                            {/* Desktop View */}
                            <div
                              onClick={() => {
                                setSelectedTask(task);
                                setSelectedLayout(task.layoutImage);
                                setShowSidePanel(true);
                              }}
                              className={`hidden lg:grid grid-cols-12 gap-6 px-6 py-4 items-center cursor-pointer transition-all
                                ${isSelected 
                                  ? "bg-indigo-50/50 border-l-4 border-l-indigo-600" 
                                  : "hover:bg-zinc-50 border-l-4 border-l-transparent"
                                }`}
                            >
                              <div className="col-span-1">
                                <span className="text-zinc-400 text-sm font-mono">{(idx + 1).toString().padStart(2, '0')}</span>
                              </div>

                              <div className="col-span-4">
                                <p className="text-zinc-900 text-sm font-semibold mb-0.5">{task.description || "Site Activity"}</p>
                                <p className="text-zinc-500 text-[10px] font-mono uppercase">{task.locationTag || "GENERAL AREA"}</p>
                              </div>

                              <div className="col-span-2">
                                {group === "Auto Carried Forward" ? (
                                  isInProgress ? (
                                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-indigo-100 rounded text-indigo-700">
                                      <div className="w-1 h-1 bg-indigo-600 rounded-full animate-pulse"></div>
                                      <span className="text-[9px] font-mono font-bold">IN_PROGRESS</span>
                                    </div>
                                  ) : (
                                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-red-100 rounded text-red-700">
                                      <span className="text-[9px] font-mono font-bold">OVERDUE</span>
                                    </div>
                                  )
                                ) : (
                                  <div className="inline-flex items-center gap-2 px-2 py-1 bg-emerald-100 rounded text-emerald-700">
                                    <span className="text-[9px] font-mono font-bold">SCHEDULED</span>
                                  </div>
                                )}
                              </div>

                              <div className="col-span-2">
                                <span className="text-zinc-600 text-xs font-mono">{task.locationTag || "SITE GENERAL"}</span>
                              </div>

                              <div className="col-span-2">
                                <span className="text-zinc-500 text-xs font-mono">
                                  {task.startDate ? new Date(task.startDate).toLocaleDateString("en-GB").replace(/\//g, '-') : "---"}
                                </span>
                              </div>

                              <div className="col-span-1 text-right">
                                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                                  {task.taskId?.slice(-6).toUpperCase()}
                                </span>
                              </div>
                            </div>

                            {/* Mobile Card View */}
                            <div
                              onClick={() => {
                                setSelectedTask(task);
                                setSelectedLayout(task.layoutImage);
                                setShowSidePanel(true);
                              }}
                              className={`lg:hidden p-3 cursor-pointer transition-all border-l-4 ${
                                isSelected 
                                  ? "bg-indigo-50/50 border-l-indigo-600" 
                                  : "hover:bg-zinc-50 border-l-transparent"
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <p className="text-xs font-semibold text-zinc-900 mb-1">{task.description || "Site Activity"}</p>
                                  <p className="text-[9px] font-mono text-zinc-500 uppercase">{task.locationTag || "GENERAL AREA"}</p>
                                </div>
                                <span className="text-[9px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded ml-2">
                                  {task.taskId?.slice(-6).toUpperCase()}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                {group === "Auto Carried Forward" ? (
                                  isInProgress ? (
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-100 rounded text-indigo-700">
                                      <div className="w-1 h-1 bg-indigo-600 rounded-full animate-pulse"></div>
                                      <span className="text-[8px] font-mono font-bold">IN_PROGRESS</span>
                                    </div>
                                  ) : (
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-100 rounded text-red-700">
                                      <span className="text-[8px] font-mono font-bold">OVERDUE</span>
                                    </div>
                                  )
                                ) : (
                                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100 rounded text-emerald-700">
                                    <span className="text-[8px] font-mono font-bold">SCHEDULED</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                                <span>{task.startDate ? new Date(task.startDate).toLocaleDateString("en-GB").replace(/\//g, '-') : "---"}</span>
                                <span className="text-[8px]">#{(idx + 1).toString().padStart(2, '0')}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDE PANELS - Desktop */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            
            {/* LAYOUT MAP */}
            <div className="bg-white border border-zinc-200 rounded shadow-sm overflow-hidden">
              <div className="border-b border-zinc-200 px-4 py-3 bg-zinc-50">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 tracking-widest font-bold">SITE LAYOUT</span>
                  <span className="text-[9px] font-mono text-emerald-600 font-bold">● ACTIVE</span>
                </div>
              </div>
              <div className="p-4">
                <div className="aspect-video bg-zinc-50 border border-zinc-200 rounded overflow-hidden">
                  {selectedLayout ? (
                    <LayoutTaskMap
                      layoutImage={selectedLayout}
                      tasks={tasks.filter(t => t.layoutImage === selectedLayout)}
                      onSelectTask={setSelectedTask}
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center grayscale opacity-50">
                      <p className="text-[10px] font-mono text-zinc-400">MAP_OBLIQUE_VIEW_PENDING</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* TASK DETAILS */}
            <div className="bg-white border border-zinc-200 rounded shadow-sm overflow-hidden">
              <div className="border-b border-zinc-200 px-4 py-3 bg-zinc-50">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 tracking-widest font-bold">PROGRESS LOG</span>
                  {selectedTask && (
                    <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 border border-indigo-100 rounded">
                      #{selectedTask.taskId?.slice(-6).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                {selectedTask ? (
                  <TaskDetailsPanel 
                    task={selectedTask} 
                    onActionDone={() => setSelectedTask(null)} 
                  />
                ) : (
                  <div className="py-12 text-center border border-dashed border-zinc-200 rounded">
                    <p className="text-[10px] font-mono text-zinc-400">SELECT_ENTRY_FOR_DETAILS</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Side Panel Modal */}
      {showSidePanel && selectedTask && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[85vh] rounded-t-2xl overflow-hidden flex flex-col">
            <div className="border-b border-zinc-200 px-4 py-3 bg-zinc-50 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest font-bold">TASK DETAILS</span>
              <button 
                onClick={() => setShowSidePanel(false)}
                className="p-1 hover:bg-zinc-200 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Layout Map */}
              <div className="p-4 border-b border-zinc-200">
                <div className="mb-2">
                  <span className="text-[10px] font-mono text-zinc-500 tracking-widest font-bold">SITE LAYOUT</span>
                </div>
                <div className="aspect-video bg-zinc-50 border border-zinc-200 rounded overflow-hidden">
                  {selectedLayout ? (
                    <LayoutTaskMap
                      layoutImage={selectedLayout}
                      tasks={tasks.filter(t => t.layoutImage === selectedLayout)}
                      onSelectTask={setSelectedTask}
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center grayscale opacity-50">
                      <p className="text-[10px] font-mono text-zinc-400">MAP_OBLIQUE_VIEW_PENDING</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Task Details */}
              <div className="p-4">
                <TaskDetailsPanel 
                  task={selectedTask} 
                  onActionDone={() => {
                    setSelectedTask(null);
                    setShowSidePanel(false);
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}