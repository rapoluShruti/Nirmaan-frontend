// import { useEffect, useState } from "react";
// import api from "../api/axiosConfig";




// const CATEGORY_OPTIONS = [
//   "Electrical",
//   "Plumbing",
//   "Civil",
//   "Painting",
//   "Other",
// ];

// // ✅ single source of truth for reset
// const initialFormState = {
//   description: "",
//   voiceNoteUrl: "",
//   materialsRequired: "",
//   isRisky: false,
//   startDate: "",
//   endDate: "",
//   priority: "Medium",
//   assignedSupervisor: "",
// };

// export default function CreateTaskForm({
//   project,
//   layoutImage,
//   coordinates,
//   onTaskCreated, // callback from parent
// }) {
//   const [form, setForm] = useState(initialFormState);
//   const [categories, setCategories] = useState([]);
//   const [supervisors, setSupervisors] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // =========================
//   // FETCH SUPERVISORS (BACKEND-CORRECT)
//   // =========================
//   useEffect(() => {
//     if (!project) return;

//     async function fetchSupervisors() {
//       try {
//         const res = await api.get(
//           `/projects/${project.projectId}/assignable-supervisors`
//         );

//         setSupervisors(res.data.supervisors || []);
//       } catch (err) {
//         console.error("Failed to load supervisors", err);
//         setSupervisors([]);
//       }
//     }

//     fetchSupervisors();
//   }, [project]);

//   // =========================
//   // CATEGORY HANDLERS
//   // =========================
//   const addCategory = () => {
//     setCategories((prev) => [
//       ...prev,
//       {
//         name: "",
//         isCustom: false,
//         customName: "",
//         workersRequired: 1,
//       },
//     ]);
//   };

//   const updateCategory = (index, updates) => {
//     setCategories((prev) => {
//       const copy = [...prev];
//       copy[index] = { ...copy[index], ...updates };
//       return copy;
//     });
//   };

//   // =========================
//   // SUBMIT TASK
//   // =========================
//   const submitTask = async () => {
//     // frontend validation
//     if (
//       !form.voiceNoteUrl ||
//       !form.description ||
//       !form.startDate ||
//       !form.endDate ||
//       !form.assignedSupervisor ||
//       categories.length === 0
//     ) {
//       alert("Please fill all required fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       await api.post("/tasks", {
//         projectId: project.projectId,
//         layoutImage,
//         coordinates,
//         categories: categories.map((c) => ({
//           name: c.isCustom ? c.customName : c.name,
//           workersRequired: c.workersRequired,
//         })),
//         materialsRequired: form.materialsRequired
//           ? form.materialsRequired.split(",").map((m) => m.trim())
//           : [],
//         isRisky: form.isRisky,
//         startDate: form.startDate,
//         endDate: form.endDate,
//         priority: form.priority,
//         assignedSupervisor: form.assignedSupervisor,
//         description: form.description,
//         voiceNoteUrl: form.voiceNoteUrl,
//       });

//       alert("Task created successfully");

//       // ✅ RESET ALL STATE
//       setForm(initialFormState);
//       setCategories([]);

//       // ✅ INFORM PARENT TO CLEAR COORDINATES / MARKER
//       if (onTaskCreated) {
//         onTaskCreated();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Task creation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // RENDER
//   // =========================
//   return (
//     <div className="border rounded p-4 space-y-4 bg-white">
//       <h3 className="text-lg font-semibold">Create Task</h3>

//       {/* Voice Note */}
//       <input
//         className="w-full border p-2 rounded"
//         placeholder="Voice note URL (required)"
//         value={form.voiceNoteUrl}
//         onChange={(e) =>
//           setForm({ ...form, voiceNoteUrl: e.target.value })
//         }
//       />

//       {/* Description */}
//       <textarea
//         className="w-full border p-2 rounded"
//         placeholder="Task description (required)"
//         value={form.description}
//         onChange={(e) =>
//           setForm({ ...form, description: e.target.value })
//         }
//       />

//       {/* Categories */}
//       <div className="space-y-2">
//         <div className="flex justify-between items-center">
//           <span className="font-medium">Categories</span>
//           <button
//             type="button"
//             onClick={addCategory}
//             className="border px-3 py-1 rounded"
//           >
//             + Add
//           </button>
//         </div>

