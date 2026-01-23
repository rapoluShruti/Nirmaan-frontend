// import { useEffect, useState } from "react";
// import api from "../api/axiosConfig";
// import LayoutTaskMap from "../components/LayoutTaskMap";
// import ManagerTaskDetailsPanel from "./ManagerTaskDetailsPanel";

// export default function ManagerProjectLayoutPage() {
//   const [tasks, setTasks] = useState([]);
//   const [projects, setProjects] = useState([]);

//   const [selectedProjectId, setSelectedProjectId] = useState("");
//   const [selectedLayout, setSelectedLayout] = useState(null);
//   const [selectedTask, setSelectedTask] = useState(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get("/tasks/manager").then((res) => {
//       const allTasks = res.data.tasks || [];
//       setTasks(allTasks);

//       const projMap = {};
//       allTasks.forEach((t) => {
//         if (!projMap[t.projectId]) {
//           projMap[t.projectId] = {
//             projectId: t.projectId,
//             projectName: t.projectName || t.projectId,
//           };
//         }
//       });

//       setProjects(Object.values(projMap));
//       setLoading(false);
//     });
//   }, []);

//   const projectTasks = tasks.filter(
//     (t) => t.projectId === selectedProjectId
//   );

//   const layouts = [...new Set(projectTasks.map((t) => t.layoutImage))];

//   useEffect(() => {
//     if (layouts.length) {
//       setSelectedLayout(layouts[0]);
//       setSelectedTask(null);
//     }
//   }, [selectedProjectId]);

//   if (loading) return <div className="p-6">Loading…</div>;

//   return (
//     <div className="h-screen flex flex-col bg-slate-50">

//       {/* HEADER */}
//       <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
//         <h1 className="font-bold">Project Layout View</h1>

//         <select
//           className="border rounded px-3 py-2"
//           value={selectedProjectId}
//           onChange={(e) => {
//             setSelectedProjectId(e.target.value);
//             setSelectedLayout(null);
//             setSelectedTask(null);
//           }}
//         >
//           <option value="">Select Project</option>
//           {projects.map((p) => (
//             <option key={p.projectId} value={p.projectId}>
//               {p.projectName}
//             </option>
//           ))}
//         </select>
//       </header>

//       <div className="flex-1 p-6 flex gap-6">

//         {/* LAYOUT LIST */}
//         <aside className="w-72 bg-white border rounded-xl p-4 space-y-3">
//           <div className="font-semibold text-sm">Layouts</div>
//           {layouts.map((layout) => (
//             <button
//               key={layout}
//               onClick={() => {
//                 setSelectedLayout(layout);
//                 setSelectedTask(null);
//               }}
//               className={`border rounded-lg overflow-hidden ${
//                 selectedLayout === layout ? "ring-2 ring-orange-400" : ""
//               }`}
//             >
//               <img
//                 src={layout}
//                 className="w-full h-24 object-cover"
//                 alt="layout"
//               />
//             </button>
//           ))}
//         </aside>

//         {/* MAP */}
//         <main className="flex-1 bg-white border rounded-xl p-2">
//           {selectedLayout && (
//             <LayoutTaskMap
//               layoutImage={selectedLayout}
//               tasks={projectTasks.filter(
//                 (t) => t.layoutImage === selectedLayout
//               )}
//               selectedTask={selectedTask}
//               onSelectTask={(task) => {
//                 setSelectedTask(task);
//                 setSelectedLayout(task.layoutImage); // 🔴 SOURCE OF TRUTH
//               }}
//             />
//           )}
//         </main>

//         {/* DETAILS */}
//         <aside className="w-[420px] bg-white border rounded-xl overflow-hidden">
//           <ManagerTaskDetailsPanel
//             task={selectedTask}
//             layoutImage={selectedLayout}   // ✅ PASS IT HERE
//           />
//         </aside>
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import api from "../api/axiosConfig";
// import LayoutTaskMap from "../components/LayoutTaskMap";
// import ManagerTaskDetailsPanel from "./ManagerTaskDetailsPanel";

