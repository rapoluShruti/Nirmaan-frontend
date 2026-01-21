export default function LayoutPicker({ layouts, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {layouts.map((img) => (
        <img
          key={img}
          src={img}
          className="border cursor-pointer hover:border-orange-500"
          onClick={(e) => {
            const rect = e.target.getBoundingClientRect();
            const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
            const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
            onSelect(img, { xPercent, yPercent });
          }}
        />
      ))}
    </div>
  );
}
