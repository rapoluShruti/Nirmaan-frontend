
// import { useEffect, useState, useMemo } from "react";
// import api from "../api/axiosConfig";
// import LayoutTaskMap from "../components/LayoutTaskMap";
// import TaskDetailsPanel from "../components/TaskDetailsPanel";

// export default function SupervisorLayoutPage() {
//   const [tasks, setTasks] = useState([]);
//   const [selectedLayout, setSelectedLayout] = useState(null);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH TASKS ================= */
//   const fetchTasks = async () => {
//     try {
//       const res = await api.get("/tasks/supervisor");
//       setTasks(res.data.tasks || []);
//     } catch (err) {
//       console.error("Failed to fetch tasks", err);
//       setTasks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   /* ================= SINGLE PROJECT STOPPER ================= */
//   const activeProjectId = useMemo(() => {
//     if (!tasks.length) return null;
//     return tasks[0].projectId;
//   }, [tasks]);

//   const projectTasks = useMemo(() => {
//     return tasks.filter((t) => t.projectId === activeProjectId);
//   }, [tasks, activeProjectId]);

//   const layouts = useMemo(() => {
//     return [...new Set(projectTasks.map((t) => t.layoutImage))];
//   }, [projectTasks]);

//   /* ================= DEFAULT LAYOUT ================= */
//   useEffect(() => {
//     if (!selectedLayout && layouts.length) {
//       setSelectedLayout(layouts[0]);
//     }
//   }, [layouts, selectedLayout]);

//   /* ================= STATES ================= */
//   if (loading) {
//     return <div className="p-6 text-sm text-gray-500">Loading tasks…</div>;
//   }

//   if (!projectTasks.length) {
//     return <div className="p-6 text-sm text-gray-500">No tasks assigned</div>;
//   }

