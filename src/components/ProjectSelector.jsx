// import { useEffect, useState } from "react";
// import api from "../api/axiosConfig";

// export default function ProjectSelector({ onSelect }) {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchProjects() {
//       try {
//         const res = await api.get("/projects");

//         let projectList = [];
//         if (Array.isArray(res.data)) {
//           projectList = res.data;
//         } else if (Array.isArray(res.data.projects)) {
//           projectList = res.data.projects;
//         } else {
//           throw new Error("Invalid projects response");
//         }

//         setProjects(projectList);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load projects");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProjects();
//   }, []);

//   if (loading) return <p>Loading projects…</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="space-y-2">
//       <label className="text-sm font-medium">Select Project</label>

//       <select
//         className="w-full border rounded p-2"
//         defaultValue=""
//         onChange={(e) => {
//           const selected = projects.find(
//             (p) => p.projectId === e.target.value
//           );
//           onSelect(selected || null);
//         }}
//       >
//         <option value="" disabled>
//           -- Choose a project --
//         </option>

//         {projects.map((p) => (
//           <option key={p.projectId} value={p.projectId}>
//             {p.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function ProjectSelector({ onSelect }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await api.get("/projects");
        const list = Array.isArray(res.data) ? res.data : (res.data.projects || []);
        setProjects(list);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <select 
      disabled={loading}
      onChange={(e) => {
        const p = projects.find(proj => proj.projectId === e.target.value);
        onSelect(p || null);
      }}
      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs font-bold text-gray-700 focus:ring-2 focus:ring-[#f27420] outline-none cursor-pointer"
    >
      <option value="">{loading ? "Loading..." : "-- Switch Project --"}</option>
      {projects.map((p) => (
        <option key={p.projectId} value={p.projectId}>{p.name}</option>
      ))}
    </select>
  );
}