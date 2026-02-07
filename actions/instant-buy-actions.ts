"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  user,
  addresses,
  orders,
  orderItems,
  shippingRules,
  products,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import db from "..";

interface InstantOrderPayload {
  isGuest: boolean;
  addressId?: number;
  addressData?: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    whatsApp: string;
  };
  shippingRuleId: number;
  productData: {
    productId: number;
    quantity: number;
    color?: string;
    isCustomized: boolean;
    customizationText?: string;
    priceAtAdd: number;
    customizationPrice: number;
  };
}

export async function placeInstantOrder(payload: InstantOrderPayload) {
  const session = await auth.api.getSession({ headers: await headers() });

  // Validation: If not guest, must have session
  if (!payload.isGuest && !session?.user) {
    return { success: false, error: "Unauthorized" };
  }
  if (!session?.user) {
    return { success: false, error: "Authentication failed" };
  }

  let userId = session.user.id;

  try {
    return await db.transaction(async (tx) => {
      // 1. Handle Guest User Creation
      if (payload.isGuest || !userId) {
        // Simple logic: Check if phone number already exists in users (optional),
        // or just create a new guest user ID.
        // For this architecture, we create a new user record for the guest.
        userId = nanoid(); // Generate a unique ID

        await tx.insert(user).values({
          id: userId,
          name: payload.addressData!.fullName,
          email: `${payload.addressData!.phone}@guest.local`, // Placeholder email
          role: "user",
          emailVerified: false,
        });
      }

      // 2. Handle Address
      let finalAddressId = payload.addressId;
      let shippingAddressSnapshot = null;

      if (payload.addressData) {
        // Create new address
        const [newAddr] = await tx
          .insert(addresses)
          .values({
            userId: userId!,
            fullName: payload.addressData.fullName,
            phone: payload.addressData.phone,
            street: payload.addressData.street,
            city: payload.addressData.city,
            state: payload.addressData.state,
            country: payload.addressData.country,
            zip: payload.addressData.zip,
            whatsApp: payload.addressData.whatsApp,
            shippingRuleId: payload.shippingRuleId,
            label: "Home",
            isDefault: true,
          })
          .returning();

        finalAddressId = newAddr.id;
        shippingAddressSnapshot = newAddr;
      } else if (finalAddressId) {
        // Fetch existing address for snapshot
        shippingAddressSnapshot = await tx.query.addresses.findFirst({
          where: eq(addresses.id, finalAddressId),
        });
      }

      if (!shippingAddressSnapshot) {
        throw new Error("Address failed to resolve");
      }

      // 3. Calculate Totals (Double check server side)
      const itemTotal =
        (Number(payload.productData.priceAtAdd) +
          Number(payload.productData.customizationPrice)) *
        payload.productData.quantity;

      const shippingRule = await tx.query.shippingRules.findFirst({
        where: eq(shippingRules.id, payload.shippingRuleId),
      });
      const shippingCost = Number(shippingRule?.price || 0);
      const totalAmount = itemTotal + shippingCost;

      // 4. Create Order
      const [newOrder] = await tx
        .insert(orders)
        .values({
          userId: userId!,
          totalAmount: totalAmount.toString(),
          shippingAmount: shippingCost.toString(),
          shippingRuleId: payload.shippingRuleId,
          shippingAddress: shippingAddressSnapshot,
          status: "pending",
          paymentStatus: "pending",
          currency: "EGP",
        })
        .returning();

      // 5. Create Order Item
      // Fetch product details for snapshot (name, sku, image)
      const product = await tx.query.products.findFirst({
        where: eq(products.id, payload.productData.productId), // Assuming products import is correct here from context
      });

      await tx.insert(orderItems).values({
        orderId: newOrder.id,
        productId: payload.productData.productId,
        productName: product?.name || "Unknown Product",
        productSku: product?.sku,
        productImage: product?.images?.[0] as string,
        price: payload.productData.priceAtAdd.toString(), // Base price
        quantity: payload.productData.quantity,
        selectedColor: payload.productData.color,
        customizationText: payload.productData.customizationText,
      });

      // 6. Revalidate
      revalidatePath("/products");

      return { success: true, orderId: newOrder.id };
    });
  } catch (error) {
    console.error("Instant Buy Error:", error);
    return { success: false, error: "فشل في إنشاء الطلب. حاول مرة أخرى." };
  }
}
