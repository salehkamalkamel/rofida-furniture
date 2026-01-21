"use client"

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { categories } from '@/lib/data'

export default function NewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    description: '',
    fullDescription: '',
    price: '',
    originalPrice: '',
    discount: '',
    categoryId: '',
    dimensions: '',
    material: '',
    inStock: true,
    isNew: true,
    isLimitedOffer: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // Simulate save
    setTimeout(() => {
      setSaving(false)
      router.push('/admin/products')
    }, 1000)
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
          <h1 className="text-2xl font-bold text-foreground">إضافة منتج جديد</h1>
          <p className="text-muted-foreground">أضف منتج جديد للمتجر</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-background p-6 space-y-4">
            <h2 className="font-bold text-foreground">المعلومات الأساسية</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  اسم المنتج (عربي) <span className="text-offer">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  placeholder="مثال: أريكة عصرية"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  اسم المنتج (إنجليزي) <span className="text-offer">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  placeholder="Example: MODERN"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                وصف مختصر <span className="text-offer">*</span>
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
                placeholder="وصف قصير يظهر في بطاقة المنتج"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                الوصف التفصيلي <span className="text-offer">*</span>
              </label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
                placeholder="وصف تفصيلي للمنتج يظهر في صفحة المنتج"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                الفئة <span className="text-offer">*</span>
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

          <div className="bg-background p-6 space-y-4">
            <h2 className="font-bold text-foreground">التسعير</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  السعر (جنيه) <span className="text-offer">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  min="0"
                  placeholder="0"
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
                  placeholder="0"
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
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-background p-6 space-y-4">
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

          <div className="bg-background p-6 space-y-4">
            <h2 className="font-bold text-foreground">صور المنتج</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button
                type="button"
                className="aspect-square bg-muted flex flex-col items-center justify-center gap-2 border-2 border-dashed border-primary"
              >
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-xs text-foreground">الصورة الرئيسية</span>
              </button>
              <button
                type="button"
                className="aspect-square bg-muted flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border hover:border-primary transition-colors"
              >
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-xs text-muted-foreground">إضافة صورة</span>
              </button>
              <button
                type="button"
                className="aspect-square bg-muted flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border hover:border-primary transition-colors"
              >
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-xs text-muted-foreground">إضافة صورة</span>
              </button>
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
            <p className="text-xs text-muted-foreground">
              الحد الأقصى للصورة 5 ميجابايت. يُفضل استخدام صور بأبعاد 800×600 بكسل أو أكبر.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-background p-6 space-y-4">
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

          <div className="bg-background p-6 space-y-4">
            <h2 className="font-bold text-foreground">معاينة</h2>
            <div className="relative aspect-square bg-muted flex items-center justify-center">
              <svg className="w-16 h-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-foreground">{formData.nameEn || 'اسم المنتج'}</p>
              <p className="text-sm text-muted-foreground">{formData.name || 'اسم المنتج بالعربي'}</p>
              <p className="text-lg font-bold text-foreground mt-2">
                {formData.price ? `${Number(formData.price).toLocaleString('ar-EG')} جنيه` : '0 جنيه'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full h-12 bg-foreground text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? 'جاري الحفظ...' : 'إضافة المنتج'}
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
