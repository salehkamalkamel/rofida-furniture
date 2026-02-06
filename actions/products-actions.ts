"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { and, eq, inArray } from "drizzle-orm";
import db from "..";
import {
  AvailableStatus,
  availableStatusEnum,
  cartItems,
  carts,
  ProductLabel,
  products,
  wishlistItems,
  wishlists,
} from "@/db/schema";
import {
  ProductFormValues,
  productSchema,
} from "@/app/dashboard/products/new/_schema";
import { generateSlug } from "@/lib/healpers";
import { revalidatePath } from "next/cache";

export async function createProduct(values: ProductFormValues) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, error: "غير مصرح" };
  }

  const parsed = productSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: "بيانات غير صالحة",
      details: parsed.error.format(),
    };
  }

  const data = parsed.data;

  // 1. Slug Handling (Force lowercase, fallback to name)
  let baseSlug =
    data.slug?.trim().toLowerCase() || generateSlug(data.nameEn || data.name);
  if (!baseSlug || baseSlug.length < 2) baseSlug = `product-${Date.now()}`;

  // 2. Offer Logic Cleanup
  const price = Number(data.price);
  // Only save salePrice if the offer is explicitly ON
  const salePrice =
    data.isOnOffer && data.salePrice ? Number(data.salePrice) : null;

  try {
    const result = await db.transaction(async (tx) => {
      // 3. Unique Slug Check
      let slug = baseSlug;
      let counter = 1;
      while (
        await tx.query.products.findFirst({ where: eq(products.slug, slug) })
      ) {
        slug = `${baseSlug}-${counter++}`;
      }

      const [product] = await tx
        .insert(products)
        .values({
          ...data,
          slug,
          price: price.toFixed(2),
          salePrice: salePrice ? salePrice.toFixed(2) : null, // Store null if no offer
          isOnOffer: Boolean(salePrice), // Double check consistency
          category: data.categoryId,
          // Ensure JSON fields are arrays
          colors: data.colors ?? [],
          images: data.images ?? [],
        })
        .returning();

      return product;
    });

    revalidatePath("/dashboard/products");
    return { success: true, data: result };
  } catch (error: any) {
    console.error("CREATE_PRODUCT_ERROR:", error);
    return { success: false, error: "حدث خطأ أثناء الحفظ" };
  }
}

export async function getProductsWithUserState({
  limit,
  category,
  label,
}: {
  limit?: number;
  category?: string;
  label?: ProductLabel;
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
        eq(p.availableStatus, availableStatusEnum.enumValues[0]),
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
