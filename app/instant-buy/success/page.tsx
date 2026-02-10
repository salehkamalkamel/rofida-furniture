import Image from "next/image";
import Link from "next/link";
import { getOrderById } from "@/actions/order-actions";
import { notFound } from "next/navigation";
import {
  Check,
  Package,
  MapPin,
  CreditCard,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type Props = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function InstantOrderSuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!orderId) notFound();

  const order = await getOrderById(Number(orderId));

  if (!order) {
    return (
      <div
        className="min-h-[80vh] flex items-center justify-center bg-background"
        dir="rtl"
      >
        <div className="text-center space-y-4 border-2 border-foreground p-12">
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            الطلب غير موجود
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            ORDER_NOT_FOUND_ERR
          </p>
          <Link
            href="/"
            className="block pt-4 text-primary font-bold hover:underline"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const address = order.shippingAddress as any;

  return (
    <div
      className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white"
      dir="rtl"
    >
      {/* Top Header Label */}
      <div className="border-b border-foreground/10 py-4 bg-muted/5">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">
            Transaction Manifest
          </span>
          <span className="font-mono text-[10px] opacity-40">
            TIMESTAMP: {new Date().toISOString()}
          </span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Success Message & Status */}
          <div className="lg:col-span-7 space-y-10">
            {/* Success Icon */}
            <div className="relative inline-block">
              <div className="relative w-32 h-32 border-4 border-foreground flex items-center justify-center bg-background z-10">
                <Check className="w-16 h-16 text-primary stroke-3" />
              </div>
              <div className="absolute top-3 left-3 w-32 h-32 border-4 border-primary/20 z-0" />
            </div>

            {/* Main Text */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-none uppercase">
                تم التأكيد.
              </h1>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-lg">
                شكراً لثقتك بنا. تم استلام طلبك رقم{" "}
                <span className="text-foreground font-black">#{order.id}</span>{" "}
                بنجاح. سنقوم بمراجعة التفاصيل وبدء عملية التنفيذ فوراً.
              </p>
            </div>

            {/* NEW: Sign Up CTA Section */}
            {session?.user.isAnonymous && (
              <div className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 -skew-x-2 transform origin-bottom-left" />
                <div className="relative border-2 border-dashed border-primary/30 p-6 sm:p-8 transition-all hover:border-primary">
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="shrink-0 bg-background border-2 border-foreground p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <UserPlus className="w-6 h-6 text-foreground" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                        لا تفقد تتبع طلبك
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        قم بإنشاء حساب الآن لربط هذا الطلب بحسابك، متابعة
                        الشحنة، وتسريع عملية الشراء القادمة.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-dashed border-foreground/10 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/auth/signup"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-foreground text-background h-12 px-6 font-black uppercase tracking-widest hover:bg-primary transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                    >
                      <span>انشاء حساب</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/"
                      className="sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border-2 border-foreground/10 text-foreground/60 h-12 px-6 font-bold uppercase tracking-widest hover:border-foreground hover:text-foreground transition-colors"
                    >
                      تخطي
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 opacity-60 hover:opacity-100 transition-opacity">
              <Link
                href="/products"
                className="flex items-center justify-center gap-3 h-14 border border-foreground/20 font-bold uppercase tracking-widest hover:bg-muted transition-colors text-sm"
              >
                متابعة التسوق
              </Link>
            </div>
          </div>

          {/* Right Column: Receipt Manifest */}
          <div className="lg:col-span-5 border-2 border-foreground bg-muted/5 relative overflow-hidden">
            {/* Decorative Receipt Edge */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[radial-gradient(circle,transparent_20%,#000_20%)] bg-size-[10px_10px] opacity-10" />

            <div className="p-8 space-y-8">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-2">
                  <Package className="w-3 h-3" /> المنتجات المطلوبة
                </h2>
                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="relative w-20 h-20 border border-foreground/10 bg-white shrink-0">
                        {item.productImage && (
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all"
                          />
                        )}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background text-[10px] font-black flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <p className="font-black text-sm truncate uppercase tracking-tighter leading-tight">
                          {item.productName}
                        </p>
                        <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">
                          COLOR: {item.selectedColor || "DEFAULT"}
                        </p>
                        <p className="font-mono text-xs mt-2">
                          {Number(item.price) * item.quantity} {order.currency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-foreground/10 border-b border-dashed border-foreground/20" />

              <div className="grid grid-cols-1 gap-6">
                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-3 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> وجهة الشحن
                  </h3>
                  <div className="text-xs font-bold space-y-1">
                    <p className="text-primary uppercase tracking-tighter">
                      {address.fullName}
                    </p>
                    <p className="opacity-70">{address.street}</p>
                    <p className="opacity-70">
                      {address.city}, {address.state}
                    </p>
                    <p className="font-mono pt-1">PH: {address.phone}</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-3 flex items-center gap-2">
                    <CreditCard className="w-3 h-3" /> حالة الدفع
                  </h3>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="opacity-70">طريقة الدفع:</span>
                    <span className="uppercase tracking-widest">
                      {order.paymentStatus === "pending"
                        ? "Cash on Delivery"
                        : order.paymentStatus}
                    </span>
                  </div>
                </section>
              </div>

              <div className="pt-6 border-t-2 border-foreground space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold opacity-50 uppercase tracking-widest">
                    Subtotal
                  </span>
                  <span className="font-mono">
                    {Math.round(Number(order.totalAmount)).toLocaleString(
                      "ar-EG",
                    )}{" "}
                    {order.currency}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-sm font-black uppercase tracking-[0.2em]">
                    Grand Total
                  </span>
                  <span className="text-3xl font-black tracking-tighter leading-none">
                    {Math.round(Number(order.totalAmount)).toLocaleString(
                      "ar-EG",
                    )}
                    <span className="text-xs ml-1 font-bold opacity-40 tracking-normal">
                      {order.currency}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
