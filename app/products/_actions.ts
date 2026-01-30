"use server";

import { products } from "@/db/schema"; // Path to your schema
import { eq, desc, and, ilike, or } from "drizzle-orm";
import db from "@/index";

export async function getFilteredProductsClient({
  query,
  category,
}: {
  query?: string;
  category?: string;
}) {
  const filters = [];
  filters.push(eq(products.availableStatus, "active"));

  // 1. Handle Search (Case insensitive search on Name)
  if (query) {
    filters.push(or(ilike(products.name, `%${query}%`)));
  }

  // 2. Handle Category
  if (category && category !== "all") {
    filters.push(eq(products.category, category));
  }

  try {
    const data = await db
      .select()
      .from(products)
      .where(and(...filters))
      .orderBy(desc(products.createdAt)); // Latest products first

    // .limit(ITEMS_PER_PAGE)
    // .offset((page - 1) * ITEMS_PER_PAGE)
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}
