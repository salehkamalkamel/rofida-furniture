import Link from "next/link";
import { getFullCart } from "@/actions/cart-actions";
import CartPageContent from "@/components/cart-content/cart-page-content";
import { calculateCartSummary } from "@/lib/pricing";

export default async function CartLayout() {
  const cartData = await getFullCart();
  const { items, total, success } = cartData;
  if (!success) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-background flex items-center justify-center py-20">
          <div className="text-center px-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              خطأ في تحميل عربة التسوق
            </h1>
            <p className="text-muted-foreground mb-6">
              حدث خطأ أثناء جلب بيانات عربة التسوق الخاصة بك. يرجى المحاولة مرة
              أخرى لاحقًا.
            </p>
          </div>
        </main>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-background flex items-center justify-center py-20">
          <div className="text-center px-4">
            <svg
              className="w-24 h-24 mx-auto text-muted-foreground mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              عربة التسوق فارغة
            </h1>
            <p className="text-muted-foreground mb-6">
              لم تقم بإضافة أي منتجات بعد
            </p>
            <Link
              href="/products"
              className="inline-block bg-foreground text-background px-8 py-3 font-medium hover:opacity-90 transition-opacity"
            >
              تصفح المنتجات
            </Link>
          </div>
        </main>
      </div>
    );
  }
  const summary = calculateCartSummary(total);
  const deliveryFee = total >= 2000 ? 0 : 150;
  const finalTotal = total + deliveryFee;

  return (
    <main className="flex-1 bg-background ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-8">عربة التسوق</h1>

        <CartPageContent cartData={cartData} summary={summary} />
      </div>
    </main>
  );
}
