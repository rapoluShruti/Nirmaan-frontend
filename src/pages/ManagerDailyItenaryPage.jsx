// import { useEffect, useState } from "react";
// import api from "../api/axiosConfig";

// export default function ManagerDailyItineraryPage() {
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showMapModal, setShowMapModal] = useState(false);
//   const [nearbyStores, setNearbyStores] = useState([]);

//   // Hardcoded AI Risk for OVERDUE tasks
//   const OVERDUE_AI_RISK = {
//     reason: "Material delay due to weather conditions",
//     suggestion: "Order from local store",
//     actionType: "MAP_VIEW"
//   };

//   // Mock nearby stores data (no API needed)
//   const mockNearbyStores = [
//     {
//       id: 1,
//       name: "Shree Cement & Building Materials",
//       address: "Plot 45, Sector 12, Industrial Area, New Delhi",
//       phone: "+91 98765 43210",
//       distance: "2.3 km",
//       rating: 4.5,
//       lat: 28.5355,
//       lng: 77.3910
//     },
//     {
//       id: 2,
//       name: "Rajesh Hardware & Suppliers",
//       address: "Shop 23, Main Market Road, Connaught Place",
//       phone: "+91 98765 43211",
//       distance: "3.1 km",
//       rating: 4.2,
//       lat: 28.5365,
//       lng: 77.3920
//     },
//     {
//       id: 3,
//       name: "Modern Construction Store",
//       address: "Building 7, Commercial Complex, Nehru Place",
//       phone: "+91 98765 43212",
//       distance: "4.5 km",
//       rating: 4.7,
//       lat: 28.5375,
//       lng: 77.3930
//     },
//     {
//       id: 4,
//       name: "City Building Materials Hub",
//       address: "Near Railway Station, Main Road, Karol Bagh",
//       phone: "+91 98765 43213",
//       distance: "5.2 km",
//       rating: 4.3,
//       lat: 28.5385,
//       lng: 77.3940
//     }
//   ];

//   const fetchTasks = async () => {
//     try {
//       const res = await api.get("/tasks/manager");
//       setTasks(res.data.tasks || []);
//     } catch (err) {
//       console.error("Manager task fetch failed", err);
//       setTasks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleApprove = async (taskId) => {
//     try {
//       await api.post(`/tasks/${taskId}/approve`);
//       setSelectedTask(null);
//       fetchTasks();
//     } catch (err) {
//       console.error("Approval failed", err);
//       alert("Failed to approve task");
//     }
//   };

//   const handleReject = async (taskId) => {
//     try {
//       await api.post(`/tasks/${taskId}/reject`);
//       setSelectedTask(null);
//       fetchTasks();
//     } catch (err) {
//       console.error("Reject failed", err);
//       alert("Failed to reject task");
//     }
//   };

//   const openMapView = () => {
//     setNearbyStores(mockNearbyStores);
//     setShowMapModal(true);
//   };

//   // Open Google Maps in browser (no API needed)
//   const openGoogleMaps = (lat, lng, name) => {
//     const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
//     window.open(url, '_blank');
//   };

//   // Open navigation in Google Maps
//   const getDirections = (lat, lng) => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
//     window.open(url, '_blank');
//   };

//   const callStore = (phone) => {
//     window.location.href = `tel:${phone}`;
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-lg text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   // Task categorization
//   const pendingApprovalTasks = tasks.filter(
//     (t) => t.status === "COMPLETED" && t.approved === false && t.afterPhotoUrl
//   );

//   const overdueTasks = tasks.filter(
//     (t) => t.status === "CREATED" && t.endDate && new Date(t.endDate) < today
//   );

//   const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");

//   // Filter tasks based on search
//   const filterTasks = (taskList) => {
//     if (!searchQuery) return taskList;
//     return taskList.filter(
//       (t) =>
//         t.taskId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         t.assignedSupervisor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   };

