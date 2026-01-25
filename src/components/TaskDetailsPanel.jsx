
// // // // import { useState } from "react";
// // // // import api from "../api/axiosConfig";

// // // // export default function TaskDetailsPanel({ task, onActionDone }) {
// // // //   const [beforeFile, setBeforeFile] = useState(null);
// // // //   const [afterUrl, setAfterUrl] = useState("");
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState("");

// // // //   if (!task) {
// // // //     return (
// // // //       <div className="h-full flex items-center justify-center text-gray-400">
// // // //         👈 Select task
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const startTask = async () => {
// // // //     if (!beforeFile) {
// // // //       setError("Upload photo first");
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError("");

// // // //     try {
// // // //       const fd = new FormData();
// // // //       fd.append("beforePhoto", beforeFile);
// // // //       await api.post(`/tasks/${task._id}/start`, fd);
// // // //       onActionDone();
// // // //     } catch {
// // // //       setError("Could not start task");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const completeTask = async () => {
// // // //     if (!afterUrl) {
// // // //       setError("Enter photo link");
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError("");

// // // //     try {
// // // //       await api.post(`/tasks/${task._id}/complete`, {
// // // //         afterPhotoUrl: afterUrl,
// // // //       });
// // // //       onActionDone();
// // // //     } catch {
// // // //       setError("Could not complete task");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const statusText =
// // // //     task.overdue
// // // //       ? "❌ OVERDUE"
// // // //       : task.beforePhotoUrl && !task.afterPhotoUrl
// // // //       ? "🟡 WORK GOING ON"
// // // //       : task.afterPhotoUrl
// // // //       ? "✅ COMPLETED"
// // // //       : "🟠 NOT STARTED";

// // // //   const statusColor =
// // // //     task.overdue
// // // //       ? "bg-red-100 text-red-700"
// // // //       : task.afterPhotoUrl
// // // //       ? "bg-green-100 text-green-700"
// // // //       : "bg-orange-100 text-orange-700";

// // // //   return (
// // // //     <div className="space-y-4 text-sm">

// // // //       {/* TASK HEADER */}
// // // //       <div className="border rounded-lg p-3 bg-white">
// // // //         <div className="text-xs text-gray-500">Task ID</div>
// // // //         <div className="font-bold">{task.taskId}</div>

// // // //         <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
// // // //           {statusText}
// // // //         </div>

// // // //         {task.overdue && (
// // // //           <div className="mt-1 text-red-600 font-semibold">
// // // //             ⏰ Late by {task.overdueDays} days
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* WHAT TO DO */}
// // // //       <div className="border rounded-lg p-3 bg-white">
// // // //         <div className="font-semibold mb-1">📝 Work Details</div>
// // // //         <div>{task.description || "No description"}</div>
// // // //       </div>

// // // //       {/* BASIC INFO */}
// // // //       <div className="border rounded-lg p-3 bg-white space-y-2">
// // // //         <div>📅 Start Date: <b>{task.startDate?.slice(0, 10) || "—"}</b></div>
// // // //         <div>📅 End Date: <b>{task.endDate?.slice(0, 10) || "—"}</b></div>
// // // //         <div>⚠ Risk Work: <b>{task.isRisky ? "YES" : "NO"}</b></div>
// // // //         <div>🔥 Priority: <b>{task.priority}</b></div>
// // // //       </div>

// // // //       {/* CATEGORIES */}
// // // //       {task.categories?.length > 0 && (
// // // //         <div className="border rounded-lg p-3 bg-white">
// // // //           <div className="font-semibold mb-2">👷 Workers Needed</div>
// // // //           {task.categories.map((c, i) => (
// // // //             <div key={i}>
// // // //               • {c.isCustom ? c.customName : c.name} — <b>{c.workersRequired}</b>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}

// // // //       {/* MATERIALS */}
// // // //       {task.materialsRequired?.length > 0 && (
// // // //         <div className="border rounded-lg p-3 bg-white">
// // // //           <div className="font-semibold mb-2">🧱 Materials</div>
// // // //           {task.materialsRequired.map((m, i) => (
// // // //             <div key={i}>• {m}</div>
// // // //           ))}
// // // //         </div>
// // // //       )}

// // // //       {/* VOICE NOTE */}
// // // //       {task.voiceNoteUrl && (
// // // //         <div className="border rounded-lg p-3 bg-white">
// // // //           <div className="font-semibold mb-2">🎤 Voice Message</div>
// // // //           <audio controls src={`http://localhost:2026${task.voiceNoteUrl}`} className="w-full" />
// // // //         </div>
// // // //       )}

