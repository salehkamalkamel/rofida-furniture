"use server";

import db from "@/index";
import { addresses } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { addressFieldsSchema } from "@/lib/validations/address";
import { revalidatePath } from "next/cache";

/**
 * FETCH: All saved addresses for the logged-in user
 */
export async function getUserAddresses() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return [];

  return await db.query.addresses.findMany({
    where: eq(addresses.userId, session.user.id),
    orderBy: [desc(addresses.isDefault), desc(addresses.createdAt)],
  });
}

/**
 * CREATE: Add a new address to the book
 */
export async function saveAddress(rawInput: any) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("Unauthorized");

    const input = addressFieldsSchema.parse(rawInput);

    // If this is set as default, remove default status from all other addresses
    if (input.isDefault) {
      await db
        .update(addresses)
        .set({ isDefault: false })
        .where(eq(addresses.userId, session.user.id));
    }

    await db.insert(addresses).values({
      ...input,
      userId: session.user.id,
    });

    revalidatePath("/checkout");
    revalidatePath("/settings/addresses");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * DELETE: Remove an address from the book
 */
export async function deleteAddress(addressId: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  await db
    .delete(addresses)
    .where(
      and(eq(addresses.id, addressId), eq(addresses.userId, session.user.id)),
    );

  revalidatePath("/checkout");
  return { success: true };
}

/**
 * FETCH: Single address by ID for the logged-in user
 */
export async function getAddressById(addressId: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  const address = await db.query.addresses.findFirst({
    where: eq(addresses.userId, session.user.id) && eq(addresses.id, addressId),
  });

  if (!address) return null; // Or throw an error if you prefer

  return address;
}
