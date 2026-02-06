"use server";

import { products } from "@/db/schema"; // Path to your schema
import { eq, desc, and, ilike, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import db from "@/index";
import { ProductFormValues, productSchema } from "./_schema";
import { generateSlug } from "@/lib/healpers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * CREATE PRODUCT
 */
export async function createProduct(values: ProductFormValues) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return {
      success: false,
      error: "يجب تسجيل الدخول",
    };
  }

  if (session?.user.role !== "admin") {
    return {
      success: false,
      error: "غير مصرح لغير الادمين اضافة منتجات",
    };
  }

  const validated = productSchema.safeParse(values);
  if (!validated.success) {
    return {
      success: false,
      error: "خطأ في البيانات المرسلة",
      details: validated.error.format(),
    };
  }
  try {
    const slug = values.slug?.trim() || generateSlug(validated.data.name);

    if (!slug || slug.length < 2) {
      return {
        success: false,
        error: "يجب توفير اسم منتج صالح لإنشاء رابط (Slug)",
        field: "slug",
      };
    }

    const [newProduct] = await db
      .insert(products)
      .values({
        ...validated.data,
        slug: slug.toLowerCase(),
        price: validated.data.price.toString(),
        salePrice: validated.data.salePrice?.toString() || null,
        category: validated.data.categoryId,
      })
      .returning();

    revalidatePath("/dashboard/products");
    return { success: true, data: newProduct };
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        success: false,
        error: "الرابط (Slug) مستخدم بالفعل. الرجاء اختيار رابط مختلف.",
        field: "slug",
      };
    } else {
      return { success: false, error: "فشل إنشاء المنتج. حاول مرة أخرى." };
    }
  }
}

/**
 * UPDATE PRODUCT
 */
export async function updateProduct(
  id: number,
  values: Partial<ProductFormValues>,
) {
  // Partial validation for updates
  const validated = productSchema.safeParse(values);
  if (!validated.success) return { error: "Validation Failed" };

  try {
    const updateData: any = { ...validated.data };

    if (validated.data.name) {
      updateData.slug = generateSlug(validated.data.name);
    }

    const [updatedProduct] = await db
      .update(products)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    revalidatePath("/dashboard/products");
    revalidatePath(`/products/${updatedProduct.slug}`);
    return { success: true, data: updatedProduct };
  } catch (error) {
    return { error: "Update failed" };
  }
}

/**
 * DELETE PRODUCT
 */
export async function deleteProduct(id: number) {
  try {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    return { error: "Delete failed" };
  }
}

/**
 * TOGGLE OFFER STATUS (Bulk or Quick Action)
 */
export async function toggleProductOffer(id: number, isOnOffer: boolean) {
  try {
    await db.update(products).set({ isOnOffer }).where(eq(products.id, id));
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update status" };
  }
}

// const ITEMS_PER_PAGE = 12;

export async function getFilteredProductsDashboard({
  query,
  category,
}: {
  query?: string;
  category?: string;
}) {
  const filters = [];

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

// get product by ID
export async function getProductById(id: number) {
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)
      .then((res) => res[0]);
    return product;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product.");
  }
}
