import Link from "next/link";
import { getProductsWithUserState } from "@/actions/products-actions";
import SectionProductCard from "./client-product/section-product-card";
import { ArrowLeft, LayoutGrid } from "lucide-react";

interface ProductsSectionProps {
  title: string;
  subtitle?: string;
  limit?: number;
  category?: string;
  label?: "new_arrival" | "best_seller" | "on_sale" | "limited_edition";
  viewAllLink?: string;
}

export default async function ProductsSection({
  title,
  subtitle,
  limit = 4,
  category,
  label,
  viewAllLink,
}: ProductsSectionProps) {
  const products = await getProductsWithUserState({
    limit,
    category,
    label,
  });

  if (products.length === 0) return null;

  return (
    <section
      className="py-12 md:py-24 bg-background border-t-4 border-foreground relative overflow-hidden"
      dir="rtl"
    >
      {/* Background System Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <div className="space-y-4">
            {subtitle && (
              <div className="flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary">
                  {subtitle}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter leading-[0.85] uppercase">
              {title.split(" ").map((word, i) => (
                <span key={i} className="block md:inline">
                  {word}{" "}
                </span>
              ))}
            </h2>
          </div>

          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="group relative flex items-center gap-6 text-xs font-black uppercase tracking-widest bg-foreground text-background px-8 py-5 hover:bg-primary transition-colors self-start md:self-end shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <span className="relative z-10">استكشاف الكل</span>
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2 relative z-10" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6  shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]">
          {products.map(({ product, isInCart, isInWishlist }) => (
            <div
              key={product.id}
              className="bg-background group/card relative overflow-hidden"
            >
              {/* Card Container */}
              <div className="h-full transition-transform duration-300">
                <SectionProductCard
                  product={product}
                  isInCart={isInCart}
                  isInWishlist={isInWishlist}
                />
              </div>

              {/* Decorative Corner (Desktop Only) */}
              <div className="hidden md:block absolute top-0 left-0 w-4 h-4 border-t border-l border-foreground/10 opacity-0 group-hover/card:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Technical Footer Label */}
        <div className="mt-8 flex items-center justify-between border-t border-foreground/5 pt-4">
          <div className="flex items-center gap-4 text-[9px] font-mono text-muted-foreground uppercase">
            <span>Entry_Count: {products.length}</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Storage: CAI_WAREHOUSE_A</span>
          </div>
          <LayoutGrid className="w-4 h-4 opacity-10" />
        </div>
      </div>
    </section>
  );
}
