// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function ProjectDashboard() {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/projects/${id}`);
//         if (!res.ok) throw new Error("Project not found");
//         const data = await res.json();
//         setProject(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProject();
//   }, [id]);

//   if (loading) return <p className="text-center mt-4">Loading project...</p>;
//   if (!project) return <p className="text-center mt-4 text-red-500">Project not found!</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
//       <div className="space-y-2 text-gray-700">
//         <p>
//           <strong>Budget:</strong> ₹{project.budget.toLocaleString()}
//         </p>
//         <p>
//           <strong>Engineer:</strong> {project.engineer || "N/A"}
//         </p>
//         <p>
//           <strong>Supervisor:</strong> {project.supervisor || "N/A"}
//         </p>
//         <p>
//           <strong>Type:</strong> {project.typeOfConstruction || "N/A"}
//         </p>
//         <p>
//           <strong>Location:</strong>{" "}
//           {project.location?.latitude?.toFixed(4)},{" "}
//           {project.location?.longitude?.toFixed(4)}
//         </p>
//         {project.layoutImages && project.layoutImages.length > 0 && (
//           <div className="mt-4">
//             <h2 className="font-semibold mb-2">Layout Images:</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//               {project.layoutImages.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt={`Layout ${idx + 1}`}
//                   className="w-full h-32 object-cover rounded shadow"
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Users, CheckCircle2, Clock, DollarSign, 
  AlertTriangle, TrendingUp, HardHat, MapPin, 
  ArrowLeft, Calendar, FileText, ChevronRight 
} from 'lucide-react';

export default function ProjectDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const formatCurrency = (amount) => {
    if (!amount) return "₹0";
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString()}`;
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="flex flex-col items-center gap-4 font-bold text-slate-600">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p>Syncing Site Data...</p>
      </div>
    </div>
  );

  if (!project) return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold">Project Not Found</h2>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Return to Map
        </button>
      </div>
    </div>
  );

  const statusColor = project.status === 'critical' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-12 font-sans">
      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full bg-[#1a1d23] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${statusColor} animate-pulse`}></span>
                <h1 className="text-lg font-bold tracking-tight">{project.name}</h1>
                <span className="text-[10px] bg-gray-700 px-2 py-0.5 rounded text-gray-400 font-mono">
                  {project._id ? project._id.slice(-6).toUpperCase() : 'SITE-X'}
                </span>
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-red-400" /> {project.typeOfConstruction} • {project.location?.latitude?.toFixed(3)}, {project.location?.longitude?.toFixed(3)}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="hidden md:flex items-center px-3 py-1.5 border border-gray-700 rounded text-xs font-medium hover:bg-gray-800 transition-all">
              <FileText className="h-4 w-4 mr-2" /> Export
            </button>
            <button className="flex items-center px-4 py-1.5 bg-blue-600 rounded text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
              Update Status
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-12 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* TOP METRICS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Total Budget</p>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(project.budget)}</p>
              <div className="mt-2 flex items-center text-green-600 text-xs font-bold gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Budget Healthy
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Project Completion</p>
              <p className="text-2xl font-bold text-slate-900">64%</p>
              {/* Custom Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">Daily Attendance</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold text-slate-900">42</p>
                <p className="text-sm text-slate-400 font-medium">/ 50 Laborers</p>
              </div>
              <p className="text-xs text-blue-600 mt-2 font-semibold">84% Turnout</p>
            </div>
          </div>

          {/* BLUEPRINTS SECTION */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-blue-600" /> Site Blueprints & Media
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.layoutImages?.length > 0 ? project.layoutImages.map((img, idx) => (
                <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <img src={img} alt="Layout" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              )) : (
                <div className="col-span-full py-10 text-center border-2 border-dashed rounded-xl text-slate-400 text-sm">
                  No layout images uploaded yet.
                </div>
              )}
            </div>
          </section>

          {/* LOGS SECTION */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">Recent Activity Logs</h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">View History</button>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="pb-4 border-b border-slate-100 w-full">
                  <p className="text-sm font-bold text-slate-800">Ground Floor Slab Casting</p>
                  <p className="text-xs text-slate-500 mt-1">Verified by {project.engineer} • Today, 09:45 AM</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* PERSONNEL CARD */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-sm text-slate-700">Project Management</div>
            <div className="p-4 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-inner">
                  <HardHat className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Lead Engineer</p>
                  <p className="text-sm font-bold text-slate-800">{project.engineer || "Not Assigned"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Supervisor</p>
                  <p className="text-sm font-bold text-slate-800">{project.supervisor || "Not Assigned"}</p>
                </div>
              </div>
            </div>
          </section>

          {/* BLOCKERS */}
          <section className="bg-red-50 rounded-2xl border border-red-100 p-5">
            <div className="flex items-center gap-2 mb-4 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-bold text-sm uppercase tracking-tight">Critical Blockers</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded">HIGH PRIORITY</span>
              </div>
              <p className="text-xs font-bold text-slate-800">Cement Inventory Low</p>
              <p className="text-[11px] text-slate-500 mt-1">Wing B construction may halt in 24 hours without restock.</p>
            </div>
          </section>

          {/* APPROVALS SECTION */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" /> Pending Approvals
              </h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-slate-800">Labor Wages - Week 42</p>
                  <p className="text-[10px] text-slate-500">Submitted 2h ago</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