// // // //       {/* ERROR */}
// // // //       {error && (
// // // //         <div className="bg-red-100 text-red-700 p-2 rounded">
// // // //           {error}
// // // //         </div>
// // // //       )}

// // // //       {/* ACTION AREA */}
// // // //       <div className="border rounded-lg p-3 bg-white space-y-3">

// // // //         {!task.beforePhotoUrl && (
// // // //           <>
// // // //             <div className="font-semibold">📸 Take Before Photo</div>
// // // //             <input type="file" onChange={(e) => setBeforeFile(e.target.files[0])} />
// // // //             <button
// // // //               disabled={loading}
// // // //               onClick={startTask}
// // // //               className="w-full py-2 bg-orange-500 text-white rounded-lg text-base font-bold"
// // // //             >
// // // //               START WORK
// // // //             </button>
// // // //           </>
// // // //         )}

// // // //         {task.beforePhotoUrl && !task.afterPhotoUrl && (
// // // //           <>
// // // //             <div className="font-semibold">📸 Upload After Photo</div>
// // // //             <input
// // // //               placeholder="Paste photo link"
// // // //               value={afterUrl}
// // // //               onChange={(e) => setAfterUrl(e.target.value)}
// // // //               className="border px-2 py-2 w-full"
// // // //             />
// // // //             <button
// // // //               disabled={loading}
// // // //               onClick={completeTask}
// // // //               className="w-full py-2 bg-green-600 text-white rounded-lg text-base font-bold"
// // // //             >
// // // //               FINISH WORK
// // // //             </button>
// // // //           </>
// // // //         )}
// // // //       </div>

// // // //     </div>
// // // //   );
// // // // }
// // // import { useState } from "react";
// // // import api from "../api/axiosConfig";

// // // export default function TaskDetailsPanel({ task, onActionDone }) {
// // //   const [beforeFile, setBeforeFile] = useState(null);
// // //   const [afterUrl, setAfterUrl] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");

// // //   if (!task) {
// // //     return (
// // //       <div className="h-full flex items-center justify-center text-gray-400 text-sm">
// // //         👈 Select a task to view details
// // //       </div>
// // //     );
// // //   }

// // //   /* ================= ACTIONS ================= */

// // //   const startTask = async () => {
// // //     if (!beforeFile) {
// // //       setError("Upload before photo first");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setError("");

// // //     try {
// // //       const fd = new FormData();
// // //       fd.append("beforePhoto", beforeFile);
// // //       await api.post(`/tasks/${task._id}/start`, fd);
// // //       onActionDone();
// // //     } catch {
// // //       setError("Could not start task");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const completeTask = async () => {
// // //     if (!afterUrl) {
// // //       setError("Enter after photo link");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setError("");

// // //     try {
// // //       await api.post(`/tasks/${task._id}/complete`, {
// // //         afterPhotoUrl: afterUrl,
// // //       });
// // //       onActionDone();
// // //     } catch {
// // //       setError("Could not complete task");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   /* ================= STATUS ================= */

// // //   const statusText =
// // //     task.overdue
// // //       ? "Overdue"
// // //       : task.beforePhotoUrl && !task.afterPhotoUrl
// // //       ? "In Progress"
// // //       : task.afterPhotoUrl
// // //       ? "Completed"
// // //       : "Not Started";

// // //   const statusColor =
// // //     task.overdue
// // //       ? "bg-red-100 text-red-700"
// // //       : task.afterPhotoUrl
// // //       ? "bg-green-100 text-green-700"
// // //       : task.beforePhotoUrl
// // //       ? "bg-blue-100 text-blue-700"
// // //       : "bg-gray-100 text-gray-700";

// // //   /* ================= UI ================= */

// // //   return (
// // //     <div className="h-full overflow-y-auto p-4 space-y-4 text-sm bg-gray-50">

// // //       {/* ================= TASK HEADER ================= */}
// // //       <div className="bg-white rounded-xl border p-4 space-y-2">
// // //         <div className="flex items-center justify-between">
// // //           <div className="font-semibold text-base">
// // //             {task.title || task.taskId}
// // //           </div>
// // //           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
// // //             {statusText}
// // //           </span>
// // //         </div>

// // //         <div className="text-xs text-gray-500 space-y-1">
// // //           <div>
// // //             <b>Assigned Area:</b> {task.assignedArea || "General"}
// // //           </div>
// // //           <div>
// // //             <b>Scheduled:</b>{" "}
// // //             {task.startDate?.slice(0, 10) || "—"}
// // //           </div>
// // //           <div>
// // //             <b>Engineer:</b> {task.engineerName || "—"}
// // //           </div>
// // //         </div>

