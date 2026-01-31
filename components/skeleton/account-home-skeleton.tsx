import { Skeleton } from "@/components/ui/skeleton";
import { Package, UserCircle, MapPin, ArrowLeft } from "lucide-react";

export default function AccountHomeSkeleton() {
  return (
    <div className="lg:col-span-3">
      <div className="max-w-5xl mx-auto p-4 sm:p-8" dir="rtl">
        {/* SESSION HEADER SKELETON */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-foreground pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-muted animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20">
                Verifying_Session...
              </span>
            </div>
            <Skeleton className="h-10 w-64 bg-foreground/10" />
          </div>
          <div className="text-left">
            <Skeleton className="h-3 w-32 bg-foreground/5 sm:ml-0 mr-auto" />
          </div>
        </div>

        {/* MODULE GRID SKELETON */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ModuleSkeleton index="01" title="الطلبات" icon={<Package />} />
          <ModuleSkeleton
            index="02"
            title="الملف الشخصي"
            icon={<UserCircle />}
          />

          <div className="sm:col-span-2">
            <ModuleSkeleton
              index="03"
              title="إدارة العناوين"
              icon={<MapPin />}
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Skeleton className="h-3 w-40 mx-auto bg-foreground/5" />
        </div>
      </div>
    </div>
  );
}

function ModuleSkeleton({
  index,
  title,
  icon,
}: {
  index: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative bg-background border-2 border-foreground/10 p-6 flex flex-col opacity-60">
      {/* Module Index Badge */}
      <div className="absolute top-0 left-0 bg-foreground/5 px-2 py-1 text-[9px] font-mono opacity-30">
        MOD_{index}
      </div>

      {/* Icon Box */}
      <div className="w-12 h-12 bg-muted/30 border border-foreground/5 flex items-center justify-center mb-6 mt-2 text-foreground/20">
        {icon}
      </div>

      {/* Text Skeletons */}
      <div className="space-y-3 mb-6">
        <h3 className="font-black text-lg uppercase tracking-tight">{title}</h3>
        <Skeleton className="h-3 w-full bg-foreground/5" />
        <Skeleton className="h-3 w-4/5 bg-foreground/5" />
      </div>

      {/* CTA Skeleton */}
      <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">
        <Skeleton className="h-2 w-16 bg-foreground/10" />
        <ArrowLeft className="w-3 h-3" />
      </div>
    </div>
  );
}
