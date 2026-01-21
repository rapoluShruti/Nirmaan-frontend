import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Calendar, RefreshCw, User, Bell, Menu, X } from "lucide-react";

const DEMO_PROJECTS = [
  {
    id: "99526071d7c5a953371e5280",
    name: "Mumbai Demo Site",
    position: [19.07, 72.88],
    status: "CRIT",
    startDate: "2025-12-01",
    state: "Maharashtra",
    city: "Mumbai",
    summary: { delayedTasks: 5, attendance: "40%", approvalPending: true, progress: 45 },
    lastDPR: "2025-12-20",
    criticalReason: "Material Delay - Cement shipment stuck at port",
  },
  {
    id: "99529071d7c5a953371e5280",
    name: "Nashik Demo Highrise",
    position: [19.9975, 73.7898],
    status: "WARN",
    startDate: "2025-12-10",
    state: "Maharashtra",
    city: "Nashik",
    summary: { delayedTasks: 2, attendance: "60%", approvalPending: false, progress: 75 },
    lastDPR: "2025-12-22",
    criticalReason: "Low attendance affecting timeline - Workers on leave",
  },
  {
    id: "69526071d7c5a953371b5280",
    name: "Vizag Port Expansion",
    position: [17.42, 83.17],
    status: "CRIT",
    startDate: "2025-12-15",
    state: "Andhra Pradesh",
    city: "Visakhapatnam",
    summary: { delayedTasks: 8, attendance: "35%", approvalPending: true, progress: 30 },
    lastDPR: "2025-12-18",
    criticalReason: "Material shortage - Steel delivery delayed by 2 weeks",
  },
  {
    id: "demo-4",
    name: "Delhi Metro Extension",
    position: [28.7041, 77.1025],
    status: "OK",
    startDate: "2025-11-01",
    state: "Delhi",
    city: "New Delhi",
    summary: { delayedTasks: 0, attendance: "95%", approvalPending: false, progress: 85 },
    lastDPR: "2025-12-28",
    criticalReason: null,
  },
  {
    id: "demo-5",
    name: "Bangalore Tech Park",
    position: [12.9716, 77.5946],
    status: "OK",
    startDate: "2025-10-15",
    state: "Karnataka",
    city: "Bangalore",
    summary: { delayedTasks: 1, attendance: "88%", approvalPending: false, progress: 92 },
    lastDPR: "2025-12-29",
    criticalReason: null,
  },
];

const STATUS = {
  OK: { label: "On Track", color: "#10b981", count: 12 },
  WARN: { label: "Attention", color: "#f59e0b", count: 5 },
  CRIT: { label: "Critical", color: "#ef4444", count: 2 },
};

const getMarkerIcon = (status) => {
  const color = STATUS[status].color;
  const isCritical = status === "CRIT" || status === "WARN";
  
  return L.divIcon({
    html: `
      <div class="pin-marker ${isCritical ? 'pin-critical' : ''}" style="position: relative; width: 40px; height: 50px;">
        <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C11.716 0 5 6.716 5 15c0 10 15 35 15 35s15-25 15-35c0-8.284-6.716-15-15-15z" 
                fill="${color}" 
                stroke="#000000" 
                stroke-width="3"/>
          <circle cx="20" cy="15" r="7" fill="white" stroke="#000000" stroke-width="1.5"/>
        </svg>
      </div>
    `,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
    className: "custom-marker-icon",
  });
};