// // //         {task.overdue && (
// // //           <div className="text-xs text-red-600 font-semibold">
// // //             Late by {task.overdueDays} days
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* ================= ACTION BUTTONS ================= */}
// // //       <div className="bg-white rounded-xl border p-3 grid grid-cols-2 gap-3">
// // //         <button
// // //           className="bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
// // //           disabled={loading || task.afterPhotoUrl}
// // //         >
// // //           Mark Progress
// // //         </button>

// // //         <button
// // //           className="border py-2 rounded-lg font-semibold"
// // //           disabled={loading}
// // //         >
// // //           Add Photo
// // //         </button>

// // //         <button
// // //           className="col-span-2 border py-2 rounded-lg font-semibold"
// // //         >
// // //           Log Update
// // //         </button>
// // //       </div>

// // //       {/* ================= WORK DETAILS ================= */}
// // //       <div className="bg-white rounded-xl border p-4 space-y-2">
// // //         <div className="font-semibold">Work Details</div>
// // //         <div className="text-gray-700">
// // //           {task.description || "No description provided"}
// // //         </div>
// // //       </div>

// // //       {/* ================= WORKERS ================= */}
// // //       {task.categories?.length > 0 && (
// // //         <div className="bg-white rounded-xl border p-4 space-y-2">
// // //           <div className="font-semibold">Workers Required</div>
// // //           {task.categories.map((c, i) => (
// // //             <div key={i} className="flex justify-between text-gray-700">
// // //               <span>
// // //                 {c.isCustom ? c.customName : c.name}
// // //               </span>
// // //               <b>{c.workersRequired}</b>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {/* ================= MATERIALS ================= */}
// // //       {task.materialsRequired?.length > 0 && (
// // //         <div className="bg-white rounded-xl border p-4 space-y-2">
// // //           <div className="font-semibold">Materials</div>
// // //           {task.materialsRequired.map((m, i) => (
// // //             <div key={i} className="text-gray-700">
// // //               • {m}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {/* ================= VOICE NOTE ================= */}
// // //       {task.voiceNoteUrl && (
// // //         <div className="bg-white rounded-xl border p-4 space-y-2">
// // //           <div className="font-semibold">Voice Note</div>
// // //           <audio
// // //             controls
// // //             src={`http://localhost:2026${task.voiceNoteUrl}`}
// // //             className="w-full"
// // //           />
// // //         </div>
// // //       )}

// // //       {/* ================= ERROR ================= */}
// // //       {error && (
// // //         <div className="bg-red-100 text-red-700 p-3 rounded-lg">
// // //           {error}
// // //         </div>
// // //       )}

// // //       {/* ================= START / COMPLETE ================= */}
// // //       <div className="bg-white rounded-xl border p-4 space-y-3">

// // //         {!task.beforePhotoUrl && (
// // //           <>
// // //             <div className="font-semibold">Before Photo</div>
// // //             <input
// // //               type="file"
// // //               onChange={(e) => setBeforeFile(e.target.files[0])}
// // //               className="text-xs"
// // //             />
// // //             <button
// // //               disabled={loading}
// // //               onClick={startTask}
// // //               className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
// // //             >
// // //               Start Work
// // //             </button>
// // //           </>
// // //         )}

// // //         {task.beforePhotoUrl && !task.afterPhotoUrl && (
// // //           <>
// // //             <div className="font-semibold">After Photo</div>
// // //             <input
// // //               placeholder="Paste photo link"
// // //               value={afterUrl}
// // //               onChange={(e) => setAfterUrl(e.target.value)}
// // //               className="border px-3 py-2 rounded-lg w-full text-sm"
// // //             />
// // //             <button
// // //               disabled={loading}
// // //               onClick={completeTask}
// // //               className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
// // //             >
// // //               Finish Work
// // //             </button>
// // //           </>
// // //         )}

// // //       </div>

// // //     </div>
// // //   );
// // // }
// // import { useState } from "react";
// // import api from "../api/axiosConfig";

