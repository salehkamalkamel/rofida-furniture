"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  User,
  Phone,
  CheckCircle,
  Plus,
  Loader2,
  MessageCircleIcon,
  Info,
  Banknote,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { placeInstantOrder } from "@/actions/instant-buy-actions";
import { Address, ShippingRule } from "@/db/schema";
import { useRouter } from "next/navigation";

// Schema for Guest/New Address
const addressSchema = z.object({
  fullName: z.string().min(3, "الاسم مطلوب"),
  phone: z.string().min(10, "رقم الهاتف مطلوب"),
  whatsApp: z.string().min(10, "رقم الهاتف مطلوب"),
  street: z.string().min(5, "العنوان مطلوب"),
  city: z.string().min(2, "المدينة مطلوبة"),
  state: z.string().min(2, "المحافظة مطلوبة"),
});

type FormData = z.infer<typeof addressSchema>;

interface InstantBuyFormProps {
  basePrice: number;
  user: any;
  savedAddresses: Address[];
  shippingRules: ShippingRule[];
  productData: {
    productId: number;
    quantity: number;
    color?: string;
    isCustomized: boolean;
    customizationText?: string;
    priceAtAdd: number;
    customizationPrice: number;
  };
}

export function InstantBuyForm({
  basePrice,
  user,
  savedAddresses,
  shippingRules,
  productData,
}: InstantBuyFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // Initialize address selection
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    savedAddresses.length > 0 ? savedAddresses[0].id : null,
  );

  const [isNewAddressMode, setIsNewAddressMode] = useState(
    !user || savedAddresses.length === 0,
  );

  // Initialize shipping rule (default to first one or based on selected address)
  const [selectedShippingRule, setSelectedShippingRule] =
    useState<ShippingRule>(shippingRules[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addressSchema),
  });

  const uniqueShippingRules = Array.from(
    new Map(shippingRules.map((rule) => [rule.city, rule])).values(),
  );

  // --- Calculations ---
  const shippingCost = Number(selectedShippingRule?.price) || 0;
  const totalWithShipping = basePrice + shippingCost;

  // Handle RHF registration manually for the select to allow custom onChange logic
  const stateRegister = register("state");

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      if (!user) {
        await authClient.signIn.anonymous();
      }
      const result = await placeInstantOrder({
        isGuest: !user,
        addressData: isNewAddressMode
          ? { ...data, country: "Egypt", zip: "00000", whatsApp: data.whatsApp }
          : undefined,
        addressId: !isNewAddressMode
          ? (selectedAddressId ?? undefined)
          : undefined,
        shippingRuleId: selectedShippingRule.id,
        productData,
      });

      if (result.success && "orderId" in result) {
        toast.success("تم تأكيد طلبك بنجاح!", {
          description: `رقم الطلب #${result.orderId}`,
        });
        router.push(`/checkout/success?orderId=${result.orderId}`);
      } else {
        toast.error(
          (result as { success: boolean; error: string }).error ||
            "حدث خطأ أثناء تنفيذ الطلب",
        );
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header logic */}
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-foreground text-background w-6 h-6 flex items-center justify-center font-black text-xs rounded-none">
          1
        </div>
        <h2 className="text-sm font-black uppercase tracking-widest">
          بيانات التوصيل
        </h2>
      </div>

      {/* --- NEW: Shipping & Payment Notice --- */}
      <div className="bg-muted/30 border border-dashed border-foreground/20 p-4 rounded-sm">
        <div className="flex gap-3 items-start">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              <span className="font-bold text-foreground block mb-1">
                مناطق التوصيل الحالية:
              </span>
              القاهرة، الجيزة، والقليوبية فقط.
            </p>
          </div>
        </div>
        <div className="w-full h-px bg-foreground/10 my-3" />
        <div className="flex gap-3 items-start">
          <Banknote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              <span className="font-bold text-foreground block mb-1">
                طريقة الدفع:
              </span>
              الدفع عند الاستلام فقط (Cash on Delivery).
            </p>
          </div>
        </div>
      </div>

      {/* Mode 1: Logged in with Addresses */}
      {user && !isNewAddressMode && savedAddresses.length > 0 && (
        <div className="space-y-3">
          {savedAddresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => setSelectedAddressId(addr.id)}
              className={`cursor-pointer border-2 p-4 relative transition-all ${
                selectedAddressId === addr.id
                  ? "border-primary bg-primary/5"
                  : "border-foreground/10 hover:border-foreground/30"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold block text-sm">
                    {addr.fullName}
                  </span>
                  <span className="text-xs text-muted-foreground block mt-1">
                    {addr.city}, {addr.street}
                  </span>
                  <span className="text-xs font-mono block mt-1">
                    {addr.phone}
                  </span>
                </div>
                {selectedAddressId === addr.id && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
              </div>
            </div>
          ))}

          <button
            onClick={() => setIsNewAddressMode(true)}
            className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> إضافة عنوان جديد
          </button>
        </div>
      )}

      {/* Mode 2: Guest OR New Address Form */}
      {isNewAddressMode && (
        <form
          id="instant-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 animate-in fade-in slide-in-from-top-2"
        >
          {user && (
            <button
              type="button"
              onClick={() => setIsNewAddressMode(false)}
              className="text-[10px] text-muted-foreground hover:text-foreground mb-2 underline"
            >
              الرجوع للعناوين المحفوظة
            </button>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase opacity-50">
                الاسم بالكامل
              </label>
              <div className="relative">
                <User className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  {...register("fullName")}
                  className="w-full bg-white border border-foreground/20 p-2 pr-9 text-sm focus:border-primary outline-none"
                  placeholder="الاسم"
                />
              </div>
              {errors.fullName && (
                <p className="text-[10px] text-destructive font-bold">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase opacity-50">
                رقم الهاتف (للتواصل)
              </label>
              <div className="relative">
                <Phone className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  {...register("phone")}
                  className="w-full bg-white border border-foreground/20 p-2 pr-9 text-sm focus:border-primary outline-none font-mono"
                  placeholder="01xxxxxxxxx"
                />
              </div>
              {errors.phone && (
                <p className="text-[10px] text-destructive font-bold">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase opacity-50">
                رقم واتس اب (للتواصل)
              </label>
              <div className="relative">
                <MessageCircleIcon className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  {...register("whatsApp")}
                  className="w-full bg-white border border-foreground/20 p-2 pr-9 text-sm focus:border-primary outline-none font-mono"
                  placeholder="01xxxxxxxxx"
                />
              </div>
              {errors.phone && (
                <p className="text-[10px] text-destructive font-bold">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase opacity-50">
                  المحافظة
                </label>
                <select
                  {...stateRegister}
                  onChange={(e) => {
                    // 1. Trigger RHF validation
                    stateRegister.onChange(e);

                    // 2. Custom logic to update price
                    const selectedRule = shippingRules.find(
                      (rule) => rule.city === e.target.value,
                    );
                    if (selectedRule) {
                      setSelectedShippingRule(selectedRule);
                    }
                  }}
                  className="w-full bg-white border border-foreground/20 p-2 text-sm focus:border-primary outline-none"
                >
                  <option value="">اختر المحافظة</option>
                  {uniqueShippingRules.map((rule) => (
                    <option key={rule.id} value={rule.city ?? ""}>
                      {rule.city}
                    </option>
                  ))}
                </select>

                {errors.state && (
                  <p className="text-[10px] text-destructive font-bold">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase opacity-50">
                  المدينة
                </label>
                <input
                  {...register("city")}
                  className="w-full bg-white border border-foreground/20 p-2 text-sm focus:border-primary outline-none"
                  placeholder="المعادي"
                />
                {errors.city && (
                  <p className="text-[10px] text-destructive font-bold">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase opacity-50">
                العنوان بالتفصيل
              </label>
              <div className="relative">
                <MapPin className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                <textarea
                  {...register("street")}
                  className="w-full bg-white border border-foreground/20 p-2 pr-9 text-sm focus:border-primary outline-none min-h-15"
                  placeholder="اسم الشارع، رقم العمارة، علامة مميزة..."
                />
              </div>
              {errors.street && (
                <p className="text-[10px] text-destructive font-bold">
                  {errors.street.message}
                </p>
              )}
            </div>
          </div>
        </form>
      )}

      {/* --- NEW: Price Breakdown UI --- */}
      <div className="mt-8 border-t-2 border-foreground/20 border-dashed pt-4 mx-2">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
          <span>الشحن ({selectedShippingRule?.city || "قياسي"})</span>
          <span className="font-mono">{shippingCost.toLocaleString()} EGP</span>
        </div>
        <div className="flex justify-between items-center text-lg font-black uppercase">
          <span>الإجمالي للدفع</span>
          <span className="text-primary">
            {totalWithShipping.toLocaleString()} EGP
          </span>
        </div>
      </div>

      {/* Actions */}
      <button
        onClick={
          isNewAddressMode
            ? handleSubmit(onSubmit)
            : () => onSubmit({} as FormData)
        }
        disabled={isPending}
        className="w-full bg-foreground text-background h-14 font-black uppercase tracking-[0.2em] hover:bg-primary transition-colors flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            جاري التنفيذ...
          </>
        ) : (
          "تأكيد الطلب الآن"
        )}
      </button>
    </div>
  );
}
