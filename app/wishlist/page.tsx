"use client"

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useWishlist } from '@/context/wishlist-context'
import { useCart } from '@/context/cart-context'

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()

  const handleAddToCart = (item: typeof items[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      nameEn: item.nameEn,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background flex items-center justify-center">
          <div className="text-center px-4">
            <svg className="w-24 h-24 mx-auto text-muted-foreground mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h1 className="text-2xl font-bold text-foreground mb-2">قائمة الأمنيات فارغة</h1>
            <p className="text-muted-foreground mb-6">لم تقم بإضافة أي منتجات للمفضلة بعد</p>
            <Link
              href="/products"
              className="inline-block bg-foreground text-background px-8 py-3 font-medium hover:opacity-90 transition-opacity"
            >
              تصفح المنتجات
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-foreground">قائمة الأمنيات</h1>
            <p className="text-muted-foreground">{items.length} منتج</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-background border border-border">
                {/* Image */}
                <Link href={`/products/${item.id}`} className="block relative aspect-square bg-muted overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>

                {/* Details */}
                <div className="p-4">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-bold text-foreground hover:text-primary transition-colors">{item.nameEn}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{item.description}</p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {item.originalPrice.toLocaleString('ar-EG')} جنيه
                      </span>
                    )}
                    <p className="font-bold text-foreground">
                      {item.price.toLocaleString('ar-EG')} جنيه
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 h-10 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      أضف للسلة
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                      aria-label="إزالة من المفضلة"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
