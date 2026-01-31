export default function ProductCardSkeleton() {
  return (
    <div className="group relative bg-background border border-border flex flex-col h-full animate-pulse">
      {/* Image Container - Square */}
      <div className="relative aspect-square bg-muted border-b border-border" />

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2 space-y-2">
          {/* Title */}
          <div className="h-5 bg-muted rounded-sm w-3/4" />
          {/* Description */}
          <div className="space-y-1">
            <div className="h-3 bg-muted rounded-sm w-full" />
            <div className="h-3 bg-muted rounded-sm w-5/6" />
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between">
          {/* Price */}
          <div className="h-7 bg-muted rounded-sm w-24" />
          {/* Color dots */}
          <div className="flex -space-x-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-none border-2 border-background bg-muted"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action Area Button */}
      <div className="border-t border-border">
        <div className="w-full py-7 bg-muted" />
      </div>
    </div>
  );
}
