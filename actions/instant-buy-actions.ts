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
    priceAtAdd: number;
    customizationPrice: number;
    color?: string;
    isCustomized: boolean;
    customizationText?: string;
  };
}

export async function placeInstantOrder(payload: InstantOrderPayload) {
  const session = await auth.api.getSession({ headers: await headers() });

  // 1. Determine the User ID
  let userId = session?.user?.id;

  // Logic to handle Guest Identity based on Phone Number
  if (payload.addressData?.phone) {
    const guestEmail = `${payload.addressData.phone}@guest.local`;

    // A. Check if this phone number already exists in our DB
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, guestEmail),
    });

    if (existingUser) {
      // SCENARIO 1: Returning Guest
      // We attribute the order to the existing history of this phone number
      userId = existingUser.id;
    } else if (session?.user?.isAnonymous) {
      // SCENARIO 2: New Guest, currently in Anonymous Session
      // We UPDATE the anonymous account to be the "Phone User"
      // This keeps them logged in but standardizes their record
      await db
        .update(user)
        .set({
          email: guestEmail,
          name: payload.addressData.fullName,
          // We keep isAnonymous=true or set to false depending on if you consider phone# 'verified'
          // usually keep it true or distinct until they set a password
        })
        .where(eq(user.id, session.user.id));

      userId = session.user.id;
    } else if (!userId) {
      // SCENARIO 3: Totally new, no session (shouldn't happen if client calls signIn.anon, but safe fallback)
      const newId = nanoid();
      await db.insert(user).values({
        id: newId,
        name: payload.addressData.fullName,
        email: guestEmail,
        role: "user",
        emailVerified: false,
        isAnonymous: true,
      });
      userId = newId;
    }
  }

  // Final Safety Check
  if (!userId) {
    return { success: false, error: "فشل في تحديد المستخدم" };
  }

  try {
    return await db.transaction(async (tx) => {
      // 2. Handle Address (Logic remains mostly the same, simplified)
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
        // Fetch existing
        shippingAddressSnapshot = await tx.query.addresses.findFirst({
          where: eq(addresses.id, finalAddressId),
        });
      }

      if (!shippingAddressSnapshot) {
        throw new Error("Address failed to resolve");
      }

      // 3. Calculate Totals
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

      // 5. Create Order Items
      const product = await tx.query.products.findFirst({
        where: eq(products.id, payload.productData.productId),
      });

      await tx.insert(orderItems).values({
        orderId: newOrder.id,
        productId: payload.productData.productId,
        productName: product?.name || "Unknown Product",
        productSku: product?.sku,
        productImage: product?.images?.[0] as string,
        price: payload.productData.priceAtAdd.toString(),
        quantity: payload.productData.quantity,
        selectedColor: payload.productData.color,
        customizationText: payload.productData.customizationText,
      });

      // 6. Revalidate
      revalidatePath("/products");

      return { success: true, orderId: newOrder.id };
    });
  } catch (error: any) {
    console.error("Instant Buy Error:", error);
    // Return a clean error message to the client
    return {
      success: false,
      error: error.message || "حدث خطأ أثناء تنفيذ الطلب",
    };
  }
}
