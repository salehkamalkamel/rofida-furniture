// file: app/instant-buy/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  products,
  addresses,
  shippingRules,
  Address,
  ShippingRule,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { calculatePrice } from "@/lib/pricing"; // Assuming you have this shared logic
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import db from "@/index";
import { InstantBuyForm } from "@/components/instant-buy-form";

export default async function InstantBuyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  let params = await searchParams;
  // 1. Parse Params
  const productId = Number(params.productId);
  const quantity = Number(params.quantity) || 1;
  const color = params.color as string;
  const isCustomized = params.isCustomized === "true";
  const customizationText = params.customizationText as string;

  if (!productId) redirect("/");

  // 2. Fetch Data
  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!product) redirect("/");
  const shippingRules = await db.query.shippingRules.findMany();
  if (!shippingRules) {
    throw new Error("Failed to fetch shipping rules");
  }

  const priceDetails = calculatePrice(product, quantity, isCustomized);
  const basePrice = priceDetails.totalPrice;

  let userAddresses: Address[] | [] = [];
  if (session?.user) {
    userAddresses = await db.query.addresses.findMany({
      where: eq(addresses.userId, session.user.id),
      orderBy: (addresses, { desc }) => [desc(addresses.isDefault)],
    });
  }

  return (
    <div className="min-h-screen bg-muted/5">
      {/* Simple Header */}
      <div className="bg-white border-b border-foreground/10 py-4">
        <div className="max-w-md mx-auto px-4 flex items-center justify-between">
          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-black uppercase flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowRight className="w-4 h-4" />
            رجوع للمنتج
          </Link>
          <span className="font-mono font-bold text-sm">INSTANT CHECKOUT</span>
        </div>
      </div>

      <div className="max-w-md mx-auto pb-20">
        {/* Product Summary Card */}
        <div className="bg-white p-4 border-b border-foreground/10 flex gap-4">
          <div className="relative w-20 h-20 border border-foreground/10 bg-muted shrink-0">
            <Image
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-sm font-black uppercase leading-tight">
              {product.name}
            </h3>
            <div className="text-[10px] text-muted-foreground uppercase font-mono space-x-2">
              <span>الكمية: {quantity}</span>
              {color && <span> | اللون: {color}</span>}
              {isCustomized && (
                <span className="text-primary font-bold"> | +تخصيص</span>
              )}
            </div>
            <div className="flex justify-between items-end pt-1">
              <div className="font-mono font-bold text-lg">
                {priceDetails.totalPrice.toLocaleString()}{" "}
                <span className="text-[10px]">EGP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-primary/5 border-y border-primary/10 p-2 flex items-center justify-center gap-2 text-[10px] text-primary font-bold uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3" />
          دفع عند الاستلام - ضمان 100%
        </div>

        {/* The Smart Form */}
        <div className="p-4">
          <InstantBuyForm
            basePrice={basePrice}
            user={session?.user}
            savedAddresses={userAddresses}
            shippingRules={shippingRules}
            productData={{
              productId,
              quantity,
              color,
              isCustomized,
              customizationText,
              priceAtAdd: priceDetails.unitPrice,
              customizationPrice: priceDetails.customizationFee,
            }}
          />
        </div>
      </div>
    </div>
  );
}
