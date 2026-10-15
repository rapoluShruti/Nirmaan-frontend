
// // // import { useEffect, useState } from "react";
// // // import api from "../api/axiosConfig";

// // // export default function ManagerDailyItineraryPage() {
// // //   const [tasks, setTasks] = useState([]);
// // //   const [projects, setProjects] = useState([]);
// // //   const [selectedProject, setSelectedProject] = useState("");
// // //   const [selectedTask, setSelectedTask] = useState(null);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [loading, setLoading] = useState(true);
// // //   const [showMapModal, setShowMapModal] = useState(false);
// // //   const [nearbyStores, setNearbyStores] = useState([]);

// // //   const OVERDUE_AI_RISK = {
// // //     reason: "Material delay due to weather conditions",
// // //     suggestion: "Order from local store",
// // //     actionType: "MAP_VIEW"
// // //   };

// // //   const mockNearbyStores = [
// // //     {
// // //       id: 1,
// // //       name: "Shree Cement & Building Materials",
// // //       address: "Plot 45, Sector 12, Industrial Area, New Delhi",
// // //       phone: "+91 98765 43210",
// // //       distance: "2.3 km",
// // //       rating: 4.5,
// // //       lat: 28.5355,
// // //       lng: 77.3910
// // //     },
// // //     {
// // //       id: 2,
// // //       name: "Rajesh Hardware & Suppliers",
// // //       address: "Shop 23, Main Market Road, Connaught Place",
// // //       phone: "+91 98765 43211",
// // //       distance: "3.1 km",
// // //       rating: 4.2,
// // //       lat: 28.5365,
// // //       lng: 77.3920
// // //     },
// // //     {
// // //       id: 3,
// // //       name: "Modern Construction Store",
// // //       address: "Building 7, Commercial Complex, Nehru Place",
// // //       phone: "+91 98765 43212",
// // //       distance: "4.5 km",
// // //       rating: 4.7,
// // //       lat: 28.5375,
// // //       lng: 77.3930
// // //     },
// // //     {
// // //       id: 4,
// // //       name: "City Building Materials Hub",
// // //       address: "Near Railway Station, Main Road, Karol Bagh",
// // //       phone: "+91 98765 43213",
// // //       distance: "5.2 km",
// // //       rating: 4.3,
// // //       lat: 28.5385,
// // //       lng: 77.3940
// // //     }
// // //   ];

// // //   const fetchProjectsAndTasks = async () => {
// // //     try {
// // //       const projectsRes = await api.get("/projects");
// // //       const fetchedProjects = projectsRes.data || [];
// // //       setProjects(fetchedProjects);

// // //       const tasksRes = await api.get("/tasks/manager");
// // //       const fetchedTasks = tasksRes.data.tasks || [];
// // //       setTasks(fetchedTasks);

// // //       if (fetchedProjects.length > 0 && !selectedProject) {
// // //         setSelectedProject(fetchedProjects[0].projectId);
// // //       }
// // //     } catch (err) {
// // //       console.error("Fetch failed", err);
// // //       setProjects([]);
// // //       setTasks([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchProjectsAndTasks();
// // //   }, []);

// // //   const handleApprove = async (taskId) => {
// // //     try {
// // //       await api.post(`/tasks/${taskId}/approve`);
// // //       setSelectedTask(null);
// // //       fetchProjectsAndTasks();
// // //     } catch (err) {
// // //       console.error("Approval failed", err);
// // //       alert("Failed to approve task");
// // //     }
// // //   };

// // //   const handleReject = async (taskId) => {
// // //     try {
// // //       await api.post(`/tasks/${taskId}/reject`);
// // //       setSelectedTask(null);
// // //       fetchProjectsAndTasks();
// // //     } catch (err) {
// // //       console.error("Reject failed", err);
// // //       alert("Failed to reject task");
// // //     }
// // //   };

// // //   const openMapView = () => {
// // //     setNearbyStores(mockNearbyStores);
// // //     setShowMapModal(true);
// // //   };

// // //   const openGoogleMaps = (lat, lng, name) => {
// // //     const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
// // //     window.open(url, '_blank');
// // //   };

// // //   const getDirections = (lat, lng) => {
// // //     const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
// // //     window.open(url, '_blank');
// // //   };

// // //   const callStore = (phone) => {
// // //     window.location.href = `tel:${phone}`;
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center h-screen bg-gray-50">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
// // //           <div className="text-lg text-gray-600">Loading...</div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const today = new Date();
// // //   today.setHours(0, 0, 0, 0);

// // //   // Filter by selected project
// // //   const projectFilteredTasks = selectedProject 
// // //     ? tasks.filter(t => t.projectId === selectedProject)
// // //     : tasks;

// // //   const pendingApprovalTasks = projectFilteredTasks.filter(
// // //     (t) => t.status === "COMPLETED" && t.approved === false && t.afterPhotoUrl
// // //   );

// // //   const overdueTasks = projectFilteredTasks.filter(
// // //     (t) => t.status === "CREATED" && t.endDate && new Date(t.endDate) < today
// // //   );

// // //   const inProgressTasks = projectFilteredTasks.filter((t) => t.status === "IN_PROGRESS");

// // //   const filterTasks = (taskList) => {
// // //     if (!searchQuery) return taskList;
// // //     return taskList.filter(
// // //       (t) =>
// // //         t.taskId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //         t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //         t.assignedSupervisor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
// // //     );
// // //   };

// // //   const renderTaskRow = (task, index, type) => {
// // //     const isSelected = selectedTask?._id === task._id;
// // //     const endDate = task.endDate ? new Date(task.endDate) : null;
// // //     const formattedEndDate = endDate
// // //       ? endDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
// // //       : "-";

// // //     return (
// // //       <tr
// // //         key={task._id}
// // //         onClick={() => setSelectedTask(task)}
// // //         className={`cursor-pointer transition-colors border-b ${
// // //           isSelected ? "bg-[#e6f3ee]" : "hover:bg-gray-50"
// // //         }`}
// // //       >
// // //         <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
// // //         <td className="px-4 py-3">
// // //           <div className="flex items-center gap-2">
// // //             <div className="w-8 h-8 rounded bg-[#e6f3ee] flex items-center justify-center text-teal-700 font-semibold text-xs">
// // //               {task.taskId?.substring(0, 2).toUpperCase()}
// // //             </div>
// // //             <div>
// // //               <div className="text-sm font-medium text-gray-900">{task.taskId}</div>
// // //               <div className="text-xs text-gray-500">{task.assignedSupervisor?.name}</div>
// // //             </div>
// // //           </div>
// // //         </td>
// // //         <td className="px-4 py-3">
// // //           <div className="text-sm text-gray-700">{task.description}</div>
// // //           <div className="text-xs text-gray-500 mt-1">
// // //             {projects.find(p => p.projectId === task.projectId)?.name || task.projectId}
// // //           </div>
// // //         </td>
// // //         <td className="px-4 py-3">
// // //           {type === "approval" && (
// // //             <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
// // //               Approval
// // //             </span>
// // //           )}
// // //           {type === "overdue" && (
// // //             <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
// // //               Overdue
// // //             </span>
// // //           )}
// // //           {type === "progress" && (
// // //             <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#e6f3ee] text-teal-800">
// // //               In Progress
// // //             </span>
// // //           )}
// // //         </td>
// // //         <td className="px-4 py-3 text-sm text-gray-600">{formattedEndDate}</td>
// // //       </tr>
// // //     );
// // //   };

// // //   const renderDetailPanel = () => {
// // //     if (!selectedTask) {
// // //       return (
// // //         <div className="h-full flex items-center justify-center p-8">
// // //           <div className="text-center">
// // //             <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// // //             </svg>
// // //             <p className="text-gray-500">Select a task to view details</p>
// // //           </div>
// // //         </div>
// // //       );
// // //     }

// // //     const isPendingApproval = selectedTask.status === "COMPLETED" && selectedTask.approved === false && selectedTask.afterPhotoUrl;
// // //     const isInProgress = selectedTask.status === "IN_PROGRESS";
// // //     const isOverdue = selectedTask.status === "CREATED" && selectedTask.endDate && new Date(selectedTask.endDate) < today;
// // //     const taskProject = projects.find(p => p.projectId === selectedTask.projectId);

// // //     return (
// // //       <div className="h-full flex flex-col">
// // //         {/* Header */}
// // //         <div className="p-6 border-b">
// // //           <div className="flex items-start justify-between mb-3">
// // //             <div>
// // //               <h2 className="text-xl font-bold text-gray-900">{selectedTask.taskId}</h2>
// // //               <p className="text-sm text-gray-600 mt-1">{taskProject?.name}</p>
// // //             </div>
// // //             <button
// // //               onClick={() => setSelectedTask(null)}
// // //               className="p-1 hover:bg-gray-100 rounded transition-colors"
// // //             >
// // //               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // //               </svg>
// // //             </button>
// // //           </div>
// // //           <p className="text-sm text-gray-700">{selectedTask.description}</p>
// // //         </div>

// // //         {/* Content */}
// // //         <div className="flex-1 overflow-y-auto p-6 space-y-6">
// // //           {/* Info Grid */}
// // //           <div className="grid grid-cols-2 gap-4 text-sm">
// // //             <div>
// // //               <div className="text-gray-500 mb-1">Status</div>
// // //               <div className="font-medium text-gray-900">{selectedTask.status}</div>
// // //             </div>
// // //             <div>
// // //               <div className="text-gray-500 mb-1">Supervisor</div>
// // //               <div className="font-medium text-gray-900">{selectedTask.assignedSupervisor?.name}</div>
// // //             </div>
// // //             {selectedTask.endDate && (
// // //               <div>
// // //                 <div className="text-gray-500 mb-1">Due Date</div>
// // //                 <div className="font-medium text-gray-900">
// // //                   {new Date(selectedTask.endDate).toLocaleDateString("en-IN", {
// // //                     day: "2-digit",
// // //                     month: "short",
// // //                     year: "numeric",
// // //                   })}
// // //                 </div>
// // //               </div>
// // //             )}
// // //             {taskProject?.location && (
// // //               <div>
// // //                 <div className="text-gray-500 mb-1">Location</div>
// // //                 <div className="font-medium text-gray-900 text-sm">
// // //                   {taskProject.location.city}, {taskProject.location.state}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* AI Risk */}
// // //           {isOverdue && (
// // //             <div className="border border-red-200 rounded-lg p-4 bg-red-50">
// // //               <div className="flex items-start gap-3 mb-3">
// // //                 <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// // //                 </svg>
// // //                 <div className="flex-1">
// // //                   <h3 className="font-semibold text-gray-900 text-sm mb-1">AI Risk Assessment</h3>
// // //                   <p className="text-sm text-gray-700 mb-2">{OVERDUE_AI_RISK.reason}</p>
// // //                   <p className="text-sm text-gray-600 mb-3">
// // //                     <span className="font-medium">Suggestion:</span> {OVERDUE_AI_RISK.suggestion}
// // //                   </p>
// // //                   <button
// // //                     onClick={openMapView}
// // //                     className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
// // //                   >
// // //                     Find Nearby Stores
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Voice Note */}
// // //           {selectedTask.voiceNoteUrl && (
// // //             <div>
// // //               <div className="text-sm font-medium text-gray-700 mb-2">Voice Note</div>
// // //               <audio controls 
// // //               // src={`http://localhost:2026${selectedTask.voiceNoteUrl}`}
// // //               src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.voiceNoteUrl}`}

