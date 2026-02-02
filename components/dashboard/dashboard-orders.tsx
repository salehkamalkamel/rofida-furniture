"use client";

import { useState } from "react";
import DashboardOrder from "./dashboard-order"; // The row component
import { OrderWithDetails } from "@/types/orders";

type OrderStatusFilter =
  | "all"
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

const statusFilters: { value: OrderStatusFilter; label: string }[] = [
  { value: "all", label: "جميع الطلبات" },
  { value: "pending", label: "قيد الانتظار" },
  { value: "processing", label: "قيد التجهيز" },
  { value: "shipped", label: "تم الشحن" },
  { value: "delivered", label: "تم التوصيل" },
  { value: "cancelled", label: "ملغي" },
];

export default function DashboardOrders({
  orders,
}: {
  orders: OrderWithDetails[];
}) {
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Client-side filtering logic
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      order.id.toString().includes(searchLower) ||
      order.user.name.toLowerCase().includes(searchLower) ||
      order.user.email.toLowerCase().includes(searchLower);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">الطلبات</h1>
        <p className="text-muted-foreground">إدارة طلبات المتجر</p>
      </div>

      {/* Filters */}
      <div className="bg-background p-4 flex flex-col sm:flex-row gap-4 rounded-lg border border-border">
        <div className="flex-1">
          <div className="relative">
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث برقم الطلب أو اسم العميل..."
              className="w-full h-12 pr-10 pl-4 bg-muted border-0 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatusFilter)}
          className="h-12 px-4 bg-muted border-0 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {statusFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Count */}
      <p className="text-sm text-muted-foreground">
        عرض {filteredOrders.length} من {orders.length} طلب
      </p>

      {/* Orders Table */}
      <div className="bg-background overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">
                  رقم الطلب
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">
                  العميل
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">
                  التاريخ
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">
                  المجموع
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">
                  الحالة
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <DashboardOrder key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-muted-foreground mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="text-muted-foreground">لا توجد طلبات مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );
}
