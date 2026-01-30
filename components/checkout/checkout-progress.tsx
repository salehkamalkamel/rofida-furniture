import { CheckoutStep } from "@/types/checkout";
import { steps } from "./checkout-client-layout";
import { Check } from "lucide-react";

export default function CheckoutProgress({
  currentStepIndex,
  goToStep,
}: {
  currentStepIndex: number;
  goToStep: (key: CheckoutStep) => void;
}) {
  return (
    <nav className="py-8" aria-label="Progress">
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const isFuture = index > currentStepIndex;

          return (
            <div
              key={step.key}
              className={`flex items-center ${index !== steps.length - 1 ? "flex-1" : ""}`}
            >
              {/* Step Unit */}
              <div className="relative flex flex-col items-center group">
                <button
                  onClick={() => goToStep(step.key)}
                  disabled={isFuture}
                  className={`
                    relative z-10 w-12 h-12 flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted ? "bg-primary border-primary text-white" : ""}
                    ${isActive ? "bg-background border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1" : ""}
                    ${isFuture ? "bg-muted/30 border-muted-foreground/20 text-muted-foreground/40 cursor-not-allowed" : "cursor-pointer"}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 stroke-3" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-mono leading-none mb-1 opacity-50">
                        0{index + 1}
                      </span>
                      <div
                        className={`${isActive ? "text-foreground" : "text-inherit"}`}
                      >
                        {step.icon}
                      </div>
                    </div>
                  )}
                </button>

                {/* Label */}
                <span
                  className={`
                  absolute -bottom-7 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] transition-opacity
                  ${isActive ? "opacity-100" : "opacity-40"}
                  hidden sm:block
                `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Pipeline */}
              {index < steps.length - 1 && (
                <div className="flex-1 px-4">
                  <div
                    className={`h-0.5 w-full transition-colors duration-500 ${
                      isCompleted
                        ? "bg-primary"
                        : "bg-muted-foreground/20 border-t-2 border-dashed border-muted-foreground/20 "
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
