import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectsList = ({ token, onSelectProject }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data.projects || []);
      } catch (err) {
        console.error("Error fetching projects:", err.response?.data || err.message);
      }
    };
    fetchProjects();
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {projects.map((project) => (
            <div
              key={project.projectId}
              style={{
                border: "1px solid gray",
                padding: "10px",
                width: "200px",
                cursor: "pointer",
              }}
              onClick={() => onSelectProject(project.projectId)}
            >
              <h4>{project.name}</h4>
              <p>ID: {project.projectId}</p>
              <p>Client: {project.clientEmail}</p>
              <img
                src={
                  Array.isArray(project.layoutImages)
                    ? project.layoutImages[0]
                    : project.layoutImages
                }
                alt="layout"
                style={{ width: "100%", height: "100px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
