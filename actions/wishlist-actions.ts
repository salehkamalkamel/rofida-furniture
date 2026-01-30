"use server";

import { auth } from "@/lib/auth";
import { wishlists, wishlistItems } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import db from "..";
import { carts, cartItems } from "@/db/schema";

export async function moveToCart({
  wishlistItemId,
  productId,
}: {
  wishlistItemId?: number;
  productId?: number;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return { success: false, error: "Unauthorized" };

    const userId = session.user.id;

    // 1. Database Transaction to ensure both operations succeed or fail together
    return await db.transaction(async (tx) => {
      // 2. Find the Wishlist Item & Product Price
      const wishlist = await tx.query.wishlists.findFirst({
        where: eq(wishlists.userId, userId),
      });

      if (!wishlist) throw new Error("Wishlist not found");

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
        return { success: false, error: "Item not found in wishlist" };

      // 3. Ensure User has a Cart
      let userCart = await tx.query.carts.findFirst({
        where: eq(carts.userId, userId),
      });

      if (!userCart) {
        [userCart] = await tx.insert(carts).values({ userId }).returning();
      }

      // 4. Check if product already in cart to handle duplicates
      const existingCartItem = await tx.query.cartItems.findFirst({
        where: and(
          eq(cartItems.cartId, userCart.id),
          eq(cartItems.productId, wishItem.productId),
        ),
      });

      if (existingCartItem) {
        // Option A: Just increment quantity
        await tx
          .update(cartItems)
          .set({ quantity: existingCartItem.quantity + 1 })
          .where(eq(cartItems.id, existingCartItem.id));
      } else {
        // Option B: Insert new cart item
        await tx.insert(cartItems).values({
          cartId: userCart.id,
          productId: wishItem.productId,
          quantity: 1,
          priceAtAdd: wishItem.product.price, // Uses current price from joined product
        });
      }

      // 5. Remove from Wishlist
      await tx.delete(wishlistItems).where(eq(wishlistItems.id, wishItem.id));

      revalidatePath("/wishlist");
      revalidatePath("/cart");

      return { success: true };
    });
  } catch (error) {
    console.error("Move to Cart Error:", error);
    return { success: false, error: "Could not move item to cart" };
  }
}
export async function toggleWishlist(productId: number) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return { success: false, error: "Unauthorized" };

    const userId = session.user.id;

    // 1. Ensure User Has a Wishlist
    let wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.userId, userId),
    });

    if (!wishlist) {
      [wishlist] = await db.insert(wishlists).values({ userId }).returning();
    }

    // 2. Check if item exists
    const existingItem = await db.query.wishlistItems.findFirst({
      where: and(
        eq(wishlistItems.wishlistId, wishlist.id),
        eq(wishlistItems.productId, productId),
      ),
    });

    if (existingItem) {
      // REMOVE IT
      await db
        .delete(wishlistItems)
        .where(eq(wishlistItems.id, existingItem.id));
      revalidatePath("/wishlist");
      revalidatePath("/products"); // Update heart icons on product lists
      return { success: true, action: "removed" };
    } else {
      // ADD IT
      await db.insert(wishlistItems).values({
        wishlistId: wishlist.id,
        productId,
      });
      revalidatePath("/wishlist");
      revalidatePath("/products");
      return { success: true, action: "added" };
    }
  } catch (error) {
    console.error("Wishlist Error:", error);
    return { success: false, error: "Something went wrong" };
  }
}

export async function getWishlist() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return null;
    const userId = session.user.id;

    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.userId, userId),
      with: {
        items: {
          with: {
            product: true,
          },
        },
      },
    });
    return { success: true, wishlist };
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    return { success: false, error: "Something went wrong" };
  }
}

// check if a product is in the user's wishlist
export async function isProductInWishlist(productId: number) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return false;
    const userId = session.user.id;

    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.userId, userId),
    });

    if (!wishlist) return false;

    const existingItem = await db.query.wishlistItems.findFirst({
      where: and(
        eq(wishlistItems.wishlistId, wishlist.id),
        eq(wishlistItems.productId, productId),
      ),
    });

    return !!existingItem;
  } catch (error) {
    console.error("Is Product in Wishlist Error:", error);
    return false;
  }
}

export async function getWishlistItemsCount() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return 0;
    const userId = session.user.id;
    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.userId, userId),
      with: {
        items: true,
      },
    });

    return wishlist?.items.length || 0;
  } catch (error) {
    console.error("Get Wishlist Items Count Error:", error);
    return 0;
  }
}

export async function removeFromWishlist({
  itemId,
  productId,
}: {
  itemId?: number;
  productId?: number;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return { success: false, error: "Unauthorized" };

    const userId = session.user.id;

    // 1. Get the user's wishlist ID first to ensure ownership
    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.userId, userId),
    });

    if (!wishlist) return { success: false, error: "Wishlist not found" };

    // 2. Build the delete condition dynamically
    const conditions = [eq(wishlistItems.wishlistId, wishlist.id)];

    if (itemId) {
      conditions.push(eq(wishlistItems.id, itemId));
    } else if (productId) {
      conditions.push(eq(wishlistItems.productId, productId));
    } else {
      return { success: false, error: "Provide either Item ID or Product ID" };
    }

    // 3. Execute delete with safety check (must belong to user's wishlist)
    const result = await db
      .delete(wishlistItems)
      .where(and(...conditions))
      .returning();

    if (result.length === 0) {
      return { success: false, error: "Item not found" };
    }

    revalidatePath("/wishlist");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Remove From Wishlist Error:", error);
    return { success: false, error: "Something went wrong" };
  }
}
