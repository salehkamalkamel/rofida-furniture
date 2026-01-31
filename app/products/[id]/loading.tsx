import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Info, Ruler } from "lucide-react";

export default function ProductDetailSkeleton() {
  return (
    <main className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* 1. Breadcrumb Nav Skeleton */}
      <div className="border-y border-foreground/10 bg-muted/5">
        <div className="max-w-7xl mx-auto px-4 min-h-12 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-12 bg-muted" />
            <span className="opacity-20">/</span>
            <Skeleton className="h-3 w-12 bg-muted" />
            <span className="opacity-20">/</span>
            <Skeleton className="h-3 w-24 bg-muted" />
          </div>
          <Skeleton className="h-3 w-20 bg-muted/30 hidden sm:block" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-x border-foreground/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-foreground/10">
          {/* 2. Media Section Skeleton */}
          <div className="p-4 md:p-10 space-y-4 md:space-y-6">
            <Skeleton className="aspect-square w-full border border-foreground/10 rounded-none bg-muted/20" />
            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-square border border-foreground/10 rounded-none bg-muted/20"
                />
              ))}
            </div>
          </div>

          {/* 3. Purchase & Specs Section Skeleton */}
          <div className="p-4 md:p-10 flex flex-col">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-3 flex-1">
                <Skeleton className="h-5 w-32 bg-primary/10" />
                <Skeleton className="h-12 w-3/4 bg-muted" />
                <Skeleton className="h-12 w-1/2 bg-muted" />
              </div>
              <div className="p-4 border-2 border-foreground/10">
                <Heart className="w-6 h-6 opacity-10" />
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <Skeleton className="h-4 w-full bg-muted/60" />
              <Skeleton className="h-4 w-5/6 bg-muted/60" />
              <Skeleton className="h-4 w-4/6 bg-muted/60" />
            </div>

            <div className="mt-8 flex items-baseline gap-4">
              <Skeleton className="h-12 w-32 bg-muted" />
              <Skeleton className="h-6 w-20 bg-muted/40" />
            </div>

            <div className="h-px w-full bg-foreground/10 my-10" />

            {/* Product Options Skeleton */}
            <div className="space-y-8 flex-1">
              <div className="space-y-4">
                <Skeleton className="h-3 w-20 bg-muted/40" />
                <div className="flex gap-3">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="w-12 h-12 border-2 border-foreground/10 rounded-none bg-muted/20"
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-16 border border-foreground/10 bg-muted/5 rounded-none" />
                <Skeleton className="h-16 border border-foreground/10 bg-muted/5 rounded-none" />
              </div>

              <Skeleton className="h-14 w-full border-2 border-foreground/10 bg-muted/5 rounded-none" />
            </div>

            {/* Action Buttons Skeleton */}
            <div className="mt-10 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-16 w-full sm:w-40 border-2 border-foreground rounded-none" />
                <Skeleton className="h-16 flex-1 bg-foreground/20 rounded-none" />
              </div>
              <Skeleton className="h-14 w-full border-2 border-dashed border-primary/30 rounded-none" />
            </div>
          </div>
        </div>

        {/* 4. Bottom Details Skeleton */}
        <div className="border-t border-foreground/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-foreground/10">
          <div className="p-6 md:p-10 md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <Info className="w-5 h-5 opacity-20" />
              <Skeleton className="h-3 w-32 bg-muted" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-muted/40" />
              <Skeleton className="h-4 w-full bg-muted/40" />
              <Skeleton className="h-4 w-3/4 bg-muted/40" />
            </div>
          </div>
          <div className="p-6 md:p-10 bg-muted/5 space-y-6">
            <div className="flex items-center gap-4">
              <Ruler className="w-5 h-5 opacity-20" />
              <Skeleton className="h-3 w-32 bg-muted" />
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-foreground/5 pb-2"
                >
                  <Skeleton className="h-3 w-12 bg-muted/30" />
                  <Skeleton className="h-3 w-16 bg-muted/60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Similar Products Section Skeleton */}
      <section className="py-20 bg-background border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4">
            <Skeleton className="h-4 w-24 bg-primary/20" />
            <Skeleton className="h-12 w-64 bg-muted" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border-x border-y border-foreground/10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-background p-4 space-y-4">
                <Skeleton className="aspect-[4/5] w-full bg-muted/40 rounded-none" />
                <Skeleton className="h-5 w-3/4 bg-muted" />
                <Skeleton className="h-4 w-1/2 bg-muted/60" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
