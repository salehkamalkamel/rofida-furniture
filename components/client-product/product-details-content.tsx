"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/db/schema";
import { Truck, Ruler, Clock, Edit3, Check, Info } from "lucide-react";

import { calculatePrice } from "@/lib/pricing";
import { useRouter } from "next/navigation";
import { WishlistToggleSkeleton } from "../wishlist/wishlist-toggle-skeleton";
import WishlistToggle from "../wishlist/wishlist-toggle";
import { CartToggleSkeleton } from "../cart/cart-toggle-skeleton";
import CartToggle from "../cart/cart-toggle";

interface ProductDetailContentProps {
  product: Product;
  similarProducts: Product[];
}

export default function ProductDetailContent({
  product,
  similarProducts,
}: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customizationText, setCustomizationText] = useState("");

  const router = useRouter();

  // --- REFACTORED LOGIC ---
  // Derive all price data instantly using the shared brain
  const priceDetails = calculatePrice(product, quantity, showCustomization);
  const isAvailable = product.stockStatus !== "out_of_stock";
  // ------------------------

  const handleInstantBuy = () => {
    if (!isAvailable) return;

    // Construct query params
    const params = new URLSearchParams({
      productId: product.id.toString(),
      quantity: quantity.toString(),
      color: product.colors?.[selectedColor]?.name || "",
      isCustomized: showCustomization ? "true" : "false",
      customizationText: customizationText,
    });

    router.push(`/instant-buy?${params.toString()}`);
  };

  if (!product) return null;

  return (
    <>
      <div className="border-y border-foreground/10 bg-muted/5">
        <div className="max-w-7xl mx-auto px-4 min-h-12 py-2 flex flex-wrap items-center justify-between gap-2">
          <nav className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <span className="opacity-20">/</span>
            <Link
              href="/products"
              className="hover:text-primary transition-colors"
            >
              المنتجات
            </Link>
            <span className="opacity-20">/</span>
            <span className="text-primary truncate max-w-37.5 md:max-w-none">
              {product.name}
            </span>
          </nav>
          <div className="font-mono text-[10px] opacity-30 italic hidden sm:block">
            معرف المنتج_{product.id}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-x border-foreground/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-foreground/10">
          <div className="p-4 md:p-10 space-y-4 md:space-y-6">
            <div className="relative aspect-square border border-foreground/10 bg-muted/20 overflow-hidden">
              <Image
                src={product.images?.[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isOnOffer && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 font-black text-xs md:text-sm tracking-tighter">
                  خصم -
                  {Math.round(
                    ((Number(product.price) -
                      (Number(product.salePrice) || 0)) /
                      Number(product.price)) *
                      100,
                  )}
                  %
                </div>
              )}
            </div>

            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square relative border-2 transition-all ${
                    selectedImage === idx
                      ? "border-primary"
                      : "border-foreground/10 opacity-50"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 md:p-10 flex flex-col">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/5 px-2 py-1">
                  {product.category} // الوحدة_{product.id}
                </span>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight pt-2">
                  {product.name}
                </h1>
              </div>
              {/* <WishlistButton productId={product.id} /> */}
              <Suspense fallback={<WishlistToggleSkeleton />}>
                <WishlistToggle productId={product.id} />
              </Suspense>
            </div>

            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
              {product.briefDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-baseline gap-2 md:gap-4">
              <span className="text-4xl md:text-5xl font-black tracking-tighter">
                {priceDetails.unitPrice}
              </span>
              <span className="text-lg md:text-xl font-bold uppercase tracking-widest text-muted-foreground">
                جنيه مصري
              </span>
              {product.isOnOffer && (
                <span className="text-lg md:text-xl line-through opacity-30 font-mono">
                  {Number(product.price)}
                </span>
              )}
            </div>

            <div className="h-px w-full bg-foreground/10 my-6 md:my-10" />

            <div className="space-y-6 md:space-y-8 flex-1">
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      لون السطح
                    </span>
                    <span className="text-xs font-bold uppercase">
                      {product.colors[selectedColor].name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`w-10 h-10 md:w-12 md:h-12 border-2 p-1 transition-all ${
                          selectedColor === idx
                            ? "border-primary"
                            : "border-foreground/10"
                        }`}
                      >
                        <div
                          className="w-full h-full border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-foreground/10 bg-muted/5 flex gap-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-50">
                      الشحن
                    </span>
                    <span className="text-xs font-bold">شحن قياسي</span>
                  </div>
                </div>
                {product.buildTime && (
                  <div className="p-4 border border-foreground/10 bg-muted/5 flex gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest block opacity-50">
                        مدة التنفيذ
                      </span>
                      <span className="text-xs font-bold">
                        {product.buildTime} أيام
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`border-2 transition-all ${showCustomization ? "border-primary" : "border-foreground/10"}`}
              >
                <button
                  onClick={() => setShowCustomization(!showCustomization)}
                  className="w-full flex items-center justify-between p-4 bg-muted/10"
                >
                  <div className="flex items-center gap-3">
                    <Edit3 className="w-5 h-5 text-primary" />
                    <span className="text-xs font-black uppercase tracking-widest">
                      تخصيص المواصفات (+10%)
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 border flex items-center justify-center ${showCustomization ? "bg-primary border-primary text-white" : "border-foreground/30"}`}
                  >
                    {showCustomization && <Check className="w-3 h-3" />}
                  </div>
                </button>
                {showCustomization && (
                  <div className="p-4 bg-white space-y-4 border-t border-foreground/10">
                    <textarea
                      value={customizationText}
                      onChange={(e) => setCustomizationText(e.target.value)}
                      placeholder="أدخل المتطلبات الفنية..."
                      className="w-full min-h-24 p-4 border border-foreground/10 bg-muted/5 focus:border-primary outline-none text-xs font-mono uppercase"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 md:mt-10 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity & Add to Cart ... existing code ... */}
                <div className="flex items-center border-2 border-foreground h-14 md:h-16 w-full sm:w-40 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-full hover:bg-muted text-xl"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-xl px-6">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-full hover:bg-muted text-xl"
                  >
                    +
                  </button>
                </div>

                <Suspense fallback={<CartToggleSkeleton />}>
                  <CartToggle
                    productId={product.id}
                    quantity={quantity}
                    isCustomized={Boolean(
                      showCustomization && customizationText,
                    )}
                    customizationText={customizationText}
                    selectedColor={selectedColor.toString()}
                  />
                </Suspense>
              </div>

              {/* NEW: Instant Buy Button */}
              <button
                onClick={handleInstantBuy}
                disabled={!isAvailable}
                className="w-full bg-primary text-primary-foreground h-14 md:h-16 font-black uppercase tracking-[0.2em] hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <span className="animate-pulse">⚡</span>
                شراء الان{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-foreground/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-foreground/10">
          <div className="p-6 md:p-10 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <Info className="w-5 h-5 text-primary" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">
                تحليل المنتج
              </h3>
            </div>
            <p className="text-muted-foreground leading-loose whitespace-pre-line text-sm md:text-base italic">
              {product.detailedDescription}
            </p>
          </div>
          <div className="p-6 md:p-10 bg-muted/5">
            <div className="flex items-center gap-4 mb-6">
              <Ruler className="w-5 h-5 text-primary" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">
                الأبعاد والمقاسات
              </h3>
            </div>
            <div className="space-y-4 md:space-y-6">
              {product.measurements &&
                Object.entries(product.measurements).map(
                  ([key, val]) =>
                    val &&
                    key !== "unit" && (
                      <div
                        key={key}
                        className="flex justify-between border-b border-foreground/5 pb-2"
                      >
                        <span className="text-[10px] font-black uppercase opacity-40">
                          {key}
                        </span>
                        <span className="font-bold font-mono">
                          {val}{" "}
                          {key === "weight"
                            ? "KG"
                            : product.measurements?.unit.toUpperCase()}
                        </span>
                      </div>
                    ),
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
