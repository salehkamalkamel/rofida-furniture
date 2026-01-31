import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ProductsLoadingSkeleton() {
  return (
    <main className="flex-1 bg-background" dir="rtl">
      {/* --- Filter Bar Skeleton --- */}
      <div className="sticky top-0 z-30 bg-background border-b-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Header Skeleton */}
            <div className="shrink-0 space-y-2">
              <div className="h-8 w-32 bg-foreground/10 animate-pulse" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16 bg-secondary" />
                <Skeleton className="h-2 w-20 bg-muted-foreground/20" />
              </div>
            </div>

            {/* Search/Select Skeleton */}
            <div className="flex flex-col sm:flex-row items-stretch gap-0 flex-1 max-w-3xl">
              <div className="relative flex-1 h-14 border border-border bg-muted/5">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-20" />
              </div>
              <div className="relative w-full sm:w-56 h-14 border border-border border-r-0 bg-muted/5 flex items-center px-4 justify-between">
                <Skeleton className="h-4 w-20" />
                <SlidersHorizontal className="w-4 h-4 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Grid Skeleton --- */}
      <div className="max-w-360 mx-auto border-x border-foreground/10 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-foreground/10 border-b border-foreground/10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-background p-4 md:p-6 space-y-4">
              {/* Product Card Skeleton */}
              <div className="group relative flex flex-col h-full border border-border">
                {/* Image Area */}
                <Skeleton className="aspect-square w-full rounded-none bg-muted/50" />

                {/* Info Area */}
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>

                {/* Button Area */}
                <div className="h-14 bg-muted/20 border-t border-border" />
              </div>
            </div>
          ))}
        </div>

        {/* --- Footer Metadata Skeleton --- */}
        <div className="p-8 flex justify-between items-center bg-muted/10 opacity-30">
          <div className="h-3 w-40 bg-foreground/20" />
          <div className="h-px flex-1 mx-8 bg-foreground/5 hidden md:block" />
          <div className="h-3 w-32 bg-foreground/20" />
        </div>
      </div>
    </main>
  );
}
