import { useState } from "react";
import api from "../api/axiosConfig";

export default function TaskCreateForm({
  projectId,
  layoutImage,
  coordinates,
  supervisors,
  onCreated,
}) {
  const [text, setText] = useState("");
  const [voiceNoteUrl, setVoiceNoteUrl] = useState("");
  const [assignedSupervisor, setAssignedSupervisor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const submit = async () => {
    await api.post("/tasks", {
      projectId,
      layoutImage,
      coordinates,
      description: { text, images: [] },
      voiceNoteUrl,
      startDate,
      endDate,
      assignedSupervisor,
    });
    onCreated();
  };

  return (
    <div className="border p-4 space-y-2 bg-white">
      <h3 className="font-bold">Create Task</h3>

      <textarea
        placeholder="Task description"
        className="border w-full p-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        placeholder="Voice note URL"
        className="border w-full p-1"
        value={voiceNoteUrl}
        onChange={(e) => setVoiceNoteUrl(e.target.value)}
      />

      <select
        className="border w-full p-1"
        onChange={(e) => setAssignedSupervisor(e.target.value)}
      >
        <option value="">Select Supervisor</option>
        {supervisors.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />

      <button
        className="bg-green-600 text-white px-3 py-1"
        onClick={submit}
      >
        Create
      </button>
    </div>
  );
}
