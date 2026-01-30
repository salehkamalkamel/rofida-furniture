import HeroCarousel from "@/components/hero-carousel";
import CategoriesSection from "@/components/categories-section";
import ProductsSection from "@/components/products-section";
import SectionDivider from "@/components/section-divider";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[40px_40px]" />

      <main className="flex-1 relative z-10" dir="rtl">
        {/* PAGE SYSTEM IDENTIFIER */}
        <div className="hidden lg:flex absolute left-8 top-1/2 -rotate-90 origin-left items-center gap-4 opacity-20 pointer-events-none">
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">
            System_Interface_v1.0.4
          </span>
          <div className="w-12 h-px bg-foreground" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">
            NORDIC_HOME_STATION
          </span>
        </div>

        {/* HERO MODULE */}
        <section className="border-b-4 border-foreground">
          <HeroCarousel />
        </section>

        {/* CATEGORY DIRECTORY */}
        <section className="py-12 sm:py-20">
          <CategoriesSection />
        </section>

        <SectionDivider />

        {/* BEST SELLERS LEDGER */}
        <section className="py-12 sm:py-20 bg-muted/5">
          <ProductsSection
            title="الأكثر مبيعاً"
            label="new_arrival"
            viewAllLink="/products?label=best_seller"
          />
        </section>

        <SectionDivider />

        {/* SPECIAL OFFERS (Treated as 'Flash_Manifest') */}
        <section className="py-12 sm:py-20">
          <div className="absolute left-0 right-0 h-full w-full bg-primary/5 -skew-y-2 pointer-events-none" />
          <ProductsSection
            title="عروض خاصة"
            label="new_arrival"
            limit={8}
            viewAllLink="/products?label=on_sale"
          />
        </section>

        <SectionDivider />

        {/* NEW ARRIVALS (Treated as 'New_Registry') */}
        <section className="py-12 sm:py-20">
          <ProductsSection
            title="وصل حديثاً"
            label="new_arrival"
            viewAllLink="/products?label=new"
          />
        </section>

        {/* FINAL SYSTEM INTERRUPT */}
        <SectionDivider />
      </main>

      {/* FOOTER COORDINATES (Visual Decoy) */}
      <div className="hidden md:flex justify-between px-10 py-4 border-t border-foreground/5 opacity-20 text-[8px] font-mono font-bold uppercase tracking-[0.3em]">
        <span>Lat: 30.0444° N / Long: 31.2357° E</span>
        <span>© ROVIDA_INDUSTRIAL_GROUP_2026</span>
        <span>Status: System_Operational</span>
      </div>
    </div>
  );
}
