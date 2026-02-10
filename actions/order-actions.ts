"use server";
import { Resend } from "resend";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import db from "..";
import { and, eq, isNull } from "drizzle-orm";
import {
  Address,
  cartItems, // The table object (keep for clearUserCart)
  carts,
  orderItems,
  orders,
  products,
  shippingRules, // Import this for type inference
  type CartItem, // Use 'type' keyword for clarity
} from "@/db/schema";
import { getAddressById } from "./address-actions";
import { revalidatePath } from "next/cache";
import EmailTemplate from "@/components/email-template";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { BillTemplate } from "@/components/pdf/bill-template";
import OrderStatusEmail from "@/components/OrderStatusEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

type CreateOrderResult = {
  success: boolean;
  orderId?: number;
  error?: string;
};

// custom errors
class UnauthorizedError extends Error {}
class NotFoundError extends Error {}
class EmptyCartError extends Error {}
export async function createOrder(
  addressId: number,
): Promise<CreateOrderResult> {
  try {
    // 1️⃣ Authenticate user
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new UnauthorizedError("برجاء تسجيل الدخول");
    let orderDetails: any = null;
    return await db.transaction(async (tx) => {
      // 2️⃣ Resolve shipping address snapshot
      const shippingSnapshot = await getAddressById(addressId);
      // 3️⃣ Fetch user's cart
      const userCart = await getUserCart(tx, session.user.id);
      if (!userCart.items.length)
        throw new EmptyCartError("Your cart is empty");
      // 4️⃣ Prepare order items & calculate totals
      const { preparedItems, totalAmount } = prepareOrderItems(userCart.items);
      // 5️⃣ Create order
      const newOrder = await createOrderRecord(
        tx,
        session.user.id,
        shippingSnapshot,
        totalAmount,
      );

      orderDetails = {
        id: newOrder.id,
        email: session.user.email,
        total: totalAmount,
      };

      // 6️⃣ Insert order items
      await tx
        .insert(orderItems)
        .values(
          preparedItems.map((item) => ({ ...item, orderId: newOrder.id })),
        );
      // 7️⃣ Clear user's cart
      await clearUserCart(tx, userCart.id);
      // const { data, error } = await resend.emails.send({
      //   from: "روفيدا للاثاث <contact.rofida-furniture.com>",
      //   to: orderDetails.email,
      //   subject: `تأكيد طلبك رقم #${orderDetails.id}`,
      //   react: EmailTemplate({ username: session.user.name }),
      // });
      // if (error) {
      //   console.error(error);
      // }
      // console.log("create order data:", data);
      // 8️⃣ Revalidate paths
      revalidatePath("/orders");
      revalidatePath("/cart");

      return { success: true, orderId: newOrder.id };
    });
  } catch (error: any) {
    if (
      error instanceof UnauthorizedError ||
      error instanceof NotFoundError ||
      error instanceof EmptyCartError
    ) {
      return { success: false, error: error.message };
    }
    console.error("CreateOrder error:", error);
    return { success: false, error: "حدث خطاء برجاء المحاولة في وقت لاحق" };
  }
}

/* =========================
   HELPER FUNCTIONS
========================= */

async function getUserCart(tx: any, userId: string) {
  return await tx.query.carts.findFirst({
    where: eq(carts.userId, userId),
    with: { items: { with: { product: true } } },
  });
}

// Define a type that represents a CartItem + the joined Product
type CartItemWithProduct = CartItem & {
  product: typeof products.$inferSelect;
};

function prepareOrderItems(items: CartItemWithProduct[]): {
  preparedItems: any[];
  totalAmount: number;
} {
  let totalAmount = 0;
  const preparedItems = items.map((item) => {
    const price = item.product.salePrice
      ? Math.round(Number(item.product.salePrice))
      : Math.round(Number(item.product.price));

    const lineTotal = Math.round(
      (price + Number(item.customizationPrice)) * item.quantity,
    );
    totalAmount += lineTotal;

    return {
      productId: item.productId,
      productName: item.product.name,
      productImage: (item.product.images as string[])[0],
      price: price.toString(),
      quantity: item.quantity,
      selectedColor: item.selectedColor,
      customizationText: item.customizationText,
    };
  });

  return {
    preparedItems,
    totalAmount: Math.round(Number(totalAmount.toFixed(2))),
  };
}

