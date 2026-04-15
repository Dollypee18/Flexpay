"use client";

import Button from "@/components/ui/Button";
import { OnboardingData } from "@/types";
import { useState } from "react";

interface Props {
  data: OnboardingData;
  onBack: () => void;
  onSubmit: () => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex justify-between py-2.5"
      style={{ borderBottom: "1px solid #2A2A2A" }}
    >
      <span className="text-xs" style={{ color: "#888888" }}>
        {label}
      </span>
      <span className="text-xs font-medium" style={{ color: "#F0F0F0" }}>
        {value || "—"}
      </span>
    </div>
  );
}

export default function StepReview({ data, onBack, onSubmit }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    onSubmit();
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-lg p-4"
        style={{ backgroundColor: "#161616", border: "1px solid #2A2A2A" }}
      >
        <p
          className="text-xs font-medium uppercase tracking-wider mb-3"
          style={{ color: "#555555" }}
        >
          Personal
        </p>
        <Row label="Full name" value={data.fullName} />
        <Row label="Phone" value={data.phone} />
        <Row label="Country" value={data.country} />
      </div>

      <div
        className="rounded-lg p-4"
        style={{ backgroundColor: "#161616", border: "1px solid #2A2A2A" }}
      >
        <p
          className="text-xs font-medium uppercase tracking-wider mb-3"
          style={{ color: "#555555" }}
        >
          Business
        </p>
        <Row label="Business name" value={data.businessName} />
        <Row label="Type" value={data.businessType} />
        <Row label="Website" value={data.website || "—"} />
      </div>

      <div
        className="rounded-lg p-4"
        style={{ backgroundColor: "#161616", border: "1px solid #2A2A2A" }}
      >
        <p
          className="text-xs font-medium uppercase tracking-wider mb-3"
          style={{ color: "#555555" }}
        >
          Identity
        </p>
        <Row label="ID type" value={data.idType} />
        <Row label="ID number" value={data.idNumber} />
      </div>

      <div className="flex gap-3 mt-2">
        <Button
          variant="secondary"
          onClick={onBack}
          size="lg"
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          loading={loading}
          size="lg"
          className="flex-1"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