//   const getStatusBadge = (task, type) => {
//     if (type === "approval") {
//       return (
//         <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
//           Pending Approval
//         </span>
//       );
//     } else if (type === "overdue") {
//       return (
//         <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
//           <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
//           Overdue
//         </span>
//       );
//     } else {
//       return (
//         <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold flex items-center gap-1">
//           <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
//           In Progress
//         </span>
//       );
//     }
//   };

//   const renderTaskRow = (task, index, type) => {
//     const isSelected = selectedTask?._id === task._id;
//     const endDate = task.endDate ? new Date(task.endDate) : null;
//     const formattedEndDate = endDate
//       ? endDate.toLocaleDateString("en-IN", {
//           day: "2-digit",
//           month: "short",
//         })
//       : "N/A";

//     return (
//       <tr
//         key={task._id}
//         onClick={() => setSelectedTask(task)}
//         className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${
//           isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
//         }`}
//       >
//         <td className="px-4 py-4 text-sm text-gray-600">{index + 1}</td>
//         <td className="px-4 py-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
//               {task.taskId?.charAt(0) || "T"}
//             </div>
//             <div>
//               <div className="font-semibold text-gray-800">{task.taskId}</div>
//               <div className="text-xs text-gray-500">
//                 {task.assignedSupervisor?.name || "Unassigned"}
//               </div>
//             </div>
//           </div>
//         </td>
//         <td className="px-4 py-4">
//           <div className="text-sm text-gray-700">{task.description}</div>
//           <div className="text-xs text-gray-500 mt-1">
//             {task.projectName || "N/A"}
//           </div>
//         </td>
//         <td className="px-4 py-4">{getStatusBadge(task, type)}</td>
//         <td className="px-4 py-4">
//           <div className="text-sm font-semibold text-gray-700">
//             {type === "inprogress" || type === "overdue" ? formattedEndDate : "-"}
//           </div>
//         </td>
//         <td className="px-4 py-4">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedTask(task);
//             }}
//             className={`p-2 rounded-lg transition-colors ${
//               isSelected
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </td>
//       </tr>
//     );
//   };

//   const renderDetailPanel = () => {
//     if (!selectedTask) {
//       return (
//         <div className="h-full flex items-center justify-center text-gray-400">
//           <div className="text-center">
//             <div className="text-6xl mb-4">📋</div>
//             <div className="text-lg">Select a task to view details</div>
//           </div>
//         </div>
//       );
//     }

//     const isPendingApproval =
//       selectedTask.status === "COMPLETED" &&
//       selectedTask.approved === false &&
//       selectedTask.afterPhotoUrl;

//     const isInProgress = selectedTask.status === "IN_PROGRESS";
    
//     const isOverdue = 
//       selectedTask.status === "CREATED" &&
//       selectedTask.endDate &&
//       new Date(selectedTask.endDate) < today;

//     return (
//       <div className="h-full overflow-y-auto bg-white">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-2xl font-bold">{selectedTask.taskId}</h2>
//             <button
//               onClick={() => setSelectedTask(null)}
//               className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           <p className="text-orange-100">{selectedTask.description}</p>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Task Info Card */}
//           <div className="bg-gray-50 rounded-xl p-4 space-y-3">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-600">Status</span>
//               <span className="font-semibold text-gray-800">
//                 {selectedTask.status}
//               </span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-600">Project</span>
//               <span className="font-semibold text-gray-800">
//                 {selectedTask.projectName || "N/A"}
//               </span>
//             </div>
//             {selectedTask.location && (
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600">Location</span>
//                 <span className="font-semibold text-gray-800">
//                   {selectedTask.location}
//                 </span>
//               </div>
//             )}
//             {selectedTask.endDate && (
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600">End Date</span>
//                 <span className="font-semibold text-gray-800">
//                   {new Date(selectedTask.endDate).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </span>
//               </div>
//             )}
//             {selectedTask.assignedSupervisor && (
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600">Supervisor</span>
//                 <span className="font-semibold text-gray-800">
//                   {selectedTask.assignedSupervisor.name}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* AI Risk Alert - For OVERDUE Tasks */}
//           {isOverdue && (
//             <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-5">
//               <div className="flex items-start gap-3">
//                 <div className="flex-shrink-0">
//                   <svg
//                     className="w-7 h-7 text-red-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                     />
//                   </svg>
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-bold text-red-800 mb-1 text-lg">
//                     🤖 AI Risk Assessment
//                   </h3>
//                   <p className="text-sm text-red-700 mb-1 font-semibold">
//                     Why is this task overdue?
//                   </p>
//                   <p className="text-sm text-red-600 mb-4 bg-red-100 p-3 rounded-lg">
//                     {OVERDUE_AI_RISK.reason}
//                   </p>
//                   <div className="bg-white p-3 rounded-lg border border-red-200 mb-3">
//                     <p className="text-xs text-gray-600 mb-2 font-semibold">💡 AI Suggestion:</p>
//                     <p className="text-sm text-gray-700 font-medium">{OVERDUE_AI_RISK.suggestion}</p>
//                   </div>
//                   <button
//                     onClick={openMapView}
//                     className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                     Find Nearby Stores & Order Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Voice Note */}
//           {selectedTask.voiceNoteUrl && (
//             <div>
//               <h3 className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
//                   />
//                 </svg>
//                 Voice Note
//               </h3>
//               <audio
//                 controls
//                 src={`http://localhost:2026${selectedTask.voiceNoteUrl}`}
//                 className="w-full"
//               />
//             </div>
//           )}