async function createOrderRecord(
  tx: any,
  userId: string,
  shippingSnapshot: any,
  totalAmount: number,
) {
  const [newOrder] = await tx
    .insert(orders)
    .values({
      userId,
      totalAmount,
      shippingAddress: shippingSnapshot,
      status: "pending",
      paymentStatus: "pending",
    })
    .returning();
  return newOrder;
}

async function clearUserCart(tx: any, cartId: number) {
  await tx.delete(cartItems).where(eq(cartItems.cartId, cartId));
}

export async function getOrderById(orderId: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      items: true,
      user: true,
    },
  });

  return order;
}

export async function getMyOrders() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
  return await db.query.orders.findMany({
    where: eq(orders.userId, session.user.id),
    with: {
      items: true,
    },
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
  });
}

export async function cancelOrder(orderId: number) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("Unauthorized");

    const result = await db.transaction(async (tx) => {
      const existingOrder = await tx.query.orders.findFirst({
        where: eq(orders.id, orderId),
      });

      if (!existingOrder) throw new Error("Order not found");
      if (existingOrder.userId !== session.user.id)
        throw new Error("Forbidden");

      if (existingOrder.status !== "pending") {
        throw new Error(
          "Cannot cancel an order that is already being processed or shipped",
        );
      }

      await tx
        .update(orders)
        .set({ status: "cancelled", updatedAt: new Date() })
        .where(eq(orders.id, orderId));

      const { data, error } = await resend.emails.send({
        from: "contact@contact.rofida-furniture.com",
        to: session.user.email,
        subject: `تحديث بخصوص طلبك رقم #${orderId}`,
        react: OrderStatusEmail({
          username: session.user.name,
          orderId: orderId,
          status: "cancelled",
        }),
      });
      if (error) {
        console.error(error);
      }
      return { success: true };
    });

    revalidatePath("/orders");
    return result;
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to cancel order" };
  }
}
type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export async function updateOrderStatus(
  orderId: number,
  newStatus: OrderStatus,
  newPaymentStatus?: PaymentStatus,
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user || session.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    // 1. Perform the update
    const updatedOrder = await db
      .update(orders)
      .set({
        status: newStatus,
        ...(newPaymentStatus && { paymentStatus: newPaymentStatus }),
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId))
      .returning();

    if (updatedOrder.length > 0) {
      const order = updatedOrder[0];

      const { data, error } = await resend.emails.send({
        from: "contact@contact.rofida-furniture.com",
        to: session.user.email,
        subject: `تحديث بخصوص طلبك رقم #${orderId}`,
        react: OrderStatusEmail({
          username: session.user.name,
          orderId: orderId,
          status: newStatus,
        }),
      });
      if (error) {
        console.error(error);
      }
    }

    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error: any) {
    console.error("Update Order Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getAllOrders() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized: Access denied. Admin role required.");
  }

  try {
    const allOrders = await db.query.orders.findMany({
      with: {
        user: true,
        items: true,
      },
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    });

    return allOrders;
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

export async function getAdminOrderById(orderId: number) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      items: true,
      user: true,
    },
  });

  return order;
}

export async function generateInvoiceAction(orderId: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      items: true,
    },
  });

  if (!order || order.userId !== session.user.id) {
    throw new Error("Forbidden");
  }

  const element = React.createElement(BillTemplate, {
    order,
    items: order.items,
  });

  const buffer = await renderToBuffer(element as any);

  return buffer.toString("base64");
}

export async function findShippingRule(address: Address) {
  /* =========================
     1️⃣ City-specific rule
  ========================= */
  const cityRule = await db.query.shippingRules.findFirst({
    where: and(
      eq(shippingRules.country, address.country),
      eq(shippingRules.city, address.city),
      eq(shippingRules.isActive, true),
    ),
  });

  if (cityRule) return cityRule;

  /* =========================
     2️⃣ Country-wide rule
  ========================= */
  const countryRule = await db.query.shippingRules.findFirst({
    where: and(
      eq(shippingRules.country, address.country),
      isNull(shippingRules.city),
      eq(shippingRules.isActive, true),
    ),
  });

  if (countryRule) return countryRule;

  /* =========================
     3️⃣ No rule found
  ========================= */
  throw new Error(
    `No shipping rule found for ${address.country}${
      address.city ? ` / ${address.city}` : ""
    }`,
  );
}
