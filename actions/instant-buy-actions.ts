"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  addresses,
  orders,
  orderItems,
  shippingRules,
  products,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import db from "@/index";

interface InstantOrderPayload {
  addressId?: number;
  addressData?: {
    fullName: string;
    phone: string;
    whatsApp: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  shippingRuleId: number;
  productData: {
    productId: number;
    quantity: number;
    color?: string;
    isCustomized: boolean;
    customizationText?: string;
  };
}

export async function placeInstantOrder(payload: InstantOrderPayload) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      error: "فشل في تحديد المستخدم. يرجى تحديث الصفحة.",
    };
  }

  try {
    return await db.transaction(async (tx) => {
      // 1. Validate Product & Pricing (Security: Do not trust client prices)
      const product = await tx.query.products.findFirst({
        where: eq(products.id, payload.productData.productId),
      });

      if (!product) throw new Error("المنتج غير موجود");

      const unitPrice =
        product.isOnOffer && product.salePrice
          ? Number(product.salePrice)
          : Number(product.price);

      const customizationFee = payload.productData.isCustomized ? 50 : 0; // Example fixed fee
      const itemTotal =
        (unitPrice + customizationFee) * payload.productData.quantity;

      // 2. Validate Shipping Rule
      const shippingRule = await tx.query.shippingRules.findFirst({
        where: eq(shippingRules.id, payload.shippingRuleId),
      });

      if (!shippingRule) throw new Error("منطقة الشحن غير صالحة");
      const shippingCost = Number(shippingRule.price);
      const totalAmount = itemTotal + shippingCost;

      // 3. Resolve Address
      let finalAddressId = payload.addressId;
      let shippingAddressSnapshot = null;

      if (payload.addressData) {
        const [newAddr] = await tx
          .insert(addresses)
          .values({
            ...payload.addressData,
            userId,
            shippingRuleId: payload.shippingRuleId,
            label: "Home",
            isDefault: false,
          })
          .returning();

        finalAddressId = newAddr.id;
        shippingAddressSnapshot = newAddr;
      } else if (payload.addressId) {
        shippingAddressSnapshot = await tx.query.addresses.findFirst({
          where: and(
            eq(addresses.id, payload.addressId),
            eq(addresses.userId, userId),
          ),
        });
      }

      if (!shippingAddressSnapshot)
        throw new Error("لم يتم العثور على عنوان التوصيل");

      // 4. Create Order
      const [newOrder] = await tx
        .insert(orders)
        .values({
          userId,
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
      await tx.insert(orderItems).values({
        orderId: newOrder.id,
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        productImage: product.images?.[0] as string,
        price: unitPrice.toString(),
        quantity: payload.productData.quantity,
        selectedColor: payload.productData.color,
        customizationText: payload.productData.customizationText,
      });

      revalidatePath("/instant-buy/success");
      return { success: true, orderId: newOrder.id };
    });
  } catch (error: any) {
    console.error("Order Error:", error);
    return {
      success: false,
      error: error.message || "حدث خطأ أثناء تنفيذ الطلب",
    };
  }
}
