"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/db/schema";
import { addToCart } from "@/actions/cart-actions";
import { toast } from "sonner";
import { Heart, Loader, Plus, Trash2 } from "lucide-react";
import { toggleWishlist } from "@/actions/wishlist-actions";
import { calculatePrice } from "@/lib/pricing";

export default function ProductCardContent({
  product,
  isInWishlist,
  isInCart,
}: {
  product: Product;
  isInWishlist: boolean;
  isInCart: boolean;
}) {
  const [isPendingCart, startCartTransition] = useTransition();
  const [isPendingWishlist, startWishlistTransition] = useTransition();
  const priceDetails = calculatePrice(product, 1, false);
  const basePrice = priceDetails.basePrice;
  const salePrice = priceDetails.finalUnitPrice;
  const currentPrice = salePrice;
  const originalPrice = basePrice;
  const mainImage = product.images?.[0] || "/placeholder.svg";

  const handleToggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startCartTransition(async () => {
      if (isInCart) {
        toast.success("العنصر موجود في السلة");
        return;
      } else {
        const result = await addToCart({
          productId: product.id,
          quantity: 1,
          isCustomized: false,
        });
        if (result.success) {
          toast.success("تمت الإضافة إلى السلة");
        } else {
          toast.error(result.error);
        }
      }
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startWishlistTransition(async () => {
      const result = await toggleWishlist(product.id);
      if (result.success) {
        toast.success(
          result.data.action === "added"
            ? "تمت الإضافة للمفضلة"
            : "تمت الإزالة",
        );
      } else {
        toast.error(result.error);
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
    <div className="group relative bg-background border  md:hover:border-primary transition-colors duration-300 flex flex-col h-full border-foreground/10">
      <Link href={`/products/${product.id}`} className="block flex-1">
        {/* Image Container */}
        <div className="relative aspect-square bg-muted overflow-hidden border-b border-border">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 md:group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 25vw" // Updated sizes
          />

          {/* Badges - Smaller on mobile */}
          <div className="absolute top-0 right-0 flex flex-col z-10">
            {product.label && (
              <span className="bg-primary text-primary-foreground px-1.5 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
                {labelMap[product.label]}
              </span>
            )}
          </div>

          {/* Wishlist - Smaller on mobile */}
          <button
            disabled={isPendingWishlist}
            onClick={handleToggleWishlist}
            className={`absolute bottom-2 left-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all border ${
              isInWishlist
                ? "bg-offer border-offer text-white"
                : "bg-white/90 backdrop-blur-sm border-border text-foreground"
            }`}
          >
            {isPendingWishlist ? (
              <Loader className="w-3 h-3 animate-spin" />
            ) : (
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist ? "fill-current" : ""}`}
              />
            )}
          </button>
        </div>

        {/* Product Info */}
        <div className="p-2 sm:p-4 flex flex-col flex-1">
          <div className="mb-1 sm:mb-2">
            <h3 className="text-xs sm:text-base font-black text-foreground leading-tight uppercase tracking-tighter line-clamp-1">
              {product.name}
            </h3>
            {/* HIDDEN ON MOBILE: Brief Description */}
            <p className="hidden sm:line-clamp-2 text-xs text-muted-foreground mt-1 min-h-8">
              {product.briefDescription}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              {originalPrice && (
                <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                  {originalPrice.toLocaleString("ar-EG")}
                </span>
              )}
              <span className="text-sm sm:text-xl font-black text-foreground">
                {currentPrice.toLocaleString("ar-EG")}
                <span className="text-[8px] sm:text-xs font-bold mr-0.5 italic text-primary">
                  ج.م
                </span>
              </span>
            </div>

            {/* Technical Color Indicator - Hidden on mobile to save space */}
            <div className="hidden sm:flex -space-x-1 rtl:space-x-reverse">
              {product.colors?.slice(0, 2).map((color, i) => (
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

      {/* Action Area - Adaptive Button */}
      <div className="border-t border-border">
        <button
          onClick={handleToggleCart}
          disabled={
            product.stockStatus === "out_of_stock" || isPendingCart || isInCart
          }
          className={`w-full flex items-center justify-center gap-2 py-3 sm:py-4 text-[10px] sm:text-sm font-black transition-all uppercase tracking-widest
            ${
              product.stockStatus === "out_of_stock"
                ? "bg-muted text-muted-foreground"
                : isInCart
                  ? "bg-foreground text-background"
                  : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-white"
            }`}
        >
          {isPendingCart ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              {/* Text hidden on mobile, only icon + "سلة" shown or just short text */}
              <span className="sm:inline">السلة</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