// // //               className="w-full" />
// // //             </div>
// // //           )}

// // //           {/* Photos */}
// // //           {(isInProgress || isPendingApproval) && selectedTask.beforePhotoUrl && (
// // //             <div>
// // //               <div className="text-sm font-medium text-gray-700 mb-2">Before Photo</div>
// // //               <img
// // //                 // src={`http://localhost:2026${selectedTask.beforePhotoUrl}`}
// // //                 src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.beforePhotoUrl}`}
// // //                 alt="Before"
// // //                 className="w-full rounded border"
// // //               />
// // //             </div>
// // //           )}

// // //           {isPendingApproval && selectedTask.afterPhotoUrl && (
// // //             <div>
// // //               <div className="text-sm font-medium text-gray-700 mb-2">After Photo</div>
// // //               <img
// // //                 // src={`http://localhost:2026${selectedTask.afterPhotoUrl}`}
// // //                 src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.afterPhotoUrl}`}
// // //                 alt="After"
// // //                 className="w-full rounded border"
// // //               />
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Actions */}
// // //         {isPendingApproval && (
// // //           <div className="p-6 border-t bg-gray-50">
// // //             <div className="grid grid-cols-2 gap-3">
// // //               <button
// // //                 onClick={() => handleApprove(selectedTask._id)}
// // //                 className="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded transition-colors"
// // //               >
// // //                 Approve
// // //               </button>
// // //               <button
// // //                 onClick={() => handleReject(selectedTask._id)}
// // //                 className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded transition-colors"
// // //               >
// // //                 Reject
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className="h-screen flex flex-col bg-gray-50">
// // //       {/* Header */}
// // //       <div className="bg-white border-b px-6 py-4">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="flex items-center justify-between mb-4">
// // //             <div>
// // //               <h1 className="text-2xl font-bold text-gray-900">Daily Itinerary</h1>
// // //               <p className="text-sm text-gray-600 mt-1">
// // //                 {new Date().toLocaleDateString("en-IN", {
// // //                   weekday: "long",
// // //                   month: "long",
// // //                   day: "numeric",
// // //                   year: "numeric",
// // //                 })}
// // //               </p>
// // //             </div>
// // //             <div className="flex items-center gap-3">
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search tasks..."
// // //                 value={searchQuery}
// // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // //                 className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 w-64"
// // //               />
// // //               <select
// // //                 value={selectedProject}
// // //                 onChange={(e) => {
// // //                   setSelectedProject(e.target.value);
// // //                   setSelectedTask(null);
// // //                 }}
// // //                 className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
// // //               >
// // //                 <option value="">Select Project</option>
// // //                 {projects.map((project) => (
// // //                   <option key={project._id} value={project.projectId}>
// // //                     {project.name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             </div>
// // //           </div>

// // //           {/* Quick Stats */}
// // //           {selectedProject && (
// // //             <div className="flex items-center gap-6 text-sm">
// // //               <div className="flex items-center gap-2">
// // //                 <span className="text-gray-600">Total:</span>
// // //                 <span className="font-semibold">{projectFilteredTasks.length}</span>
// // //               </div>
// // //               <div className="flex items-center gap-2">
// // //                 <span className="w-2 h-2 bg-green-500 rounded-full"></span>
// // //                 <span className="text-gray-600">Approval:</span>
// // //                 <span className="font-semibold text-green-600">{pendingApprovalTasks.length}</span>
// // //               </div>
// // //               <div className="flex items-center gap-2">
// // //                 <span className="w-2 h-2 bg-red-500 rounded-full"></span>
// // //                 <span className="text-gray-600">Overdue:</span>
// // //                 <span className="font-semibold text-red-600">{overdueTasks.length}</span>
// // //               </div>
// // //               <div className="flex items-center gap-2">
// // //                 <span className="w-2 h-2 bg-teal-700 rounded-full"></span>
// // //                 <span className="text-gray-600">In Progress:</span>
// // //                 <span className="font-semibold text-teal-700">{inProgressTasks.length}</span>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="flex-1 overflow-hidden">
// // //         {!selectedProject ? (
// // //           <div className="h-full flex items-center justify-center">
// // //             <div className="text-center max-w-md">
// // //               <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// // //               </svg>
// // //               <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Project</h2>
// // //               <p className="text-gray-600 mb-6">Choose a project from the dropdown to view tasks</p>
// // //               <div className="space-y-2">
// // //                 {projects.slice(0, 3).map((project) => (
// // //                   <button
// // //                     key={project._id}
// // //                     onClick={() => setSelectedProject(project.projectId)}
// // //                     className="w-full px-4 py-3 bg-white hover:bg-gray-50 border rounded-lg text-left transition-colors"
// // //                   >
// // //                     <div className="font-medium text-gray-900">{project.name}</div>
// // //                     <div className="text-sm text-gray-500">
// // //                       {tasks.filter(t => t.projectId === project.projectId).length} tasks
// // //                     </div>
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <div className="h-full max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
// // //             {/* Task List with Sections */}
// // //             <div className="col-span-7 bg-white rounded-lg border overflow-hidden flex flex-col">
// // //               <div className="overflow-auto flex-1">
// // //                 {/* Pending Approval Section */}
// // //                 {filterTasks(pendingApprovalTasks).length > 0 && (
// // //                   <div className="border-b">
// // //                     <div className="bg-green-50 px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
// // //                       <h3 className="font-semibold text-green-700 text-sm">Pending Approval</h3>
// // //                       <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium">
// // //                         {filterTasks(pendingApprovalTasks).length}
// // //                       </span>
// // //                     </div>
// // //                     <table className="w-full">
// // //                       <thead className="bg-gray-50 border-b">
// // //                         <tr>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
// // //                         </tr>
// // //                       </thead>
// // //                       <tbody>
// // //                         {filterTasks(pendingApprovalTasks).map((task, idx) => renderTaskRow(task, idx, "approval"))}
// // //                       </tbody>
// // //                     </table>
// // //                   </div>
// // //                 )}

// // //                 {/* Overdue Section */}
// // //                 {filterTasks(overdueTasks).length > 0 && (
// // //                   <div className="border-b">
// // //                     <div className="bg-red-50 px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
// // //                       <h3 className="font-semibold text-red-700 text-sm">Overdue Tasks</h3>
// // //                       <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-medium">
// // //                         {filterTasks(overdueTasks).length}
// // //                       </span>
// // //                     </div>
// // //                     <table className="w-full">
// // //                       <thead className="bg-gray-50 border-b">
// // //                         <tr>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
// // //                         </tr>
// // //                       </thead>
// // //                       <tbody>
// // //                         {filterTasks(overdueTasks).map((task, idx) => renderTaskRow(task, idx, "overdue"))}
// // //                       </tbody>
// // //                     </table>
// // //                   </div>
// // //                 )}

// // //                 {/* In Progress Section */}
// // //                 {filterTasks(inProgressTasks).length > 0 && (
// // //                   <div>
// // //                     <div className="bg-[#e6f3ee] px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
// // //                       <h3 className="font-semibold text-teal-800 text-sm">In Progress</h3>
// // //                       <span className="bg-teal-700 text-white px-2 py-0.5 rounded text-xs font-medium">
// // //                         {filterTasks(inProgressTasks).length}
// // //                       </span>
// // //                     </div>
// // //                     <table className="w-full">
// // //                       <thead className="bg-gray-50 border-b">
// // //                         <tr>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
// // //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
// // //                         </tr>
// // //                       </thead>
// // //                       <tbody>
// // //                         {filterTasks(inProgressTasks).map((task, idx) => renderTaskRow(task, idx, "progress"))}
// // //                       </tbody>
// // //                     </table>
// // //                   </div>
// // //                 )}

// // //                 {/* Empty State */}
// // //                 {filterTasks(pendingApprovalTasks).length === 0 && 
// // //                  filterTasks(overdueTasks).length === 0 && 
// // //                  filterTasks(inProgressTasks).length === 0 && (
// // //                   <div className="flex flex-col items-center justify-center py-20">
// // //                     <svg className="w-16 h-16 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                     </svg>
// // //                     <p className="text-gray-500">No tasks found</p>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Task Details */}
// // //             <div className="col-span-5 bg-white rounded-lg border overflow-hidden">
// // //               {renderDetailPanel()}
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Map Modal */}
// // //       {showMapModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden">
// // //             <div className="p-6 border-b flex items-center justify-between">
// // //               <div>
// // //                 <h2 className="text-xl font-bold text-gray-900">Nearby Stores</h2>
// // //                 <p className="text-sm text-gray-600 mt-1">Find local material suppliers</p>
// // //               </div>
// // //               <button onClick={() => setShowMapModal(false)} className="p-2 hover:bg-gray-100 rounded transition-colors">
// // //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // //                 </svg>
// // //               </button>
// // //             </div>

// // //             <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)] space-y-4">
// // //               {nearbyStores.map((store) => (
// // //                 <div key={store.id} className="border rounded-lg p-4">
// // //                   <div className="flex items-start justify-between mb-2">
// // //                     <div>
// // //                       <h3 className="font-semibold text-gray-900">{store.name}</h3>
// // //                       <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
// // //                         <span>⭐ {store.rating}</span>
// // //                         <span>•</span>
// // //                         <span>{store.distance}</span>
// // //                       </div>
// // //                     </div>
// // //                     <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Open</span>
// // //                   </div>
// // //                   <p className="text-sm text-gray-600 mb-3">{store.address}</p>
// // //                   <div className="grid grid-cols-3 gap-2">
// // //                     <button onClick={() => callStore(store.phone)} className="bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-medium transition-colors">
// // //                       Call
// // //                     </button>
// // //                     <button onClick={() => getDirections(store.lat, store.lng)} className="bg-teal-700 hover:bg-teal-800 text-white py-2 rounded text-sm font-medium transition-colors">
// // //                       Navigate
// // //                     </button>
// // //                     <button onClick={() => openGoogleMaps(store.lat, store.lng, store.name)} className="bg-teal-700 hover:bg-teal-800 text-white py-2 rounded text-sm font-medium transition-colors">
// // //                       Map
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // import { useEffect, useState } from "react";
// // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import L from 'leaflet';
// // import api from "../api/axiosConfig";

// // // Fix for default markers in react-leaflet
// // delete L.Icon.Default.prototype._getIconUrl;
// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
// //   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
// //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// // });

// // export default function ManagerDailyItineraryPage() {
// //   const [tasks, setTasks] = useState([]);
// //   const [projects, setProjects] = useState([]);
// //   const [selectedProject, setSelectedProject] = useState("");
// //   const [selectedTask, setSelectedTask] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [showMapModal, setShowMapModal] = useState(false);
// //   const [nearbyStores, setNearbyStores] = useState([]);
// //   const [storeSearchQuery, setStoreSearchQuery] = useState("");
// //   const [activeTab, setActiveTab] = useState('list'); // 'list' or 'map'

// //   const OVERDUE_AI_RISK = {
// //     reason: "Material delay due to weather conditions",
// //     suggestion: "Order from local store",
// //     actionType: "MAP_VIEW"
// //   };

