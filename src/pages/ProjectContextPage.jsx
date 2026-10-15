// // // import { useState } from "react";
// // // import ProjectSelector from "../components/ProjectSelector";
// // // import LayoutList from "../components/LayoutList";
// // // import BlueprintViewer from "../components/BlueprintViewer";
// // // import CreateTaskForm from "../components/CreateTaskForm";

// // // export default function ProjectContextPage() {
// // //   const [project, setProject] = useState(null);
// // //   const [selectedLayout, setSelectedLayout] = useState(null);
// // //   const [coordinates, setCoordinates] = useState(null);

// // //   return (
// // //     <div className="p-6 space-y-6 max-w-6xl mx-auto">
// // //       <h1 className="text-2xl font-bold">Create Task</h1>

// // //       <ProjectSelector
// // //         onSelect={(p) => {
// // //           setProject(p);
// // //           setSelectedLayout(null);
// // //           setCoordinates(null);
// // //         }}
// // //       />

// // //       {project && !selectedLayout && (
// // //         <LayoutList
// // //           layouts={project.layoutImages || []}
// // //           onSelect={setSelectedLayout}
// // //         />
// // //       )}

// // //       {selectedLayout && (
// // //         <BlueprintViewer
// // //           layoutUrl={selectedLayout}
// // //           coordinates={coordinates}
// // //           onPick={setCoordinates}
// // //         />
// // //       )}

// // //       {project && selectedLayout && coordinates && (
// // //         <CreateTaskForm
// // //           project={project}
// // //           layoutImage={selectedLayout}
// // //           coordinates={coordinates}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }
// // import { useState } from "react";
// // import ProjectSelector from "../components/ProjectSelector";
// // import LayoutList from "../components/LayoutList";
// // import BlueprintViewer from "../components/BlueprintViewer";
// // import CreateTaskForm from "../components/CreateTaskForm";

// // export default function ProjectContextPage() {
// //   const [project, setProject] = useState(null);
// //   const [selectedLayout, setSelectedLayout] = useState(null);
// //   const [coordinates, setCoordinates] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const handleTaskCreated = () => {
// //     setCoordinates(null);
// //     setIsModalOpen(false);
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
// //       {/* Sidebar Mockup - Matching Reference Side Nav */}
// //       <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col p-6">
// //         <div className="flex items-center gap-2 mb-10">
// //           <div className="w-8 h-8 bg-[#e6f3ee]0 rounded-full flex items-center justify-center text-white font-bold text-xs">ABC</div>
// //           <span className="font-bold text-lg tracking-tight text-gray-700">ABC Constructions</span>
// //         </div>
// //         <nav className="space-y-2">
// //           <div className="px-4 py-3 rounded-xl bg-[#e6f3ee] text-teal-700 font-semibold flex items-center gap-3">
// //              <span>📋 Overview</span>
// //           </div>
// //           <div className="px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">Worker Management</div>
// //           <div className="px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">Payment Management</div>
// //         </nav>
// //       </aside>

// //       {/* Main Content Area */}
// //       <main className="flex-1 p-8">
// //         <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900">Project Context</h1>
// //             <p className="text-gray-500 text-sm">Select a project and layout to pin a task location</p>
// //           </div>
// //           <div className="w-full md:w-64 bg-white shadow-sm border border-gray-100 rounded-xl p-2">
// //             <ProjectSelector
// //               onSelect={(p) => {
// //                 setProject(p);
// //                 setSelectedLayout(null);
// //                 setCoordinates(null);
// //               }}
// //             />
// //           </div>
// //         </header>

// //         <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
// //           {/* Left Side: Layout List */}
// //           <section className="xl:col-span-3">
// //             <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm h-full">
// //               <h3 className="font-bold mb-4 text-gray-700 flex items-center gap-2">
// //                 <span className="w-6 h-6 rounded-full bg-[#e6f3ee] text-teal-700 text-xs flex items-center justify-center">1</span>
// //                 Available Layouts
// //               </h3>
// //               <LayoutList
// //                 layouts={project?.layoutImages || []}
// //                 onSelect={setSelectedLayout}
// //                 selectedLayout={selectedLayout}
// //               />
// //             </div>
// //           </section>

// //           {/* Right Side: Blueprint Viewer */}
// //           <section className="xl:col-span-9">
// //             <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm min-h-[500px] flex flex-col">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="font-bold text-gray-700 flex items-center gap-2">
// //                   <span className="w-6 h-6 rounded-full bg-[#e6f3ee] text-teal-700 text-xs flex items-center justify-center">2</span>
// //                   Blueprint Interaction
// //                 </h3>
// //                 {coordinates && (
// //                   <button 
// //                     onClick={() => setIsModalOpen(true)}
// //                     className="bg-[#e6f3ee]0 hover:bg-teal-700 text-white px-5 py-2 rounded-xl transition-all font-medium shadow-md shadow-teal-100"
// //                   >
// //                     + Pin Task Here
// //                   </button>
// //                 )}
// //               </div>
              
