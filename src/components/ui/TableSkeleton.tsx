import Skeleton from "@/components/ui/Skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({
  rows = 5,
  columns = 4,
}: TableSkeletonProps) {
  return (
    <div
      style={{
        backgroundColor: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          padding: "12px 20px",
          borderBottom: "1px solid #2A2A2A",
          gap: "16px",
        }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} width="60%" height="11px" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            padding: "16px 20px",
            borderBottom: rowIndex < rows - 1 ? "1px solid #2A2A2A" : "none",
            gap: "16px",
            alignItems: "center",
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              width={colIndex === 0 ? "80%" : "50%"}
              height="13px"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