// //   const mockNearbyStores = [
// //     {
// //       id: 1,
// //       name: "Patel Hardware & Tools",
// //       category: "Hardware & Tools",
// //       contact: "Mukesh Patel",
// //       phone: "+91 98765 43210",
// //       alternatePhone: "+91 98765 43210",
// //       address: "123 Main Rd, Nehru Nagar, Delhi, India",
// //       email: "patel.hardware@email.com",
// //       distance: "2.3 km",
// //       rating: 4.5,
// //       status: "Open",
// //       lat: 28.5355,
// //       lng: 77.3910
// //     },
// //     {
// //       id: 2,
// //       name: "Shankar Equipment Supplies",
// //       category: "Equipment Rentals",
// //       contact: "Sunil Shankar",
// //       phone: "+91 97654 32109",
// //       alternatePhone: "+91 97654 32109",
// //       address: "A-45, Industrial Area, Rajkat Nagar, Delhi, India",
// //       email: "shankar.equipments@email.com",
// //       distance: "3.1 km",
// //       rating: 4.2,
// //       status: "Open",
// //       lat: 28.5365,
// //       lng: 77.3920
// //     },
// //     {
// //       id: 3,
// //       name: "Ahuja Construction Tools",
// //       category: "Construction Tools",
// //       contact: "Rajesh Ahuja",
// //       phone: "+91 98901 98765",
// //       alternatePhone: "+91 98901 98765",
// //       address: "Plot 23, Construction Zone, Delhi, India",
// //       email: "ahuja.tools@email.com",
// //       distance: "4.5 km",
// //       rating: 4.7,
// //       status: "Open",
// //       lat: 28.5375,
// //       lng: 77.3930
// //     },
// //     {
// //       id: 4,
// //       name: "Modern Building Materials",
// //       category: "Building Materials",
// //       contact: "Amit Gupta",
// //       phone: "+91 98765 43213",
// //       alternatePhone: "+91 98765 43214",
// //       address: "Near Railway Station, Main Road, Karol Bagh, Delhi",
// //       email: "modern.materials@email.com",
// //       distance: "5.2 km",
// //       rating: 4.3,
// //       status: "Closed",
// //       lat: 28.5385,
// //       lng: 77.3940
// //     },
// //     {
// //       id: 5,
// //       name: "Singh Steel & Iron Works",
// //       category: "Steel & Iron",
// //       contact: "Harpreet Singh",
// //       phone: "+91 99887 76543",
// //       alternatePhone: "+91 99887 76544",
// //       address: "Plot 67, Industrial Complex, Mayur Vihar, Delhi",
// //       email: "singh.steel@email.com",
// //       distance: "6.1 km",
// //       rating: 4.4,
// //       status: "Open",
// //       lat: 28.5395,
// //       lng: 77.3950
// //     }
// //   ];

// //   // ... (keep all existing functions like fetchProjectsAndTasks, handleApprove, etc.)

// //   const fetchProjectsAndTasks = async () => {
// //     try {
// //       const projectsRes = await api.get("/projects");
// //       const fetchedProjects = projectsRes.data || [];
// //       setProjects(fetchedProjects);

// //       const tasksRes = await api.get("/tasks/manager");
// //       const fetchedTasks = tasksRes.data.tasks || [];
// //       setTasks(fetchedTasks);

// //       if (fetchedProjects.length > 0 && !selectedProject) {
// //         setSelectedProject(fetchedProjects[0].projectId);
// //       }
// //     } catch (err) {
// //       console.error("Fetch failed", err);
// //       setProjects([]);
// //       setTasks([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProjectsAndTasks();
// //   }, []);

// //   const handleApprove = async (taskId) => {
// //     try {
// //       await api.post(`/tasks/${taskId}/approve`);
// //       setSelectedTask(null);
// //       fetchProjectsAndTasks();
// //     } catch (err) {
// //       console.error("Approval failed", err);
// //       alert("Failed to approve task");
// //     }
// //   };

// //   const handleReject = async (taskId) => {
// //     try {
// //       await api.post(`/tasks/${taskId}/reject`);
// //       setSelectedTask(null);
// //       fetchProjectsAndTasks();
// //     } catch (err) {
// //       console.error("Reject failed", err);
// //       alert("Failed to reject task");
// //     }
// //   };

// //   const openMapView = () => {
// //     setNearbyStores(mockNearbyStores);
// //     setShowMapModal(true);
// //     setActiveTab('list');
// //   };

// //   const openGoogleMaps = (lat, lng, name) => {
// //     const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
// //     window.open(url, '_blank');
// //   };

// //   const getDirections = (lat, lng) => {
// //     const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
// //     window.open(url, '_blank');
// //   };

// //   const callStore = (phone) => {
// //     window.location.href = `tel:${phone}`;
// //   };

// //   const sendEmail = (email) => {
// //     window.location.href = `mailto:${email}`;
// //   };

// //   const filteredStores = nearbyStores.filter(store =>
// //     store.name.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
// //     store.category.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
// //     store.contact.toLowerCase().includes(storeSearchQuery.toLowerCase())
// //   );

// //   // ... (keep all existing functions like renderTaskRow, renderDetailPanel, etc.)

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-screen bg-gray-50">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
// //           <div className="text-lg text-gray-600">Loading...</div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const today = new Date();
// //   today.setHours(0, 0, 0, 0);

// //   // Filter by selected project
// //   const projectFilteredTasks = selectedProject 
// //     ? tasks.filter(t => t.projectId === selectedProject)
// //     : tasks;

// //   const pendingApprovalTasks = projectFilteredTasks.filter(
// //     (t) => t.status === "COMPLETED" && t.approved === false && t.afterPhotoUrl
// //   );

// //   const overdueTasks = projectFilteredTasks.filter(
// //     (t) => t.status === "CREATED" && t.endDate && new Date(t.endDate) < today
// //   );

// //   const inProgressTasks = projectFilteredTasks.filter((t) => t.status === "IN_PROGRESS");

// //   const filterTasks = (taskList) => {
// //     if (!searchQuery) return taskList;
// //     return taskList.filter(
// //       (t) =>
// //         t.taskId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         t.assignedSupervisor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //   };

// //   const renderTaskRow = (task, index, type) => {
// //     const isSelected = selectedTask?._id === task._id;
// //     const endDate = task.endDate ? new Date(task.endDate) : null;
// //     const formattedEndDate = endDate
// //       ? endDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
// //       : "-";

// //     return (
// //       <tr
// //         key={task._id}
// //         onClick={() => setSelectedTask(task)}
// //         className={`cursor-pointer transition-colors border-b ${
// //           isSelected ? "bg-[#e6f3ee]" : "hover:bg-gray-50"
// //         }`}
// //       >
// //         <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
// //         <td className="px-4 py-3">
// //           <div className="flex items-center gap-2">
// //             <div className="w-8 h-8 rounded bg-[#e6f3ee] flex items-center justify-center text-teal-700 font-semibold text-xs">
// //               {task.taskId?.substring(0, 2).toUpperCase()}
// //             </div>
// //             <div>
// //               <div className="text-sm font-medium text-gray-900">{task.taskId}</div>
// //               <div className="text-xs text-gray-500">{task.assignedSupervisor?.name}</div>
// //             </div>
// //           </div>
// //         </td>
// //         <td className="px-4 py-3">
// //           <div className="text-sm text-gray-700">{task.description}</div>
// //           <div className="text-xs text-gray-500 mt-1">
// //             {projects.find(p => p.projectId === task.projectId)?.name || task.projectId}
// //           </div>
// //         </td>
// //         <td className="px-4 py-3">
// //           {type === "approval" && (
// //             <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
// //               Approval
// //             </span>
// //           )}
// //           {type === "overdue" && (
// //             <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
// //               Overdue
// //             </span>
// //           )}
// //           {type === "progress" && (
// //             <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#e6f3ee] text-teal-800">
// //               In Progress
// //             </span>
// //           )}
// //         </td>
// //         <td className="px-4 py-3 text-sm text-gray-600">{formattedEndDate}</td>
// //       </tr>
// //     );
// //   };

// //   const renderDetailPanel = () => {
// //     if (!selectedTask) {
// //       return (
// //         <div className="h-full flex items-center justify-center p-8">
// //           <div className="text-center">
// //             <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //             </svg>
// //             <p className="text-gray-500">Select a task to view details</p>
// //           </div>
// //         </div>
// //       );
// //     }

// //     const isPendingApproval = selectedTask.status === "COMPLETED" && selectedTask.approved === false && selectedTask.afterPhotoUrl;
// //     const isInProgress = selectedTask.status === "IN_PROGRESS";
// //     const isOverdue = selectedTask.status === "CREATED" && selectedTask.endDate && new Date(selectedTask.endDate) < today;
// //     const taskProject = projects.find(p => p.projectId === selectedTask.projectId);

// //     return (
// //       <div className="h-full flex flex-col">
// //         {/* Header */}
// //         <div className="p-6 border-b">
// //           <div className="flex items-start justify-between mb-3">
// //             <div>
// //               <h2 className="text-xl font-bold text-gray-900">{selectedTask.taskId}</h2>
// //               <p className="text-sm text-gray-600 mt-1">{taskProject?.name}</p>
// //             </div>
// //             <button
// //               onClick={() => setSelectedTask(null)}
// //               className="p-1 hover:bg-gray-100 rounded transition-colors"
// //             >
// //               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //               </svg>
// //             </button>
// //           </div>
// //           <p className="text-sm text-gray-700">{selectedTask.description}</p>
// //         </div>

// //         {/* Content */}
// //         <div className="flex-1 overflow-y-auto p-6 space-y-6">
// //           {/* Info Grid */}
// //           <div className="grid grid-cols-2 gap-4 text-sm">
// //             <div>
// //               <div className="text-gray-500 mb-1">Status</div>
// //               <div className="font-medium text-gray-900">{selectedTask.status}</div>
// //             </div>
// //             <div>
// //               <div className="text-gray-500 mb-1">Supervisor</div>
// //               <div className="font-medium text-gray-900">{selectedTask.assignedSupervisor?.name}</div>
// //             </div>
// //             {selectedTask.endDate && (
// //               <div>
// //                 <div className="text-gray-500 mb-1">Due Date</div>
// //                 <div className="font-medium text-gray-900">
// //                   {new Date(selectedTask.endDate).toLocaleDateString("en-IN", {
// //                     day: "2-digit",
// //                     month: "short",
// //                     year: "numeric",
// //                   })}
// //                 </div>
// //               </div>
// //             )}
// //             {taskProject?.location && (
// //               <div>
// //                 <div className="text-gray-500 mb-1">Location</div>
// //                 <div className="font-medium text-gray-900 text-sm">
// //                   {taskProject.location.city}, {taskProject.location.state}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* AI Risk */}
// //           {isOverdue && (
// //             <div className="border border-red-200 rounded-lg p-4 bg-red-50">
// //               <div className="flex items-start gap-3 mb-3">
// //                 <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //                 </svg>
// //                 <div className="flex-1">
// //                   <h3 className="font-semibold text-gray-900 text-sm mb-1">AI Risk Assessment</h3>
// //                   <p className="text-sm text-gray-700 mb-2">{OVERDUE_AI_RISK.reason}</p>
// //                   <p className="text-sm text-gray-600 mb-3">
// //                     <span className="font-medium">Suggestion:</span> {OVERDUE_AI_RISK.suggestion}
// //                   </p>
// //                   <button
// //                     onClick={openMapView}
// //                     className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
// //                   >
// //                     Find Nearby Stores
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Voice Note */}
// //           {selectedTask.voiceNoteUrl && (
// //             <div>
// //               <div className="text-sm font-medium text-gray-700 mb-2">Voice Note</div>
// //               <audio controls 
// //                 src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.voiceNoteUrl}`}
// //                 className="w-full" 
// //               />
// //             </div>
// //           )}

