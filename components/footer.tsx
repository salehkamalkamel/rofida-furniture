import Link from "next/link";
import { Instagram, Facebook, Twitter, ArrowUpLeft } from "lucide-react";
import { navList } from "@/lib/data/header-data";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-foreground">
      {/* Top Bar: Newsletter / High Impact Statement */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-l border-background/10">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
              Join the Architecture
            </h3>
            <p className="text-background/50 text-sm max-w-sm mb-6 uppercase tracking-widest">
              Get updates on new collections and technical design specs.
            </p>
            <form className="flex group">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent border border-background/20 px-4 py-3 flex-1 text-xs font-bold focus:outline-none focus:border-primary transition-colors"
              />
              <button className="bg-background text-foreground px-6 py-3 text-xs font-black uppercase hover:bg-primary hover:text-white transition-all">
                Join
              </button>
            </form>
          </div>
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
            <div className="text-6xl md:text-8xl font-black opacity-10 leading-none">
              ROFIDA / روفيدا للأثاث
            </div>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 mt-4">
              Industrial Grade Furniture • Designed in Cairo
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Section 1: Brand Info */}
          <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-l border-background/10">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8">
              About
            </h4>
            <p className="text-sm font-medium leading-relaxed opacity-80 italic">
              "متجر أثاث عصري بتصميم صناعي يجمع بين القوة والجمال البصري. قطع
              مصممة لتدوم وتلهم."
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-l border-background/10">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["جميع المنتجات", "وصل حديثاً", "العروض", "قائمة الأمنيات"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm font-black uppercase tracking-tighter hover:text-primary transition-colors flex items-center justify-between group"
                    >
                      {item}
                      <ArrowUpLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Section 3: Categories */}
          <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-l border-background/10">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8">
              Categories
            </h4>
            {/* Section 3: Categories */}
            <ul className="space-y-4">
              {navList.map((item, index) => (
                <li key={item.href + item.name}>
                  <Link
                    href={item.href}
                    className="text-sm font-black uppercase tracking-tighter hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    {item.name}
                    <span className="text-[10px] opacity-20 font-mono">
                      [0{index + 1}]
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Contact */}
          <div className="p-8 md:p-12">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8">
              Support
            </h4>
            <div className="space-y-6">
              <div>
                <span className="block text-[10px] opacity-40 uppercase mb-1">
                  Location
                </span>
                <Link
                  href="https://maps.app.goo.gl/D5GYJWWRwLWshQvt9"
                  className="hover:text-primary"
                >
                  <span className="text-sm font-bold">
                    مصر ، القاهرة ، البساتين
                  </span>
                </Link>
              </div>
              <div>
                <span className="block text-[10px] opacity-40 uppercase mb-1">
                  Contact
                </span>
                <span className="text-sm font-bold block">
                  +20 123 456 7890
                </span>
                <span className="text-sm font-bold block">info@dar.com</span>
              </div>
              <div className="flex gap-4 pt-4">
                <Instagram className="w-5 h-5 hover:text-primary cursor-pointer" />
                <Facebook className="w-5 h-5 hover:text-primary cursor-pointer" />
                <Twitter className="w-5 h-5 hover:text-primary cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Final Bottom Bar */}
        <div className="border-t border-background/10 p-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
            © 2026 ROFIDA_FURNITURE INDUSTRIAL DESIGN. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link
              href="#"
              className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
