import { z } from "zod";

// --- REUSABLE HELPERS ---

/**
 * Coerces string inputs from HTML forms into numbers.
 * Ensures the value is never negative.
 */
const numberInput = z.coerce
  .number({ invalid_type_error: "يجب إدخال رقم صحيح" })
  .min(0, "يجب أن يكون الرقم موجباً");

// --- NESTED SCHEMAS ---

export const measurementSchema = z.object({
  width: numberInput.optional(),
  height: numberInput.optional(),
  depth: numberInput.optional(),
  weight: numberInput.optional(),
  unit: z.enum(["cm", "mm", "inch"]).default("cm"),
});

export const productColorSchema = z.object({
  name: z.string().min(1, "اسم اللون مطلوب"),
  hex: z
    .string()
    .regex(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      "رمز اللون غير صحيح (مثال: #ffffff)",
    ),
});

// --- MAIN PRODUCT SCHEMA ---

export const productSchema = z.object({
  // Identification
  sku: z.string().min(3, "رمز المنتج مطلوب (3 حروف على الأقل)").max(50),
  name: z.string().min(2, "اسم المنتج بالعربي مطلوب"),
  nameEn: z.string().min(2, "اسم المنتج بالإنجليزي مطلوب"),
  slug: z.string().optional(),
  // Descriptions
  briefDescription: z
    .string()
    .min(10, "الوصف المختصر يجب أن يكون 10 أحرف على الأقل")
    .max(150, "الوصف المختصر طويل جداً (الحد الأقصى 150 حرف)"),
  detailedDescription: z.string().min(20, "يرجى كتابة وصف تفصيلي للمنتج"),

  // Pricing
  price: numberInput.min(1, "السعر مطلوب ويجب أن يكون أكبر من 0"),
  salePrice: numberInput.optional().nullable(),
  isOnOffer: z.boolean().default(false),

  // Inventory & Status
  // Note: These Enums MUST match your Drizzle pgEnum values exactly
  stockStatus: z.enum(["in_stock", "out_of_stock", "pre_order", "limited"], {
    errorMap: () => ({ message: "يرجى اختيار حالة المخزون" }),
  }),
  availableStatus: z.enum(["active", "draft", "archived"]).default("draft"),

  // Categorization
  // We use categoryId in the form, we will map it to 'category' in the action
  categoryId: z.string().min(1, "الفئة مطلوبة"),
  label: z
    .enum(["new_arrival", "best_seller", "on_sale", "limited_edition"])
    .optional(),

  // Logistics
  buildTime: z.string().optional(),
  isCustomizable: z.boolean().default(false),

  // Assets & Complex Data
  images: z
    .array(z.string().url("رابط الصورة غير صالح"))
    .min(1, "يجب إضافة صورة واحدة على الأقل"),

  colors: z.array(productColorSchema).default([]),
  measurements: measurementSchema.optional(),
});

// --- TYPES ---

export type ProductFormValues = z.infer<typeof productSchema>;

/**
 * REFINEMENT (Optional)
 * Example: Ensure salePrice is always lower than price
 */
export const refinedProductSchema = productSchema.refine(
  (data) => {
    if (data.salePrice && data.salePrice >= data.price) {
      return false;
    }
    return true;
  },
  {
    message: "سعر العرض يجب أن يكون أقل من السعر الأصلي",
    path: ["salePrice"],
  },
);
