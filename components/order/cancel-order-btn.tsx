"use client";
import { cancelOrder } from "@/actions/order-actions";
import { X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function CancelOrderButton({ orderId }: { orderId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    if (!confirm("هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟")) return;

    startTransition(async () => {
      const res = await cancelOrder(orderId);
      if (res.success) {
        toast.success("تم إلغاء الطلب بنجاح");
      } else {
        toast.error("حدث خطأ أثناء إلغاء الطلب");
      }
    });
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isPending}
      className="h-11 px-6 bg-destructive text-destructive-foreground font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
    >
      {isPending ? "جاري الإلغاء..." : "إلغاء الطلب"}
      <X className="w-4 h-4" />
    </button>
  );
}
