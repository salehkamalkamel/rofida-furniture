import WishLoadingSkeleton from "@/components/skeleton/wishlist-loading-skeleton";
import WishlistLayout from "@/components/wishlist-layout";
import { Suspense } from "react";

export default function WishlistPage() {
  return (
    <main className="flex-1 bg-background">
      <Suspense fallback={<WishLoadingSkeleton />}>
        <WishlistLayout />
      </Suspense>
    </main>
  );
}
