import Image from "next/image";
import Link from "next/link";
import { getMyOrders } from "@/actions/order-actions";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Package, Calendar, Hash, Activity } from "lucide-react";
import OrderCtrl from "@/components/order/order-ctrl";

export default async function OrdersLayout() {
  const orders = await getMyOrders();

  if (orders.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-foreground/10 bg-muted/5"
        dir="rtl"
      >
        <div className="w-20 h-20 bg-muted flex items-center justify-center mb-6">
          <Package className="w-10 h-10 text-foreground/20" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[.4em] text-foreground/40 mb-2">
          Null_Orders_Logged
        </p>
        <h2 className="text-xl font-black uppercase tracking-tighter mb-6">
          لا توجد طلبات مسجلة
        </h2>
        <Link
          href="/products"
          className="bg-foreground text-background px-10 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
        >
          بدء التسوق
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10" dir="rtl">
      {/* PAGE HEADER */}
      <div className="flex items-end justify-between border-b-2 border-foreground pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2 text-primary font-mono text-[10px] font-black tracking-widest uppercase">
            <Activity className="w-3 h-3" />
            ORD_MANIFEST_V1.4
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            سجل الطلبات
          </h1>
          <p className="text-xs font-bold text-muted-foreground mt-2 uppercase tracking-tight opacity-60">
            تتبع حالة الشحنات والعمليات اللوجستية النشطة
          </p>
        </div>
      </div>

      {/* ORDERS LIST */}
      <div className="space-y-12">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border-2 border-foreground bg-background overflow-hidden transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 group"
          >
            {/* INVOICE-STYLE HEADER */}
            <div className="p-5 sm:p-8 bg-muted/30 border-b-2 border-foreground flex flex-wrap items-center justify-between gap-8">
              <div className="flex flex-wrap gap-8 sm:gap-12">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40">
                    <Hash className="w-3 h-3" /> رقم الطلب
                  </div>
                  <p className="font-black text-sm font-mono tracking-tighter">
                    #ORD-{order.id.toString().padStart(4, "0")}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40">
                    <Calendar className="w-3 h-3" /> التاريخ
                  </div>
                  <p className="font-black text-sm">
                    {format(new Date(order.createdAt), "dd MMM yyyy", {
                      locale: ar,
                    })}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">
                    حالة الشحنة
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              </div>

              <div className="sm:text-left">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">
                  إجمالي المستحق
                </div>
                <p className="text-xl font-black text-primary leading-none">
                  {Number(order.totalAmount)}{" "}
                  <span className="text-[10px]">جنيه</span>
                </p>
              </div>
            </div>

            {/* ITEM MANIFEST */}
            <div className="p-5 sm:p-8 space-y-6">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 items-center py-4 border-b border-foreground/5 last:border-0"
                >
                  <div className="relative w-20 h-20 shrink-0 bg-muted border border-foreground/10">
                    <Image
                      src={item.productImage || "/placeholder.svg"}
                      alt={item.productName}
                      fill
                      className="object-cover group-hover:grayscale-0 grayscale transition-all duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-sm text-foreground truncate uppercase tracking-tight">
                      {item.productName}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 font-mono text-[10px] font-bold text-muted-foreground uppercase">
                      <span className="bg-muted px-2 py-0.5 border border-foreground/5">
                        QTY: {item.quantity}
                      </span>
                      {item.selectedColor && (
                        <span className="bg-muted px-2 py-0.5 border border-foreground/5">
                          COLOR: {item.selectedColor}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-black text-sm font-mono">
                      {Number(item.price)}{" "}
                      <span className="text-[9px]">EGP</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION COMMANDS */}
            <OrderCtrl orderId={order.id} orderStatus={order.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, { label: string; class: string }> = {
    pending: { label: "قيد الانتظار", class: "bg-amber-500 text-white" },
    shipped: { label: "تم الشحن", class: "bg-blue-600 text-white" },
    delivered: { label: "تم التوصيل", class: "bg-green-600 text-white" },
    cancelled: { label: "ملغي", class: "bg-destructive text-white" },
  };

  const current = statusMap[status] || statusMap.pending;

  return (
    <span
      className={`text-[9px] font-black px-2.5 py-1 uppercase tracking-widest ${current.class}`}
    >
      {current.label}
    </span>
  );
}