// export default function ManagerProjectLayoutPage() {
//   const [tasks, setTasks] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [selectedProjectId, setSelectedProjectId] = useState("");
//   const [selectedLayout, setSelectedLayout] = useState(null);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get("/tasks/manager").then((res) => {
//       const allTasks = res.data.tasks || [];
//       setTasks(allTasks);

//       const projMap = {};
//       allTasks.forEach((t) => {
//         if (!projMap[t.projectId]) {
//           projMap[t.projectId] = {
//             projectId: t.projectId,
//             projectName: t.projectName || t.projectId,
//           };
//         }
//       });

//       setProjects(Object.values(projMap));
//       setLoading(false);
//     });
//   }, []);

//   const projectTasks = tasks.filter((t) => t.projectId === selectedProjectId);
//   const layouts = [...new Set(projectTasks.map((t) => t.layoutImage))];

//   useEffect(() => {
//     if (layouts.length) {
//       setSelectedLayout(layouts[0]);
//       setSelectedTask(null);
//     }
//   }, [selectedProjectId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <div className="text-lg text-gray-600">Loading...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col">
//       {/* HEADER - Fixed height */}
//       <header className="bg-white border-b px-6 py-4 flex-shrink-0">
//         <div className="flex items-center justify-between">
//           <h1 className="text-xl font-bold text-gray-900">Project Layout View</h1>
//           <select
//             className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[200px]"
//             value={selectedProjectId}
//             onChange={(e) => {
//               setSelectedProjectId(e.target.value);
//               setSelectedLayout(null);
//               setSelectedTask(null);
//             }}
//           >
//             <option value="">Select Project</option>
//             {projects.map((p) => (
//               <option key={p.projectId} value={p.projectId}>
//                 {p.projectName}
//               </option>
//             ))}
//           </select>
//         </div>
//       </header>

//       {/* MAIN CONTENT - Flexible height */}
//       <div className="flex-1 p-6">
//         {!selectedProjectId ? (
//           // Empty state when no project selected
//           <div className="h-full min-h-[500px] flex items-center justify-center">
//             <div className="text-center max-w-md">
//               <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//               <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Project</h2>
//               <p className="text-gray-600 mb-6">Choose a project from the dropdown to view layouts</p>
//               <div className="space-y-2">
//                 {projects.slice(0, 3).map((project) => (
//                   <button
//                     key={project.projectId}
//                     onClick={() => setSelectedProjectId(project.projectId)}
//                     className="w-full px-4 py-3 bg-white hover:bg-gray-50 border rounded-lg text-left transition-colors"
//                   >
//                     <div className="font-medium text-gray-900">{project.projectName}</div>
//                     <div className="text-sm text-gray-500">
//                       {tasks.filter(t => t.projectId === project.projectId).length} tasks
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex gap-6 h-full min-h-[600px]">
//             {/* LAYOUT LIST - Fixed width, scrollable */}
//             <aside className="w-72 bg-white border rounded-xl flex flex-col flex-shrink-0">
//               <div className="p-4 border-b flex-shrink-0">
//                 <h3 className="font-semibold text-gray-900">Layouts</h3>
//                 <p className="text-sm text-gray-500 mt-1">{layouts.length} available</p>
//               </div>
              
