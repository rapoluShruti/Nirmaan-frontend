import React from 'react';

export default function TaskPin({ task }) {
  return (
    <div 
      className="absolute group"
      style={{ left: `${task.coordinates.xPercent}%`, top: `${task.coordinates.yPercent}%`, transform: 'translate(-50%, -50%)' }}
    >
      <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${task.priority === 'High' ? 'bg-red-600' : 'bg-blue-600'}`}></div>
      <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs p-2 rounded whitespace-nowrap z-50">
        <p><strong>{task.category}</strong></p>
        <p>ID: {task.taskId}</p>
        <p>Priority: {task.priority}</p>
      </div>
    </div>
  );
}
