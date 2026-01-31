import { Skeleton } from "@/components/ui/skeleton";
import { Activity, Hash, Calendar } from "lucide-react";

export default function AccountOrdersSkeleton() {
  return (
    <div className="space-y-10" dir="rtl">
      {/* PAGE HEADER SKELETON */}
      <div className="flex items-end justify-between border-b-2 border-foreground pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2 text-primary font-mono text-[10px] font-black tracking-widest uppercase opacity-50">
            <Activity className="w-3 h-3 animate-pulse" />
            ORD_MANIFEST_LOADING...
          </div>
          <Skeleton className="h-10 w-48 bg-foreground/10" />
          <Skeleton className="h-4 w-64 mt-4 bg-foreground/5" />
        </div>
      </div>

      {/* ORDERS LIST SKELETON */}
      <div className="space-y-12">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-2 border-foreground bg-background overflow-hidden"
          >
            {/* INVOICE-STYLE HEADER SKELETON */}
            <div className="p-5 sm:p-8 bg-muted/30 border-b-2 border-foreground flex flex-wrap items-center justify-between gap-8">
              <div className="flex flex-wrap gap-8 sm:gap-12">
                {/* Order ID */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-20">
                    <Hash className="w-3 h-3" /> رقم الطلب
                  </div>
                  <Skeleton className="h-4 w-20 bg-foreground/10" />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-20">
                    <Calendar className="w-3 h-3" /> التاريخ
                  </div>
                  <Skeleton className="h-4 w-24 bg-foreground/10" />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-20">
                    حالة الشحنة
                  </div>
                  <Skeleton className="h-6 w-16 bg-foreground/10" />
                </div>
              </div>

              <div className="sm:text-left space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-20">
                  إجمالي المستحق
                </div>
                <Skeleton className="h-7 w-28 bg-foreground/10" />
              </div>
            </div>

            {/* ITEM MANIFEST SKELETON */}
            <div className="p-5 sm:p-8 space-y-6">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="flex gap-6 items-center py-4 border-b border-foreground/5 last:border-0"
                >
                  <Skeleton className="w-20 h-20 shrink-0 border border-foreground/10 bg-foreground/5" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-4 w-1/2 bg-foreground/10" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16 bg-foreground/5" />
                      <Skeleton className="h-5 w-16 bg-foreground/5" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-20 bg-foreground/10" />
                </div>
              ))}
            </div>

            {/* BOTTOM COMMAND BAR SKELETON */}
            <div className="p-4 bg-foreground/5 border-t-2 border-foreground flex justify-end">
              <Skeleton className="h-10 w-32 bg-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
