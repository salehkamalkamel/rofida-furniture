"use server";

import { auth } from "@/lib/auth";
import {
  wishlists,
  wishlistItems,
  carts,
  cartItems,
  products,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import db from "..";
import { ActionResult } from "./cart-actions";

/**
 * Helper to handle session and unauthorized state
 */
async function getAuthenticatedUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || session.user.isAnonymous) return null;
  return session.user.id;
}

export async function moveToCart({
  wishlistItemId,
  productId,
}: {
  wishlistItemId?: number;
  productId?: number;
}): Promise<ActionResult> {
  try {
    const userId = await getAuthenticatedUser();
    if (!userId) return { success: false, error: "يجب تسجيل الدخول أولاً" };

    return await db.transaction(async (tx) => {
      // 1. Find Wishlist
      const wishlist = await tx.query.wishlists.findFirst({
        where: eq(wishlists.userId, userId),
      });

      if (!wishlist)
        return { success: false, error: "قائمة الأمنيات غير موجودة" };

      // 2. Find Item
      const wishItem = await tx.query.wishlistItems.findFirst({
        where: and(
          eq(wishlistItems.wishlistId, wishlist.id),
          wishlistItemId
            ? eq(wishlistItems.id, wishlistItemId)
            : eq(wishlistItems.productId, productId!),
        ),
        with: { product: true },
      });

      if (!wishItem)
        return { success: false, error: "المنتج غير موجود في قائمة الأمنيات" };

      // 3. Ensure User has a Cart
      let userCart = await tx.query.carts.findFirst({
        where: eq(carts.userId, userId),
      });

      if (!userCart) {
        [userCart] = await tx.insert(carts).values({ userId }).returning();
      }

      // 4. Move logic
      const existingCartItem = await tx.query.cartItems.findFirst({
        where: and(
          eq(cartItems.cartId, userCart!.id),
          eq(cartItems.productId, wishItem.productId),
        ),
      });

      if (existingCartItem) {
        await tx
          .update(cartItems)
          .set({ quantity: existingCartItem.quantity + 1 })
          .where(eq(cartItems.id, existingCartItem.id));
      } else {
        await tx.insert(cartItems).values({
          cartId: userCart!.id,
          productId: wishItem.productId,
          quantity: 1,
          priceAtAdd: Math.round(
            Number(wishItem.product.salePrice || wishItem.product.price),
          ).toString(),
        });
      }

      // 5. Cleanup
      await tx.delete(wishlistItems).where(eq(wishlistItems.id, wishItem.id));

      revalidatePath("/wishlist");
      revalidatePath("/cart");
      return { success: true, data: undefined };
    });
  } catch (error) {
    console.error("MOVE_TO_CART_ERROR:", error);
    return { success: false, error: "فشل نقل المنتج إلى السلة" };
  }
}

export async function toggleWishlist(
  productId: number,
): Promise<ActionResult<{ action: "added" | "removed" }>> {
  try {
    const userId = await getAuthenticatedUser();
    if (!userId) return { success: false, error: "يجب تسجيل الدخول أولاً" };

    let wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.userId, userId),
    });

    if (!wishlist) {
      [wishlist] = await db.insert(wishlists).values({ userId }).returning();
    }

    const existingItem = await db.query.wishlistItems.findFirst({
      where: and(
        eq(wishlistItems.wishlistId, wishlist.id),
        eq(wishlistItems.productId, productId),
      ),
    });

    if (existingItem) {
      await db
        .delete(wishlistItems)
        .where(eq(wishlistItems.id, existingItem.id));
      revalidatePath("/wishlist");
      revalidatePath("/products");
      return { success: true, data: { action: "removed" } };
    } else {
      await db.insert(wishlistItems).values({
        wishlistId: wishlist.id,
        productId,
      });
      revalidatePath("/wishlist");
      revalidatePath("/products");
      return { success: true, data: { action: "added" } };
    }
  } catch (error) {
    console.error("TOGGLE_WISHLIST_ERROR:", error);
    return { success: false, error: "حدث خطأ أثناء تحديث قائمة الأمنيات" };
  }
}

export async function getWishlist(): Promise<ActionResult<any[]>> {
  try {
    const userId = await getAuthenticatedUser();
    if (!userId) return { success: false, error: "يجب تسجيل الدخول أولاً" };

    const wishlistData = await db.query.wishlists.findFirst({
      where: eq(wishlists.userId, userId),
      with: { items: { with: { product: true } } },
    });

    return {
      success: true,
      data: wishlistData?.items || [],
    };
  } catch (error) {
    console.error("GET_WISHLIST_ERROR:", error);
    return { success: false, error: "فشل تحميل قائمة الأمنيات" };
  }
}

export async function removeFromWishlist({
  itemId,
  productId,
}: {
  itemId?: number;
  productId?: number;
}): Promise<ActionResult> {
  try {
    const userId = await getAuthenticatedUser();
    if (!userId) return { success: false, error: "يجب تسجيل الدخول أولاً" };

    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.userId, userId),
    });

    if (!wishlist)
      return { success: false, error: "قائمة الأمنيات غير موجودة" };

    const conditions = [eq(wishlistItems.wishlistId, wishlist.id)];
    if (itemId) conditions.push(eq(wishlistItems.id, itemId));
    else if (productId) conditions.push(eq(wishlistItems.productId, productId));
    else return { success: false, error: "بيانات المنتج غير مكتملة" };

    const result = await db
      .delete(wishlistItems)
      .where(and(...conditions))
      .returning();

    if (result.length === 0)
      return { success: false, error: "المنتج غير موجود" };

    revalidatePath("/wishlist");
    revalidatePath("/products");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("REMOVE_WISHLIST_ERROR:", error);
    return { success: false, error: "حدث خطأ أثناء الحذف" };
  }
}

export async function isProductInWishlist(
  productId: number,
): Promise<ActionResult<boolean>> {
  try {
    const userId = await getAuthenticatedUser();

    if (!userId) return { success: true, data: false };

    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.userId, userId),
    });

    if (!wishlist) return { success: true, data: false };

    const existingItem = await db.query.wishlistItems.findFirst({
      where: and(
        eq(wishlistItems.wishlistId, wishlist.id),
        eq(wishlistItems.productId, productId),
      ),
    });

    return { success: true, data: !!existingItem };
  } catch (error) {
    console.error("IS_PRODUCT_IN_WISHLIST_ERROR:", error);
    return { success: false, error: "فشل التحقق من حالة المنتج" };
  }
}

export async function getWishlistItemsCount(): Promise<ActionResult<number>> {
  try {
    const userId = await getAuthenticatedUser();
    if (!userId) return { success: true, data: 0 };

    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.userId, userId),
      with: {
        items: true,
      },
    });

    return { success: true, data: wishlist?.items.length || 0 };
  } catch (error) {
    console.error("GET_WISHLIST_COUNT_ERROR:", error);
    return { success: false, error: "فشل تحديث عدد المنتجات" };
  }
}
