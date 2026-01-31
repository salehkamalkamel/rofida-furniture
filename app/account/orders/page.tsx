import OrdersLayout from "@/components/account/orders-layout";
import AccountOrdersSkeleton from "@/components/skeleton/account-orders-skeleton";
import { Suspense } from "react";

export default function OrdersPage() {
  return (
    <Suspense fallback={<AccountOrdersSkeleton />}>
      <OrdersLayout />
    </Suspense>
  );
}
