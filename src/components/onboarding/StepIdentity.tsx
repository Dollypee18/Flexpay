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
  idType?: string;
  idNumber?: string;
}

function validate(data: OnboardingData): Errors {
  const errors: Errors = {};
  if (!data.idType.trim()) errors.idType = "ID type is required.";
  if (!data.idNumber.trim()) errors.idNumber = "ID number is required.";
  return errors;
}

export default function StepIdentity({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const [errors, setErrors] = useState<Errors>({});
  const [uploaded, setUploaded] = useState(false);

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
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "#888888" }}
        >
          ID Type
        </label>
        <select
          value={data.idType}
          onChange={(e) => onChange("idType", e.target.value)}
          style={{
            backgroundColor: "#1E1E1E",
            border: `1px solid ${errors.idType ? "#FF4D4D" : "#2A2A2A"}`,
            borderRadius: "4px",
            padding: "10px 12px",
            color: data.idType ? "#F0F0F0" : "#555555",
            fontSize: "14px",
            outline: "none",
            width: "100%",
          }}
        >
          <option value="">Select ID type</option>
          <option value="passport">International Passport</option>
          <option value="national_id">National ID Card</option>
          <option value="drivers_license">Driver&apos;s License</option>
        </select>
        {errors.idType && (
          <p className="text-xs" style={{ color: "#FF4D4D" }}>
            {errors.idType}
          </p>
        )}
      </div>

      <Input
        label="ID Number"
        value={data.idNumber}
        onChange={(e) => onChange("idNumber", e.target.value)}
        error={errors.idNumber}
        placeholder="A00000000"
      />

      {/* Mock file upload */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "#888888" }}
        >
          Upload ID Document
        </label>
        <div
          onClick={() => setUploaded(true)}
          className="flex flex-col items-center justify-center gap-2 rounded cursor-pointer transition-all duration-150"
          style={{
            border: `1px dashed ${uploaded ? "#00C896" : "#2A2A2A"}`,
            padding: "24px",
            backgroundColor: uploaded ? "#00C89610" : "#161616",
          }}
        >
          {uploaded ? (
            <p className="text-sm" style={{ color: "#00C896" }}>
              ✓ Document uploaded
            </p>
          ) : (
            <>
              <p className="text-sm" style={{ color: "#888888" }}>
                Click to upload
              </p>
              <p className="text-xs" style={{ color: "#555555" }}>
                PNG, JPG or PDF — max 5MB
              </p>
            </>
          )}
        </div>
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
        <Button onClick={handleNext} size="lg" className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