//               <div className="flex-1 overflow-y-auto p-4">
//                 {layouts.length === 0 ? (
//                   <div className="text-center py-8">
//                     <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <p className="text-gray-500 text-sm">No layouts found</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-3">
//                     {layouts.map((layout, index) => (
//                       <button
//                         key={layout}
//                         onClick={() => {
//                           setSelectedLayout(layout);
//                           setSelectedTask(null);
//                         }}
//                         className={`w-full border rounded-lg overflow-hidden transition-all hover:shadow-md ${
//                           selectedLayout === layout 
//                             ? "ring-2 ring-orange-400 border-orange-400" 
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                       >
//                         <img
//                           src={layout}
//                           className="w-full h-24 object-cover"
//                           alt={`Layout ${index + 1}`}
//                           onError={(e) => {
//                             e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDE3SDE2TTggMTdIMTJNOCAxM0gxNk04IDlIMTYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
//                           }}
//                         />
//                         <div className="p-2 text-left">
//                           <p className="text-xs text-gray-600">Layout {index + 1}</p>
//                           <p className="text-xs text-gray-500">
//                             {projectTasks.filter(t => t.layoutImage === layout).length} tasks
//                           </p>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </aside>

//             {/* MAP - Takes remaining width, flexible height */}
//             <main className="flex-1 bg-white border rounded-xl flex flex-col min-h-0">
//               {selectedLayout ? (
//                 <div className="flex-1 p-4 min-h-0">
//                   <LayoutTaskMap
//                     layoutImage={selectedLayout}
//                     tasks={projectTasks.filter((t) => t.layoutImage === selectedLayout)}
//                     selectedTask={selectedTask}
//                     onSelectTask={(task) => {
//                       setSelectedTask(task);
//                       setSelectedLayout(task.layoutImage);
//                     }}
//                   />
//                 </div>
//               ) : (
//                 <div className="flex-1 flex items-center justify-center">
//                   <div className="text-center">
//                     <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <p className="text-gray-500">Select a layout to view tasks</p>
//                   </div>
//                 </div>
//               )}
//             </main>

//             {/* DETAILS PANEL - Fixed width, flexible height */}
//             <aside className="w-[420px] bg-white border rounded-xl flex flex-col flex-shrink-0 min-h-0">
//               <ManagerTaskDetailsPanel
//                 task={selectedTask}
//                 layoutImage={selectedLayout}
//               />
//             </aside>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useMemo } from "react";
import api from "../api/axiosConfig";
import LayoutTaskMap from "../components/LayoutTaskMap";
import ManagerTaskDetailsPanel from "./ManagerTaskDetailsPanel";

