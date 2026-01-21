import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import LayoutPicker from "../components/LayoutPicker";
import TaskCreateForm from "../components/TaskCreateForm";

export default function CreateTaskPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [layoutImage, setLayoutImage] = useState(null);
  const [coords, setCoords] = useState(null);
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
    api.get("/users?role=SUPERVISOR").then((res) => setSupervisors(res.data));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <select
        className="border p-1"
        onChange={(e) =>
          setSelectedProject(
            projects.find((p) => p.projectId === e.target.value)
          )
        }
      >
        <option>Select Project</option>
        {projects.map((p) => (
          <option key={p.projectId} value={p.projectId}>
            {p.projectId}
          </option>
        ))}
      </select>

      {selectedProject && (
        <LayoutPicker
          layouts={selectedProject.layoutImages}
          onSelect={(img, c) => {
            setLayoutImage(img);
            setCoords(c);
          }}
        />
      )}

      {coords && (
        <TaskCreateForm
          projectId={selectedProject.projectId}
          layoutImage={layoutImage}
          coordinates={coords}
          supervisors={supervisors}
          onCreated={() => alert("Task created")}
        />
      )}
    </div>
  );
}
