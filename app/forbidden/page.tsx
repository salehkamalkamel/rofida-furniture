"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  Home,
  LogIn,
  ChevronLeft,
  LifeBuoy,
  Mail,
  LockKeyhole,
} from "lucide-react";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-background flex flex-col font-sans overflow-hidden"
      dir="rtl"
    >
      {/* Header */}
      <header className="p-8 border-b-2 border-foreground">
        <Link href="/" className="inline-block group">
          <div className="bg-foreground text-background p-2 px-4 font-black text-2xl tracking-tighter shadow-[4px_4px_0px_0px_rgba(var(--primary))] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
            ROVIDA_SYS.
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative">
        {/* Warning Background Text */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <span className="text-[20vw] font-black leading-none uppercase">
            Forbidden
          </span>
        </div>

        <div className="w-full max-w-3xl text-center relative z-10">
          {/* Error Visual */}
          <div className="relative mb-12 inline-block">
            <div className="w-48 h-48 bg-secondary border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center rotate-3">
              <div className="-rotate-3 flex flex-col items-center">
                <LockKeyhole
                  className="w-20 h-20 text-foreground"
                  strokeWidth={2.5}
                />
                <div className="mt-2 bg-primary text-primary-foreground px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter">
                  Restricted_Area
                </div>
              </div>
            </div>
          </div>

          {/* System Status Label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-0.5 w-12 bg-destructive/30" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-destructive font-mono">
              [SEC_AUTH_FAILURE: CODE_403]
            </span>
            <div className="h-0.5 w-12 bg-destructive/30" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 uppercase tracking-tight">
            الدخول غير مصرح به
          </h1>

          <p className="text-lg font-bold text-muted-foreground mb-12 max-w-xl mx-auto italic border-r-4 border-destructive pr-6 text-right">
            عذراً، لا تملك الصلاحيات الأمنية الكافية للوصول إلى هذا القسم من
            النظام. يرجى مراجعة المسؤول إذا كنت تعتقد أن هناك خطأ.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              href="/"
              className="w-full sm:w-auto px-10 py-5 bg-foreground text-background font-black uppercase text-xs tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(var(--primary),0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <Home className="w-4 h-4" /> العودة للرئيسية
            </Link>

            <Link
              href="/auth/signin"
              className="w-full sm:w-auto px-10 py-5 border-2 border-foreground bg-background text-foreground font-black uppercase text-xs tracking-widest hover:bg-muted transition-all flex items-center justify-center gap-3"
            >
              <LogIn className="w-4 h-4" /> تبديل الحساب
            </Link>
          </div>

          {/* Terminal Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-2 border-foreground bg-secondary divide-y-2 sm:divide-y-0 sm:divide-x-2 sm:divide-x-reverse divide-foreground shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]">
            <button
              onClick={() => router.back()}
              className="p-6 group hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center gap-4 text-right"
            >
              <div className="p-2 bg-foreground text-background group-hover:bg-background group-hover:text-foreground">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">
                تراجع <br /> للخلف
              </span>
            </button>

            <Link
              href="/contact"
              className="p-6 group hover:bg-foreground hover:text-background transition-colors flex items-center gap-4 text-right"
            >
              <div className="p-2 bg-foreground text-background group-hover:bg-background group-hover:text-foreground">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">
                مراسلة <br /> الإدارة
              </span>
            </Link>

            <Link
              href="/help"
              className="p-6 group hover:bg-foreground hover:text-background transition-colors flex items-center gap-4 text-right"
            >
              <div className="p-2 bg-foreground text-background group-hover:bg-background group-hover:text-foreground">
                <LifeBuoy className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">
                مركز <br /> المساعدة
              </span>
            </Link>
          </div>

          {/* Admin Request Banner */}
          <div className="mt-12 p-6 border-2 border-foreground bg-primary/10 flex items-start gap-4">
            <ShieldAlert className="w-8 h-8 text-primary shrink-0" />
            <div className="text-right">
              <h3 className="font-black text-xs uppercase tracking-widest mb-1">
                طلب صلاحيات الموظفين
              </h3>
              <p className="text-xs text-muted-foreground font-bold">
                إذا كنت موظفاً وتحتاج للوصول، يمكنك{" "}
                <Link
                  href="/admin-request"
                  className="text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
                >
                  تقديم طلب صلاحيات رسمي
                </Link>{" "}
                ليتم مراجعته.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 border-t-2 border-foreground bg-secondary">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-mono font-black text-foreground/40 tracking-widest uppercase italic">
            SEC_STATUS: LEVEL_4_ENFORCED // 2026
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/privacy"
              className="text-[10px] font-black uppercase tracking-widest hover:text-primary underline decoration-2 underline-offset-4 transition-colors"
            >
              الخصوصية
            </Link>
            <Link
              href="/terms"
              className="text-[10px] font-black uppercase tracking-widest hover:text-primary underline decoration-2 underline-offset-4 transition-colors"
            >
              الشروط
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
