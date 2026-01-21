import { useNavigate } from "react-router-dom";

export default function PagePreviewCard({ title, route }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      style={{
        width: "420px",          // 👈 fixed card width
        height: "260px",         // 👈 fixed card height
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        background: "#fff",
        position: "relative",
        cursor: "pointer",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          background: "rgba(0,0,0,0.75)",
          color: "#fff",
          padding: "5px 12px",
          borderRadius: "14px",
          fontSize: "12px",
        }}
      >
        {title}
      </div>

      {/* Scaled real page */}
      <iframe
        src={route}
        title={title}
        style={{
          width: "1440px",
          height: "900px",
          transform: "scale(0.28)",   // 👈 KEY CHANGE
          transformOrigin: "top left",
          pointerEvents: "none",
          border: "none",
        }}
      />
    </div>
  );
}
