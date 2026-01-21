import Header from '@/components/header'
import Footer from '@/components/footer'
import HeroCarousel from '@/components/hero-carousel'
import CategoriesSection from '@/components/categories-section'
import ProductsSection from '@/components/products-section'
import { products } from '@/lib/data'

export default function HomePage() {
  const newProducts = products.filter(p => p.isNew)
  const offerProducts = products.filter(p => p.isLimitedOffer)
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Categories Quick Nav */}
        <CategoriesSection />

        {/* Divider */}
        <div className="border-t border-border" />

        {/* New Arrivals */}
        <ProductsSection 
          title="وصل حديثاً" 
          products={newProducts} 
          viewAllLink="/products?filter=new"
        />

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Offers Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">عروض خاصة</h2>
                <p className="text-muted-foreground mt-1">خصومات حصرية لفترة محدودة</p>
              </div>
              <a
                href="/products?filter=offers"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                عرض الكل
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerProducts.map((product) => (
                <div key={product.id} className="bg-background">
                  <a href={`/products/${product.id}`} className="block">
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-offer text-offer-foreground px-2 py-1 text-xs font-bold">
                          خصم {product.discount}%
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-foreground">{product.nameEn}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-foreground">
                          {product.price.toLocaleString('ar-EG')} جنيه
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString('ar-EG')}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Featured Products */}
        <ProductsSection 
          title="منتجات مميزة" 
          products={featuredProducts} 
          viewAllLink="/products"
        />

        {/* Banner Section */}
        <section className="py-12 bg-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-right">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  اشترك في نشرتنا البريدية
                </h2>
                <p className="text-muted-foreground max-w-md">
                  احصل على آخر العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني
                </p>
              </div>
              <div className="flex w-full max-w-md">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="flex-1 h-12 px-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="h-12 px-6 bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
                  اشتراك
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