//   const projectName = projectTasks[0]?.projectName || "Assigned Project";

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-[#f9fafb] flex flex-col">

//       {/* HEADER (never scrolls) */}
//       <header className="h-14 md:h-16 bg-white border-b px-4 md:px-8 flex items-center shrink-0">
//         <div>
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//             Supervisor / Tasks
//           </p>
//           <h1 className="text-base md:text-lg font-bold text-gray-800">
//             {projectName}
//           </h1>
//         </div>
//       </header>

//       {/* ===== SCROLL CONTAINER ===== */}
//       <div className="flex-1 overflow-auto">
//         <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 min-h-0">

//           {/* ===== LAYOUT SIDEBAR ===== */}
//           <aside
//             className="
//               md:w-72
//               bg-white border border-gray-200 rounded-xl p-4 shadow-sm
//               flex md:flex-col
//               overflow-x-auto md:overflow-y-auto
//               min-h-0
//             "
//           >
//             <div className="hidden md:block mb-3">
//               <h2 className="text-sm font-bold text-gray-800">Floor Layouts</h2>
//               <p className="text-[11px] text-gray-400">
//                 Project layouts with tasks
//               </p>
//             </div>

//             <div className="flex md:flex-col gap-3">
//               {layouts.map((layout) => (
//                 <button
//                   key={layout}
//                   onClick={() => {
//                     setSelectedLayout(layout);
//                     setSelectedTask(null);
//                   }}
//                   className={`
//                     min-w-[140px] md:min-w-0
//                     border rounded-lg overflow-hidden transition-all
//                     ${
//                       selectedLayout === layout
//                         ? "border-orange-500 ring-2 ring-orange-200"
//                         : "border-gray-200 hover:border-orange-400"
//                     }
//                   `}
//                 >
//                   <img
//                     src={layout}
//                     alt="Layout"
//                     className="w-full h-24 md:h-auto object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </aside>

//           {/* ===== MAP WORKSPACE ===== */}
//           <main
//             className="
//               flex-1 bg-white border border-gray-200 rounded-xl shadow-sm
//               flex flex-col min-h-[300px]
//             "
//           >
//             <div className="p-3 md:p-4 border-b shrink-0">
//               <h2 className="text-sm font-bold text-gray-800">
//                 Task Layout View
//               </h2>
//               <p className="text-[11px] text-gray-400">
//                 Tap a marker to view task details
//               </p>
//             </div>

//             <div className="flex-1 relative bg-gray-50/50 min-h-0">
//               <LayoutTaskMap
//                 layoutImage={selectedLayout}
//                 tasks={projectTasks.filter(
//                   (t) => t.layoutImage === selectedLayout
//                 )}
//                 onSelectTask={setSelectedTask}
//               />
//             </div>
//           </main>

//           {/* ===== TASK DETAILS PANEL ===== */}
//           <aside
//             className="
//               w-full md:w-80
//               bg-white border border-gray-200 rounded-xl shadow-sm
//               min-h-[200px]
//             "
//           >
//             <TaskDetailsPanel
//               task={selectedTask}
//               onActionDone={() => {
//                 setSelectedTask(null);
//                 fetchTasks();
//               }}
//             />
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import api from "../api/axiosConfig";

// export default function TaskDetailsPanel({ task, onActionDone }) {
//   const [beforeFile, setBeforeFile] = useState(null);
//   const [afterUrl, setAfterUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   if (!task) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-400 text-sm">
//         ← Select a task
//       </div>
//     );
//   }

//   /* ================= ACTIONS ================= */
//   const startTask = async () => {
//     if (!beforeFile) {
//       setError("Upload before photo");
//       return;
//     }

//     try {
//       setLoading(true);
//       const fd = new FormData();
//       fd.append("beforePhoto", beforeFile);
//       await api.post(`/tasks/${task._id}/start`, fd);
//       onActionDone();
//     } catch {
//       setError("Failed to start task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const completeTask = async () => {
//     if (!afterUrl) {
//       setError("Provide after photo URL");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post(`/tasks/${task._id}/complete`, {
//         afterPhotoUrl: afterUrl,
//       });
//       onActionDone();
//     } catch {
//       setError("Failed to complete task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= STATUS ================= */
//   const statusText =
//     task.overdue
//       ? "OVERDUE"
//       : task.afterPhotoUrl
//       ? "COMPLETED"
//       : task.beforePhotoUrl
//       ? "IN PROGRESS"
//       : "NOT STARTED";

//   const statusColor =
//     task.overdue
//       ? "text-red-600"
//       : task.afterPhotoUrl
//       ? "text-green-600"
//       : task.beforePhotoUrl
//       ? "text-yellow-600"
//       : "text-orange-600";

//   /* ================= UI ================= */
//   return (
//     <div className="h-full flex flex-col text-sm">

//       {/* ===== HEADER ===== */}
//       <div className="border-b px-4 py-3 bg-gray-50">
//         <div className="text-xs text-gray-500">Task ID</div>
//         <div className="font-bold">{task.taskId}</div>
//         <div className={`mt-1 text-xs font-semibold ${statusColor}`}>
//           {statusText}
//         </div>
//       </div>

//       {/* ===== TABLE ===== */}
//       <div className="flex-1 overflow-auto">
//         <table className="w-full border-collapse text-sm">
//           <tbody>

//             <Row label="Description" value={task.description || "—"} />
//             <Row label="Start Date" value={task.startDate?.slice(0, 10) || "—"} />
//             <Row label="End Date" value={task.endDate?.slice(0, 10) || "—"} />
//             <Row label="Priority" value={task.priority || "—"} />
//             <Row label="Risk Work" value={task.isRisky ? "YES" : "NO"} />

//             {task.categories?.length > 0 && (
//               <Row
//                 label="Workers"
//                 value={task.categories
//                   .map(
//                     (c) =>
//                       `${c.isCustom ? c.customName : c.name} (${c.workersRequired})`
//                   )
//                   .join(", ")}
//               />
//             )}

//             {task.materialsRequired?.length > 0 && (
//               <Row
//                 label="Materials"
//                 value={task.materialsRequired.join(", ")}
//               />
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ===== ERROR ===== */}
//       {error && (
//         <div className="px-4 py-2 text-xs bg-red-100 text-red-700">
//           {error}
//         </div>
//       )}

//       {/* ===== ACTION BAR ===== */}
//       <div className="border-t px-4 py-3 bg-white space-y-2">

//         {!task.beforePhotoUrl && (
//           <>
//             <input
//               type="file"
//               onChange={(e) => setBeforeFile(e.target.files[0])}
//               className="text-xs"
//             />
//             <button
//               disabled={loading}
//               onClick={startTask}
//               className="w-full py-2 bg-orange-500 text-white font-bold rounded"
//             >
//               START WORK
//             </button>
//           </>
//         )}

