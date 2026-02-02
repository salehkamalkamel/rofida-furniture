import { Skeleton } from "@/components/ui/skeleton";
import { Check, Package, MapPin, CreditCard } from "lucide-react";

export default function OrderSuccessLoadingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* Top Header Label Skeleton */}
      <div className="border-b border-foreground/10 py-4 bg-muted/5">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-20">
            Transaction Manifest
          </span>
          <Skeleton className="h-3 w-48 bg-foreground/5" />
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Confirmation Message Skeleton */}
          <div className="lg:col-span-7 space-y-10">
            <div className="relative inline-block">
              <div className="relative w-32 h-32 border-4 border-foreground/10 flex items-center justify-center bg-background z-10">
                <Check className="w-16 h-16 text-foreground/10 stroke-3" />
              </div>
              <div className="absolute top-3 left-3 w-32 h-32 border-4 border-foreground/5 z-0" />
            </div>

            <div className="space-y-6">
              <Skeleton className="h-16 w-3/4 bg-foreground/10" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-foreground/5" />
                <Skeleton className="h-4 w-5/6 bg-foreground/5" />
                <Skeleton className="h-4 w-1/2 bg-foreground/5" />
              </div>
            </div>

            {/* Actions Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <Skeleton className="h-16 bg-foreground/5" />
              <Skeleton className="h-16 bg-foreground/5 border-2 border-foreground/5" />
            </div>
          </div>

          {/* Right Column: Receipt Manifest Skeleton */}
          <div className="lg:col-span-5 border-2 border-foreground/10 bg-muted/5 relative overflow-hidden">
            <div className="p-8 space-y-8">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20 mb-6 flex items-center gap-2">
                  <Package className="w-3 h-3" /> المنتجات المطلوبة
                </h2>

                {/* Item Rows */}
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="w-20 h-20 bg-foreground/5 shrink-0" />
                      <div className="flex flex-col justify-center flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4 bg-foreground/10" />
                        <Skeleton className="h-3 w-1/2 bg-foreground/5" />
                        <Skeleton className="h-3 w-1/4 bg-foreground/5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-foreground/10 border-b border-dashed border-foreground/10" />

              {/* Address & Payment Info Skeleton */}
              <div className="grid grid-cols-1 gap-8">
                <section className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> وجهة الشحن
                  </h3>
                  <Skeleton className="h-3 w-1/2 bg-foreground/5" />
                  <Skeleton className="h-3 w-2/3 bg-foreground/5" />
                </section>

                <section className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20 flex items-center gap-2">
                    <CreditCard className="w-3 h-3" /> حالة الدفع
                  </h3>
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-20 bg-foreground/5" />
                    <Skeleton className="h-3 w-24 bg-foreground/10" />
                  </div>
                </section>
              </div>

              {/* Totals Section Skeleton */}
              <div className="pt-6 border-t-2 border-foreground/10 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16 bg-foreground/5" />
                  <Skeleton className="h-3 w-20 bg-foreground/5" />
                </div>
                <div className="flex justify-between items-end pt-2">
                  <Skeleton className="h-4 w-24 bg-foreground/5" />
                  <Skeleton className="h-10 w-32 bg-foreground/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
