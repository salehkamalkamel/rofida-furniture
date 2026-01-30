"use client";
import { categories } from "@/lib/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function DashboardProductsFilters() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const [query, setQuery] = useState(
    searchParams.get("search")?.toString() || "",
  );
  const [category, setCategory] = useState(
    searchParams.get("category")?.toString() || "",
  );
  const { replace } = useRouter();

  const handleQueryChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value.trim()) params.set("search", value.trim());
    else params.delete("search");
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, 300);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") params.set("category", value);
    else params.delete("category");
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleInputChange = (value: string) => {
    setQuery(value); // Always update local immediately
    handleQueryChange(value); // URL updates debounced
  };

  return (
    <div className="bg-background p-4 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          {isPending ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="animate-spin w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          ) : (
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
          <input
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            type="text"
            placeholder="البحث عن منتج..."
            className="w-full h-12 pr-10 pl-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <select
        className="h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="all">جميع الفئات</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
