import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import ManagerTaskDetails from "./ManagerTaskDetails";

export default function IT() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch projects
  useEffect(() => {
    api.get("/projects").then((res) => {
      setProjects(res.data || []);
    });
  }, []);

  // Fetch tasks once project selected
  useEffect(() => {
    if (!selectedProject) return;

    setLoading(true);
    api
      .get("/tasks/pending-approval")
      .then((res) => {
        const allTasks = res.data.tasks || [];

        // FILTER BY PROJECT
        const projectTasks = allTasks.filter(
          (t) => t.projectId === selectedProject
        );

        setTasks(projectTasks);
      })
      .finally(() => setLoading(false));
  }, [selectedProject]);

  const today = new Date();

  const overdue = tasks.filter(
    (t) => new Date(t.endDate) < today && !t.approved
  );

  const pendingApproval = tasks.filter(
    (t) => t.afterPhotoUrl && !t.approved
  );

  const inProgress = tasks.filter(
    (t) => t.beforePhotoUrl && !t.afterPhotoUrl
  );

  const renderList = (list) =>
    list.map((t) => (
      <div
        key={t._id}
        onClick={() => setSelectedTask(t)}
        className="border p-3 rounded cursor-pointer hover:border-orange-500"
      >
        <div className="font-semibold">{t.taskId}</div>
        <div className="text-sm text-gray-600">{t.description}</div>
        {t.aiEvaluation && (
          <div className="text-xs text-red-600 mt-1">
            Risk: {t.aiEvaluation.overdueRisk}
          </div>
        )}
      </div>
    ));

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {/* LEFT */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Manager Dashboard</h1>

        {/* PROJECT SELECT */}
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p.projectId} value={p.projectId}>
              {p.name || p.projectId}
            </option>
          ))}
        </select>

        {!selectedProject && (
          <div className="text-gray-400">
            Select a project to continue
          </div>
        )}

        {selectedProject && (
          <>
            <section>
              <h2 className="text-red-600 font-bold">⚠ Overdue</h2>
              {renderList(overdue)}
            </section>

            <section>
              <h2 className="text-orange-600 font-bold">
                ⏳ Pending Approval
              </h2>
              {renderList(pendingApproval)}
            </section>

            <section>
              <h2 className="text-yellow-600 font-bold">In Progress</h2>
              {renderList(inProgress)}
            </section>
          </>
        )}
      </div>

      {/* RIGHT */}
      <div className="col-span-2">
        <ManagerTaskDetails
          task={selectedTask}
          onDone={() => setSelectedTask(null)}
        />
      </div>
    </div>
  );
}
