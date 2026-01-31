import { Skeleton } from "@/components/ui/skeleton";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export default function CartLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <h1 className="text-2xl font-bold text-foreground mb-8">عربة التسوق</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-foreground/10">
        {/* --- Items List Skeleton (8 Columns) --- */}
        <div className="lg:col-span-8 border-l border-foreground/10">
          <div className="p-6 border-b border-foreground/10 bg-muted/20">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30 block mb-1">
              Manifest_Loading
            </span>
            <div className="h-9 w-48 bg-foreground/10 animate-pulse" />
          </div>

          <div className="divide-y divide-foreground/10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-background"
              >
                {/* Image Placeholder */}
                <Skeleton className="relative w-full sm:w-32 aspect-square bg-muted border border-foreground/5" />

                {/* Details Placeholder */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-40 bg-foreground/10" />
                      <div className="flex gap-2">
                        <Skeleton className="h-4 w-16 bg-foreground/5" />
                        <Skeleton className="h-4 w-20 bg-foreground/5" />
                      </div>
                    </div>
                    <div className="p-2 opacity-10">
                      <Trash2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    {/* Quantity Selector Skeleton */}
                    <div className="flex items-center border border-foreground/10 opacity-50">
                      <div className="w-10 h-10 flex items-center justify-center border-l border-foreground/10">
                        <Minus className="w-3 h-3" />
                      </div>
                      <div className="w-12 h-10 flex items-center justify-center">
                        <Skeleton className="h-3 w-4" />
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center border-r border-foreground/10">
                        <Plus className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="text-left space-y-1">
                      <Skeleton className="h-2 w-12 bg-foreground/5 mr-auto" />
                      <Skeleton className="h-6 w-24 bg-foreground/10" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Sidebar Summary Skeleton (4 Columns) --- */}
        <div className="lg:col-span-4 bg-muted/5 relative">
          <div className="p-8 sticky top-24">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-primary/30">
              Summary_Processing
            </h2>

            <div className="space-y-6 mb-8">
              <div className="flex justify-between border-b border-foreground/5 pb-2">
                <Skeleton className="h-3 w-20 bg-foreground/5" />
                <Skeleton className="h-3 w-16 bg-foreground/10" />
              </div>
              <div className="flex justify-between border-b border-foreground/5 pb-2">
                <Skeleton className="h-3 w-20 bg-foreground/5" />
                <Skeleton className="h-3 w-16 bg-foreground/10" />
              </div>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-16 bg-foreground/10" />
                <div className="text-left space-y-2">
                  <Skeleton className="h-8 w-32 bg-foreground/20" />
                  <Skeleton className="h-2 w-20 bg-foreground/5 mr-auto" />
                </div>
              </div>
            </div>

            {/* Checkout Button Skeleton */}
            <div className="w-full h-20 bg-foreground/5 flex items-center justify-center gap-4">
              <Skeleton className="h-4 w-32 bg-foreground/10" />
              <ArrowLeft className="w-5 h-5 opacity-10" />
            </div>

            {/* Trust Area */}
            <div className="mt-12 space-y-4 border-t border-foreground/10 pt-8 opacity-20">
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-5 h-5" />
                <Skeleton className="h-2 w-32 bg-foreground/10" />
              </div>
              <div className="flex items-center gap-4">
                <RotateCcw className="w-5 h-5" />
                <Skeleton className="h-2 w-32 bg-foreground/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
