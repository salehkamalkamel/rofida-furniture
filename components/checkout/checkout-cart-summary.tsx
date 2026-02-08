import { FullCart } from "@/actions/cart-actions";
import Image from "next/image";
import Link from "next/link";
import { Edit3, ArrowLeft, Package } from "lucide-react";

export default function CheckoutCartSummary({
  cartData,
}: {
  cartData: FullCart;
}) {
  const items = cartData.items;

  return (
    <div
      className="bg-background border-2 border-foreground p-0 overflow-hidden"
      dir="rtl"
    >
      {/* HEADER SECTION */}
      <div className="bg-foreground text-background p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5" />
          <h2 className="text-sm font-black uppercase tracking-[0.2em]">
            مراجعة محتويات الشحنة
          </h2>
        </div>
        <span className="font-mono text-xs bg-background text-foreground px-2 py-1">
          {items.length} UNITS
        </span>
      </div>

      {/* ITEMS LIST */}
      <div className="divide-y-2 divide-foreground/10">
        {items.map((item) => {
          const itemPrice = Number(item.priceAtAdd || 0) * item.quantity;

          return (
            <div
              key={item.id}
              className="flex gap-4 p-4 sm:p-6 hover:bg-muted/20 transition-colors group"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 border border-foreground/10 bg-white">
                <Image
                  src={item.product.images?.[0] || "/placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />

                {item.isCustomized && (
                  <div className="absolute top-0 right-0 bg-primary text-white p-1 shadow-lg">
                    <Edit3 className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* PRODUCT INFO */}
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h3 className="font-black text-base sm:text-lg uppercase tracking-tight truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                      REF: {item.product.id.toString().padStart(6, "0")}
                    </p>
                  </div>
                </div>

                {/* SPECIFICATIONS GRID */}
                <div className="mt-3 flex flex-wrap gap-4 text-xs font-bold">
                  {item.selectedColor && (
                    <div className="flex flex-col">
                      <span className="text-[9px] text-muted-foreground uppercase">
                        Color
                      </span>
                      <span className="text-foreground">
                        {item.selectedColor}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[9px] text-muted-foreground uppercase">
                      Qty
                    </span>
                    <span className="text-foreground font-mono">
                      x{item.quantity}
                    </span>
                  </div>
                </div>

                {/* CUSTOMIZATION LOG */}
                {item.isCustomized && (
                  <div className="mt-4 p-3 bg-muted/50 border-r-4 border-primary">
                    <span className="text-[9px] font-black uppercase tracking-tighter text-primary block mb-1">
                      Customization Notes:
                    </span>
                    <p className="text-xs text-foreground/80 leading-relaxed italic">
                      "{item.customizationText}"
                    </p>
                  </div>
                )}

                {/* PRICE CALCULATION */}
                <div className="mt-auto pt-4 flex items-end justify-between">
                  <div className="space-y-1">
                    {!!item.priceAtAdd && (
                      <p className="text-[10px] text-muted-foreground line-through font-mono">
                        {(
                          Number(item.priceAtAdd) * item.quantity
                        ).toLocaleString("ar-EG")}
                      </p>
                    )}
                    <p className="font-black text-lg tracking-tighter leading-none">
                      {itemPrice.toLocaleString("ar-EG")}
                      <span className="text-[10px] mr-1 font-bold opacity-40">
                        EGP
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER ACTION */}
      <div className="p-4 border-t-2 border-foreground bg-muted/5 flex justify-between items-center">
        <Link
          href="/cart"
          className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          تعديل المشتريات
        </Link>
        <div className="h-2 w-2 bg-foreground rotate-45" />
      </div>
    </div>
  );
}
