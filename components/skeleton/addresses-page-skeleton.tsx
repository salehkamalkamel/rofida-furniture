import AddressCardSkeleton from "./address-card-skeleton";

export default function AddressesPageSkeleton() {
  return (
    <div className="space-y-10" dir="rtl">
      {/* HEADER SECTION SKELETON */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b-2 border-foreground pb-8 animate-pulse">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary/20" />
            <div className="h-3 bg-muted w-32" />
          </div>
          <div className="h-10 bg-muted w-56" /> {/* Title */}
          <div className="h-4 bg-muted w-72" /> {/* Subtitle */}
        </div>

        {/* Add Button Skeleton */}
        <div className="w-full sm:w-48 h-14 bg-foreground/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]" />
      </div>

      {/* GRID SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddressCardSkeleton />
        <AddressCardSkeleton />
        <AddressCardSkeleton />
        <AddressCardSkeleton />
      </div>
    </div>
  );
}
