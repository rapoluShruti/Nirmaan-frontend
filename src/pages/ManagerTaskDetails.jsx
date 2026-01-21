import api from "../api/axiosConfig";

export default function ManagerTaskDetails({ task, onDone }) {
  if (!task) {
    return <div className="text-gray-400">Select a task</div>;
  }

  const approve = async () => {
    await api.post(`/tasks/${task._id}/approve`);
    onDone();
  };

  const reject = async () => {
    await api.post(`/tasks/${task._id}/reject`);
    onDone();
  };

  return (
    <div className="border p-4 bg-white space-y-3">
      <h2 className="text-xl font-bold">{task.taskId}</h2>

      <p><b>Description:</b> {task.description}</p>
      <p><b>Priority:</b> {task.priority}</p>
      <p><b>Risk:</b> {task.isRisky ? "Yes" : "No"}</p>

      {/* AI */}
      {task.aiEvaluation && (
        <div className="bg-red-50 p-2 rounded text-sm">
          <b>AI Risk:</b> {task.aiEvaluation.overdueRisk}
          <ul className="list-disc ml-5">
            {task.aiEvaluation.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* PHOTOS */}
      {task.beforePhotoUrl && (
        <img
          src={`http://localhost:5000${task.beforePhotoUrl}`}
          className="w-full rounded"
        />
      )}

      {task.afterPhotoUrl && (
        <img
          src={`http://localhost:5000${task.afterPhotoUrl}`}
          className="w-full rounded"
        />
      )}

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          onClick={approve}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Approve
        </button>

        <button
          onClick={reject}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
