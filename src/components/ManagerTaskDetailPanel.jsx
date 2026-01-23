// import { useState } from "react";
// import api from "../api/axiosConfig";

// // const BACKEND_URL = "http://localhost:2026";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// export default function ManagerTaskDetailsPanel({ task, onActionDone }) {
//   const [beforeFile, setBeforeFile] = useState(null);
//   const [afterUrl, setAfterUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   if (!task) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-400 text-sm">
//         Select a task to view details
//       </div>
//     );
//   }

//   /* ================= NORMALIZE PHOTOS ================= */
//   const beforePhoto =
//     task.beforePhotoUrl ||
//     task.beforePhoto ||
//     task.beforePhoto?.url ||
//     null;

//   const afterPhoto =
//     task.afterPhotoUrl ||
//     task.afterPhoto ||
//     task.afterPhoto?.url ||
//     null;

//   const isLocked = Boolean(afterPhoto);

//   const statusText =
//     task.overdue
//       ? "Overdue"
//       : isLocked
//       ? "Completed"
//       : beforePhoto
//       ? "In Progress"
//       : "Not Started";

//   const statusColor =
//     task.overdue
//       ? "bg-red-100 text-red-700"
//       : isLocked
//       ? "bg-green-100 text-green-700"
//       : beforePhoto
//       ? "bg-blue-100 text-blue-700"
//       : "bg-gray-100 text-gray-700";

//   /* ================= ACTIONS ================= */
//   const startTask = async () => {
//     if (!beforeFile) {
//       setError("Upload before photo first");
//       return;
//     }

//     try {
//       setLoading(true);
//       const fd = new FormData();
//       fd.append("beforePhoto", beforeFile);
//       await api.post(`/tasks/${task._id}/start`, fd);
//       onActionDone?.();
//     } catch {
//       setError("Could not start task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const completeTask = async () => {
//     if (!afterUrl) {
//       setError("Enter after photo link");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post(`/tasks/${task._id}/complete`, {
//         afterPhotoUrl: afterUrl,
//       });
//       onActionDone?.();
//     } catch {
//       setError("Could not complete task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-full overflow-y-auto bg-gray-50 p-4 space-y-4 text-sm">

//       {/* ================= HEADER ================= */}
//       <div className="bg-white rounded-xl border p-4 space-y-2">
//         <div className="flex items-center justify-between">
//           <div className="font-semibold text-base">
//             {task.title || task.taskId}
//           </div>
//           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
//             {statusText}
//           </span>
//         </div>

//         <div className="text-xs text-gray-500 space-y-1">
//           <div><b>Task ID:</b> {task.taskId}</div>
//           <div><b>Assigned Area:</b> {task.assignedArea || "General"}</div>
//           <div><b>Engineer:</b> {task.engineerName || "—"}</div>
//         </div>
//       </div>

//       {/* ================= LAYOUT IMAGE ================= */}
//       {task.layoutImage && (
//         <div className="bg-white rounded-xl border p-4">
//           <div className="font-semibold mb-2">Layout</div>
//           <img
//             src={task.layoutImage}
//             alt="Layout"
//             className="w-full h-48 object-cover rounded-lg border"
//           />
//         </div>
//       )}

//       {/* ================= DESCRIPTION ================= */}
//       <div className="bg-white rounded-xl border p-4">
//         <div className="font-semibold mb-1">Work Description</div>
//         <div className="text-gray-700">
//           {task.description || "No description provided"}
//         </div>
//       </div>

//       {/* ================= BEFORE PHOTO ================= */}
//       <div className="bg-white rounded-xl border p-4">
//         <div className="font-semibold mb-2">Before Photo</div>
//         {beforePhoto ? (
//           <img
//             src={`${BACKEND_URL}${beforePhoto}`}
//             className="w-full h-48 object-cover rounded-lg border"
//             alt="Before"
//           />
//         ) : (
//           <div className="italic text-gray-400">Not uploaded</div>
//         )}
//       </div>

