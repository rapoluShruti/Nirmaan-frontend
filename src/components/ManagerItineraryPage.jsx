import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import LayoutTaskMap from "../components/LayoutTaskMap";
import TaskDetailsPanel from "../components/TaskDetailsPanel";

export default function ManagerItineraryPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/manager");
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Manager task fetch failed", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!tasks.length) return <div className="p-6">No tasks available</div>;

  const today = new Date();

  /* =====================
     TASK BUCKETS
     ===================== */

  const overdueTasks = tasks.filter(
    (t) =>
      t.status === "CREATED" &&
      t.endDate &&
      new Date(t.endDate) < today
  );

  const inProgressTasks = tasks.filter(
    (t) => t.status === "IN_PROGRESS"
  );

  const approvalPendingTasks = tasks.filter(
    (t) =>
      t.status === "COMPLETED" &&
      t.approved === false &&
      t.afterPhotoUrl
  );

  const renderTask = (task, showApprovalTag = false) => (
    <div
      key={task._id}
      onClick={() => {
        setSelectedTask(task);
        setSelectedLayout(task.layoutImage);
      }}
      className="border p-3 rounded cursor-pointer hover:border-orange-500"
    >
      <div className="font-semibold">{task.taskId}</div>
      <div className="text-sm text-gray-600">
        {task.description}
      </div>
      <div className="text-xs mt-1">
        Status: <b>{task.status}</b>
      </div>
      {showApprovalTag && (
        <div className="text-xs text-orange-600 mt-1">
          Approval Required
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {/* LEFT: TASK LISTS */}
      <div className="space-y-6">
        {/* OVERDUE */}
        <div>
          <h2 className="font-bold text-red-600 mb-2">
            ⚠ Overdue (Not Started)
          </h2>
          {overdueTasks.length
            ? overdueTasks.map((t) => renderTask(t))
            : <div className="text-gray-400 text-sm">None</div>}
        </div>

        {/* IN PROGRESS */}
        <div>
          <h2 className="font-bold text-orange-600 mb-2">
            ⏳ In Progress
          </h2>
          {inProgressTasks.length
            ? inProgressTasks.map((t) => renderTask(t))
            : <div className="text-gray-400 text-sm">None</div>}
        </div>

        {/* APPROVAL PENDING */}
        <div>
          <h2 className="font-bold text-green-600 mb-2">
            ✅ Approval Pending
          </h2>
          {approvalPendingTasks.length
            ? approvalPendingTasks.map((t) =>
                renderTask(t, true)
              )
            : <div className="text-gray-400 text-sm">None</div>}
        </div>
      </div>

      {/* CENTER: LAYOUT */}
      <div>
        {selectedLayout ? (
          <LayoutTaskMap
            layoutImage={selectedLayout}
            tasks={[
              ...overdueTasks,
              ...inProgressTasks,
              ...approvalPendingTasks,
            ].filter(
              (t) => t.layoutImage === selectedLayout
            )}
            onSelectTask={setSelectedTask}
          />
        ) : (
          <div className="text-gray-400 text-center mt-20">
            Select a task to view layout
          </div>
        )}
      </div>

      {/* RIGHT: DETAILS */}
      <div>
        <TaskDetailsPanel
          task={selectedTask}
          showApprovalActions={
            selectedTask &&
            selectedTask.status === "COMPLETED" &&
            selectedTask.approved === false
          }
          onApprove={async () => {
            await api.post(
              `/tasks/${selectedTask._id}/approve`
            );
            setSelectedTask(null);
            fetchTasks();
          }}
          onReject={async () => {
            await api.post(
              `/tasks/${selectedTask._id}/reject`
            );
            setSelectedTask(null);
            fetchTasks();
          }}
        />
      </div>
    </div>
  );
}
