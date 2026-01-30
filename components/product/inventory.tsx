"use client";
import { ProductFormValues } from "@/app/dashboard/products/new/_schema";
import { useFormContext } from "react-hook-form";

const stockStatusOptions = [
  {
    value: "in_stock",
    label: "متوفر",
    color: "bg-green-500",
    border: "peer-checked:border-green-500",
    bg: "peer-checked:bg-green-50",
  },
  {
    value: "out_of_stock",
    label: "غير متوفر",
    color: "bg-red-500",
    border: "peer-checked:border-red-500",
    bg: "peer-checked:bg-red-50",
  },
  {
    value: "pre_order",
    label: "طلب مسبق",
    color: "bg-blue-500",
    border: "peer-checked:border-blue-500",
    bg: "peer-checked:bg-blue-50",
  },
  {
    value: "limited",
    label: "كمية محدودة",
    color: "bg-yellow-500",
    border: "peer-checked:border-yellow-500",
    bg: "peer-checked:bg-yellow-50",
  },
] as const;

const availableStatusOptions = [
  { value: "active", label: "نشط", description: "المنتج مرئي للعملاء" },
  { value: "draft", label: "مسودة", description: "المنتج محفوظ ولكن غير مرئي" },
  { value: "archived", label: "مؤرشف", description: "المنتج مخفي ومؤرشف" },
] as const;

export function InventorySection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  return (
    <div className="space-y-8">
      {/* Stock Status */}
      <div>
        <label className="block text-sm font-medium mb-3">حالة المخزون</label>
        <div className="grid grid-cols-2 gap-3">
          {stockStatusOptions.map((option) => (
            <label key={option.value} className="cursor-pointer group relative">
              <input
                type="radio"
                value={option.value}
                {...register("stockStatus")}
                className="peer sr-only"
              />
              <div
                className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all hover:bg-muted ${option.border} ${option.bg}`}
              >
                <div className={`w-3 h-3 rounded-full ${option.color}`} />
                <span className="font-medium">{option.label}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.stockStatus && (
          <p className="text-red-500 text-sm mt-1">
            {errors.stockStatus.message}
          </p>
        )}
      </div>

      <hr />

      {/* Available Status */}
      <div>
        <label className="block text-sm font-medium mb-3">حالة النشر</label>
        <div className="space-y-3">
          {availableStatusOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted has-checked:border-primary has-checked:bg-primary/5"
            >
              <input
                type="radio"
                value={option.value}
                {...register("availableStatus")}
                className="w-5 h-5 accent-primary"
              />
              <div>
                <span className="font-medium block">{option.label}</span>
                <span className="text-sm text-muted-foreground">
                  {option.description}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">وقت التجهيز</label>
          <input
            {...register("buildTime")}
            className="w-full h-12 px-4 bg-muted border-0 rounded"
            placeholder="مثال: 3-5 أيام عمل"
          />
        </div>

        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="customizable"
            {...register("isCustomizable")}
            className="w-5 h-5 rounded border-gray-300"
          />
          <label htmlFor="customizable" className="font-medium cursor-pointer">
            قابل للتخصيص
          </label>
        </div>
      </div>
    </div>
  );
}
