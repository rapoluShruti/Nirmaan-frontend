import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { 
  LayoutGrid, Map as MapIcon, List, ArrowLeft, Search, 
  CheckCircle2, Clock, HardHat, Users, AlertTriangle, MapPin
} from 'lucide-react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- CUSTOM MARKER CONFIG ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/**
 * COMPONENT: ProjectDashboard (Integrated as an Overlay)
 */
const ProjectDashboardOverlay = ({ id, onBack }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // const res = await fetch(`http://2026ost:2026/api/projects/${id}`);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`);
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

  if (loading) return (
    <div className="h-full flex items-center justify-center bg-white z-[2001]">
      <div className="flex flex-col items-center gap-4 font-bold text-slate-600">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p>Syncing Site Data...</p>
      </div>
    </div>
  );

  if (!project) return null;

  return (
    <div className="absolute inset-0 z-[2000] bg-[#f1f5f9] overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#1a1d23] text-white shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">{project.name}</h1>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-red-400" /> {project.typeOfConstruction}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-12 gap-6 pb-20">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-[11px] font-black text-slate-400 uppercase mb-2">Budget</p>
              <p className="text-2xl font-bold">₹{project.budget?.toLocaleString()}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-[11px] font-black text-slate-400 uppercase mb-2">Completion</p>
              <p className="text-2xl font-bold">64%</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-[11px] font-black text-slate-400 uppercase mb-2">Attendance</p>
              <p className="text-2xl font-bold">42/50</p>
            </div>
          </div>

          <section className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold mb-6 flex items-center gap-2"><MapIcon size={18}/> Blueprints</h3>
            <div className="grid grid-cols-2 gap-4">
              {project.layoutImages?.map((img, idx) => (
                <img key={idx} src={img} className="rounded-xl aspect-video object-cover" alt="site layout" />
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl text-white"><HardHat size={20}/></div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Engineer</p>
                <p className="font-bold">{project.engineer || "Unassigned"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500 rounded-xl text-white"><Users size={20}/></div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Supervisor</p>
                <p className="font-bold">{project.supervisor || "Unassigned"}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/**
 * MAIN COMPONENT: Map + List Toggle View
 */
export default function ProjectsView() {
  const [projects, setProjects] = useState([]);
  const [viewMode, setViewMode] = useState("map"); 
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // fetch("http://2026ost:2026/api/projects")
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : data.projects || []))
      .catch(err => console.error(err));
  }, []);

  const filteredProjects = projects.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden relative">
      
      {/* 1. PROJECT DASHBOARD OVERLAY */}
      {activeProjectId && (
        <ProjectDashboardOverlay 
          id={activeProjectId} 
          onBack={() => setActiveProjectId(null)} 
        />
      )}

      {/* 2. MAIN INTERFACE */}
      <div className="flex-1 flex flex-col h-full">
        
        {/* TOP BAR WITH TOGGLE */}
        <header className="h-16 bg-[#1a1d23] text-white flex items-center justify-between px-6 z-[1001] shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutGrid size={18} />
            </div>
            <h1 className="font-bold text-lg tracking-tight">Site Command Center</h1>
          </div>

          <div className="flex bg-gray-800 p-1 rounded-xl border border-gray-700">
            <button 
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'map' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <MapIcon size={14} /> Map
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List size={14} /> List
            </button>
          </div>
        </header>

        {/* VIEW AREA */}
        <div className="flex-1 relative">
          {viewMode === "map" ? (
            /* MAP VIEW */
            <MapContainer center={[19.07, 72.88]} zoom={5} className="h-full w-full z-0">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredProjects.map((p) => (
                <Marker 
                  key={p._id || p.projectId} 
                  position={[p.location?.latitude || 19.07, p.location?.longitude || 72.88]}
                  eventHandlers={{ click: () => setActiveProjectId(p._id || p.projectId) }}
                >
                  <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                    <div className="p-1 font-bold">{p.name}</div>
                  </Tooltip>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            /* LIST VIEW */
            <div className="p-8 max-w-7xl mx-auto w-full h-full overflow-y-auto">
              <div className="mb-8 relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search site projects..." 
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                {filteredProjects.map(project => (
                  <div 
                    key={project._id || project.projectId}
                    onClick={() => setActiveProjectId(project._id || project.projectId)}
                    className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
                  >
                    <div className="aspect-video rounded-3xl overflow-hidden mb-5 bg-slate-100 relative shadow-inner">
                        <img 
                          src={Array.isArray(project.layoutImages) ? project.layoutImages[0] : project.layoutImages} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          alt="project"
                        />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-800 text-xl tracking-tight leading-none">{project.name}</h3>
                        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1">
                          <MapPin size={14} className="text-red-400" /> {project.typeOfConstruction}
                        </p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-md">ACTIVE</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}