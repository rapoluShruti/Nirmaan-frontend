
// // import { useState } from "react";
// // import api from "../api/axiosConfig";

// // export default function TaskDetailsPanel({ task, onActionDone }) {
// //   const [beforeFile, setBeforeFile] = useState(null);
// //   const [afterUrl, setAfterUrl] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   if (!task) {
// //     return (
// //       <div className="h-full flex items-center justify-center text-gray-400">
// //         👈 Select task
// //       </div>
// //     );
// //   }

// //   const startTask = async () => {
// //     if (!beforeFile) {
// //       setError("Upload photo first");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");

// //     try {
// //       const fd = new FormData();
// //       fd.append("beforePhoto", beforeFile);
// //       await api.post(`/tasks/${task._id}/start`, fd);
// //       onActionDone();
// //     } catch {
// //       setError("Could not start task");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const completeTask = async () => {
// //     if (!afterUrl) {
// //       setError("Enter photo link");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");

// //     try {
// //       await api.post(`/tasks/${task._id}/complete`, {
// //         afterPhotoUrl: afterUrl,
// //       });
// //       onActionDone();
// //     } catch {
// //       setError("Could not complete task");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const statusText =
// //     task.overdue
// //       ? "❌ OVERDUE"
// //       : task.beforePhotoUrl && !task.afterPhotoUrl
// //       ? "🟡 WORK GOING ON"
// //       : task.afterPhotoUrl
// //       ? "✅ COMPLETED"
// //       : "🟠 NOT STARTED";

// //   const statusColor =
// //     task.overdue
// //       ? "bg-red-100 text-red-700"
// //       : task.afterPhotoUrl
// //       ? "bg-green-100 text-green-700"
// //       : "bg-orange-100 text-orange-700";

// //   return (
// //     <div className="space-y-4 text-sm">

// //       {/* TASK HEADER */}
// //       <div className="border rounded-lg p-3 bg-white">
// //         <div className="text-xs text-gray-500">Task ID</div>
// //         <div className="font-bold">{task.taskId}</div>

// //         <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
// //           {statusText}
// //         </div>

// //         {task.overdue && (
// //           <div className="mt-1 text-red-600 font-semibold">
// //             ⏰ Late by {task.overdueDays} days
// //           </div>
// //         )}
// //       </div>

// //       {/* WHAT TO DO */}
// //       <div className="border rounded-lg p-3 bg-white">
// //         <div className="font-semibold mb-1">📝 Work Details</div>
// //         <div>{task.description || "No description"}</div>
// //       </div>

// //       {/* BASIC INFO */}
// //       <div className="border rounded-lg p-3 bg-white space-y-2">
// //         <div>📅 Start Date: <b>{task.startDate?.slice(0, 10) || "—"}</b></div>
// //         <div>📅 End Date: <b>{task.endDate?.slice(0, 10) || "—"}</b></div>
// //         <div>⚠ Risk Work: <b>{task.isRisky ? "YES" : "NO"}</b></div>
// //         <div>🔥 Priority: <b>{task.priority}</b></div>
// //       </div>

// //       {/* CATEGORIES */}
// //       {task.categories?.length > 0 && (
// //         <div className="border rounded-lg p-3 bg-white">
// //           <div className="font-semibold mb-2">👷 Workers Needed</div>
// //           {task.categories.map((c, i) => (
// //             <div key={i}>
// //               • {c.isCustom ? c.customName : c.name} — <b>{c.workersRequired}</b>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* MATERIALS */}
// //       {task.materialsRequired?.length > 0 && (
// //         <div className="border rounded-lg p-3 bg-white">
// //           <div className="font-semibold mb-2">🧱 Materials</div>
// //           {task.materialsRequired.map((m, i) => (
// //             <div key={i}>• {m}</div>
// //           ))}
// //         </div>
// //       )}

// //       {/* VOICE NOTE */}
// //       {task.voiceNoteUrl && (
// //         <div className="border rounded-lg p-3 bg-white">
// //           <div className="font-semibold mb-2">🎤 Voice Message</div>
// //           <audio controls src={`http://localhost:2026${task.voiceNoteUrl}`} className="w-full" />
// //         </div>
// //       )}

