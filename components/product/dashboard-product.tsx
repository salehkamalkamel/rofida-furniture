"use client";
import { Product } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import {
  deleteProduct,
  updateProduct,
} from "@/app/dashboard/products/new/_actions";
import { ExternalLink, Eye, EyeOff, Loader2 } from "lucide-react";

export default function DashBoardProduct({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  function handleDeleteProduct() {
    startTransition(async () => {
      await deleteProduct(product.id);
      setShowDeleteModal(null);
    });
  }

  function toggleAvailableStatus() {
    startTransition(async () => {
      if (product.availableStatus === "active") {
        await updateProduct(product.id, { availableStatus: "archived" });
      } else {
        await updateProduct(product.id, { availableStatus: "active" });
      }
    });
  }
  return (
    <>
      <tr key={product.id} className="hover:bg-muted/50">
        <td className="px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 bg-muted shrink-0">
              <Image
                src={product?.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-foreground">
                {product.label === "new_arrival"}
              </p>
              <p className="text-sm text-muted-foreground">{product.name}</p>
              <p className="text-xs text-muted-foreground">#{product.id}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-foreground">
          {product.category}
        </td>
        <td className="px-6 py-4">
          <div>
            <p className="font-medium text-foreground">
              {product.salePrice?.toLocaleString()} جنيه
            </p>
            {product.price && (
              <p className="text-sm text-muted-foreground line-through">
                {product.price.toLocaleString()} جنيه
              </p>
            )}
          </div>
        </td>
        <td className="px-6 py-4">
          <button
            className={`px-3 py-1 text-xs font-medium ${
              product.stockStatus === "in_stock"
                ? "bg-success/10 text-success"
                : "bg-offer/10 text-offer"
            }`}
          >
            {product.stockStatus === "in_stock" ? "متوفر" : "غير متوفر"}
          </button>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            {/* Edit product functionality will be added later */}
            {/* <Link
              href={`/dashboard/products/${product.id}`}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="تعديل"
            >
              <Edit className="w-5 h-5" />
            </Link> */}
            {/* toggle the availability */}
            <button
              disabled={isPending}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title="تغيير حالة التوفر"
              onClick={toggleAvailableStatus}
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : product.availableStatus === "active" ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
            <Link
              href={`/products/${product.id}`}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="معاينة"
              target="_blank"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>
            <button
              disabled={isPending}
              onClick={() => setShowDeleteModal(product.id)}
              className="p-2 text-offer hover:bg-offer/10 transition-colors"
              title="حذف"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-foreground mb-4">
              حذف المنتج
            </h3>
            <p className="text-muted-foreground mb-6">
              هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن هذا
              الإجراء.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                disabled={isPending}
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 text-sm font-medium text-foreground border border-border hover:bg-muted transition-colors"
              >
                إلغاء
              </button>
              <button
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium bg-offer text-offer-foreground hover:opacity-90 transition-opacity"
                onClick={handleDeleteProduct}
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                ) : (
                  "حذف المنتج"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
