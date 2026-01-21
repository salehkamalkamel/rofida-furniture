"use client"

import Link from 'next/link'
import ProductCard from '@/components/product-card'
import type { Product } from '@/lib/data'

interface ProductsSectionProps {
  title: string
  products: Product[]
  viewAllLink?: string
}

export default function ProductsSection({ title, products, viewAllLink }: ProductsSectionProps) {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              عرض الكل
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
