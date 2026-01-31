import ProductCardSkeleton from "./product-card-skeleton";

export default function ProductsSectionSkeleton({
  limit = 4,
}: {
  limit?: number;
}) {
  return (
    <section className="py-20 bg-background border-t border-foreground/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="h-3 bg-primary/20 w-24 rounded-none" />
            <div className="h-12 bg-muted w-64 md:w-80 rounded-none" />
          </div>
          {/* View All Button Skeleton */}
          <div className="h-14 bg-muted w-40 rounded-none" />
        </div>

        {/* The Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-px md:bg-foreground/10 border-y md:border-x border-foreground/10">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="bg-background md:p-4">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
