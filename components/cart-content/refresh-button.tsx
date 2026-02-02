"use client";

import { RotateCcw } from "lucide-react";

export default function RefreshButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="group flex items-center gap-3 bg-foreground text-background px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
    >
      إعادة المحاولة <RotateCcw className="w-4 h-4" />
    </button>
  );
}
