"use client"

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductCard from '@/components/product-card'
import { products, categories } from '@/lib/data'
import Loading from './loading'

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const filterParam = searchParams.get('filter')

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [sortBy, setSortBy] = useState<string>('default')

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.categoryId === selectedCategory)
    }

    // Filter by special filters
    if (filterParam === 'new') {
      result = result.filter(p => p.isNew)
    } else if (filterParam === 'offers') {
      result = result.filter(p => p.isLimitedOffer)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew))
        break
      default:
        break
    }

    return result
  }, [selectedCategory, filterParam, sortBy])

  const currentCategory = categories.find(c => c.id === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        {/* Categories Bar */}
        <div className="border-b border-border bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 py-4 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  !selectedCategory
                    ? 'bg-foreground text-background'
                    : 'bg-background text-foreground hover:bg-border'
                }`}
              >
                جميع المنتجات
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-foreground text-background'
                      : 'bg-background text-foreground hover:bg-border'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {currentCategory ? currentCategory.name : 
                 filterParam === 'new' ? 'وصل حديثاً' : 
                 filterParam === 'offers' ? 'العروض' : 
                 'جميع المنتجات'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {filteredProducts.length} منتج
              </p>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm text-muted-foreground">ترتيب حسب:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-4 bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="default">الافتراضي</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
                <option value="rating">التقييم</option>
                <option value="newest">الأحدث</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h2 className="text-xl font-bold text-foreground mb-2">لا توجد منتجات</h2>
              <p className="text-muted-foreground">لم نجد منتجات تطابق معايير البحث الخاصة بك</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsContent />
    </Suspense>
  )
}
