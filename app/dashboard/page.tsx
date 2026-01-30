"use client"

import Link from 'next/link'

const stats = [
  { name: 'إجمالي المنتجات', value: '124', change: '+12%', href: '/admin/products' },
  { name: 'الطلبات الجديدة', value: '45', change: '+8%', href: '/admin/orders' },
  { name: 'المستخدمين', value: '1,234', change: '+23%', href: '/admin/users' },
  { name: 'الإيرادات الشهرية', value: '156,890', suffix: 'جنيه', change: '+15%', href: '/admin/orders' }
]

const recentOrders = [
  { id: 'ORD-007', customer: 'محمد علي', total: 2599, status: 'pending', statusText: 'قيد الانتظار' },
  { id: 'ORD-006', customer: 'فاطمة أحمد', total: 4999, status: 'processing', statusText: 'قيد التجهيز' },
  { id: 'ORD-005', customer: 'أحمد محمود', total: 899, status: 'shipped', statusText: 'تم الشحن' },
  { id: 'ORD-004', customer: 'سارة حسن', total: 1299, status: 'delivered', statusText: 'تم التوصيل' }
]

const topProducts = [
  { name: 'أريكة نورديك', sales: 45, revenue: 224955 },
  { name: 'سرير كوبنهاجن', sales: 38, revenue: 132962 },
  { name: 'كرسي طعام أوسلو', sales: 67, revenue: 40133 },
  { name: 'طاولة قهوة مينيمال', sales: 52, revenue: 67548 }
]

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-success/10 text-success'
      case 'shipped':
        return 'bg-primary/20 text-primary-foreground'
      case 'processing':
        return 'bg-secondary/20 text-secondary-foreground'
      case 'pending':
        return 'bg-muted text-muted-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
        <p className="text-muted-foreground">نظرة عامة على أداء المتجر</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href} className="bg-background p-6 hover:shadow-md transition-shadow">
            <p className="text-sm text-muted-foreground">{stat.name}</p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {stat.value}
              {stat.suffix && <span className="text-lg font-normal mr-1">{stat.suffix}</span>}
            </p>
            <p className="text-sm text-success mt-2">{stat.change} من الشهر الماضي</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-background p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">أحدث الطلبات</h2>
            <Link href="/admin/orders" className="text-sm text-primary hover:underline">
              عرض الكل
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">{order.total.toLocaleString('ar-EG')} جنيه</p>
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.statusText}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-background p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">المنتجات الأكثر مبيعاً</h2>
            <Link href="/admin/products" className="text-sm text-primary hover:underline">
              عرض الكل
            </Link>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={product.name} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                <span className="w-8 h-8 bg-muted flex items-center justify-center text-sm font-bold text-foreground">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.sales} مبيعة</p>
                </div>
                <p className="font-medium text-foreground">
                  {product.revenue.toLocaleString('ar-EG')} جنيه
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-background p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">إجراءات سريعة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/admin/products/new"
            className="flex flex-col items-center gap-2 p-4 border border-border hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-sm font-medium text-foreground">إضافة منتج</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex flex-col items-center gap-2 p-4 border border-border hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-sm font-medium text-foreground">إدارة الطلبات</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex flex-col items-center gap-2 p-4 border border-border hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium text-foreground">إدارة المستخدمين</span>
          </Link>
          <Link
            href="/"
            className="flex flex-col items-center gap-2 p-4 border border-border hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-sm font-medium text-foreground">معاينة الموقع</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
