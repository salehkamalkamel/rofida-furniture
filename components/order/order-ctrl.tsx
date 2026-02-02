"use client";
import { cancelOrder } from "@/actions/order-actions";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

export default function OrderCtrl({
  orderId,
  orderStatus,
}: {
  orderId: number;
  orderStatus: string;
}) {
  const [isPending, startTransition] = useTransition();
  function handleCancel() {
    if (!confirm("هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟")) return;

    startTransition(async () => {
      const res = await cancelOrder(orderId);
      if (!res.success) {
        toast.error("فشل الغاء الطلب");
      } else {
        toast.success("تم الغاء الطلب بنجاح");
      }
    });
  }
  return (
    <div className="px-5 sm:px-8 py-4 bg-foreground flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-[9px] font-black text-background/50 uppercase tracking-[0.2em]">
        End_of_Manifest_Report
      </p>
      <div className="flex gap-4 w-full sm:w-auto">
        <Link
          href={`/account/orders/${orderId}`}
          className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest text-background border border-background/20 px-6 py-2.5 hover:bg-background hover:text-foreground transition-all flex items-center justify-center gap-2"
        >
          التفاصيل <ChevronLeft className="w-3 h-3" />
        </Link>

        {!["cancelled", "shipped", "delivered"].includes(orderStatus) && (
          <button
            onClick={handleCancel}
            disabled={isPending}
            className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-widest bg-primary text-white px-6 py-2.5 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isPending ? "جاري الغاء الطلب..." : " الغاء الطلب "}
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
