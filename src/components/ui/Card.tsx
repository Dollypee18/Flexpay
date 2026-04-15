interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({ children }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: "8px",
        padding: "24px",
      }}
    >
      {children}
    </div>
  );
}
