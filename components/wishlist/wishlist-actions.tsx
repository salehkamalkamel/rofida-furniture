"use client";

import { removeFromWishlist, moveToCart } from "@/actions/wishlist-actions"; // Import move action
import { Loader, ShoppingCart, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function WishlistActions({ productId }: { productId: number }) {
  const [isPendingDelete, startTransitionDelete] = useTransition();
  const [isPendingMove, startTransitionMove] = useTransition();

  // --- Logic for Moving to Cart ---
  function handleMoveToCart() {
    startTransitionMove(async () => {
      const response = await moveToCart({ productId });

      if (!response.success) {
        toast.error(response.error || "حدث خطأ أثناء نقل المنتج للسلة.");
      } else {
        toast.success("تم نقل المنتج إلى السلة بنجاح.");
      }
    });
  }

  // --- Logic for Removing only ---
  function handleRemoveFromWishlist() {
    startTransitionDelete(async () => {
      const response = await removeFromWishlist({ productId });

      if (!response.success) {
        toast.error("حدث خطأ أثناء إزالة المنتج من قائمة الأمنيات.");
      } else {
        toast.success("تمت إزالة المنتج من قائمة الأمنيات.");
      }
    });
  }

  return (
    <div className="flex gap-2">
      <button
        disabled={isPendingMove || isPendingDelete}
        onClick={handleMoveToCart}
        className="flex-1 h-10 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isPendingMove ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            <span>نقل إلى السلة</span>
          </>
        )}
      </button>

      <button
        disabled={isPendingMove || isPendingDelete}
        onClick={handleRemoveFromWishlist}
        className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive transition-colors cursor-pointer disabled:opacity-50"
        aria-label="إزالة من المفضلة"
      >
        {isPendingDelete ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <Trash2 className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
