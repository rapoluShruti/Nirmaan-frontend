import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function ManagerapprovalPage() {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      try {
        const res = await api.get("/tasks/pending-approval");
        if (isMounted) {
          setTasks(res.data?.tasks || []);
        }
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  const approve = async (id) => {
    try {
      await api.post(`/tasks/${id}/approve`);
      setSelected(null);
      // refresh list after approve
      const res = await api.get("/tasks/pending-approval");
      setTasks(res.data?.tasks || []);
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  const reject = async (id) => {
    try {
      await api.post(`/tasks/${id}/reject`);
      setSelected(null);
      const res = await api.get("/tasks/pending-approval");
      setTasks(res.data?.tasks || []);
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      <div>
        <h2 className="font-bold mb-2">Pending Approvals</h2>

        {tasks.length === 0 && (
          <p className="text-sm text-gray-500">No pending tasks</p>
        )}

        {tasks.map((t) => (
          <div
            key={t._id}
            onClick={() => setSelected(t)}
            className="border p-2 mb-2 cursor-pointer hover:bg-gray-100"
          >
            {t.taskId}
          </div>
        ))}
      </div>

      {selected && (
        <div className="col-span-2 border p-4 space-y-2">
          <h3 className="font-bold text-lg">{selected.taskId}</h3>

          <p><b>Description:</b> {selected.description}</p>

          {selected.voiceNoteUrl && (
            <audio
              controls
              src={`http://localhost:5000${selected.voiceNoteUrl}`}
            />
          )}

          <p><b>Supervisor:</b> {selected.assignedSupervisor?.name || "N/A"}</p>

          {selected.beforePhotoUrl && (
            <img
              src={`http://localhost:5000${selected.beforePhotoUrl}`}
              className="border"
              alt="Before"
            />
          )}

          {selected.afterPhotoUrl && (
            <img
              src={`http://localhost:5000${selected.afterPhotoUrl}`}
              className="border"
              alt="After"
            />
          )}

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => approve(selected._id)}
              className="bg-green-600 text-white px-4 py-2"
            >
              Approve
            </button>

            <button
              onClick={() => reject(selected._id)}
              className="bg-red-600 text-white px-4 py-2"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
