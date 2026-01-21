import { useEffect, useState } from "react";

// const API_BASE = "http://localhost:2026/api";
const API_BASE = import.meta.env.VITE_BACKEND_URL + "/api";
export default function SupervisorTaskSubmission() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Form States
  const [status, setStatus] = useState("IN_PROGRESS");
  const [beforePhotoUrl, setBeforePhotoUrl] = useState("");
  const [afterPhotoUrl, setAfterPhotoUrl] = useState("");
  const [blockReason, setBlockReason] = useState("");
  const [voiceNote, setVoiceNote] = useState("");
  const [gps, setGps] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 1. Fetch Tasks for the logged-in Supervisor
  useEffect(() => {
    if (!token) return;
    
    fetch(`${API_BASE}/tasks/supervisor`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTasks(data.tasks || []);
        } else {
          console.error("Error fetching tasks:", data.error);
        }
      })
      .catch(() => alert("Failed to load tasks. Check your connection."));
  }, [token]);

  // 2. Capture GPS Location
  const captureGPS = () => {
    if (!navigator.geolocation) return alert("GPS not supported");
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => alert("GPS permission denied. Please enable location services.")
    );
  };

  // 3. Submit Task Update
  const submitTask = async () => {
    if (!selectedTask) return alert("Please select a task");
    if (!beforePhotoUrl) return alert("Before photo URL is required");
    if (status === "COMPLETED" && !afterPhotoUrl) return alert("After photo URL is required for completion");
    if (!gps) return alert("Please capture GPS location first");

    setLoading(true);

    // Payload uses URLs in arrays to match the backend expectations
    const payload = {
      taskId: selectedTask.taskId,
      status,
      beforePhotos: [beforePhotoUrl], 
      afterPhotos: status === "COMPLETED" ? [afterPhotoUrl] : [],
      blockReason: status === "BLOCKED" ? blockReason : "",
      voiceNote,
      gpsLocation: gps
    };

    try {
      const res = await fetch(`${API_BASE}/task-submissions/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) throw new Error(data.error || "Submission failed");

      alert("Daily Report Submitted Successfully!");
      window.location.reload(); // Refresh to clear form and update task list
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>Supervisor Daily Portal</h2>

      {/* Task Selection */}
      <div style={{ marginBottom: "20px" }}>
        <label><b>Select Assigned Task:</b></label>
        <select
          onChange={(e) => setSelectedTask(tasks.find(t => t.taskId === e.target.value))}
          style={{ width: "100%", padding: "10px", marginTop: "5px" }}
        >
          <option value="">-- Choose Task --</option>
          {tasks.map((t) => (
            <option key={t.taskId} value={t.taskId}>
              [{t.taskId}] {t.category} - {t.projectId}
            </option>
          ))}
        </select>
      </div>

      {selectedTask && (
        <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
          <p><b>Task:</b> {selectedTask.category}</p>
          <p><b>Priority:</b> {selectedTask.priority}</p>

          {/* Status Dropdown */}
          <div style={{ marginTop: "15px" }}>
            <label><b>Update Status:</b></label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            >
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>

          {/* Block Reason (Only if Blocked) */}
          {status === "BLOCKED" && (
            <div style={{ marginTop: "15px" }}>
              <label><b>Block Reason:</b></label>
              <input
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Why is it blocked?"
                style={{ width: "100%", padding: "10px", marginTop: "5px", boxSizing: "border-box" }}
              />
            </div>
          )}

          {/* Before Photo URL */}
          <div style={{ marginTop: "15px" }}>
            <label><b>Before Photo URL:</b></label>
            <input
              type="text"
              value={beforePhotoUrl}
              onChange={(e) => setBeforePhotoUrl(e.target.value)}
              placeholder="Paste image link here"
              style={{ width: "100%", padding: "10px", marginTop: "5px", boxSizing: "border-box" }}
            />
          </div>

          {/* After Photo URL (Only if Completed) */}
          {status === "COMPLETED" && (
            <div style={{ marginTop: "15px" }}>
              <label><b>After Photo URL:</b></label>
              <input
                type="text"
                value={afterPhotoUrl}
                onChange={(e) => setAfterPhotoUrl(e.target.value)}
                placeholder="Paste image link here"
                style={{ width: "100%", padding: "10px", marginTop: "5px", boxSizing: "border-box" }}
              />
            </div>
          )}

          {/* Remarks */}
          <div style={{ marginTop: "15px" }}>
            <label><b>Remarks / Voice Note:</b></label>
            <textarea
              value={voiceNote}
              onChange={(e) => setVoiceNote(e.target.value)}
              placeholder="Enter work details..."
              style={{ width: "100%", padding: "10px", marginTop: "5px", boxSizing: "border-box" }}
            />
          </div>

          {/* GPS Capture */}
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <button onClick={captureGPS} style={{ padding: "10px", cursor: "pointer" }}>
              {gps ? "📍 GPS Captured" : "📍 Capture GPS Location"}
            </button>
            {gps && (
              <p style={{ fontSize: "12px", color: "green" }}>
                Lat: {gps.lat.toFixed(4)}, Lng: {gps.lng.toFixed(4)}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={submitTask}
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "20px",
              background: "black",
              color: "white",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "SUBMITTING..." : "SUBMIT DAILY REPORT"}
          </button>
        </div>
      )}
    </div>
  );
}