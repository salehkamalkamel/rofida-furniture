import React from "react";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "روفيدا للأثاث | أثاث عصري بجودة عالية وأسعار تنافسية في مصر",
  description:
    "روفيدا للأثاث بتقدّم أثاث عصري بتصميمات أنيقة وجودة عالية وأسعار تنافسية جدًا. شحن لجميع أنحاء مصر (القاهرة – الجيزة – القليوبية)، مع ضمان على جميع المنتجات.",
  keywords: [
    "روفيدا للأثاث",
    "أثاث عصري",
    "أثاث مودرن",
    "أثاث منزلي",
    "غرف نوم",
    "تربيزة تلفزيون",
    "تسريحات",
    "مكاتب",
    "أثاث في مصر",
    "أثاث القاهرة",
    "أثاث القليوبية",
  ],
  authors: [{ name: "Rovida Furniture" }],
  creator: "روفيدا للأثاث",
  publisher: "روفيدا للأثاث",
  generator: "Next.js",
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
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
