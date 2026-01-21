import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import LayoutTaskMap from "../components/LayoutTaskMap";
import TaskDetailsPanel from "../components/TaskDetailsPanel";

export default function SupervisorTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [layout, setLayout] = useState(null);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    const res = await api.get("/tasks/supervisor");
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    load();
  }, []);

  const layouts = [...new Set(tasks.map((t) => t.layoutImage))];

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {!layout &&
        layouts.map((l) => (
          <img
            key={l}
            src={l}
            className="border cursor-pointer"
            onClick={() => setLayout(l)}
          />
        ))}

      {layout && (
        <>
          <LayoutTaskMap
            layout={layout}
            tasks={tasks.filter((t) => t.layoutImage === layout)}
            onSelect={setSelected}
          />
          <TaskDetailsPanel task={selected} refresh={load} />
        </>
      )}
    </div>
  );
}
