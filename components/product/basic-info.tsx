"use client";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { categories } from "@/lib/data";
import { ProductFormValues } from "@/app/dashboard/products/new/_schema";
import { generateSlug } from "@/lib/healpers";
import { RefreshCw, Link as LinkIcon } from "lucide-react";

export function BasicInfoSection() {
  const {
    register,
    formState: { errors, touchedFields },
    watch,
    setValue,
  } = useFormContext<ProductFormValues>();

  const nameAr = watch("name");
  const nameEn = watch("nameEn");
  const categoryId = watch("categoryId");

  // Auto-generate slug only if untouched
  useEffect(() => {
    if (!touchedFields.slug && (nameEn || nameAr)) {
      const source = nameEn || nameAr;
      const generated = generateSlug(source);
      setValue("slug", generated, { shouldValidate: true });
    }
  }, [nameEn, nameAr, setValue, touchedFields.slug]);

  const generateSKU = () => {
    const currentCat = categoryId || "PRD";
    const prefix = currentCat.substring(0, 3).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setValue("sku", `${prefix}-${random}`, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Arabic Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            اسم المنتج (عربي) <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            className={`w-full h-12 px-4 bg-muted border rounded focus:ring-2 transition-all ${errors.name ? "border-destructive ring-destructive/20" : "border-transparent focus:ring-primary/20"}`}
            placeholder="مثال: مكتب خشبي"
          />
          {errors.name && (
            <p className="text-destructive text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* English Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            اسم المنتج (إنجليزي)
          </label>
          <input
            {...register("nameEn")}
            dir="ltr"
            className={`w-full h-12 px-4 bg-muted border rounded focus:ring-2 transition-all ${errors.nameEn ? "border-destructive ring-destructive/20" : "border-transparent focus:ring-primary/20"}`}
            placeholder="e.g., Wooden Desk"
          />
          {errors.nameEn && (
            <p className="text-destructive text-xs mt-1">
              {errors.nameEn.message}
            </p>
          )}
        </div>
      </div>

      {/* SKU & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            SKU (رمز المخزون) <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              {...register("sku")}
              className={`w-full h-12 px-4 bg-muted border rounded uppercase ${errors.sku ? "border-destructive" : "border-transparent"}`}
              placeholder="CAT-XYZ-123"
            />
            <button
              type="button"
              onClick={generateSKU}
              className="px-4 bg-secondary rounded border hover:bg-secondary/80 transition-colors"
            >
              <RefreshCw size={18} />
            </button>
          </div>
          {errors.sku && (
            <p className="text-destructive text-xs mt-1">
              {errors.sku.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            الفئة <span className="text-red-500">*</span>
          </label>
          <select
            {...register("categoryId")}
            className={`w-full h-12 px-4 bg-muted border rounded ${errors.categoryId ? "border-destructive" : "border-transparent"}`}
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
      </div>

      {/* Slug - Now Editable */}
      <div>
        <label className=" text-sm font-medium mb-1 flex items-center gap-2">
          <LinkIcon size={14} /> رابط المنتج (Slug)
        </label>
        <input
          {...register("slug")}
          // Removed readOnly so users can fix Arabic chars if regex fails
          className={`w-full h-12 px-4 bg-muted border rounded ltr ${errors.slug ? "border-destructive bg-destructive/5" : "border-transparent"}`}
        />
        <p className="text-[10px] text-muted-foreground mt-1">
          يجب أن يكون بالإنجليزية، بدون مسافات (استخدم الشرطات -)
        </p>
        {errors.slug && (
          <p className="text-destructive text-xs mt-1 font-bold">
            {errors.slug.message}
          </p>
        )}
      </div>

      {/* Descriptions */}
      <div>
        <label className="block text-sm font-medium mb-1">وصف مختصر</label>
        <textarea
          {...register("briefDescription")}
          rows={2}
          className="w-full p-4 bg-muted border-0 rounded"
        />
        {errors.briefDescription && (
          <p className="text-destructive text-sm">
            {errors.briefDescription.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">وصف تفصيلي</label>
        <textarea
          {...register("detailedDescription")}
          rows={4}
          className="w-full p-4 bg-muted border-0 rounded"
        />
        {errors.detailedDescription && (
          <p className="text-destructive text-sm">
            {errors.detailedDescription.message}
          </p>
        )}
      </div>
    </div>
  );
}
