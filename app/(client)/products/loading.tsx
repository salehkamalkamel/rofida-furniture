export default function ProductsSkeletonPage() {
  return (
    <main className="flex-1 bg-background" dir="rtl">
      {/* Filters */}
      <div className="sticky top-0 z-30">
        <ProductsFiltersSkeleton />
      </div>

      {/* Grid */}
      <div className="max-w-450 mx-auto min-h-screen">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-px p-2 md:p-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 md:p-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-secondary/20 border-t-2 border-foreground/5">
          <div className="h-3 w-40 bg-muted animate-pulse" />
          <div className="h-px flex-1 mx-8 bg-foreground/10 hidden md:block" />
          <div className="h-3 w-32 bg-muted animate-pulse" />
        </div>
      </div>
    </main>
  );
}

// components/skeleton/products-filters-skeleton.tsx
function ProductsFiltersSkeleton() {
  return (
    <div className="bg-background border-b-2 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Title */}
          <div>
            <div className="h-8 w-32 bg-muted animate-pulse" />
            <div className="mt-2 h-4 w-20 bg-muted animate-pulse" />
          </div>

          {/* Inputs */}
          <div className="flex flex-col sm:flex-row gap-2 flex-1 max-w-3xl">
            <div className="h-14 flex-1 bg-muted animate-pulse" />
            <div className="h-14 w-full sm:w-56 bg-muted animate-pulse" />
            <div className="h-14 w-14 bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="bg-background border border-foreground/10 flex flex-col h-full animate-pulse">
      {/* Image */}
      <div className="aspect-square bg-muted border-b border-border" />

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-3">
        <div className="h-3 w-3/4 bg-muted" />
        <div className="h-5 w-1/2 bg-muted" />

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-16 bg-muted" />
            <div className="h-6 w-24 bg-muted" />
          </div>

          <div className="hidden sm:flex gap-1">
            <div className="w-3 h-3 bg-muted" />
            <div className="w-3 h-3 bg-muted" />
            <div className="w-3 h-3 bg-muted" />
          </div>
        </div>
      </div>

      {/* Floating action */}
      <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-12 sm:h-12 bg-muted" />

      {/* Accent */}
      <div className="h-1 bg-muted mt-auto" />
    </div>
  );
}