//           {/* Before Photo - For In Progress and Pending Approval */}
//           {(isInProgress || isPendingApproval) &&
//             selectedTask.beforePhotoUrl && (
//               <div>
//                 <h3 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   Before Photo
//                 </h3>
//                 <img
//                   src={`http://localhost:2026${selectedTask.beforePhotoUrl}`}
//                   alt="Before"
//                   className="w-full rounded-xl border-2 border-gray-200 shadow-sm"
//                 />
//               </div>
//             )}

//           {/* After Photo - For Pending Approval */}
//           {isPendingApproval && selectedTask.afterPhotoUrl && (
//             <div>
//               <h3 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//                 After Photo
//               </h3>
//               <img
//                 src={`http://localhost:2026${selectedTask.afterPhotoUrl}`}
//                 alt="After"
//                 className="w-full rounded-xl border-2 border-gray-200 shadow-sm"
//               />
//             </div>
//           )}

//           {/* Approval Actions */}
//           {isPendingApproval && (
//             <div className="flex gap-3 pt-4">
//               <button
//                 onClick={() => handleApprove(selectedTask._id)}
//                 className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//                 Approve
//               </button>
//               <button
//                 onClick={() => handleReject(selectedTask._id)}
//                 className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//                 Reject
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gray-50">
//       {/* HEADER */}
//       <header className="bg-white border-b shadow-sm">
//         <div className="px-6 py-4 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Daily Itinerary
//             </h1>
//             <p className="text-sm text-gray-600 mt-1">
//               {new Date().toLocaleDateString("en-IN", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search task or supervisor"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-80"
//               />
//               <svg
//                 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex-1 overflow-hidden">
//         <div className="h-full grid grid-cols-12 gap-6 p-6">
//           {/* MAIN CONTENT - Task Table */}
//           <div className="col-span-8 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
//             {/* Pending Approval Section */}
//             <div className="border-b">
//               <div className="bg-green-50 px-6 py-3 flex items-center justify-between">
//                 <h2 className="font-bold text-green-700 flex items-center gap-2">
//                   <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                   Pending Approval
//                 </h2>
//                 <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                   {filterTasks(pendingApprovalTasks).length}
//                 </span>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         #
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Task & Supervisor
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Description
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         End Date
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filterTasks(pendingApprovalTasks).length > 0 ? (
//                       filterTasks(pendingApprovalTasks).map((task, idx) =>
//                         renderTaskRow(task, idx, "approval")
//                       )
//                     ) : (
//                       <tr>
//                         <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
//                           No pending approval tasks
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Overdue Section */}
//             <div className="border-b">
//               <div className="bg-red-50 px-6 py-3 flex items-center justify-between">
//                 <h2 className="font-bold text-red-700 flex items-center gap-2">
//                   <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
//                   Overdue Tasks
//                 </h2>
//                 <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                   {filterTasks(overdueTasks).length}
//                 </span>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         #
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Task & Supervisor
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Description
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         End Date
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filterTasks(overdueTasks).length > 0 ? (
//                       filterTasks(overdueTasks).map((task, idx) =>
//                         renderTaskRow(task, idx, "overdue")
//                       )
//                     ) : (
//                       <tr>
//                         <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
//                           No overdue tasks
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* In Progress Section */}
//             <div className="flex-1 overflow-hidden flex flex-col">
//               <div className="bg-orange-50 px-6 py-3 flex items-center justify-between">
//                 <h2 className="font-bold text-orange-700 flex items-center gap-2">
//                   <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
//                   In Progress
//                 </h2>
//                 <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                   {filterTasks(inProgressTasks).length}
//                 </span>
//               </div>
//               <div className="flex-1 overflow-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b sticky top-0">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         #
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Task & Supervisor
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Description
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         End Date
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filterTasks(inProgressTasks).length > 0 ? (
//                       filterTasks(inProgressTasks).map((task, idx) =>
//                         renderTaskRow(task, idx, "inprogress")
//                       )
//                     ) : (
//                       <tr>
//                         <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
//                           No tasks in progress
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDEBAR - Task Details */}
//           <div className="col-span-4 bg-white rounded-xl shadow-sm overflow-hidden">
//             {renderDetailPanel()}
//           </div>
//         </div>
//       </div>