export default function ManagerProjectLayoutPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("layout"); // "layout" or "table"

  useEffect(() => {
    api.get("/tasks/manager").then((res) => {
      const allTasks = res.data.tasks || [];
      setTasks(allTasks);

      const projMap = {};
      allTasks.forEach((t) => {
        if (!projMap[t.projectId]) {
          projMap[t.projectId] = {
            projectId: t.projectId,
            projectName: t.projectName || t.projectId,
          };
        }
      });

      setProjects(Object.values(projMap));
      setLoading(false);
    });
  }, []);

  const projectTasks = tasks.filter((t) => t.projectId === selectedProjectId);
  const layouts = [...new Set(projectTasks.map((t) => t.layoutImage))];

  /* ================= TASK STATS ================= */
  const taskStats = useMemo(() => {
    const stats = {
      total: projectTasks.length,
      completed: 0,
      inProgress: 0,
      pending: 0,
      created: 0
    };

    projectTasks.forEach(task => {
      const status = task.status?.toLowerCase().replace(/[_\s]/g, '');
      switch (status) {
        case 'completed':
          stats.completed++;
          break;
        case 'inprogress':
          stats.inProgress++;
          break;
        case 'pending':
          stats.pending++;
          break;
        case 'created':
          stats.created++;
          break;
      }
    });

    return stats;
  }, [projectTasks]);

  /* ================= HELPER FUNCTIONS ================= */
  const getStatusConfig = (status) => {
    const normalizedStatus = status?.toLowerCase().replace(/[_\s]/g, '');
    switch (normalizedStatus) {
      case "completed":
        return {
          color: "bg-emerald-100 text-emerald-700 border-emerald-200",
          icon: "✓",
          display: "Completed"
        };
      case "inprogress":
        return {
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: "⟳",
          display: "In Progress"
        };
      case "pending":
        return {
          color: "bg-amber-100 text-amber-700 border-amber-200",
          icon: "⏳",
          display: "Pending"
        };
      case "created":
        return {
          color: "bg-slate-100 text-slate-700 border-slate-200",
          icon: "○",
          display: "Created"
        };
      default:
        return {
          color: "bg-slate-100 text-slate-700 border-slate-200",
          icon: "○",
          display: status || "Unknown"
        };
    }
  };

  useEffect(() => {
    if (layouts.length) {
      setSelectedLayout(layouts[0]);
      setSelectedTask(null);
    }
  }, [selectedProjectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading projects...</p>
        </div>
      </div>
    );
  }

  const selectedProject = projects.find(p => p.projectId === selectedProjectId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      
      {/* MODERN HEADER */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-4 md:px-8 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <div className="flex items-center space-x-4 py-4">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Manager Dashboard
            </p>
            <h1 className="text-xl font-bold text-slate-800">
              {selectedProject ? selectedProject.projectName : "Project Layout View"}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* PROJECT SELECTOR */}
          <select
            className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[200px] font-medium text-slate-700"
            value={selectedProjectId}
            onChange={(e) => {
              setSelectedProjectId(e.target.value);
              setSelectedLayout(null);
              setSelectedTask(null);
            }}
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p.projectId} value={p.projectId}>
                {p.projectName}
              </option>
            ))}
          </select>

          {/* VIEW MODE TOGGLE */}
          {selectedProjectId && (
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("layout")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === "layout"
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span className="hidden sm:inline">Layout</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === "table"
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Table</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* STATS BAR (only show when project selected) */}
      {selectedProjectId && (
        <div className="bg-white/60 backdrop-blur-sm border-b border-slate-200/60 px-4 md:px-8 py-3">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Total</p>
              <p className="text-lg font-bold text-slate-800">{taskStats.total}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Completed</p>
              <p className="text-lg font-bold text-emerald-600">{taskStats.completed}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider">In Progress</p>
              <p className="text-lg font-bold text-blue-600">{taskStats.inProgress}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Pending</p>
              <p className="text-lg font-bold text-amber-600">{taskStats.pending}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Created</p>
              <p className="text-lg font-bold text-slate-600">{taskStats.created}</p>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto">
        {!selectedProjectId ? (
          // ===== PROJECT SELECTION STATE =====
          <div className="h-full min-h-[500px] flex items-center justify-center p-6">
            <div className="text-center max-w-2xl">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Select a Project</h2>
              <p className="text-slate-600 mb-8">Choose a project from the dropdown above to view layouts and manage tasks</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {projects.slice(0, 6).map((project) => (
                  <button
                    key={project.projectId}
                    onClick={() => setSelectedProjectId(project.projectId)}
                    className="group bg-white/80 backdrop-blur-sm hover:bg-white border border-slate-200/60 hover:border-orange-300 rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {project.projectName}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        {tasks.filter(t => t.projectId === project.projectId).length} tasks
                      </span>
                      <span className="text-slate-400">
                        {[...new Set(tasks.filter(t => t.projectId === project.projectId).map(t => t.layoutImage))].length} layouts
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : viewMode === "layout" ? (
          // ===== LAYOUT VIEW =====
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 min-h-0">
            
            {/* LAYOUT SIDEBAR */}
            <aside className="md:w-72 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm flex md:flex-col overflow-x-auto md:overflow-y-auto min-h-0">
              <div className="p-4 border-b border-slate-200/60 shrink-0">
                <h3 className="font-bold text-slate-800 mb-1">Floor Layouts</h3>
                <p className="text-xs text-slate-500">{layouts.length} available layouts</p>
              </div>
              
              <div className="flex md:flex-col gap-3 p-4 overflow-auto">
                {layouts.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-slate-500 text-sm">No layouts found</p>
                  </div>
                ) : (
                  layouts.map((layout, index) => (
                    <button
                      key={layout}
                      onClick={() => {
                        setSelectedLayout(layout);
                        setSelectedTask(null);
                      }}
                      className={`min-w-[140px] md:min-w-0 border rounded-xl overflow-hidden transition-all duration-300 group ${
                        selectedLayout === layout 
                          ? "border-orange-500 ring-2 ring-orange-200 shadow-lg scale-105" 
                          : "border-slate-200 hover:border-orange-400 hover:shadow-md hover:scale-102"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={layout}
                          className="w-full h-24 md:h-auto object-cover transition-transform duration-300"
                          alt={`Layout ${index + 1}`}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDE3SDE2TTggMTdIMTJNOCAxM0gxNk04IDlIMTYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-2 left-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Layout {index + 1}
                        </div>
                        {selectedLayout === layout && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-2 text-left bg-white/50">
                        <p className="text-xs text-slate-600 font-medium">Layout {index + 1}</p>
                        <p className="text-xs text-slate-500">
                          {projectTasks.filter(t => t.layoutImage === layout).length} tasks
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </aside>

            {/* MAP WORKSPACE */}
            <main className="flex-1 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm flex flex-col min-h-[300px] overflow-hidden">
              {selectedLayout ? (
                <>
                  <div className="p-4 border-b border-slate-200/60 shrink-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-bold text-slate-800">Interactive Layout</h2>
                        <p className="text-xs text-slate-400">Click on task markers to view details</p>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>
                          {projectTasks.filter(t => t.layoutImage === selectedLayout).length} tasks on this layout
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative bg-gradient-to-br from-slate-50/50 to-slate-100/50 min-h-0">
                    <LayoutTaskMap
                      layoutImage={selectedLayout}
                      tasks={projectTasks.filter((t) => t.layoutImage === selectedLayout)}
                      selectedTask={selectedTask}
                      onSelectTask={(task) => {
                        setSelectedTask(task);
                        setSelectedLayout(task.layoutImage);
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">Select a Layout</h3>
                    <p className="text-xs text-slate-500">Choose a layout from the sidebar to view tasks</p>
                  </div>
                </div>
              )}
            </main>

            {/* TASK DETAILS PANEL */}
            <aside className="w-full md:w-[420px] bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm min-h-[200px] overflow-hidden shrink-0">
              <ManagerTaskDetailsPanel
                task={selectedTask}
                layoutImage={selectedLayout}
              />
            </aside>
          </div>
        ) : (
          // ===== TABLE VIEW =====
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 p-4 md:p-6 min-h-0">
            
            {/* TABLE SECTION */}
            <div className="flex-1 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-0">
              <div className="overflow-x-auto flex-1">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-slate-50/80 sticky top-0">
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Task ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Task Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60">
                    {projectTasks.map((task) => {
                      const statusConfig = getStatusConfig(task.status);
                      
                      return (
                        <tr
                          key={task._id}
                          onClick={() => setSelectedTask(task)}
                          className={`hover:bg-orange-50/50 transition-all duration-200 cursor-pointer group ${
                            selectedTask?._id === task._id ? "bg-orange-50/80 ring-1 ring-orange-200" : ""
                          }`}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">
                            {task.taskId}
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                                {task.taskName}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                              <span>{statusConfig.icon}</span>
                              <span>{statusConfig.display}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTask(task);
                              }}
                              className="text-orange-600 hover:text-orange-700 font-medium text-sm hover:bg-orange-50 px-3 py-1 rounded-lg transition-all duration-200"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TASK DETAILS PANEL */}
            {selectedTask && (
              <aside className="w-full lg:w-[420px] bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm min-h-[400px] flex flex-col shrink-0">
                <div className="flex items-center justify-between p-4 border-b border-slate-200/60">
                  <h3 className="font-bold text-slate-800">Task Details</h3>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <ManagerTaskDetailsPanel
                    task={selectedTask}
                    layoutImage={selectedLayout}
                  />
                </div>
              </aside>
            )}
          </div>
        )}
      </div>
    </div>
  );
}