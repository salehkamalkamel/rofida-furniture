"use client";

import { isProductInCart, addToCart } from "@/actions/cart-actions";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Plus, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

type CartToggleProps = {
  productId: number;
  stockStatus?: "in_stock" | "out_of_stock";

  /** quantity comes from outside (details page) */
  quantity?: number;

  /** customization */
  isCustomized: boolean;
  customizationText?: string;
  selectedColor?: string;

  /** UI */
  variant?: "details" | "card";
};

export default function CartToggle({
  productId,
  stockStatus = "in_stock",
  quantity = 1,
  isCustomized,
  customizationText,
  selectedColor,
  variant = "details",
}: CartToggleProps) {
  const [isPending, startTransition] = useTransition();
  const [isInCart, setIsInCart] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  // fetch initial cart state on client
  useEffect(() => {
    let mounted = true;

    (async () => {
      const result = await isProductInCart(productId);
      if (mounted) {
        setIsInCart(result);
        setIsLoadingInitial(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [productId]);

  const disabled =
    stockStatus === "out_of_stock" || isPending || isInCart || isLoadingInitial;

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addToCart({
        productId,
        quantity,
        isCustomized,
        customizationText,
        selectedColor,
      });

      if (result.success) {
        setIsInCart(true);

        toast.success("تمت إضافة المنتج للسلة بنجاح", {
          action: {
            label: "عرض السلة",
            onClick: () => (window.location.href = "/cart"),
          },
        });
      } else {
        toast.error(result.error || "حدث خطأ ما");
      }
    });
  };

  /* ================= DETAILS VARIANT ================= */
  if (variant === "details") {
    return (
      <button
        onClick={handleAddToCart}
        disabled={disabled}
        className={cn(
          "w-full h-14 md:h-16 border-2 border-foreground",
          "bg-white text-foreground font-black uppercase tracking-[0.2em]",
          "transition-all flex items-center justify-center gap-3",
          "hover:bg-muted disabled:opacity-50",
        )}
      >
        {isPending || isLoadingInitial ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : isInCart ? (
          "المنتج موجود في السلة"
        ) : (
          "اضافة للسلة"
        )}
      </button>
    );
  }

  /* ================= CARD VARIANT ================= */
  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled}
      className={cn(
        "w-full flex items-center justify-center gap-2",
        "py-3 sm:py-4 text-[10px] sm:text-sm font-black",
        "uppercase tracking-widest transition-all",
        stockStatus === "out_of_stock" && "bg-muted text-muted-foreground",
        !disabled &&
          !isInCart &&
          "bg-secondary text-secondary-foreground hover:bg-primary hover:text-white",
        isInCart && "bg-foreground text-background",
      )}
    >
      {isPending || isLoadingInitial ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="sm:inline">السلة</span>
        </>
      )}
    </button>
  );
}
