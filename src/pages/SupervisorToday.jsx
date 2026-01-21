import React from "react";
import { supervisorTodayData } from "./supervisorTodayData";

const SupervisorToday = () => {
  const data = supervisorTodayData;

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Good Morning 👷</h1>
          <p className="text-gray-600">{data.date}</p>
        </div>
        <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm">
          📴 Offline
        </span>
      </div>

      {/* SUMMARY STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Carried Forward" value={data.carriedForwardTasks.length} color="bg-red-600" />
        <StatCard title="Today’s Tasks" value={data.todaysTasks.length} color="bg-yellow-500" />
        <StatCard title="Workers Needed" value={data.workers.requiredToday} color="bg-blue-600" />
        <StatCard title="Low Materials" value={data.materials.lowStock.length} color="bg-orange-600" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* TASKS */}
        <Section title="🚨 Carried Forward Tasks">
          {data.carriedForwardTasks.map(t => (
            <ListItem key={t.id} text={t.name} badge={t.priority} />
          ))}
        </Section>

        <Section title="📅 Today’s Work">
          {data.todaysTasks.map(t => (
            <ListItem key={t.id} text={t.name} />
          ))}
        </Section>

        {/* WORKERS */}
        <Section title="👷 Workforce Status">
          <p>Required: <strong>{data.workers.requiredToday}</strong></p>
          <p className="text-green-600">Present: {data.workers.present}</p>
          <p className="text-red-600">Absent: {data.workers.absent}</p>
        </Section>

        {/* MATERIALS */}
        <Section title="🧱 Low Stock Materials">
          {data.materials.lowStock.map((m, i) => (
            <div key={i} className="flex justify-between">
              <span>{m.name}</span>
              <span className="text-red-600">{m.qty}</span>
            </div>
          ))}
          <button className="mt-3 w-full bg-red-600 text-white py-2 rounded">
            Request Material
          </button>
        </Section>

        {/* EQUIPMENT */}
        <Section title="🧰 Equipment Needed Today">
          {data.equipmentRequired.map((e, i) => (
            <p key={i}>• {e}</p>
          ))}
        </Section>

        {/* ALERTS */}
        <Section title="⚠️ Alerts & Risks">
          <p className="text-red-600">• {data.alerts.safety}</p>
          <p className="text-orange-600">• {data.alerts.delayRisk}</p>
        </Section>

      </div>
    </div>
  );
};

/* SMALL COMPONENTS */

const StatCard = ({ title, value, color }) => (
  <div className={`${color} text-white p-4 rounded shadow`}>
    <p className="text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="font-semibold mb-3">{title}</h2>
    <div className="space-y-2 text-sm">{children}</div>
  </div>
);

const ListItem = ({ text, badge }) => (
  <div className="flex justify-between items-center border-b pb-1">
    <span>{text}</span>
    {badge && (
      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
        {badge}
      </span>
    )}
  </div>
);

export default SupervisorToday;
