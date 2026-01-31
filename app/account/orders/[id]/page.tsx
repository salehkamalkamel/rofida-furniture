import { Suspense } from "react";
import Link from "next/link";
import OrderDetailsContent from "@/components/account/order-details-content";
import OrderDetailsSkeleton from "@/components/skeleton/account-order-details-skeleton";
// import { getMyOrders } from "@/actions/order-actions";

interface Props {
  params: Promise<{ id: string }>;
}

// export async function generateStaticParams() {
//   const orders = await getMyOrders();
//   return orders.map((order) => ({ id: order.id }));
// }

export default async function OrderDetailsPage({ params }: Props) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4" dir="rtl">
      {/* STATIC HEADER: Prerendered instantly */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link
              href="/account/orders"
              className="hover:text-foreground transition-colors"
            >
              طلباتي
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">تفاصيل الطلب</span>
          </div>
          {/* <h1 className="text-3xl font-bold tracking-tight">طلب #ORD-{id}</h1> */}
        </div>
      </div>

      {/* DYNAMIC HOLE: This waits for headers/DB */}
      <Suspense fallback={<OrderDetailsSkeleton />}>
        {params.then(({ id }) => (
          <OrderDetailsContent orderId={id} />
        ))}
      </Suspense>
    </div>
  );
}