// //       {/* ERROR */}
// //       {error && (
// //         <div className="bg-red-100 text-red-700 p-2 rounded">
// //           {error}
// //         </div>
// //       )}

// //       {/* ACTION AREA */}
// //       <div className="border rounded-lg p-3 bg-white space-y-3">

// //         {!task.beforePhotoUrl && (
// //           <>
// //             <div className="font-semibold">📸 Take Before Photo</div>
// //             <input type="file" onChange={(e) => setBeforeFile(e.target.files[0])} />
// //             <button
// //               disabled={loading}
// //               onClick={startTask}
// //               className="w-full py-2 bg-orange-500 text-white rounded-lg text-base font-bold"
// //             >
// //               START WORK
// //             </button>
// //           </>
// //         )}

// //         {task.beforePhotoUrl && !task.afterPhotoUrl && (
// //           <>
// //             <div className="font-semibold">📸 Upload After Photo</div>
// //             <input
// //               placeholder="Paste photo link"
// //               value={afterUrl}
// //               onChange={(e) => setAfterUrl(e.target.value)}
// //               className="border px-2 py-2 w-full"
// //             />
// //             <button
// //               disabled={loading}
// //               onClick={completeTask}
// //               className="w-full py-2 bg-green-600 text-white rounded-lg text-base font-bold"
// //             >
// //               FINISH WORK
// //             </button>
// //           </>
// //         )}
// //       </div>

// //     </div>
// //   );
// // }
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
//         👈 Select a task to view details
//       </div>
//     );
//   }

//   /* ================= ACTIONS ================= */

//   const startTask = async () => {
//     if (!beforeFile) {
//       setError("Upload before photo first");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const fd = new FormData();
//       fd.append("beforePhoto", beforeFile);
//       await api.post(`/tasks/${task._id}/start`, fd);
//       onActionDone();
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

//     setLoading(true);
//     setError("");

//     try {
//       await api.post(`/tasks/${task._id}/complete`, {
//         afterPhotoUrl: afterUrl,
//       });
//       onActionDone();
//     } catch {
//       setError("Could not complete task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= STATUS ================= */

//   const statusText =
//     task.overdue
//       ? "Overdue"
//       : task.beforePhotoUrl && !task.afterPhotoUrl
//       ? "In Progress"
//       : task.afterPhotoUrl
//       ? "Completed"
//       : "Not Started";

//   const statusColor =
//     task.overdue
//       ? "bg-red-100 text-red-700"
//       : task.afterPhotoUrl
//       ? "bg-green-100 text-green-700"
//       : task.beforePhotoUrl
//       ? "bg-blue-100 text-blue-700"
//       : "bg-gray-100 text-gray-700";

//   /* ================= UI ================= */

//   return (
//     <div className="h-full overflow-y-auto p-4 space-y-4 text-sm bg-gray-50">

//       {/* ================= TASK HEADER ================= */}
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
//           <div>
//             <b>Assigned Area:</b> {task.assignedArea || "General"}
//           </div>
//           <div>
//             <b>Scheduled:</b>{" "}
//             {task.startDate?.slice(0, 10) || "—"}
//           </div>
//           <div>
//             <b>Engineer:</b> {task.engineerName || "—"}
//           </div>
//         </div>

//         {task.overdue && (
//           <div className="text-xs text-red-600 font-semibold">
//             Late by {task.overdueDays} days
//           </div>
//         )}
//       </div>

//       {/* ================= ACTION BUTTONS ================= */}
//       <div className="bg-white rounded-xl border p-3 grid grid-cols-2 gap-3">
//         <button
//           className="bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
//           disabled={loading || task.afterPhotoUrl}
//         >
//           Mark Progress
//         </button>

//         <button
//           className="border py-2 rounded-lg font-semibold"
//           disabled={loading}
//         >
//           Add Photo
//         </button>

//         <button
//           className="col-span-2 border py-2 rounded-lg font-semibold"
//         >
//           Log Update
//         </button>
//       </div>

