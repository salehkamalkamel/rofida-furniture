import { getUserAddresses } from "@/actions/address-actions";
import { getFullCart } from "@/actions/cart-actions";
import getAllShippingRules from "@/actions/shipping-actions";
import CheckoutClientLayout from "@/components/checkout/checkout-client-layout";
import { auth } from "@/lib/auth";
import { calculateCheckoutPricing } from "@/lib/helpers/checkout";
import { Lock } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function CheckoutLayout() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-md bg-background p-6 sm:p-8 border border-border text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-muted flex items-center justify-center">
            <Lock className="w-8 h-8 text-foreground" />
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold text-foreground mb-2">
            تسجيل الدخول مطلوب
          </h1>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            لإتمام عملية الشراء وتتبع طلبك وحفظ العناوين، يرجى تسجيل الدخول أو
            إنشاء حساب جديد.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/signin"
              className="block w-full bg-primary text-primary-foreground py-3 font-medium hover:opacity-90 transition-opacity"
            >
              تسجيل الدخول
            </Link>

            <Link
              href="/signup"
              className="block w-full border border-border py-3 font-medium text-foreground hover:bg-muted transition-colors"
            >
              إنشاء حساب جديد
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cart = await getFullCart();
  if (!cart.success || cart.data.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-background flex items-center justify-center">
          <div className="text-center px-4 py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted flex items-center justify-center">
              <svg
                className="w-12 h-12 text-muted-foreground"
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
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              عربة التسوق فارغة
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              لا يمكنك إتمام عملية الشراء بدون منتجات. تصفح مجموعتنا وأضف ما
              يعجبك إلى السلة.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-medium hover:opacity-90 transition-opacity"
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              تصفح المنتجات
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const addresses = await getUserAddresses();
  const pricing = calculateCheckoutPricing(cart.data);
  const shippingRules = await getAllShippingRules();

  return (
    <CheckoutClientLayout
      cartData={cart.data}
      addresses={addresses}
      pricing={pricing}
      shippingRules={shippingRules}
    />
  );
}