// //               <div className="flex-1 relative bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
// //                 {selectedLayout ? (
// //                   <BlueprintViewer
// //                     layoutUrl={selectedLayout}
// //                     coordinates={coordinates}
// //                     onPick={setCoordinates}
// //                   />
// //                 ) : (
// //                   <div className="absolute inset-0 flex items-center justify-center text-gray-400">
// //                     Select a layout to view blueprint
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </section>
// //         </div>

// //         {/* Modal-style Task Form (Matches reference image popup) */}
// //         {isModalOpen && (
// //           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //             <div className="w-full max-w-2xl animate-in fade-in zoom-in duration-200">
// //               <CreateTaskForm
// //                 project={project}
// //                 layoutImage={selectedLayout}
// //                 coordinates={coordinates}
// //                 onTaskCreated={handleTaskCreated}
// //                 onClose={() => setIsModalOpen(false)}
// //               />
// //             </div>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import ProjectSelector from "../components/ProjectSelector";
// import LayoutList from "../components/LayoutList";
// import BlueprintViewer from "../components/BlueprintViewer";
// import CreateTaskForm from "../components/CreateTaskForm";

// export default function ProjectContextPage() {
//   const [project, setProject] = useState(null);
//   const [selectedLayout, setSelectedLayout] = useState(null);
//   const [coordinates, setCoordinates] = useState(null);
//   const [showTaskForm, setShowTaskForm] = useState(false);

//   // Handle task creation success
//   const handleTaskCreated = () => {
//     setShowTaskForm(false);
//     setCoordinates(null);
//     alert("Task saved successfully!");
//   };

//   return (
//     <div className="flex flex-col h-screen bg-[#f9fafb] font-sans">
//       {/* HEADER: Backend Project Selector Integrated */}
//       <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
//         <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
//           <div>
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Project / <span className="text-gray-600">Create Task</span></p>
//             <h1 className="text-lg font-bold text-gray-800">{project?.name || "Select a Project"}</h1>
//           </div>
//           <div className="w-full sm:w-72">
//             <ProjectSelector onSelect={(p) => {
//               setProject(p);
//               setSelectedLayout(null);
//               setCoordinates(null);
//             }} />
//           </div>
//         </div>

//         <button 
//           onClick={() => setShowTaskForm(true)}
//           disabled={!coordinates || !selectedLayout}
//           className="bg-[#0f766e] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#0b5d57] disabled:opacity-50 transition-all shadow-sm"
//         >
//           <span className="text-xl">+</span> Create Task
//         </button>
//       </header>

//       <div className="flex flex-1 overflow-hidden p-6 gap-6">
//         {/* SIDEBAR: Shows layout images from Project API */}
//         <aside className="w-full sm:w-72 bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col">
//           <h2 className="text-sm font-bold text-gray-800 mb-1">Floor Layouts</h2>
//           <p className="text-[11px] text-gray-400 mb-4 font-medium">Select a floor plan from project files</p>
          
//           <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
//             <LayoutList 
//               layouts={project?.layoutImages || []} 
//               selectedLayout={selectedLayout}
//               onSelect={setSelectedLayout} 
//             />
//           </div>
//         </aside>

//         {/* WORKSPACE: The Interactive Blueprint */}
//         <main className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden relative">
//           <div className="p-4 border-b flex justify-between items-center bg-white z-10">
//             <div>
//               <h2 className="text-sm font-bold text-gray-800">Blueprint Workspace</h2>
//               <p className="text-[11px] text-gray-400">Mark exact task location on floor plan</p>
//             </div>
//           </div>

//           <div className="flex-1 relative bg-gray-50/50">
//             <BlueprintViewer 
//               layoutUrl={selectedLayout} 
//               coordinates={coordinates} 
//               onPick={setCoordinates} 
//             />
//           </div>
//         </main>
//       </div>

//       {/* TASK FORM MODAL */}
//       {showTaskForm && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
//             <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
//                <h2 className="font-bold text-gray-800">Task Details</h2>
//                <button onClick={() => setShowTaskForm(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
//             </div>
//             <CreateTaskForm
//               project={project}
//               layoutImage={selectedLayout}
//               coordinates={coordinates}
//               onTaskCreated={handleTaskCreated}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import ProjectSelector from "../components/ProjectSelector";
import LayoutList from "../components/LayoutList";
import BlueprintViewer from "../components/BlueprintViewer";
import CreateTaskForm from "../components/CreateTaskForm";

