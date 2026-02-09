import { cn } from "@/lib/utils";

type WishlistToggleSkeletonProps = {
  size?: "sm" | "md";
  variant?: "card" | "details";
};

export function WishlistToggleSkeleton({
  size = "md",
  variant = "details",
}: WishlistToggleSkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative grid place-items-center border-2 border-foreground/10",
        "bg-foreground/5 overflow-hidden",
        // size
        size === "sm" && "p-2",
        size === "md" && "p-3 md:p-4",
        // shape
        variant === "card" && "rounded-full",
        variant === "details" && "rounded-md",
      )}
    >
      {/* Heart placeholder */}
      <div
        className={cn(
          "rounded-sm bg-foreground/20",
          size === "sm" && "w-4 h-4",
          size === "md" && "w-6 h-6",
        )}
      />

      {/* Shimmer */}
      <span
        className="
          pointer-events-none
          absolute inset-0
          -translate-x-full
          bg-linear-to-r
          from-transparent
          via-white/20
          to-transparent
          animate-[shimmer_1.4s_infinite]
        "
      />
    </div>
  );
}
