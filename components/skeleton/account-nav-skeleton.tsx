import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, User, MapPin, LogOut, Terminal } from "lucide-react";

export default function AccountNavSkeleton() {
  return (
    <div className="lg:col-span-1" dir="rtl">
      <div className="bg-background border-2 border-foreground p-0 overflow-hidden sticky top-24">
        {/* USER INFO PANEL SKELETON */}
        <div className="p-6 bg-muted/30 border-b-2 border-foreground flex items-center gap-4">
          <div className="relative shrink-0">
            {/* Avatar Box */}
            <Skeleton className="w-14 h-14 bg-foreground/20 border-0" />
            {/* Visual Status Dot */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-muted border-2 border-background" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-24 bg-foreground/10" />
            <Skeleton className="h-3 w-32 bg-foreground/5" />
          </div>
        </div>

        {/* NAVIGATION MODULES SKELETON */}
        <nav className="p-2 space-y-1">
          <div className="px-4 py-2 text-[9px] font-black opacity-30 uppercase tracking-[0.3em]">
            System_Directory
          </div>

          {[
            { label: "طلباتي", icon: ShoppingBag, code: "LOG_ORD" },
            { label: "الملف الشخصي", icon: User, code: "USER_PRF" },
            { label: "العناوين", icon: MapPin, code: "LOC_ADR" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 border border-transparent"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 opacity-10" />
                <Skeleton className="h-3 w-20 bg-foreground/10" />
              </div>
              <span className="text-[8px] font-mono opacity-20">
                {item.code}
              </span>
            </div>
          ))}
        </nav>

        {/* SESSION CONTROL SKELETON */}
        <div className="p-2 border-t-2 border-foreground/10 bg-muted/10">
          <div className="w-full flex items-center justify-between px-4 py-3 border border-dashed border-foreground/10">
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4 opacity-10" />
              <Skeleton className="h-3 w-24 bg-foreground/5" />
            </div>
            <span className="text-[8px] font-mono opacity-10 uppercase">
              Exit_Session
            </span>
          </div>
        </div>

        {/* SYSTEM DECORATION */}
        <div className="p-3 flex justify-center">
          <Terminal className="w-3 h-3 opacity-5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
