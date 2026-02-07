import ProductCard from "@/components/client-product/product-card";
import ClientProductsFilters from "./products-filters";
import NoProductsMatch from "./no-products-match";
import { Product } from "@/db/schema";
import { LayoutGrid, Database } from "lucide-react";

export default function ProductsContent({ products }: { products: Product[] }) {
  return (
    <main className="flex-1 bg-background" dir="rtl">
      {/* Sticky Filter Bar with Industrial Border */}
      <div className="sticky top-0 z-30 border-b-2 border-foreground bg-background/95 backdrop-blur-md">
        <ClientProductsFilters productsLength={products.length || 0} />
      </div>

      {/* --- Products Grid Container --- */}
      <div className="max-w-450 mx-auto min-h-screen">
        <div className="transition-all duration-500">
          {products.length > 0 ? (
            /* GRID LOGIC: 
               - grid-cols-2 for mobile density
               - gap-1 on mobile for a "tight" catalog look
               - md:gap-px for the blueprint grid lines
            */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-px bg-foreground/10 border-b-2 border-foreground/10">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-background group relative p-0 md:p-4 hover:z-10 transition-all duration-300"
                >
                  {/* Technical Index Label (Hidden on small mobile to save space) */}
                  <span className="absolute top-2 right-4 text-[9px] font-mono opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all hidden sm:block">
                    IDX_{String(index + 1).padStart(4, "0")}
                  </span>

                  {/* The Actual Product Card */}
                  <div className="h-full">
                    <ProductCard product={product} />
                  </div>

                  {/* Brutalist Corner Accent */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-1 -translate-y-1" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-40 flex flex-col justify-center items-center text-center">
              <Database className="w-12 h-12 mb-4 opacity-10" />
              <NoProductsMatch />
            </div>
          )}
        </div>

        {/* --- Catalog Metadata Footer --- */}
        <div className="p-6 md:p-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-secondary/20 border-t-2 border-foreground/5">
          <div className="flex items-center gap-4">
            <LayoutGrid className="w-4 h-4" />
            <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
              نهاية الكتالوج / مجموعة 2026
            </div>
          </div>

          <div className="h-px flex-1 mx-8 bg-foreground/10 hidden md:block" />

          <div className="text-[10px] font-mono opacity-50 flex gap-6">
            <span>TOTAL_ITEMS: {products.length}</span>
            <span className="text-primary font-black underline underline-offset-4">
              STATUS_OK
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