//       {/* Map Modal - No API Required */}
//       {showMapModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold">Nearby Material Stores</h2>
//                 <p className="text-orange-100 text-sm mt-1">
//                   Find local suppliers for immediate material needs
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowMapModal(false)}
//                 className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Store List */}
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="grid gap-4">
//                 {nearbyStores.map((store) => (
//                   <div
//                     key={store.id}
//                     className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow bg-white"
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex-1">
//                         <h3 className="font-bold text-lg text-gray-800 mb-1">
//                           {store.name}
//                         </h3>
//                         <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
//                           <svg
//                             className="w-4 h-4 text-yellow-500"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <span className="font-semibold">{store.rating}</span>
//                           <span className="text-gray-400">•</span>
//                           <span>{store.distance}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
//                         <svg
//                           className="w-3 h-3"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                         Open
//                       </div>
//                     </div>

//                     <div className="space-y-2 mb-4">
//                       <div className="flex items-start gap-2 text-sm text-gray-600">
//                         <svg
//                           className="w-4 h-4 mt-0.5 flex-shrink-0"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                         </svg>
//                         <span>{store.address}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                           />
//                         </svg>
//                         <span className="font-semibold">{store.phone}</span>
//                       </div>
//                     </div>

//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => callStore(store.phone)}
//                         className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
//                       >
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                           />
//                         </svg>
//                         Call Now
//                       </button>
//                       <button
//                         onClick={() => getDirections(store.lat, store.lng)}
//                         className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
//                       >
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
//                           />
//                         </svg>
//                         Directions
//                       </button>
//                       <button
//                         onClick={() => openGoogleMaps(store.lat, store.lng, store.name)}
//                         className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
//                       >
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
//                           />
//                         </svg>
//                         View Map
//                       </button>
//                     </div>
//                   </div>
//                 ))}
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

