interface StatsCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}

export default function StatsCard({
  label,
  value,
  sub,
  accent = false,
}: StatsCardProps) {
  return (
    <div
      style={{
        backgroundColor: accent ? "#00C89610" : "#161616",
        border: `1px solid ${accent ? "#00C89630" : "#2A2A2A"}`,
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          color: "#888888",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontWeight: 500,
          marginBottom: "8px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "22px",
          fontWeight: 600,
          color: accent ? "#00C896" : "#F0F0F0",
          fontFamily: "DM Mono, monospace",
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          style={{
            fontSize: "11px",
            color: "#555555",
            marginTop: "4px",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
