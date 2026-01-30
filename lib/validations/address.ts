// lib/validations/address.ts
import { z } from "zod";

export const addressFieldsSchema = z.object({
  label: z.string().optional(),

  fullName: z.string().min(2, "الاسم مطلوب"),
  street: z.string().min(2, "الشارع مطلوب"),
  city: z.string().min(2, "المدينة مطلوبة"),
  state: z.string().min(2, "المحافظة مطلوبة"),
  zip: z.string().min(2, "الرمز البريدي مطلوب"),
  country: z.string().min(2, "الدولة مطلوبة"),

  phone: z.string().min(8, "رقم الهاتف غير صالح"),
  whatsApp: z.string().min(8, "رقم واتساب غير صالح"),

  isDefault: z.boolean().optional(),
});

export type AddressFormValues = z.infer<typeof addressFieldsSchema>;
