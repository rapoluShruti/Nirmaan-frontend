import React, { useState } from 'react';
import TaskFormModal from './TaskFormModal';

export default function LayoutViewer({ project, existingTasks, setExistingTasks }) {
  const [selectedImage, setSelectedImage] = useState('');
  const [newCoords, setNewCoords] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setNewCoords({ xPercent: x.toFixed(2), yPercent: y.toFixed(2) });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Layout Selector */}
      {project.layoutImages?.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {project.layoutImages.map((img, idx) => (
            <img 
              key={idx} 
              src={img} 
              alt="layout" 
              className={`w-32 h-32 object-cover rounded cursor-pointer border-2 ${selectedImage === img ? 'border-blue-600' : 'border-gray-200'}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      )}

      {/* Layout Viewer */}
      {selectedImage && (
        <div className="relative bg-white p-2 rounded shadow border">
          <img 
            src={selectedImage} 
            alt="layout" 
            className="max-w-full cursor-crosshair"
            onClick={handleImageClick}
          />

          {/* Existing task pins */}
          {existingTasks.filter(t => t.layoutImage === selectedImage).map(task => (
            <div 
              key={task._id} 
              className="absolute w-4 h-4 rounded-full shadow-md border-2 border-white bg-red-600"
              style={{ left: `${task.coordinates.xPercent}%`, top: `${task.coordinates.yPercent}%`, transform: 'translate(-50%, -50%)' }}
              title={`${task.category} - ${task.priority}`}
            />
          ))}

          {/* Temporary new task pin */}
          {newCoords && (
            <div 
              className="absolute w-5 h-5 bg-yellow-400 border-2 border-black rounded-full animate-bounce"
              style={{ left: `${newCoords.xPercent}%`, top: `${newCoords.yPercent}%`, transform: 'translate(-50%, -50%)' }}
            />
          )}
        </div>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <TaskFormModal 
          project={project} 
          selectedImage={selectedImage} 
          newCoords={newCoords} 
          setExistingTasks={setExistingTasks} 
          closeModal={() => { setShowForm(false); setNewCoords(null); }}
        />
      )}
    </div>
  );
}
