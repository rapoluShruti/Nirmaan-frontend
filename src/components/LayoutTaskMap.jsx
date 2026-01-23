
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// export default function LayoutTaskMap({
//   layoutImage,
//   tasks,
//   onSelectTask,
//   selectedTask, // 👈 pass this from parent
// }) {
//   return (
//     <div className="relative border overflow-hidden bg-gray-50">
//       <img
//         src={layoutImage}
//         alt="Layout"
//         className="w-full select-none"
//       />

//       {tasks.map((task) => {
//         const isLocked = task.isLocked === true;
//         const isSelected = selectedTask?._id === task._id;

//         return (
//           <div
//             key={task._id}
//             className="absolute group"
//             style={{
//               left: `${task.coordinates.xPercent}%`,
//               top: `${task.coordinates.yPercent}%`,
//               transform: "translate(-50%, -50%)",
//             }}
//           >
//             {/* ===== DOT (CLEAN & PROFESSIONAL) ===== */}
//             <button
//               onClick={() => onSelectTask(task)}
//               title={task.taskId}
//               className={`
//                 relative
//                 w-4 h-4
//                 rounded-full
//                 flex items-center justify-center
//                 transition-all
//                 ${
//                   isLocked
//                     ? "bg-gray-300"
//                     : "bg-orange-500"
//                 }
//                 ${isSelected ? "animate-pulse ring-4 ring-orange-300" : "ring-2 ring-white"}
//               `}
//             >
//               {/* inner dot */}
//               <span
//                 className={`
//                   w-1.5 h-1.5 rounded-full
//                   ${isLocked ? "bg-gray-500" : "bg-white"}
//                 `}
//               />
//             </button>

//             {/* ===== HOVER PREVIEW (POLISHED) ===== */}
//             <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden group-hover:block z-50">
//               <div className="bg-white rounded-xl shadow-xl border p-3 w-56 space-y-2 text-xs">

//                 <div className="font-semibold text-gray-800">
//                   {task.title || task.taskId}
//                 </div>

//                 {/* BEFORE PHOTO */}
//                 <div>
//                   <div className="text-gray-400 mb-1">Before</div>
//                   {task.beforePhotoUrl ? (
//                     <img
//                       src={`${BACKEND_URL}${task.beforePhotoUrl}`}
//                       className="w-full h-20 object-cover rounded-lg"
//                       alt="Before"
//                     />
//                   ) : (
//                     <div className="italic text-gray-400">
//                       Not uploaded
//                     </div>
//                   )}
//                 </div>

//                 {/* AFTER PHOTO */}
//                 <div>
//                   <div className="text-gray-400 mb-1">After</div>
//                   {task.afterPhotoUrl ? (
//                     <img
//                       src={`${BACKEND_URL}${task.afterPhotoUrl}`}
//                       className="w-full h-20 object-cover rounded-lg"
//                       alt="After"
//                     />
//                   ) : (
//                     <div className="italic text-gray-400">
//                       Not completed
//                     </div>
//                   )}
//                 </div>

//                 {isLocked && (
//                   <div className="text-green-700 font-semibold pt-1">
//                     🔒 Task Locked
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Helper function to construct proper image URLs
const getImageUrl = (photoUrl) => {
  if (!photoUrl) return null;
  if (photoUrl.startsWith('http')) return photoUrl;
  
  const cleanBackendUrl = BACKEND_URL.endsWith('/') ? BACKEND_URL.slice(0, -1) : BACKEND_URL;
  return `${cleanBackendUrl}${photoUrl}`;
};

export default function LayoutTaskMap({
  layoutImage,
  tasks,
  onSelectTask,
  selectedTask,
}) {
  // Debug logging to see what data we're getting
  useEffect(() => {
    console.log('LayoutTaskMap - Tasks data:', tasks);
    tasks.forEach(task => {
      console.log(`Task ${task.taskId}:`, {
        beforePhotoUrl: task.beforePhotoUrl,
        afterPhotoUrl: task.afterPhotoUrl,
        status: task.status,
        isLocked: task.isLocked,
        beforeImageUrl: getImageUrl(task.beforePhotoUrl),
        afterImageUrl: getImageUrl(task.afterPhotoUrl)
      });
    });
  }, [tasks]);

  return (
    <div className="relative border overflow-hidden bg-gray-50">
      <img
        src={layoutImage}
        alt="Layout"
        className="w-full select-none"
      />

      {tasks.map((task) => {
        const isLocked = task.isLocked === true;
        const isSelected = selectedTask?._id === task._id;

        return (
          <div
            key={task._id}
            className="absolute group"
            style={{
              left: `${task.coordinates.xPercent}%`,
              top: `${task.coordinates.yPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* ===== DOT (CLEAN & PROFESSIONAL) ===== */}
            <button
              onClick={() => onSelectTask(task)}
              title={task.taskId}
              className={`
                relative
                w-4 h-4
                rounded-full
                flex items-center justify-center
                transition-all
                ${
                  isLocked
                    ? "bg-gray-300"
                    : "bg-orange-500"
                }
                ${isSelected ? "animate-pulse ring-4 ring-orange-300" : "ring-2 ring-white"}
              `}
            >
              {/* inner dot */}
              <span
                className={`
                  w-1.5 h-1.5 rounded-full
                  ${isLocked ? "bg-gray-500" : "bg-white"}
                `}
              />
            </button>

            {/* ===== HOVER PREVIEW (POLISHED) ===== */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden group-hover:block z-50">
              <div className="bg-white rounded-xl shadow-xl border p-3 w-56 space-y-2 text-xs">

                <div className="font-semibold text-gray-800">
                  {task.title || task.taskId}
                </div>

                {/* BEFORE PHOTO */}
                <div>
                  <div className="text-gray-400 mb-1">Before</div>
                  {task.beforePhotoUrl ? (
                    <img
                      src={getImageUrl(task.beforePhotoUrl)}
                      className="w-full h-20 object-cover rounded-lg"
                      alt="Before"
                      onError={(e) => {
                        console.log('Before image failed to load:', e.target.src);
                        console.log('Raw beforePhotoUrl:', task.beforePhotoUrl);
                        console.log('BACKEND_URL:', BACKEND_URL);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('Before image loaded successfully:', getImageUrl(task.beforePhotoUrl));
                      }}
                    />
                  ) : (
                    <div className="italic text-gray-400">
                      Not uploaded
                    </div>
                  )}
                </div>

                {/* AFTER PHOTO */}
                <div>
                  <div className="text-gray-400 mb-1">After</div>
                  {task.afterPhotoUrl ? (
                    <img
                      src={getImageUrl(task.afterPhotoUrl)}
                      className="w-full h-20 object-cover rounded-lg"
                      alt="After"
                      onError={(e) => {
                        console.log('After image failed to load:', e.target.src);
                        console.log('Raw afterPhotoUrl:', task.afterPhotoUrl);
                        console.log('BACKEND_URL:', BACKEND_URL);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('After image loaded successfully:', getImageUrl(task.afterPhotoUrl));
                      }}
                    />
                  ) : (
                    <div className="italic text-gray-400">
                      Not completed
                    </div>
                  )}
                </div>

                {/* STATUS INFO */}
                <div className="pt-1 text-xs">
                  <div className="text-gray-500">Status: {task.status}</div>
                  {task.approved && (
                    <div className="text-green-600">✓ Approved</div>
                  )}
                </div>

                {isLocked && (
                  <div className="text-green-700 font-semibold pt-1">
                    🔒 Task Locked
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}