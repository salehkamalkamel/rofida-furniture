"use server";

import { calculatePrice } from "@/lib/pricing";
import { getProductById } from "@/actions/_actions";

export async function getProductQuoteAction(
  productId: number,
  quantity: number,
  isCustomized: boolean,
) {
  const product = await getProductById(productId);

  if (!product) throw new Error("Product not found");

  return calculatePrice(product, quantity, isCustomized);
}
