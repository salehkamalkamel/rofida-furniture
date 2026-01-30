"use client";
import { ProductFormValues } from "@/app/dashboard/products/new/_schema";
import { useFormContext } from "react-hook-form";
import { AlertCircle } from "lucide-react";

export function PricingSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  const price = watch("price");
  const salePrice = watch("salePrice");
  const isOnOffer = watch("isOnOffer");

  // UX Logic: Is the sale price invalid?
  const isInvalidSalePrice =
    isOnOffer && price && salePrice && Number(salePrice) >= Number(price);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            السعر الأساسي <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={`w-full h-12 px-4 bg-muted border rounded focus:ring-2 transition-all ${errors.price ? "border-destructive ring-destructive/20" : "border-transparent focus:ring-primary/20"}`}
              placeholder="0.00"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">
              EGP
            </span>
          </div>
          {errors.price && (
            <p className="text-destructive text-xs mt-1 font-medium">
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">سعر العرض</label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              disabled={!isOnOffer}
              {...register("salePrice", { valueAsNumber: true })}
              className={`w-full h-12 px-4 bg-muted border rounded focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.salePrice || isInvalidSalePrice
                  ? "border-destructive ring-destructive/20"
                  : "border-transparent focus:ring-primary/20"
              }`}
              placeholder="0.00"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">
              EGP
            </span>
          </div>
          {errors.salePrice && (
            <p className="text-destructive text-xs mt-1 font-medium">
              {errors.salePrice.message}
            </p>
          )}
        </div>
      </div>

      {/* Logic Validation Alert */}
      {isInvalidSalePrice && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive text-sm rounded-lg animate-pulse">
          <AlertCircle size={16} />
          <span>تنبيه: سعر العرض يجب أن يكون أقل من السعر الأساسي</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="offer"
          {...register("isOnOffer")}
          className="w-4 h-4 accent-primary cursor-pointer"
        />
        <label htmlFor="offer" className="cursor-pointer select-none">
          تفعيل العرض
        </label>
      </div>

      {/* Success/Profit Calculation Card */}
      {isOnOffer &&
        price &&
        salePrice &&
        !isInvalidSalePrice &&
        Number(price) > 0 && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex flex-col">
              <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                نسبة الخصم
              </span>
              <span className="text-2xl font-bold text-emerald-700">
                {Math.round((1 - salePrice / price) * 100)}%
              </span>
            </div>
            <div className="h-8 w-px bg-emerald-200" />
            <div className="flex flex-col items-end">
              <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                قيمة التوفير
              </span>
              <span className="text-xl font-bold text-emerald-700">
                {(price - salePrice).toFixed(2)} جنية
              </span>
            </div>
          </div>
        )}
    </div>
  );
}
