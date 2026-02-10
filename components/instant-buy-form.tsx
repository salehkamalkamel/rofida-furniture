"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Phone,
  CheckCircle,
  Plus,
  Loader2,
  MessageCircleIcon,
  Info,
  Banknote,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { placeInstantOrder } from "@/actions/instant-buy-actions";
import type { Address, ShippingRule } from "@/db/schema";
import { useRouter } from "next/navigation";
import { User as UserType } from "better-auth";

const addressSchema = z.object({
  fullName: z.string().min(3, "الاسم مطلوب"),
  phone: z.string().min(10, "رقم الهاتف مطلوب"),
  whatsApp: z.string().min(10, "رقم الواتساب مطلوب"),
  street: z.string().min(5, "العنوان بالتفصيل مطلوب"),
  city: z.string().min(2, "المدينة مطلوبة"),
  state: z.string().min(2, "المحافظة مطلوبة"),
});

type FormData = z.infer<typeof addressSchema>;

type InstantBuyFormType = {
  basePrice: number;
  user: UserType | undefined;
  savedAddresses: Address[] | [];
  shippingRules: ShippingRule[];
  customizationFee: number;
  shippingFee: number;
  total: number;
  productData: {
    productId: number;
    quantity: number;
    color: any;
    isCustomized: boolean;
    customizationText: string;
  };
};