// // export default function TaskDetailsPanel({ task, onActionDone }) {
// //   const [beforeFile, setBeforeFile] = useState(null);
// //  const [afterFile, setAfterFile] = useState(null);

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   if (!task) {
// //     return (
// //       <div className="h-full flex items-center justify-center text-gray-400 text-sm">
// //         👈 Select a task to view details
// //       </div>
// //     );
// //   }

// //   /* ================= LOCK STATE ================= */
// // const isLocked = task.isLocked === true;


// //   /* ================= ACTIONS ================= */

// //   const startTask = async () => {
// //     if (!beforeFile) {
// //       setError("Upload before photo first");
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

// //  const completeTask = async () => {
// //   if (!afterFile) {
// //     setError("Upload after photo");
// //     return;
// //   }

// //   setLoading(true);
// //   setError("");

// //   try {
// //     const fd = new FormData();
// //     fd.append("afterPhoto", afterFile);

// //     await api.post(`/tasks/${task._id}/complete`, fd, {
// //       headers: { "Content-Type": "multipart/form-data" },
// //     });

// //     onActionDone();
// //   } catch {
// //     setError("Could not complete task");
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   /* ================= STATUS ================= */

// //   const statusText =
// //     task.overdue
// //       ? "Overdue"
// //       : isLocked
// //       ? "Completed"
// //       : task.beforePhotoUrl
// //       ? "In Progress"
// //       : "Not Started";

// //   const statusColor =
// //     task.overdue
// //       ? "bg-red-100 text-red-700"
// //       : isLocked
// //       ? "bg-green-100 text-green-700"
// //       : task.beforePhotoUrl
// //       ? "bg-blue-100 text-blue-700"
// //       : "bg-gray-100 text-gray-700";

// //   /* ================= UI ================= */

// //   return (
// //     <div className="h-full overflow-y-auto p-4 space-y-4 text-sm bg-gray-50">

// //       {/* ================= TASK HEADER ================= */}
// //       <div className="bg-white rounded-xl border p-4 space-y-2">
// //         <div className="flex items-center justify-between">
// //           <div className="font-semibold text-base">
// //             {task.title || task.taskId}
// //           </div>
// //           <span
// //             className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
// //           >
// //             {statusText}
// //           </span>
// //         </div>

// //         <div className="text-xs text-gray-500 space-y-1">
// //           <div><b>Task ID:</b> {task.taskId}</div>
// //           <div><b>Assigned Area:</b> {task.assignedArea || "General"}</div>
// //           <div><b>Engineer:</b> {task.engineerName || "—"}</div>
// //           <div><b>Start Date:</b> {task.startDate?.slice(0, 10) || "—"}</div>
// //           <div><b>End Date:</b> {task.endDate?.slice(0, 10) || "—"}</div>
// //         </div>

// //         {task.overdue && (
// //           <div className="text-xs text-red-600 font-semibold">
// //             Late by {task.overdueDays} days
// //           </div>
// //         )}
// //       </div>

// //       {/* ================= ACTION BUTTONS ================= */}
// //       <div className="bg-white rounded-xl border p-3 grid grid-cols-2 gap-3">

// //         <button
// //           className="bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
// //           disabled={loading || isLocked}
// //         >
// //           Mark Progress
// //         </button>

// //         <button
// //           className="border py-2 rounded-lg font-semibold disabled:opacity-50"
// //           disabled={loading || isLocked}
// //         >
// //           Add Photo
// //         </button>

// //         <button
// //           className="col-span-2 border py-2 rounded-lg font-semibold disabled:opacity-50"
// //           disabled={loading || isLocked}
// //         >
// //           Log Update
// //         </button>

// //         {isLocked && (
// //           <div className="col-span-2 text-xs text-green-700 font-semibold">
// //             🔒 TASK LOCKED
// //             <div className="font-normal text-gray-500">
// //               If you think this is an error, contact owner.
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* ================= WORK DESCRIPTION ================= */}
// //       <div className="bg-white rounded-xl border p-4 space-y-2">
// //         <div className="font-semibold">Work Description</div>
// //         <div className="text-gray-700">
// //           {task.description || "No description provided"}
// //         </div>
// //       </div>

// //       {/* ================= WORKERS ================= */}
// //       {task.categories?.length > 0 && (
// //         <div className="bg-white rounded-xl border p-4 space-y-2">
// //           <div className="font-semibold">Workers Required</div>
// //           {task.categories.map((c, i) => (
// //             <div key={i} className="flex justify-between text-gray-700">
// //               <span>{c.isCustom ? c.customName : c.name}</span>
// //               <b>{c.workersRequired}</b>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* ================= MATERIALS ================= */}
// //       {task.materialsRequired?.length > 0 && (
// //         <div className="bg-white rounded-xl border p-4 space-y-2">
// //           <div className="font-semibold">Materials Required</div>
// //           {task.materialsRequired.map((m, i) => (
// //             <div key={i} className="text-gray-700">
// //               • {m}
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* ================= VOICE NOTE ================= */}
// //       {task.voiceNoteUrl && (
// //         <div className="bg-white rounded-xl border p-4 space-y-2">
// //           <div className="font-semibold">Voice Note</div>
// //           <audio
// //             controls
// //             // src={`http://localhost:2026${task.voiceNoteUrl}`}
// //             src={`${import.meta.env.VITE_BACKEND_URL}${task.voiceNoteUrl}`}

