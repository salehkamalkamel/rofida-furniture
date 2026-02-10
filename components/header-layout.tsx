"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";
import { Heart, ShoppingBag, User, Menu, X, ArrowUpLeft } from "lucide-react";
import { navList } from "@/lib/data/header-data";

export default function HeaderLayout({
  cartLength,
  wishlistLength,
  isAuthinticated,
}: {
  cartLength: number;
  wishlistLength: number;
  isAuthinticated: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b-2 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Adjusted gaps for different breakpoints to prevent overlap */}
        <div className="flex items-center justify-between h-20 gap-2 md:gap-4 lg:gap-8">
          {/* 1. Logo Section */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* 2. Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8 h-full">
            {navList.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-black uppercase tracking-tighter hover:text-primary transition-colors h-full flex items-center border-b-2 border-transparent hover:border-primary whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 3. Actions Section */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 sm:p-3 text-foreground hover:text-primary transition-colors group"
              aria-label="قائمة الأمنيات"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
              {wishlistLength > 0 && (
                <span className="absolute top-1 left-1 w-4 h-4 sm:w-5 sm:h-5 bg-offer text-white text-[9px] sm:text-[10px] font-black flex items-center justify-center rounded-none border border-background">
                  {wishlistLength}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 sm:p-3 text-foreground hover:text-primary transition-colors group"
              aria-label="سلة التسوق"
            >
              <ShoppingBag
                className="w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth={2.5}
              />
              {cartLength > 0 && (
                <span className="absolute top-1 left-1 w-4 h-4 sm:w-5 sm:h-5 bg-secondary text-secondary-foreground text-[9px] sm:text-[10px] font-black flex items-center justify-center rounded-none border border-background">
                  {cartLength}
                </span>
              )}
            </Link>

            {/* Vertical Divider */}
            <div className="h-8 w-px bg-border mx-1 hidden sm:block" />

            {/* Auth/User Action - Responsive Padding */}
            <Link
              href={isAuthinticated ? "/account" : "/auth/signin"}
              className={`flex items-center justify-center gap-2 px-3 lg:px-4 h-10 sm:h-11 text-sm font-black transition-all ${
                isAuthinticated
                  ? "text-foreground hover:bg-muted"
                  : "bg-primary text-white hover:bg-blue-700"
              }`}
            >
              <User className="w-5 h-5" strokeWidth={2.5} />
              <span className="hidden lg:block whitespace-nowrap">
                {isAuthinticated ? "حسابي" : "تسجيل الدخول"}
              </span>
            </Link>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Added overflow handling */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-background z-50 animate-in slide-in-from-top duration-300 overflow-y-auto">
          <nav className="p-6 flex flex-col gap-6 pb-20">
            {navList.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-2xl font-black tracking-tighter border-b border-border pb-4 flex justify-between items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
                <span className="text-primary">←</span>
              </Link>
            ))}
          </nav>
          {/* Mobile Menu Footer Signature */}
          <div className="mt-auto pt-8 border-t border-border text-center text-[10px] tracking-widest opacity-30">
            <span className="block mb-1">تم تصميم وتطوير الموقع بواسطة</span>
            <Link
              href="https://saleh-kamal.blog/"
              target="_blank"
              className="font-black opacity-60 hover:opacity-100 hover:text-primary transition-all inline-flex items-center gap-1"
            >
              Saleh Kamal
              <ArrowUpLeft className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
