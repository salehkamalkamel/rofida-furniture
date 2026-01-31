import { Skeleton } from "@/components/ui/skeleton";
import { ShieldCheck, ShoppingBag, MapPin, CreditCard } from "lucide-react";

export default function CheckoutLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* 1. Workflow Progress Header Skeleton */}
      <div className="border-b border-foreground/10 bg-muted/5 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {[
              { icon: <ShoppingBag />, label: "السلة" },
              { icon: <MapPin />, label: "العنوان" },
              { icon: <CreditCard />, label: "الدفع" },
              { icon: <ShieldCheck />, label: "تأكيد الطلب" },
            ].map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 opacity-20"
              >
                <div className="p-2">{step.icon}</div>
                <span className="text-[10px] font-black uppercase">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 2. Main Content Area Skeleton */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border-2 border-foreground p-1 md:p-2 bg-foreground/5">
              <div className="bg-background border border-foreground/10 p-6 md:p-10 space-y-8">
                {/* Section Header */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-foreground/10" />
                  <Skeleton className="h-8 w-64 bg-foreground/20" />
                </div>

                {/* Content Rows */}
                <div className="space-y-4 pt-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-center border-b border-foreground/5 pb-4"
                    >
                      <Skeleton className="w-16 h-16 bg-muted shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/2 bg-foreground/10" />
                        <Skeleton className="h-3 w-1/4 bg-foreground/5" />
                      </div>
                      <Skeleton className="h-4 w-16 bg-foreground/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nav Buttons Skeleton */}
            <div className="flex justify-between pt-4">
              <Skeleton className="h-12 w-32 bg-foreground/5" />
              <Skeleton className="h-12 w-48 bg-foreground/20" />
            </div>
          </div>

          {/* 3. Pricing Sidebar Skeleton */}
          <aside className="lg:col-span-4 sticky top-28">
            <div className="border-t-4 border-primary/20 pt-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20">
                  Order Manifest
                </span>
                <div className="h-px flex-1 bg-foreground/5" />
              </div>

              {/* Pricing Rows */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20 bg-foreground/5" />
                  <Skeleton className="h-3 w-16 bg-foreground/10" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20 bg-foreground/5" />
                  <Skeleton className="h-3 w-16 bg-foreground/10" />
                </div>
                <div className="flex justify-between border-t border-foreground/10 pt-4 mt-4">
                  <Skeleton className="h-6 w-16 bg-foreground/10" />
                  <Skeleton className="h-6 w-24 bg-foreground/20" />
                </div>
              </div>

              {/* Security Badge Skeleton */}
              <div className="mt-6 p-4 border border-foreground/10 bg-muted/5 flex items-center gap-3 opacity-30">
                <ShieldCheck className="w-5 h-5" />
                <div className="space-y-1">
                  <Skeleton className="h-2 w-24 bg-foreground/10" />
                  <Skeleton className="h-2 w-20 bg-foreground/10" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
