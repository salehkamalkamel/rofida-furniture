import CheckoutLayout from "@/components/checkout/checkout-layout";
import CheckoutLoadingSkeleton from "@/components/skeleton/checkout-skeleton";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <main className="flex-1 bg-background">
      <Suspense fallback={<CheckoutLoadingSkeleton />}>
        <CheckoutLayout />
      </Suspense>
    </main>
  );
}
