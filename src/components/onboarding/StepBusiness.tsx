"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { OnboardingData } from "@/types";

interface Props {
  data: OnboardingData;
  onChange: (field: keyof OnboardingData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

interface Errors {
  businessName?: string;
  businessType?: string;
}

function validate(data: OnboardingData): Errors {
  const errors: Errors = {};
  if (!data.businessName.trim())
    errors.businessName = "Business name is required.";
  if (!data.businessType.trim())
    errors.businessType = "Business type is required.";
  return errors;
}

export default function StepBusiness({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const [errors, setErrors] = useState<Errors>({});

  function handleNext() {
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onNext();
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Business name"
        value={data.businessName}
        onChange={(e) => onChange("businessName", e.target.value)}
        error={errors.businessName}
        placeholder="Ada Designs Ltd"
      />
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "#888888" }}
        >
          Business type
        </label>
        <select
          value={data.businessType}
          onChange={(e) => onChange("businessType", e.target.value)}
          style={{
            backgroundColor: "#1E1E1E",
            border: `1px solid ${errors.businessType ? "#FF4D4D" : "#2A2A2A"}`,
            borderRadius: "4px",
            padding: "10px 12px",
            color: data.businessType ? "#F0F0F0" : "#555555",
            fontSize: "14px",
            outline: "none",
            width: "100%",
          }}
        >
          <option value="">Select type</option>
          <option value="freelancer">Freelancer</option>
          <option value="agency">Agency</option>
          <option value="consultant">Consultant</option>
          <option value="other">Other</option>
        </select>
        {errors.businessType && (
          <p className="text-xs" style={{ color: "#FF4D4D" }}>
            {errors.businessType}
          </p>
        )}
      </div>
      <Input
        label="Website (optional)"
        value={data.website}
        onChange={(e) => onChange("website", e.target.value)}
        placeholder="https://yoursite.com"
      />
      <div className="flex gap-3 mt-2">
        <Button
          variant="secondary"
          onClick={onBack}
          size="lg"
          className="flex-1"
        >
          Back
        </Button>
        <Button onClick={handleNext} size="lg" className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