//         {task.beforePhotoUrl && !task.afterPhotoUrl && (
//           <>
//             <input
//               value={afterUrl}
//               onChange={(e) => setAfterUrl(e.target.value)}
//               placeholder="After photo URL"
//               className="w-full border px-2 py-1 text-xs"
//             />
//             <button
//               disabled={loading}
//               onClick={completeTask}
//               className="w-full py-2 bg-green-600 text-white font-bold rounded"
//             >
//               FINISH WORK
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ===== TABLE ROW ===== */
// function Row({ label, value }) {
//   return (
//     <tr className="border-b last:border-b-0">
//       <td className="px-4 py-2 text-gray-500 w-32 align-top">
//         {label}
//       </td>
//       <td className="px-4 py-2 text-gray-800">
//         {value}
//       </td>
//     </tr>
//   );
// }
import { useEffect, useState, useMemo } from "react";
import api from "../api/axiosConfig";
import LayoutTaskMap from "../components/LayoutTaskMap";
import TaskDetailsPanel from "../components/TaskDetailsPanel";

export default function SupervisorLayoutPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH TASKS ================= */
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/supervisor");
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ================= SINGLE PROJECT STOPPER ================= */
  const activeProjectId = useMemo(() => {
    if (!tasks.length) return null;
    return tasks[0].projectId;
  }, [tasks]);

  const projectTasks = useMemo(() => {
    return tasks.filter((t) => t.projectId === activeProjectId);
  }, [tasks, activeProjectId]);

  const layouts = useMemo(() => {
    return [...new Set(projectTasks.map((t) => t.layoutImage))];
  }, [projectTasks]);

  /* ================= DEFAULT LAYOUT ================= */
  useEffect(() => {
    if (!selectedLayout && layouts.length) {
      setSelectedLayout(layouts[0]);
    }
  }, [layouts, selectedLayout]);

  /* ================= STATES ================= */
  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading tasks…</div>;
  }

  if (!projectTasks.length) {
    return <div className="p-6 text-sm text-gray-500">No tasks assigned</div>;
  }

  const projectName = projectTasks[0]?.projectName || "Assigned Project";

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">

      {/* HEADER (never scrolls) */}
      <header className="h-14 md:h-16 bg-white border-b px-4 md:px-8 flex items-center shrink-0">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Supervisor / Tasks
          </p>
          <h1 className="text-base md:text-lg font-bold text-gray-800">
            {projectName}
          </h1>
        </div>
      </header>

      {/* ===== SCROLL CONTAINER ===== */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 min-h-0">

          {/* ===== LAYOUT SIDEBAR ===== */}
          <aside
            className="
              md:w-72
              bg-white border border-gray-200 rounded-xl p-4 shadow-sm
              flex md:flex-col
              overflow-x-auto md:overflow-y-auto
              min-h-0
            "
          >
            <div className="hidden md:block mb-3">
              <h2 className="text-sm font-bold text-gray-800">Floor Layouts</h2>
              <p className="text-[11px] text-gray-400">
                Project layouts with tasks
              </p>
            </div>

            <div className="flex md:flex-col gap-3">
              {layouts.map((layout) => (
                <button
                  key={layout}
                  onClick={() => {
                    setSelectedLayout(layout);
                    setSelectedTask(null);
                  }}
                  className={`
                    min-w-[140px] md:min-w-0
                    border rounded-lg overflow-hidden transition-all
                    ${
                      selectedLayout === layout
                        ? "border-orange-500 ring-2 ring-orange-200"
                        : "border-gray-200 hover:border-orange-400"
                    }
                  `}
                >
                  <img
                    src={layout}
                    alt="Layout"
                    className="w-full h-24 md:h-auto object-cover"
                  />
                </button>
              ))}
            </div>
          </aside>

          {/* ===== MAP WORKSPACE ===== */}
          <main
            className="
              flex-1 bg-white border border-gray-200 rounded-xl shadow-sm
              flex flex-col min-h-[300px]
            "
          >
            <div className="p-3 md:p-4 border-b shrink-0">
              <h2 className="text-sm font-bold text-gray-800">
                Task Layout View
              </h2>
              <p className="text-[11px] text-gray-400">
                Tap a marker to view task details
              </p>
            </div>

            <div className="flex-1 relative bg-gray-50/50 min-h-0">
              <LayoutTaskMap
              
                layoutImage={selectedLayout}
                tasks={projectTasks.filter(
                  (t) => t.layoutImage === selectedLayout
                )}
                  selectedTask={selectedTask}
                onSelectTask={setSelectedTask}
              />
            </div>
          </main>

          {/* ===== TASK DETAILS PANEL ===== */}
          <aside
            className="
              w-full md:w-80
              bg-white border border-gray-200 rounded-xl shadow-sm
              min-h-[200px]
            "
          >
            <TaskDetailsPanel
              task={selectedTask}
              onActionDone={() => {
                setSelectedTask(null);
                fetchTasks();
              }}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
