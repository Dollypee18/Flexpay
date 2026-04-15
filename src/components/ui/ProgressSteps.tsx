interface ProgressStepsProps {
  steps: string[];
  current: number;
}

export default function ProgressSteps({ steps, current }: ProgressStepsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => {
          const done = index < current;
          const active = index === current;

          return (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200"
                  style={{
                    backgroundColor: done
                      ? "#00C896"
                      : active
                        ? "#1E1E1E"
                        : "#161616",
                    border: active
                      ? "1px solid #00C896"
                      : done
                        ? "none"
                        : "1px solid #2A2A2A",
                    color: done ? "#0F0F0F" : active ? "#00C896" : "#555555",
                  }}
                >
                  {done ? "✓" : index + 1}
                </div>
                <span
                  className="text-xs mt-1.5 whitespace-nowrap"
                  style={{ color: active ? "#F0F0F0" : "#555555" }}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className="flex-1 h-px mx-2 mb-4"
                  style={{ backgroundColor: done ? "#00C896" : "#2A2A2A" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
