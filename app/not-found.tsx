import Link from "next/link";
import {
  Home,
  Search,
  Mail,
  ArrowRight,
  LayoutGrid,
  Terminal,
  AlertTriangle,
} from "lucide-react";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen bg-background flex flex-col font-sans"
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
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[30px_30px]" />

        <div className="w-full max-w-3xl text-center relative z-10">
          {/* Error Visual */}
          <div className="relative mb-12 inline-block">
            <div className="text-[12rem] sm:text-[16rem] font-black leading-none text-foreground tracking-tighter opacity-10 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary text-primary-foreground p-6 border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <AlertTriangle className="w-16 h-16" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* System Status Label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-0.5 w-12 bg-foreground/20" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground font-mono">
              [ERROR_CODE: PAGE_NOT_FOUND_RECOVERY]
            </span>
            <div className="h-0.5 w-12 bg-foreground/20" />
          </div>

          {/* Heading & Text */}
          <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 uppercase tracking-tight">
            عذراً، المسار غير صحيح
          </h1>
          <p className="text-lg font-bold text-muted-foreground mb-12 max-w-xl mx-auto italic border-r-4 border-primary pr-6 text-right">
            يبدو أن الصفحة التي تحاول الوصول إليها قد تم نقلها، حذفها، أو أنها
            لم تكن موجودة في سجلات النظام من الأساس.
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
              href="/products"
              className="w-full sm:w-auto px-10 py-5 border-2 border-foreground bg-background text-foreground font-black uppercase text-xs tracking-widest hover:bg-muted transition-all flex items-center justify-center gap-3"
            >
              <Search className="w-4 h-4" /> تصفح المخزون
            </Link>
          </div>

          {/* Terminal Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-2 border-foreground bg-secondary divide-y-2 sm:divide-y-0 sm:divide-x-2 sm:divide-x-reverse divide-foreground shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]">
            <Link
              href="/"
              className="p-6 group hover:bg-foreground hover:text-background transition-colors flex items-center gap-4"
            >
              <div className="p-2 bg-foreground text-background group-hover:bg-background group-hover:text-foreground">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-right">
                السجل <br /> الرئيسي
              </span>
            </Link>

            <Link
              href="/products"
              className="p-6 group hover:bg-foreground hover:text-background transition-colors flex items-center gap-4"
            >
              <div className="p-2 bg-foreground text-background group-hover:bg-background group-hover:text-foreground">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-right">
                كتالوج <br /> المنتجات
              </span>
            </Link>

            <Link
              href="/contact"
              className="p-6 group hover:bg-foreground hover:text-background transition-colors flex items-center gap-4"
            >
              <div className="p-2 bg-foreground text-background group-hover:bg-background group-hover:text-foreground">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-right">
                دعم <br /> الأنظمة
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 border-t-2 border-foreground bg-secondary">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-mono font-black text-foreground/40 tracking-widest uppercase italic">
            STATUS: ACTIVE_TERMINAL_2026 // ALL RIGHTS RESERVED
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
