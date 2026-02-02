import ProductCard from "@/components/client-product/product-card";
import ClientProductsFilters from "./products-filters";
import NoProductsMatch from "./no-products-match";
import { Product } from "@/db/schema";

export default function ProductsContent({ products }: { products: Product[] }) {
  return (
    <main className="flex-1 bg-background">
      <div className="border-b border-foreground/10 bg-muted/30">
        <ClientProductsFilters productsLength={products.length || 0} />
      </div>

      {/* --- Products Grid --- */}
      <div className="max-w-360 mx-auto border-x border-foreground/10 min-h-screen">
        <div className={`transition-all duration-500`}>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-foreground/10 border-b border-foreground/10">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-background group relative p-4 md:p-6 hover:z-10 transition-all duration-300"
                >
                  <span className="absolute top-2 right-4 text-[10px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">
                    REF_{String(index + 1).padStart(3, "0")}
                  </span>

                  <ProductCard product={product} />

                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-primary opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 flex justify-center items-center">
              <NoProductsMatch />
            </div>
          )}
        </div>

        {/* --- Catalog Metadata Footer --- */}
        <div className="p-8 flex justify-between items-center bg-muted/10">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            End of Catalog / 2024 Collection
          </div>
          <div className="h-px flex-1 mx-8 bg-foreground/5 hidden md:block" />
          <div className="text-[10px] font-mono opacity-40">
            SCAN_INDEX_COMPLETED
          </div>
        </div>
      </div>
    </main>
  );
}
