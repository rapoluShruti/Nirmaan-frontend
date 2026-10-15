import { useEffect, useState, useMemo } from "react";
import api from "../api/axiosConfig";
import LayoutTaskMap from "../components/LayoutTaskMap";
import TaskDetailsPanel from "../components/TaskDetailsPanel";

export default function SupervisorLayoutPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("layout"); // "layout" or "table"

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

  /* ================= DEFAULT LAYOUT ================= */
  useEffect(() => {
    if (!selectedLayout && layouts.length) {
      setSelectedLayout(layouts[0]);
    }
  }, [layouts, selectedLayout]);

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
          color: "bg-blue-100 text-blue-700 border-[#b9d9cf]",
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

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (!projectTasks.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No tasks assigned</h3>
          <p className="text-slate-600">Check back later for new assignments</p>
        </div>
      </div>
    );
  }

  const projectName = projectTasks[0]?.projectName || "Assigned Project";

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">

      {/* MODERN HEADER */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-4 md:px-8 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <div className="flex items-center space-x-4 py-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#102b2a] to-[#0f766e] rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Supervisor / Tasks
            </p>
            <h1 className="text-xl font-bold text-slate-800">
              {projectName}
            </h1>
          </div>
        </div>

        {/* VIEW MODE TOGGLE */}
        <div className="flex items-center bg-slate-100 rounded-xl p-1">
          <button
            onClick={() => setViewMode("layout")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              viewMode === "layout"
                ? "bg-white text-teal-700 shadow-sm"
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
                ? "bg-white text-teal-700 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </header>

      {/* STATS BAR */}
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
            <p className="text-lg font-bold text-teal-700">{taskStats.inProgress}</p>
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

      {/* ===== SCROLL CONTAINER ===== */}
      <div className="flex-1 overflow-auto">
        {viewMode === "layout" ? (
          // ===== LAYOUT VIEW =====
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 min-h-0">

            {/* ===== LAYOUT SIDEBAR ===== */}
            <aside className="md:w-72 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 shadow-sm flex md:flex-col overflow-x-auto md:overflow-y-auto min-h-0">
              <div className="hidden md:block mb-3">
                <h2 className="text-sm font-bold text-slate-800">Floor Layouts</h2>
                <p className="text-[11px] text-slate-400">
                  Project layouts with tasks
                </p>
              </div>

              <div className="flex md:flex-col gap-3">
                {layouts.map((layout, index) => (
                  <button
                    key={layout}
                    onClick={() => {
                      setSelectedLayout(layout);
                      setSelectedTask(null);
                    }}
                    className={`min-w-[140px] md:min-w-0 border rounded-xl overflow-hidden transition-all duration-300 group ${
                      selectedLayout === layout
                        ? "border-orange-500 ring-2 ring-teal-200 shadow-lg scale-105"
                        : "border-slate-200 hover:border-orange-400 hover:shadow-md hover:scale-102"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={layout}
                        alt="Layout"
                        className="w-full h-24 md:h-auto object-cover transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-2 left-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Layout {index + 1}
                      </div>
                      {selectedLayout === layout && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            {/* ===== MAP WORKSPACE ===== */}
            <main className="flex-1 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm flex flex-col min-h-[300px] overflow-hidden">
              <div className="p-3 md:p-4 border-b border-slate-200/60 shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      Task Layout View
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Tap a marker to view task details
                    </p>
                  </div>
                  {selectedLayout && (
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <div className="w-2 h-2 bg-teal-700 rounded-full"></div>
                      <span>
                        {projectTasks.filter(t => t.layoutImage === selectedLayout).length} tasks on this layout
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 relative bg-gradient-to-br from-slate-50/50 to-slate-100/50 min-h-0">
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
            <aside className="w-full md:w-80 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm min-h-[200px] overflow-hidden">
              {!selectedTask ? (
                <div className="flex items-center justify-center h-full text-center p-6">
                  <div>
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">Select a Task</h3>
                    <p className="text-xs text-slate-500">Click on a task marker to view details</p>
                  </div>
                </div>
              ) : (
                <TaskDetailsPanel
                  task={selectedTask}
                  onActionDone={() => {
                    setSelectedTask(null);
                    fetchTasks();
                  }}
                />
              )}
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
                          className={`hover:bg-[#f7fbf8] transition-all duration-200 cursor-pointer group ${
                            selectedTask?._id === task._id ? "bg-[#e6f3ee] ring-1 ring-teal-200" : ""
                          }`}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">
                            {task.taskId}
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
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
                              className="text-teal-700 hover:text-teal-800 font-medium text-sm hover:bg-[#f7fbf8] px-3 py-1 rounded-lg transition-all duration-200"
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
              <aside className="w-full lg:w-80 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm min-h-[400px] flex flex-col shrink-0">
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
                  <TaskDetailsPanel
                    task={selectedTask}
                    onActionDone={() => {
                      setSelectedTask(null);
                      fetchTasks();
                    }}
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