// //             className="w-full"
// //           />
// //         </div>
// //       )}

// //       {/* ================= ERROR ================= */}
// //       {error && (
// //         <div className="bg-red-100 text-red-700 p-3 rounded-lg">
// //           {error}
// //         </div>
// //       )}

// //       {/* ================= START / COMPLETE ================= */}
// //       <div className="bg-white rounded-xl border p-4 space-y-3">

// //         {!task.beforePhotoUrl && (
// //           <>
// //             <div className="font-semibold">Before Photo</div>
// //             <input
// //               type="file"
// //               disabled={isLocked}
// //               onChange={(e) => setBeforeFile(e.target.files[0])}
// //               className="text-xs disabled:opacity-50"
// //             />
// //             <button
// //               disabled={loading || isLocked}
// //               onClick={startTask}
// //               className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
// //             >
// //               Start Work
// //             </button>
// //           </>
// //         )}

// //       {task.beforePhotoUrl && !task.afterPhotoUrl && (
// //   <>
// //     <div className="font-semibold">After Photo</div>
// //     <input
// //       type="file"
// //       disabled={isLocked}
// //       onChange={(e) => setAfterFile(e.target.files[0])}
// //       className="text-xs disabled:opacity-50"
// //     />
// //     <button
// //       disabled={loading || isLocked}
// //       onClick={completeTask}
// //       className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
// //     >
// //       Finish Work
// //     </button>
// //   </>
// // )}


// //       </div>

// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import api from "../api/axiosConfig";

// export default function TaskDetailsPanel({ task, onActionDone }) {
//   const [beforeFile, setBeforeFile] = useState(null);
//   const [afterFile, setAfterFile] = useState(null);

//   const [riskVideoFile, setRiskVideoFile] = useState(null);
//   const [requestSent, setRequestSent] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   if (!task) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-400 text-sm">
//         👈 Select a task to view details
//       </div>
//     );
//   }

//   const isLocked = task.isLocked === true;

//   const isHighRisk = task.isHighRisk === true;
//   const otpVerified =
//     task.highRiskOtpVerified === true ||
//     localStorage.getItem(`HIGH_RISK_UNLOCK_${task._id}`) === "true";

//   useEffect(() => {
//     const sent = localStorage.getItem(`HIGH_RISK_REQUEST_SENT_${task._id}`) === "true";
//     setRequestSent(sent);
//   }, [task._id]);

//   const startTask = async () => {
//     if (!beforeFile) {
//       setError("Upload before photo first");
//       return;
//     }

//     if (isHighRisk && !otpVerified) {
//       setError("High-risk task requires manager OTP approval before starting.");
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
//     if (!afterFile) {
//       setError("Upload after photo");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const fd = new FormData();
//       fd.append("afterPhoto", afterFile);

//       await api.post(`/tasks/${task._id}/complete`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       onActionDone();
//     } catch {
//       setError("Could not complete task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ High risk request send (dummy queue)
//   const sendHighRiskRequest = async () => {
//     if (!riskVideoFile) {
//       setError("Upload safety video first");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const videoUrl = URL.createObjectURL(riskVideoFile);

//       const requestObj = {
//         _id: `${task._id}_${Date.now()}`,
//         taskId: task._id,
//         taskName: task.title || task.taskId,
//         reason: "High-risk task detected. Supervisor requested safety clearance.",
//         supervisorName: "Site Supervisor",
//         createdAt: Date.now(),
//         status: "PENDING",
//         videoUrl,
//       };

//       localStorage.setItem(
//         `HIGH_RISK_REQUEST_${requestObj._id}`,
//         JSON.stringify(requestObj)
//       );

//       localStorage.setItem(`HIGH_RISK_REQUEST_SENT_${task._id}`, "true");

//       setRequestSent(true);
//       alert("Request sent to Manager ✅ (demo)");
//     } catch {
//       setError("Could not send request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusText = task.overdue
//     ? "Overdue"
//     : isLocked
//     ? "Completed"
//     : task.beforePhotoUrl
//     ? "In Progress"
//     : "Not Started";

//   const statusColor = task.overdue
//     ? "bg-red-100 text-red-700"
//     : isLocked
//     ? "bg-green-100 text-green-700"
//     : task.beforePhotoUrl
//     ? "bg-blue-100 text-blue-700"
//     : "bg-gray-100 text-gray-700";

