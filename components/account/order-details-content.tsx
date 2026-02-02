// components/order/order-details-content.tsx
import Image from "next/image";
import { format } from "date-fns";
import { X, RefreshCcw, Download } from "lucide-react";
import { notFound } from "next/navigation";
import { getOrderById } from "@/actions/order-actions";
import CancelOrderButton from "@/components/order/cancel-order-btn";
import { DownloadPDFButton } from "../pdf-bill-btn";

export default async function OrderDetailsContent({
  orderId,
}: {
  orderId: string;
}) {
  const order = await getOrderById(+orderId);

  if (!order) notFound();

  const shipping = order.shippingAddress as any;
  const isCancelled = order.status === "cancelled";
  const canCancel = order.status === "pending";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {/* STATUS BAR */}
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
                        : "33%",
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

        {/* ITEMS LIST */}
        <div className="border border-border">
          <div className="p-4 border-b border-border bg-muted/10 flex justify-between items-center">
            <h2 className="font-bold">المنتجات ({order.items.length})</h2>
            <p className="text-xs text-muted-foreground uppercase">
              Manifest_v1.0
            </p>
          </div>
          <div className="divide-y divide-border">
            {order.items.map((item) => (
              <div key={item.id} className="p-6 flex gap-6">
                <div className="relative w-24 h-32 bg-muted border border-border shrink-0">
                  <Image
                    src={item.productImage || "/placeholder.svg"}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg uppercase">
                      {item.productName}
                    </h3>
                    <p className="font-black text-primary">
                      {Number(item.price).toLocaleString()} ج.م
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    SKU: {item.productSku || "N/A"}
                  </p>
                  <div className="pt-4 flex gap-2">
                    <span className="px-2 py-1 bg-muted border border-border text-[10px] font-bold">
                      QTY: {item.quantity}
                    </span>
                    {item.selectedColor && (
                      <span className="px-2 py-1 bg-muted border border-border text-[10px] font-bold">
                        COLOR: {item.selectedColor}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="space-y-6">
        <div className="border border-border p-6 space-y-4">
          <h2 className="font-bold uppercase tracking-wider text-xs text-muted-foreground border-b border-border pb-2">
            عنوان الشحن
          </h2>
          <div className="text-sm">
            <p className="font-bold text-base mb-1">{shipping.fullName}</p>
            <p>{shipping.street}</p>
            <p>
              {shipping.city}, {shipping.state}
            </p>
            <div className="mt-4 pt-4 border-t border-border/50 text-xs">
              <p>
                هاتف: <span dir="ltr">{shipping.phone}</span>
              </p>
              <p>
                واتساب: <span dir="ltr">{shipping.whatsApp}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border border-border p-6 space-y-3 bg-muted/10">
          <h2 className="font-bold uppercase tracking-wider text-xs text-muted-foreground border-b border-border pb-2">
            ملخص الحساب
          </h2>
          <div className="flex justify-between text-sm">
            <span>المجموع الفرعي</span>
            <span className={isCancelled ? "line-through opacity-50" : ""}>
              {Number(order.totalAmount).toLocaleString()} ج.م
            </span>
          </div>
          <div className="pt-3 border-t border-border flex justify-between items-end">
            <span className="font-bold">الإجمالي</span>
            <span
              className={`text-2xl font-black ${isCancelled ? "text-muted-foreground line-through" : "text-primary"}`}
            >
              {Number(order.totalAmount).toLocaleString()}
            </span>
          </div>

          <div className="pt-4 flex flex-col items-center gap-4">
            {canCancel && (
              <>
                <CancelOrderButton orderId={order.id} />
                {/* <DownloadPDFButton orderId={Number(orderId)} /> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Timeline steps
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
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-background transition-colors ${active ? "border-primary" : "border-border"}`}
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
