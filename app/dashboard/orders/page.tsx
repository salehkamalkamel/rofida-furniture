"use client"

import { useState } from 'react'
import Image from 'next/image'

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
  customer: {
    name: string
    email: string
    phone: string
  }
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  statusText: string
  total: number
  items: OrderItem[]
  address: string
}

const mockOrders: Order[] = [
  {
    id: 'ORD-007',
    date: '2026-01-19',
    customer: { name: 'محمد علي', email: 'mohamed@email.com', phone: '+20 111 222 3333' },
    status: 'pending',
    statusText: 'قيد الانتظار',
    total: 2599,
    items: [
      { name: 'طاولة قهوة مينيمال', nameEn: 'MINIMAL', quantity: 2, price: 1299, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200&h=200&fit=crop' }
    ],
    address: 'شارع الهرم، الجيزة'
  },
  {
    id: 'ORD-006',
    date: '2026-01-18',
    customer: { name: 'فاطمة أحمد', email: 'fatma@email.com', phone: '+20 100 200 3000' },
    status: 'processing',
    statusText: 'قيد التجهيز',
    total: 4999,
    items: [
      { name: 'أريكة نورديك', nameEn: 'NORDIK', quantity: 1, price: 4999, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop' }
    ],
    address: 'المعادي، القاهرة'
  },
  {
    id: 'ORD-005',
    date: '2026-01-17',
    customer: { name: 'أحمد محمود', email: 'ahmed.m@email.com', phone: '+20 122 333 4444' },
    status: 'shipped',
    statusText: 'تم الشحن',
    total: 899,
    items: [
      { name: 'مصباح أرضي ستوكهولم', nameEn: 'STOCKHOLM', quantity: 1, price: 899, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' }
    ],
    address: 'الزمالك، القاهرة'
  },
  {
    id: 'ORD-004',
    date: '2026-01-16',
    customer: { name: 'سارة حسن', email: 'sara@email.com', phone: '+20 155 666 7777' },
    status: 'delivered',
    statusText: 'تم التوصيل',
    total: 1299,
    items: [
      { name: 'طاولة قهوة مينيمال', nameEn: 'MINIMAL', quantity: 1, price: 1299, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200&h=200&fit=crop' }
    ],
    address: 'مدينة نصر، القاهرة'
  },
  {
    id: 'ORD-003',
    date: '2026-01-15',
    customer: { name: 'أحمد محمد', email: 'ahmed@email.com', phone: '+20 123 456 7890' },
    status: 'delivered',
    statusText: 'تم التوصيل',
    total: 5598,
    items: [
      { name: 'أريكة نورديك', nameEn: 'NORDIK', quantity: 1, price: 4999, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop' },
      { name: 'كرسي طعام أوسلو', nameEn: 'OSLO', quantity: 1, price: 599, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=200&h=200&fit=crop' }
    ],
    address: 'وسط البلد، القاهرة'
  },
  {
    id: 'ORD-002',
    date: '2026-01-10',
    customer: { name: 'منى عبدالله', email: 'mona@email.com', phone: '+20 188 999 0000' },
    status: 'cancelled',
    statusText: 'ملغي',
    total: 3499,
    items: [
      { name: 'سرير كوبنهاجن', nameEn: 'COPENHAGEN', quantity: 1, price: 3499, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&h=200&fit=crop' }
    ],
    address: 'الدقي، الجيزة'
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

const statusOptions: { value: Order['status']; label: string }[] = [
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'processing', label: 'قيد التجهيز' },
  { value: 'shipped', label: 'تم الشحن' },
  { value: 'delivered', label: 'تم التوصيل' },
  { value: 'cancelled', label: 'ملغي' }
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.includes(searchQuery) ||
                         order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

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

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    const statusTextMap: Record<Order['status'], string> = {
      pending: 'قيد الانتظار',
      processing: 'قيد التجهيز',
      shipped: 'تم الشحن',
      delivered: 'تم التوصيل',
      cancelled: 'ملغي'
    }
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, statusText: statusTextMap[newStatus] }
        : order
    ))
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus, statusText: statusTextMap[newStatus] })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">الطلبات</h1>
        <p className="text-muted-foreground">إدارة طلبات المتجر</p>
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
              placeholder="البحث برقم الطلب أو اسم العميل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pr-10 pl-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
          className="h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {statusFilters.map(filter => (
            <option key={filter.value} value={filter.value}>{filter.label}</option>
          ))}
        </select>
      </div>

      {/* Orders Count */}
      <p className="text-sm text-muted-foreground">
        عرض {filteredOrders.length} من {orders.length} طلب
      </p>

      {/* Orders Table */}
      <div className="bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">رقم الطلب</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">العميل</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">التاريخ</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">المجموع</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">الحالة</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.items.length} منتج</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {new Date(order.date).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{order.total.toLocaleString('ar-EG')} جنيه</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className={`px-3 py-1 text-xs font-medium border-0 cursor-pointer ${getStatusColor(order.status)}`}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="عرض التفاصيل"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-muted-foreground">لا توجد طلبات مطابقة</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">تفاصيل الطلب #{selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-muted transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-muted-foreground">الحالة</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as Order['status'])}
                  className={`px-3 py-1 text-sm font-medium border-0 cursor-pointer ${getStatusColor(selectedOrder.status)}`}
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="font-medium text-foreground mb-3">معلومات العميل</h4>
                <div className="bg-muted p-4 space-y-2">
                  <p className="text-foreground">{selectedOrder.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer.phone}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.address}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-foreground mb-3">المنتجات</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-muted p-4">
                      <div className="relative w-16 h-16 bg-background flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.nameEn}</p>
                        <p className="text-sm text-muted-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-foreground">
                        {(item.price * item.quantity).toLocaleString('ar-EG')} جنيه
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-bold text-foreground">المجموع الكلي</span>
                <span className="text-xl font-bold text-foreground">
                  {selectedOrder.total.toLocaleString('ar-EG')} جنيه
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 h-12 bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
                  طباعة الفاتورة
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 h-12 border border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
