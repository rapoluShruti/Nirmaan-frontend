import React from "react";

export default function SupervisorDashboard() {
  const features = ["Check-In", "Daily Logs", "Attendance", "Materials"];
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Supervisor Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => (
          <div
            key={feature}
            className="p-4 bg-white rounded shadow text-center font-medium"
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}
