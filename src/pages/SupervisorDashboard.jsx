import React, { useState } from "react";
import { supervisorTasks } from "./supervisorTasks";

const priorityColor = {
  High: "bg-red-600",
  Medium: "bg-yellow-500",
  Low: "bg-green-600",
};

const SupervisorDashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Site Supervisor Panel</h1>
        <span className="text-sm bg-gray-800 text-white px-3 py-1 rounded">
          📴 Offline Mode
        </span>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT: LAYOUT VIEW */}
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Project Layout</h2>

          <div className="relative inline-block">
            <img
              src="/1520189063040.jpg"
              alt="Layout"
              className="max-w-full border"
            />

            {supervisorTasks.map(task => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`absolute w-5 h-5 rounded-full cursor-pointer animate-pulse ${priorityColor[task.priority]}`}
                style={{
                  left: `${task.coordinates.xPercent}%`,
                  top: `${task.coordinates.yPercent}%`,
                  transform: "translate(-50%, -50%)"
                }}
                title={task.category}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: TASK ACTION PANEL */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Today’s Tasks</h2>

          <div className="space-y-3">
            {supervisorTasks.map(task => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="border rounded p-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{task.category}</span>
                  <span className={`w-3 h-3 rounded-full ${priorityColor[task.priority]}`} />
                </div>

                <div className="flex gap-4 text-sm mt-2">
                  <span>👷 {task.workersRequired}</span>
                  <span>🧱 {task.materials.length}</span>
                  {task.voiceNote && <span>🎙</span>}
                  {task.images.length > 0 && <span>📸</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* TASK DETAIL DRAWER */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full sm:w-[420px] p-4 overflow-y-auto">

            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">{selectedTask.category}</h2>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* VOICE FIRST */}
            {selectedTask.voiceNote && (
              <audio controls autoPlay className="w-full mb-3">
                <source src={selectedTask.voiceNote} />
              </audio>
            )}

            {/* IMAGES */}
            <div className="flex gap-2 mb-3">
              {selectedTask.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="task"
                  className="w-20 h-20 object-cover border rounded"
                />
              ))}
            </div>

            {/* INFO */}
            <div className="space-y-2 text-sm">
              <p><strong>Workers:</strong> {selectedTask.workersRequired}</p>
              <p><strong>Materials:</strong> {selectedTask.materials.join(", ")}</p>
              <p><strong>Duration:</strong> {selectedTask.startDate} → {selectedTask.endDate}</p>
              <p className="text-gray-600">{selectedTask.description}</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default SupervisorDashboard;
