import CartLayout from "@/components/cart-content/cart-layout";
import CartLoadingSkeleton from "@/components/skeleton/cart-skeleton";
import { Suspense } from "react";

export default function CartPage() {
  return (
    <main className="flex-1 bg-background">
      <Suspense fallback={<CartLoadingSkeleton />}>
        <CartLayout />
      </Suspense>
    </main>
  );
}
