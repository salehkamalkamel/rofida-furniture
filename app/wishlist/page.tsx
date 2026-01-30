import Image from "next/image";
import Link from "next/link";
import { getWishlist } from "@/actions/wishlist-actions";
import WishlistActions from "@/components/wishlist/wishlist-actions";
import {
  Hammer,
  Heart,
  ArrowLeft,
  PackageSearch,
  Activity,
} from "lucide-react";

export default async function WishlistPage() {
  const wishlist = await getWishlist();
  const items = wishlist?.wishlist?.items.map((item) => item.product) || [];

  return (
    <div
      className="min-h-screen flex flex-col bg-background relative overflow-hidden"
      dir="rtl"
    >
      {/* GLOBAL GRID OVERLAY */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[32px_32px]" />

      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {items.length === 0 ? (
            /* EMPTY INVENTORY STATE */
            <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-foreground/10 bg-muted/5">
              <div className="w-20 h-20 bg-muted flex items-center justify-center mb-8 border-2 border-foreground/10">
                <Heart className="w-10 h-10 text-foreground/20" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 mb-2">
                Null_Selection_Logged
              </p>
              <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">
                قائمة الأمنيات فارغة
              </h1>
              <p className="text-sm font-bold text-muted-foreground mb-10 max-w-sm text-center uppercase tracking-tight">
                لم يتم تسجيل أي وحدات في ملف المفضلة الخاص بك حتى الآن.
              </p>
              <Link
                href="/products"
                className="group flex items-center gap-3 bg-foreground text-background px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
              >
                تصفح السجل{" "}
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : (
            <>
              {/* HEADER MANIFEST */}
              <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b-2 border-foreground pb-8 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-primary font-mono text-[10px] font-black tracking-[0.3em] uppercase">
                    <Activity className="w-3 h-3" />
                    USER_WISHLIST_V.01
                  </div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter">
                    قائمة الأمنيات
                  </h1>
                </div>
                <div className="bg-foreground text-background px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                  Total_Units: {items.length.toString().padStart(2, "0")}
                </div>
              </div>

              {/* PRODUCT REGISTER GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-t border-r border-foreground/10">
                {items.map((product) => {
                  const originalPrice = product.price
                    ? Number(product.price)
                    : null;
                  const currentPrice = product.salePrice
                    ? Number(product.salePrice)
                    : Number(product.price);
                  const hasOffer =
                    originalPrice && currentPrice < originalPrice;
                  const savePercent = hasOffer
                    ? Math.round(
                        ((originalPrice - currentPrice) / originalPrice) * 100,
                      )
                    : null;

                  return (
                    <div
                      key={product.id}
                      className="group bg-background border-l border-b border-foreground/10 flex flex-col h-full hover:bg-muted/5 transition-colors relative"
                    >
                      {/* UNIT IMAGE MODULE */}
                      <Link
                        href={`/products/${product.id}`}
                        className="relative aspect-square overflow-hidden bg-muted/20"
                      >
                        {/* Image Blueprint Grid Overlay */}
                        <div className="absolute inset-0 z-10 opacity-10 pointer-events-none border-[0.5px] border-foreground/20" />

                        <Image
                          src={product.images?.[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        />

                        {/* Condition Stamp */}
                        {hasOffer && (
                          <div className="absolute top-0 right-0 z-20 bg-offer text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                            SAVE_{savePercent}%
                          </div>
                        )}
                      </Link>

                      {/* UNIT SPECIFICATIONS */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.label && (
                            <span className="border border-primary text-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-widest">
                              {product.label.replace("_", " ")}
                            </span>
                          )}
                          {product.isCustomizable && (
                            <span className="bg-foreground text-background px-2 py-0.5 text-[9px] font-black flex items-center gap-1 uppercase tracking-widest">
                              <Hammer className="w-3 h-3" /> CUSTOM
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/products/${product.id}`}
                          className="block mb-2"
                        >
                          <h3 className="font-black text-sm text-foreground hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight leading-tight">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="text-[11px] font-bold text-muted-foreground line-clamp-2 flex-1 mb-6 opacity-60">
                          {product.briefDescription}
                        </p>

                        {/* VALUATION BLOCK */}
                        <div className="mb-6 pt-4 border-t border-foreground/5">
                          <span className="text-[8px] font-mono font-black opacity-30 uppercase tracking-[0.2em] block mb-1">
                            Unit_Valuation
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="font-black text-xl tracking-tighter">
                              {currentPrice.toLocaleString("ar-EG")}
                            </span>
                            <span className="text-[10px] font-mono font-black opacity-40">
                              EGP
                            </span>

                            {originalPrice && hasOffer && (
                              <span className="text-xs text-muted-foreground line-through opacity-40">
                                {originalPrice.toLocaleString("ar-EG")}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* REMOVE/ACTION MODULE */}
                        <div className="mt-auto pt-4 border-t border-foreground/10">
                          <WishlistActions productId={product.id} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
