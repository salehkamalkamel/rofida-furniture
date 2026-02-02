import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ProductsLoadingSkeleton() {
  return (
    <main className="flex-1 bg-background" dir="rtl">
      {/* --- Filter Bar Skeleton --- */}
      <div className="sticky top-0 z-30 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Header Skeleton */}
            <div className="shrink-0 space-y-2">
              <Skeleton className="h-8 w-40 bg-muted" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12 bg-muted/60" />
                <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                <Skeleton className="h-4 w-24 bg-muted/60" />
              </div>
            </div>

            {/* Search/Select Skeleton */}
            <div className="flex flex-col sm:flex-row items-stretch gap-0 flex-1 lg:max-w-2xl">
              <div className="relative hidden md:flex flex-1 h-12 border border-border bg-muted/10 rounded-t-md sm:rounded-t-none sm:rounded-r-md">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-10" />
              </div>
              <div className="relative w-full sm:w-48 h-12 border border-t-0 sm:border-t sm:border-r-0 border-border bg-muted/10 flex items-center px-4 justify-between rounded-b-md sm:rounded-b-none sm:rounded-l-md">
                <Skeleton className="h-4 w-16 bg-muted-foreground/20" />
                <SlidersHorizontal className="w-4 h-4 opacity-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Grid Skeleton --- */}
      <div className="max-w-7xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="group relative flex flex-col h-full border border-border rounded-lg overflow-hidden bg-card"
            >
              {/* Image Area - Neutral Gray */}
              <Skeleton className="aspect-4/5 w-full rounded-none bg-muted/40" />

              {/* Info Area - No Blue Tones */}
              <div className="p-5 space-y-4 flex-1">
                <Skeleton className="h-5 w-2/3 bg-muted" />

                <div className="space-y-2">
                  <Skeleton className="h-3 w-full bg-muted/60" />
                  <Skeleton className="h-3 w-4/5 bg-muted/60" />
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Skeleton className="h-7 w-20 bg-muted" />
                  <Skeleton className="h-4 w-10 bg-muted/50" />
                </div>
              </div>

              {/* Action Area */}
              <div className="p-4 border-t border-border bg-muted/5">
                <Skeleton className="h-10 w-full rounded-md bg-muted/50" />
              </div>
            </div>
          ))}
        </div>

        {/* --- Footer Metadata Skeleton --- */}
        <div className="mt-12 mb-8 p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-border/50">
          <Skeleton className="h-4 w-40 bg-muted/40" />
          <div className="hidden md:block h-px flex-1 mx-8 bg-border/40" />
          <Skeleton className="h-4 w-32 bg-muted/40" />
        </div>
      </div>
    </main>
  );
}