//       {/* ================= WORK DETAILS ================= */}
//       <div className="bg-white rounded-xl border p-4 space-y-2">
//         <div className="font-semibold">Work Details</div>
//         <div className="text-gray-700">
//           {task.description || "No description provided"}
//         </div>
//       </div>

//       {/* ================= WORKERS ================= */}
//       {task.categories?.length > 0 && (
//         <div className="bg-white rounded-xl border p-4 space-y-2">
//           <div className="font-semibold">Workers Required</div>
//           {task.categories.map((c, i) => (
//             <div key={i} className="flex justify-between text-gray-700">
//               <span>
//                 {c.isCustom ? c.customName : c.name}
//               </span>
//               <b>{c.workersRequired}</b>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ================= MATERIALS ================= */}
//       {task.materialsRequired?.length > 0 && (
//         <div className="bg-white rounded-xl border p-4 space-y-2">
//           <div className="font-semibold">Materials</div>
//           {task.materialsRequired.map((m, i) => (
//             <div key={i} className="text-gray-700">
//               • {m}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ================= VOICE NOTE ================= */}
//       {task.voiceNoteUrl && (
//         <div className="bg-white rounded-xl border p-4 space-y-2">
//           <div className="font-semibold">Voice Note</div>
//           <audio
//             controls
//             src={`http://localhost:2026${task.voiceNoteUrl}`}
//             className="w-full"
//           />
//         </div>
//       )}

//       {/* ================= ERROR ================= */}
//       {error && (
//         <div className="bg-red-100 text-red-700 p-3 rounded-lg">
//           {error}
//         </div>
//       )}

//       {/* ================= START / COMPLETE ================= */}
//       <div className="bg-white rounded-xl border p-4 space-y-3">

//         {!task.beforePhotoUrl && (
//           <>
//             <div className="font-semibold">Before Photo</div>
//             <input
//               type="file"
//               onChange={(e) => setBeforeFile(e.target.files[0])}
//               className="text-xs"
//             />
//             <button
//               disabled={loading}
//               onClick={startTask}
//               className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
//             >
//               Start Work
//             </button>
//           </>
//         )}

//         {task.beforePhotoUrl && !task.afterPhotoUrl && (
//           <>
//             <div className="font-semibold">After Photo</div>
//             <input
//               placeholder="Paste photo link"
//               value={afterUrl}
//               onChange={(e) => setAfterUrl(e.target.value)}
//               className="border px-3 py-2 rounded-lg w-full text-sm"
//             />
//             <button
//               disabled={loading}
//               onClick={completeTask}
//               className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
//             >
//               Finish Work
//             </button>
//           </>
//         )}

//       </div>

//     </div>
//   );
// }
import { useState } from "react";
import api from "../api/axiosConfig";

export default function TaskDetailsPanel({ task, onActionDone }) {
  const [beforeFile, setBeforeFile] = useState(null);
 const [afterFile, setAfterFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!task) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        👈 Select a task to view details
      </div>
    );
  }

  /* ================= LOCK STATE ================= */
