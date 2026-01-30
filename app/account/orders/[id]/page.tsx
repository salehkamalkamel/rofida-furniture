import { getOrderById, cancelOrder } from "@/actions/order-actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { X, RefreshCcw, Download } from "lucide-react";
import CancelOrderButton from "@/components/order/cancel-order-btn";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: Props) {
  const orderId = (await params).id;
  const order = await getOrderById(+orderId);

  if (!order) notFound();

  const shipping = order.shippingAddress as any;
  const isCancelled = order.status === "cancelled";
  const canCancel = order.status === "pending";

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4">
      {/* Header & Navigation */}
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
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              طلب #ORD-{order.id}
            </h1>
            {isCancelled && (
              <span className="bg-destructive/10 text-destructive text-xs font-bold px-2 py-1 border border-destructive/20">
                ملغي
              </span>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            تم الطلب في{" "}
            {format(new Date(order.createdAt), "PPP", { locale: ar })}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="h-11 px-6 border border-border font-bold text-sm hover:bg-muted transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> تحميل الفاتورة
          </button>

          {canCancel ? (
            <CancelOrderButton orderId={order.id} />
          ) : (
            <button className="h-11 px-6 bg-foreground text-background font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" /> إعادة طلب المنتجات
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Status Timeline - Handled for Cancelled vs Normal */}
          <div className="bg-muted/20 border border-border p-6">
            <h2 className="font-bold text-lg mb-6">حالة الطلب</h2>
            {isCancelled ? (
              <div className="flex items-center gap-4 text-destructive p-4 bg-destructive/5 border border-destructive/10">
                <X className="w-6 h-6" />
                <div>
                  <p className="font-bold">تم إلغاء هذا الطلب</p>
                  <p className="text-xs opacity-80">
                    لن يتم معالجة هذا الطلب أو شحنه.
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative flex justify-between">
                <div className="absolute top-4 left-0 w-full h-0.5 bg-border -z-10" />
                <div
                  className="absolute top-4 left-0 h-0.5 bg-primary -z-10 transition-all"
                  style={{
                    width:
                      order.status === "delivered"
                        ? "100%"
                        : order.status === "shipped"
                          ? "66%"
                          : order.status === "processing"
                            ? "33%"
                            : "0%",
                  }}
                />
                <StatusStep label="تم التأكيد" date={order.createdAt} active />
                <StatusStep
                  label="قيد التجهيز"
                  active={order.status !== "pending"}
                />
                <StatusStep
                  label="تم الشحن"
                  active={["shipped", "delivered"].includes(order.status)}
                />
                <StatusStep
                  label="تم التوصيل"
                  active={order.status === "delivered"}
                />
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="border border-border">
            <div className="p-4 border-b border-border bg-muted/10">
              <h2 className="font-bold">المنتجات ({order.items.length})</h2>
            </div>
            <div className="divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex gap-6 opacity-90">
                  <div className="relative w-24 h-32 bg-muted border border-border shrink-0">
                    <Image
                      src={item.productImage || "/placeholder.svg"}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg uppercase">
                        {item.productName}
                      </h3>
                      <p className="font-bold text-primary">
                        {Number(item.price).toLocaleString()} ج.م
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      SKU: {item.productSku || "N/A"}
                    </p>
                    <div className="pt-4 flex flex-wrap gap-4 text-xs font-medium">
                      <div className="px-2 py-1 bg-muted border border-border">
                        الكمية: {item.quantity}
                      </div>
                      {item.selectedColor && (
                        <div className="px-2 py-1 bg-muted border border-border">
                          اللون: {item.selectedColor}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="border border-border p-6 space-y-4">
            <h2 className="font-bold uppercase tracking-wider text-xs text-muted-foreground border-b border-border pb-2">
              عنوان الشحن
            </h2>
            <div className="text-sm leading-relaxed">
              <p className="font-bold text-base mb-1">{shipping.fullName}</p>
              <p>{shipping.street}</p>
              <p>
                {shipping.city}, {shipping.state}
              </p>
              <div className="mt-4 pt-4 border-t border-border/50 space-y-1">
                <p className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs italic">
                    هاتف:
                  </span>
                  <span dir="ltr">{shipping.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs italic">
                    واتساب:
                  </span>
                  <span dir="ltr">{shipping.whatsApp}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border border-border p-6 space-y-3 bg-muted/10">
            <h2 className="font-bold uppercase tracking-wider text-xs text-muted-foreground border-b border-border pb-2">
              ملخص الحساب
            </h2>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">المجموع الفرعي</span>
              <span className={isCancelled ? "line-through opacity-50" : ""}>
                {Number(order.totalAmount).toLocaleString()} ج.م
              </span>
            </div>
            <div className="pt-3 border-t border-border flex justify-between items-end">
              <span className="font-bold">الإجمالي</span>
              <div className="text-right">
                <span
                  className={`text-2xl font-black block ${isCancelled ? "text-muted-foreground line-through" : "text-primary"}`}
                >
                  {Number(order.totalAmount).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusStep({
  label,
  date,
  active,
}: {
  label: string;
  date?: Date;
  active: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-background transition-colors ${active ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
      >
        {active && (
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        )}
      </div>
      <div className="text-center">
        <p
          className={`text-[11px] font-bold ${active ? "text-foreground" : "text-muted-foreground"}`}
        >
          {label}
        </p>
        {date && (
          <p className="text-[9px] text-muted-foreground">
            {format(new Date(date), "HH:mm")}
          </p>
        )}
      </div>
    </div>
  );
}