//   return (
//     <div className="h-full overflow-y-auto p-4 space-y-4 text-sm bg-gray-50">
//       {/* HEADER */}
//       <div className="bg-white rounded-xl border p-4 space-y-2">
//         <div className="flex items-center justify-between">
//           <div className="font-semibold text-base">{task.title || task.taskId}</div>
//           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
//             {statusText}
//           </span>
//         </div>

//         <div className="text-xs text-gray-500 space-y-1">
//           <div>
//             <b>Task ID:</b> {task.taskId}
//           </div>
//           <div>
//             <b>Assigned Area:</b> {task.assignedArea || "General"}
//           </div>
//           <div>
//             <b>Start Date:</b> {task.startDate?.slice(0, 10) || "—"}
//           </div>
//           <div>
//             <b>End Date:</b> {task.endDate?.slice(0, 10) || "—"}
//           </div>
//         </div>

//         {isHighRisk && (
//           <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3">
//             <p className="text-xs font-semibold text-red-700">HIGH RISK TASK</p>
//             <p className="text-[11px] text-red-700 mt-1">
//               Safety clearance required before work start.
//             </p>
//             <p className="text-[11px] text-gray-600 mt-1">
//               OTP Verified:{" "}
//               <span className={`font-bold ${otpVerified ? "text-green-700" : "text-red-600"}`}>
//                 {otpVerified ? "YES" : "NO"}
//               </span>
//             </p>
//           </div>
//         )}
//       </div>

//       {/* ERROR */}
//       {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>}

//       {/* HIGH RISK REQUEST FLOW */}
//       {isHighRisk && !otpVerified && !task.beforePhotoUrl && (
//         <div className="bg-white rounded-xl border p-4 space-y-3">
//           <div className="font-semibold text-sm">Safety Clearance Request</div>

//           {!requestSent ? (
//             <>
//               <p className="text-xs text-gray-600">
//                 Upload short safety video evidence and send request to Manager for OTP approval.
//               </p>

//               <input
//                 type="file"
//                 accept="video/*"
//                 disabled={loading || isLocked}
//                 onChange={(e) => setRiskVideoFile(e.target.files?.[0])}
//                 className="text-xs"
//               />

//               <button
//                 disabled={loading || isLocked}
//                 onClick={sendHighRiskRequest}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
//               >
//                 Send Request to Manager
//               </button>
//             </>
//           ) : (
//             <div className="text-xs text-gray-700">
//               ✅ Request already sent. Waiting for manager OTP approval...
//               <div className="mt-2 text-[11px] text-gray-500">
//                 (Once approved, refresh page / re-open task.)
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* START / COMPLETE */}
//       <div className="bg-white rounded-xl border p-4 space-y-3">
//         {!task.beforePhotoUrl && otpVerified && (
//           <>
//             <div className="font-semibold">Before Photo</div>
//             <input
//               type="file"
//               disabled={isLocked}
//               onChange={(e) => setBeforeFile(e.target.files[0])}
//               className="text-xs disabled:opacity-50"
//             />
//             <button
//               disabled={loading || isLocked}
//               onClick={startTask}
//               className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
//             >
//               Start Work
//             </button>
//           </>
//         )}

//         {task.beforePhotoUrl && !task.afterPhotoUrl && (
//           <>
//             <div className="font-semibold">After Photo</div>
//             <input
//               type="file"
//               disabled={isLocked}
//               onChange={(e) => setAfterFile(e.target.files[0])}
//               className="text-xs disabled:opacity-50"
//             />
//             <button
//               disabled={loading || isLocked}
//               onClick={completeTask}
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
//             >
//               Finish Work
//             </button>
//           </>
//         )}

//         {isHighRisk && !otpVerified && !task.beforePhotoUrl && (
//           <div className="text-[11px] text-gray-500">
//             Start Work is locked until Manager approves and OTP is verified.
//           </div>
//         )}
//       </div>

//       {/* VOICE NOTE */}
//       {task.voiceNoteUrl && (
//         <div className="bg-white rounded-xl border p-4 space-y-2">
//           <div className="font-semibold">Voice Note</div>
//           <audio
//             controls
//             src={`${import.meta.env.VITE_BACKEND_URL}${task.voiceNoteUrl}`}
//             className="w-full"
//           />
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import api from "../api/axiosConfig";

/**
 * TaskDetailsPanel
 * view="supervisor" | "manager"
 *
 * Supervisor Flow:
 * - If high risk AND not otpVerified => show Send Request + upload Video
 * - After manager approves + OTP verified => show BEFORE photo + start work
 * - Finish work => AFTER photo
 *
 * Manager Flow:
 * - Manager only views safety request data (video preview) in their own screen logic
 * - Here we keep it neutral for both roles
 */

