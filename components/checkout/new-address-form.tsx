"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressFieldsSchema,
  AddressFormValues,
} from "@/lib/validations/address";
import { saveAddress } from "@/actions/address-actions";
import { useTransition } from "react";
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
      className="bg-muted/10 border-2 border-foreground/10 p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
      dir="rtl"
    >
      <div className="flex items-center justify-between mb-8 border-b border-foreground/10 pb-4">
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em]">
            إنشاء سجل عنوان جديد
          </h3>
          <p className="text-[10px] font-bold opacity-40 uppercase mt-1">
            Address_Record_Initialization
          </p>
        </div>
        <button
          type="button"
          onClick={closeNewAddressForm}
          className="p-2 hover:bg-foreground hover:text-background transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {errors.root && (
        <div className="mb-8 p-4 bg-destructive/5 border-2 border-destructive flex gap-3 items-center">
          <Info className="w-5 h-5 text-destructive" />
          <p className="text-xs font-bold text-destructive">
            {errors.root.message}
          </p>
        </div>
      )}

      {/* FORM SECTIONS */}
      <div className="space-y-10">
        {/* Section 1: Identity */}
        <section>
          <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-4">
            01. بيانات المستلم
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
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
              placeholder="مثال: مكتب العمل، المنزل الرئيسي..."
              error={errors.label?.message}
              {...register("label")}
            />
          </div>
        </section>

        {/* Section 2: Geography */}
        <section>
          <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-4">
            02. التفاصيل الجغرافية
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
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

      {/* OPTIONS & SUBMIT */}
      <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <label className="flex items-center gap-3 group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              className="peer appearance-none w-5 h-5 border-2 border-foreground/20 checked:bg-primary checked:border-primary transition-all cursor-pointer"
              {...register("isDefault")}
            />
            <ShieldCheck className="absolute w-3 h-3 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
            تعيين كعنوان افتراضي للشحن
          </span>
        </label>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={closeNewAddressForm}
            className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity px-6"
          >
            إلغاء العملية
          </button>
          <button
            disabled={isPending}
            className="flex-1 sm:flex-none h-14 px-10 bg-foreground text-background font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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

function Input({
  label,
  error,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
        <span>{label}</span>
        {required && <span className="text-primary">* Required</span>}
      </label>

      <div className="relative group">
        <input
          {...props}
          className={`
            w-full h-12 px-4 border-2 bg-background font-bold text-sm transition-all focus:outline-none
            ${
              error
                ? "border-destructive focus:border-destructive shadow-[4px_4px_0px_0px_rgba(239,68,68,0.1)]"
                : "border-foreground/10 focus:border-foreground focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1"
            }
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
}
