import { Banknote, Info, ShieldCheck, Check } from "lucide-react";

export default function CheckoutPaymentTab() {
  return (
    <div
      className="bg-background border-2 border-foreground/5 p-5 sm:p-10"
      dir="rtl"
    >
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center shrink-0">
          <Banknote className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest sm:tracking-[0.2em] leading-none">
            طريقة السداد
          </h3>
          <p className="text-[9px] sm:text-[10px] font-bold opacity-40 mt-1 uppercase tracking-tighter">
            Settlement_Method_Selection
          </p>
        </div>
      </div>

      {/* PAYMENT OPTION: CASH ON DELIVERY */}
      <div className="relative">
        <label className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 border-2 border-foreground bg-foreground/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default">
          {/* HEADER ROW FOR MOBILE (Indicator + Icon) */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-background border border-foreground/10 flex items-center justify-center shrink-0">
              <Banknote className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>

            {/* CUSTOM CHECK INDICATOR - Positioned right on desktop, top-left on mobile */}
            <div className="w-6 h-6 border-2 border-foreground bg-primary flex items-center justify-center sm:order-first">
              <Check className="w-4 h-4 text-white stroke-[4px]" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-black text-sm sm:text-base uppercase tracking-tight">
                الدفع عند الاستلام
              </p>
              <span className="text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 bg-primary text-white tracking-widest uppercase">
                Active
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-muted-foreground leading-relaxed uppercase tracking-tighter max-w-70 sm:max-w-none">
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
      <div className="mt-8 sm:mt-10 border-t-2 border-dashed border-foreground/10 pt-6 sm:pt-8">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-muted/30 border border-foreground/5">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-foreground/60">
              System Advisory: Payment Pipelines
            </span>
            <p className="text-[11px] sm:text-xs font-bold text-muted-foreground leading-relaxed">
              بروتوكولات الدفع الإلكتروني (Visa/Mastercard) قيد التطوير حاليًا.
              سيتم تفعيل بوابات الدفع الرقمية في التحديثات القادمة للنظام.
            </p>
          </div>
        </div>
      </div>

      {/* SECURITY FOOTER */}
      <div className="mt-6 flex flex-wrap items-center gap-2 px-1">
        <ShieldCheck className="w-3 h-3 opacity-30" />
        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest sm:tracking-[0.2em] opacity-30">
          Secure Transaction Environment v2.0
        </span>
      </div>
    </div>
  );
}
