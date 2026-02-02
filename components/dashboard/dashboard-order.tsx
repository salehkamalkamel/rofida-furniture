"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Loader2, Eye } from "lucide-react";
import { OrderWithDetails } from "@/types/orders";
import Link from "next/link";
// import { updateOrderStatus } from "@/app/actions/orders"; // You will create this

const statusOptions = [
  { value: "pending", label: "قيد الانتظار" },
  { value: "processing", label: "قيد التجهيز" },
  { value: "shipped", label: "تم الشحن" },
  { value: "delivered", label: "تم التوصيل" },
  { value: "cancelled", label: "ملغي" },
] as const;

export default function DashboardOrder({ order }: { order: OrderWithDetails }) {
  const [isPending, startTransition] = useTransition();
  const [showDetails, setShowDetails] = useState(false);

  // Parse shipping address safely since it is JSON in schema
  const addressData = order.shippingAddress as any;
  const addressString = addressData
    ? `${addressData.street || ""}, ${addressData.city || ""}`
    : "غير محدد";

  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      // await updateOrderStatus(order.id, newStatus);
      console.log("Update status to:", newStatus);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success/10 text-success";
      case "shipped":
        return "bg-primary/20 text-primary-foreground";
      case "processing":
        return "bg-secondary/20 text-secondary-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      case "cancelled":
        return "bg-offer/10 text-offer";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      <tr className="hover:bg-muted/50 transition-colors">
        <td className="px-6 py-4">
          <p className="font-medium text-foreground">#{order.id}</p>
          <p className="text-xs text-muted-foreground">
            {order.items.length} منتج
          </p>
        </td>
        <td className="px-6 py-4">
          <p className="font-medium text-foreground">{order.user.name}</p>
          <p className="text-sm text-muted-foreground">{order.user.email}</p>
        </td>
        <td className="px-6 py-4 text-sm text-foreground">
          {new Date(order.createdAt).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </td>
        <td className="px-6 py-4">
          <p className="font-medium text-foreground">
            {Number(order.totalAmount).toLocaleString("ar-EG")} جنيه
          </p>
        </td>
        <td className="px-6 py-4">
          <div className="relative">
            {isPending && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            )}
            <select
              value={order.status}
              disabled={isPending}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`px-3 py-1 text-xs font-medium border-0 rounded cursor-pointer appearance-none ${getStatusColor(
                order.status,
              )}`}
            >
              {statusOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-background text-foreground"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </td>
        <td className="px-6 py-4">
          <Link href={`/dashboard/orders/${order.id}`}>
            <button
              // onClick={() => setShowDetails(true)}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              title="عرض التفاصيل"
            >
              <Eye className="w-5 h-5" />
            </button>
          </Link>
        </td>
      </tr>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">
                  تفاصيل الطلب #{order.id}
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Info Section */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">
                    معلومات العميل
                  </h4>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-foreground font-medium">
                      {order.user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.user.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {addressString}
                    </p>
                  </div>
                </div>

                {/* Products List */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">المنتجات</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-muted/50 p-3 rounded-lg border border-border"
                      >
                        <div className="relative w-16 h-16 bg-background rounded-md overflow-hidden shrink-0 border border-border">
                          <Image
                            src={item.productImage || "/placeholder.svg"}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {item.productName}
                          </p>
                          {item.productSku && (
                            <p className="text-xs text-muted-foreground">
                              SKU: {item.productSku}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            الكمية: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-foreground whitespace-nowrap">
                          {(Number(item.price) * item.quantity).toLocaleString(
                            "ar-EG",
                          )}{" "}
                          جنيه
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer / Total */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-bold text-foreground">
                    المجموع الكلي
                  </span>
                  <span className="text-xl font-bold text-foreground">
                    {Number(order.totalAmount).toLocaleString("ar-EG")} جنيه
                  </span>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 h-10 bg-foreground text-background font-medium rounded-md hover:opacity-90 transition-opacity">
                    طباعة الفاتورة
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-6 h-10 border border-border text-foreground font-medium rounded-md hover:bg-muted transition-colors"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
