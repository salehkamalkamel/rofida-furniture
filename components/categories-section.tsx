"use client"

import Link from 'next/link'
import Image from 'next/image'
import { categories } from '@/lib/data'

export default function CategoriesSection() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground mb-8">تسوق حسب الفئة</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square bg-muted overflow-hidden mb-3 relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 12.5vw"
                />
              </div>
              <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {category.productCount} منتج
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
