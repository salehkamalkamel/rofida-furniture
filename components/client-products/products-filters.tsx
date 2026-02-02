"use client";

import { categories } from "@/lib/data";
import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useCallback, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function ClientProductsFilters({
  productsLength,
}: {
  productsLength: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(
    searchParams.get("search")?.toString() || "",
  );
  const currentCategory = searchParams.get("category")?.toString() || "all";

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      if (key !== "page") params.delete("page");

      startTransition(() => {
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, pathname, replace],
  );

  const handleSearch = useDebouncedCallback((val: string) => {
    updateParams("search", val);
  }, 400);

  const clearFilters = () => {
    setQuery("");
    startTransition(() => {
      replace(pathname, { scroll: false });
    });
  };

  const categoryOptions = useMemo(
    () =>
      categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      )),
    [],
  );

  return (
    <div className="sticky top-0 z-30 bg-background border-b-2 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="shrink-0">
            <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase leading-none">
              المتجر
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-secondary text-secondary-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                {productsLength} منتج
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-0 flex-1 max-w-3xl">
            <div className="relative flex-1 group">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground group-focus-within:text-primary transition-colors">
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                ) : (
                  <Search className="w-5 h-5" strokeWidth={2.5} />
                )}
              </div>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                placeholder="ابحث عن المنتج..."
                className="w-full h-14 pr-12 pl-4 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-none transition-all outline-none text-sm font-bold"
              />
            </div>

            <div className="relative w-full sm:w-56">
              <select
                value={currentCategory}
                onChange={(e) => updateParams("category", e.target.value)}
                className="w-full h-14 px-4 bg-background border border-border border-r-0 rounded-none outline-none text-sm font-bold appearance-none cursor-pointer focus:border-primary transition-all pr-10"
              >
                <option value="all">كل الفئات</option>
                {categoryOptions}
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2 border-r pr-2 border-border">
                <SlidersHorizontal
                  className="w-4 h-4 text-foreground"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            {(query || currentCategory !== "all") && (
              <button
                onClick={clearFilters}
                className="h-14 px-6 bg-destructive text-white flex items-center justify-center hover:opacity-90 transition-all font-bold uppercase text-xs"
              >
                <X className="w-5 h-5" strokeWidth={3} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
