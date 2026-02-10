import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 group" dir="rtl">
      {/* INDUSTRIAL LOGO ICON */}
      <div className="relative w-10 h-10 bg-foreground flex items-center justify-center transition-transform group-hover:scale-95 group-active:scale-90 shadow-[3px_3px_0px_0px_rgba(var(--primary),1)]">
        {/* Geometric Sofa Schematic */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 text-background"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          {/* Backrest Block */}
          <path d="M4 8h16v6H4z" />
          {/* Base/Seat Block */}
          <path d="M2 14h20v4H2z" />
          {/* Armrests */}
          <path d="M2 11v3M22 11v3" />
        </svg>

        {/* Decorative corner notch */}
        <div className="absolute top-0 right-0 w-2 h-2 bg-background translate-x-1 -translate-y-1 rotate-45 border-l border-b border-foreground/20" />
      </div>

      {/* BRAND WORDMARK */}
      <div className="flex flex-col">
        <span className="text-xl font-black leading-none tracking-tighter text-foreground uppercase italic">
          روفيدا
        </span>
        <div className=" items-center gap-1.5 mt-0.5 hidden sm:flex">
          <div className="w-1.5 h-1.5 bg-primary" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground leading-none">
            Furniture_Unit
          </span>
        </div>
      </div>
    </Link>
  );
}