export default function ProjectDashboard() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("map");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    statuses: ["OK", "WARN", "CRIT"],
    startDate: "",
    endDate: "",
    state: "",
    city: "",
    search: "",
    projectDropdown: "all",
  });
  const [recentSearches] = useState([
    { id: "PRJ-2548", status: "OK" },
    { id: "Prestige Heights", status: "WARN" },
    { id: "Mumbai", status: "CRIT" },
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await
        //  fetch("http://localhost:2026/api/projects", 
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects`,
          {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        const real = data.map((p) => ({
          id: p._id,
          name: p.name,
          position: [p.location?.latitude ?? 19.07, p.location?.longitude ?? 72.88],
          status: p.status ?? "OK",
          startDate: p.startDate,
          state: p.location?.state ?? "Unknown",
          city: p.location?.city ?? "Unknown",
          summary: p.summary ?? { delayedTasks: 0, attendance: "0%", approvalPending: false, progress: 0 },
          lastDPR: p.lastDPR ?? "",
          criticalReason: p.criticalReason ?? null,
        }));
        setProjects([...real, ...DEMO_PROJECTS]);
      } catch {
        setProjects(DEMO_PROJECTS);
      }
    };
    fetchProjects();
  }, []);

  const inDateRange = (dateStr, start, end) => {
    const d = new Date(dateStr);
    if (start && d < new Date(start)) return false;
    if (end && d > new Date(end)) return false;
    return true;
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      filters.statuses.includes(p.status) &&
      inDateRange(p.startDate, filters.startDate, filters.endDate) &&
      (!filters.state || p.state === filters.state) &&
      (!filters.city || p.city === filters.city)
  );

  const states = [...new Set(projects.map((p) => p.state))];
  const cities = [...new Set(projects.filter((p) => !filters.state || p.state === filters.state).map((p) => p.city))];

  const statusCounts = {
    OK: filteredProjects.filter(p => p.status === "OK").length,
    WARN: filteredProjects.filter(p => p.status === "WARN").length,
    CRIT: filteredProjects.filter(p => p.status === "CRIT").length,
  };

  return (
    <>
      <div className="flex h-screen bg-slate-100 text-slate-900 font-sans overflow-hidden">
        
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative lg:translate-x-0 w-64 bg-white border-r-2 border-slate-300 flex flex-col z-40 shadow-xl transition-transform duration-300 h-full overflow-hidden`}>
          <div className="p-4 lg:p-5 border-b-2 border-slate-200 bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg lg:text-xl font-black text-slate-900 mb-0.5">MAP-VIEW</h1>
                <p className="text-[9px] lg:text-[10px] text-slate-700 uppercase tracking-wider font-bold">Project Inventory System</p>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-slate-200 rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-slate-900" />
              </button>
            </div>
          </div>

          <div className="px-4 lg:px-5 py-3 lg:py-4 border-b-2 border-slate-200 bg-slate-50">
            <select 
              className="w-full px-3 py-2 text-xs lg:text-sm font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
              value={filters.projectDropdown}
              onChange={(e) => setFilters({ ...filters, projectDropdown: e.target.value })}
            >
              <option value="all">All Projects</option>
              <option value="active">Active Projects</option>
              <option value="completed">Completed Projects</option>
            </select>
          </div>

          <div className="px-4 lg:px-5 py-3 lg:py-4 border-b-2 border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 text-[10px] lg:text-xs text-slate-800 mb-2 lg:mb-3 font-bold">
              <Calendar className="w-3 lg:w-3.5 h-3 lg:h-3.5" />
              <span className="font-bold">01 Nov 2025 - 2 Dec 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[10px] lg:text-xs font-black text-green-700">
                <div className="w-2 lg:w-2.5 h-2 lg:h-2.5 bg-green-600 rounded-full animate-pulse shadow-lg"></div>
                LIVE
              </span>
              <RefreshCw className="w-3 lg:w-3.5 h-3 lg:h-3.5 text-slate-600 ml-auto cursor-pointer hover:text-slate-900 hover:rotate-180 transition-all duration-300" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 lg:px-5 py-3 lg:py-4 space-y-4 lg:space-y-6 custom-scrollbar">
            <div>
              <label className="text-[9px] lg:text-[10px] font-black uppercase text-slate-700 mb-2 block tracking-wider">Global Search</label>
              <input
                placeholder="Search Project ID, Site Name, City"
                className="w-full px-3 py-2 text-xs lg:text-sm font-medium bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[9px] lg:text-[10px] font-black uppercase text-slate-700 mb-2 lg:mb-3 block tracking-wider">Recent Searches</label>
              <div className="space-y-1.5 lg:space-y-2">
                {recentSearches.map((search, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 lg:p-2 rounded-md hover:bg-slate-100 cursor-pointer transition-colors border border-slate-200">
                    <div className={`w-2 h-2 rounded-full ${search.status === 'OK' ? 'bg-green-600' : search.status === 'WARN' ? 'bg-yellow-600' : 'bg-red-600'}`}></div>
                    <span className="text-[10px] lg:text-xs font-bold text-slate-900">{search.id}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[9px] lg:text-[10px] font-black uppercase text-slate-700 mb-2 lg:mb-3 block tracking-wider">Risk Filters</label>
              <div className="space-y-2 lg:space-y-2.5">
                {Object.keys(STATUS).map((s) => (
                  <label key={s} className="flex items-center gap-2 lg:gap-3 cursor-pointer group p-2 rounded-md hover:bg-slate-100 border border-slate-200">
                    <input
                      type="checkbox"
                      className="w-4 lg:w-4.5 h-4 lg:h-4.5 border-2 border-slate-400 rounded text-orange-600 focus:ring-orange-500"
                      checked={filters.statuses.includes(s)}
                      onChange={() => setFilters(f => ({
                        ...f, statuses: f.statuses.includes(s) ? f.statuses.filter(x => x !== s) : [...f.statuses, s]
                      }))}
                    />
                    <div className="w-2.5 lg:w-3 h-2.5 lg:h-3 rounded-full border-2 border-slate-900" style={{ background: STATUS[s].color }}></div>
                    <span className="text-xs lg:text-sm font-bold text-slate-900 group-hover:text-slate-900">{STATUS[s].label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[9px] lg:text-[10px] font-black uppercase text-slate-700 mb-2 lg:mb-3 block tracking-wider">Regional Filter</label>
              <div className="space-y-2 lg:space-y-3">
                <select 
                  className="w-full px-3 py-2 text-xs lg:text-sm font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                  value={filters.state} 
                  onChange={(e) => setFilters({...filters, state: e.target.value, city: ""})}
                >
                  <option value="">All States</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select 
                  className="w-full px-3 py-2 text-xs lg:text-sm font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                  value={filters.city} 
                  onChange={(e) => setFilters({...filters, city: e.target.value})}
                >
                  <option value="">All Cities</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <button 
              onClick={() => setFilters({
                statuses: ["OK", "WARN", "CRIT"],
                startDate: "",
                endDate: "",
                state: "",
                city: "",
                search: "",
                projectDropdown: "all",
              })}
              className="w-full py-2 text-[10px] lg:text-xs font-black text-orange-700 hover:text-orange-800 transition-colors border-2 border-orange-300 rounded-md hover:bg-orange-50"
            >
              Clear Filters
            </button>
          </div>

          <div className="p-4 lg:p-5 border-t-2 border-slate-200 bg-slate-50">
            <button className="w-full flex items-center justify-center gap-2 text-[10px] lg:text-xs font-bold text-slate-800 hover:text-slate-900 transition-colors">
              <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-4 h-3 border border-slate-300" />
              <span>EN</span>
              <span className="ml-auto">›</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col bg-slate-100 w-full lg:w-auto">
          
          <header className="bg-white border-b-2 border-slate-300 px-3 lg:px-6 py-3 lg:py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2 lg:gap-4 overflow-x-auto">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-200 rounded-md transition-colors border border-slate-300"
              >
                {sidebarOpen ? <X className="w-4 lg:w-5 h-4 lg:h-5 text-slate-900" /> : <Menu className="w-4 lg:w-5 h-4 lg:h-5 text-slate-900" />}
              </button>

              <select 
                className="hidden md:block px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                value={filters.projectDropdown}
                onChange={(e) => setFilters({ ...filters, projectDropdown: e.target.value })}
              >
                <option value="all">All Projects</option>
                <option value="active">Active Projects</option>
              </select>
              
              <div className="hidden sm:flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1.5 lg:py-2 text-[10px] lg:text-xs font-bold text-slate-800 bg-slate-100 rounded-md border-2 border-slate-300 shadow-sm">
                <Calendar className="w-3 lg:w-3.5 h-3 lg:h-3.5" />
                <span className="hidden md:inline">01 Nov 2025 - 2 Dec 2026</span>
                <span className="md:hidden">Nov-Dec 2025</span>
              </div>

              <div className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1.5 lg:py-2 bg-green-100 rounded-md border-2 border-green-400">
                <div className="w-2 lg:w-2.5 h-2 lg:h-2.5 bg-green-600 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-[10px] lg:text-xs font-black text-green-800">LIVE</span>
              </div>

              <RefreshCw className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-slate-700 cursor-pointer hover:text-slate-900 hover:rotate-180 transition-all duration-300 flex-shrink-0" />
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <div className="hidden md:flex bg-slate-200 rounded-lg p-0.5 lg:p-1 border-2 border-slate-300 shadow-sm">
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-2 lg:px-4 py-1 lg:py-1.5 text-[10px] lg:text-sm font-black rounded-md transition-all ${
                    viewMode === "map" ? "bg-orange-600 text-white shadow-md border-2 border-orange-700" : "text-slate-800 hover:text-slate-900 hover:bg-slate-300"
                  }`}
                >
                  Map
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-2 lg:px-4 py-1 lg:py-1.5 text-[10px] lg:text-sm font-black rounded-md transition-all ${
                    viewMode === "table" ? "bg-orange-600 text-white shadow-md border-2 border-orange-700" : "text-slate-800 hover:text-slate-900 hover:bg-slate-300"
                  }`}
                >
                  Table
                </button>
              </div>

              <div className="flex items-center gap-2 lg:gap-3">
                <User className="w-4 lg:w-5 h-4 lg:h-5 text-slate-700 cursor-pointer hover:text-slate-900 transition-colors" />
                <div className="relative">
                  <Bell className="w-4 lg:w-5 h-4 lg:h-5 text-slate-700 cursor-pointer hover:text-slate-900 transition-colors" />
                  <div className="absolute -top-1 -right-1 w-4 lg:w-5 h-4 lg:h-5 bg-red-600 rounded-full flex items-center justify-center text-[8px] lg:text-[9px] font-black text-white border-2 border-white shadow-lg">2</div>
                </div>
              </div>
            </div>
          </header>

          <div className="md:hidden bg-white border-b-2 border-slate-300 px-3 py-2 flex gap-2 shadow-sm">
            <button
              onClick={() => setViewMode("map")}
              className={`flex-1 py-2 text-xs font-black rounded-md transition-all border-2 ${
                viewMode === "map" ? "bg-orange-600 text-white shadow-md border-orange-700" : "bg-slate-100 text-slate-800 border-slate-300"
              }`}
            >
              Map View
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex-1 py-2 text-xs font-black rounded-md transition-all border-2 ${
                viewMode === "table" ? "bg-orange-600 text-white shadow-md border-orange-700" : "bg-slate-100 text-slate-800 border-slate-300"
              }`}
            >
              Table View
            </button>
          </div>

          {viewMode === "map" ? (
            <div className="flex-1 relative">
              <MapContainer center={[20.59, 78.96]} zoom={5} className="h-full w-full" zoomControl={false}>
                <TileLayer 
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                
                {filteredProjects.map((p) => (
                  <Marker
                    key={p.id}
                    position={p.position}
                    icon={getMarkerIcon(p.status)}
                    eventHandlers={{ click: () => navigate(`/project/${p.id}`) }}
                  >
                    <Tooltip 
                      direction="top" 
                      offset={[0, -50]} 
                      opacity={1}
                      className="custom-tooltip"
                      permanent={false}
                    >
                      <div className="p-3 lg:p-4 min-w-[220px] lg:min-w-[260px] bg-white border-2 border-slate-300 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 lg:px-2.5 py-1 rounded text-[10px] lg:text-[11px] font-black uppercase border-2 ${
                            p.status === 'OK' ? 'bg-green-100 text-green-800 border-green-400' : 
                            p.status === 'WARN' ? 'bg-yellow-100 text-yellow-800 border-yellow-400' : 
                            'bg-red-100 text-red-800 border-red-400'
                          }`}>
                            {STATUS[p.status].label}
                          </span>
                        </div>
                        
                        <h3 className="text-sm lg:text-base font-black text-slate-900 mb-2">{p.name}</h3>
                        
                        <div className="space-y-1 text-xs lg:text-sm mb-2 font-bold">
                          <div className="flex justify-between">
                            <span className="text-slate-700">City:</span>
                            <span className="font-black text-slate-900">{p.city}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-700">State:</span>
                            <span className="font-black text-slate-900">{p.state}</span>
                          </div>
                        </div>

                        <div className="mb-2 pb-2 border-b-2 border-slate-300">
                          <div className="text-[10px] lg:text-xs font-black text-slate-800 uppercase mb-1.5">Summary:</div>
                          <div className="space-y-1 text-xs lg:text-sm font-bold">
                            <div className="flex justify-between">
                              <span className="text-slate-700">Progress:</span>
                              <span className="font-black text-orange-700">{p.summary.progress}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-700">Delayed Tasks:</span>
                              <span className="font-black text-red-700">{p.summary.delayedTasks}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-700">Attendance:</span>
                              <span className="font-black text-slate-900">{p.summary.attendance}</span>
                            </div>
                          </div>
                        </div>

                        {(p.status === "CRIT" || p.status === "WARN") && p.criticalReason && (
                          <div className={`mt-2 pt-2 border-t-2 ${
                            p.status === "CRIT" ? "border-red-300 bg-red-50" : "border-yellow-300 bg-yellow-50"
                          } p-2 rounded-md`}>
                            <div className={`text-[10px] lg:text-xs font-black uppercase mb-1 ${
                              p.status === "CRIT" ? "text-red-800" : "text-yellow-900"
                            }`}>
                              {p.status === "CRIT" ? "⚠ Critical Issue:" : "⚠ Warning:"}
                            </div>
                            <div className={`text-xs lg:text-sm font-bold ${
                              p.status === "CRIT" ? "text-red-900" : "text-yellow-900"
                            }`}>
                              {p.criticalReason}
                            </div>
                          </div>
                        )}
                      </div>
                    </Tooltip>

                    <Popup className="custom-popup">
                      <div className="p-3 lg:p-4 min-w-[240px] lg:min-w-[280px] bg-white">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-sm lg:text-base font-black text-slate-900 mb-0.5">{p.name}</h3>
                            <p className="text-xs lg:text-sm text-slate-700 font-bold">{p.city}</p>
                          </div>
                          <div className={`px-2 lg:px-2.5 py-1 rounded text-[10px] lg:text-xs font-black uppercase border-2 ${
                            p.status === 'OK' ? 'bg-green-100 text-green-800 border-green-400' : 
                            p.status === 'WARN' ? 'bg-yellow-100 text-yellow-800 border-yellow-400' : 
                            'bg-red-100 text-red-800 border-red-400'
                          }`}>
                            {STATUS[p.status].label}
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs lg:text-sm text-slate-700 font-bold">Progress</span>
                            <span className="text-xs lg:text-sm font-black text-slate-900">{p.summary.progress}%</span>
                          </div>
                          <div className="w-full h-2.5 lg:h-3 bg-slate-200 rounded-full overflow-hidden border-2 border-slate-300">
                            <div 
                              className="h-full bg-orange-600 rounded-full transition-all"
                              style={{ width: `${p.summary.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-1.5 mb-3 text-xs lg:text-sm font-bold">
                          <div className="flex justify-between">
                            <span className="text-slate-700">Location:</span>
                            <span className="font-black text-slate-900">{p.city}, {p.state}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-700">Last DPR:</span>
                            <span className="font-black text-slate-900">{p.lastDPR}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-700">Delayed Tasks:</span>
                            <span className="font-black text-red-700">{p.summary.delayedTasks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-700">Attendance:</span>
                            <span className="font-black text-slate-900">{p.summary.attendance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-700">Approval:</span>
                            <span className={`font-black ${p.summary.approvalPending ? 'text-yellow-700' : 'text-green-700'}`}>
                              {p.summary.approvalPending ? 'Pending' : 'Approved'}
                            </span>
                          </div>
                        </div>

                        {(p.status === "CRIT" || p.status === "WARN") && p.criticalReason && (
                          <div className={`mb-3 p-2 lg:p-2.5 rounded border-2 ${
                            p.status === "CRIT" 
                              ? "bg-red-100 border-red-400" 
                              : "bg-yellow-100 border-yellow-400"
                          }`}>
                            <div className={`text-[10px] lg:text-xs font-black uppercase mb-1 ${
                              p.status === "CRIT" ? "text-red-900" : "text-yellow-900"
                            }`}>
                              {p.status === "CRIT" ? "⚠ Critical Issue:" : "⚠ Warning:"}
                            </div>
                            <div className={`text-xs lg:text-sm font-bold ${
                              p.status === "CRIT" ? "text-red-900" : "text-yellow-900"
                            }`}>
                              {p.criticalReason}
                            </div>
                          </div>
                        )}

                        <button 
                          onClick={() => navigate(`/project/${p.id}`)}
                          className="w-full py-2 lg:py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs lg:text-sm font-black rounded-md transition-colors border-2 border-orange-700 shadow-md"
                        >
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              <div className="absolute top-4 lg:top-6 right-4 lg:right-6 bg-white rounded-lg shadow-xl border-2 border-slate-300 p-3 lg:p-4 z-[1000]">
                <div className="space-y-2 lg:space-y-3">
                  {Object.entries(STATUS).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between gap-4 lg:gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 lg:w-4 h-3 lg:h-4 rounded-full border-2 border-slate-900" style={{ background: val.color }}></div>
                        <span className="text-xs lg:text-sm font-black text-slate-900">{val.label}</span>
                      </div>
                      <span className="text-sm lg:text-base font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">{statusCounts[key]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 flex flex-col gap-2 z-[1000]">
                <button className="w-10 lg:w-12 h-10 lg:h-12 bg-white rounded-lg shadow-xl border-2 border-slate-300 flex items-center justify-center text-slate-900 hover:bg-slate-100 font-black text-xl lg:text-2xl transition-colors">+</button>
                <button className="w-10 lg:w-12 h-10 lg:h-12 bg-white rounded-lg shadow-xl border-2 border-slate-300 flex items-center justify-center text-slate-900 hover:bg-slate-100 font-black text-xl lg:text-2xl transition-colors">−</button>
                <button className="w-10 lg:w-12 h-10 lg:h-12 bg-white rounded-lg shadow-xl border-2 border-slate-300 flex items-center justify-center text-slate-900 hover:bg-slate-100 transition-colors">
                  <RefreshCw className="w-4 lg:w-5 h-4 lg:h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-3 lg:p-8">
              <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-md border-2 border-slate-300 p-4 lg:p-6 mb-4 lg:mb-6">
                  <h2 className="text-base lg:text-lg font-black text-slate-900 mb-3 lg:mb-4">Project Summary</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                    <div className="text-center p-4 lg:p-5 bg-slate-100 rounded-lg border-2 border-slate-300 shadow-sm">
                      <div className="text-3xl lg:text-4xl font-black text-slate-900">{filteredProjects.length}</div>
                      <div className="text-[10px] lg:text-xs text-slate-700 uppercase tracking-wider mt-1 font-black">Total Projects</div>
                    </div>
                    <div className="text-center p-4 lg:p-5 bg-green-100 rounded-lg border-2 border-green-400 shadow-sm">
                      <div className="text-3xl lg:text-4xl font-black text-green-800">{statusCounts.OK}</div>
                      <div className="text-[10px] lg:text-xs text-green-800 uppercase tracking-wider mt-1 font-black">On Track</div>
                    </div>
                    <div className="text-center p-4 lg:p-5 bg-yellow-100 rounded-lg border-2 border-yellow-400 shadow-sm">
                      <div className="text-3xl lg:text-4xl font-black text-yellow-800">{statusCounts.WARN}</div>
                      <div className="text-[10px] lg:text-xs text-yellow-800 uppercase tracking-wider mt-1 font-black">Attention</div>
                    </div>
                    <div className="text-center p-4 lg:p-5 bg-red-100 rounded-lg border-2 border-red-400 shadow-sm">
                      <div className="text-3xl lg:text-4xl font-black text-red-800">{statusCounts.CRIT}</div>
                      <div className="text-[10px] lg:text-xs text-red-800 uppercase tracking-wider mt-1 font-black">Critical</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md border-2 border-slate-300 overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-200 border-b-2 border-slate-300">
                      <tr>
                        <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-[10px] lg:text-xs font-black text-slate-900 uppercase tracking-wider whitespace-nowrap">Project</th>
                        <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-[10px] lg:text-xs font-black text-slate-900 uppercase tracking-wider whitespace-nowrap">Location</th>
                        <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-[10px] lg:text-xs font-black text-slate-900 uppercase tracking-wider whitespace-nowrap">Status</th>
                        <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-[10px] lg:text-xs font-black text-slate-900 uppercase tracking-wider whitespace-nowrap">Progress</th>
                        <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-[10px] lg:text-xs font-black text-slate-900 uppercase tracking-wider whitespace-nowrap">Summary</th>
                        <th className="px-3 lg:px-6 py-3 lg:py-4 text-right text-[10px] lg:text-xs font-black text-slate-900 uppercase tracking-wider whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-200">
                      {filteredProjects.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-100 transition-colors">
                          <td className="px-3 lg:px-6 py-3 lg:py-4">
                            <div className="text-xs lg:text-sm font-black text-slate-900">{p.name}</div>
                            <div className="text-[10px] lg:text-xs text-slate-700 mt-0.5 font-bold">Start: {p.startDate}</div>
                          </td>
                          <td className="px-3 lg:px-6 py-3 lg:py-4">
                            <div className="text-xs lg:text-sm font-black text-slate-900">{p.city}</div>
                            <div className="text-[10px] lg:text-xs text-slate-700 font-bold">{p.state}</div>
                          </td>
                          <td className="px-3 lg:px-6 py-3 lg:py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 lg:w-3 h-2.5 lg:h-3 rounded-full border-2 border-slate-900" style={{ background: STATUS[p.status].color }}></div>
                              <span className="text-xs lg:text-sm font-black uppercase" style={{ color: STATUS[p.status].color }}>{STATUS[p.status].label}</span>
                            </div>
                            {(p.status === "CRIT" || p.status === "WARN") && p.criticalReason && (
                              <div className={`text-[10px] lg:text-xs mt-1 font-bold ${
                                p.status === "CRIT" ? "text-red-800" : "text-yellow-800"
                              }`}>
                                {p.criticalReason}
                              </div>
                            )}
                          </td>
                          <td className="px-3 lg:px-6 py-3 lg:py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2.5 lg:h-3 bg-slate-200 rounded-full overflow-hidden min-w-[60px] border-2 border-slate-300">
                                <div
                                  className="h-full bg-orange-600 rounded-full transition-all"
                                  style={{ width: `${p.summary.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs lg:text-sm font-black text-slate-900 min-w-[40px] text-right">{p.summary.progress}%</span>
                            </div>
                          </td>
                          <td className="px-3 lg:px-6 py-3 lg:py-4">
                            <div className="text-xs lg:text-sm space-y-1 font-bold">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-700">Delays:</span>
                                <span className="font-black text-red-800">{p.summary.delayedTasks}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-slate-700">Attendance:</span>
                                <span className="font-black text-slate-900">{p.summary.attendance}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-slate-700">Last DPR:</span>
                                <span className="font-black text-slate-900">{p.lastDPR}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 lg:px-6 py-3 lg:py-4 text-right">
                            <button
                              onClick={() => navigate(`/project/${p.id}`)}
                              className="bg-orange-600 hover:bg-orange-700 text-white px-3 lg:px-4 py-2 lg:py-2.5 text-xs lg:text-sm font-black rounded-md transition-colors whitespace-nowrap border-2 border-orange-700 shadow-md"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; border: 2px solid #e2e8f0; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #64748b; }
        .leaflet-popup-content-wrapper { border-radius: 8px !important; box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important; padding: 0 !important; border: 2px solid #cbd5e1 !important; }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-popup-tip { background: white !important; border: 2px solid #cbd5e1 !important; }
        .leaflet-tooltip { background: white !important; border: 2px solid #cbd5e1 !important; border-radius: 8px !important; box-shadow: 0 6px 20px rgba(0,0,0,0.25) !important; padding: 0 !important; }
        .leaflet-tooltip-top:before { border-top-color: white !important; }
        .custom-tooltip .leaflet-tooltip-content { margin: 0 !important; }
        .custom-marker-icon { background: transparent !important; border: none !important; }
        .leaflet-container { background: #e2e8f0 !important; }
        .pin-marker { filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5)); transition: all 0.3s ease; }
        .pin-marker:hover { filter: drop-shadow(0 6px 12px rgba(0,0,0,0.6)); transform: scale(1.15); }
        .pin-critical { animation: pulse-pin 1.5s ease-in-out infinite; }
        @keyframes pulse-pin { 
          0%, 100% { transform: scale(1); filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5)); } 
          50% { transform: scale(1.2); filter: drop-shadow(0 6px 14px rgba(0,0,0,0.7)); } 
        }
        
        @media (max-width: 768px) {
          .leaflet-popup-content-wrapper {
            max-width: 280px !important;
          }
        }
      `}} />
    </>
  );
}