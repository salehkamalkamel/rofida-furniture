"use client";

import { useTransition } from "react";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import {
  FullCart,
  FullCartResult,
  removeFromCart,
  updateCartItemQuantity,
} from "@/actions/cart-actions";
import Link from "next/link";
import { CartSummary } from "@/lib/pricing";

interface CartPageContentProps {
  cartData: FullCart;
  summary: CartSummary;
}

export default function CartPageContent({
  cartData,
  summary,
}: CartPageContentProps) {
  const [isPendingQuantity, startTransitionQuantity] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();

  const handleDelete = (itemId: number) => {
    startTransitionDelete(async () => {
      const res = await removeFromCart(itemId);
      if (!res.success) toast.error("فشل حذف المنتج");
    });
  };

  const handleUpdateQuantity = (itemId: number, newQty: number) => {
    if (newQty < 1) return; // Prevent zero or negative via buttons
    startTransitionQuantity(async () => {
      const res = await updateCartItemQuantity({ itemId, quantity: newQty });
      if (!res.success) toast.error("فشل تحديث الكمية");
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-foreground/10">
      {/* --- Items List (8 Columns) --- */}
      <div className="lg:col-span-8 border-l border-foreground/10">
        <div className="p-6 border-b border-foreground/10 bg-muted/20">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-1">
            Manifest
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            سلة التسوق
          </h1>
        </div>

        <div className="divide-y divide-foreground/10">
          {cartData.items.map((item) => {
            // Ensure unit price is a clean integer for display
            const unitPrice = Math.round(
              Number(item.priceAtAdd) + Number(item.customizationPrice),
            );
            const itemSubtotal = unitPrice * item.quantity;

            return (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row gap-6 p-6 bg-background hover:bg-muted/5 transition-colors"
              >
                {/* Product Image */}
                <div className="relative w-full sm:w-32 aspect-square bg-muted border border-foreground/5 overflow-hidden">
                  <Image
                    src={item.product.images?.[0] || "/placeholder.png"}
                    alt={item.product.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-lg leading-none uppercase tracking-tight mb-2">
                        {item.product.name}
                      </h3>
                      <div className="flex gap-4 items-center">
                        {item.selectedColor && (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-foreground/10 px-2 py-0.5">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.isCustomized && (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 px-2 py-0.5">
                            Custom Build
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      disabled={isPendingQuantity || isPendingDelete}
                      onClick={() => handleDelete(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2 border border-transparent hover:border-destructive/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.isCustomized && item.customizationText && (
                    <div className="mt-4 p-3 bg-muted/30 border-r-2 border-foreground text-[11px] font-medium leading-relaxed italic opacity-70">
                      "{item.customizationText}"
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-foreground">
                      <button
                        disabled={
                          isPendingQuantity ||
                          isPendingDelete ||
                          item.quantity <= 1
                        }
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-10 h-10 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors disabled:opacity-30"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-12 text-center font-mono font-bold border-x border-foreground/10">
                        {item.quantity}
                      </span>
                      <button
                        disabled={isPendingQuantity || isPendingDelete}
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-10 h-10 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors disabled:opacity-30"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-left">
                      <p className="text-[10px] font-bold opacity-40 uppercase mb-1">
                        Subtotal
                      </p>
                      <p className="font-mono text-lg font-black tracking-tighter text-foreground">
                        {itemSubtotal.toLocaleString("ar-EG")}{" "}
                        <span className="text-xs">EGP</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Sidebar Summary (4 Columns) --- */}
      <div className="lg:col-span-4 bg-muted/10 relative">
        <div className="p-8 sticky top-24">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-primary">
            Summary / ملخص
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-end border-b border-foreground/5 pb-2">
              <span className="text-[10px] font-black uppercase opacity-40">
                الإجمالي{" "}
              </span>
              <span className="font-mono font-bold">
                {summary.subtotal.toLocaleString("ar-EG")}{" "}
                <span className="text-[10px]">EGP</span>
              </span>
            </div>

            <div className="flex justify-between items-end border-b border-foreground/5 pb-2">
              <span className="text-[10px] font-black uppercase opacity-40">
                مصاريف الشحن{" "}
              </span>
              <span
                className={`font-mono font-bold ${
                  summary.deliveryFee === 0 ? "text-primary" : ""
                }`}
              >
                {summary.deliveryFee === 0
                  ? "FREE"
                  : `${summary.deliveryFee.toLocaleString("ar-EG")} EGP`}
              </span>
            </div>
          </div>

          {/* Dynamic Free Delivery Progress */}
          {summary.deliveryFee > 0 && (
            <div className="p-4 bg-primary text-white mb-8">
              <p className="text-[10px] font-black uppercase tracking-widest leading-loose text-center">
                أضف منتجات بقيمة{" "}
                {summary.amountToFreeDelivery.toLocaleString("ar-EG")} EGP
                للحصول على توصيل مجاني!
              </p>
            </div>
          )}

          <div className="mb-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xl font-black uppercase tracking-tighter">
                Total
              </span>
              <div className="text-left">
                <span className="text-3xl font-black tracking-tighter leading-none block">
                  {summary.finalTotal.toLocaleString("ar-EG")}
                </span>
                <span className="text-[10px] font-bold opacity-40 uppercase">
                  EGP (Incl. Tax)
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/checkout"
            className={cartData.items.length === 0 ? "pointer-events-none" : ""}
          >
            <button
              disabled={
                isPendingQuantity ||
                isPendingDelete ||
                cartData.items.length === 0
              }
              className="group relative w-full h-20 bg-foreground text-background overflow-hidden transition-all hover:bg-primary disabled:opacity-50"
            >
              <div className="relative z-10 flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.2em]">
                {isPendingQuantity ? "Processing..." : "اتمام الطلب"}
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-black opacity-5 pointer-events-none select-none">
                PROCEED
              </div>
            </button>
          </Link>

          {/* Trust Area */}
          <div className="mt-12 space-y-4 border-t border-foreground/10 pt-8">
            <div className="flex items-center gap-4 text-muted-foreground group">
              <ShieldCheck className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">
                دفع أمن عند استلام الطلب.{" "}
              </span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground group">
              <RotateCcw className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">
                ضمان 14 يوم علي عيوب التصنيع.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
