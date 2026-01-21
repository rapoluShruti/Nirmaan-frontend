import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosConfig";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await API.get(`/tasks/project/${projectId}`);
        setTasks(data.tasks);
      } catch (err) {
        console.log("No tasks found or error fetching.");
      }
    };
    getTasks();
  }, [projectId]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tasks for {projectId}</h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task._id} className="p-4 border-l-4 border-green-500 bg-white shadow-sm">
            <p className="font-bold">{task.taskId} - {task.category}</p>
            <p className="text-sm text-gray-600">{task.description?.text}</p>
            <p className="text-xs mt-2">Supervisor: {task.assignedSupervisor?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
