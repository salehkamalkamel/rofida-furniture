"use client"

import { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'

// Order status types
type OrderStatus = 'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

interface OrderItem {
  name: string
  nameEn: string
  quantity: number
  price: number
  image: string
}

interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  statusText: string
  total: number
  items: OrderItem[]
}

// Mock orders data with more statuses
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2026-01-15',
    status: 'delivered',
    statusText: 'تم التوصيل',
    total: 5598,
    items: [
      { name: 'أريكة نورديك', nameEn: 'NORDIK', quantity: 1, price: 4999, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop' },
      { name: 'كرسي طعام أوسلو', nameEn: 'OSLO', quantity: 1, price: 599, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=200&h=200&fit=crop' }
    ]
  },
  {
    id: 'ORD-002',
    date: '2026-01-10',
    status: 'processing',
    statusText: 'قيد التجهيز',
    total: 1899,
    items: [
      { name: 'مكتب عمل هلسنكي', nameEn: 'HELSINKI', quantity: 1, price: 1899, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&h=200&fit=crop' }
    ]
  },
  {
    id: 'ORD-003',
    date: '2025-12-20',
    status: 'delivered',
    statusText: 'تم التوصيل',
    total: 3499,
    items: [
      { name: 'سرير كوبنهاجن', nameEn: 'COPENHAGEN', quantity: 1, price: 3499, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&h=200&fit=crop' }
    ]
  },
  {
    id: 'ORD-004',
    date: '2026-01-18',
    status: 'pending',
    statusText: 'قيد الانتظار',
    total: 2598,
    items: [
      { name: 'طاولة قهوة مينيمال', nameEn: 'MINIMAL', quantity: 2, price: 1299, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200&h=200&fit=crop' }
    ]
  },
  {
    id: 'ORD-005',
    date: '2026-01-12',
    status: 'shipped',
    statusText: 'تم الشحن',
    total: 899,
    items: [
      { name: 'مصباح أرضي ستوكهولم', nameEn: 'STOCKHOLM', quantity: 1, price: 899, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' }
    ]
  },
  {
    id: 'ORD-006',
    date: '2025-11-15',
    status: 'cancelled',
    statusText: 'ملغي',
    total: 799,
    items: [
      { name: 'كرسي حديقة مالمو', nameEn: 'MALMO', quantity: 1, price: 799, image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=200&h=200&fit=crop' }
    ]
  }
]

const statusFilters: { value: OrderStatus; label: string }[] = [
  { value: 'all', label: 'جميع الطلبات' },
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'processing', label: 'قيد التجهيز' },
  { value: 'shipped', label: 'تم الشحن' },
  { value: 'delivered', label: 'تم التوصيل' },
  { value: 'cancelled', label: 'ملغي' }
]

type Tab = 'orders' | 'profile' | 'addresses'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('orders')
  const [isLoggedIn] = useState(true)
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('all')
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' ? true : order.status === statusFilter
  )

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-success/10 text-success'
      case 'shipped':
        return 'bg-primary/20 text-primary-foreground'
      case 'processing':
        return 'bg-secondary/20 text-secondary-foreground'
      case 'pending':
        return 'bg-muted text-muted-foreground'
      case 'cancelled':
        return 'bg-offer/10 text-offer'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const canCancelOrder = (status: Order['status']) => {
    return status === 'pending' || status === 'processing'
  }

  const canDeleteOrder = (status: Order['status']) => {
    return status === 'delivered' || status === 'cancelled'
  }

  const handleCancelOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'cancelled' as const, statusText: 'ملغي' }
        : order
    ))
    setShowCancelModal(null)
  }

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId))
    setShowDeleteModal(null)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background flex items-center justify-center">
          <div className="w-full max-w-md px-4">
            <div className="bg-muted p-8">
              <h1 className="text-2xl font-bold text-foreground text-center mb-6">تسجيل الدخول</h1>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full h-12 px-4 bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full h-12 px-4 bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-12 bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
                >
                  تسجيل الدخول
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  ليس لديك حساب؟{' '}
                  <a href="#" className="text-foreground hover:underline">إنشاء حساب جديد</a>
                </p>
              </div>
            </div>
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
          <h1 className="text-2xl font-bold text-foreground mb-8">حسابي</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-muted p-6">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-16 h-16 bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    أ
                  </div>
                  <div>
                    <p className="font-bold text-foreground">أحمد محمد</p>
                    <p className="text-sm text-muted-foreground">ahmed@email.com</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === 'orders'
                        ? 'bg-background text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    طلباتي
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-background text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    الملف الشخصي
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === 'addresses'
                        ? 'bg-background text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    العناوين
                  </button>
                </nav>

                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-offer hover:bg-background transition-colors mt-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  تسجيل الخروج
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-lg font-bold text-foreground">طلباتي</h2>
                    
                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                      <label htmlFor="status-filter" className="text-sm text-muted-foreground">
                        تصفية حسب:
                      </label>
                      <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
                        className="h-10 px-4 bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {statusFilters.map(filter => (
                          <option key={filter.value} value={filter.value}>
                            {filter.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Orders Count */}
                  <p className="text-sm text-muted-foreground">
                    عرض {filteredOrders.length} من {orders.length} طلب
                  </p>
                  
                  {filteredOrders.length === 0 ? (
                    <div className="bg-muted p-12 text-center">
                      <svg className="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <p className="text-muted-foreground">لا توجد طلبات بهذه الحالة</p>
                    </div>
                  ) : (
                    filteredOrders.map((order) => (
                      <div key={order.id} className="bg-muted p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-border">
                          <div>
                            <p className="font-bold text-foreground">طلب #{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('ar-EG', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.statusText}
                            </span>
                            <p className="font-bold text-foreground">
                              {order.total.toLocaleString('ar-EG')} جنيه
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="relative w-16 h-16 bg-background flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground">{item.nameEn}</p>
                                <p className="text-sm text-muted-foreground">{item.name}</p>
                                <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                              </div>
                              <p className="font-medium text-foreground">
                                {item.price.toLocaleString('ar-EG')} جنيه
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Order Actions */}
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                          {canCancelOrder(order.status) && (
                            <button
                              onClick={() => setShowCancelModal(order.id)}
                              className="px-4 py-2 text-sm font-medium text-offer border border-offer hover:bg-offer hover:text-offer-foreground transition-colors"
                            >
                              إلغاء الطلب
                            </button>
                          )}
                          {canDeleteOrder(order.status) && (
                            <button
                              onClick={() => setShowDeleteModal(order.id)}
                              className="px-4 py-2 text-sm font-medium text-muted-foreground border border-border hover:bg-muted transition-colors"
                            >
                              حذف من السجل
                            </button>
                          )}
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 text-sm font-medium text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors">
                              إعادة الطلب
                            </button>
                          )}
                          {order.status === 'shipped' && (
                            <button className="px-4 py-2 text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                              تتبع الشحنة
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-muted p-6">
                  <h2 className="text-lg font-bold text-foreground mb-6">الملف الشخصي</h2>
                  
                  <form className="space-y-4 max-w-md">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        id="name"
                        defaultValue="أحمد محمد"
                        className="w-full h-12 px-4 bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="profile-email" className="block text-sm font-medium text-foreground mb-1">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        id="profile-email"
                        defaultValue="ahmed@email.com"
                        className="w-full h-12 px-4 bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        defaultValue="+20 123 456 7890"
                        className="w-full h-12 px-4 bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-12 px-8 bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
                    >
                      حفظ التغييرات
                    </button>
                  </form>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">العناوين المحفوظة</h2>
                    <button className="text-sm font-medium text-primary hover:underline">
                      إضافة عنوان جديد
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Address Card */}
                    <div className="bg-muted p-6 relative">
                      <span className="absolute top-4 left-4 text-xs bg-foreground text-background px-2 py-1">
                        الافتراضي
                      </span>
                      <h3 className="font-bold text-foreground mb-2">المنزل</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        أحمد محمد<br />
                        123 شارع التحرير<br />
                        وسط البلد، القاهرة<br />
                        مصر<br />
                        +20 123 456 7890
                      </p>
                      <div className="flex gap-4 mt-4">
                        <button className="text-sm text-foreground hover:underline">تعديل</button>
                        <button className="text-sm text-muted-foreground hover:text-foreground">حذف</button>
                      </div>
                    </div>

                    {/* Address Card */}
                    <div className="bg-muted p-6">
                      <h3 className="font-bold text-foreground mb-2">العمل</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        أحمد محمد<br />
                        456 شارع الجيزة<br />
                        الدقي، الجيزة<br />
                        مصر<br />
                        +20 987 654 3210
                      </p>
                      <div className="flex gap-4 mt-4">
                        <button className="text-sm text-foreground hover:underline">تعديل</button>
                        <button className="text-sm text-muted-foreground hover:text-foreground">حذف</button>
                        <button className="text-sm text-primary hover:underline">تعيين كافتراضي</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-foreground mb-4">إلغاء الطلب</h3>
            <p className="text-muted-foreground mb-6">
              هل أنت متأكد من إلغاء هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCancelModal(null)}
                className="px-4 py-2 text-sm font-medium text-foreground border border-border hover:bg-muted transition-colors"
              >
                تراجع
              </button>
              <button
                onClick={() => handleCancelOrder(showCancelModal)}
                className="px-4 py-2 text-sm font-medium bg-offer text-offer-foreground hover:opacity-90 transition-opacity"
              >
                إلغاء الطلب
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Order Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-foreground mb-4">حذف الطلب من السجل</h3>
            <p className="text-muted-foreground mb-6">
              هل تريد حذف هذا الطلب من سجل طلباتك؟ سيتم إزالته من القائمة.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 text-sm font-medium text-foreground border border-border hover:bg-muted transition-colors"
              >
                تراجع
              </button>
              <button
                onClick={() => handleDeleteOrder(showDeleteModal)}
                className="px-4 py-2 text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
