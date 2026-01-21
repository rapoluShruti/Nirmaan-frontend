import React, { useState } from 'react';
import api from '../api/axiosConfig';

export default function TaskFormModal({ project, selectedImage, newCoords, setExistingTasks, closeModal }) {
  const [taskData, setTaskData] = useState({
    category: '',
    assignedSupervisor: '',
    startDate: '',
    endDate: '',
    priority: 'Medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.startDate || !taskData.endDate) {
      alert("Please fill start and end dates");
      return;
    }

    try {
      const payload = {
        ...taskData,
        projectId: project._id,
        layoutImage: selectedImage,
        coordinates: newCoords
      };
      const res = await api.post('/tasks/create', payload);
      setExistingTasks(prev => [...prev, res.data.task]);
      closeModal();
    } catch (err) {
      console.error("Error creating task:", err);
      alert(err.response?.data?.error || "Error creating task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white p-6 rounded-lg w-96 shadow-2xl">
        <h3 className="text-xl font-bold mb-4">New Task Detail</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input 
            type="text" 
            placeholder="Category" 
            className="w-full p-2 border rounded"
            required 
            value={taskData.category} 
            onChange={e => setTaskData({...taskData, category: e.target.value})} 
          />
          <input 
            type="text" 
            placeholder="Supervisor ID" 
            className="w-full p-2 border rounded"
            required 
            value={taskData.assignedSupervisor} 
            onChange={e => setTaskData({...taskData, assignedSupervisor: e.target.value})} 
          />
          <input 
            type="date" 
            className="w-full p-2 border rounded"
            required 
            value={taskData.startDate} 
            onChange={e => setTaskData({...taskData, startDate: e.target.value})} 
          />
          <input 
            type="date" 
            className="w-full p-2 border rounded"
            required 
            value={taskData.endDate} 
            onChange={e => setTaskData({...taskData, endDate: e.target.value})} 
          />
          <select 
            className="w-full p-2 border rounded"
            value={taskData.priority}
            onChange={e => setTaskData({...taskData, priority: e.target.value})}
          >
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded">Create</button>
            <button type="button" onClick={closeModal} className="flex-1 bg-gray-300 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
