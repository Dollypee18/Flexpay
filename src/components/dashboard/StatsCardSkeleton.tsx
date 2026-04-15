import Skeleton from "@/components/ui/Skeleton";

export default function StatsCardSkeleton() {
  return (
    <div
      style={{
        backgroundColor: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Skeleton width="60%" height="11px" />
      <div style={{ marginTop: "10px" }}>
        <Skeleton width="80%" height="28px" />
      </div>
      <div style={{ marginTop: "6px" }}>
        <Skeleton width="40%" height="11px" />
      </div>
    </div>
  );
}
