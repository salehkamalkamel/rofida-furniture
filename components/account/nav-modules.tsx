"use client";
import { MapPin, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function NavModules() {
  const pathname = usePathname();

  return (
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
  );
}
