"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, MapPin, LogOut, Terminal } from "lucide-react";

const navItems = [
  {
    label: "طلباتي",
    href: "/account/orders",
    key: "orders",
    icon: ShoppingBag,
    code: "LOG_ORD",
  },
  {
    label: "الملف الشخصي",
    href: "/account/profile",
    key: "profile",
    icon: User,
    code: "USER_PRF",
  },
  {
    label: "العناوين",
    href: "/account/addresses",
    key: "addresses",
    icon: MapPin,
    code: "LOC_ADR",
  },
];

export default function AccountNav({
  userName,
  email,
}: {
  userName: string;
  email: string;
}) {
  const pathname = usePathname();

  return (
    <div className="lg:col-span-1" dir="rtl">
      <div className="bg-background border-2 border-foreground p-0 overflow-hidden sticky top-24">
        {/* USER INFO PANEL */}
        <div className="p-6 bg-muted/30 border-b-2 border-foreground flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-14 h-14 bg-foreground text-background flex items-center justify-center text-xl font-black">
              {userName.split("")[0]}
            </div>
            {/* Visual Status Dot */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-background" />
          </div>
          <div className="min-w-0">
            <p className="font-black text-sm uppercase tracking-tighter truncate">
              {userName}{" "}
            </p>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest truncate">
              {email}{" "}
            </p>
          </div>
        </div>

        {/* NAVIGATION MODULES */}
        <nav className="p-2 space-y-1">
          <div className="px-4 py-2 text-[9px] font-black opacity-30 uppercase tracking-[0.3em]">
            System_Directory
          </div>

          {navItems.map(({ label, href, key, code, icon: Icon }) => {
            const isActive = pathname.startsWith(href);

            return (
              <Link
                key={key}
                href={href}
                className={`group relative flex items-center justify-between px-4 py-3 transition-all ${
                  isActive
                    ? "bg-foreground text-background shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                    : "text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-primary" : "opacity-40"}`}
                  />
                  <span className="text-xs font-black uppercase tracking-tight">
                    {label}
                  </span>
                </div>

                <span
                  className={`text-[8px] font-mono opacity-40 group-hover:opacity-100 ${isActive ? "text-primary/70" : ""}`}
                >
                  {code}
                </span>

                {isActive && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

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
