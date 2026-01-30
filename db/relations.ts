import { relations } from "drizzle-orm";

import {
  user,
  session,
  account,
  products,
  carts,
  cartItems,
  wishlists,
  wishlistItems,
  orders,
  orderItems,
  addresses,
} from "./schema";

/* =========================
   USER & AUTH RELATIONS
========================= */

export const userRelations = relations(user, ({ one, many }) => ({
  sessions: many(session),
  accounts: many(account),

  cart: one(carts),
  wishlist: one(wishlists),

  orders: many(orders),
  addresses: many(addresses),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

/* =========================
   PRODUCTS
========================= */

export const productRelations = relations(products, ({ many }) => ({
  cartItems: many(cartItems),
  wishlistItems: many(wishlistItems),
  orderItems: many(orderItems),
}));

/* =========================
   CART
========================= */

export const cartRelations = relations(carts, ({ one, many }) => ({
  user: one(user, {
    fields: [carts.userId],
    references: [user.id],
  }),
  items: many(cartItems),
}));

export const cartItemRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

/* =========================
   WISHLIST
========================= */

export const wishlistRelations = relations(wishlists, ({ one, many }) => ({
  user: one(user, {
    fields: [wishlists.userId],
    references: [user.id],
  }),
  items: many(wishlistItems),
}));

export const wishlistItemRelations = relations(wishlistItems, ({ one }) => ({
  wishlist: one(wishlists, {
    fields: [wishlistItems.wishlistId],
    references: [wishlists.id],
  }),
  product: one(products, {
    fields: [wishlistItems.productId],
    references: [products.id],
  }),
}));

/* =========================
   ORDERS
========================= */

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(user, {
    fields: [orders.userId],
    references: [user.id],
  }),
  items: many(orderItems),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

/* =========================
   ADDRESSES
========================= */

export const addressRelations = relations(addresses, ({ one }) => ({
  user: one(user, {
    fields: [addresses.userId],
    references: [user.id],
  }),
}));
