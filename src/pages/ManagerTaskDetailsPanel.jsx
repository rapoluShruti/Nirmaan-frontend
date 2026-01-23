import { useState } from "react";
import api from "../api/axiosConfig";

// const BACKEND_URL = "http://localhost:5000";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function ManagerTaskDetailsPanel({
  task,
  layoutImage,
  onActionDone,
}) {
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterUrl, setAfterUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!task) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a task
      </div>
    );
  }

  const beforePhoto =
    task.beforePhotoUrl ||
    task.beforePhoto ||
    task.beforePhoto?.url ||
    null;

  const afterPhoto =
    task.afterPhotoUrl ||
    task.afterPhoto ||
    task.afterPhoto?.url ||
    null;

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-4 space-y-4">

      {/* HEADER */}
      <div className="bg-white border rounded-xl p-4">
        <div className="font-semibold">{task.taskId}</div>
      </div>

      {/* ✅ LAYOUT IMAGE (NOW GUARANTEED) */}
      {layoutImage && (
        <div className="bg-white border rounded-xl p-4">
          <div className="font-semibold mb-2">Layout</div>
          <img
            src={layoutImage}
            className="w-full h-48 object-cover rounded-lg border"
            alt="layout"
          />
        </div>
      )}

      {/* BEFORE PHOTO */}
      <div className="bg-white border rounded-xl p-4">
        <div className="font-semibold mb-2">Before Photo</div>
        {beforePhoto ? (
          <img
            src={`${BACKEND_URL}${beforePhoto}`}
            className="w-full h-48 object-cover rounded-lg border"
            alt="before"
          />
        ) : (
          <div className="text-gray-400">Not uploaded</div>
        )}
      </div>

      {/* AFTER PHOTO */}
      <div className="bg-white border rounded-xl p-4">
        <div className="font-semibold mb-2">After Photo</div>
        {afterPhoto ? (
          <img
            src={`${BACKEND_URL}${afterPhoto}`}
            className="w-full h-48 object-cover rounded-lg border"
            alt="after"
          />
        ) : (
          <div className="text-gray-400">Not completed</div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
