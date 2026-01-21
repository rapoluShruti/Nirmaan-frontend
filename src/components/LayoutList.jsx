// export default function LayoutList({ layouts, onSelect }) {
//   if (!layouts || layouts.length === 0) {
//     return <p className="text-gray-500">No layouts available</p>;
//   }

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//       {layouts.map((url, idx) => (
//         <button
//           key={idx}
//           onClick={() => onSelect(url)}
//           className="border rounded overflow-hidden hover:ring-2 hover:ring-orange-500"
//         >
//           <img
//             src={url}
//             alt={`Layout ${idx + 1}`}
//             className="w-full h-40 object-cover"
//           />
//         </button>
//       ))}
//     </div>
//   );
// }
export default function LayoutList({ layouts, selectedLayout, onSelect }) {
  if (!layouts.length) return <div className="text-[11px] text-gray-400 italic text-center py-10 border-2 border-dashed rounded-xl">No layouts available for this project</div>;

  return (
    <div className="space-y-4">
      {layouts.map((url, idx) => {
        const active = selectedLayout === url;
        return (
          <button
            key={idx}
            onClick={() => onSelect(url)}
            className={`w-full group transition-all text-left rounded-xl overflow-hidden border-2 ${active ? "border-[#f27420] shadow-md" : "border-gray-100 hover:border-gray-300"}`}
          >
            <div className="bg-gray-100 aspect-[16/10] flex items-center justify-center p-2">
              <img src={url} alt="" className={`max-h-full object-contain ${!active && "opacity-60 grayscale"}`} />
            </div>
            <div className={`py-2.5 text-center text-[11px] font-bold ${active ? "bg-orange-50 text-[#f27420]" : "bg-gray-50 text-gray-500"}`}>
              Floor Layout {idx + 1}
            </div>
          </button>
        );
      })}
    </div>
  );
}