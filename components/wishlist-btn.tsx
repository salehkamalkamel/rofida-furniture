"use client";

import { useState, useEffect, useTransition } from "react";
import { Heart, Loader } from "lucide-react";
import {
  isProductInWishlist,
  toggleWishlist,
} from "@/actions/wishlist-actions";
import { toast } from "sonner";

export function WishlistButton({ productId }: { productId: number }) {
  const [isPending, startTransition] = useTransition();
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isProductInWishlist(productId).then((status) => {
      setInWishlist(status);
      setLoading(false);
    });
  }, [productId]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await toggleWishlist(productId);
      if (result.success) {
        setInWishlist(result.action === "added");
        toast.success(
          result.action === "added" ? "تمت الإضافة للمفضلة" : "تمت الإزالة",
        );
      }
    });
  };

  return (
    <button
      disabled={isPending || loading}
      onClick={handleToggle}
      className={`p-3 md:p-4 border-2 transition-all shrink-0 ${
        inWishlist
          ? "bg-primary border-primary text-white"
          : "border-foreground/10 hover:border-foreground"
      }`}
    >
      {isPending ? (
        <Loader className="w-6 h-6 animate-spin" />
      ) : (
        <Heart className={`w-6 h-6 ${inWishlist ? "fill-current" : ""}`} />
      )}
    </button>
  );
}
