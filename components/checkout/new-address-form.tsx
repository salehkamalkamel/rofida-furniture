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
import { Save, X, Info, ShieldCheck } from "lucide-react";

export default function NewAddressForm({
  closeNewAddressForm,
}: {
  closeNewAddressForm: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressFieldsSchema),
    mode: "onChange",
    defaultValues: {
      country: "مصر",
      isDefault: true,
    },
  });

  const onSubmit = (data: AddressFormValues) => {
    startTransition(async () => {
      const result = await saveAddress(data);
      if (result.success) {
        toast.success("تمت اضافة العنوان الجديد بنجاح");
        closeNewAddressForm();
      } else {
        setError("root", { message: result.error });
        toast.error("فشل اضافة العنوان الجديد");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-muted/10 border-2 border-foreground/10 p-5 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 sm:mb-8 border-b border-foreground/10 pb-4">
        <div>
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest sm:tracking-[0.2em]">
            إنشاء سجل عنوان جديد
          </h3>
          <p className="text-[9px] sm:text-[10px] font-bold opacity-40 uppercase mt-1">
            Address_Record_Initialization
          </p>
        </div>
        <button
          type="button"
          onClick={closeNewAddressForm}
          className="p-3 -mt-2 -mr-2 hover:bg-foreground hover:text-background transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {errors.root && (
        <div className="mb-6 p-4 bg-destructive/5 border-2 border-destructive flex gap-3 items-center">
          <Info className="w-5 h-5 text-destructive shrink-0" />
          <p className="text-xs font-bold text-destructive">
            {errors.root.message}
          </p>
        </div>
      )}

      <div className="space-y-8 sm:space-y-12">
        {/* Section 1 */}
        <section>
          <div className="text-[9px] font-black opacity-30 uppercase tracking-widest mb-4 border-r-2 border-primary/30 pr-2">
            01. بيانات المستلم
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-6">
            <Input
              label="الاسم الكامل"
              required
              error={errors.fullName?.message}
              {...register("fullName")}
            />
            <Input
              label="رقم الهاتف"
              dir="ltr"
              required
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Input
              label="رقم واتساب"
              dir="ltr"
              required
              error={errors.whatsApp?.message}
              {...register("whatsApp")}
            />
            <Input
              label="تسمية العنوان"
              placeholder="مكتب، منزل..."
              error={errors.label?.message}
              {...register("label")}
            />
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <div className="text-[9px] font-black opacity-30 uppercase tracking-widest mb-4 border-r-2 border-primary/30 pr-2">
            02. التفاصيل الجغرافية
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-6">
            <div className="sm:col-span-2">
              <Input
                label="الشارع / العنوان التفصيلي"
                required
                error={errors.street?.message}
                {...register("street")}
              />
            </div>
            <Input
              label="المدينة"
              required
              error={errors.city?.message}
              {...register("city")}
            />
            <Input
              label="المحافظة"
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
            <Input
              label="الدولة"
              required
              error={errors.country?.message}
              {...register("country")}
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-10 sm:mt-16 pt-8 border-t-2 border-foreground/10 flex flex-col gap-6">
        <label className="flex items-start sm:items-center gap-4 group cursor-pointer select-none">
          <div className="relative flex items-center justify-center mt-0.5 sm:mt-0">
            <input
              type="checkbox"
              className="peer appearance-none w-6 h-6 border-2 border-foreground/20 checked:bg-primary checked:border-primary transition-all cursor-pointer"
              {...register("isDefault")}
            />
            <ShieldCheck className="absolute w-4 h-4 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity leading-tight">
            تعيين كعنوان افتراضي للشحن
          </span>
        </label>

        <div className="flex flex-col-reverse sm:flex-row items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={closeNewAddressForm}
            className="w-full sm:w-auto h-12 sm:h-14 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity border-2 border-transparent hover:border-foreground/10"
          >
            إلغاء العملية
          </button>
          <button
            disabled={isPending}
            className="w-full sm:flex-1 h-14 bg-foreground text-background font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isPending ? (
              <span className="animate-pulse">جاري الحفظ...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                حفظ السجل
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    required?: boolean;
  }
>(({ label, error, required, className, ...props }, ref) => {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="flex items-center justify-between text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-60">
        <span>{label}</span>
        {required && (
          <span className="text-primary text-[8px] sm:text-[9px] italic">
            * مطلوب
          </span>
        )}
      </label>

      <div className="relative group">
        <input
          ref={ref}
          {...props}
          className={`
            w-full h-12 px-4 border-2 bg-background font-bold 
            text-base sm:text-sm transition-all focus:outline-none
            ${
              error
                ? "border-destructive focus:border-destructive shadow-[4px_4px_0px_0px_rgba(239,68,68,0.1)]"
                : "border-foreground/10 focus:border-foreground focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:focus:-translate-y-1"
            }
            ${className}
          `}
        />
      </div>

      {error && (
        <p className="text-[10px] font-bold text-destructive uppercase tracking-tighter mt-1 animate-in fade-in slide-in-from-right-2">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
