// components/header-skeleton.tsx
import { Heart, ShoppingBag, User, Menu } from "lucide-react";
import { navList } from "@/lib/data/header-data";
import Logo from "../logo";

export default function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b-2 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 md:gap-4 lg:gap-8">
          {/* 1. Static Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* 2. Static Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8 h-full">
            {navList.map((item) => (
              <div
                key={item.name}
                className="text-sm font-black uppercase tracking-tighter opacity-50 h-full flex items-center border-b-2 border-transparent whitespace-nowrap"
              >
                {item.name}
              </div>
            ))}
          </nav>

          {/* 3. Skeleton Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Wishlist Icon (No badge) */}
            <div className="p-2 sm:p-3 text-muted-foreground animate-pulse">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </div>

            {/* Cart Icon (No badge) */}
            <div className="p-2 sm:p-3 text-muted-foreground animate-pulse">
              <ShoppingBag
                className="w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth={2.5}
              />
            </div>

            <div className="h-8 w-px bg-border mx-1 hidden sm:block" />

            {/* Auth Button Skeleton */}
            <div className="flex items-center justify-center gap-2 px-3 lg:px-4 h-10 sm:h-11 bg-muted animate-pulse min-w-10 lg:min-w-30">
              <User
                className="w-5 h-5 text-muted-foreground"
                strokeWidth={2.5}
              />
              <div className="hidden lg:block h-4 w-16 bg-muted-foreground/20 rounded" />
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden p-2 text-foreground">
              <Menu className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
