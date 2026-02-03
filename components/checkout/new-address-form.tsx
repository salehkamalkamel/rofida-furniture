"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressFieldsSchema,
  AddressFormValues,
} from "@/lib/validations/address";
import { saveAddress } from "@/actions/address-actions";
import { useTransition, forwardRef } from "react";
import { toast } from "sonner";
import {
  Save,
  X,
  ShieldCheck,
  ChevronDown,
  Landmark,
  User,
  MapPin,
} from "lucide-react";
import { ShippingRule } from "@/db/schema";
import ShippingCoverage from "../shipping-coverage";

export default function NewAddressForm({
  closeNewAddressForm,
  shippingRules,
  setCurrentShippingRule,
}: {
  closeNewAddressForm: () => void;
  shippingRules: ShippingRule[];
  setCurrentShippingRule: (value: number | null) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const activeRules = shippingRules.filter((rule) => rule.isActive);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressFieldsSchema),
    mode: "onChange",
    defaultValues: {
      country: "Egypt",
      isDefault: true,
    },
  });

  const onSubmit = (data: AddressFormValues) => {
    const normalizedData = {
      ...data,
    };
    startTransition(async () => {
      const result = await saveAddress(normalizedData);
      if (result.success) {
        toast.success("تم تسجيل العنوان في قاعدة البيانات");
        closeNewAddressForm();
      } else {
        setError("root", { message: result.error });
        toast.error("خطأ في معالجة البيانات");
      }
    });
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ruleId = parseInt(e.target.value);
    const selectedRule = activeRules.find((r) => r.id === ruleId);
    if (selectedRule) {
      setValue("city", selectedRule.city || "");
      setValue("country", selectedRule.country);
      setValue("shippingRuleId", selectedRule.id);
      setCurrentShippingRule(selectedRule.id);
    }
  };

  return (
    <>
      {/* <ShippingCoverage /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background border-4 border-foreground p-0 sm:p-0 animate-in fade-in zoom-in-95 duration-300 max-w-4xl mx-auto shadow-[16px_16px_0px_0px_rgba(0,0,0,0.05)] mb-20"
        dir="rtl"
      >
        {/* Header Bar */}
        <div className="bg-foreground text-background p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary text-primary-foreground">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest leading-none">
                تسجيل عنوان شحن جديد
              </h3>
              <p className="text-[10px] font-mono opacity-60 uppercase mt-1">
                SYS_LOG: ADDRESS_ENTRY_INIT
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeNewAddressForm}
            className="hover:rotate-90 transition-transform p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 sm:p-10 space-y-12">
          {errors.root && (
            <div className="p-4 bg-destructive text-destructive-foreground border-2 border-foreground font-bold text-xs flex items-center gap-3">
              <span className="bg-background text-destructive px-1 font-black">
                FAIL
              </span>
              {errors.root.message}
            </div>
          )}

          {/* Section 01: Identification */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1 border-r-4 border-primary/20 pr-4">
              <span className="block text-[10px] font-black uppercase tracking-tighter text-primary">
                Module_01
              </span>
              <h4 className="font-black text-lg uppercase leading-tight">
                بيانات المستلم
              </h4>
            </div>

            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="الاسم الكامل"
                icon={<User className="w-3 h-3" />}
                required
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex justify-between">
                  رقم الهاتف <span>* مطلوب</span>
                </label>
                <div className="flex group transition-all focus-within:-translate-y-1">
                  <span className="h-12 flex items-center px-4 bg-foreground text-background font-black border-2 border-foreground text-sm">
                    +20
                  </span>
                  <input
                    dir="ltr"
                    {...register("phone")}
                    className="w-full h-12 px-4 border-2 border-foreground border-r-0 bg-background font-bold focus:outline-none focus:bg-secondary transition-colors"
                    placeholder="10xxxxxxxx"
                  />
                </div>
                {errors.phone && (
                  <p className="text-[10px] font-bold text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                  واتساب
                </label>
                <div className="flex group transition-all focus-within:-translate-y-1">
                  <span className="h-12 flex items-center px-4 bg-secondary text-foreground font-black border-2 border-foreground text-sm">
                    +20
                  </span>
                  <input
                    dir="ltr"
                    {...register("whatsApp")}
                    className="w-full h-12 px-4 border-2 border-foreground border-r-0 bg-background font-bold focus:outline-none focus:bg-secondary transition-colors"
                    placeholder="10xxxxxxxx"
                  />
                </div>
                {errors.whatsApp && (
                  <p className="text-[10px] font-bold text-destructive">
                    {errors.whatsApp.message}
                  </p>
                )}
              </div>

              <Input
                label="تسمية العنوان"
                placeholder="مثال: المنزل، العمل"
                error={errors.label?.message}
                {...register("label")}
              />
            </div>
          </section>

          {/* Section 02: Logistics */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1 border-r-4 border-primary/20 pr-4">
              <span className="block text-[10px] font-black uppercase tracking-tighter text-primary">
                Module_02
              </span>
              <h4 className="font-black text-lg uppercase leading-tight">
                الموقع الجغرافي
              </h4>
            </div>

            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <Input
                  label="الشارع / تفاصيل المبنى"
                  icon={<MapPin className="w-3 h-3" />}
                  required
                  error={errors.street?.message}
                  {...register("street")}
                />
              </div>

              <Select
                label="المنطقة / المدينة"
                required
                error={errors.city?.message}
                onChange={handleShippingChange}
              >
                <option value="">-- حدد منطقة الشحن --</option>
                {activeRules.map((rule) => (
                  <option key={rule.id} value={rule.id}>
                    {rule.city} ({rule.country})
                  </option>
                ))}
              </Select>

              <Input
                label="الحي / المنطقة"
                required
                error={errors.state?.message}
                {...register("state")}
              />

              <Input
                label="الرمز البريدي"
                required
                error={errors.zip?.message}
                {...register("zip")}
              />
            </div>
          </section>
        </div>

        {/* Action Footer */}
        <div className="border-t-4 border-foreground p-6 sm:p-10 bg-secondary flex flex-col sm:flex-row items-center justify-between gap-6">
          <label className="flex items-center gap-4 group cursor-pointer select-none order-2 sm:order-1">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="peer appearance-none w-8 h-8 border-4 border-foreground checked:bg-primary transition-all cursor-pointer"
                {...register("isDefault")}
              />
              <ShieldCheck className="absolute w-5 h-5 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            </div>
            <div className="text-right">
              <span className="block text-xs font-black uppercase tracking-widest leading-none">
                تعيين كافتراضي
              </span>
              <span className="text-[10px] font-bold opacity-40 uppercase">
                Default_Shipping_Record
              </span>
            </div>
          </label>

          <div className="flex items-center gap-4 w-full sm:w-auto order-1 sm:order-2">
            <button
              type="button"
              onClick={closeNewAddressForm}
              className="flex-1 sm:flex-none px-8 h-14 font-black text-[10px] uppercase tracking-widest border-2 border-transparent hover:border-foreground transition-all"
            >
              إلغاء
            </button>
            <button
              disabled={isPending}
              className="flex-1 sm:flex-none px-12 h-14 bg-foreground text-background font-black uppercase tracking-[0.2em] text-xs hover:bg-primary hover:shadow-[-4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isPending ? (
                "جاري الحفظ..."
              ) : (
                <>
                  <Save className="w-4 h-4" /> حفظ البيانات
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

/* =========================
   REFINED UI COMPONENTS
========================= */

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    required?: boolean;
    icon?: React.ReactNode;
  }
>(({ label, error, required, icon, className, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
        <span className="flex items-center gap-2">
          {icon} {label}
        </span>
        {required && <span className="text-primary italic">مطلوب</span>}
      </label>
      <input
        ref={ref}
        {...props}
        className={`w-full h-12 px-4 border-2 bg-background font-bold text-sm transition-all focus:outline-none ${
          error
            ? "border-destructive focus:bg-destructive/5"
            : "border-foreground focus:bg-secondary focus:-translate-y-1 focus:shadow-[-4px_4px_0px_0px_rgba(0,0,0,1)]"
        } ${className}`}
      />
      {error && (
        <p className="text-[10px] font-black text-destructive uppercase mt-1 tracking-tighter">
          {error}
        </p>
      )}
    </div>
  );
});
Input.displayName = "Input";

const Select = ({
  label,
  error,
  required,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  required?: boolean;
}) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
        <span>{label}</span>
        {required && <span className="text-primary italic">مطلوب</span>}
      </label>
      <div className="relative">
        <select
          {...props}
          className={`w-full h-12 px-4 border-2 bg-background font-bold text-sm appearance-none focus:outline-none transition-all ${
            error
              ? "border-destructive"
              : "border-foreground focus:bg-secondary focus:-translate-y-1 focus:shadow-[-4px_4px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          {children}
        </select>
        <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
      </div>
      {error && (
        <p className="text-[10px] font-black text-destructive uppercase mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
