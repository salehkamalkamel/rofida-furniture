import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-background border-b border-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Aligned with the Products Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">
              Browse Collections
            </span>
            <h2 className="text-4xl font-black text-foreground tracking-tighter uppercase">
              تسوق حسب الفئة
            </h2>
          </div>

          <Link
            href="/products"
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            عرض جميع المنتجات
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* The Grid - Reduced to 4 or 6 columns for impact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-t border-r border-foreground">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative aspect-4/5 border-l border-b border-foreground overflow-hidden focus:outline-none"
            >
              {/* Image with Industrial Zoom */}
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 will-change-transform group-hover:scale-110"
              />

              {/* Technical Overlay Label */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              <div className="absolute bottom-0 right-0 left-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] font-black text-primary mb-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  EXPLORE 0{index + 1}
                </span>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>

              {/* Decorative Corner Square (Architectural Detail) */}
              <div className="absolute top-0 left-0 w-8 h-8 border-r border-b border-foreground/20 bg-background/10 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-white/50 group-hover:bg-primary group-hover:text-white transition-colors">
                {String(index + 1).padStart(2, "0")}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
