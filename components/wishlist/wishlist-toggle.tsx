"use client";

import {
  isProductInWishlist,
  toggleWishlist,
} from "@/actions/wishlist-actions";
import { Heart } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type WishlistToggleProps = {
  productId: number;

  /** visual variants */
  size?: "sm" | "md";
  variant?: "card" | "details";
};

export default function WishlistToggle({
  productId,
  size = "md",
  variant = "details",
}: WishlistToggleProps) {
  const [isPending, startTransition] = useTransition();
  const [inWishlist, setInWishlist] = useState<boolean>(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  // fetch initial wishlist state on client
  useEffect(() => {
    let mounted = true;

    (async () => {
      const result = await isProductInWishlist(productId);
      if (mounted) {
        setInWishlist(result.success ? result.data : false);
        setIsLoadingInitial(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [productId]);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // optimistic UI
    setInWishlist((prev) => !prev);

    startTransition(async () => {
      const result = await toggleWishlist(productId);

      if (result.success) {
        toast.success(
          result.data.action === "added"
            ? "تمت الإضافة للمفضلة"
            : "تمت الإزالة",
        );
      } else {
        // rollback on error
        setInWishlist((prev) => !prev);
        toast.error(result.error);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle wishlist"
      disabled={isPending || isLoadingInitial}
      className={cn(
        "relative grid place-items-center border-2 transition-all",
        "disabled:cursor-not-allowed",
        // size
        size === "sm" && "p-2",
        size === "md" && "p-3 md:p-4",
        // state
        inWishlist
          ? "bg-primary border-primary text-white"
          : "border-foreground/10 hover:border-foreground",
        // variant tweaks
        variant === "card" && "rounded-full",
        variant === "details" && "rounded-md",
      )}
    >
      {/* Heart */}
      <Heart
        className={cn(
          "transition-all",
          size === "sm" && "w-4 h-4",
          size === "md" && "w-6 h-6",
          inWishlist && "fill-current scale-110",
          (isPending || isLoadingInitial) && "opacity-0",
        )}
      />

      {/* Pending animation overlay */}
      {(isPending || isLoadingInitial) && (
        <span
          className={cn(
            "absolute inline-block rounded-full border-2 border-current",
            "border-t-transparent animate-spin",
            size === "sm" && "w-4 h-4",
            size === "md" && "w-6 h-6",
          )}
        />
      )}
    </button>
  );
}
