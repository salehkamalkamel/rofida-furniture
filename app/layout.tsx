import React from "react";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "دار | أثاث عصري بتصميم اسكندنافي",
  description:
    "متجر أثاث عصري بتصميم اسكندنافي بسيط وأنيق. اكتشف مجموعتنا المتنوعة من الأثاث المنزلي عالي الجودة.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${ibmPlexArabic.className} antialiased bg-background text-foreground`}
      >
        <Header />
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
        <Analytics />
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
