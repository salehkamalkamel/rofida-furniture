"use client"

import React from "react"

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import type { Product } from '@/lib/data'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { isInWishlist, toggleItem } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      nameEn: product.nameEn,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0]
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
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
    <Link href={`/products/${product.id}`} className="group block bg-background">
      {/* Image Container */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium">
              جديد
            </span>
          )}
          {product.isLimitedOffer && (
            <span className="bg-secondary text-secondary-foreground px-2 py-1 text-xs font-medium">
              عرض محدود
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-sm font-bold text-foreground mb-1">{product.nameEn}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{product.description}</p>

        {/* Price */}
        <div className="mb-2">
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through ml-2">
              {product.originalPrice.toLocaleString('ar-EG')}جنيه
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">{product.price.toLocaleString('ar-EG')}</span>
            <span className="text-sm text-foreground">جنيه</span>
          </div>
        </div>

        {/* Discount Info */}
        {product.discount && (
          <p className="text-sm text-offer font-medium mb-2">
            {product.discount}% خصم ، وفر {((product.originalPrice || 0) - product.price).toLocaleString('ar-EG')}جنيه
          </p>
        )}

        {product.isLimitedOffer && (
          <p className="text-xs text-muted-foreground mb-2">عرض لفترة محدودة</p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'text-foreground fill-foreground' : 'text-border'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* More Options */}
        {product.colors.length > 1 && (
          <p className="text-xs text-muted-foreground mb-3">المزيد من الخيارات</p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
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
          <button
            onClick={handleAddToCart}
            className="p-2 bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity"
            aria-label="أضف للسلة"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  )
}
