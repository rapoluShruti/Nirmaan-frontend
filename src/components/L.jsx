import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Lan() {
  const [form, setForm] = useState({
    projectName: "",
    location: "",
    ownerEmail: "",
    managerEmail: ""
  });

  const navigate = useNavigate();

  const submit = () => {
    const project = {
      id: Date.now(),
      ...form,
      status: "PENDING_APPROVAL"
    };

    localStorage.setItem("pendingProject", JSON.stringify(project));
    navigate("/waiting-approval");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Create New Project</h2>

      <input placeholder="Project Name"
        onChange={e => setForm({ ...form, projectName: e.target.value })}
      />
      <input placeholder="Location"
        onChange={e => setForm({ ...form, location: e.target.value })}
      />
      <input placeholder="Owner Email"
        onChange={e => setForm({ ...form, ownerEmail: e.target.value })}
      />
      <input placeholder="Your Email (Manager)"
        onChange={e => setForm({ ...form, managerEmail: e.target.value })}
      />

      <button onClick={submit}>Request Approval</button>
    </div>
  );
}
