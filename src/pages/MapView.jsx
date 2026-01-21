import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // axios.get("http://localhost:2026/api/projects")
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/projects`)
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="h-screen w-full">
      <MapContainer center={[28.6139, 77.209]} zoom={5} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {projects.map((p) => (
          <Marker key={p.projectId} position={[p.location.lat, p.location.lng]}>
            <Popup>
              <div>
                <strong>{p.name}</strong>
                <br />
                Supervisor: {p.supervisor || "N/A"}
                <br />
                Engineer: {p.engineer}
                <br />
                Budget: ₹{p.budget}
                <br />
                Start: {new Date(p.startDate).toLocaleDateString()}
                <br />
                End: {new Date(p.endDate).toLocaleDateString()}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
