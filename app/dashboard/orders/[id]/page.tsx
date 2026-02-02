import { Suspense } from "react";
import Link from "next/link";
import OrderDetailsSkeleton from "@/components/skeleton/account-order-details-skeleton";
import AdminOrderDetailsContent from "@/components/dashboard/admin-order-details-content";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailsPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link
              href="/dashboard/orders"
              className="hover:text-foreground transition-colors"
            >
              لوحة التحكم
            </Link>
            <span>/</span>
            <Link
              href="/dashboard/orders"
              className="hover:text-foreground transition-colors"
            >
              الطلبات
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">
              تفاصيل الطلب #{id}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            إدارة الطلب #{id}
          </h1>
        </div>
      </div>

      <Suspense fallback={<OrderDetailsSkeleton />}>
        <AdminOrderDetailsContent orderId={id} />
      </Suspense>
    </div>
  );
}