// //           {/* Photos */}
// //           {(isInProgress || isPendingApproval) && selectedTask.beforePhotoUrl && (
// //             <div>
// //               <div className="text-sm font-medium text-gray-700 mb-2">Before Photo</div>
// //               <img
// //                 src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.beforePhotoUrl}`}
// //                 alt="Before"
// //                 className="w-full rounded border"
// //               />
// //             </div>
// //           )}

// //           {isPendingApproval && selectedTask.afterPhotoUrl && (
// //             <div>
// //               <div className="text-sm font-medium text-gray-700 mb-2">After Photo</div>
// //               <img
// //                 src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.afterPhotoUrl}`}
// //                 alt="After"
// //                 className="w-full rounded border"
// //               />
// //             </div>
// //           )}
// //         </div>

// //         {/* Actions */}
// //         {isPendingApproval && (
// //           <div className="p-6 border-t bg-gray-50">
// //             <div className="grid grid-cols-2 gap-3">
// //               <button
// //                 onClick={() => handleApprove(selectedTask._id)}
// //                 className="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded transition-colors"
// //               >
// //                 Approve
// //               </button>
// //               <button
// //                 onClick={() => handleReject(selectedTask._id)}
// //                 className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded transition-colors"
// //               >
// //                 Reject
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="h-screen flex flex-col bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-white border-b px-6 py-4">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="flex items-center justify-between mb-4">
// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-900">Daily Itinerary</h1>
// //               <p className="text-sm text-gray-600 mt-1">
// //                 {new Date().toLocaleDateString("en-IN", {
// //                   weekday: "long",
// //                   month: "long",
// //                   day: "numeric",
// //                   year: "numeric",
// //                 })}
// //               </p>
// //             </div>
// //             <div className="flex items-center gap-3">
// //               <input
// //                 type="text"
// //                 placeholder="Search tasks..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 w-64"
// //               />
// //               <select
// //                 value={selectedProject}
// //                 onChange={(e) => {
// //                   setSelectedProject(e.target.value);
// //                   setSelectedTask(null);
// //                 }}
// //                 className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
// //               >
// //                 <option value="">Select Project</option>
// //                 {projects.map((project) => (
// //                   <option key={project._id} value={project.projectId}>
// //                     {project.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           {/* Quick Stats */}
// //           {selectedProject && (
// //             <div className="flex items-center gap-6 text-sm">
// //               <div className="flex items-center gap-2">
// //                 <span className="text-gray-600">Total:</span>
// //                 <span className="font-semibold">{projectFilteredTasks.length}</span>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <span className="w-2 h-2 bg-green-500 rounded-full"></span>
// //                 <span className="text-gray-600">Approval:</span>
// //                 <span className="font-semibold text-green-600">{pendingApprovalTasks.length}</span>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <span className="w-2 h-2 bg-red-500 rounded-full"></span>
// //                 <span className="text-gray-600">Overdue:</span>
// //                 <span className="font-semibold text-red-600">{overdueTasks.length}</span>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <span className="w-2 h-2 bg-teal-700 rounded-full"></span>
// //                 <span className="text-gray-600">In Progress:</span>
// //                 <span className="font-semibold text-teal-700">{inProgressTasks.length}</span>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 overflow-hidden">
// //         {!selectedProject ? (
// //           <div className="h-full flex items-center justify-center">
// //             <div className="text-center max-w-md">
// //               <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// //               </svg>
// //               <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Project</h2>
// //               <p className="text-gray-600 mb-6">Choose a project from the dropdown to view tasks</p>
// //               <div className="space-y-2">
// //                 {projects.slice(0, 3).map((project) => (
// //                   <button
// //                     key={project._id}
// //                     onClick={() => setSelectedProject(project.projectId)}
// //                     className="w-full px-4 py-3 bg-white hover:bg-gray-50 border rounded-lg text-left transition-colors"
// //                   >
// //                     <div className="font-medium text-gray-900">{project.name}</div>
// //                     <div className="text-sm text-gray-500">
// //                       {tasks.filter(t => t.projectId === project.projectId).length} tasks
// //                     </div>
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="h-full max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
// //             {/* Task List with Sections */}
// //             <div className="col-span-7 bg-white rounded-lg border overflow-hidden flex flex-col">
// //               <div className="overflow-auto flex-1">
// //                 {/* Pending Approval Section */}
// //                 {filterTasks(pendingApprovalTasks).length > 0 && (
// //                   <div className="border-b">
// //                     <div className="bg-green-50 px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
// //                       <h3 className="font-semibold text-green-700 text-sm">Pending Approval</h3>
// //                       <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium">
// //                         {filterTasks(pendingApprovalTasks).length}
// //                       </span>
// //                     </div>
// //                     <table className="w-full">
// //                       <thead className="bg-gray-50 border-b">
// //                         <tr>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {filterTasks(pendingApprovalTasks).map((task, idx) => renderTaskRow(task, idx, "approval"))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 )}

// //                 {/* Overdue Section */}
// //                 {filterTasks(overdueTasks).length > 0 && (
// //                   <div className="border-b">
// //                     <div className="bg-red-50 px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
// //                       <h3 className="font-semibold text-red-700 text-sm">Overdue Tasks</h3>
// //                       <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-medium">
// //                         {filterTasks(overdueTasks).length}
// //                       </span>
// //                     </div>
// //                     <table className="w-full">
// //                       <thead className="bg-gray-50 border-b">
// //                         <tr>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {filterTasks(overdueTasks).map((task, idx) => renderTaskRow(task, idx, "overdue"))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 )}

// //                 {/* In Progress Section */}
// //                 {filterTasks(inProgressTasks).length > 0 && (
// //                   <div>
// //                     <div className="bg-[#e6f3ee] px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
// //                       <h3 className="font-semibold text-teal-800 text-sm">In Progress</h3>
// //                       <span className="bg-teal-700 text-white px-2 py-0.5 rounded text-xs font-medium">
// //                         {filterTasks(inProgressTasks).length}
// //                       </span>
// //                     </div>
// //                     <table className="w-full">
// //                       <thead className="bg-gray-50 border-b">
// //                         <tr>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
// //                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {filterTasks(inProgressTasks).map((task, idx) => renderTaskRow(task, idx, "progress"))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 )}

// //                 {/* Empty State */}
// //                 {filterTasks(pendingApprovalTasks).length === 0 && 
// //                  filterTasks(overdueTasks).length === 0 && 
// //                  filterTasks(inProgressTasks).length === 0 && (
// //                   <div className="flex flex-col items-center justify-center py-20">
// //                     <svg className="w-16 h-16 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                     </svg>
// //                     <p className="text-gray-500">No tasks found</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Task Details */}
// //             <div className="col-span-5 bg-white rounded-lg border overflow-hidden">
// //               {renderDetailPanel()}
// //             </div>
// //           </div>
// //         )}
// //       </div>

// // {/* Nearby Stores Modal - Exact match to your image */}
// // {showMapModal && (
// //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //     <div className="bg-white rounded-lg w-full max-w-7xl h-[85vh] overflow-hidden flex flex-col">
// //       {/* Header */}
// //       <div className="p-4 border-b flex items-center justify-between bg-white">
// //         <div className="flex items-center gap-3">
// //           <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// //           </svg>
// //           <h2 className="text-xl font-semibold text-gray-900">Nearby Vendors</h2>
// //         </div>
// //         <div className="flex items-center gap-3">
// //           <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
// //             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
// //             </svg>
// //             Add Vendor
// //           </button>
// //           <button 
// //             onClick={() => setShowMapModal(false)} 
// //             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //           >
// //             <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //             </svg>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 overflow-hidden flex">
// //         {/* Left Side - Map */}
// //         <div className="w-1/3 border-r bg-gray-50 flex flex-col">
// //           {/* Search Bar */}
// //           <div className="p-4 border-b bg-white">
// //             <div className="relative">
// //               <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //               </svg>
// //               <input
// //                 type="text"
// //                 placeholder="Search vendors..."
// //                 value={storeSearchQuery}
// //                 onChange={(e) => setStoreSearchQuery(e.target.value)}
// //                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-sm"
// //               />
// //             </div>
// //           </div>

// //           {/* Map Container */}
// //           <div className="flex-1">
// //             <MapContainer
// //               center={[28.5355, 77.3910]}
// //               zoom={12}
// //               style={{ height: '100%', width: '100%' }}
// //             >
// //               <TileLayer
// //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //               />
// //               {filteredStores.map((store) => (
// //                 <Marker key={store.id} position={[store.lat, store.lng]}>
// //                   <Popup>
// //                     <div className="p-2">
// //                       <h3 className="font-medium text-sm mb-1">{store.name}</h3>
// //                       <p className="text-xs text-gray-600 mb-1">{store.category}</p>
// //                       <p className="text-xs text-gray-600 mb-2">{store.address}</p>
// //                       <div className="flex gap-1">
// //                         <button 
// //                           onClick={() => callStore(store.phone)}
// //                           className="bg-green-600 text-white px-2 py-1 rounded text-xs"
// //                         >
// //                           Call
// //                         </button>
// //                         <button 
// //                           onClick={() => getDirections(store.lat, store.lng)}
// //                           className="bg-teal-700 text-white px-2 py-1 rounded text-xs"
// //                         >
// //                           Navigate
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </Popup>
// //                 </Marker>
// //               ))}
// //             </MapContainer>
// //           </div>

// //           {/* Language Selector */}
// //           <div className="p-4 border-t bg-white">
// //             <div className="flex items-center gap-2 text-sm text-gray-600">
// //               <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-4 h-3" />
// //               <span>EN</span>
// //               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //               </svg>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Side - Vendor List */}
// //         <div className="flex-1 bg-white flex flex-col">
// //           {/* Results Header */}
// //           <div className="p-4 border-b bg-gray-50">
// //             <p className="text-sm text-gray-600">Showing {filteredStores.length} nearby vendors</p>
// //           </div>

// //           {/* Vendor List */}
// //           <div className="flex-1 overflow-y-auto">
// //             {filteredStores.map((store, index) => (
// //               <div key={store.id} className="p-6 border-b hover:bg-gray-50 transition-colors">
// //                 {/* Vendor Header */}
// //                 <div className="flex items-start justify-between mb-4">
// //                   <div className="flex-1">
// //                     <h3 className="text-lg font-semibold text-gray-900 mb-1">{store.name}</h3>
// //                     <p className="text-sm text-teal-700 font-medium">{store.category}</p>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <button 
// //                       onClick={() => callStore(store.phone)}
// //                       className="p-2 bg-[#e6f3ee] hover:bg-[#d7ebe2] text-teal-700 rounded-lg transition-colors"
// //                     >
// //                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
// //                       </svg>
// //                     </button>
// //                     <button 
// //                       onClick={() => sendEmail(store.email)}
// //                       className="p-2 bg-[#e6f3ee] hover:bg-[#d7ebe2] text-teal-700 rounded-lg transition-colors"
// //                     >
// //                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                       </svg>
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Contact Information */}
// //                 <div className="space-y-3">
// //                   {/* Contact Person */}
// //                   <div className="flex items-center gap-3 text-sm text-gray-700">
// //                     <span className="font-medium">Contact</span>
// //                     <span>{store.contact}</span>
// //                   </div>

