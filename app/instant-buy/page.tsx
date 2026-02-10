import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { products, addresses, Address } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "@/index";
import { InstantBuyForm } from "@/components/instant-buy-form";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default async function InstantBuyPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const params = await searchParams;

  const productId = Number(params.productId);
  if (!productId) redirect("/");

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!product) redirect("/");

  const shippingRules = await db.query.shippingRules.findMany({
    where: (rules, { eq }) => eq(rules.isActive, true),
  });

  let userAddresses: Address[] | [] = [];
  if (session?.user) {
    userAddresses = await db.query.addresses.findMany({
      where: eq(addresses.userId, session.user.id),
      orderBy: (addresses, { desc }) => [desc(addresses.isDefault)],
    });
  }

  // Purely UI Price Calculation (Server Action re-validates this)
  const unitPrice =
    product.isOnOffer && product.salePrice
      ? Number(product.salePrice)
      : Number(product.price);
  const quantity = Number(params.quantity) || 1;
  const basePrice = unitPrice * quantity;
  const isCustomized = params.isCustomized === "true";

  const customizationFee = isCustomized ? Math.round(basePrice * 0.1) : 0;
  const shippingFee = basePrice + customizationFee > 10000 ? 0 : 200;
  const total = basePrice + customizationFee + shippingFee; //I'll add shipping logic later

  return (
    <div className="min-h-screen bg-muted/5">
      <div className="bg-white border-b py-4 px-4 flex justify-between items-center max-w-md mx-auto">
        <Link
          href={`/products/${product.id}`}
          className="text-xs font-black flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" /> رجوع
        </Link>
        <span className="font-mono font-bold text-sm">CHECKOUT</span>
      </div>

      <div className="max-w-md mx-auto pb-20">
        <div className="bg-white p-4 border-b flex gap-4">
          <div className="relative w-20 h-20 bg-muted">
            <Image
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-black uppercase">{product.name}</h3>
            <p className="text-[10px] text-muted-foreground">
              الكمية: {quantity}
            </p>
            <p className="font-bold text-lg">
              {basePrice} <span className="text-xs">EGP</span>
            </p>
          </div>
        </div>

        <div className="bg-primary/5 p-2 flex justify-center gap-2 text-[10px] text-primary font-bold border-y border-primary/10">
          <ShieldCheck className="w-3 h-3" /> دفع عند الاستلام - ضمان 100%
        </div>

        <div className="p-4">
          <InstantBuyForm
            customizationFee={customizationFee}
            shippingFee={shippingFee}
            total={total}
            basePrice={basePrice}
            user={session?.user}
            savedAddresses={userAddresses}
            shippingRules={shippingRules}
            productData={{
              productId,
              quantity,
              color: params.color,
              isCustomized: Boolean(params.isCustomized),
              customizationText: params.customizationText,
            }}
          />
        </div>
      </div>
    </div>
  );
}
