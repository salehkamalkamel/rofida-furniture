"use client";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { categories } from "@/lib/data";
import { ProductFormValues } from "@/app/dashboard/products/new/_schema";
import { generateSlug } from "@/lib/healpers";
import { RefreshCw } from "lucide-react";

export function BasicInfoSection() {
  const {
    register,
    formState: { errors, touchedFields },
    watch,
    setValue,
  } = useFormContext<ProductFormValues>();

  // 1. Watch both names for fallback logic
  const nameAr = watch("name");
  const nameEn = watch("nameEn");
  const categoryId = watch("categoryId");

  // 2. Simplified Auto-Generation Logic
  useEffect(() => {
    // Only auto-generate if the user hasn't manually typed in the slug field
    if (!touchedFields.slug) {
      const sourceText = nameEn || nameAr; // English priority, Arabic fallback
      if (sourceText) {
        const generated = generateSlug(sourceText);
        setValue("slug", generated, { shouldValidate: true });
      }
    }
  }, [nameEn, nameAr, setValue, touchedFields.slug]);

  const generateSKU = () => {
    const prefix = categoryId
      ? categoryId.substring(0, 3).toUpperCase()
      : "PRD";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setValue("sku", `${prefix}-${random}`, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            اسم المنتج (عربي) <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            className={`w-full h-12 px-4 bg-muted border rounded focus:ring-2 transition-all ${errors.name ? "border-destructive ring-destructive/20" : "border-transparent focus:ring-primary/20"}`}
            placeholder="مثال: مكتب"
          />
          {errors.name && (
            <p className="text-destructive text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            اسم المنتج (إنجليزي)
          </label>
          <input
            {...register("nameEn")}
            dir="ltr"
            className={`w-full h-12 px-4 bg-muted border rounded focus:ring-2 transition-all ${errors.nameEn ? "border-destructive ring-destructive/20" : "border-transparent focus:ring-primary/20"}`}
            placeholder="e.g., Desk"
          />
          {errors.nameEn && (
            <p className="text-destructive text-xs mt-1">
              {errors.nameEn.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          SKU (رمز المخزون) <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              {...register("sku")}
              className={`w-full h-12 px-4 bg-muted border rounded focus:ring-2 transition-all uppercase placeholder:normal-case ${errors.sku ? "border-destructive ring-destructive/20" : "border-transparent focus:ring-primary/20"}`}
              placeholder="GEN-XYZ-123"
            />
          </div>
          <button
            type="button"
            onClick={generateSKU}
            className="px-4 bg-secondary text-secondary-foreground rounded border hover:bg-secondary/80 transition-colors flex items-center gap-2 font-medium text-sm"
          >
            <RefreshCw size={16} /> توليد
          </button>
        </div>
        {errors.sku && (
          <p className="text-destructive text-xs mt-1">{errors.sku.message}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            الفئة <span className="text-red-500">*</span>
          </label>
          <select
            {...register("categoryId")}
            className={`w-full h-12 px-4 bg-muted border rounded focus:ring-2 transition-all ${errors.categoryId ? "border-destructive ring-destructive/20" : "border-transparent focus:ring-primary/20"}`}
          >
            <option value="">اختر فئة...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-destructive text-xs mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            الرابط (Slug)
          </label>
          <input
            {...register("slug")}
            className={`w-full h-12 px-4 rounded transition-all ${
              errors.slug
                ? "bg-destructive/5 border-destructive border"
                : "bg-muted/50 border-transparent"
            }`}
            readOnly
          />
          {errors.slug && (
            <p className="text-destructive text-xs mt-1 font-bold animate-shake">
              {errors.slug.message}
            </p>
          )}
        </div>
      </div>
      {/* Description fields remain similar but with consistent error styling */}
      {/*Breif Descriptions */}
      <div>
        <label className="block text-sm font-medium mb-1">وصف مختصر</label>
        <textarea
          {...register("briefDescription")}
          rows={2}
          className="w-full p-4 bg-muted border-0 rounded"
        />
        {errors.briefDescription && (
          <p className="text-red-500 text-sm">
            {errors.briefDescription.message}
          </p>
        )}
      </div>
      {/* Detailed Descriptions */}
      <div>
        <label className="block text-sm font-medium mb-1">وصف تفصيلي</label>
        <textarea
          {...register("detailedDescription")}
          rows={4}
          className="w-full p-4 bg-muted border-0 rounded"
        />
        {errors.detailedDescription && (
          <p className="text-red-500 text-sm">
            {errors.detailedDescription.message}
          </p>
        )}
      </div>
    </div>
  );
}
