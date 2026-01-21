
import { Link, Outlet } from "react-router-dom";

export default function ManagerDashboard() {
  const features = [
    { name: "Tasks", path: "tasks" },
    { name: "DPRs", path: "dprs" },
    { name: "Attendance", path: "attendance" },
    { name: "Materials", path: "materials" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manager Dashboard</h2>

      <div className="flex gap-4 mb-4">
        <Link
          to="create-project"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Create Project
        </Link>
        <Link
          to="map-view"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View Projects Map
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {features.map((f) => (
          <div
            key={f.name}
            className="p-4 bg-white rounded shadow text-center font-medium"
          >
            {f.name}
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  );
}
