export default function DashboardOrdersLoading() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="h-8 w-32 bg-muted/50 rounded-md animate-pulse" />
        <div className="h-4 w-48 bg-muted/50 rounded-md animate-pulse" />
      </div>

      {/* Filters Bar */}
      <div className="bg-background p-4 flex flex-col sm:flex-row gap-4 rounded-lg border border-border">
        {/* Search Input Skeleton */}
        <div className="flex-1">
          <div className="h-12 w-full bg-muted/50 rounded-md animate-pulse" />
        </div>
        {/* Status Dropdown Skeleton */}
        <div className="w-full sm:w-48">
          <div className="h-12 w-full bg-muted/50 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Count Text Skeleton */}
      <div className="h-4 w-32 bg-muted/50 rounded-md animate-pulse" />

      {/* Table Skeleton */}
      <div className="bg-background overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                {[...Array(6)].map((_, i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-4 w-16 bg-muted-foreground/20 rounded ml-auto animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* Generate 5 dummy rows */}
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  {/* Order ID & Item Count */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-5 w-20 bg-muted/50 rounded animate-pulse" />
                      <div className="h-3 w-12 bg-muted/50 rounded animate-pulse" />
                    </div>
                  </td>

                  {/* Customer Info */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-5 w-32 bg-muted/50 rounded animate-pulse" />
                      <div className="h-3 w-40 bg-muted/50 rounded animate-pulse" />
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="h-5 w-24 bg-muted/50 rounded animate-pulse ml-auto" />
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4">
                    <div className="h-5 w-20 bg-muted/50 rounded animate-pulse ml-auto" />
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-6 py-4">
                    <div className="h-7 w-24 bg-muted/50 rounded animate-pulse ml-auto" />
                  </td>

                  {/* Actions (Eye Icon) */}
                  <td className="px-6 py-4">
                    <div className="h-9 w-9 bg-muted/50 rounded animate-pulse ml-auto" />
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