//         {categories.map((cat, idx) => (
//           <div key={idx} className="flex gap-2">
//             <select
//               className="border p-2 rounded"
//               value={cat.name}
//               onChange={(e) =>
//                 updateCategory(idx, {
//                   name: e.target.value,
//                   isCustom: e.target.value === "Other",
//                 })
//               }
//             >
//               <option value="">Select</option>
//               {CATEGORY_OPTIONS.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>

//             {cat.isCustom && (
//               <input
//                 className="border p-2 rounded"
//                 placeholder="Custom category"
//                 value={cat.customName}
//                 onChange={(e) =>
//                   updateCategory(idx, {
//                     customName: e.target.value,
//                   })
//                 }
//               />
//             )}

//             <input
//               type="number"
//               min="1"
//               className="border p-2 rounded w-24"
//               value={cat.workersRequired}
//               onChange={(e) =>
//                 updateCategory(idx, {
//                   workersRequired: Number(e.target.value),
//                 })
//               }
//             />
//           </div>
//         ))}
//       </div>

//       {/* Materials */}
//       <input
//         className="w-full border p-2 rounded"
//         placeholder="Materials (comma separated)"
//         value={form.materialsRequired}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             materialsRequired: e.target.value,
//           })
//         }
//       />

//       {/* Dates */}
//       <div className="flex gap-2">
//         <input
//           type="date"
//           className="border p-2 rounded w-full"
//           value={form.startDate}
//           onChange={(e) =>
//             setForm({ ...form, startDate: e.target.value })
//           }
//         />
//         <input
//           type="date"
//           className="border p-2 rounded w-full"
//           value={form.endDate}
//           onChange={(e) =>
//             setForm({ ...form, endDate: e.target.value })
//           }
//         />
//       </div>

//       {/* Priority */}
//       <select
//         className="border p-2 rounded w-full"
//         value={form.priority}
//         onChange={(e) =>
//           setForm({ ...form, priority: e.target.value })
//         }
//       >
//         <option>Low</option>
//         <option>Medium</option>
//         <option>High</option>
//         <option>Critical</option>
//       </select>

//       {/* Supervisor */}
//       <select
//         className="border p-2 rounded w-full"
//         value={form.assignedSupervisor}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             assignedSupervisor: e.target.value,
//           })
//         }
//       >
//         <option value="">Select Supervisor</option>
//         {supervisors.map((s) => (
//           <option key={s._id} value={s._id}>
//             {s.name}
//           </option>
//         ))}
//       </select>

//       {/* Risk */}
//       <label className="flex items-center gap-2 text-sm">
//         <input
//           type="checkbox"
//           checked={form.isRisky}
//           onChange={(e) =>
//             setForm({ ...form, isRisky: e.target.checked })
//           }
//         />
//         Risky task
//       </label>

//       {/* Submit */}
//       <button
//         onClick={submitTask}
//         disabled={loading}
//         className="bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
//       >
//         {loading ? "Creating..." : "Create Task"}
//       </button>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const CATEGORY_OPTIONS = ["Electrical", "Plumbing", "Civil", "Painting", "Other"];

const initialFormState = {
  description: "",
  voiceNoteUrl: "",
  materialsRequired: "",
  isRisky: false,
  startDate: "",
  endDate: "",
  priority: "Medium",
  assignedSupervisor: "",
};

