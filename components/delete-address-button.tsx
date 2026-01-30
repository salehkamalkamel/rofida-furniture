// /account/addresses/_components/delete-address-button.tsx
"use client";

import { deleteAddress } from "@/actions/address-actions";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteAddressButton({
  addressId,
  isDefault,
}: {
  addressId: number;
  isDefault: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (isDefault) {
      alert(
        "لا يمكن حذف العنوان الافتراضي. يرجى تعيين عنوان آخر كافتراضي أولاً.",
      );
      return;
    }

    if (confirm("هل أنت متأكد من رغبتك في حذف هذا العنوان؟")) {
      startTransition(async () => {
        await deleteAddress(addressId);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs font-bold text-muted-foreground hover:text-red-600 transition-colors flex items-center gap-1 disabled:opacity-50"
    >
      <Trash2 className="w-3 h-3" />
      <span>{isPending ? "جاري الحذف..." : "حذف"}</span>
    </button>
  );
}
