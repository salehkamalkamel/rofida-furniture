"use client";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "@/app/dashboard/products/new/_schema";
import { Tag } from "lucide-react";

export function PricingSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  const price = watch("price");
  const salePrice = watch("salePrice");
  const isOnOffer = watch("isOnOffer");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            السعر الأساسي <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              // Removed valueAsNumber: true -> Let Zod preprocess handle it
              {...register("price")}
              className={`w-full h-12 px-4 bg-muted border rounded ${errors.price ? "border-destructive ring-destructive/20" : "border-transparent"}`}
              placeholder="0.00"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">
              EGP
            </span>
          </div>
          {errors.price && (
            <p className="text-destructive text-xs mt-1">
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
              {...register("salePrice")}
              className={`w-full h-12 px-4 bg-muted border rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.salePrice ? "border-destructive ring-destructive/20" : "border-transparent"}`}
              placeholder="0.00"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">
              EGP
            </span>
          </div>
          {errors.salePrice && (
            <p className="text-destructive text-xs mt-1">
              {errors.salePrice.message}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-muted/30 border border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${isOnOffer ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            <Tag size={20} />
          </div>
          <div>
            <p className="font-bold text-sm">تفعيل خصم</p>
            <p className="text-xs text-muted-foreground">
              عند التفعيل، سيظهر السعر القديم مشطوباً
            </p>
          </div>
        </div>
        <input
          type="checkbox"
          {...register("isOnOffer")}
          className="w-6 h-6 accent-primary cursor-pointer"
        />
      </div>

      {/* Profit/Saving Calculation Visualization */}
      {isOnOffer &&
        price &&
        salePrice &&
        !errors.salePrice &&
        Number(price) > Number(salePrice) && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between animate-in slide-in-from-top-2">
            <div>
              <span className="text-xs text-emerald-600 font-bold uppercase">
                نسبة الخصم
              </span>
              <div className="text-2xl font-bold text-emerald-700">
                {Math.round((1 - Number(salePrice) / Number(price)) * 100)}%
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-emerald-600 font-bold uppercase">
                توفير
              </span>
              <div className="text-xl font-bold text-emerald-700">
                {(Number(price) - Number(salePrice)).toFixed(2)} جنية
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
