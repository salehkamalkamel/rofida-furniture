"use client"

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useCart } from '@/context/cart-context'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background flex items-center justify-center">
          <div className="text-center px-4">
            <svg className="w-24 h-24 mx-auto text-muted-foreground mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="text-2xl font-bold text-foreground mb-2">عربة التسوق فارغة</h1>
            <p className="text-muted-foreground mb-6">لم تقم بإضافة أي منتجات بعد</p>
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

  const deliveryFee = totalPrice >= 2000 ? 0 : 150
  const finalTotal = totalPrice + deliveryFee

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-8">عربة التسوق</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-muted">
                  {/* Image */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-background">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-foreground">{item.nameEn}</h3>
                        <p className="text-sm text-muted-foreground">{item.name}</p>
                        {item.color && (
                          <p className="text-sm text-muted-foreground mt-1">اللون: {item.color}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="إزالة المنتج"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-border bg-background">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                          aria-label="تقليل الكمية"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                          aria-label="زيادة الكمية"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-left">
                        {item.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {(item.originalPrice * item.quantity).toLocaleString('ar-EG')} جنيه
                          </p>
                        )}
                        <p className="font-bold text-foreground">
                          {(item.price * item.quantity).toLocaleString('ar-EG')} جنيه
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                إفراغ السلة
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-muted p-6 sticky top-24">
                <h2 className="font-bold text-foreground mb-4">ملخص الطلب</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span className="text-foreground">{totalPrice.toLocaleString('ar-EG')} جنيه</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">التوصيل</span>
                    <span className="text-foreground">
                      {deliveryFee === 0 ? 'مجاني' : `${deliveryFee.toLocaleString('ar-EG')} جنيه`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-muted-foreground">
                      التوصيل مجاني للطلبات فوق 2,000 جنيه
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">الإجمالي</span>
                    <span className="font-bold text-foreground text-lg">
                      {finalTotal.toLocaleString('ar-EG')} جنيه
                    </span>
                  </div>
                </div>

                <button className="w-full h-12 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                  إتمام الشراء
                </button>

                <Link
                  href="/products"
                  className="block text-center text-sm text-muted-foreground hover:text-foreground mt-4 transition-colors"
                >
                  متابعة التسوق
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
