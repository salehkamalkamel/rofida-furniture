"use client";

import { Address } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { PackageCheck, Truck, Banknote, ShieldAlert, Zap } from "lucide-react";
import { createOrder } from "@/actions/create-order-action";

type Props = {
  address: Address;
  currentShippingRule: number;
};

export default function CheckoutConfirmationTab({
  address,
  currentShippingRule,
}: Props) {
  const [isPendingPlaceOrder, startTransitionPLaceOrder] = useTransition();
  const router = useRouter();

  function handlePlaceOrder() {
    startTransitionPLaceOrder(async () => {
      const res = await createOrder(address.id, currentShippingRule);
      if (res.success) {
        toast.success("تم تأكيد العملية - جاري تحويلك");
        router.push(`/checkout/success?orderId=${res.orderId}`);
      } else {
        toast.error("فشل في معالجة الطلب");
      }
    });
  }

  return (
    <div
      className="bg-background border-2 border-foreground p-6 sm:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-500"
      dir="rtl"
    >
      {/* FINAL MANIFEST HEADER */}
      <div className="flex items-center justify-between border-b-2 border-foreground pb-6">
        <div className="flex items-center gap-3">
          <PackageCheck className="w-6 h-6 text-primary" />
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em]">
              تأكيد البيانات النهائية
            </h3>
            <p className="text-[10px] font-bold opacity-40 uppercase mt-1">
              Order_Final_Verification
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-[10px] font-mono bg-muted px-2 py-1 border border-foreground/10">
          STATUS: READY_FOR_DISPATCH
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SHIPPING DESTINATION */}
        <div className="border-2 border-foreground/10 p-5 bg-muted/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 bg-foreground/10 px-2 py-1 text-[8px] font-black uppercase tracking-tighter">
            Manifest_Address
          </div>
          <div className="flex items-center gap-3 mb-4 mt-2">
            <Truck className="w-4 h-4 text-primary" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
              وجهة الشحن
            </p>
          </div>

          {address ? (
            <div className="space-y-1">
              <p className="text-base font-black uppercase tracking-tight">
                {address.fullName}
              </p>
              <div className="text-xs font-bold text-muted-foreground leading-relaxed">
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state}
                </p>
                <p className="mt-3 inline-flex items-center gap-2 bg-foreground text-background px-2 py-0.5 font-mono">
                  TEL: {address.phone}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs font-bold text-destructive">
              خطأ: لم يتم تحديد عنوان
            </p>
          )}
        </div>

        {/* SETTLEMENT METHOD */}
        <div className="border-2 border-foreground/10 p-5 bg-muted/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-foreground/10 px-2 py-1 text-[8px] font-black uppercase tracking-tighter">
            Settlement_Terms
          </div>
          <div className="flex items-center gap-3 mb-4 mt-2">
            <Banknote className="w-4 h-4 text-primary" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
              طريقة السداد
            </p>
          </div>
          <p className="text-sm font-black uppercase italic">
            الدفع عند الاستلام
          </p>
          <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">
            COD - Physical Currency Required
          </p>
        </div>
      </div>

      {/* COMPLIANCE NOTICE */}
      <div className="bg-primary/5 border-r-4 border-primary p-5 flex gap-4 items-start">
        <ShieldAlert className="w-5 h-5 text-primary shrink-0" />
        <p className="text-xs font-bold text-foreground/80 leading-relaxed italic">
          بالنقر على "تنفيذ الطلب"، فإنك تقر بصحة البيانات أعلاه. سيقوم فريق
          العمليات لدينا بالتواصل معك هاتفيًا لتأكيد الموعد النهائي للشحن خلال
          24 ساعة.
        </p>
      </div>

      {/* FINAL ACTION BUTTON */}
      <div className="pt-4">
        <button
          disabled={isPendingPlaceOrder || !address}
          onClick={handlePlaceOrder}
          type="button"
          className={`
            w-full py-5 text-sm font-black uppercase tracking-[0.3em] transition-all duration-300 flex items-center justify-center gap-3
            ${
              isPendingPlaceOrder
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-foreground text-background hover:bg-primary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5"
            }
          `}
        >
          {isPendingPlaceOrder ? (
            <span className="animate-pulse">جاري المعالجة...</span>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-current" />
              تنفيذ الطلب النهائي
            </>
          )}
        </button>
        <p className="text-center text-[9px] font-bold opacity-30 mt-4 uppercase tracking-[0.4em]">
          End of Process - No modifications after execution
        </p>
      </div>
    </div>
  );
}
