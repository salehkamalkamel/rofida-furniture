"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/db/schema";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  Ruler,
  Clock,
  Edit3,
  Check,
  Info,
  Loader,
} from "lucide-react";
import { addToCart } from "@/actions/cart-actions";
import { toast } from "sonner";
import { toggleWishlist } from "@/actions/wishlist-actions";
import { calculatePrice } from "@/lib/pricing";

interface ProductDetailContentProps {
  product: Product;
  similarProducts: Product[];
  isInWishlist: boolean;
  isInCart: boolean;
}

export default function ProductDetailContent({
  product,
  similarProducts,
  isInWishlist,
  isInCart,
}: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isPendingWishlist, startWishlistTransition] = useTransition();
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customizationText, setCustomizationText] = useState("");

  // --- REFACTORED LOGIC ---
  // Derive all price data instantly using the shared brain
  const priceDetails = calculatePrice(product, quantity, showCustomization);
  const isAvailable = product.stockStatus !== "out_of_stock";
  // ------------------------

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addToCart({
        productId: product.id,
        quantity: quantity,
        isCustomized: showCustomization,
        customizationText: customizationText,
        selectedColor: product.colors?.[selectedColor]?.name,
      });
      if (result.success) {
        toast.success("تمت إضافة المنتج للسلة بنجاح", {
          description: product.name,
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

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startWishlistTransition(async () => {
      const result = await toggleWishlist(product.id);
      if (result.success) {
        toast.success(
          result.action === "added"
            ? "تمت الإضافة إلى المفضلة"
            : "تمت الإزالة من المفضلة",
        );
      } else {
        toast.error(result.error || "حدث خطأ ما");
      }
    });
  };

  if (!product) return null;

  return (
    <>
      {/* 1. شريط التنقل العلوي */}
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
              الكتالوج
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
          {/* 2. قسم الوسائط الصور */}
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

          {/* 3. المواصفات وقسم الشراء */}
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
              <button
                disabled={isPendingWishlist}
                onClick={handleToggleWishlist}
                className={`p-3 md:p-4 border-2 transition-all shrink-0 ${
                  isInWishlist
                    ? "bg-primary border-primary text-white"
                    : "border-foreground/10 hover:border-foreground"
                }`}
              >
                {isPendingWishlist ? (
                  <Loader className="w-6 h-6 animate-spin" />
                ) : (
                  <Heart
                    className={`w-6 h-6 ${isInWishlist ? "fill-current" : ""}`}
                  />
                )}
              </button>
            </div>

            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
              {product.briefDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-baseline gap-2 md:gap-4">
              <span className="text-4xl md:text-5xl font-black tracking-tighter">
                {priceDetails.unitPrice.toLocaleString("ar-EG")}
              </span>
              <span className="text-lg md:text-xl font-bold uppercase tracking-widest text-muted-foreground">
                جنيه مصري
              </span>
              {product.isOnOffer && (
                <span className="text-lg md:text-xl line-through opacity-30 font-mono">
                  {Number(product.price).toLocaleString("ar-EG")}
                </span>
              )}
            </div>

            <div className="h-px w-full bg-foreground/10 my-6 md:my-10" />

            {/* إعدادات المنتج */}
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

              {/* الصفات التقنية */}
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

              {/* التخصيص */}
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

            {/* أزرار الإجراءات */}
            <div className="mt-8 md:mt-10 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border-2 border-foreground h-14 md:h-16 w-full sm:w-40 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-full hover:bg-muted text-xl"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-xl">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-full hover:bg-muted text-xl"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!isAvailable || isPending}
                  className="flex-1 bg-foreground text-background h-14 md:h-16 font-black uppercase tracking-[0.2em] hover:bg-primary transition-colors flex items-center justify-center gap-3 disabled:opacity-20"
                >
                  {isPending
                    ? "جاري المعالجة..."
                    : isAvailable
                      ? "إضافة للسلة"
                      : "نفد من المخزن"}
                  {!isPending && isAvailable && (
                    <ShoppingBag className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Total Price Box (using priceDetails) */}
              <div className="p-4 border-2 border-primary border-dashed flex justify-between items-center font-mono text-xs">
                <span className="uppercase opacity-50 tracking-widest">
                  {showCustomization
                    ? "الإجمالي النهائي (شامل الرسوم)"
                    : "الإجمالي"}
                </span>
                <span className="font-black text-primary text-lg">
                  {priceDetails.totalPrice.toLocaleString("ar-EG")} ج.م
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. تفاصيل إضافية (الأسفل) */}
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
                          {val} {product.measurements?.unit}
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
