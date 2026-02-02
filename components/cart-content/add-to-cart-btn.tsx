"use client";

import { useTransition } from "react";
import { ShoppingBag } from "lucide-react";
import { addToCart } from "@/actions/cart-actions";
import { toast } from "sonner";

interface AddToCartProps {
  productId: number;
  quantity: number;
  isCustomized: boolean;
  customizationText: string;
  selectedColor?: string;
  isAvailable: boolean;
}

export function AddToCartButton({
  productId,
  quantity,
  isCustomized,
  customizationText,
  selectedColor,
  isAvailable,
}: AddToCartProps) {
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    startTransition(async () => {
      const result = await addToCart({
        productId,
        quantity,
        isCustomized,
        customizationText,
        selectedColor,
      });

      if (result.success) {
        toast.success("تمت إضافة المنتج للسلة", {
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

  return (
    <button
      onClick={handleAdd}
      disabled={!isAvailable || isPending}
      className="w-full bg-foreground text-background h-14 md:h-16 font-black uppercase tracking-[0.2em] hover:bg-primary transition-colors flex items-center justify-center gap-3 disabled:opacity-20"
    >
      {isPending
        ? "جاري المعالجة..."
        : isAvailable
          ? "إضافة للسلة"
          : "نفد من المخزن"}
      {!isPending && isAvailable && <ShoppingBag className="w-5 h-5" />}
    </button>
  );
}