// //                   {/* Phone Numbers */}
// //                   <div className="flex items-center gap-6">
// //                     <div className="flex items-center gap-2 text-sm text-gray-700">
// //                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
// //                       </svg>
// //                       <span>{store.phone}</span>
// //                     </div>
// //                     {store.alternatePhone && store.alternatePhone !== store.phone && (
// //                       <div className="flex items-center gap-2 text-sm text-gray-700">
// //                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
// //                         </svg>
// //                         <span>{store.alternatePhone}</span>
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Address */}
// //                   <div className="flex items-start gap-2 text-sm text-gray-700">
// //                     <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                     </svg>
// //                     <span>{store.address}</span>
// //                     <span className="text-teal-700 font-medium ml-2">{store.distance}</span>
// //                     <button className="text-teal-700 hover:text-teal-800 text-xs underline ml-2">
// //                       mail+
// //                     </button>
// //                   </div>

// //                   {/* Email */}
// //                   <div className="flex items-center gap-2 text-sm text-gray-700">
// //                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                     </svg>
// //                     <span>{store.email}</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}

// //             {filteredStores.length === 0 && (
// //               <div className="p-12 text-center">
// //                 <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //                 </svg>
// //                 <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
// //                 <p className="text-gray-600">Try adjusting your search criteria</p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Pagination */}
// //           <div className="p-4 border-t bg-gray-50">
// //             <div className="flex items-center justify-center gap-2">
// //               <button className="p-2 text-gray-400 hover:text-gray-600">
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //                 </svg>
// //               </button>
// //               <button className="w-8 h-8 bg-teal-700 text-white rounded text-sm font-medium">1</button>
// //               <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm">2</button>
// //               <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm">3</button>
// //               <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm">4</button>
// //               <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm">5</button>
// //               <button className="p-2 text-gray-400 hover:text-gray-600">
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // )}
// //     </div>
// //   );
// // };
// import { useEffect, useMemo, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import api from "../api/axiosConfig";

// // Fix for default markers in react-leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const LS_APPROVAL_KEY = "PS02_HIGH_RISK_APPROVALS_v1";

// const loadApprovals = () => {
//   try {
//     const raw = localStorage.getItem(LS_APPROVAL_KEY);
//     return raw ? JSON.parse(raw) : [];
//   } catch {
//     return [];
//   }
// };

// const saveApprovals = (arr) => {
//   localStorage.setItem(LS_APPROVAL_KEY, JSON.stringify(arr || []));
// };

// const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// export default function ManagerDailyItineraryPage() {
//   const [tasks, setTasks] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState("");
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [showMapModal, setShowMapModal] = useState(false);
//   const [nearbyStores, setNearbyStores] = useState([]);
//   const [storeSearchQuery, setStoreSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("list"); // 'list' or 'map'

//   // High risk approval requests (localStorage shared with Supervisor)
//   const [approvals, setApprovals] = useState(loadApprovals());

//   // OTP Modal
//   const [otpModalOpen, setOtpModalOpen] = useState(false);
//   const [otpForTaskId, setOtpForTaskId] = useState(null);
//   const [otpGenerated, setOtpGenerated] = useState(null);

//   const OVERDUE_AI_RISK = {
//     reason: "Material delay due to weather conditions",
//     suggestion: "Order from local store",
//     actionType: "MAP_VIEW",
//   };

//   const mockNearbyStores = [
//     {
//       id: 1,
//       name: "Patel Hardware & Tools",
//       category: "Hardware & Tools",
//       contact: "Mukesh Patel",
//       phone: "+91 98765 43210",
//       alternatePhone: "+91 98765 43210",
//       address: "123 Main Rd, Nehru Nagar, Delhi, India",
//       email: "patel.hardware@email.com",
//       distance: "2.3 km",
//       rating: 4.5,
//       status: "Open",
//       lat: 28.5355,
//       lng: 77.391,
//     },
//     {
//       id: 2,
//       name: "Shankar Equipment Supplies",
//       category: "Equipment Rentals",
//       contact: "Sunil Shankar",
//       phone: "+91 97654 32109",
//       alternatePhone: "+91 97654 32109",
//       address: "A-45, Industrial Area, Rajkat Nagar, Delhi, India",
//       email: "shankar.equipments@email.com",
//       distance: "3.1 km",
//       rating: 4.2,
//       status: "Open",
//       lat: 28.5365,
//       lng: 77.392,
//     },
//     {
//       id: 3,
//       name: "Ahuja Construction Tools",
//       category: "Construction Tools",
//       contact: "Rajesh Ahuja",
//       phone: "+91 98901 98765",
//       alternatePhone: "+91 98901 98765",
//       address: "Plot 23, Construction Zone, Delhi, India",
//       email: "ahuja.tools@email.com",
//       distance: "4.5 km",
//       rating: 4.7,
//       status: "Open",
//       lat: 28.5375,
//       lng: 77.393,
//     },
//     {
//       id: 4,
//       name: "Modern Building Materials",
//       category: "Building Materials",
//       contact: "Amit Gupta",
//       phone: "+91 98765 43213",
//       alternatePhone: "+91 98765 43214",
//       address: "Near Railway Station, Main Road, Karol Bagh, Delhi",
//       email: "modern.materials@email.com",
//       distance: "5.2 km",
//       rating: 4.3,
//       status: "Closed",
//       lat: 28.5385,
//       lng: 77.394,
//     },
//     {
//       id: 5,
//       name: "Singh Steel & Iron Works",
//       category: "Steel & Iron",
//       contact: "Harpreet Singh",
//       phone: "+91 99887 76543",
//       alternatePhone: "+91 99887 76544",
//       address: "Plot 67, Industrial Complex, Mayur Vihar, Delhi",
//       email: "singh.steel@email.com",
//       distance: "6.1 km",
//       rating: 4.4,
//       status: "Open",
//       lat: 28.5395,
//       lng: 77.395,
//     },
//   ];

//   const fetchProjectsAndTasks = async () => {
//     try {
//       const projectsRes = await api.get("/projects");
//       const fetchedProjects = projectsRes.data || [];
//       setProjects(fetchedProjects);

//       const tasksRes = await api.get("/tasks/manager");
//       const fetchedTasks = tasksRes.data.tasks || [];
//       setTasks(fetchedTasks);

//       if (fetchedProjects.length > 0 && !selectedProject) {
//         setSelectedProject(fetchedProjects[0].projectId);
//       }
//     } catch (err) {
//       console.error("Fetch failed", err);
//       setProjects([]);
//       setTasks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjectsAndTasks();
//   }, []);

//   // approvals sync
//   useEffect(() => {
//     const sync = () => setApprovals(loadApprovals());
//     window.addEventListener("storage", sync);
//     return () => window.removeEventListener("storage", sync);
//   }, []);

//   const openMapView = () => {
//     setNearbyStores(mockNearbyStores);
//     setShowMapModal(true);
//     setActiveTab("list");
//   };

//   const getDirections = (lat, lng) => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
//     window.open(url, "_blank");
//   };

//   const callStore = (phone) => {
//     window.location.href = `tel:${phone}`;
//   };

//   const sendEmail = (email) => {
//     window.location.href = `mailto:${email}`;
//   };

//   const filteredStores = nearbyStores.filter(
//     (store) =>
//       store.name.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
//       store.category.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
//       store.contact.toLowerCase().includes(storeSearchQuery.toLowerCase())
//   );

//   const today = useMemo(() => {
//     const t = new Date();
//     t.setHours(0, 0, 0, 0);
//     return t;
//   }, []);

//   // Filter by selected project
//   const projectFilteredTasks = selectedProject ? tasks.filter((t) => t.projectId === selectedProject) : tasks;

//   const pendingApprovalTasks = projectFilteredTasks.filter(
//     (t) => t.status === "COMPLETED" && t.approved === false && t.afterPhotoUrl
//   );

//   const overdueTasks = projectFilteredTasks.filter(
//     (t) => t.status === "CREATED" && t.endDate && new Date(t.endDate) < today
//   );

//   const inProgressTasks = projectFilteredTasks.filter((t) => t.status === "IN_PROGRESS");

//   const filterTasks = (taskList) => {
//     if (!searchQuery) return taskList;
//     return taskList.filter(
//       (t) =>
//         t.taskId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         t.assignedSupervisor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   };

//   // ------------------ HIGH RISK REQUESTS (from Supervisor localStorage) ------------------
//   const highRiskRequests = useMemo(() => {
//     return approvals.filter((a) => a.status === "PENDING" || a.status === "APPROVED" || a.status === "REJECTED");
//   }, [approvals]);

//   const pendingHighRisk = highRiskRequests.filter((r) => r.status === "PENDING");

//   const approveHighRisk = (taskId) => {
//     const all = loadApprovals();
//     const found = all.find((x) => x.taskId === taskId);
//     if (!found) return;

//     const otp = generateOtp();

//     const updated = all.map((x) =>
//       x.taskId === taskId
//         ? {
//             ...x,
//             status: "APPROVED",
//             otp,
//             otpCreatedAt: new Date().toISOString(),
//             otpUsed: false,
//           }
//         : x
//     );

//     saveApprovals(updated);
//     setApprovals(updated);

//     // Show dummy gmail OTP modal
//     setOtpForTaskId(taskId);
//     setOtpGenerated(otp);
//     setOtpModalOpen(true);
//   };

//   const rejectHighRisk = (taskId) => {
//     const all = loadApprovals();
//     const updated = all.map((x) => (x.taskId === taskId ? { ...x, status: "REJECTED" } : x));
//     saveApprovals(updated);
//     setApprovals(updated);
//   };

//   // Keep your existing approvals (task completion) too
//   const handleApprove = async (taskId) => {
//     try {
//       await api.post(`/tasks/${taskId}/approve`);
//       setSelectedTask(null);
//       fetchProjectsAndTasks();
//     } catch (err) {
//       console.error("Approval failed", err);
//       alert("Failed to approve task");
//     }
//   };

//   const handleReject = async (taskId) => {
//     try {
//       await api.post(`/tasks/${taskId}/reject`);
//       setSelectedTask(null);
//       fetchProjectsAndTasks();
//     } catch (err) {
//       console.error("Reject failed", err);
//       alert("Failed to reject task");
//     }
//   };

//   const renderTaskRow = (task, index, type) => {
//     const isSelected = selectedTask?._id === task._id;
//     const endDate = task.endDate ? new Date(task.endDate) : null;
//     const formattedEndDate = endDate ? endDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "-";

//     return (
//       <tr
//         key={task._id}
//         onClick={() => setSelectedTask(task)}
//         className={`cursor-pointer transition-colors border-b ${isSelected ? "bg-[#e6f3ee]" : "hover:bg-gray-50"}`}
//       >
//         <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
//         <td className="px-4 py-3">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded bg-[#e6f3ee] flex items-center justify-center text-teal-700 font-semibold text-xs">
//               {task.taskId?.substring(0, 2).toUpperCase()}
//             </div>
//             <div>
//               <div className="text-sm font-medium text-gray-900">{task.taskId}</div>
//               <div className="text-xs text-gray-500">{task.assignedSupervisor?.name}</div>
//             </div>
//           </div>
//         </td>
//         <td className="px-4 py-3">
//           <div className="text-sm text-gray-700">{task.description}</div>
//           <div className="text-xs text-gray-500 mt-1">
//             {projects.find((p) => p.projectId === task.projectId)?.name || task.projectId}
//           </div>
//         </td>
//         <td className="px-4 py-3">
//           {type === "approval" && (
//             <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
//               Approval
//             </span>
//           )}
//           {type === "overdue" && (
//             <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
//               Overdue
//             </span>
//           )}
//           {type === "progress" && (
//             <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#e6f3ee] text-teal-800">
//               In Progress
//             </span>
//           )}
//         </td>
//         <td className="px-4 py-3 text-sm text-gray-600">{formattedEndDate}</td>
//       </tr>
//     );
//   };

