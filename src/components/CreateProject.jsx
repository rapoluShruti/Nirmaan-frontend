
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* ================= LEAFLET ICON FIX ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
/* =================================================== */

export default function CreateProject() {
  const navigate = useNavigate();

  /* ============ MANAGER ONLY ACCESS ============ */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "MANAGER") {
      alert("Only managers can create projects");
      navigate("/");
    }
  }, [navigate]);

  /* ============ FORM STATE ============ */
  const [form, setForm] = useState({
    name: "",
    budget: "",
    engineer: "",
    supervisor: "",
    typeOfConstruction: "",
    clientEmail: "",
    startDate: "",
    endDate: "",
  });

  const [layoutImages, setLayoutImages] = useState([""]);
  const [supervisors, setSupervisors] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [errors, setErrors] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectId = `PRJ-${Math.floor(Math.random() * 10000)}`;

  /* ============ FETCH SUPERVISORS ============ */
  useEffect(() => {
    api
      .get("/projects/temp/assignable-supervisors")
      .then((res) => setSupervisors(res.data.supervisors || []))
      .catch(() => setSupervisors([]));
  }, []);

  /* ============ FETCH EXISTING PROJECTS FOR MAP ============ */
  const [existingProjects, setExistingProjects] = useState([]);
  
  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setExistingProjects(res.data.projects || []))
      .catch(() => setExistingProjects([]));
  }, []);

  /* ============ MAP CLICK HANDLER ============ */
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
      },
    });
    return lat && lng ? <Marker position={[lat, lng]} /> : null;
  }

  /* ============ SUBMIT ============ */
  const handleSubmit = async () => {
    setErrors([]);

    if (!form.name || !form.budget) {
      setErrors(["Project name and budget are required"]);
      return;
    }

    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      setErrors(["End date cannot be before start date"]);
      return;
    }

    try {
      await api.post("/projects", {
        projectId,
        ...form,
        budget: Number(form.budget),
        latitude: lat || 19.07,
        longitude: lng || 72.88,
        layoutImages: layoutImages.filter((i) => i.trim() !== ""),
      });

      alert("Project created successfully");
      navigate("/");
    } catch (err) {
      setErrors([
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to create project",
      ]);
    }
  };

  /* ====================== UI ====================== */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}


      <div className="p-8">
        {/* KPI ROW */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-sm mb-2">Ongoing Projects</p>
                <h2 className="text-5xl font-bold">08</h2>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              From Last Months <span className="text-green-600 font-medium">+2.5%</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-sm mb-2">Complete Projects</p>
                <h2 className="text-5xl font-bold">30</h2>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              From Last Months <span className="text-red-500 font-medium">-1.5%</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-sm mb-2">On Hold Projects</p>
                <h2 className="text-5xl font-bold">03</h2>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              From Last Months <span className="text-green-600 font-medium">+8.0%</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* MAP SECTION */}
          <div className="col-span-7 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b flex items-center gap-2">
              <h3 className="text-lg font-semibold">Projects Map Overview</h3>
              <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                i
              </div>
            </div>
            <div className="h-[600px] relative">
              <MapContainer
                center={[19.07, 72.88]}
                zoom={12}
                className="h-full w-full"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {existingProjects.map((project) => (
                  project.latitude && project.longitude && (
                    <Marker
                      key={project._id}
                      position={[project.latitude, project.longitude]}
                      eventHandlers={{
                        click: () => setSelectedProject(project),
                      }}
                    >
                      {selectedProject?._id === project._id && (
                        <Popup>
                          <div className="min-w-[280px]">
                            <div className="bg-orange-600 text-white px-4 py-3 -m-3 mb-3 rounded-t-lg">
                              <p className="text-xs opacity-80 mb-1">Project Name</p>
                              <p className="font-semibold">{project.projectId}</p>
                            </div>
                            <div className="space-y-2 text-sm">
                              <p className="font-semibold text-lg">{project.name}</p>
                              <p className="text-gray-500 text-xs mb-3">Info</p>
                              {project.startDate && (
                                <div className="flex items-start gap-2">
                                  <span className="text-gray-400">📅</span>
                                  <span className="text-gray-700">
                                    {new Date(project.startDate).toLocaleDateString()} – {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Ongoing'}
                                  </span>
                                </div>
                              )}
                              {project.budget && (
                                <>
                                  <p className="text-gray-500 text-xs mt-4 mb-2">Budget & Progress</p>
                                  <div className="flex items-start gap-2">
                                    <span className="text-gray-400">💰</span>
                                    <span className="text-gray-700">Planned: ${project.budget}</span>
                                  </div>
                                </>
                              )}
                              <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium">
                                View Details
                              </button>
                            </div>
                          </div>
                        </Popup>
                      )}
                    </Marker>
                  )
                ))}
                
                <LocationMarker />
              </MapContainer>
            </div>

            {/* LAYOUT IMAGES SECTION */}
            <div className="p-6 border-t">
              <h3 className="font-semibold mb-4">Layout Images</h3>
              <div className="space-y-3">
                {layoutImages.map((img, i) => (
                  <input
                    key={i}
                    value={img}
                    placeholder="Layout Image URL"
                    onChange={(e) => {
                      const copy = [...layoutImages];
                      copy[i] = e.target.value;
                      setLayoutImages(copy);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                ))}
                <button
                  onClick={() => setLayoutImages([...layoutImages, ""])}
                  className="text-orange-600 text-sm font-medium flex items-center gap-1 hover:text-orange-700"
                >
                  <span className="text-lg">+</span> Add Layout Image
                </button>
              </div>
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="col-span-5 bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6">Create Project</h2>

            {errors.length > 0 && (
              <div className="bg-red-100 p-3 rounded-lg text-red-700 text-sm mb-4">
                {errors.map((e, i) => (
                  <div key={i}>• {e}</div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project ID
                </label>
                <input
                  type="text"
                  value={projectId}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Project Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engineer
                </label>
                <input
                  type="text"
                  value={form.engineer}
                  onChange={(e) => setForm({ ...form, engineer: e.target.value })}
                  placeholder="Engineer"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supervisor
                </label>
                <select
                  value={form.supervisor}
                  onChange={(e) => setForm({ ...form, supervisor: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select Supervisor</option>
                  {supervisors.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Construction
                </label>
                <input
                  type="text"
                  value={form.typeOfConstruction}
                  onChange={(e) => setForm({ ...form, typeOfConstruction: e.target.value })}
                  placeholder="Type of Construction"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>   <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  client Email
                </label>
                <input
                  type="text"
                  value={form.clientEmail}
                  onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                  placeholder="Client Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Layout Images
                </label>
                <div className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-400 text-sm">
                  Click on the m to set project location
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
