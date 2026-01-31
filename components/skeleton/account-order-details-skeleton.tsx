import { Skeleton } from "@/components/ui/skeleton";
import { Download } from "lucide-react";

export default function OrderDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4" dir="rtl">
      {/* Header & Navigation Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-4 w-16" />
            <span className="opacity-20">/</span>
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-48 bg-foreground/10" />
          </div>
          <Skeleton className="h-4 w-40 mt-3 opacity-50" />
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Mock Buttons */}
          <div className="h-11 px-6 border border-border flex items-center gap-2 opacity-50">
            <Download className="w-4 h-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-11 w-36 bg-foreground/10" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Status Timeline Skeleton */}
          <div className="bg-muted/20 border border-border p-6">
            <Skeleton className="h-6 w-32 mb-8" />
            <div className="relative flex justify-between px-4">
              <div className="absolute top-4 left-0 w-full h-0.5 bg-border -z-10" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-border bg-background" />
                  <Skeleton className="h-3 w-14" />
                </div>
              ))}
            </div>
          </div>

          {/* Items List Skeleton */}
          <div className="border border-border">
            <div className="p-4 border-b border-border bg-muted/10">
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="divide-y divide-border">
              {[1, 2].map((item) => (
                <div key={item} className="p-6 flex gap-6">
                  {/* Product Image Box */}
                  <Skeleton className="w-24 h-32 bg-muted border border-border shrink-0" />

                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-1/2 bg-foreground/10" />
                      <Skeleton className="h-6 w-20 bg-foreground/10" />
                    </div>
                    <Skeleton className="h-4 w-32 opacity-50" />
                    <div className="pt-4 flex gap-4">
                      <Skeleton className="h-7 w-20 bg-muted border border-border" />
                      <Skeleton className="h-7 w-20 bg-muted border border-border" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Shipping Address Box */}
          <div className="border border-border p-6 space-y-4">
            <div className="border-b border-border pb-2">
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full opacity-70" />
              <Skeleton className="h-4 w-1/2 opacity-70" />
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
              <Skeleton className="h-3 w-full opacity-40" />
              <Skeleton className="h-3 w-full opacity-40" />
            </div>
          </div>

          {/* Account Summary Box */}
          <div className="border border-border p-6 space-y-6 bg-muted/10">
            <div className="border-b border-border pb-2">
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="pt-4 border-t border-border flex justify-between items-end">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-8 w-28 bg-foreground/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
