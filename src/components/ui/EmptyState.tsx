interface EmptyStateProps {
  message?: string;
  sub?: string;
}

export default function EmptyState({
  message = "Nothing here yet.",
  sub,
}: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
        backgroundColor: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: "8px",
      }}
    >
      <p style={{ fontSize: "13px", color: "#555555", marginBottom: "4px" }}>
        {message}
      </p>
      {sub && <p style={{ fontSize: "12px", color: "#3A3A3A" }}>{sub}</p>}
    </div>
  );
}
