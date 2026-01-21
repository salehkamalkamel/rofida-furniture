"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products as initialProducts, categories, type Product } from '@/lib/data'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.includes(searchQuery) || 
                         product.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.categoryId === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId))
    setShowDeleteModal(null)
  }

  const handleToggleStock = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">المنتجات</h1>
          <p className="text-muted-foreground">إدارة منتجات المتجر</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          إضافة منتج جديد
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-background p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="البحث عن منتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pr-10 pl-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">جميع الفئات</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Products Count */}
      <p className="text-sm text-muted-foreground">
        عرض {filteredProducts.length} من {products.length} منتج
      </p>

      {/* Products Table */}
      <div className="bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">المنتج</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">الفئة</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">السعر</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">المخزون</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 bg-muted flex-shrink-0">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product.nameEn}</p>
                        <p className="text-sm text-muted-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">#{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{product.category}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{product.price.toLocaleString('ar-EG')} جنيه</p>
                      {product.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString('ar-EG')} جنيه
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStock(product.id)}
                      className={`px-3 py-1 text-xs font-medium ${
                        product.inStock 
                          ? 'bg-success/10 text-success' 
                          : 'bg-offer/10 text-offer'
                      }`}
                    >
                      {product.inStock ? 'متوفر' : 'غير متوفر'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="تعديل"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/products/${product.id}`}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="معاينة"
                        target="_blank"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => setShowDeleteModal(product.id)}
                        className="p-2 text-offer hover:bg-offer/10 transition-colors"
                        title="حذف"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-muted-foreground">لا توجد منتجات مطابقة</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-foreground mb-4">حذف المنتج</h3>
            <p className="text-muted-foreground mb-6">
              هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 text-sm font-medium text-foreground border border-border hover:bg-muted transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDeleteProduct(showDeleteModal)}
                className="px-4 py-2 text-sm font-medium bg-offer text-offer-foreground hover:opacity-90 transition-opacity"
              >
                حذف المنتج
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
