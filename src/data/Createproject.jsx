import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function CreateProject() {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [engineer, setEngineer] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [typeOfConstruction, setTypeOfConstruction] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [layoutImages, setLayoutImages] = useState([""]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [errors, setErrors] = useState([]);

  // Generate project ID
  const projectId = "PRJ-" + Math.floor(Math.random() * 10000);

  // Map click handler
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
      },
    });

    return lat && lng ? <Marker position={[lat, lng]} /> : null;
  }

  // Add a new layout image input
  const addLayoutImage = () => setLayoutImages([...layoutImages, ""]);

  // Update layout image URL
  const updateLayoutImage = (index, value) => {
    const newImages = [...layoutImages];
    newImages[index] = value;
    setLayoutImages(newImages);
  };

  // Submit handler
  const handleSubmit = async () => {
    setErrors([]);

    if (!name || !budget) {
      setErrors(["Project name and budget are required"]);
      return;
    }

    try {
      const res = await 
      // fetch("http://localhost:2026/api/projects",
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects`,
         {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          name,
          budget: Number(budget),
          engineer,
          supervisor,
          typeOfConstruction,
          clientEmail,
          startDate: startDate || new Date(),
          endDate: endDate || new Date(),
          latitude: lat || 19.07, // default Mumbai
          longitude: lng || 72.88, // default Mumbai
          layoutImages: layoutImages.filter((url) => url.trim() !== ""),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors([data.message || data.error || "Failed to create project"]);
        return;
      }

      alert("Project created successfully!");
      navigate("/"); // redirect after creation
    } catch (err) {
      console.error(err);
      setErrors(["Network or server error"]);
    }
  };

  const handleCancel = () => {
    setName("");
    setBudget("");
    setEngineer("");
    setSupervisor("");
    setTypeOfConstruction("");
    setClientEmail("");
    setStartDate("");
    setEndDate("");
    setLayoutImages([""]);
    setLat(null);
    setLng(null);
    setErrors([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-2">Create Project</h2>

        {errors.length > 0 && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            {errors.map((err, i) => (
              <div key={i}>• {err}</div>
            ))}
          </div>
        )}

        {/* Project ID */}
        <div>
          <label className="block font-medium mb-1">Project ID</label>
          <input
            type="text"
            value={projectId}
            disabled
            className="w-full px-3 py-2 rounded border bg-gray-100"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            className="w-full px-3 py-2 rounded border"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block font-medium mb-1">Budget</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter budget"
            className="w-full px-3 py-2 rounded border"
          />
        </div>

        {/* Engineer */}
        <div>
          <label className="block font-medium mb-1">Engineer</label>
          <input
            type="text"
            value={engineer}
            onChange={(e) => setEngineer(e.target.value)}
            placeholder="Engineer Name"
            className="w-full px-3 py-2 rounded border"
          />
        </div>

        {/* Supervisor */}
        <div>
          <label className="block font-medium mb-1">Supervisor</label>
          <input
            type="text"
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            placeholder="Supervisor Name"
            className="w-full px-3 py-2 rounded border"
          />
        </div>

        {/* Type of Construction */}
        <div>
          <label className="block font-medium mb-1">Type of Construction</label>
          <input
            type="text"
            value={typeOfConstruction}
            onChange={(e) => setTypeOfConstruction(e.target.value)}
            placeholder="Commercial, Residential..."
            className="w-full px-3 py-2 rounded border"
          />
        </div>

        {/* Client Email */}
        <div>
          <label className="block font-medium mb-1">Client Email</label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="Client Email"
            className="w-full px-3 py-2 rounded border"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 rounded border"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 rounded border"
          />
        </div>

        {/* Layout Images */}
        <div>
          <label className="block font-medium mb-1">Layout Images (URLs)</label>
          {layoutImages.map((img, index) => (
            <input
              key={index}
              type="text"
              value={img}
              onChange={(e) => updateLayoutImage(index, e.target.value)}
              placeholder="Image URL"
              className="w-full px-3 py-2 rounded border mb-1"
            />
          ))}
          <button
            onClick={addLayoutImage}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            + Add Image
          </button>
        </div>

        {/* Map */}
        <div>
          <label className="block font-medium mb-1">Pin Location on Map</label>
          <div className="h-64 w-full border rounded overflow-hidden">
            <MapContainer center={[19.07, 72.88]} zoom={12} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            📍 Location: {lat ? lat.toFixed(4) : 19.07}, {lng ? lng.toFixed(4) : 72.88}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save Project
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
