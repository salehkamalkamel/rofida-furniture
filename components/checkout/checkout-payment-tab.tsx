import { Banknote, Info, ShieldCheck, Check } from "lucide-react";

export default function CheckoutPaymentTab() {
  return (
    <div
      className="bg-background border-2 border-foreground/5 p-6 sm:p-10"
      dir="rtl"
    >
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center">
          <Banknote className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] leading-none">
            طريقة السداد
          </h3>
          <p className="text-[10px] font-bold opacity-40 mt-1 uppercase tracking-tighter">
            Settlement_Method_Selection
          </p>
        </div>
      </div>

      {/* PAYMENT OPTION: CASH ON DELIVERY */}
      <div className="relative">
        <label className="relative flex items-center gap-6 p-6 border-2 border-foreground bg-foreground/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default">
          {/* CUSTOM CHECK INDICATOR */}
          <div className="w-6 h-6 border-2 border-foreground bg-primary flex items-center justify-center">
            <Check className="w-4 h-4 text-white stroke-4" />
          </div>

          <div className="w-14 h-14 bg-background border border-foreground/10 flex items-center justify-center shrink-0">
            <Banknote className="w-7 h-7 text-primary" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-black text-base uppercase tracking-tight">
                الدفع عند الاستلام
              </p>
              <span className="text-[8px] font-black px-1.5 py-0.5 bg-primary text-white tracking-widest uppercase">
                Active
              </span>
            </div>
            <p className="text-xs font-bold text-muted-foreground leading-relaxed uppercase tracking-tighter">
              Settlement via physical currency upon cargo arrival.
            </p>
          </div>

          <input
            type="radio"
            name="payment"
            value="cod"
            checked={true}
            readOnly
            className="sr-only"
          />
        </label>
      </div>

      {/* SYSTEM ADVISORY: ONLINE PAYMENT STATUS */}
      <div className="mt-10 border-t-2 border-dashed border-foreground/10 pt-8">
        <div className="flex items-start gap-4 p-5 bg-muted/30 border border-foreground/5">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">
              System Advisory: Payment Pipelines
            </span>
            <p className="text-xs font-bold text-muted-foreground leading-relaxed">
              بروتوكولات الدفع الإلكتروني (Visa/Mastercard) قيد التطوير حاليًا.
              سيتم تفعيل بوابات الدفع الرقمية في التحديثات القادمة للنظام.
            </p>
          </div>
        </div>
      </div>

      {/* SECURITY FOOTER */}
      <div className="mt-6 flex items-center gap-2 px-2">
        <ShieldCheck className="w-3 h-3 opacity-30" />
        <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30">
          Secure Transaction Environment v2.0
        </span>
      </div>
    </div>
  );
}
