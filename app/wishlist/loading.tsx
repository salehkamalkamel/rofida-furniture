import { Skeleton } from "@/components/ui/skeleton";
import { Activity } from "lucide-react";

export default function WishlistLoadingSkeleton() {
  return (
    <div
      className="min-h-screen flex flex-col bg-background relative overflow-hidden"
      dir="rtl"
    >
      {/* GLOBAL GRID OVERLAY - Keep this for visual consistency during load */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[32px_32px]" />

      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* HEADER MANIFEST SKELETON */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b-2 border-foreground pb-8 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary/30 font-mono text-[10px] font-black tracking-[0.3em] uppercase">
                <Activity className="w-3 h-3 animate-pulse" />
                INITIALIZING_WISHLIST_BUFFER...
              </div>
              <Skeleton className="h-10 w-64 bg-foreground/10 rounded-none" />
            </div>
            <Skeleton className="h-6 w-32 bg-foreground/10 rounded-none" />
          </div>

          {/* PRODUCT REGISTER GRID SKELETON */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-t border-r border-foreground/10">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-background border-l border-b border-foreground/10 flex flex-col h-full relative"
              >
                {/* IMAGE MODULE SKELETON */}
                <div className="relative aspect-square overflow-hidden bg-muted/20">
                  <div className="absolute inset-0 z-10 opacity-10 border-[0.5px] border-foreground/20" />
                  <Skeleton className="w-full h-full rounded-none" />
                </div>

                {/* SPECIFICATIONS SKELETON */}
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-12 bg-primary/10 rounded-none" />
                    <Skeleton className="h-4 w-16 bg-foreground/10 rounded-none" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-foreground/10 rounded-none" />
                    <Skeleton className="h-4 w-2/3 bg-foreground/10 rounded-none" />
                  </div>

                  <div className="space-y-1">
                    <Skeleton className="h-3 w-full opacity-40 rounded-none" />
                    <Skeleton className="h-3 w-4/5 opacity-40 rounded-none" />
                  </div>

                  {/* VALUATION BLOCK SKELETON */}
                  <div className="mb-6 pt-4 border-t border-foreground/5 space-y-2">
                    <div className="h-2 w-16 bg-foreground/5 rounded-none" />
                    <div className="flex items-baseline gap-2">
                      <Skeleton className="h-7 w-24 bg-foreground/10 rounded-none" />
                      <Skeleton className="h-3 w-8 bg-foreground/5 rounded-none" />
                    </div>
                  </div>

                  {/* ACTION MODULE SKELETON */}
                  <div className="mt-auto pt-4 border-t border-foreground/10">
                    <Skeleton className="h-10 w-full bg-foreground/5 rounded-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
