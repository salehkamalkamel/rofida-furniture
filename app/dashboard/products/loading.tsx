import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardProductsSkeleton() {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32 bg-foreground/10" />
          <Skeleton className="h-4 w-48 bg-muted" />
        </div>
        <Skeleton className="h-12 w-full sm:w-44 bg-foreground/10" />
      </div>

      {/* Filters Skeleton */}
      <div className="bg-background p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Skeleton className="h-12 w-full bg-muted" />
        </div>
        <Skeleton className="h-12 w-full sm:w-40 bg-muted" />
      </div>

      {/* Products Count Skeleton */}
      <Skeleton className="h-4 w-32 bg-muted" />

      {/* Products Table Skeleton */}
      <div className="bg-background overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                {["المنتج", "الفئة", "السعر", "المخزون", "الإجراءات"].map(
                  (header) => (
                    <th
                      key={header}
                      className="text-right px-6 py-4 text-sm font-medium text-foreground/50"
                    >
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {/* Product Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-16 h-16 bg-muted shrink-0" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32 bg-muted" />
                        <Skeleton className="h-3 w-20 bg-muted/60" />
                      </div>
                    </div>
                  </td>
                  {/* Category Column */}
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-20 bg-muted" />
                  </td>
                  {/* Price Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24 bg-muted" />
                      <Skeleton className="h-3 w-16 bg-muted/60" />
                    </div>
                  </td>
                  {/* Stock Column */}
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-16 bg-muted" />
                  </td>
                  {/* Actions Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-9 w-9 bg-muted" />
                      <Skeleton className="h-9 w-9 bg-muted" />
                      <Skeleton className="h-9 w-9 bg-muted" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
