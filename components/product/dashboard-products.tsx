"use client";

import { type Product } from "@/db/schema";
import DashboardProductsHeader from "@/components/product/dashboard-products-header";
import DashboardProductsFilters from "@/components/product/dashboard-products-filters";
import DashBoardProduct from "./dashboard-product";

export default function DashboardProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="space-y-6">
      <DashboardProductsHeader />
      {/* Filters */}
      <DashboardProductsFilters />

      {/* Products Count */}
      <p className="text-sm text-muted-foreground">
        عرض {products?.length} من {products?.length} منتج
      </p>

      {/* Products Table */}
      <div className="bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">
                  المنتج
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">
                  الفئة
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">
                  السعر
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">
                  المخزون
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <DashBoardProduct key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <p className="text-muted-foreground">لا توجد منتجات مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );
}
