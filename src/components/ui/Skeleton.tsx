interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export default function Skeleton({
  width = "100%",
  height = "16px",
  borderRadius = "4px",
}: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#1E1E1E",
        backgroundImage:
          "linear-gradient(90deg, #1E1E1E 25%, #2A2A2A 50%, #1E1E1E 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
}
