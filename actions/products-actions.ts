"use server";

import db from "@/index";
import { wishlistItems, cartItems } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, inArray } from "drizzle-orm";

export async function getProductsWithUserState({
  limit,
  category,
  label,
}: {
  limit?: number;
  category?: string;
  label?: "new_arrival" | "best_seller" | "on_sale" | "limited_edition";
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 1️⃣ Fetch products
  const productList = await db.query.products.findMany({
    where: (p, { eq, and }) =>
      and(
        eq(p.availableStatus, "active"),
        category ? eq(p.category, category) : undefined,
        label ? eq(p.label, label) : undefined,
      ),
    limit,
    orderBy: (p, { desc }) => desc(p.createdAt),
  });

  if (!session?.user || productList.length === 0) {
    return productList.map((p) => ({
      product: p,
      isInCart: false,
      isInWishlist: false,
    }));
  }

  const productIds = productList.map((p) => p.id);

  // 2️⃣ Fetch wishlist & cart in parallel
  const [wishlist, cart] = await Promise.all([
    db.query.wishlistItems.findMany({
      where: inArray(wishlistItems.productId, productIds),
      with: { wishlist: true },
    }),
    db.query.cartItems.findMany({
      where: inArray(cartItems.productId, productIds),
      with: { cart: true },
    }),
  ]);

  const wishlistSet = new Set(wishlist.map((i) => i.productId));
  const cartSet = new Set(cart.map((i) => i.productId));

  return productList.map((product) => ({
    product,
    isInWishlist: wishlistSet.has(product.id),
    isInCart: cartSet.has(product.id),
  }));
}
