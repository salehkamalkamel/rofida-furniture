import { z } from "zod";

export const AddToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1).max(10),
  selectedColor: z.string().optional(),
  isCustomized: z.boolean().default(false),
  customizationText: z.string().max(500).optional(),
});

export const UpdateQuantitySchema = z.object({
  itemId: z.number(),
  quantity: z.number().min(0).max(20), // 0 will trigger removal
});
