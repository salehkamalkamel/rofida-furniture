"use client";

import { PackageOpen, RotateCcw, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function NoProductsMatch() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const clearFilters = () => {
    startTransition(() => {
      replace(pathname, { scroll: false });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center border-2 border-dashed border-border mt-8">
      {/* Sharp, Branded Icon Container */}
      <div className="w-24 h-24 bg-secondary flex items-center justify-center mb-8 relative">
        <PackageOpen
          className="w-12 h-12 text-secondary-foreground"
          strokeWidth={1.5}
        />
        {/* Decorative corner accent */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary" />
      </div>

      <h2 className="text-3xl font-black text-foreground mb-3 tracking-tighter uppercase">
        لم نجد ما تبحث عنه
      </h2>

      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed font-medium">
        للاسف، لا توجد منتجات تطابق اختياراتك حالياً. جرب استخدام كلمات بحث
        مختلفة أو تصفح جميع الفئات.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        {/* Main Action: Reset */}
        <button
          disabled={isPending}
          onClick={clearFilters}
          className="h-14 px-10 bg-primary text-white font-black uppercase tracking-tighter flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {isPending ? (
            <RotateCcw className="w-5 h-5 animate-spin" />
          ) : (
            <RotateCcw className="w-5 h-5" />
          )}
          <span>إعادة تعيين الفلاتر</span>
        </button>

        {/* Secondary Action: Go back/Browse */}
        <button
          onClick={() => replace("/products")}
          className="h-14 px-10 border-2 border-foreground text-foreground font-black uppercase tracking-tighter flex items-center justify-center gap-2 hover:bg-foreground hover:text-background transition-all"
        >
          <span>تصفح الكل</span>
          <ArrowRight className="w-5 h-5 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}
