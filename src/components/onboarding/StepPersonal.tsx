import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { OnboardingData } from "@/types";

interface Props {
  data: OnboardingData;
  onChange: (field: keyof OnboardingData, value: string) => void;
  onNext: () => void;
}

interface Errors {
  fullName?: string;
  phone?: string;
  country?: string;
}

function validate(data: OnboardingData): Errors {
  const errors: Errors = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required.";
  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  if (!data.country.trim()) errors.country = "Country is required.";
  return errors;
}

import { useState } from "react";

export default function StepPersonal({ data, onChange, onNext }: Props) {
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
        label="Full name"
        value={data.fullName}
        onChange={(e) => onChange("fullName", e.target.value)}
        error={errors.fullName}
        placeholder="Ada Okafor"
      />
      <Input
        label="Phone number"
        value={data.phone}
        onChange={(e) => onChange("phone", e.target.value)}
        error={errors.phone}
        placeholder="+234 800 000 0000"
      />
      <Input
        label="Country"
        value={data.country}
        onChange={(e) => onChange("country", e.target.value)}
        error={errors.country}
        placeholder="Nigeria"
      />
      <Button onClick={handleNext} size="lg" className="mt-2 w-full">
        Continue
      </Button>
    </div>
  );
}
