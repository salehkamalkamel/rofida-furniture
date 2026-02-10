// components/checkout/checkout-summary.tsx
import { CheckoutPricing } from "@/types/checkout";
import Link from "next/link";

export default function CheckoutSummary({
  pricing,
}: {
  pricing: CheckoutPricing;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm pb-4 border-b border-foreground/10">
        <span className="font-bold opacity-60">
          المنتجات ({pricing.itemsCount})
        </span>
        <Link
          href="/cart"
          className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline"
        >
          تعديل
        </Link>
      </div>

      <div className="space-y-3">
        <PriceRow label="المجموع الفرعي" value={pricing.subtotal} />
        <PriceRow
          label="التوصيل"
          value={pricing.deliveryFee}
          isFree={pricing.deliveryFee === 0}
        />
        {pricing.discount > 0 && (
          <PriceRow label="الخصم" value={-pricing.discount} highlight />
        )}
      </div>

      {(pricing.amountToFreeShipping ?? 0) > 0 && (
        <div className="p-3 bg-primary text-white text-[10px] font-black uppercase tracking-tighter text-center">
          أضف {pricing.amountToFreeShipping} ج.م للشحن المجاني
        </div>
      )}

      <div className="pt-4 border-t-2 border-foreground">
        <div className="flex justify-between items-start">
          <span className="text-lg font-black uppercase">الاجمالي</span>
          <div className="text-left">
            <span className="text-2xl font-black block leading-none">
              {pricing.total}
            </span>
            <span className="text-[10px] font-bold opacity-40">
              EGP INCL. TAX
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceRow({ label, value, highlight, isFree }: any) {
  return (
    <div className="flex justify-between text-xs font-bold">
      <span className="opacity-60">{label}</span>
      <span className={highlight || isFree ? "text-primary" : ""}>
        {isFree ? "FREE" : `${Math.abs(value)} ج.م`}
      </span>
    </div>
  );
}
