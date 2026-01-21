import React from 'react';

export default function ProjectCard({ project, isSelected, onSelect }) {
  return (
    <div 
      className={`p-4 rounded-lg shadow cursor-pointer border transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
      onClick={onSelect}
    >
      <h4 className="font-bold text-gray-800">{project.name}</h4>
      <p className="text-xs text-gray-500">{project.location?.city || 'Unknown City'}</p>
      <p className="text-xs text-gray-500">Start: {project.startDate?.split('T')[0]}</p>
      <p className="text-xs text-gray-500">End: {project.endDate?.split('T')[0]}</p>
    </div>
  );
}
