import { z } from "zod";

export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(4, "ZIP code is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().min(8, "Phone number is required"),
});

export const createOrderSchema = z.object({
  shippingAddress: shippingAddressSchema,
});

export const updateOrderStatusSchema = z.object({
  orderId: z.number(),
  status: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
});

// Infer types for usage in components
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
