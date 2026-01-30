import { availableStatusOptions } from "@/app/dashboard/products/new/product-config";
import Link from "next/link";

export default function AddProductHeader({
  availableStatus,
}: {
  availableStatus: "active" | "draft" | "archived";
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 hover:bg-muted transition-colors"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            إضافة منتج جديد
          </h1>
          <p className="text-muted-foreground">
            أنشئ منتجاً جديداً بجميع التفاصيل
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 text-xs font-medium ${
            availableStatus === "active"
              ? "bg-green-100 text-green-800"
              : availableStatus === "draft"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {
            availableStatusOptions.find(
              (s) => s.value === availableStatus,
            )?.label
          }
        </span>
      </div>
    </div>
  );
}
