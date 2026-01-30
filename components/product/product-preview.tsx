"use client";
import { useFormContext } from "react-hook-form";
import { Tag, Package, ShoppingCart } from "lucide-react"; // Optional icons
import { ProductFormValues } from "@/app/dashboard/products/new/_schema";

export function ProductPreview() {
  const { watch } = useFormContext<ProductFormValues>();

  // Watch all values needed for the preview
  const values = watch();

  const mainImage =
    values.images?.[0] || "https://placehold.co/600x600?text=No+Image";
  const discount =
    values.price && values.salePrice
      ? Math.round((1 - values.salePrice / values.price) * 100)
      : 0;

  return (
    <div className="sticky top-4 space-y-4">
      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
        معاينة مباشرة
      </h3>

      {/* Product Card Preview */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm dark:bg-zinc-900">
        {/* Image Area */}
        <div className="relative aspect-square bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          {values.isOnOffer && discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              خصم {discount}%
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-xs text-blue-600 font-medium">
              {values.sku || "SKU-0000"}
            </span>
            <span className="text-[10px] bg-zinc-100 px-2 py-0.5 rounded uppercase">
              {values.stockStatus}
            </span>
          </div>

          <h4 className="font-bold text-lg line-clamp-1">
            {values.name || "اسم المنتج يظهر هنا"}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-2 min-h-8">
            {values.briefDescription ||
              "وصف مختصر للمنتج سيظهر في هذا المكان..."}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex flex-col">
              {values.isOnOffer && values.salePrice ? (
                <>
                  <span className="text-xl font-bold text-red-600">
                    {values.salePrice} جنية
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {values.price} جنية
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold">
                  {values.price || 0} جنية
                </span>
              )}
            </div>
            <button
              type="button"
              className="p-2 bg-zinc-900 text-white rounded-lg dark:bg-white dark:text-black"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Details Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-blue-800">
          <Package size={14} />
          <span>
            وقت التجهيز: <strong>{values.buildTime || "غير محدد"}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-800">
          <Tag size={14} />
          <span>
            الفئة: <strong>{values.categoryId || "لم تختر فئة"}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
