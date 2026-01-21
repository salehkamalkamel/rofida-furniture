"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductCard from '@/components/product-card'
import { products, type Product } from '@/lib/data'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'

interface ProductDetailContentProps {
  product: Product
  similarProducts: Product[]
}

function ProductDetailContent({ product, similarProducts }: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { addItem } = useCart()
  const { isInWishlist, toggleItem } = useWishlist()

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        nameEn: product.nameEn,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        color: product.colors[selectedColor]?.name
      })
    }
  }

  const handleToggleWishlist = () => {
    toggleItem({
      id: product.id,
      name: product.name,
      nameEn: product.nameEn,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      description: product.description
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground transition-colors">المنتجات</Link>
            <span>/</span>
            <Link href={`/products?category=${product.categoryId}`} className="hover:text-foreground transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images - Right Side (RTL) */}
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px]">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 border-2 transition-colors ${
                      selectedImage === index ? 'border-foreground' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - صورة ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 aspect-square lg:aspect-auto lg:h-[600px] bg-muted overflow-hidden group">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 text-foreground flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="الصورة التالية"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 text-foreground flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="الصورة السابقة"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Info - Left Side (RTL) */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              {/* Wishlist Button */}
              <div className="flex justify-start mb-4">
                <button
                  onClick={handleToggleWishlist}
                  className="p-2 hover:bg-muted transition-colors"
                  aria-label={inWishlist ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                >
                  <svg 
                    className={`w-6 h-6 ${inWishlist ? 'fill-offer text-offer' : 'text-foreground'}`} 
                    fill={inWishlist ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-foreground mb-1">{product.nameEn}</h1>
              <p className="text-muted-foreground mb-4">{product.description}</p>

              {/* Price */}
              <div className="mb-4">
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through text-lg">
                    {product.originalPrice.toLocaleString('ar-EG')}جنيه
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{product.price.toLocaleString('ar-EG')}</span>
                  <span className="text-lg text-foreground">جنيه</span>
                </div>
              </div>

              {/* Discount Badge */}
              {product.discount && (
                <p className="text-offer font-medium mb-2">
                  {product.discount}% خصم ، وفر {((product.originalPrice || 0) - product.price).toLocaleString('ar-EG')}جنيه
                </p>
              )}

              {product.isLimitedOffer && (
                <p className="text-sm text-muted-foreground mb-4">عرض لفترة محدودة</p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= Math.floor(product.rating) ? 'text-foreground fill-foreground' : 'text-border'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-2">اختر لون</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.colors[selectedColor].name}</p>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-12 h-12 border-2 transition-colors ${
                          selectedColor === index ? 'border-foreground' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Info */}
              <div className="border border-border p-4 mb-6">
                <h3 className="font-medium text-foreground mb-4">كيفية الحصول عليها</h3>
                
                <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
                  <svg className="w-6 h-6 text-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-foreground">التوصيل</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-sm text-muted-foreground">متاح</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">تجد جميع الخيارات عند الدفع</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <p className="font-medium text-foreground">استلام من المتجر</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-sm text-muted-foreground">متوفر</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">فرع القاهرة - متجر دار</p>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4">
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                    aria-label="تقليل الكمية"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-12 h-12 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                    aria-label="زيادة الكمية"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  أضف إلى عربة التسوق
                </button>
              </div>

              {/* Product Details */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-bold text-foreground mb-4">تفاصيل المنتج</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{product.fullDescription}</p>
                
                <div className="space-y-2">
                  {product.dimensions && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">الأبعاد</span>
                      <span className="text-foreground">{product.dimensions}</span>
                    </div>
                  )}
                  {product.material && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">المواد</span>
                      <span className="text-foreground">{product.material}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="border-t border-border py-12 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">منتجات مشابهة</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params
  const product = products.find(p => p.id === id)

  if (!product) {
    notFound()
  }

  const similarProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)

  return <ProductDetailContent product={product} similarProducts={similarProducts} />
}
