"use client";

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function CheckoutNav({
  currentStep,
  handleBack,
  handleNext,
}: {
  currentStep: string;
  handleBack: () => void;
  handleNext: () => void;
}) {
  const isFirstStep = currentStep === "cart";
  const isFinalStep = currentStep === "confirmation";

  return (
    <div
      className="flex items-center justify-between mt-10 pt-6 border-t border-foreground/5"
      dir="rtl"
    >
      {/* BACK BUTTON */}
      {!isFirstStep ? (
        <button
          onClick={handleBack}
          className="group flex items-center gap-3 px-6 py-3 border-2 border-foreground/10 hover:border-foreground transition-all active:scale-95"
        >
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          <div className="text-right">
            <span className="block text-[8px] font-black uppercase tracking-widest opacity-40 leading-none">
              Previous
            </span>
            <span className="text-xs font-black uppercase">رجوع</span>
          </div>
        </button>
      ) : (
        <div /> // Spacer
      )}

      {/* NEXT BUTTON (Hidden on final confirmation to avoid double buttons) */}
      {!isFinalStep && (
        <button
          onClick={handleNext}
          className="group relative flex items-center gap-4 px-10 py-4 bg-foreground text-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:bg-primary"
        >
          <div className="text-left">
            <span className="block text-[8px] font-black uppercase tracking-widest opacity-40 leading-none">
              Continue
            </span>
            <span className="text-sm font-black uppercase tracking-widest">
              متابعة الخطوة
            </span>
          </div>
          <ArrowRight className="w-5 h-5 rotate-180 transition-transform group-hover:-translate-x-1" />

          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-background -translate-x-1 -translate-y-1 rotate-45 border-r border-b border-foreground/10" />
        </button>
      )}
    </div>
  );
}
