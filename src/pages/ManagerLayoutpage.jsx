import { useEffect, useState } from "react";
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

  const projectTasks = tasks.filter(
    (t) => t.projectId === selectedProjectId
  );

  const layouts = [...new Set(projectTasks.map((t) => t.layoutImage))];

  useEffect(() => {
    if (layouts.length) {
      setSelectedLayout(layouts[0]);
      setSelectedTask(null);
    }
  }, [selectedProjectId]);

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="h-screen flex flex-col bg-slate-50">

      {/* HEADER */}
      <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
        <h1 className="font-bold">Project Layout View</h1>

        <select
          className="border rounded px-3 py-2"
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
      </header>

      <div className="flex-1 p-6 flex gap-6">

        {/* LAYOUT LIST */}
        <aside className="w-72 bg-white border rounded-xl p-4 space-y-3">
          <div className="font-semibold text-sm">Layouts</div>
          {layouts.map((layout) => (
            <button
              key={layout}
              onClick={() => {
                setSelectedLayout(layout);
                setSelectedTask(null);
              }}
              className={`border rounded-lg overflow-hidden ${
                selectedLayout === layout ? "ring-2 ring-orange-400" : ""
              }`}
            >
              <img
                src={layout}
                className="w-full h-24 object-cover"
                alt="layout"
              />
            </button>
          ))}
        </aside>

        {/* MAP */}
        <main className="flex-1 bg-white border rounded-xl p-2">
          {selectedLayout && (
            <LayoutTaskMap
              layoutImage={selectedLayout}
              tasks={projectTasks.filter(
                (t) => t.layoutImage === selectedLayout
              )}
              selectedTask={selectedTask}
              onSelectTask={(task) => {
                setSelectedTask(task);
                setSelectedLayout(task.layoutImage); // 🔴 SOURCE OF TRUTH
              }}
            />
          )}
        </main>

        {/* DETAILS */}
        <aside className="w-[420px] bg-white border rounded-xl overflow-hidden">
          <ManagerTaskDetailsPanel
            task={selectedTask}
            layoutImage={selectedLayout}   // ✅ PASS IT HERE
          />
        </aside>
      </div>
    </div>
  );
}
