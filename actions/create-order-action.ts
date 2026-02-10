"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  carts,
  cartItems,
  orders,
  orderItems,
  addresses,
  shippingRules,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import db from "..";
import { findShippingRule } from "./order-actions";
import { calculateOrderTotals } from "@/lib/pricing/calculateOrder";
import { Resend } from "resend";
import EmailTemplate from "@/components/email-template";

/* =========================
   ERRORS
========================= */

class UnauthorizedError extends Error {}
class EmptyCartError extends Error {}
class NotFoundError extends Error {}

/* =========================
   CREATE ORDER
========================= */

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createOrder(addressId: number, shippingRuleId: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new UnauthorizedError("Unauthorized");

  return db.transaction(async (tx) => {
    /* =========================
       1️⃣ Load cart + items
    ========================= */
    const cart = await tx.query.carts.findFirst({
      where: eq(carts.userId, session.user.id),
      with: {
        items: {
          with: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new EmptyCartError("Cart is empty");
    }

    /* =========================
       2️⃣ Load address snapshot
    ========================= */
    const address = await tx.query.addresses.findFirst({
      where: eq(addresses.id, addressId),
    });

    if (!address) {
      throw new NotFoundError("Address not found");
    }

    /* =========================
       3️⃣ Resolve shipping rule
    ========================= */
    const shippingRule = await tx.query.shippingRules.findFirst({
      where: eq(shippingRules.id, shippingRuleId),
    });

    if (!shippingRule) {
      throw new Error("Shipping Rule cannot be found!");
    }

    /* =========================
       4️⃣ Calculate totals
    ========================= */
    const totals = calculateOrderTotals({
      items: cart.items.map((item) => ({
        price: Number(item.priceAtAdd),
        quantity: item.quantity,
        customizationPrice: Number(item.customizationPrice),
      })),
      shippingRule,
    });

    /* =========================
       5️⃣ Create order
    ========================= */
    const [order] = await tx
      .insert(orders)
      .values({
        userId: session.user.id,
        totalAmount: totals.total.toString(),
        shippingAmount: totals.shipping.toString(),
        shippingRuleId: shippingRule.id,
        shippingAddress: address,
        status: "pending",
        paymentStatus: "pending",
        currency: "EGP",
      })
      .returning();

    /* =========================
       6️⃣ Insert order items
    ========================= */
    await tx.insert(orderItems).values(
      cart.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        productName: item.product.name,
        productSku: item.product.sku,
        productImage: (item.product.images as string[])[0],
        price: item.priceAtAdd, // SNAPSHOT PRICE
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        customizationText: item.customizationText,
      })),
    );

    /* =========================
       7️⃣ Clear cart
    ========================= */
    await tx.delete(cartItems).where(eq(cartItems.cartId, cart.id));

    const { data, error } = await resend.emails.send({
      from: "contact@contact.rofida-furniture.com",
      to: session.user.email,
      subject: `تأكيد طلبك رقم #${order.id}`,
      react: EmailTemplate({
        username: session.user.name,
        orderStatus: order.status,
        orderId: order.id,
        ctaUrl: `https://www.rofida-furniture.com/account/orders/${order.id}`,
      }),
    });
    if (error) {
      console.error(error);
    }
    console.log("create order data:", data);
    /* =========================
       8️⃣ Revalidate UI
    ========================= */
    revalidatePath("/cart");
    revalidatePath("/orders");

    return {
      success: true,
      orderId: order.id,
    };
  });
}
