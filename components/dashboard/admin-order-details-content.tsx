import Image from "next/image";
import { notFound } from "next/navigation";
import { getAdminOrderById } from "@/actions/order-actions";
import OrderStatusUpdater from "./order-status-updater";

export default async function AdminOrderDetailsContent({
  orderId,
}: {
  orderId: string;
}) {
  const order = await getAdminOrderById(+orderId);

  if (!order) notFound();

  const shipping = order.shippingAddress as any;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-right">
      <div className="lg:col-span-2 space-y-6">
        {/* CUSTOMER INFO CARD */}
        <div className="bg-primary/5 border border-primary/10 p-6 rounded-lg">
          <h2 className="font-bold text-lg mb-4">بيانات العميل</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">الاسم:</p>
              <p className="font-bold">{order.user.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">البريد الإلكتروني:</p>
              <p className="font-bold">{order.user.email}</p>
            </div>
          </div>
        </div>

        {/* ITEMS LIST */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="p-4 bg-muted/30 border-b border-border">
            <h2 className="font-bold">
              المنتجات المطلوبة ({order.items.length})
            </h2>
          </div>
          <div className="divide-y divide-border">
            {order.items.map((item) => (
              <div key={item.id} className="p-6 flex gap-6">
                <div className="relative w-20 h-24 bg-muted border shrink-0">
                  <Image
                    src={item.productImage || "/placeholder.svg"}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{item.productName}</h3>
                    <p className="font-bold">
                      {Number(item.price).toLocaleString()} ج.م
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    الكمية: {item.quantity}
                  </p>
                  {item.customizationText && (
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-100 text-xs">
                      <strong>طلب تخصيص:</strong> {item.customizationText}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADMIN CONTROLS SIDEBAR */}
      <div className="space-y-6">
        <div className="border border-border p-6 rounded-lg bg-card shadow-sm">
          <h2 className="font-bold mb-4 border-b pb-2">التحكم في حالة الطلب</h2>
          {/* Client component to handle status changes */}
          <OrderStatusUpdater
            orderId={order.id}
            currentStatus={order.status}
            currentPayment={order.paymentStatus}
          />
        </div>

        <div className="border border-border p-6 rounded-lg">
          <h2 className="font-bold mb-4 border-b pb-2">عنوان الشحن</h2>
          <div className="text-sm space-y-1">
            <p className="font-bold">{shipping.fullName}</p>
            <p>
              {shipping.street}, {shipping.city}
            </p>
            <p>
              هاتف: <span dir="ltr">{shipping.phone}</span>
            </p>
            <p>
              واتساب: <span dir="ltr">{shipping.whatsApp}</span>
            </p>
          </div>
        </div>

        <div className="p-6 bg-muted/10 border border-border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-bold">إجمالي المبلغ:</span>
            <span className="text-2xl font-black text-primary">
              {Number(order.totalAmount).toLocaleString()} ج.م
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