export default function ProjectContextPage() {
  const [project, setProject] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Handle task creation success
  const handleTaskCreated = () => {
    setShowTaskForm(false);
    setCoordinates(null);
    alert("Task saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] font-sans text-[#183a35] flex flex-col task-creator-page">
      {/* HEADER: Backend Project Selector Integrated */}
      <header className="bg-white border-b border-[#dce7e1] flex flex-col items-stretch justify-between gap-4 px-4 py-4 shadow-sm md:flex-row md:items-center md:px-8">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
              Project / <span className="text-teal-700">Create Task</span>
            </p>
            <h1 className="text-lg font-bold text-gray-800">{project?.name || "Task Management System"}</h1>
          </div>
          <div className="w-full sm:w-72">
            <ProjectSelector onSelect={(p) => {
              setProject(p);
              setSelectedLayout(null);
              setCoordinates(null);
            }} />
          </div>
        </div>

        <button 
          onClick={() => setShowTaskForm(true)}
          disabled={!coordinates || !selectedLayout}
          className="bg-[#0f766e] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#0b5d57] disabled:opacity-50 transition-all shadow-sm"
        >
          <span className="text-xl">+</span> Create Task
        </button>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-6">
        {!project ? (
          // Beautiful welcome state when no project selected
          <div className="h-full min-h-[600px] flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
              {/* Hero Section */}
              <div className="mb-12">
                <div className="relative mb-8">
                  {/* Background decoration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#d7ebe2] to-[#e6f3ee] rounded-full opacity-20 animate-pulse"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
                  </div>
                  
                  {/* Main icon */}
                  <div className="relative z-10 flex justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#102b2a] to-[#0f766e] rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome to <span className="text-teal-700">Task Creator</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Create and manage tasks with precision using interactive floor plans. 
                  Select a project to get started with visual task placement.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-2xl p-6 border border-[#dce7e1] shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-[#e6f3ee] rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Interactive Floor Plans</h3>
                  <p className="text-sm text-gray-600">Click directly on blueprints to mark exact task locations with pixel-perfect precision.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#dce7e1] shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Task Management</h3>
                  <p className="text-sm text-gray-600">Organize tasks by project with detailed descriptions, priorities, and visual context.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#dce7e1] shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Team Collaboration</h3>
                  <p className="text-sm text-gray-600">Share visual task locations with team members for better coordination and execution.</p>
                </div>
              </div>

              {/* Getting Started Steps */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#dce7e1]">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Get Started in 3 Easy Steps</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Select Project</p>
                      <p className="text-sm text-gray-600">Choose from dropdown above</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Pick Layout</p>
                      <p className="text-sm text-gray-600">Select floor plan</p>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Mark Location</p>
                      <p className="text-sm text-gray-600">Click on blueprint</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8">
                <p className="text-gray-500 text-sm">
                  Ready to create your first task? 
                  <span className="text-teal-700 font-medium"> Select a project from the dropdown above ↗</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row gap-4 md:gap-6 h-full min-h-[600px]">
            {/* SIDEBAR: Shows layout images from Project API */}
            <aside className="w-full sm:w-full xl:w-72 bg-white border border-[#dce7e1] rounded-2xl shadow-sm flex flex-col flex-shrink-0">
              <div className="p-5 border-b border-gray-200/50 flex-shrink-0">
                <h2 className="text-sm font-bold text-gray-800 mb-1">Floor Layouts</h2>
                <p className="text-[11px] text-gray-500 font-medium">
                  Select a floor plan from project files
                </p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 min-h-0">
                {(!project?.layoutImages || project.layoutImages.length === 0) ? (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 text-sm">No layouts found</p>
                    <p className="text-gray-400 text-xs mt-1">Upload floor plans to get started</p>
                  </div>
                ) : (
                  <LayoutList 
                    layouts={project.layoutImages} 
                    selectedLayout={selectedLayout}
                    onSelect={setSelectedLayout} 
                  />
                )}
              </div>
            </aside>

            {/* WORKSPACE: The Interactive Blueprint */}
            <section className="flex-1 bg-white border border-[#dce7e1] rounded-2xl shadow-sm flex flex-col min-h-0">
              <div className="p-4 border-b border-gray-200/50 flex justify-between items-center bg-white/50 flex-shrink-0 rounded-t-2xl">
                <div>
                  <h2 className="text-sm font-bold text-gray-800">Blueprint Workspace</h2>
                  <p className="text-[11px] text-gray-500">Mark exact task location on floor plan</p>
                </div>
                {coordinates && (
                  <div className="text-xs text-gray-600 bg-[#e6f3ee] border border-[#b9d9cf] px-3 py-1 rounded-full">
                    Position: {coordinates.x?.toFixed(0)}, {coordinates.y?.toFixed(0)}
                  </div>
                )}
              </div>

              <div className="flex-1 relative bg-gradient-to-br from-gray-50/50 to-slate-50/50 min-h-0 rounded-b-2xl">
                {selectedLayout ? (
                  <BlueprintViewer 
                    layoutUrl={selectedLayout} 
                    coordinates={coordinates} 
                    onPick={setCoordinates} 
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">Select a layout to begin</p>
                      <p className="text-gray-400 text-sm mt-1">Choose a floor plan from the sidebar</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* TASK FORM MODAL */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col">
            <div className="p-4 border-b flex justify-between items-center flex-shrink-0 bg-white rounded-t-2xl">
              <h2 className="font-bold text-gray-800">Task Details</h2>
              <button 
                onClick={() => setShowTaskForm(false)} 
                className="text-gray-400 hover:text-gray-600 font-bold text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <CreateTaskForm
                project={project}
                layoutImage={selectedLayout}
                coordinates={coordinates}
                onTaskCreated={handleTaskCreated}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