//   const renderDetailPanel = () => {
//     if (!selectedTask) {
//       return (
//         <div className="h-full flex items-center justify-center p-8">
//           <div className="text-center">
//             <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             <p className="text-gray-500">Select a task to view details</p>
//           </div>
//         </div>
//       );
//     }

//     const isPendingApproval =
//       selectedTask.status === "COMPLETED" && selectedTask.approved === false && selectedTask.afterPhotoUrl;

//     const isInProgress = selectedTask.status === "IN_PROGRESS";
//     const isOverdue = selectedTask.status === "CREATED" && selectedTask.endDate && new Date(selectedTask.endDate) < today;
//     const taskProject = projects.find((p) => p.projectId === selectedTask.projectId);

//     return (
//       <div className="h-full flex flex-col">
//         <div className="p-6 border-b">
//           <div className="flex items-start justify-between mb-3">
//             <div>
//               <h2 className="text-xl font-bold text-gray-900">{selectedTask.taskId}</h2>
//               <p className="text-sm text-gray-600 mt-1">{taskProject?.name}</p>
//             </div>
//             <button onClick={() => setSelectedTask(null)} className="p-1 hover:bg-gray-100 rounded transition-colors">
//               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <p className="text-sm text-gray-700">{selectedTask.description}</p>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 space-y-6">
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div>
//               <div className="text-gray-500 mb-1">Status</div>
//               <div className="font-medium text-gray-900">{selectedTask.status}</div>
//             </div>
//             <div>
//               <div className="text-gray-500 mb-1">Supervisor</div>
//               <div className="font-medium text-gray-900">{selectedTask.assignedSupervisor?.name}</div>
//             </div>
//             {selectedTask.endDate && (
//               <div>
//                 <div className="text-gray-500 mb-1">Due Date</div>
//                 <div className="font-medium text-gray-900">
//                   {new Date(selectedTask.endDate).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </div>
//               </div>
//             )}
//             {taskProject?.location && (
//               <div>
//                 <div className="text-gray-500 mb-1">Location</div>
//                 <div className="font-medium text-gray-900 text-sm">
//                   {taskProject.location.city}, {taskProject.location.state}
//                 </div>
//               </div>
//             )}
//           </div>

