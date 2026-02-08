import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from ".."; // Ensure this path points to your Drizzle db instance
import { nextCookies } from "better-auth/next-js";
import { admin, anonymous } from "better-auth/plugins";
import { eq, and } from "drizzle-orm";
import {
  schema,
  orders,
  addresses,
  carts,
  cartItems,
  wishlists,
  wishlistItems,
} from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    admin(),
    nextCookies(),
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        // We use a transaction to ensure all data migrates safely or fails together
        await db.transaction(async (tx) => {
          // --------------------------------------------------------
          // 1. MIGRATE SIMPLE RECORDS (Orders & Addresses)
          // --------------------------------------------------------
          // These typically don't have uniqueness constraints per user,
          // so we can simply swap the userId.

          await tx
            .update(orders)
            .set({ userId: newUser.user.id })
            .where(eq(orders.userId, anonymousUser.user.id));

          await tx
            .update(addresses)
            .set({ userId: newUser.user.id })
            .where(eq(addresses.userId, anonymousUser.user.id));

          // --------------------------------------------------------
          // 2. MIGRATE CART (Merge Logic)
          // --------------------------------------------------------

          const anonCart = await tx.query.carts.findFirst({
            where: eq(carts.userId, anonymousUser.user.id),
            with: { items: true },
          });

          if (anonCart) {
            const userCart = await tx.query.carts.findFirst({
              where: eq(carts.userId, newUser.user.id),
            });

            if (!userCart) {
              // Scenario A: New User has no cart.
              // Simply transfer ownership of the anonymous cart.
              await tx
                .update(carts)
                .set({ userId: newUser.user.id })
                .where(eq(carts.id, anonCart.id));
            } else {
              // Scenario B: New User ALREADY has a cart.
              // We must merge items to avoid a database collision on 'carts.userId' (unique).

              for (const anonItem of anonCart.items) {
                // Check if this specific item variant exists in the user's cart
                const existingItem = await tx.query.cartItems.findFirst({
                  where: and(
                    eq(cartItems.cartId, userCart.id),
                    eq(cartItems.productId, anonItem.productId),
                    // Handle nullable fields for safe comparison
                    anonItem.selectedColor
                      ? eq(cartItems.selectedColor, anonItem.selectedColor)
                      : eq(cartItems.selectedColor, null as any),
                    anonItem.customizationText
                      ? eq(
                          cartItems.customizationText,
                          anonItem.customizationText,
                        )
                      : eq(cartItems.customizationText, null as any),
                  ),
                });

                if (existingItem) {
                  // Item exists: Update quantity
                  await tx
                    .update(cartItems)
                    .set({
                      quantity: existingItem.quantity + anonItem.quantity,
                    })
                    .where(eq(cartItems.id, existingItem.id));

                  // Delete the old anonymous item since we merged it
                  await tx
                    .delete(cartItems)
                    .where(eq(cartItems.id, anonItem.id));
                } else {
                  // Item does not exist: Move it to the user's cart
                  await tx
                    .update(cartItems)
                    .set({ cartId: userCart.id })
                    .where(eq(cartItems.id, anonItem.id));
                }
              }

              // Now that the anonymous cart is empty, delete it
              await tx.delete(carts).where(eq(carts.id, anonCart.id));
            }
          }

          // --------------------------------------------------------
          // 3. MIGRATE WISHLIST (Merge Logic)
          // --------------------------------------------------------

          const anonWishlist = await tx.query.wishlists.findFirst({
            where: eq(wishlists.userId, anonymousUser.user.id),
            with: { items: true },
          });

          if (anonWishlist) {
            const userWishlist = await tx.query.wishlists.findFirst({
              where: eq(wishlists.userId, newUser.user.id),
            });

            if (!userWishlist) {
              // Scenario A: Transfer ownership
              await tx
                .update(wishlists)
                .set({ userId: newUser.user.id })
                .where(eq(wishlists.id, anonWishlist.id));
            } else {
              // Scenario B: Merge items
              for (const anonItem of anonWishlist.items) {
                const existingItem = await tx.query.wishlistItems.findFirst({
                  where: and(
                    eq(wishlistItems.wishlistId, userWishlist.id),
                    eq(wishlistItems.productId, anonItem.productId),
                  ),
                });

                if (!existingItem) {
                  // Only move if it's not already in the user's wishlist
                  await tx
                    .update(wishlistItems)
                    .set({ wishlistId: userWishlist.id })
                    .where(eq(wishlistItems.id, anonItem.id));
                }
                // If it exists, we do nothing (effectively dropping the duplicate)
              }
              // Delete the now empty (or duplicate-filled) anonymous wishlist
              await tx
                .delete(wishlists)
                .where(eq(wishlists.id, anonWishlist.id));
            }
          }
        }); // End transaction
      },
    }),
  ],
});
