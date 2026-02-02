"use client";

import { updateOrderStatus } from "@/actions/order-actions";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderStatusUpdater({
  orderId,
  currentStatus,
  currentPayment,
}: any) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (status: string) => {
    setLoading(true);
    const res = await updateOrderStatus(orderId, status as any);
    if (res.success) toast.success("تم تحديث حالة الطلب");
    else toast.error("فشل التحديث");
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-muted-foreground block mb-2">
          تغيير حالة الطلب
        </label>
        <select
          disabled={loading}
          defaultValue={currentStatus}
          onChange={(e) => handleUpdate(e.target.value)}
          className="w-full p-2 border border-border bg-background rounded-md text-sm"
        >
          <option value="pending">قيد الانتظار</option>
          <option value="processing">قيد التجهيز</option>
          <option value="shipped">تم الشحن</option>
          <option value="delivered">تم التوصيل</option>
          <option value="cancelled">ملغي</option>
        </select>
      </div>
    </div>
  );
}
