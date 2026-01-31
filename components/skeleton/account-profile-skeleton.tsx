import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Fingerprint,
  Activity,
} from "lucide-react";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-10" dir="rtl">
      {/* HEADER SECTION SKELETON */}
      <div className="border-b-2 border-foreground pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-primary font-mono text-[10px] font-black tracking-widest uppercase opacity-50">
            <Fingerprint className="w-3 h-3 animate-pulse" />
            SEC_PROFILE_ACCESS_LOADING...
          </div>
          <Skeleton className="h-10 w-64 bg-foreground/10" />
          <Skeleton className="h-4 w-80 mt-3 bg-foreground/5" />
        </div>
      </div>

      <div className="max-w-3xl border-2 border-foreground bg-background overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* PROFILE BADGE SECTION SKELETON */}
        <div className="p-8 border-b-2 border-foreground bg-muted/30 flex flex-col sm:flex-row items-center gap-8 relative">
          <div className="absolute top-0 left-0 w-8 h-8 bg-foreground -translate-x-4 -translate-y-4 rotate-45 opacity-20" />

          {/* Avatar Skeleton */}
          <Skeleton className="w-24 h-24 bg-foreground/20 border-4 border-background shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] shrink-0" />

          <div className="text-center sm:text-right space-y-3">
            <div className="inline-flex items-center gap-2 bg-muted border border-foreground/10 px-2 py-0.5 mb-1">
              <Activity className="w-3 h-3 opacity-20" />
              <Skeleton className="h-2 w-20 bg-foreground/10" />
            </div>
            <Skeleton className="h-8 w-48 bg-foreground/10" />
            <Skeleton className="h-3 w-32 bg-foreground/5" />
          </div>
        </div>

        {/* DATA REGISTER GRID SKELETON */}
        <div className="grid grid-cols-1 divide-y-2 divide-foreground/5 bg-background">
          <InfoRowSkeleton
            code="REG_NAME"
            icon={<User />}
            label="الاسم الكامل"
          />
          <InfoRowSkeleton
            code="REG_EMAIL"
            icon={<Mail />}
            label="البريد الإلكتروني"
          />
          <InfoRowSkeleton
            code="REG_ROLE"
            icon={<ShieldCheck />}
            label="نوع الحساب"
          />
          <InfoRowSkeleton
            code="REG_STAMP"
            icon={<Calendar />}
            label="آخر تحديث"
          />
        </div>

        {/* SYSTEM FOOTER SKELETON */}
        <div className="p-8 bg-muted/10 border-t-2 border-foreground">
          <div className="flex gap-4 items-start">
            <div className="w-1.5 h-1.5 bg-foreground/20 mt-1.5 shrink-0" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-3 w-full bg-foreground/5" />
              <Skeleton className="h-3 w-3/4 bg-foreground/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRowSkeleton({
  label,
  icon,
  code,
}: {
  label: string;
  icon: React.ReactNode;
  code: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center p-8">
      <div className="flex items-center gap-4 w-full sm:w-1/2 mb-4 sm:mb-0">
        <div className="w-10 h-10 border border-foreground/10 flex items-center justify-center text-foreground/20">
          {icon}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[8px] font-mono font-black text-primary/40 uppercase tracking-[0.2em]">
            {code}
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/40">
            {label}
          </span>
        </div>
      </div>
      <div className="w-full sm:w-1/2 sm:text-left">
        <Skeleton className="h-5 w-40 sm:mr-auto bg-foreground/10" />
      </div>
    </div>
  );
}
