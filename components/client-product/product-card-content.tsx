"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/db/schema";
import { calculatePrice } from "@/lib/pricing";
import { addToCart } from "@/actions/cart-actions";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

export default function ProductCardContent({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();

  const priceDetails = calculatePrice(product, 1, false);
  const currentPrice = priceDetails.finalUnitPrice;
  const originalPrice = priceDetails.basePrice;
  const mainImage = product.images?.[0] || "/placeholder.svg";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      try {
        const result = await addToCart({
          productId: product.id,
          quantity: 1,
          isCustomized: false,
        });

        if (result.success) {
          toast.success("تمت الإضافة إلى السلة", {
            description: product.name,
            position: "bottom-right",
          });
        }
      } catch (error) {
        toast.error("عذراً، حدث خطأ ما");
      }
    });
  };

  const labelMap: Record<string, string> = {
    new_arrival: "جديد",
    best_seller: "الأكثر مبيعاً",
    on_sale: "تخفيض",
    limited_edition: "إصدار محدود",
  };

  return (
    <div className="group relative bg-background border border-foreground/10 md:hover:border-primary transition-all duration-300 flex flex-col h-full overflow-hidden">
      <Link href={`/products/${product.id}`} className="block flex-1">
        {/* Image Container */}
        <div className="relative aspect-square bg-muted overflow-hidden border-b border-border">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 md:group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 25vw"
          />

          {/* Badge */}
          {product.label && (
            <div className="absolute top-0 right-0 z-10">
              <span className="bg-primary text-primary-foreground px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] font-black uppercase tracking-tighter sm:tracking-widest shadow-md">
                {labelMap[product.label]}
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4 flex flex-col flex-1">
          <div className="mb-2">
            <h3 className="text-[11px] sm:text-base font-black text-foreground/80 leading-tight uppercase tracking-tighter line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>

          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              {originalPrice > currentPrice && (
                <span className="text-[10px] sm:text-xs text-offer line-through decoration-primary/40 leading-none">
                  {originalPrice}
                </span>
              )}

              <span className="text-xl sm:text-2xl font-black text-foreground flex items-baseline gap-0.5 leading-none tracking-tighter">
                {currentPrice}
                <span className="text-[10px] sm:text-xs font-bold italic text-primary align-top">
                  EGP{" "}
                </span>
              </span>
            </div>

            <div className="hidden sm:flex -space-x-1 mb-1 rtl:space-x-reverse">
              {product.colors?.slice(0, 3).map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 border border-background ring-1 ring-border"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>

      {/* Action Button - Brutalist Style */}
      <button
        onClick={handleAddToCart}
        disabled={isPending || product.stockStatus === "out_of_stock"}
        className={`
          absolute bottom-0 left-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all z-20
          ${
            product.stockStatus === "out_of_stock"
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-foreground text-background hover:bg-primary hover:text-white"
          }
          border-t border-r border-border sm:border-none
        `}
      >
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : product.stockStatus === "out_of_stock" ? (
          <span className="text-[8px] font-black rotate-90 sm:rotate-0 uppercase">
            Empty
          </span>
        ) : (
          <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>

      {/* Visual Accent for Hover */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
    </div>
  );
}