const isLocked = task.isLocked === true;


  /* ================= ACTIONS ================= */

  const startTask = async () => {
    if (!beforeFile) {
      setError("Upload before photo first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("beforePhoto", beforeFile);
      await api.post(`/tasks/${task._id}/start`, fd);
      onActionDone();
    } catch {
      setError("Could not start task");
    } finally {
      setLoading(false);
    }
  };

 const completeTask = async () => {
  if (!afterFile) {
    setError("Upload after photo");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const fd = new FormData();
    fd.append("afterPhoto", afterFile);

    await api.post(`/tasks/${task._id}/complete`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    onActionDone();
  } catch {
    setError("Could not complete task");
  } finally {
    setLoading(false);
  }
};


  /* ================= STATUS ================= */

  const statusText =
    task.overdue
      ? "Overdue"
      : isLocked
      ? "Completed"
      : task.beforePhotoUrl
      ? "In Progress"
      : "Not Started";

  const statusColor =
    task.overdue
      ? "bg-red-100 text-red-700"
      : isLocked
      ? "bg-green-100 text-green-700"
      : task.beforePhotoUrl
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-700";

  /* ================= UI ================= */

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4 text-sm bg-gray-50">

      {/* ================= TASK HEADER ================= */}
      <div className="bg-white rounded-xl border p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-base">
            {task.title || task.taskId}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
          >
            {statusText}
          </span>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <div><b>Task ID:</b> {task.taskId}</div>
          <div><b>Assigned Area:</b> {task.assignedArea || "General"}</div>
          <div><b>Engineer:</b> {task.engineerName || "—"}</div>
          <div><b>Start Date:</b> {task.startDate?.slice(0, 10) || "—"}</div>
          <div><b>End Date:</b> {task.endDate?.slice(0, 10) || "—"}</div>
        </div>

        {task.overdue && (
          <div className="text-xs text-red-600 font-semibold">
            Late by {task.overdueDays} days
          </div>
        )}
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="bg-white rounded-xl border p-3 grid grid-cols-2 gap-3">

        <button
          className="bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
          disabled={loading || isLocked}
        >
          Mark Progress
        </button>

        <button
          className="border py-2 rounded-lg font-semibold disabled:opacity-50"
          disabled={loading || isLocked}
        >
          Add Photo
        </button>

        <button
          className="col-span-2 border py-2 rounded-lg font-semibold disabled:opacity-50"
          disabled={loading || isLocked}
        >
          Log Update
        </button>

        {isLocked && (
          <div className="col-span-2 text-xs text-green-700 font-semibold">
            🔒 TASK LOCKED
            <div className="font-normal text-gray-500">
              If you think this is an error, contact owner.
            </div>
          </div>
        )}
      </div>

      {/* ================= WORK DESCRIPTION ================= */}
      <div className="bg-white rounded-xl border p-4 space-y-2">
        <div className="font-semibold">Work Description</div>
        <div className="text-gray-700">
          {task.description || "No description provided"}
        </div>
      </div>

      {/* ================= WORKERS ================= */}
      {task.categories?.length > 0 && (
        <div className="bg-white rounded-xl border p-4 space-y-2">
          <div className="font-semibold">Workers Required</div>
          {task.categories.map((c, i) => (
            <div key={i} className="flex justify-between text-gray-700">
              <span>{c.isCustom ? c.customName : c.name}</span>
              <b>{c.workersRequired}</b>
            </div>
          ))}
        </div>
      )}

      {/* ================= MATERIALS ================= */}
      {task.materialsRequired?.length > 0 && (
        <div className="bg-white rounded-xl border p-4 space-y-2">
          <div className="font-semibold">Materials Required</div>
          {task.materialsRequired.map((m, i) => (
            <div key={i} className="text-gray-700">
              • {m}
            </div>
          ))}
        </div>
      )}

      {/* ================= VOICE NOTE ================= */}
      {task.voiceNoteUrl && (
        <div className="bg-white rounded-xl border p-4 space-y-2">
          <div className="font-semibold">Voice Note</div>
          <audio
            controls
            // src={`http://localhost:2026${task.voiceNoteUrl}`}
            src={`${import.meta.env.VITE_BACKEND_URL}${task.voiceNoteUrl}`}

            className="w-full"
          />
        </div>
      )}

      {/* ================= ERROR ================= */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* ================= START / COMPLETE ================= */}
      <div className="bg-white rounded-xl border p-4 space-y-3">

        {!task.beforePhotoUrl && (
          <>
            <div className="font-semibold">Before Photo</div>
            <input
              type="file"
              disabled={isLocked}
              onChange={(e) => setBeforeFile(e.target.files[0])}
              className="text-xs disabled:opacity-50"
            />
            <button
              disabled={loading || isLocked}
              onClick={startTask}
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              Start Work
            </button>
          </>
        )}

      {task.beforePhotoUrl && !task.afterPhotoUrl && (
  <>
    <div className="font-semibold">After Photo</div>
    <input
      type="file"
      disabled={isLocked}
      onChange={(e) => setAfterFile(e.target.files[0])}
      className="text-xs disabled:opacity-50"
    />
    <button
      disabled={loading || isLocked}
      onClick={completeTask}
      className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
    >
      Finish Work
    </button>
  </>
)}


      </div>

    </div>
  );
}