export default function ManagerDailyItineraryPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMapModal, setShowMapModal] = useState(false);
  const [nearbyStores, setNearbyStores] = useState([]);

  const OVERDUE_AI_RISK = {
    reason: "Material delay due to weather conditions",
    suggestion: "Order from local store",
    actionType: "MAP_VIEW"
  };

  const mockNearbyStores = [
    {
      id: 1,
      name: "Shree Cement & Building Materials",
      address: "Plot 45, Sector 12, Industrial Area, New Delhi",
      phone: "+91 98765 43210",
      distance: "2.3 km",
      rating: 4.5,
      lat: 28.5355,
      lng: 77.3910
    },
    {
      id: 2,
      name: "Rajesh Hardware & Suppliers",
      address: "Shop 23, Main Market Road, Connaught Place",
      phone: "+91 98765 43211",
      distance: "3.1 km",
      rating: 4.2,
      lat: 28.5365,
      lng: 77.3920
    },
    {
      id: 3,
      name: "Modern Construction Store",
      address: "Building 7, Commercial Complex, Nehru Place",
      phone: "+91 98765 43212",
      distance: "4.5 km",
      rating: 4.7,
      lat: 28.5375,
      lng: 77.3930
    },
    {
      id: 4,
      name: "City Building Materials Hub",
      address: "Near Railway Station, Main Road, Karol Bagh",
      phone: "+91 98765 43213",
      distance: "5.2 km",
      rating: 4.3,
      lat: 28.5385,
      lng: 77.3940
    }
  ];

  const fetchProjectsAndTasks = async () => {
    try {
      const projectsRes = await api.get("/projects");
      const fetchedProjects = projectsRes.data || [];
      setProjects(fetchedProjects);

      const tasksRes = await api.get("/tasks/manager");
      const fetchedTasks = tasksRes.data.tasks || [];
      setTasks(fetchedTasks);

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

  const openGoogleMaps = (lat, lng, name) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const getDirections = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const callStore = (phone) => {
    window.location.href = `tel:${phone}`;
  };

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

  // Filter by selected project
  const projectFilteredTasks = selectedProject 
    ? tasks.filter(t => t.projectId === selectedProject)
    : tasks;

  const pendingApprovalTasks = projectFilteredTasks.filter(
    (t) => t.status === "COMPLETED" && t.approved === false && t.afterPhotoUrl
  );

  const overdueTasks = projectFilteredTasks.filter(
    (t) => t.status === "CREATED" && t.endDate && new Date(t.endDate) < today
  );

  const inProgressTasks = projectFilteredTasks.filter((t) => t.status === "IN_PROGRESS");

  const filterTasks = (taskList) => {
    if (!searchQuery) return taskList;
    return taskList.filter(
      (t) =>
        t.taskId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.assignedSupervisor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderTaskRow = (task, index, type) => {
    const isSelected = selectedTask?._id === task._id;
    const endDate = task.endDate ? new Date(task.endDate) : null;
    const formattedEndDate = endDate
      ? endDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
      : "-";

    return (
      <tr
        key={task._id}
        onClick={() => setSelectedTask(task)}
        className={`cursor-pointer transition-colors border-b ${
          isSelected ? "bg-orange-50" : "hover:bg-gray-50"
        }`}
      >
        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center text-orange-600 font-semibold text-xs">
              {task.taskId?.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{task.taskId}</div>
              <div className="text-xs text-gray-500">{task.assignedSupervisor?.name}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="text-sm text-gray-700">{task.description}</div>
          <div className="text-xs text-gray-500 mt-1">
            {projects.find(p => p.projectId === task.projectId)?.name || task.projectId}
          </div>
        </td>
        <td className="px-4 py-3">
          {type === "approval" && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
              Approval
            </span>
          )}
          {type === "overdue" && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
              Overdue
            </span>
          )}
          {type === "progress" && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-700">
              In Progress
            </span>
          )}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{formattedEndDate}</td>
      </tr>
    );
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

    const isPendingApproval = selectedTask.status === "COMPLETED" && selectedTask.approved === false && selectedTask.afterPhotoUrl;
    const isInProgress = selectedTask.status === "IN_PROGRESS";
    const isOverdue = selectedTask.status === "CREATED" && selectedTask.endDate && new Date(selectedTask.endDate) < today;
    const taskProject = projects.find(p => p.projectId === selectedTask.projectId);

    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedTask.taskId}</h2>
              <p className="text-sm text-gray-600 mt-1">{taskProject?.name}</p>
            </div>
            <button
              onClick={() => setSelectedTask(null)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-700">{selectedTask.description}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500 mb-1">Status</div>
              <div className="font-medium text-gray-900">{selectedTask.status}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Supervisor</div>
              <div className="font-medium text-gray-900">{selectedTask.assignedSupervisor?.name}</div>
            </div>
            {selectedTask.endDate && (
              <div>
                <div className="text-gray-500 mb-1">Due Date</div>
                <div className="font-medium text-gray-900">
                  {new Date(selectedTask.endDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            )}
            {taskProject?.location && (
              <div>
                <div className="text-gray-500 mb-1">Location</div>
                <div className="font-medium text-gray-900 text-sm">
                  {taskProject.location.city}, {taskProject.location.state}
                </div>
              </div>
            )}
          </div>

          {/* AI Risk */}
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
                    onClick={openMapView}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Find Nearby Stores
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Voice Note */}
          {selectedTask.voiceNoteUrl && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Voice Note</div>
              <audio controls 
              // src={`http://localhost:2026${selectedTask.voiceNoteUrl}`}
              src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.voiceNoteUrl}`}

              className="w-full" />
            </div>
          )}

          {/* Photos */}
          {(isInProgress || isPendingApproval) && selectedTask.beforePhotoUrl && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Before Photo</div>
              <img
                // src={`http://localhost:2026${selectedTask.beforePhotoUrl}`}
                src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.beforePhotoUrl}`}
                alt="Before"
                className="w-full rounded border"
              />
            </div>
          )}

          {isPendingApproval && selectedTask.afterPhotoUrl && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">After Photo</div>
              <img
                // src={`http://localhost:2026${selectedTask.afterPhotoUrl}`}
                src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.afterPhotoUrl}`}
                alt="After"
                className="w-full rounded border"
              />
            </div>
          )}
        </div>

        {/* Actions */}
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
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
              />
              <select
                value={selectedProject}
                onChange={(e) => {
                  setSelectedProject(e.target.value);
                  setSelectedTask(null);
                }}
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold">{projectFilteredTasks.length}</span>
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
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span className="text-gray-600">In Progress:</span>
                <span className="font-semibold text-orange-600">{inProgressTasks.length}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
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
                      {tasks.filter(t => t.projectId === project.projectId).length} tasks
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
            {/* Task List with Sections */}
            <div className="col-span-7 bg-white rounded-lg border overflow-hidden flex flex-col">
              <div className="overflow-auto flex-1">
                {/* Pending Approval Section */}
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
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterTasks(pendingApprovalTasks).map((task, idx) => renderTaskRow(task, idx, "approval"))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Overdue Section */}
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
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterTasks(overdueTasks).map((task, idx) => renderTaskRow(task, idx, "overdue"))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* In Progress Section */}
                {filterTasks(inProgressTasks).length > 0 && (
                  <div>
                    <div className="bg-orange-50 px-4 py-2 border-b flex items-center justify-between sticky top-0 z-10">
                      <h3 className="font-semibold text-orange-700 text-sm">In Progress</h3>
                      <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                        {filterTasks(inProgressTasks).length}
                      </span>
                    </div>
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Task</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Due</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterTasks(inProgressTasks).map((task, idx) => renderTaskRow(task, idx, "progress"))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Empty State */}
                {filterTasks(pendingApprovalTasks).length === 0 && 
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

            {/* Task Details */}
            <div className="col-span-5 bg-white rounded-lg border overflow-hidden">
              {renderDetailPanel()}
            </div>
          </div>
        )}
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Nearby Stores</h2>
                <p className="text-sm text-gray-600 mt-1">Find local material suppliers</p>
              </div>
              <button onClick={() => setShowMapModal(false)} className="p-2 hover:bg-gray-100 rounded transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)] space-y-4">
              {nearbyStores.map((store) => (
                <div key={store.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{store.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <span>⭐ {store.rating}</span>
                        <span>•</span>
                        <span>{store.distance}</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Open</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{store.address}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => callStore(store.phone)} className="bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-medium transition-colors">
                      Call
                    </button>
                    <button onClick={() => getDirections(store.lat, store.lng)} className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition-colors">
                      Navigate
                    </button>
                    <button onClick={() => openGoogleMaps(store.lat, store.lng, store.name)} className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded text-sm font-medium transition-colors">
                      Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}