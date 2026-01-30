"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Palette, Ruler, Weight } from "lucide-react";
import { ProductFormValues } from "@/app/dashboard/products/new/_schema";

export function AttributesSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  // Dynamic Array for Colors
  const { fields, append, remove } = useFieldArray({
    control,
    name: "colors",
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* --- DIMENSIONS SECTION --- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-dashed">
          <Ruler className="text-blue-500" size={20} />
          <h3 className="font-bold text-lg">أبعاد المنتج والوزن</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Width */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground mr-1">
              العرض
            </label>
            <input
              type="number"
              {...register("measurements.width")}
              placeholder="0"
              className="w-full h-11 px-4 bg-muted border-0 rounded-lg focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Height */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground mr-1">
              الارتفاع
            </label>
            <input
              type="number"
              {...register("measurements.height")}
              placeholder="0"
              className="w-full h-11 px-4 bg-muted border-0 rounded-lg focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Depth */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground mr-1">
              العمق
            </label>
            <input
              type="number"
              {...register("measurements.depth")}
              placeholder="0"
              className="w-full h-11 px-4 bg-muted border-0 rounded-lg focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Weight */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground mr-1">
              الوزن
            </label>
            <div className="relative">
              <input
                type="number"
                {...register("measurements.weight")}
                placeholder="0"
                className="w-full h-11 px-4 bg-muted border-0 rounded-lg focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Weight
                className="absolute left-3 top-3 text-muted-foreground"
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Unit Selector */}
        <div className="flex gap-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
          <label className="text-sm font-medium text-blue-800">
            وحدة القياس:
          </label>
          <div className="flex gap-4">
            {["cm", "mm", "inch"].map((unit) => (
              <label
                key={unit}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  value={unit}
                  {...register("measurements.unit")}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm font-bold uppercase group-hover:text-blue-600">
                  {unit}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* --- COLORS SECTION --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-dashed">
          <div className="flex items-center gap-2">
            <Palette className="text-purple-500" size={20} />
            <h3 className="font-bold text-lg">الألوان المتاحة</h3>
          </div>
          <button
            type="button"
            onClick={() => append({ name: "", hex: "#000000" })}
            className="flex items-center gap-1 text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
          >
            <Plus size={14} /> إضافة لون
          </button>
        </div>

        {fields.length === 0 && (
          <div className="py-8 text-center border-2 border-dashed rounded-xl text-muted-foreground">
            <p className="text-sm">لم يتم إضافة ألوان لهذا المنتج بعد</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="group flex items-center gap-3 p-3 bg-muted/40 border border-transparent hover:border-border hover:bg-muted/60 rounded-xl transition-all"
            >
              {/* Color Picker Box */}
              <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-lg border shadow-sm">
                <input
                  type="color"
                  {...register(`colors.${index}.hex`)}
                  className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                />
              </div>

              {/* Color Name Input */}
              <div className="flex-1">
                <input
                  {...register(`colors.${index}.name`)}
                  placeholder="اسم اللون (مثلاً: بلوط)"
                  className="w-full bg-transparent border-0 focus:ring-0 text-sm font-medium p-0"
                />
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => remove(index)}
                className="opacity-0 group-hover:opacity-100 p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        {errors.colors && (
          <p className="text-red-500 text-xs font-bold">
            {errors.colors.message}
          </p>
        )}
      </div>
    </div>
  );
}
