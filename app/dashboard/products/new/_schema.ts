import { z } from "zod";

// --- HELPERS ---

// improved number coercing that handles empty strings safely
const safeNumber = z.preprocess(
  (val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    const parsed = Number(val);
    return isNaN(parsed) ? undefined : parsed;
  },
  z
    .number({ invalid_type_error: "يجب إدخال رقم صحيح" })
    .min(0, "يجب أن يكون الرقم موجباً"),
);

// --- NESTED SCHEMAS ---

export const measurementSchema = z.object({
  width: safeNumber.optional(),
  height: safeNumber.optional(),
  depth: safeNumber.optional(),
  weight: safeNumber.optional(),
  unit: z.enum(["cm", "mm", "inch"]).default("cm"),
});

export const productColorSchema = z.object({
  name: z.string().min(1, "اسم اللون مطلوب"),
  hex: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "رمز اللون غير صحيح"),
});

// --- MAIN PRODUCT SCHEMA ---

export const productSchema = z
  .object({
    sku: z.string().min(3, "رمز المنتج مطلوب").max(50),
    name: z.string().min(2, "اسم المنتج مطلوب"),
    nameEn: z.string().min(2, "اسم المنتج مطلوب"),
    // Validation: Slug must be URL-safe
    slug: z
      .string()
      .min(2, "الرابط قصير جداً")
      .regex(
        /^[a-z0-9-]+$/,
        "الرابط يجب أن يحتوي على أحرف إنجليزية وأرقام وشرطات فقط",
      )
      .optional(),

    briefDescription: z.string().min(10).max(150),
    detailedDescription: z.string().min(20),

    // Pricing
    price: safeNumber.refine(
      (val) => val !== undefined && val > 0,
      "السعر مطلوب",
    ),
    salePrice: safeNumber.optional().nullable(),
    isOnOffer: z.boolean().default(false),

    stockStatus: z.enum([
      "in_stock",
      "out_of_stock",
      "pre_order",
      "limited",
      "made_to_order",
    ]),
    availableStatus: z.enum(["active", "draft", "archived"]).default("draft"),
    categoryId: z.string().min(1, "الفئة مطلوبة"),

    // Arrays
    images: z.array(z.string().url()).min(1, "يجب إضافة صورة واحدة على الأقل"),
    colors: z.array(productColorSchema).default([]),
    measurements: measurementSchema.optional(),

    buildTime: z.string().optional(),
    isCustomizable: z.boolean().default(false),
  })
  // LOGIC REFINEMENT: Ensure Sale Price exists if Offer is active
  .superRefine((data, ctx) => {
    if (data.isOnOffer) {
      if (!data.salePrice || data.salePrice <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "يجب تحديد سعر العرض عند تفعيل العرض",
          path: ["salePrice"],
        });
      }
      if (data.salePrice && data.price && data.salePrice >= data.price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "سعر العرض يجب أن يكون أقل من السعر الأساسي",
          path: ["salePrice"],
        });
      }
    }
  });

export type ProductFormValues = z.infer<typeof productSchema>;