//           {isOverdue && (
//             <div className="border border-red-200 rounded-lg p-4 bg-red-50">
//               <div className="flex items-start gap-3 mb-3">
//                 <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-gray-900 text-sm mb-1">AI Risk Assessment</h3>
//                   <p className="text-sm text-gray-700 mb-2">{OVERDUE_AI_RISK.reason}</p>
//                   <p className="text-sm text-gray-600 mb-3">
//                     <span className="font-medium">Suggestion:</span> {OVERDUE_AI_RISK.suggestion}
//                   </p>
//                   <button
//                     onClick={openMapView}
//                     className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
//                   >
//                     Find Nearby Stores
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {selectedTask.voiceNoteUrl && (
//             <div>
//               <div className="text-sm font-medium text-gray-700 mb-2">Voice Note</div>
//               <audio controls src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.voiceNoteUrl}`} className="w-full" />
//             </div>
//           )}

//           {(isInProgress || isPendingApproval) && selectedTask.beforePhotoUrl && (
//             <div>
//               <div className="text-sm font-medium text-gray-700 mb-2">Before Photo</div>
//               <img
//                 src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.beforePhotoUrl}`}
//                 alt="Before"
//                 className="w-full rounded border"
//               />
//             </div>
//           )}

//           {isPendingApproval && selectedTask.afterPhotoUrl && (
//             <div>
//               <div className="text-sm font-medium text-gray-700 mb-2">After Photo</div>
//               <img
//                 src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.afterPhotoUrl}`}
//                 alt="After"
//                 className="w-full rounded border"
//               />
//             </div>
//           )}
//         </div>

//         {isPendingApproval && (
//           <div className="p-6 border-t bg-gray-50">
//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 onClick={() => handleApprove(selectedTask._id)}
//                 className="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded transition-colors"
//               >
//                 Approve
//               </button>
//               <button
//                 onClick={() => handleReject(selectedTask._id)}
//                 className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded transition-colors"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <div className="text-lg text-gray-600">Loading...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col bg-gray-50">
//       {/* OTP MODAL (Dummy Gmail OTP) */}
//       {otpModalOpen && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden border">
//             <div className="p-4 bg-green-600 text-white">
//               <div className="text-sm font-semibold">OTP Sent (Gmail Simulation)</div>
//               <div className="text-xs opacity-90">Approval verification code generated successfully</div>
//             </div>

//             <div className="p-4 space-y-3">
//               <div className="text-sm text-gray-700">
//                 Task ID: <span className="font-semibold">{otpForTaskId}</span>
//               </div>

//               <div className="bg-gray-50 border rounded-lg p-3">
//                 <div className="text-xs text-gray-500 mb-1">6 Digit OTP</div>
//                 <div className="text-2xl font-bold tracking-widest text-gray-900">{otpGenerated}</div>
//                 <div className="text-[11px] text-gray-500 mt-1">
//                   Share this OTP with Supervisor to unlock “Before Photo Upload”.
//                 </div>
//               </div>

//               <div className="text-[11px] text-gray-500">
//                 Note: This is demo-only for hackathon. In production this would be sent via Gmail API / SMS gateway.
//               </div>

//               <button
//                 onClick={() => setOtpModalOpen(false)}
//                 className="w-full bg-gray-900 hover:bg-black text-white py-2.5 rounded-lg text-sm font-medium"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="bg-white border-b px-6 py-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Daily Itinerary</h1>
//               <p className="text-sm text-gray-600 mt-1">
//                 {new Date().toLocaleDateString("en-IN", {
//                   weekday: "long",
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <input
//                 type="text"
//                 placeholder="Search tasks..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 w-64"
//               />
//               <select
//                 value={selectedProject}
//                 onChange={(e) => {
//                   setSelectedProject(e.target.value);
//                   setSelectedTask(null);
//                 }}
//                 className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
//               >
//                 <option value="">Select Project</option>
//                 {projects.map((project) => (
//                   <option key={project._id} value={project.projectId}>
//                     {project.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* High Risk Approval Requests */}
//           {pendingHighRisk.length > 0 && (
//             <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
//               <div className="flex items-center justify-between mb-3">
//                 <div>
//                   <div className="font-semibold text-red-700">High Risk Requests Pending</div>
//                   <div className="text-xs text-gray-600">Supervisor requested safety approval + OTP unlock</div>
//                 </div>
//                 <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
//                   {pendingHighRisk.length} Pending
//                 </span>
//               </div>

//               <div className="space-y-2">
//                 {pendingHighRisk.slice(0, 5).map((req) => (
//                   <div key={req.taskId} className="bg-white border rounded p-3 flex items-start justify-between">
//                     <div>
//                       <div className="text-sm font-semibold text-gray-900">{req.description}</div>
//                       <div className="text-xs text-gray-500">Task: {req.taskId}</div>
//                       <div className="text-xs text-gray-500">Requested at: {new Date(req.createdAt).toLocaleString()}</div>
//                     </div>

//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => approveHighRisk(req.taskId)}
//                         className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs rounded font-semibold"
//                       >
//                         Approve + OTP
//                       </button>
//                       <button
//                         onClick={() => rejectHighRisk(req.taskId)}
//                         className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs rounded font-semibold"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Quick Stats */}
//           {selectedProject && (
//             <div className="flex items-center gap-6 text-sm">
//               <div className="flex items-center gap-2">
//                 <span className="text-gray-600">Total:</span>
//                 <span className="font-semibold">{projectFilteredTasks.length}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                 <span className="text-gray-600">Approval:</span>
//                 <span className="font-semibold text-green-600">{pendingApprovalTasks.length}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="w-2 h-2 bg-red-500 rounded-full"></span>
//                 <span className="text-gray-600">Overdue:</span>
//                 <span className="font-semibold text-red-600">{overdueTasks.length}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="w-2 h-2 bg-teal-700 rounded-full"></span>
//                 <span className="text-gray-600">In Progress:</span>
//                 <span className="font-semibold text-teal-700">{inProgressTasks.length}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-hidden">
//         {!selectedProject ? (
//           <div className="h-full flex items-center justify-center">
//             <div className="text-center max-w-md">
//               <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                 />
//               </svg>
//               <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Project</h2>
//               <p className="text-gray-600 mb-6">Choose a project from the dropdown to view tasks</p>
//               <div className="space-y-2">
//                 {projects.slice(0, 3).map((project) => (
//                   <button
//                     key={project._id}
//                     onClick={() => setSelectedProject(project.projectId)}
//                     className="w-full px-4 py-3 bg-white hover:bg-gray-50 border rounded-lg text-left transition-colors"
//                   >
//                     <div className="font-medium text-gray-900">{project.name}</div>
//                     <div className="text-sm text-gray-500">{tasks.filter((t) => t.projectId === project.projectId).length} tasks</div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="h-full max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
//             {/* Task List */}
//             <div className="col-span-7 bg-white rounded-lg border overflow-hidden flex flex-col">
//               <div className="overflow-auto flex-1">
//                 {/* Pending Approval */}
//                 {filterTasks(pendingApprovalTasks).length > 0 && (
//                   <div className="border-b">
//                     <div className="bg-green-50 px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
//                       <h3 className="font-semibold text-green-700 text-sm">Pending Approval</h3>
//                       <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium">
//                         {filterTasks(pendingApprovalTasks).length}
//                       </span>
//                     </div>
//                     <table className="w-full">
//                       <thead className="bg-gray-50 border-b">
//                         <tr>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
//                         </tr>
//                       </thead>
//                       <tbody>{filterTasks(pendingApprovalTasks).map((task, idx) => renderTaskRow(task, idx, "approval"))}</tbody>
//                     </table>
//                   </div>
//                 )}

//                 {/* Overdue */}
//                 {filterTasks(overdueTasks).length > 0 && (
//                   <div className="border-b">
//                     <div className="bg-red-50 px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
//                       <h3 className="font-semibold text-red-700 text-sm">Overdue Tasks</h3>
//                       <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-medium">
//                         {filterTasks(overdueTasks).length}
//                       </span>
//                     </div>
//                     <table className="w-full">
//                       <thead className="bg-gray-50 border-b">
//                         <tr>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
//                         </tr>
//                       </thead>
//                       <tbody>{filterTasks(overdueTasks).map((task, idx) => renderTaskRow(task, idx, "overdue"))}</tbody>
//                     </table>
//                   </div>
//                 )}

//                 {/* In Progress */}
//                 {filterTasks(inProgressTasks).length > 0 && (
//                   <div>
//                     <div className="bg-[#e6f3ee] px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
//                       <h3 className="font-semibold text-teal-800 text-sm">In Progress</h3>
//                       <span className="bg-teal-700 text-white px-2 py-0.5 rounded text-xs font-medium">
//                         {filterTasks(inProgressTasks).length}
//                       </span>
//                     </div>
//                     <table className="w-full">
//                       <thead className="bg-gray-50 border-b">
//                         <tr>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
//                         </tr>
//                       </thead>
//                       <tbody>{filterTasks(inProgressTasks).map((task, idx) => renderTaskRow(task, idx, "progress"))}</tbody>
//                     </table>
//                   </div>
//                 )}

//                 {filterTasks(pendingApprovalTasks).length === 0 &&
//                   filterTasks(overdueTasks).length === 0 &&
//                   filterTasks(inProgressTasks).length === 0 && (
//                     <div className="flex flex-col items-center justify-center py-20">
//                       <svg className="w-16 h-16 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <p className="text-gray-500">No tasks found</p>
//                     </div>
//                   )}
//               </div>
//             </div>

//             {/* Task Details */}
//             <div className="col-span-5 bg-white rounded-lg border overflow-hidden">{renderDetailPanel()}</div>
//           </div>
//         )}
//       </div>

//       {/* Nearby Stores Modal */}
//       {showMapModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-7xl h-[85vh] overflow-hidden flex flex-col">
//             <div className="p-4 border-b flex items-center justify-between bg-white">
//               <div className="flex items-center gap-3">
//                 <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//                 <h2 className="text-xl font-semibold text-gray-900">Nearby Vendors</h2>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                   Add Vendor
//                 </button>
//                 <button onClick={() => setShowMapModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 overflow-hidden flex">
//               <div className="w-1/3 border-r bg-gray-50 flex flex-col">
//                 <div className="p-4 border-b bg-white">
//                   <div className="relative">
//                     <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                     <input
//                       type="text"
//                       placeholder="Search vendors..."
//                       value={storeSearchQuery}
//                       onChange={(e) => setStoreSearchQuery(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex-1">
//                   <MapContainer center={[28.5355, 77.391]} zoom={12} style={{ height: "100%", width: "100%" }}>
//                     <TileLayer
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     {filteredStores.map((store) => (
//                       <Marker key={store.id} position={[store.lat, store.lng]}>
//                         <Popup>
//                           <div className="p-2">
//                             <h3 className="font-medium text-sm mb-1">{store.name}</h3>
//                             <p className="text-xs text-gray-600 mb-1">{store.category}</p>
//                             <p className="text-xs text-gray-600 mb-2">{store.address}</p>
//                             <div className="flex gap-1">
//                               <button onClick={() => callStore(store.phone)} className="bg-green-600 text-white px-2 py-1 rounded text-xs">
//                                 Call
//                               </button>
//                               <button onClick={() => getDirections(store.lat, store.lng)} className="bg-teal-700 text-white px-2 py-1 rounded text-xs">
//                                 Navigate
//                               </button>
//                             </div>
//                           </div>
//                         </Popup>
//                       </Marker>
//                     ))}
//                   </MapContainer>
//                 </div>

//                 <div className="p-4 border-t bg-white">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-4 h-3" />
//                     <span>EN</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex-1 bg-white flex flex-col">
//                 <div className="p-4 border-b bg-gray-50">
//                   <p className="text-sm text-gray-600">Showing {filteredStores.length} nearby vendors</p>
//                 </div>

//                 <div className="flex-1 overflow-y-auto">
//                   {filteredStores.map((store) => (
//                     <div key={store.id} className="p-6 border-b hover:bg-gray-50 transition-colors">
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex-1">
//                           <h3 className="text-lg font-semibold text-gray-900 mb-1">{store.name}</h3>
//                           <p className="text-sm text-teal-700 font-medium">{store.category}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => callStore(store.phone)}
//                             className="p-2 bg-[#e6f3ee] hover:bg-[#d7ebe2] text-teal-700 rounded-lg transition-colors"
//                           >
//                             📞
//                           </button>
//                           <button
//                             onClick={() => sendEmail(store.email)}
//                             className="p-2 bg-[#e6f3ee] hover:bg-[#d7ebe2] text-teal-700 rounded-lg transition-colors"
//                           >
//                             ✉️
//                           </button>
//                         </div>
//                       </div>

//                       <div className="space-y-2 text-sm text-gray-700">
//                         <div>
//                           <span className="font-medium">Contact:</span> {store.contact}
//                         </div>
//                         <div>
//                           <span className="font-medium">Phone:</span> {store.phone}
//                         </div>
//                         <div>
//                           <span className="font-medium">Address:</span> {store.address}{" "}
//                           <span className="text-teal-700 font-medium ml-2">{store.distance}</span>
//                         </div>
//                         <div>
//                           <span className="font-medium">Email:</span> {store.email}
//                         </div>
//                       </div>
//                     </div>
//                   ))}

//                   {filteredStores.length === 0 && (
//                     <div className="p-12 text-center">
//                       <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
//                       <p className="text-gray-600">Try adjusting your search criteria</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../api/axiosConfig";
import TaskDetailsPanel from "../components/TaskDetailsPanel";

// Fix markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SESSION_KEYS = {
  SAFETY_REQUESTS: "ps02_safety_requests",
  SAFETY_OTPS: "ps02_safety_otps",
};

const loadSessionObj = (key) => {
  try {
    return JSON.parse(sessionStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
};

const saveSessionObj = (key, obj) => {
  sessionStorage.setItem(key, JSON.stringify(obj || {}));
};

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const isHighRiskTask = (task, index) => {
  if (task?.isHighRisk === true) return true;
  if (task?.riskLevel?.toLowerCase?.() === "high") return true;
  if (task?.priority?.toLowerCase?.() === "high") return true;
  return index % 3 === 0;
};

export default function ManagerDailyItineraryPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [showMapModal, setShowMapModal] = useState(false);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [storeSearchQuery, setStoreSearchQuery] = useState("");

  const OVERDUE_AI_RISK = {
    reason: "Material delay due to weather conditions",
    suggestion: "Order from local store",
    actionType: "MAP_VIEW",
  };

  const mockNearbyStores = [
    {
      id: 1,
      name: "Patel Hardware & Tools",
      category: "Hardware & Tools",
      contact: "Mukesh Patel",
      phone: "+91 98765 43210",
      alternatePhone: "+91 98765 43210",
      address: "123 Main Rd, Nehru Nagar, Delhi, India",
      email: "patel.hardware@email.com",
      distance: "2.3 km",
      rating: 4.5,
      status: "Open",
      lat: 28.5355,
      lng: 77.391,
    },
    {
      id: 2,
      name: "Shankar Equipment Supplies",
      category: "Equipment Rentals",
      contact: "Sunil Shankar",
      phone: "+91 97654 32109",
      alternatePhone: "+91 97654 32109",
      address: "A-45, Industrial Area, Rajkat Nagar, Delhi, India",
      email: "shankar.equipments@email.com",
      distance: "3.1 km",
      rating: 4.2,
      status: "Open",
      lat: 28.5365,
      lng: 77.392,
    },
    {
      id: 3,
      name: "Ahuja Construction Tools",
      category: "Construction Tools",
      contact: "Rajesh Ahuja",
      phone: "+91 98901 98765",
      alternatePhone: "+91 98901 98765",
      address: "Plot 23, Construction Zone, Delhi, India",
      email: "ahuja.tools@email.com",
      distance: "4.5 km",
      rating: 4.7,
      status: "Open",
      lat: 28.5375,
      lng: 77.393,
    },
    {
      id: 4,
      name: "Modern Building Materials",
      category: "Building Materials",
      contact: "Amit Gupta",
      phone: "+91 98765 43213",
      alternatePhone: "+91 98765 43214",
      address: "Near Railway Station, Main Road, Karol Bagh, Delhi",
      email: "modern.materials@email.com",
      distance: "5.2 km",
      rating: 4.3,
      status: "Closed",
      lat: 28.5385,
      lng: 77.394,
    },
    {
      id: 5,
      name: "Singh Steel & Iron Works",
      category: "Steel & Iron",
      contact: "Harpreet Singh",
      phone: "+91 99887 76543",
      alternatePhone: "+91 99887 76544",
      address: "Plot 67, Industrial Complex, Mayur Vihar, Delhi",
      email: "singh.steel@email.com",
      distance: "6.1 km",
      rating: 4.4,
      status: "Open",
      lat: 28.5395,
      lng: 77.395,
    },
  ];

  const refreshSafetyOnTasks = (incomingTasks) => {
    const reqs = loadSessionObj(SESSION_KEYS.SAFETY_REQUESTS);
    const otps = loadSessionObj(SESSION_KEYS.SAFETY_OTPS);

    return incomingTasks.map((t, idx) => {
      const tid = t._id;
      const hr = isHighRiskTask(t, idx);
      const req = reqs?.[tid];
      const otpRec = otps?.[tid];

      const otpVerified = req?.otpVerified === true;

      return {
        ...t,
        isHighRisk: hr,
        safety: {
          requestExists: !!req,
          requestStatus: req?.status || null, // PENDING / APPROVED / REJECTED
          otpVerified,
          otp: otpRec?.otp || null,
          safetyVideoUrl: req?.videoUrl || null,
          supervisorNote: req?.note || null,
        },
      };
    });
  };

  const fetchProjectsAndTasks = async () => {
    try {
      const projectsRes = await api.get("/projects");
      const fetchedProjects = projectsRes.data || [];
      setProjects(fetchedProjects);

      const tasksRes = await api.get("/tasks/manager");
      const fetchedTasks = tasksRes.data.tasks || [];

      const enriched = refreshSafetyOnTasks(fetchedTasks);

      setTasks(enriched);

      if (fetchedProjects.length > 0 && !selectedProject) {
        setSelectedProject(fetchedProjects[0].projectId);
      }
    } catch (err) {
      console.error("Fetch failed", err);
      setProjects([]);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsAndTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (taskId) => {
    try {
      await api.post(`/tasks/${taskId}/approve`);
      setSelectedTask(null);
      fetchProjectsAndTasks();
    } catch (err) {
      console.error("Approval failed", err);
      alert("Failed to approve task");
    }
  };

  const handleReject = async (taskId) => {
    try {
      await api.post(`/tasks/${taskId}/reject`);
      setSelectedTask(null);
      fetchProjectsAndTasks();
    } catch (err) {
      console.error("Reject failed", err);
      alert("Failed to reject task");
    }
  };

  const openMapView = () => {
    setNearbyStores(mockNearbyStores);
    setShowMapModal(true);
  };

  const getDirections = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  const callStore = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const sendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const filteredStores = nearbyStores.filter(
    (store) =>
      store.name.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
      store.contact.toLowerCase().includes(storeSearchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const projectFilteredTasks = selectedProject ? tasks.filter((t) => t.projectId === selectedProject) : tasks;

  const pendingApprovalTasks = projectFilteredTasks.filter(
    (t) => t.status === "COMPLETED" && t.approved === false && t.afterPhotoUrl
  );

  const overdueTasks = projectFilteredTasks.filter(
    (t) => t.status === "CREATED" && t.endDate && new Date(t.endDate) < today
  );

  const inProgressTasks = projectFilteredTasks.filter((t) => t.status === "IN_PROGRESS");

  // Safety requests (HIGH RISK)
  const safetyRequests = projectFilteredTasks.filter((t) => t.isHighRisk && t.safety?.requestStatus === "PENDING");

  const filterTasks = (taskList) => {
    if (!searchQuery) return taskList;
    return taskList.filter(
      (t) =>
        t.taskId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.assignedSupervisor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderTaskRow = (task, index, badge) => {
    const isSelected = selectedTask?._id === task._id;
    const endDate = task.endDate ? new Date(task.endDate) : null;
    const formattedEndDate = endDate
      ? endDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
      : "-";

    const badgeColor =
      badge === "SAFETY" ? "bg-amber-100 text-amber-800" :
      badge === "APPROVAL" ? "bg-green-100 text-green-700" :
      badge === "OVERDUE" ? "bg-red-100 text-red-700" :
      "bg-[#e6f3ee] text-teal-800";

    const badgeText =
      badge === "SAFETY" ? "Safety Approval" :
      badge === "APPROVAL" ? "Approval" :
      badge === "OVERDUE" ? "Overdue" :
      "In Progress";

    return (
      <tr
        key={task._id}
        onClick={() => setSelectedTask(task)}
        className={`cursor-pointer transition-colors border-b ${
          isSelected ? "bg-[#e6f3ee]" : "hover:bg-gray-50"
        }`}
      >
        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#e6f3ee] flex items-center justify-center text-teal-700 font-semibold text-xs">
              {task.taskId?.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{task.taskId}</div>
              <div className="text-xs text-gray-500">{task.assignedSupervisor?.name || "Supervisor"}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="text-sm text-gray-700">{task.description}</div>
          <div className="text-xs text-gray-500 mt-1">
            {projects.find((p) => p.projectId === task.projectId)?.name || task.projectId}
          </div>
        </td>
        <td className="px-4 py-3">
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${badgeColor}`}>
            {badgeText}
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{formattedEndDate}</td>
      </tr>
    );
  };

  const managerGenerateOtpAndApprove = (task) => {
    if (!task?._id) return;

    const reqs = loadSessionObj(SESSION_KEYS.SAFETY_REQUESTS);
    const otps = loadSessionObj(SESSION_KEYS.SAFETY_OTPS);

    const otp = generateOtp();

    // store otp
    otps[task._id] = {
      otp,
      createdAt: Date.now(),
      emailSentTo: "supervisor@gmail.com",
    };

    // update request
    reqs[task._id] = {
      ...(reqs[task._id] || {}),
      status: "APPROVED",
      approvedAt: Date.now(),
      otpVerified: false, // supervisor will verify
    };

    saveSessionObj(SESSION_KEYS.SAFETY_OTPS, otps);
    saveSessionObj(SESSION_KEYS.SAFETY_REQUESTS, reqs);

    alert(
      `OTP SENT (Demo): ${otp}\n\nThis is acting like Manager sent OTP to Supervisor email.`
    );

    fetchProjectsAndTasks();
    setSelectedTask((prev) => (prev?._id === task._id ? { ...prev, safety: { ...(prev.safety || {}), requestStatus: "APPROVED", otp } } : prev));
  };

  const renderDetailPanel = () => {
    if (!selectedTask) {
      return (
        <div className="h-full flex items-center justify-center p-8">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500">Select a task to view details</p>
          </div>
        </div>
      );
    }

    const isPendingApproval =
      selectedTask.status === "COMPLETED" && selectedTask.approved === false && selectedTask.afterPhotoUrl;

    const isOverdue = selectedTask.status === "CREATED" && selectedTask.endDate && new Date(selectedTask.endDate) < today;

    const hasSafetyPending = selectedTask.isHighRisk && selectedTask.safety?.requestStatus === "PENDING";
    const hasSafetyApproved = selectedTask.isHighRisk && selectedTask.safety?.requestStatus === "APPROVED";

    return (
      <div className="h-full flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedTask.taskId}</h2>
              <p className="text-sm text-gray-600 mt-1">
                {projects.find((p) => p.projectId === selectedTask.projectId)?.name || selectedTask.projectId}
              </p>
            </div>
            <button onClick={() => setSelectedTask(null)} className="p-1 hover:bg-gray-100 rounded transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-700">{selectedTask.description}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Safety Request Panel */}
          {selectedTask.isHighRisk && (
            <div className="border rounded-lg p-4 bg-red-50 border-red-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-700 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">High Risk Task Safety Gate</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Supervisor must send a safety video request. You can approve and generate OTP.
                  </p>

                  {selectedTask.safety?.safetyVideoUrl ? (
                    <video
                      src={selectedTask.safety.safetyVideoUrl}
                      controls
                      className="w-full rounded border mb-3"
                    />
                  ) : (
                    <div className="text-xs text-gray-600 bg-white border border-red-200 rounded p-2 mb-3">
                      No safety video received yet.
                    </div>
                  )}

                  {hasSafetyPending && (
                    <button
                      onClick={() => managerGenerateOtpAndApprove(selectedTask)}
                      className="w-full bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      Approve & Send OTP (Demo)
                    </button>
                  )}

                  {hasSafetyApproved && (
                    <div className="text-xs bg-green-50 border border-green-200 text-green-800 rounded p-2">
                      Safety approved. OTP generated and sent to Supervisor (Demo).
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* AI Risk overdue */}
          {isOverdue && (
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-start gap-3 mb-3">
                <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">AI Risk Assessment</h3>
                  <p className="text-sm text-gray-700 mb-2">{OVERDUE_AI_RISK.reason}</p>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Suggestion:</span> {OVERDUE_AI_RISK.suggestion}
                  </p>
                  <button
                    onClick={() => openMapView()}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Find Nearby Stores
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Photos */}
          {selectedTask.beforePhotoUrl && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Before Photo</div>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.beforePhotoUrl}`}
                alt="Before"
                className="w-full rounded border"
              />
            </div>
          )}

          {selectedTask.afterPhotoUrl && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">After Photo</div>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.afterPhotoUrl}`}
                alt="After"
                className="w-full rounded border"
              />
            </div>
          )}
        </div>

        {/* Approve/Reject completion */}
        {isPendingApproval && (
          <div className="p-6 border-t bg-gray-50">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleApprove(selectedTask._id)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(selectedTask._id)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Daily Itinerary</h1>
              <p className="text-sm text-gray-600 mt-1">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 w-64"
              />
              <select
                value={selectedProject}
                onChange={(e) => {
                  setSelectedProject(e.target.value);
                  setSelectedTask(null);
                }}
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project.projectId}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          {selectedProject && (
            <div className="flex items-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold">{projectFilteredTasks.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-gray-600">Safety Requests:</span>
                <span className="font-semibold text-yellow-700">{safetyRequests.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-600">Approval:</span>
                <span className="font-semibold text-green-600">{pendingApprovalTasks.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-gray-600">Overdue:</span>
                <span className="font-semibold text-red-600">{overdueTasks.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-700 rounded-full"></span>
                <span className="text-gray-600">In Progress:</span>
                <span className="font-semibold text-teal-700">{inProgressTasks.length}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {!selectedProject ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Project</h2>
              <p className="text-gray-600 mb-6">Choose a project from the dropdown to view tasks</p>
              <div className="space-y-2">
                {projects.slice(0, 3).map((project) => (
                  <button
                    key={project._id}
                    onClick={() => setSelectedProject(project.projectId)}
                    className="w-full px-4 py-3 bg-white hover:bg-gray-50 border rounded-lg text-left transition-colors"
                  >
                    <div className="font-medium text-gray-900">{project.name}</div>
                    <div className="text-sm text-gray-500">
                      {tasks.filter((t) => t.projectId === project.projectId).length} tasks
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
            <div className="col-span-7 bg-white rounded-lg border overflow-hidden flex flex-col">
              <div className="overflow-auto flex-1">
                {/* Safety Requests */}
                {filterTasks(safetyRequests).length > 0 && (
                  <div className="border-b">
                    <div className="bg-yellow-50 px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
                      <h3 className="font-semibold text-yellow-800 text-sm">High Risk Safety Requests</h3>
                      <span className="bg-yellow-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                        {filterTasks(safetyRequests).length}
                      </span>
                    </div>
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterTasks(safetyRequests).map((task, idx) => renderTaskRow(task, idx, "SAFETY"))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Pending Approval */}
                {filterTasks(pendingApprovalTasks).length > 0 && (
                  <div className="border-b">
                    <div className="bg-green-50 px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
                      <h3 className="font-semibold text-green-700 text-sm">Pending Approval</h3>
                      <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                        {filterTasks(pendingApprovalTasks).length}
                      </span>
                    </div>
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterTasks(pendingApprovalTasks).map((task, idx) => renderTaskRow(task, idx, "APPROVAL"))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Overdue */}
                {filterTasks(overdueTasks).length > 0 && (
                  <div className="border-b">
                    <div className="bg-red-50 px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
                      <h3 className="font-semibold text-red-700 text-sm">Overdue Tasks</h3>
                      <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                        {filterTasks(overdueTasks).length}
                      </span>
                    </div>
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterTasks(overdueTasks).map((task, idx) => renderTaskRow(task, idx, "OVERDUE"))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* In Progress */}
                {filterTasks(inProgressTasks).length > 0 && (
                  <div>
                    <div className="bg-[#e6f3ee] px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
                      <h3 className="font-semibold text-teal-800 text-sm">In Progress</h3>
                      <span className="bg-teal-700 text-white px-2 py-0.5 rounded text-xs font-medium">
                        {filterTasks(inProgressTasks).length}
                      </span>
                    </div>
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterTasks(inProgressTasks).map((task, idx) => renderTaskRow(task, idx, "PROGRESS"))}
                      </tbody>
                    </table>
                  </div>
                )}

                {filterTasks(safetyRequests).length === 0 &&
                  filterTasks(pendingApprovalTasks).length === 0 &&
                  filterTasks(overdueTasks).length === 0 &&
                  filterTasks(inProgressTasks).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                      <svg className="w-16 h-16 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500">No tasks found</p>
                    </div>
                  )}
              </div>
            </div>

            <div className="col-span-5 bg-white rounded-lg border overflow-hidden">
              {renderDetailPanel()}
            </div>
          </div>
        )}
      </div>

      {/* Nearby Stores Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-7xl h-[85vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">Nearby Vendors</h2>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex">
              <div className="w-1/3 border-r bg-gray-50 flex flex-col">
                <div className="p-4 border-b bg-white">
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    value={storeSearchQuery}
                    onChange={(e) => setStoreSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-sm"
                  />
                </div>

                <div className="flex-1">
                  <MapContainer center={[28.5355, 77.391]} zoom={12} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; OpenStreetMap contributors'
                    />
                    {filteredStores.map((store) => (
                      <Marker key={store.id} position={[store.lat, store.lng]}>
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-medium text-sm mb-1">{store.name}</h3>
                            <p className="text-xs text-gray-600 mb-1">{store.category}</p>
                            <p className="text-xs text-gray-600 mb-2">{store.address}</p>
                            <div className="flex gap-1">
                              <button
                                onClick={() => callStore(store.phone)}
                                className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                              >
                                Call
                              </button>
                              <button
                                onClick={() => getDirections(store.lat, store.lng)}
                                className="bg-teal-700 text-white px-2 py-1 rounded text-xs"
                              >
                                Navigate
                              </button>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>

              <div className="flex-1 bg-white flex flex-col">
                <div className="p-4 border-b bg-gray-50">
                  <p className="text-sm text-gray-600">Showing {filteredStores.length} nearby vendors</p>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {filteredStores.map((store) => (
                    <div key={store.id} className="p-6 border-b hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{store.name}</h3>
                      <p className="text-sm text-teal-700 font-medium mb-3">{store.category}</p>

                      <div className="text-sm text-gray-700 mb-2">
                        <b>Contact:</b> {store.contact}
                      </div>
                      <div className="text-sm text-gray-700 mb-2">
                        <b>Phone:</b> {store.phone}
                      </div>
                      <div className="text-sm text-gray-700 mb-2">
                        <b>Email:</b> {store.email}
                      </div>
                      <div className="text-sm text-gray-700">
                        <b>Address:</b> {store.address} <span className="text-teal-700 font-medium">({store.distance})</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t bg-gray-50 text-center text-xs text-gray-500">
                  Demo vendor list (hackathon mode)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
