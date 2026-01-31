import { LogOut, Terminal } from "lucide-react";
import NavModules from "./nav-modules";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AccountNav() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return;
  const user = session.user;

  return (
    <div className="lg:col-span-1" dir="rtl">
      <div className="bg-background border-2 border-foreground p-0 overflow-hidden sticky top-24">
        {/* USER INFO PANEL */}
        <div className="p-6 bg-muted/30 border-b-2 border-foreground flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-14 h-14 bg-foreground text-background flex items-center justify-center text-xl font-black">
              {user.name.split("")[0]}
            </div>
            {/* Visual Status Dot */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-background" />
          </div>
          <div className="min-w-0">
            <p className="font-black text-sm uppercase tracking-tighter truncate">
              {user.name}{" "}
            </p>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest truncate">
              {user.email}{" "}
            </p>
          </div>
        </div>

        {/* NAVIGATION MODULES */}
        <NavModules />

        {/* SESSION CONTROL */}
        <div className="p-2 border-t-2 border-foreground/10 bg-muted/10">
          <button className="w-full group flex items-center justify-between px-4 py-3 text-destructive hover:bg-destructive hover:text-white transition-all border border-dashed border-destructive/30 hover:border-solid">
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-tight">
                تسجيل الخروج
              </span>
            </div>
            <span className="text-[8px] font-mono opacity-50 group-hover:opacity-100 uppercase">
              Exit_Session
            </span>
          </button>
        </div>

        {/* SYSTEM DECORATION */}
        <div className="p-3 flex justify-center">
          <Terminal className="w-3 h-3 opacity-10" />
        </div>
      </div>
    </div>
  );
}
