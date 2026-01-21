import React from 'react';

export default function ProjectSelector({ projects, selectedProject, setSelectedProject, setSelectedImage }) {
  return (
    <div className="flex-1 bg-white p-4 rounded shadow border">
      <label className="block font-semibold mb-2 text-gray-700">Select Project</label>
      <select
        className="w-full p-2 border rounded bg-gray-50"
        value={selectedProject?._id || ''}
        onChange={(e) => {
          const proj = projects.find(p => p._id === e.target.value);
          setSelectedProject(proj);
          setSelectedImage('');
        }}
      >
        <option value="">-- Choose a Project --</option>
        {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
      </select>
    </div>
  );
}
