import { auth } from "@/lib/auth";
import {
  Lock,
  Package,
  UserCircle,
  MapPin,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AccountHomePageLayout() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // --- ACCESS DENIED STATE ---
  if (!session?.user) {
    return (
      <div
        className="min-h-[70vh] flex items-center justify-center bg-muted/20 px-4"
        dir="rtl"
      >
        <div className="w-full max-w-md bg-background border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          {/* Industrial Accent */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-muted/50 -rotate-45 translate-x-8 -translate-y-8" />

          <div className="relative z-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-foreground text-background flex items-center justify-center">
              <Lock className="w-10 h-10" />
            </div>

            <h1 className="text-sm font-black uppercase tracking-[0.2em] mb-2">
              Authentication Required
            </h1>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-8">
              يرجى التحقق من الهوية للوصول إلى لوحة التحكم
            </p>

            <div className="space-y-4">
              <Link
                href="/signin"
                className="flex items-center justify-center h-14 w-full bg-foreground text-background font-black uppercase tracking-widest text-xs hover:bg-primary transition-colors"
              >
                تسجيل الدخول
              </Link>

              <Link
                href="/signup"
                className="flex items-center justify-center h-14 w-full border-2 border-foreground font-black uppercase tracking-widest text-xs hover:bg-muted transition-colors"
              >
                إنشاء حساب جديد
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-foreground/5 flex items-center justify-center gap-2">
              <ShieldAlert className="w-3 h-3 opacity-30" />
              <span className="text-[9px] font-black uppercase tracking-widest opacity-30">
                Secure System Access v2.0
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- AUTHORIZED DASHBOARD ---
  const user = session.user;
  return (
    <>
      <div className="lg:col-span-3">
        <div className="max-w-5xl mx-auto p-4 sm:p-8" dir="rtl">
          {/* SESSION HEADER */}
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-foreground pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                  Active_Session
                </span>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                مرحباً، {user.name}
              </h2>
            </div>
            <div className="text-left font-mono text-[10px] font-bold opacity-40 uppercase">
              UID: {user.id.slice(0, 12)}...
            </div>
          </div>

          {/* MODULE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Module: Orders */}
            <DashboardModule
              index="01"
              title="الطلبات"
              desc="تتبع حالة الشحنات والطلبات السابقة"
              icon={<Package className="w-5 h-5" />}
              href="/account/orders"
              cta="عرض السجل"
            />

            {/* Module: Profile */}
            <DashboardModule
              index="02"
              title="الملف الشخصي"
              desc="تعديل بيانات الحساب وكلمة المرور"
              icon={<UserCircle className="w-5 h-5" />}
              href="/account/profile"
              cta="تعديل البيانات"
            />

            {/* Module: Addresses (Full Width) */}
            <div className="sm:col-span-2">
              <DashboardModule
                index="03"
                title="إدارة العناوين"
                desc="إضافة أو تعديل مواقع الشحن الافتراضية الخاصة بك"
                icon={<MapPin className="w-5 h-5" />}
                href="/account/addresses"
                cta="إدارة الوجهات"
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/logout"
              className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 hover:opacity-100 hover:text-destructive transition-all"
            >
              Terminate_Session [تسجيل الخروج]
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Reusable Dashboard Tile Component
function DashboardModule({
  index,
  title,
  desc,
  icon,
  href,
  cta,
}: {
  index: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group relative bg-background border-2 border-foreground/10 p-6 flex flex-col transition-all hover:border-foreground hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
    >
      <div className="absolute top-0 left-0 bg-foreground/5 px-2 py-1 text-[9px] font-mono opacity-50">
        MOD_{index}
      </div>

      <div className="w-12 h-12 bg-muted/50 border border-foreground/5 flex items-center justify-center mb-6 mt-2 group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>

      <h3 className="font-black text-lg uppercase tracking-tight mb-1">
        {title}
      </h3>
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter mb-6 leading-relaxed">
        {desc}
      </p>

      <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
        <span>{cta}</span>
        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
