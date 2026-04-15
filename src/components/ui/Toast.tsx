"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({
  message,
  type = "success",
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 100,
        padding: "12px 16px",
        borderRadius: "6px",
        fontSize: "13px",
        color: "#F0F0F0",
        backgroundColor: type === "success" ? "#00C89620" : "#FF4D4D20",
        border: `1px solid ${type === "success" ? "#00C89650" : "#FF4D4D50"}`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        maxWidth: "320px",
      }}
    >
      {message}
    </div>
  );
}