export function InstantBuyForm({
  basePrice,
  user,
  savedAddresses,
  shippingRules,
  customizationFee,
  shippingFee,
  total,
  productData,
}: InstantBuyFormType) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const session = await authClient.getSession();
      if (!session.data) {
        await authClient.signIn.anonymous();
        router.refresh();
      }
    };
    if (!user) initAuth();
  }, [user, router]);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    savedAddresses.length > 0 ? savedAddresses[0].id : null,
  );
  const [isNewAddressMode, setIsNewAddressMode] = useState(
    !user || savedAddresses.length === 0,
  );
  const [selectedRule, setSelectedRule] = useState<ShippingRule>(
    shippingRules[0],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (!isNewAddressMode && selectedAddressId) {
      const addr = savedAddresses.find((a: any) => a.id === selectedAddressId);
      const rule = shippingRules.find(
        (r: any) => r.id === addr?.shippingRuleId,
      );
      if (rule) setSelectedRule(rule);
    }
  }, [selectedAddressId, isNewAddressMode, savedAddresses, shippingRules]);

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const result = await placeInstantOrder({
        addressData: isNewAddressMode
          ? { ...data, country: "Egypt", zip: "00000" }
          : undefined,
        addressId: !isNewAddressMode
          ? (selectedAddressId ?? undefined)
          : undefined,
        shippingRuleId: selectedRule.id,
        productData,
      });

      if (result.success && "orderId" in result) {
        toast.success("تم تأكيد طلبك بنجاح!");
        router.push(`/instant-buy/success?orderId=${result.orderId}`);
      } else {
        toast.error((result as any).error || "خطأ في الشبكة");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-foreground text-background w-6 h-6 flex items-center justify-center font-black text-xs">
          1
        </div>
        <h2 className="text-sm font-black uppercase tracking-widest">
          بيانات التوصيل
        </h2>
      </div>

      {/* Info Boxes */}
      <div className="bg-muted/30 border border-dashed border-foreground/20 p-4 space-y-3">
        <div className="flex gap-3 text-xs">
          <Info className="w-4 h-4 text-primary shrink-0" /> مناطق التوصيل:
          القاهرة، الجيزة، القليوبية.
        </div>
        <div className="flex gap-3 text-xs">
          <Banknote className="w-4 h-4 text-primary shrink-0" /> الدفع عند
          الاستلام (COD).
        </div>
      </div>

      {user && !isNewAddressMode && savedAddresses.length > 0 ? (
        <div className="space-y-3">
          {savedAddresses.map((addr: any) => (
            <div
              key={addr.id}
              onClick={() => setSelectedAddressId(addr.id)}
              className={`cursor-pointer border-2 p-4 flex justify-between items-center transition-all ${selectedAddressId === addr.id ? "border-primary bg-primary/5" : "border-foreground/10"}`}
            >
              <div>
                <p className="font-bold text-sm">{addr.fullName}</p>
                <p className="text-xs text-muted-foreground">
                  {addr.city}, {addr.street}
                </p>
              </div>
              {selectedAddressId === addr.id && (
                <CheckCircle className="w-5 h-5 text-primary" />
              )}
            </div>
          ))}
          <button
            onClick={() => setIsNewAddressMode(true)}
            className="text-xs text-primary font-bold flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> إضافة عنوان جديد
          </button>
        </div>
      ) : (
        <form className="space-y-4">
          {user && savedAddresses.length > 0 && (
            <button
              type="button"
              onClick={() => setIsNewAddressMode(false)}
              className="text-[10px] underline mb-2"
            >
              الرجوع للعناوين المحفوظة
            </button>
          )}

          <div className="grid grid-cols-1 gap-4">
            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-black opacity-50 uppercase">
                الاسم بالكامل
              </label>
              <div className="relative">
                <User className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  {...register("fullName")}
                  className="w-full bg-white border border-foreground/20 p-2 pr-9 text-sm outline-none focus:border-primary"
                  placeholder="الاسم"
                />
              </div>
              {errors.fullName && (
                <p className="text-[10px] text-destructive font-bold">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Phone & WhatsApp */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-black opacity-50">
                  رقم الهاتف
                </label>
                <input
                  {...register("phone")}
                  className="w-full border p-2 text-sm"
                  placeholder="01..."
                />
                {errors.phone && (
                  <p className="text-[10px] text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black opacity-50">
                  واتساب
                </label>
                <input
                  {...register("whatsApp")}
                  className="w-full border p-2 text-sm"
                  placeholder="01..."
                />
                {/* FIX: Correct WhatsApp error mapping */}
                {errors.whatsApp && (
                  <p className="text-[10px] text-destructive">
                    {errors.whatsApp.message}
                  </p>
                )}
              </div>
            </div>

            {/* Region Select */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-black opacity-50">
                  المحافظة
                </label>
                <select
                  className="w-full border p-2 text-sm bg-white"
                  onChange={(e) => {
                    const rule = shippingRules.find(
                      (r: any) => r.city === e.target.value,
                    );
                    if (rule) {
                      setSelectedRule(rule);
                      setValue("state", e.target.value);
                    }
                  }}
                >
                  <option value="">اختر</option>
                  {shippingRules.map((rule: any) => (
                    <option key={rule.id} value={rule.city}>
                      {rule.city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black opacity-50">
                  المدينة
                </label>
                <input
                  {...register("city")}
                  className="w-full border p-2 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black opacity-50">
                العنوان بالتفصيل
              </label>
              <textarea
                {...register("street")}
                className="w-full border p-2 text-sm min-h-15"
                placeholder="الشارع، العمارة، الشقة..."
              />
            </div>
          </div>
        </form>
      )}

      {/* Price Summary */}
      <div className="mt-8 border-t-2 border-foreground/20 border-dashed pt-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>الشحن ({selectedRule?.city})</span>
          <span>{Number(shippingFee)} EGP</span>
        </div>
        {customizationFee > 0 && (
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{`اضافة تعديلات  10%`}</span>
            <span>{Number(customizationFee)} EGP</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-black">
          <span>الإجمالي</span>
          <span className="text-primary">{total} EGP</span>
        </div>
      </div>

      <button
        onClick={
          isNewAddressMode ? handleSubmit(onSubmit) : () => onSubmit({} as any)
        }
        disabled={isPending}
        className="w-full bg-foreground text-background h-14 font-black flex items-center justify-center gap-3 hover:bg-primary transition-colors disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          "تأكيد الطلب الآن"
        )}
      </button>
    </div>
  );
}
