import PagePreviewCard from "./PagePreviewCard";

export default function Overview() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        padding: "32px",
      }}
    >
      <h1 style={{ color: "#fff", fontSize: "24px", marginBottom: "24px" }}>
        Project Feature Overview
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "32px",
        }}
      >
        <PagePreviewCard
          title="Create Project"
          route="/create"
        />

        <PagePreviewCard
          title="Create Task & Map View"
          route="/task"
        />
      </div>
    </div>
  );
}
