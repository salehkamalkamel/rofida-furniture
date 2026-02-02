import { getAllOrders } from "@/actions/order-actions";
import DashboardOrders from "@/components/dashboard/dashboard-orders";

export default async function OrdersPage() {
  const orders = await getAllOrders();
  return <DashboardOrders orders={orders} />;
}
