"use client";

import { Download } from "lucide-react";
import { generateInvoiceAction } from "@/actions/order-actions";

export function DownloadPDFButton({ orderId }: { orderId: number }) {
  const handleDownload = async () => {
    const base64 = await generateInvoiceAction(orderId);

    const blob = new Blob(
      [Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))],
      { type: "application/pdf" },
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${orderId}.pdf`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-muted"
    >
      <Download className="w-4 h-4" />
      تحميل الفاتورة
    </button>
  );
}
