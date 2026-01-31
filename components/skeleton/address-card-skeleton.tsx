export default function AddressCardSkeleton() {
  return (
    <div className="relative border-2 border-foreground/10 p-8 bg-background flex flex-col animate-pulse">
      {/* ADDRESS IDENTIFIER SKELETON */}
      <div className="flex justify-between items-start mb-6 pt-2">
        <div className="space-y-2">
          {/* Label (e.g., SITE_OFFICE) */}
          <div className="h-6 bg-muted w-32" />
          {/* Ref_ID */}
          <div className="h-3 bg-muted/50 w-20" />
        </div>
        {/* MapPin Box */}
        <div className="w-10 h-10 border border-foreground/5 bg-muted/30" />
      </div>

      {/* MANIFEST DETAILS SKELETON */}
      <div className="flex-1 space-y-6">
        <div>
          <div className="h-2 bg-muted/40 w-16 mb-2" /> {/* Recipient Label */}
          <div className="h-4 bg-muted w-40" /> {/* Name */}
        </div>

        <div>
          <div className="h-2 bg-muted/40 w-24 mb-2" />{" "}
          {/* Destination Label */}
          <div className="space-y-2">
            <div className="h-3 bg-muted w-full" />
            <div className="h-3 bg-muted w-2/3" />
          </div>
        </div>

        {/* CONTACT COMMS BLOCK */}
        <div className="pt-4 border-t border-foreground/5 space-y-3">
          <div className="h-3 bg-muted/50 w-32" /> {/* Phone */}
          <div className="h-3 bg-muted/50 w-32" /> {/* WhatsApp */}
        </div>
      </div>

      {/* ACTION COMMANDS SKELETON */}
      <div className="flex items-center gap-6 mt-8 pt-6 border-t border-foreground/10">
        <div className="h-3 bg-muted w-12" /> {/* Edit */}
        <div className="h-3 bg-muted w-12" /> {/* Delete */}
        <div className="h-3 bg-muted w-24 mr-auto" /> {/* Set Default */}
      </div>
    </div>
  );
}
