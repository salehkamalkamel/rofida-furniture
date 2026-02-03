"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { and, eq, inArray, desc } from "drizzle-orm";
import db from "..";
import { cartItems, carts, wishlistItems, wishlists } from "@/db/schema";

export async function getProductsWithUserState({
  limit,
  category,
  label,
}: {
  limit?: number;
  category?: string;
  label?: "new_arrival" | "best_seller" | "on_sale" | "limited_edition";
}) {
  /* =========================
     AUTH SESSION
  ========================= */
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  /* =========================
     FETCH PRODUCTS
  ========================= */
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

  // Guest or no products → no user state
  if (!session?.user || productList.length === 0) {
    return productList.map((product) => ({
      product,
      isInCart: false,
      isInWishlist: false,
    }));
  }

  const productIds = productList.map((p) => p.id);
  const userId = session.user.id;

  /* =========================
     FETCH USER CART & WISHLIST
  ========================= */
  const [userCart, userWishlist] = await Promise.all([
    db.query.carts.findFirst({
      where: eq(carts.userId, userId),
    }),
    db.query.wishlists.findFirst({
      where: eq(wishlists.userId, userId),
    }),
  ]);

  /* =========================
     FETCH USER ITEMS
  ========================= */
  const [userCartItems, userWishlistItems] = await Promise.all([
    userCart
      ? db.query.cartItems.findMany({
          where: and(
            eq(cartItems.cartId, userCart.id),
            inArray(cartItems.productId, productIds),
          ),
          columns: { productId: true },
        })
      : [],

    userWishlist
      ? db.query.wishlistItems.findMany({
          where: and(
            eq(wishlistItems.wishlistId, userWishlist.id),
            inArray(wishlistItems.productId, productIds),
          ),
          columns: { productId: true },
        })
      : [],
  ]);

  /* =========================
     BUILD LOOKUP SETS
  ========================= */
  const cartSet = new Set(userCartItems.map((i) => i.productId));
  const wishlistSet = new Set(userWishlistItems.map((i) => i.productId));

  /* =========================
     FINAL RESPONSE
  ========================= */
  return productList.map((product) => ({
    product,
    isInCart: cartSet.has(product.id),
    isInWishlist: wishlistSet.has(product.id),
  }));
}