export default function CreateTaskForm({ project, layoutImage, coordinates, onTaskCreated, onClose }) {
  const [form, setForm] = useState(initialFormState);
  const [categories, setCategories] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project) return;
    async function fetchSupervisors() {
      try {
        const res = await api.get(`/projects/${project.projectId}/assignable-supervisors`);
        setSupervisors(res.data.supervisors || []);
      } catch (err) {
        console.error("Failed to load supervisors", err);
        setSupervisors([]);
      }
    }
    fetchSupervisors();
  }, [project]);

  const addCategory = () => {
    setCategories((prev) => [...prev, { name: "", isCustom: false, customName: "", workersRequired: 1 }]);
  };

  const updateCategory = (index, updates) => {
    setCategories((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updates };
      return copy;
    });
  };

  const submitTask = async () => {
    if (!form.voiceNoteUrl || !form.description || !form.startDate || !form.endDate || !form.assignedSupervisor || categories.length === 0) {
      alert("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/tasks", {
        projectId: project.projectId,
        layoutImage,
        coordinates,
        categories: categories.map((c) => ({
          name: c.isCustom ? c.customName : c.name,
          workersRequired: c.workersRequired,
        })),
        materialsRequired: form.materialsRequired ? form.materialsRequired.split(",").map((m) => m.trim()) : [],
        isRisky: form.isRisky,
        startDate: form.startDate,
        endDate: form.endDate,
        priority: form.priority,
        assignedSupervisor: form.assignedSupervisor,
        description: form.description,
        voiceNoteUrl: form.voiceNoteUrl,
      });
      alert("Task created successfully");
      setForm(initialFormState);
      setCategories([]);
      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      console.error(err);
      alert("Task creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden">
      {/* Modal Header */}
      <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Add Task</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl transition-colors">&times;</button>
      </div>

      <div className="p-8 max-h-[75vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Supervisor Selection */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Supervisor</label>
            <select
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={form.assignedSupervisor}
              onChange={(e) => setForm({ ...form, assignedSupervisor: e.target.value })}
            >
              <option value="">Select Supervisor</option>
              {supervisors.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>

          {/* Voice Note URL */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Voice Note URL</label>
            <input
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              placeholder="https://..."
              value={form.voiceNoteUrl}
              onChange={(e) => setForm({ ...form, voiceNoteUrl: e.target.value })}
            />
          </div>

          {/* Start Date */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Start Date</label>
            <input
              type="date"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>

          {/* End Date */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">End Date</label>
            <input
              type="date"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>
        </div>

        {/* Categories Section - Cleaned up */}
        <div className="mb-8 p-6 bg-orange-50/50 rounded-2xl border border-orange-100">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-gray-700">Labor Categories</span>
            <button
              type="button"
              onClick={addCategory}
              className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-full transition-all"
            >
              + Add Category
            </button>
          </div>

          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-wrap gap-3 mb-3 animate-in slide-in-from-top-1">
              <select
                className="flex-1 min-w-[120px] bg-white border border-gray-200 rounded-lg p-2 text-xs outline-none"
                value={cat.name}
                onChange={(e) => updateCategory(idx, { name: e.target.value, isCustom: e.target.value === "Other" })}
              >
                <option value="">Select Category</option>
                {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>

              {cat.isCustom && (
                <input
                  className="flex-1 bg-white border border-gray-200 rounded-lg p-2 text-xs"
                  placeholder="Custom name"
                  value={cat.customName}
                  onChange={(e) => updateCategory(idx, { customName: e.target.value })}
                />
              )}

              <input
                type="number"
                min="1"
                className="w-20 bg-white border border-gray-200 rounded-lg p-2 text-xs"
                value={cat.workersRequired}
                onChange={(e) => updateCategory(idx, { workersRequired: Number(e.target.value) })}
              />
            </div>
          ))}
        </div>

        {/* Description & Materials */}
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Description</label>
            <textarea
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm h-24 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
              placeholder="Describe the task details..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${form.isRisky ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={form.isRisky}
                  onChange={(e) => setForm({ ...form, isRisky: e.target.checked })}
                />
                {form.isRisky && <span className="text-white text-[10px]">✓</span>}
              </div>
              <span className="text-sm font-medium text-gray-600">High Risk Task</span>
            </label>

            <div className="flex-1">
               <input
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="Materials Required (comma separated)"
                value={form.materialsRequired}
                onChange={(e) => setForm({ ...form, materialsRequired: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="px-8 py-6 border-t border-gray-100 flex gap-4 bg-gray-50/50">
        <button
          onClick={onClose}
          className="flex-1 bg-white border border-gray-200 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all shadow-sm"
        >
          Cancel
        </button>
        <button
          onClick={submitTask}
          disabled={loading}
          className="flex-1 bg-orange-600 py-3 rounded-xl font-bold text-white hover:bg-orange-700 disabled:opacity-50 transition-all shadow-lg shadow-orange-100"
        >
          {loading ? "Processing..." : "Create Task"}
        </button>
      </div>
    </div>
  );
}