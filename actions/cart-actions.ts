"use server";

import {
  carts,
  cartItems,
  products,
  CartItem,
  Product,
  Cart,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { AddToCartSchema, UpdateQuantitySchema } from "@/lib/validations/cart";
// Replace this with your actual auth logic (e.g., Better Auth or NextAuth)
import db from "@/index";
import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * GET FULL CART
 */
export type FullCartResult = {
  success: boolean;
  items: (CartItem & { product: Product })[];
  total: number;
};
export async function getFullCart() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return { success: false, items: [], total: 0 };

    const userId = session.user.id;

    const userCart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
      with: {
        items: {
          with: { product: true },
        },
      },
    });

    if (!userCart || !userCart.items)
      return { success: true, items: [], total: 0 };

    // Calculate total and ensure it remains an integer
    const total = Math.round(
      userCart.items.reduce((acc, item) => {
        const itemUnitPrice =
          Number(item.priceAtAdd) + Number(item.customizationPrice);
        return acc + itemUnitPrice * item.quantity;
      }, 0),
    );

    return {
      success: true,
      items: userCart.items,
      total,
    };
  } catch (error) {
    console.error("GET_CART_ERROR:", error);
    return { success: false, items: [], total: 0 };
  }
}

export async function addToCart(rawInput: z.infer<typeof AddToCartSchema>) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("يجب تسجيل الدخول أولاً");

    const input = AddToCartSchema.parse(rawInput);
    const userId = session.user.id;

    const product = await db.query.products.findFirst({
      where: eq(products.id, input.productId),
    });

    if (!product || product.stockStatus === "out_of_stock") {
      throw new Error("المنتج غير متوفر حالياً");
    }

    let userCart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
    });

    if (!userCart) {
      [userCart] = await db.insert(carts).values({ userId }).returning();
    }

    // --- INTEGRATED ROUNDING LOGIC ---
    const basePrice = Math.round(
      product.salePrice ? Number(product.salePrice) : Number(product.price),
    );

    const customizationFee = input.isCustomized
      ? Math.round(basePrice * 0.1)
      : 0;
    // --------------------------------

    const existingItem = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.cartId, userCart.id),
        eq(cartItems.productId, input.productId),
        eq(cartItems.isCustomized, input.isCustomized),
        eq(cartItems.customizationText, input.customizationText ?? ""),
      ),
    });

    if (existingItem) {
      await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + input.quantity })
        .where(eq(cartItems.id, existingItem.id));
    } else {
      await db.insert(cartItems).values({
        cartId: userCart.id,
        productId: input.productId,
        quantity: input.quantity,
        selectedColor: input.selectedColor,
        isCustomized: input.isCustomized,
        customizationText: input.customizationText,
        priceAtAdd: basePrice.toString(), // Clean integer string
        customizationPrice: customizationFee.toString(), // Clean integer string
      });
    }

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Cart Error:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateCartItemQuantity(
  rawInput: z.infer<typeof UpdateQuantitySchema>,
) {
  try {
    const input = UpdateQuantitySchema.parse(rawInput);

    if (input.quantity === 0) {
      return await removeFromCart(input.itemId);
    }

    await db
      .update(cartItems)
      .set({ quantity: input.quantity })
      .where(eq(cartItems.id, input.itemId));

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    return { success: false, error: "فشل تحديث الكمية" };
  }
}

export async function removeFromCart(itemId: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { success: false };

  const cart = await db.query.carts.findFirst({
    where: eq(carts.userId, session.user.id),
  });

  if (!cart) return { success: true };

  await db
    .delete(cartItems)
    .where(and(eq(cartItems.cartId, cart.id), eq(cartItems.id, itemId)));

  revalidatePath("/cart");
  revalidatePath("/products");

  return { success: true };
}

// get cart items count for a user
// get cart items count for a user
export async function getCartItemsCount() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return 0;

    const userId = session.user.id;

    const cart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
      with: {
        items: {
          columns: {
            quantity: true,
          },
        },
      },
    });

    if (!cart?.items?.length) return 0;

    // Sum quantities (recommended)
    return cart.items.reduce((acc, item) => acc + item.quantity, 0);
  } catch (error) {
    console.error("GET_CART_COUNT_ERROR:", error);
    return 0;
  }
}

// check if the product is in cart
export async function isProductInCart(productId: number) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return false;

    const userId = session.user.id;

    const cart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
    });

    if (!cart) return false;

    const item = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.cartId, cart.id),
        eq(cartItems.productId, productId),
      ),
      columns: { id: true },
    });

    return !!item;
  } catch (error) {
    console.error("IS_PRODUCT_IN_CART_ERROR:", error);
    return false;
  }
}
