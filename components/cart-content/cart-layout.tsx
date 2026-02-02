import Link from "next/link";
import { getFullCart } from "@/actions/cart-actions";
import CartPageContent from "@/components/cart-content/cart-page-content";
import { calculateCartSummary } from "@/lib/pricing";
import { ShoppingBag, AlertTriangle, ArrowLeft, Activity } from "lucide-react";
import RefreshButton from "./refresh-button";

export default async function CartLayout() {
  const cartData = await getFullCart();
  const { items, total, success } = cartData;

  const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
    <div
      className="min-h-screen flex flex-col bg-background relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[32px_32px]" />
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      </main>
    </div>
  );

  if (!success) {
    return (
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-destructive/20 bg-destructive/5">
          <div className="w-20 h-20 bg-muted flex items-center justify-center mb-8 border-2 border-destructive/20">
            <AlertTriangle className="w-10 h-10 text-destructive/40" />
          </div>
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-destructive/60 mb-2">
            System_Sync_Failure
          </p>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 text-destructive">
            خطأ في تحميل البيانات
          </h1>
          <p className="text-sm font-bold text-muted-foreground mb-10 max-w-sm text-center uppercase tracking-tight">
            فشل النظام في استرداد بيان عربة التسوق. يرجى إعادة محاولة الاتصال
            بالخادم.
          </p>
          <RefreshButton />
        </div>
      </LayoutWrapper>
    );
  }

  if (items.length === 0) {
    return (
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-foreground/10 bg-muted/5">
          <div className="w-20 h-20 bg-muted flex items-center justify-center mb-8 border-2 border-foreground/10">
            <ShoppingBag className="w-10 h-10 text-foreground/20" />
          </div>
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-foreground/40 mb-2">
            Null_Inventory_Detected
          </p>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">
            العربة فارغة
          </h1>
          <p className="text-sm font-bold text-muted-foreground mb-10 max-w-sm text-center uppercase tracking-tight">
            لم يتم العثور على وحدات نشطة في بيان الشراء الخاص بك.
          </p>
          <Link
            href="/products"
            className="group flex items-center gap-3 bg-foreground text-background px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
          >
            إضافة وحدات{" "}
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </LayoutWrapper>
    );
  }

  const summary = calculateCartSummary(total);

  return (
    <LayoutWrapper>
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b-2 border-foreground pb-8 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-primary font-mono text-[10px] font-black tracking-[0.3em] uppercase">
            <Activity className="w-3 h-3" />
            CART_MANIFEST_V.01
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            عربة التسوق
          </h1>
        </div>
        <div className="bg-foreground text-background px-4 py-1 text-[10px] font-black uppercase tracking-widest">
          Active_Units: {items.length.toString().padStart(2, "0")}
        </div>
      </div>

      <CartPageContent cartData={cartData} summary={summary} />
    </LayoutWrapper>
  );
}
