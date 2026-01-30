"use client";

import { useState } from "react";
import { FullCartResult } from "@/actions/cart-actions";
import { Address } from "@/db/schema";
import { CheckoutPricing, CheckoutStep } from "@/types/checkout";

// UI Components
import CheckoutProgress from "./checkout-progress";
import CheckoutSummary from "./checkout-summary";
import CheckoutCartSummary from "./checkout-cart-summary";
import CheckoutNav from "./checkout-nav";
import CheckoutAddress from "./checkout-address";
import CheckoutPaymentTab from "./checkout-payment-tab";
import CheckoutConfirmationTab from "./checkout-confirmation-tab";

// Icons
import { ShoppingBag, MapPin, CreditCard, ShieldCheck } from "lucide-react";

export const steps: {
  key: CheckoutStep;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: "cart", label: "السلة", icon: <ShoppingBag className="w-5 h-5" /> },
  { key: "shipping", label: "العنوان", icon: <MapPin className="w-5 h-5" /> },
  { key: "payment", label: "الدفع", icon: <CreditCard className="w-5 h-5" /> },
  {
    key: "confirmation",
    label: "تأكيد الطلب",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
];

interface CheckoutProps {
  cartData: FullCartResult;
  addresses: Address[];
  pricing: CheckoutPricing;
}

export default function CheckoutClientLayout({
  cartData,
  addresses,
  pricing,
}: CheckoutProps) {
  // --- State ---
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    addresses[0]?.id || null,
  );

  // --- Derived State ---
  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);
  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || null;

  // --- Navigation Logic ---
  const goToStep = (step: CheckoutStep) => {
    const targetIndex = steps.findIndex((s) => s.key === step);
    // Allow going back to any previous step, but not skipping forward
    if (targetIndex <= currentStepIndex) {
      setCurrentStep(step);
    }
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case "cart":
        return !!(cartData.success && cartData.items.length > 0);
      case "shipping":
        return !!selectedAddressId;
      case "payment":
        return !!selectedAddressId; // Payment currently just needs a valid address context
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;

    const sequence: CheckoutStep[] = [
      "cart",
      "shipping",
      "payment",
      "confirmation",
    ];
    const nextIndex = sequence.indexOf(currentStep) + 1;
    if (nextIndex < sequence.length) {
      setCurrentStep(sequence[nextIndex]);
    }
  };

  const handleBack = () => {
    const sequence: CheckoutStep[] = [
      "cart",
      "shipping",
      "payment",
      "confirmation",
    ];
    const prevIndex = sequence.indexOf(currentStep) - 1;
    if (prevIndex >= 0) {
      setCurrentStep(sequence[prevIndex]);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* 1. Workflow Progress Header */}
      <div className="border-b border-foreground/10 bg-muted/5 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CheckoutProgress
            currentStepIndex={currentStepIndex}
            goToStep={goToStep}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 2. Main Content Area (Form/Selection) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border-2 border-foreground p-1 md:p-2 bg-foreground/5">
              <div className="bg-background border border-foreground/10 p-6 md:p-10">
                {currentStep === "cart" && (
                  <CheckoutCartSummary cartData={cartData} />
                )}

                {currentStep === "shipping" && (
                  <CheckoutAddress
                    onAddNewAddress={() => setShowNewAddressForm(true)}
                    closeNewAddressForm={() => setShowNewAddressForm(false)}
                    handleSelectAddress={setSelectedAddressId}
                    savedAddresses={addresses}
                    selectedAddressId={selectedAddressId}
                    showNewAddressForm={showNewAddressForm}
                  />
                )}

                {currentStep === "payment" && <CheckoutPaymentTab />}

                {currentStep === "confirmation" && selectedAddress && (
                  <CheckoutConfirmationTab address={selectedAddress} />
                )}
              </div>
            </div>

            {/* Step Navigation Controls */}
            <div className="pt-4">
              <CheckoutNav
                handleBack={handleBack}
                handleNext={handleNext}
                currentStep={currentStep}
              />
            </div>
          </div>

          {/* 3. Pricing & Order Totals (Technical Sidebar) */}
          <aside className="lg:col-span-4 sticky top-28">
            <div className="border-t-4 border-primary pt-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                  Order Manifest
                </span>
                <div className="h-px flex-1 bg-foreground/10" />
              </div>

              <CheckoutSummary pricing={pricing} />

              {/* Security Badge */}
              <div className="mt-6 p-4 border border-foreground/10 bg-muted/5 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary opacity-60" />
                <span className="text-[10px] font-bold uppercase tracking-widest leading-tight opacity-60">
                  Secure Encrypted <br /> Transaction Pipeline
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
