import Link from "next/link";
import { getProductsWithUserState } from "@/actions/products-actions";
import SectionProductCard from "./client-product/section-product-card";
import { ArrowLeft } from "lucide-react";

interface ProductsSectionProps {
  title: string;
  subtitle?: string; // Added for more context
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
    <section className="py-20 bg-background border-t border-foreground/5 relative overflow-hidden">
      {/* Visual Accent: Blueprint Grid (Optional CSS Pattern) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[grid-line]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section: Now more Structured */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            {subtitle && (
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                {subtitle}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter leading-none uppercase">
              {title}
            </h2>
          </div>

          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="group flex items-center gap-4 text-xs font-black uppercase tracking-widest bg-foreground text-background px-6 py-4 hover:bg-primary hover:text-white transition-all duration-300"
            >
              عرض الكل
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            </Link>
          )}
        </div>

        {/* The Grid: Slightly tighter gap for a "Solid" look */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-px md:bg-foreground/10 border-y md:border-x border-foreground/10">
          {products.map(({ product, isInCart, isInWishlist }) => (
            <div key={product.id} className="bg-background md:p-4">
              <SectionProductCard
                product={product}
                isInCart={isInCart}
                isInWishlist={isInWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