//       {/* ================= AFTER PHOTO ================= */}
//       <div className="bg-white rounded-xl border p-4">
//         <div className="font-semibold mb-2">After Photo</div>
//         {afterPhoto ? (
//           <img
//             src={`${BACKEND_URL}${afterPhoto}`}
//             className="w-full h-48 object-cover rounded-lg border"
//             alt="After"
//           />
//         ) : (
//           <div className="italic text-gray-400">Not completed</div>
//         )}
//       </div>

//       {/* ================= ACTIONS ================= */}
//       <div className="bg-white rounded-xl border p-4 space-y-3">

//         {!beforePhoto && (
//           <>
//             <input
//               type="file"
//               onChange={(e) => setBeforeFile(e.target.files[0])}
//               className="text-xs"
//               disabled={loading || isLocked}
//             />
//             <button
//               onClick={startTask}
//               disabled={loading || isLocked}
//               className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold"
//             >
//               Start Work
//             </button>
//           </>
//         )}

//         {beforePhoto && !afterPhoto && (
//           <>
//             <input
//               value={afterUrl}
//               onChange={(e) => setAfterUrl(e.target.value)}
//               placeholder="After photo URL"
//               className="border px-3 py-2 rounded-lg w-full text-sm"
//               disabled={loading || isLocked}
//             />
//             <button
//               onClick={completeTask}
//               disabled={loading || isLocked}
//               className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
//             >
//               Finish Work
//             </button>
//           </>
//         )}

//         {isLocked && (
//           <div className="text-xs text-green-700 font-semibold">
//             🔒 Task Locked
//           </div>
//         )}
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-3 rounded-lg">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import api from "../api/axiosConfig";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Helper function to construct proper image URLs
const getImageUrl = (photoUrl) => {
  if (!photoUrl) return null;
  if (photoUrl.startsWith('http')) return photoUrl;
  
  const cleanBackendUrl = BACKEND_URL.endsWith('/') ? BACKEND_URL.slice(0, -1) : BACKEND_URL;
  return `${cleanBackendUrl}${photoUrl}`;
};

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

  // Simplified - just use the direct properties from your backend
  const beforePhoto = task.beforePhotoUrl;
  const afterPhoto = task.afterPhotoUrl;

  // Debug logging to see what we're getting
  console.log('Task data:', {
    taskId: task.taskId,
    beforePhotoUrl: task.beforePhotoUrl,
    afterPhotoUrl: task.afterPhotoUrl,
    status: task.status,
    beforeConstructedUrl: getImageUrl(beforePhoto),
    afterConstructedUrl: getImageUrl(afterPhoto)
  });

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-4 space-y-4">

      {/* HEADER */}
      <div className="bg-white border rounded-xl p-4">
        <div className="font-semibold">{task.taskId}</div>
        <div className="text-sm text-gray-500 mt-1">Status: {task.status}</div>
      </div>

      {/* LAYOUT IMAGE */}
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
          <div>
            <img
              src={getImageUrl(beforePhoto)}
              className="w-full h-48 object-cover rounded-lg border"
              alt="before"
              onError={(e) => {
                console.log('Before image failed to load:', e.target.src);
                console.log('Raw beforePhotoUrl:', beforePhoto);
                e.target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Before image loaded successfully');
              }}
            />
            <div className="text-xs text-gray-500 mt-1">
              URL: {getImageUrl(beforePhoto)}
            </div>
          </div>
        ) : (
          <div className="text-gray-400">Not uploaded</div>
        )}
      </div>

      {/* AFTER PHOTO */}
      <div className="bg-white border rounded-xl p-4">
        <div className="font-semibold mb-2">After Photo</div>
        {afterPhoto ? (
          <div>
            <img
              src={getImageUrl(afterPhoto)}
              className="w-full h-48 object-cover rounded-lg border"
              alt="after"
              onError={(e) => {
                console.log('After image failed to load:', e.target.src);
                console.log('Raw afterPhotoUrl:', afterPhoto);
                e.target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('After image loaded successfully');
              }}
            />
            <div className="text-xs text-gray-500 mt-1">
              URL: {getImageUrl(afterPhoto)}
            </div>
          </div>
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