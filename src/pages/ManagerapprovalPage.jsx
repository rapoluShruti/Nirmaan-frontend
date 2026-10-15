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
    <div className="min-h-screen bg-[#f4f7f4] p-4 text-[#183a35] md:p-8"><div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
      <div>
        <div className="mb-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-teal-700">Task review</p><h1 className="mt-1 text-2xl font-bold tracking-tight">Pending approvals</h1><p className="mt-2 text-sm text-[#71847d]">Review site submissions and evidence.</p></div>

        {tasks.length === 0 && (
          <p className="text-sm text-gray-500">No pending tasks</p>
        )}

        {tasks.map((t) => (
          <div
            key={t._id}
            onClick={() => setSelected(t)}
            className={`mb-2 w-full rounded-xl border p-4 text-left transition ${selected?._id === t._id ? "border-teal-300 bg-[#e6f3ee] ring-2 ring-teal-700/10" : "border-[#dce7e1] bg-white hover:border-teal-200 hover:bg-[#fbfdfb]"}` }
          >
            <span className="block text-sm font-bold text-[#203c38]">{t.taskId}</span><span className="mt-1 block text-xs text-[#71847d]">{t.assignedSupervisor?.name || "Awaiting review"}</span>
          </div>
        ))}
      </div>

      {selected && (
        <div className="min-w-0 rounded-2xl border border-[#dce7e1] bg-white p-5 shadow-sm md:p-7 space-y-4">
          <div className="flex flex-col justify-between gap-3 border-b border-[#e5ede8] pb-5 sm:flex-row sm:items-start"><div><p className="text-xs font-bold uppercase tracking-wider text-teal-700">Submission details</p><h2 className="mt-1 text-2xl font-bold">{selected.taskId}</h2></div><span className="inline-flex w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">Awaiting decision</span></div>

          <p><b>Description:</b> {selected.description}</p>

          {selected.voiceNoteUrl && (
            <audio
              controls
              // src={`http://localhost:2026${selected.voiceNoteUrl}`}
          src={`${import.meta.env.VITE_BACKEND_URL}${selected.voiceNoteUrl}`}
    
            />
          )}

          <p><b>Supervisor:</b> {selected.assignedSupervisor?.name || "N/A"}</p>

          {selected.beforePhotoUrl && (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${selected.beforePhotoUrl}`}
              className="max-h-80 w-full rounded-xl border border-[#dce7e1] object-cover"
              alt="Before"
            />
          )}

          {selected.afterPhotoUrl && (
            <img
              // src={`http://localhost:2026${selected.afterPhotoUrl}`}
              src={`${import.meta.env.VITE_BACKEND_URL}${selected.afterPhotoUrl}`}
              className="max-h-80 w-full rounded-xl border border-[#dce7e1] object-cover"
              alt="After"
            />
          )}

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => approve(selected._id)}
              className="rounded-xl bg-[#0f766e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0b5d57]"
            >
              Approve
            </button>

            <button
              onClick={() => reject(selected._id)}
              className="rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
