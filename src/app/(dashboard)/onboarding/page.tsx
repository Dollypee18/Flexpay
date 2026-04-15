"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import ProgressSteps from "@/components/ui/ProgressSteps";
import StepPersonal from "@/components/onboarding/StepPersonal";
import StepBusiness from "@/components/onboarding/StepBusiness";
import StepIdentity from "@/components/onboarding/StepIdentity";
import StepReview from "@/components/onboarding/StepReview";
import { OnboardingData } from "@/types";

const STEPS = ["Personal", "Business", "Identity", "Review"];

const INITIAL_DATA: OnboardingData = {
  fullName: "",
  phone: "",
  country: "",
  businessName: "",
  businessType: "",
  website: "",
  idType: "",
  idNumber: "",
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);

  function handleChange(field: keyof OnboardingData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function handleNext() {
    setStep((prev) => prev + 1);
  }

  function handleBack() {
    setStep((prev) => prev - 1);
  }

  function handleSubmit() {
    router.push("/dashboard");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#0F0F0F" }}
    >
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#00C896" }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: "#F0F0F0" }}
            >
              FlexPay
            </span>
          </div>
          <h1
            className="text-xl font-semibold mb-1"
            style={{ color: "#F0F0F0" }}
          >
            Set up your account
          </h1>
          <p className="text-sm" style={{ color: "#888888" }}>
            Complete your profile to start sending invoices.
          </p>
        </div>

        <ProgressSteps steps={STEPS} current={step} />

        <Card>
          {step === 0 && (
            <StepPersonal
              data={data}
              onChange={handleChange}
              onNext={handleNext}
            />
          )}
          {step === 1 && (
            <StepBusiness
              data={data}
              onChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 2 && (
            <StepIdentity
              data={data}
              onChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 3 && (
            <StepReview
              data={data}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
