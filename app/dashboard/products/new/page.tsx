import ProductForm from "@/components/product/product-form";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">إضافة منتج جديد</h1>
          <p className="text-muted-foreground">
            أنشئ منتجاً جديداً بجميع التفاصيل
          </p>
        </div>
        <Link
          href="/dashboard/products"
          className="text-sm text-muted-foreground hover:underline"
        >
          عودة للقائمة
        </Link>
      </div>

      {/* The Form */}
      <ProductForm />
    </div>
  );
}
