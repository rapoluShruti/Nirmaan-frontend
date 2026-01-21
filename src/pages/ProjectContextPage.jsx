// // import { useState } from "react";
// // import ProjectSelector from "../components/ProjectSelector";
// // import LayoutList from "../components/LayoutList";
// // import BlueprintViewer from "../components/BlueprintViewer";
// // import CreateTaskForm from "../components/CreateTaskForm";

// // export default function ProjectContextPage() {
// //   const [project, setProject] = useState(null);
// //   const [selectedLayout, setSelectedLayout] = useState(null);
// //   const [coordinates, setCoordinates] = useState(null);

// //   return (
// //     <div className="p-6 space-y-6 max-w-6xl mx-auto">
// //       <h1 className="text-2xl font-bold">Create Task</h1>

// //       <ProjectSelector
// //         onSelect={(p) => {
// //           setProject(p);
// //           setSelectedLayout(null);
// //           setCoordinates(null);
// //         }}
// //       />

// //       {project && !selectedLayout && (
// //         <LayoutList
// //           layouts={project.layoutImages || []}
// //           onSelect={setSelectedLayout}
// //         />
// //       )}

// //       {selectedLayout && (
// //         <BlueprintViewer
// //           layoutUrl={selectedLayout}
// //           coordinates={coordinates}
// //           onPick={setCoordinates}
// //         />
// //       )}

// //       {project && selectedLayout && coordinates && (
// //         <CreateTaskForm
// //           project={project}
// //           layoutImage={selectedLayout}
// //           coordinates={coordinates}
// //         />
// //       )}
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
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleTaskCreated = () => {
//     setCoordinates(null);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
//       {/* Sidebar Mockup - Matching Reference Side Nav */}
//       <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col p-6">
//         <div className="flex items-center gap-2 mb-10">
//           <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">ABC</div>
//           <span className="font-bold text-lg tracking-tight text-gray-700">ABC Constructions</span>
//         </div>
//         <nav className="space-y-2">
//           <div className="px-4 py-3 rounded-xl bg-orange-50 text-orange-600 font-semibold flex items-center gap-3">
//              <span>📋 Overview</span>
//           </div>
//           <div className="px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">Worker Management</div>
//           <div className="px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">Payment Management</div>
//         </nav>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 p-8">
//         <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Project Context</h1>
//             <p className="text-gray-500 text-sm">Select a project and layout to pin a task location</p>
//           </div>
//           <div className="w-full md:w-64 bg-white shadow-sm border border-gray-100 rounded-xl p-2">
//             <ProjectSelector
//               onSelect={(p) => {
//                 setProject(p);
//                 setSelectedLayout(null);
//                 setCoordinates(null);
//               }}
//             />
//           </div>
//         </header>

//         <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
//           {/* Left Side: Layout List */}
//           <section className="xl:col-span-3">
//             <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm h-full">
//               <h3 className="font-bold mb-4 text-gray-700 flex items-center gap-2">
//                 <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs flex items-center justify-center">1</span>
//                 Available Layouts
//               </h3>
//               <LayoutList
//                 layouts={project?.layoutImages || []}
//                 onSelect={setSelectedLayout}
//                 selectedLayout={selectedLayout}
//               />
//             </div>
//           </section>

//           {/* Right Side: Blueprint Viewer */}
//           <section className="xl:col-span-9">
//             <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm min-h-[500px] flex flex-col">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-bold text-gray-700 flex items-center gap-2">
//                   <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs flex items-center justify-center">2</span>
//                   Blueprint Interaction
//                 </h3>
//                 {coordinates && (
//                   <button 
//                     onClick={() => setIsModalOpen(true)}
//                     className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-all font-medium shadow-md shadow-orange-100"
//                   >
//                     + Pin Task Here
//                   </button>
//                 )}
//               </div>
              
//               <div className="flex-1 relative bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
//                 {selectedLayout ? (
//                   <BlueprintViewer
//                     layoutUrl={selectedLayout}
//                     coordinates={coordinates}
//                     onPick={setCoordinates}
//                   />
//                 ) : (
//                   <div className="absolute inset-0 flex items-center justify-center text-gray-400">
//                     Select a layout to view blueprint
//                   </div>
//                 )}
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* Modal-style Task Form (Matches reference image popup) */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="w-full max-w-2xl animate-in fade-in zoom-in duration-200">
//               <CreateTaskForm
//                 project={project}
//                 layoutImage={selectedLayout}
//                 coordinates={coordinates}
//                 onTaskCreated={handleTaskCreated}
//                 onClose={() => setIsModalOpen(false)}
//               />
//             </div>
//           </div>
//         )}
//       </main>
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
    <div className="flex flex-col h-screen bg-[#f9fafb] font-sans">
      {/* HEADER: Backend Project Selector Integrated */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Project / <span className="text-gray-600">Create Task</span></p>
            <h1 className="text-lg font-bold text-gray-800">{project?.name || "Select a Project"}</h1>
          </div>
          <div className="w-72">
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
          className="bg-[#f27420] text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#e66310] disabled:opacity-50 transition-all shadow-sm"
        >
          <span className="text-xl">+</span> Create Task
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden p-6 gap-6">
        {/* SIDEBAR: Shows layout images from Project API */}
        <aside className="w-72 bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col">
          <h2 className="text-sm font-bold text-gray-800 mb-1">Floor Layouts</h2>
          <p className="text-[11px] text-gray-400 mb-4 font-medium">Select a floor plan from project files</p>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <LayoutList 
              layouts={project?.layoutImages || []} 
              selectedLayout={selectedLayout}
              onSelect={setSelectedLayout} 
            />
          </div>
        </aside>

        {/* WORKSPACE: The Interactive Blueprint */}
        <main className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden relative">
          <div className="p-4 border-b flex justify-between items-center bg-white z-10">
            <div>
              <h2 className="text-sm font-bold text-gray-800">Blueprint Workspace</h2>
              <p className="text-[11px] text-gray-400">Mark exact task location on floor plan</p>
            </div>
          </div>

          <div className="flex-1 relative bg-gray-50/50">
            <BlueprintViewer 
              layoutUrl={selectedLayout} 
              coordinates={coordinates} 
              onPick={setCoordinates} 
            />
          </div>
        </main>
      </div>

      {/* TASK FORM MODAL */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
               <h2 className="font-bold text-gray-800">Task Details</h2>
               <button onClick={() => setShowTaskForm(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>
            <CreateTaskForm
              project={project}
              layoutImage={selectedLayout}
              coordinates={coordinates}
              onTaskCreated={handleTaskCreated}
            />
          </div>
        </div>
      )}
    </div>
  );
}