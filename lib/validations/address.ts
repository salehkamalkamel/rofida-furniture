// lib/validations/address.ts
import { z } from "zod";
const egyptianMobileRegex = /^(10|11|12|15)[0-9]{8}$/;

export const addressFieldsSchema = z.object({
  label: z.string().optional(),

  fullName: z.string().min(2, "الاسم مطلوب"),
  street: z.string().min(2, "الشارع مطلوب"),
  city: z.string().min(2, "المدينة مطلوبة"),
  state: z.string().min(2, "المحافظة مطلوبة"),
  zip: z.string().min(2, "الرمز البريدي مطلوب"),
  country: z.string().default("Egypt"),

  shippingRuleId: z.number(),

  phone: z.string().regex(egyptianMobileRegex, "رقم هاتف مصري غير صالح"),

  whatsApp: z.string().regex(egyptianMobileRegex, "رقم واتساب مصري غير صالح"),

  isDefault: z.boolean().optional(),
});

export type AddressFormValues = z.infer<typeof addressFieldsSchema>;
