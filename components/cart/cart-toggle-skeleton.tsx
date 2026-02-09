import { cn } from "@/lib/utils";

type CartToggleSkeletonProps = {
  variant?: "details" | "card";
};

export function CartToggleSkeleton({
  variant = "details",
}: CartToggleSkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden border-2 border-foreground/10",
        "bg-foreground/5 flex items-center justify-center",
        variant === "details" && "h-14 md:h-16 w-full",
        variant === "card" && "w-full py-3 sm:py-4 border-t border-border",
      )}
    >
      {/* Content placeholder */}
      <div
        className={cn(
          "rounded-sm bg-foreground/20",
          variant === "details" && "h-5 w-32",
          variant === "card" && "h-4 w-20",
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
