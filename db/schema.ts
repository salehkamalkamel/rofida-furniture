import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  decimal,
  json,
  timestamp,
  pgEnum,
  index,
  integer,
} from "drizzle-orm/pg-core";

/* =========================
   USER & AUTH
========================= */

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: text("role").default("user").notNull(),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    impersonatedBy: text("impersonated_by"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("session_userId_idx").on(t.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("account_userId_idx").on(t.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("verification_identifier_idx").on(t.identifier)],
);

/* =========================
   PRODUCTS
========================= */

export const productLabelEnum = pgEnum("product_label", [
  "new_arrival",
  "best_seller",
  "on_sale",
  "limited_edition",
]);

export const stockStatusEnum = pgEnum("stock_status", [
  "in_stock",
  "out_of_stock",
  "pre_order",
  "limited",
  "made_to_order",
]);

export const availableStatusEnum = pgEnum("available_status", [
  "active",
  "draft",
  "archived",
]);

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    sku: varchar("sku", { length: 50 }).unique(),
    name: varchar("name", { length: 255 }).notNull(),
    nameEn: varchar("name_en", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    briefDescription: text("brief_description").notNull(),
    detailedDescription: text("detailed_description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    salePrice: decimal("sale_price", { precision: 10, scale: 2 }),
    isOnOffer: boolean("is_on_offer").default(false),
    label: productLabelEnum("label").default("new_arrival"),
    stockStatus: stockStatusEnum("stock_status").default("in_stock"),
    availableStatus:
      availableStatusEnum("available_status").default("archived"),
    colors: json("colors").$type<{ name: string; hex: string }[]>().default([]),
    measurements: json("measurements").$type<{
      width?: number;
      height?: number;
      depth?: number;
      weight?: number;
      unit: string;
    }>(),
    category: varchar("category", { length: 100 }).notNull(),
    buildTime: varchar("build_time", { length: 100 }),
    images: json("images").$type<string[]>().default([]),
    isCustomizable: boolean("is_customizable").default(false),
    isDeleted: boolean("is_deleted").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    createdBy: text("created_by").references(() => user.id),
  },
  (t) => [
    index("products_slug_idx").on(t.slug),
    index("products_name_idx").on(t.name),
    index("products_category_idx").on(t.category),
    index("products_price_idx").on(t.price),
  ],
);

/* =========================
   CART
========================= */

export const carts = pgTable(
  "carts",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("carts_userId_idx").on(t.userId)],
);

export const cartItems = pgTable(
  "cart_items",
  {
    id: serial("id").primaryKey(),
    cartId: integer("cart_id")
      .notNull()
      .references(() => carts.id, { onDelete: "cascade" }),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").default(1).notNull(),
    selectedColor: text("selected_color"),
    isCustomized: boolean("is_customized").default(false).notNull(),
    customizationText: text("customization_text"),
    priceAtAdd: decimal("price_at_add", { precision: 10, scale: 2 }).notNull(),
    customizationPrice: decimal("customization_price", {
      precision: 10,
      scale: 2,
    }).default("0"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    index("cart_items_cartId_idx").on(t.cartId),
    index("cart_items_productId_idx").on(t.productId),
    index("cart_items_unique_idx").on(
      t.cartId,
      t.productId,
      t.selectedColor,
      t.customizationText,
    ),
  ],
);

/* =========================
   WISHLIST
========================= */

export const wishlists = pgTable("wishlists", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const wishlistItems = pgTable(
  "wishlist_items",
  {
    id: serial("id").primaryKey(),
    wishlistId: integer("wishlist_id")
      .notNull()
      .references(() => wishlists.id, { onDelete: "cascade" }),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("wishlist_items_unique_idx").on(t.wishlistId, t.productId)],
);

/* =========================
   ORDERS
========================= */

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    currency: text("currency").default("EGP").notNull(),
    status: orderStatusEnum("status").default("pending").notNull(),
    paymentStatus: paymentStatusEnum("payment_status")
      .default("pending")
      .notNull(),
    shippingAddress: json("shipping_address").notNull(),
    shippingAmount: decimal("shipping_amount", {
      precision: 10,
      scale: 2,
    }).notNull(),

    shippingRuleId: integer("shipping_rule_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },

  (t) => [
    index("orders_userId_idx").on(t.userId),
    index("orders_createdAt_idx").on(t.createdAt),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: integer("product_id").references(() => products.id, {
      onDelete: "set null",
    }),
    productName: text("product_name").notNull(),
    productSku: text("product_sku"),
    productImage: text("product_image"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    quantity: integer("quantity").notNull(),
    selectedColor: text("selected_color"),
    customizationText: text("customization_text"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    index("order_items_orderId_idx").on(t.orderId),
    index("order_items_productId_idx").on(t.productId),
  ],
);

/* =========================
   ADRESSES
========================= */

export const addresses = pgTable(
  "addresses",
  {
    id: serial("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    label: text("label"),

    fullName: text("full_name").notNull(),
    street: text("street").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    zip: text("zip").notNull(),
    country: text("country").notNull(),

    phone: text("phone").notNull(),
    whatsApp: text("whatsapp").notNull(),

    isDefault: boolean("is_default").default(false).notNull(),
    shippingRuleId: integer("shipping_rule_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    index("addresses_userId_idx").on(t.userId),
    index("addresses_default_idx").on(t.userId, t.isDefault),
  ],
);

// RELATIONS DEFINITIONS PART

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

export const productRelations = relations(products, ({ one, many }) => ({
  user: one(user, {
    fields: [products.createdBy],
    references: [user.id],
  }),
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
  shippingRule: one(shippingRules, {
    fields: [orders.shippingRuleId],
    references: [shippingRules.id],
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

export const shippingRules = pgTable("shipping_rules", {
  id: serial("id").primaryKey(),
  country: text("country").default("Egypt").notNull(),
  city: text("city"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  freeOver: decimal("free_over", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   ADDRESSES
========================= */

export const addressRelations = relations(addresses, ({ one }) => ({
  user: one(user, {
    fields: [addresses.userId],
    references: [user.id],
  }),
  shippingRule: one(shippingRules, {
    fields: [addresses.shippingRuleId],
    references: [shippingRules.id],
  }),
}));

/* =========================
   TYPES
========================= */

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;

export type Cart = InferSelectModel<typeof carts>;
export type CartItem = InferSelectModel<typeof cartItems>;

export type Order = InferSelectModel<typeof orders>;
export type OrderItem = InferSelectModel<typeof orderItems>;

export type Address = InferSelectModel<typeof addresses>;
export type ShippingRule = InferSelectModel<typeof shippingRules>;
export type ProductLabel = (typeof productLabelEnum.enumValues)[number];
export type AvailableStatus = (typeof availableStatusEnum.enumValues)[number];


export const schema = {
  user,
  session,
  account,
  verification,
  products,
  carts,
  cartItems,
  wishlists,
  wishlistItems,
  orders,
  orderItems,
  addresses,
  shippingRules,
};
