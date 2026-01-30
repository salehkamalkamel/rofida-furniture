"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/db/schema";
import { addToCart, removeFromCart } from "@/actions/cart-actions";
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
        const result = await removeFromCart(product.id);
        if (result.success) toast.success("تمت الإزالة من السلة");
      } else {
        const result = await addToCart({
          productId: product.id,
          quantity: 1,
          isCustomized: false,
        });
        if (result.success) toast.success("تمت الإضافة إلى السلة");
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
          result.action === "added" ? "تمت الإضافة للمفضلة" : "تمت الإزالة",
        );
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
    <div className="group relative bg-background border border-border hover:border-primary transition-colors duration-300 rounded-none overflow-hidden flex flex-col h-full">
      {/* Link wraps the image and info area */}
      <Link href={`/products/${product.id}`} className="block flex-1">
        {/* Image Container - Technical/Square */}
        <div className="relative aspect-square bg-muted overflow-hidden border-b border-border">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges - Sharp Rectangles */}
          <div className="absolute top-0 right-0 flex flex-col z-10">
            {product.label && (
              <span className="bg-primary text-primary-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                {labelMap[product.label]}
              </span>
            )}
            {product.isOnOffer && (
              <span className="bg-offer text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                عرض خاص
              </span>
            )}
          </div>

          {/* Quick Wishlist - Square Button */}
          <button
            disabled={isPendingWishlist}
            onClick={handleToggleWishlist}
            className={`absolute top-2 left-2 w-10 h-10 flex items-center justify-center transition-all border ${
              isInWishlist
                ? "bg-offer border-offer text-white"
                : "bg-white/80 backdrop-blur-sm border-border text-foreground hover:bg-white"
            }`}
          >
            {isPendingWishlist ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Heart
                className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
              />
            )}
          </button>
        </div>

        {/* Product Info - Clean Grid Layout */}
        <div className="p-4 flex flex-col flex-1">
          <div className="mb-2">
            <h3 className="text-base font-bold text-foreground leading-tight uppercase tracking-tight line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 min-h-8">
              {product.briefDescription}
            </p>
          </div>

          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              {originalPrice && (
                <span className="text-xs text-muted-foreground line-through decoration-offer/50">
                  {originalPrice.toLocaleString("ar-EG")} جنيه
                </span>
              )}
              <span className="text-xl font-black text-foreground">
                {currentPrice.toLocaleString("ar-EG")}
                <span className="text-xs font-bold mr-1 italic">جنية</span>
              </span>
            </div>

            {/* Technical Color Indicator */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex -space-x-1 rtl:space-x-reverse">
                {product.colors.slice(0, 3).map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 border-2 border-background ring-1 ring-border"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Action Area - Full Width Button matching Checkout Next button */}
      <div className="border-t border-border">
        <button
          onClick={handleToggleCart}
          disabled={product.stockStatus === "out_of_stock" || isPendingCart}
          className={`w-full flex items-center justify-center gap-3 py-4 text-sm font-bold transition-all uppercase tracking-widest
            ${
              product.stockStatus === "out_of_stock"
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : isInCart
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
            }`}
        >
          {isPendingCart ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : isInCart ? (
            <>
              <Trash2 className="w-4 h-4" />
              <span>إزالة من السلة</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>أضف إلى السلة</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
