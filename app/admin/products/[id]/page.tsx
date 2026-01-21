"use client"

import React, { use } from "react"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { products, categories } from '@/lib/data'

interface ProductEditPageProps {
  params: Promise<{ id: string }>
}

export default function ProductEditPage({ params }: ProductEditPageProps) {
  const { id } = use(params)
  return <ProductEditContent productId={id} />
}

function ProductEditContent({ productId }: { productId: string }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  
  const product = products.find(p => p.id === productId)
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    nameEn: product?.nameEn || '',
    description: product?.description || '',
    fullDescription: product?.fullDescription || '',
    price: product?.price.toString() || '',
    originalPrice: product?.originalPrice?.toString() || '',
    discount: product?.discount?.toString() || '',
    categoryId: product?.categoryId || '',
    dimensions: product?.dimensions || '',
    material: product?.material || '',
    inStock: product?.inStock ?? true,
    isNew: product?.isNew || false,
    isLimitedOffer: product?.isLimitedOffer || false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      router.push('/admin/products')
    }, 1000)
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-foreground mb-4">المنتج غير موجود</h1>
        <Link href="/admin/products" className="text-primary hover:underline">
          العودة للمنتجات
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 hover:bg-muted transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">تعديل المنتج</h1>
          <p className="text-muted-foreground">#{productId}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-background p-6 space-y-4 border border-border">
            <h2 className="font-bold text-foreground">المعلومات الأساسية</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  اسم المنتج (عربي)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  اسم المنتج (إنجليزي)
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                وصف مختصر
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                الوصف التفصيلي
              </label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                الفئة
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">اختر فئة</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-background p-6 space-y-4 border border-border">
            <h2 className="font-bold text-foreground">التسعير</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  السعر (جنيه)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  السعر الأصلي (اختياري)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  نسبة الخصم %
                </label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          <div className="bg-background p-6 space-y-4 border border-border">
            <h2 className="font-bold text-foreground">المواصفات</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  الأبعاد
                </label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="مثال: 220 × 90 × 85 سم"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  المواد
                </label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="مثال: خشب بلوط، قماش"
                />
              </div>
            </div>
          </div>

          <div className="bg-background p-6 space-y-4 border border-border">
            <h2 className="font-bold text-foreground">صور المنتج</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {product.images.map((image, idx) => (
                <div key={idx} className="relative aspect-square bg-muted group">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`صورة ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 left-2 p-1 bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="aspect-square bg-muted flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border hover:border-primary transition-colors"
              >
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-xs text-muted-foreground">إضافة صورة</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-background p-6 space-y-4 border border-border">
            <h2 className="font-bold text-foreground">الحالة</h2>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
                <span className="text-sm text-foreground">متوفر في المخزون</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
                <span className="text-sm text-foreground">منتج جديد</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isLimitedOffer}
                  onChange={(e) => setFormData({ ...formData, isLimitedOffer: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
                <span className="text-sm text-foreground">عرض محدود</span>
              </label>
            </div>
          </div>

          <div className="bg-background p-6 space-y-4 border border-border">
            <h2 className="font-bold text-foreground">معاينة</h2>
            <div className="relative aspect-square bg-muted">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-foreground">{formData.nameEn || product.nameEn}</p>
              <p className="text-sm text-muted-foreground">{formData.name || product.name}</p>
              <p className="text-lg font-bold text-foreground mt-2">
                {Number(formData.price || product.price).toLocaleString('ar-EG')} جنيه
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full h-12 bg-foreground text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
            <Link
              href="/admin/products"
              className="w-full h-12 border border-border text-foreground font-medium hover:bg-muted transition-colors flex items-center justify-center"
            >
              إلغاء
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
