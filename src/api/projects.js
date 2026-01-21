const API = "http://localhost:5000/api/projects";

export async function createProject(data) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getAllProjects() {
  const res = await fetch(API);
  return res.json();
}
