import { LogOut, Terminal } from "lucide-react";
import NavModules from "./nav-modules";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutBtn from "./logout-btn";

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
        <LogoutBtn />

        {/* SYSTEM DECORATION */}
        <div className="p-3 flex justify-center">
          <Terminal className="w-3 h-3 opacity-10" />
        </div>
      </div>
    </div>
  );
}