const SESSION_KEYS = {
  SAFETY_REQUESTS: "ps02_safety_requests", // { [taskId]: { status, videoUrl, note, otpVerified, requestedAt, approvedAt } }
  SAFETY_OTPS: "ps02_safety_otps", // { [taskId]: { otp, createdAt } }
};

const loadSessionObj = (key) => {
  try {
    return JSON.parse(sessionStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
};

const saveSessionObj = (key, obj) => {
  sessionStorage.setItem(key, JSON.stringify(obj || {}));
};

export default function TaskDetailsPanel({ task, onActionDone, view = "supervisor", onSafetyStateChanged }) {
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);

  // safety request video
  const [safetyVideoFile, setSafetyVideoFile] = useState(null);

  // otp
  const [otpInput, setOtpInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [localSafetyState, setLocalSafetyState] = useState({
    requestExists: false,
    requestStatus: null,
    otp: null,
    otpVerified: false,
    safetyVideoUrl: null,
  });

  const taskId = task?._id;

  const refreshLocalSafety = () => {
    if (!taskId) return;

    const reqs = loadSessionObj(SESSION_KEYS.SAFETY_REQUESTS);
    const otps = loadSessionObj(SESSION_KEYS.SAFETY_OTPS);

    const req = reqs?.[taskId];
    const otpRec = otps?.[taskId];

    setLocalSafetyState({
      requestExists: !!req,
      requestStatus: req?.status || null,
      otp: otpRec?.otp || null,
      otpVerified: req?.otpVerified === true,
      safetyVideoUrl: req?.videoUrl || null,
    });
  };

  useEffect(() => {
    refreshLocalSafety();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  const isLocked = task?.isLocked === true;

  const isHighRisk = task?.isHighRisk === true;

  const needsSafetyApproval = isHighRisk && localSafetyState.otpVerified !== true;

  // ====== START/COMPLETE TASK (existing logic) ======

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

      await api.post(`/tasks/${task._id}/start`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onActionDone?.();
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

      onActionDone?.();
    } catch {
      setError("Could not complete task");
    } finally {
      setLoading(false);
    }
  };

  // ====== SAFETY REQUEST FLOW (supervisor) ======
  const sendSafetyRequest = async () => {
    if (!taskId) return;

    if (!safetyVideoFile) {
      setError("Upload safety video first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // dummy upload simulation
      // In hackathon we just store local object URL
      const videoUrl = URL.createObjectURL(safetyVideoFile);

      const reqs = loadSessionObj(SESSION_KEYS.SAFETY_REQUESTS);

      reqs[taskId] = {
        status: "PENDING",
        requestedAt: Date.now(),
        otpVerified: false,
        videoUrl,
        note: "Supervisor reported: High risk indicators visible near work zone.",
      };

      saveSessionObj(SESSION_KEYS.SAFETY_REQUESTS, reqs);

      refreshLocalSafety();
      onSafetyStateChanged?.(taskId);

      alert("Safety Request Sent to Manager (Demo).");
    } catch {
      setError("Failed to send safety request");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = () => {
    if (!taskId) return;

    const otps = loadSessionObj(SESSION_KEYS.SAFETY_OTPS);
    const reqs = loadSessionObj(SESSION_KEYS.SAFETY_REQUESTS);

    const otpRec = otps?.[taskId];
    const req = reqs?.[taskId];

    if (!req || !otpRec) {
      setError("OTP not generated by Manager yet");
      return;
    }

    if (String(otpInput).trim() !== String(otpRec.otp)) {
      setError("OTP incorrect. Try again.");
      return;
    }

    // mark verified
    reqs[taskId] = {
      ...(reqs[taskId] || {}),
      otpVerified: true,
      otpVerifiedAt: Date.now(),
      status: "APPROVED",
    };

    saveSessionObj(SESSION_KEYS.SAFETY_REQUESTS, reqs);

    setOtpInput("");
    setError("");

    refreshLocalSafety();
    onSafetyStateChanged?.(taskId);

    alert("Safety OTP Verified ✅ Supervisor can start work now (Demo).");
  };

  // ====== STATUS UI ======
  const statusText = task?.overdue
    ? "Overdue"
    : isLocked
    ? "Completed"
    : task?.beforePhotoUrl
    ? "In Progress"
    : "Not Started";

  const statusColor = task?.overdue
    ? "bg-red-100 text-red-700"
    : isLocked
    ? "bg-green-100 text-green-700"
    : task?.beforePhotoUrl
    ? "bg-blue-100 text-blue-700"
    : "bg-gray-100 text-gray-700";

  if (!task) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        Select a task to view details
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4 text-sm bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-xl border p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-base">{task.title || task.taskId}</div>

          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
            {statusText}
          </span>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <div>
            <b>Task ID:</b> {task.taskId}
          </div>
          <div>
            <b>Assigned Area:</b> {task.assignedArea || "General"}
          </div>
          <div>
            <b>Engineer:</b> {task.engineerName || "—"}
          </div>
          <div>
            <b>Start Date:</b> {task.startDate?.slice(0, 10) || "—"}
          </div>
          <div>
            <b>End Date:</b> {task.endDate?.slice(0, 10) || "—"}
          </div>
        </div>

        {isHighRisk && (
          <div className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg p-2">
            HIGH RISK TASK: Safety approval required before start.
          </div>
        )}
      </div>

      {/* Error */}
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>}

      {/* ====== HIGH RISK SAFETY GATE (SUPERVISOR) ====== */}
      {view === "supervisor" && needsSafetyApproval && (
        <div className="bg-white rounded-xl border border-red-200 p-4 space-y-3">
          <div className="font-semibold text-red-700">Safety Approval Required</div>

          {!localSafetyState.requestExists && (
            <>
              <div className="text-xs text-gray-600">
                Upload safety video evidence and send request to Manager. After approval, OTP will be generated.
              </div>

              <div>
                <div className="text-xs font-semibold mb-1">Upload Safety Video</div>
                <input
                  type="file"
                  accept="video/*"
                  disabled={isLocked || loading}
                  onChange={(e) => setSafetyVideoFile(e.target.files?.[0] || null)}
                  className="text-xs disabled:opacity-50"
                />
              </div>

              <button
                type="button"
                onClick={sendSafetyRequest}
                disabled={loading || isLocked}
                className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                Send Request to Manager
              </button>
            </>
          )}

          {localSafetyState.requestExists && localSafetyState.requestStatus === "PENDING" && (
            <div className="text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded p-2">
              Request sent. Waiting for Manager approval + OTP...
            </div>
          )}

          {localSafetyState.requestExists && localSafetyState.requestStatus === "APPROVED" && !localSafetyState.otpVerified && (
            <>
              <div className="text-xs bg-green-50 border border-green-200 text-green-800 rounded p-2">
                Manager approved. Enter OTP to unlock “Start Work”.
              </div>

              <div className="flex gap-2">
                <input
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="flex-1 px-3 py-2 border rounded text-sm"
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold text-sm"
                >
                  Verify
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ====== NORMAL START/COMPLETE (Only if unlocked) ====== */}
      <div className="bg-white rounded-xl border p-4 space-y-3">
        {/* BEFORE */}
        {!task.beforePhotoUrl && (
          <>
            {/* if high risk and otp not verified -> block before */}
            {view === "supervisor" && needsSafetyApproval ? (
              <div className="text-xs text-gray-600">
                Before Photo upload locked until Safety OTP verification.
              </div>
            ) : (
              <>
                <div className="font-semibold">Before Photo</div>
                <input
                  type="file"
                  disabled={isLocked || loading}
                  onChange={(e) => setBeforeFile(e.target.files?.[0] || null)}
                  className="text-xs disabled:opacity-50"
                />
                <button
                  type="button"
                  disabled={loading || isLocked}
                  onClick={startTask}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  Start Work
                </button>
              </>
            )}
          </>
        )}

        {/* AFTER */}
        {task.beforePhotoUrl && !task.afterPhotoUrl && (
          <>
            <div className="font-semibold">After Photo</div>
            <input
              type="file"
              disabled={isLocked || loading}
              onChange={(e) => setAfterFile(e.target.files?.[0] || null)}
              className="text-xs disabled:opacity-50"
            />
            <button
              type="button"
              disabled={loading || isLocked}
              onClick={completeTask}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              Finish Work
            </button>
          </>
        )}

        {task.afterPhotoUrl && (
          <div className="text-xs bg-green-50 border border-green-200 text-green-800 rounded p-2">
            Task completed successfully.
          </div>
        )}
      </div>

      {/* Voice Note */}
      {task.voiceNoteUrl && (
        <div className="bg-white rounded-xl border p-4 space-y-2">
          <div className="font-semibold">Voice Note</div>
          <audio controls src={`${import.meta.env.VITE_BACKEND_URL}${task.voiceNoteUrl}`} className="w-full" />
        </div>
      )}
    </div>
  );
}
