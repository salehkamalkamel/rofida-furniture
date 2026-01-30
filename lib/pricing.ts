import { Product } from "@/db/schema";

export type PriceBreakdown = {
  basePrice: number; // The original price
  unitPrice: number; // Price after sale logic
  customizationFee: number; // The fee for customizing ONE item
  finalUnitPrice: number; // (unitPrice + customizationFee)
  quantity: number;
  totalPrice: number; // finalUnitPrice * quantity
  currency: string;
};

export type CartSummary = {
  subtotal: number;
  deliveryFee: number;
  finalTotal: number;
  freeDeliveryThreshold: number;
  amountToFreeDelivery: number;
};

export function calculateCartSummary(itemsTotal: number): CartSummary {
  const threshold = 2000;
  // Apply our integer rounding rule to shipping too
  const deliveryFee = itemsTotal >= threshold ? 0 : 150;

  return {
    subtotal: Math.round(itemsTotal),
    deliveryFee: Math.round(deliveryFee),
    finalTotal: Math.round(itemsTotal + deliveryFee),
    freeDeliveryThreshold: threshold,
    amountToFreeDelivery: Math.max(0, threshold - itemsTotal),
  };
}

export function calculatePrice(
  product: Product,
  quantity: number,
  isCustomized: boolean,
): PriceBreakdown {
  const basePrice = Math.round(Number(product.price));

  // 1. Handle Sale Logic
  const unitPrice = Math.round(Number(product.salePrice)) || basePrice;

  const customizationFee = Math.round(isCustomized ? unitPrice * 0.1 : 0);

  // 3. Totals
  const finalUnitPrice = Math.round(unitPrice + customizationFee);
  const totalPrice = Math.round(finalUnitPrice * quantity);

  return {
    basePrice,
    unitPrice,
    customizationFee,
    finalUnitPrice,
    quantity,
    totalPrice,
    currency: "EGP",
  };
}
