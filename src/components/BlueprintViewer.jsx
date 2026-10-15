import { useRef } from "react";

export default function BlueprintViewer({
  layoutUrl,
  coordinates,
  onPick
}) {
  const imgRef = useRef(null);

  const handleClick = (e) => {
    const rect = imgRef.current.getBoundingClientRect();

    const xPercent =
      ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent =
      ((e.clientY - rect.top) / rect.height) * 100;

    onPick({
      xPercent: Number(xPercent.toFixed(2)),
      yPercent: Number(yPercent.toFixed(2)),
    });
  };

  return (
    <div className="relative border rounded overflow-hidden">
      <img
        ref={imgRef}
        src={layoutUrl}
        alt="Blueprint"
        onClick={handleClick}
        className="w-full cursor-crosshair select-none"
        draggable={false}
      />

      {/* Marker */}
      {coordinates && (
        <div
          className="absolute w-4 h-4 bg-red-600 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${coordinates.xPercent}%`,
            top: `${coordinates.yPercent}%`,
          }}
        />
      )}
    </div>
  );
}
// import { useRef } from "react";

// export default function BlueprintViewer({ layoutUrl, coordinates, onPick }) {
//   const containerRef = useRef(null);

//   const handleClick = (e) => {
//     if (!containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();
    
//     // Calculate relative coordinates for backend
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;

//     onPick({
//       xPercent: Number(x.toFixed(1)),
//       yPercent: Number(y.toFixed(1)),
//     });
//   };

//   return (
//     <div className="absolute inset-0 flex items-center justify-center bg-gray-50/30">
//       {/* Background Micro-Grid Pattern */}
//       <div className="absolute inset-0 opacity-[0.2] pointer-events-none" 
//         style={{ 
//           backgroundImage: `linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)`,
//           backgroundSize: '25px 25px' 
//         }}>
//       </div>

//       {/* BLUEPRINT CONTAINER */}
//       <div 
//         ref={containerRef}
//         onClick={handleClick}
//         className="relative z-10 w-[85%] h-[75%] bg-white border-[3px] border-slate-400 shadow-2xl cursor-crosshair overflow-hidden"
//       >
//         {/* THE ACTUAL ARCHITECTURAL IMAGE (Visible Layout) */}
//         {layoutUrl && (
//           <img 
//             src={layoutUrl} 
//             alt="Floor Plan" 
//             className="absolute inset-0 w-full h-full object-contain opacity-80" 
//           />
//         )}

//         {/* OVERLAY GRID (2x3 Rooms) */}
//         <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 pointer-events-none">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="border border-slate-200/50 relative">
//               <span className="absolute top-2 left-2 text-[8px] font-bold text-slate-400 uppercase">
//                 Area {i + 1}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* TASK MARKER (The Pin) */}
//         {coordinates && (
//           <div
//             className="absolute -translate-x-1/2 -translate-y-[90%] z-20 transition-all duration-200"
//             style={{ left: `${coordinates.xPercent}%`, top: `${coordinates.yPercent}%` }}
//           >
//             <div className="flex flex-col items-center drop-shadow-lg">
//               <div className="w-7 h-7 bg-[#0f766e] rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold shadow-md">
//                 1
//               </div>
//               <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0f766e] -mt-1"></div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* POSITION BOX (Bottom Left) */}
//       {coordinates && (
//         <div className="absolute bottom-6 left-6 bg-white border border-gray-200 rounded-lg shadow-md p-3 z-30 min-w-[150px]">
//           <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Current Position</p>
//           <div className="flex justify-between text-xs font-bold text-gray-700">
//             <span>X: {coordinates.xPercent}%</span>
//             <span className="text-gray-200">|</span>
//             <span>Y: {coordinates.yPercent}%</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// import { useRef } from "react";

// export default function BlueprintViewer({ layoutUrl, coordinates, onPick }) {
//   const containerRef = useRef(null);
//   const imgRef = useRef(null);

//   const handleClick = (e) => {
//     if (!containerRef.current || !imgRef.current) return;

//     const containerRect = containerRef.current.getBoundingClientRect();

//     // Actual rendered image size (important for object-contain)
//     const imgWidth = imgRef.current.clientWidth;
//     const imgHeight = imgRef.current.clientHeight;

//     // Letterboxing offset caused by object-contain
//     const offsetX = (containerRect.width - imgWidth) / 2;
//     const offsetY = (containerRect.height - imgHeight) / 2;

//     // Click position relative to image
//     const clickX = e.clientX - containerRect.left - offsetX;
//     const clickY = e.clientY - containerRect.top - offsetY;

//     // Ignore clicks outside image area
//     if (
//       clickX < 0 ||
//       clickY < 0 ||
//       clickX > imgWidth ||
//       clickY > imgHeight
//     ) {
//       return;
//     }

//     const xPercent = (clickX / imgWidth) * 100;
//     const yPercent = (clickY / imgHeight) * 100;

//     onPick({
//       xPercent: Number(xPercent.toFixed(1)),
//       yPercent: Number(yPercent.toFixed(1)),
//     });
//   };

//   return (
//     <div className="absolute inset-0 flex items-center justify-center bg-gray-50/30">
//       {/* Background Micro Grid */}
//       <div
//         className="absolute inset-0 opacity-[0.2] pointer-events-none"
//         style={{
//           backgroundImage: `
//             linear-gradient(#cbd5e1 1px, transparent 1px),
//             linear-gradient(90deg, #cbd5e1 1px, transparent 1px)
//           `,
//           backgroundSize: "25px 25px",
//         }}
//       />

//       {/* Blueprint Container */}
//       <div
//         ref={containerRef}
//         onClick={handleClick}
//         className="relative z-10 w-[85%] h-[75%] bg-white border-[3px] border-slate-400 shadow-2xl cursor-crosshair overflow-hidden"
//       >
//         {/* Blueprint Image */}
//         {layoutUrl ? (
//           <img
//             ref={imgRef}
//             src={layoutUrl}
//             alt="Floor Plan"
//             className="absolute inset-0 w-full h-full object-contain opacity-90 select-none pointer-events-none"
//           />
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
//             Select a layout to begin
//           </div>
//         )}

//         {/* Overlay Grid (Rooms) */}
//         <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 pointer-events-none">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="border border-slate-200/50 relative">
//               <span className="absolute top-2 left-2 text-[8px] font-bold text-slate-400 uppercase">
//                 Area {i + 1}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Task Marker */}
//         {coordinates && (
//           <div
//             className="absolute z-20 transition-all duration-150"
//             style={{
//               left: `${coordinates.xPercent}%`,
//               top: `${coordinates.yPercent}%`,
//               transform: "translate(-50%, -90%)",
//             }}
//           >
//             <div className="flex flex-col items-center drop-shadow-lg">
//               <div className="w-7 h-7 bg-[#0f766e] rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold shadow-md">
//                 1
//               </div>
//               <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0f766e] -mt-1" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Position Info Box */}
//       {coordinates && (
//         <div className="absolute bottom-6 left-6 bg-white border border-gray-200 rounded-lg shadow-md p-3 z-30 min-w-[150px]">
//           <p className="text-[9px] text-gray-400 font-black uppercase mb-1">
//             Current Position
//           </p>
//           <div className="flex justify-between text-xs font-bold text-gray-700">
//             <span>X: {coordinates.xPercent}%</span>
//             <span className="text-gray-300">|</span>
//             <span>Y: {coordinates.yPercent}%</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
