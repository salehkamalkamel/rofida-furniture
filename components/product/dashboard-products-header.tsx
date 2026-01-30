import Link from "next/link";

export default function DashboardProductsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">المنتجات</h1>
        <p className="text-muted-foreground">إدارة منتجات المتجر</p>
      </div>
      <Link
        href="/dashboard/products/new"
        className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        إضافة منتج جديد
      </Link>
    </div>
  );
}
