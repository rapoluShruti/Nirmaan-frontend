// // // // export default function LayoutTaskMap({ layout, tasks, onSelect }) {
// // // //   return (
// // // //     <div className="relative border">
// // // //       <img src={layout} className="w-full" />
// // // //       {tasks.map((t) => (
// // // //         <button
// // // //           key={t._id}
// // // //           className="absolute w-4 h-4 bg-red-500 rounded-full"
// // // //           style={{
// // // //             left: `${t.coordinates.xPercent}%`,
// // // //             top: `${t.coordinates.yPercent}%`,
// // // //             transform: "translate(-50%, -50%)",
// // // //           }}
// // // //           onClick={() => onSelect(t)}
// // // //         />
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }
// // // // // export default function LayoutTaskMap({
// // // // //   layoutImage,
// // // // //   tasks,
// // // // //   onSelectTask,
// // // // // }) {
// // // // //   return (
// // // // //     <div className="relative border">
// // // // //       <img src={layoutImage} alt="Layout" className="w-full" />

// // // // //       {tasks.map((task) => (
// // // // //         <button
// // // // //           key={task._id}
// // // // //           onClick={() => onSelectTask(task)}
// // // // //           className="absolute w-3 h-3 bg-red-500 rounded-full"
// // // // //           style={{
// // // // //             left: `${task.coordinates.xPercent}%`,
// // // // //             top: `${task.coordinates.yPercent}%`,
// // // // //             transform: "translate(-50%, -50%)",
// // // // //           }}
// // // // //           title={task.taskId}
// // // // //         />
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // export default function LayoutTaskMap({ layoutImage, tasks, selectedTask, onSelectTask }) {
// // // // //   return (
// // // // //     <div className="relative w-full h-full">
// // // // //       <img src={layoutImage} alt="Layout" className="w-full h-full object-contain" />

// // // // //       {tasks.map(task => {
// // // // //         const isActive = selectedTask?._id === task._id;

// // // // //         return (
// // // // //           <button
// // // // //             key={task._id}
// // // // //             onClick={() => onSelectTask(task)}
// // // // //             title={task.taskId}
// // // // //             className={`absolute rounded-full transition-all
// // // // //               ${isActive
// // // // //                 ? "w-4 h-4 bg-red-600 animate-ping"
// // // // //                 : "w-3 h-3 bg-red-500"}
// // // // //             `}
// // // // //             style={{
// // // // //               left: `${task.coordinates.xPercent}%`,
// // // // //               top: `${task.coordinates.yPercent}%`,
// // // // //               transform: "translate(-50%, -50%)",
// // // // //             }}
// // // // //           />
// // // // //         );
// // // // //       })}
// // // // //     </div>
// // // // //   );
// // // // // }
// // // export default function LayoutTaskMap({
// // //   layoutImage,
// // //   tasks,
// // //   onSelectTask,
// // // }) {
// // //   return (
// // //     <div className="relative border">
// // //       <img src={layoutImage} alt="Layout" className="w-full" />

// // //       {tasks.map((task) => (
// // //         <button
// // //           key={task._id}
// // //           onClick={() => onSelectTask(task)}
// // //           className="absolute w-3 h-3 bg-red-500 rounded-full"
// // //           style={{
// // //             left: `${task.coordinates.xPercent}%`,
// // //             top: `${task.coordinates.yPercent}%`,
// // //             transform: "translate(-50%, -50%)",
// // //           }}
// // //           title={task.taskId}
// // //         />
// // //       ))}
// // //     </div>
// // //   );
// // // }
// // export default function LayoutTaskMap({
// //   layoutImage,
// //   tasks,
// //   onSelectTask,
// // }) {
// //   return (
// //     <div className="relative border overflow-hidden">
// //       <img
// //         src={layoutImage}
// //         alt="Layout"
// //         className="w-full select-none"
// //       />

// //       {tasks.map((task) => {
// //         const isLocked = !!task.afterPhotoUrl;

// //         return (
// //           <button
// //             key={task._id}
// //             disabled={isLocked}
// //             onClick={() => {
// //               if (!isLocked) onSelectTask(task);
// //             }}
// //             title={
// //               isLocked
// //                 ? "LOCKED – Contact owner if this is an error"
// //                 : task.taskId
// //             }
// //             className={`
// //               absolute rounded-full transition-all
// //               ${isLocked
// //                 ? "w-3 h-3 bg-gray-400 cursor-not-allowed"
// //                 : "w-3 h-3 bg-red-500 hover:scale-110"}
// //             `}
// //             style={{
// //               left: `${task.coordinates.xPercent}%`,
// //               top: `${task.coordinates.yPercent}%`,
// //               transform: "translate(-50%, -50%)",
// //             }}
// //           />
// //         );
// //       })}
// //     </div>
// //   );
// // }
// export default function LayoutTaskMap({
//   layoutImage,
//   tasks,
//   onSelectTask,
// }) {
//   return (
//     <div className="relative border">
//       <img src={layoutImage} alt="Layout" className="w-full" />

//       {tasks.map((task) => {
//         const isLocked = !!task.afterPhotoUrl;

//         return (
//           <button
//             key={task._id}
//             onClick={() => onSelectTask(task)} // ✅ STILL CLICKABLE
//             title={task.taskId}
//             className={`absolute w-3 h-3 rounded-full
//               ${isLocked ? "bg-gray-400" : "bg-red-500"}
//             `}
//             style={{
//               left: `${task.coordinates.xPercent}%`,
//               top: `${task.coordinates.yPercent}%`,
//               transform: "translate(-50%, -50%)",
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// }
// const BACKEND_URL = "http://localhost:2026";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function LayoutTaskMap({
  layoutImage,
  tasks,
  onSelectTask,
  selectedTask, // 👈 pass this from parent
}) {
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
                      src={`${BACKEND_URL}${task.beforePhotoUrl}`}
                      className="w-full h-20 object-cover rounded-lg"
                      alt="Before"
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
                      src={`${BACKEND_URL}${task.afterPhotoUrl}`}
                      className="w-full h-20 object-cover rounded-lg"
                      alt="After"
                    />
                  ) : (
                    <div className="italic text-gray-400">
                      Not completed
                    </div>
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
